'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, NotebookText, X } from 'lucide-react';
// GSAP is imported directly (not through @/lib/motion) so the standalone deck
// bundle does not carry the scroll plugins the website uses.
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { deckBrand, deckSlides, slideIndexFromHash as indexFromHash } from '@/content/summary';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import { slideComponents } from './slides';
import styles from './deck.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP);

const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';
const COUNT = deckSlides.length;

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const pad = (n: number) => String(n).padStart(2, '0');

const iconButton =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/85 backdrop-blur-md transition hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:pointer-events-none disabled:opacity-35';

/**
 * Full-screen presentation deck for /summary.
 *
 * Navigation: arrow keys, Page Up/Down, Space, Home/End, swipe, the arrow
 * buttons or the dots. N toggles the presenter note, F toggles full screen.
 * The current slide is kept in the URL hash (#s1 … #s10) so a link can open the
 * deck on a given slide.
 */
export function SummaryDeck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const indexRef = useRef(0);
  const directionRef = useRef(1);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goTo = useCallback((next: number) => {
    const target = Math.max(0, Math.min(COUNT - 1, next));
    const current = indexRef.current;
    if (target === current) return;
    directionRef.current = target > current ? 1 : -1;
    indexRef.current = target;
    setLeaving(current);
    setIndex(target);
  }, []);

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const previous = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenEnabled) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void document.documentElement.requestFullscreen().catch(() => undefined);
    }
  }, []);

  // Open on the slide named in the URL, before the first paint.
  useIsomorphicLayoutEffect(() => {
    const initial = indexFromHash(window.location.hash);
    if (initial !== null && initial !== 0) {
      indexRef.current = initial;
      setIndex(initial);
    }
  }, []);

  // Keep the hash in step with the slide; follow hash edits and back/forward.
  useEffect(() => {
    const id = deckSlides[indexRef.current]?.id;
    if (id && window.location.hash !== `#${id}`) {
      try {
        window.history.replaceState(window.history.state, '', `#${id}`);
      } catch {
        // Some browsers refuse history changes on pages opened from disk; the
        // deck works the same, the address bar just keeps its original hash.
      }
    }
  }, [index]);

  useEffect(() => {
    const onHashChange = () => {
      const target = indexFromHash(window.location.hash);
      if (target !== null) goTo(target);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [goTo]);

  // Full-screen support and state.
  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const onControl = Boolean(target?.closest('button, a'));
      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault();
          previous();
          break;
        case ' ':
          // Space on a focused button presses that button instead.
          if (onControl) return;
          event.preventDefault();
          if (event.shiftKey) previous();
          else next();
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(COUNT - 1);
          break;
        case 'n':
        case 'N':
          setNotesOpen((open) => !open);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          setNotesOpen(false);
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, next, previous, toggleFullscreen]);

  // Slide change: shift the background glow, cross-fade, and stagger the new
  // slide's content in. With reduced motion everything simply switches.
  useGSAP(
    () => {
      const root = rootRef.current;
      const incoming = slideRefs.current[index];
      const glow = deckSlides[index]?.glow;
      if (!root || !incoming || !glow) return;

      timelineRef.current?.kill();
      incoming.scrollTop = 0;
      const outgoing = leaving !== null ? (slideRefs.current[leaving] ?? null) : null;
      const allItems = Array.from(incoming.querySelectorAll<HTMLElement>('[data-a]'));
      // Only animate what is laid out at this screen size (some slides carry a
      // phone layout and a desktop layout; the unused one is display: none).
      const items = allItems.filter((element) => element.getClientRects().length > 0);
      const colours = { '--a1': glow[0], '--a2': glow[1], '--a3': glow[2] };

      if (window.matchMedia(MOTION_REDUCED).matches) {
        gsap.set(root, colours);
        gsap.set([incoming, ...allItems], { clearProps: 'opacity,visibility,transform' });
        root.setAttribute('data-ready', '');
        if (leaving !== null) setLeaving(null);
        return;
      }

      // Hide the incoming content before the deck takes over from the CSS gate.
      gsap.set(allItems, { clearProps: 'opacity,visibility,transform' });
      gsap.set(items, { autoAlpha: 0, y: 26 });
      root.setAttribute('data-ready', '');

      const dir = directionRef.current;
      const start = outgoing ? 0.2 : 0;
      const timeline = gsap.timeline();
      timeline.to(root, { ...colours, duration: 1.2, ease: 'power2.out' }, 0);
      if (outgoing) {
        timeline.to(outgoing, { autoAlpha: 0, x: -56 * dir, duration: 0.38, ease: 'power2.in' }, 0);
        // Drop the old slide from the page as soon as it has faded out.
        timeline.call(() => setLeaving(null), [], 0.4);
      }
      timeline.fromTo(
        incoming,
        { autoAlpha: 0, x: outgoing ? 56 * dir : 0 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        start,
      );
      timeline.to(
        items,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          // About 50ms apart, but never longer than 0.7s in total on busy slides.
          stagger: { amount: Math.min(0.7, 0.05 * Math.max(items.length - 1, 0)) },
          clearProps: 'transform',
        },
        start + 0.08,
      );
      timelineRef.current = timeline;
    },
    { dependencies: [index], scope: rootRef },
  );

  const current = deckSlides[index];

  return (
    <div
      ref={rootRef}
      data-deck
      className={cn(styles.deck, 'ink fixed inset-0 overflow-hidden text-white')}
    >
      <h1 className="sr-only">{deckBrand.full} — summary presentation</h1>

      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={cn(styles.glow, styles.glowA)} />
        <div className={cn(styles.glow, styles.glowB)} />
        <div className={cn(styles.glow, styles.glowC)} />
        <div className={styles.grid} />
      </div>

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Logo tone="onDark" idSuffix="deck" />
        <p className="hidden truncate text-sm font-medium text-white/65 md:block">
          {current?.label}
        </p>
        <div className="flex items-center gap-2">
          <p className="mr-1 font-mono text-sm tabular-nums text-white/65">
            <span className="text-white">{pad(index + 1)}</span> / {pad(COUNT)}
          </p>
          <button
            type="button"
            className={cn(
              iconButton,
              notesOpen && 'border-violet-300/50 bg-violet-400/20 text-white',
            )}
            aria-label="Presenter note"
            aria-expanded={notesOpen}
            aria-controls="deck-note"
            title="Presenter note (N)"
            onClick={() => setNotesOpen((open) => !open)}
          >
            <NotebookText aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
          {canFullscreen ? (
            <button
              type="button"
              className={iconButton}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              title={isFullscreen ? 'Exit full screen (F)' : 'Full screen (F)'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize aria-hidden="true" className="h-[18px] w-[18px]" />
              ) : (
                <Maximize aria-hidden="true" className="h-[18px] w-[18px]" />
              )}
            </button>
          ) : null}
        </div>
      </header>

      {/* Slides */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${deckBrand.full} summary`}
        className="absolute inset-x-0 bottom-[76px] top-16 z-10 touch-pan-y sm:bottom-[84px]"
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse') return;
          swipeRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = swipeRef.current;
          swipeRef.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
            if (dx < 0) next();
            else previous();
          }
        }}
        onPointerCancel={() => {
          swipeRef.current = null;
        }}
      >
        {slideComponents.map((Slide, i) => {
          const meta = deckSlides[i];
          if (!meta) return null;
          const isActive = i === index;
          const isLeaving = i === leaving && !isActive;
          return (
            <section
              key={meta.id}
              ref={(element) => {
                slideRefs.current[i] = element;
              }}
              data-slide={meta.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${COUNT}: ${meta.label}`}
              hidden={!isActive && !isLeaving}
              inert={isLeaving || undefined}
              aria-hidden={isLeaving || undefined}
              // Focusable so keyboard users can scroll a slide taller than the screen.
              tabIndex={isActive ? 0 : -1}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300/60"
            >
              <Slide />
            </section>
          );
        })}
      </div>

      {/* Controls */}
      <nav
        aria-label="Slides"
        className="absolute inset-x-0 bottom-0 z-30 flex h-[76px] items-center justify-center px-4 sm:h-[84px]"
      >
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
          <button
            type="button"
            className={iconButton}
            aria-label="Previous slide"
            onClick={previous}
            disabled={index === 0}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <ol className="hidden items-center px-1 sm:flex">
            {deckSlides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  className="group flex h-8 min-w-6 items-center justify-center rounded-full px-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                  aria-label={`Slide ${i + 1}: ${slide.label}`}
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'block h-2 rounded-full transition-all duration-500 ease-natural',
                      i === index ? 'w-7 bg-spectrum' : 'w-2 bg-white/30 group-hover:bg-white/60',
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="px-3 font-mono text-sm tabular-nums text-white/70 sm:hidden">
            {pad(index + 1)} / {pad(COUNT)}
          </p>
          <button
            type="button"
            className={cn(
              iconButton,
              'border-transparent bg-spectrum text-white shadow-glow hover:bg-spectrum hover:brightness-110',
            )}
            aria-label="Next slide"
            onClick={next}
            disabled={index === COUNT - 1}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <p className="absolute right-6 hidden items-center gap-1.5 text-xs text-white/60 xl:flex">
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[0.7rem] text-white/80">
            ←
          </kbd>
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[0.7rem] text-white/80">
            →
          </kbd>
          navigate ·
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[0.7rem] text-white/80">
            N
          </kbd>
          notes ·
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[0.7rem] text-white/80">
            F
          </kbd>
          full screen
        </p>
      </nav>

      {/* Progress */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/[0.06]">
        <div
          className="h-full bg-spectrum transition-[width] duration-500 ease-natural"
          style={{ width: `${((index + 1) / COUNT) * 100}%` }}
        />
      </div>

      {/* Presenter note */}
      {notesOpen && current ? (
        <aside
          id="deck-note"
          aria-labelledby="deck-note-title"
          className="absolute bottom-[88px] right-4 z-40 w-[min(25rem,calc(100%-2rem))] animate-fade-up rounded-2xl border border-white/10 bg-[#0d1330]/95 p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:bottom-[96px] sm:right-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-white/60">
                {pad(index + 1)} / {pad(COUNT)}
              </p>
              <h2 id="deck-note-title" className="mt-1 text-base font-bold text-white">
                Presenter note · {current.label}
              </h2>
            </div>
            <button
              type="button"
              className={cn(iconButton, 'h-8 w-8 shrink-0')}
              aria-label="Close presenter note"
              onClick={() => setNotesOpen(false)}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/85">{current.note}</p>
        </aside>
      ) : null}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {current ? `Slide ${index + 1} of ${COUNT}: ${current.label}` : ''}
      </p>
    </div>
  );
}
