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

### Vorschläge für mehr Professionalität
1.  **Rate Limiting & Spam-Schutz**: Implementieren Sie serverseitiges Rate Limiting (z.B. `express-rate-limit`) für alle Formular-Endpunkte (Kontakt, Wizard), um Missbrauch über das Honeypot-Feld hinaus zu verhindern.
2.  **DSGVO Audit-Trail**: Protokollieren Sie bei Zustimmung zur Datenverarbeitung den genauen Zeitstempel und die anonymisierte IP-Adresse in der Web3Forms-Payload, um im Zweifelsfall einen besseren Nachweis (Audit Trail) zu haben.
3.  **Strict Content Security Policy (CSP)**: Härten Sie die CSP in `server.js` weiter ab. Ersetzen Sie `'unsafe-inline'` für Styles durch Nonces oder Hashes und blockieren Sie strikt alle nicht genehmigten Skript-Quellen, um Cross-Site-Scripting (XSS) unmöglich zu machen.
4.  **Automatisierter Link-Check**: Integrieren Sie einen CI/CD-Schritt oder ein Skript, das regelmäßig alle externen Links (Social Media, Partner) auf Erreichbarkeit prüft, um "Dead Links" zu vermeiden, die das Vertrauen mindern.
5.  **Erweitertes Product Schema (SEO)**: Ergänzen Sie `seoData.js` um detaillierte Schema.org `Product` Daten für jeden Tank (inkl. `sku`, `brand`, `mpn` und `offers`), um in den Google Shopping Ergebnissen und Rich Snippets professioneller zu erscheinen.
6.  **Automatisierte Barrierefreiheits-Tests**: Integrieren Sie Tools wie `pa11y` oder `axe-core` in die Build-Pipeline, um sicherzustellen, dass neue Änderungen keine Barrierefreiheits-Standards verletzen (z.B. fehlende `aria-labels`).
7.  **Professionelles Logging**: Ersetzen Sie `console.log` in `server.js` durch eine Logging-Bibliothek wie `winston` oder `morgan` mit Log-Rotation und strukturiertem Output (JSON), um Fehler in der Produktion effizienter analysieren zu können.
8.  **Graceful Shutdown**: Implementieren Sie `process.on('SIGTERM')` Logik im Server, um offene Verbindungen sauber zu schließen, bevor der Node-Prozess beendet wird – essenziell für Zero-Downtime Deployments.
9.  **Canonical & HTTPS Enforcing**: Stellen Sie sicher, dass der Server strikt `www.` auf `non-www` (oder umgekehrt) umleitet und HTTPS erzwingt, um "Duplicate Content" Probleme bei Suchmaschinen zu vermeiden und Sicherheit zu signalisieren.
10. **Sentry / Fehler-Monitoring**: Integrieren Sie einen Dienst wie Sentry im Frontend (`ErrorBoundary.jsx`), um JavaScript-Abstürze, die Nutzer erleben, automatisch zu erfassen, bevor diese sich beschweren müssen.

### Vorschläge zur optischen Aufwertung und UX/UI-Verbesserung
1.  **Micro-Interactions in Formularen**: Fügen Sie in `ModernInput.jsx` subtile Animationen hinzu, z.B. ein kurzes Aufleuchten oder ein animiertes Häkchen, sobald ein Feld validiert wurde, um dem Nutzer sofortiges positives Feedback zu geben.
2.  **Sticky Mobile CTA**: Fixieren Sie auf mobilen Geräten den "Angebot anfordern" oder "Anrufen" Button am unteren Bildschirmrand, damit der Conversion-Pfad unabhängig von der Scrollposition immer nur einen Klick entfernt ist.
3.  **Progressive Image Loading (Blur-Up)**: Implementieren Sie einen "Blur-Up" Effekt für Hero- und Produktbilder. Laden Sie zuerst ein winziges Base64-Bild und blenden Sie das hochauflösende Bild weich ein, um weißes Flackern beim Laden zu vermeiden.
4.  **Interaktive Lieferkarte**: Machen Sie die `DeliveryMap.jsx` lebendiger. Wenn Nutzer mit der Maus über ihre Region fahren, sollte diese aufleuchten und ein Tooltip ("Wir liefern hier!") erscheinen, statt nur eine statische Grafik zu sein.
5.  **Scroll-Driven Animations**: Nutzen Sie `framer-motion` (z.B. `useScroll`), um Elemente wie die Vorteilskarten in der `TankSection` sanft einblenden oder leicht versetzt (Parallax) bewegen zu lassen, wenn der Nutzer scrollt.
6.  **Haptisches Feedback (Mobile)**: Lösen Sie bei erfolgreichen Aktionen im `WizardModal` (z.B. Schritt abgeschlossen) eine leichte Vibration (`navigator.vibrate`) auf Smartphones aus, um die Interaktion "fühlbar" zu machen.
7.  **Live-Status "Geöffnet/Geschlossen"**: Zeigen Sie im Header oder Footer basierend auf der aktuellen Uhrzeit dynamisch an, ob das Büro gerade besetzt ist ("🟢 Jetzt geöffnet" vs. "🔴 Morgen ab 8:00 wieder da"), um Dringlichkeit und Erreichbarkeit zu kommunizieren.
8.  **Custom 404 Experience**: Gestalten Sie die 404-Seite kreativer, z.B. mit einer Illustration eines "verlorenen Tanklasters" oder eines "leeren Tanks" und einem humorvollen Text, der sympathisch zur Startseite zurückleitet.
9.  **Skeleton Loading im Rechner**: Zeigen Sie während Berechnungen oder Modus-Wechseln im `EnergyCalculator` ein "Skeleton UI" (graue Platzhalter-Balken) statt eines Spinners an, um die wahrgenommene Ladezeit zu verkürzen.
10. **Glassmorphism Hover-Effekte**: Verleihen Sie den Team-Karten oder Produkt-Karten beim Hover einen modernen "Milchglas"-Effekt (Backdrop-Blur) über den Informationen, um Tiefe und Modernität zu vermitteln.
