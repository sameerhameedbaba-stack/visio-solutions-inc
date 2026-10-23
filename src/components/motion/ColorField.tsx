'use client';

import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';
import type { GrainientProps } from '@/components/bits/Grainient';
import { cn } from '@/lib/utils';

/**
 * Live WebGL colour field (React Bits Grainient), loaded only in the browser
 * after hydration so it never delays first paint or ships to the server render.
 *
 * A CSS gradient in the same hues sits underneath: it is what shows while the
 * shader loads, under reduced motion before the first frame, and on devices
 * without WebGL2 — so the band is always colourful.
 */
const Grainient = dynamic(() => import('@/components/bits/Grainient'), { ssr: false });

interface ColorFieldProps extends Pick<
  GrainientProps,
  | 'angle'
  | 'bands'
  | 'speed'
  | 'flow'
  | 'scale'
  | 'interactive'
  | 'grainAmount'
  | 'saturation'
  | 'contrast'
> {
  colors: string[];
  className?: string;
  style?: CSSProperties;
}

export function ColorField({ colors, className, style, ...grainient }: ColorFieldProps) {
  const fallback = `linear-gradient(120deg, ${colors.join(', ')})`;
  return (
    <div
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={{ backgroundImage: fallback, ...style }}
      aria-hidden="true"
    >
      <Grainient colors={colors} clickSwirl={false} dpr={1.5} {...grainient} />
    </div>
  );
}
