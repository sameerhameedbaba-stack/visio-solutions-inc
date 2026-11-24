import {
  ArrowRight,
  BrickWall,
  Bug,
  Check,
  Fingerprint,
  Globe,
  Headset,
  IdCard,
  Infinity as InfinityIcon,
  Mail,
  MailCheck,
  Minus,
  Router,
  ScanEye,
  Settings2,
  ShieldCheck,
  ShieldOff,
  TriangleAlert,
  UserX,
  Wifi,
  WifiOff,
  type LucideIcon,
} from 'lucide-react';
import { deckBrand } from '@/content/summary';
import { cn } from '@/lib/utils';
import {
  Chip,
  Cross,
  Emoji,
  Eyebrow,
  Highlighted,
  IconTile,
  Spectrum,
  Tick,
  Warm,
  card,
  deckType,
  type EmojiName,
} from './parts';
import styles from './deck.module.css';

/*
 * The ten slides of the /summary deck (bright theme), in order. Elements marked
 * `data-a` animate in when their slide is shown (see SummaryDeck). `data-a` is
 * only put on elements without their own transform classes or transform
 * animations, so the entrance tween never fights a position offset.
 */

/** Icon-tile gradients, dark enough that the white icon keeps 3:1 contrast. */
const G = {
  blue: 'from-blue-500 to-blue-700',
  indigo: 'from-indigo-500 to-indigo-700',
  violet: 'from-violet-500 to-purple-700',
  pink: 'from-pink-500 to-fuchsia-700',
  red: 'from-red-500 to-red-700',
  amber: 'from-amber-500 to-orange-600',
  teal: 'from-teal-500 to-emerald-700',
  green: 'from-emerald-500 to-green-700',
  cyan: 'from-cyan-600 to-sky-700',
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

/** A picture in a white rounded tile with a label under it. */
function Tile({ emoji, label }: { emoji: EmojiName; label: string }) {
  return (
    <div data-a className="flex flex-col items-center gap-1.5 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_12px_24px_-14px_rgb(15_23_42/0.45)] short:h-12 short:w-12">
        <Emoji name={emoji} className="h-10 w-10 short:h-9 short:w-9" />
      </span>
      <span className="text-sm font-bold leading-tight text-slate-900">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1 — Premium computer care                                                   */
/* -------------------------------------------------------------------------- */

function HeroVisual() {
  const chips = [
    { label: 'Secure', dot: 'bg-blue-600', left: '18%', top: '15%' },
    { label: 'Fast', dot: 'bg-emerald-600', left: '84%', top: '21%' },
    { label: 'Supported', dot: 'bg-teal-600', left: '15%', top: '86%' },
    { label: 'Protected', dot: 'bg-violet-600', left: '85%', top: '85%' },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,31rem,62vh)]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-[4%] rounded-full border-2 border-dashed border-slate-200" />
        <div className="absolute inset-[14%] rounded-full border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-violet-50 shadow-[0_40px_80px_-40px_rgb(37_99_235/0.45)]" />
        <div
          className={cn(
            'absolute inset-[24%] rounded-full bg-[radial-gradient(closest-side,rgb(96_165_250/0.45),transparent)]',
            styles.pulse,
          )}
        />
        <At left="50%" top="60%" className="w-[44%]">
          <div data-a>
            <Emoji name="laptop" className="w-full drop-shadow-[0_18px_24px_rgb(15_23_42/0.18)]" />
          </div>
        </At>
        <At left="50%" top="31%" className="w-[30%]">
          <div data-a>
            <div className={styles.float}>
              <Emoji
                name="shield"
                className="w-full drop-shadow-[0_18px_28px_rgb(37_99_235/0.35)]"
              />
            </div>
          </div>
        </At>
      </div>
      <ul aria-label="What is covered">
        <At as="li" left="12%" top="54%">
          <Tile emoji="antenna" label="Wi-Fi" />
        </At>
        <At as="li" left="88%" top="54%">
          <Tile emoji="email" label="Email" />
        </At>
        <At as="li" left="50%" top="91%">
          <div data-a className="flex flex-col items-center gap-1.5">
            <IconTile
              icon={Fingerprint}
              gradient={G.violet}
              className="h-14 w-14 rounded-2xl short:h-12 short:w-12"
              iconClassName="h-7 w-7"
            />
            <span className="text-sm font-bold text-slate-900">Identity</span>
          </div>
        </At>
        {chips.map(({ label, dot, left, top }) => (
          <At key={label} as="li" left={left} top={top}>
            <span
              data-a
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.95rem] font-bold text-slate-800 shadow-[0_12px_26px_-16px_rgb(15_23_42/0.5)]"
            >
              <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', dot)} />
              {label}
            </span>
          </At>
        ))}
      </ul>
    </div>
  );
}

