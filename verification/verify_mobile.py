from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 2. Mobile: Calculator View
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667}, is_mobile=True)
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:5173/rechner")
        page_mobile.wait_for_timeout(2000) # Wait for load
        page_mobile.screenshot(path="verification_mobile_calculator.png")
        print("Mobile Calculator screenshot taken.")

        # 3. Mobile: Menu "Service" -> "Rechner"
        # Open Menu
        if page_mobile.is_visible("button[aria-label='Menü öffnen']"):
             page_mobile.click("button[aria-label='Menü öffnen']")
             page_mobile.wait_for_timeout(500)
             # Open Service Submenu
             # Ensure we click the one in the mobile menu (or visible one)
             # The mobile menu button usually has text "Service" inside a larger block or button
             page_mobile.click("button:has-text('Service'):visible")
             page_mobile.wait_for_timeout(500)

             if page_mobile.is_visible("text=Energie-Rechner"):
                  print("Success: Energie-Rechner found in Mobile Menu.")
             else:
                  print("Error: Energie-Rechner NOT found in Mobile Menu.")

             page_mobile.screenshot(path="verification_mobile_menu.png")
        else:
             print("Error: Mobile Menu button not found (maybe page didn't load?)")

        browser.close()

if __name__ == "__main__":
    run()
