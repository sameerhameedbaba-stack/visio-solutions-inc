'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { footerColumns } from '@/content/navigation';
import { primaryNav, servicesMegaMenu } from '@/content/navigation';
import { ctas } from '@/content/ctas';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const focusableSelector = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

/** Full-screen mobile navigation with focus trapping and scroll lock. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    document.body.style.overflow = 'hidden';

    // Move focus into the panel.
    const focusables = panel?.querySelectorAll<HTMLElement>(focusableSelector);
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const simpleLinks = primaryNav.filter((item) => item.label !== 'Services');

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-surface shadow-float"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-muted-foreground hover:bg-surface-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 py-6">
          <ul className="flex flex-col gap-1">
            {simpleLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-control px-3 py-3 text-lg font-semibold text-foreground hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="px-3 text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
              Services
            </p>
            <div className="mt-2 flex flex-col gap-4">
              {servicesMegaMenu.map((column) => (
                <div key={column.pillarId}>
                  <p className="px-3 text-sm font-semibold text-muted-foreground">
                    {column.heading}
                  </p>
                  <ul className="mt-1 flex flex-col">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block rounded-control px-3 py-2.5 text-[0.95rem] text-foreground hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-3 pt-4">
            {footerColumns[3]!.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="inline-flex min-h-[24px] items-center py-1 text-sm text-subtle-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-5">
          <Button href={ctas.strategyCall.href} onClick={onClose} className="w-full" size="lg">
            {ctas.strategyCall.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
