import { Container } from '@/components/ui/Container';

/** Global route loading state. */
export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent"
          aria-hidden="true"
        />
        <span>Loading…</span>
      </div>
      <span className="sr-only" role="status">
        Loading content
      </span>
    </Container>
  );
}
