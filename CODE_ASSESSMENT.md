# Code Assessment & Optimierungsvorschläge

Hier ist eine Analyse der Website `gasmöller.de` mit 10 konkreten Punkten zur Verbesserung der optischen Qualität (UX/UI) und der technischen Basis.

## 🎨 Optische Verbesserungen (UX/UI)

1.  **Erweiterte Ladezustände (Skeleton Loading)**
    *   **Status:** Aktuell werden teilweise einfache Spinner oder leere Bereiche genutzt, während Daten (z.B. im `EnergyCalculator` oder `WizardModal`) geladen oder berechnet werden.
    *   **Verbesserung:** Implementierung von "Skeleton Screens" (graue Platzhalter-Balken mit Schimmer-Effekt) für Karten und Formulare. Dies reduziert die gefühlte Wartezeit und verhindert Layout-Verschiebungen (CLS), besonders im Anfrage-Assistenten.

2.  **Visuelles Feedback & Micro-Interactions**
    *   **Status:** Buttons und Karten haben Standard-Hover-Effekte.
    *   **Verbesserung:** Nutzung von dezenteren `framer-motion` Skalierungen (z.B. `scale: 1.02`) bei Hover über *allen* interaktiven "Cards" (nicht nur Buttons). Hinzufügen von Ripple-Effekten beim Klick auf primäre Buttons, um das "High-End"-Gefühl zu verstärken.

3.  **Verbesserte Mobile Touch-Targets**
    *   **Status:** Einige Links im Footer und kleinere Buttons in der `SelectionCard` könnten auf mobilen Geräten schwer zu treffen sein.
    *   **Verbesserung:** Sicherstellen, dass alle interaktiven Elemente eine Mindest-Klickfläche von 44x44px haben (durch Padding), ohne das visuelle Design zu vergrößern. Dies ist besonders im `WizardModal` auf Smartphones wichtig.

4.  **Typografische Hierarchie & Lesbarkeit**
    *   **Status:** Sehr gute Basis, aber teilweise geringer Kontrast bei kleineren Texten (z.B. "Volumen"-Label in `WizardModal`).
    *   **Verbesserung:** Erhöhung des Kontrasts bei sekundären Texten (grau auf weiß) für bessere Barrierefreiheit. Nutzung von `font-variant-numeric: tabular-nums` für alle Zahlenwerte (Preise, Liter, PLZ), um ein "Springen" der Ziffern bei Eingaben oder Animationen zu verhindern.

5.  **Formular-Fokus & Fehler-Status**
    *   **Status:** Fehler werden oft nur als Text angezeigt.
    *   **Verbesserung:** "Shake"-Animationen (Wackeln) für Eingabefelder bei ungültigen Eingaben. Bei Fokus auf ein Eingabefeld sollte der Rest des Formulars leicht abgedunkelt werden, um die Aufmerksamkeit des Nutzers auf die aktive Eingabe zu lenken (Focus Mode).

---

## 🛠 Technische Verbesserungen

6.  **Sicherheits-Header & Middleware (Helmet)**
    *   **Status:** Sicherheits-Header (CSP, X-Frame-Options) werden in `server.js` manuell gesetzt.
    *   **Verbesserung:** Einsatz der Middleware `helmet` für Express. Dies ist robuster, einfacher zu warten und deckt automatisch neue Sicherheitsstandards ab. Zusätzlich sollte `react-helmet-async` genutzt werden, um Meta-Tags sauberer aus Komponenten heraus zu steuern, statt Regex-Ersetzungen im HTML-String.

7.  **Rate Limiting Optimierung**
    *   **Status:** Ein eigenes `Map`-basiertes Rate Limiting ist in `server.js` implementiert.
    *   **Verbesserung:** Austausch durch die Bibliothek `express-rate-limit`. Die aktuelle Eigenimplementierung speichert IPs im Arbeitsspeicher, was bei vielen Zugriffen (oder DDoS) den Server verlangsamen kann (Memory Leak Risiko). Professionelle Bibliotheken verwalten dies effizienter.

8.  **Modernes Formular-Management (React Hook Form + Zod)**
    *   **Status:** Das `WizardModal` nutzt viele einzelne `useState`-Hooks und manuelle Validierung.
    *   **Verbesserung:** Refactoring auf `react-hook-form` in Kombination mit `zod` für das Schema-Management. Dies reduziert den Code drastisch, verbessert die Performance (weniger Re-Renders bei jedem Tastendruck) und zentralisiert die Validierungslogik.

9.  **Image Optimization & CLS Prevention**
    *   **Status:** Bilder werden als einfache `<img>` Tags eingebunden.
    *   **Verbesserung:** Nutzung des `<picture>` Elements mit expliziten `source` Angaben für WebP/AVIF und Fallback. Wichtiger noch: Explizite `width` und `height` Attribute für *alle* Bilder setzen, um Cumulative Layout Shift (CLS) zu verhindern, was ein wichtiger Google Ranking Faktor ist.

10. **Code-Splitting & Lazy Loading**
    *   **Status:** `App.jsx` importiert alle Komponenten statisch.
    *   **Verbesserung:** Nutzung von `React.lazy` und `Suspense` für schwere Komponenten, die nicht sofort sichtbar sind (z.B. `WizardModal`, `DeliveryMap`, `InspectionSection`). Dies reduziert die initiale JavaScript-Bundle-Größe (Initial Load Time) erheblich und beschleunigt den ersten Seitenaufbau ("Time to Interactive").
