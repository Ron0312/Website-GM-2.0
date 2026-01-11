import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Design Verification', () => {
  test('Capture screenshots of updated sections', async ({ page }) => {
    // Go to homepage
    await page.goto('http://localhost:5173/');

    // Wait for content to load
    await page.waitForSelector('h1');
    await page.waitForTimeout(1000); // Wait for animations

    // Screenshot 1: Hero and TrustBar area
    // We scroll a bit to get a good view of the transition
    await page.screenshot({ path: path.join(process.cwd(), 'verification/screenshots/1_hero_trustbar.png'), fullPage: false, clip: { x: 0, y: 0, width: 1280, height: 1000 } });

    // Scroll to DualCTA
    // Using a more robust selector based on the new content
    const dualCTA = page.locator('text=Flüssiggastank');
    // We want the first occurrence which is likely in the dual CTA or Hero buttons,
    // but DualCTA has specific "kaufen & mieten" text now.
    const specificCTA = page.locator('text=kaufen & mieten');

    if (await specificCTA.isVisible()) {
        await specificCTA.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        // Take screenshot of the viewport roughly where the CTA is
        await page.screenshot({ path: path.join(process.cwd(), 'verification/screenshots/2_dual_cta.png') });
    }

    // Scroll to TankSection
    const tankSection = page.locator('#tanks');
    if (await tankSection.isVisible()) {
        await tankSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for filter animation
        await page.screenshot({ path: path.join(process.cwd(), 'verification/screenshots/3_tank_section.png') });
    }

  });
});
