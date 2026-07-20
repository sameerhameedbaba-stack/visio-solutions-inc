import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/company';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Keep confirmation and API endpoints out of the index.
        disallow: ['/thank-you', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
