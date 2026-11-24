import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Small building blocks shared by the /summary slides. Everything here sits on
 * the dark deck canvas, so colours are chosen for contrast on ink.
 */

/** Type scale for the deck. Sizes follow both width and height, so a slide fits
 *  a laptop shared over a call (1280×720) as well as a large display. */
export const deckType = {
  h1: 'mt-5 font-display text-[clamp(2.2rem,min(4.5vw,7.4vh),4.5rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-white',
  h2: 'mt-4 font-display text-[clamp(1.85rem,min(3.4vw,6vh),3.4rem)] font-extrabold leading-[1.07] tracking-[-0.03em] text-white',
  lead: 'mt-5 max-w-[36rem] text-[clamp(1rem,min(1.3vw,2.3vh),1.2rem)] leading-relaxed text-muted-foreground',
} as const;

type Tone = 'brand' | 'warm' | 'danger' | 'good';

const eyebrowTone: Record<Tone, string> = {
  brand: 'border-sky-300/25 bg-sky-300/10 text-sky-200',
  warm: 'border-amber-300/25 bg-amber-300/10 text-amber-200',
  danger: 'border-rose-300/25 bg-rose-400/10 text-rose-200',
  good: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200',
};

const eyebrowDot: Record<Tone, string> = {
  brand: 'bg-sky-300',
  warm: 'bg-amber-300',
  danger: 'bg-rose-400',
  good: 'bg-emerald-300',
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
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em]',
        eyebrowTone[tone],
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', eyebrowDot[tone])} />
      {children}
    </p>
  );
}

/** Positive emphasis: the brand spectrum. */
export function Spectrum({ children }: { children: React.ReactNode }) {
  return <span className="text-spectrum">{children}</span>;
}

/** Problem emphasis: a warm amber-to-rose gradient. */
export function Warm({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/** Coloured square holding a line icon. */
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
        'inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_20px_-8px_rgb(0_0_0/0.6)]',
        gradient,
        className ?? 'h-8 w-8',
      )}
    >
      <Icon className={iconClassName ?? 'h-4 w-4'} strokeWidth={2.2} />
    </span>
  );
}

/** Glass pill with an icon tile — used for capability callouts. */
export function Chip({
  icon,
  gradient,
  children,
  className,
}: {
  icon: LucideIcon;
  gradient: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      data-a
      className={cn(
        'flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-[0.92rem] font-semibold text-white backdrop-blur-md',
        className,
      )}
    >
      <IconTile
        icon={icon}
        gradient={gradient}
        className="h-7 w-7 rounded-full"
        iconClassName="h-3.5 w-3.5"
      />
      {children}
    </li>
  );
}

/** Gradient shield with a check — the deck's protection mark. */
export function ShieldMark({ id, className }: { id: string; className?: string }) {
  const fill = `shield-fill-${id}`;
  const shine = `shield-shine-${id}`;
  const path = 'M32 2 60 12v20c0 18-12 31-28 38C16 63 4 50 4 32V12L32 2Z';
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="64" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.55" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${fill})`} />
      <path d={path} fill={`url(#${shine})`} />
      <path
        d="M20 36l8.5 8.5L45 27"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Stylised laptop. The screen content is passed as children. */
export function Laptop({
  children,
  className,
  screenClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="relative aspect-[16/10] rounded-[12%/18%] border border-white/15 bg-gradient-to-b from-[#1b2559] to-[#0b1130] p-[4.5%] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)]">
        <div
          className={cn(
            'relative h-full overflow-hidden rounded-[6%/9%] bg-[#0a1030] ring-1 ring-white/10',
            screenClassName,
          )}
        >
          {children}
        </div>
      </div>
      <div className="relative -mx-[9%] h-[7%] min-h-[6px] rounded-b-[40%] bg-gradient-to-b from-[#c7d2fe] to-[#6366f1] opacity-80">
        <div className="mx-auto h-1/2 w-[18%] rounded-b-lg bg-black/20" />
      </div>
    </div>
  );
}

/** Calm, healthy screen content: a window with UI bars and a green status. */
export function HealthyScreen() {
  return (
    <div className="flex h-full flex-col gap-[7%] p-[8%]">
      <div className="flex items-center gap-[4%]">
        <span className="h-[10px] w-[10px] rounded-full bg-sky-300" />
        <span className="h-[8px] w-[46%] rounded-full bg-gradient-to-r from-sky-300 to-violet-300" />
      </div>
      <span className="h-[6px] w-[82%] rounded-full bg-white/15" />
      <span className="h-[6px] w-[64%] rounded-full bg-white/10" />
      <div className="mt-auto flex items-center gap-[5%]">
        <span className="inline-flex h-[16px] w-[38%] items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-400">
          <svg viewBox="0 0 24 24" className="h-[11px] w-[11px]" aria-hidden="true">
            <path
              d="M5 12.5l4.2 4.2L19 7"
              fill="none"
              stroke="#052e2b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="h-[16px] w-[30%] rounded-full bg-sky-400/30" />
      </div>
    </div>
  );
}

/** Tick and cross markers for lists. */
export function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3">
        <path
          d="M5 12.5l4.2 4.2L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
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
        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-400/15 text-rose-300 ring-1 ring-rose-300/30',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5">
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Wrapper that gives a card a spectrum gradient border and glow. */
export function SpectrumBorder({
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
        'relative rounded-[1.6rem] bg-spectrum p-[1.5px] shadow-[0_30px_80px_-30px_rgb(124_58_237/0.75)]',
        className,
      )}
    >
      <div className={cn('h-full rounded-[calc(1.6rem-1.5px)] bg-[#0b1027]', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
