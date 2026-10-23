import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'service detail', path: '/services/agentic-ai' },
  { name: 'how we work', path: '/how-we-work' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'insights article', path: '/insights/how-to-decide-what-to-automate-first' },
  { name: 'privacy', path: '/privacy' },
  { name: 'payment', path: '/payment' },
  { name: 'payment success', path: '/payment/success?ChkID=8821&TransID=T-1' },
  { name: 'payment cancel', path: '/payment/cancel' },
];

/**
 * Scroll the page top to bottom the way a reader would, so scroll-driven
 * animations (reveals, the scrubbed statement on the homepage) reach the state a
 * reader actually sees when that content is on screen.
 */
async function readThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(900);
}

async function expectNoSeriousViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const seriousOrCritical = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(
    seriousOrCritical,
    seriousOrCritical
      .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`)
      .join('\n'),
  ).toEqual([]);
}

for (const { name, path } of pages) {
  test(`no serious/critical accessibility violations: ${name}`, async ({ page }) => {
    await page.goto(path);
    await readThrough(page);
    await expectNoSeriousViolations(page);
  });
}

test.describe('dark theme', () => {
  test.use({ colorScheme: 'dark' });
  for (const { name, path } of pages) {
    test(`no serious/critical accessibility violations (dark): ${name}`, async ({ page }) => {
      await page.goto(path);
      await readThrough(page);
      await expectNoSeriousViolations(page);
    });
  }
});

test.describe('reduced motion', () => {
  // `reducedMotion` is a browser-context option, not a top-level test option.
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  for (const { name, path } of pages) {
    // No scrolling: with motion reduced, every element must be readable at load.
    test(`no serious/critical accessibility violations at load (reduced motion): ${name}`, async ({
      page,
    }) => {
      await page.goto(path);
      await expectNoSeriousViolations(page);
    });
  }

  test('content is fully visible without any scrolling', async ({ page }) => {
    await page.goto('/');
    const hidden = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll('[data-reveal]')).filter(
          (el) => Number(getComputedStyle(el).opacity) < 1,
        ).length,
    );
    expect(hidden).toBe(0);
  });
});
