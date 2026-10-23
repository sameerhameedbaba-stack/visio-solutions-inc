import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { pillars, services } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';
import { GlowCard } from '@/components/motion/GlowCard';
import { pillarIcons } from './icons';
import { pillarTheme } from './pillar-theme';
import { cn } from '@/lib/utils';

/**
 * The four capability pillars as a colour-coded bento: each card carries its
 * pillar's gradient, a cursor spotlight in that hue, and the services it holds.
 */
export function ServicePillarGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {pillars.map((pillar, index) => {
        const Icon = pillarIcons[pillar.id];
        const theme = pillarTheme[pillar.id];
        const pillarServices = services.filter((service) => service.pillar === pillar.id);
        return (
          <Reveal as="li" key={pillar.id} delay={index * 80} className="h-full">
            <Link
              href={pillar.href}
              className="group block h-full rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <GlowCard glow={theme.glow}>
                <div className="relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
                  {/* Corner bloom in the pillar's colour. */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                    style={{ backgroundImage: theme.gradient }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 ease-natural group-hover:-rotate-6 group-hover:scale-110"
                      style={{ backgroundImage: theme.gradient }}
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:[background-image:var(--pillar-gradient)]"
                      style={{ '--pillar-gradient': theme.gradient } as CSSProperties}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-h3 font-bold text-foreground">{pillar.name}</h3>
                  <p className={cn('relative mt-1 text-sm font-semibold', theme.text)}>
                    {pillar.tagline}
                  </p>
                  <p className="relative mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  {pillarServices.length > 0 && (
                    <ul
                      className="relative mt-6 flex flex-wrap gap-2"
                      aria-label={`${pillar.name} services`}
                    >
                      {pillarServices.map((service) => (
                        <li
                          key={service.slug}
                          className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-inset ring-border"
                        >
                          {service.navLabel}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-natural group-hover:scale-x-100"
                    style={{ backgroundImage: theme.gradient }}
                    aria-hidden="true"
                  />
                </div>
              </GlowCard>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
