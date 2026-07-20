import { describe, expect, it } from 'vitest';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/content/services';
import { generateMetadata as serviceMeta } from '@/app/services/[slug]/page';

describe('pageMetadata', () => {
  it('builds a canonical URL and inherits the brand suffix', () => {
    const meta = pageMetadata({ title: 'Test Page', description: 'A test page.', path: '/test' });
    expect(meta.alternates?.canonical).toContain('/test');
    expect(String(meta.title)).toContain('Visio Solutions');
  });

  it('marks noindex pages as non-indexable', () => {
    const meta = pageMetadata({
      title: 'Thanks',
      description: 'Thank you.',
      path: '/thank-you',
      noindex: true,
    });
    expect(meta.robots).toMatchObject({ index: false });
  });
});

describe('per-route metadata', () => {
  it('produces a unique, non-empty title for every service', async () => {
    const titles = await Promise.all(
      services.map(async (service) => {
        const meta = await serviceMeta({ params: Promise.resolve({ slug: service.slug }) });
        return String(meta.title);
      }),
    );
    titles.forEach((title) => expect(title.length).toBeGreaterThan(0));
    expect(new Set(titles).size).toBe(titles.length);
  });
});
