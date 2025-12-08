from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page (assuming port 5173 based on Vite defaults)
        page.goto("http://localhost:5173")

        # 1. Verify Hero Section badge update
        # Check for "Seit 2000" in the hero badge
        # The badge contains text "Seit 2000 · Norddeutsch · Ehrlich"
        hero_badge = page.locator("header").get_by_text("Seit 2000")
        expect(hero_badge).to_be_visible()
        print("Hero badge verified.")

        # 2. Verify Footer update
        # Check for "Seit 2000" in the footer
        footer_text = page.locator("footer").get_by_text("Seit 2000")
        expect(footer_text).to_be_visible()
        print("Footer text verified.")

        # 3. Verify About Us Page updates
        page.goto("http://localhost:5173/ueber-uns")

        # Check for founding year in text
        about_text = page.get_by_text("Seit unserer Gründung im Jahr 2000")
        expect(about_text).to_be_visible()
        print("About page founding year verified.")

        # Check for origin story elements
        origin_story = page.get_by_text("Alles begann durch einen Zufall")
        expect(origin_story).to_be_visible()

        spade_story = page.get_by_text("mit Spaten wurde der Tank ausgebuddelt")
        expect(spade_story).to_be_visible()
        print("About page origin story verified.")

        # 4. Verify Team Section updates
        # Check for Anja Möller (using heading to be specific and avoid strict mode violations)
        anja_card = page.get_by_role("heading", name="Anja Möller")
        expect(anja_card).to_be_visible()

        # Check for Thomas Möller's new role
        thomas_role = page.get_by_text("Geschäftsführung & Sachkundiger")
        expect(thomas_role).to_be_visible()

        # Check for Hans Christian Möller's new role
        hans_role = page.get_by_text("Logistik & Büro")
        expect(hans_role).to_be_visible()
        print("Team section verified.")

        # 5. Verify Timeline updates
        # Check for 2000 Founding (using exact match or refining locator)
        # The timeline year is often a span or separate element
        timeline_2000 = page.get_by_text("2000", exact=True)
        expect(timeline_2000).to_be_visible()

        # Check for 2025 Jubilee
        timeline_2025 = page.get_by_text("25 Jahre Jubiläum")
        expect(timeline_2025).to_be_visible()
        print("Timeline verified.")

        # Take screenshots
        # About Page Screenshot (covers most changes)
        page.screenshot(path="verification/about_page_verification.png", full_page=True)

        # Home Page Screenshot (covers Hero and Footer)
        page.goto("http://localhost:5173")
        page.screenshot(path="verification/home_page_verification.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    try:
        verify_changes()
        print("Verification successful!")
    except Exception as e:
        print(f"Verification failed: {e}")
        exit(1)
