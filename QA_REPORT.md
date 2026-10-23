# QA_REPORT.md

## Test environment

- Node.js v22, npm 10; Next.js 15.3.9 production build.
- Automated a11y/E2E via Playwright + `@axe-core/playwright` (Chromium desktop +
  Pixel-7 mobile) against `next start`.
- Contact API exercised directly via HTTP.

## Commands executed & results

| Command                                      | Result                                                          |
| -------------------------------------------- | --------------------------------------------------------------- |
| `npm install`                                | ✅ 509 packages, no blocking errors                             |
| `npm run build`                              | ✅ Compiles; 35 routes generated (static except `/api/contact`) |
| `npm run typecheck` (`tsc --noEmit`, strict) | ✅ No errors                                                    |
| `npm run lint` (`next lint`)                 | ✅ No ESLint warnings or errors                                 |
| `npm run test` (Vitest)                      | ✅ 36 passed (6 files)                                          |
| `npm run test:e2e` (Playwright)              | ✅ 28 passed, 2 skipped (project-specific), 0 failed            |
| axe sweep (13 pages × light+dark)            | ✅ 0 serious/critical violations                                |

## Functional testing

Verified: all primary navigation and routes (200); custom 404 for unknown routes;
desktop nav links; mobile nav open/focus-trap/Escape/focus-restore; Services mega
menu; FAQ accordions keyboard-operable; breadcrumbs; email links; theme toggle;
contact client + server validation; success → `/thank-you` redirect; duplicate-
submission guard; honeypot; rate limiting.

### Contact API (direct HTTP)

| Scenario                           | Expected                | Actual                           |
| ---------------------------------- | ----------------------- | -------------------------------- |
| Missing/invalid fields, no consent | 422 + field errors      | ✅ 422 with per-field messages   |
| Valid payload (console provider)   | 200 success             | ✅ 200; redacted server log only |
| Honeypot filled                    | Silent 200, no delivery | ✅ 200; no processing/log        |
| GET method                         | 405                     | ✅ 405                           |
| Wrong content-type                 | 415                     | ✅ 415                           |

## Responsive testing

Layouts are mobile-first and were exercised at mobile (Pixel 7 / iPhone-class) and
desktop (1440) viewports. No horizontal overflow, clipped text, off-screen nav,
overlapping buttons, undersized targets, or broken footer observed. Forms are
single-column on narrow screens; hero height is controlled on mobile.

## Browser testing

Chromium (desktop + mobile emulation) automated. Safari/Firefox/Edge could not be
launched in this container (only Chromium is provisioned) — **manual cross-browser
verification is recommended pre-launch** (tracked in `LAUNCH_CHECKLIST.md`). The
code uses standard, widely-supported CSS/JS with autoprefixer.

## Accessibility QA (WCAG 2.2 AA)

- **Automated (axe):** 0 serious/critical violations across 13 pages in **light and
  dark** — including `color-contrast` and WCAG 2.2 `target-size`.
- Skip-to-content link; landmark structure; one H1 per page; visible focus;
  keyboard operability; mobile-nav focus trap + restore; form error summary
  receives focus and is announced; `aria-live` status region; honeypot hidden from
  AT; ≥24px link / ≥44px button targets; `prefers-reduced-motion` respected.
- Recommended before launch: a manual screen-reader pass and 200% zoom review.

## Performance QA

Production build characteristics (from `next build`):

- **Shared First Load JS ≈ 101 kB**; page-specific budgets ~105–107 kB, contact
  ~123 kB (form + Zod). Well within a lean budget.
- All marketing pages **statically prerendered**; only `/api/contact` is dynamic.
- Inter self-hosted via `next/font` (`display: swap`); minimal client JS;
  hero/illustrations are inline SVG (no image requests, no layout shift); AVIF/WebP
  enabled for any future raster images.

