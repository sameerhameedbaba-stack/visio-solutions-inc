# MISSING_INPUTS.md

Real business inputs still required from Visio Solutions Inc. Nothing here blocks
the site from being an honest, capability-led marketing site today; these items
unlock additional proof, delivery, and legal readiness. For each: why it's needed,
where it appears, whether it blocks launch, and the temporary implementation.

## Brand & identity

| Item                      | Why                  | Where                             | Blocks launch? | Temporary implementation                      |
| ------------------------- | -------------------- | --------------------------------- | -------------- | --------------------------------------------- |
| Approved logo files (SVG) | Real brand mark      | Header, footer, OG image, favicon | No             | Custom SVG text wordmark + generated OG image |
| Brand guidelines          | Confirm palette/type | Design tokens                     | No             | Palette/type from brief, contrast-verified    |
| Favicon / app icons       | Browser/tab identity | `<head>`                          | No             | None yet (add `app/icon` / `favicon.ico`)     |

## Proof content (truth policy — hidden until verified)

| Item                                     | Why          | Where                       | Blocks launch? | Temporary implementation                              |
| ---------------------------------------- | ------------ | --------------------------- | -------------- | ----------------------------------------------------- |
| Verified client list / approved logos    | Social proof | Trust section, case studies | No             | Hidden slots; illustrative use cases labelled         |
| Verified testimonials                    | Social proof | Reusable testimonial slots  | No             | Not rendered until supplied                           |
| Approved case studies + verified metrics | Evidence     | `/case-studies`             | No             | Problem types + illustrative cases + transparent note |
| Certifications / accreditations          | Trust        | About, footer, schema       | No             | Omitted; not claimed                                  |
| Partnerships / technology-partner claims | Trust        | About, services             | No             | Omitted; not claimed                                  |

## Company details

| Item                           | Why                   | Where                 | Blocks launch? | Temporary implementation                      |
| ------------------------------ | --------------------- | --------------------- | -------------- | --------------------------------------------- |
| Leadership bios / team photos  | About page            | About                 | No             | Transparent "not inventing" note              |
| Company history / milestones   | About page            | About                 | No             | Focus on philosophy & principles              |
| Phone number                   | Contact/schema        | Footer/contact/schema | No             | Email only; phone omitted from schema         |
| Scheduling URL (e.g. Calendly) | Strategy-call booking | Primary CTA           | No             | CTA routes to `/contact?intent=strategy-call` |
| Verified social profile URLs   | Footer/schema         | Footer, `sameAs`      | No             | No social links (no fake profiles)            |

## Operations & integrations

| Item                                   | Why                          | Where                | Blocks launch?           | Temporary implementation                                         |
| -------------------------------------- | ---------------------------- | -------------------- | ------------------------ | ---------------------------------------------------------------- |
| Form-delivery provider + credentials   | Deliver inquiries            | `/api/contact`       | **Yes (for live leads)** | `console` provider logs redacted summary; `resend` ready via env |
| Sender domain auth (SPF/DKIM/DMARC)    | Deliverability               | Email                | **Yes (for live leads)** | Documented in `LAUNCH_CHECKLIST.md`                              |
| Preferred CRM                          | Lead routing                 | Future integration   | No                       | Not integrated yet                                               |
| Analytics preference (Plausible/other) | Measurement                  | `Analytics`          | No                       | Disabled until `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set                |
| Cookie-consent requirements            | Compliance                   | Cookie policy/banner | No                       | Essential storage only; no banner needed yet                     |
| Distributed rate-limit store           | Multi-instance abuse control | `/api/contact`       | No (single instance)     | In-memory limiter; Redis recommended for serverless              |

## Legal

| Item                                     | Why            | Where                          | Blocks launch?                   | Temporary implementation                 |
| ---------------------------------------- | -------------- | ------------------------------ | -------------------------------- | ---------------------------------------- |
| Attorney review of Privacy/Terms/Cookies | Legal validity | `/privacy` `/terms` `/cookies` | **Yes (before relying on them)** | Drafts visibly marked "Draft for review" |
| Governing-law jurisdiction               | Terms          | `/terms`                       | **Yes (finalize)**               | Placeholder flagged for confirmation     |
| Data-retention policy                    | Privacy        | `/privacy`                     | No                               | Stated as "to be confirmed with counsel" |
| Support/response-time expectations       | Contact copy   | Contact/thank-you              | No                               | No response-time promise made            |

## Approved claims

| Item                                | Why      | Where          | Blocks launch? | Temporary implementation          |
| ----------------------------------- | -------- | -------------- | -------------- | --------------------------------- |
| Approved industry-experience claims | Accuracy | Industries     | No             | Framed as adaptable patterns only |
| Approved technology-partner claims  | Accuracy | Services/About | No             | Not claimed                       |

## Launch-blocking summary

Only three categories are true launch blockers, and all are **external
dependencies**, not code defects:

1. **Email delivery** — configure a provider + authenticate the sender domain to
   receive live inquiries.
2. **Legal review** — have the Privacy/Terms/Cookie drafts reviewed and the
   governing-law placeholder finalized.
3. (If applicable) **Analytics/consent** — only if analytics is enabled at launch.

See `LAUNCH_CHECKLIST.md`.
