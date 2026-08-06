import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/company';
import { serviceSlugs } from '@/content/services';
import { solutionSlugs } from '@/content/solutions';
import { articleSlugs } from '@/content/insights';

// Allow generation under `output: export` (static hosting).
export const dynamic = 'force-static';

/**
 * Generated sitemap covering all indexable routes. `staticRoutes` is a hand-
 * maintained allowlist, so the noindex routes — /thank-you, /404 and the
 * /payment/* gateway return pages — are excluded by omission.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] =
    [
      { path: '/', priority: 1, changeFrequency: 'weekly' },
      { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/how-we-work', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/use-cases', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/insights', priority: 0.7, changeFrequency: 'weekly' },
      { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
      { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
      { path: '/cookies', priority: 0.3, changeFrequency: 'monthly' },
    ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const solutionRoutes = solutionSlugs.map((slug) => ({
    path: `/solutions/${slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  const articleRoutes = articleSlugs.map((slug) => ({
    path: `/insights/${slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...serviceRoutes, ...solutionRoutes, ...articleRoutes].map((route) => ({
    url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
