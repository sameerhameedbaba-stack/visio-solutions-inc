import type { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PaymentReferences } from '@/components/payment/PaymentReferences';
import { company } from '@/content/company';

export const metadata: Metadata = pageMetadata({
  title: 'Payment cancelled',
  description: 'The payment was cancelled before it was completed. Nothing has been charged.',
  path: '/payment/cancel',
  noindex: true,
});

const options = [
  'Return to the payment link or invoice you were using and start again when you are ready.',
  'If something went wrong during checkout, tell us what you saw and we will help you complete it.',
  'If you believe you were charged despite cancelling, contact us with the date and amount and we will check with our payment provider.',
];

export default function PaymentCancelPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-subtle text-accent">
        <RotateCcw className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-h1 font-bold text-foreground">Payment cancelled</h1>
      <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
        You cancelled before the payment was completed, so the transaction was not submitted.
      </p>

      <PaymentReferences />

      <div className="mt-10 w-full max-w-xl text-left">
        <h2 className="text-h4 font-semibold text-foreground">What you can do next</h2>
        <ul className="mt-4 space-y-3">
          {options.map((option) => (
            <li key={option} className="flex gap-3 text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{option}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/contact" size="lg">
          Contact us
        </Button>
        <Button href="/" variant="secondary" size="lg">
          Back to home
        </Button>
      </div>

      <p className="mt-8 max-w-xl text-small text-subtle-foreground">
        Need help finishing a payment? Email{' '}
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
