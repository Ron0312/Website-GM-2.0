from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify "Tank Entsorgung"
        page.goto("http://localhost:5173/wissen/tank-entsorgen")
        page.wait_for_selector("text=Fachfirma")
        page.screenshot(path="verification/tank_entsorgen.png")
        print("Verified tank-entsorgen")

        # 2. Verify "Tank Kosten"
        page.goto("http://localhost:5173/wissen/tank-kosten")
        page.wait_for_selector("text=Was kostet ein Flüssiggastank?")
        page.screenshot(path="verification/tank_kosten.png")
        print("Verified tank-kosten")

        browser.close()

if __name__ == "__main__":
    verify_changes()
