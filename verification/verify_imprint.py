from playwright.sync_api import sync_playwright

def verify_imprint(page):
    # Navigate to the home page (assuming port 5173 for Vite dev server)
    # Note: Vite usually runs on 5173, but we should check. I'll assume 5173.
    # The server might take a moment to start.
    page.goto("http://localhost:5173")

    # The legal modal is triggered by links in the footer usually.
    # Let's scroll to footer and click "Impressum".
    # Assuming there's a footer link with text "Impressum".

    # Wait for the footer to be visible
    page.wait_for_selector('text=Impressum')

    # Click on "Impressum"
    page.click('text=Impressum')

    # Wait for the modal content to appear
    # The new content should contain "Neuenteichweg 7a"
    page.wait_for_selector('text=Neuenteichweg 7a')

    # Take a screenshot
    page.screenshot(path="verification/imprint_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_imprint(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
