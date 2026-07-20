import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleSlugs, getArticle } from '@/content/insights';
import { company } from '@/content/company';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { RelatedServices } from '@/components/marketing/RelatedServices';
import { CTASection } from '@/components/marketing/CTASection';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        title={article.title}
        description={article.metaDescription}
        path={path}
        published={article.published}
        updated={article.updated}
      />

      <article>
        <header className="border-b border-border bg-surface-subtle">
          <Container width="prose" className="py-12 sm:py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-6 flex items-center gap-3">
              <Badge tone="brand">{article.topic}</Badge>
              <span className="text-sm text-subtle-foreground">
                {article.readingMinutes} min read
              </span>
            </div>
            <h1 className="mt-4 text-h1 font-bold text-foreground">{article.title}</h1>
            <p className="mt-4 text-body-lg text-muted-foreground">{article.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle-foreground">
              <span>
                By <span className="font-medium text-muted-foreground">{article.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Published <time dateTime={article.published}>{formatDate(article.published)}</time>
              </span>
              {article.updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                  </span>
                </>
              )}
            </div>
          </Container>
        </header>

        <Container width="prose" className="py-12 sm:py-16">
          <div className="prose-content">
            {article.body.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="text-h3 font-semibold text-foreground">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>

          <p className="mt-10 rounded-card border border-border bg-surface-subtle p-4 text-sm text-subtle-foreground">
            Authored by {company.name}. This article is general information, not specific technical
            or legal advice.
          </p>
        </Container>
      </article>

      <Section tone="subtle" ariaLabel="Related services">
        <Container>
          <SectionHeading eyebrow="Related services" title="Where this applies in practice" />
          <div className="mt-8">
            <RelatedServices slugs={article.relatedServiceSlugs} />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Turn an idea into a next step"
        body="If this raised a question about your own systems, a strategy call is a good place to explore it."
        primary="strategyCall"
        secondary="discussProject"
      />
    </>
  );
}
