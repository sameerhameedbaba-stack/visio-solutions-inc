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
