import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { sortedArticles } from '@/content/insights';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { PageHero } from '@/components/marketing/PageHero';
import { CTASection } from '@/components/marketing/CTASection';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Insights on AI, automation, software, and growth',
  description:
    'Practical, original perspectives on AI agents, automation, custom software, security, and digital growth from the Visio Solutions team.',
  path: '/insights',
  keywords: 'ai agents, automation strategy, custom software, technology insights',
});

export default function InsightsPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHero
        eyebrow="Insights"
        title="Practical perspectives, not hype"
        headline="Original writing on where technology genuinely helps — and where it does not."
        intro="A small, deliberate library of evergreen articles. We would rather publish a few useful pieces than a stream of shallow ones."
        breadcrumbs={breadcrumbs}
      />

      <Section ariaLabel="Articles">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone="brand">{article.topic}</Badge>
                    <span className="text-xs text-subtle-foreground">
                      {article.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{article.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <time
                      dateTime={article.updated ?? article.published}
                      className="text-xs text-subtle-foreground"
                    >
                      {formatDate(article.updated ?? article.published)}
                    </time>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        title="Have a challenge these ideas touch on?"
        body="Book a strategy call to talk it through with the team behind the writing."
        primary="strategyCall"
        secondary="exploreServices"
      />
    </>
  );
}
