# Development Log

## [Current Date] - Status & Analysis

### ✅ Aktuell umgesetzte SEO-Maßnahmen
Eine Analyse der Codebasis (`seoData.js`, `server.js`, Komponenten) zeigt folgende implementierte Standards:

**1. Technische SEO (Technical SEO)**
*   **Server-Side Rendering (SSR):** Die Anwendung nutzt SSR via `server.js`, wodurch Suchmaschinen vollständigen HTML-Code erhalten, statt leerer JavaScript-Container.
*   **Sitemap & Robots.txt:** Automatische Generierung (`scripts/generate-sitemap.js`) bei jedem Build. Beinhaltet statische Seiten und dynamische Tank-Detailseiten (`/tanks/:slug`).
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

### 🚀 10 Potenzielle SEO-Verbesserungen
Basierend auf der Analyse könnten folgende Punkte das Ranking weiter verbessern:

1.  **H1-Optimierung:** Der aktuelle `<h1>` im Hero ist "Gas-Service Möller" (Brand). Besser wäre ein Keyword-Fokus, z.B. *"Flüssiggastank kaufen & Service im Norden"*, während der Brand-Name als Subline fungiert.
2.  **FAQ Schema:** Implementierung von `FAQPage` Schema auf der "Wissen" oder Startseite, um direkt in den Google-Suchergebnissen Fragen zu beantworten.
3.  **Content-Hub Stärkung:** Die Sektion "Wissen" stärker intern verlinken (z.B. von Produktseiten zu Ratgebern: "Welche Tankgröße passt zu mir?").
4.  **Bilder-SEO:** `alt`-Attribute sind teilweise generisch (z.B. "Landschaft Norddeutschland"). Diese sollten spezifischer sein: *"Oberirdischer Flüssiggastank 1,2t im Garten in Hamburg"*.
5.  **Lokale Landingpages:** Erstellung statischer Seiten für Haupt-Liefergebiete (z.B. `/gas-hamburg`, `/gas-luebeck`) mit spezifischem Local-SEO-Content.
6.  **Video Schema:** Falls Videos (z.B. Erklärvideos) eingebunden werden, `VideoObject` Schema nutzen.
7.  **Autor-Boxen:** Für E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Autorenprofile unter Ratgeber-Artikel setzen (z.B. "Thomas Müller, Sachkundiger für Flüssiggasanlagen").
8.  **Strukturierte Daten für Events:** Falls Messen oder Infotage stattfinden -> `Event` Schema.
9.  **Erweiterte Meta-Descriptions:** Prüfen, ob für alle Produkte USPs (Häkchen-Symbole ✓) in der Description genutzt werden, um im Snippet aufzufallen.
10. **HTML-Lang Attribut:** Sicherstellen, dass `<html lang="de">` serverseitig korrekt gesetzt ist (oft Standard, aber wichtig zu prüfen).

---

### 🛠️ 10 Allgemeine Verbesserungsideen (Code & UX)
Analyse der Codebasis und Usability:

1.  **Visuelle Breadcrumbs:** Obwohl Schema.org vorhanden ist, fehlen dem Nutzer visuelle "Brotkrümel" zur Navigation auf der Website (z.B. Start > Tanks > 1,2t Oberirdisch).
2.  **Unit-Tests für Rechner:** Der `EnergyCalculator` enthält komplexe Logik. Hier fehlen Unit-Tests (z.B. mit Vitest), um Rechenfehler bei Updates auszuschließen.
3.  **Formular-Validierung UX:** Bei Fehlern im `WizardModal` könnte der Fokus automatisch zum ersten fehlerhaften Feld springen (Focus Management).
4.  **Security Headers (CSP):** Die Content Security Policy in `server.js` könnte noch strikter gefasst werden (Verzicht auf `unsafe-inline` wo möglich).
5.  **A11y (Barrierefreiheit):** Prüfen, ob alle Icons (z.B. von `lucide-react`) `aria-hidden="true"` haben oder Labels besitzen, wenn sie interaktiv sind.
6.  **Code-Splitting:** Die `tanks.js` Daten werden oft importiert. Bei sehr vielen Tanks könnte dies in einen asynchronen API-Call oder JSON-Fetch ausgelagert werden, um das Bundle klein zu halten.
7.  **Fehler-Monitoring:** Integration von Sentry oder LogRocket, um Client-Side Errors in Produktion zu tracken (da SSR-Logs nur Server-Fehler zeigen).
8.  **Druck-Styles:** CSS `@media print` optimieren, damit Kunden Angebote oder Rechner-Ergebnisse sauber ausdrucken können (Ausblenden von Navi/Footer/Hero).
9.  **404-Suchfunktion:** Auf der 404-Seite eine Suchleiste oder die beliebtesten Links anbieten, statt nur "Zurück zur Startseite".
10. **Bild-Optimierung Pipeline:** Integration von `vite-plugin-imagemin` im Build-Prozess, um Bilder automatisch zu komprimieren, statt sich auf manuelle Vorarbeit zu verlassen.

---

### Archive: Recent Changes
*   **PWA Offline Support**: Enhanced caching strategies.
*   **Enhanced Delivery Map**: Floating tooltips added.
*   **Micro-Interactions**: Form validations animated.
*   **Sticky CTA**: Z-Index fixes for mobile.
