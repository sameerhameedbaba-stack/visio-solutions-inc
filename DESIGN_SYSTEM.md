# DESIGN_SYSTEM.md

Implemented with centralized tokens in `tailwind.config.ts` and CSS custom
properties in `src/app/globals.css`. Light and dark themes share one utility
surface; the theme is set before paint (no flash) and toggleable.

## Design intent

Premium, modern, enterprise-ready, precise. Restrained systems-oriented visual
language (layers, connections, workflows). No templated look, stock imagery,
robots, hooded hackers, purple-gradient clichés, glassmorphism overload, or
meaningless 3D.

## Color

Theme-aware **neutrals** and **interactive/semantic** colors are defined as RGB
channels in `globals.css` (so Tailwind opacity modifiers work) and referenced from
`tailwind.config.ts`. **Brand** and **teal/highlight** are fixed hex.

### Fixed brand palette

| Token                              | Value                                                |
| ---------------------------------- | ---------------------------------------------------- |
| `brand` (Intelligent Blue)         | `#2563EB`                                            |
| `brand-hover`                      | `#1D4ED8`                                            |
| `brand-bright`                     | `#3B82F6`                                            |
| `navy` / `navy-surface`            | `#0B1220` / `#111A2E`                                |
| `teal` / `teal-soft` / `teal-cyan` | `#0F9F9A` / `#DDF7F5` / `#0891B2`                    |
| `highlight`                        | `#F59E0B` (used sparingly for emphasis/illustrative) |

### Theme-aware neutrals (channels)

| Token               | Light             | Dark      |
| ------------------- | ----------------- | --------- |
| `background`        | `#F7F9FC`         | `#08111F` |
| `surface`           | `#FFFFFF`         | `#101B2D` |
| `surface-subtle`    | `#EEF3F8`         | `#162338` |
| `border`            | `#DCE3EC`         | `#2A3850` |
| `foreground`        | `#101828`         | `#F8FAFC` |
| `muted-foreground`  | `#344054`         | `#C9D4E5` |
| `subtle-foreground` | tuned (`#5A6478`) | `#94A3B8` |

### Theme-aware interactive & semantic colors

`brand` is fixed for **button backgrounds**. Where the brand appears as **text or a
small UI accent on a page background**, the `accent` token is used instead so it
adapts and meets contrast in both themes:

| Token                    | Light     | Dark      |
| ------------------------ | --------- | --------- |
| `accent` (brand-as-text) | `#1D4ED8` | `#60A5FA` |
| `success`                | `#157551` | `#34D399` |
| `warning`                | `#7A4E00` | `#F59E0B` |
| `error`                  | `#C43232` | `#F87171` |
| `info`                   | `#1D4ED8` | `#60A5FA` |

### Color rules & verification

Blue is the primary interactive color; teal is a controlled supporting signal;
highlight/amber is used sparingly. Gradients are subtle and never purple-dominant.
Status is never communicated by color alone. **All foreground/background pairs meet
WCAG 2.2 AA** — verified with `@axe-core/playwright` across 13 pages in **both light
and dark** with zero serious/critical color-contrast violations (see `QA_REPORT.md`).

## Typography

Single variable sans-serif — **Inter** (via `next/font`, self-hosted at build,
`display: swap`, system fallback). Controlled weight range; no decorative serif.

Fluid scale (`clamp`): `display`, `h1`, `h2`, `h3`, `h4`, `body-lg`, `body`,
`small`, `eyebrow` — see `tailwind.config.ts`. Line heights: display 1.02, headings
1.06–1.18, body 1.6–1.7. Editorial prose width capped at ~72ch. Headings use
`text-wrap: balance`, body `text-wrap: pretty`.

## Spacing, grid, radius, shadows

- **Spacing:** 4/8/12/16/24/32/48/64/80/96/128; fluid `section` / `section-sm`
  via `clamp`.
- **Grid:** max content width 1200px (`wide` 1280px), editorial `prose` 720px;
  responsive gutters `px-5 sm:px-6 lg:px-8`.
- **Radius:** `control` 8px, `input` 10px, `card` 16px, `feature` 24px — not
  everything is rounded; pills reserved for badges.
- **Shadows:** restrained — `nav`, `card`, `card-hover`, `float`, plus tonal
  borders. No heavy blurred shadows as decoration.

## Components

- **UI:** Button (primary/secondary/ghost/onDark; md/lg; hover/focus/active/
  disabled/loading; ≥44px targets; link/button polymorphism), Card, Badge,
  Container, Section, SectionHeading, CtaButton, Reveal, ThemeToggle,
  VisuallyHidden.
- **Layout:** Header (sticky, elevation on scroll), DesktopNav (mega menu),
  MobileNav (focus trap / Escape / scroll lock / focus restore), Footer,
  Breadcrumbs, Logo (custom SVG wordmark).
- **Marketing:** PageHero, ServicePillarGrid, FeatureGrid, ProcessTimeline,
  IndustryGrid, UseCaseCard (always labelled), RelatedServices, FAQSection
  (accessible accordion), CTASection, CheckList, SystemsDiagram (custom SVG),
  LegalDocument.
- **Forms:** ContactForm, FormField (persistent labels, help/error text, required
  indication, focus/disabled states, accessible select/checkbox).

Distinct card patterns are used per content type — no single identical card
everywhere. Icons come from one library (lucide-react) with consistent stroke and
optical size; icons support, never replace, labels.

## Motion

Subtle section reveals, hover feedback, accordion transitions, and a purposeful
connection-line animation in the hero diagram. Timings: micro 120–200ms, standard
180–300ms, reveals 300–500ms, natural easing. **`prefers-reduced-motion` is fully
respected** — non-essential movement, parallax, and animated paths are disabled
while all content and functionality remain.
