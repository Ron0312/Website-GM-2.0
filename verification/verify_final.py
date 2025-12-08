from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173/")

        # 1. Test A11y Widget
        print("Testing A11y Widget...")
        try:
            # Open widget
            page.locator("button[aria-label='Barrierefreiheit Optionen öffnen']").click()
            page.wait_for_selector("div[role='dialog']")
            # Toggle High Contrast
            page.get_by_text("Hoher Kontrast").click()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/high_contrast.png")
            print("Screenshot: high_contrast.png")
        except Exception as e:
            print(f"Widget Test Failed: {e}")

        # 2. Test Input Validation in Contact Form
        print("Testing Input Validation...")
        try:
            # Scroll to contact form
            contact_section = page.locator("#kontakt")
            contact_section.scroll_into_view_if_needed()

            # Fill input
            name_input = page.locator("input[name='name']")
            name_input.fill("Test User")

            # Blur to trigger validation
            page.locator("body").click()
            page.wait_for_timeout(1000)

            page.screenshot(path="verification/contact_validation.png")
            print("Screenshot: contact_validation.png")
        except Exception as e:
            print(f"Contact Test Failed: {e}")

        browser.close()

if __name__ == "__main__":
    run()
