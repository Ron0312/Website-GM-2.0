import React, { Suspense } from 'react';
import {
    Settings, CheckCircle, Factory, Home, Wrench, BookOpen,
    Flame, AlertTriangle, XCircle, FileText, Download, ThermometerSun, Snowflake,
    TrendingUp, Truck, Users, AlertCircle, ShieldCheck, Zap
} from 'lucide-react';
import SourceBadge from '../components/SourceBadge';
import SafetyChecklist from '../components/SafetyChecklist';

const PriceChart = React.lazy(() => import('../components/PriceChart'));

// Helper for Comparison Table
const ComparisonTable = ({ headers, rows }) => (
    <div className="overflow-x-auto my-6 shadow-sm rounded-xl border border-gray-100">
        <table className="w-full text-left text-sm border-collapse bg-white">
            <thead>
                <tr className="bg-gas-light/30 border-b border-gray-200">
                    {headers.map((h, i) => <th key={i} className="p-4 font-bold text-gas-dark whitespace-nowrap">{h}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                        {row.map((cell, j) => (
                            <td key={j} className="p-4 text-gray-700">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const CONTENT = {
    knowledge: [
        {
            id: 'gas-bestellung',
            title: 'Gasbestellung & Preise',
            icon: TrendingUp,
            articles: [
                {
                    id: 'anbieterwechsel',
                    title: 'Anbieterwechsel leicht gemacht',
                    description: 'Hängen Sie im Vertrag fest? So wechseln Sie.',
                    content: (
                        <div>
                             <SourceBadge text="Freiheit genießen" />
                             <p className="lead text-lg text-gray-700 mb-6">Viele Flüssiggas-Kunden glauben, sie seien auf Gedeih und Verderb an ihren aktuellen Lieferanten gebunden. Das ist oft ein Irrtum. Ein Wechsel zu einem freien Anbieter spart oft bares Geld.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">1. Wenn Ihnen der Tank gehört (Eigentum)</h4>
                             <p className="mb-4">Das ist der Idealfall. Sie sind <strong>vollkommen frei</strong> in Ihrer Entscheidung. Sie können bei jeder Füllung den günstigsten Anbieter wählen – genau wie beim Heizöl. Lassen Sie sich nicht einschüchtern: Niemand kann Ihnen vorschreiben, wo Sie bestellen, solange das Gas der Norm (DIN 51622) entspricht.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">2. Wenn Sie einen Miettank haben</h4>
                             <p className="mb-4">Hier sind Sie meist vertraglich gebunden. Aber: Prüfen Sie Ihre Laufzeiten! Viele alte Verträge laufen irgendwann aus oder haben kurze Kündigungsfristen. Ein Wechsel (Kündigung des Miettanks + Kauf eines eigenen Tanks) rechnet sich oft schon nach der ersten Füllung.</p>

                             <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3 my-6">
                                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                                <div>
                                    <span className="font-bold text-green-800 block">Wir helfen beim Wechsel!</span>
                                    <span className="text-green-700 text-sm">Sie sind unsicher? Schicken Sie uns Ihren aktuellen Vertrag (geschwärzt). Wir prüfen kostenlos, ob und wann Sie wechseln können.</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mt-4">Prüfen Sie jetzt unseren aktuellen <a href="/fluessiggas-bestellen" className="text-gas hover:underline">Tagespreis</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'preis-guide',
                    title: 'Der große Preis-Guide',
                    description: 'Wann ist Flüssiggas am günstigsten? Ein Insider-Bericht.',
                    content: (
                        <div>
                            <p className="lead text-lg text-gray-700 mb-6">Jeder Hausbesitzer fragt sich: Soll ich jetzt tanken oder warten? Wir erklären die Mechanismen des Flüssiggasmarktes.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Saisonale Schwankungen</h4>
                            <p className="mb-4">Traditionell sinkt die Nachfrage nach Heizenergie im Sommer. In der Vergangenheit war dies oft der günstigste Kaufzeitpunkt. Doch globale Märkte sind komplexer geworden.</p>

                            <div className="bg-blue-50 border-l-4 border-gas p-4 my-6">
                                <p className="font-bold text-gas-dark">Unser Tipp:</p>
                                <p>Antizyklisch handeln! Wer seinen Flüssiggastank im Frühsommer (Mai/Juni) füllt, umgeht oft die Preisspitzen im Herbst.</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Einflussfaktoren</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start"><TrendingUp size={18} className="text-gray-500 mr-2 mt-1"/> <strong>Rohölpreis:</strong> Flüssiggas ist ein Raffinerieprodukt. Steigt Öl, steigt meist auch Flüssiggas.</li>
                                <li className="flex items-start"><TrendingUp size={18} className="text-gray-500 mr-2 mt-1"/> <strong>Dollar-Kurs:</strong> Energie wird weltweit in Dollar gehandelt. Ein schwacher Euro macht Flüssiggas teurer.</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-4">Warum Tagespreise?</h4>
                            <p className="mb-6">Wir arbeiten mit Tagespreisen, um Preissenkungen sofort an Sie weiterzugeben. Statt starrer Listenpreise erhalten Sie bei uns immer das aktuelle Marktangebot.</p>

                            <p className="text-sm text-gray-500">Möchten Sie mehr über die Qualität erfahren? Lesen Sie unseren <a href="/wissen/qualitaets-check" className="text-gas hover:underline">Qualitäts-Check</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'qualitaets-check',
                    title: 'Qualitäts-Check',
                    description: 'Gibt es Unterschiede beim Flüssiggas? Propan vs. Gemisch.',
                    content: (
                        <div>
                            <p>Nicht jedes Flüssiggas ist gleich. Für Heizungsanlagen in Deutschland ist die Qualität entscheidend für Langlebigkeit und Effizienz.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Die Norm: DIN 51622</h4>
                            <p className="mb-4">In Deutschland darf zu Heizzwecken nur Flüssiggas nach <strong>DIN 51622</strong> verwendet werden. Diese Norm schreibt vor, dass es sich um mindestens 95% reines Propan handeln muss.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Warum kein Butan?</h4>
                            <ComparisonTable
                                headers={['Eigenschaft', 'Propan', 'Butan']}
                                rows={[
                                    ['Siedepunkt (Verdampfung)', '-42 °C', '-0,5 °C'],
                                    ['Nutzung im Winter', 'Problemlos (Außentank)', 'Unmöglich (bleibt flüssig)'],
                                    ['Heizwert', '12,87 kWh/kg', '12,69 kWh/kg']
                                ]}
                            />

                            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3 mt-6">
                                <ShieldCheck className="text-green-600 flex-shrink-0" size={24} />
                                <div>
                                    <span className="font-bold text-green-800 block">Gasmöller Qualitäts-Versprechen</span>
                                    <span className="text-green-700 text-sm">Wir liefern ausschließlich reines Propan nach DIN 51622. Keine Import-Gemische, keine Kompromisse. Das schont Ihren Brenner und sichert die Wärme auch bei -20 Grad.</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Mehr zum Thema <a href="/wissen/was-ist" className="text-gas hover:underline">Was ist Flüssiggas?</a> finden Sie in unserem Basiswissen.</p>
                        </div>
                    )
                },
                {
                    id: 'liefer-ablauf',
                    title: 'Ablauf der Lieferung',
                    description: 'Wie der Tankwagen zu Ihnen kommt und worauf Sie achten müssen.',
                    content: (
                        <div>
                            <p>Die Flüssiggaslieferung ist unkompliziert. Unsere Fahrer sind Profis und kennen die örtlichen Gegebenheiten.</p>

                            <div className="space-y-6 my-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">1</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Terminierung</h5>
                                        <p className="text-gray-600">Nach Ihrer Bestellung melden wir uns telefonisch oder per Mail mit einem Liefertermin. Meist innerhalb von 5-10 Werktagen.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">2</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Die Ankunft</h5>
                                        <p className="text-gray-600">Der Tankwagen parkt an der Straße oder in der Einfahrt. Unsere Schläuche sind ca. 40-50 Meter lang. Bitte halten Sie den Zugang zum Flüssiggastank frei.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">3</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Betankung & Sicherheit</h5>
                                        <p className="text-gray-600">Der Fahrer schließt den Füllschlauch und die Gaspendelleitung an. Der Vorgang dauert ca. 20-30 Minuten. Währenddessen prüft er den Flüssiggastank auf offensichtliche Mängel (Sichtprüfung).</p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-2">Muss ich zu Hause sein?</h4>
                            <p className="mb-4">Idealerweise ja, um den Füllstandsanzeiger gemeinsam zu prüfen und den Lieferschein zu unterschreiben. Wenn der Flüssiggastank frei zugänglich ist, können wir nach Absprache auch in Ihrer Abwesenheit liefern.</p>
                            <p className="text-sm text-gray-500">Haben Sie Fragen zur Bezahlung oder Bestellung? Schauen Sie in unseren <a href="/wissen/preis-guide" className="text-gas hover:underline">Preis-Guide</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-leer',
                    title: 'Hilfe, Flüssiggastank leer!',
                    description: 'Was tun, wenn die Heizung kalt bleibt?',
                    content: (
                        <div>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
                                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-red-700 mb-2">Notdienst nötig?</h3>
                                <p className="text-red-600 mb-4">Wenn der Flüssiggastank komplett leer ist, muss die Anlage ggf. entlüftet werden.</p>
                                <a href="tel:04551897089" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                                    Jetzt 24h-Express anrufen
                                </a>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Wie verhindere ich das?</h4>
                            <p className="mb-4">Ein leerer Flüssiggastank ist ärgerlich und teurer (Notdienst-Zuschlag). Prüfen Sie regelmäßig den Füllstandsanzeiger am Flüssiggastank (Prozent-Anzeige unter der Klappe).</p>
                            <p className="mb-6"><strong>Faustregel:</strong> Bestellen Sie spätestens bei <strong>20-25% Restinhalt</strong>. So haben Sie genug Puffer für ca. 3-4 Wochen Lieferzeit im tiefsten Winter.</p>
                            <p className="text-sm text-gray-500">Erfahren Sie mehr über unseren <a href="/wissen/notfall" className="text-gas hover:underline">Notdienst-Service</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'sammelbestellung',
                    title: 'Sammelbestellungen',
                    description: 'Gemeinsam bestellen und Geld sparen.',
                    content: (
                        <div>
                            <p>Sie haben Nachbarn, die ebenfalls mit Flüssiggas heizen? Perfekt! Eine Sammelbestellung lohnt sich für alle.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Ihre Vorteile</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 bg-green-50 p-3 rounded-lg"><CheckCircle className="text-green-600"/> <strong>Günstigerer Literpreis:</strong> Durch die höhere Gesamtabnahmemenge sinkt der Preis pro Liter.</li>
                                <li className="flex items-center gap-2 bg-green-50 p-3 rounded-lg"><CheckCircle className="text-green-600"/> <strong>Geteilte Anfahrt:</strong> Wir sparen Wegstrecke, Sie sparen Kosten.</li>
                                <li className="flex items-center gap-2 bg-green-50 p-3 rounded-lg"><CheckCircle className="text-green-600"/> <strong>Umweltfreundlich:</strong> Weniger LKW-Kilometer bedeuten weniger CO2.</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-4">So funktioniert's</h4>
                            <p>Sprechen Sie Ihre Nachbarn an. Einer übernimmt die Koordination und ruft uns an. Wir erstellen ein Angebot für die Gesamtmenge, aber <strong>jeder erhält seine eigene Rechnung</strong>. Sie müssen also kein Geld von den Nachbarn einsammeln!</p>
                            <p className="text-sm text-gray-500 mt-4">Wollen Sie wissen, wann der beste Zeitpunkt zum Bestellen ist? Unser <a href="/wissen/preis-guide" className="text-gas hover:underline">Preis-Guide</a> hilft weiter.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'tank-technik',
            title: 'Flüssiggastank & Technik',
            icon: Settings,
            articles: [
                {
                    id: 'fluessiggastank-gebraucht',
                    title: 'Gebrauchten Flüssiggastank kaufen (TÜV-geprüft)',
                    description: 'Geprüft, regeneriert & günstig: Die Alternative zum Neukauf.',
                    content: (
                        <div>
                             <SourceBadge text="Nachhaltig & Günstig" />
                             <p className="lead text-lg text-gray-700 mb-6">Ein neuer Flüssiggastank ist eine Investition. Wer sparen möchte, ohne auf Sicherheit zu verzichten, greift oft zum <strong>regenerierten Flüssiggastank</strong>. Diese Tanks sind technisch neuwertig (TÜV-geprüft), aber deutlich günstiger im Preis.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Was bedeutet "regeneriert"?</h4>
                             <p className="mb-4">Ein gebrauchter Flüssiggastank wird nicht einfach "weiterverkauft". Er durchläuft einen strengen Prozess in unserer Fachwerkstatt:</p>
                             <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Sandstrahlen:</strong> Der alte Lack wird komplett entfernt. Der Stahl wird blank geschliffen.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Prüfung:</strong> Eine zugelassene Überwachungsstelle (ZÜS/TÜV) prüft den Behälter auf Herz und Nieren (Wanddickenmessung, Druckprüfung).</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Neulackierung:</strong> Der Tank erhält eine hochwertige Epoxidharz-Grundierung und eine neue Decklackierung (reflektierendes Weiß/Hellgrün).</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Neue Armaturen:</strong> Sicherheitsventil, Füllventil und Inhaltsanzeiger werden oft komplett erneuert.</li>
                             </ul>

                             <div className="bg-blue-50 border-l-4 border-gas p-4 my-6">
                                <p className="font-bold text-gas-dark">Das Ergebnis:</p>
                                <p>Sie erhalten einen Flüssiggastank, der optisch und technisch von einem Neubehälter kaum zu unterscheiden ist – aber oft <strong>20% bis 30% günstiger</strong> ist.</p>
                            </div>

                             <h4 className="text-xl font-bold text-gas mb-4">Vorteile gegenüber Miet-Tanks</h4>
                             <p className="mb-4">Auch bei gebrauchten Tanks gilt: Kaufen ist besser als Mieten. Sie amortisieren die Anschaffungskosten durch die günstigeren Gaspreise (freie Händlerwahl) oft noch schneller als bei einem Neutank.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Verfügbarkeit & Größen</h4>
                             <p className="mb-4">Da wir auf Rückläufer angewiesen sind, ist das Angebot begrenzt. Besonders beliebt sind:</p>
                             <ul className="list-disc pl-5 mb-4 text-gray-700">
                                <li><strong>Flüssiggastank 2700 Liter gebraucht (1,2 t):</strong> Ideal für Ferienhäuser & Tiny Homes (oberirdisch).</li>
                                <li><strong>Flüssiggastank 4850 Liter gebraucht (2,1 t):</strong> Der Klassiker für Einfamilienhäuser (oft unterirdisch verfügbar).</li>
                                <li><strong>Gastank 6400 Liter gebraucht (2,9 t):</strong> Für Gewerbe & Mehrfamilienhäuser.</li>
                             </ul>

                             <p className="text-sm text-gray-500 mt-4">Fragen Sie unseren aktuellen Bestand an: <a href="/kontakt" className="text-gas hover:underline">Bestand prüfen</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'fluessiggastank-fuellstand-app',
                    title: 'Flüssiggastank Füllstand per App',
                    description: 'Nie wieder leerlaufen: Smart Metering für Ihren Gastank.',
                    content: (
                        <div>
                             <SourceBadge text="Smart Home Ready" />
                             <p className="lead text-lg text-gray-700 mb-6">In Zeiten von Smart Home möchten viele Hausbesitzer auch ihren <strong>Flüssiggastank digital überwachen</strong>. Schluss mit dem Gang in den Garten bei Regen, um unter die Tankklappe zu schauen. Mit modernen Telemetrie-Modulen haben Sie den Füllstand direkt auf dem Smartphone.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Wie funktioniert das?</h4>
                             <p className="mb-4">Anstelle des klassischen mechanischen Inhaltsanzeigers (Prozent-Skala) oder zusätzlich dazu wird ein digitaler Sensor installiert. Dieser sendet die Daten per Mobilfunk (NB-IoT) oder WLAN an eine Cloud.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Die Vorteile</h4>
                             <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Volle Transparenz:</strong> Sehen Sie jederzeit in der App, wie viel Gas noch im Tank ist.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Automatische Bestellung:</strong> Sie können einen Grenzwert (z.B. 20%) festlegen. Wird dieser unterschritten, erhalten Sie oder wir automatisch eine Meldung.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Verbrauchsanalyse:</strong> Erkennen Sie ungewöhnlich hohen Verbrauch (z.B. durch eine defekte Heizung) sofort.</li>
                             </ul>

                             <h4 className="text-xl font-bold text-gas mb-4">Nachrüstung möglich?</h4>
                             <p className="mb-4">Ja, fast jeder oberirdische und unterirdische Flüssiggastank lässt sich nachrüsten. Gängige Systeme wie <strong>OilFox</strong> oder <strong>RCT</strong> werden einfach auf den vorhandenen Inhaltsanzeiger aufgeclipst oder ersetzen diesen. Die Installation dauert meist keine 15 Minuten und erfordert kein Ablassen des Gases.</p>

                             <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <p className="font-bold text-gray-700">Kosten:</p>
                                <p className="text-sm">Die Hardware kostet einmalig ca. 150€ - 250€. Dazu kommt oft eine kleine jährliche Gebühr für die Datenübertragung (App-Nutzung).</p>
                             </div>

                             <p className="text-sm text-gray-500 mt-4">Interessiert an einer Nachrüstung? <a href="/kontakt" className="text-gas hover:underline">Fragen Sie uns</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'miete-kauf',
                    title: 'Miete vs. Kauf: Die Kosten-Falle',
                    description: 'Warum Sie als Eigentümer tausende Euro sparen können.',
                    content: (
                        <div>
                            <div className="bg-blue-50 border-l-4 border-gas p-6 my-6 rounded-r-lg">
                                <p className="font-bold text-gas-dark mb-2">Das Wichtigste in Kürze:</p>
                                <ul className="space-y-2">
                                <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Freie Händlerwahl:</strong> Kaufen Sie Ihr Flüssiggas dort, wo es am günstigsten ist.</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Keine versteckten Kosten:</strong> Keine Zählermiete, keine Wartungspauschalen.</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Amortisation:</strong> Der Kaufpreis rechnet sich oft schon nach 3-5 Jahren.</li>
                                </ul>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Der direkte Vergleich</h4>
                            <ComparisonTable
                                headers={['Kriterium', 'Miet-Tank', 'Kauf-Tank (Eigentum)']}
                                rows={[
                                    ['Anschaffungskosten', 'Niedrig (oft 0€ - 300€)', 'Mittel (ab ca. 1.800€)'],
                                    ['Flüssiggaspreis', 'Vom Anbieter festgelegt (oft hoch)', 'Frei verhandelbar (Tagespreis)'],
                                    ['Vertragsbindung', 'Oft 10+ Jahre', 'Keine Bindung'],
                                    ['Wartungskosten', 'Oft in Pauschale enthalten', 'Zahlen Sie selbst (aber günstiger)'],
                                    ['Gesamtkosten (10 Jahre)', 'Sehr hoch (durch Flüssiggaspreis)', 'Niedrig']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Das Problem mit der Miete</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Viele Anbieter locken mit günstigen Einmalzahlungen für die Aufstellung. Doch das "Kleingedruckte" hat es in sich: Sie verpflichten sich vertraglich, das Flüssiggas ausschließlich bei diesem Anbieter zu bestellen. Da der Wettbewerb fehlt, liegen die Literpreise oft 15-25 Cent über dem freien Marktpreis.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Ihr Vorteil als Eigentümer</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Ein eigener Flüssiggastank gehört Ihnen. Sie können bei jeder Füllung den günstigsten Anbieter wählen – ähnlich wie bei Heizöl. Wir organisieren die gesetzlichen Prüfungen (2- und 10-Jahres-Prüfung) gerne für Sie, aber Sie entscheiden.</p>
                            <p className="text-sm text-gray-500 mt-4">Interessiert an einem eigenen Tank? Prüfen Sie die aktuellen <a href="/wissen/tank-kosten" className="text-gas hover:underline">Tank-Kosten</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-entsorgen',
                    title: 'Flüssiggastank entsorgen & stilllegen',
                    description: 'Fachgerechte Entsorgung, Kosten und Ablauf durch Fachfirma.',
                    content: (
                        <div>
                            <SourceBadge text="Fachfirma & Fachbetrieb" />
                            <p className="lead text-lg text-gray-700 mb-6">Sie möchten Ihren alten Flüssiggastank oder <strong>Gastank entsorgen</strong>, stilllegen oder entleeren lassen? Als zertifizierte <strong>Fachfirma</strong> übernehmen wir den kompletten Rückbau für Sie – sicher, sauber und gesetzeskonform.</p>

                            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                                <p className="font-bold text-red-700">Wichtig: Gastank nicht selbst demontieren!</p>
                                <p className="text-sm text-red-600">Flüssiggastanks (Gastanks) stehen auch leer noch unter Druck und enthalten Restgas. Eine unsachgemäße Demontage ist lebensgefährlich. Beauftragen Sie immer einen zugelassenen Fachbetrieb ("Fachfirma").</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Ablauf: Gastank stilllegen & entsorgen</h4>
                            <p className="mb-4">Wir holen den Gastank "am Stück" ab. Es finden keine gefährlichen Schneidarbeiten in Ihrem Garten statt. Egal ob Sie den Gastank stilllegen oder komplett entsorgen möchten.</p>

                            <div className="space-y-6 my-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">1</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Anfrage & Angebot</h5>
                                        <p className="text-gray-600">Senden Sie uns ein Foto vom Typschild und vom Standort des Flüssiggastanks. Wir erstellen Ihnen ein verbindliches <strong>Festpreis-Angebot</strong> für die Entsorgung.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">2</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Restgas & Entleeren</h5>
                                        <p className="text-gray-600">Ist noch Flüssiggas im Tank? Wir kümmern uns um das fachgerechte <strong>Entleeren</strong>. Unser Tankwagen saugt das verwertbare Restgas ab. Dieses wird Ihnen gutgeschrieben (zum aktuellen Tagespreis vergütet).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">3</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Abtransport</h5>
                                        <p className="text-gray-600">Unser Kran-LKW hebt den leeren Behälter auf die Ladefläche. Die Abholung dauert meist nur ca. 30-60 Minuten.</p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Was kostet die Entsorgung?</h4>
                            <p className="mb-4">Die Kosten hängen von der Flüssiggastankgröße, der Art (oberirdisch/unterirdisch) und der Zugänglichkeit ab. </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> <strong>Oberirdische Flüssiggastanks:</strong> Oft günstiger, da einfach zu verladen.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> <strong>Unterirdische Flüssiggastanks:</strong> Aufwändiger, da der Flüssiggastank freigelegt werden muss (Erdarbeiten nötig).</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> <strong>Restgas-Vergütung:</strong> Der Wert des abgesaugten Flüssiggases wird oft direkt mit den Entsorgungskosten verrechnet, was die Rechnung senkt.</li>
                            </ul>

                            <div className="bg-gas-light/20 p-6 rounded-xl text-center border border-gas/20">
                                <h5 className="font-bold text-gas-dark text-lg mb-2">Jetzt Angebot anfordern</h5>
                                <p className="text-sm text-gray-600 mb-4">Senden Sie uns Ihre Anfrage bequem per Kontaktformular.</p>
                                <a href="/kontakt" className="inline-block bg-gas text-white font-bold py-3 px-8 rounded-full hover:bg-gas-dark transition-colors">
                                    Zur Entsorgungs-Anfrage
                                </a>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'tank-kosten',
                    title: 'Was kostet ein Flüssiggastank?',
                    description: 'Preise für Tanks (2700 Liter, 4850 Liter) und Installation.',
                    content: (
                        <div>
                             <SourceBadge text="Preisfaktoren 2026" />
                             <p className="lead text-lg text-gray-700 mb-6">Die Kosten für einen eigenen Flüssiggastank (oft auch Gastank oder Propangastank genannt) setzen sich aus dem Kaufpreis des Behälters und den Installationskosten zusammen. Viele Kunden fragen: <strong>"Was kostet ein Gastank 2700 Liter?"</strong> oder <strong>"Was kostet ein Gastank 4850 Liter?"</strong>.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">1. Gastank Preise (Neu & Gebraucht)</h4>
                             <p className="mb-4">Die Preise variieren je nach aktuellem Stahlpreis. Generell gilt: Oberirdische Tanks sind deutlich günstiger als unterirdische Modelle.</p>

                             <ComparisonTable
                                headers={['Gastank Größe', 'Oberirdisch Preis (Tendenz)', 'Unterirdisch Preis (Tendenz)']}
                                rows={[
                                    ['2700 Liter (1,2 t)', 'Günstig (Einstieg)', 'Mittel (zzgl. Erdarbeiten)'],
                                    ['4850 Liter (2,1 t)', 'Mittel (Standard)', 'Gehoben'],
                                    ['6400 Liter (2,9 t)', 'Höher', 'Hoch'],
                                    ['Gebraucht / Regeneriert', 'ca. 20-30% sparen', 'Verfügbarkeit prüfen']
                                ]}
                            />
                            <p className="text-xs text-gray-500 mt-2">* Konkrete Euro-Preise nennen wir Ihnen gerne im persönlichen Angebot, da diese tagesaktuell kalkuliert werden.</p>

                            <h4 className="text-xl font-bold text-gas mb-4 mt-6">2. Installationskosten</h4>
                            <p className="mb-4">Neben dem Flüssiggastank selbst fallen Kosten für die Aufstellung an:</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start"><Wrench size={18} className="text-gray-500 mr-2 mt-1"/> <strong>Fundament:</strong> Eine Betonplatte für oberirdische Flüssiggastanks kostet (in Eigenleistung) oft nur Material, vom Profi ca. 300-500€.</li>
                                <li className="flex items-start"><Truck size={18} className="text-gray-500 mr-2 mt-1"/> <strong>Anlieferung & Kran:</strong> Hängt von der Entfernung ab. Bei uns oft pauschaliert.</li>
                                <li className="flex items-start"><Settings size={18} className="text-gray-500 mr-2 mt-1"/> <strong>Anschluss & Prüfung:</strong> Rohrleitung zum Haus, Regler und die erste TÜV-Abnahme (ca. 150-300€).</li>
                            </ul>

                             <div className="bg-blue-50 border-l-4 border-gas p-4 my-6">
                                <p className="font-bold text-gas-dark">Spartipp: Gebrauchte Flüssiggastanks</p>
                                <p>Wir bieten regelmäßig regenerierte Flüssiggastanks an. Diese sind technisch neuwertig (neu lackiert, geprüft, neue Armaturen), aber deutlich günstiger. Fragen Sie gezielt nach "Gebrauchten Flüssiggastanks".</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Rentiert sich der Kauf?</h4>
                            <p>Ja, meist schon nach kurzer Zeit. Als Eigentümer kaufen Sie das Flüssiggas auf dem freien Markt oft <strong>30-40% günstiger</strong> als Mieter. Bei einem Verbrauch von 2000 Litern sparen Sie so jährlich oft 300-500€ an Flüssiggaskosten. Der Flüssiggastank hat sich damit oft nach 4-6 Jahren "selbst bezahlt".</p>
                            <p className="text-sm text-gray-500 mt-4">Hier finden Sie mehr Infos zu <a href="/wissen/miete-kauf" className="text-gas hover:underline">Miete vs. Kauf</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'aufstellung',
                    title: 'Installation & Vorschriften',
                    description: 'Abstände, Grenzen und TRF 2021.',
                    content: (
                        <div>
                            <h4>Oberirdisch vs. Unterirdisch: Die Entscheidung</h4>
                            <p className="mb-4">Die Wahl der Installationsart hängt oft von den Gegebenheiten auf dem Grundstück ab. Hier die wichtigsten Unterschiede:</p>
                            <ul className="space-y-3 mb-6">
                                <li>
                                    <strong>Oberirdisch:</strong> Die kostengünstigste Variante. Der Tank steht auf einer Betonplatte im Garten.
                                    <br/><span className="text-sm text-gray-600">Ideal für:</span> Große Grundstücke, Gewerbe oder wenn der Tank hinter Hecken versteckt werden kann.
                                </li>
                                <li>
                                    <strong>Unterirdisch:</strong> Die ästhetische Lösung. Der Tank wird komplett eingegraben, nur der grüne Domdeckel bleibt sichtbar.
                                    <br/><span className="text-sm text-gray-600">Ideal für:</span> Kleine Grundstücke, Vorgärten oder wenn die Optik entscheidend ist.
                                </li>
                            </ul>

                            <h4>Sicherheitsabstände und Schutzzonen (TRF 2021)</h4>
                            <p className="mb-4">Bei der Aufstellung müssen gesetzliche Sicherheitsabstände eingehalten werden, um den Brandschutz zu gewährleisten:</p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> <strong>Brandlasten:</strong> Mindestens 3m Abstand zu brennbaren Materialien (Holzhütten, Carports, Stroh).</li>
                                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> <strong>Gebäudeöffnungen:</strong> 1m bis 3m Abstand zu Kellerfenstern, Türen oder Lichtschächten.</li>
                                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> <strong>Grenzabstand:</strong> Je nach Bundesland oft 3m zur Grundstücksgrenze (oder Brandschutzwand).</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-2">Ex-Zonen</h4>
                            <p className="mb-4">Um den Tank herum existiert eine sogenannte Explosionsschutzzone (Ex-Zone). In diesem Bereich dürfen sich keine Zündquellen (Lampen, Steckdosen, Gullis) befinden. Bei oberirdischen Tanks beträgt der Radius oft 3m um die Armaturen, bei unterirdischen Tanks meist nur 1m um den Domdeckel.</p>

                            <div className="my-8">
                                <h4 className="text-xl font-bold text-gas mb-4">Checkliste: Vorschriften auf einen Blick</h4>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="divide-y divide-gray-100">
                                        <div className="p-4 flex items-start gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-bold text-gray-800 block">3 Meter Brandlast-Abstand</span>
                                                <span className="text-sm text-gray-600">Kein Holz, Stroh oder Carport im 3m Radius.</span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-start gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-bold text-gray-800 block">1 Meter zu Öffnungen</span>
                                                <span className="text-sm text-gray-600">Mindestabstand zu Kellerfenstern, Lichtschächten oder Türen.</span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-start gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-bold text-gray-800 block">Stabiles Fundament</span>
                                                <span className="text-sm text-gray-600">Betonplatte erforderlich (verhindert Absacken).</span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-start gap-3">
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-bold text-gray-800 block">Zugänglichkeit</span>
                                                <span className="text-sm text-gray-600">Der Tankwagen muss bis auf ca. 40m heranfahren können.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-gray-700 block">PDF-Anleitung Aufstellung</span>
                                    <span className="text-sm text-gray-500">Alle Maße und Skizzen zum Download.</span>
                                </div>
                                <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50">
                                    <Download size={16} /> Download
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Mehr Details zur Sicherheit finden Sie im Artikel <a href="/wissen/sicherheit" className="text-gas hover:underline">Prüfung & Sicherheit</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'groessen',
                    title: 'Flüssiggastank-Größen & Maße',
                    description: 'Welcher Flüssiggastank passt zu meinem Haus?',
                    content: (
                        <div>
                            <p className="mb-6">Die Wahl der richtigen Tankgröße ist entscheidend für Ihren Komfort. Ein zu kleiner Tank muss zu oft befüllt werden, ein zu großer Tank kostet unnötig Platz und Geld. Hier finden Sie die gängigen Größen im Detail.</p>

                            <table className="w-full text-left text-sm border-collapse mb-8 zebra-table rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gas text-white">
                                        <th className="p-3 font-bold">Bezeichnung</th>
                                        <th className="p-3 font-bold">Volumen (L)</th>
                                        <th className="p-3 font-bold">Maße (L x H) ca.</th>
                                        <th className="p-3 font-bold">Ideal für</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">1,2 t (Mini)</td>
                                        <td className="p-3">2.700</td>
                                        <td className="p-3">2,50 x 1,25 m</td>
                                        <td className="p-3">Niedrigenergiehäuser, Ferienhäuser oder als Zusatzheizung (Verbrauch &lt; 1500L/Jahr).</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">2,1 t (Standard)</td>
                                        <td className="p-3">4.850</td>
                                        <td className="p-3">4,30 x 1,25 m</td>
                                        <td className="p-3">Klassisches Einfamilienhaus (120-180 m²). Reicht oft für 1 Jahr Heizen & Warmwasser.</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">2,9 t (Maxi)</td>
                                        <td className="p-3">6.400</td>
                                        <td className="p-3">5,50 x 1,25 m</td>
                                        <td className="p-3">Mehrfamilienhäuser, große Altbauten, Gewerbe oder Hotels mit hohem Wärmebedarf.</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4 className="text-xl font-bold text-gas mb-4">Wie berechne ich meinen Bedarf?</h4>
                            <p className="mb-4">Als Faustformel gilt: Ihr Tank sollte etwa den Jahresbedarf an Flüssiggas fassen. So müssen Sie nur einmal im Jahr tanken – idealerweise im Sommer, wenn die Preise niedrig sind.</p>
                            <p>Beispiel: Ein typisches Einfamilienhaus verbraucht ca. 20.000 kWh Wärme pro Jahr. Das entspricht etwa 3.000 Litern Flüssiggas. Ein 2,1t Tank (4.850 Liter) bietet hier genug Puffer.</p>

                            <p className="text-sm text-gray-500 mt-4">Unsicher bei den Kosten? Hier geht es zum <a href="/wissen/tank-kosten" className="text-gas hover:underline">Kosten-Vergleich</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'sicherheit',
                    title: 'Prüfung & Sicherheit',
                    description: 'Warum sind Prüfungen notwendig?',
                    content: (
                        <div>
                            <p className="mb-4">Flüssiggas ist ein sicherer Energieträger, solange die technischen Anlagen regelmäßig gewartet werden. In Deutschland schreibt der Gesetzgeber (BetrSichV) feste Prüfintervalle vor, um die Sicherheit für Sie und Ihre Nachbarn zu garantieren.</p>

                            <h4>Die Prüfintervalle im Überblick</h4>
                            <div className="grid gap-4 md:grid-cols-2 my-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-gas text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                                        <h5 className="font-bold text-gas text-lg">Äußere Prüfung</h5>
                                    </div>
                                    <p className="font-bold text-gray-800 mb-2">Intervall: Alle 2 Jahre</p>
                                    <p className="text-sm text-gray-600">Hier prüft eine "befähigte Person" den Tank von außen auf Korrosion, Lackschäden, die Zugänglichkeit sowie die korrekte Beschilderung. Auch die Rohrleitungen werden einer Sichtprüfung unterzogen.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-gas text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">10</div>
                                        <h5 className="font-bold text-gas text-lg">Innere Prüfung</h5>
                                    </div>
                                    <p className="font-bold text-gray-800 mb-2">Intervall: Alle 10 Jahre</p>
                                    <p className="text-sm text-gray-600">Diese Prüfung ist umfangreicher und wird meist von einer zugelassenen Überwachungsstelle (ZÜS, z.B. TÜV) durchgeführt. Oft wird dabei auch das Sicherheitsventil ausgetauscht. Bei unterirdischen Tanks wird eine Schallemissionsprüfung durchgeführt.</p>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Rohrleitungsprüfung (10 Jahre)</h4>
                            <p className="mb-4">Oft vergessen, aber gesetzlich vorgeschrieben: Auch die erdverlegte Rohrleitung zwischen Tank und Haus muss alle 10 Jahre geprüft werden. Dies geschieht meist zusammen mit der Inneren Prüfung.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Kosten & Übersicht (Tabelle)</h4>
                            <p className="mb-4">Mit welchen Kosten müssen Sie rechnen? Hier eine Übersicht für Eigentumstanks (ZÜS: z.B. TÜV, DEKRA).</p>

                            <ComparisonTable
                                headers={['Prüfung', 'Intervall', 'Durchführung', 'Kosten ca. (netto)']}
                                rows={[
                                    ['Äußere Prüfung', 'Alle 2 Jahre', 'Befähigte Person (Gasmöller)', 'ab 69 €'],
                                    ['Innere Prüfung', 'Alle 10 Jahre', 'ZÜS (TÜV / DEKRA)', 'ab 290 €'],
                                    ['Rohrleitungsprüfung', 'Alle 10 Jahre', 'Fachfirma', 'ab 120 €']
                                ]}
                            />
                            <p className="text-xs text-gray-500 mb-6">* Preise sind Richtwerte und können je nach Anfahrt und Aufwand variieren. Wir bieten Ihnen gerne Festpreise an.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Wer ist verantwortlich?</h4>
                            <p className="mb-4">Bei einem <strong>Miet-Tank</strong> kümmert sich der Vermieter automatisch um die Prüfungen (die Kosten sind oft in der Miete enthalten). Bei einem <strong>Eigentums-Tank</strong> sind Sie als Betreiber verantwortlich. Aber keine Sorge: Wir erinnern Sie gerne an anstehende Termine und organisieren die Prüfung (inkl. TÜV/DEKRA Koordination) für Sie.</p>

                            <p className="text-sm text-gray-500">Mehr zur Technik finden Sie unter <a href="/wissen/anlage" className="text-gas hover:underline">Die Flüssiggasanlage</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'anlage',
                    title: 'Die Flüssiggasanlage',
                    description: 'Vom Tank bis zum Brenner: Wie es funktioniert.',
                    content: (
                        <div>
                            <p className="mb-6">Eine Flüssiggasanlage ist überraschend simpel und wartungsarm aufgebaut. Sie besteht im Wesentlichen aus drei Hauptkomponenten, die perfekt zusammenspielen.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gas font-bold text-xl">1</div>
                                    <h5 className="font-bold text-gas mb-2">Der Flüssiggastank</h5>
                                    <p className="text-sm text-gray-600">Hier lagert Ihr Energievorrat. Der Tank ist robust, wetterfest und fasst meist den Jahresbedarf. Er verfügt über Armaturen zum Befüllen und zur Entnahme.</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gas font-bold text-xl">2</div>
                                    <h5 className="font-bold text-gas mb-2">Leitung & Regler</h5>
                                    <p className="text-sm text-gray-600">Ein Druckregler am Tank reduziert den hohen Tankdruck auf die benötigten 50 mbar für das Haus. Über eine erdverlegte Kupfer- oder Kunststoffleitung gelangt das Gas ins Gebäude.</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center hover:shadow-lg transition-shadow">
                                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gas font-bold text-xl">3</div>
                                    <h5 className="font-bold text-gas mb-2">Die Heizung</h5>
                                    <p className="text-sm text-gray-600">Meist eine moderne Gas-Brennwerttherme. Sie arbeitet hocheffizient und kann an der Wand hängen (geringer Platzbedarf). Auch Herde oder Kamine können angeschlossen werden.</p>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Hauseinführung und Sicherheit</h4>
                            <p>Die Hauseinführung ist der Punkt, an dem die Leitung durch die Wand ins Gebäude tritt. Hier wird eine Hauptabsperreinrichtung (HAE) installiert, mit der Sie die Gaszufuhr im Notfall sofort unterbrechen können. Alle Bauteile sind DVGW-geprüft und sicher.</p>

                            <p className="text-sm text-gray-500 mt-4">Informieren Sie sich auch über die <a href="/wissen/aufstellung" className="text-gas hover:underline">Vorschriften zur Aufstellung</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-streichen',
                    title: 'Darf ich meinen Tank streichen?',
                    description: 'Farben, Vorschriften & Hitzeschutz.',
                    content: (
                        <div>
                             <SourceBadge text="TRF 2021" />
                             <p className="lead text-lg text-gray-700 mb-6">Viele Gartenbesitzer stören sich an der Optik ihres weißen Flüssiggastanks. Die Frage "Darf ich den Tank grün oder anthrazit streichen?" hören wir oft. Die Antwort ist ein klares <strong>Jein</strong>.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Warum sind Tanks weiß?</h4>
                             <p className="mb-4">Flüssiggas dehnt sich bei Wärme stark aus. Ein weißer (oder hellgrüner) Tank reflektiert das Sonnenlicht und verhindert, dass sich das Gas im Inneren zu stark aufheizt. Würde der Tank dunkel gestrichen, könnte der Druck im Sommer so stark steigen, dass das Sicherheitsventil abbläst (Gasverlust & Explosionsgefahr).</p>

                             <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                                <p className="font-bold text-red-700">Verbotene Farben:</p>
                                <p>Dunkle Farben wie Anthrazit, Schwarz, Dunkelbraun oder Dunkelgrün sind für oberirdische Tanks streng verboten.</p>
                            </div>

                             <h4 className="text-xl font-bold text-gas mb-4">Erlaubte Alternativen</h4>
                             <ul className="space-y-3 mb-6">
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-600 mr-2 mt-1"/> <strong>Reflektierende Farben:</strong> Hellgrün ("Resedagrün" RAL 6011) ist oft erlaubt, muss aber spezielle Reflexionseigenschaften haben.</li>
                                <li className="flex items-start"><CheckCircle size={18} className="text-green-600 mr-2 mt-1"/> <strong>Bepflanzung:</strong> Sie können den Tank mit Rankgittern oder Hecken "verstecken". Wichtig: 2 Seiten müssen für die Belüftung offen bleiben und der Fahrer muss ungehindert drankommen.</li>
                            </ul>

                            <p className="text-sm text-gray-500 mt-4">Tipp: Ein <a href="/wissen/tank-kosten" className="text-gas hover:underline">unterirdischer Tank</a> ist komplett unsichtbar.</p>
                        </div>
                    )
                },
                {
                    id: 'grenzabstaende',
                    title: 'Grenzabstände & Visualisierung',
                    description: 'Wie nah darf der Tank an den Nachbarn?',
                    content: (
                        <div>
                            <p className="mb-6">Streit mit dem Nachbarn wegen des Flüssiggastanks? Das muss nicht sein. Die Technischen Regeln Flüssiggas (TRF) geben klare Abstände vor.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Grundregel: 2 Meter? 3 Meter?</h4>
                            <p className="mb-4">Es gibt zwei Arten von Abständen zu beachten:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 px-3 py-1 text-xs font-bold rounded-bl-lg">Brandschutz</div>
                                    <h5 className="font-bold text-lg mb-2">Abstand zu Brennbarem</h5>
                                    <p className="text-sm text-gray-600 mb-4">Zu Holzhütten, Stroh, Carports oder dem Nachbarhaus.</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 flex-1 bg-gray-200 rounded-full relative">
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-gas">Mind. 3 m</div>
                                            <div className="w-full h-full bg-orange-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 px-3 py-1 text-xs font-bold rounded-bl-lg">Ex-Zone</div>
                                    <h5 className="font-bold text-lg mb-2">Abstand zu Zündquellen</h5>
                                    <p className="text-sm text-gray-600 mb-4">Zu offenen Fenstern, Kellerschächten, Gullis.</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 flex-1 bg-gray-200 rounded-full relative">
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-gas">1 m - 3 m</div>
                                            <div className="w-full h-full bg-blue-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Die Strahlenschutzwand</h4>
                            <p className="mb-4">Sie haben keine 3 Meter Platz? Kein Problem. Durch eine <strong>Strahlenschutzwand</strong> (nicht brennbar, F90, z.B. Betonmauer) kann der Abstand auf bis zu 0 Meter reduziert werden.</p>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                                <div className="inline-block relative w-48 h-32 bg-white border border-gray-300 rounded-lg shadow-inner mx-auto mb-4">
                                    <div className="absolute bottom-2 left-4 w-12 h-12 bg-gray-200 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">Tank</div>
                                    <div className="absolute bottom-0 left-20 w-2 h-24 bg-red-500 shadow-lg"></div>
                                    <div className="absolute bottom-2 right-4 w-12 h-16 bg-orange-100 border border-orange-300 flex items-center justify-center text-[10px]">Haus</div>
                                    <div className="absolute top-1/2 left-20 -translate-y-1/2 bg-white px-1 text-xs font-bold text-red-500 border border-red-500 rounded">Mauer</div>
                                </div>
                                <p className="text-sm text-gray-500">Visualisierung: Die Mauer schützt das Objekt vor Strahlungswärme.</p>
                            </div>
                        </div>
                    )
                }]
        },
        {
            id: 'heizung',
            title: 'Heizung & Modernisierung',
            icon: Home,
            articles: [
                {
                    id: 'waermepumpe-altbau',
                    title: 'Wärmepumpe im Altbau',
                    description: 'Wann Flüssiggas die bessere Alternative ist.',
                    content: (
                        <div>
                             <SourceBadge text="Altbau-Sanierung" />
                             <p className="lead text-lg text-gray-700 mb-6">Jeder redet über die Wärmepumpe. Sie gilt als Heizsystem der Zukunft. Doch viele Altbau-Besitzer erleben nach dem Einbau ein böses Erwachen: Hohe Stromkosten und kalte Räume. Wir zeigen, warum Flüssiggas im ungedämmten Altbau oft die smartere Wahl ist.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Das Physik-Problem im Altbau</h4>
                             <p className="mb-4">Eine Wärmepumpe arbeitet wie ein umgekehrter Kühlschrank. Sie holt Wärme aus der Umwelt. Das funktioniert super, solange das Haus mit niedrigen Temperaturen (35-40°C im Heizkörper) warm wird. Im Altbau benötigen alte Radiatoren aber oft 55-70°C, um den Raum zu heizen.</p>

                             <div className="bg-red-50 p-4 border-l-4 border-red-500 mb-6">
                                <p className="font-bold text-red-900">Die JAZ-Falle:</p>
                                <p className="text-red-800">Muss die Wärmepumpe diese hohen Temperaturen erzeugen, sinkt ihre Jahresarbeitszahl (JAZ) massiv. Sie wird zur reinen Stromheizung. Strom ist in Deutschland ca. 3-4 mal teurer als Gas.</p>
                            </div>

                             <h4 className="text-xl font-bold text-gas mb-4">Vergleich: Wärmepumpe vs. Flüssiggas (Altbau)</h4>
                             <ComparisonTable
                                headers={['Kriterium', 'Wärmepumpe (Luft-Wasser)', 'Flüssiggas-Brennwert']}
                                rows={[
                                    ['Investition', 'Sehr hoch (25.000€ - 40.000€)', 'Niedrig (8.000€ - 12.000€)'],
                                    ['Dämmung nötig?', 'Zwingend erforderlich', 'Nein (funktioniert auch ungedämmt)'],
                                    ['Heizkörper', 'Oft Tausch nötig (Fußbodenh.)', 'Alte Radiatoren bleiben'],
                                    ['Platzbedarf', 'Groß (Außeneinheit + Speicher)', 'Klein (Wandgerät)'],
                                    ['Lautstärke', 'Außeneinheit hörbar', 'Sehr leise']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Der Hybrid-Weg: Das Beste aus zwei Welten</h4>
                            <p className="mb-4">Sie müssen sich nicht "Entweder-Oder" entscheiden. Eine <strong>Gas-Hybridheizung</strong> kombiniert eine kleine Wärmepumpe mit einer Gastherme.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Frühling/Herbst:</strong> Die Wärmepumpe läuft effizient und günstig.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Eisiger Winter:</strong> Die Gasheizung springt an und liefert verlässlich Wärme ohne Strom-Exzess.</li>
                            </ul>

                            <p className="text-sm text-gray-500 mt-4">Mehr zur Technik finden Sie unter <a href="/wissen/hybrid" className="text-gas hover:underline">Hybridheizung</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'hybrid',
                    title: 'Flüssiggas-Hybridheizung',
                    description: 'Die ideale Kombi aus Erneuerbaren und Bewährtem.',
                    content: (
                        <div>
                            <p className="mb-6">Eine Hybridheizung ist die Antwort auf die Herausforderungen der Energiewende. Sie kombiniert die Zuverlässigkeit einer Gasheizung mit der Umweltfreundlichkeit erneuerbarer Energien – meist einer Luft-Wasser-Wärmepumpe.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Das Prinzip: Arbeitsteilung</h4>
                            <p className="mb-4">Das System entscheidet intelligent, welcher Energieträger gerade effizienter oder günstiger ist:</p>
                            <ul className="space-y-4 mb-6">
                                <li className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0"/>
                                    <div>
                                        <strong>Die Wärmepumpe (Grundlast):</strong>
                                        <p className="text-sm text-gray-700 mt-1">Sie übernimmt die Versorgung an milden Tagen (Frühling, Herbst) und produziert warmes Wasser. Hier arbeitet sie mit höchster Effizienz (COP).</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <CheckCircle size={20} className="text-blue-600 mt-1 flex-shrink-0"/>
                                    <div>
                                        <strong>Die Gastherme (Spitzenlast):</strong>
                                        <p className="text-sm text-gray-700 mt-1">Sobald die Außentemperaturen unter den Gefrierpunkt fallen (Bivalenzpunkt), springt die Gasheizung ein. Sie liefert verlässlich hohe Vorlauftemperaturen, die die Wärmepumpe allein nur mit viel Strom schaffen würde.</p>
                                    </div>
                                </li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-4">Vorteile im Altbau</h4>
                            <p>Gerade in nicht perfekt gedämmten Häusern ist die Hybridheizung oft die beste Lösung. Sie müssen das Haus nicht komplett sanieren, um "Wärmepumpen-ready" zu sein, da das Gas für die nötige Wärme an kalten Tagen sorgt.</p>

                            <p className="text-sm text-gray-500 mt-4">Lesen Sie auch unseren Vergleich zur <a href="/wissen/waermepumpe-altbau" className="text-gas hover:underline">Wärmepumpe im Altbau</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'pellet-vergleich',
                    title: 'Pelletheizung vs. Flüssiggas',
                    description: 'Der Kosten- & Komfort-Check.',
                    content: (
                        <div>
                            <p className="mb-6">Wer seine alte Ölheizung austauscht, schwankt oft zwischen Pellets und Flüssiggas. Beide Systeme gelten als etablierte Alternativen, unterscheiden sich aber massiv in Komfort, Platzbedarf und Anschaffungskosten.</p>

                            <ComparisonTable
                                headers={['Kriterium', 'Flüssiggas-Heizung', 'Pellet-Heizung']}
                                rows={[
                                    ['Anschaffungskosten', 'Gering (Therme ab 4.000€)', 'Hoch (System oft 15.000€ - 25.000€)'],
                                    ['Platzbedarf', 'Minimal (Wandgerät, Tank im Garten)', 'Hoch (Kessel + Lagerraum/Silo im Haus)'],
                                    ['Wartungsaufwand', 'Gering (alle 2 Jahre)', 'Hoch (Asche leeren, Reinigung, Förderschnecke)'],
                                    ['Emissionen (Feinstaub)', 'Nahezu emissionsfrei', 'Feinstaubbelastung (Filter oft Pflicht)'],
                                    ['Betriebsgeräusch', 'Sehr leise', 'Hörbar (Gebläse, Förderschnecke)']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Der Komfort-Faktor</h4>
                            <p className="mb-4">Eine Flüssiggasheizung läuft vollautomatisch und sauber. Sie müssen keine Ascheboxen leeren und keine Lagerraurreinigung durchführen. Zudem ist die Technik ausgereift und weniger störanfällig als die Mechanik von Pelletfördersystemen.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Investitionskosten</h4>
                            <p>Während Pellets im laufenden Betrieb oft günstiger sein können als Gas, ist die Anfangsinvestition enorm. Bis sich der Mehrpreis einer Pelletheizung amortisiert hat, vergehen oft 15-20 Jahre. Eine Gasheizung ermöglicht Modernisierung auch bei kleinerem Budget.</p>

                            <p className="text-sm text-gray-500 mt-4">Vergleichen Sie auch die Kosten für den <a href="/wissen/tank-kosten" className="text-gas hover:underline">Flüssiggastank</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'geg',
                    title: 'Heizungsgesetz (GEG) 2026',
                    description: 'Was gilt für Flüssiggasheizungen?',
                    content: (
                        <div>
                            <SourceBadge text="Update 2026" />
                            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-6 shadow-sm">
                                <p className="font-bold text-yellow-800 text-lg mb-2">Entwarnung für Hausbesitzer:</p>
                                <p className="text-yellow-900">Das Gebäudeenergiegesetz (GEG) bedeutet <strong>nicht</strong> das Aus für Flüssiggas. Bestehende Anlagen haben Bestandsschutz und dürfen repariert werden. Auch neue Gasheizungen sind unter bestimmten Bedingungen weiterhin erlaubt.</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Die 65%-Regel erfüllen</h4>
                            <p className="mb-4">Seit 2024 müssen neue Heizungen in Neubaugebieten zu 65% mit erneuerbaren Energien betrieben werden. Für den Bestand gelten Übergangsfristen bis zur kommunalen Wärmeplanung (oft bis 2026/2028). Doch auch danach ist Flüssiggas eine Option:</p>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Hybridheizung:</strong> Kombinieren Sie Gas mit einer Wärmepumpe. Die Wärmepumpe deckt rechnerisch die 65% ab.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Bio-LPG (Bio-Flüssiggas):</strong> Es gibt regeneratives Flüssiggas, das aus organischen Reststoffen hergestellt wird. Damit kann auch eine reine Gasheizung die Anforderungen erfüllen (Verfügbarkeit prüfen).</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>H2-Ready:</strong> Viele moderne Thermen sind bereits für Wasserstoffbeimischungen vorbereitet.</li>
                            </ul>

                            <p className="text-sm text-gray-500">Mehr zu Kombinationsmöglichkeiten finden Sie unter <a href="/wissen/hybrid" className="text-gas hover:underline">Hybridheizung</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'bio-fluessiggas',
                    title: 'Bio-Flüssiggas: Die 65%-Lösung',
                    description: 'Erfüllen Sie das GEG ohne Heizungstausch.',
                    content: (
                        <div>
                            <SourceBadge text="GEG-Konform" />
                            <p className="lead text-lg text-gray-700 mb-6">Viele Hausbesitzer fürchten, dass sie ihre funktionierende Gasheizung herausreißen müssen, um die 65%-Regel des Gebäudeenergiegesetzes (GEG) zu erfüllen. <strong>Das ist oft nicht nötig.</strong> Die Lösung heißt Bio-Flüssiggas (Bio-LPG).</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Was ist Bio-Flüssiggas?</h4>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                                <p className="font-bold text-green-900">Definition für Entscheider:</p>
                                <p className="text-green-800">Bio-Flüssiggas (Bio-LPG) ist chemisch identisch zu herkömmlichem Propan (C3H8), wird aber aus <strong>organischen Reststoffen</strong> und nachwachsenden Rohstoffen hergestellt. Es verbrennt CO2-neutraler und ist zu 100% kompatibel mit Ihrer bestehenden Technik.</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Die Vorteile auf einen Blick</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Kein Heizungstausch:</strong> Ihr Brenner merkt keinen Unterschied.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>Kein neuer Tank:</strong> Sie können Bio-LPG in Ihren bestehenden Tank füllen (auch gemischt).</li>
                                <li className="flex items-start gap-2"><CheckCircle size={18} className="text-green-600 mt-1"/> <strong>GEG-Erfüllung:</strong> In vielen Fällen gilt eine Bio-Gas-Quote als Erfüllung der 65%-Pflicht (abhängig von kommunaler Wärmeplanung).</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-4">Herstellung & Verfügbarkeit</h4>
                            <p className="mb-4">Bio-LPG entsteht oft als Nebenprodukt bei der Herstellung von Biodiesel (HVO) aus Altspeiseölen und Fetten. Es steht nicht in Konkurrenz zur Nahrungsmittelproduktion.</p>
                            <p><strong>Status Quo:</strong> Die Verfügbarkeit wächst, ist aber noch begrenzter als bei fossilem Gas. Sprechen Sie uns auf aktuelle Kontingente an.</p>

                            <p className="text-sm text-gray-500 mt-4">Interessiert an einer Umrüstung? Prüfen Sie den <a href="/wissen/oel-wechsel" className="text-gas hover:underline">Wechsel von Öl auf Gas</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'oel-wechsel',
                    title: 'Wechsel von Öl auf Flüssiggas',
                    description: 'Sauberer, platzsparender, günstiger.',
                    content: (
                        <div>
                            <p className="mb-6">Viele Hausbesitzer nutzen den Moment der Heizungssanierung, um sich von ihrer alten Ölheizung zu trennen. Der Wechsel auf Flüssiggas bringt sofort spürbare Vorteile für Wohnqualität und Geldbeutel.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Raumgewinn im Keller</h4>
                            <p className="mb-4">Der wohl größte Vorteil: Der alte Öltank verschwindet aus dem Keller. Wo früher 3.000 Liter Öl lagerten und es oft unangenehm roch, entsteht plötzlich Platz für einen Hobbyraum, eine Sauna oder einen Hauswirtschaftsraum. Der neue Flüssiggastank steht sicher und unsichtbar (unterirdisch) oder dezent im Garten.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Die Vorteile im Überblick</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <li className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100"><CheckCircle size={18} className="text-green-600"/> <strong>Kein Ölgeruch mehr:</strong> Saubere Verbrennung, geruchlose Lagerung.</li>
                                <li className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100"><CheckCircle size={18} className="text-green-600"/> <strong>Geringere Investition:</strong> Gasthermen sind deutlich günstiger als Ölkessel.</li>
                                <li className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100"><CheckCircle size={18} className="text-green-600"/> <strong>Weniger CO2:</strong> Flüssiggas verbrennt emissionsärmer als Heizöl.</li>
                                <li className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100"><CheckCircle size={18} className="text-green-600"/> <strong>Kombinierbar:</strong> Perfekt als Partner für Solarthermie oder Wärmepumpen.</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-2">Wie läuft der Wechsel ab?</h4>
                            <p>Der Aufwand ist überschaubar. Eine Fachfirma entsorgt den Öltank. Wir stellen den Flüssiggastank auf. Der Heizungsbauer installiert die neue Therme. Oft ist der komplette Wechsel in 2-3 Tagen erledigt.</p>

                            <p className="text-sm text-gray-500 mt-4">Planen Sie den Tankstandort mit unserem Ratgeber zur <a href="/wissen/aufstellung" className="text-gas hover:underline">Aufstellung</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'waermepumpe',
                    title: 'Alternative zur Wärmepumpe?',
                    description: 'Warum Flüssiggas im Altbau oft gewinnt.',
                    content: (
                        <div>
                            <p className="mb-6">Wärmepumpen sind die Stars der Energiewende – aber nicht jedes Haus ist für sie geeignet. Besonders im ungedämmten Altbau stoßen sie oft an ihre physikalischen und ökonomischen Grenzen.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Das Problem mit der Vorlauftemperatur</h4>
                            <p className="mb-4">Wärmepumpen arbeiten am effizientesten bei niedrigen Vorlauftemperaturen (35-50°C), wie sie Fußbodenheizungen benötigen. Alte Radiatoren brauchen im Winter oft 60-70°C. Um diese Temperaturen zu erreichen, muss die Wärmepumpe extrem viel Strom verbrauchen – die Betriebskosten explodieren ("JAZ-Problem").</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Warum Flüssiggas hier punktet</h4>
                            <p className="mb-4">Eine Gasheizung schafft hohe Vorlauftemperaturen spielend, ohne dass der Verbrauch übermäßig steigt. Sie ist "temperatur-tolerant".</p>

                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                                <p className="font-bold text-blue-900">Fazit für Altbauten:</p>
                                <p className="text-blue-800">Bevor Sie 50.000€ in Dämmung und Fußbodenheizung investieren müssen, um eine Wärmepumpe effizient zu betreiben, ist eine moderne Flüssiggasheizung (ggf. als Hybrid) oft die wirtschaftlichere Wahl.</p>
                            </div>

                            <p className="text-sm text-gray-500">Erfahren Sie mehr über die Kombination beider Systeme: <a href="/wissen/hybrid" className="text-gas hover:underline">Hybridheizung</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'fernwaerme-vergleich',
                    title: 'Fernwärme vs. Flüssiggas',
                    description: 'Droht der Anschlusszwang? Ein Kosten-Vergleich.',
                    content: (
                        <div>
                             <SourceBadge text="Wärmeplanung 2026" />
                             <p className="lead text-lg text-gray-700 mb-6">Mit der kommunalen Wärmeplanung fragen sich viele Hausbesitzer: Muss ich mich an das Fernwärmenetz anschließen lassen? Und ist das überhaupt günstiger als meine Gasheizung?</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Droht der Anschlusszwang?</h4>
                             <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 mb-6">
                                 <p className="font-bold text-yellow-900">Kurz gesagt:</p>
                                 <p className="text-yellow-800"><strong>Ein Anschluss- und Benutzungszwang ist rechtlich nur unter sehr strengen Voraussetzungen möglich.</strong> In den meisten Fällen haben Hausbesitzer weiterhin die Wahl, sofern sie die gesetzlichen Klimavorgaben (65% Erneuerbare) anders erfüllen – z.B. durch <a href="/wissen/bio-fluessiggas" className="text-gas hover:underline">Bio-Flüssiggas</a> oder eine Hybridheizung.</p>
                             </div>

                             <h4 className="text-xl font-bold text-gas mb-4">Vergleich: Fernwärme vs. Flüssiggas</h4>
                             <ComparisonTable
                                headers={['Kriterium', 'Fernwärme', 'Flüssiggas (Eigentumstank)']}
                                rows={[
                                    ['Investition', 'Hoch (Anschlusskosten oft 10.000€+)', 'Gering (Therme + Tank)'],
                                    ['Laufende Kosten', 'Oft hoher Grundpreis (fix)', 'Kein Grundpreis (nur Verbrauch)'],
                                    ['Anbieterwahl', 'Monopol (1 Anbieter)', 'Frei wählbar (Wettbewerb)'],
                                    ['Preistransparenz', 'Intransparent (Preisgleitklauseln)', 'Transparent (Tagespreis)'],
                                    ['Versorgungssicherheit', 'Abhängig vom Netzbetreiber', 'Unabhängig (eigener Vorrat)']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Die Kosten-Falle "Grundpreis"</h4>
                            <p className="mb-4">Fernwärme-Rechnungen bestehen oft zu 30-40% aus dem sogenannten <strong>Leistungspreis (Grundpreis)</strong>. Diesen zahlen Sie immer, auch wenn Sie sparen. Bei Flüssiggas zahlen Sie fast nur für das, was Sie wirklich verbrauchen. Wer sein Haus dämmt, spart bei Gas also sofort – bei Fernwärme nur bedingt.</p>

                            <p className="text-sm text-gray-500 mt-4">Sichern Sie sich Ihre Unabhängigkeit mit einem eigenen <a href="/wissen/tank-kosten" className="text-gas hover:underline">Flüssiggastank</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'energiesparen',
                    title: '10 Tipps zum Heizkosten sparen',
                    description: 'Kleine Maßnahmen, große Wirkung.',
                    content: (
                        <div>
                            <p className="mb-6">Die günstigste Energie ist die, die wir nicht verbrauchen. Oft lassen sich schon mit kleinen Verhaltensänderungen und geringen Investitionen 10-20% der Heizkosten einsparen.</p>

                            <ul className="space-y-4">
                                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <strong className="text-gas block mb-1">1. Hydraulischer Abgleich</strong>
                                    <span className="text-gray-600">Lassen Sie Ihre Heizung vom Profi einstellen. Dies sorgt dafür, dass alle Heizkörper gleichmäßig warm werden und die Pumpe nicht unnötig arbeitet. Förderung möglich!</span>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <strong className="text-gas block mb-1">2. Richtig Lüften (Stoßlüften)</strong>
                                    <span className="text-gray-600">Fenster im Winter nicht auf "Kipp" lassen! Das kühlt die Wände aus. Besser: 3-mal täglich für 5 Minuten alle Fenster weit aufreißen (Querlüften).</span>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <strong className="text-gas block mb-1">3. Programmierbare Thermostate</strong>
                                    <span className="text-gray-600">Nutzen Sie smarte Thermostate. Senken Sie die Temperatur automatisch ab, wenn Sie bei der Arbeit sind oder schlafen. Jedes Grad weniger spart ca. 6% Energie.</span>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <strong className="text-gas block mb-1">4. Heizkörper freihalten</strong>
                                    <span className="text-gray-600">Verkleidungen, lange Vorhänge oder Möbel vor den Heizkörpern verhindern die Wärmeverteilung. Die Wärme staut sich, der Raum bleibt kalt.</span>
                                </li>
                                <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <strong className="text-gas block mb-1">5. Rohre dämmen</strong>
                                    <span className="text-gray-600">Isolieren Sie freiliegende Heizungsrohre im unbeheizten Keller. Materialkosten: wenige Euro. Effekt: Die Wärme kommt im Wohnzimmer an, statt im Keller zu verpuffen.</span>
                                </li>
                            </ul>

                            <p className="text-sm text-gray-500 mt-6">Haben Sie schon über einen Anbieterwechsel nachgedacht? Prüfen Sie unsere <a href="/wissen/preis-guide" className="text-gas hover:underline">Preise</a>.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'gewerbe',
            title: 'Gewerbe & Industrie',
            icon: Factory,
            articles: [
                {
                    id: 'bhkw',
                    title: 'Strom & Wärme (BHKW)',
                    description: 'Doppelt sparen mit Kraft-Wärme-Kopplung.',
                    content: (
                        <div>
                            <p className="mb-4">Ein Blockheizkraftwerk (BHKW) ist ein "Alleskönner" für Gewerbebetriebe mit hohem Energiebedarf. Es arbeitet nach dem Prinzip der Kraft-Wärme-Kopplung (KWK).</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Strom und Wärme gleichzeitig</h4>
                            <p className="mb-4">Während ein herkömmliches Kraftwerk nur Strom produziert und die Wärme ungenutzt an die Umwelt abgibt, nutzt ein BHKW diese Abwärme direkt vor Ort zum Heizen. Ein motorbetriebener Generator erzeugt Strom, die Motorwärme heizt das Gebäude.</p>

                            <div className="flex gap-4 p-4 bg-gray-50 border-l-4 border-gas my-6">
                                <Zap className="text-yellow-500 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-gray-800">Ideal für Hotels, Gastronomie & Landwirtschaft</p>
                                    <p className="text-sm text-gray-600">Überall dort, wo gleichzeitig viel Strom und viel Wärme benötigt wird (z.B. Wellnessbereiche, Schwimmbäder, Prozesswärme), amortisiert sich ein flüssiggasbetriebenes BHKW in Rekordzeit.</p>
                                </div>
                            </div>

                            <p>Flüssiggas ist hier der ideale Kraftstoff: Es verbrennt sauberer als Heizöl und lagert platzsparend in Tanks, unabhängig vom Erdgasnetz.</p>
                            <p className="text-sm text-gray-500 mt-4">Für Großverbraucher bieten wir spezielle <a href="/wissen/tank-kosten" className="text-gas hover:underline">Großbehälter</a> an.</p>
                        </div>
                    )
                },
                {
                    id: 'hallenheizung',
                    title: 'Hallenheizung & Dunkelstrahler',
                    description: 'Effizienz für hohe Räume.',
                    content: (
                        <div>
                            <p className="mb-6">Das Beheizen von hohen Industrie- oder Lagerhallen mit konventionellen Warmluftgebläsen ist extreme Geldverschwendung. Die warme Luft steigt sofort unter das Dach, während es am Boden bei den Mitarbeitern kalt bleibt.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Das Prinzip der Sonne (Dunkelstrahler)</h4>
                            <p className="mb-4">Moderne flüssiggasbetriebene Dunkelstrahler nutzen Infrarotstrahlung. Sie erwärmen nicht die Luft, sondern die Oberflächen, auf die sie treffen (Boden, Maschinen, Menschen). Erst diese Flächen geben die Wärme an die Umgebung ab.</p>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gas"/> <strong>Energieeinsparung:</strong> Bis zu 40% weniger Verbrauch im Vergleich zu Warmluftsystemen.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gas"/> <strong>Zonierung:</strong> Beheizen Sie nur die Arbeitsbereiche, in denen tatsächlich gearbeitet wird.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-gas"/> <strong>Komfort:</strong> Keine Staubaufwirbelung, kein Zugluftgefühl.</li>
                            </ul>

                            <p className="text-sm text-gray-500">Interessiert an gewerblichen Lösungen? <a href="/kontakt" className="text-gas hover:underline">Kontaktieren Sie uns</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'stapler',
                    title: 'Treibgas für Stapler',
                    description: 'Sauberer als Diesel, stärker als Elektro.',
                    content: (
                        <div>
                            <p className="mb-6">Treibgasstapler (LPG) vereinen die Vorteile von Diesel- und Elektrostaplern, ohne deren Nachteile zu übernehmen. Sie sind die "Allrounder" für Logistik und Industrie.</p>

                            <ComparisonTable
                                headers={['', 'Treibgas (LPG)', 'Diesel', 'Elektro']}
                                rows={[
                                    ['Einsatzort', 'Innen & Außen', 'Nur Außen (Abgase)', 'Innen (Glatter Boden)'],
                                    ['Verfügbarkeit', 'Sofort (Flaschenwechsel)', 'Sofort (Tanken)', 'Ladezeiten (Stunden)'],
                                    ['Kraft/Power', 'Hoch', 'Hoch', 'Mittel'],
                                    ['Investition', 'Niedrig', 'Mittel', 'Hoch (Batterie)']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Sauber & Flexibel</h4>
                            <p>Treibgas verbrennt so sauber, dass die Stapler auch in geschlossenen Hallen fahren dürfen (im Gegensatz zu Diesel). Gleichzeitig haben sie Kraft für den Außeneinsatz auf unebenem Gelände. Der Flaschenwechsel dauert keine 2 Minuten – ideal für den Mehrschichtbetrieb ohne teure Zweitbatterien.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'service',
            title: 'Service & Notfall',
            icon: Wrench,
            articles: [
                {
                    id: 'fluessiggastank-heizung-stoerung',
                    title: 'Heizung kalt? Störung am Flüssiggastank?',
                    description: 'Checkliste zur Selbsthilfe bei Heizungsausfall.',
                    content: (
                        <div>
                             <SourceBadge text="Erste Hilfe Guide" />
                             <p className="lead text-lg text-gray-700 mb-6">Die Heizung bleibt kalt? Bevor Sie den teuren Notdienst rufen, lohnt sich oft ein Blick auf den Flüssiggastank. Viele Störungen haben simple Ursachen, die Sie selbst beheben können.</p>

                             <h4 className="text-xl font-bold text-gas mb-4">Checkliste: Ursachenforschung</h4>

                             <div className="space-y-4 mb-8">
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <h5 className="font-bold text-red-600 flex items-center gap-2"><AlertCircle size={20}/> 1. Ist der Tank leer?</h5>
                                    <p className="text-sm text-gray-600 mt-2">Prüfen Sie den Inhaltsanzeiger unter der Haube. Zeigt er unter 3-5% an? Dann ist vermutlich kein flüssiges Gas mehr da, um Druck aufzubauen. &rarr; <strong>Sofort bestellen!</strong></p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <h5 className="font-bold text-red-600 flex items-center gap-2"><AlertCircle size={20}/> 2. Ist das Ventil offen?</h5>
                                    <p className="text-sm text-gray-600 mt-2">Wurde der Tank gerade gefüllt oder gewartet? Manchmal wird vergessen, das Hauptentnahmeventil (Handrad) wieder aufzudrehen. Drehen Sie es gegen den Uhrzeigersinn (Links) auf.</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <h5 className="font-bold text-red-600 flex items-center gap-2"><AlertCircle size={20}/> 3. Druckregler (SAV) ausgelöst?</h5>
                                    <p className="text-sm text-gray-600 mt-2">Der Druckregler hat oft ein Sicherheitsabsperrventil (SAV). Hat es ausgelöst (z.B. durch Erschütterung)? Schauen Sie, ob ein kleiner Stift oder Hebel am Regler heraussteht oder eingerastet werden muss. (Vorsicht: Nur wenn Sie sich auskennen!)</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                    <h5 className="font-bold text-red-600 flex items-center gap-2"><AlertCircle size={20}/> 4. Vereisung?</h5>
                                    <p className="text-sm text-gray-600 mt-2">Bei sehr hoher Entnahme im Winter kann der Tank vereisen (Reifbildung außen). Das ist physikalisch normal. Wenn aber der Regler vereist ist, kann die Zufuhr stoppen.</p>
                                </div>
                             </div>

                             <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                                <p className="font-bold text-red-800 mb-2">Nichts hilft?</p>
                                <p className="text-sm text-red-700 mb-4">Dann liegt der Fehler vermutlich an der Therme selbst (Zündung, Pumpe) oder die Leitung ist verstopft.</p>
                                <a href="tel:04551897089" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors shadow-lg">
                                    Notdienst anrufen: 04551 89 70 89
                                </a>
                             </div>
                        </div>
                    )
                },
                {
                    id: 'notfall',
                    title: 'Heizung funktioniert nicht?',
                    description: 'Erste Hilfe bei Störungen.',
                    content: (
                        <div>
                            <SafetyChecklist />
                            <div className="bg-red-50 p-6 rounded-xl text-center border border-red-100 mt-6">
                                <p className="font-bold text-red-800 mb-2">24h Notdienst für Kunden:</p>
                                <a href="tel:04551897089" className="text-3xl font-extrabold text-red-600 block hover:scale-105 transition-transform">04551 89 70 89</a>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-center">Tipp: Ein regelmäßiger <a href="/wissen/qualitaets-check" className="text-gas hover:underline">Qualitäts-Check</a> vermeidet Störungen.</p>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'basis',
            title: 'Basiswissen & Kosten',
            icon: BookOpen,
            articles: [
                {
                    id: 'was-ist',
                    title: 'Was ist Flüssiggas?',
                    description: 'Eigenschaften und Herkunft.',
                    content: (
                        <div>
                            <p className="mb-6">Flüssiggas (LPG = Liquefied Petroleum Gas), oft auch als <strong>Propangas</strong> bezeichnet, ist ein hochwertiger Energieträger. Er besteht hauptsächlich aus <strong>Propan</strong> und <strong>Butan</strong>. Das Besondere: Schon unter geringem Druck (ca. 6-8 bar) verflüssigt es sich im <strong>Gastank</strong> oder in der Gasflasche.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Das 1:260 Wunder</h4>
                            <p className="mb-4">Durch die Verflüssigung schrumpft das Volumen enorm. Aus 1 Liter flüssigem Gas entstehen ca. 260 Liter gasförmige Energie. Das macht Flüssiggas zum idealen Energievorrat: In einem relativ kleinen Tank im Garten lagert Energie für ein ganzes Jahr.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Woher kommt es?</h4>
                            <p className="mb-4">Flüssiggas ist kein reines Erdölprodukt. Es entsteht:</p>
                            <ul className="list-disc pl-5 mb-4 text-gray-700">
                                <li>Zu ca. 60% bei der Förderung von Erdgas (als nasses Begleitgas).</li>
                                <li>Zu ca. 40% in Raffinerien bei der Verarbeitung von Rohöl.</li>
                            </ul>
                            <p>Es verbrennt extrem sauber (kaum Ruß, wenig Stickoxide) und darf deshalb sogar in Wasserschutzgebieten eingesetzt werden.</p>

                            <p className="text-sm text-gray-500">Mehr zur Qualität erfahren Sie im <a href="/wissen/qualitaets-check" className="text-gas hover:underline">Qualitäts-Check</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'preise',
                    title: 'Preisentwicklung',
                    description: 'Wann ist der beste Zeitpunkt?',
                    content: (
                        <div>
                            <SourceBadge text="Stand: 2026" />
                            <p className="mb-4">Wie alle Energieträger unterliegt auch Flüssiggas Preisschwankungen an den internationalen Börsen. Dennoch folgt der Preis oft saisonalen Mustern.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Historische Preisentwicklung (2020 - 2026)</h4>
                            <p className="mb-4">Sehen Sie hier die Entwicklung der Flüssiggaspreise über die letzten Jahre. Diese Transparenz hilft Ihnen, den richtigen Kaufzeitpunkt zu finden.</p>

                            <Suspense fallback={<div className="h-[400px] bg-gray-50 rounded-xl animate-pulse flex items-center justify-center text-gray-400">Lade Preischart...</div>}>
                                <PriceChart />
                            </Suspense>

                            <div className="text-center my-8">
                                <p className="mb-4 font-bold text-gray-700">Warten oder Kaufen? Sichern Sie sich den heutigen Kurs.</p>
                                <a href="/fluessiggas-bestellen" className="inline-block bg-gas text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gas-dark hover:scale-105 transition-all transform">
                                    Jetzt Tagespreis anfragen
                                </a>
                            </div>

                            <div className="my-6 p-4 bg-blue-50 rounded-lg flex gap-4 items-center">
                                <Snowflake className="text-blue-400 flex-shrink-0" />
                                <div>
                                    <span className="font-bold block text-gray-700">Winter-Tipp:</span>
                                    <span className="text-sm">Im Winter steigt die Nachfrage weltweit. Versuchen Sie, Ihren Tank bereits im Sommer oder frühen Herbst zu füllen, um Preisspitzen zu vermeiden.</span>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-2">Unabhängigkeit zahlt sich aus</h4>
                            <p>Im Gegensatz zu leitungsgebundenem Erdgas, wo Sie an einen Versorger und dessen Preiserhöhungen gebunden sind, können Sie als Eigentümer eines Flüssiggastanks (Kauf-Tank) bei jeder Bestellung Preise vergleichen und den günstigen Moment abpassen.</p>

                            <p className="text-sm text-gray-500 mt-4">Detaillierte Infos zur Preisgestaltung finden Sie in unserem <a href="/wissen/preis-guide" className="text-gas hover:underline">Preis-Guide</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'co2-steuer',
                    title: 'CO2-Steuer Tabelle 2026-2030',
                    description: 'Was kostet die CO2-Abgabe für Flüssiggas?',
                    content: (
                        <div>
                            <p className="mb-6">Seit 2021 gibt es in Deutschland einen CO2-Preis auf fossile Brennstoffe (BEHG). Dieser soll den Umstieg auf klimafreundliche Alternativen fördern. Doch was bedeutet das konkret für Ihre Heizkosten?</p>

                            <h4 className="text-xl font-bold text-gas mb-4">CO2-Preis Prognose (Cent pro Liter)</h4>
                            <p className="mb-4">Die CO2-Steuer wird stufenweise angehoben. Hier sehen Sie die voraussichtliche Belastung pro Liter Flüssiggas (netto, zzgl. MwSt.).</p>

                            <ComparisonTable
                                headers={['Jahr', 'CO2-Preis / Tonne', 'Aufschlag / Liter (netto)', 'Kosten bei 3000L (netto)']}
                                rows={[
                                    ['2024', '45 €', 'ca. 7,1 Cent', 'ca. 213 €'],
                                    ['2025', '55 €', 'ca. 8,7 Cent', 'ca. 261 €'],
                                    ['2026', '65 € (Prognose)', 'ca. 10,3 Cent', 'ca. 309 €'],
                                    ['2027', 'Marktpreis (Korridor)', 'variabel', 'variabel'],
                                    ['2030', 'Zielkorridor EU', 'steigend', 'steigend']
                                ]}
                            />
                            <p className="text-xs text-gray-500 mt-2">* Werte sind gerundete Näherungswerte basierend auf dem Emissionsfaktor von Flüssiggas (ca. 1,5 kg CO2/Liter).</p>

                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 my-6">
                                <p className="font-bold text-blue-900">Gut zu wissen:</p>
                                <p className="text-blue-800">Flüssiggas verursacht ca. <strong>15% weniger CO2</strong> als Heizöl. Dadurch fällt die CO2-Steuer bei einer Gasheizung niedriger aus als bei einer vergleichbaren Ölheizung.</p>
                            </div>

                            <p className="text-sm text-gray-500">Möchten Sie CO2 sparen? Informieren Sie sich über <a href="/wissen/bio-fluessiggas" className="text-gas hover:underline">Bio-Flüssiggas</a>.</p>
                        </div>
                    )
                },
                {
                    id: 'umrechnung',
                    title: 'Umrechnung: Liter, m³, kWh',
                    description: 'Verwirrung bei der Umrechnung?',
                    content: (
                        <div>
                            <p className="mb-6">Auf Ihrer Gasrechnung stehen Liter, der Zähler zeigt Kubikmeter (m³) und verglichen wird oft in Kilowattstunden (kWh). Hier bringen wir Licht ins Dunkel.</p>

                             <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm my-6 space-y-4 border border-gray-200">
                                <div>
                                    <strong>1 Liter flüssig ≈ 6,57 kWh</strong>
                                    <p className="text-gray-500 text-xs mt-1">Das ist der Heizwert von Propan. Ein 4850 Liter Tank enthält also ca. 31.800 kWh Energie.</p>
                                </div>
                                <div className="border-t border-gray-300 pt-2">
                                    <strong>1 m³ gasförmig ≈ 3,93 Liter flüssig</strong>
                                    <p className="text-gray-500 text-xs mt-1">Wenn Ihr Gaszähler 100 m³ Verbrauch anzeigt, haben Sie ca. 393 Liter aus dem Tank verbraucht.</p>
                                </div>
                                <div className="border-t border-gray-300 pt-2">
                                    <strong>1 kg Propan ≈ 1,96 Liter flüssig</strong>
                                    <p className="text-gray-500 text-xs mt-1">Wichtig für Flaschengas-Nutzer.</p>
                                </div>
                            </div>

                            <p className="text-sm">Hinweis: Diese Werte gelten für reines Propan bei 15°C. Temperatur und Druck beeinflussen die Dichte geringfügig.</p>

                            <p className="text-sm text-gray-500 mt-4">Nutzen Sie unseren <a href="/rechner" className="text-gas hover:underline">Energie-Rechner</a> für genaue Vergleiche.</p>
                        </div>
                    )
                }
            ]
        }
    ]
};
