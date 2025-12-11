from playwright.sync_api import sync_playwright

def verify_calculator():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to homepage where calculator is located
            page.goto("http://localhost:5173")

            # Wait for calculator button to be visible and click it to expand
            # The calculator header text is "Profi-Rechner"
            page.wait_for_selector("text=Profi-Rechner")

            # Take screenshot of collapsed state
            page.screenshot(path="verification/calculator_collapsed.png")

            # Click to expand
            page.click("text=Profi-Rechner")

            # Wait for expansion (wait for "Gewicht Flüssiggas" to be visible)
            page.wait_for_selector("text=Gewicht Flüssiggas")

            # Wait a bit for animation
            page.wait_for_timeout(1000)

            # Take screenshot of expanded state
            page.screenshot(path="verification/calculator_expanded.png")

            # Interact with input
            # Fill "Gewicht Flüssiggas" with 1000
            page.get_by_label("Gewicht Flüssiggas in kg").fill("1000")

            # Wait for calculation update - check Oil value
            # 1000 kg LPG * 13.98 = 13980 kWh
            # Oil = 13980 / 9.7 = 1441.24 l

            # Wait for value to update
            # We can check value of Oil input
            page.wait_for_timeout(500)

            oil_input = page.get_by_label("Volumen Heizöl in l")
            oil_value = oil_input.input_value()
            print(f"Oil value for 1000kg LPG: {oil_value}")

            # Take screenshot of calculation
            page.screenshot(path="verification/calculator_calculation.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_calculator()
