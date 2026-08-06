# LAUNCH_CHECKLIST.md

Status legend: ✅ done in repo · ⚙️ needs configuration/credentials · 👤 needs human
review · 🔎 verify against live production.

## Domain & hosting

- [ ] ⚙️ DNS configured for `visiosolutions.net`
- [ ] ⚙️ SSL/TLS certificate issued and valid
- [x] ✅ Canonical domain set via `NEXT_PUBLIC_SITE_URL` (default
      `https://visiosolutions.net`)
- [ ] 👤 WWW ↔ apex redirect decision (pick one canonical host, redirect the other)
- [ ] ⚙️ Environment variables set in the hosting platform (see `.env.example`)
- [x] ✅ Production build passes (`npm run build`)
- [ ] 🔎 Hosting compatibility confirmed (Node ≥18.18 / Next.js 15 platform)

## SEO

- [x] ✅ `sitemap.xml` generated
- [x] ✅ `robots.txt` generated (disallows `/thank-you`, `/payment/`, `/api/`)
- [x] ✅ Canonical tags on every route
- [x] ✅ Unique metadata (title/description) per route; `noindex` on
      thank-you/404
- [x] ✅ JSON-LD (Organization, WebSite, Service, BreadcrumbList, Article,
      FAQPage, ContactPage)
- [ ] 🔎 Validate structured data (Rich Results Test / Schema validator) on live URL
- [ ] ⚙️ Submit sitemap in Google Search Console; verify property
- [ ] 🔎 Verify redirects once live

## Forms & email

- [x] ✅ Contact form with client + server validation, honeypot, rate limiting
- [x] ✅ Provider abstraction (`console` default; `resend` ready)
- [ ] ⚙️ `CONTACT_EMAIL_PROVIDER=resend` + `RESEND_API_KEY` (or chosen provider)
- [ ] ⚙️ Sender domain authenticated: **SPF, DKIM, DMARC**
- [x] ✅ Spam protection (honeypot) tested
- [x] ✅ Rate limiting tested (in-memory; use a distributed store —
      e.g. Upstash Redis — for multi-instance/serverless deployments)
- [ ] 🔎 Production submission test (real inquiry delivered to `CONTACT_TO_EMAIL`)
- [ ] 👤 Privacy notice on the form approved
- [ ] 👤 Form-notification ownership assigned (who monitors inquiries)

## Payment gateway

See `PAYMENT_GATEWAY_SETUP.md` for the three URLs to paste into the provider's
merchant configuration form and the full rationale.

- [x] ✅ `/payment/success/` and `/payment/cancel/` built, `noindex`, excluded from
      the sitemap, served `no-store`
- [x] ✅ `/payment/notify.php` notification receiver (bounded input, redacted
      bank/credential fields, log written outside the web root, rate-limited email)
- [x] ✅ Matching Next.js route handler for Node deployments
- [ ] ⚙️ Three URLs registered in the provider's form, using **`https://`** and the
      apex domain
- [ ] 👤 Ask the provider: notification method (GET/POST), full parameter list,
      source IP ranges, and retry behaviour
- [ ] ⚙️ Optional `shared_secret` and/or `allowed_ips` configured in
      `notify-config.php` (kept **outside** `public_html`, never committed)
- [ ] 🔎 `curl` the notification URL on production; confirm `200 OK`, the log line,
      and the notification email
- [ ] 🔎 One real minimum-value transaction end to end
- [ ] 👤 Reconciliation owner assigned — a notification is not proof of settlement,
      and e-check/ACH debits can be returned days later
- [ ] 👤 Refund / cancellation policy page, if the provider requires one for
      merchant review (not built)
- [ ] ⚙️ `PAYMENT_GATEWAY_ORIGIN` set at build time if a "Pay now" form is added
      (otherwise CSP `form-action` blocks the submission)

## Legal

- [ ] 👤 Privacy Policy reviewed & approved by counsel (currently a marked draft)
- [ ] 👤 Terms of Use reviewed; **governing-law placeholder finalized**
- [ ] 👤 Cookie Policy reviewed
- [x] ✅ Consent checkbox on contact form; essential-storage-only (no manipulative
      banner)

## Analytics

- [x] ✅ Privacy-conscious analytics abstraction (disabled until configured)
- [ ] ⚙️ `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set (if analytics desired)
- [ ] ⚙️ If analytics enabled, add its host to CSP `script-src`/`connect-src`
- [x] ✅ PII excluded from analytics events by design
- [ ] 🔎 Conversion events verified in production

## Quality

- [x] ✅ Type check, lint, unit tests, E2E, and axe (light+dark) all pass
- [ ] 🔎 Production Lighthouse audit (targets: Perf 90+, A11y 95+, BP 95+, SEO 95+)
- [ ] 🔎 Manual cross-browser check (Safari, Firefox, Edge)
- [ ] 🔎 Manual screen-reader + 200% zoom pass
- [x] ✅ Responsive testing (mobile + desktop; no overflow/overlap)
- [ ] 🔎 Broken-link scan on live site
- [x] ✅ Content proofreading (US English, consistent official details)
- [x] ✅ Security headers present (CSP, HSTS, X-CTO, X-Frame-Options, Referrer,
      Permissions, COOP)
- [x] ✅ Dependency posture reviewed; no secrets committed

## Content

- [x] ✅ Official details verified & consistent (name, email, address, domain)
- [x] ✅ No placeholder/lorem copy; no "coming soon"
- [x] ✅ No fabricated claims; illustrative content labelled
- [ ] 👤 Real proof (logos/testimonials/case studies) approved before any display
- [ ] 👤 Social links verified (none present until confirmed)
- [ ] 🔎 Contact email verified as monitored

## Operations

- [x] ✅ Repository documented (`README.md` + strategy docs)
- [ ] 👤 Deployment procedure documented for chosen platform
- [ ] 👤 Rollback procedure documented
- [ ] 👤 Ownership documented (site, forms, analytics)
- [ ] ⚙️ Optional: error monitoring (e.g. Sentry) wired up

## Future hardening (optional)

- Nonce-based CSP (removes `'unsafe-inline'` for scripts; note it forces dynamic
  rendering — weigh against static-generation performance).
- Distributed rate-limit store for serverless/multi-instance.
- `app/icon` + `favicon.ico` from approved brand assets.

---

**Launch prerequisites that are true blockers** (all external, not code defects):
email provider + sender-domain auth, and legal review of the three policy drafts.
Everything else in the codebase is complete and verified.
