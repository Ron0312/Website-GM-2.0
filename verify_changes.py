import sys
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        # Launch browser (set headless=True for CI environments)
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport to verify the Accessibility Icon issue
        context = browser.new_context(viewport={"width": 375, "height": 667}, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1")
        page = context.new_page()

        print("Navigating to local server...")
        try:
            page.goto("http://localhost:5173")
        except Exception as e:
            print(f"Error navigating to localhost: {e}")
            return

        print("Checking Accessibility Icon visibility on mobile...")

        # Check Sticky CTA visibility (should appear after scroll)
        # Initially at top, StickyCTA should be hidden (opacity 0 or not in DOM if strict logic)
        # Actually StickyCTA logic says: window.scrollY > 300 -> setIsVisible(true)

        # Check AccessibilityWidget button
        # It should be hidden on mobile (md:flex on button)
        # The widget container is div.fixed.bottom-24
        # The button inside should have .hidden class or display:none

        widget_button = page.locator("div.fixed.bottom-24 button[aria-label='Barrierefreiheit Menü öffnen']")
        if widget_button.count() > 0:
             # Check visibility
             is_visible = widget_button.is_visible()
             # Wait, playwight is_visible() checks specific CSS properties.
             # If it has class 'hidden', it should return False.
             if is_visible:
                 print("FAIL: AccessibilityWidget button is visible on mobile!")
             else:
                 print("PASS: AccessibilityWidget button is hidden on mobile.")
        else:
             print("PASS: AccessibilityWidget button not found (or hidden completely).")

        # Scroll down to trigger StickyCTA
        page.evaluate("window.scrollTo(0, 1000)")
        page.wait_for_timeout(1000) # Wait for animation

        # Check StickyCTA Accessibility button
        sticky_btn = page.locator("button[aria-label='Barrierefreiheit']")
        if sticky_btn.is_visible():
            print("PASS: StickyCTA Accessibility button is visible after scroll.")
        else:
            print("FAIL: StickyCTA Accessibility button is NOT visible after scroll.")

        # Take screenshot
        page.screenshot(path="verification_mobile.png")
        print("Screenshot saved to verification_mobile.png")

        # Verify Desktop View
        context_desk = browser.new_context(viewport={"width": 1280, "height": 720})
        page_desk = context_desk.new_page()
        page_desk.goto("http://localhost:5173")

        print("Checking Desktop view...")
        widget_button_desk = page_desk.locator("div.fixed button[aria-label='Barrierefreiheit Menü öffnen']")
        # Note: AccessibilityWidget on desktop is bottom-4
        if widget_button_desk.is_visible():
             print("PASS: AccessibilityWidget button is visible on desktop.")
        else:
             print("FAIL: AccessibilityWidget button is hidden on desktop!")

        browser.close()

if __name__ == "__main__":
    verify_changes()
