# Developer Log

## Feedback & Self-Assessment

### Improvements Made
- **Postal Code Validation**: Updated logic to strictly match Northern German regions (17-19, 20-25, 27, 292-296), fixing the issue where `3xxxx` was incorrectly accepted.
- **Hero Consistency**: Unified the visual style of the "Gas bestellen" hero section to match the "Home" hero (lighter overlay).
- **Visual Refresh**: Updated the background image of the "Gas bestellen" section for better variety.
- **UX Enhancement**: Added a pulse animation to the "Zum Anfrage-Assistenten" button to increase visibility and click-through rate.

### Self-Assessment
The changes directly address the user's feedback regarding accuracy and visual consistency.
- The regex validation is much more robust now.
- The visual changes create a more cohesive brand experience.
- The "Hands-Off" approach was maintained by ensuring all changes are integrated into the existing component structure without breaking styles.

### Future Improvements
1.  **Next.js Migration**: As noted in the app itself, migrating to Next.js would significantly improve SEO capabilities (meta tags per page) and performance (image optimization).
2.  **Server-Side Validation**: Currently, validation is client-side. Moving this to a backend service (or Server Actions in Next.js) would be more secure.
3.  **Accessibility**: While improved, further audits on contrast ratios and screen reader navigation (ARIA labels) for the WizardModal would be beneficial.
4.  **Test Coverage**: Adding unit tests for the validation logic would prevent regression in future updates.

## Update v1.4

### Changes
-   **Consolidated Validation**: Created a shared `src/utils/validation.js` ensuring consistent Postal Code (PLZ) validation across all forms (`WizardModal`, `GasOrderSection`, `ContactSection`).
-   **Tank Detail Pages**: Implemented dynamic tank detail pages (`/tanks/:slug`) with rich content, technical data, and SEO optimization.
-   **SEO Enhancement**: Updated `seoData.js` to provide specific meta tags and Schema.org Product markup for each individual tank page.
-   **Form Consistency**: Added PLZ field to the Contact form to unify the user experience and location checking.

## Update v1.5

### Changes
-   **Legal Data Update**: Replaced all placeholder data (e.g., "Musterstraße") in `src/components/Legal.jsx` with the official company information for Gas-Service Möller e.K., including the correct address in Schieren, commercial register number (HRA 11334 KI), and VAT ID.
-   **SEO Data Optimization**: Updated `src/data/seoData.js` to reflect the correct physical address and geo-coordinates in Schema.org structured data, improving local SEO relevance.
-   **Contact Information**: Unified contact details across legal pages and SEO data to use the primary `kontakt@gasmoeller.de` email address.

## Update v1.6

### GDPR & Privacy Improvements
-   **Local Fonts**: Verified that fonts are loaded locally via `@fontsource` packages (Inter, Plus Jakarta Sans) to prevent IP leakage to Google Fonts.
-   **Removed External Images (CDNs)**: Identified and replaced external images hosted on `unsplash.com` with locally hosted versions in `public/images/`. This ensures no IP addresses are sent to third-party image providers upon page load.
-   **Privacy Check**: Confirmed `Web3Forms` is the only remaining external service (data processor), which is required for contact form functionality and is covered by the privacy policy.

### Recommended Further Improvements
1.  **Server-Side Analytics**: If analytics are needed in the future, implement a self-hosted solution like Plausible or Matomo to maintain the "No CDN / GDPR-safe" stance.
2.  **Content Security Policy (CSP)**: Implement a strict CSP header in `server.js` to technically enforce the "No CDN" rule and prevent accidental inclusion of external resources in the future.
3.  **Cookie Banner Refinement**: While a cookie banner exists, with the removal of most external trackers, it could potentially be simplified to only ask for consent for `Web3Forms` (if considered non-essential initially) or other future marketing tools.
