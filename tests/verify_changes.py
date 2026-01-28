
from playwright.sync_api import sync_playwright, expect
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test Redirect
        print("Testing Redirect /wissen/tank-entsorgen -> /tank-entsorgen")
        try:
            response = page.goto("http://localhost:5173/wissen/tank-entsorgen")
            time.sleep(2) # Wait for client side redirect if any
            current_url = page.url
            print(f"Current URL: {current_url}")
            if "/tank-entsorgen" in current_url and "/wissen/" not in current_url:
                print("Redirect SUCCESS")
            else:
                print("Redirect FAILED")
        except Exception as e:
            print(f"Navigation failed: {e}")

        # Verify Content on /tank-entsorgen
        print("Verifying Content on /tank-entsorgen")
        page.goto("http://localhost:5173/tank-entsorgen")

        # Check for new text
        if page.get_by_text("Individuelles Angebot").is_visible():
            print("Found 'Individuelles Angebot': SUCCESS")
        else:
            print("Found 'Individuelles Angebot': FAILED")

        # Check for removed price
        if page.get_by_text("ab 350,- €").is_visible():
             print("Found 'ab 350,- €': FAILED (Should be removed)")
        else:
             print("Did not find 'ab 350,- €': SUCCESS")

        # Check Hero Button (Correct one)
        hero_btn = page.get_by_role("button", name="Jetzt Angebot anfordern").first
        if hero_btn.is_visible():
             print("Found Hero Button 'Jetzt Angebot anfordern': SUCCESS")
        else:
             print("Hero Button NOT found: FAILED")

        # Check for ABSENCE of wrong buttons (Default Hero buttons)
        wrong_btn_1 = page.get_by_text("Flüssiggastank kaufen")
        wrong_btn_2 = page.get_by_text("Flüssiggas bestellen")

        if not wrong_btn_1.is_visible() and not wrong_btn_2.is_visible():
             print("Wrong Hero Buttons (Buy/Order) are NOT present: SUCCESS")
        else:
             print("Wrong Hero Buttons ARE present: FAILED")


        # Screenshot
        page.screenshot(path="verification_tank_disposal.png", full_page=True)
        print("Screenshot saved to verification_tank_disposal.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
