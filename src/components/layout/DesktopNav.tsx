'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { primaryNav, servicesMegaMenu } from '@/content/navigation';
import { cn } from '@/lib/utils';

/** Desktop primary navigation with an accessible Services mega menu. */
export function DesktopNav() {
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
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
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
                  className={cn(
                    'flex items-center gap-1 rounded-control px-3 py-2 text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    isActive('/services')
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', megaOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {megaOpen && (
                  <div
                    id="services-mega-menu"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                    className="absolute left-1/2 top-full z-50 mt-2 w-[min(56rem,90vw)] -translate-x-1/2 animate-fade-in rounded-feature border border-border bg-surface p-6 shadow-float"
                  >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
                      {servicesMegaMenu.map((column) => (
                        <div key={column.pillarId}>
                          <p className="mb-3 text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
                            {column.heading}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block rounded-control px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-brand/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <Link
                        href="/services"
                        className="text-sm font-semibold text-accent hover:text-brand-hover"
                      >
                        View all services →
                      </Link>
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
                className={cn(
                  'inline-flex min-h-[40px] items-center rounded-control px-3 py-2 text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground',
                )}
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
