
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify 404 navigation
        print("Navigating to invalid route...")
        page.goto("http://localhost:5173/this-does-not-exist")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/verification_404.png")
        print("404 screenshot captured.")

        # 2. Verify Contact Form Loading State
        print("Navigating to Contact page...")
        page.goto("http://localhost:5173/kontakt")

        # Target the main contact form specifically
        contact_section = page.locator("#kontakt")

        # Fill form to enable submission
        contact_section.locator("input[name=name]").fill("Test User")
        contact_section.locator("input[name=email]").fill("test@example.com")
        contact_section.locator("textarea[name=message]").fill("This is a test message.")

        # Click submit and capture loading state immediately
        submit_btn = contact_section.locator("button[type=submit]")
        submit_btn.click()
        # Wait a tiny bit for state update
        page.wait_for_timeout(100)
        page.screenshot(path="verification/verification_contact_loading.png")
        print("Contact loading screenshot captured.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
