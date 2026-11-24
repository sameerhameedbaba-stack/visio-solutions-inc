import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Building blocks shared by the /summary slides — bright theme.
 *
 * Colour rules (see reports/Bright deck UI resources.md):
 * - text is slate-900 / slate-700, never lighter than slate-600;
 * - status colours are the -700/-800 shades on -50/-100 tints, and are always
 *   paired with an icon and a word, never colour alone;
 * - the gradient highlight is only used on large headline text (3:1 is enough).
 */

/** Type scale. Sizes follow width and height so a slide fits a laptop shared
 *  over a call (1280×720) as well as a large display, and stays readable after
 *  video compression. */
export const deckType = {
  h1: 'mt-5 font-display text-[clamp(2.3rem,min(4.6vw,7.6vh),4.8rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-slate-900',
  h2: 'mt-4 font-display text-[clamp(1.95rem,min(3.6vw,6.3vh),3.8rem)] font-extrabold leading-[1.07] tracking-[-0.025em] text-slate-900',
  lead: 'mt-5 max-w-[36rem] text-[clamp(1.05rem,min(1.4vw,2.5vh),1.35rem)] leading-relaxed text-slate-700',
  item: 'text-[clamp(1rem,min(1.2vw,2.1vh),1.15rem)] font-semibold text-slate-800',
} as const;

/** White card used across the slides. */
export const card =
  'rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_45px_-28px_rgb(15_23_42/0.35)]';

type Tone = 'brand' | 'warm' | 'danger' | 'good';

const eyebrowTone: Record<Tone, string> = {
  brand: 'border-blue-200 bg-blue-50 text-blue-800',
  warm: 'border-amber-200 bg-amber-50 text-amber-900',
  danger: 'border-red-200 bg-red-50 text-red-800',
  good: 'border-emerald-200 bg-emerald-50 text-emerald-800',
};

const eyebrowDot: Record<Tone, string> = {
  brand: 'bg-blue-600',
  warm: 'bg-amber-500',
  danger: 'bg-red-600',
  good: 'bg-emerald-600',
};

export function Eyebrow({
  children,
  tone = 'brand',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      data-a
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.12em]',
        eyebrowTone[tone],
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', eyebrowDot[tone])} />
      {children}
    </p>
  );
}

/** Positive emphasis: the brand spectrum (headline sizes only). */
export function Spectrum({ children }: { children: React.ReactNode }) {
  return <span className="text-spectrum">{children}</span>;
}

/** Problem emphasis: orange to red (headline sizes only). */
export function Warm({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/**
 * Friendly 3D picture from Microsoft Fluent Emoji (MIT), bundled with the deck
 * in summary/img/. Decorative: every picture sits next to a written label.
 */
export function Emoji({
  name,
  className,
  style,
}: {
  name: EmojiName;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    // A plain <img>: the deck is a static folder, not a Next.js page.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`img/${name}.png`}
      alt=""
      aria-hidden="true"
      width={256}
      height={256}
      draggable={false}
      decoding="async"
      style={style}
      className={cn('pointer-events-none select-none object-contain', className)}
    />
  );
}

export const emojiNames = [
  'antenna',
  'bubbles',
  'bug',
  'broom',
  'check',
  'cloud',
  'detective',
  'email',
  'gem',
  'globe',
  'headphone',
  'key',
  'laptop',
  'locked',
  'microbe',
  'rocket',
  'shield',
  'sparkles',
  'star',
  'tools',
  'trophy',
  'turtle',
  'voltage',
  'warning',
] as const;
export type EmojiName = (typeof emojiNames)[number];

/** Coloured square holding a line icon (icons that have no 3D picture). */
export function IconTile({
  icon: Icon,
  gradient,
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  gradient: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_18px_-8px_rgb(15_23_42/0.45)]',
        gradient,
        className ?? 'h-9 w-9',
      )}
    >
      <Icon className={iconClassName ?? 'h-[18px] w-[18px]'} strokeWidth={2.3} />
    </span>
  );
}

/** White pill with a picture or icon — capability callouts. */
export function Chip({
  emoji,
  icon,
  gradient,
  children,
  className,
}: {
  emoji?: EmojiName;
  icon?: LucideIcon;
  gradient?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      data-a
      className={cn(
        'flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 text-[1rem] font-semibold text-slate-800 shadow-[0_10px_24px_-18px_rgb(15_23_42/0.5)]',
        className,
      )}
    >
      {emoji ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
          <Emoji name={emoji} className="h-7 w-7" />
        </span>
      ) : icon && gradient ? (
        <IconTile
          icon={icon}
          gradient={gradient}
          className="h-9 w-9 rounded-full"
          iconClassName="h-4 w-4"
        />
      ) : null}
      {children}
    </li>
  );
}

/** Green tick and red cross markers for lists (shape and colour both carry meaning). */
export function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
        <path
          d="M5 12.5l4.2 4.2L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Cross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3">
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Card with a brand-gradient border and a soft glow, for the recommended option. */
export function Highlighted({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-[1.6rem] bg-spectrum p-[2px] shadow-[0_30px_60px_-30px_rgb(37_99_235/0.55)]',
        className,
      )}
    >
      <div className={cn('h-full rounded-[calc(1.6rem-2px)] bg-white', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
