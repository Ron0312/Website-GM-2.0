from playwright.sync_api import sync_playwright
import sys

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("1. Verifying Navigation Menu...")
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        # Hover over Tanks & Kauf
        tanks_menu = page.locator("button:has-text('Tanks & Kauf')")
        if tanks_menu.count() > 0:
            tanks_menu.hover()
            page.wait_for_timeout(1000) # Wait for animation

            # Look for the specific text in the dropdown
            halboberirdisch = page.locator("button:has-text('Halboberirdische Tanks')")
            if halboberirdisch.count() > 0 and halboberirdisch.is_visible():
                print("✅ Navigation: 'Halboberirdische Tanks' item found and visible.")
            else:
                # Debug: print all button texts
                print("❌ Navigation: 'Halboberirdische Tanks' item NOT found.")
                print("Visible buttons:", page.locator("button").all_inner_texts())
                # Take screenshot
                page.screenshot(path="verification/menu_fail.png")
        else:
            print("❌ Navigation: 'Tanks & Kauf' menu not found.")

        print("\n2. Verifying B2B Hero...")
        page.goto("http://localhost:5173/gewerbe")
        page.wait_for_load_state("networkidle")

        hero_img = page.locator("img[src*='unsplash.com']")
        if hero_img.count() > 0 and hero_img.is_visible():
            print("✅ B2B Hero: CDN image found and visible.")
        else:
            print("❌ B2B Hero: CDN image NOT found.")

        print("\n3. Verifying Gas Order Input Clearing (Red X)...")
        page.goto("http://localhost:5173/#gas")
        page.wait_for_load_state("networkidle")

        # Find the PLZ input
        plz_input = page.locator("input[name='plz']")
        if plz_input.count() > 0:
            # Enter invalid PLZ to trigger error logic
            plz_input.fill("99999")

            # Click "Angebot anfordern" - target the specific button in the form to avoid mobile sticky CTA
            submit_btn = page.locator("#gas button:has-text('Angebot anfordern')").first
            submit_btn.click()

            # Wait for error state
            # The input border should turn red or error message appear
            # And our new X button should appear
            page.wait_for_timeout(1000)

            x_button = page.locator("button[aria-label='Eingabe löschen']")
            if x_button.count() > 0 and x_button.is_visible():
                print("✅ Input Clear: Red X button appeared on error.")

                # Click it
                x_button.click()

                # Check if cleared
                val = plz_input.input_value()
                if val == "":
                    print("✅ Input Clear: Clicking X cleared the input.")
                else:
                    print(f"❌ Input Clear: Input value is '{val}' (expected empty).")
            else:
                print("❌ Input Clear: Red X button did NOT appear.")
                page.screenshot(path="verification/input_fail.png")
        else:
            print("❌ Input Clear: PLZ input not found.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
