import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { services } from '@/content/services';
import {
  agenticAiExplainer,
  businessProblems,
  differentiators,
  generalFaqs,
  howWeWorkSteps,
  illustrativeUseCases,
  integratedLayers,
  trustPrinciples,
} from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { CtaButton } from '@/components/ui/CtaButton';
import { Reveal } from '@/components/ui/Reveal';
import { ServicePillarGrid } from '@/components/marketing/ServicePillarGrid';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { SystemsDiagram } from '@/components/marketing/SystemsDiagram';
import { FaqSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = pageMetadata({
  title: `${company.name} — Integrated software, AI, automation, security, and growth`,
  description: company.description,
  path: '/',
  ogTitle: 'Build smarter digital systems — software, AI, automation, security, and growth as one.',
});

export default function HomePage() {
  return (
    <>
      <FaqSchema faqs={generalFaqs} />

      {/* SECTION 2 — HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-subtle via-background to-background">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge tone="brand">Integrated technology partner</Badge>
              <h1 className="text-h1 font-bold text-foreground">
                Build smarter digital systems with software, AI, automation, security, and growth
                working together.
              </h1>
              <p className="max-w-xl text-body-lg text-muted-foreground">
                Visio Solutions helps organizations design and build software, automate workflows,
                deploy practical AI systems, strengthen digital operations, and create measurable
                growth infrastructure — as one connected system, not disconnected services.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <CtaButton cta="strategyCall" size="lg" withArrow />
                <CtaButton cta="exploreServices" variant="secondary" size="lg" />
              </div>
            </div>
            <Reveal className="w-full">
              <div className="rounded-feature border border-border bg-surface/70 p-6 shadow-card backdrop-blur-sm sm:p-8">
                <p className="text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
                  How the layers connect
                </p>
                <SystemsDiagram className="mt-4" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Operations and software feed AI and automation, protected by security controls and
                  measured by connected growth systems.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — CAPABILITY STRIP */}
      <Section ariaLabel="Capabilities" size="sm">
        <Container>
          <SectionHeading
            eyebrow="Four connected capabilities"
            title="A single team across the systems you depend on"
            intro="Each capability stands on its own. Their real value is in how they combine."
          />
          <div className="mt-10">
            <ServicePillarGrid />
          </div>
        </Container>
      </Section>

      {/* SECTION 4 — BUSINESS PROBLEMS */}
      <Section tone="subtle" ariaLabel="Business problems we address">
        <Container>
          <SectionHeading
            eyebrow="The problems worth solving"
            title="Where growth quietly gets stuck"
            intro="Not every organization has every one of these — but most recognize a few."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessProblems.map((problem, index) => (
              <Reveal as="li" key={problem.title} delay={index * 30}>
                <div className="h-full rounded-card border border-border bg-surface p-6 shadow-card">
                  <h3 className="text-base font-semibold text-foreground">{problem.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{problem.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* SECTION 5 — INTEGRATED SOLUTION ECOSYSTEM */}
      <Section ariaLabel="How our work connects">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="An integrated model"
              title="Start from the objective, build outward in layers"
              intro="We do not begin with technology. We begin with the outcome, then assemble the layers that get there — each one building on the last."
            />
            <ol className="relative flex flex-col gap-3">
              {integratedLayers.map((layer, index) => (
                <Reveal as="li" key={layer.label} delay={index * 40}>
                  <div className="flex items-start gap-4 rounded-card border border-border bg-surface p-4 shadow-card">
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-accent"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{layer.label}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{layer.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* SECTION 6 — CORE SERVICES */}
      <Section tone="surface" ariaLabel="Core services">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Core services"
              title="What we build and run"
              intro="Seven services across four capabilities, delivered by one accountable team."
            />
            <Link
              href="/services"
              className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:text-brand-hover"
            >
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 30}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <h3 className="text-base font-semibold text-foreground">{service.navLabel}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* SECTION 7 — AGENTIC AI */}
      <Section tone="navy" ariaLabel="Agentic AI in business terms">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Agentic AI, explained plainly"
                title="AI agents that solve defined problems — not novelties"
                intro={agenticAiExplainer.whatItIs}
                tone="onDark"
              />
              <ul className="mt-6 flex flex-col gap-3">
                {agenticAiExplainer.principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-3 text-slate-200">
                    <span aria-hidden="true" className="mt-1 text-brand-bright">
                      ◆
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaButton cta="exploreAi" variant="onDark" withArrow />
              </div>
            </div>
            <div className="rounded-feature border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="text-eyebrow font-semibold uppercase tracking-wider text-brand-bright">
                Where agents help
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-slate-200">
                {agenticAiExplainer.whereUseful.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
                Shown as potential and illustrative use cases — not completed client results.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTIONS 8–10 — CAPABILITY DEEP-DIVE (Software / Security / Marketing) */}
      <Section ariaLabel="Engineering, security, and growth">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Software engineering with accountability',
                body: 'Custom applications, web platforms, internal tools, integrations, and modernization — with quality engineering and human oversight. Automated development means AI-assisted, human-reviewed engineering, never unreviewed code generation.',
                href: '/services/custom-software-development',
                cta: 'Explore software engineering',
              },
              {
                title: 'Security-conscious by design',
                body: 'Defensive security engineering: secure development practices, AI-assisted alert enrichment, and monitoring integration — with human oversight and honest limits. We do not promise complete protection or claim certifications.',
                href: '/services/ai-cybersecurity',
                cta: 'Explore cybersecurity',
              },
              {
                title: 'Growth you can measure',
                body: 'SEO, performance marketing, conversion optimization, and marketing automation connected to your website, CRM, and reporting — so decisions rest on real data. No guaranteed rankings or revenue.',
                href: '/services/digital-marketing',
                cta: 'Explore digital growth',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-card border border-border bg-surface p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-brand-hover"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 11 — HOW WE WORK */}
      <Section tone="subtle" ariaLabel="How we work">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="How we work"
                title="A clear, phased method that reduces risk"
                intro="Seven stages, adapted to each engagement. You always know what happens next, what we need, and what you get."
              />
              <div className="mt-6">
                <CtaButton cta="seeHowWeWork" variant="secondary" withArrow />
              </div>
            </div>
            <ProcessTimeline steps={howWeWorkSteps} />
          </div>
        </Container>
      </Section>

      {/* SECTION 12 — INDUSTRIES */}
      <Section ariaLabel="Industries">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Adapted to how different industries actually operate"
            intro="Solutions can be adapted for a range of sectors. These groupings describe patterns, not claimed clients or verified sector credentials."
          />
          <div className="mt-10">
            <IndustryGrid />
          </div>
        </Container>
      </Section>

      {/* SECTION 13 — WHY VISIO */}
      <Section tone="surface" ariaLabel="Why Visio Solutions">
        <Container>
          <SectionHeading
            eyebrow="Why Visio Solutions"
            title="Defensible reasons to work with us"
            intro="No superiority claims we cannot prove — just the principles that shape how we deliver."
          />
          <div className="mt-10">
            <FeatureGrid features={differentiators} columns={4} />
          </div>
        </Container>
      </Section>

      {/* SECTION 14 — ILLUSTRATIVE USE CASES */}
      <Section tone="subtle" ariaLabel="Illustrative use cases">
        <Container>
          <SectionHeading
            eyebrow="Illustrative use cases"
            title="What integrated delivery can look like"
            intro="Clearly labelled illustrative scenarios — never presented as completed client work, and never with invented numbers."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {illustrativeUseCases.map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 15 — TRUST */}
      <Section ariaLabel="How we build trust">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Trust, earned honestly"
              title="Capability-led trust, not manufactured proof"
              intro="We do not display invented testimonials, client logos, or metrics. Trust is built through process, standards, and responsible engineering — with real proof added only once it is verified."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {trustPrinciples.map((principle) => (
                <li
                  key={principle.title}
                  className="rounded-card border border-border bg-surface p-5 shadow-card"
                >
                  <h3 className="text-base font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{principle.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* SECTION 16 — FAQ */}
      <Section tone="subtle" ariaLabel="Frequently asked questions">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow="FAQ" title="Questions worth asking up front" />
            <FAQSection faqs={generalFaqs} />
          </div>
        </Container>
      </Section>

      {/* SECTION 17 — FINAL CTA */}
      <CTASection
        title="Let’s identify the systems, workflows, or growth constraints worth solving first"
        body="A strategy call is a focused conversation about your goals — not a sales pitch. We will point you to the most useful next step, even if that is not us."
        primary="strategyCall"
        secondary="discussProject"
      />
    </>
  );
}
