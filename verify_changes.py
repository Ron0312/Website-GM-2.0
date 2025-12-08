import time
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to homepage...")
        try:
            page.goto("http://localhost:5173", timeout=60000)
        except Exception as e:
            print(f"Error connecting: {e}")
            return

        # 1. Verify Accessibility Widget
        print("Checking Accessibility Widget...")
        widget_btn = page.locator('button[aria-label="Barrierefreiheit Optionen öffnen"]')
        if widget_btn.is_visible():
            print("SUCCESS: Accessibility Widget button found.")
            widget_btn.click()
            time.sleep(1)

            # Check options
            if page.locator('text=Hoher Kontrast').is_visible():
                print("SUCCESS: 'Hoher Kontrast' option found.")
                # Verify toggle visual
                page.click('text=Hoher Kontrast')
                time.sleep(0.5)
                page.screenshot(path="high_contrast.png")
            else:
                print("FAILURE: 'Hoher Kontrast' option not found.")

            page.screenshot(path="a11y_widget.png")
            # Close widget
            widget_btn.click()
        else:
            print("FAILURE: Accessibility Widget button not found.")

        # 2. Verify Wizard Progress Labels
        print("Checking Wizard Progress Labels...")
        # Open wizard
        page.click('text=Zum Anfrage-Assistenten')
        time.sleep(1)

        # Check for labels
        if page.locator('span:has-text("Start")').is_visible() and \
           page.locator('span:has-text("Kategorie")').is_visible():
            print("SUCCESS: Wizard progress labels found.")
            page.screenshot(path="wizard_step1.png")
        else:
            print("FAILURE: Wizard progress labels not found.")

        # Close wizard
        page.click('button[aria-label="Schließen"]')
        time.sleep(0.5)

        # 3. Verify ModernInput Validation
        print("Checking Input Validation...")
        # Open Contact section (or scroll to it)
        page.goto("http://localhost:5173/kontakt")
        time.sleep(1)

        # Find an input
        name_input = page.locator('input[name="name"]')
        name_input.fill("Test")
        name_input.blur()
        time.sleep(0.5)

        # Check for Check Icon SVG
        if page.locator('.lucide-check').count() > 0:
             print("SUCCESS: Validation check icon found.")
        else:
             print("FAILURE: Input valid style/icon not found.")

        page.screenshot(path="input_validation.png")

        # 4. Verify Delivery Map Skeleton (Hard to catch ephemeral state, but we can check if Map is present)
        print("Checking Delivery Map...")
        page.goto("http://localhost:5173/")
        if page.locator('text=Liefergebiet').is_visible():
             print("SUCCESS: Delivery Map section is visible.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
