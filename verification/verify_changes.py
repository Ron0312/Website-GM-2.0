from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile view for sticky wizard
        context_mobile = browser.new_context(viewport={"width": 375, "height": 812})
        page_mobile = context_mobile.new_page()

        # Desktop view for others
        context_desktop = browser.new_context(viewport={"width": 1280, "height": 800})
        page_desktop = context_desktop.new_page()

        try:
            # 1. Verify 404 Page (Search Bar & Links)
            print("Verifying 404 Page...")
            page_desktop.goto("http://localhost:5173/this-page-does-not-exist")
            page_desktop.wait_for_selector("text=Upps! Hier ist der Tank leer.")
            page_desktop.wait_for_selector("input[placeholder='Suchbegriff eingeben...']")
            page_desktop.screenshot(path="verification/404_page.png")
            print("404 Page Verified.")

            # 2. Verify Local Landing Page (Dynamic Content)
            print("Verifying Local Landing Page (Hamburg)...")
            page_desktop.goto("http://localhost:5173/liefergebiet/hamburg")
            page_desktop.wait_for_selector("text=Günstiges Flüssiggas für Hamburg")
            # Check for dynamic block
            page_desktop.wait_for_selector("text=Entfernung zum Lager")
            page_desktop.wait_for_selector("text=Liefertage")
            page_desktop.wait_for_selector("text=Ihr Ansprechpartner")
            page_desktop.screenshot(path="verification/local_landing_hamburg.png")
            print("Local Landing Page Verified.")

            # 3. Verify Internal Linking in Knowledge Center
            print("Verifying Knowledge Center Linking...")
            page_desktop.goto("http://localhost:5173/wissen/miete-kauf")
            # We need to verify that a link exists.
            # We can check for a specific link or just take a screenshot.
            # Let's wait for content to load.
            page_desktop.wait_for_selector("h2:has-text('Miete vs. Kauf: Der Vergleich')")
            page_desktop.screenshot(path="verification/knowledge_linking.png")
            print("Knowledge Center Screenshot taken.")

            # 4. Verify Sticky Progress Bar (Mobile)
            print("Verifying Sticky Wizard on Mobile...")
            page_mobile.goto("http://localhost:5173/")
            # Open Wizard using 'Tank kaufen' button which calls openWizard('tank')
            page_mobile.click("button:has-text('Tank kaufen')")
            page_mobile.wait_for_selector("role=dialog")
            # Wait for animation
            page_mobile.wait_for_timeout(1000)
            # The progress bar is sticky. To see this in a static screenshot is hard unless we scroll.
            # But we can verify the class or just take a screenshot of the top.
            page_mobile.screenshot(path="verification/wizard_mobile_sticky.png")
            print("Mobile Wizard Verified.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
