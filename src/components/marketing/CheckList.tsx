import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** A list where each item is affirmed with a check icon (icon is decorative). */
export function CheckList({
  items,
  className,
  columns = 1,
}: {
  items: string[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul className={cn('grid gap-3', columns === 2 && 'sm:grid-cols-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
