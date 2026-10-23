<?php
/**
 * Example configuration for payment/notify.php.
 *
 * Copy this file to ONE of the following locations and edit the values:
 *
 *   1. <parent of public_html>/visio-payment-ipn/notify-config.php   (preferred)
 *      Outside the web root, so it is never served and survives a redeploy
 *      that replaces the contents of public_html.
 *
 *   2. <public_html>/payment/notify-config.php                       (fallback)
 *      Simpler, but it is deleted whenever public_html is replaced.
 *
 * Do not commit a real shared secret to the repository.
 *
 * Returning a .php file (rather than .ini/.json) means a direct HTTP request to
 * it is executed by PHP and produces no output, so its contents cannot leak.
 */

declare(strict_types=1);

return [
    /*
     * Optional shared secret. When set to a non-empty string, the gateway URL
     * must carry a matching token, e.g.
     *   https://visiosolutions.net/payment/notify.php?ChkID={0}&TransID={1}&token=YOUR_SECRET
     * Requests without it are rejected with 403. Leave empty if the gateway
     * cannot append extra query parameters.
     */
    'shared_secret' => '',

    /* Mailbox that receives a notification email. Set to '' to disable email. */
    'notify_email' => 'support@visiosolutions.net',

    /* Envelope sender — must be a real mailbox on this domain for deliverability. */
    'from_email' => 'website@visiosolutions.net',

    'email_enabled' => true,
    'log_enabled' => true,

    /*
     * Optional allowlist of the gateway's outbound addresses. Exact IPv4/IPv6
     * addresses or IPv4 CIDR ranges, e.g. ['203.0.113.7', '198.51.100.0/24'].
     * Empty means "accept from anywhere".
     *
     * Ask the provider for their originating ranges in writing before enabling
     * this: a wrong or stale entry silently drops every real notification. The
     * check uses the connecting address only, never X-Forwarded-For, which the
     * caller controls.
     */
    'allowed_ips' => [],

    /*
     * Body returned on success. Most gateways accept any HTTP 200; a few expect
     * an empty body, and a few expect a specific token. Change only if the
     * provider's documentation says so.
     */
    'response_body' => 'OK',
];
