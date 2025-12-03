import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight, Truck, User, Circle, Percent } from 'lucide-react';
import DeliveryMap from './DeliveryMap';

const GasOrderSection = ({ onCheckAvailability }) => {
    const [liters, setLiters] = useState(3000);
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');

    const handleCheck = () => {
        if (!plz || !/^(1[7-9]\d{3}|2\d{4})$/.test(plz)) {
            setPlzError('Bitte geben Sie eine gültige PLZ im Liefergebiet (17xxx-2xxxx) ein.');
            return;
        }
        setPlzError('');
        if (onCheckAvailability) {
            onCheckAvailability(plz, liters);
        }
    };

    return (
        <div id="gas">
            {/* 1. Hero Section (Lead Gen) */}
            <section className="relative bg-gas-dark pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Fallback & Background Image */}
                <div className="absolute inset-0 bg-gas-dark z-0">
                   <div className="absolute inset-0 bg-gas-dark/90 z-10"></div>
                   <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Flüssiggas Lieferung Norden" className="w-full h-full object-cover absolute inset-0 opacity-40 mix-blend-overlay" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Hero Content */}
                        <div className="text-white">
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full mb-6">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gas-light">Tagesaktuell verfügbar</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                                    Flüssiggas <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">im Norden.</span>
                                </h1>
                                <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                                    Wir beliefern Schleswig-Holstein, Hamburg und das nördliche Niedersachsen. Unabhängig, fair und ohne Vertragsbindung.
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-300">
                                    <div className="flex items-center gap-2"><Check className="text-green-400" size={18}/> Transparent</div>
                                    <div className="flex items-center gap-2"><Check className="text-green-400" size={18}/> Regional</div>
                                    <div className="flex items-center gap-2"><Check className="text-green-400" size={18}/> Zuverlässig</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Smart Input Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas-light to-blue-500"></div>
                            <h2 className="text-2xl font-bold text-white mb-6">Preis & Verfügbarkeit prüfen</h2>

                            <div className="space-y-6">
                                {/* Slider */}
                                <div>
                                    <div className="flex justify-between text-white font-medium mb-2">
                                        <label>Benötigte Menge</label>
                                        <span className="text-gas-light font-bold text-lg">{liters} Liter</span>
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
                                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                        <span>1.000 L</span>
                                        <span>6.000 L</span>
                                    </div>
                                </div>

                                {/* PLZ Input */}
                                <div>
                                    <label className="block text-white font-medium mb-2">Ihre Postleitzahl</label>
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
                                            className={`w-full bg-white/95 text-gray-900 text-lg font-bold p-4 pl-12 rounded-xl outline-none focus:ring-4 focus:ring-gas-light/50 transition-all ${plzError ? 'border-2 border-red-400' : ''}`}
                                            placeholder="z.B. 24103"
                                        />
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gas-dark" size={20}/>
                                    </div>
                                    {plzError && <p className="text-red-200 text-sm mt-2 font-bold flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-red-400 text-white flex items-center justify-center text-xs">!</span> {plzError}</p>}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCheck}
                                    className="w-full bg-gas-light hover:bg-white text-gas-dark font-extrabold text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 group"
                                >
                                    Verfügbarkeit prüfen <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-center text-xs text-gray-400">
                                    Kostenlos & Unverbindlich. Keine versteckten Kosten.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Trust Bar */}
            <section className="bg-white border-b border-gray-100 py-12 relative z-10 -mt-8 mx-4 lg:mx-8 rounded-2xl shadow-xl lg:shadow-none lg:mt-0 lg:rounded-none lg:border-none">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "TÜV geprüfte Sicherheit", desc: "Höchste Standards" },
                            { icon: Percent, title: "Keine Vertragsbindung", desc: "Nur Tagespreise zahlen" },
                            { icon: User, title: "Persönlicher Ansprechpartner", desc: "Direkt aus der Region" },
                            { icon: Truck, title: "Eigene Logistik", desc: "Flexibel & Schnell" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="p-3 bg-gas-light/30 text-gas rounded-full">
                                    <item.icon size={24} strokeWidth={2.5}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SEO Content Section */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
                                Warum wir anders sind als die Konzerne.
                            </h2>
                            <div className="prose prose-lg text-gray-600 space-y-6">
                                <p>
                                    Wenn Sie <strong className="text-gas">Flüssiggas kaufen</strong> möchten, stehen Sie oft vor der Wahl: Großer Konzern mit Vertragsbindung oder freier Händler. Wir bei gasmöller haben uns bewusst für die Unabhängigkeit entschieden. Das bedeutet für Sie: Keine versteckten Grundgebühren, keine Zählermieten und vor allem – Sie zahlen nur dann, wenn Sie auch wirklich bestellen.
                                </p>
                                <p>
                                    Unser Fokus liegt klar auf dem Norden. Wir kennen die Region zwischen Hamburg, Schleswig-Holstein und Mecklenburg wie unsere Westentasche. Durch unsere <strong className="text-gas">eigene Logistik</strong> und schlanke Strukturen können wir Ihnen oft einen deutlich attraktiveren Tagespreis anbieten, als es bei überregionalen Anbietern der Fall ist. Egal ob Sie Ihren <strong className="text-gas">Gastank befüllen</strong> lassen wollen oder eine Beratung benötigen – wir sind persönlich für Sie da.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-6 order-1 lg:order-2 mb-12 lg:mb-0">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Gasmöller LKW" className="w-full h-auto object-cover"/>
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8">
                                    <p className="text-white font-bold text-lg">Unterwegs für Sie im Norden.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Process Section */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">In 3 Schritten zum vollen Tank.</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Einfacher geht es nicht. Ohne Papierkram, direkt online.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-100 z-0"></div>

                        {[
                            { num: 1, title: "Verfügbarkeit prüfen", text: "Geben Sie Ihre PLZ oben ein und sehen Sie sofort, ob wir Sie beliefern können." },
                            { num: 2, title: "Angebot erhalten", text: "Wir senden Ihnen unseren besten Tagespreis direkt per E-Mail. Unverbindlich." },
                            { num: 3, title: "Lieferung", text: "Nach Bestätigung kommt unser Fahrer innerhalb von 5-10 Werktagen." }
                        ].map((step) => (
                            <div key={step.num} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white border-4 border-gas-light rounded-full flex items-center justify-center text-3xl font-extrabold text-gas mb-6 shadow-sm group-hover:border-gas group-hover:bg-gas group-hover:text-white transition-all duration-300">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed px-4">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button onClick={() => window.scrollTo({top: document.getElementById('gas').offsetTop, behavior: 'smooth'})} className="inline-flex items-center text-gas font-bold hover:text-gas-dark transition-colors">
                            Jetzt Preis anfragen <ArrowRight size={20} className="ml-2"/>
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Delivery Map Integration */}
            <DeliveryMap />
        </div>
    );
};

export default GasOrderSection;
