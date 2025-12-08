# Development Log

## [Current Date] - Accessibility and Animation Improvements

### Added
- **Legally Compliant Accessibility Statement**: Added a full `AccessibilityStatementContent` component in `src/components/Legal.jsx` referencing BITV 2.0 and WCAG 2.1, including contact info and enforcement procedure.
- **Skip to Content Link**: Added a hidden "Skip to content" link in `src/App.jsx` for keyboard navigation users.
- **Main Content Landmark**: Added `id="main-content"` and `tabIndex="-1"` to the main element in `src/App.jsx` to support the skip link.

### Changed
- **Tank Selection Animation**:
  - Removed `mode="wait"` from `AnimatePresence` in `TankSection.jsx` and switched to `mode="popLayout"` to prevent layout blocking and reduce perceived delay.
  - Reduced animation duration from 0.2s to 0.15s for snappier feedback.
  - Increased spring stiffness for the toggle switch to 400 for a more responsive feel.
  - Added `min-h-[300px]` to the info block container to minimize layout shifts during transitions.
- **Tank Card**: Ensured consistent `transition-all` usage.
- **Fixed Accessibility Route**: Added explicit handling for `/barrierefreiheit` in `App.jsx` to prevent server-side 404 errors and ensure the accessibility modal opens correctly on direct navigation.

### Accessibility Improvements
- **Navigation**: Verified `aria-current="page"` is applied to the active navigation item in `Navigation.jsx` to indicate current page state to screen readers.
- **A11y Widget**: Verified functionality of the Accessibility Widget.

### 10 Further Improvement Tips
1.  **SSR Error Boundary**: Implement a robust error boundary in `server.js` or `App.jsx` specifically for SSR to catch rendering errors and return a fallback HTML instead of crashing the process (solving the Passenger error page issue).
2.  **Sitemap Automation**: Automate `sitemap.xml` generation during the build process to include all dynamic tank routes, ensuring Google indexes them.
3.  **Image Optimization Pipeline**: Add a build step (e.g., `vite-plugin-imagemin`) to automatically compress and convert images to WebP/AVIF, rather than relying on manual conversions.
4.  **Content Security Policy (CSP) Refinement**: Tighten the CSP in `server.js` to strictly allow only necessary external scripts (Web3Forms), potentially moving inline styles to classes or using nonces.
5.  **Offline Support (PWA)**: Enhance the Service Worker to cache critical assets (fonts, logo, hero image) for offline access, improving resilience in poor network conditions.
6.  **Interactive Tank Configurator**: Upgrade the `WizardModal` into a full-page, interactive 3D or visual configurator for tanks, allowing users to see the installation type in a virtual garden.
7.  **Dynamic Pricing API**: Integrate a backend endpoint to fetch daily gas prices (if legally allowed/desired) or at least a "Price Trend" indicator to encourage timely ordering.
8.  **Customer Portal**: Create a login area for existing customers to view their tank level (if telemetry exists), order history, and download invoices.
9.  **Blog/News Integration**: Build a simple Markdown-based blog system (using the existing SSG setup) to publish industry news, safety tips, and company updates regularly for SEO.
10. **AB Testing Framework**: Implement a lightweight A/B testing mechanism (e.g., splitting traffic between two different Hero designs) to optimize conversion rates for "Angebot anfordern".
