from playwright.sync_api import sync_playwright
import json

def verify_article(page):
    print("Navigating to /wissen/fernwaerme-vergleich...")
    page.goto("http://localhost:5173/wissen/fernwaerme-vergleich")

    # 1. Verify Title (Targeting H2 specifically to avoid strict mode error)
    print("Verifying Title...")
    # Use exact=True to match the full title or filter by level
    title_locator = page.locator("h2", has_text="Fernwärme vs. Flüssiggas")
    title_locator.wait_for()
    print("Title found.")

    # 2. Verify Comparison Table
    print("Verifying Comparison Table...")
    table_locator = page.locator("table")
    table_locator.wait_for()
    print("Comparison Table found.")

    # 3. Verify Schema.org
    print("Verifying Schema.org JSON-LD...")
    # Get the LD-JSON script content
    ld_json_scripts = page.locator('script[type="application/ld+json"]').all()

    schema_found = False
    for script in ld_json_scripts:
        content = script.text_content()
        try:
            data = json.loads(content)
            # Handle array of schemas
            if isinstance(data, list):
                for item in data:
                    if check_schema_item(item):
                        schema_found = True
            elif isinstance(data, dict):
                 if check_schema_item(data):
                        schema_found = True
        except json.JSONDecodeError:
            continue

    if schema_found:
        print("SUCCESS: Valid Semantic Schema found.")
    else:
        print("FAILURE: Semantic Schema NOT found.")

    # 4. Take Screenshot
    print("Taking Screenshot...")
    page.screenshot(path="verification/fernwaerme_verification.png", full_page=True)
    print("Screenshot saved.")

def check_schema_item(item):
    if item.get("@type") == "Article":
        print(f"Found Article Schema: {item.get('headline')}")

        # Check Mentions
        mentions = item.get("mentions", [])
        has_warmteplanung = any(m.get("name") == "Kommunale Wärmeplanung" for m in mentions)

        # Check About
        about = item.get("about", [])
        has_fernwaerme = any(a.get("name") == "Fernwärme" for a in about)

        if has_warmteplanung and has_fernwaerme:
            print("  - Contains 'Kommunale Wärmeplanung' and 'Fernwärme'")
            return True
        else:
            print(f"  - Missing entities. Mentions: {mentions}, About: {about}")
    return False

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_article(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
