from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Delivery Map Tooltip
        print("Navigating to home...")
        page.goto("http://localhost:5173")

        print("Waiting for Delivery Map...")
        # Scroll to map
        map_section = page.locator("text=Zu Hause im Norden")
        map_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000) # Wait for animation/load

        print("Hovering over Schleswig-Holstein...")
        # Try to find the path for SH. Since paths don't have good selectors, we might need to rely on the container or coordinates.
        # But we added regions with IDs in the code logic, but rendered as paths.
        # The region paths have `key={region.id}` but that's React key, not DOM attribute.
        # However, we can try to hover over the map area.

        # Let's target the svg
        svg = page.locator("svg").nth(0) # There might be other svgs, map is usually large

        # Approximate coordinates for SH (top left-ish of the viewBox 800x500)
        # We need to map viewBox to actual pixels.
        # Let's just hover over the center of the svg first to see if anything pops up.
        box = svg.bounding_box()
        if box:
            # SH is roughly top-center.
            page.mouse.move(box["x"] + box["width"] * 0.4, box["y"] + box["height"] * 0.3)
            page.wait_for_timeout(500)
            page.screenshot(path="verification/delivery_map_hover.png")
            print("Screenshot delivery_map_hover.png taken")


        # 2. ModernInput Micro-interaction
        print("Navigating to Contact...")
        page.goto("http://localhost:5173/kontakt")

        # Type into email field to trigger valid state
        print("Typing email...")
        email_input = page.get_by_label("Ihre E-Mail Adresse") # Or placeholder
        if not email_input.is_visible():
             email_input = page.get_by_placeholder("Ihre E-Mail Adresse")

        email_input.fill("test@example.com")
        email_input.blur() # Trigger validation
        page.wait_for_timeout(500) # Wait for animation

        page.screenshot(path="verification/input_valid.png")
        print("Screenshot input_valid.png taken")

        # Trigger invalid
        email_input.fill("invalid-email")
        email_input.blur()
        page.wait_for_timeout(500)

        page.screenshot(path="verification/input_invalid.png")
        print("Screenshot input_invalid.png taken")

        # 3. Sticky CTA (Mobile)
        print("Checking Sticky CTA on mobile...")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:5173")
        page_mobile.wait_for_timeout(1000)
        page_mobile.screenshot(path="verification/sticky_cta_mobile.png")
        print("Screenshot sticky_cta_mobile.png taken")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
