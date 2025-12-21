from playwright.sync_api import sync_playwright

def verify_privacy_modal(page):
    print("Navigating to home page...")
    page.goto("http://localhost:5173")

    # Wait for page to load
    page.wait_for_selector("text=Anfrage-Assistenten")

    # Open Wizard
    print("Opening wizard...")
    page.click("text=Anfrage-Assistenten")

    # Wait for wizard
    page.wait_for_selector("#wizard-title")

    # Step 1: PLZ
    print("Entering PLZ...")
    page.fill("input[placeholder=\"PLZ\"]", "23795")
    page.keyboard.press("Enter")

    # Step 2: Service
    # Use more specific selector for the Service CARD in the wizard,
    # distinguishing it from the "Service" button in the navigation menu.
    print("Selecting Service path...")

    # The selection cards usually contain text "Service" and "Wartung"
    # Or we can look for the button inside the modal.
    # The modal is usually at the end of the DOM.
    # We can scope by the modal dialog.

    modal = page.locator("div[role=\"dialog\"]")

    # Wait for animation
    page.wait_for_timeout(1000)

    # Click the Service card inside the modal
    modal.get_by_text("Service").click()

    # Wait for state update
    page.wait_for_timeout(500)

    # Click Weiter
    modal.get_by_role("button", name="Weiter").click()

    # Step 3: Details (Service Type & Message)
    print("Filling details...")
    modal.locator("select").select_option("Wartung")
    modal.locator("textarea").fill("Test Message")
    modal.get_by_role("button", name="Weiter zu Kontakt").click()

    # Step 4: Contact - check for Privacy Link
    print("Checking for Privacy Link...")
    # Wait for the privacy link to appear
    page.wait_for_timeout(1000)

    # Click Privacy Link
    print("Clicking Privacy Link...")
    # It might be "Datenschutzerklärung" button
    privacy_btn = modal.get_by_role("button", name="Datenschutzerklärung")
    privacy_btn.click()

    # Wait for Modal (Legal modal appears on top)
    print("Waiting for Privacy Modal...")
    # The legal modal also has role="dialog" but it is a new one.
    # We can look for the title "Datenschutz"
    page.wait_for_selector("h2:has-text(\"Datenschutz\")")

    # Screenshot
    print(" taking screenshot...")
    page.screenshot(path="verification/privacy_modal.png")
    print("Screenshot saved.")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_privacy_modal(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()
