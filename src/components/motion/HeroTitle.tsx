'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, MOTION_REDUCED, SplitText, useGSAP } from '@/lib/motion';
import { renderWithHighlight } from '@/lib/highlight';
import { cn } from '@/lib/utils';

interface HeroTitleProps {
  text: string;
  /** A phrase inside `text` to render in the brand spectrum gradient. */
  highlight?: string;
  as?: 'h1' | 'h2';
  className?: string;
  /** Seconds to wait before the lines rise (to sequence with other hero items). */
  delay?: number;
}

/**
 * Hero headline that rises into view line by line (GSAP SplitText, masked lines).
 *
 * Accessibility: SplitText's `aria: 'auto'` keeps the full sentence as the
 * heading's accessible name and hides the split fragments from assistive tech,
 * so the heading is announced once, intact. Under reduced motion the text is
 * never split. Before JavaScript runs the heading is plain, server-rendered text
 * (hidden only once JS is known to be available — see `data-reveal` in CSS).
 */
export function HeroTitle({
  text,
  highlight,
  as: Tag = 'h1',
  className,
  delay = 0.1,
}: HeroTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { opacity: 1 });
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          aria: 'auto',
          // Re-split when webfonts load or the width changes, so lines stay true.
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              rotate: 2,
              duration: 1.15,
              ease: 'expo.out',
              stagger: 0.11,
              delay,
            }),
        });
        return () => split.revert();
      });
      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { opacity: 1 });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text, highlight] },
  );

  return (
    <Tag ref={ref} data-reveal="" className={cn('font-display', className)}>
      {renderWithHighlight(text, highlight)}
    </Tag>
  );
}
