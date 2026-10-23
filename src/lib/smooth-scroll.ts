import type Lenis from 'lenis';

/**
 * The page's Lenis instance, for components that must pause scrolling — e.g. the
 * mobile menu, which would otherwise let the page scroll underneath it.
 * Null before mount, on the server, and after unmount.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
