from playwright.sync_api import sync_playwright
import time

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        def hide_cookie_banner():
            page.add_style_tag(content="""
                .fixed.bottom-0.left-0.w-full.bg-white.border-t.border-gray-200.p-4.z-\\[70\\] { display: none !important; }
            """)

        print("Capturing Wizard...")
        page.goto("http://localhost:5173")
        hide_cookie_banner()

        try:
            # Open Wizard
            page.get_by_role("button", name="Zum Anfrage-Assistenten").click(force=True)
            time.sleep(1)

            # Step 1: PLZ
            page.get_by_placeholder("PLZ").fill("23858")
            page.get_by_role("button", name="Weiter").click(force=True)
            time.sleep(0.5)

            # Step 2: Type (Neuer Tank / Gas / Service)
            # Default is "Neuer Tank" (selected). Just click Next.
            # Wait for the "Weiter" button of Step 2 to be visible/clickable.
            # It's the same button text, but a different render.
            page.get_by_role("button", name="Weiter").click(force=True)
            time.sleep(0.5)

            # Step 3: Installation Type (Oberirdisch/Unterirdisch)
            page.locator("text=Oberirdisch").first.click(force=True)
            page.get_by_role("button", name="Weiter").click(force=True)
            time.sleep(0.5)

            # Step 4: Tank Condition
            print("Capturing Wizard Step 4 (Condition)...")
            # Ensure we are on Step 4 by checking for text "Zustand des Tanks"
            # We take the screenshot even if check fails, to see what's there
            page.screenshot(path="verification/wizard_step4.png")

            # Select "Neu" to proceed
            page.get_by_role("button", name="Neu").click(force=True)

            # Select Interest
            page.locator("select[name='interest']").select_option("Kauf (Eigentum)")

            page.get_by_role("button", name="Weiter zu Kontakt").click(force=True)
            time.sleep(0.5)

            # Step 5: Contact
            print("Capturing Wizard Step 5 (Contact)...")
            page.screenshot(path="verification/wizard_step5.png")

            print("Captured Wizard steps.")

        except Exception as e:
            print(f"Failed to capture Wizard: {e}")
            page.screenshot(path="verification/wizard_fail.png")

        browser.close()

if __name__ == "__main__":
    capture_screenshots()
