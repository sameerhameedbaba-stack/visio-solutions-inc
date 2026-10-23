<?php
/**
 * Instant Payment Notification (IPN) receiver — Visio Solutions Inc.
 *
 * The payment gateway calls this URL server-to-server when a transaction is
 * made, e.g.
 *
 *     https://visiosolutions.net/payment/notify.php?ChkID={0}&TransID={1}
 *
 * The rest of the site is a static export with no application server, so this
 * endpoint is plain PHP (available on Apache/LiteSpeed shared hosting).
 *
 * WHAT IT DOES
 *   - accepts GET or POST, records the notification, and answers "OK" with 200
 *     so the gateway marks the notification as delivered;
 *   - appends one JSON line per notification to a log file stored OUTSIDE the
 *     web root, so the log can never be fetched over HTTP;
 *   - optionally emails the notification to the company mailbox, rate limited.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *   This endpoint is public and unauthenticated: anyone who learns the URL can
 *   send a request to it. A recorded notification is therefore evidence that
 *   *something* called the URL, never proof that money moved. Settlement must
 *   always be confirmed in the payment provider's own dashboard or reports
 *   before goods, services, or refunds are released.
 *
 * CONFIGURATION
 *   Copy notify-config.example.php to one of these paths and edit it:
 *     1. <parent of public_html>/visio-payment-ipn/notify-config.php  (preferred —
 *        lives outside the web root and survives a redeploy that wipes public_html)
 *     2. <this directory>/notify-config.php                          (fallback)
 *   Never commit a real shared secret to the repository.
 */

declare(strict_types=1);

// Never reveal internals to a caller: no PHP warnings, notices, or stack traces.
@ini_set('display_errors', '0');
@ini_set('html_errors', '0');
error_reporting(0);

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/** Reject bodies larger than this (bytes). Real notifications are tiny. */
const VS_MAX_BODY_BYTES = 65536;
/** Maximum characters kept per recorded field. */
const VS_MAX_FIELD_LENGTH = 256;
/** Maximum characters kept for a transaction identifier. */
const VS_MAX_REFERENCE_LENGTH = 64;
/** Maximum number of distinct parameters recorded from one request. */
const VS_MAX_FIELDS = 40;
/** Rotate the log once it passes this size (bytes); at most two files are kept. */
const VS_MAX_LOG_BYTES = 2097152; // 2 MB
/** Most notification emails sent in one clock hour. */
const VS_MAX_EMAILS_PER_HOUR = 40;
/**
 * Parameter names whose values are never written to the log or the email.
 * A gateway may include bank or card details alongside the transaction IDs, and
 * this file is not a place for them to accumulate in plain text.
 */
const VS_SENSITIVE_KEY_PATTERN =
    '/(account|routing|cvv|cvc|ssn|iban|swift|card|passw|secret|token|signature|auth)|(?<![a-z])(aba|pan|pin)(?![a-z])/i';

// --------------------------------------------------------------------------
// Response
// --------------------------------------------------------------------------

/**
 * Send a fixed plain-text response and stop.
 * The body never echoes caller-supplied input, so this endpoint cannot be used
 * for reflected content injection.
 */
function vs_respond(int $status, string $body): void
{
    if (!headers_sent()) {
        http_response_code($status);
        header('Content-Type: text/plain; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: no-store');
        header('Referrer-Policy: no-referrer');
    }
    echo $body;
    exit;
}

// --------------------------------------------------------------------------
// Sanitising
// --------------------------------------------------------------------------

