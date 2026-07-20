# CONTENT_ARCHITECTURE.md

All content is centralized and typed under `src/content/`, kept separate from
presentation, and organized logically (not in one unmaintainable file). This
structure can be migrated to a CMS without rebuilding the frontend.

## Content source map

| File            | Contains                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `company.ts`    | Official name, domain, email, address; `siteUrl`, `absoluteUrl()`                                                                           |
| `ctas.ts`       | CTA registry (label, href, analytics event)                                                                                                 |
| `navigation.ts` | Primary nav, Services mega-menu, footer columns (derived from services)                                                                     |
| `services.ts`   | Four pillars + seven full service definitions                                                                                               |
| `solutions.ts`  | Six business-need solutions                                                                                                                 |
| `industries.ts` | Eight adaptable industry groups                                                                                                             |
| `insights.ts`   | Evergreen articles (typed block content)                                                                                                    |
| `site.ts`       | Homepage sections: problems, integrated layers, process, differentiators, trust, illustrative use cases, general FAQs, agentic-AI explainer |
| `legal.ts`      | Privacy / Terms / Cookie drafts (structured sections)                                                                                       |
| `types.ts`      | Shared content types                                                                                                                        |

## Site-wide message hierarchy

Integrated systems → four capabilities → recognizable problems → integrated model
→ services → depth → risk reduction → conversion. (See `WEBSITE_STRATEGY.md`.)

## Content model & reusable content types

- **Service** (`types.ts::Service`) — powers `/services/[slug]`: SEO fields,
  headline, intro, business problem + signals, when-appropriate, capabilities
  (`includes`), use cases, deliverables, business value, technical considerations,
  integrations, security/governance, FAQs, related services, CTAs.
- **Solution** — situation framing, signals, approach steps, related services,
  next step, CTA.
- **Industry** — challenges, patterns, considerations.
- **Article** — typed block content (`paragraph` | `heading` | `list`), metadata,
  managed dates, organizational author, related services.
- **UseCase** — situation / approach / capabilities / value; always rendered with
  a visible "Illustrative use case" label.
- **Faq**, **Capability**, **ProcessStep** — shared primitives.

## Service taxonomy (four pillars)

- **AI and Automation** — Agentic AI Solutions; AI Agents and Automation.
- **Software Engineering** — Automated Software Development; Custom Software
  Development; Web and Application Development.
- **Cybersecurity** — AI-Powered Cybersecurity.
- **Digital Growth** — Digital Marketing and Growth.

## Industry taxonomy

Professional services · Technology & SaaS · Financial & business services ·
Healthcare-supporting businesses · Retail & commerce · Logistics & operations ·
Manufacturing · Multi-location service businesses. Framed as adaptable patterns —
no claimed sector clients or credentials.

## CTA taxonomy

Primary: Book a Strategy Call. Secondary: Explore Services · Discuss Your Project ·
Request an Assessment · See How We Work · Start a Conversation · Explore
AI/Software/Cybersecurity/Digital Growth. Defined once in `ctas.ts` with analytics
events; used via `<CtaButton>`.

## FAQ taxonomy

- **General FAQs** (`site.ts`) — homepage + services overview (project types,
  improving existing systems, where AI fits, integration, security, phasing,
  evaluation info, combined delivery).
- **Per-service FAQs** — objection-handling specific to each service.

## Internal-linking map

Home → all pillars/services, solutions, industries, how-we-work, insights,
contact. Each service → related services (3) + primary/secondary CTA. Each solution
→ mapped services + next step. Each article → related services + CTA. Footer links
every service and all legal/resource pages site-wide. (See `SEO_PLAN.md`.)

## Proof-content placeholders & case-study model

The truth policy forbids fabricated proof. The case-study **data model** supports:
client name, industry, client description, challenge, constraints, approach,
architecture, services used, implementation, security considerations, outcome,
verified metrics, client quotation, **approval status**, publication date, related
services. Only entries with an explicit verified/approved status may render.
Currently no verified entries exist, so `/case-studies` shows problem types and
clearly-labelled illustrative use cases, plus a transparent note that verified
stories will be added. Trust-section slots for client logos, testimonials,
certifications, and partner badges remain hidden until real content is supplied
(tracked in `MISSING_INPUTS.md`).
