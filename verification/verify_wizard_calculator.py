from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop: Wizard Link Check
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto("http://localhost:5173/")

        # Open Wizard (Tank)
        page.click("text=Anfrage")

        # Fill PLZ
        page.fill("input[placeholder='PLZ']", "21234")
        page.press("input[placeholder='PLZ']", "Enter")
        page.wait_for_timeout(500)

        # Step 2: Tank Selection -> Next
        page.click("div[role='dialog'] >> button:has-text('Weiter')")
        page.wait_for_timeout(500)

        # Step 3: Installation (Oberirdisch) -> Next
        print("Step 3: Clicking Oberirdisch")
        page.screenshot(path="debug_wizard_step3.png")

        # Try finding the card by title text explicitly
        # Assuming SelectionCard renders the title in a h4 or strong or div
        page.click("div[role='dialog'] >> text=Oberirdisch")
        page.wait_for_timeout(500)
        page.screenshot(path="debug_wizard_step3_clicked.png")

        # Check if button is enabled
        is_disabled = page.is_disabled("div[role='dialog'] >> button:has-text('Weiter')")
        if is_disabled:
             print("Button still disabled!")
             # Try forcing click on the parent div of the text
             page.click("div[role='dialog'] >> div:has-text('Oberirdisch') >> xpath=..")
             page.wait_for_timeout(500)

        page.click("div[role='dialog'] >> button:has-text('Weiter')")
        page.wait_for_timeout(500)

        # Step 4 (New): Interest (Kauf) -> Next
        print("Step 4: Clicking Kauf")
        if not page.is_visible("text=Kaufoption"):
            print("Error: Step 4 'Kaufoption' not found!")

        # Click the description to avoid H3 ambiguity
        page.click("div[role='dialog'] >> text=Eigentumstank")
        page.wait_for_timeout(500)
        page.click("div[role='dialog'] >> button:has-text('Weiter')")
        page.wait_for_timeout(500)

        # Step 5: Condition (Neu) -> Next
        print("Step 5: Clicking Neu")
        if not page.is_visible("text=Zustand"):
             print("Error: Step 5 'Zustand' not found!")

        page.click("div[role='dialog'] >> text=Neu")
        page.wait_for_timeout(500)
        page.click("div[role='dialog'] >> button:has-text('Weiter')")
        page.wait_for_timeout(500)

        # Step 6: Details (Building / Size)
        # Check for Calculator Link
        if page.is_visible("text=Unsicher? Nutzen Sie unseren Tank-Berater"):
            print("Success: Calculator link found in Wizard.")
        else:
            print("Error: Calculator link NOT found in Wizard.")
            page.screenshot(path="debug_wizard_step6_fail.png")

        page.screenshot(path="verification_wizard_link.png")

        browser.close()

if __name__ == "__main__":
    run()
