import { test } from '@playwright/test';
import path from 'path';

test.describe('Mobile Design Verification', () => {
  // Use a mobile viewport
  test.use({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' });

  test('Capture mobile screenshots', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('http://localhost:5173/');

    // 2. Wait for initial load
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h1');

    // 3. Scroll to bottom to trigger lazy loading
    await page.evaluate(async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (let i = 0; i < document.body.scrollHeight; i += 300) {
            window.scrollTo(0, i);
            await delay(50);
        }
    });

    await page.waitForTimeout(1000);

    // 4. Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // 5. Hero Screenshot (includes TrustBar)
    await page.screenshot({
        path: path.join(process.cwd(), 'verification/screenshots/mobile_1_hero.png'),
        fullPage: false,
        clip: { x: 0, y: 0, width: 390, height: 800 }
    });

    // 6. Dual CTA Screenshot
    const dualCTA = page.locator('text=Wie können wir helfen?');
    if (await dualCTA.isVisible()) {
        await dualCTA.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(process.cwd(), 'verification/screenshots/mobile_2_dual_cta.png') });
    }

    // 7. Tank Section Screenshot (Slider check)
    const tankSection = page.locator('#tanks');
    if (await tankSection.isVisible()) {
        await tankSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(process.cwd(), 'verification/screenshots/mobile_3_tank_section.png') });
    }

    // 8. Full Mobile Page Screenshot
    // Scroll top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
        path: path.join(process.cwd(), 'verification/screenshots/mobile_full_homepage.png'),
        fullPage: true
    });
  });
});
