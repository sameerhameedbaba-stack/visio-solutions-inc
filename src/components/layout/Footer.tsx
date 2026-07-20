import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { company } from '@/content/company';
import { footerColumns } from '@/content/navigation';
import { Logo } from './Logo';

/** Structured site footer. Copyright year is rendered server-side at build time. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An integrated technology partner for software, AI, automation, security, and digital
              growth.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-[24px] items-center text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <h3 className="text-eyebrow font-semibold uppercase tracking-wider text-subtle-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-[24px] items-center transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                <address className="not-italic">
                  {company.address.line1}
                  <br />
                  {company.address.city}, {company.address.state} {company.address.postalCode}
                  <br />
                  {company.address.country}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {footerColumns[3]!.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[24px] items-center transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
