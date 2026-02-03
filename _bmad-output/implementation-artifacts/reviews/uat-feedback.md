
### Issues
1. **Navbar Background Transparency on Reload**: 
   - **Observation**: If the page is refreshed while scrolled down, the navbar background is transparent instead of opaque. It corrects itself upon further scrolling.
   - **Expectation**: On page reload, the scroll position should be checked to immediately apply the opaque background if not at the top.

2. **Social Media Links Update**:
   - **Observation**: Current links need to be updated.
   - **Expectation**: 
     - LinkedIn: `https://www.linkedin.com/in/dalton-ponder-99a96a131`
     - GitHub: `https://github.com/DivineStudio/com.daltonponder_next`

3. **Footer "Home" Link Styling**:
   - **Observation**: The "Home" link in the footer has different styling compared to adjacent links.
   - **Expectation**: Ensure the "Home" link style matches the other text links in the footer.

4. **Replace Emojis with Iconify Icons**:
   - **Observation**: Emojis are currently used in the interface (likely AI placeholders).
   - **Expectation**: Remove all emojis and replace them with appropriate Iconify icons for a cleaner, professional look.

5. **Carousel Drag Functionality**:
   - **Observation**: Carousels may currently lack drag-to-scroll capabilities.
   - **Expectation**: Enable drag-to-move functionality for navigating next/previous items on both desktop (mouse) and mobile (touch) for all carousels.

6. **Remove "Download Resume" Button**:
   - **Observation**: The "Download Resume" button is present on the Credentials page.
   - **Expectation**: Remove the "Download Resume" button entirely.

7. **Remove "X" from Socials on Contact Page**:
   - **Observation**: "X" (Twitter) is listed in the Socials section on the Contact page.
   - **Expectation**: Remove "X" from the list of social links on the Contact page.

8. **Contact Form Backend Integration**:
   - **Observation**: The contact form currently simulates submission (no actual backend connected).
   - **Expectation**: Integrate with a form handling service (e.g., Formspree, as used in the previous site) to ensure messages are actually delivered.
   - **Note from the project owner**: If you think there is a better form handling service than Formspree that is better suited for this project, please let me know. Discuss this with me during implementation. Also, depending on whether the turing test is performed by the form handling service or not, we may need to adjust the form to account for this. If the turing test needs to be performed by us, we may need to adjust the form to account for this.

9. **Contact Form Button Cursor**:
   - **Observation**: The "Send Message" button does not show the pointer cursor on hover.
   - **Expectation**: CSS should be updated to ensure the button displays `cursor: pointer` on hover.
