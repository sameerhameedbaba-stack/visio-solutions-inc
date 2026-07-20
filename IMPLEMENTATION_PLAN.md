# IMPLEMENTATION_PLAN.md

This document reflects what was actually built.

## Chosen stack

- **Next.js 15.3** (App Router), **React 19**, **TypeScript 5** strict
  (`noUncheckedIndexedAccess`, `noImplicitOverride`).
- **Tailwind CSS 3.4** with centralized tokens; **Zod** validation;
  **lucide-react** icons.
- **Vitest** + Testing Library (unit/component); **Playwright** +
  **@axe-core/playwright** (E2E + accessibility).
- **ESLint** (`next/core-web-vitals`, `next/typescript`) + **Prettier**
  (+ tailwindcss plugin).

## Architecture decisions

- Server Components by default; Client Components only where interactivity is
  required (`Header`, nav, `ThemeToggle`, `FAQSection`, `ContactForm`, `Reveal`,
  `CtaButton`). Keeps First Load JS lean (~101 kB shared).
- Static generation for all marketing routes; dynamic only for `/api/contact`.
- Content centralized and typed in `src/content/`, presentation in
  `src/components/`, cross-cutting logic in `src/lib/` — CMS-migratable.
- Data-driven templates: one `/services/[slug]` template renders all 7 services;
  one `/solutions/[slug]` renders all 6 solutions; one `/insights/[slug]` renders
  articles. `generateStaticParams` prerenders each.
- Theme-aware tokens via CSS variables; no-flash theme script in `<head>`.

## Route plan

See `SITEMAP.md`. 35 build outputs including 7 services, 6 solutions, 3 articles,
`sitemap.xml`, `robots.txt`, `opengraph-image`, and `api/contact`.

## Component plan

See `DESIGN_SYSTEM.md` (UI / layout / marketing / forms / seo groups).

## Content plan

Complete, production-ready copy for every public page; no lorem ipsum; no
fabricated proof; illustrative content labelled. See `CONTENT_ARCHITECTURE.md`.

## Form plan

`ContactForm` (client) ↔ `/api/contact` (server) share one Zod schema
(`src/lib/validation.ts`). Honeypot + rate limiting + provider abstraction +
server-side validation + sanitization. Success → `/thank-you` redirect (no form
data in URL). See `Phase E` in the workflow and `LAUNCH_CHECKLIST.md`.

## SEO plan

Central metadata helper (`src/lib/seo.ts`), unique per-route metadata, canonical
URLs, Open Graph/Twitter, JSON-LD (Organization, WebSite, Service, BreadcrumbList,
Article, FAQPage, ContactPage), generated `sitemap.xml` + `robots.txt`, branded
`opengraph-image`. Full detail in `SEO_PLAN.md`.

## Accessibility plan

WCAG 2.2 AA target: skip link, landmark structure, single H1 per page, keyboard
operability, visible focus, focus management in mobile nav and form error summary,
`aria-live` status, honeypot hidden from AT, ≥24px link / ≥44px button targets,
reduced-motion support. Verified with axe across light and dark. See `QA_REPORT.md`.

## Testing plan

- **Unit (Vitest, 36 tests):** validation rules, content integrity (official
  details, unique slugs/descriptions, related-slug existence, illustrative labels,
  no numeric outcomes, footer link completeness), rate limiting, email
  sanitization + provider default (no PII logged), SEO metadata uniqueness.
- **E2E + a11y (Playwright, desktop + mobile):** page rendering, single H1, route
  status, custom 404, desktop nav, mobile nav (open/trap/Escape/restore), FAQ
  keyboard operability, contact validation + consent + successful submit →
  thank-you, and axe checks on 6 key pages.

## Deployment assumptions

Node ≥18.18 host that supports Next.js 15 (e.g. Vercel or Node server). Env vars
per `.env.example`. In-memory rate limiter suits a single instance; a distributed
store is needed for multi-instance/serverless. See `LAUNCH_CHECKLIST.md`.

## Ordered execution checklist (completed)

1. ✅ Repository inspection & audit
2. ✅ Strategy docs
3. ✅ Foundation: config, tokens, layout primitives, shared UI, nav, footer,
   metadata + structured-data utilities, content architecture
4. ✅ Pages + complete content
5. ✅ Forms & contact API + provider abstraction
6. ✅ SEO, accessibility, security headers, performance
7. ✅ Testing & repair (build, typecheck, lint, unit, E2E, axe)
8. ✅ Final documentation, QA report, launch checklist
