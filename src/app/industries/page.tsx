import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { industries, industriesIntro } from '@/content/industries';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
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
  title: 'Industries we adapt technology for',
  description:
    'How Visio Solutions adapts software, AI, automation, security, and growth strategies to the operating realities of different industries — framed as patterns, not claimed clients.',
  path: '/industries',
  keywords: 'industry technology solutions, sector automation, adaptable software',
});

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Industries"
        title="Adapted to how your industry actually operates"
        headline="Technology and automation strategies fitted to real operating conditions."
        intro={industriesIntro}
        breadcrumbs={breadcrumbs}
        actions={<CtaButton cta="strategyCall" size="lg" withArrow />}
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
          <p className="mt-8 flex justify-center">
            <Badge tone="illustrative">
              Patterns and examples are illustrative — not claims of existing sector clients
            </Badge>
          </p>
        </Container>
      </Section>

      <CTASection
        title="Wondering how this maps to your sector?"
        body="Every industry has its own constraints. A strategy call is the fastest way to translate these patterns to your situation."
        primary="strategyCall"
        secondary="exploreServices"
      />
    </>
  );
}
