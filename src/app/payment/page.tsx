import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { company } from '@/content/company';

export const metadata: Metadata = pageMetadata({
  title: 'Make a payment',
  description: 'Pay an invoice or approved quote for Visio Solutions Inc.',
  path: '/payment',
  // Kept out of search until the provider's payment button is actually in place.
  // Once it is, delete this line so the page can be found and linked.
  noindex: true,
});

export default function PaymentPage() {
  return (
    <Container width="prose" className="py-16 sm:py-20">
      <h1 className="text-h1 font-bold text-foreground">Make a payment</h1>
      <p className="mt-4 text-body-lg text-muted-foreground">
        Use this page to pay an invoice or an approved quote. Have your invoice number to hand — you
        will be asked for it during checkout.
      </p>

      <div className="mt-10 rounded-card border border-border bg-surface p-6 sm:p-8">
        {/* ------------------------------------------------------------------
            PASTE THE PAYMENT PROVIDER'S BUTTON OR FORM CODE HERE.

            Replace everything between this comment and the closing one below.

            If their code is plain HTML (a <form> or an <a> button), paste it as
            JSX: rename `class` to `className`, and close standalone tags such as
            <input ... /> and <img ... />.

            If their code is a <script src="https://…"> tag, it also needs the
            provider's domain added to the Content-Security-Policy — build with
            PAYMENT_GATEWAY_ORIGIN set (see PAYMENT_GATEWAY_SETUP.md), otherwise
            the browser blocks it.
        ------------------------------------------------------------------- */}
        <p className="text-foreground">
          Online payment is being set up. In the meantime, reply to your invoice email or contact us
          and we will send you a payment link.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/contact">Contact us</Button>
          <Button href={`mailto:${company.email}`} variant="secondary">
            Email {company.email}
          </Button>
        </div>
        {/* ---------------------- END OF PASTE AREA ---------------------- */}
      </div>

      <p className="mt-8 text-small text-subtle-foreground">
        Payments are processed by our payment provider. This site does not store card or bank
        details. Questions about an invoice? Email{' '}
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
