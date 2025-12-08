
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            # 1. Verify Footer
            footer = page.locator("footer")
            footer.scroll_into_view_if_needed()
            page.screenshot(path="verification/footer_verification.png")
            print("Footer screenshot taken")

            # 2. Verify Contact Section
            contact_section = page.locator("#kontakt")
            contact_section.scroll_into_view_if_needed()

            # Check attribute via evaluation
            plz_input = contact_section.locator("input[name=\"plz\"]")
            input_mode = plz_input.get_attribute("inputmode")
            print(f"Contact PLZ inputMode: {input_mode}")

            page.screenshot(path="verification/contact_verification.png")

            # 3. Verify Navigation
            page.evaluate("window.scrollTo(0,0)")
            page.screenshot(path="verification/nav_verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
