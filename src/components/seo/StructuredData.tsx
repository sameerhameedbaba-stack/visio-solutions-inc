import { absoluteUrl, company, formattedAddress, siteUrl } from '@/content/company';

/**
 * JSON-LD structured data. Rendered as a script tag with type application/ld+json.
 * We deliberately omit fields we cannot verify: phone, logo URL, social profiles,
 * founders, ratings, awards.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is fully controlled (no user input), serialized safely.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: company.name,
        url: siteUrl,
        email: company.email,
        description: company.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.line1,
          addressLocality: company.address.city,
          addressRegion: company.address.stateShort,
          postalCode: company.address.postalCode,
          addressCountry: company.address.countryCode,
        },
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: company.name,
        url: siteUrl,
        inLanguage: 'en-US',
        publisher: { '@type': 'Organization', name: company.name },
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        name,
        description,
        url: absoluteUrl(path),
        provider: {
          '@type': 'Organization',
          name: company.name,
          url: siteUrl,
        },
        areaServed: 'US',
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  path,
  published,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: absoluteUrl(path),
        datePublished: published,
        dateModified: updated ?? published,
        inLanguage: 'en-US',
        author: { '@type': 'Organization', name: company.name },
        publisher: { '@type': 'Organization', name: company.name },
        mainEntityOfPage: absoluteUrl(path),
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  );
}

export function ContactPageSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${company.name}`,
        url: absoluteUrl('/contact'),
        mainEntity: {
          '@type': 'Organization',
          name: company.name,
          email: company.email,
          address: formattedAddress,
        },
      }}
    />
  );
}
