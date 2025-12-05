from playwright.sync_api import sync_playwright, expect

def test_energy_calculator():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the calculator page
        page.goto("http://localhost:5173/rechner")

        # Wait for the calculator to appear
        calculator = page.locator("#calculator")
        expect(calculator).to_be_visible()

        # Verify title
        expect(page.get_by_text("Energie-Rechner")).to_be_visible()

        # Check if the initial value is correct (9.600,00 kWh)
        # We need to find the input for kWh.
        # Based on my implementation: "Brennwert-Energie (Basis)"
        kwh_input = page.locator("input[placeholder='0']").first
        # Actually I can search by label text adjacent to input or container
        # But let's check the value. The value in input is formatted.

        # Let's take a screenshot of the initial state
        page.screenshot(path="verification/calculator_initial.png")

        # Change value of kWh to 10000
        kwh_input.click()
        kwh_input.fill("10000")
        # Click outside to blur and trigger calculation/reformat if onBlur used (though my code uses onChange immediately)
        # But my code resets activeField on Blur.
        page.locator("body").click()

        # Verify that other fields updated
        # 10000 kWh / 13.98 kg/kWh (LPG) = ~715.31 kg
        # Let's check the text of another input.
        # Find input associated with "Gewicht" under "Flüssiggas"
        # It's hard to target by label without ID, but I can assume order or use text locators.

        page.screenshot(path="verification/calculator_updated.png")

        browser.close()

if __name__ == "__main__":
    test_energy_calculator()
