
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Tank Section (Halboberirdisch Toggle)
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        # Scroll to tanks section
        tanks_section = page.locator("#tanks")
        tanks_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)

        # Click "Halboberirdisch"
        page.get_by_text("Halboberirdisch", exact=True).click()
        page.wait_for_timeout(1000) # Wait for animation

        page.screenshot(path="verification/tank_section.png")
        print("Tank section screenshot taken.")

        # 2. Verify Navigation Mega Menu
        page.reload()
        page.wait_for_load_state("networkidle")

        # Hover over "Tanks & Kauf"
        nav_item = page.get_by_role("button", name="Tanks & Kauf")
        nav_item.hover()
        page.wait_for_timeout(1000) # Wait for dropdown

        page.screenshot(path="verification/mega_menu.png")
        print("Mega menu screenshot taken.")

        # 3. Verify Wizard (Installation Step)
        page.reload()
        page.wait_for_load_state("networkidle")

        # Open Wizard - Try finding by text "Angebot" if role button fails or is ambiguous
        # Using a more specific locator might help.
        # It's likely the sticky CTA or the nav button.
        # Let's try to click the one in the hero or nav.

        page.get_by_role("button", name="Angebot").first.click()
        page.wait_for_timeout(1000)

        # Step 1: PLZ
        # Check if modal is open
        if not page.is_visible("text=Anfrage stellen"):
            print("Modal did not open, trying again with force click")
            page.get_by_role("button", name="Angebot").first.click(force=True)
            page.wait_for_timeout(1000)

        page.get_by_placeholder("PLZ").fill("23795")
        page.keyboard.press("Enter")
        page.wait_for_timeout(1000)

        # Step 2: Select "Neuer Tank" (default) -> Next
        # Click "Weiter" button.
        page.get_by_role("button", name="Weiter").click()
        page.wait_for_timeout(1000)

        # Step 3: Installation Type (Should see 3 options)
        page.screenshot(path="verification/wizard_step3.png")
        print("Wizard step 3 screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
