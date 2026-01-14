from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        try:
            # 1. Go to Home
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=60000)
            page.wait_for_load_state("networkidle")

            # 4. Check Wizard Tank Image (Since others passed, we focus on this or just re-run all)
            # Re-running all is safer to have a complete set.

            # 2. Check Calculator & Reviews
            print("Checking Calculator & Reviews...")
            calculator = page.locator("#calculator")
            calculator.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Expand
            if not page.get_by_text("Mögliche Ersparnis pro Jahr").is_visible():
                print("Expanding calculator...")
                page.get_by_text("Energie-Rechner").click()
                page.wait_for_timeout(1000)

            page.screenshot(path="verification/calculator_cost.png")
            print("Captured calculator_cost.png")

            print("Switching to Advisor Tab...")
            page.get_by_role("button", name="Tank-Berater").click()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/calculator_advisor.png")
            print("Captured calculator_advisor.png")

            reviews = page.get_by_text("Basierend auf Google Bewertungen")
            reviews.scroll_into_view_if_needed()
            page.screenshot(path="verification/reviews.png")
            print("Captured reviews.png")

            # 3. Check Knowledge Article
            print("Checking Knowledge Article...")
            page.goto("http://localhost:5173/wissen/tank-streichen")
            page.wait_for_load_state("networkidle")
            expect(page.get_by_role("heading", name="Darf ich meinen Tank streichen?")).to_be_visible()
            page.screenshot(path="verification/article_streichen.png")
            print("Captured article_streichen.png")

            # 4. Check Wizard Tank Image
            print("Checking Wizard Tank Image...")
            page.goto("http://localhost:5173")
            page.get_by_role("button", name="Anfrage").first.click()

            # Step 1: PLZ
            page.get_by_placeholder("PLZ").fill("21029")
            page.get_by_placeholder("PLZ").press("Enter")

            # Step 2: Selection
            # Scoped to dialog just in case, though first click should be fine if modal is top
            modal = page.locator("[role=dialog]")
            modal.get_by_text("Neuer Flüssiggastank").click()
            modal.get_by_role("button", name="Weiter").click()

            # Step 3: Installation Type
            # Use exact text match within modal
            modal.get_by_text("Oberirdisch", exact=True).first.click()
            modal.get_by_role("button", name="Weiter").click()

            # Step 4: Condition
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/wizard_tank_image.png")
            print("Captured wizard_tank_image.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
