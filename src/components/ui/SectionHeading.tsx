import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { renderWithHighlight } from '@/lib/highlight';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  /** When `title` is a string, a phrase within it to show in the spectrum gradient. */
  highlight?: string;
  intro?: ReactNode;
  /** Heading level for correct document outline. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  id?: string;
  className?: string;
  /** Kept for compatibility; ink bands now re-theme their children automatically. */
  tone?: 'default' | 'onDark';
}

const titleSizes = {
  h1: 'text-h1 font-extrabold',
  h2: 'text-h2 font-extrabold',
  h3: 'text-h3 font-bold',
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
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
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-spectrum-soft px-3 py-1 text-eyebrow font-bold uppercase tracking-wider text-accent ring-1 ring-inset ring-spectrum-violet/15">
            <span className="h-1.5 w-1.5 rounded-full bg-spectrum" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={60}>
        <Heading
          id={id}
          className={cn(titleSizes[as], 'max-w-3xl', tone === 'onDark' && 'text-white')}
        >
          {typeof title === 'string' ? renderWithHighlight(title, highlight) : title}
        </Heading>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <p
            className={cn(
              'max-w-2xl text-body-lg',
              align === 'center' && 'mx-auto',
              tone === 'onDark' ? 'text-slate-300' : 'text-muted-foreground',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
