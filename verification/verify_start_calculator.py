from playwright.sync_api import sync_playwright, expect

def test_start_page_calculator():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the start page
        page.goto("http://localhost:5173/")

        # Wait for the tank section to appear (implied by content)
        # We need to find the calculator. The new calculator has id="calculator" but inside the component it might not have the id directly on the root div if I removed it?
        # Let's check EnergyCalculator code.
        # It has <div className="..." id="calculator">

        calculator = page.locator("#calculator")
        expect(calculator).to_be_visible()

        # Verify it is the Energy Calculator (check title)
        expect(page.get_by_text("Energie-Rechner")).to_be_visible()

        # Take screenshot of the start page with calculator
        # We might need to scroll down to see it.
        calculator.scroll_into_view_if_needed()
        page.screenshot(path="verification/start_page_calculator.png")

        browser.close()

if __name__ == "__main__":
    test_start_page_calculator()
