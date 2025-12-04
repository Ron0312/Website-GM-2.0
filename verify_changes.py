from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to homepage...")
        page.goto("http://localhost:5173")

        # 1. Verify Navigation
        print("Verifying navigation menu...")
        # Check if nav items have whitespace-nowrap
        tanks_button = page.locator("button", has_text="Tanks & Kauf").first
        class_attr = tanks_button.get_attribute("class")
        if "whitespace-nowrap" in class_attr:
            print("SUCCESS: Navigation button has whitespace-nowrap.")
        else:
            print(f"FAILURE: Navigation button missing whitespace-nowrap. Classes: {class_attr}")

        # 2. Verify WizardModal Reset
        print("\nVerifying WizardModal reset...")
        # Open Wizard
        page.get_by_text("Angebot", exact=False).first.click()

        # Enter PLZ
        page.get_by_placeholder("PLZ").fill("21073") # Valid PLZ
        page.get_by_role("button", name="Weiter").click()

        # Select 'Gas bestellen'
        page.locator("h3:has-text('Gas bestellen')").click()
        page.get_by_role("button", name="Weiter").click()

        # Fill some details (Gas details step)
        page.get_by_placeholder("z.B. 2000").fill("1234")

        # Go to contact
        page.get_by_text("Weiter zu Kontakt").click()

        # Fill contact
        page.get_by_placeholder("Ihr vollständiger Name").fill("Test User")

        # Close modal
        # Use a more specific selector for the close button.
        # It has an X icon and is in the top right of the modal.
        # <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 ..."> <X size={24}/> </button>
        # We can look for the button containing the X icon or just the one with that class.
        # Or look for SVG.
        page.locator("button.p-2.rounded-full").first.click()

        # Reopen modal
        print("Reopening modal to check reset...")
        page.get_by_text("Angebot", exact=False).first.click()

        plz_value = page.get_by_placeholder("PLZ").input_value()
        print(f"PLZ value after reopen: '{plz_value}'")

        if not plz_value or len(plz_value) < 5:
             page.get_by_placeholder("PLZ").fill("21073")

        page.get_by_role("button", name="Weiter").click()

        # Step 2: Select Gas again
        page.locator("h3:has-text('Gas bestellen')").click()
        page.get_by_role("button", name="Weiter").click()

        # Check Details (Amount)
        amount_value = page.get_by_placeholder("z.B. 2000").input_value()
        if amount_value == "":
            print("SUCCESS: Amount reset.")
        else:
            print(f"FAILURE: Amount NOT reset. Value: {amount_value}")

        page.get_by_text("Weiter zu Kontakt").click()

        name_value = page.get_by_placeholder("Ihr vollständiger Name").input_value()
        if name_value == "":
            print("SUCCESS: Contact Name reset.")
        else:
            print(f"FAILURE: Contact Name NOT reset. Value: {name_value}")

        # 3. Verify Ownership Warning
        print("\nVerifying Ownership Warning...")
        # Go back to details (Step 3)
        page.get_by_text("Zurück").click()

        # Click "Nein, Mietvertrag"
        page.get_by_text("Nein, Mietvertrag").click()

        # Check for warning text
        warning = page.get_by_text("Wenn Sie den Tank gemietet haben")
        if warning.is_visible():
            print("SUCCESS: Warning message visible.")
        else:
            print("FAILURE: Warning message NOT visible.")

        # 4. Verify Tank Size field
        print("\nVerifying Tank Size field...")
        tank_size_input = page.get_by_placeholder("z.B. 1,2t oder 2700 Liter")
        if tank_size_input.is_visible():
             print("SUCCESS: Tank Size input visible.")
        else:
             print("FAILURE: Tank Size input NOT visible.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
