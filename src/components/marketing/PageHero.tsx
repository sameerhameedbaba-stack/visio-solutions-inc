import type { CSSProperties, ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { HeroTitle } from '@/components/motion/HeroTitle';
import { brandMesh } from '@/components/marketing/pillar-theme';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  /** A phrase inside `title` shown in the brand spectrum gradient. */
  highlight?: string;
  headline?: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  /** Optional visual on the right (e.g. diagram). */
  aside?: ReactNode;
  align?: 'left' | 'center';
  /** Three hues for the animated colour mesh; pillar pages pass their own. */
  mesh?: readonly [string, string, string];
}

/**
 * Interior page hero: a deep ink band (dark in both themes) lit by an animated
 * CSS colour mesh, running up under the floating header. Renders a single H1.
 *
 * Text sits over a left-weighted scrim so it keeps AA contrast wherever the mesh
 * drifts; the colour blooms on the open side.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  headline,
  intro,
  breadcrumbs,
  actions,
  aside,
  align = 'left',
  mesh = brandMesh,
}: PageHeroProps) {
  const hasAside = Boolean(aside);
  const centered = !hasAside && align === 'center';
  const meshStyle = {
    '--mesh-a': mesh[0],
    '--mesh-b': mesh[1],
    '--mesh-c': mesh[2],
  } as CSSProperties;

  return (
    <section className="ink grain relative isolate -mt-[var(--header-h)] overflow-hidden">
      <div className="mesh" style={meshStyle} aria-hidden="true" />
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          centered
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(6,8,22,.8)_0%,rgba(6,8,22,.5)_55%,rgba(6,8,22,.25)_100%)]'
            : 'bg-gradient-to-r from-ink/85 via-ink/45 to-transparent',
        )}
        aria-hidden="true"
      />
      <Container className="relative pb-16 pt-[calc(var(--header-h)+3.5rem)] sm:pb-20 lg:pb-24 lg:pt-[calc(var(--header-h)+4.5rem)]">
        {breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div
          className={cn(
            'gap-12',
            hasAside ? 'grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center' : '',
            centered && 'mx-auto max-w-3xl text-center',
          )}
        >
          <div className={cn('flex flex-col gap-6', centered && 'items-center')}>
            {eyebrow && (
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-eyebrow font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundImage: `linear-gradient(135deg, ${mesh[0]}, ${mesh[1]})` }}
                    aria-hidden="true"
                  />
                  {eyebrow}
                </span>
              </Reveal>
            )}
            <HeroTitle
              text={title}
              highlight={highlight}
              className="max-w-4xl text-h1 font-extrabold text-white"
            />
            {headline && (
              <Reveal delay={150}>
                <p className="text-body-lg font-medium text-white/90">{headline}</p>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={220}>
                <p
                  className={cn(
                    'max-w-2xl text-body-lg text-muted-foreground',
                    centered && 'mx-auto',
                  )}
                >
                  {intro}
                </p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={300}>
                <div className={cn('mt-2 flex flex-wrap gap-3', centered && 'justify-center')}>
                  {actions}
                </div>
              </Reveal>
            )}
          </div>
          {hasAside && (
            <Reveal delay={200} className="w-full">
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
      <div className="spectrum-line relative" aria-hidden="true" />
    </section>
  );
}
