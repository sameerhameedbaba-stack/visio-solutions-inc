import type { ProcessStep } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

/** Numbered delivery timeline. Optionally shows client role and what's produced. */
export function ProcessTimeline({
  steps,
  detailed = false,
}: {
  steps: ProcessStep[];
  detailed?: boolean;
}) {
  return (
    <ol className="relative flex flex-col gap-6">
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 40}>
          <div className="relative flex gap-5 rounded-card border border-border bg-surface p-5 sm:p-6">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-base font-bold text-accent"
              aria-hidden="true"
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-muted-foreground">{step.summary}</p>
              {detailed && (step.clientRole || step.produces) && (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {step.clientRole && (
                    <div className="rounded-control bg-surface-subtle p-3">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-subtle-foreground">
                        What you contribute
                      </dt>
                      <dd className="mt-1 text-sm text-muted-foreground">{step.clientRole}</dd>
                    </div>
                  )}
                  {step.produces && (
                    <div className="rounded-control bg-surface-subtle p-3">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-subtle-foreground">
                        What we produce
                      </dt>
                      <dd className="mt-1 text-sm text-muted-foreground">{step.produces}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
