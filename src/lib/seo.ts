import type { Metadata } from 'next';
import { absoluteUrl, company, siteUrl } from '@/content/company';

const defaultTitle = `${company.name} — Integrated software, AI, automation, security, and growth`;

interface PageMetaOptions {
  title: string;
  description: string;
  /** Site-relative path used for canonical + OG url. */
  path: string;
  /** Override the OG title (defaults to title). */
  ogTitle?: string;
  /** Exclude from indexing (e.g. thank-you). */
  noindex?: boolean;
  keywords?: string;
}

/**
 * Build a complete, unique Metadata object for a route.
 * Canonical URLs and Open Graph/Twitter data are derived consistently so no
 * route ships empty or duplicated metadata.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  noindex,
  keywords,
}: PageMetaOptions): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(company.name) ? title : `${title} | ${company.shortName}`;

  return {
    title: fullTitle,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      siteName: company.name,
      title: ogTitle ?? fullTitle,
      description,
      url: canonical,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? fullTitle,
      description,
    },
  };
}

/** Root metadata applied in the app layout and inherited by all routes. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: defaultTitle,
    description: company.description,
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: company.description,
  },
};
