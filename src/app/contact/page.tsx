import type { Metadata } from 'next';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
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

      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: context */}
          <div>
            <span className="text-eyebrow font-semibold uppercase tracking-wider text-accent">
              Contact
            </span>
            <h1 className="mt-3 text-h1 font-bold text-foreground">
              Let’s talk about what you’re trying to solve
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Share the context of your project, and the team can evaluate the most appropriate next
              step — whether that is a focused assessment, a project, or simply a conversation.
            </p>

            <div className="mt-8 rounded-card border border-border bg-surface-subtle p-5">
              <h2 className="text-sm font-semibold text-foreground">What’s useful to include</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {useful.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
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
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
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

            <div className="mt-6 flex items-start gap-3 rounded-card border border-border bg-surface p-4">
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

          {/* Right: form */}
          <div className="rounded-feature border border-border bg-surface p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
