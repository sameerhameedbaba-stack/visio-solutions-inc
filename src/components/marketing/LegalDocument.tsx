import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatDate } from '@/lib/utils';
import type { LegalDocument as LegalDoc } from '@/content/legal';

/**
 * Renders a legal document. These policies remain drafts pending attorney review
 * (tracked in MISSING_INPUTS.md / LAUNCH_CHECKLIST.md and noted in the page source
 * comments) — but no draft banner is shown to visitors.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: doc.title, path: `/${doc.slug}` },
  ];

  return (
    <Container width="prose" className="py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-6 text-h1 font-bold text-foreground">{doc.title}</h1>
      <p className="mt-3 text-sm text-subtle-foreground">
        Last updated <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
      </p>

      <div className="prose-content mt-8 text-muted-foreground">
        {doc.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-h3 font-semibold text-foreground">{section.heading}</h2>
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Container>
  );
}
