import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { company, formattedAddress } from '@/content/company';
import { differentiators, trustPrinciples } from '@/content/site';
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
  title: `About ${company.name}`,
  description:
    'Visio Solutions is an integrated technology partner. Learn our business-first philosophy and our approach to responsible AI, software quality, security, and client collaboration.',
  path: '/about',
});

const approach = [
  {
    title: 'Responsible AI',
    description:
      'We apply AI where it creates real value, with human oversight, guardrails, and honest limits — never as a novelty or an unsupervised black box.',
  },
  {
    title: 'Software quality',
    description:
      'Maintainable architecture, automated testing, and human review are defaults, so what we build stays an asset rather than becoming debt.',
  },
  {
    title: 'Security',
    description:
      'Security is designed into how systems are built and operated, with defensive scope and clearly documented limitations.',
  },
  {
    title: 'Client collaboration',
    description:
      'We work in phases, communicate technical decisions plainly, and hand over documentation and ownership so you are never dependent on us to keep running.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="About"
        title="An integrated technology partner, built around outcomes"
        headline="We connect software, AI, automation, security, and growth so they reinforce each other."
        intro={`${company.name} exists to help organizations turn operational problems into practical digital systems — software built around real workflows, AI deployed where it genuinely helps, processes automated with control, systems strengthened through security-conscious engineering, and growth made measurable.`}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta="strategyCall" size="lg" withArrow />
            <CtaButton cta="seeHowWeWork" variant="secondary" size="lg" />
          </>
        }
      />

      <Section ariaLabel="What we believe">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Our philosophy"
              title="Business first, technology second"
              intro="Technology is only useful when it solves a real problem. We start from the outcome you need and choose the software, AI, automation, security, and growth work that gets you there — not the other way around."
            />
            <div className="prose-content text-muted-foreground">
              <p>
                Too many technology decisions start with a tool and look for a problem to apply it
                to. We work in the opposite direction. We begin by understanding the workflow, the
                constraint, and the goal, then decide what — if anything — should be built,
                automated, or connected.
              </p>
              <p>
                That is also why we are deliberately integrated. Software, AI, automation, security,
                and growth are not separate purchases in a business; they are facets of the same
                operation. When they are designed together, they reinforce each other. When they are
                bought in isolation, they tend to pull apart.
              </p>
              <p>
                We are equally deliberate about what we do not do. We do not oversell AI, promise
                guaranteed outcomes, or claim protection and results we cannot support. Where we
                lack verified proof, we say so, and we build trust through process and standards
                instead.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" ariaLabel="Our approach">
        <Container>
          <SectionHeading
            eyebrow="How we approach the work"
            title="Principles that shape every engagement"
          />
          <div className="mt-10">
            <FeatureGrid features={approach} columns={4} />
          </div>
        </Container>
      </Section>

      <Section ariaLabel="What makes us different">
        <Container>
          <SectionHeading eyebrow="Differentiators" title="Why organizations work with us" />
          <div className="mt-10">
            <FeatureGrid features={differentiators} columns={4} tone="plain" />
          </div>
        </Container>
      </Section>

      {/* Transparent note in place of fabricated company story / team. */}
      <Section tone="surface" ariaLabel="Company details">
        <Container width="prose">
          <div className="rounded-feature border border-border bg-surface p-6 shadow-card sm:p-8">
            <SectionHeading
              as="h2"
              eyebrow="Transparency"
              title="What we are not inventing"
              intro="We would rather be honest than impressive."
            />
            <div className="prose-content mt-6 text-muted-foreground">
              <p>
                We have chosen not to publish a fabricated founding story, invented team profiles,
                or unverified milestones. Leadership biographies, company history, certifications,
                partnerships, and similar details will be added here only once they are verified.
              </p>
              <p>
                What we can state plainly today: {company.name} is a United States company
                registered at {formattedAddress}. You can reach the team at{' '}
                <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" ariaLabel="How we build trust">
        <Container>
          <SectionHeading eyebrow="Trust" title="Earned through process, not proclaimed" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPrinciples.map((principle) => (
              <li
                key={principle.title}
                className="rounded-card border border-border bg-surface p-6 shadow-card"
              >
                <h3 className="text-base font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{principle.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        title="Prefer a conversation to a brochure?"
        body="Book a strategy call and tell us what you are trying to achieve. We will be straight with you about how — and whether — we can help."
        primary="strategyCall"
        secondary="discussProject"
      />
    </>
  );
}
