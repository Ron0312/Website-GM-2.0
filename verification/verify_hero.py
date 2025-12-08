from playwright.sync_api import sync_playwright

def verify_hero_mobile():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport to trigger the mobile styling
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        try:
            # Navigate to the homepage
            page.goto("http://localhost:5173/")

            # Wait for the hero image to be visible
            hero_image = page.locator('header img[src="/images/gas-order-hero.webp"]')
            hero_image.wait_for(state="visible")

            # Take a screenshot of the hero section
            page.locator('header').screenshot(path="verification/hero_mobile.png")

            print("Screenshot taken successfully")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_hero_mobile()
