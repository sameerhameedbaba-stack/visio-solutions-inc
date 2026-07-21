import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { company, formattedAddress } from '@/content/company';
import { differentiators } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export const metadata: Metadata = pageMetadata({
  title: 'About Visio Solutions Inc.',
  description:
    'Visio Solutions designs the systems behind how a business operates and grows, then connects the software, automation, AI, security, and measurement required to run them.',
  path: '/about',
});

const responsibleApproach = [
  {
    title: 'Responsible AI',
    description:
      'AI is applied where it creates measurable operational value, with defined human approval points, guardrails, evaluation criteria, and monitoring set before anything reaches production.',
  },
  {
    title: 'Software quality',
    description:
      'Systems are built on maintainable architecture with automated testing and human code review, so what we deliver stays an asset your team can operate and extend.',
  },
  {
    title: 'Security by design',
    description:
      'Security is designed into architecture and delivery — least-privilege access, input validation, dependency scanning, and secure defaults — with scope and limitations stated plainly.',
  },
  {
    title: 'Documentation and handover',
    description:
      'Every engagement produces documentation and a clean handover, so ownership stays with you and you are never dependent on a single vendor to keep running.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="About"
        title="An integrated technology partner, built around outcomes"
        headline="We design the systems behind how a business operates and grows — then connect the software, automation, AI, security, and measurement required to run them."
        intro={`${company.name} helps organizations turn operational problems into practical digital systems: software built around real workflows, AI deployed where it adds value, processes automated with control, systems strengthened through security-conscious engineering, and growth made measurable.`}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta="discussProject" size="lg" withArrow />
            <CtaButton cta="seeHowWeWork" variant="secondary" size="lg" />
          </>
        }
      />

      {/* What we help organizations accomplish + why connected systems matter */}
      <Section ariaLabel="Our philosophy">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="What we do"
              title="Business first, technology in service of it"
              intro="We begin with the outcome you need — then choose the software, AI, automation, security, and growth work that delivers it."
            />
            <div className="prose-content text-muted-foreground">
              <p>
                Operational problems rarely have single-tool answers. A slow process, a manual
                hand-off, a system that cannot talk to the next one — these are systems problems.
                Visio Solutions designs the system that resolves them, then builds and connects the
                parts required to run it.
              </p>
              <p>
                Connected systems matter because software, AI, automation, security, and growth are
                facets of the same operation, not separate purchases. Designed together, they
                reinforce each other: automation runs on reliable software, AI acts within secure
                boundaries, and growth is measured against real data. Bought in isolation, they tend
                to pull apart.
              </p>
              <p>
                That is why we work as one accountable team across all five. It keeps decisions
                coherent — and keeps you talking to the people who will actually build the result.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* How we make technology decisions */}
      <Section tone="subtle" ariaLabel="How we make technology decisions">
        <Container>
          <SectionHeading
            eyebrow="How we decide"
            title="Technology decisions grounded in the business"
            intro="We start from the objective, the workflow, and the constraints — then select the simplest approach that reliably meets them."
          />
          <div className="mt-10">
            <FeatureGrid features={differentiators.slice(0, 8)} columns={4} tone="plain" />
          </div>
        </Container>
      </Section>

      {/* Responsible AI, quality, security, maintainability */}
      <Section ariaLabel="Delivery principles">
        <Container>
          <SectionHeading
            eyebrow="Delivery principles"
            title="How we build, secure, and hand over"
          />
          <div className="mt-10">
            <FeatureGrid features={responsibleApproach} columns={4} />
          </div>
        </Container>
      </Section>

      {/* Contact details — business/mailing address, no unverified registration claim */}
      <Section tone="subtle" ariaLabel="Contact details">
        <Container width="prose">
          <div className="rounded-feature border border-border bg-surface p-6 shadow-card sm:p-8">
            <SectionHeading as="h2" eyebrow="Get in touch" title="Talk to the team" />
            <div className="prose-content mt-6 text-muted-foreground">
              <p>
                {company.name} is a United States company. You can reach the team by email at{' '}
                <a href={`mailto:${company.email}`}>{company.email}</a>, or by mail at our business
                address: {formattedAddress}.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Prefer a conversation to a brochure?"
        body="Tell us what you’re trying to achieve, and we’ll suggest a sensible first step."
        primary="discussProject"
        secondary="strategyCall"
      />
    </>
  );
}
