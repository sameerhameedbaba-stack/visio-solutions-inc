'use client';

import type { CSSProperties, ReactNode } from 'react';
import SpotlightCard from '@/components/bits/SpotlightCard';
import { cn } from '@/lib/utils';

/**
 * Card with a cursor-following coloured spotlight and glowing rim (React Bits
 * SpotlightCard). Its surface, border and shadow are re-pointed at the site's
 * theme tokens, so it follows light/dark mode and ink bands automatically.
 * Purely decorative: the content and any link inside behave like a plain card.
 */
export function GlowCard({
  children,
  glow,
  className,
  intensity = 0.4,
}: {
  children: ReactNode;
  /** Spotlight colour, e.g. a pillar's glow. */
  glow: string;
  className?: string;
  intensity?: number;
}) {
  const style = {
    '--spotlight-card-surface': 'rgb(var(--surface))',
    '--spotlight-card-border': 'rgb(var(--border))',
    '--spotlight-card-shadow':
      '0 1px 2px rgb(11 16 36 / 0.04), 0 22px 48px -26px rgb(11 16 36 / 0.25)',
  } as CSSProperties;

  return (
    <SpotlightCard
      theme="dark"
      spotlightColor={glow}
      intensity={intensity}
      spotlightSize={320}
      borderGlow={0.9}
      flare={false}
      className={cn('h-full !rounded-card !p-0', className)}
      style={style}
    >
      {children}
    </SpotlightCard>
  );
}
