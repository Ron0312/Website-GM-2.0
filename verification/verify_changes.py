from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Standard Desktop
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            # 1. Verify Homepage Selection
            page.goto("http://localhost:5173/")

            # Wait for hero to load
            page.wait_for_selector('header')

            # Take screenshot of the new selection section (below TrustBar)
            page.evaluate("window.scrollTo(0, 1000)")
            page.wait_for_timeout(1000) # wait for scroll and animations
            page.screenshot(path="verification/homepage_selection.png")
            print("Screenshot of homepage selection taken.")

            # 2. Verify Error Message Formatting in Wizard
            # Open Wizard by clicking "Tank kaufen" in Hero (which is visible at top, but we scrolled down).
            # Let's scroll back up or use a known button.
            page.evaluate("window.scrollTo(0, 0)")
            page.locator('text=Tank kaufen').first.click()
            page.wait_for_selector('div[role="dialog"]')

            # Target input inside the dialog
            modal = page.locator('div[role="dialog"]')
            input_field = modal.locator('input[name="plz"]')
            input_field.fill("11111") # 5 digits but invalid region

            # Click next to trigger validation inside modal
            modal.locator('button:has-text("Weiter")').click()

            # Wait for error to appear
            page.wait_for_timeout(1000)

            # Screenshot of the modal
            modal.screenshot(path="verification/wizard_error.png")
            print("Screenshot of wizard error taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