/** Strip control characters (including CR/LF) and coerce to valid UTF-8. */
function vs_clean(string $value, int $maxLength): string
{
    // Byte-level strip: no /u modifier, so malformed UTF-8 cannot make this fail.
    $value = (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
    $value = str_replace(["\r", "\n", "\t"], ' ', $value);
    if (function_exists('mb_check_encoding') && !mb_check_encoding($value, 'UTF-8')) {
        $value = (string) mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }
    return substr($value, 0, $maxLength);
}

/** Reduce a value to the characters transaction identifiers actually use. */
function vs_clean_reference(mixed $value): string
{
    if (!is_scalar($value)) {
        return '';
    }
    $value = (string) preg_replace('/[^A-Za-z0-9._-]/', '', (string) $value);
    return substr($value, 0, VS_MAX_REFERENCE_LENGTH);
}

/**
 * Decide whether a parameter's value may be recorded.
 * Keys are matched, not values: masking values would corrupt legitimate
 * identifiers, whereas a parameter literally named "AccountNumber" is exactly
 * what must never be written down.
 */
function vs_is_sensitive_key(string $key): bool
{
    return preg_match(VS_SENSITIVE_KEY_PATTERN, $key) === 1;
}

/**
 * Match a client IP against an allowlist of exact addresses and IPv4 CIDR ranges.
 * An empty allowlist allows everything.
 */
function vs_ip_allowed(string $ip, array $allowed): bool
{
    if ($allowed === []) {
        return true;
    }
    foreach ($allowed as $entry) {
        $entry = trim((string) $entry);
        if ($entry === '') {
            continue;
        }
        if (!str_contains($entry, '/')) {
            if (strcasecmp($ip, $entry) === 0) {
                return true;
            }
            continue;
        }
        [$subnet, $bits] = explode('/', $entry, 2);
        $ipLong = ip2long($ip);
        $subnetLong = ip2long($subnet);
        $prefix = (int) $bits;
        if ($ipLong === false || $subnetLong === false || $prefix < 0 || $prefix > 32) {
            continue; // not IPv4 — only exact matches are supported for IPv6
        }
        $mask = $prefix === 0 ? 0 : (-1 << (32 - $prefix)) & 0xFFFFFFFF;
        if ((($ipLong & $mask) & 0xFFFFFFFF) === (($subnetLong & $mask) & 0xFFFFFFFF)) {
            return true;
        }
    }
    return false;
}

/** Case-insensitive lookup across the collected parameters. */
function vs_param(array $params, string $name): string
{
    foreach ($params as $key => $value) {
        if (strcasecmp((string) $key, $name) === 0) {
            return is_scalar($value) ? (string) $value : '';
        }
    }
    return '';
}

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/** Directory above the web root — outside anything Apache will serve. */
function vs_private_dir(): ?string
{
    $candidates = [];
    $docRoot = isset($_SERVER['DOCUMENT_ROOT']) ? (string) $_SERVER['DOCUMENT_ROOT'] : '';
    if ($docRoot !== '' && is_dir($docRoot)) {
        $candidates[] = dirname($docRoot) . '/visio-payment-ipn';
    }
    // notify.php lives at <docroot>/payment/, so two levels up is the docroot's parent.
    $candidates[] = dirname(__DIR__, 2) . '/visio-payment-ipn';
    $candidates[] = rtrim(sys_get_temp_dir(), '/') . '/visio-payment-ipn';

    foreach ($candidates as $dir) {
        if (is_dir($dir) && is_writable($dir)) {
            return $dir;
        }
        if (!is_dir($dir) && @mkdir($dir, 0700, true) && is_writable($dir)) {
            return $dir;
        }
    }
    return null;
}

$vsPrivateDir = vs_private_dir();

$vsConfig = [
    // When non-empty, requests must include a matching ?token=… value.
    'shared_secret' => '',
    // Mailbox that receives notification emails ('' disables email entirely).
    'notify_email' => 'support@visiosolutions.net',
    // Envelope sender. Must be a mailbox on this domain for deliverability.
    'from_email' => 'website@visiosolutions.net',
    'email_enabled' => true,
    'log_enabled' => true,
    /*
     * Optional allowlist of the gateway's outbound addresses — exact IPv4/IPv6
     * addresses or IPv4 CIDR ranges, e.g. ['203.0.113.7', '198.51.100.0/24'].
     * Empty means "accept from anywhere". Ask the provider for their ranges in
     * writing before enabling this: a wrong entry silently drops every real
     * notification.
     */
    'allowed_ips' => [],
    /*
     * Body returned on success. Most gateways accept any 200; a few require an
     * empty body or a specific token. Change only if the provider says so.
     */
    'response_body' => 'OK',
];

foreach (
    [
        $vsPrivateDir !== null ? $vsPrivateDir . '/notify-config.php' : null,
        __DIR__ . '/notify-config.php',
    ] as $configPath
) {
    if ($configPath !== null && is_readable($configPath)) {
        $override = require $configPath;
        if (is_array($override)) {
            $vsConfig = array_merge($vsConfig, $override);
            break;
        }
    }
}

// --------------------------------------------------------------------------
// Request handling
// --------------------------------------------------------------------------

$method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper((string) $_SERVER['REQUEST_METHOD']) : 'GET';

if ($method === 'HEAD') {
    vs_respond(200, '');
}
if ($method !== 'GET' && $method !== 'POST') {
    vs_respond(405, 'Method Not Allowed');
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > VS_MAX_BODY_BYTES) {
    vs_respond(413, 'Payload Too Large');
}

// Peer address. Deliberately NOT X-Forwarded-For: that header is set by the
// caller and would let anyone spoof their way past the allowlist below.
$peerIp = vs_clean((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 64);

// Optional allowlist of the gateway's outbound addresses.
$allowedIps = is_array($vsConfig['allowed_ips'] ?? null) ? $vsConfig['allowed_ips'] : [];
if (!vs_ip_allowed($peerIp, $allowedIps)) {
    vs_respond(403, 'Forbidden');
}

// Optional shared secret. Compared in constant time; the token is never logged.
$sharedSecret = is_string($vsConfig['shared_secret']) ? $vsConfig['shared_secret'] : '';
if ($sharedSecret !== '') {
    $supplied = vs_param(array_merge($_GET, $_POST), 'token');
    if (!hash_equals($sharedSecret, $supplied)) {
        vs_respond(403, 'Forbidden');
    }
}

// Collect parameters. POST wins on collision so a query string cannot mask a body value.
$rawParams = array_merge($_GET, $_POST);

// Some gateways post JSON rather than a form body, which PHP does not populate
// into $_POST. Read the raw body (capped) and merge whatever can be parsed.
if ($method === 'POST' && $_POST === []) {
    $rawBody = (string) @file_get_contents('php://input', false, null, 0, VS_MAX_BODY_BYTES);
    if ($rawBody !== '') {
        $decoded = json_decode($rawBody, true);
        if (!is_array($decoded)) {
            $decoded = [];
            parse_str($rawBody, $decoded);
        }
        if (is_array($decoded)) {
            $rawParams = array_merge($rawParams, $decoded);
        }
    }
}

$fields = [];
foreach ($rawParams as $key => $value) {
    if (count($fields) >= VS_MAX_FIELDS) {
        break;
    }
    $cleanKey = vs_clean((string) $key, 64);
    if ($cleanKey === '') {
        continue;
    }
    if (vs_is_sensitive_key($cleanKey)) {
        // Record that the field arrived, never what it contained. This also
        // covers the shared secret, which matches the same pattern.
        $fields[$cleanKey] = '[redacted]';
        continue;
    }
    if (is_array($value)) {
        $value = '[array]';
    }
    $fields[$cleanKey] = vs_clean(is_scalar($value) ? (string) $value : '', VS_MAX_FIELD_LENGTH);
}

$checkId = vs_clean_reference(vs_param($rawParams, 'ChkID'));
$transId = vs_clean_reference(vs_param($rawParams, 'TransID'));
$hasReference = $checkId !== '' || $transId !== '';

$forwardedFor = isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    ? vs_clean(explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR'])[0], 64)
    : '';

$record = [
    'at' => gmdate('c'),
    'method' => $method,
    // Peer address, plus the (untrusted) forwarded header when one is present,
    // so a proxy in front of the host can still be diagnosed.
    'ip' => $peerIp,
    'xff' => $forwardedFor,
    // Path only. The query string is deliberately dropped: it repeats the
    // parameters below but without their redaction, so logging it whole would
    // put the shared secret and any bank details straight back into the file.
    'path' => vs_clean(explode('?', (string) ($_SERVER['REQUEST_URI'] ?? ''), 2)[0], 300),
    'ua' => vs_clean((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 200),
    'chkId' => $checkId,
    'transId' => $transId,
    // Cast so an empty parameter set still serialises as {} rather than [].
    'params' => (object) $fields,
];

// --------------------------------------------------------------------------
// Recording
// --------------------------------------------------------------------------

/** Append one JSON line to the private log, rotating when it grows too large. */
function vs_write_log(?string $dir, array $record): bool
{
    if ($dir === null) {
        return false;
    }
    $path = $dir . '/ipn.log';
    if (is_file($path) && filesize($path) > VS_MAX_LOG_BYTES) {
        @rename($path, $dir . '/ipn.log.1');
    }
    $flags = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
    if (defined('JSON_INVALID_UTF8_SUBSTITUTE')) {
        $flags |= JSON_INVALID_UTF8_SUBSTITUTE;
    }
    $line = json_encode($record, $flags);
    if ($line === false) {
        return false;
    }
    return @file_put_contents($path, $line . "\n", FILE_APPEND | LOCK_EX) !== false;
}

/**
 * Allow at most VS_MAX_EMAILS_PER_HOUR notification emails, so a flood of
 * requests to this public URL cannot be turned into a mailbox flood.
 */
function vs_email_allowed(?string $dir): bool
{
    if ($dir === null) {
        return true; // no state available; the send itself is still rate limited by the host
    }
    $path = $dir . '/email-bucket.json';
    $hour = gmdate('Y-m-d\TH');
    $state = ['hour' => $hour, 'count' => 0];
    if (is_readable($path)) {
        $decoded = json_decode((string) @file_get_contents($path), true);
        if (is_array($decoded) && ($decoded['hour'] ?? '') === $hour) {
            $state['count'] = (int) ($decoded['count'] ?? 0);
        }
    }
    if ($state['count'] >= VS_MAX_EMAILS_PER_HOUR) {
        return false;
    }
    $state['count']++;
    @file_put_contents($path, (string) json_encode($state), LOCK_EX);
    return true;
}

/** Send the notification email. Header values are stripped of CR/LF beforehand. */
function vs_send_email(array $config, array $record): bool
{
    $to = vs_clean((string) ($config['notify_email'] ?? ''), 254);
    $from = vs_clean((string) ($config['from_email'] ?? ''), 254);
    if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    if ($from === '' || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    if (!function_exists('mail')) {
        return false;
    }

    $reference = trim(
        ($record['chkId'] !== '' ? 'ChkID ' . $record['chkId'] : '')
        . ($record['transId'] !== '' ? ' TransID ' . $record['transId'] : '')
    );
    $subject = vs_clean(
        'Payment notification' . ($reference !== '' ? ' — ' . $reference : ''),
        160
    );

    $lines = [
        'A payment notification was received by visiosolutions.net.',
        '',
        'Received (UTC): ' . $record['at'],
        'Method:         ' . $record['method'],
        'Source IP:      ' . ($record['ip'] !== '' ? $record['ip'] : 'unknown'),
        '',
        'Parameters:',
    ];
    foreach ($record['params'] as $key => $value) {
        $lines[] = '  ' . $key . ': ' . ($value !== '' ? $value : '(empty)');
    }
    $lines[] = '';
    $lines[] = 'This endpoint is public and unauthenticated. Confirm the transaction in the';
    $lines[] = 'payment provider dashboard before treating it as settled.';

    $headers = implode("\r\n", [
        'From: Visio Solutions Website <' . $from . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Auto-Response-Suppress: All',
        'Auto-Submitted: auto-generated',
    ]);

    return @mail($to, $subject, implode("\n", $lines), $headers);
}

if (!empty($vsConfig['log_enabled'])) {
    vs_write_log($vsPrivateDir, $record);
}

// Only notify by email for requests that carry a transaction identifier. Random
// hits on this URL are still logged, but never reach the mailbox.
if (!empty($vsConfig['email_enabled']) && $hasReference && vs_email_allowed($vsPrivateDir)) {
    vs_send_email($vsConfig, $record);
}

// Always acknowledge, so the gateway does not retry indefinitely.
vs_respond(200, is_string($vsConfig['response_body'] ?? null) ? $vsConfig['response_body'] : 'OK');
