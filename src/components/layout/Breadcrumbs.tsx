import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  path: string;
}

/** Accessible breadcrumb trail. The final item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-muted-foreground">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-flex min-h-[24px] items-center transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
