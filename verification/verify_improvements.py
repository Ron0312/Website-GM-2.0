from playwright.sync_api import sync_playwright

def verify_cta_and_semantics(page):
    print("Navigating to /wissen/miete-kauf (Tank Tech Category)...")
    page.goto("http://localhost:5173/wissen/miete-kauf")

    # 1. Verify Semantic HTML (Article Tag)
    print("Verifying <article> tag...")
    article = page.locator("article.article-content")
    article.wait_for()
    print("Semantic <article> found.")

    # 2. Verify Time Tag
    print("Verifying <time> tag...")
    time_tag = page.locator("time")
    time_tag.wait_for()
    print("Semantic <time> tag found.")

    # 3. Verify Contextual CTA (Tank Offer)
    print("Verifying Tank Offer CTA...")
    cta = page.locator("button", has_text="Tank-Angebot anfordern")
    cta.scroll_into_view_if_needed()
    cta.wait_for()
    print("Contextual CTA (Tank) found.")

    # Screenshot 1
    page.screenshot(path="verification/cta_tank.png")
    print("Screenshot 1 saved.")

    # 4. Navigate to Gas Category
    print("Navigating to /wissen/preis-guide (Gas Category)...")
    page.goto("http://localhost:5173/wissen/preis-guide")

    # 5. Verify Contextual CTA (Price Check)
    print("Verifying Price Check CTA...")
    price_cta = page.locator("button", has_text="Tagespreis berechnen")
    price_cta.scroll_into_view_if_needed()
    price_cta.wait_for()
    print("Contextual CTA (Price) found.")

    # Screenshot 2
    page.screenshot(path="verification/cta_price.png")
    print("Screenshot 2 saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_cta_and_semantics(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
