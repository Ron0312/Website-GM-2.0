
import { test, expect } from '@playwright/test';

test('Navigation Mega Menu', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Dismiss cookie banner
  const cookieBtn = page.getByRole('button', { name: 'Alle akzeptieren' });
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // Locate "Tanks & Kauf" button in the navigation bar and hover
  const tanksNav = page.getByRole('navigation').getByRole('button', { name: 'Tanks & Kauf' });
  await expect(tanksNav).toBeVisible();
  await tanksNav.hover();

  // Verify Mega Menu Content appears (look for the headers in the dropdown)
  // We use .last() or specific container if needed, but the headers should be unique in the dropdown context ideally
  // or we wait for the dropdown to be visible
  const megaMenu = page.locator('.absolute', { hasText: 'Oberirdisch' }).first();
  await expect(megaMenu).toBeVisible();
  await expect(megaMenu.getByText('Oberirdisch').first()).toBeVisible();
  await expect(megaMenu.getByText('Unterirdisch').first()).toBeVisible();
});

test('Wizard Tank Flow', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Dismiss cookie banner
  const cookieBtn = page.getByRole('button', { name: 'Alle akzeptieren' });
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // Open Wizard using the main CTA in the header
  const wizardBtn = page.getByRole('button', { name: 'Angebot' }).first();
  await wizardBtn.click();

  // Step 1: PLZ
  const plzInput = page.getByPlaceholder('PLZ');
  await expect(plzInput).toBeVisible();
  await plzInput.fill('22000');

  // Click "Weiter" - there might be multiple buttons with "Weiter" in the DOM (hidden ones), so target the visible one in the modal
  await page.locator('button', { hasText: 'Weiter' }).click();

  // Step 2: Type Selection (Tank)
  // Wait for transition
  await expect(page.getByText('Wie können wir helfen?')).toBeVisible();

  // Select "Neuer Tank" card
  await page.getByText('Neuer Tank').click();
  // Click Next if needed (my implementation auto-selects? No, logic is setType then handleNext button click OR simple click if I made it auto?
  // Checking code: SelectionCard has onClick which does setType. The "Weiter" button is separate in Step 2.)
  // Wait, my code for Step 2 has:
  // <SelectionCard onClick={() => { setType('tank'); }} ... />
  // AND a "Weiter" button. The user must click card then Weiter?
  // Let's check code...
  // onClick={() => { setType(opt.id); }} ... and a separate Weiter button?
  // No, looking at WizardModal.jsx:
  // onClick={() => { setType('tank'); }}
  // Button "Weiter" calls handleNext.
  // Wait, in Step 2: <button ... onClick={handleNext} ...>Weiter</button>
  // So I need to click the card to select (visual state) then click Next?
  // Actually the code I wrote for SelectionCard usage in Step 2:
  // selected={type === 'tank'} onClick={() => { setType('tank'); }}
  // So yes, click card, then click Weiter.

  // Click "Weiter"
  await page.locator('button', { hasText: 'Weiter' }).click();

  // Step 3: Installation Type (Oberirdisch/Unterirdisch) -> NEW FEATURE
  await expect(page.getByText('Welche Tankart bevorzugen Sie?')).toBeVisible();

  // Select Oberirdisch
  // Click the title inside the card to ensure event bubbling
  await page.locator('h3', { hasText: 'Oberirdisch' }).first().click({ force: true });

  // Check if button is enabled before clicking (step 3 validation)
  const nextBtn = page.locator('button', { hasText: 'Weiter' });
  await expect(nextBtn).toBeEnabled();
  await nextBtn.click();

  // Step 4: Details
  await expect(page.getByText('Projekt Details')).toBeVisible();
  await expect(page.getByText('Art des Gebäudes')).toBeVisible();
});
