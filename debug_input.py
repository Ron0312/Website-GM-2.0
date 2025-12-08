from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173/")

        print("Navigating to Contact Section...")
        # Scroll to contact form
        contact_section = page.locator("#kontakt")
        contact_section.scroll_into_view_if_needed()

        print("Filling input...")
        # Find the name input
        name_input = page.locator("input[name='name']")
        name_input.fill("Test User")

        print("Blurring input...")
        # Blur by clicking somewhere else (e.g., the label or body)
        page.locator("body").click()

        # Wait for potential animation/state update
        page.wait_for_timeout(1000)

        print("Inspecting Wrapper...")
        # Find the parent wrapper of the input which should have the icons
        # In ModernInput, the wrapper is the parent of the input
        # Structure: div.relative > motion.div > input + icons

        # Let's target the wrapper div that has the border
        wrapper = name_input.locator("..")

        print(f"Wrapper HTML: {wrapper.inner_html()}")

        # Check for Check icon
        check_icon = wrapper.locator(".lucide-check")
        if check_icon.count() > 0:
            print("SUCCESS: Check icon found.")
        else:
            print("FAILURE: Check icon NOT found.")

        browser.close()

if __name__ == "__main__":
    run()
