'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/motion';

/** One hue per layer, walking the brand spectrum from objective to growth. */
const HUES = ['#2563EB', '#4F46E5', '#7C3AED', '#DB2777', '#0D9488', '#F97316'] as const;

/**
 * The integrated layers as a numbered stack. As each layer crosses the middle of
 * the viewport it lights up in its colour (GSAP ScrollTrigger), so the reader
 * builds the system one layer at a time. Without motion every layer is lit.
 */
export function LayerStack({ layers }: { layers: { label: string; description: string }[] }) {
  const ref = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list) return;
      const items = Array.from(list.querySelectorAll<HTMLElement>('[data-layer]'));
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        items.forEach((item) => item.setAttribute('data-lit', 'false'));
        const triggers = items.map((item) =>
          ScrollTrigger.create({
            trigger: item,
            start: 'top 62%',
            end: 'bottom 38%',
            onToggle: (self) => item.setAttribute('data-lit', String(self.isActive)),
          }),
        );
        return () => {
          triggers.forEach((trigger) => trigger.kill());
          items.forEach((item) => item.setAttribute('data-lit', 'true'));
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="flex flex-col gap-3">
      {layers.map((layer, index) => {
        const hue = HUES[index % HUES.length];
        return (
          <li
            key={layer.label}
            data-layer=""
            data-lit="true"
            className="group relative overflow-hidden rounded-card border border-white/10 bg-white/[0.04] p-5 transition-all duration-500 ease-natural data-[lit=true]:-translate-y-0.5 data-[lit=true]:border-white/25 data-[lit=true]:bg-white/[0.08] sm:p-6"
            style={{ ['--layer-hue' as string]: hue }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1 opacity-40 transition-opacity duration-500 group-data-[lit=true]:opacity-100"
              style={{ backgroundColor: hue }}
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-data-[lit=true]:opacity-60"
              style={{ backgroundColor: hue }}
              aria-hidden="true"
            />
            <div className="relative flex items-start gap-4">
              <span
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-display text-sm font-extrabold text-white shadow-lg"
                style={{ backgroundColor: hue }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">{layer.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  {layer.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
