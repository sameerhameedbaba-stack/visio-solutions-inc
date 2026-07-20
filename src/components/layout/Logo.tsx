import Link from 'next/link';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

/**
 * Text wordmark with a small custom "connected layers" mark. Uses a real SVG
 * glyph rather than a placeholder image, so it scales crisply and needs no asset.
 */
export function Logo({
  className,
  tone = 'default',
}: {
  className?: string;
  tone?: 'default' | 'onDark';
}) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      aria-label={`${company.name} — home`}
    >
      <span aria-hidden="true" className="inline-flex">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" role="presentation">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <circle cx="10" cy="10" r="2.4" fill="#fff" />
          <circle cx="22" cy="10" r="2.4" fill="#3B82F6" />
          <circle cx="10" cy="22" r="2.4" fill="#3B82F6" />
          <circle cx="22" cy="22" r="2.4" fill="#0F9F9A" />
          <path
            d="M10 10 L22 10 M10 10 L10 22 M10 22 L22 22 M22 10 L22 22 M10 10 L22 22"
            stroke="#fff"
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
        </svg>
      </span>
      <span
        className={cn(
          'text-lg font-bold tracking-tight',
          tone === 'onDark' ? 'text-white' : 'text-foreground',
        )}
      >
        Visio Solutions
      </span>
    </Link>
  );
}
