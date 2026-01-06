
from playwright.sync_api import sync_playwright

def verify(page):
    page.goto('http://localhost:5173')
    page.wait_for_selector('nav')
    # Check logo is visible
    page.screenshot(path='verification/home.png')

    # Check mobile menu
    page.set_viewport_size({'width': 375, 'height': 812})
    page.reload()
    # The error said strict mode violation because "Menü öffnen" matched multiple.
    # The mobile menu button is hidden on desktop but visible on mobile.
    # The error message shows:
    # 1) <button aria-label="Menü öffnen" class="lg:hidden ...">
    # 2) <button aria-label="Barrierefreiheit Menü öffnen" ...>
    # The locator 'Menü öffnen' matches 'Barrierefreiheit Menü öffnen'?? Maybe partial match?
    # No, usually get_by_label is exact or close.
    # But wait, the error shows `get_by_label("Menü öffnen") resolved to 2 elements`.
    # Let's use a more specific selector or filter by visibility.

    # Click the mobile menu button (visible only on mobile)
    page.locator('button[aria-label="Menü öffnen"]').first.click()

    page.wait_for_selector('text=Menü')
    page.screenshot(path='verification/mobile_menu.png')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify(page)
    finally:
        browser.close()
