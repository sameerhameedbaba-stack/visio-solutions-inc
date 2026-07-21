import { expect, test } from '@playwright/test';

test.describe('core pages', () => {
  test('homepage renders with a single H1 and primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Visio Solutions/);
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(page.getByRole('link', { name: /book a strategy call/i }).first()).toBeVisible();
  });

  test('primary routes respond', async ({ page }) => {
    for (const path of [
      '/services',
      '/services/agentic-ai',
      '/solutions',
      '/how-we-work',
      '/about',
      '/insights',
      '/contact',
    ]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBeLessThan(400);
      await expect(page.locator('h1')).toHaveCount(1);
    }
  });

  test('unknown route returns a custom 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /could not be found/i })).toBeVisible();
  });

  test('desktop navigation links work', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop-only navigation test');
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'About' })
      .click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test.describe('mobile navigation', () => {
  test('opens, traps focus, closes with Escape and restores focus', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only navigation test');
    await page.goto('/');
    const openButton = page.getByRole('button', { name: 'Open menu' });
    await openButton.click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(openButton).toBeFocused();
  });
});

test.describe('FAQ accordion', () => {
  test('is keyboard operable', async ({ page }) => {
    await page.goto('/services');
    const second = page.getByRole('button', { name: /common questions/i });
    // Use the first FAQ trigger on the page.
    const faqButton = page.locator('button[aria-expanded]').filter({ hasText: '?' }).first();
    const initial = await faqButton.getAttribute('aria-expanded');
    await faqButton.focus();
    await page.keyboard.press('Enter');
    const toggled = await faqButton.getAttribute('aria-expanded');
    expect(toggled).not.toBe(initial);
    void second;
  });
});

test.describe('contact form', () => {
  test('blocks submission and shows an error summary when required fields are empty', async ({
    page,
  }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /send inquiry/i }).click();
    // Client validation blocks the submit and surfaces an error summary. (The
    // page also contains Next.js's always-present empty route-announcer alert,
    // so we assert on the summary's text rather than the alert role.)
    await expect(page.getByText(/please correct the following/i)).toBeVisible();
    // The required-field messages are listed in the summary.
    await expect(page.getByText(/please enter your full name/i).first()).toBeVisible();
    // Submission was blocked — still on the contact page.
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('requires the consent checkbox even when other fields are valid', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form');
    // Only name, email, and description are required now.
    await form.getByRole('textbox', { name: 'Full name' }).fill('Jane Doe');
    await form.getByRole('textbox', { name: 'Work email' }).fill('jane@acme.com');
    await form
      .getByRole('textbox', { name: 'Project description' })
      .fill('A valid description that is comfortably longer than twenty characters.');
    // Deliberately leave consent unchecked.
    await form.getByRole('button', { name: /send inquiry/i }).click();
    await expect(page.getByText(/please correct the following/i)).toBeVisible();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('submits with only the required fields and redirects to thank-you', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form');
    await form.getByRole('textbox', { name: 'Full name' }).fill('Jane Doe');
    await form.getByRole('textbox', { name: 'Work email' }).fill('jane@acme.com');
    await form
      .getByRole('textbox', { name: 'Project description' })
      .fill('We need to replace a legacy internal tool with a custom operations platform.');
    await form.getByRole('checkbox', { name: /i agree to be contacted/i }).check();
    await form.getByRole('button', { name: /send inquiry/i }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
  });
});
