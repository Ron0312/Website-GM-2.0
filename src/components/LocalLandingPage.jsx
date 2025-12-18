import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { getCityBySlug } from '../data/cityData';
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
    const faqs = [
        {
            q: `Liefern Sie Flüssiggas auch nach ${city.name}?`,
            a: `Ja, ${city.name} (PLZ ${city.zip}) gehört zu unserem Kernliefergebiet in ${city.state}. Wir beliefern Sie zuverlässig mit unseren eigenen Tankwagen.`
        },
        {
            q: `Kann ich in ${city.name} einen Gastank kaufen?`,
            a: `Absolut. Wir bieten Ihnen in ${city.name} und Umgebung neue und regenerierte Flüssiggastanks zum Kauf an (1,2t bis 2,9t). Damit machen Sie sich unabhängig von teuren Mietverträgen.`
        },
        {
            q: `Wie schnell ist der Notdienst in ${city.name}?`,
            a: `In dringenden Fällen (z.B. Heizungsausfall) sind wir schnell vor Ort. Unser Standort ermöglicht kurze Anfahrtswege nach ${city.name}. Rufen Sie im Notfall direkt an.`
        },
        {
            q: "Bieten Sie auch Tankprüfungen an?",
            a: `Ja, wir organisieren für Ihre Anlage in ${city.name} sowohl die 2-jährige äußere Prüfung als auch die 10-jährige innere Prüfung. Alles aus einer Hand.`
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
            <h3 className="text-3xl font-bold text-center mb-12">Häufige Fragen zu Flüssiggas in {city.name}</h3>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-text transition-colors">
                            <span>{faq.q}</span>
                            <ChevronDown size={20} className={`transform transition-transform duration-300 ${open === i ? 'rotate-180 text-gas' : 'text-gray-400'}`}/>
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

    const heroTitle = (
        <>
            Flüssiggas & Tanks <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">in {city.name}.</span>
        </>
    );

    const heroSubtitle = `Ihr unabhängiger Anbieter für Flüssiggas in ${city.name} (${city.zip}). Kaufen Sie Ihren Gastank direkt, sparen Sie Miete und genießen Sie freie Händlerwahl.`;

    return (
        <div className="min-h-screen bg-white">
            <Hero
                setActiveSection={setActiveSection}
                openWizard={openWizard}
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Günstiges Flüssiggas für {city.name}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Als inhabergeführtes Familienunternehmen versorgt <strong>Gas-Service Möller</strong> Privat- und Gewerbekunden in <strong>{city.name}</strong> und der Region {city.state} zuverlässig mit Energie.
                            Verabschieden Sie sich von Knebelverträgen und überteuerten Mietmodellen.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
                         <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-gas-dark">Warum Kunden in {city.name} kaufen statt mieten:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
                                    <span><strong>Keine monatliche Miete:</strong> Der Tank gehört Ihnen. Die Ersparnis über 20 Jahre liegt oft bei mehreren Tausend Euro.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
                                    <span><strong>Freie Händlerwahl:</strong> Bestellen Sie Flüssiggas dort, wo es am günstigsten ist – auch bei uns in {city.name}.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
                                    <span><strong>Wertsteigerung:</strong> Ein eigener, moderner Gastank steigert den Wert Ihrer Immobilie in {city.zip} {city.name}.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
                                    <span><strong>Regionale Nähe:</strong> Unser Lager ist nah an {city.name}, was schnelle Lieferzeiten garantiert.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Viele Haushalte in <strong>{city.name}</strong> nutzen noch Mietverträge großer Konzerne. Dabei zahlen sie oft jahrelang drauf – durch Miete, Wartungspauschalen und gebundene Gaspreise.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Wir bieten Ihnen eine faire Alternative: <strong>Kaufen Sie Ihren Tank.</strong> Wir kümmern uns um die Aufstellung in {city.name}, den Anschluss und die regelmäßige Belieferung zu aktuellen Tagespreisen.
                            </p>
                            <button
                                onClick={() => openWizard('tank')}
                                className="bg-gas text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all w-full md:w-auto"
                            >
                                Jetzt Angebot für {city.name} anfordern
                            </button>
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
                         Wir sind in ganz {city.state} für Sie unterwegs. Prüfen Sie jetzt direkt, wann wir das nächste Mal bei Ihnen in {city.zip} {city.name} sind.
                     </p>
                     <div className="h-96 w-full rounded-xl overflow-hidden bg-white shadow-inner border border-gray-100 relative">
                        <Suspense fallback={<div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Karte wird geladen...</div>}>
                            <DeliveryMap />
                        </Suspense>
                        {/* Overlay to ensure touch interaction works but visual indication is clear */}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-gas shadow-sm border border-gas/10 pointer-events-none">
                            Liefergebiet Norddeutschland
                        </div>
                     </div>
                 </div>
            </div>

            <InspectionSection openWizard={openWizard} />

            <LocalFAQ city={city} />
            <ContactSection />
        </div>
    );
};

export default LocalLandingPage;
