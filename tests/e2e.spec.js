import { test, expect } from '@playwright/test';

test('homepage has title and critical elements', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Flüssiggas/);

  // Scroll to the Calculator Section wrapper to ensure we pass the lazy loading threshold
  const calculatorSection = page.getByTestId('calculator-section');
  await calculatorSection.scrollIntoViewIfNeeded();

  // Wait a bit for the intersection observer to fire and the component to load
  // IntersectionObserver might take a moment to trigger
  await page.waitForTimeout(1000);

  // Check for Calculator
  // We use a broader check in case ID is hidden or inside shadow (unlikely here)
  const calculator = page.locator('#calculator');
  await expect(calculator).toBeVisible();
});

test('calculator interaction', async ({ page }) => {
  await page.goto('/rechner');

  // Wait for calculator to load (skeleton gone)
  // New Calculator (EnergyCalculator.jsx) uses "Aktueller Energieträger" label
  await page.waitForSelector('text=Aktueller Energieträger');

  // Find Input - Updated EnergyCalculator uses a numeric input for annual consumption
  // The label is "Jahresverbrauch (Liter)" initially for Oil
  // Note: ModernInput might not set aria-label identical to label text if label is floating
  // We can target by type="number" inside the calculator container
  const input = page.locator('#calculator input[type="number"]');

  await input.fill('3000');

  // Trigger calculation (useEffect depends on input)
  // Just wait a bit for React to update state
  await page.waitForTimeout(500);

  // Check for result
  // The result is in a div with "Mögliche Ersparnis pro Jahr"
  const savingsText = page.locator('.calculator-result');
  await expect(savingsText).toContainText('€');

  // Verify it changed from 0 or empty state
  await expect(savingsText).not.toContainText('Checken Sie Ihr Angebot');
});
