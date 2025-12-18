from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page H1
        print("Verifying Home Page H1...")
        page.goto("http://localhost:5173/")
        page.wait_for_load_state("networkidle")

        # Check H1 content
        h1 = page.locator("h1").first
        h1_text = h1.inner_text()
        print(f"H1 Text: {h1_text}")
        if "Flüssiggas, Tanks" in h1_text and "Service" in h1_text:
            print("✅ H1 check passed")
        else:
            print("❌ H1 check failed")

        page.screenshot(path="verification/verify_home_h1.png")

        # 2. Verify Local Landing Page (Hamburg)
        print("Verifying Local Landing Page (Hamburg)...")
        page.goto("http://localhost:5173/liefergebiet/hamburg")
        page.wait_for_load_state("networkidle")

        # Check Title
        local_h1 = page.locator("h1").first
        local_h1_text = local_h1.inner_text()
        print(f"Local H1: {local_h1_text}")
        if "Hamburg" in local_h1_text:
            print("✅ Local H1 check passed")
        else:
            print("❌ Local H1 check failed")

        # Check specific content
        content_text = page.locator("body").inner_text()
        if "Hamburg (20095)" in content_text:
             print("✅ Local content check passed")
        else:
             print("❌ Local content check failed")

        page.screenshot(path="verification/verify_local_hamburg.png")

        # 3. Verify Invalid City (Should be 404)
        print("Verifying Invalid City...")
        page.goto("http://localhost:5173/liefergebiet/invalid-city")
        page.wait_for_load_state("networkidle")

        if "404" in page.title() or "nicht gefunden" in page.locator("body").inner_text().lower():
             print("✅ 404 check passed")
        else:
             print("❌ 404 check failed")

        browser.close()

if __name__ == "__main__":
    verify_changes()
