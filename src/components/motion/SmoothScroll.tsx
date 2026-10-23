'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/motion';
import { setLenis } from '@/lib/smooth-scroll';

/**
 * Site-wide smooth scrolling (Lenis) driven by GSAP's ticker, so ScrollTrigger
 * animations and the scroll position advance on the same frame.
 *
 * Lenis honours prefers-reduced-motion itself (smoothing off, jumps instant) and
 * picks up a change live. Keyboard, focus and anchor scrolling stay native:
 * `anchors` is left off so the skip link still moves focus to the content.
 *
 * Also flags <html> with `motion-ready`, which retires the CSS fallback that
 * reveals content if JavaScript never gets this far (see globals.css).
 */
export function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      // Stop leftover momentum carrying into the next page on navigation.
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    root.classList.add('motion-ready');

    // Webfonts can shift layout after first paint; re-measure trigger positions.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
