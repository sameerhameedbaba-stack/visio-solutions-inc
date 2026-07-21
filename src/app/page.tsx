import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { services } from '@/content/services';
import {
  businessProblems,
  differentiators,
  generalFaqs,
  howWeWorkSteps,
  illustrativeUseCases,
  integratedLayers,
} from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { Reveal } from '@/components/ui/Reveal';
import { ServicePillarGrid } from '@/components/marketing/ServicePillarGrid';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { SystemsDiagram } from '@/components/marketing/SystemsDiagram';
import { FaqSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = pageMetadata({
  title: `${company.name} — Software, AI and automation for how your business operates`,
  description:
    'Visio Solutions designs and develops custom software, connected workflows, practical AI systems, security-conscious infrastructure, and measurable growth programs around how your organization actually works.',
  path: '/',
  ogTitle: 'Build the systems your business needs to operate, automate, and grow.',
});

export default function HomePage() {
  return (
    <>
      <FaqSchema faqs={generalFaqs} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-subtle via-background to-background">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
            <div className="flex flex-col gap-5">
              <span className="text-eyebrow font-semibold uppercase tracking-wider text-accent">
                Software, AI and automation for business operations
              </span>
              <h1 className="text-h1 font-bold text-foreground">
                Build the systems your business needs to operate, automate, and grow.
              </h1>
              <p className="max-w-xl text-body-lg text-muted-foreground">
                Visio Solutions designs and develops custom software, connected workflows, practical
                AI systems, security-conscious digital infrastructure, and measurable growth programs
                around the way your organization actually works.
              </p>
              <div className="mt-1 flex flex-wrap gap-3">
                <CtaButton cta="discussProject" size="lg" withArrow />
                <CtaButton
                  cta="exploreServices"
                  variant="secondary"
                  size="lg"
                  labelOverride="Explore our capabilities"
                />
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

      {/* Connected capabilities */}
      <Section ariaLabel="Connected capabilities" size="sm">
        <Container>
          <SectionHeading
            eyebrow="Four connected capabilities"
            title="One team across the systems your business runs on"
            intro="Each capability stands on its own. Their value comes from how they work together on the same engagement."
          />
          <div className="mt-10">
            <ServicePillarGrid />
          </div>
        </Container>
      </Section>

      {/* Business problems */}
      <Section tone="subtle" ariaLabel="Business problems we address">
        <Container>
          <SectionHeading
            eyebrow="Where growth gets stuck"
            title="The operational problems we help solve"
            intro="Most organizations recognize a few of these. Each one is a systems problem before it is a technology problem."
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

      {/* How Visio approaches them */}
      <Section ariaLabel="How Visio approaches these problems">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="How we approach it"
              title="Start from the objective, then build outward in layers"
              intro="We begin with the business objective, the workflow, and the constraints — then assemble the software, integration, AI, security, and measurement layers required to run it."
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

      {/* Selected services */}
      <Section tone="surface" ariaLabel="Selected services">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="What we build and run"
              title="Services across four capabilities"
              intro="Seven services, delivered by one accountable team."
            />
            <Link
              href="/services"
              className="inline-flex min-h-[24px] flex-shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:text-brand-hover"
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

      {/* Representative use cases (three) */}
      <Section tone="subtle" ariaLabel="Representative use cases">
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="What integrated delivery looks like in practice"
            intro="Representative scenarios that show how the layers combine to solve a defined problem."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {illustrativeUseCases.slice(0, 3).map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
          <p className="mt-6">
            <Link
              href="/use-cases"
              className="inline-flex min-h-[24px] items-center gap-1 text-sm font-semibold text-accent hover:text-brand-hover"
            >
              See more use cases
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </Container>
      </Section>

      {/* Delivery method */}
      <Section ariaLabel="How we deliver">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Delivery method"
                title="A phased method with defined roles and quality gates"
                intro="Seven stages, adapted to each engagement. Architecture, controls, evaluation criteria, and responsibilities are defined before production."
              />
              <div className="mt-6">
                <CtaButton cta="seeHowWeWork" variant="secondary" withArrow />
              </div>
            </div>
            <ProcessTimeline steps={howWeWorkSteps} />
          </div>
        </Container>
      </Section>

      {/* Practical differentiators */}
      <Section tone="surface" ariaLabel="How working with us differs">
        <Container>
          <SectionHeading
            eyebrow="What working with us looks like"
            title="How Visio Solutions approaches delivery"
            intro="Practical principles that shape every engagement — from first discovery call to handover."
          />
          <div className="mt-10">
            <FeatureGrid features={differentiators.slice(0, 6)} columns={3} />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="subtle" ariaLabel="Frequently asked questions">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow="FAQ" title="Questions worth asking up front" />
            <FAQSection faqs={generalFaqs} />
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTASection
        title="Let’s identify the systems, workflows, or growth constraints worth solving first"
        body="Tell us the problem you’re trying to solve. We’ll point you to a sensible first step — an assessment, a focused project, or a strategy call."
        primary="discussProject"
        secondary="strategyCall"
      />
    </>
  );
}
