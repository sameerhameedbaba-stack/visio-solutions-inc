import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { company } from '@/content/company';

export const metadata: Metadata = pageMetadata({
  title: 'Make a payment',
  description:
    'Pay an invoice or approved quote for Visio Solutions Inc. through our payment provider’s secure checkout.',
  path: '/payment',
});

/**
 * Green.Money hosted checkout ("Green Button").
 *
 * This is the provider's own "Link Code" for button 16783 ("Bundle products and
 * services"), which is configured for a variable amount — the customer enters
 * the amount and their details on Green.Money's page, not on ours.
 *
 * A plain link is used rather than the provider's form snippet on purpose: a
 * link navigation is not subject to the site's `form-action` policy, and it
 * lets us render our own accessible button instead of their remote PNG, which
 * the image policy would block. TransactionID is left empty so the customer can
 * quote their invoice number on the provider's page.
 *
 * The Success, Cancel and notification URLs are configured on the provider's
 * side — see PAYMENT_GATEWAY_SETUP.md.
 */
const checkoutUrl =
  'https://greenbyphone.com/eCheck/eCheck.aspx?GreenButton_id=16783&TransactionID=';

const steps = [
  'Select "Pay now" — this opens our payment provider, Green.Money.',
  'Enter the amount from your invoice, along with your name and payment details.',
  'You are returned here once the payment is submitted, with a reference number to keep.',
];

export default function PaymentPage() {
  return (
    <Container width="prose" className="py-16 sm:py-20">
      <h1 className="text-h1 font-bold text-foreground">Make a payment</h1>
      <p className="mt-4 text-body-lg text-muted-foreground">
        Pay an invoice or an approved quote. Have your invoice to hand — you will be asked for the
        amount and your invoice number during checkout.
      </p>

      <div className="mt-10 rounded-card border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-h4 font-semibold text-foreground">How it works</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-small font-semibold text-accent"
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Button href={checkoutUrl} size="lg" rel="noopener">
            Pay now
          </Button>
        </div>
      </div>

      <p className="mt-8 text-small text-subtle-foreground">
        Payments are processed by Green.Money on their own secure checkout. This site does not
        collect or store your bank or card details. Questions about an invoice? Email{' '}
        <Link
          href={`mailto:${company.email}`}
          className="font-medium text-accent hover:text-brand-hover"
        >
          {company.email}
        </Link>
        .
      </p>
    </Container>
  );
}
