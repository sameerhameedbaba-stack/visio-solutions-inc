import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { deckBrand, deckSlides, slideIndexFromHash } from '@/content/summary';
import { isStandaloneRoute } from '@/components/layout/SiteChrome';
import { metadata } from '@/app/summary/page';
import sitemap from '@/app/sitemap';

const root = join(__dirname, '..', '..');

/** Every source file that makes up the /summary deck. */
function deckSources(): { file: string; text: string }[] {
  const dir = join(root, 'src', 'components', 'summary');
  const files = readdirSync(dir).map((name) => join(dir, name));
  files.push(
    join(root, 'src', 'content', 'summary.ts'),
    join(root, 'src', 'app', 'summary', 'page.tsx'),
  );
  return files.map((file) => ({ file, text: readFileSync(file, 'utf8') }));
}

describe('summary deck content', () => {
  it('has ten slides with ids s1 to s10 in order', () => {
    expect(deckSlides.map((slide) => slide.id)).toEqual(
      Array.from({ length: 10 }, (_, i) => `s${i + 1}`),
    );
  });

  it('gives every slide a label, a presenter note and three glow colours', () => {
    for (const slide of deckSlides) {
      expect(slide.label.length).toBeGreaterThan(0);
      expect(slide.note.length).toBeGreaterThan(20);
      expect(slide.glow).toHaveLength(3);
    }
  });

  it('is branded Visio Solutions throughout, with no trace of the source brand', () => {
    expect(deckBrand).toEqual({ short: 'Visio', full: 'Visio Solutions' });
    for (const { file, text } of deckSources()) {
      expect(text, file).not.toMatch(/navision/i);
    }
  });
});

describe('slideIndexFromHash', () => {
  it('maps #s1…#s10 to slide indexes', () => {
    expect(slideIndexFromHash('#s1')).toBe(0);
    expect(slideIndexFromHash('#s10')).toBe(9);
    expect(slideIndexFromHash('#S3')).toBe(2);
  });

  it('ignores anything that is not a slide', () => {
    expect(slideIndexFromHash('')).toBeNull();
    expect(slideIndexFromHash('#s0')).toBeNull();
    expect(slideIndexFromHash('#s11')).toBeNull();
    expect(slideIndexFromHash('#main-content')).toBeNull();
  });
});

describe('summary route', () => {
  it('renders without the site chrome', () => {
    expect(isStandaloneRoute('/summary')).toBe(true);
    expect(isStandaloneRoute('/summary/')).toBe(true);
    expect(isStandaloneRoute('/')).toBe(false);
    expect(isStandaloneRoute('/summary-of-services')).toBe(false);
    expect(isStandaloneRoute(null)).toBe(false);
  });

  it('is kept out of search results and the sitemap', () => {
    expect(metadata.robots).toMatchObject({ index: false });
    expect(sitemap().some((entry) => entry.url.includes('/summary'))).toBe(false);
  });
});
