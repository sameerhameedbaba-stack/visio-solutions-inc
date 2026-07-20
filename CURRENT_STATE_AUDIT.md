# CURRENT_STATE_AUDIT.md

## Repository summary

At the start of this engagement the repository was an **empty Git repository** on
branch `claude/website-creation-2lfkz9` — no commits, no `package.json`, no source,
no configuration, no assets. There was no existing framework, styling system,
content, API routes, tests, or deployment configuration to preserve.

This is therefore a **greenfield build**, not a migration. The audit below records
the baseline and the decisions that followed.

## Existing technology stack

None. Node.js v22 and npm 10 are available in the environment. Outbound HTTPS is
available through the environment proxy (used successfully for `npm install` and
Google Fonts fetching during build).

## Baseline checks

| Check                   | Result at start         |
| ----------------------- | ----------------------- |
| Dependency installation | N/A (no `package.json`) |
| Dev build               | N/A                     |
| Production build        | N/A                     |
| Type checking           | N/A                     |
| Linting                 | N/A                     |
| Existing tests          | None                    |
| Existing routes         | None                    |

## What should be preserved

Nothing existed to preserve. The Git branch itself is preserved and all work is
committed to it.

## What should be replaced / created

Everything: framework, tooling, design system, content architecture, pages,
contact pipeline, SEO, accessibility, security configuration, tests, and docs.

## Architecture recommendation

Because there was no existing stack, the recommended modern stack from the brief
was adopted directly:

- **Next.js 15.3 (App Router)** — pinned to the latest 15.x line for a maximally
  stable, well-understood App Router rather than the newer 16.x, to guarantee a
  clean, predictable build. Server Components by default; Client Components only
  where interaction requires them.
- **React 19**, **TypeScript 5 (strict, `noUncheckedIndexedAccess`)**.
- **Tailwind CSS 3.4** with centralized design tokens (chosen over v4 for
  mature, predictable token/theme integration).
- **Zod** for shared client/server validation.
- **lucide-react** as the single line-icon library.
- **Vitest** (unit/component) + **Playwright** with **@axe-core/playwright** (E2E
  and accessibility).

Rationale for each choice and the alternatives considered are recorded in
`IMPLEMENTATION_PLAN.md` and `DESIGN_SYSTEM.md`.

## Critical risks identified (and how they were handled)

| Risk                             | Handling                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| No email provider configured     | Provider abstraction (`console` default, `resend` optional); UI never falsely reports success. See `src/lib/email.ts`.  |
| Fabricated proof / claims        | Strict truth policy; illustrative content always labelled; reusable case-study/testimonial slots hidden until verified. |
| Legal exposure                   | Privacy/Terms/Cookie drafts visibly marked "Draft for review" in UI and source.                                         |
| Strict CSP breaking the app      | Pragmatic, tested CSP that keeps static generation; nonce-based CSP documented as future hardening.                     |
| Build-time font fetch dependency | `next/font` self-hosts Inter at build with a system-font fallback.                                                      |

## Baseline performance findings

Not measurable at start (no app). Post-build metrics are recorded in
`QA_REPORT.md`: shared First Load JS ≈ 101 kB, all marketing pages statically
prerendered, only `/api/contact` dynamic.

## Conclusion

A greenfield build was warranted. No destructive refactoring was required because
there was nothing to refactor. Proceeded to strategy and implementation.
