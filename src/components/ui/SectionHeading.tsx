import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading level for correct document outline. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  id?: string;
  className?: string;
  tone?: 'default' | 'onDark';
}

const titleSizes = {
  h1: 'text-h1 font-bold',
  h2: 'text-h2 font-bold',
  h3: 'text-h3 font-semibold',
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = 'h2',
  align = 'left',
  id,
  className,
  tone = 'default',
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'text-eyebrow font-semibold uppercase tracking-wider',
            tone === 'onDark' ? 'text-brand-bright' : 'text-accent',
          )}
        >
          {eyebrow}
        </span>
      )}
      <Heading id={id} className={cn(titleSizes[as], tone === 'onDark' && 'text-white')}>
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            'text-body-lg',
            align === 'center' && 'max-w-2xl',
            tone === 'onDark' ? 'text-slate-300' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
