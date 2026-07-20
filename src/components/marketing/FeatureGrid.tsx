import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
}

/** Generic feature/benefit/capability grid used across pages. */
export function FeatureGrid({
  features,
  columns = 3,
  tone = 'surface',
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  tone?: 'surface' | 'plain';
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <ul className={cn('grid gap-5', cols)}>
      {features.map((feature, index) => (
        <Reveal as="li" key={feature.title} delay={index * 40}>
          <div
            className={cn(
              'h-full rounded-card p-6',
              tone === 'surface'
                ? 'border border-border bg-surface shadow-card'
                : 'bg-surface-subtle',
            )}
          >
            <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
