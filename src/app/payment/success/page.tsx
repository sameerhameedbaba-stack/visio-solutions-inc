import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PaymentReferences } from '@/components/payment/PaymentReferences';
import { company } from '@/content/company';

export const metadata: Metadata = pageMetadata({
  title: 'Payment submitted',
  description: 'Your payment has been submitted to our payment provider.',
  path: '/payment/success',
  noindex: true,
});

const nextSteps = [
  'Your payment provider processes the transaction and issues any receipt to the email address you used at checkout.',
  'If you paid by bank transfer or e-check, it can take a few business days to clear.',
  'We match the payment to your account and confirm it by email.',
  'If anything looks wrong, or you do not hear from us, contact us and quote the reference above.',
];

export default function PaymentSuccessPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-h1 font-bold text-foreground">
        Thank you — your payment was submitted
      </h1>
      <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
        You completed the transaction with our payment provider and have been returned to our site.
      </p>

      <PaymentReferences />

      <div className="mt-10 w-full max-w-xl text-left">
        <h2 className="text-h4 font-semibold text-foreground">What happens next</h2>
        <ol className="mt-4 space-y-3">
          {nextSteps.map((step, index) => (
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
        Questions about this payment? Email{' '}
        <Link
          href={`mailto:${company.email}`}
          className="font-medium text-accent hover:text-brand-hover"
        >
          {company.email}
        </Link>
        . This page confirms that you were returned from the payment provider; your receipt and
        confirmation of settlement come from the provider and from us by email.
      </p>
    </Container>
  );
}
