'use client';

import { usePathname } from 'next/navigation';

/** Routes that render full screen, without the site header, footer or smooth scrolling. */
const standaloneRoutes = ['/summary'];

export function isStandaloneRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return standaloneRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Renders site-wide chrome (header, footer, smooth scrolling) everywhere except
 * standalone routes such as the /summary presentation deck.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isStandaloneRoute(pathname)) return null;
  return <>{children}</>;
}
