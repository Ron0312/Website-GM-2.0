from playwright.sync_api import sync_playwright, expect
import time

def verify_changes(page):
    page.goto("http://localhost:5173")

    # 1. Verify Sticky CTA scroll behavior (mobile view)
    page.set_viewport_size({"width": 375, "height": 667})

    # Initially hidden
    sticky_cta = page.locator("text=Angebot anfordern").last
    expect(sticky_cta).not_to_be_visible()

    # Scroll down
    page.mouse.wheel(0, 500)
    page.wait_for_timeout(1000) # Wait for scroll event and animation

    # Visible after scroll
    expect(sticky_cta).to_be_visible()

    # Take screenshot of CTA
    page.screenshot(path="verification/sticky_cta_visible.png")

    # 2. Verify Form Enter Key validation (Desktop)
    page.set_viewport_size({"width": 1280, "height": 800})
    page.reload()

    # Locate GasOrderSection PLZ input
    # It's in the hero section.
    # We need to find the specific input. The label is "Postleitzahl"
    plz_input = page.get_by_label("Postleitzahl").first

    # Clear and press Enter (should not submit/show loader)
    plz_input.fill("")
    plz_input.press("Enter")

    # Check for error message
    error_msg = page.locator("text=Bitte geben Sie eine gültige 5-stellige PLZ ein.")
    expect(error_msg).to_be_visible()

    # Take screenshot of validation error
    page.screenshot(path="verification/form_validation_hero.png")

    # 3. Verify WizardModal Enter Key validation
    # Open Wizard
    page.reload()
    # Click on a CTA to open wizard.
    # There is a "Liefergebiet prüfen" card, but wizard is triggered by "Anfrage-Assistenten" or similar?
    # Or StickyCTA (but that's mobile).
    # Let's find a button that opens wizard. "Angebot anfordern" in StickyCTA calls openWizard('tank').
    # But on desktop StickyCTA is hidden.
    # Let's use the main navigation "Flüssiggas bestellen" -> scroll to #gas.
    # Actually, let's just use the StickyCTA by resizing to mobile again, or finding another button.
    # The WizardModal is usually opened via buttons.
    # Let's try to find a button with "Angebot anfordern" that opens the wizard?
    # Actually GasOrderSection opens the wizard on success.
    # We want to test the WizardModal itself.
    # "Startseite" -> "Tanks & Kauf" -> click on a tank card?
    # Let's emulate mobile again to open StickyCTA to open wizard.
    page.set_viewport_size({"width": 375, "height": 667})
    page.mouse.wheel(0, 500)
    page.wait_for_timeout(500)
    page.locator("text=Angebot anfordern").last.click()

    # Wizard should be open.
    expect(page.locator("text=Anfrage stellen")).to_be_visible()

    # Step 1: PLZ
    wizard_plz = page.locator("input[placeholder='PLZ']").last # Wizard input
    wizard_plz.fill("")
    wizard_plz.press("Enter")

    # Expect error
    wizard_error = page.locator("#plz-error")
    expect(wizard_error).to_be_visible()
    expect(wizard_error).to_contain_text("Bitte geben Sie eine gültige 5-stellige PLZ ein.")

    page.screenshot(path="verification/wizard_validation.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_changes(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/failure.png")
        finally:
            browser.close()
