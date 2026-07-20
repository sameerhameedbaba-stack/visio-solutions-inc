import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { howWeWorkSteps } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'How we work', path: '/how-we-work' },
];

export const metadata: Metadata = pageMetadata({
  title: 'How we work — a phased method that reduces risk',
  description:
    'Our engagement principles and seven-stage delivery method: understand, prioritize, architect, build, validate, launch, improve — with clear roles and quality gates.',
  path: '/how-we-work',
  keywords: 'delivery process, engagement model, software delivery method',
});

const principles = [
  {
    title: 'Business problem first',
    description: 'We start from the outcome and the constraints, not a predetermined technology.',
  },
  {
    title: 'Phased and reversible',
    description: 'Work is staged so you see value early and can decide before each next step.',
  },
  {
    title: 'Quality and security gates',
    description: 'Testing, review, and security checks are built into delivery, not bolted on.',
  },
  {
    title: 'Clear communication',
    description: 'We explain technical decisions plainly so you can make informed calls.',
  },
  {
    title: 'Documentation and handover',
    description: 'You get documentation and ownership, so systems stay yours to run.',
  },
  {
    title: 'Human oversight for AI',
    description: 'AI-enabled systems keep people in control of consequential decisions.',
  },
];

const engagementTypes = [
  {
    title: 'Assessment',
    description:
      'A focused evaluation of a workflow, system, or opportunity, with a recommendation.',
  },
  {
    title: 'Focused project',
    description: 'A defined build or improvement with clear scope, outcomes, and validation.',
  },
  {
    title: 'Phased implementation',
    description: 'Larger work delivered in stages that manage risk and cost over time.',
  },
  {
    title: 'Ongoing optimization',
    description: 'Continued measurement and improvement after launch, based on what you learn.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="How we work"
        title="A method built to reduce buyer risk"
        headline="Clear stages, defined roles, and quality gates — adapted to each engagement."
        intro="Good delivery is not a rigid template applied to every project. It is a consistent method, thoughtfully adapted. Here is how we move from a problem to a system you can rely on."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta="strategyCall" size="lg" withArrow />
            <CtaButton cta="discussProject" variant="secondary" size="lg" />
          </>
        }
      />

      <Section ariaLabel="Engagement principles">
        <Container>
          <SectionHeading
            eyebrow="Principles"
            title="What stays constant across every engagement"
            intro="The specifics change from project to project. These principles do not."
          />
          <div className="mt-10">
            <FeatureGrid features={principles} columns={3} />
          </div>
        </Container>
      </Section>

      <Section tone="subtle" ariaLabel="Delivery stages">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="The seven stages"
                title="From understanding to improvement"
                intro="For each stage we make clear what happens, what you contribute, and what we produce — so risk is reduced at every step."
              />
            </div>
            <ProcessTimeline steps={howWeWorkSteps} detailed />
          </div>
        </Container>
      </Section>

      <Section ariaLabel="Ways to engage">
        <Container>
          <SectionHeading
            eyebrow="Engagement types"
            title="Ways to start"
            intro="We do not publish fixed pricing here, because the right shape depends on the work. These are common ways engagements begin."
          />
          <div className="mt-10">
            <FeatureGrid features={engagementTypes} columns={4} tone="plain" />
          </div>
          <p className="mt-6 text-sm text-subtle-foreground">
            We do not make response-time or delivery-time promises without confirming them for your
            specific engagement.
          </p>
        </Container>
      </Section>

      <CTASection
        title="Have a project in mind?"
        body="Tell us the problem you are trying to solve, and we will suggest a sensible way to begin."
        primary="discussProject"
        secondary="strategyCall"
      />
    </>
  );
}
