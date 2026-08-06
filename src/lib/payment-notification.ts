/**
 * Server-side helpers for the payment gateway's Instant Payment Notification
 * (IPN) callback.
 *
 * The notification is unauthenticated by nature: the gateway calls a URL, and
 * anyone who learns that URL can call it too. Everything here therefore treats
 * the payload as hostile input to be bounded and recorded — never as proof that
 * a payment settled. Settlement is confirmed in the provider's own dashboard.
 *
 * Kept separate from `@/lib/payment` (which the client bundle imports) so none
 * of this ships to the browser.
 */

import { sanitizeReference } from './payment';

/** Maximum characters kept per recorded field. */
export const notificationFieldMaxLength = 256;
/** Maximum number of distinct parameters recorded from one notification. */
export const maxNotificationFields = 40;
/** Reject bodies larger than this. Real notifications are a few hundred bytes. */
export const maxNotificationBodyBytes = 65536;
/**
 * Parameter names whose values are never recorded. A gateway may include bank
 * or card details alongside the transaction identifiers, and a log file is not
 * a place for them to accumulate. Keys are matched rather than values: masking
 * values would corrupt legitimate identifiers.
 *
 * The short tokens are bounded so `Company` does not match `pan` and
 * `Shipping` does not match `pin`. Kept in step with VS_SENSITIVE_KEY_PATTERN
 * in public/payment/notify.php.
 */
const sensitiveKeyPattern =
  /(account|routing|cvv|cvc|ssn|iban|swift|card|passw|secret|token|signature|auth)|(?<![a-z])(aba|pan|pin)(?![a-z])/i;

/** Placeholder written instead of a sensitive value. */
export const redactedPlaceholder = '[redacted]';

/** Strip control characters and bound the length of an untrusted value. */
export function sanitizeNotificationText(value: unknown, maxLength = notificationFieldMaxLength) {
  if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
    return '';
  }
  return (
    String(value)
      // Control characters, including the CR/LF that would break a log line.
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .trim()
      .slice(0, maxLength)
  );
}

export interface PaymentNotification {
  /** ISO-8601 timestamp in UTC. */
  receivedAt: string;
  method: string;
  /** Sanitised, bounded copy of every parameter the gateway sent. */
  fields: Record<string, string>;
  /** Convenience accessors for the two identifiers the gateway is configured to send. */
  checkId: string;
  transactionId: string;
  /** True when at least one identifier was present. */
  hasReference: boolean;
}

/** Case-insensitive lookup across collected parameters. */
function lookup(fields: Record<string, string>, name: string): string {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(fields)) {
    if (key.toLowerCase() === target) return value;
  }
  return '';
}

/**
 * Reduce raw gateway parameters to a bounded, log-safe notification record.
 * Later entries win on a duplicate key, matching PHP's `$_GET + $_POST` merge.
 */
export function buildNotification(
  method: string,
  entries: Iterable<readonly [string, unknown]>,
  now: Date = new Date(),
): PaymentNotification {
  const fields: Record<string, string> = {};

  for (const [rawKey, rawValue] of entries) {
    const key = sanitizeNotificationText(rawKey, 64);
    if (!key) continue;
    if (!(key in fields) && Object.keys(fields).length >= maxNotificationFields) continue;
    // Record that the field arrived, never what it contained.
    fields[key] = sensitiveKeyPattern.test(key)
      ? redactedPlaceholder
      : sanitizeNotificationText(rawValue);
  }

  const checkId = sanitizeReference(lookup(fields, 'ChkID')) ?? '';
  const transactionId = sanitizeReference(lookup(fields, 'TransID')) ?? '';

  return {
    receivedAt: now.toISOString(),
    method: sanitizeNotificationText(method, 16).toUpperCase(),
    fields,
    checkId,
    transactionId,
    hasReference: checkId !== '' || transactionId !== '',
  };
}
