from playwright.sync_api import sync_playwright, expect

def verify_seo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify "fluessiggastank-kaufen"
        print("Checking /fluessiggastank-kaufen...")
        page.goto("http://localhost:5173/fluessiggastank-kaufen")

        # Check title
        title = page.title()
        print(f"Title: {title}")
        if "Gastank kaufen" not in title:
             print("ERROR: Title does not contain 'Gastank kaufen'")

        # Take screenshot
        page.screenshot(path="verification/screenshot_kaufen.png")

        # 2. Verify "tank-entsorgen"
        print("Checking /tank-entsorgen...")
        page.goto("http://localhost:5173/tank-entsorgen")

        # Check text content for "Gastank"
        content = page.content()
        if "Gastank entsorgen" in content:
            print("SUCCESS: Found 'Gastank entsorgen' in content")
        else:
            print("ERROR: Did not find 'Gastank entsorgen'")

        page.screenshot(path="verification/screenshot_entsorgen.png")

        # 3. Verify specific tank page
        print("Checking /fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t...")
        page.goto("http://localhost:5173/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t")

        title_tank = page.title()
        print(f"Tank Title: {title_tank}")
        if "Gastank 2700 Liter" not in title_tank:
            print("ERROR: Tank title does not contain 'Gastank 2700 Liter'")

        browser.close()

if __name__ == "__main__":
    try:
        verify_seo()
        print("Verification script finished.")
    except Exception as e:
        print(f"Verification failed: {e}")
