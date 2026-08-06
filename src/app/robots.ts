import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/company';

// Allow generation under `output: export` (static hosting).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Keep confirmation pages, payment return pages and API endpoints out
        // of the index. The payment routes are per-transaction dead ends and
        // carry gateway reference IDs in their query strings.
        disallow: ['/thank-you', '/payment/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
