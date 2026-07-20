import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolution, solutionSlugs } from '@/content/solutions';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { CheckList } from '@/components/marketing/CheckList';
import { RelatedServices } from '@/components/marketing/RelatedServices';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.seoTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const path = `/solutions/${solution.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: solution.title, path },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Solution"
        title={solution.title}
        headline={solution.headline}
        intro={solution.intro}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta={solution.primaryCta} size="lg" withArrow />
            <CtaButton cta="exploreServices" variant="secondary" size="lg" />
          </>
        }
      />

      <Section tone="surface" ariaLabel="Signals">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Is this you?"
              title="Signals that this is your situation"
              intro="If several of these ring true, this solution is likely relevant."
            />
            <div className="rounded-card border border-border bg-surface-subtle p-6">
              <CheckList items={solution.signals} />
            </div>
          </div>
        </Container>
      </Section>

      <Section ariaLabel="Our approach">
        <Container>
          <SectionHeading eyebrow="Approach" title="How an engagement typically unfolds" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.approach.map((step, index) => (
              <li
                key={step.title}
                className="rounded-card border border-border bg-surface p-6 shadow-card"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-accent"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="subtle" ariaLabel="Related services and next step">
        <Container>
          <SectionHeading
            eyebrow="Mapped to services"
            title="The capabilities behind this solution"
          />
          <div className="mt-8">
            <RelatedServices slugs={solution.relatedServiceSlugs} />
          </div>
          <div className="mt-10 rounded-feature border border-border bg-surface p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-subtle-foreground">
              Recommended next step
            </p>
            <p className="mt-2 max-w-2xl text-body-lg text-foreground">{solution.nextStep}</p>
            <div className="mt-5">
              <CtaButton cta={solution.primaryCta} withArrow />
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Let’s scope the right first step"
        body="Share the context of your situation, and the team can evaluate the most appropriate approach."
        primary={solution.primaryCta}
        secondary="strategyCall"
      />
    </>
  );
}
