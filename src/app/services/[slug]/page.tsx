import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPillar, getService, serviceSlugs } from '@/content/services';
import { pageMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { CheckList } from '@/components/marketing/CheckList';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { FAQSection } from '@/components/marketing/FAQSection';
import { RelatedServices } from '@/components/marketing/RelatedServices';
import { CTASection } from '@/components/marketing/CTASection';
import { pillarIcons } from '@/components/marketing/icons';
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from '@/components/seo/StructuredData';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywordTheme,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pillar = getPillar(service.pillar);
  const Icon = pillarIcons[service.pillar];
  const path = `/services/${service.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.navLabel, path },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema name={service.title} description={service.metaDescription} path={path} />
      <FaqSchema faqs={service.faqs} />

      <PageHero
        eyebrow={pillar?.name}
        title={service.title}
        headline={service.headline}
        intro={service.intro}
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta={service.primaryCta} size="lg" withArrow />
            <CtaButton cta={service.secondaryCta} variant="secondary" size="lg" />
          </>
        }
        aside={
          <div className="rounded-feature border border-border bg-surface p-8 shadow-card">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-brand/10 text-accent">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-subtle-foreground">
              At a glance
            </p>
            <p className="mt-2 text-foreground">{service.summary}</p>
            <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
              {service.whenAppropriate.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Business problem */}
      <Section tone="surface" ariaLabel="The business problem">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="The problem"
              title={service.businessProblem.heading}
              intro={service.businessProblem.body}
            />
            <div className="rounded-card border border-border bg-surface-subtle p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-subtle-foreground">
                You might recognize this if
              </p>
              <CheckList items={service.businessProblem.signals} className="mt-4" />
            </div>
          </div>
        </Container>
      </Section>

      {/* When appropriate + What it includes */}
      <Section ariaLabel="What this service includes">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Fit"
                title="When this service is the right call"
                intro="This work tends to pay off when the following hold true."
              />
              <CheckList items={service.whenAppropriate} className="mt-6" />
            </div>
            <div>
              <h3 className="text-h3 font-semibold text-foreground">What the service includes</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-card border border-border bg-surface p-5 shadow-card"
                  >
                    <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section tone="subtle" ariaLabel="Illustrative use cases">
        <Container>
          <SectionHeading
            eyebrow="Illustrative use cases"
            title="Where this tends to help"
            intro="Illustrative scenarios only — not completed client work, and never with invented outcomes."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.useCases.map((useCase) => (
              <UseCaseCard key={useCase.title} useCase={useCase} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Deliverables + Business value */}
      <Section ariaLabel="Deliverables and business value">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-feature border border-border bg-surface p-8 shadow-card">
              <h3 className="text-h3 font-semibold text-foreground">What you receive</h3>
              <CheckList items={service.deliverables} className="mt-6" />
            </div>
            <div className="rounded-feature bg-navy p-8 text-slate-200">
              <h3 className="text-h3 font-semibold text-white">The business value</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {service.businessValue.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 text-brand-bright">
                      ◆
                    </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Delivery approach / technical + security */}
      <Section tone="surface" ariaLabel="Delivery, technical, and security considerations">
        <Container>
          <SectionHeading
            eyebrow="How we deliver"
            title="Technical and governance considerations"
            intro="We are explicit about how the work is built and controlled — no hand-waving, no over-promising."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-card border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">Technical considerations</h3>
              <CheckList items={service.technicalConsiderations} className="mt-4" />
            </div>
            {service.integrations && (
              <div className="rounded-card border border-border bg-surface p-6">
                <h3 className="text-base font-semibold text-foreground">Integrations</h3>
                <CheckList items={service.integrations} className="mt-4" />
              </div>
            )}
            <div className="rounded-card border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">Security and governance</h3>
              <CheckList items={service.securityGovernance} className="mt-4" />
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section ariaLabel="Frequently asked questions" id="faq">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions buyers ask"
              intro="Straight answers, including where the honest answer is “it depends.”"
            />
            <FAQSection faqs={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section tone="subtle" ariaLabel="Related services">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="Related services" />
          <div className="mt-8">
            <RelatedServices slugs={service.relatedSlugs} />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Not sure if this is the right starting point?"
        body="Share the context of your project, and the team can evaluate the most appropriate next step."
        primary={service.primaryCta}
        secondary="strategyCall"
      />
    </>
  );
}
