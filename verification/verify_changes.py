import os
import time
from playwright.sync_api import sync_playwright

def verify_sticky_cta():
    print("Starting verification for Sticky CTA...")

    with sync_playwright() as p:
        # Emulate iPhone 12 Pro
        iphone = p.devices['iPhone 12 Pro']
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            **iphone,
            record_video_dir="verification/videos"
        )

        # Inject LocalStorage to bypass Cookie Banner
        # We need to add an init script because we can't set localStorage before page load otherwise
        context.add_init_script("""
            localStorage.setItem('gas_cookie_consent', 'essential');
        """)

        page = context.new_page()

        try:
            # Load the page (using localhost:5173 as per dev environment)
            page.goto("http://localhost:5173", wait_until="networkidle")
            print("Page loaded.")

            # Initial state: Sticky CTA should be hidden
            sticky_cta = page.locator('button[aria-label="Barrierefreiheit"]')
            if sticky_cta.is_visible():
                print("WARNING: Sticky CTA is visible initially (should be hidden until scroll).")
            else:
                print("Confirmed: Sticky CTA is initially hidden.")

            # Scroll down to trigger visibility
            print("Scrolling down...")
            page.evaluate("window.scrollTo(0, 1000)")
            page.mouse.wheel(0, 1000) # Trigger wheel event just in case
            time.sleep(2) # Wait for animation

            # Check for visibility
            print("Checking for Sticky CTA visibility...")

            # We look for the specific accessibility button added to the CTA
            # The AccessibilityWidget also has a button, but it's different.
            # StickyCTA button: aria-label="Barrierefreiheit"
            # AccessibilityWidget button: aria-label="Barrierefreiheit Menü öffnen"

            cta_button = page.locator('button[aria-label="Barrierefreiheit"]')

            if cta_button.is_visible():
                print("SUCCESS: Accessibility button in Sticky CTA is visible.")

                # Test interaction
                print("Clicking the button...")
                cta_button.click()
                time.sleep(1)

                # Verify menu opened
                # The widget menu has "Hoher Kontrast" text
                if page.locator('text="Hoher Kontrast"').is_visible():
                     print("SUCCESS: Accessibility menu opened.")
                else:
                     print("FAILURE: Accessibility menu did not open.")

            else:
                print("FAILURE: Sticky CTA button is NOT visible.")
                print(f"Current Scroll Y: {page.evaluate('window.scrollY')}")
                page.screenshot(path="verification/sticky_cta_fail_v2.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_sticky_cta()
