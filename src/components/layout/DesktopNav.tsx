'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { primaryNav, servicesMegaMenu } from '@/content/navigation';
import { pillarIcons } from '@/components/marketing/icons';
import { pillarTheme } from '@/components/marketing/pillar-theme';
import { cn } from '@/lib/utils';

/** Desktop primary navigation with an accessible, colour-coded Services mega menu. */
export function DesktopNav({ tone = 'default' }: { tone?: 'default' | 'onDark' }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMegaOpen(false);
    }
    function onClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (active: boolean) =>
    cn(
      'relative inline-flex min-h-[40px] items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet',
      tone === 'onDark'
        ? active
          ? 'bg-white/[0.12] text-white'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
        : active
          ? 'bg-foreground/[0.06] text-foreground'
          : 'text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground',
    );

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {primaryNav.map((item) => {
          if (item.label === 'Services') {
            return (
              <li
                key={item.href}
                ref={wrapperRef}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="services-mega-menu"
                  onClick={() => setMegaOpen((v) => !v)}
                  className={linkClass(isActive('/services'))}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-300', megaOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {megaOpen && (
                  <div
                    id="services-mega-menu"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                    className="absolute left-1/2 top-full z-50 w-[min(60rem,92vw)] -translate-x-1/2 animate-fade-in pt-4"
                  >
                    <div className="overflow-hidden rounded-feature border border-border bg-surface shadow-float">
                      <div className="spectrum-line" aria-hidden="true" />
                      <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4">
                        {servicesMegaMenu.map((column) => {
                          const Icon = pillarIcons[column.pillarId];
                          const theme = pillarTheme[column.pillarId];
                          return (
                            <div key={column.pillarId} className="rounded-card p-3 transition-colors hover:bg-surface-subtle">
                              <div className="mb-3 flex items-center gap-2.5">
                                <span
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm"
                                  style={{ backgroundImage: theme.gradient }}
                                  aria-hidden="true"
                                >
                                  <Icon className="h-[18px] w-[18px]" />
                                </span>
                                <p className={cn('text-sm font-bold', theme.text)}>{column.heading}</p>
                              </div>
                              <ul className="flex flex-col gap-0.5">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="block rounded-lg px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-subtle/60 px-6 py-3.5">
                        <p className="text-sm text-muted-foreground">
                          Four connected capabilities, one accountable team.
                        </p>
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                        >
                          View all services
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={linkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
