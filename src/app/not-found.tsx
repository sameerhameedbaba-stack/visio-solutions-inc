import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-eyebrow font-semibold uppercase tracking-wider text-accent">Error 404</p>
      <h1 className="mt-3 text-h1 font-bold text-foreground">This page could not be found</h1>
      <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
        The page may have moved or no longer exists. Let’s get you back to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/services" variant="secondary" size="lg">
          Explore services
        </Button>
        <Button href="/contact" variant="ghost" size="lg">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
