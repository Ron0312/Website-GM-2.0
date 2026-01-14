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
            print("Checking Calculator & Chart...")
            calculator = page.locator("#calculator")
            calculator.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Expand if needed
            if not page.get_by_text("Mögliche Ersparnis pro Jahr").is_visible():
                print("Expanding calculator...")
                page.get_by_text("Energie-Berater & Rechner").click()
                page.wait_for_timeout(1000)

            # Check Chart
            if page.locator("canvas").is_visible():
                print("Chart found.")
                page.screenshot(path="verification/calculator_chart.png")
            else:
                 print("Error: Chart canvas not found!")

            # Check Reviews
            print("Checking Reviews...")
            reviews_section = page.get_by_text("Basierend auf 25 Google Bewertungen")
            reviews_section.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Check for specific real review content
            if page.get_by_text("Gas-Service Möller können wir jedem").is_visible():
                 print("Real review text found.")
                 page.screenshot(path="verification/reviews_real.png")
            else:
                 print("Error: Real review text NOT found!")

            # Check Pagination (Dots/Arrows)
            # Just verify screenshots show pagination

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
