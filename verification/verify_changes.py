from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate Desktop
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=60000)

            # Wait for content to load
            page.wait_for_selector('h1, h2', timeout=10000)

            # 1. Verify Selection Color & Team Section Animations
            print("Scrolling to Team Section...")
            # Use a more generic selector or scroll to bottom
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2) # Wait for animation
            page.screenshot(path="verification/verification_team.png")

            # 2. Verify Inspection Section Animations
            print("Going to Inspection Section...")
            page.goto("http://localhost:5173/pruefungen")
            page.wait_for_selector('h1', timeout=10000)
            time.sleep(2)
            page.screenshot(path="verification/verification_inspection.png")

            # 3. Verify Footer Touch Targets (Mobile View)
            print("Checking Mobile Footer...")
            context_mobile = browser.new_context(viewport={'width': 375, 'height': 667}, is_mobile=True)
            page_mobile = context_mobile.new_page()
            page_mobile.goto("http://localhost:5173")
            page_mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(1)
            page_mobile.screenshot(path="verification/verification_footer_mobile.png")

            # 4. Verify Contact Form
            print("Checking Contact Form...")
            page.goto("http://localhost:5173/kontakt")
            page.wait_for_selector('form', timeout=5000)
            time.sleep(1)
            page.screenshot(path="verification/verification_contact_form.png")

            # 5. Verify Tank Card Hover
            print("Checking Tank Section...")
            page.goto("http://localhost:5173/tanks")
            # Wait for text that definitely exists
            page.wait_for_selector('text=Unser Sortiment', timeout=10000)
            # Hover over first tank card
            # Using a class selector that likely exists on the card
            cards = page.locator(".rounded-2xl.overflow-hidden.border")
            if cards.count() > 0:
                cards.first.hover()
                time.sleep(0.5)
            page.screenshot(path="verification/verification_tank_card.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
