from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Bio-Flüssiggas article
        print("Navigating to Bio-Flüssiggas article...")
        try:
            page.goto("http://localhost:5173/wissen/bio-fluessiggas")
            page.wait_for_load_state("networkidle")

            # Verify Title
            heading = page.locator("h1")
            print(f"Heading found: {heading.inner_text()}")

            # Screenshot
            page.screenshot(path="verification/bio_fluessiggas.png", full_page=True)
            print("Screenshot saved: verification/bio_fluessiggas.png")

        except Exception as e:
            print(f"Error checking Bio-Flüssiggas: {e}")

        # 2. Verify CO2-Steuer article
        print("Navigating to CO2-Steuer article...")
        try:
            page.goto("http://localhost:5173/wissen/co2-steuer")
            page.wait_for_load_state("networkidle")

            # Verify Table exists
            table = page.locator("table")
            if table.count() > 0:
                print("Table found!")
            else:
                print("Table NOT found!")

            # Screenshot
            page.screenshot(path="verification/co2_steuer.png", full_page=True)
            print("Screenshot saved: verification/co2_steuer.png")

        except Exception as e:
             print(f"Error checking CO2-Steuer: {e}")

        browser.close()

if __name__ == "__main__":
    verify_changes()
