import { describe, expect, it } from 'vitest';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/content/services';
import { generateMetadata as serviceMeta } from '@/app/services/[slug]/page';

/** Read the resolved absolute title string from a Metadata object. */
function titleText(meta: { title?: unknown }): string {
  const t = meta.title as { absolute?: string } | string | undefined;
  return typeof t === 'string' ? t : (t?.absolute ?? '');
}

describe('pageMetadata', () => {
  it('builds a canonical URL with the brand appearing exactly once', () => {
    const meta = pageMetadata({ title: 'Test Page', description: 'A test page.', path: '/test' });
    expect(meta.alternates?.canonical).toContain('/test');
    const title = titleText(meta);
    expect(title).toContain('Visio Solutions');
    // Guard against the double-suffix regression.
    expect(title.match(/Visio Solutions/g)?.length).toBe(1);
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
  it('produces a unique, non-empty title with a single brand suffix for every service', async () => {
    const titles = await Promise.all(
      services.map(async (service) => {
        const meta = await serviceMeta({ params: Promise.resolve({ slug: service.slug }) });
        return titleText(meta);
      }),
    );
    titles.forEach((title) => {
      expect(title.length).toBeGreaterThan(0);
      expect(title.match(/Visio Solutions/g)?.length).toBe(1);
    });
    expect(new Set(titles).size).toBe(titles.length);
  });
});
