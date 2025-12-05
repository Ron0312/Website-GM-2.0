from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify "Tank & Technik Ratgeber" text
        page.goto("http://localhost:5173/wissen")
        page.wait_for_load_state("networkidle")

        try:
            accept_btn = page.get_by_role("button", name="Alles akzeptieren")
            if accept_btn.is_visible(timeout=3000):
                accept_btn.click()
        except:
            pass

        page.get_by_role("button", name="Tank & Technik").click()
        page.get_by_text("Flüssiggastank entsorgen").click()
        page.screenshot(path="verification/wissen_ratgeber.png", full_page=True)

        # 2. Verify "Abrechnung leicht gemacht" removal
        page.get_by_role("button", name="Heizung & Modernisierung").click()
        page.get_by_text("Lösungen für Mehrfamilienhäuser").click()
        page.screenshot(path="verification/mfh_section.png", full_page=True)

        # 3. Verify Tank Detail "Fundament und Erdarbeiten"
        page.goto("http://localhost:5173/tanks/1-2t-oberirdisch")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/tank_detail.png", full_page=True)

        # 4. Verify Wizard Modal Changes
        page.goto("http://localhost:5173")

        try:
            accept_btn = page.get_by_role("button", name="Alles akzeptieren")
            if accept_btn.is_visible(timeout=3000):
                accept_btn.click()
        except:
            pass

        page.get_by_role("button", name="Zum Anfrage-Assistenten").click()

        # Step 1: PLZ
        page.get_by_placeholder("PLZ").fill("23858")
        page.get_by_role("button", name="Weiter").click()
        page.wait_for_timeout(1000)

        # Step 3: Installation Type
        # Try finding the button via the grid container and nth-child.
        # The grid is: grid grid-cols-1 md:grid-cols-2 gap-6 mb-8
        # The first child is "Oberirdisch", second is "Unterirdisch".

        grid = page.locator(".grid.grid-cols-1.md\\:grid-cols-2.gap-6.mb-8")
        first_btn = grid.locator("> button").first

        if first_btn.is_visible():
             first_btn.click(force=True)
        else:
             print("Step 3 button not visible!")

        page.get_by_role("button", name="Weiter").click()

        # Step 4: Tank Details (This is where "Zustand des Tanks" should be)
        page.wait_for_timeout(500)
        page.screenshot(path="verification/wizard_step4_condition.png")

        # Select Condition to proceed (Neu)
        page.get_by_role("button", name="Neu").click()
        page.get_by_role("button", name="Weiter zu Kontakt").click()

        # Step 5: Contact
        page.wait_for_timeout(500)

        # We can check if Email input has 'required' attribute
        email_input = page.get_by_label("E-Mail")
        is_required = email_input.get_attribute("required")
        print(f"Email required: {is_required}")

        page.screenshot(path="verification/wizard_step5_contact.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
