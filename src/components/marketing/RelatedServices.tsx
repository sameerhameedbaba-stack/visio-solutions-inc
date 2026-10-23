import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getService } from '@/content/services';
import { pillarTheme } from './pillar-theme';
import { cn } from '@/lib/utils';

/** "Related services" cross-links, driven by service slugs and coloured by pillar. */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (related.length === 0) return null;

  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {related.map((service) => {
        const theme = pillarTheme[service.pillar];
        return (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-6 shadow-lift transition-all duration-300 ease-natural hover:-translate-y-1 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundImage: theme.gradient }}
                aria-hidden="true"
              />
              <h3 className="text-base font-bold text-foreground">{service.navLabel}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.summary}</p>
              <span className={cn('mt-4 inline-flex items-center gap-1 text-sm font-semibold', theme.text)}>
                Learn more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
