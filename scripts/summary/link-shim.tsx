/**
 * Stand-in for `next/link` in the standalone /summary deck, which runs without
 * Next.js. Renders a plain anchor; site-relative links point at the live site
 * so they also work when the deck is opened from disk.
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';

const site = 'https://visiosolutions.net';

export default function Link({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) {
  const target = href.startsWith('/') ? `${site}${href}` : href;
  return (
    <a href={target} {...rest}>
      {children}
    </a>
  );
}
