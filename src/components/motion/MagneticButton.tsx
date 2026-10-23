'use client';

import type { ReactNode } from 'react';
import Magnet from '@/components/bits/Magnet';

/**
 * Pulls its child gently toward the pointer (React Bits Magnet). Pointer-only:
 * keyboard focus, touch and reduced-motion users get the plain button.
 */
export function MagneticButton({ children, strength = 4 }: { children: ReactNode; strength?: number }) {
  return (
    <Magnet padding={60} magnetStrength={strength} maxOffset={14} tilt={0}>
      {children}
    </Magnet>
  );
}
