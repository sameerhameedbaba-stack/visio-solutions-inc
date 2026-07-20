'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

/** Route-level error boundary. Shows a safe message — never a stack trace. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log server-side digest reference only; no details are shown to the user.
    console.error('Route error:', error.digest ?? 'unknown');
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-eyebrow font-semibold uppercase tracking-wider text-error">
        Something went wrong
      </p>
      <h1 className="mt-3 text-h1 font-bold text-foreground">We hit an unexpected error</h1>
      <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
        Please try again. If the problem continues, you can return home or contact us and we’ll
        help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button href="/" variant="secondary" size="lg">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