export function SlideHero() {
  const points: { emoji: EmojiName; text: string }[] = [
    { emoji: 'voltage', text: 'Care & optimization for every device' },
    { emoji: 'shield', text: 'Firewall, antivirus, identity & email protection' },
    { emoji: 'headphone', text: '24/7 experts, unlimited during coverage' },
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
            {points.map(({ emoji, text }) => (
              <li data-a key={text} className={cn('flex items-center gap-3', deckType.item)}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <Emoji name={emoji} className="h-7 w-7" />
                </span>
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

function SymptomVisual() {
  const symptoms: { icon: LucideIcon; text: string; left: string; top: string }[] = [
    { icon: TriangleAlert, text: 'Not responding…', left: '50%', top: '4%' },
    { icon: WifiOff, text: 'Weak Wi-Fi · unsecured', left: '20%', top: '52%' },
    { icon: Globe, text: 'Browser · unsafe', left: '82%', top: '40%' },
    { icon: ShieldOff, text: 'Antivirus · expired', left: '78%', top: '92%' },
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
      <p data-a className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-slate-600">
        What you see
      </p>
      <div className="relative mx-auto mt-2 aspect-[16/9] w-[min(100%,28rem,46vh*1.78)]">
        <At left="50%" top="55%" className="w-[40%]">
          <div data-a className="relative">
            <Emoji name="laptop" className="w-full" />
            <Emoji
              name="turtle"
              className={cn('absolute -bottom-[4%] -left-[16%] w-[40%]', styles.blink)}
            />
            <Emoji name="warning" className="absolute -right-[6%] top-[4%] w-[30%]" />
          </div>
        </At>
        <ul aria-label="Symptoms">
          {symptoms.map(({ icon: Icon, text, left, top }) => (
            <At key={text} as="li" left={left} top={top}>
              <span
                data-a
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[0.74rem] font-bold text-amber-900 shadow-[0_10px_20px_-14px_rgb(120_53_15/0.6)] sm:px-3 sm:py-1.5 sm:text-[0.82rem]"
              >
                <Icon aria-hidden="true" className="h-4 w-4 text-amber-700" />
                {text}
              </span>
            </At>
          ))}
        </ul>
      </div>

      <div data-a className="mt-5 flex items-center gap-3 short:mt-3">
        <span
          aria-hidden="true"
          className="h-0.5 flex-1 rounded bg-gradient-to-r from-transparent to-red-300"
        />
        <h3 className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">
          <TriangleAlert aria-hidden="true" className="h-4 w-4" />
          The real danger underneath
        </h3>
        <span
          aria-hidden="true"
          className="h-0.5 flex-1 rounded bg-gradient-to-l from-transparent to-red-300"
        />
      </div>
      <div
        data-a
        className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-2.5 shadow-[0_24px_50px_-30px_rgb(220_38_38/0.6)] short:mt-3"
      >
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {dangers.map(({ icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-white px-2.5 py-2 text-[0.92rem] font-bold leading-tight text-red-900"
            >
              <IconTile
                icon={icon}
                gradient={G.red}
                className="h-8 w-8 rounded-lg"
                iconClassName="h-4 w-4"
              />
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
    emoji: EmojiName;
    name: string;
    status: string;
    left: string;
    top: string;
    x: number;
    y: number;
  }[] = [
    {
      emoji: 'antenna',
      name: 'Wi-Fi',
      status: 'unsecured',
      left: '15%',
      top: '16%',
      x: 15,
      y: 12.8,
    },
    {
      emoji: 'email',
      name: 'Email',
      status: 'unprotected',
      left: '85%',
      top: '16%',
      x: 85,
      y: 12.8,
    },
    { emoji: 'globe', name: 'Browser', status: 'unsafe', left: '15%', top: '84%', x: 15, y: 67.2 },
    { emoji: 'cloud', name: 'Cloud', status: 'exposed', left: '85%', top: '84%', x: 85, y: 67.2 },
  ];
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[min(100%,32rem,72vh)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {exposed.map(({ x, y, name }) => (
          <line
            key={name}
            x1="50"
            y1="40"
            x2={x}
            y2={y}
            stroke="rgb(239 68 68 / 0.7)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className={styles.flow}
          />
        ))}
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-[28%] rounded-full bg-[radial-gradient(closest-side,rgb(147_197_253/0.6),transparent)]"
      />
      <At left="50%" top="46%" className="w-[36%]">
        <div data-a className="relative flex flex-col items-center">
          <Emoji name="laptop" className="w-full drop-shadow-[0_16px_22px_rgb(15_23_42/0.18)]" />
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-[0.9rem] font-bold text-emerald-800">
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
            Fixed
          </p>
        </div>
      </At>
      <ul aria-label="Still exposed">
        {exposed.map(({ emoji, name, status, left, top }) => (
          <At key={name} as="li" left={left} top={top}>
            <div
              data-a
              className="flex w-[8.6rem] flex-col items-center gap-1 rounded-2xl border-2 border-red-200 bg-white px-3 py-2.5 text-center shadow-[0_16px_30px_-20px_rgb(220_38_38/0.6)]"
            >
              <Emoji name={emoji} className="h-10 w-10" />
              <span className="text-[0.95rem] font-bold leading-tight text-slate-900">{name}</span>
              <span className="text-[0.72rem] font-bold uppercase tracking-wide text-red-700">
                {status}
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
              <li data-a key={point} className={cn('flex items-center gap-3', deckType.item)}>
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
  const covered: { emoji: EmojiName; text: string }[] = [
    { emoji: 'laptop', text: 'Computer' },
    { emoji: 'antenna', text: 'Wi-Fi' },
    { emoji: 'email', text: 'Email' },
    { emoji: 'key', text: 'Identity' },
    { emoji: 'cloud', text: 'Backup' },
    { emoji: 'headphone', text: 'Expert' },
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center text-center">
        <Eyebrow>What we do differently</Eyebrow>
        <h2 data-a className={deckType.h2}>
          We protect the <Spectrum>complete digital environment</Spectrum>.
        </h2>
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[46rem] short:mt-3')}>
          Computer care, firewall, malware &amp; spyware protection, identity security, email/web
          safety, and human support — working together as one system.
        </p>

        <div className="relative mt-6 w-full max-w-[min(100%,54rem,92vh)] short:mt-3">
          <div className="relative aspect-[10/7.4] sm:aspect-[10/3.4]">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                <linearGradient id="dome-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#DBEAFE" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#EFF6FF" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="dome-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2563EB" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#DB2777" />
                </linearGradient>
              </defs>
              <path d="M2 100 C2 30 24 2 50 2 C76 2 98 30 98 100 Z" fill="url(#dome-fill)" />
              <path
                d="M2 100 C2 30 24 2 50 2 C76 2 98 30 98 100"
                fill="none"
                stroke="url(#dome-stroke)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-slate-300"
            />
            <At left="50%" top="22%" className="w-[15%] sm:w-[9%]">
              <div data-a aria-hidden="true">
                <div className={styles.float}>
                  <Emoji
                    name="shield"
                    className="w-full drop-shadow-[0_14px_22px_rgb(37_99_235/0.35)]"
                  />
                </div>
              </div>
            </At>
            <ul
              aria-label="Protected"
              className="absolute inset-x-[7%] bottom-[6%] grid grid-cols-3 gap-y-3 sm:inset-x-[8%] sm:grid-cols-6"
            >
              {covered.map(({ emoji, text }) => (
                <li key={text}>
                  <Tile emoji={emoji} label={text} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5 short:mt-4">
          <Chip icon={BrickWall} gradient={G.blue}>
            Firewall Protection
          </Chip>
          <Chip emoji="bug">Malware Protection</Chip>
          <Chip emoji="detective">Spyware Protection</Chip>
          <Chip emoji="locked">Identity Security</Chip>
          <Chip emoji="headphone">24/7 Support</Chip>
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
    <div className="relative mx-auto grid w-full max-w-[36rem] grid-cols-[1fr_auto_1fr] items-center gap-2.5 sm:gap-4">
      <div data-a className={cn(card, 'overflow-hidden')}>
        <div className="flex items-center justify-between border-b border-red-100 bg-red-50 px-4 py-2.5">
          <h3 className="text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-red-800">
            Before
          </h3>
          <Emoji name="turtle" className="h-9 w-9" />
        </div>
        <ul className="space-y-2.5 p-3.5 sm:p-4">
          {before.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.88rem] font-semibold text-slate-800 sm:text-[0.98rem]"
            >
              <Cross className="h-5 w-5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div data-a>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-white shadow-[0_12px_24px_-10px_rgb(29_78_216/0.7)] sm:h-12 sm:w-12">
          <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
        </span>
      </div>
      <div
        data-a
        className={cn(
          card,
          'overflow-hidden border-emerald-300 shadow-[0_28px_55px_-30px_rgb(5_150_105/0.6)]',
        )}
      >
        <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-4 py-2.5">
          <h3 className="text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-emerald-800">
            After
          </h3>
          <Emoji name="rocket" className="h-9 w-9" />
        </div>
        <ul className="space-y-2.5 p-3.5 sm:p-4">
          {after.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.88rem] font-semibold text-slate-900 sm:text-[0.98rem]"
            >
              <Tick className="h-5 w-5" />
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
            <Chip emoji="voltage">PC Optimization &amp; OS Tune-Up</Chip>
            <Chip emoji="sparkles">Software Setup &amp; New Device Setup</Chip>
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
  const threats: { name: EmojiName; left: string; top: string }[] = [
    { name: 'microbe', left: '12%', top: '14%' },
    { name: 'bug', left: '60%', top: '10%' },
    { name: 'microbe', left: '36%', top: '46%' },
    { name: 'bug', left: '74%', top: '44%' },
  ];
  const stages = [
    {
      text: 'Infected',
      dot: 'bg-red-600',
      tone: 'border-red-200 bg-red-50 text-red-800',
      anim: styles.pill1,
    },
    {
      text: 'Cleaned',
      dot: 'bg-blue-600',
      tone: 'border-blue-200 bg-blue-50 text-blue-800',
      anim: styles.pill2,
    },
    {
      text: 'Protected',
      dot: 'bg-emerald-600',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      anim: styles.pill3,
    },
  ];
  const label =
    'absolute bottom-[7%] left-[5%] rounded-full bg-white px-2.5 py-1 text-[clamp(10px,0.95vw,13px)] font-bold shadow';
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,32rem)]">
      <div data-a aria-hidden="true" className="mx-auto w-[min(88%,40vh*1.6)]">
        <div className="relative aspect-[16/10] rounded-2xl bg-slate-800 p-[3%] shadow-[0_30px_60px_-28px_rgb(15_23_42/0.6)]">
          <div className="relative h-full overflow-hidden rounded-lg">
            {/* Infected */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br from-red-100 to-red-200',
                styles.phase1,
              )}
            >
              {threats.map(({ name, left, top }, i) => (
                <Emoji
                  key={`${name}-${left}`}
                  name={name}
                  className={cn('absolute w-[20%]', styles.blink)}
                  style={{ left, top, animationDelay: `${i * 0.2}s` }}
                />
              ))}
              <span className={cn(label, 'text-red-800')}>Threats detected</span>
            </div>
            {/* Cleaned */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100',
                styles.phase2,
              )}
            >
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_18px_4px_rgb(59_130_246/0.5)]',
                  styles.scan,
                )}
              />
              <Emoji name="broom" className="absolute left-[22%] top-[12%] w-[30%]" />
              <Emoji name="bubbles" className="absolute left-[54%] top-[16%] w-[26%]" />
              <span className={cn(label, 'text-blue-800')}>Removing threats…</span>
            </div>
            {/* Protected */}
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100',
                styles.phase3,
              )}
            >
              <Emoji name="shield" className="w-[34%]" />
              <Emoji name="check" className="absolute bottom-[16%] left-[56%] w-[16%]" />
              <span className={cn(label, 'text-emerald-800')}>Protected</span>
            </div>
          </div>
        </div>
        <div className="mx-auto h-5 w-[12%] bg-gradient-to-b from-slate-500 to-slate-600" />
        <div className="mx-auto h-2 w-[32%] rounded-full bg-slate-600" />
      </div>
      <ul
        aria-label="Repair stages"
        className="mt-6 flex flex-wrap justify-center gap-2.5 short:mt-4"
      >
        {stages.map(({ text, dot, tone, anim }) => (
          <li data-a key={text}>
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.95rem] font-bold',
                tone,
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
            <Chip emoji="bug">Malware &amp; Spyware removed</Chip>
            <Chip emoji="tools">OS Repair</Chip>
            <Chip emoji="check">Protection restored</Chip>
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
  const row = 'flex items-center gap-3 rounded-xl px-3 py-2 short:py-1';
  return (
    <Frame>
      <div className="flex w-full flex-col items-center">
        <Eyebrow>Why not just antivirus</Eyebrow>
        <h2 data-a className={cn(deckType.h2, 'max-w-[60rem] text-center')}>
          Antivirus protects <Warm>one device</Warm>. {deckBrand.short} protects{' '}
          <Spectrum>every entry point</Spectrum>.
        </h2>
        <div className="mt-7 grid w-full max-w-[64rem] items-center gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 short:mt-4">
          <div
            data-a
            className="rounded-[1.6rem] border border-red-200 bg-red-50/70 p-5 sm:p-6 short:py-4"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <Emoji name="laptop" className="h-10 w-10" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-slate-900">
                  Antivirus alone
                </h3>
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-red-700">
                  Protects one device only
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.95rem] font-semibold text-slate-700 short:mt-2">
              Still exposed:
            </p>
            <ul className="mt-2 space-y-1.5 short:space-y-1">
              {exposed.map(({ icon: Icon, text }) => (
                <li key={text} className={cn(row, 'border border-red-100 bg-white')}>
                  <Icon aria-hidden="true" className="h-[18px] w-[18px] text-red-700" />
                  <span className="flex-1 text-[1rem] font-semibold text-slate-900">{text}</span>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[0.72rem] font-bold uppercase tracking-wide text-red-800">
                    exposed
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-a className="mx-auto">
            <span className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-blue-700 text-white shadow-[0_12px_24px_-10px_rgb(29_78_216/0.7)] lg:rotate-0">
              <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
            </span>
          </div>

          <div data-a>
            <Highlighted innerClassName="p-5 sm:p-6 short:py-4">
              <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-blue-700 px-3.5 py-1 text-[0.8rem] font-bold text-white shadow">
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                Every entry point closed
              </p>
              <div className="flex items-center gap-3.5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-blue-50">
                  <Emoji name="shield" className="h-10 w-10" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-slate-900">
                    {deckBrand.short} protection
                  </h3>
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-emerald-700">
                    Closes every entry point
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[0.95rem] font-semibold text-slate-700 short:mt-2">
                All covered:
              </p>
              <ul className="mt-2 space-y-1.5 short:space-y-1">
                {covered.map((text) => (
                  <li key={text} className={cn(row, 'bg-slate-50')}>
                    <Tick className="h-5 w-5" />
                    <span className="text-[1rem] font-semibold text-slate-900">{text}</span>
                  </li>
                ))}
                <li className={cn(row, 'border border-emerald-200 bg-emerald-50')}>
                  <InfinityIcon aria-hidden="true" className="h-5 w-5 text-emerald-700" />
                  <span className="text-[1rem] font-bold text-emerald-800">
                    Unlimited active coverage
                  </span>
                </li>
              </ul>
            </Highlighted>
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
  { name: 'Malware', sub: 'Protection', icon: Bug, g: G.red, angle: 150 },
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
        'flex items-center gap-2 rounded-xl border-2 bg-white py-1.5 pl-1.5 pr-3 text-left shadow-[0_12px_26px_-16px_rgb(15_23_42/0.45)]',
        item.platform ? 'border-blue-300' : 'border-slate-200',
        compact ? 'w-full' : 'whitespace-nowrap',
      )}
    >
      <IconTile
        icon={item.icon}
        gradient={item.g}
        className="h-9 w-9 rounded-lg"
        iconClassName="h-[18px] w-[18px]"
      />
      <span className="leading-tight">
        <span className="block text-[0.92rem] font-extrabold text-slate-900">{item.name}</span>
        <span className="block text-[0.76rem] font-semibold text-slate-600">{item.sub}</span>
      </span>
    </div>
  );
}

/** Shield over devices at the centre of the suite diagram. */
function SuiteCore({ className }: { className?: string }) {
  return (
    <div data-a className={cn('flex flex-col items-center', className)}>
      <div aria-hidden="true" className="w-[clamp(3rem,min(6.5vw,9vh),5rem)]">
        <div className={styles.float}>
          <Emoji name="shield" className="w-full drop-shadow-[0_14px_22px_rgb(37_99_235/0.35)]" />
        </div>
      </div>
      <Emoji name="laptop" className="-mt-1 w-[clamp(3.6rem,min(7.5vw,10vh),6rem)]" />
      <p className="mt-1 rounded-full bg-white/90 px-3 py-0.5 text-[0.85rem] font-bold text-slate-800">
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
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[46rem] short:mt-3')}>
          Serious security tools —{' '}
          <strong className="font-bold text-slate-900">SonicWall NSA</strong>,{' '}
          <strong className="font-bold text-slate-900">Cisco</strong>, and{' '}
          <strong className="font-bold text-slate-900">Barracuda</strong> — combined with endpoint
          protection and unlimited expert support.
        </p>

        {/* Orbit diagram (tablet and up) */}
        <div className="relative mt-4 hidden w-full max-w-[min(100%,62rem,98vh)] sm:block short:mt-2">
          <div className="relative aspect-[2.2/1]">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-x-[9%] inset-y-[10%] rounded-[50%] border-2 border-dashed border-slate-200" />
              <div className="absolute inset-x-[24%] inset-y-[22%] rounded-[50%] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50" />
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
                      stroke="rgb(148 163 184 / 0.55)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>
            </div>
            <At left="50%" top="50%">
              <SuiteCore />
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
          <SuiteCore />
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
            className="rounded-[1.6rem] border border-slate-200 bg-slate-100/80 p-6 sm:p-7"
          >
            <div className="flex items-center gap-3">
              <Emoji name="tools" className="h-11 w-11" />
              <h3 className="font-display text-xl font-extrabold text-slate-800">
                Basic / one-time support
              </h3>
            </div>
            <ul aria-label="For example" className="mt-4 flex flex-wrap gap-2">
              {basicKinds.map((kind) => (
                <li
                  key={kind}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[0.85rem] font-semibold text-slate-700"
                >
                  {kind}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-3">
              {basic.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[1.02rem] font-medium text-slate-700"
                >
                  <Minus
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-500"
                    strokeWidth={3}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-a className="mx-auto">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 font-display text-base font-extrabold text-white shadow-[0_12px_24px_-10px_rgb(29_78_216/0.7)]">
              vs
            </span>
          </div>

          <div data-a>
            <Highlighted innerClassName="p-6 sm:p-7">
              <p className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-blue-700 px-3.5 py-1 text-[0.8rem] font-bold text-white shadow">
                <InfinityIcon aria-hidden="true" className="h-4 w-4" />
                Unlimited active coverage
              </p>
              <div className="mt-1 flex items-center gap-3">
                <Emoji name="trophy" className="h-11 w-11" />
                <h3 className="font-display text-2xl font-extrabold text-slate-900">
                  {deckBrand.full}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {ours.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[1.02rem] font-semibold text-slate-900"
                  >
                    <Tick className="h-5 w-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Highlighted>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 10 — Choose your coverage                                                   */
/* -------------------------------------------------------------------------- */

export function SlideCoverage() {
  const terms: {
    term: string;
    emoji: EmojiName;
    tagline: string;
    support: string;
    featured?: boolean;
  }[] = [
    {
      term: '1-Year',
      emoji: 'shield',
      tagline: 'Start protected',
      support: 'Unlimited support during active coverage',
    },
    {
      term: '5-Year',
      emoji: 'star',
      tagline: 'Long-term peace of mind',
      support: 'Unlimited support during active coverage',
    },
    {
      term: 'Lifetime',
      emoji: 'gem',
      tagline: 'Permanent protection confidence',
      support: 'Unlimited support during active coverage, for life',
      featured: true,
    },
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center text-center">
        <Eyebrow>Choose your coverage</Eyebrow>
        <h2 data-a className={cn(deckType.h2, 'max-w-[58rem]')}>
          Don’t just fix the computer. <Spectrum>Protect it for the long term.</Spectrum>
        </h2>
        <p data-a className={cn(deckType.lead, 'mx-auto max-w-[42rem] short:mt-3')}>
          Pick the term that fits the device, usage, security need, and budget — your protection
          stays active the whole time.
        </p>
        <p
          data-a
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[0.95rem] font-bold text-emerald-800 short:mt-2.5 short:py-1"
        >
          <InfinityIcon aria-hidden="true" className="h-5 w-5" />
          Unlimited support during active coverage
        </p>

        <ul className="mt-6 grid w-full max-w-[62rem] gap-4 sm:grid-cols-3 sm:gap-5 short:mt-3">
          {terms.map(({ term, emoji, tagline, support, featured }) => {
            const body = (
              <div className="flex h-full flex-col items-start p-5 text-left short:py-3">
                <div className="flex w-full items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 short:h-11 short:w-11">
                    <Emoji name={emoji} className="h-10 w-10 short:h-9 short:w-9" />
                  </span>
                  {featured ? (
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wide text-white">
                      Best value
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 font-display text-[1.85rem] font-extrabold leading-none text-slate-900 short:mt-2 short:text-[1.5rem]">
                  {term}
                  <span className="mt-1.5 block font-sans text-[0.95rem] font-semibold tracking-normal text-slate-600">
                    Protection
                  </span>
                </h3>
                <p className="mt-3 text-[1.02rem] font-bold text-blue-700 short:mt-1.5">
                  {tagline}
                </p>
                <p className="mt-auto flex items-start gap-2 pt-3 text-[0.92rem] font-semibold text-emerald-800 short:pt-2">
                  <InfinityIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {support}
                </p>
              </div>
            );
            return (
              <li data-a key={term} className="h-full">
                {featured ? (
                  <Highlighted className="h-full">{body}</Highlighted>
                ) : (
                  <div className={cn(card, 'h-full')}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <p
          data-a
          className="mt-5 max-w-[66rem] text-[0.95rem] leading-relaxed text-slate-700 short:mt-2.5"
        >
          Every term includes PC Care · Antivirus · Firewall · Identity Security · 24/7 Support
          <span aria-hidden="true" className="mx-2 hidden sm:inline">
            ·
          </span>
          <br className="sm:hidden" />
          Powered by <strong className="font-bold text-slate-900">SonicWall NSA</strong> ·{' '}
          <strong className="font-bold text-slate-900">Cisco</strong> ·{' '}
          <strong className="font-bold text-slate-900">Barracuda</strong>
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
