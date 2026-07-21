import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { illustrativeUseCases } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Use Cases', path: '/use-cases' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Use cases: how we solve operational problems',
  description:
    'Representative examples of the operational problems Visio Solutions solves and how software, AI, automation, security, and measurement combine to address them.',
  path: '/use-cases',
});

const problemTypes = [
  'Removing repetitive, manual operational work',
  'Building custom software around a core workflow',
  'Deploying AI on defined tasks with oversight',
  'Modernizing legacy systems without disruption',
  'Connecting fragmented tools and data',
  'Strengthening defensive security operations',
  'Building measurable digital-growth systems',
];

export default function UseCasesPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Use cases"
        title="How we solve operational problems"
        headline="Representative examples that show how the layers combine to solve a defined problem."
        intro="Use the scenarios below as decision aids — patterns for recognizing where an assessment, a build, or an automation is the right first step. Each is a representative example of an approach, clearly labelled."
        breadcrumbs={breadcrumbs}
        actions={<CtaButton cta="discussProject" size="lg" withArrow />}
      />

      <Section ariaLabel="Problem types">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeading
              eyebrow="What we solve"
              title="The problems these examples map to"
              intro="Most engagements begin with one of these operational problems."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {problemTypes.map((problem) => (
                <li
                  key={problem}
                  className="rounded-card border border-border bg-surface p-4 text-sm font-medium text-foreground shadow-card"
                >
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" ariaLabel="Representative use cases">
        <Container>
          <SectionHeading
            eyebrow="Representative examples"
            title="How integrated delivery works in practice"
            intro="Each example shows a situation, a possible approach, the capabilities involved, and the type of value it produces."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {illustrativeUseCases.map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Recognize your situation in one of these?"
        body="Share the context of your project, and the team can evaluate the most appropriate next step."
        primary="discussProject"
        secondary="strategyCall"
      />
    </>
  );
}
