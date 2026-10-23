import Link from 'next/link';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

/**
 * Wordmark with a "connected capabilities" mark: four nodes in the four pillar
 * colours (software blue, AI violet, security teal, growth orange) joined on a
 * spectrum tile. A real SVG glyph, so it scales crisply and needs no asset.
 *
 * `idSuffix` keeps the SVG gradient id unique when the logo appears more than
 * once on a page (header and footer).
 */
export function Logo({
  className,
  tone = 'default',
  idSuffix = 'main',
}: {
  className?: string;
  tone?: 'default' | 'onDark';
  idSuffix?: string;
}) {
  const gradientId = `logo-spectrum-${idSuffix}`;
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      aria-label={`${company.name} — home`}
    >
      <span
        aria-hidden="true"
        className="inline-flex transition-transform duration-500 ease-natural group-hover:rotate-[8deg] group-hover:scale-105"
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none" role="presentation">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2563EB" />
              <stop offset="0.5" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#DB2777" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
          <path
            d="M10 10 L22 10 M10 10 L10 22 M10 22 L22 22 M22 10 L22 22 M10 10 L22 22"
            stroke="#fff"
            strokeWidth="1.3"
            strokeOpacity="0.6"
          />
          <circle cx="10" cy="10" r="2.9" fill="#fff" />
          <circle cx="22" cy="10" r="2.9" fill="#A5F3FC" />
          <circle cx="10" cy="22" r="2.9" fill="#FDBA74" />
          <circle cx="22" cy="22" r="2.9" fill="#6EE7B7" />
        </svg>
      </span>
      <span
        className={cn(
          'font-display text-[1.15rem] font-extrabold tracking-tight',
          tone === 'onDark' ? 'text-white' : 'text-foreground',
        )}
      >
        Visio<span className={tone === 'onDark' ? 'text-white/70' : 'text-subtle-foreground'}> Solutions</span>
      </span>
    </Link>
  );
}
