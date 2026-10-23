/**
 * Single registration point for GSAP and its plugins.
 *
 * Import gsap, ScrollTrigger, SplitText and useGSAP from here rather than from
 * the packages directly, so plugins are registered exactly once and only in the
 * browser (client components are also rendered on the server).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/** Media query GSAP's matchMedia uses to gate every non-essential animation. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';

/** The house ease: quick start, long soft landing. */
export const EASE_OUT = 'power3.out';

export { gsap, ScrollTrigger, SplitText, useGSAP };
