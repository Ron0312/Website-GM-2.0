from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_gas_hero(page: Page):
    # Navigate to the app (assuming it runs on port 5173 by default for Vite)
    page.goto("http://localhost:5173")

    # Navigate to Gas Order Section
    # Find the button that links to 'gas' section or manually scroll
    # The app handles navigation via state. We can click on "Gas bestellen" in the nav or hero.

    # Wait for the page to load
    page.wait_for_timeout(2000)

    # Click "Gas bestellen" in the hero buttons (if visible) or Navigation
    # The Hero has a "Gas bestellen" button.
    # We might need to handle the case where multiple buttons exist.
    gas_btn = page.get_by_text("Gas bestellen").first
    gas_btn.click()

    # Wait for scroll and render
    page.wait_for_timeout(2000)

    # Now we should be at the GasOrderSection.
    # Check for the H1 "Flüssiggas bestellen – Transparent & Regional."
    # Using get_by_role('heading', name=...)
    expect(page.get_by_role("heading", name="Flüssiggas bestellen – Transparent & Regional.")).to_be_visible()

    # Check for the inputs
    plz_input = page.locator('input[name="plz"]')
    expect(plz_input).to_be_visible()

    # Fill in PLZ
    plz_input.fill("12345")

    # Adjust slider (optional, but let's just check it exists)
    slider = page.locator('input[type="range"]')
    expect(slider).to_be_visible()

    # Click "Verfügbarkeit prüfen"
    check_btn = page.get_by_role("button", name="Verfügbarkeit prüfen")
    check_btn.click()

    # This should open the Wizard Modal
    # The wizard modal should be on Step 3 (Details) because we provided PLZ and Type=gas
    # Step 3 for Gas has "Wunschmenge" input or "Details" title
    # Wait for modal animation
    page.wait_for_timeout(1000)

    expect(page.get_by_role("heading", name="Details")).to_be_visible()
    expect(page.get_by_text("Wunschmenge")).to_be_visible()

    # Take screenshot
    page.screenshot(path="verification/gas_hero_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_gas_hero(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()
