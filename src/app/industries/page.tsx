import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { industries, industriesIntro } from '@/content/industries';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { CheckList } from '@/components/marketing/CheckList';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Industries', path: '/industries' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Operating contexts we work in',
  description:
    'Visio Solutions groups organizations by operating context — knowledge-intensive, operations-heavy, digital product, multi-location, and regulated or data-sensitive — and addresses the workflow patterns each one shares.',
  path: '/industries',
  keywords: 'operating context, workflow patterns, business automation, custom software',
});

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Operating contexts"
        title="Fitted to how your organization operates"
        headline="We group by operating context, not sector — and address the workflow patterns and constraints each one shares."
        intro={industriesIntro}
        breadcrumbs={breadcrumbs}
        actions={<CtaButton cta="discussProject" size="lg" withArrow />}
      />

      <Section ariaLabel="Industry groups">
        <Container>
          <div className="flex flex-col gap-6">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="grid gap-6 rounded-feature border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <h2 className="text-h4 font-semibold text-foreground">{industry.name}</h2>
                  <p className="mt-2 text-muted-foreground">{industry.summary}</p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-foreground">Common challenges</p>
                    <CheckList items={industry.challenges} className="mt-3" />
                  </div>
                </div>
                <div className="rounded-card bg-surface-subtle p-5">
                  <p className="text-sm font-semibold text-foreground">
                    Relevant solution patterns
                  </p>
                  <CheckList items={industry.patterns} className="mt-3" />
                  <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Considerations: </span>
                    {industry.considerations}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Wondering how this maps to your organization?"
        body="Every operating context has its own constraints. A short conversation is the fastest way to translate these patterns to your situation."
        primary="strategyCall"
        secondary="exploreServices"
      />
    </>
  );
}
