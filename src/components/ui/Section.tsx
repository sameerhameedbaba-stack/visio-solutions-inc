import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: 'base' | 'subtle' | 'surface' | 'navy';
  size?: 'default' | 'sm';
  id?: string;
  ariaLabelledby?: string;
  ariaLabel?: string;
}

const tones = {
  base: 'bg-background',
  subtle: 'bg-surface-subtle',
  surface: 'bg-surface',
  navy: 'bg-navy text-slate-200',
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
