from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        print("Navigating to homepage...")
        page.goto("http://localhost:5173")

        # Wait for hydration/hero
        page.wait_for_selector('h1, h2')

        # Open Wizard
        print("Opening Wizard...")
        page.click('button:has-text("Zum Anfrage-Assistenten")')

        # Wait for Wizard
        page.wait_for_selector('role=dialog')
        page.wait_for_timeout(1000) # Wait for animation

        # Screenshot Step 1
        page.screenshot(path="verification/wizard_step1.png")
        print("Captured wizard_step1.png")

        # Enter PLZ
        page.fill('input[name="plz"]', "23795")
        page.keyboard.press("Enter")

        # Wait for Step 2
        page.wait_for_selector('text=Wie können wir helfen?')
        page.wait_for_timeout(500)
        page.screenshot(path="verification/wizard_step2.png")
        print("Captured wizard_step2.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
