import type { UseCase } from '@/content/types';

/**
 * Illustrative use case card. Shows a subtle "Illustrative example" label so the
 * scenario is never mistaken for completed client work. No numerical outcomes.
 */
export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card">
      <span className="text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
        Illustrative example
      </span>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{useCase.title}</h3>
      <dl className="mt-4 flex flex-1 flex-col gap-3 text-sm">
        <div>
          <dt className="font-semibold text-foreground">Situation</dt>
          <dd className="mt-1 text-muted-foreground">{useCase.situation}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Potential approach</dt>
          <dd className="mt-1 text-muted-foreground">{useCase.approach}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Expected type of value</dt>
          <dd className="mt-1 text-muted-foreground">{useCase.value}</dd>
        </div>
      </dl>
      <ul className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {useCase.capabilities.map((capability) => (
          <li key={capability}>
            <span className="inline-flex rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {capability}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
