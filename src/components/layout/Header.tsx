'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { CtaButton } from '@/components/ui/CtaButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled
          ? 'border-border bg-surface/90 shadow-nav backdrop-blur-md'
          : 'border-transparent bg-background/80 backdrop-blur-sm',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="hidden lg:block">
            <CtaButton cta="strategyCall" size="md" />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-border text-foreground hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
