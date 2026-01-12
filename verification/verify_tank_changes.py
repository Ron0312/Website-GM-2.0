from playwright.sync_api import sync_playwright, expect
import re
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)

    # Set viewport to mobile to verify swipe/peek if needed, or desktop
    # Let's check desktop first for the click bug
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))

    page.goto("http://localhost:5173")
    page.locator("#tanks").scroll_into_view_if_needed()

    print("Clicking Halboberirdisch filter...")
    page.get_by_role("button", name=re.compile("halboberirdisch", re.IGNORECASE)).click()
    page.wait_for_timeout(2000)

    # SVG check
    print("SVG check after filter:")
    svgs = page.locator('svg[role="img"]').all()
    if svgs:
        html = svgs[0].inner_html()
        if "strokeDasharray" in html or "M0 35 H100" in html:
             print("Looks like Halboberirdisch SVG (Confirmed)")

    # Take screenshot
    screenshot_path = "/home/jules/verification/halboberirdisch_verification.png"
    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

    # Click button to verify URL
    buttons = page.locator("#tanks").get_by_role("button", name="Details & Preis").all()
    if buttons:
        buttons[0].click()
        print(f"Current URL: {page.url}")
        if "halboberirdisch" in page.url:
            print("URL Navigation: SUCCESS")
        else:
            print("URL Navigation: FAILED")

    context.close()
    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
