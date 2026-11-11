import { test, expect } from '@playwright/test';

test('loads', async ({ page }) => {
  const res = await page.goto('/');

  // Expect page to load.
  expect(res?.ok()).toBeTruthy();
  await expect(page).toHaveTitle('vizsgaremek-frontend')
});
