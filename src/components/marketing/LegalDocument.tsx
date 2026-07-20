import { AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatDate } from '@/lib/utils';
import type { LegalDocument as LegalDoc } from '@/content/legal';

/**
 * Renders a legal document draft. A visible notice states that the content is a
 * draft pending legal review — matching the source comment in content/legal.ts.
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

      <div
        role="note"
        className="mt-6 flex items-start gap-3 rounded-card border border-highlight/40 bg-highlight/10 p-4"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Draft for review.</span> This document is
          a draft and requires review and approval by a qualified attorney before it is relied upon.
          It does not constitute legal advice.
        </p>
      </div>

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
