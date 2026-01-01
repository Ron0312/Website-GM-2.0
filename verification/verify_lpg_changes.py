from playwright.sync_api import sync_playwright, expect
import time

def verify_lpg_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 1. Navigate to Homepage
            print("Navigating to homepage...")
            page.goto("http://localhost:5173/")
            page.wait_for_load_state("networkidle")

            # 2. Verify 'Ratgeber' Navigation
            print("Verifying 'Ratgeber' navigation item...")
            nav = page.get_by_label("Hauptnavigation")
            ratgeber_btn = nav.get_by_role("button", name="Ratgeber", exact=True)
            expect(ratgeber_btn).to_be_visible()

            # 3. Verify 'Flüssiggas bestellen' Highlight
            print("Verifying 'Flüssiggas bestellen' highlight...")
            order_gas_btn = nav.get_by_role("button", name="Flüssiggas bestellen", exact=True)
            expect(order_gas_btn).to_be_visible()

            # 4. Verify Knowledge Teaser on Homepage
            print("Verifying Knowledge Teaser...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

            teaser_heading = page.get_by_role("heading", name="Wissen für Tankbesitzer")
            expect(teaser_heading).to_be_visible()

            print("Taking homepage screenshot...")
            teaser_heading.scroll_into_view_if_needed()
            page.screenshot(path="/home/jules/verification/homepage_teaser.png")

            # 5. Verify Gas Order Section Link
            print("Navigating to Gas Order Section...")
            order_gas_btn.click()
            time.sleep(1)

            print("Verifying Price Guide Link in Gas Order Section...")
            # Using partial text match or exact text match from the code
            # Text is: "Wann ist der beste Kaufzeitpunkt?" inside the button
            price_guide_btn = page.get_by_role("button", name="Wann ist der beste Kaufzeitpunkt?")
            expect(price_guide_btn).to_be_visible()

            print("Taking Gas Order screenshot...")
            price_guide_btn.scroll_into_view_if_needed()
            page.screenshot(path="/home/jules/verification/gas_order_link.png")

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            try:
                page.screenshot(path="/home/jules/verification/failure.png")
            except:
                pass
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_lpg_changes()
