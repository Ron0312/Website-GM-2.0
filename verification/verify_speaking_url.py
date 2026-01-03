from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify "Speaking URL" for product
        # Note: App.jsx handles "fluessiggastank-kaufen/" by matching "activeSection.startsWith('fluessiggastank-kaufen/')"
        # and then rendering TankDetail.
        url = "http://localhost:5173/fluessiggastank-kaufen/1-2t-oberirdisch"
        print(f"Navigating to {url}")
        page.goto(url)

        # Expect to see the tank name.
        # Using a text selector that is likely unique to that tank page.
        page.wait_for_selector("text=1,2 t Flüssiggastank (oberirdisch)")

        # Verify page title (SEO) via JS execution because browser title might take a moment or need checking document.title
        title = page.title()
        print(f"Page Title: {title}")

        if "Flüssiggastank 2700 Liter kaufen" in title:
            print("SEO Title Verified!")
        else:
            print(f"SEO Title Mismatch. Got: {title}")

        page.screenshot(path="verification/tank_detail_speaking_url.png")
        print("Verified tank detail with speaking URL")

        browser.close()

if __name__ == "__main__":
    verify_changes()
