from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open Calculator
        page.goto("http://localhost:5173/") # Assuming index has it

        # Navigate to Calculator section (it's in content probably or I can scroll)
        # I'll just screenshot the calculator component if possible, or the page area.
        # Wait for calculator to load
        page.wait_for_selector("#calculator")

        # Click to expand if needed
        # Check if collapsed (usually expanded state is handled in React, but we can just click the header)
        page.click("text=Energie-Berater & Rechner")
        page.wait_for_timeout(1000) # Wait for expansion

        # 1. Verify Pellets "Mehrkosten"
        # Select Pellets
        # Click the button with "Pellets" text
        page.click("button:has-text('Pellets')")
        page.wait_for_timeout(1000) # Wait for anim
        page.screenshot(path="redesign_calculator_pellets.png")

        # 2. Verify Unit Converter Redesign
        # Click "Umrechner" tab
        page.click("button:has-text('Umrechner')")
        page.wait_for_timeout(1000)
        page.screenshot(path="redesign_converter.png")

        browser.close()

if __name__ == "__main__":
    run()
