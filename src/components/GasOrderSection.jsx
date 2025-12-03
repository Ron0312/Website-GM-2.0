import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
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
        setPlzError('');
        if (onCheckAvailability) {
            onCheckAvailability(plz, liters);
        }
    };

    return (
        <div id="gas">
            <header className="relative bg-gas-dark pt-24 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gas-dark/90 z-10"></div>
                     <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Hintergrund Gas" className="w-full h-full object-cover absolute inset-0" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Content */}
                        <div className="text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                                    Flüssiggas bestellen – <br/>
                                    <span className="text-gas-light">Transparent & Regional.</span>
                                </h1>
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    Wir versorgen den Norden mit Energie. Unabhängig von Konzernen, fair im Preis und immer persönlich für Sie da. Fordern Sie jetzt Ihr unverbindliches Angebot an.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/10 rounded-full text-gas-light"><ShieldCheck size={20}/></div>
                                        <span>TÜV geprüft</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/10 rounded-full text-gas-light"><Check size={20}/></div>
                                        <span>Web3Forms Secured</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/10 rounded-full text-gas-light"><MapPin size={20}/></div>
                                        <span>Regional im Norden</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: The Smart Input Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas-light to-blue-500"></div>

                            <h2 className="text-2xl font-bold text-white mb-6">Verfügbarkeit prüfen</h2>

                            <div className="space-y-6">
                                {/* Slider Input */}
                                <div>
                                    <div className="flex justify-between text-white font-medium mb-2">
                                        <label>Jahresbedarf</label>
                                        <span className="text-gas-light font-bold">{liters} Liter</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="6000"
                                        step="100"
                                        value={liters}
                                        onChange={(e) => setLiters(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gas-light"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>1.000 L</span>
                                        <span>6.000 L</span>
                                    </div>
                                </div>

                                {/* PLZ Input */}
                                <div>
                                    <label className="block text-white font-medium mb-2">Ihre Postleitzahl</label>
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
                                        className={`w-full bg-white/90 text-gray-900 text-lg font-bold p-4 rounded-xl outline-none focus:ring-4 focus:ring-gas-light/50 transition-all ${plzError ? 'border-2 border-red-400' : ''}`}
                                        placeholder="12345"
                                    />
                                    {plzError && <p className="text-red-300 text-sm mt-2 font-bold flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-red-400 text-white flex items-center justify-center text-xs">!</span> {plzError}</p>}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCheck}
                                    className="w-full bg-gas-light hover:bg-white hover:text-gas-dark text-white font-bold text-xl py-4 rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Verfügbarkeit prüfen <ArrowRight size={24} />
                                </button>

                                <p className="text-center text-xs text-gray-400">
                                    Kostenlos & Unverbindlich. Ihre Daten sind sicher.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>
            <DeliveryMap />
        </div>
    );
};

export default GasOrderSection;
