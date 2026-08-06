/**
 * Helpers for the payment gateway return pages.
 *
 * The gateway redirects the customer's browser back to /payment/success or
 * /payment/cancel and may append transaction identifiers to the query string
 * (for example ?ChkID=123&TransID=456). Those values arrive from an untrusted
 * source — the customer's own address bar — so they are only ever displayed
 * back as short, character-restricted reference strings, never used to look up
 * or assert anything about the payment itself.
 */

/**
 * Query-string keys the gateway is configured to append, in display order.
 * Matched case-insensitively because gateways are inconsistent about casing.
 */
export const paymentReferenceParams = [
  { key: 'ChkID', label: 'Check ID' },
  { key: 'TransID', label: 'Transaction ID' },
] as const;

/** Maximum characters shown for a reference value. */
export const referenceMaxLength = 64;

/**
 * Reduce an untrusted query-string value to a safe, printable reference.
 * Returns null when nothing usable remains, so callers can skip the field
 * entirely rather than render an empty row.
 */
export function sanitizeReference(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null;
  // Keep only characters real transaction identifiers use. This also removes
  // control characters, angle brackets, and anything that could look like markup.
  const cleaned = value.replace(/[^A-Za-z0-9._-]/g, '').slice(0, referenceMaxLength);
  return cleaned.length > 0 ? cleaned : null;
}

export interface PaymentReference {
  key: string;
  label: string;
  value: string;
}

/**
 * Extract the displayable references from a query string.
 * Accepts the raw `location.search` value (with or without the leading `?`).
 */
export function readPaymentReferences(search: string): PaymentReference[] {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

  // Build a case-insensitive lookup so ?chkid= and ?ChkID= behave the same.
  const lowered = new Map<string, string>();
  params.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (!lowered.has(lowerKey)) lowered.set(lowerKey, value);
  });

  const references: PaymentReference[] = [];
  for (const { key, label } of paymentReferenceParams) {
    const value = sanitizeReference(lowered.get(key.toLowerCase()));
    if (value) references.push({ key, label, value });
  }
  return references;
}
