# Development Log

## [Current Date] - Status & Analysis

### ✅ Aktuell umgesetzte SEO-Maßnahmen
Eine Analyse der Codebasis (`seoData.js`, `server.js`, Komponenten) zeigt folgende implementierte Standards:

**1. Technische SEO (Technical SEO)**
*   **Server-Side Rendering (SSR):** Die Anwendung nutzt SSR via `server.js`, wodurch Suchmaschinen vollständigen HTML-Code erhalten, statt leerer JavaScript-Container.
*   **Sitemap & Robots.txt:** Automatische Generierung (`scripts/generate-sitemap.js`) bei jedem Build. Beinhaltet statische Seiten und dynamische Tank-Detailseiten (`/tanks/:slug`) sowie **Local Landingpages** (`/liefergebiet/:city`).
*   **Performance (Core Web Vitals):**
    *   `LCP` Optimierung: Hero-Images nutzen `loading="eager"` und `fetchpriority="high"`.
    *   Bildformate: Konsequente Nutzung von Next-Gen Formaten (`.webp`).
    *   Caching: `vite-plugin-pwa` Caching-Strategien für Assets und Fonts.
*   **Canonical & Redirects:**
    *   Serverseitige Normalisierung von URLs (Entfernung von Trailing Slashes).
    *   Mapping alter URLs (Legacy Redirects) zur Erhaltung des Linkjuice.

**2. Strukturiere Daten (Schema.org)**
*   **LocalBusiness Schema:** Umfassende Daten inkl. Geo-Koordinaten, Öffnungszeiten, Telefon und `AggregateRating` (5.0 Sterne) in `seoData.js`.
*   **Product Schema:** Detailseiten (`/tanks/1-2-t-oberirdisch`) liefern detaillierte Produkt-Daten (SKU, Brand, Description, Offer).
*   **OfferCatalog:** Die Übersichtseite (`/tanks`) ist als Katalog ausgezeichnet.
*   **BreadcrumbList:** Dynamische Generierung der Pfadstruktur für Rich Snippets.
*   **WebSite:** Definition der Sitelinks Search Box.

**3. On-Page Optimierung**
*   **Metadaten:** Individuelle `Title` und `Description` Tags für jede Route, optimiert auf CTR (z.B. "Nr. 1 im Norden", "Tiefpreis-Garantie").
*   **Semantisches HTML:** Nutzung von `<header>`, `<main>`, `<section>`, `<article>` zur Strukturierung.
*   **Social Sharing:** Open Graph Tags (`og:image`, `og:title`) mit Fallback-Logik.

---

### 🚀 Priorisierte Roadmap (Top 10)
Dies sind die 10 wichtigsten nächsten Schritte zur Verbesserung von UX, Technik und SEO:

1.  **Skeleton Loading (UX):**
    *   Implementierung von Lade-Platzhaltern (Skeletons) für `EnergyCalculator`, `DeliveryMap` und das `WizardModal`, um "Layout Shifts" beim Laden zu vermeiden und die gefühlte Performance zu steigern.
2.  **Erweiterte Formular-Validierung (Tech/UX):**
    *   Refactoring des `WizardModal` auf `react-hook-form` + `zod`.
    *   Integration von "Shake"-Animationen bei Fehlern und visuelles Scrollen zum ersten fehlerhaften Feld (Focus Management).
3.  **Automatisierte E2E-Tests (Quality):**
    *   Integration der Playwright-Skripte in eine CI/CD-Pipeline (Github Actions), um bei jedem Push kritische Pfade (Checkout, Rechner) automatisch zu prüfen.
4.  **Unit-Tests für Logik (Quality):**
    *   Einführung von Vitest für rechenintensive Komponenten wie `EnergyCalculator` und Validierungs-Funktionen (`utils/validation.js`), um Rechenfehler auszuschließen.
5.  **Micro-Interactions (UX):**
    *   Hinzufügen von subtilen Animationen (z.B. Ripple-Effekte auf Buttons, leichte Skalierung auf Cards) für ein wertigeres "Look & Feel".
6.  **Image CLS Optimierung (SEO):**
    *   Strikte Durchsetzung von `width` und `height` Attributen auf allen `<img>` Tags sowie Nutzung von `<picture>` Elementen für Art-Direction, um Cumulative Layout Shift (CLS) vollständig zu eliminieren.
7.  **Accessibility (A11y) Audit:**
    *   Automatisierter Check (z.B. via `axe-core`) auf Kontrastverhältnisse, fehlende Labels bei Icon-Buttons und korrekte ARIA-Attribute in Modals.
8.  **Mobile Touch Targets (Mobile UX):**
    *   Vergrößerung der Klickflächen auf mind. 44x44px für alle interaktiven Elemente (besonders Footer-Links und Radio-Buttons im Assistenten).
9.  **Druck-Styles (CSS):**
    *   Optimierung der `@media print` Styles, damit Angebote und Rechner-Ergebnisse sauber ohne Header/Footer gedruckt werden können.
10. **Internationale Vorbereitung (i18n):**
    *   Auch wenn aktuell nur DE relevant ist: Vorbereitung der Codebasis auf i18n-Bibliotheken, um Texte nicht hardcoded in Komponenten zu haben (Wartbarkeit).

---

### Archive: Recent Changes
*   **PWA Offline Support**: Enhanced caching strategies.
*   **Enhanced Delivery Map**: Floating tooltips added.
*   **Micro-Interactions**: Form validations animated.
*   **Sticky CTA**: Z-Index fixes for mobile.
