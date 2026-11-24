import {
  ArrowRight,
  BrickWall,
  Bug,
  Check,
  Cloud,
  Fingerprint,
  Gauge,
  Globe,
  Headset,
  IdCard,
  Infinity as InfinityIcon,
  Laptop as LaptopIcon,
  Mail,
  MailCheck,
  Minus,
  MonitorSmartphone,
  Rocket,
  Router,
  ScanEye,
  Settings2,
  ShieldCheck,
  ShieldOff,
  TriangleAlert,
  UserX,
  Wifi,
  WifiOff,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { deckBrand } from '@/content/summary';
import { cn } from '@/lib/utils';
import {
  Chip,
  Cross,
  Eyebrow,
  HealthyScreen,
  IconTile,
  Laptop,
  ShieldMark,
  Spectrum,
  SpectrumBorder,
  Tick,
  Warm,
  deckType,
} from './parts';
import styles from './deck.module.css';

/*
 * The ten slides of the /summary deck, in order. Elements marked `data-a`
 * animate in when their slide is shown (see SummaryDeck). `data-a` is only ever
 * put on elements without their own transform classes or looping transform
 * animations, so the entrance tween never fights a position offset.
 */

/** Icon-tile gradients (full class strings so Tailwind keeps them). */
const G = {
  blue: 'from-sky-400 to-blue-600',
  indigo: 'from-indigo-400 to-indigo-700',
  violet: 'from-violet-400 to-purple-700',
  pink: 'from-pink-400 to-fuchsia-600',
  rose: 'from-rose-400 to-red-600',
  amber: 'from-amber-300 to-orange-500',
  teal: 'from-teal-300 to-emerald-600',
  green: 'from-emerald-300 to-green-600',
  cyan: 'from-cyan-300 to-sky-600',
  slate: 'from-slate-500 to-slate-700',
} as const;

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-full w-full max-w-[1240px] items-center px-5 py-7 sm:px-8 lg:px-12 short:py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Absolutely positions a child at a percentage point, centred on it. */
function At({
  left,
  top,
  children,
  className,
  as: Tag = 'div',
}: {
  left: string;
  top: string;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  return (
    <Tag
      className={cn('absolute -translate-x-1/2 -translate-y-1/2', className)}
      style={{ left, top }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* 1 — Premium computer care                                                   */
/* -------------------------------------------------------------------------- */

function HeroVisual() {
  const nodes: { icon: LucideIcon; label: string; left: string; top: string; g: string }[] = [
    { icon: Wifi, label: 'Wi-Fi', left: '13%', top: '60%', g: G.cyan },
    { icon: Mail, label: 'Email', left: '87%', top: '60%', g: G.amber },
    { icon: Fingerprint, label: 'Identity', left: '50%', top: '90%', g: G.violet },
  ];
  const chips = [
    { label: 'Secure', dot: 'bg-sky-400', left: '19%', top: '17%' },
    { label: 'Fast', dot: 'bg-emerald-400', left: '83%', top: '23%' },
    { label: 'Supported', dot: 'bg-teal-300', left: '15%', top: '86%' },
    { label: 'Protected', dot: 'bg-violet-400', left: '85%', top: '85%' },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,31rem,62vh)]">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className={cn(
            'absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.6),transparent)] blur-2xl',
            styles.pulse,
          )}
        />
        <div
          className={cn(
            'absolute inset-[2%] rounded-full border border-dashed border-white/15',
            styles.spin,
          )}
        />
        <div className={cn('absolute inset-[13%]', styles.spinReverse)}>
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient
                id="hero-ring"
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#60A5FA" />
                <stop offset="0.45" stopColor="#A78BFA" />
                <stop offset="0.75" stopColor="#F472B6" stopOpacity="0.6" />
                <stop offset="1" stopColor="#F472B6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="49.4"
              fill="none"
              stroke="url(#hero-ring)"
              strokeWidth="0.9"
            />
          </svg>
        </div>
        <div className="absolute inset-[26%] rounded-full border border-white/10 bg-white/[0.03]" />
        <At left="50%" top="56%" className="w-[46%]">
          <div data-a>
            <Laptop>
              <HealthyScreen />
            </Laptop>
          </div>
        </At>
        <At left="50%" top="24%" className="w-[20%]">
          <div data-a>
            <div className={styles.float}>
              <ShieldMark
                id="hero"
                className="w-full drop-shadow-[0_14px_30px_rgb(124_58_237/0.65)]"
              />
            </div>
          </div>
        </At>
      </div>
      <ul aria-label="What is covered">
        {nodes.map(({ icon, label, left, top, g }) => (
          <At key={label} as="li" left={left} top={top}>
            <div data-a className="flex flex-col items-center gap-1.5">
              <IconTile
                icon={icon}
                gradient={g}
                className="h-11 w-11 rounded-2xl"
                iconClassName="h-5 w-5"
              />
              <span className="text-xs font-semibold text-white/85">{label}</span>
            </div>
          </At>
        ))}
        {chips.map(({ label, dot, left, top }) => (
          <At key={label} as="li" left={left} top={top}>
            <span
              data-a
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#0d1330]/80 px-3.5 py-1.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md"
            >
              <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', dot)} />
              {label}
            </span>
          </At>
        ))}
      </ul>
    </div>
  );
}

export function SlideHero() {
  const points: { icon: LucideIcon; text: string; g: string }[] = [
    { icon: Gauge, text: 'Care & optimization for every device', g: G.blue },
    { icon: ShieldCheck, text: 'Firewall, antivirus, identity & email protection', g: G.violet },
    { icon: Headset, text: '24/7 experts, unlimited during coverage', g: G.teal },
  ];
  return (
    <Frame>
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Premium Computer Care &amp; Complete Protection</Eyebrow>
          {/* The page's h1 is the deck title in SummaryDeck; this is the slide's own heading. */}
          <h2 data-a className={deckType.h1}>
            Fast Computer.
            <br />
            Secure Network.
            <br />
            {/* Keep "Digital Life." together so the line never ends on a lone word. */}
            <Spectrum>
              Protected <span className="whitespace-nowrap">Digital Life.</span>
            </Spectrum>
          </h2>
          <p data-a className={deckType.lead}>
            {deckBrand.short} isn’t just computer repair. It’s complete digital protection — with
            unlimited expert support during active coverage.
          </p>
          <ul className="mt-7 space-y-3 short:mt-5 short:space-y-2">
            {points.map(({ icon, text, g }) => (
              <li
                data-a
                key={text}
                className="flex items-center gap-3 text-[1.02rem] font-medium text-white/90"
              >
                <IconTile icon={icon} gradient={g} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2 — Why you should care                                                     */
/* -------------------------------------------------------------------------- */

function SickScreen() {
  return (
    <div aria-hidden="true" className="relative h-full p-[7%]">
      <span className="block h-[5px] w-[58%] rounded-full bg-white/10" />
      <span className="mt-[5%] block h-[5px] w-[40%] rounded-full bg-white/10" />
      <span className="absolute right-[30%] top-[9%] h-[13%] w-auto animate-spin rounded-full border-2 border-sky-300/70 border-t-transparent [aspect-ratio:1]" />
      <span className="absolute left-[16%] top-[22%] h-[24%] w-[44%] rounded-md bg-gradient-to-b from-rose-400 to-rose-600 shadow-lg">
        <span className="mx-auto mt-[9%] block h-[22%] w-[7%] rounded-sm bg-white/90" />
      </span>
      <span className="absolute left-[38%] top-[38%] flex h-[24%] w-[38%] items-center justify-center rounded-md bg-rose-700 shadow-xl ring-1 ring-white/10">
        <svg viewBox="0 0 24 24" className="h-[55%] w-auto [aspect-ratio:1]">
          <path d="M7 7l10 10M17 7L7 17" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <TriangleAlert
        className="absolute right-[7%] top-[38%] h-[24%] w-auto text-amber-300"
        strokeWidth={2.4}
      />
      <span className="absolute left-[7%] top-[52%] flex gap-[6px]">
        <span className="grid h-[14px] w-[14px] place-items-center rounded-[3px] bg-white/15 text-[9px] font-bold text-white">
          ?
        </span>
        <span className="grid h-[14px] w-[14px] place-items-center rounded-[3px] bg-white/15 text-[9px] font-bold text-white">
          ?
        </span>
      </span>
      <span className="absolute bottom-[19%] left-[7%] text-[clamp(7px,0.75vw,11px)] font-medium text-white/75">
        Not responding…
      </span>
      <span className="absolute bottom-[9%] left-[7%] right-[7%] h-[6%] overflow-hidden rounded-full bg-white/10">
        <span className={cn('block h-full w-[24%] rounded-full bg-rose-500', styles.blink)} />
      </span>
    </div>
  );
}

function SymptomVisual() {
  const symptoms: { icon: LucideIcon; text: string; left: string; top: string }[] = [
    { icon: WifiOff, text: 'Weak Wi-Fi · unsecured', left: '2%', top: '30%' },
    { icon: Globe, text: 'Browser · unsafe', left: '98%', top: '14%' },
    { icon: ShieldOff, text: 'Antivirus · expired', left: '98%', top: '64%' },
  ];
  const dangers: { icon: LucideIcon; text: string }[] = [
    { icon: Bug, text: 'Malware' },
    { icon: ScanEye, text: 'Spyware' },
    { icon: Globe, text: 'Unsafe browsing' },
    { icon: WifiOff, text: 'Weak Wi-Fi security' },
    { icon: ShieldOff, text: 'Expired antivirus' },
    { icon: UserX, text: 'Identity theft risk' },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,34rem)]">
      <p data-a className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/60">
        What you see
      </p>
      <div className="relative mx-auto mt-3 w-[min(60%,30vh*1.6)] short:mt-1">
        <div data-a>
          <Laptop screenClassName="bg-[#0c1233]">
            <SickScreen />
          </Laptop>
        </div>
        <ul aria-label="Symptoms">
          {symptoms.map(({ icon: Icon, text, left, top }) => (
            <At key={text} as="li" left={left} top={top}>
              <span
                data-a
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-200/25 bg-[#1d1424]/90 px-2.5 py-1 text-[0.74rem] font-semibold text-amber-100 shadow-[0_10px_24px_-10px_rgb(0_0_0/0.9)] backdrop-blur-md"
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 text-amber-300" />
                {text}
              </span>
            </At>
          ))}
        </ul>
      </div>

      <div data-a className="mt-6 flex items-center gap-3 short:mt-4">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-400/70"
        />
        <h3 className="flex items-center gap-1.5 rounded-full border border-rose-300/30 bg-rose-500/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-rose-100">
          <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5 text-rose-300" />
          The real danger underneath
        </h3>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-400/70"
        />
      </div>
      <div
        data-a
        className="mt-4 rounded-2xl border border-rose-300/25 bg-gradient-to-b from-[#3b0b1d]/80 to-[#1a0612]/80 p-2.5 shadow-[0_30px_70px_-30px_rgb(225_29_72/0.8)] short:mt-3"
      >
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {dangers.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2.5 rounded-xl border border-rose-200/10 bg-white/[0.04] px-3 py-2.5 text-[0.84rem] font-semibold leading-tight text-rose-50 short:py-2"
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-rose-300" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SlideSymptom() {
  return (
    <Frame>
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow tone="warm">Why you should care</Eyebrow>
          <h2 data-a className={deckType.h2}>
            A slow computer is only <Warm>the symptom</Warm>.
          </h2>
          <p data-a className={deckType.lead}>
            The real danger is underneath. Popups, freezing, unknown apps, weak Wi-Fi, and expired
            antivirus usually mean malware, spyware, unsafe browsing, and identity-theft risk hiding
            below the surface.
          </p>
        </div>
        <SymptomVisual />
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3 — Why not normal tech support                                             */
/* -------------------------------------------------------------------------- */

function RepairVisual() {
  const exposed: {
    icon: LucideIcon;
    text: string;
    left: string;
    top: string;
    x: number;
    y: number;
  }[] = [
    { icon: Wifi, text: 'Wi-Fi · unsecured', left: '17%', top: '17.5%', x: 17, y: 14 },
    { icon: Mail, text: 'Email · unprotected', left: '83%', top: '17.5%', x: 83, y: 14 },
    { icon: Globe, text: 'Browser · unsafe', left: '17%', top: '82.5%', x: 17, y: 66 },
    { icon: Cloud, text: 'Cloud · exposed', left: '83%', top: '82.5%', x: 83, y: 66 },
  ];
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[min(100%,32rem,72vh)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {exposed.map(({ x, y, text }) => (
          <line
            key={text}
            x1="50"
            y1="40"
            x2={x}
            y2={y}
            stroke="rgb(251 113 133 / 0.55)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className={styles.flow}
          />
        ))}
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.45),transparent)] blur-2xl"
      />
      <At left="50%" top="48%" className="w-[38%]">
        <div data-a className="relative">
          <div aria-hidden="true">
            <Laptop>
              <HealthyScreen />
            </Laptop>
          </div>
          <p className="absolute -bottom-9 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-[0.78rem] font-bold text-emerald-200">
            <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
            Fixed
          </p>
        </div>
      </At>
      <ul aria-label="Still exposed">
        {exposed.map(({ icon: Icon, text, left, top }) => (
          <At key={text} as="li" left={left} top={top}>
            <div
              data-a
              className="flex w-[9.2rem] flex-col items-center gap-1.5 rounded-2xl border border-rose-300/25 bg-[#2a0b1b]/75 px-3 py-3 text-center backdrop-blur-md"
            >
              <Icon aria-hidden="true" className="h-6 w-6 text-rose-300" />
              <span className="text-[0.8rem] font-semibold leading-tight text-rose-100">
                {text}
              </span>
            </div>
          </At>
        ))}
      </ul>
    </div>
  );
}

export function SlideRepair() {
  const points = [
    'One device fixed, everything else unprotected',
    'No view of your wider digital life',
    'Pay again when the issue returns',
  ];
  return (
    <Frame>
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Why not normal tech support</Eyebrow>
          <h2 data-a className={deckType.h2}>
            A one-time repair doesn’t <Spectrum>protect your digital life</Spectrum>.
          </h2>
          <p data-a className={deckType.lead}>
            Basic support may fix the laptop — but your Wi-Fi, email, browser, cloud, and identity
            stay unsecured, and the next problem comes back.
          </p>
          <ul className="mt-7 space-y-3 short:mt-5">
            {points.map((point) => (
              <li
                data-a
                key={point}
                className="flex items-center gap-3 text-[1.02rem] font-medium text-white/90"
              >
                <Cross />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <RepairVisual />
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4 — What we do differently                                                  */
/* -------------------------------------------------------------------------- */

export function SlideEnvironment() {
  const covered: { icon: LucideIcon; text: string; g: string }[] = [
    { icon: LaptopIcon, text: 'Computer', g: G.blue },
    { icon: Wifi, text: 'Wi-Fi', g: G.cyan },
    { icon: Mail, text: 'Email', g: G.amber },
    { icon: Fingerprint, text: 'Identity', g: G.violet },
    { icon: Cloud, text: 'Backup', g: G.indigo },
    { icon: Headset, text: 'Expert', g: G.green },
  ];
  const layers: { icon: LucideIcon; text: string; g: string }[] = [
    { icon: BrickWall, text: 'Firewall Protection', g: G.blue },
    { icon: Bug, text: 'Malware Protection', g: G.rose },
    { icon: ScanEye, text: 'Spyware Protection', g: G.teal },
    { icon: IdCard, text: 'Identity Security', g: G.violet },
    { icon: Headset, text: '24/7 Support', g: G.green },
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center text-center">
        <Eyebrow>What we do differently</Eyebrow>
        <h2 data-a className={deckType.h2}>
          We protect the <Spectrum>complete digital environment</Spectrum>.
        </h2>
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[44rem] short:mt-3')}>
          Computer care, firewall, malware &amp; spyware protection, identity security, email/web
          safety, and human support — working together as one system.
        </p>

        <div className="relative mt-6 w-full max-w-[min(100%,54rem,92vh)] short:mt-3">
          <div className="relative aspect-[10/7] sm:aspect-[10/3.3]">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id="dome-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7C3AED" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#2563EB" stopOpacity="0.04" />
                </linearGradient>
                <linearGradient id="dome-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#60A5FA" />
                  <stop offset="0.5" stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
              </defs>
              <path d="M2 100 C2 30 24 2 50 2 C76 2 98 30 98 100 Z" fill="url(#dome-fill)" />
              <path
                d="M2 100 C2 30 24 2 50 2 C76 2 98 30 98 100"
                fill="none"
                stroke="url(#dome-stroke)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/25" />
            <At left="50%" top="22%" className="w-[12%] sm:w-[7.5%]">
              <div data-a aria-hidden="true">
                <div className={styles.float}>
                  <ShieldMark
                    id="dome"
                    className="w-full drop-shadow-[0_12px_26px_rgb(124_58_237/0.7)]"
                  />
                </div>
              </div>
            </At>
            <ul
              aria-label="Protected"
              className="absolute inset-x-[8%] bottom-[7%] grid grid-cols-3 gap-y-3 sm:inset-x-[9%] sm:grid-cols-6"
            >
              {covered.map(({ icon, text, g }) => (
                <li data-a key={text} className="flex flex-col items-center gap-2">
                  <IconTile
                    icon={icon}
                    gradient={g}
                    className="h-11 w-11 rounded-2xl sm:h-12 sm:w-12 short:h-10 short:w-10"
                    iconClassName="h-5 w-5"
                  />
                  <span className="text-sm font-semibold text-white">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5 short:mt-4">
          {layers.map(({ icon, text, g }) => (
            <Chip key={text} icon={icon} gradient={g}>
              {text}
            </Chip>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 5 — Performance and setup value                                             */
/* -------------------------------------------------------------------------- */

function BeforeAfter() {
  const before = [
    'Slow startup',
    'Full storage',
    'Background apps',
    'Browser junk',
    'Software errors',
    'Bloatware',
  ];
  const after = [
    'Clean startup',
    'Freed storage',
    'Updated OS',
    'Secured browser',
    'Email ready',
    'Antivirus active',
  ];
  return (
    <div className="relative mx-auto grid w-full max-w-[34rem] grid-cols-[1fr_auto_1fr] items-center gap-2.5 sm:gap-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] -bottom-8 h-16 rounded-full bg-[radial-gradient(closest-side,rgb(16_185_129/0.35),transparent)] blur-xl"
      />
      <div
        data-a
        className="relative rounded-2xl border border-rose-300/20 bg-white/[0.04] backdrop-blur-md"
      >
        <div className="flex items-center justify-between rounded-t-2xl border-b border-rose-300/15 bg-rose-500/10 px-4 py-3">
          <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.16em] text-rose-100">
            Before
          </h3>
          <Gauge aria-hidden="true" className="h-4 w-4 text-rose-300" />
        </div>
        <ul className="space-y-2.5 p-3.5 sm:p-4">
          {before.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.82rem] font-medium text-white/80 sm:text-[0.9rem]"
            >
              <Cross />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div data-a>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-spectrum text-white shadow-glow sm:h-12 sm:w-12">
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <div
        data-a
        className="relative rounded-2xl border border-emerald-300/30 bg-white/[0.07] shadow-[0_30px_60px_-30px_rgb(16_185_129/0.7)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between rounded-t-2xl border-b border-emerald-300/15 bg-emerald-400/10 px-4 py-3">
          <h3 className="text-[0.74rem] font-bold uppercase tracking-[0.16em] text-emerald-100">
            After
          </h3>
          <Rocket aria-hidden="true" className="h-4 w-4 text-emerald-300" />
        </div>
        <ul className="space-y-2.5 p-3.5 sm:p-4">
          {after.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.82rem] font-medium text-white sm:text-[0.9rem]"
            >
              <Tick />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SlidePerformance() {
  return (
    <Frame>
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow tone="good">Performance &amp; setup value</Eyebrow>
          <h2 data-a className={deckType.h2}>
            Fast, clean, and <Spectrum>properly configured</Spectrum>.
          </h2>
          <p data-a className={deckType.lead}>
            Optimization is more than speed. We tune the OS, free storage, update software, secure
            the browser and email, remove bloatware, and set up new devices for safe daily use.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5 short:mt-5">
            <Chip icon={Gauge} gradient={G.blue}>
              PC Optimization &amp; OS Tune-Up
            </Chip>
            <Chip icon={MonitorSmartphone} gradient={G.rose}>
              Software Setup &amp; New Device Setup
            </Chip>
          </ul>
        </div>
        <BeforeAfter />
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 6 — When it's already infected                                              */
/* -------------------------------------------------------------------------- */

function InfectionVisual() {
  const bugs = [
    ['18%', '26%'],
    ['62%', '20%'],
    ['36%', '58%'],
    ['78%', '54%'],
    ['24%', '72%'],
  ] as const;
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,32rem)]">
      <div data-a aria-hidden="true" className="mx-auto w-[min(86%,40vh*1.6)]">
        <div className="relative aspect-[16/10] rounded-2xl border border-white/15 bg-gradient-to-b from-[#1b2559] to-[#0b1130] p-[3.5%] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)]">
          <div className="relative h-full overflow-hidden rounded-xl">
            {/* Infected */}
            <div
              className={cn(
                'absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#5b0f2a,#1a0612_75%)]',
                styles.phase1,
              )}
            >
              {bugs.map(([left, top], i) => (
                <Bug
                  key={`${left}-${top}`}
                  className={cn('absolute h-[16%] w-auto text-rose-400', styles.blink)}
                  style={{ left, top, animationDelay: `${i * 0.25}s` }}
                />
              ))}
              <span className="absolute bottom-[7%] left-[5%] rounded-full bg-rose-500/30 px-2 py-0.5 text-[clamp(8px,0.9vw,12px)] font-bold text-rose-100">
                Threats detected
              </span>
            </div>
            {/* Cleaned */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-b from-[#0b1d4a] to-[#0a1030]',
                styles.phase2,
              )}
            >
              <span
                className={cn(
                  'absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_22px_6px_rgb(56_189_248/0.55)]',
                  styles.scan,
                )}
              />
              <span className="absolute bottom-[7%] left-[5%] rounded-full bg-sky-400/25 px-2 py-0.5 text-[clamp(8px,0.9vw,12px)] font-bold text-sky-100">
                Removing threats…
              </span>
            </div>
            {/* Protected */}
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#065f46,#03211a_75%)]',
                styles.phase3,
              )}
            >
              <ShieldCheck className="h-[46%] w-auto text-emerald-300" strokeWidth={1.8} />
              <span className="absolute bottom-[7%] left-[5%] rounded-full bg-emerald-400/25 px-2 py-0.5 text-[clamp(8px,0.9vw,12px)] font-bold text-emerald-100">
                Protected
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto h-4 w-[14%] bg-gradient-to-b from-[#334155] to-[#1e293b]" />
        <div className="mx-auto h-1.5 w-[34%] rounded-full bg-[#334155]" />
      </div>
      <ul
        aria-label="Repair stages"
        className="mt-6 flex flex-wrap justify-center gap-2.5 short:mt-4"
      >
        {[
          {
            text: 'Infected',
            dot: 'bg-rose-500',
            ring: 'border-rose-300/30 bg-rose-500/15 text-rose-100',
            anim: styles.pill1,
          },
          {
            text: 'Cleaned',
            dot: 'bg-sky-400',
            ring: 'border-sky-300/30 bg-sky-500/15 text-sky-100',
            anim: styles.pill2,
          },
          {
            text: 'Protected',
            dot: 'bg-emerald-400',
            ring: 'border-emerald-300/30 bg-emerald-500/15 text-emerald-100',
            anim: styles.pill3,
          },
        ].map(({ text, dot, ring, anim }) => (
          <li data-a key={text}>
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold',
                ring,
                anim,
              )}
            >
              <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', dot)} />
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SlideInfected() {
  return (
    <Frame>
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:order-2">
          <Eyebrow tone="danger">When it’s already infected</Eyebrow>
          <h2 data-a className={deckType.h2}>
            We remove the threat <Spectrum>and repair the damage</Spectrum>.
          </h2>
          <p data-a className={deckType.lead}>
            Scanning isn’t enough. We remove malware, spyware, adware, popups and browser hijacks,
            repair the OS, and reconfigure protection.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5 short:mt-5">
            <Chip icon={Bug} gradient={G.blue}>
              Malware &amp; Spyware removed
            </Chip>
            <Chip icon={Wrench} gradient={G.rose}>
              OS Repair
            </Chip>
            <Chip icon={ShieldCheck} gradient={G.green}>
              Protection restored
            </Chip>
          </ul>
        </div>
        <InfectionVisual />
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 7 — Why not just antivirus                                                  */
/* -------------------------------------------------------------------------- */

export function SlideAntivirus() {
  const exposed: { icon: LucideIcon; text: string }[] = [
    { icon: Wifi, text: 'Wi-Fi' },
    { icon: Mail, text: 'Email' },
    { icon: Globe, text: 'Web browser' },
    { icon: Fingerprint, text: 'Identity' },
    { icon: Settings2, text: 'Weak settings' },
    { icon: Headset, text: 'Support gap' },
  ];
  const covered = [
    'Antivirus',
    'Firewall Protection',
    'Email / Web Protection',
    'Identity Security',
    '24/7 Support',
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center">
        <Eyebrow>Why not just antivirus</Eyebrow>
        <h2 data-a className={cn(deckType.h2, 'max-w-[60rem] text-center')}>
          Antivirus protects <Warm>one device</Warm>. {deckBrand.short} protects{' '}
          <Spectrum>every entry point</Spectrum>.
        </h2>
        <div className="mt-8 grid w-full max-w-[64rem] items-center gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 short:mt-5">
          <div
            data-a
            className="rounded-[1.6rem] border border-rose-300/20 bg-rose-500/[0.07] p-5 sm:p-6 short:py-4"
          >
            <div className="flex items-center gap-3.5">
              <span className="relative">
                <IconTile
                  icon={LaptopIcon}
                  gradient={G.slate}
                  className="h-12 w-12 rounded-2xl"
                  iconClassName="h-6 w-6"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#1a0c1e]"
                >
                  <ShieldCheck className="h-3 w-3 text-white" />
                </span>
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Antivirus alone</h3>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-rose-300">
                  Protects one device only
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-white/70 short:mt-3">Still exposed:</p>
            <ul className="mt-2.5 space-y-1.5">
              {exposed.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-2 short:py-1.5"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-rose-300" />
                  <span className="flex-1 text-[0.92rem] font-medium text-rose-50">{text}</span>
                  <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-rose-200">
                    exposed
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-a className="mx-auto">
            <span className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:rotate-0">
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </div>

          <div data-a>
            <SpectrumBorder innerClassName="p-5 sm:p-6 short:py-4">
              <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-spectrum px-3 py-1 text-[0.74rem] font-bold text-white shadow-glow">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                Every entry point closed
              </p>
              <div className="flex items-center gap-3.5">
                <ShieldMark id="entry" className="h-12 w-auto" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {deckBrand.short} protection
                  </h3>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-emerald-300">
                    Closes every entry point
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold text-white/70 short:mt-3">All covered:</p>
              <ul className="mt-2.5 space-y-1.5">
                {covered.map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2 short:py-1.5"
                  >
                    <Tick />
                    <span className="text-[0.92rem] font-medium text-white">{text}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 rounded-xl bg-emerald-400/10 px-3 py-2 ring-1 ring-emerald-300/25 short:py-1.5">
                  <InfinityIcon aria-hidden="true" className="h-5 w-5 text-emerald-300" />
                  <span className="text-[0.92rem] font-semibold text-emerald-200">
                    Unlimited active coverage
                  </span>
                </li>
              </ul>
            </SpectrumBorder>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 8 — What makes Visio stronger                                               */
/* -------------------------------------------------------------------------- */

interface SuiteItem {
  name: string;
  sub: string;
  icon: LucideIcon;
  g: string;
  angle: number;
  /** Named security platform rather than a capability. */
  platform?: boolean;
}

const suite: SuiteItem[] = [
  {
    name: 'SonicWall NSA',
    sub: 'Firewall',
    icon: BrickWall,
    g: G.indigo,
    angle: -90,
    platform: true,
  },
  {
    name: 'Barracuda',
    sub: 'Email/Web Security',
    icon: MailCheck,
    g: G.blue,
    angle: -50,
    platform: true,
  },
  { name: 'Advanced', sub: 'Firewall', icon: BrickWall, g: G.cyan, angle: -10 },
  { name: 'Spyware', sub: 'Protection', icon: ScanEye, g: G.teal, angle: 30 },
  { name: '24/7', sub: 'Support', icon: Headset, g: G.green, angle: 70 },
  { name: 'Identity', sub: 'Security', icon: IdCard, g: G.amber, angle: 110 },
  { name: 'Malware', sub: 'Protection', icon: Bug, g: G.rose, angle: 150 },
  { name: 'Antivirus', sub: 'Endpoint Protection', icon: ShieldCheck, g: G.violet, angle: 190 },
  { name: 'Cisco', sub: 'Network Security', icon: Router, g: G.pink, angle: 230, platform: true },
];

/** Position on the orbit ellipse, as percentages of the diagram box. */
function orbitPoint(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + 41 * Math.cos(rad), y: 50 + 40 * Math.sin(rad) };
}

function SuiteNode({ item, compact }: { item: SuiteItem; compact?: boolean }) {
  return (
    <div
      data-a
      className={cn(
        'flex items-center gap-2 rounded-xl border bg-[#0d1330]/90 py-1.5 pl-1.5 pr-3 text-left shadow-[0_12px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur-md',
        item.platform ? 'border-violet-300/40' : 'border-white/10',
        compact ? 'w-full' : 'whitespace-nowrap',
      )}
    >
      <IconTile
        icon={item.icon}
        gradient={item.g}
        className="h-8 w-8 rounded-lg"
        iconClassName="h-4 w-4"
      />
      <span className="leading-tight">
        <span className="block text-[0.84rem] font-bold text-white">{item.name}</span>
        <span className="block text-[0.7rem] font-medium text-white/65">{item.sub}</span>
      </span>
    </div>
  );
}

/**
 * Shield over devices at the centre of the suite diagram. Rendered twice (orbit
 * and phone layouts), so each copy needs its own `id` for the SVG gradients — a
 * gradient defined inside the hidden copy would not paint the visible one.
 */
function SuiteCore({ id, className }: { id: string; className?: string }) {
  return (
    <div data-a className={cn('flex flex-col items-center', className)}>
      <div aria-hidden="true" className="relative w-[clamp(2.6rem,min(6vw,8vh),4.6rem)]">
        <div className={styles.float}>
          <ShieldMark id={id} className="w-full drop-shadow-[0_14px_30px_rgb(124_58_237/0.7)]" />
        </div>
      </div>
      <div aria-hidden="true" className="mt-2 flex items-end gap-1.5">
        <Laptop className="w-[clamp(4rem,min(8vw,11vh),6.5rem)]">
          <HealthyScreen />
        </Laptop>
        <span className="mb-[6%] block aspect-[9/16] w-[clamp(1rem,min(1.8vw,2.6vh),1.5rem)] rounded-[4px] border border-white/20 bg-gradient-to-b from-[#1b2559] to-[#0b1130]" />
      </div>
      <p className="mt-2.5 text-[0.82rem] font-semibold text-white/85">
        Your devices, fully protected
      </p>
    </div>
  );
}

export function SlideSuite() {
  const mobileOrder = [0, 8, 1, 7, 2, 6, 3, 5, 4]
    .map((i) => suite[i])
    .filter((item): item is SuiteItem => Boolean(item));
  return (
    <Frame>
      <div className="flex w-full flex-col items-center text-center">
        <Eyebrow>What makes {deckBrand.short} stronger</Eyebrow>
        <h2 data-a className={deckType.h2}>
          Complete Security Suite, <Spectrum>not just computer repair</Spectrum>.
        </h2>
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[44rem] short:mt-3')}>
          Serious security tools —{' '}
          <strong className="font-semibold text-white">SonicWall NSA</strong>,{' '}
          <strong className="font-semibold text-white">Cisco</strong>, and{' '}
          <strong className="font-semibold text-white">Barracuda</strong> — combined with endpoint
          protection and unlimited expert support.
        </p>

        {/* Orbit diagram (tablet and up) */}
        <div className="relative mt-5 hidden w-full max-w-[min(100%,60rem,96vh)] sm:block short:mt-2">
          <div className="relative aspect-[2.2/1]">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-x-[9%] inset-y-[10%] rounded-[50%] border border-white/10" />
              <div className="absolute inset-x-[22%] inset-y-[24%] rounded-[50%] border border-white/[0.07]" />
              <div className="absolute inset-x-[32%] inset-y-[33%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(124_58_237/0.35),transparent)]" />
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {suite.map((item) => {
                  const p = orbitPoint(item.angle);
                  return (
                    <line
                      key={item.name + item.sub}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke="rgb(165 180 252 / 0.22)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>
            </div>
            <At left="50%" top="51%">
              <SuiteCore id="suite-orbit" />
            </At>
            <ul aria-label="Security suite">
              {suite.map((item) => {
                const p = orbitPoint(item.angle);
                return (
                  <At key={item.name + item.sub} as="li" left={`${p.x}%`} top={`${p.y}%`}>
                    <SuiteNode item={item} />
                  </At>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Stacked list (phones) */}
        <div className="mt-6 w-full sm:hidden">
          <SuiteCore id="suite-stack" />
          <ul aria-label="Security suite" className="mt-5 grid grid-cols-2 gap-2">
            {mobileOrder.map((item) => (
              <li key={item.name + item.sub}>
                <SuiteNode item={item} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 9 — Why it's better                                                         */
/* -------------------------------------------------------------------------- */

export function SlideCompare() {
  const basicKinds = [
    'Best Buy-style',
    'Geek Squad-style',
    'Local tech support',
    'Basic antivirus',
  ];
  const basic = [
    'One-time fix',
    'Device only',
    'Pay again when the issue returns',
    'Limited security view',
  ];
  const ours = [
    'Unlimited service during active coverage',
    'Full-environment protection',
    'Firewall + malware + spyware + identity',
    '24/7 support',
    'Security suite, not just repair',
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center">
        <Eyebrow>Why it’s better</Eyebrow>
        <h2 data-a className={cn(deckType.h2, 'max-w-[58rem] text-center')}>
          Basic support is a <Warm>one-time fix</Warm>. {deckBrand.short} is{' '}
          <Spectrum>ongoing protection</Spectrum>.
        </h2>
        <div className="mt-9 grid w-full max-w-[64rem] items-center gap-5 lg:grid-cols-[1fr_auto_1.08fr] lg:gap-6 short:mt-6">
          <div
            data-a
            className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7"
          >
            <h3 className="font-display text-xl font-bold text-white/85">
              Basic / one-time support
            </h3>
            <ul aria-label="For example" className="mt-4 flex flex-wrap gap-2">
              {basicKinds.map((kind) => (
                <li
                  key={kind}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[0.78rem] font-medium text-white/70"
                >
                  {kind}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-3">
              {basic.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[0.98rem] text-white/70">
                  <Minus aria-hidden="true" className="h-4 w-4 shrink-0 text-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-a className="mx-auto">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-spectrum font-display text-base font-extrabold text-white shadow-glow">
              vs
            </span>
          </div>

          <div data-a>
            <SpectrumBorder innerClassName="p-6 sm:p-7">
              <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-spectrum px-3 py-1 text-[0.74rem] font-bold text-white shadow-glow">
                <InfinityIcon aria-hidden="true" className="h-3.5 w-3.5" />
                Unlimited active coverage
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold text-white">
                {deckBrand.full}
              </h3>
              <ul className="mt-5 space-y-3">
                {ours.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[0.98rem] font-medium text-white"
                  >
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </SpectrumBorder>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 10 — Choose your coverage                                                   */
/* -------------------------------------------------------------------------- */

function TermRing({ share, id }: { share: number | 'full'; id: string }) {
  const r = 18;
  const length = 2 * Math.PI * r;
  const full = share === 'full';
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-12 w-12 items-center justify-center short:h-10 short:w-10"
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient
            id={`term-${id}`}
            x1="0"
            y1="0"
            x2="44"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60A5FA" />
            <stop offset="0.6" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={`url(#term-${id})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${full ? length : length * share} ${length}`}
        />
      </svg>
      {full ? <InfinityIcon className="h-5 w-5 text-white" /> : null}
    </span>
  );
}

export function SlideCoverage() {
  const terms = [
    {
      term: '1-Year',
      tagline: 'Start protected',
      support: 'Unlimited support during active coverage',
      share: 0.3 as const,
    },
    {
      term: '5-Year',
      tagline: 'Long-term peace of mind',
      support: 'Unlimited support during active coverage',
      share: 0.72 as const,
    },
    {
      term: 'Lifetime',
      tagline: 'Permanent protection confidence',
      support: 'Unlimited support during active coverage, for life',
      share: 'full' as const,
    },
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center text-center">
        <Eyebrow>Choose your coverage</Eyebrow>
        <h2 data-a className={cn(deckType.h2, 'max-w-[56rem]')}>
          Don’t just fix the computer. <Spectrum>Protect it for the long term.</Spectrum>
        </h2>
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[40rem] short:mt-3')}>
          Pick the term that fits the device, usage, security need, and budget — your protection
          stays active the whole time.
        </p>
        <p
          data-a
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200 short:mt-3 short:py-1.5"
        >
          <InfinityIcon aria-hidden="true" className="h-4 w-4" />
          Unlimited support during active coverage
        </p>

        <ul className="mt-8 grid w-full max-w-[60rem] gap-4 sm:grid-cols-3 sm:gap-5 short:mt-4">
          {terms.map(({ term, tagline, support, share }) => {
            const featured = share === 'full';
            const body = (
              <div className="flex h-full flex-col items-start p-5 text-left sm:p-6 short:py-3.5">
                <div className="flex w-full items-center justify-between">
                  <TermRing share={share} id={term} />
                  {featured ? (
                    <span className="rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-white">
                      Best value
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-[1.75rem] font-extrabold leading-none text-white short:mt-2 short:text-[1.5rem]">
                  {term}
                  <span className="mt-1.5 block font-sans text-sm font-medium tracking-normal text-white/60">
                    Protection
                  </span>
                </h3>
                <p className="mt-4 font-semibold text-sky-200 short:mt-1.5">{tagline}</p>
                <p className="mt-auto flex items-start gap-2 pt-4 text-[0.86rem] font-medium text-emerald-200 short:pt-2">
                  <InfinityIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {support}
                </p>
              </div>
            );
            return (
              <li data-a key={term} className="h-full">
                {featured ? (
                  <SpectrumBorder className="h-full">{body}</SpectrumBorder>
                ) : (
                  <div className="h-full rounded-[1.6rem] border border-white/10 bg-white/[0.045] backdrop-blur-md">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p
          data-a
          className="mt-6 max-w-[56rem] text-[0.86rem] leading-relaxed text-white/70 short:mt-3"
        >
          Every term includes PC Care · Antivirus · Firewall · Identity Security · 24/7 Support
          <span aria-hidden="true" className="mx-2 hidden sm:inline">
            ·
          </span>
          <br className="sm:hidden" />
          Powered by <strong className="font-semibold text-white">SonicWall NSA</strong> ·{' '}
          <strong className="font-semibold text-white">Cisco</strong> ·{' '}
          <strong className="font-semibold text-white">Barracuda</strong>
        </p>
      </div>
    </Frame>
  );
}

/** Slide components in presentation order; matches `deckSlides`. */
export const slideComponents = [
  SlideHero,
  SlideSymptom,
  SlideRepair,
  SlideEnvironment,
  SlidePerformance,
  SlideInfected,
  SlideAntivirus,
  SlideSuite,
  SlideCompare,
  SlideCoverage,
] as const;
