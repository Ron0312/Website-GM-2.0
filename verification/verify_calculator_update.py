from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=60000)
            page.wait_for_load_state("networkidle")

            # Check Calculator
            print("Checking Calculator...")
            calculator = page.locator("#calculator")
            calculator.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Expand if needed
            if not page.get_by_text("Mögliche Ersparnis pro Jahr").is_visible():
                print("Expanding calculator...")
                page.get_by_text("Energie-Berater & Rechner").click()
                page.wait_for_timeout(1000)

            # Check Advanced Settings
            print("Checking Advanced Settings...")
            settings_btn = page.get_by_role("button", name="Basiswerte anpassen")
            if settings_btn.is_visible():
                settings_btn.click()
                page.wait_for_timeout(500)
                page.screenshot(path="verification/calculator_settings.png")
                print("Captured calculator_settings.png")
            else:
                print("Error: Settings button not found!")

            # Verify Disclaimer
            print("Checking Disclaimer...")
            # Use specific text fragment to avoid ambiguity
            disclaimer = page.locator(".calculator-result").get_by_text("Verivox, BDEW")
            if disclaimer.is_visible():
                 print("Disclaimer found.")
            else:
                 print("Error: Updated disclaimer not found!")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
