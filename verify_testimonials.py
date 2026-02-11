from playwright.sync_api import sync_playwright

def verify_testimonials(page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000")

    print("Waiting for testimonials section...")
    # Scroll to testimonials
    # Look for "Testimonials" header
    header = page.get_by_role("heading", name="Testimonials")
    header.scroll_into_view_if_needed()

    print("Waiting for typewriter effect...")
    # The active slide should have text.
    # The hidden slides should be empty (except for cursor if implemented that way, or just empty text).
    # In TypewriterText:
    # <span aria-hidden="true">{displayedText}...</span>
    # If not active, displayedText is "".

    # Wait a bit for typing to happen
    page.wait_for_timeout(2000)

    print("Taking screenshot...")
    page.screenshot(path="verification_testimonials.png")

    # Optional: Check DOM
    # Get all blockquotes
    quotes = page.locator("blockquote span[aria-hidden='true']").all()
    print(f"Found {len(quotes)} quotes elements (some might be hidden/sr-only parts)")

    for i, q in enumerate(quotes):
        text = q.inner_text()
        print(f"Quote {i} text: '{text}'")
        # We expect one to have text, others to be empty or just cursor.
        # Cursor is: <span className="animate-pulse">|</span>
        # So text will be "|" or "Some text |"

        # If fix works:
        # Active: "Some text... |"
        # Inactive: "|" (because displayedText is "", so only cursor renders)

        # Wait, if displayedText is "", logic:
        # <span aria-hidden="true">
        #    {displayedText}
        #    {currentIndex < text.length && (
        #        <span className="animate-pulse">|</span>
        #    )}
        # </span>
        # So inactive ones will just be "|".

    print("Verification script finished.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_testimonials(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
