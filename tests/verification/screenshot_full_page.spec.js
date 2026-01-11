import { test } from '@playwright/test';
import path from 'path';

test.describe('Full Page Screenshot', () => {
  test('Capture full homepage', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('http://localhost:5173/');

    // 2. Wait for initial load
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h1');

    // 3. Scroll to bottom to trigger lazy loading (Map, Footer, etc.)
    await page.evaluate(async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (let i = 0; i < document.body.scrollHeight; i += 500) {
            window.scrollTo(0, i);
            await delay(100);
        }
    });

    // 4. Wait a bit for final animations/lazy components
    await page.waitForTimeout(2000);

    // 5. Scroll back to top (optional, but sometimes good for sticky headers)
    // For fullPage screenshot, Playwright usually handles stitching, but let's ensure we are stable.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // 6. Take full page screenshot
    await page.screenshot({
        path: path.join(process.cwd(), 'verification/screenshots/full_homepage.png'),
        fullPage: true
    });
  });
});
