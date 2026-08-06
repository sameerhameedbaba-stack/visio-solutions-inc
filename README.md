# Visio Solutions Inc. — Website

The public marketing website for **Visio Solutions Inc.**, an integrated technology
partner for software, AI, automation, security, and digital growth.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript (strict)**, and
**Tailwind CSS 3**. Statically generated where possible, accessible to WCAG 2.2 AA,
and secured with a hardened contact pipeline and security headers.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values as needed
npm run dev                  # http://localhost:3000
```

## Scripts

| Script              | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build (also type-checks and lints) |
| `npm run start`     | Serve the production build                    |
| `npm run typecheck` | `tsc --noEmit` (strict)                       |
| `npm run lint`      | ESLint (next/core-web-vitals + typescript)    |
| `npm run format`    | Prettier write                                |
| `npm run test`      | Unit/component tests (Vitest)                 |
| `npm run test:e2e`  | End-to-end + accessibility tests (Playwright) |

## Project structure

```
src/
  app/            Routes (App Router), sitemap.ts, robots.ts, opengraph-image, api/contact
  components/
    layout/       Header, DesktopNav, MobileNav, Footer, Breadcrumbs, Logo
    ui/           Button, Card, Badge, Container, Section, SectionHeading, CtaButton, …
    marketing/    Hero, ServicePillarGrid, FAQSection, ProcessTimeline, UseCaseCard, …
    forms/        ContactForm, FormField
    seo/          StructuredData (JSON-LD), Analytics
  content/        Centralized content: company, services, solutions, industries, insights, …
  lib/            seo, validation (Zod), email (provider abstraction), rate-limit, analytics, utils
tests/
  unit/           Vitest tests
  e2e/            Playwright specs (site + axe accessibility)
```

## Content

All copy and structured data live under `src/content/` — a clean content
architecture that can be migrated to a CMS later without rebuilding the frontend.
Official company details are defined once in `src/content/company.ts`.

## Environment variables

See `.env.example`. Notable ones:

- `NEXT_PUBLIC_SITE_URL` — canonical URL (default `https://visiosolutions.net`).
- `CONTACT_EMAIL_PROVIDER` — `console` (default, logs) or `resend`.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — email delivery.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — enables privacy-conscious analytics when set.
- `PAYMENT_GATEWAY_ORIGIN` — build-time; adds the gateway's checkout origin to the CSP.
- `PAYMENT_IPN_SECRET` — optional shared secret for `/api/payment/notify` on a Node host.

## Documentation

Strategy and delivery documents live in the repository root: `CURRENT_STATE_AUDIT.md`,
`WEBSITE_STRATEGY.md`, `SITEMAP.md`, `CONTENT_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`,
`IMPLEMENTATION_PLAN.md`, `SEO_PLAN.md`, `MISSING_INPUTS.md`, `QA_REPORT.md`,
`LAUNCH_CHECKLIST.md`, `PAYMENT_GATEWAY_SETUP.md`.

## Truth and claims policy

This site contains **no fabricated proof** — no invented clients, testimonials,
logos, metrics, or certifications. Illustrative scenarios are always visibly
labelled "Illustrative example." Legal pages are drafts pending attorney review.
See `MISSING_INPUTS.md` for what real business inputs are still required.
