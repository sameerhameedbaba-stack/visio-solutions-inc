import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { solutions } from '@/content/solutions';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Solutions organized around business needs',
  description:
    'Solutions framed by the situation you are in — reduce manual work, build custom products, modernize applications, deploy AI safely, improve security, and grow measurably.',
  path: '/solutions',
  keywords:
    'business technology solutions, process automation, ai adoption, application modernization',
});

export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Solutions"
        title="Start from the outcome, not the technology"
        headline="Solutions organized around the business situation you are actually in."
        intro="Services describe what we do. Solutions describe the problem you are trying to solve. Find the situation you recognize, and we will map it to the right capabilities and a sensible next step."
        breadcrumbs={breadcrumbs}
        actions={<CtaButton cta="strategyCall" size="lg" withArrow />}
      />

      <Section ariaLabel="Solutions by business need">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <h2 className="text-h4 font-semibold text-foreground">{solution.title}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{solution.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Explore this solution
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        title="Recognize your situation but want a second opinion?"
        body="A strategy call helps confirm the most relevant solution and starting point for your goals."
        primary="strategyCall"
        secondary="exploreServices"
      />
    </>
  );
}
