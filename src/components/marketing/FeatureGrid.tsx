import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
}

/** Accent gradients cycled across a grid so every list reads in full colour. */
const ACCENTS = [
  'linear-gradient(135deg, #2563EB, #06B6D4)',
  'linear-gradient(135deg, #7C3AED, #DB2777)',
  'linear-gradient(135deg, #0D9488, #10B981)',
  'linear-gradient(135deg, #F97316, #E11D48)',
] as const;

/** The same hues, deepened so the white number on each badge clears 4.5:1. */
const BADGES = [
  'linear-gradient(135deg, #2563EB, #0E7490)',
  'linear-gradient(135deg, #7C3AED, #BE185D)',
  'linear-gradient(135deg, #0F766E, #047857)',
  'linear-gradient(135deg, #C2410C, #BE123C)',
] as const;

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
      {features.map((feature, index) => {
        const accent = ACCENTS[index % ACCENTS.length];
        const badge = BADGES[index % BADGES.length];
        return (
          <Reveal as="li" key={feature.title} delay={(index % 3) * 70} className="h-full">
            <div
              className={cn(
                'group relative h-full overflow-hidden rounded-card p-6 transition-all duration-300 ease-natural hover:-translate-y-1 sm:p-7',
                tone === 'surface'
                  ? 'border border-border bg-surface shadow-lift hover:shadow-glow'
                  : 'bg-surface-subtle',
              )}
            >
              <span
                className="absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
                style={{ backgroundImage: accent }}
                aria-hidden="true"
              />
              <span
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 font-display text-sm font-extrabold text-white shadow-sm"
                style={{ backgroundImage: badge }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
