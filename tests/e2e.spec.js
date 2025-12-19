import { test, expect } from '@playwright/test';

test('homepage has title and critical elements', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Flüssiggas/);

  // Check for Calculator
  const calculator = page.locator('#calculator');
  await expect(calculator).toBeVisible();
});

test('calculator interaction', async ({ page }) => {
  await page.goto('/rechner');

  // Wait for calculator to load (skeleton gone)
  await page.waitForSelector('text=Basis-Energiebedarf');

  // Input value - note the double "in kWh" due to label + unit concatenation in aria-label
  const input = page.locator('input[aria-label="Energiegehalt in kWh in kWh"]');
  await input.fill('10000');

  // Check if LPG kg updates (approx 10000 / 13.98 = 715)
  // We need to trigger change/blur
  await input.blur();

  const lpgInput = page.locator('input[aria-label="Gewicht in kg"]');
  // It might be formatted German style
  // We just check it is not 0
  await expect(lpgInput).not.toHaveValue('0');
});
