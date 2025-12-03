from playwright.sync_api import sync_playwright

def verify_ssr():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with JavaScript disabled
        context = browser.new_context(java_script_enabled=False)
        page = context.new_page()

        try:
            # Navigate to the local server
            page.goto("http://localhost:5173/")

            # Wait a bit to ensure everything (HTML) is loaded
            page.wait_for_timeout(1000)

            # Take a full page screenshot
            page.screenshot(path="verification/ssr_verification.png", full_page=True)

            # Also get the page content to verify text presence
            content = page.content()
            if "gasmöller" in content and "Ihr Partner für Flüssiggas im Norden" in content:
                print("SSR Verified: Content found with JS disabled.")
            else:
                print("SSR Failed: Content not found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_ssr()
