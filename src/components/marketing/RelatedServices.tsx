import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getService } from '@/content/services';

/** "Related services" cross-links, driven by service slugs. */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (related.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {related.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <h3 className="text-base font-semibold text-foreground">{service.navLabel}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Learn more
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
