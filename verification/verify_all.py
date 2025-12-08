from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Footer Phone Number
        print("Verifying Footer...")
        page.goto("http://localhost:3000")
        page.wait_for_selector('footer')
        # Check for new phone number in Footer
        footer_text = page.locator('footer').inner_text()
        if "04551 89 70 89" in footer_text:
            print("Footer Phone Number Verified: 04551 89 70 89")
        else:
            print("Footer Phone Number NOT FOUND!")

        page.screenshot(path="verification/verify_footer.png")

        # 2. Verify Contact Section Numbers
        print("Verifying Contact Section...")
        page.goto("http://localhost:3000/#kontakt")
        page.wait_for_selector('#kontakt')

        contact_text = page.locator('#kontakt').inner_text()
        if "04551 89 70 89" in contact_text and "+49 170 927 00 78" in contact_text:
             print("Contact Section Phone Numbers Verified.")
        else:
             print("Contact Section Phone Numbers NOT FOUND!")

        page.screenshot(path="verification/verify_contact.png")

        # 3. Verify Team Section Number
        print("Verifying Team Section...")
        page.goto("http://localhost:3000")
        page.click("text=Über Uns")
        # Wait for team section
        page.wait_for_selector('h2:has-text("Unser Team")', timeout=5000)
        team_text = page.locator('h2:has-text("Unser Team")').locator('..').locator('..').inner_text()

        if "+49 170 927 00 78" in team_text:
            print("Team Section Boss Number Verified.")
        else:
            print("Team Section Boss Number NOT FOUND!")

        page.screenshot(path="verification/verify_team.png")

        # 4. Verify Wizard Modal Help Text
        print("Verifying Wizard Modal...")
        page.goto("http://localhost:3000")
        # Desktop button in nav is "Angebot", sometimes icon only. Let's find by aria-label.
        page.click('button[aria-label="Angebot anfordern"]')
        page.wait_for_selector('div[role="dialog"]', timeout=5000)

        dialog_text = page.locator('div[role="dialog"]').inner_text()
        if "04551 89 70 89" in dialog_text:
            print("Wizard Modal Help Text Verified.")
        else:
            print("Wizard Modal Help Text NOT FOUND!")

        page.screenshot(path="verification/verify_wizard.png")

        # 5. Verify Hero Badge
        print("Verifying Hero Badge...")
        page.goto("http://localhost:3000")
        hero_badge = page.locator('header').inner_text()
        if "Seit 2005" in hero_badge:
             print("Hero Badge Verified.")
        else:
             print("Hero Badge NOT FOUND!")

        page.screenshot(path="verification/verify_hero.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
