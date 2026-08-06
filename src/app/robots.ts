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
        // Keep confirmation pages, payment return pages and API endpoints out of
        // the index: they are per-transaction dead ends and carry gateway
        // reference IDs in their query strings. Note these are listed
        // individually rather than as `/payment/`, which would also block
        // `/payment/` itself — the page customers are meant to find.
        disallow: [
          '/thank-you',
          '/payment/success',
          '/payment/cancel',
          '/payment/notify.php',
          '/api/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
