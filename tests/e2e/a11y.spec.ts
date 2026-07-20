import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'service detail', path: '/services/agentic-ai' },
  { name: 'how we work', path: '/how-we-work' },
  { name: 'contact', path: '/contact' },
  { name: 'insights article', path: '/insights/how-to-decide-what-to-automate-first' },
];

for (const { name, path } of pages) {
  test(`no serious/critical accessibility violations: ${name}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      seriousOrCritical,
      seriousOrCritical.map((v) => `${v.id}: ${v.help}`).join('\n'),
    ).toEqual([]);
  });
}
