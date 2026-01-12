from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)

    # Mobile viewport to verify swipe layout
    context = browser.new_context(viewport={'width': 375, 'height': 812})
    page = context.new_page()

    page.goto("http://localhost:5173")

    # Scroll to tanks
    page.locator("#tanks").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # Verify Dots exist (visual check via screenshot mostly, but we can check DOM)
    # The dots div is: className="flex justify-center gap-2 mb-24 md:hidden"
    # We can search for that structure or the children

    dots_container = page.locator(".flex.justify-center.gap-2.mb-24.md\\:hidden")
    if dots_container.is_visible():
        print("Pagination dots container is visible.")
        dots = dots_container.locator("div").all()
        print(f"Found {len(dots)} dots.")
        if len(dots) == 3:
             print("Correct number of dots found.")
    else:
        print("Pagination dots container NOT visible!")

    # Verify peek layout via screenshot
    screenshot_path = "/home/jules/verification/mobile_swipe_layout.png"
    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path=screenshot_path)
    print(f"Mobile screenshot saved to {screenshot_path}")

    context.close()
    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
