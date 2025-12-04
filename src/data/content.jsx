import React from 'react';
import {
    Settings, CheckCircle, Factory, Home, Wrench, BookOpen,
    Flame, AlertTriangle
} from 'lucide-react';
import SourceBadge from '../components/SourceBadge';
import SafetyChecklist from '../components/SafetyChecklist';

export const CONTENT = {
    knowledge: [
        {
            id: 'tank-technik',
            title: 'Tank & Technik',
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
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> Miettanks binden Sie oft jahrelang an einen Lieferanten (hohe Gaspreise).</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> Kauftanks machen Sie zum "Free Agent" auf dem freien Markt.</li>
                                    <li className="flex items-start"><CheckCircle size={16} className="text-gas mr-2 mt-1 flex-shrink-0"/> Die Amortisation eines Kaufs erfolgt oft schon nach 3-5 Jahren.</li>
                                </ul>
                            </div>
                            <h4 className="text-xl font-bold text-gas mb-4">Das Problem mit der Miete</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Viele Anbieter locken mit günstigen Einmalzahlungen für die Aufstellung. Doch das "Kleingedruckte" hat es in sich: Sie dürfen das Gas nur bei diesem einen Anbieter bestellen. Da der Wettbewerb fehlt, liegen die Literpreise oft 15-25 Cent über dem freien Marktpreis. Hinzu kommen monatliche Zählermieten oder Wartungspauschalen.</p>
                            <h4 className="text-xl font-bold text-gas mb-4">Der Vorteil des Eigentums</h4>
                            <p className="mb-4 leading-relaxed text-gray-600">Ein eigener Tank gehört Ihnen (oder wird durch Einmalzahlung erworben). Sie können bei jeder Füllung den günstigsten Anbieter wählen – ähnlich wie bei Heizöl. Die Wartungspflichten (2- und 10-Jahres-Prüfung) organisieren wir für Sie kostengünstig und unbürokratisch.</p>
                        </div>
                    )
                },
                {
                    id: 'tank-entsorgen',
                    title: 'Flüssiggastank entsorgen',
                    description: 'So werden Sie den alten Tank los.',
                    content: (
                        <div>
                            <SourceBadge text="Fachbetriebspflicht" />
                            <p>Sie möchten Ihren alten Flüssiggastank entsorgen? Das ist Aufgabe für Profis. Da oft noch Restgas im Tank ist, darf dieser nicht einfach zersägt werden.</p>
                            <h4>Ablauf der Entsorgung</h4>
                            <ul>
                                <li><strong>Absaugen:</strong> Das Restgas muss fachgerecht abgesaugt und abgefackelt werden.</li>
                                <li><strong>Spülen:</strong> Der Tank wird mit Stickstoff gespült, um gasfrei zu sein.</li>
                                <li><strong>Demontage:</strong> Erst dann kann der Tank zerlegt und abtransportiert werden.</li>
                            </ul>
                            <p>Wir übernehmen die komplette Entsorgung für Sie – sicher und zertifiziert.</p>
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
                            <p><strong>Oberirdisch:</strong> Die günstige Standardlösung. Der Tank steht auf einer Betonplatte im Garten. Ideal, wenn Optik zweitrangig ist oder der Tank versteckt (hinter Hecken) stehen kann.</p>
                            <p><strong>Unterirdisch:</strong> Die elegante Lösung. Nur der Domdeckel ist sichtbar. Perfekt für kleine Grundstücke, da die Oberfläche begehbar bleibt (nicht befahrbar ohne Sondermaßnahmen).</p>
                            <h4>Sicherheitsabstände (TRF 2021)</h4>
                            <ul>
                                <li><strong>Brandlasten:</strong> 3m Abstand zu Holzhütten, Stroh, etc.</li>
                                <li><strong>Öffnungen:</strong> 3m Abstand zu Kellerfenstern, Lichtschächten, Gullys (da Gas schwerer als Luft ist).</li>
                                <li><strong>Grenzen:</strong> Mit einer Strahlungsschutzwand können Abstände oft auf 1m reduziert werden.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'groessen',
                    title: 'Tankgrößen & Maße',
                    description: 'Welcher Tank passt zu meinem Haus?',
                    content: (
                        <div>
                            <p>Die Wahl der Tankgröße hängt von Ihrem Jahresverbrauch und dem Platzangebot ab.</p>
                            <table className="w-full text-left text-sm border-collapse mb-8">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200">
                                        <th className="p-3 font-bold text-gas">Bezeichnung</th>
                                        <th className="p-3 font-bold text-gas">Volumen (L)</th>
                                        <th className="p-3 font-bold text-gas">Maße (L x H) ca.</th>
                                        <th className="p-3 font-bold text-gas">Eignung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-3 font-bold">1,2 t</td>
                                        <td className="p-3">2.700</td>
                                        <td className="p-3">2,50 x 1,25 m</td>
                                        <td className="p-3">Niedrigenergiehaus / Ferienhaus</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 bg-gray-50">
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
                    description: 'Ist ein Gastank gefährlich?',
                    content: (
                        <div>
                            <p>Flüssiggastanks gehören zu den sichersten Energiespeichern überhaupt. Sie bestehen aus hochwertigem Feinkornbaustahl und sind mit Sicherheitsventilen ausgestattet.</p>
                            <h4>Prüfintervalle</h4>
                            <ul>
                                <li><strong>Alle 2 Jahre (Äußere Prüfung):</strong> Sichtprüfung auf Korrosion, Zugänglichkeit und Beschilderung. Durchführbar durch "befähigte Person" (z.B. unser Tankwagenfahrer oder Techniker).</li>
                                <li><strong>Alle 10 Jahre (Innere Prüfung):</strong> Umfassende Prüfung durch eine ZÜS (z.B. TÜV). Austausch des Sicherheitsventils und Druckprüfung.</li>
                            </ul>
                        </div>
                    )
                }
            ,
                {
                    id: 'anlage',
                    title: 'Die Flüssiggasanlage',
                    description: 'Vom Tank bis zum Brenner: Wie es funktioniert.',
                    content: (
                        <div>
                            <p>Eine Flüssiggasanlage ist überraschend simpel und wartungsarm. Sie besteht im Wesentlichen aus drei Komponenten:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">1</div>
                                    <h5 className="font-bold text-gas">Der Tank</h5>
                                    <p className="text-xs text-gray-600 mt-1">Lagert den Energievorrat (meist für 1 Jahr) sicher im Garten.</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">2</div>
                                    <h5 className="font-bold text-gas">Die Leitung</h5>
                                    <p className="text-xs text-gray-600 mt-1">Vom Tank führt ein erdverlegtes Rohr ins Haus. Ein Regler reduziert den Druck auf 50mbar.</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold">3</div>
                                    <h5 className="font-bold text-gas">Die Heizung</h5>
                                    <p className="text-xs text-gray-600 mt-1">Meist eine Gas-Brennwerttherme. Sie hängt platzsparend an der Wand.</p>
                                </div>
                            </div>
                        </div>
                    )
                },]
        },
        {
            id: 'heizung',
            title: 'Heizung & Modernisierung',
            icon: Home,
            articles: [{id: 'hybrid', title: 'Gas-Hybridheizung', description: 'Die ideale Kombi aus Erneuerbaren und Bewährtem.', content: (<div>
            <p>Eine Hybridheizung kombiniert eine Gasbrennwerttherme mit erneuerbaren Energien, meist einer Wärmepumpe oder Solarthermie.</p>
            <h4>So funktioniert es</h4>
            <ul>
                <li><strong>Grundlast:</strong> Die Wärmepumpe übernimmt die Wärmeversorgung an milden Tagen (ca. 70-80% des Jahres).</li>
                <li><strong>Spitzenlast:</strong> An eiskalten Tagen oder bei hohem Warmwasserbedarf springt automatisch das Gas ein.</li>
            </ul>
            <h4>Vorteile</h4>
            <p>Sie erfüllen die 65%-Regel des GEG, sparen Investitionskosten im Vergleich zur Voll-Wärmepumpe (keine teure Dämmung nötig) und haben 100% Versorgungssicherheit.</p>
        </div>)},{id: 'mfh', title: 'Lösungen für Mehrfamilienhäuser', description: 'Zentralheizung oder Etagenheizung mit Gas.', content: (<div>
            <p>Auch für Vermieter und WEGs ist Flüssiggas attraktiv. Mit einem zentralen unterirdischen Tank (oder einer Tankbatterie) können beliebig viele Wohneinheiten versorgt werden.</p>
            <h4>Abrechnung leicht gemacht</h4>
            <p>Wir bieten spezielle Zähler-Lösungen an, sodass jede Wohnung exakt nach Verbrauch abgerechnet werden kann. Wir kümmern uns um die Ablesung und Wartung der Zähler. Das steigert den Wohnwert und senkt die Nebenkosten für Ihre Mieter.</p>
        </div>)},
                {
                    id: 'geg',
                    title: 'Heizungsgesetz (GEG) 2024',
                    description: 'Was gilt für Gasheizungen?',
                    content: (
                        <div>
                            <p>Das Gebäudeenergiegesetz (GEG) verunsichert viele Hausbesitzer. Hier sind die Fakten für Flüssiggas:</p>
                            <h4>Bestandsgebäude</h4>
                            <p>Funktionierende Gasheizungen dürfen weiter betrieben und repariert werden. Es gibt keine sofortige Austauschpflicht. Auch neue Gasheizungen dürfen eingebaut werden, solange keine kommunale Wärmeplanung vorliegt (mit Beratungspflicht).</p>
                            <h4>Die 65% Erneuerbare-Energien-Regel</h4>
                            <p>Sollte die 65%-Pflicht greifen (z.B. in Neubaugebieten), ist Flüssiggas weiterhin eine Option:</p>
                            <ul>
                                <li><strong>Hybridheizung:</strong> Gasbrennwert + kleine Wärmepumpe.</li>
                                <li><strong>Bio-LPG:</strong> Nutzung von biogenem Flüssiggas (sofern verfügbar und anerkannt).</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'waermepumpe',
                    title: 'Alternative zur Wärmepumpe?',
                    description: 'Warum Gas im Altbau oft gewinnt.',
                    content: (
                        <div>
                            <p>Wärmepumpen sind effizient – aber oft nicht im ungedämmten Altbau. Wenn Vorlauftemperaturen über 55°C benötigt werden (alte Heizkörper), sinkt die Effizienz der Wärmepumpe drastisch und die Stromkosten explodieren.</p>
                            <h4>Vorteile Gas im Altbau</h4>
                            <ul>
                                <li><strong>Hohe Vorlauftemperaturen:</strong> Problemlos möglich, alte Heizkörper können bleiben.</li>
                                <li><strong>Geringe Investition:</strong> Eine Gasheizung kostet oft nur 1/3 einer Wärmepumpe.</li>
                                <li><strong>Platzsparend:</strong> Kein Außengerät, kein Lärm.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'oel-wechsel',
                    title: 'Wechsel von Öl auf Gas',
                    description: 'Sauberer, platzsparender, günstiger.',
                    content: (
                        <div>
                            <h4>Öltank raus – Platz gewinnen</h4>
                            <p>Der alte Öltank im Keller nimmt wertvollen Platz weg und riecht oft unangenehm. Ein Flüssiggastank im Garten schafft im Keller Platz für einen Hobbyraum oder Wellnessbereich.</p>
                            <h4>Umwelt & Technik</h4>
                            <p>Gas verbrennt fast rückstandsfrei (kein Ruß) und hat geringere CO2-Emissionen als Öl. Moderne Gas-Brennwertthermen sind hocheffizient, leise und können stufenlos modulieren.</p>
                        </div>
                    )
                },
                {
                    id: 'pellet-vergleich',
                    title: 'Pelletheizung vs. Flüssiggas',
                    description: 'Der Kosten- & Komfort-Check.',
                    content: (
                        <div>
                            <p>Pelletheizungen gelten als ökologisch, haben aber Nachteile im Vergleich zu Flüssiggas.</p>
                            <h4>Nachteile Pellets</h4>
                            <ul>
                                <li><strong>Wartung:</strong> Asche muss regelmäßig entleert werden. Mechanische Teile (Förderschnecke) sind störanfällig.</li>
                                <li><strong>Feinstaub:</strong> Hohe Emissionen, oft sind Filter nötig.</li>
                                <li><strong>Platz:</strong> Pelletlager benötigt viel trockenen Raum im Keller.</li>
                                <li><strong>Kosten:</strong> Anschaffung oft doppelt so teuer wie Gasheizung.</li>
                            </ul>
                            <h4>Vorteil Gas</h4>
                            <p>Sauber, wartungsarm, leise und günstig in der Anschaffung. BioLPG macht es ebenso grün.</p>
                        </div>
                    )
                }
            ,
                {
                    id: 'gaswaermepumpe',
                    title: 'Gas-Wärmepumpe',
                    description: 'Die unbekannte Effizienzmaschine.',
                    content: (
                        <div>
                            <p>Jeder spricht von elektrischen Wärmepumpen. Doch es gibt auch <strong>thermische Gas-Wärmepumpen</strong> (Absorptionswärmepumpen).</p>
                            <h4>Vorteile</h4>
                            <ul>
                                <li><strong>Effizienz:</strong> Nutzt Umweltwärme + Gaswärme. Wirkungsgrade von über 130% sind möglich.</li>
                                <li><strong>Altbau-tauglich:</strong> Erreicht problemlos hohe Vorlauftemperaturen für klassische Heizkörper.</li>
                                <li><strong>Leise:</strong> Keine lauten Kompressoren im Garten.</li>
                            </ul>
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
                                <li><strong>1. Hydraulischer Abgleich:</strong> Lassen Sie Ihre Heizung vom Profi einstellen. Spart bis zu 15%.</li>
                                <li><strong>2. Stoßlüften:</strong> Fenster nicht auf Kipp! 5 Min. ganz auf.</li>
                                <li><strong>3. Dämmen:</strong> Heizungsrohre im Keller dämmen kostet wenig und bringt viel.</li>
                                <li><strong>4. Thermostate:</strong> Programmierbare Thermostate senken die Temperatur, wenn niemand da ist.</li>
                                <li><strong>5. Wartung:</strong> Eine gewartete Heizung verbraucht weniger Gas.</li>
                                <li><strong>6. Heizkörper freihalten:</strong> Verdecken Sie Heizkörper nicht mit Möbeln oder langen Vorhängen. Die Wärme staut sich sonst.</li>
                                <li><strong>7. Fenster abdichten:</strong> Prüfen Sie die Dichtungen. Zugluft ist ein teurer Wärmedieb.</li>
                                <li><strong>8. Raumtemperatur anpassen:</strong> 1 Grad weniger spart ca. 6% Energie. Im Schlafzimmer reichen oft 17-18 Grad.</li>
                                <li><strong>9. Türen schließen:</strong> Heizen Sie nur die Räume, die Sie nutzen, und halten Sie die Türen zu kühleren Räumen geschlossen.</li>
                                <li><strong>10. Heizungspumpe tauschen:</strong> Alte Umwälzpumpen sind Stromfresser. Eine Hocheffizienzpumpe spart Strom und optimiert den Heizkreislauf.</li>
                            </ul>
                        </div>
                    )
                },]
        },
        {
            id: 'gewerbe',
            title: 'Gewerbe & Industrie',
            icon: Factory,
            articles: [{id: 'bhkw', title: 'Strom & Wärme (BHKW)', description: 'Doppelt sparen mit Kraft-Wärme-Kopplung.', content: (<div>
            <p>Ein Blockheizkraftwerk (BHKW) produziert gleichzeitig Strom und Wärme. Der Strom kann selbst genutzt oder eingespeist werden, die Abwärme heizt das Gebäude.</p>
            <h4>Ideal für Gewerbe</h4>
            <p>Mit Flüssiggas betrieben, laufen diese Anlagen extrem sauber und wartungsarm. Diese Lösung ist besonders wirtschaftlich für Betriebe mit ganzjährig hohem Wärmebedarf, wie z.B. Hotels, Schwimmbäder, Pflegeheime oder Bäckereien.</p>
        </div>)},
                {
                    id: 'lng-lpg',
                    title: 'Unterschied LNG vs. LPG',
                    description: 'Was ist was? Ein technischer Vergleich.',
                    content: (
                        <div>
                            <p>Oft verwechselt, aber grundverschieden:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h5 className="font-bold text-gas mb-2">LPG (Liquefied Petroleum Gas)</h5>
                                    <ul className="text-sm space-y-1">
                                        <li>= Propan / Butan</li>
                                        <li>Flüssig bei geringem Druck (~8 bar)</li>
                                        <li>Einsatz: Heizung, Stapler, Auto (Autogas)</li>
                                        <li>Lagerung: Stahltank im Garten</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h5 className="font-bold text-gray-700 mb-2">LNG (Liquefied Natural Gas)</h5>
                                    <ul className="text-sm space-y-1">
                                        <li>= Erdgas (Methan)</li>
                                        <li>Flüssig durch Kälte (-162°C)</li>
                                        <li>Einsatz: Schwerlastverkehr (LKW), Schiffe</li>
                                        <li>Lagerung: Isoliertanks (Thermoskanne)</li>
                                    </ul>
                                </div>
                            </div>
                            <p>Wir sind Spezialisten für <strong>LPG</strong> (Flüssiggas). Für LNG-Anfragen vermitteln wir Sie gerne an Partner.</p>
                        </div>
                    )
                },
                {
                    id: 'hallenheizung',
                    title: 'Hallenheizung & Dunkelstrahler',
                    description: 'Effizienz für hohe Räume.',
                    content: (
                        <div>
                            <p>Warmluftheizungen sind in hohen Hallen ineffizient, da die Wärme unter das Dach steigt. <strong>Dunkelstrahler</strong> mit Gas funktionieren wie die Sonne: Sie erwärmen nicht die Luft, sondern die Flächen und Personen, auf die sie treffen.</p>
                            <h4>Vorteile</h4>
                            <ul>
                                <li>Bis zu 40% Energieeinsparung gegenüber Konvektion.</li>
                                <li>Zonenweise Beheizung möglich (z.B. nur Arbeitsplätze).</li>
                                <li>Keine Staubaufwirbelung (wichtig für Lackierereien).</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'prozess',
                    title: 'Prozesswärme & Lackieren',
                    description: 'Exakte Temperaturen für Profis.',
                    content: (
                        <div>
                            <p>In Lackierkabinen, Brennöfen oder Trocknungsanlagen ist eine exakte Temperatursteuerung entscheidend. Flüssiggas bietet eine extrem saubere Verbrennung, sodass Abgase oft direkt im Prozess genutzt werden können (Direktbefeuerung), was den Wirkungsgrad auf nahezu 100% steigert.</p>
                        </div>
                    )
                },
                {
                    id: 'landwirtschaft',
                    title: 'Landwirtschaft & BioLPG',
                    description: 'Trocknung und Stallheizung.',
                    content: (
                        <div>
                            <p>Ob Getreidetrocknung nach der Ernte oder Ferkelaufzucht: Landwirte brauchen hohe Leistungen in kurzer Zeit, oft fernab vom Erdgasnetz.</p>
                            <p><strong>BioLPG für Bio-Höfe:</strong> Mit biogenem Flüssiggas können landwirtschaftliche Betriebe ihren CO2-Fußabdruck drastisch senken und Nachhaltigkeitsziele erfüllen.</p>
                        </div>
                    )
                },
                {
                    id: 'treibgas',
                    title: 'Treibgas (Staplergas)',
                    description: 'Mobile Energie für die Logistik.',
                    content: (
                        <div>
                            <p>Gasstapler verbinden die Kraft von Dieselstaplern mit der Sauberkeit von Elektrostaplern. Sie sind im Innen- und Außenbereich einsetzbar. Wir liefern Treibgas in Flaschen oder zur Betankung am eigenen Betriebstank.</p>
                        </div>
                    )
                }
            ,
                {
                    id: 'camping',
                    title: 'Flaschengas & Camping',
                    description: 'Energie to go.',
                    content: (
                        <div>
                            <p>Für Camper, Dachdecker und den Grill im Garten: Wir füllen Ihre Eigentumsflaschen (Grau) direkt vor Ort oder tauschen sie aus.</p>
                            <h4>Größen</h4>
                            <ul>
                                <li><strong>5 kg:</strong> Handlich, für den Grill.</li>
                                <li><strong>11 kg:</strong> Der Standard für Wohnwagen und Heizstrahler.</li>
                                <li><strong>33 kg:</strong> Für Gewerbe und Baustellen.</li>
                            </ul>
                            <p className="text-xs text-gray-400 mt-2">Hinweis: Rote Pfandflaschen anderer Anbieter können wir leider nicht tauschen.</p>
                        </div>
                    )
                },]
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
                            <p>Bevor Sie den Techniker rufen, prüfen Sie bitte:</p>
                            <ul className="mb-6">
                                <li><strong>Füllstand:</strong> Ist noch Gas im Tank? (Anzeige am Tank, nicht im Haus)</li>
                                <li><strong>Strom:</strong> Hat die Heizung Strom? (Sicherung prüfen)</li>
                                <li><strong>Störungscode:</strong> Zeigt das Display einen Fehlercode? (Handbuch prüfen, oft hilft ein Reset)</li>
                            </ul>
                            <SafetyChecklist />
                            <div className="bg-gas-light p-4 rounded-lg text-center">
                                <p className="font-bold text-gas mb-2">24h Notdienst für Kunden:</p>
                                <a href="tel:04551897089" className="text-2xl font-extrabold text-gas-dark block">04551 89 70 89</a>
                            </div>
                        </div>
                    )
                },
                {
                    id: 'nahwaerme',
                    title: 'Nahwärme vs. Einzeltank',
                    description: 'Warum wir Fans der Unabhängigkeit sind.',
                    content: (
                        <div>
                            <p>In Neubaugebieten wird oft Nahwärme angeboten (ein zentrales Heizkraftwerk für alle). Das klingt bequem, hat aber Tücken:</p>
                            <ul>
                                <li><strong>Monopol:</strong> Sie können den Anbieter nicht wechseln.</li>
                                <li><strong>Anschlusszwang:</strong> Oft sind Sie vertraglich auf Jahrzehnte gebunden.</li>
                                <li><strong>Preis:</strong> Die Grundgebühren sind oft sehr hoch.</li>
                            </ul>
                            <p>Mit einem <strong>eigenen Flüssiggastank</strong> bleiben Sie unabhängig und können jederzeit den Anbieter wechseln.</p>
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
                            <p>Flüssiggas (LPG = Liquefied Petroleum Gas) besteht hauptsächlich aus Propan und Butan. Es verflüssigt sich bereits unter geringem Druck (ca. 6-8 bar), wodurch große Energiemengen in kleinen Behältern transportiert werden können.</p>
                            <p><strong>Herkunft:</strong> Es entsteht als Begleitprodukt bei der Erdgasförderung (ca. 60%) und in Raffinerien (ca. 40%). Es ist also ohnehin vorhanden und muss nicht extra gefördert werden.</p>
                        </div>
                    )
                },
                {
                    id: 'biolpg',
                    title: 'BioLPG erklärt',
                    description: 'Die grüne Zukunft.',
                    content: (
                        <div>
                            <p>BioLPG ist chemisch identisch mit herkömmlichem Flüssiggas, wird aber aus organischen Reststoffen und pflanzlichen Ölen hergestellt. Es spart bis zu 80% CO2 ein und kann ohne technische Umrüstung in jeder bestehenden Flüssiggasanlage genutzt werden.</p>
                        </div>
                    )
                },
                {
                    id: 'preise',
                    title: 'Preisentwicklung & CO2-Steuer',
                    description: 'Wann kaufen?',
                    content: (
                        <div>
                            <SourceBadge text="Stand: Nov 2025" />
                            <p>Flüssiggas wird an den internationalen Märkten gehandelt. Die Preise schwanken saisonal (im Sommer oft günstiger). Als Eigentümer eines Tanks können Sie den Kaufzeitpunkt frei wählen.</p>
                            <h4>CO2-Steuer</h4>
                            <p>Auch auf Flüssiggas fällt die CO2-Abgabe an. Da Flüssiggas jedoch weniger CO2 emittiert als Heizöl, ist die Belastung geringer. BioLPG kann perspektivisch von der CO2-Steuer befreit sein.</p>
                        </div>
                    )
                },
                {
                    id: 'gaspreisbremse',
                    title: 'Gaspreisbremse & Politik',
                    description: 'Aktuelle Infos zur Entlastung.',
                    content: (
                        <div>
                            <SourceBadge text="Update: 2025" />
                            <p>Die Energiepreisbremsen sind ausgelaufen. Die Märkte haben sich jedoch stabilisiert.</p>
                            <p>Aktuell profitieren Gaskunden wieder von gesunkenen Börsenpreisen. Ein Vergleich lohnt sich immer. Da Flüssiggas nicht leitungsgebunden ist, reagiert der Markt schneller auf Preissenkungen als der Erdgasmarkt.</p>
                        </div>
                    )
                }
            ,
                {
                    id: 'umrechnung',
                    title: 'Umrechnung: Liter, m³, kWh',
                    description: 'Verwirrung am Zähler?',
                    content: (
                        <div>
                            <p>Flüssiggas wird in Litern geliefert, der Zähler misst Kubikmeter (m³) und die Abrechnung erfolgt oft in Kilowattstunden (kWh). Hier die Faustformeln:</p>
                            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm my-4 space-y-2">
                                <div>1 Liter flüssig ≈ 6,57 kWh</div>
                                <div>1 m³ gasförmig ≈ 3,93 Liter flüssig</div>
                                <div>1 m³ gasförmig ≈ 25,8 kWh</div>
                            </div>
                            <p className="text-xs">*Werte können je nach Druck und Temperatur leicht schwanken (Propangas).</p>
                        </div>
                    )
                },
                {
                    id: 'waermebedarf',
                    title: 'Wärmebedarf ermitteln',
                    description: 'Wie viel Gas brauche ich?',
                    content: (
                        <div>
                            <p>Der Verbrauch hängt stark vom energetischen Zustand des Hauses ab.</p>
                            <table className="w-full text-sm text-left border-collapse mt-4">
                                <thead><tr className="border-b border-gray-300"><th className="py-2">Baujahr / Standard</th><th className="py-2">Verbrauch ca.</th></tr></thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr><td className="py-2">Neubau (KfW 55)</td><td className="py-2">4-6 Liter / m²</td></tr>
                                    <tr><td className="py-2">Sanierter Altbau</td><td className="py-2">8-12 Liter / m²</td></tr>
                                    <tr><td className="py-2">Unsanierter Altbau</td><td className="py-2">15-25 Liter / m²</td></tr>
                                </tbody>
                            </table>
                        </div>
                    )
                },
                {
                    id: 'autarkie',
                    title: 'Autarke Energieversorgung',
                    description: 'Unabhängig von Putin & Co.',
                    content: (
                        <div>
                            <p>In unsicheren Zeiten ist Unabhängigkeit Gold wert. Mit einem eigenen Flüssiggastank haben Sie Ihren Energievorrat für 1-2 Jahre direkt auf dem Grundstück.</p>
                            <h4>Krisensicher</h4>
                            <p>Flüssiggas kommt nicht durch Pipelines aus Russland, sondern per Schiff und Bahn aus der Nordsee (Norwegen/USA) und deutschen Raffinerien. Die Versorgung ist diversifiziert und sicher.</p>
                        </div>
                    )
                },]
        }
    ]
};
