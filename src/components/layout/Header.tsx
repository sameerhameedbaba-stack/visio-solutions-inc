'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CtaButton } from '@/components/ui/CtaButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';

/**
 * Floating glass header. Fixed, so heroes can run colour underneath it; <main>
 * is padded by --header-h (globals.css) so other pages start below it.
 *
 * While it floats over an ink band (dark hero, spotlight section, footer) it
 * switches to dark glass with light text, and back to the theme's glass over
 * ordinary page surfaces — detected by probing what lies beneath it.
 */
export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [onInk, setOnInk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    function measure() {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const probeY = rect.top + rect.height / 2;
      const beneath = document
        .elementsFromPoint(window.innerWidth / 2, probeY)
        .find((el) => !header.contains(el));
      setOnInk(Boolean(beneath?.closest('.ink')));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={cn(
          'pointer-events-auto mx-auto flex max-w-wide items-center justify-between gap-4 rounded-full pl-5 pr-2.5 ring-1 backdrop-blur-xl backdrop-saturate-150 transition-[height,box-shadow,background-color] duration-500 ease-natural',
          onInk
            ? 'bg-ink/45 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] ring-white/15'
            : cn(
                'bg-surface/75',
                scrolled ? 'shadow-lift ring-border' : 'shadow-sm ring-border/60',
              ),
          scrolled ? 'h-14' : 'h-16',
        )}
      >
        <Logo idSuffix="header" tone={onInk ? 'onDark' : 'default'} />
        <DesktopNav tone={onInk ? 'onDark' : 'default'} />
        <div className="flex items-center gap-2">
          <ThemeToggle
            className={cn(
              'hidden sm:inline-flex',
              onInk && '!text-white/80 hover:!bg-white/10 hover:!text-white',
            )}
          />
          <div className="hidden lg:block">
            <CtaButton cta="strategyCall" size="md" />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden',
              onInk ? 'bg-white text-ink' : 'bg-foreground text-background',
            )}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
