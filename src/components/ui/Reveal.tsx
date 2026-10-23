'use client';

import { useRef, type ReactNode } from 'react';
import { EASE_OUT, gsap, MOTION_OK, MOTION_REDUCED, useGSAP } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  as?: 'div' | 'li';
  /** Distance travelled upward, in px. */
  distance?: number;
}

/**
 * Scroll-triggered entrance (GSAP ScrollTrigger).
 *
 * The element starts transparent via CSS only once JavaScript is known to be
 * running (`html.js [data-reveal]`), so there is no visible → hidden flash, and a
 * timed CSS fallback reveals it anyway if the animation code never runs.
 *
 * Opacity is animated rather than visibility, so content stays in the
 * accessibility tree and screen-reader users can reach it before it is scrolled
 * into view. Under prefers-reduced-motion nothing moves.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div', distance = 28 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { opacity: 0, y: distance },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: EASE_OUT,
            delay: delay / 1000,
            // A lingering transform would turn this into a containing block for
            // any sticky or fixed descendant.
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      });
      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
