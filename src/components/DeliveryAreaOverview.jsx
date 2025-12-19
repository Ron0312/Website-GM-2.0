import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { cityData } from '../data/cityData';
import ContactSection from './ContactSection';

const DeliveryAreaOverview = ({ setActiveSection }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Sort cities alphabetically
    const sortedCities = [...cityData].sort((a, b) => a.name.localeCompare(b.name));

    // Group by state for better organization
    const citiesByState = sortedCities.reduce((acc, city) => {
        if (!acc[city.state]) acc[city.state] = [];
        acc[city.state].push(city);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-white pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block p-2 px-4 rounded-full bg-gas-light/30 text-gas-dark font-bold text-sm mb-4"
                    >
                        Norddeutschland
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Unser Liefergebiet
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Wir versorgen Norddeutschland mit Flüssiggas. Finden Sie Ihre Stadt und profitieren Sie von günstigen Preisen und persönlichem Service.
                    </p>
                </div>

                <div className="space-y-16">
                    {Object.keys(citiesByState).sort().map((state) => (
                        <div key={state} className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-bold text-gas-dark mb-8 flex items-center gap-3">
                                <MapPin className="text-gas" />
                                {state}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {citiesByState[state].map((city) => (
                                    <motion.button
                                        key={city.slug}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setActiveSection(`liefergebiet/${city.slug}`)}
                                        className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-gas hover:shadow-md transition-all text-left flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="font-bold text-gray-800 group-hover:text-gas transition-colors block">
                                                {city.name}
                                            </span>
                                            <span className="text-sm text-gray-400">{city.zip}</span>
                                        </div>
                                        <ArrowRight size={16} className="text-gray-300 group-hover:text-gas transform group-hover:translate-x-1 transition-all" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-gas-dark rounded-3xl p-12 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Ihre Stadt ist nicht dabei?</h3>
                        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                            Kein Problem! Wir liefern in weiten Teilen Norddeutschlands.
                            Geben Sie einfach Ihre Postleitzahl in unserem Anfrage-Assistenten ein.
                        </p>
                        <button
                            onClick={() => setActiveSection('start')} // Assuming start has the wizard or calculator
                            className="bg-white text-gas-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                            Jetzt Verfügbarkeit prüfen
                        </button>
                    </div>
                    {/* Decorative background circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                </div>
            </div>

            <div className="mt-12">
                 <ContactSection />
            </div>
        </div>
    );
};

export default DeliveryAreaOverview;
