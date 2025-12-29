from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # 1. Verify Home Page & Critical Elements
            page.goto("http://localhost:5173")
            page.wait_for_selector('h1', timeout=10000)
            page.screenshot(path="verification/home.png")
            print("Home verified.")

            # 2. Verify Tank Detail (Visuals & SVG)
            page.goto("http://localhost:5173/tanks/1-2t-oberirdisch")
            page.wait_for_selector('svg', timeout=10000)
            page.screenshot(path="verification/tank_detail.png")
            print("Tank Detail verified.")

            # 3. Verify Calculator (Interactivity & Tooltips)
            page.goto("http://localhost:5173/rechner")
            page.wait_for_selector('text=Aktueller Energieträger', timeout=10000)
            # Find input and type
            page.locator('#calculator input[type="number"]').fill('3000')
            page.wait_for_timeout(500) # Wait for calc
            page.screenshot(path="verification/calculator.png")
            print("Calculator verified.")

            # 4. Verify Wizard (Opening & Progress)
            page.goto("http://localhost:5173")
            page.get_by_role("button", name="Anfrage-Assistenten").first.click()
            page.wait_for_selector('text=Anfrage stellen', timeout=10000)
            page.wait_for_selector('text=Schritt 1 von 6') # Check progress text
            page.screenshot(path="verification/wizard.png")
            print("Wizard verified.")

            # 5. Verify 404 (New Design)
            page.goto("http://localhost:5173/invalid-page-xyz")
            page.wait_for_selector('text=404', timeout=10000)
            page.screenshot(path="verification/404.png")
            print("404 verified.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
