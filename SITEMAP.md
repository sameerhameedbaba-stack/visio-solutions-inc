# SITEMAP.md

Canonical domain: **https://visiosolutions.net**. A machine-readable sitemap is
generated at `/sitemap.xml` (`src/app/sitemap.ts`); crawl rules are at
`/robots.txt` (`src/app/robots.ts`).

Legend: **Idx** = indexation recommendation.

| Route                                      | Purpose                               | Primary audience  | Search intent                         | Primary CTA           | Secondary CTA        | Parent       | Idx         |
| ------------------------------------------ | ------------------------------------- | ----------------- | ------------------------------------- | --------------------- | -------------------- | ------------ | ----------- |
| `/`                                        | Explain the integrated model; convert | All               | Brand / integrated tech partner       | Book a strategy call  | Explore services     | —            | index       |
| `/services`                                | Overview; help self-select            | All               | Technology services                   | Book a strategy call  | See how we work      | `/`          | index       |
| `/services/agentic-ai`                     | Agentic AI solutions                  | Tech/AI buyers    | Agentic AI, AI agents                 | Request an assessment | See how we work      | `/services`  | index       |
| `/services/ai-agents-automation`           | AI agents & business automation       | Ops leaders       | Business process automation           | Request an assessment | Explore services     | `/services`  | index       |
| `/services/automated-software-development` | AI-assisted, reviewed engineering     | Tech leaders      | Automated software development        | Discuss your project  | See how we work      | `/services`  | index       |
| `/services/custom-software-development`    | Custom applications                   | Tech/ops leaders  | Custom software development           | Discuss your project  | See how we work      | `/services`  | index       |
| `/services/web-application-development`    | Web & app development                 | Product/marketing | Web application development           | Discuss your project  | Explore services     | `/services`  | index       |
| `/services/ai-cybersecurity`               | Defensive security engineering        | Security leaders  | AI cybersecurity, security automation | Request an assessment | See how we work      | `/services`  | index       |
| `/services/digital-marketing`              | Growth systems                        | Marketing leaders | Digital marketing, SEO                | Discuss your project  | Explore services     | `/services`  | index       |
| `/solutions`                               | Business-need framing                 | All               | Business technology solutions         | Book a strategy call  | —                    | `/`          | index       |
| `/solutions/process-automation`            | Reduce manual work                    | Ops leaders       | Process automation                    | Request an assessment | —                    | `/solutions` | index       |
| `/solutions/ai-adoption`                   | Deploy AI safely                      | Tech/exec         | AI adoption                           | Request an assessment | —                    | `/solutions` | index       |
| `/solutions/digital-product-development`   | Build a product                       | Product/founders  | Custom product development            | Discuss your project  | —                    | `/solutions` | index       |
| `/solutions/application-modernization`     | Modernize legacy                      | Tech leaders      | Application modernization             | Request an assessment | —                    | `/solutions` | index       |
| `/solutions/security-automation`           | Improve security ops                  | Security leaders  | Security automation                   | Request an assessment | —                    | `/solutions` | index       |
| `/solutions/digital-growth`                | Measurable growth engine              | Marketing leaders | Digital growth                        | Discuss your project  | —                    | `/solutions` | index       |
| `/industries`                              | Adaptable sector patterns             | All               | Industry technology solutions         | Book a strategy call  | Explore services     | `/`          | index       |
| `/how-we-work`                             | Reduce buyer risk                     | All               | Delivery process                      | Book a strategy call  | Discuss your project | `/`          | index       |
| `/about`                                   | Philosophy & principles               | All               | About the company                     | Book a strategy call  | See how we work      | `/`          | index       |
| `/case-studies`                            | Problem types + illustrative cases    | All               | Case studies                          | Discuss your project  | Book a strategy call | `/`          | index       |
| `/insights`                                | Article index                         | All               | Technology insights                   | Book a strategy call  | Explore services     | `/`          | index       |
| `/insights/[slug]`                         | Evergreen articles (×3)               | All               | Topic-specific                        | Book a strategy call  | Discuss your project | `/insights`  | index       |
| `/contact`                                 | B2B lead capture                      | High-intent       | Contact / start project               | Send inquiry          | —                    | `/`          | index       |
| `/thank-you`                               | Submission confirmation               | Converters        | —                                     | —                     | —                    | `/contact`   | **noindex** |
| `/privacy`                                 | Privacy Policy (draft)                | All               | Legal                                 | —                     | —                    | `/`          | index       |
| `/terms`                                   | Terms of Use (draft)                  | All               | Legal                                 | —                     | —                    | `/`          | index       |
| `/cookies`                                 | Cookie Policy (draft)                 | All               | Legal                                 | —                     | —                    | `/`          | index       |
| `/404` (not-found)                         | Custom not-found                      | All               | —                                     | Back to home          | Explore services     | —            | **noindex** |

## Notes

- Optional supporting solution routes were created (6 of them) because each has
  distinct intent, buyer need, and substantial content. No thin, low-value SEO
  pages were generated.
- `/thank-you` and the API route are excluded from the sitemap and disallowed in
  `robots.txt`; `/thank-you` and `/404` are `noindex`.
- Insights currently ships 3 high-quality evergreen articles rather than many
  shallow posts.
