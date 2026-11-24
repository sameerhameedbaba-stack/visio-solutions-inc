import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { deckBrand, deckSlides, slideIndexFromHash } from '@/content/summary';
import sitemap from '@/app/sitemap';
import { emojiNames } from '@/components/summary/parts';

const root = join(__dirname, '..', '..');

/** Every source file that makes up the /summary deck. */
function deckSources(): { file: string; text: string }[] {
  const dirs = [join(root, 'src', 'components', 'summary'), join(root, 'scripts', 'summary')];
  const files = dirs.flatMap((dir) =>
    readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(dir, entry.name)),
  );
  files.push(join(root, 'src', 'content', 'summary.ts'));
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

describe('summary deck placement', () => {
  it('is left out of the sitemap', () => {
    expect(sitemap().some((entry) => entry.url.includes('/summary'))).toBe(false);
  });

  it('is built as a self-contained folder before every site build', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    expect(pkg.scripts.build).toContain('build:summary');
    expect(pkg.scripts.dev).toContain('build:summary');
    expect(readFileSync(join(root, 'scripts', 'build-static.mjs'), 'utf8')).toContain(
      'scripts/build-summary.mjs',
    );
  });
});

describe('summary deck pictures', () => {
  it('ships a picture for every name the slides can ask for, and nothing unused', () => {
    const dir = join(root, 'scripts', 'summary', 'emoji');
    const files = readdirSync(dir).filter((name) => name.endsWith('.png'));
    expect(files.sort()).toEqual(emojiNames.map((name) => `${name}.png`).sort());
    expect(readdirSync(dir)).toContain('LICENSE.txt');
  });

  it('uses every listed picture somewhere in the slides', () => {
    const slides = readFileSync(join(root, 'src', 'components', 'summary', 'slides.tsx'), 'utf8');
    for (const name of emojiNames) {
      expect(slides, name).toMatch(new RegExp(`['"]${name}['"]`));
    }
  });
});
