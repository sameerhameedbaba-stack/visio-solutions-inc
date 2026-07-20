import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { pillars, services } from '@/content/services';
import { generalFaqs } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaButton } from '@/components/ui/CtaButton';
import { PageHero } from '@/components/marketing/PageHero';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { pillarIcons } from '@/components/marketing/icons';
import { BreadcrumbSchema, FaqSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Services — integrated software, AI, automation, security, and growth',
  description:
    'Explore Visio Solutions services across AI and automation, software engineering, cybersecurity, and digital growth — an integrated model designed to work together.',
  path: '/services',
  keywords:
    'technology services, software development, ai automation, cybersecurity, digital marketing',
});

const startingPoints = [
  {
    situation: 'We waste time on repetitive manual work',
    recommend: 'AI Agents and Automation',
    href: '/services/ai-agents-automation',
  },
  {
    situation: 'Our tools do not work together',
    recommend: 'Custom Software Development',
    href: '/services/custom-software-development',
  },
  {
    situation: 'We want to use AI, but safely',
    recommend: 'Agentic AI Solutions',
    href: '/services/agentic-ai',
  },
  {
    situation: 'Our security operations are reactive',
    recommend: 'AI-Powered Cybersecurity',
    href: '/services/ai-cybersecurity',
  },
  {
    situation: 'We cannot measure our marketing',
    recommend: 'Digital Marketing and Growth',
    href: '/services/digital-marketing',
  },
  {
    situation: 'Our website or app needs rebuilding',
    recommend: 'Web and Application Development',
    href: '/services/web-application-development',
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FaqSchema faqs={generalFaqs} />

      <PageHero
        eyebrow="Services"
        title="One partner across the systems your business runs on"
        headline="Software, AI, automation, security, and growth — built to work together."
        intro="Most providers sell one slice of the stack. We connect them. The value comes from decisions made across software, AI, security, and growth at once, so the parts reinforce each other instead of pulling apart."
        breadcrumbs={breadcrumbs}
        actions={
          <>
            <CtaButton cta="strategyCall" size="lg" withArrow />
            <CtaButton cta="seeHowWeWork" variant="secondary" size="lg" />
          </>
        }
      />

      {/* Pillars with services */}
      <Section ariaLabel="Service pillars">
        <Container>
          <div className="flex flex-col gap-14">
            {pillars.map((pillar) => {
              const Icon = pillarIcons[pillar.id];
              const pillarServices = services.filter((s) => s.pillar === pillar.id);
              return (
                <div
                  key={pillar.id}
                  className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"
                >
                  <div className="lg:sticky lg:top-24">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-brand/10 text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-h3 font-semibold text-foreground">{pillar.name}</h2>
                    <p className="mt-3 text-muted-foreground">{pillar.description}</p>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {pillarServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <h3 className="text-base font-semibold text-foreground">
                            {service.navLabel}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">
                            {service.summary}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            Explore
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Self-select / starting points */}
      <Section tone="subtle" ariaLabel="Find your starting point">
        <Container>
          <SectionHeading
            eyebrow="Where to start"
            title="Not sure which service you need?"
            intro="Start from the situation you recognize. These are common starting points, not fixed packages — a strategy call helps confirm the right one."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {startingPoints.map((point) => (
              <li key={point.situation}>
                <Link
                  href={point.href}
                  className="group flex h-full flex-col justify-between gap-4 rounded-card border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <p className="text-base font-medium text-foreground">“{point.situation}”</p>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Start with {point.recommend}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Engagement paths */}
      <Section ariaLabel="How engagements work">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Engagement model"
              title="Ways to work together"
              intro="We keep engagement flexible and phased, so you can start small, prove value, and expand with confidence."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Assessment',
                  body: 'A focused evaluation of a workflow, system, or opportunity.',
                },
                {
                  title: 'Focused project',
                  body: 'A defined build or improvement with clear scope and outcomes.',
                },
                {
                  title: 'Phased implementation',
                  body: 'Larger work delivered in stages that manage risk and cost.',
                },
                {
                  title: 'Ongoing optimization',
                  body: 'Continued measurement and improvement after launch.',
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-card border border-border bg-surface p-5 shadow-card"
                >
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="surface" ariaLabel="Frequently asked questions">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow="FAQ" title="Common questions about working with us" />
            <FAQSection faqs={generalFaqs} />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Let’s identify what’s worth solving first"
        body="Book a strategy call to talk through your goals and the most relevant place to begin."
        primary="strategyCall"
        secondary="discussProject"
      />
    </>
  );
}
