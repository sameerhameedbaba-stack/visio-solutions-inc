import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end / accessibility test configuration.
 * Builds and starts the production server, then runs specs in tests/e2e.
 * Chromium is pre-provisioned in the CI/dev container.
 */
const PORT = process.env.PORT ? Number(process.env.PORT) : 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

// Use the container's pre-provisioned Chromium when present; otherwise let
// Playwright resolve its own managed browser.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const launchOptions = { executablePath };

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], launchOptions } },
    // Chromium-based mobile device (avoids requiring a separate WebKit build).
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
