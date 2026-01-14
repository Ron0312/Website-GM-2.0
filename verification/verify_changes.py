from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=60000)
            page.wait_for_load_state("networkidle")

            # Check Calculator
            print("Checking Calculator & Converter...")
            calculator = page.locator("#calculator")
            calculator.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Expand if needed
            if not page.get_by_text("Mögliche Ersparnis pro Jahr").is_visible():
                print("Expanding calculator...")
                page.get_by_text("Energie-Berater & Rechner").click()
                page.wait_for_timeout(1000)

            # Tab 1: Cost Check
            page.screenshot(path="verification/calculator_cost.png")
            print("Captured calculator_cost.png")

            # Tab 3: Converter
            print("Switching to Converter Tab...")
            page.get_by_role("button", name="Umrechner").click()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/calculator_converter.png")
            print("Captured calculator_converter.png")

            # Interact with Converter
            # Find input for kWh and change it
            print("Interacting with Converter...")
            kwh_input = page.locator("input").first # First input is typically kWh in our grid
            kwh_input.fill("10000")
            page.wait_for_timeout(500) # Wait for react state updates

            # Verify update (take screenshot)
            page.screenshot(path="verification/calculator_converter_updated.png")
            print("Captured calculator_converter_updated.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
