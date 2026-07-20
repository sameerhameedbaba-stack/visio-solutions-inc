import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds hover elevation for interactive cards. */
  interactive?: boolean;
  tone?: 'surface' | 'subtle' | 'outline';
}

const tones = {
  surface: 'bg-surface border border-border shadow-card',
  subtle: 'bg-surface-subtle border border-transparent',
  outline: 'bg-transparent border border-border',
};

export function Card({ children, className, interactive, tone = 'surface' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card p-6 sm:p-7',
        tones[tone],
        interactive &&
          'transition-all duration-200 ease-natural hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}
