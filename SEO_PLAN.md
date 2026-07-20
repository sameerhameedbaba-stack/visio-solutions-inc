# SEO_PLAN.md

Canonical domain: **https://visiosolutions.net** (`NEXT_PUBLIC_SITE_URL`).

## Keyword themes & search intent → route mapping

| Route                                      | Keyword theme                                                                       | Intent                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------- |
| `/`                                        | integrated technology partner; software, AI, automation, security, growth           | brand / evaluate integrated partner |
| `/services`                                | technology services; software, AI, cybersecurity, marketing                         | evaluate services                   |
| `/services/agentic-ai`                     | agentic AI, AI agents, multi-agent workflows                                        | deploy production AI responsibly    |
| `/services/ai-agents-automation`           | business process automation, workflow automation                                    | automate manual workflows           |
| `/services/automated-software-development` | automated software development, CI/CD, AI-assisted engineering                      | responsible AI-assisted delivery    |
| `/services/custom-software-development`    | custom software, business applications, systems integration                         | build custom software               |
| `/services/web-application-development`    | web development, web apps, accessible websites                                      | build a website/app                 |
| `/services/ai-cybersecurity`               | AI cybersecurity, security automation, defensive security                           | defensive security support          |
| `/services/digital-marketing`              | digital marketing, SEO, conversion optimization                                     | measurable growth                   |
| `/solutions/*`                             | process automation, AI adoption, modernization, security automation, digital growth | situation-based                     |
| `/industries`                              | industry technology solutions                                                       | sector fit                          |
| `/how-we-work`                             | delivery process, engagement model                                                  | reduce risk                         |
| `/insights/*`                              | AI agents value, what to automate, build-vs-buy                                     | informational                       |

Services are **not** all forced onto the homepage for ranking; each has its own
intent-matched page.

## Metadata plan

- Central helper `pageMetadata()` (`src/lib/seo.ts`) builds a unique title, meta
  description, canonical URL, Open Graph, and Twitter card per route; root defaults
  and title template set in `rootMetadata`.
- Every indexable route has a unique, non-empty title and description (verified by
  a unit test). `metadataBase` set for correct absolute URLs.
- `/thank-you` and `/404` are `noindex`.

## Internal-linking map

- Global: header nav + Services mega menu; footer links every service, resource,
  and legal page on every page.
- Home → pillars, services, solutions, industries, how-we-work, insights, contact.
- Each **service** → 3 related services + primary/secondary CTA + breadcrumb.
- Each **solution** → mapped services + recommended next step.
- Each **article** → related services + CTA.
- Breadcrumbs on all interior pages (with `BreadcrumbList` schema).

## Structured data (JSON-LD) plan

Implemented in `src/components/seo/StructuredData.tsx`, injected per route:

- **Organization** + **WebSite** — global (root layout).
- **Service** + **BreadcrumbList** + **FAQPage** — service pages.
- **BreadcrumbList** — services/solutions/industries/how-we-work/about/case-studies/
  insights.
- **Article** — insight articles; **ContactPage** — contact.
- **FAQPage** — homepage and services overview.

Deliberately omitted (unverified): phone, logo URL, social profiles, founders,
review/aggregate ratings, awards, unsupported service areas. All JSON-LD is fully
server-controlled (no user input).

## Technical SEO

Clean URLs; logical heading hierarchy (one H1/page); descriptive anchor text and
alt text; decorative SVGs marked `aria-hidden`; generated `sitemap.xml` and
`robots.txt`; correct `lang`/viewport; canonical tags; branded `opengraph-image`.

## Local SEO

The Salem, OR address is used accurately in footer, contact, and Organization
schema **without** implying a walk-in office, service area, or multiple locations.
No fake city landing pages.

## Content-growth recommendations

- Expand Insights gradually with high-quality evergreen pieces (one per quarter is
  fine); avoid thin posts.
- Add real case studies as verified/approved content becomes available (data model
  is ready).
- Consider dedicated solution/industry deep-dives only where distinct intent and
  substantial content justify them.

## Risks & limitations

- Rankings, traffic, and leads are never guaranteed; copy avoids such promises.
- Structured data should be re-validated (Rich Results Test / Schema.org validator)
  after the production domain is live.
- If analytics/consent or social profiles are added later, update metadata, CSP,
  and schema accordingly.