**Performance budget:** initial JS kept lean and justified; no full-page video; no
single hero asset >300 KB (illustrations are inline SVG); no heavy animation libs.
A full production Lighthouse audit against the live domain is recommended
pre-launch (tracked in `LAUNCH_CHECKLIST.md`); the architecture targets
Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

## Security QA

- `npm audit` and secret hygiene: no secrets committed; `.env*` gitignored;
  `.env.example` documents config; no service credentials in client bundles.
- Contact endpoint: server-side Zod validation, allowlisted select values, length
  limits, honeypot, rate limiting, HTML escaping + CR/LF header-injection guard,
  safe generic error messages (no stack traces / backend details).
- Security headers verified present: CSP, HSTS, X-Content-Type-Options, X-Frame-
  Options DENY, Referrer-Policy, Permissions-Policy, COOP.
- No `eval`, no `dangerouslySetInnerHTML` on user input (only fully-controlled
  JSON-LD).

## Content QA

US English; consistent brand name, address, email, and domain (single source in
`company.ts`); no lorem ipsum; no fabricated proof; illustrative use cases visibly
labelled; unique metadata/descriptions per route; no duplicate H1s; legal drafts
marked. Fixed during QA: footer copyright double-period ("Inc.." → "Inc.").

## Defects found & fixed

| Severity | Defect                                                                | Resolution                                                                                |
| -------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| High     | Dark-mode + tinted-badge color-contrast failures (brand blue as text) | Introduced theme-aware `accent` + semantic text tokens; brand kept for button backgrounds |
| High     | Illustrative/warning badge contrast (both themes)                     | Theme-aware `warning` token                                                               |
| High     | WCAG 2.2 `target-size` on nav/footer/breadcrumb links                 | Made links `inline-flex` with min 24/40px targets                                         |
| Medium   | Invalid `<dl>` structure on contact page (definition-list/dlitem)     | Converted to semantic `<ul>`                                                              |
| Low      | Footer copyright double period                                        | Corrected string                                                                          |
| Low      | Unused imports / prop-name mismatch                                   | Removed / renamed (build now clean)                                                       |

## Remaining limitations (non-blocking)

- Cross-browser (Safari/Firefox/Edge) verified manually pre-launch (only Chromium
  provisioned here).
- Production Lighthouse and structured-data validation to run against the live
  domain.
- Manual screen-reader and 200%-zoom passes recommended.

## Defect classification & launch-blocker status

- **Critical:** none.
- **High:** none remaining (all fixed).
- **Medium:** none remaining.
- No launch-blocking **technical** defects. Remaining launch prerequisites are
  external (email provider, legal review) — see `MISSING_INPUTS.md` /
  `LAUNCH_CHECKLIST.md`.

## Post-review revision (editorial + UX audit)

A content/UX audit was implemented to make the copy read as a confident
consultancy rather than a commentary on how carefully it was generated.

**Changes**

- **Metadata bug fixed:** titles no longer double the brand suffix. `pageMetadata`
  returns an absolute title; every route now shows the brand exactly once
  (e.g. `Services: AI, software, cybersecurity and growth | Visio Solutions`).
- **Homepage** shortened ~26% (page copy 584 → 435 words) and de-duplicated:
  removed the repeated capability strip, discipline trio, trust grid, and
  standalone agentic-AI/industries sections; new hero copy and CTAs
  (`Discuss your project` primary); affirmative section headings.
- **Hero sizing:** reduced H1/H2 clamps. At 375×812 the H1 is ~141px and the
  primary CTA sits at ~551px — above the fold. No horizontal overflow at 320/430.
- **About:** removed "What we are not inventing" and the "registered at" claim;
  affirmative structure; business/mailing-address wording only.
- **Case Studies → Use Cases:** renamed route/H1/metadata/nav; removed
  "won't manufacture proof"/"published later" messaging; illustrative labels kept;
  no CaseStudy schema. `/case-studies` now 404s (site not yet live, no inbound links).
- **Industries → operating contexts:** five operating-context groupings replace
  named-sector framing.
