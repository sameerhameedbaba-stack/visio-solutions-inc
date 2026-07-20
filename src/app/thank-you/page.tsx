import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = pageMetadata({
  title: 'Thank you',
  description: 'Your inquiry has been received.',
  path: '/thank-you',
  noindex: true,
});

const nextLinks = [
  { label: 'Explore our services', href: '/services' },
  { label: 'See how we work', href: '/how-we-work' },
  { label: 'Read our insights', href: '/insights' },
];

export default function ThankYouPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-h1 font-bold text-foreground">
        Thank you — your inquiry was submitted
      </h1>
      <p className="mt-4 max-w-lg text-body-lg text-muted-foreground">
        The team will review the context you shared and evaluate the most appropriate next step. In
        the meantime, here are a few useful places to continue.
      </p>

      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {nextLinks.map((link) => (
          <li key={link.href}>
            <Button href={link.href} variant="secondary">
              {link.label}
            </Button>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-subtle-foreground">
        <Link href="/" className="font-medium text-accent hover:text-brand-hover">
          Return to the homepage
        </Link>
      </p>
    </Container>
  );
}
