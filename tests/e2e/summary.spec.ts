import { expect, test, type Page } from '@playwright/test';

const activeSlide = 'section[aria-roledescription="slide"]:not([hidden]):not([aria-hidden="true"])';

/** Wait until the deck has hydrated and taken over (it marks its root "ready"). */
async function waitForDeck(page: Page) {
  await expect(page.locator('[data-deck]')).toHaveClass(/ready/);
}

test.describe('summary deck', () => {
  test('opens full screen on the first slide, without the site header or footer', async ({
    page,
  }) => {
    await page.goto('/summary');
    await expect(page).toHaveTitle(/Visio Solutions/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);
    await expect(page.locator('footer')).toHaveCount(0);
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^1 of 10/);
    await expect(page.getByRole('heading', { name: /fast computer/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('never mentions the source brand on any slide', async ({ page }) => {
    await page.goto('/summary');
    const text = await page.locator('body').evaluate((body) => body.textContent ?? '');
    expect(text).toContain('Visio');
    expect(text.toLowerCase()).not.toContain('navision');
  });

  test('moves with the keyboard and keeps the slide in the URL', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation is a desktop interaction');
    await page.goto('/summary');
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
    await page.goto('/summary#s8');
    await expect(page.locator(activeSlide)).toHaveAttribute('aria-label', /^8 of 10/);
    await expect(page.getByRole('heading', { name: /complete security suite/i })).toBeVisible();
  });

  test('the arrow buttons step through the slides', async ({ page }) => {
    await page.goto('/summary');
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
    await page.goto('/summary#s3');
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
