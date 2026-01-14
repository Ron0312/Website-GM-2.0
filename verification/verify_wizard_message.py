from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Test 1: Tank Flow
        print("Testing Tank Flow...")
        page.goto("http://localhost:5173")

        # Click "Flüssiggastank kaufen" in Hero (It is a button when openWizard is present)
        page.get_by_role("button", name="Flüssiggastank kaufen").first.click()

        # Scope to Modal
        modal = page.get_by_role("dialog")
        expect(modal).to_be_visible()

        # Step 1: PLZ
        print("Waiting for PLZ input...")
        modal.get_by_placeholder("PLZ").fill("23843")
        modal.get_by_role("button", name="Weiter").click()

        # Step 2: Type Selection (if present)
        page.wait_for_timeout(500)

        if modal.get_by_text("Wie können wir helfen?").is_visible():
            print("At Step 2, selecting Tank")
            modal.get_by_role("button").filter(has_text="Neuer Flüssiggastank").click()
            modal.get_by_role("button", name="Weiter").click()
        else:
            print("Skipped Step 2 (Direct Tank Flow)")

        # Step 3: Installation
        print("At Step 3")
        modal.get_by_role("button").filter(has_text="Oberirdisch").first.click()
        modal.get_by_role("button", name="Weiter").click()

        # Step 4: Condition
        print("At Step 4")
        modal.get_by_role("button").filter(has_text="Neu").first.click()
        modal.get_by_role("button", name="Weiter").click()

        # Step 5: Details
        print("At Step 5")
        modal.get_by_role("button").filter(has_text="Bestand").first.click()
        modal.get_by_role("button").filter(has_text="1.2t").first.click()
        modal.get_by_role("button", name="Weiter").click()

        # Step 6: Contact
        print("At Step 6")
        expect(modal.get_by_text("Kontakt")).to_be_visible()

        # Verify Message field
        print("Verifying Message Field...")
        expect(modal.get_by_label("Nachricht (Optional)")).to_be_visible()
        modal.get_by_label("Nachricht (Optional)").fill("This is a test message.")

        page.screenshot(path="verification/tank_contact.png")
        print("Screenshot saved to verification/tank_contact.png")

        # Test 2: Service Flow (Negative Test for Message Field in Contact)
        print("\nTesting Service Flow...")
        page.reload()

        # Open Wizard
        page.get_by_role("button", name="Flüssiggastank kaufen").first.click()

        modal = page.get_by_role("dialog")
        expect(modal).to_be_visible()

        modal.get_by_placeholder("PLZ").fill("23843")
        modal.get_by_role("button", name="Weiter").click()

        page.wait_for_timeout(500)

        if modal.get_by_text("Wie können wir helfen?").is_visible():
            print("At Step 2, selecting Service")
            modal.get_by_role("button").filter(has_text="Service").first.click()
            modal.get_by_role("button", name="Weiter").click()
        else:
            print("At Step 2, switching to Service")
            modal.get_by_role("button").filter(has_text="Service").first.click()
            modal.get_by_role("button", name="Weiter").click()


        # Step 3: Service Details (Has Message)
        print("At Step 3 (Service)")
        modal.get_by_role("combobox").select_option("Wartung")
        modal.get_by_placeholder("Nachricht...").fill("Service message")
        modal.get_by_role("button", name="Weiter zu Kontakt").click()

        # Step 4: Contact
        print("At Step 4 (Service Contact)")
        expect(modal.get_by_text("Kontakt")).to_be_visible()

        # Verify Message field is NOT present
        print("Verifying Message Field is ABSENT...")
        expect(modal.get_by_label("Nachricht (Optional)")).not_to_be_visible()

        page.screenshot(path="verification/service_contact.png")
        print("Screenshot saved to verification/service_contact.png")

        browser.close()

if __name__ == "__main__":
    run()
