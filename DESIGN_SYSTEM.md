# DESIGN_SYSTEM.md

Implemented with centralized tokens in `tailwind.config.ts` and CSS custom
properties in `src/app/globals.css`. Light and dark themes share one utility
surface; the theme is set before paint (no flash) and toggleable.

## Design intent

Colourful, confident, big-brand. One vivid brand spectrum, with a signature
colour per capability so the four pillars are recognisable everywhere they
appear. Deep "ink" bands (hero, spotlight sections, footer) give the colour
something to glow against; ordinary content sits on clean light or dark surfaces
for comfortable reading. Motion is smooth and scroll-led, never required to
understand content, and fully optional for people who reduce motion.

Revised in October 2026 from the earlier restrained blue/teal system, at the
business's request for a more colourful look.

## Color

Theme-aware **neutrals** and **interactive/semantic** colours are defined as RGB
channels in `globals.css` (so Tailwind opacity modifiers work) and referenced from
`tailwind.config.ts`. **Spectrum** hues are fixed hex.

### Brand spectrum (fixed, decorative)

Used for fills, glows, gradients and icon tiles — never as the only colour of
small text.

| Token              | Value     | Token              | Value     |
| ------------------ | --------- | ------------------ | --------- |
| `spectrum-blue`    | `#2563EB` | `spectrum-magenta` | `#DB2777` |
| `spectrum-indigo`  | `#4F46E5` | `spectrum-rose`    | `#E11D48` |
| `spectrum-violet`  | `#7C3AED` | `spectrum-orange`  | `#F97316` |
| `spectrum-sky`     | `#0EA5E9` | `spectrum-amber`   | `#F59E0B` |
| `spectrum-cyan`    | `#06B6D4` | `spectrum-teal`    | `#0D9488` |
| `spectrum-emerald` | `#10B981` |                    |           |

`bg-spectrum` is the signature gradient: blue → violet → magenta → orange.
`brand` (`#2563EB`) remains for the logo and legacy references.

### Capability colours

Each pillar owns a gradient (decorative) and a theme-aware text colour (AA):

| Pillar          | Gradient         | Text (light / dark)   |
| --------------- | ---------------- | --------------------- |
| AI & Automation | violet → magenta | `#6D28D9` / `#C4B5FD` |
| Software        | blue → cyan      | `#1D4ED8` / `#93C5FD` |
| Cybersecurity   | teal → emerald   | `#0F766E` / `#5EEAD4` |
| Digital Growth  | orange → rose    | `#C2410C` / `#FDBA74` |

Defined once in `src/components/marketing/pillar-theme.ts`; service pages tint
their hero mesh with their pillar's hues.

### Theme-aware neutrals (channels)

| Token               | Light     | Dark      |
| ------------------- | --------- | --------- |
| `background`        | `#F7F8FD` | `#070B18` |
| `surface`           | `#FFFFFF` | `#0E1528` |
| `surface-subtle`    | `#EEF1FB` | `#141D36` |
| `border`            | `#DEE3F0` | `#243052` |
| `foreground`        | `#0B1024` | `#F8FAFC` |
| `muted-foreground`  | `#343E58` | `#C7CFE2` |
| `subtle-foreground` | `#545F7A` | `#96A2C2` |
| `accent`            | `#4338CA` | `#A5B4FC` |

### Ink bands

`.ink` (`#060816`) stays dark in both themes and **re-points every theme token**
(neutrals, accent, status, pillar and spectrum text colours) to its dark values.
Any component placed on an ink band — cards, buttons, breadcrumbs, form errors —
therefore renders correctly with no per-component overrides. The header detects
when it floats over an ink band and switches to dark glass.

### Contrast rules

- Text on gradients uses deepened stops chosen to clear 4.5:1 for white text
  (e.g. number badges, step markers), or sits over a scrim (heroes, CTA band).
- `.text-spectrum` gradient text uses stops that clear 3:1 as large text on its
  surface in each theme.
- Gradient-clipped text falls back to `CanvasText` in Windows high-contrast mode.
- Verified with `@axe-core/playwright` on 11 pages × desktop and mobile in three
  passes — light, dark, and reduced motion — with zero serious/critical
  violations (see `QA_REPORT.md`).

## Typography

- **Display:** Plus Jakarta Sans (headings `h1`–`h3`), self-hosted at build via
  `next/font`, tight negative tracking.
- **Body:** Inter.
- Fluid scale (`clamp`): `display`, `h1`, `h2`, `h3`, `h4`, `body-lg`, `body`,
  `small`, `eyebrow`. Mobile minimums are kept modest so long headlines do not
  dominate a phone screen.
- Headings use `text-wrap: balance`, body `text-wrap: pretty`; prose capped at ~72ch.

## Spacing, grid, radius, shadows

- **Grid:** content 1200px, `wide` 1280px, `prose` 720px; gutters
  `px-5 sm:px-6 lg:px-8`. Fluid `section` / `section-sm` padding.
- **Radius:** `control` 8px, `input` 10px, `card` 20px, `feature` 28px; buttons and
  eyebrows are pills.
- **Shadows:** `lift` (resting cards), `glow` / `glow-lg` (violet-tinted, for
  primary buttons, open accordions, hover states), `float` (menus).

## Components

- **UI:** Button (primary gradient / secondary / ghost / onDark / glass), Card,
  Badge, Container, Section (`ink` tone), SectionHeading (pill eyebrow, optional
  spectrum `highlight`), CtaButton, Reveal, ThemeToggle.
- **Layout:** Header (floating glass pill, adapts over ink), DesktopNav
  (colour-coded mega menu), MobileNav (focus trap, pauses smooth scroll), Footer
  (ink band, oversized spectrum wordmark), Logo (four pillar-coloured nodes).
- **Marketing:** PageHero (ink + animated CSS colour mesh), HomeHero, CapabilityOrbit,
  CapabilityMarquee, ServicePillarGrid (bento), ServiceSpotlightGrid, LayerStack,
  FeatureGrid, ProcessTimeline (scroll-filled rail), UseCaseCard (always labelled
  "Illustrative example"), RelatedServices, FAQSection, CTASection, CheckList,
  IndustryGrid, LegalDocument.
- **React Bits** (vendored in `src/components/bits/`, see
  `THIRD_PARTY_NOTICES.md`): Grainient (WebGL colour field), SpotlightCard,
  Magnet, ShinyText, GradientText, LogoLoop, ScrollReveal.

## Motion

Built on **GSAP** (ScrollTrigger, SplitText via `@gsap/react`) and **Lenis**.

- **Smooth scrolling:** Lenis, driven by GSAP's ticker and synced to ScrollTrigger
  (`components/motion/SmoothScroll.tsx`). Keyboard, focus and anchor scrolling stay
  native.
- **Reveals:** `Reveal` animates opacity and position on scroll. Content is hidden
  up front only once JavaScript is known to run (`html.js`), a timed CSS fallback
  reveals it if the animation code never starts, and opacity — not visibility — is
  animated so content stays reachable by screen readers.
- **Headlines:** hero H1s rise line by line (SplitText, accessible mode: the heading
  keeps its full sentence as its name).
- **Colour fields:** WebGL Grainient on the home hero and CTA bands, loaded after
  hydration, paused offscreen, over a CSS gradient fallback.
- **`prefers-reduced-motion`:** honoured everywhere — Lenis stops smoothing, GSAP
  animations are skipped via `gsap.matchMedia`, CSS animations are neutralised,
  WebGL fields render a still frame, and every element is visible at load.
