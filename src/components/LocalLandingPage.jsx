import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { getCityBySlug, cityData } from '../data/cityData';
import Hero from './Hero';
import TankSection from './TankSection';
import ContactSection from './ContactSection';
import CommercialSection from './CommercialSection';
import InspectionSection from './InspectionSection';
import NotFound from './NotFound';

// Lazy load Map to save initial bytes
const DeliveryMap = React.lazy(() => import('./DeliveryMap'));

const LocalFAQ = ({ city }) => {
    const [open, setOpen] = useState(0);
    const preposition = city.preposition || 'in';
    const faqs = [
        {
            q: `Liefern Sie Flüssiggas auch nach ${city.name}?`,
            a: `Ja, ${city.name} (PLZ ${city.zip}) gehört zu unserem Kernliefergebiet ${preposition} ${city.state}. Wir beliefern Sie zuverlässig mit unseren eigenen Tankwagen.`
        },
        {
            q: `Kann ich ${preposition} ${city.name} einen Flüssiggastank kaufen?`,
            a: `Absolut. Wir bieten Ihnen ${preposition} ${city.name} und Umgebung neue und regenerierte Flüssiggastanks zum Kauf an (1,2t bis 2,9t). Damit machen Sie sich unabhängig von teuren Mietverträgen.`
        },
        {
            q: `Wie schnell ist der Notdienst ${preposition} ${city.name}?`,
            a: `In dringenden Fällen (z.B. Heizungsausfall) sind wir schnell vor Ort. Unser Standort ermöglicht kurze Anfahrtswege nach ${city.name}. Rufen Sie im Notfall direkt an.`
        },
        {
            q: "Bieten Sie auch Flüssiggastankprüfungen an?",
            a: `Ja, wir organisieren für Ihre Anlage ${preposition} ${city.name} sowohl die 2-jährige äußere Prüfung als auch die 10-jährige innere Prüfung. Alles aus einer Hand.`
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <h3 className="text-3xl font-bold text-center mb-12">Häufige Fragen zu Flüssiggas {preposition} {city.name}</h3>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-text transition-colors">
                            <span>{faq.q}</span>
                            <ChevronDown size={20} className={`transform transition-transform duration-300 ${open === i ? 'rotate-180 text-gas' : 'text-gray-500'}`}/>
                        </button>
                        <AnimatePresence>
                            {open === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 border-t border-gray-100">
                                    <p className="p-5 text-gray-600 leading-relaxed">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LocalLandingPage = ({ slug, setActiveSection, openWizard }) => {
    const city = getCityBySlug(slug);

    if (!city) {
        return <NotFound onGoHome={() => setActiveSection('start')} />;
    }

    const preposition = city.preposition || 'in';

    // State Specific Content Logic (SEO Boost)
    const stateSpecifics = {
        'Schleswig-Holstein': {
            regulation: 'Landesbauordnung Schleswig-Holstein (LBO SH)',
            text: 'In Schleswig-Holstein gelten für Flüssiggastanks spezifische Grenzabstände gemäß LBO SH. Genehmigungsfrei sind Tanks oft bis 2,9t, sofern die Abstände eingehalten werden.'
        },
        'Mecklenburg-Vorpommern': {
            regulation: 'Landesbauordnung Mecklenburg-Vorpommern (LBauO M-V)',
            text: 'Für Mecklenburg-Vorpommern beachten wir bei der Aufstellung die LBauO M-V. Besonders in Wasserschutzgebieten der Seenplatte gelten gesonderte Auflagen, die wir für Sie prüfen.'
        },
        'Niedersachsen': {
            regulation: 'Niedersächsische Bauordnung (NBauO)',
            text: 'In Niedersachsen prüfen wir die Aufstellbedingungen nach NBauO. Abstände zu Nachbargrenzen sind hier besonders wichtig für eine reibungslose Abnahme.'
        },
        'Hamburg': {
            regulation: 'Hamburgische Bauordnung (HBauO)',
            text: 'In Hamburg ist aufgrund der dichten Bebauung oft eine unterirdische Lagerung oder ein genauer Blick auf die Abstände (HBauO) nötig.'
        }
    };

    const regionalInfo = stateSpecifics[city.state] || stateSpecifics['Schleswig-Holstein'];

    const heroTitle = (
        <>
            Flüssiggas & Tanks <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{preposition} {city.name}.</span>
        </>
    );

    const heroSubtitle = `Ihr unabhängiger Anbieter für Flüssiggas ${preposition} ${city.name} (${city.zip}). Kaufen Sie Ihren Flüssiggastank direkt, sparen Sie Miete und genießen Sie freie Händlerwahl.`;

    // Find nearby cities (same state) - Deterministic shuffle to prevent hydration mismatch
    const seed = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const nearbyCities = cityData
        .filter(c => c.state === city.state && c.slug !== city.slug)
        .sort((a, b) => {
            const valA = a.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const valB = b.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return (valA + seed) % 100 - (valB + seed) % 100;
        })
        .slice(0, 6);

    // Dynamic Content Generation based on City
    const managers = ['Thomas Müller', 'Hans Christian Müller', 'Anja Müller'];
    const regionalManager = managers[seed % managers.length];
    const distanceKm = Math.floor((seed % 60) + 15); // Deterministic distance between 15 and 75 km
    const deliveryDays = ['Montag & Donnerstag', 'Dienstag & Freitag', 'Mittwoch & Freitag'][seed % 3];

    return (
        <div className="min-h-screen bg-white">
            <Hero
                setActiveSection={setActiveSection}
                openWizard={openWizard}
                title={heroTitle}
                subtitle={heroSubtitle}
                backgroundImage="/images/gas-order-hero.webp" // Explicitly passed to ensure consistency
                // Enhance SEO for Hero Image
                imageAlt={`Flüssiggaslieferung und Tankwagen in ${city.name}`}
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Günstiges Flüssiggas für {city.name}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Als inhabergeführtes Familienunternehmen versorgt <strong>Gas-Service Möller</strong> Privat- und Gewerbekunden {preposition} <strong>{city.name}</strong> und der Region {city.state} zuverlässig mit Energie.
                            Verabschieden Sie sich von Knebelverträgen und überteuerten Mietmodellen.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
                         <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-gas-dark">Warum Kunden {preposition} {city.name} kaufen statt mieten:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span><strong>Keine monatliche Miete:</strong> Der Tank gehört Ihnen. Die Ersparnis über 20 Jahre liegt oft bei mehreren Tausend Euro.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span><strong>Freie Händlerwahl:</strong> Bestellen Sie Flüssiggas dort, wo es am günstigsten ist – auch bei uns {preposition} {city.name}.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span><strong>Wertsteigerung:</strong> Ein eigener, moderner Flüssiggastank steigert den Wert Ihrer Immobilie {preposition} {city.zip} {city.name}.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span><strong>Regionale Nähe:</strong> Unser Lager ist nah an {city.name}, was schnelle Lieferzeiten garantiert.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Viele Haushalte {preposition} <strong>{city.name}</strong> nutzen noch Mietverträge großer Konzerne. Dabei zahlen sie oft jahrelang drauf – durch Miete, Wartungspauschalen und gebundene Gaspreise.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Wir bieten Ihnen eine faire Alternative: <strong>Kaufen Sie Ihren Flüssiggastank.</strong> Wir kümmern uns um die Aufstellung {preposition} {city.name}, den Anschluss und die regelmäßige Belieferung zu aktuellen Tagespreisen.
                            </p>

                            {/* Regional Specific Content Block (Doorway Page Mitigation) */}
                            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8">
                                <h4 className="flex items-center gap-2 font-bold text-gas-dark mb-2">
                                    <ShieldCheck className="w-5 h-5"/>
                                    Vorschriften in {city.state}
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {regionalInfo.text} Wir kennen die Anforderungen der {regionalInfo.regulation} genau und unterstützen Sie bei der Antragsstellung.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => openWizard('tank')}
                                    className="bg-gas text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all w-full md:w-auto"
                                >
                                    Jetzt Angebot für {city.name} anfordern
                                </button>
                                <a
                                    href="/wissen/preis-guide"
                                    onClick={(e) => { e.preventDefault(); setActiveSection('wissen/preis-guide'); }}
                                    className="flex items-center justify-center gap-2 text-gas font-bold hover:text-gas-dark transition-colors w-full md:w-auto px-8 py-2"
                                >
                                    Nicht sicher? Lesen Sie unseren Preis-Guide <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Regional Info Block */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
                            <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Entfernung zum Lager</div>
                            <div className="text-3xl font-extrabold text-gas-dark mb-1">ca. {distanceKm} km</div>
                            <p className="text-sm text-gray-500">Schnelle Lieferung nach {city.name}</p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
                            <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Liefertage</div>
                            <div className="text-3xl font-extrabold text-gas-dark mb-1">{deliveryDays}</div>
                            <p className="text-sm text-gray-500">Hauptrouten in {city.state}</p>
                        </div>
                         <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
                            <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Ihr Ansprechpartner</div>
                            <div className="text-3xl font-extrabold text-gas-dark mb-1">{regionalManager}</div>
                            <p className="text-sm text-gray-500">Experte für die Region {city.zip}</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Tank Section - Standard Reuse */}
            <TankSection openWizard={openWizard} setActiveSection={setActiveSection} showTechnicalOverview={false} />

            <CommercialSection setActiveSection={setActiveSection} />

            <div className="max-w-7xl mx-auto px-4 mt-24 mb-12">
                 <div className="bg-gradient-to-br from-gas-light to-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gas/10">
                     <h2 className="text-3xl font-bold mb-4 text-gas-dark">Ihr Liefergebiet: {city.name} & Umgebung</h2>
                     <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                         Wir sind in ganz {city.state} für Sie unterwegs. Prüfen Sie jetzt direkt, wann wir das nächste Mal bei Ihnen {preposition} {city.zip} {city.name} sind.
                     </p>
                     <div className="h-96 w-full rounded-xl overflow-hidden bg-white shadow-inner border border-gray-100 relative">
                        <Suspense fallback={<div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center text-gray-500">Karte wird geladen...</div>}>
                            <DeliveryMap />
                        </Suspense>
                        {/* Overlay to ensure touch interaction works but visual indication is clear */}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-gas shadow-sm border border-gas/10 pointer-events-none flex items-center gap-2">
                            <MapPin size={12}/> Liefergebiet Norddeutschland
                        </div>
                     </div>
                 </div>
            </div>

            <InspectionSection openWizard={openWizard} />

            <LocalFAQ city={city} />

            {/* Nearby Cities Section */}
            {nearbyCities.length > 0 && (
                <div className="bg-gray-50 py-16 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8">Wir sind auch in Ihrer Nähe</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {nearbyCities.map(neighbor => (
                                <a
                                    href={`/liefergebiet/${neighbor.slug}`}
                                    key={neighbor.slug}
                                    onClick={(e) => { e.preventDefault(); setActiveSection(`liefergebiet/${neighbor.slug}`); }}
                                    className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-gas hover:text-gas hover:shadow-sm transition-all font-medium"
                                >
                                    {neighbor.name}
                                </a>
                            ))}
                            <a
                                href="/liefergebiet"
                                onClick={(e) => { e.preventDefault(); setActiveSection('liefergebiet'); }}
                                className="px-6 py-3 bg-gas-light/20 border border-transparent rounded-full text-gas font-bold hover:bg-gas-light/40 transition-all"
                            >
                                Alle Städte anzeigen
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <ContactSection />
        </div>
    );
};

export default LocalLandingPage;
