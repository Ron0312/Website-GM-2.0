from playwright.sync_api import sync_playwright

def verify_desktop_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop Viewport
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        print("Checking Gas Order Page Desktop...")
        page.goto("http://localhost:5173/gas")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/gas_desktop.png")

        browser.close()

if __name__ == "__main__":
    verify_desktop_layout()
