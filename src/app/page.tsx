import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';
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
import ScrollReveal from '@/components/bits/ScrollReveal';
import { ServicePillarGrid } from '@/components/marketing/ServicePillarGrid';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { HomeHero } from '@/components/marketing/home/HomeHero';
import { LayerStack } from '@/components/marketing/home/LayerStack';
import { ServiceSpotlightGrid } from '@/components/marketing/home/ServiceSpotlightGrid';
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

      <HomeHero />

      {/* Connected capabilities */}
      <Section ariaLabel="Connected capabilities">
        <Container>
          <SectionHeading
            eyebrow="Four connected capabilities"
            title="One team across the systems your business runs on"
            highlight="the systems your business runs on"
            intro="Each capability stands on its own. Their value comes from how they work together on the same engagement."
          />
          <div className="mt-12">
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
          />
          <ScrollReveal
            as="p"
            baseOpacity={0.2}
            baseRotation={0}
            blurStrength={3}
            containerClassName="mt-8 max-w-4xl"
            textClassName="font-display !text-[clamp(1.6rem,3.4vw,2.6rem)] !leading-[1.25] !font-bold tracking-tight text-foreground"
          >
            Most organizations recognize a few of these. Each one is a systems problem before it is
            a technology problem.
          </ScrollReveal>
          <div className="mt-12">
            <FeatureGrid features={businessProblems} columns={3} />
          </div>
        </Container>
      </Section>

      {/* How Visio approaches them */}
      <Section tone="ink" ariaLabel="How Visio approaches these problems">
        <div
          className="pointer-events-none absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
          style={{
            backgroundImage:
              'radial-gradient(closest-side, rgba(124,58,237,.7), rgba(219,39,119,.35) 55%, transparent)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full opacity-35 blur-3xl"
          style={{
            backgroundImage:
              'radial-gradient(closest-side, rgba(37,99,235,.7), rgba(6,182,212,.3) 55%, transparent)',
          }}
          aria-hidden="true"
        />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="How we approach it"
                title="Start from the objective, then build outward in layers"
                highlight="build outward in layers"
                intro="We begin with the business objective, the workflow, and the constraints — then assemble the software, integration, AI, security, and measurement layers required to run it."
              />
            </div>
            <LayerStack layers={integratedLayers} />
          </div>
        </Container>
      </Section>

      {/* Selected services */}
      <Section ariaLabel="Selected services">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="What we build and run"
              title="Services across four capabilities"
              highlight="four capabilities"
              intro="Seven services, delivered by one accountable team."
            />
            <Link
              href="/services"
              className="group inline-flex min-h-[24px] flex-shrink-0 items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-accent shadow-sm ring-1 ring-inset ring-border transition-all hover:ring-spectrum-violet/50"
            >
              View all services
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="mt-12">
            <ServiceSpotlightGrid />
          </div>
        </Container>
      </Section>

      {/* Representative use cases (three) */}
      <Section tone="subtle" ariaLabel="Representative use cases">
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="What integrated delivery looks like in practice"
            highlight="integrated delivery"
            intro="Representative scenarios that show how the layers combine to solve a defined problem."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {illustrativeUseCases.slice(0, 3).map((useCase, index) => (
              <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/use-cases"
              className="group inline-flex min-h-[24px] items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              See more use cases
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </p>
        </Container>
      </Section>

      {/* Delivery method */}
      <Section ariaLabel="How we deliver">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Delivery method"
                title="A phased method with defined roles and quality gates"
                highlight="defined roles and quality gates"
                intro="Seven stages, adapted to each engagement. Architecture, controls, evaluation criteria, and responsibilities are defined before production."
              />
              <div className="mt-8">
                <CtaButton cta="seeHowWeWork" variant="secondary" withArrow />
              </div>
            </div>
            <ProcessTimeline steps={howWeWorkSteps} />
          </div>
        </Container>
      </Section>

      {/* Practical differentiators */}
      <Section tone="subtle" ariaLabel="How working with us differs">
        <Container>
          <SectionHeading
            eyebrow="What working with us looks like"
            title="How Visio Solutions approaches delivery"
            intro="Practical principles that shape every engagement — from first discovery call to handover."
          />
          <div className="mt-12">
            <FeatureGrid features={differentiators.slice(0, 6)} columns={3} />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section ariaLabel="Frequently asked questions">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="FAQ"
                title="Questions worth asking up front"
                highlight="up front"
              />
            </div>
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
