'use client';

import { useEffect, useState } from 'react';
import { readPaymentReferences, type PaymentReference } from '@/lib/payment';

/**
 * Shows the transaction identifiers the payment gateway appended to the return
 * URL, so the customer can quote them to us.
 *
 * The values are read from `window.location.search` after mount rather than
 * during render: the page is statically exported, so there is no request-time
 * query string, and reading it client-side keeps the page a plain static
 * document with no Suspense boundary or client-side-rendering bail-out.
 *
 * Renders nothing when the gateway sent no identifiers.
 */
export function PaymentReferences() {
  const [references, setReferences] = useState<PaymentReference[]>([]);

  useEffect(() => {
    setReferences(readPaymentReferences(window.location.search));
  }, []);

  if (references.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-md rounded-card border border-border bg-surface-subtle p-5 text-left">
      <h2 className="text-small font-semibold text-foreground">Your reference</h2>
      <dl className="mt-3 space-y-2">
        {references.map((reference) => (
          <div
            key={reference.key}
            className="flex flex-wrap items-baseline justify-between gap-x-4"
          >
            <dt className="text-small text-muted-foreground">{reference.label}</dt>
            <dd className="font-mono text-small font-semibold text-foreground">
              {reference.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-small text-subtle-foreground">
        Please keep this for your records and quote it in any correspondence with us.
      </p>
    </div>
  );
}
