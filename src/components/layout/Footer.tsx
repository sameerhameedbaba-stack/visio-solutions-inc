import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { company } from '@/content/company';
import { footerColumns } from '@/content/navigation';
import { Logo } from './Logo';

/**
 * Site footer on an ink band (dark in both themes) with a spectrum glow and an
 * oversized decorative wordmark. Copyright year is rendered at build time.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ink relative isolate overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="spectrum-line" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          backgroundImage:
            'radial-gradient(closest-side, rgba(124,58,237,.55), rgba(37,99,235,.35) 45%, rgba(219,39,119,.2) 70%, transparent)',
        }}
        aria-hidden="true"
      />

      <Container className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo tone="onDark" idSuffix="footer" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              An integrated technology partner for software, AI, automation, security, and digital
              growth.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-spectrum-cyan" aria-hidden="true" />
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-[24px] items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-spectrum-magenta" aria-hidden="true" />
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
                      className="inline-flex min-h-[24px] items-center text-sm text-muted-foreground transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden="true"
          className="text-spectrum pointer-events-none mt-16 select-none text-center font-display text-[clamp(3rem,13vw,11rem)] font-extrabold leading-[0.85] tracking-[-0.05em] opacity-90"
        >
          Visio Solutions
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {footerColumns[3]!.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[24px] items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spectrum-violet"
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
