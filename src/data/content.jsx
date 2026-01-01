import React from 'react';
import {
    Settings, CheckCircle, Factory, Home, Wrench, BookOpen,
    Flame, AlertTriangle, XCircle, FileText, Download, ThermometerSun, Snowflake,
    TrendingUp, Truck, Users, AlertCircle, ShieldCheck
} from 'lucide-react';
import SourceBadge from '../components/SourceBadge';
import SafetyChecklist from '../components/SafetyChecklist';

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
                                <p>Antizyklisch handeln! Wer seinen Tank im Frühsommer (Mai/Juni) füllt, umgeht oft die Preisspitzen im Herbst.</p>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Einflussfaktoren</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start"><TrendingUp size={18} className="text-gray-400 mr-2 mt-1"/> <strong>Rohölpreis:</strong> Flüssiggas ist ein Raffinerieprodukt. Steigt Öl, steigt meist auch Gas.</li>
                                <li className="flex items-start"><TrendingUp size={18} className="text-gray-400 mr-2 mt-1"/> <strong>Dollar-Kurs:</strong> Energie wird weltweit in Dollar gehandelt. Ein schwacher Euro macht Gas teurer.</li>
                            </ul>

                            <h4 className="text-xl font-bold text-gas mb-4">Warum Tagespreise?</h4>
                            <p>Wir arbeiten mit Tagespreisen, um Preissenkungen sofort an Sie weiterzugeben. Statt starrer Listenpreise erhalten Sie bei uns immer das aktuelle Marktangebot.</p>
                        </div>
                    )
                },
                {
                    id: 'qualitaets-check',
                    title: 'Qualitäts-Check',
                    description: 'Gibt es Unterschiede beim Flüssiggas? Propan vs. Gemisch.',
                    content: (
                        <div>
                            <p>Nicht jedes Gas ist gleich. Für Heizungsanlagen in Deutschland ist die Qualität entscheidend für Langlebigkeit und Effizienz.</p>

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
                        </div>
                    )
                },
                {
                    id: 'liefer-ablauf',
                    title: 'Ablauf der Lieferung',
                    description: 'Wie der Tankwagen zu Ihnen kommt und worauf Sie achten müssen.',
                    content: (
                        <div>
                            <p>Die Gaslieferung ist unkompliziert. Unsere Fahrer sind Profis und kennen die örtlichen Gegebenheiten.</p>

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
                                        <p className="text-gray-600">Der Tankwagen parkt an der Straße oder in der Einfahrt. Unsere Schläuche sind ca. 40-50 Meter lang. Bitte halten Sie den Zugang zum Tank frei.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gas text-white font-bold rounded-full flex items-center justify-center">3</div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Betankung & Sicherheit</h5>
                                        <p className="text-gray-600">Der Fahrer schließt den Füllschlauch und die Gaspendelleitung an. Der Vorgang dauert ca. 20-30 Minuten. Währenddessen prüft er den Tank auf offensichtliche Mängel (Sichtprüfung).</p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-2">Muss ich zu Hause sein?</h4>
                            <p>Idealerweise ja, um den Füllstandsanzeiger gemeinsam zu prüfen und den Lieferschein zu unterschreiben. Wenn der Tank frei zugänglich ist, können wir nach Absprache auch in Ihrer Abwesenheit liefern.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-leer',
                    title: 'Hilfe, Tank leer!',
                    description: 'Was tun, wenn die Heizung kalt bleibt?',
                    content: (
                        <div>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
                                <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-red-700 mb-2">Notdienst nötig?</h3>
                                <p className="text-red-600 mb-4">Wenn der Tank komplett leer ist, muss die Anlage ggf. entlüftet werden.</p>
                                <a href="tel:04551897089" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                                    Jetzt 24h-Express anrufen
                                </a>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Wie verhindere ich das?</h4>
                            <p className="mb-4">Ein leerer Tank ist ärgerlich und teurer (Notdienst-Zuschlag). Prüfen Sie regelmäßig den Füllstandsanzeiger am Tank (Prozent-Anzeige unter der Klappe).</p>
                            <p><strong>Faustregel:</strong> Bestellen Sie spätestens bei <strong>20-25% Restinhalt</strong>. So haben Sie genug Puffer für ca. 3-4 Wochen Lieferzeit im tiefsten Winter.</p>
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
                    id: 'miete-kauf',
                    title: 'Miete vs. Kauf: Der Vergleich',
                    description: 'Warum Sie als Eigentümer tausende Euro sparen können.',
                    content: (
                        <div>
                            <div className="bg-blue-50 border-l-4 border-gas p-6 my-6 rounded-r-lg">
                                <p className="font-bold text-gas-dark mb-2">Das Wichtigste in Kürze:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Freie Händlerwahl:</strong> Kaufen Sie Ihr Gas dort, wo es am günstigsten ist.</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Keine versteckten Kosten:</strong> Keine Zählermiete, keine Wartungspauschalen.</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> <strong>Amortisation:</strong> Der Kaufpreis rechnet sich oft schon nach 3-5 Jahren.</li>
                                </ul>
                            </div>

                            <h4 className="text-xl font-bold text-gas mb-4">Der direkte Vergleich</h4>
                            <ComparisonTable
                                headers={['Kriterium', 'Miet-Tank', 'Kauf-Tank (Eigentum)']}
                                rows={[
                                    ['Anschaffungskosten', 'Niedrig (oft 0€ - 300€)', 'Mittel (ab ca. 1.800€)'],
                                    ['Gaspreis', 'Vom Anbieter festgelegt (oft hoch)', 'Frei verhandelbar (Tagespreis)'],
                                    ['Vertragsbindung', 'Oft 10+ Jahre', 'Keine Bindung'],
                                    ['Wartungskosten', 'Oft in Pauschale enthalten', 'Zahlen Sie selbst (aber günstiger)'],
                                    ['Gesamtkosten (10 Jahre)', 'Sehr hoch (durch Gaspreis)', 'Niedrig']
                                ]}
                            />

                            <h4 className="text-xl font-bold text-gas mb-4">Das Problem mit der Miete</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Viele Anbieter locken mit günstigen Einmalzahlungen für die Aufstellung. Doch das "Kleingedruckte" hat es in sich: Sie verpflichten sich vertraglich, das Flüssiggas ausschließlich bei diesem Anbieter zu bestellen. Da der Wettbewerb fehlt, liegen die Literpreise oft 15-25 Cent über dem freien Marktpreis.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Ihr Vorteil als Eigentümer</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Ein eigener Flüssiggastank gehört Ihnen. Sie können bei jeder Füllung den günstigsten Anbieter wählen – ähnlich wie bei Heizöl. Wir organisieren die gesetzlichen Prüfungen (2- und 10-Jahres-Prüfung) gerne für Sie, aber Sie entscheiden.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-entsorgen',
                    title: 'Flüssiggastank entsorgen',
                    description: 'So werden Sie den alten Flüssiggastank los.',
                    content: (
                        <div>
                            <SourceBadge text="Fachbetriebspflicht" />
                            <p>Wir holen Ihren alten Tank ab. Der Flüssiggastank wird nicht gereinigt oder zersägt, sondern als Ganzes abtransportiert.</p>

                            <h4 className="text-xl font-bold text-gas mb-4">Ablauf der Entsorgung</h4>
                            <div className="space-y-4 my-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-gas/10 text-gas font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                                    <p><strong>Daten senden:</strong> Schicken Sie uns ein Foto vom Typschild und Standort.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-gas/10 text-gas font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                                    <p><strong>Angebot:</strong> Sie erhalten einen Festpreis für die Abholung.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-gas/10 text-gas font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                                    <p><strong>Abholung:</strong> Unser Kran-LKW kommt, saugt Restgas ab (wird vergütet) und nimmt den Tank mit.</p>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'aufstellung',
                    title: 'Installation & Vorschriften',
                    description: 'Abstände, Grenzen und TRF 2021.',
                    content: (
                        <div>
                            <h4>Oberirdisch vs. Unterirdisch</h4>
                            <p><strong>Oberirdisch:</strong> Die günstige Standardlösung. Der Flüssiggastank steht auf einer Betonplatte im Garten. Ideal, wenn Optik zweitrangig ist oder der Tank versteckt (hinter Hecken) stehen kann.</p>
                            <p><strong>Unterirdisch:</strong> Die elegante Lösung. Nur der Domdeckel ist sichtbar. Perfekt für kleine Grundstücke, da die Oberfläche begehbar bleibt.</p>

                            <h4>Sicherheitsabstände (TRF 2021)</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> <strong>Brandlasten:</strong> 3m Abstand zu Holzhütten, Stroh, etc.</li>
                                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-orange-500"/> <strong>Öffnungen:</strong> 1m (mit Strahlungsschutzwand) bis 3m zu Kellerfenstern/Lichtschächten.</li>
                            </ul>

                            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-gray-700 block">Checkliste Aufstellung</span>
                                    <span className="text-sm text-gray-500">PDF, 1.2 MB</span>
                                </div>
                                <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50">
                                    <Download size={16} /> Download
                                </button>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'groessen',
                    title: 'Flüssiggastank-Größen & Maße',
                    description: 'Welcher Flüssiggastank passt zu meinem Haus?',
                    content: (
                        <div>
                            <p>Die Wahl der Tankgröße hängt von Ihrem Jahresverbrauch und dem Platzangebot ab.</p>
                            <table className="w-full text-left text-sm border-collapse mb-8 zebra-table rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gas text-white">
                                        <th className="p-3 font-bold">Bezeichnung</th>
                                        <th className="p-3 font-bold">Volumen (L)</th>
                                        <th className="p-3 font-bold">Maße (L x H) ca.</th>
                                        <th className="p-3 font-bold">Eignung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">1,2 t</td>
                                        <td className="p-3">2.700</td>
                                        <td className="p-3">2,50 x 1,25 m</td>
                                        <td className="p-3">Niedrigenergiehaus / Ferienhaus</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">2,1 t</td>
                                        <td className="p-3">4.850</td>
                                        <td className="p-3">4,30 x 1,25 m</td>
                                        <td className="p-3">Standard Einfamilienhaus</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">2,9 t</td>
                                        <td className="p-3">6.400</td>
                                        <td className="p-3">5,50 x 1,25 m</td>
                                        <td className="p-3">Mehrfamilienhaus / Gewerbe</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                },
                {
                    id: 'sicherheit',
                    title: 'Prüfung & Sicherheit',
                    description: 'Warum sind Prüfungen notwendig?',
                    content: (
                        <div>
                            <p>Flüssiggastanks unterliegen strengen Sicherheitsvorschriften. Wir kümmern uns um die Einhaltung.</p>
                            <h4>Prüfintervalle</h4>
                            <div className="grid gap-4 md:grid-cols-2 my-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="font-bold text-gas text-lg mb-1">Alle 2 Jahre</div>
                                    <div className="font-bold text-gray-800">Äußere Prüfung</div>
                                    <p className="text-sm text-gray-500 mt-2">Sichtprüfung auf Korrosion, Zugänglichkeit und Beschilderung. Schnell erledigt.</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="font-bold text-gas text-lg mb-1">Alle 10 Jahre</div>
                                    <div className="font-bold text-gray-800">Innere Prüfung</div>
                                    <p className="text-sm text-gray-500 mt-2">Umfassende Prüfung durch ZÜS (TÜV). Austausch Sicherheitsventil. Wir koordinieren das.</p>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'anlage',
                    title: 'Die Flüssiggasanlage',
                    description: 'Vom Tank bis zum Brenner: Wie es funktioniert.',
                    content: (
                        <div>
                            <p>Eine Flüssiggasanlage ist überraschend simpel und wartungsarm.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">1</div>
                                    <h5 className="font-bold text-gas">Der Tank</h5>
                                    <p className="text-xs text-gray-600 mt-1">Lagert den Energievorrat (meist für 1 Jahr) sicher im Garten.</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">2</div>
                                    <h5 className="font-bold text-gas">Die Leitung</h5>
                                    <p className="text-xs text-gray-600 mt-1">Erdverlegtes Rohr ins Haus. Ein Regler reduziert den Druck auf 50mbar.</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">3</div>
                                    <h5 className="font-bold text-gas">Die Heizung</h5>
                                    <p className="text-xs text-gray-600 mt-1">Meist eine Gas-Brennwerttherme an der Wand.</p>
                                </div>
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
                    id: 'hybrid',
                    title: 'Flüssiggas-Hybridheizung',
                    description: 'Die ideale Kombi aus Erneuerbaren und Bewährtem.',
                    content: (
                        <div>
                            <p>Eine Hybridheizung kombiniert eine Flüssiggasbrennwerttherme mit erneuerbaren Energien, meist einer Wärmepumpe.</p>
                            <h4>So funktioniert es</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-1"/> <strong>Grundlast:</strong> Die Wärmepumpe übernimmt an milden Tagen.</li>
                                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-1"/> <strong>Spitzenlast:</strong> Bei Eiseskälte springt das Flüssiggas ein.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'pellet-vergleich',
                    title: 'Pelletheizung vs. Flüssiggas',
                    description: 'Der Kosten- & Komfort-Check.',
                    content: (
                        <div>
                            <ComparisonTable
                                headers={['', 'Flüssiggas', 'Pellets']}
                                rows={[
                                    ['Anschaffungskosten', 'Gering (Therme ab 4.000€)', 'Hoch (ab 15.000€)'],
                                    ['Platzbedarf', 'Gering (Wandgerät)', 'Hoch (Lagerraum + Kessel)'],
                                    ['Wartung', 'Wenig (alle 2 Jahre)', 'Viel (Asche leeren, Reinigung)'],
                                    ['Feinstaub', 'Nahezu Null', 'Vorhanden (Filterpflicht)']
                                ]}
                            />
                        </div>
                    )
                },
                {
                    id: 'geg',
                    title: 'Heizungsgesetz (GEG) 2024',
                    description: 'Was gilt für Flüssiggasheizungen?',
                    content: (
                        <div>
                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
                                <p className="font-bold text-yellow-800">Gute Nachrichten:</p>
                                <p className="text-yellow-700 text-sm">Bestandsanlagen dürfen weiterlaufen. Neue Gasheizungen sind oft als Hybrid ("H2-Ready" oder mit Wärmepumpe) erlaubt.</p>
                            </div>
                            <p>Das Gebäudeenergiegesetz (GEG) erlaubt weiterhin Flüssiggas, oft in Kombination mit 65% erneuerbaren Energien (z.B. BioLPG oder Hybrid).</p>
                        </div>
                    )
                },
                {
                    id: 'oel-wechsel',
                    title: 'Wechsel von Öl auf Flüssiggas',
                    description: 'Sauberer, platzsparender, günstiger.',
                    content: (
                        <div>
                            <h4>Öltank raus – Platz gewinnen</h4>
                            <p>Der alte Öltank im Keller nimmt wertvollen Platz weg. Ein Flüssiggastank im Garten schafft im Keller Platz für einen Hobbyraum.</p>
                            <h4>Vorteile</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <li className="flex items-center gap-2 bg-green-50 p-2 rounded"><CheckCircle size={14} className="text-green-600"/> Kein Ölgeruch mehr</li>
                                <li className="flex items-center gap-2 bg-green-50 p-2 rounded"><CheckCircle size={14} className="text-green-600"/> Raumgewinn im Keller</li>
                                <li className="flex items-center gap-2 bg-green-50 p-2 rounded"><CheckCircle size={14} className="text-green-600"/> Weniger CO2</li>
                                <li className="flex items-center gap-2 bg-green-50 p-2 rounded"><CheckCircle size={14} className="text-green-600"/> Günstige Anschaffung</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'waermepumpe',
                    title: 'Alternative zur Wärmepumpe?',
                    description: 'Warum Flüssiggas im Altbau oft gewinnt.',
                    content: (
                        <div>
                            <p>Wärmepumpen sind effizient – aber oft nicht im ungedämmten Altbau. Wenn Vorlauftemperaturen über 55°C benötigt werden, sinkt die Effizienz drastisch.</p>
                            <p><strong>Die Lösung:</strong> Flüssiggas schafft hohe Temperaturen für alte Heizkörper problemlos und kostengünstig.</p>
                        </div>
                    )
                },
                {
                    id: 'energiesparen',
                    title: '10 Tipps zum Heizkosten sparen',
                    description: 'Kleine Maßnahmen, große Wirkung.',
                    content: (
                        <div>
                            <ul className="space-y-3">
                                <li><strong>1. Hydraulischer Abgleich:</strong> Lassen Sie Ihre Heizung vom Profi einstellen.</li>
                                <li><strong>2. Stoßlüften:</strong> Fenster ganz auf, nicht kippen!</li>
                                <li><strong>3. Dämmen:</strong> Heizungsrohre im Keller dämmen.</li>
                                <li><strong>4. Thermostate:</strong> Smarte Thermostate nutzen.</li>
                                <li><strong>5. Wartung:</strong> Regelmäßige Wartung spart Energie.</li>
                            </ul>
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
                    content: (<div><p>Ein Blockheizkraftwerk (BHKW) produziert gleichzeitig Strom und Wärme. Ideal für Hotels oder Gewerbe mit hohem Wärmebedarf.</p></div>)
                },
                {
                    id: 'hallenheizung',
                    title: 'Hallenheizung & Dunkelstrahler',
                    description: 'Effizienz für hohe Räume.',
                    content: (<div><p>Dunkelstrahler erwärmen Flächen, nicht Luft. Das spart in hohen Hallen bis zu 40% Energie.</p></div>)
                },
                {
                    id: 'stapler',
                    title: 'Treibgas für Stapler',
                    description: 'Sauberer als Diesel, stärker als Elektro.',
                    content: (<div><p>Gasstapler sind sofort einsatzbereit (keine Ladezeit) und dürfen auch in Hallen fahren.</p></div>)
                }
            ]
        },
        {
            id: 'service',
            title: 'Service & Notfall',
            icon: Wrench,
            articles: [
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
                    content: (<div><p>LPG (Liquefied Petroleum Gas) besteht aus Propan und Butan. Es verflüssigt sich unter geringem Druck.</p></div>)
                },
                {
                    id: 'preise',
                    title: 'Preisentwicklung',
                    description: 'Wann ist der beste Zeitpunkt?',
                    content: (
                        <div>
                            <SourceBadge text="Stand: 2025" />
                            <p>Flüssiggaspreise schwanken saisonal. Im Sommer ist es oft günstiger.</p>

                            <div className="my-6 p-4 bg-blue-50 rounded-lg flex gap-4 items-center">
                                <Snowflake className="text-blue-400" />
                                <div>
                                    <span className="font-bold block text-gray-700">Winter-Tipp:</span>
                                    <span className="text-sm">Bestellen Sie rechtzeitig vor dem Frost, um Lieferengpässe zu vermeiden.</span>
                                </div>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'umrechnung',
                    title: 'Umrechnung: Liter, m³, kWh',
                    description: 'Verwirrung bei der Umrechnung?',
                    content: (
                        <div>
                             <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm my-4 space-y-2">
                                <div>1 Liter flüssig ≈ 6,57 kWh</div>
                                <div>1 m³ gasförmig ≈ 3,93 Liter flüssig</div>
                            </div>
                        </div>
                    )
                }
            ]
        }
    ]
};
