from playwright.sync_api import Page, expect, sync_playwright

def verify_wizard_step1(page: Page):
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"Browser error: {exc}"))

    print("Navigating to homepage...")
    page.goto("http://localhost:5173")

    # Wait for hydration
    page.wait_for_timeout(3000)

    # Handle Cookie Banner
    try:
        cookie_btn = page.get_by_role("button", name="Alle akzeptieren")
        if cookie_btn.is_visible():
            print("Closing cookie banner...")
            cookie_btn.click()
            page.wait_for_timeout(1000)
    except:
        print("No cookie banner found or could not close.")

    # Click button
    print("Clicking button...")
    # Use role to be more specific
    button = page.get_by_role("button", name="Zum Anfrage-Assistenten").first
    expect(button).to_be_visible()
    # Force click just in case of overlay
    button.click(force=True)

    # Wait for modal
    print("Waiting for modal...")
    page.wait_for_timeout(2000)

    # Take screenshot
    page.screenshot(path="verification/modal_attempt_2.png")

    # Check for text "Wo wird geliefert?"
    expect(page.get_by_text("Wo wird geliefert?")).to_be_visible()

    # Enter PLZ
    print("Entering PLZ...")
    plz_input = page.get_by_placeholder("PLZ")
    plz_input.fill("23795")

    # Test Enter Key
    print("Pressing Enter...")
    plz_input.press("Enter")

    page.wait_for_timeout(1000)

    # Check Step 2
    print("Checking Step 2...")
    expect(page.get_by_text("Wie können wir helfen?")).to_be_visible()

    print("Success: Step 2 reached via Enter.")
    page.screenshot(path="verification/success.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_wizard_step1(page)
        except Exception as e:
            print(f"FAILED: {e}")
            page.screenshot(path="verification/failure.png")
            raise
        finally:
            browser.close()
