import { cpSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, test, type Page } from '@playwright/test';

/*
 * The /summary deck is a self-contained folder (public/summary, built by
 * scripts/build-summary.mjs). These tests cover it on the website and, just as
 * importantly, opened on its own from disk.
 */

const deck = '/summary/index.html';
const activeSlide = 'section[aria-roledescription="slide"]:not([hidden]):not([aria-hidden="true"])';

/** Wait until the deck script has started and taken over the page. */
async function waitForDeck(page: Page) {
  await expect(page.locator('[data-deck][data-ready]')).toHaveCount(1);
}

test.describe('summary deck on the website', () => {
  test('opens full screen on the first slide, without the site header or footer', async ({
    page,
  }) => {
    await page.goto(deck);
    await waitForDeck(page);
    await expect(page).toHaveTitle(/^Visio Solutions — Fast Computer/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);
    await expect(page.locator('footer')).toHaveCount(0);
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^1 of 10/);
    await expect(page.getByRole('heading', { name: /fast computer/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('is reachable at /summary', async ({ page }) => {
    await page.goto('/summary');
    await waitForDeck(page);
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^1 of 10/);
  });

  test('never mentions the source brand on any slide', async ({ page }) => {
    await page.goto(deck);
    await waitForDeck(page);
    const text = await page.locator('body').evaluate((body) => body.textContent ?? '');
    expect(text).toContain('Visio');
    expect(text.toLowerCase()).not.toContain('navision');
  });

  test('moves with the keyboard and keeps the slide in the URL', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation is a desktop interaction');
    await page.goto(deck);
    await waitForDeck(page);
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/#s2$/);
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^2 of 10/);
    await page.keyboard.press('End');
    await expect(page).toHaveURL(/#s10$/);
    await expect(
      page.getByRole('heading', { name: /protect it for the long term/i }),
    ).toBeVisible();
    await page.keyboard.press('Home');
    await expect(page).toHaveURL(/#s1$/);
  });

  test('opens on the slide named in the link', async ({ page }) => {
    await page.goto(`${deck}#s8`);
    await waitForDeck(page);
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^8 of 10/);
    await expect(page.getByRole('heading', { name: /complete security suite/i })).toBeVisible();
  });

  test('the arrow buttons step through the slides', async ({ page }) => {
    await page.goto(deck);
    await waitForDeck(page);
    const previous = page.getByRole('button', { name: 'Previous slide' });
    const next = page.getByRole('button', { name: 'Next slide' });
    await expect(previous).toBeDisabled();
    await next.click();
    await expect(page).toHaveURL(/#s2$/);
    await previous.click();
    await expect(page).toHaveURL(/#s1$/);
  });

  test('shows the presenter note for the current slide', async ({ page }) => {
    await page.goto(`${deck}#s3`);
    await waitForDeck(page);
    const toggle = page.getByRole('button', { name: 'Presenter note', exact: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const note = page.locator('#deck-note');
    await expect(note).toBeVisible();
    await expect(note).toContainText('Don’t bash competitors');
    await page.getByRole('button', { name: 'Close presenter note' }).click();
    await expect(note).toHaveCount(0);
  });
});

test.describe('summary folder on its own', () => {
  test('contains only the page, its styles, its script, its icon and its pictures', () => {
    const folder = join(process.cwd(), 'public', 'summary');
    expect(readdirSync(folder).sort()).toEqual([
      'deck.css',
      'deck.js',
      'favicon.svg',
      'img',
      'index.html',
    ]);
    // The pictures travel with their licence.
    expect(readdirSync(join(folder, 'img'))).toContain('LICENSE-fluent-emoji.txt');
  });

  test('works when copied anywhere and opened straight from disk', async ({ page }) => {
    // Copy just the folder somewhere unrelated, as someone would after unzipping.
    const copy = join(mkdtempSync(join(tmpdir(), 'visio-summary-')), 'summary');
    cpSync(join(process.cwd(), 'public', 'summary'), copy, { recursive: true });
    const folderUrl = pathToFileURL(`${copy}/`).href;

    const outside: string[] = [];
    const failed: string[] = [];
    const errors: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (!url.startsWith(folderUrl) && !url.startsWith('data:')) outside.push(url);
    });
    page.on('requestfailed', (request) => failed.push(request.url()));
    page.on('pageerror', (error) => errors.push(String(error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(`${folderUrl}index.html#s1`);
    await waitForDeck(page);

    // Styled, with its own fonts.
    const look = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        background: getComputedStyle(document.body).backgroundColor,
        body: document.fonts.check('16px "Inter Variable"'),
        headings: document.fonts.check('800 40px "Plus Jakarta Sans Variable"'),
      };
    });
    expect(look).toEqual({ background: 'rgb(247, 249, 252)', body: true, headings: true });
    await expect(page.getByRole('heading', { name: /fast computer/i })).toBeVisible();

    // And it still works as a presentation.
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^2 of 10/);

    expect(outside, 'requests outside the summary folder').toEqual([]);
    expect(failed, 'failed requests').toEqual([]);
    expect(errors, 'script errors').toEqual([]);
  });
});
