import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight, Truck, Heart, Coins } from 'lucide-react';
import DeliveryMap from './DeliveryMap';

const GasOrderSection = ({ onCheckAvailability }) => {
    const [liters, setLiters] = useState(3000);
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');

    const handleCheck = () => {
        if (!plz || plz.length !== 5) {
            setPlzError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
            return;
        }

        // Logic Fix: Check if PLZ starts with 18, 19, 2, or 3 (North Germany)
        const validPrefixes = ['18', '19', '2', '3'];
        const isValidRegion = validPrefixes.some(prefix => plz.startsWith(prefix));

        if (!isValidRegion) {
            setPlzError('Wir liefern leider noch nicht in dieses Gebiet.');
            // Fallback alert as requested if inline isn't enough, but inline is better.
            // window.alert("Wir liefern leider noch nicht in dieses Gebiet.");
            return;
        }

        setPlzError('');
        if (onCheckAvailability) {
            onCheckAvailability(plz, liters);
        }
    };

    return (
        <div id="gas" className="bg-white">
            {/* 1. Hero Layout */}
            <header className="relative bg-gas-dark pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gas-dark/90 z-10"></div>
                     <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Hintergrund Gas Lieferung Norddeutschland"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Content */}
                        <div className="text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-gas-light/20 border border-gas-light/30 text-gas-light font-bold text-sm mb-6">
                                    Der regionale Versorger
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                    Flüssiggas im Norden. <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Fair & Zuverlässig.</span>
                                </h1>
                                <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                                    Wir beliefern Privathaushalte und Gewerbe in Schleswig-Holstein, Hamburg, Niedersachsen und Mecklenburg-Vorpommern. Beste Preise, ohne Vertragsbindung.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold text-gray-300">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-full text-gas-light"><ShieldCheck size={20}/></div>
                                        <span>TÜV geprüfte Qualität</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-full text-gas-light"><MapPin size={20}/></div>
                                        <span>Aus der Region</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: The Glassmorphism Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas-light to-blue-500"></div>

                            <h2 className="text-2xl font-bold text-white mb-2">Liefergebiet prüfen</h2>
                            <p className="text-gray-300 text-sm mb-8">Prüfen Sie jetzt unverbindlich unsere Tagespreise.</p>

                            <div className="space-y-8">
                                {/* Slider Input */}
                                <div>
                                    <div className="flex justify-between text-white font-medium mb-4">
                                        <label>Benötigte Menge</label>
                                        <span className="text-2xl font-bold text-gas-light">{liters.toLocaleString()} <span className="text-sm font-normal text-white">Liter</span></span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="6000"
                                        step="100"
                                        value={liters}
                                        onChange={(e) => setLiters(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gas-light hover:accent-white transition-all"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                        <span>1.000 L</span>
                                        <span>6.000 L</span>
                                    </div>
                                </div>

                                {/* PLZ Input */}
                                <div className="relative">
                                    <label className="block text-white font-medium mb-2">Postleitzahl</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="plz"
                                            autoComplete="postal-code"
                                            maxLength="5"
                                            value={plz}
                                            onChange={(e) => {
                                                setPlz(e.target.value.replace(/[^0-9]/g, ''));
                                                if (plzError) setPlzError('');
                                            }}
                                            className={`w-full bg-white/5 border border-white/10 text-white text-xl font-bold p-4 pl-12 rounded-xl outline-none focus:bg-white/10 focus:border-gas-light transition-all placeholder:text-gray-500 ${plzError ? 'border-red-400 focus:border-red-400' : ''}`}
                                            placeholder="PLZ eingeben"
                                        />
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                    {plzError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-300 text-sm mt-3 font-medium flex items-center gap-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">!</div>
                                            {plzError}
                                        </motion.div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCheck}
                                    className="w-full bg-gas hover:bg-white hover:text-gas text-white font-bold text-lg py-5 rounded-xl shadow-lg shadow-gas/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                                >
                                    Jetzt Preis anfragen
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* 3. SEO Content: "Warum wir anders sind" */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Warum wir anders sind</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Bei gasmöller gibt es keine Hotlines mit Warteschleifen und keine versteckten Gebühren.
                            Wir sind Ihr direkter Draht zu günstiger Energie im Norden.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <Truck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Echte Regionalität</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Unsere Fahrer kennen die Straßen im Norden. Kurze Wege bedeuten für Sie: Schnellere Lieferung und weniger CO₂-Ausstoß.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                <Coins size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Keine Preisbindung</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Sie zahlen immer den aktuellen Tagespreis. Keine langen Verträge, keine Abo-Fallen. Sie bestellen, wenn der Preis für Sie stimmt.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Persönlicher Service</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Bei uns sprechen Sie mit Menschen, nicht mit Robotern. Unser Team in Schleswig-Holstein kümmert sich persönlich um Ihr Anliegen.
                            </p>
                        </div>
                    </div>

                    {/* Trust Bar Integration */}
                    <div className="mt-20 pt-10 border-t border-gray-100">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={32} className="text-gray-400" />
                                <span className="font-bold text-gray-500 text-lg">TÜV Nord</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check size={32} className="text-gray-400" />
                                <span className="font-bold text-gray-500 text-lg">DVFG Mitglied</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <MapPin size={32} className="text-gray-400" />
                                <span className="font-bold text-gray-500 text-lg">Standort Schleswig-Holstein</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Map Integration */}
            <DeliveryMap />
        </div>
    );
};

export default GasOrderSection;
