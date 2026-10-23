import type { UseCase } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

/** Accent gradients cycled across a row of cards. */
const ACCENTS = [
  'linear-gradient(135deg, #7C3AED, #DB2777)',
  'linear-gradient(135deg, #2563EB, #06B6D4)',
  'linear-gradient(135deg, #F97316, #E11D48)',
  'linear-gradient(135deg, #0D9488, #10B981)',
] as const;

/**
 * Illustrative use case card. Shows a subtle "Illustrative example" label so the
 * scenario is never mistaken for completed client work. No numerical outcomes.
 */
export function UseCaseCard({ useCase, index = 0 }: { useCase: UseCase; index?: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-6 shadow-lift transition-all duration-300 ease-natural hover:-translate-y-1 hover:shadow-glow sm:p-7">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
          style={{ backgroundImage: accent }}
          aria-hidden="true"
        />
        <span className="relative text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
          Illustrative example
        </span>
        <h3 className="relative mt-3 text-xl font-bold text-foreground">{useCase.title}</h3>
        <dl className="relative mt-5 flex flex-1 flex-col gap-4 text-sm">
          <div className="border-l-2 border-border pl-3.5">
            <dt className="font-semibold text-foreground">Situation</dt>
            <dd className="mt-1 text-muted-foreground">{useCase.situation}</dd>
          </div>
          <div className="border-l-2 border-border pl-3.5">
            <dt className="font-semibold text-foreground">Potential approach</dt>
            <dd className="mt-1 text-muted-foreground">{useCase.approach}</dd>
          </div>
          <div className="relative pl-3.5">
            <span
              className="absolute inset-y-0 left-0 w-0.5 rounded-full"
              style={{ backgroundImage: accent }}
              aria-hidden="true"
            />
            <dt className="font-semibold text-foreground">Expected type of value</dt>
            <dd className="mt-1 text-muted-foreground">{useCase.value}</dd>
          </div>
        </dl>
        <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
          {useCase.capabilities.map((capability) => (
            <li key={capability}>
              <span className="inline-flex rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-inset ring-border">
                {capability}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
