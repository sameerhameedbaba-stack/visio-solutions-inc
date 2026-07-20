import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  headline?: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  /** Optional visual on the right (e.g. diagram). */
  aside?: ReactNode;
  align?: 'left' | 'center';
}

/** Consistent hero for interior pages. Renders a single H1 per page. */
export function PageHero({
  eyebrow,
  title,
  headline,
  intro,
  breadcrumbs,
  actions,
  aside,
  align = 'left',
}: PageHeroProps) {
  const hasAside = Boolean(aside);
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-subtle to-background">
      <Container className={cn('py-14 sm:py-18 lg:py-20')}>
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div
          className={cn(
            'gap-12',
            hasAside ? 'grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center' : '',
            !hasAside && align === 'center' && 'mx-auto max-w-3xl text-center',
          )}
        >
          <div
            className={cn('flex flex-col gap-5', !hasAside && align === 'center' && 'items-center')}
          >
            {eyebrow && (
              <span className="text-eyebrow font-semibold uppercase tracking-wider text-accent">
                {eyebrow}
              </span>
            )}
            <h1 className="text-h1 font-bold text-foreground">{title}</h1>
            {headline && <p className="text-body-lg font-medium text-foreground/90">{headline}</p>}
            {intro && <p className="max-w-2xl text-body-lg text-muted-foreground">{intro}</p>}
            {actions && (
              <div
                className={cn(
                  'mt-2 flex flex-wrap gap-3',
                  !hasAside && align === 'center' && 'justify-center',
                )}
              >
                {actions}
              </div>
            )}
          </div>
          {hasAside && <div className="w-full">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