- **Service pages:** added per-service _What we need from you_, _Common risks_,
  _Explicitly out of scope_, and _A sensible first phase_.
- **Contact form friction:** only full name, work email, project description, and
  consent required; company/phone/service/stage/budget/timeline optional. Honeypot,
  server validation, rate limiting, and status handling unchanged.
- **Language:** negative framings ("We do not…", "no hand-waving") replaced with
  affirmative statements.

**Validation after revision**

| Check                                    | Result                                                         |
| ---------------------------------------- | -------------------------------------------------------------- |
| `npm run build`                          | ✅ Compiles; `/use-cases` route added, `/case-studies` removed |
| `npm run typecheck`                      | ✅ No errors                                                   |
| `npm run test` (Vitest)                  | ✅ 37 passed (added minimal-payload + single-suffix guards)    |
| Playwright site E2E                      | ✅ 16 passed, 2 skipped                                        |
| axe sweep (8 revised pages × light+dark) | ✅ 0 serious/critical violations                               |
| Mobile hero fold (375×812)               | ✅ H1 141px, CTA top 551px, no overflow at 320/430             |
| Title brand-suffix audit                 | ✅ Exactly one brand mention per route                         |

## Visual redesign (October 2026)

A colourful, motion-led redesign requested by the business, built on GSAP
(ScrollTrigger, SplitText), Lenis smooth scrolling, and seven vendored React Bits
components. Copy is unchanged apart from component chrome; the company address was
updated to **4676 Commercial Street SE, PMB #325, Salem, Oregon 97302** in the
single source (`src/content/company.ts`). See `DESIGN_SYSTEM.md` for the system.

**Validation**

| Check                                                         | Result                                                                             |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run typecheck` / `npm run lint`                          | ✅ No errors or warnings                                                           |
| `npm run test` (Vitest)                                       | ✅ 60 passed (address test now also rejects the superseded address)                |
| `npm run build` and `npm run build:static`                    | ✅ Both succeed; static export includes `icon.svg`, `.htaccess`, payment endpoint  |
| Playwright E2E + axe                                          | ✅ 96 passed, 2 skipped (desktop/mobile-only nav tests)                            |
| axe — 11 pages × desktop/mobile × light, dark, reduced motion | ✅ 0 serious/critical violations                                                   |
| Reduced motion                                                | ✅ Every `data-reveal` element fully visible at load with no scrolling             |
| Static export under the production CSP (from `.htaccess`)     | ✅ No CSP violations or console errors; Lenis and GSAP active; WebGL fields render |
| Horizontal overflow at 320 / 375 / 430 px (7 pages)           | ✅ None                                                                            |
| Mobile hero fold (375×812)                                    | ✅ H1 143px tall, primary CTA bottom at 640px                                      |
| Old address in built output                                   | ✅ Absent; new address present                                                     |

**How the accessibility suite changed.** Pages are scrolled top to bottom before
auditing, because scroll-driven effects (reveals, the scrubbed homepage statement)
are only meant to be read once on screen. Two passes were added: dark theme, and
reduced motion audited at load _without_ scrolling, so nothing can hide behind an
animation. Defects the new suite caught and fixed: white numbers on light teal and
orange tiles (deepened to clear 4.5:1), and a test bug — `reducedMotion` must be
passed via `contextOptions`, otherwise Playwright silently ignores it.

**Performance trade-off.** First-load JavaScript for the homepage rose from about
107 kB to 176 kB (GSAP, ScrollTrigger, SplitText, Lenis, React Bits). The WebGL
colour fields are loaded after hydration, capped at 1.5× device pixel ratio, and
paused when offscreen or in a background tab.

**Not verifiable in this environment:** the live domain (outbound requests to it
are blocked here), real-device GPU performance, and Safari/Firefox rendering of
the WebGL fields (Chromium only). The CSS gradient behind each field is what
appears wherever WebGL2 is unavailable.
