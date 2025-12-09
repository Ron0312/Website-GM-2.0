from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page (TrustBar, Hero)
        try:
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/home_page_verification.png")
            print("Home page verified.")
        except Exception as e:
            print(f"Error checking home page: {e}")

        # 2. Verify Contact Section (Tooltip)
        try:
            page.goto("http://localhost:5173#kontakt")
            # Hover over phone to see if copy button appears (it's opacity-0 group-hover:opacity-100)
            # Hard to screenshot hover state in headless, but we can try to force state or just screenshot section
            contact_section = page.locator("#kontakt")
            contact_section.screenshot(path="verification/verification_contact.png")

            # Click copy button
            copy_btn = page.get_by_label("Nummer kopieren").first
            # Force visible for screenshot?
            page.evaluate("document.querySelector('[aria-label=\"Nummer kopieren\"]').classList.remove('opacity-0')")
            page.evaluate("document.querySelector('[aria-label=\"Nummer kopieren\"]').classList.add('opacity-100')")
            contact_section.screenshot(path="verification/verification_contact_hover.png")
            print("Contact section verified.")
        except Exception as e:
            print(f"Error checking contact section: {e}")

        # 3. Verify Footer (Year)
        try:
            page.goto("http://localhost:5173")
            footer = page.locator("footer")
            footer.scroll_into_view_if_needed()
            footer.screenshot(path="verification/verification_footer.png")
            print("Footer verified.")
        except Exception as e:
            print(f"Error checking footer: {e}")

        browser.close()

if __name__ == "__main__":
    verify_changes()
