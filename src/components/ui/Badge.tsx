import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  tone?: 'brand' | 'teal' | 'neutral' | 'illustrative';
  className?: string;
  icon?: ReactNode;
}

const tones = {
  brand: 'bg-brand/10 text-accent ring-1 ring-brand/20',
  teal: 'bg-teal/10 text-teal-cyan ring-1 ring-teal/20',
  neutral: 'bg-surface-subtle text-muted-foreground ring-1 ring-border',
  illustrative: 'bg-highlight/15 text-warning ring-1 ring-highlight/30',
};

export function Badge({ children, tone = 'neutral', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {icon && (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
