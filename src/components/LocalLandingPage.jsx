import React, { Suspense } from 'react';
import { getCityBySlug } from '../data/cityData';
import Hero from './Hero';
import TankSection from './TankSection';
import ContactSection from './ContactSection';
import CommercialSection from './CommercialSection';
import InspectionSection from './InspectionSection';
import FAQ from './FAQ';
import NotFound from './NotFound';

// Lazy load Map to save initial bytes
const DeliveryMap = React.lazy(() => import('./DeliveryMap'));

const LocalLandingPage = ({ slug, setActiveSection, openWizard }) => {
    const city = getCityBySlug(slug);

    if (!city) {
        return <NotFound onGoHome={() => setActiveSection('start')} />;
    }

    // Dynamic Content Generation based on City
    // We rotate slightly to differentiate content slightly for SEO

    const heroTitle = (
        <>
            Flüssiggas & Tanks <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">in {city.name}.</span>
        </>
    );

    const heroSubtitle = `Gasmöller ist Ihr regionaler Partner für Flüssiggas und Tanks in ${city.name} (PLZ ${city.zip}) und Umgebung. Kaufen Sie Ihren Gastank direkt, statt ihn zu mieten.`;

    return (
        <div className="min-h-screen bg-white">
            <Hero
                setActiveSection={setActiveSection}
                openWizard={openWizard}
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ihr Flüssiggas-Experte in {city.name}</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Sie suchen einen zuverlässigen Flüssiggas-Lieferanten in <strong>{city.name}</strong> oder möchten einen eigenen
                        Flüssiggastank kaufen? Gas-Service Möller liefert seit über 20 Jahren günstige Energie in den Norden.
                        Wir beliefern Privathaushalte und Gewerbekunden in {city.state} zuverlässig und unabhängig.
                    </p>
                </div>
            </section>

            {/* Tank Section - Standard Reuse */}
            <TankSection openWizard={openWizard} setActiveSection={setActiveSection} showTechnicalOverview={false} />

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-4">Warum Gasmöller in {city.name}?</h3>
                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-gas font-bold text-xl mb-2">Regional & Nah</div>
                            <p className="text-gray-600">Schnelle Lieferwege zu Ihnen nach {city.name} ({city.zip}). Wir kennen die Region.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-gas font-bold text-xl mb-2">Unabhängig</div>
                            <p className="text-gray-600">Keine Vertragsbindung. Bestellen Sie Gas, wann Sie wollen.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-gas font-bold text-xl mb-2">Alles aus einer Hand</div>
                            <p className="text-gray-600">Von der Tankaufstellung bis zur Gaslieferung und Prüfung.</p>
                        </div>
                    </div>
                </div>
            </section>

            <CommercialSection setActiveSection={setActiveSection} />

            <div className="max-w-7xl mx-auto px-4 mt-16">
                 <h2 className="text-3xl font-bold text-center mb-8">Unser Liefergebiet um {city.name}</h2>
                 <Suspense fallback={<div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl" />}><DeliveryMap /></Suspense>
            </div>

            <InspectionSection openWizard={openWizard} />

            <FAQ />
            <ContactSection />
        </div>
    );
};

export default LocalLandingPage;
