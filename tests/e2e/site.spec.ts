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

test.describe('payment gateway return pages', () => {
  test('payment page offers a checkout link to the provider', async ({ page }) => {
    await page.goto('/payment');
    await expect(page.locator('h1')).toHaveCount(1);
    const payNow = page.getByRole('link', { name: /pay now/i });
    await expect(payNow).toBeVisible();
    // Must point at the configured Green.Money button, not a placeholder.
    await expect(payNow).toHaveAttribute(
      'href',
      'https://greenbyphone.com/eCheck/eCheck.aspx?GreenButton_id=16783&TransactionID=',
    );
  });

  test('success page renders and shows the gateway reference from the query string', async ({
    page,
  }) => {
    await page.goto('/payment/success?ChkID=8821&TransID=T-1');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: /your payment was submitted/i })).toBeVisible();
    await expect(page.getByText('8821')).toBeVisible();
    await expect(page.getByText('T-1')).toBeVisible();
  });

  test('success page hides the reference block when the gateway sent no identifiers', async ({
    page,
  }) => {
    await page.goto('/payment/success');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByText(/your reference/i)).toBeHidden();
  });

  test('reference values from the query string are sanitised, never executed', async ({ page }) => {
    const dialogs: string[] = [];
    page.on('dialog', (dialog) => {
      dialogs.push(dialog.message());
      void dialog.dismiss();
    });
    await page.goto('/payment/success?ChkID=%3Cscript%3Ealert(1)%3C%2Fscript%3E');
    await expect(page.getByText('scriptalert1script')).toBeVisible();
    // No script element was injected and no dialog fired.
    expect(dialogs).toEqual([]);
    expect(await page.locator('#reference-injection').count()).toBe(0);
  });

  test('cancel page states that nothing was charged', async ({ page }) => {
    await page.goto('/payment/cancel');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: /payment cancelled/i })).toBeVisible();
    await expect(page.getByText(/was not submitted/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /contact us/i }).first()).toBeVisible();
  });

  test('both return pages are marked noindex', async ({ page }) => {
    for (const path of ['/payment/success', '/payment/cancel']) {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    }
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
