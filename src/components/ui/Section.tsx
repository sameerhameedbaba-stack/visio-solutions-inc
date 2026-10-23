import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: 'base' | 'subtle' | 'surface' | 'navy' | 'ink';
  size?: 'default' | 'sm';
  id?: string;
  ariaLabelledby?: string;
  ariaLabel?: string;
}

const tones = {
  base: 'bg-background',
  subtle: 'bg-surface-subtle',
  surface: 'bg-surface',
  // Ink bands stay dark in both themes and re-theme their children (globals.css).
  navy: 'ink relative isolate overflow-hidden',
  ink: 'ink relative isolate overflow-hidden',
};

export function Section({
  children,
  className,
  tone = 'base',
  size = 'default',
  id,
  ariaLabelledby,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={cn(size === 'default' ? 'py-section' : 'py-section-sm', tones[tone], className)}
    >
      {children}
    </section>
  );
}
