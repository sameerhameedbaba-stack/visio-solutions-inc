import type { Metadata } from 'next';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/marketing/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { BreadcrumbSchema, ContactPageSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Contact — start a project conversation',
  description:
    'Tell Visio Solutions about your project. Share the context, and the team can evaluate the most appropriate next step. Reach us at support@visiosolutions.net.',
  path: '/contact',
});

/** Bullet colours, walking the brand spectrum. */
const DOTS = ['#2563EB', '#7C3AED', '#DB2777', '#F97316'] as const;

const useful = [
  'The problem you are trying to solve, in your own words',
  'The systems or tools involved',
  'Where you are in the process, and any timeline',
  'Constraints that matter — security, compliance, budget',
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ContactPageSchema />
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about what you’re trying to solve"
        highlight="what you’re trying to solve"
        intro="Share the context of your project, and the team can evaluate the most appropriate next step — whether that is a focused assessment, a project, or simply a conversation."
        breadcrumbs={breadcrumbs}
      />
      <Container className="relative pb-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: context */}
          <div className="pt-12 lg:pt-16">
            <div className="rounded-card border border-border bg-surface p-6 shadow-lift">
              <h2 className="text-base font-bold text-foreground">What’s useful to include</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                {useful.map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: DOTS[index % DOTS.length] }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-8 flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563EB,#7C3AED)] text-white shadow-md"
                  aria-hidden="true"
                >
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-muted-foreground hover:text-accent"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#DB2777,#F97316)] text-white shadow-md"
                  aria-hidden="true"
                >
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Mailing address</p>
                  <address className="text-sm not-italic text-muted-foreground">
                    {company.address.line1}
                    <br />
                    {company.address.city}, {company.address.state} {company.address.postalCode}
                    <br />
                    {company.address.country}
                  </address>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-card border border-border bg-surface-subtle p-4">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-success"
                aria-hidden="true"
              />
              <p className="text-xs text-muted-foreground">
                Your details are validated and handled securely, and used only to respond to your
                inquiry. See our{' '}
                <a href="/privacy" className="font-medium text-accent underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: form — lifted into the hero on wide screens. */}
          <div className="relative z-10 lg:-mt-20">
            <div className="overflow-hidden rounded-feature border border-border bg-surface shadow-glow-lg">
              <div className="spectrum-line" aria-hidden="true" />
              <div className="p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
