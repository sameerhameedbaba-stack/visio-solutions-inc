import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { illustrativeUseCases } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Case Studies', path: '/case-studies' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Case studies and illustrative use cases',
  description:
    'The kinds of business problems Visio Solutions addresses, shown through clearly labelled illustrative use cases. Verified client case studies will be published here once approved.',
  path: '/case-studies',
});

const problemTypes = [
  'Removing repetitive, manual operational work',
  'Building custom software around a core workflow',
  'Deploying AI agents safely on defined tasks',
  'Modernizing legacy systems without disruption',
  'Connecting fragmented tools and data',
  'Strengthening defensive security operations',
  'Building measurable digital-growth systems',
];

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Case studies"
        title="The problems we solve — shown honestly"
        headline="Illustrative use cases today; verified client stories as they are approved."
        intro="We do not publish invented case studies, fabricated metrics, or client logos we cannot verify. What follows is an honest view of the problems we address and how integrated delivery can look, clearly labelled as illustrative."
        breadcrumbs={breadcrumbs}
        actions={<CtaButton cta="discussProject" size="lg" withArrow />}
      />

      <Section ariaLabel="Problem types">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeading
              eyebrow="What we address"
              title="The types of problems we take on"
              intro="Case studies will map to these problem types as verified stories become available."
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

      <Section tone="subtle" ariaLabel="Illustrative use cases">
        <Container>
          <SectionHeading
            eyebrow="Illustrative use cases"
            title="How integrated delivery can look"
            intro="Every scenario below is illustrative — a realistic example of an approach, not a record of completed client work, and never with invented numbers."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {illustrativeUseCases.map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabel="On verified case studies">
        <Container width="prose">
          <div className="rounded-feature border border-border bg-surface p-6 text-center shadow-card sm:p-8">
            <Badge tone="neutral">Coming as they are verified</Badge>
            <h2 className="mt-4 text-h3 font-semibold text-foreground">
              Verified client stories will be published here
            </h2>
            <p className="mt-3 text-muted-foreground">
              When a client project is complete and the client approves publication, its case study
              — with real context, approach, and only verified outcomes — will appear on this page.
              Until then, we will not manufacture proof.
            </p>
            <div className="mt-6 flex justify-center">
              <CtaButton cta="strategyCall" withArrow />
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Want to talk through a real project?"
        body="Share the context of your project, and the team can evaluate the most appropriate next step."
        primary="discussProject"
        secondary="strategyCall"
      />
    </>
  );
}
