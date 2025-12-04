from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Navigation Menu (Tanks Flyout)
        page.goto("http://localhost:5173/")
        page.wait_for_selector("nav")

        # Hover over Tanks & Kauf to trigger flyout
        tanks_link = page.locator("nav").get_by_text("Tanks & Kauf")
        tanks_link.hover()

        # Need to hover Oberirdisch again to ensure the submenu is visible
        oberirdisch_btn = page.locator("nav").get_by_role("button", name="Oberirdisch").first
        oberirdisch_btn.hover()

        # Click the link. Sometimes hover is flaky in headless if we don't wait.
        # Force click might be needed if it's hidden or moving?
        # But let's try to just navigate directly if click fails,
        # but the purpose is to test the menu.

        # Wait for visibility
        tank_link = page.get_by_text("1,2 t Tank (2700 L)").first
        tank_link.wait_for(state="visible")
        tank_link.click()

        page.wait_for_url("**/tanks/1-2t-oberirdisch")

        # Scroll down to Technical Data
        page.wait_for_selector("text=Epoxidharz-Beschichtung (hellgrün)")

        # Check Installation Text
        page.wait_for_selector("text=Aufgrund des Gewichts ist ein solides Fundament zwingend erforderlich")

        page.screenshot(path="verification_tank_detail.png")
        print("Tank detail screenshot taken.")

        # 2. Verify Service Menu
        # Navigate back home to reset menu state
        page.goto("http://localhost:5173/")

        service_link = page.locator("nav").get_by_text("Service")
        service_link.hover()

        page.wait_for_selector("text=Prüfungen & Sicherheit")
        page.screenshot(path="verification_nav_service.png")
        print("Service navigation screenshot taken.")

        # 4. Verify Inspection Content
        page.goto("http://localhost:5173/wissen")
        # Need to find the article "Prüfung & Sicherheit"
        page.get_by_text("Prüfung & Sicherheit").click()
        page.wait_for_selector("text=Warum sind Prüfungen notwendig?")
        page.wait_for_selector("text=Rohrleitungsprüfung")

        page.screenshot(path="verification_knowledge.png")
        print("Knowledge screenshot taken.")

        # 5. Verify Forms (Auto-fill attributes)
        # Check Contact Section
        page.goto("http://localhost:5173/kontakt")
        # Verify name attribute exists on input
        name_input = page.locator("input[name='name']")
        if name_input.count() > 0:
            print("Contact form has name attribute.")
        else:
            print("Contact form MISSING name attribute.")

        page.screenshot(path="verification_contact.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
