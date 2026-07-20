import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pillars } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';
import { pillarIcons } from './icons';

/** The four capability pillars as an editorial grid. */
export function ServicePillarGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar, index) => {
        const Icon = pillarIcons[pillar.id];
        return (
          <Reveal as="li" key={pillar.id} delay={index * 60}>
            <Link
              href={pillar.href}
              className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-all duration-200 ease-natural hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-control bg-brand/10 text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{pillar.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                {pillar.tagline}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
