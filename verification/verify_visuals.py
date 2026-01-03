from playwright.sync_api import sync_playwright

def verify_dual_cta():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        page.goto("http://localhost:5173")

        # Wait for Dual CTA to be visible
        # We can look for the heading "Wie können wir helfen?"
        page.wait_for_selector("text=Wie können wir helfen?")

        # Scroll to the element to ensure it's in view
        element = page.locator("text=Wie können wir helfen?")
        element.scroll_into_view_if_needed()

        # Wait a bit for any animations
        page.wait_for_timeout(1000)

        # Take a screenshot of the Dual CTA section
        # We'll take a screenshot of the parent container
        # The parent container has class 'max-w-5xl' and 'mx-auto' and contains the text
        # Using a locator that targets the section containing the text
        section = page.locator("div.max-w-5xl", has_text="Wie können wir helfen?")

        if section.count() > 0:
            section.screenshot(path="verification/dual_cta.png")
            print("Screenshot saved to verification/dual_cta.png")
        else:
            print("Could not find Dual CTA section")
            # Fallback: screenshot whole page
            page.screenshot(path="verification/full_page.png")

        browser.close()

if __name__ == "__main__":
    verify_dual_cta()
