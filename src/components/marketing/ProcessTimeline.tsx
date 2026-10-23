'use client';

import { useRef } from 'react';
import type { ProcessStep } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

/**
 * Numbered delivery timeline. A spectrum line fills down the rail as the reader
 * scrolls (GSAP ScrollTrigger, scrubbed) and each step's marker lights up as the
 * line reaches it. Without motion the rail is simply shown full.
 */
export function ProcessTimeline({
  steps,
  detailed = false,
}: {
  steps: ProcessStep[];
  detailed?: boolean;
}) {
  const ref = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          list.querySelector('[data-rail-fill]'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
          },
        );
        list.querySelectorAll<HTMLElement>('[data-step-marker]').forEach((marker) => {
          gsap.fromTo(
            marker,
            { scale: 0.7, filter: 'saturate(0) brightness(1.4)' },
            {
              scale: 1,
              filter: 'saturate(1) brightness(1)',
              ease: 'back.out(2)',
              duration: 0.5,
              scrollTrigger: { trigger: marker, start: 'top 72%', toggleActions: 'play none none reverse' },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative flex flex-col gap-5">
      {/* Rail: a faint track with a spectrum fill that grows with scroll. */}
      <span
        className="absolute bottom-6 left-[1.45rem] top-6 w-0.5 overflow-hidden rounded-full bg-border sm:left-[1.7rem]"
        aria-hidden="true"
      >
        <span data-rail-fill="" className="block h-full w-full origin-top bg-[linear-gradient(180deg,#2563EB,#7C3AED,#DB2777,#F97316)]" />
      </span>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} delay={40}>
          <div className="relative flex gap-5 sm:gap-6">
            <div
              data-step-marker=""
              className="relative z-[1] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#7C3AED)] font-display text-base font-extrabold text-white shadow-glow sm:h-14 sm:w-14"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 rounded-card border border-border bg-surface p-5 shadow-lift sm:p-6">
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1 text-muted-foreground">{step.summary}</p>
              {detailed && (step.clientRole || step.produces) && (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {step.clientRole && (
                    <div className="rounded-xl bg-surface-subtle p-3.5">
                      <dt className="text-xs font-bold uppercase tracking-wide text-pillar-ai">
                        What you contribute
                      </dt>
                      <dd className="mt-1 text-sm text-muted-foreground">{step.clientRole}</dd>
                    </div>
                  )}
                  {step.produces && (
                    <div className="rounded-xl bg-surface-subtle p-3.5">
                      <dt className="text-xs font-bold uppercase tracking-wide text-pillar-software">
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
