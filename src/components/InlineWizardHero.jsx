import React, { useState } from 'react';
import { ArrowRight, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cityData } from '../data/cityData';

const InlineWizardHero = ({ openWizard }) => {
    const [plz, setPlz] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [city, setCity] = useState(null);

    const checkPlz = async (e) => {
        e.preventDefault();
        if (plz.length !== 5) return;

        setStatus('loading');

        // Simulate network delay for better UX
        setTimeout(() => {
            const foundCity = cityData.find(c => c.zip === plz);
            if (foundCity) {
                setCity(foundCity);
                setStatus('success');
                // Auto open wizard after short delay
                setTimeout(() => {
                     openWizard('gas', { plz: plz, city: foundCity.name });
                }, 1000);
            } else {
                setStatus('error');
            }
        }, 600);
    };

    return (
        <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-gas-dark text-white">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/gas-order-hero.webp"
                    alt="Flüssiggas Lieferung"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gas-dark/90 to-gas-dark/60"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-gas/20 border border-gas/30 text-gas-light text-sm font-semibold mb-6 backdrop-blur-sm">
                        Neu: Der schnellste Weg zu Ihrem Angebot
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Flüssiggas bestellen <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gas-light to-white">
                            einfach wie nie.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Prüfen Sie jetzt die Verfügbarkeit in Ihrer Region und erhalten Sie sofort Ihr individuelles Angebot.
                    </p>

                    {/* Inline Wizard Box */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 max-w-lg mx-auto shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas to-gas-light transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                        <form onSubmit={checkPlz} className="relative">
                            <label htmlFor="inline-plz" className="block text-left text-sm font-medium text-gray-300 mb-2">
                                Postleitzahl eingeben
                            </label>
                            <div className="relative flex items-center">
                                <MapPin className="absolute left-4 text-gray-400 w-5 h-5" />
                                <input
                                    id="inline-plz"
                                    type="text"
                                    value={plz}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
                                        setPlz(v);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    placeholder="z.B. 23795"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gas/50 focus:bg-white/10 transition-all text-lg tracking-wide"
                                />
                                <button
                                    type="submit"
                                    disabled={plz.length !== 5 || status === 'loading' || status === 'success'}
                                    className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg font-bold flex items-center gap-2 transition-all ${
                                        plz.length === 5
                                            ? 'bg-gas hover:bg-gas-light text-white shadow-lg'
                                            : 'bg-white/5 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : status === 'success' ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <>
                                            Prüfen <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-red-400 text-sm mt-3 text-left flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                        Leider liefern wir noch nicht in dieses Gebiet.
                                    </motion.p>
                                )}
                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-green-400 text-sm mt-3 text-left flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Verfügbar in {city?.name}! Öffne Konfigurator...
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gas" /> Kostenlos & unverbindlich
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gas" /> Sofort-Angebot
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gas" /> Keine Datenweitergabe
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InlineWizardHero;
