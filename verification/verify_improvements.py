from playwright.sync_api import sync_playwright
import time
import os

def run_verification():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}, # Desktop
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        )
        page = context.new_page()

        print("Starting Verification...")

        # 1. Start Page & Footer
        try:
            print("Checking Start Page and Footer...")
            page.goto("http://localhost:5173", wait_until="networkidle")
            time.sleep(2) # Wait for map skeleton to clear

            # Scroll to footer
            footer = page.locator("footer")
            footer.scroll_into_view_if_needed()

            page.screenshot(path="verification/footer_status.png")
            print("Captured footer_status.png")

            # Check for Live Status Text
            content = footer.text_content()
            if "Geöffnet" in content or "Geschlossen" in content:
                print("SUCCESS: Found Live Status in Footer.")
            else:
                print("WARNING: Live Status text not found in Footer.")

            # Check Map interactivity
            delivery_map = page.locator("svg[viewBox='0 0 800 500']")
            if delivery_map.count() > 0:
                print("SUCCESS: Delivery Map SVG found.")
                delivery_map.scroll_into_view_if_needed()
                page.screenshot(path="verification/delivery_map.png")
            else:
                print("ERROR: Delivery Map SVG not found.")

        except Exception as e:
            print(f"Error checking Footer/Map: {e}")

        # 2. 404 Page
        try:
            print("Checking 404 Page...")
            page.goto("http://localhost:5173/non-existent-page-123", wait_until="networkidle")
            time.sleep(1)

            # Check for Truck Icon (SVG) or specific text
            if page.locator("svg").count() > 0: # Very generic, but okay
                print("Found SVGs on 404 page.")

            content = page.content()
            if "Tank leer" in content or "404" in content:
                 print("SUCCESS: Found 404 specific text.")
            else:
                 print("WARNING: 404 specific text not found.")

            page.screenshot(path="verification/404_page.png")
            print("Captured 404_page.png")

        except Exception as e:
            print(f"Error checking 404 Page: {e}")

        # 3. Mobile Sticky CTA
        try:
            print("Checking Mobile Sticky CTA...")
            # Create mobile context
            mobile_context = browser.new_context(
                viewport={'width': 375, 'height': 667},
                is_mobile=True,
                has_touch=True
            )
            mobile_page = mobile_context.new_page()
            mobile_page.goto("http://localhost:5173", wait_until="networkidle")
            time.sleep(1)

            # Check for Sticky CTA
            # It should be at the bottom
            sticky_cta = mobile_page.locator("button", has_text="Angebot anfordern").last
            if sticky_cta.is_visible():
                print("SUCCESS: Sticky CTA found on mobile.")
                mobile_page.screenshot(path="verification/mobile_sticky_cta.png")
            else:
                 print("WARNING: Sticky CTA text 'Angebot anfordern' not found visible on mobile.")
                 # Dump html to see what's there
                 # print(mobile_page.content())
                 mobile_page.screenshot(path="verification/mobile_sticky_cta_fail.png")

            mobile_context.close()

        except Exception as e:
            print(f"Error checking Mobile CTA: {e}")

        browser.close()
        print("Verification Finished.")

if __name__ == "__main__":
    run_verification()
