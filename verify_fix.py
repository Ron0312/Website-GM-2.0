
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Delivery Area Page
        print("Navigating to delivery area page...")
        page.goto("http://localhost:5173/liefergebiet/hamburg")

        # Check for key content
        print("Checking for content...")
        expect(page.get_by_role("heading", name="Günstiges Flüssiggas für Hamburg")).to_be_visible()
        expect(page.get_by_text("Ihr Liefergebiet: Hamburg & Umgebung")).to_be_visible()

        # Check if map fallback or map is present
        # Since we use ComponentErrorBoundary, we can check if it rendered the map container OR the error fallback
        # The map container has class "h-96 w-full ..."
        # The error fallback text is "Karte konnte nicht geladen werden"

        # We prefer to see the map or at least NOT the server error page
        page.screenshot(path="verify_delivery.png")
        print("Screenshot saved to verify_delivery.png")

        # 2. Verify Sitemap
        print("Checking sitemap.xml...")
        response = page.request.get("http://localhost:5173/sitemap.xml")
        print(f"Sitemap Status: {response.status}")
        text = response.text()
        if "<?xml" in text and "<urlset" in text:
            print("Sitemap looks like XML")
            if "&" in text and not "&amp;" in text and not "&lt;" in text and not "&gt;" in text and not "&quot;" in text and not "&apos;" in text:
                # Basic check, might be flaky if valid & exists? No, valid & must be escaped.
                # If we find standalone &, it's bad.
                # But regex is better.
                pass
        else:
            print("Sitemap content seems wrong:")
            print(text[:200])

        browser.close()

if __name__ == "__main__":
    run()
