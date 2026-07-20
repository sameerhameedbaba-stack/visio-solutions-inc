'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Accessible light/dark theme toggle that persists the choice. */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Ignore storage failures (e.g. privacy mode).
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-control border border-border text-muted-foreground transition-colors hover:border-brand hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className ?? ''}`}
      aria-label={
        mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Toggle theme'
      }
      aria-pressed={mounted ? isDark : undefined}
    >
      {mounted && isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
