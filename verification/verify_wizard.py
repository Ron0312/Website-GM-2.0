from playwright.sync_api import sync_playwright

def verify_wizard_design():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        page.goto("http://localhost:5173")

        # Wait for Dual CTA and click "Tank-Anfrage"
        page.wait_for_selector("text=Tank-Anfrage")
        page.click("text=Anfrage starten") # Click the CTA button to open wizard

        # Step 1: PLZ
        page.wait_for_selector("input[placeholder='PLZ']")
        page.fill("input[placeholder='PLZ']", "22529") # Valid PLZ
        page.press("input[placeholder='PLZ']", "Enter")

        # Step 2: Selection (Where "Wie können wir helfen?" appears in Wizard)
        # Wait for the heading
        page.wait_for_selector("h3:has-text('Wie können wir helfen?')")

        # Wait for animations
        page.wait_for_timeout(1000)

        # Screenshot the Wizard Modal
        # Locator for the modal container
        modal = page.locator("div[role='dialog'] > div")

        if modal.count() > 0:
            modal.screenshot(path="verification/wizard_step2.png")
            print("Screenshot saved to verification/wizard_step2.png")
        else:
            print("Could not find Wizard Modal")
            page.screenshot(path="verification/full_page_wizard.png")

        browser.close()

if __name__ == "__main__":
    verify_wizard_design()
