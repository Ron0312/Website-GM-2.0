from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Homepage & Calculator
            page.goto("http://localhost:5173")
            page.wait_for_selector("#calculator")
            page.screenshot(path="verification/homepage_calc.png")
            print("Homepage screenshot taken.")

            # 2. Local Landing Page (Sylt) - Check Preposition & Icon
            page.goto("http://localhost:5173/liefergebiet/sylt")
            page.wait_for_selector("text=Fragen zu Flüssiggas auf Sylt") # Check preposition
            page.screenshot(path="verification/sylt_page.png")
            print("Sylt screenshot taken.")

            # 3. Delivery Area - Check Scroll (Hard to visual check but we can check elements)
            page.goto("http://localhost:5173/liefergebiet")
            page.wait_for_selector("text=Unser Liefergebiet")
            page.screenshot(path="verification/delivery_area.png")
            print("Delivery Area screenshot taken.")

            # 4. Wizard Modal - Check Steps and Validation
            page.goto("http://localhost:5173")

            # Close cookie banner
            try:
                page.click("text=Alle akzeptieren", timeout=3000)
                page.wait_for_timeout(500) # Wait for animation
            except:
                print("Cookie banner not found or skipped")

            page.click("text=Zum Anfrage-Assistenten", force=True)
            page.wait_for_selector("#wizard-title")

            # Step 1: PLZ Error
            page.fill("input[placeholder='PLZ']", "123")
            page.click("text=Weiter", force=True)
            page.wait_for_timeout(500) # Wait for shake/error
            page.screenshot(path="verification/wizard_error.png")

            # Step 1: Valid PLZ
            page.fill("input[placeholder='PLZ']", "20095")
            page.click("text=Weiter", force=True)

            # Wait for transition to Step 2
            try:
                page.wait_for_selector("text=Wie können wir helfen?", timeout=5000)
            except:
                print("Failed to reach Step 2. Taking screenshot.")
                page.screenshot(path="verification/failed_step2.png")
                raise

            # Step 2: Tank
            page.click("text=Neuer Tank", force=True)
            page.wait_for_timeout(200)
            page.click("text=Weiter", force=True)

            # Step 3: Installation
            page.wait_for_selector("text=Installation?")
            page.click("text=Oberirdisch", force=True)
            page.wait_for_timeout(200)
            page.click("text=Weiter", force=True)

            # Step 4: Condition
            page.wait_for_selector("text=Zustand")
            page.click("text=Neu", force=True)
            page.wait_for_timeout(200)
            page.click("text=Weiter", force=True)

            # Step 5: Details (Tank Size)
            page.wait_for_selector("text=Details")
            # Click a tank size button e.g. "1.2t"
            page.click("button:has-text('1.2t')", force=True)
            page.wait_for_timeout(200)
            page.click("text=Weiter", force=True)

            # Step 6: Contact
            page.wait_for_selector("text=Kontakt")
            page.screenshot(path="verification/wizard_contact.png")
            print("Wizard contact screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
