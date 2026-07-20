# WEBSITE_STRATEGY.md

## Business interpretation

Visio Solutions Inc. is an **integrated technology partner**. Its differentiator is
not any single capability but the connection between five: software engineering,
AI, automation, security, and digital growth. The website's core job is to make
that integration legible in seconds and credible over a few minutes — then convert
high-intent B2B visitors into a strategy conversation.

## Audience groups

Primary decision-makers and influencers:

- **Executive buyers** — CEOs, COOs, founders — outcome- and risk-focused.
- **Technology leaders** — CTOs, CIOs, security leaders — architecture-, security-,
  and maintainability-focused.
- **Functional leaders** — operations, marketing, product — problem- and
  workflow-focused.

Organization sizes span startups and SMBs through mid-market and enterprise.
Different visitors arrive at different levels of technical maturity, so the IA
supports both "explain it plainly" and "show me the depth" paths.

## Buyer needs

- Understand quickly what the company does and whether it fits.
- Self-select to the most relevant capability.
- See a credible delivery approach and technical standards.
- Reduce perceived implementation, security, and vendor-lock-in risk.
- Get to a low-friction next step (assessment or strategy call).

## Buyer objections (addressed in copy/UX)

Uncertainty about practical AI value · fear of open-ended cost · security and
privacy concerns · integration complexity · vendor lock-in · lack of internal
resources · ROI proof · timelines · maintainability after launch · disruption
risk · distrust of vague AI/marketing promises · being sold tech before the
problem is understood. Each service page includes a "when this is appropriate"
section and objection-handling FAQs; the tone is calm and non-hyperbolic
throughout.

## Positioning

> An integrated technology partner for software, AI, automation, security, and
> digital growth.

Messaging line used on the homepage:

> Build smarter digital systems with software, AI, automation, security, and
> growth working together.

The brand deliberately avoids sounding like a generic outsourcer, freelance shop,
AI-wrapper agency, marketing-only agency, research lab, or a security vendor making
absolute guarantees.

## Messaging hierarchy

1. **What & why** (hero): integrated systems, working together.
2. **Four capabilities** (capability strip): AI & automation, software, security,
   growth.
3. **Problems worth solving** → **integrated model** → **core services**.
4. **Depth** per capability (agentic AI explainer, engineering/security/growth).
5. **Risk reduction**: how we work, trust principles, honest illustrative use cases.
6. **Conversion**: strategy call / discuss project.

## Conversion goals

- **Primary:** Book a Strategy Call.
- **Secondary:** Explore Services, Discuss Your Project, Request an Assessment,
  See How We Work.

CTAs follow a controlled hierarchy (see `src/content/ctas.ts`) — one dominant
action per page, contextual secondary actions, no CTA after every paragraph, no
popups, countdowns, fake scarcity, or exit-intent overlays.

## Conversion paths

| Buyer      | Landing route                               | Journey                                                                      | CTA                   |
| ---------- | ------------------------------------------- | ---------------------------------------------------------------------------- | --------------------- |
| Software   | Custom / Web & App Dev                      | problem → capabilities → delivery → standards → use cases → FAQs             | Discuss your project  |
| AI agent   | Agentic AI / AI Agents & Automation         | workflow → suitability → architecture → oversight → integration → governance | Request an assessment |
| Automation | AI Agents & Automation / Process Automation | bottlenecks → mapping → opportunities → controls → stages                    | Request an assessment |
| Security   | AI-Powered Cybersecurity                    | risk → defensive capabilities → scope → oversight → process                  | Request an assessment |
| Marketing  | Digital Marketing & Growth                  | bottleneck → strategy → measurement → optimization                           | Discuss your project  |
| Enterprise | Services / How We Work                      | integrated capability → governance → security → delivery model               | Strategy call         |

## Trust strategy

Capability-based trust, not manufactured proof. No fabricated clients,
testimonials, logos, metrics, or certifications. Trust is built through transparent
process, technology standards, secure engineering, responsible AI language, and QA.
Reusable case-study/testimonial components exist but render only verified/approved
entries (see `CONTENT_ARCHITECTURE.md`).

## Content strategy

Centralized, typed content under `src/content/` so copy is consistent and
CMS-migratable. Every indexable page has unique metadata, a single H1, distinct
body copy, and objection-handling. No lorem ipsum, no "coming soon," no visible
TODOs.

## Competitive differentiation (without unsupported claims)

Integrated thinking; business-first technology decisions; custom architecture over
packages; security-conscious delivery; maintainability; phased implementation;
clear communication; human oversight for AI. All framed as principles, not
superiority claims.

## Mobile strategy

Mobile-first layouts; accessible mobile navigation with focus trapping, Escape,
scroll lock, and focus restoration; large touch targets (≥24px links, ≥44px
buttons); no horizontal scroll; controlled hero height; single-column forms.

## Visual storytelling strategy

Restrained, systems-oriented visuals: a custom SVG "connected layers" diagram,
numbered process timelines, and modular cards. No stock imagery, robots, hooded
hackers, or purple-gradient clichés.

## Measurement recommendations

Privacy-conscious analytics (Plausible) via an abstraction that never receives
personal form content. Track meaningful events only: strategy/CTA clicks,
contact-form start/success/error, email-link clicks. Analytics is disabled until a
domain is configured. See `src/lib/analytics.ts` and `SEO_PLAN.md`.
