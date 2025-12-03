import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight, Truck, Heart, Coins, Info, TrendingDown, Clock, ThumbsUp } from 'lucide-react';
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
            return;
        }

        setPlzError('');
        if (onCheckAvailability) {
            onCheckAvailability(plz, liters);
        }
    };

    return (
        <div id="gas" className="bg-white">
            {/* 1. Hero Layout - Matching Landing Page Style */}
            <header className="relative bg-white pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Image with Lighter Overlay (Source of Truth from Hero.jsx) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-900/20 z-10"></div>
                     <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Flüssiggas Lieferung Norddeutschland Landschaft"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Content */}
                        <div className="text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm mb-6 shadow-sm">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Tagesaktuell günstig
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                                    Flüssiggas <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">im Norden.</span>
                                </h1>
                                <p className="text-xl text-gray-100 mb-8 leading-relaxed max-w-lg font-medium drop-shadow-md">
                                    Zuverlässige Belieferung für Privat und Gewerbe.
                                    Bestellen Sie Ihr Flüssiggas direkt beim regionalen Marktführer – ohne Vertragsbindung.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold text-gray-100">
                                    <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                        <ShieldCheck size={20} className="text-green-400"/>
                                        <span>TÜV geprüfte Qualität</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                        <MapPin size={20} className="text-blue-400"/>
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
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-300"></div>

                            <h2 className="text-2xl font-bold text-white mb-2">Liefergebiet & Preis prüfen</h2>
                            <p className="text-gray-200 text-sm mb-8">Unverbindlich anfragen. Wir antworten sofort.</p>

                            <div className="space-y-8">
                                {/* Slider Input */}
                                <div>
                                    <div className="flex justify-between text-white font-medium mb-4">
                                        <label>Benötigte Menge</label>
                                        <span className="text-2xl font-bold text-cyan-200">{liters.toLocaleString()} <span className="text-sm font-normal text-white">Liter</span></span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="6000"
                                        step="100"
                                        value={liters}
                                        onChange={(e) => setLiters(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-300 hover:accent-white transition-all"
                                    />
                                    <div className="flex justify-between text-xs text-gray-300 mt-2 font-medium">
                                        <span>1.000 L</span>
                                        <span>6.000 L</span>
                                    </div>
                                </div>

                                {/* PLZ Input - High End Styling */}
                                <div className="relative group">
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
                                            className={`w-full bg-white/90 border-2 border-transparent text-gray-900 text-xl font-bold p-4 pl-12 rounded-xl outline-none focus:bg-white focus:border-cyan-400 focus:shadow-lg transition-all placeholder:text-gray-400 ${plzError ? 'border-red-400 focus:border-red-400 bg-red-50' : ''}`}
                                            placeholder="z.B. 20099"
                                        />
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-600 transition-colors" size={20} />
                                    </div>
                                    {plzError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white text-sm mt-3 font-medium flex items-center gap-2 bg-red-500/80 backdrop-blur-sm p-3 rounded-lg border border-red-400/50 shadow-sm"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-white text-red-600 flex items-center justify-center text-xs font-bold shrink-0">!</div>
                                            {plzError}
                                        </motion.div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCheck}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg py-5 rounded-xl shadow-lg shadow-blue-900/30 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                                >
                                    Jetzt Preis berechnen
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-center text-xs text-gray-300 mt-4">Kostenlos & unverbindlich. Ihre Daten sind sicher.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* 3. High-End SEO Content Section */}
            <article className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Intro Text */}
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Warum gasmöller?</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2 mb-6">Anders als die großen Konzerne.</h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Wir sind ein unabhängiges Familienunternehmen aus dem Norden. Bei uns zahlen Sie keine "Konzern-Aufschläge", sondern faire Marktpreise.
                        </p>
                    </div>

                    {/* USPs Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                <TrendingDown size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Tagesaktuelle Bestpreise</h3>
                                <p className="text-gray-600">
                                    Unsere Preise richten sich direkt nach dem Börsenkurs. Wenn der Markt fällt, geben wir den Vorteil sofort an Sie weiter.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Schnelle Lieferung</h3>
                                <p className="text-gray-600">
                                    Dank eigener Fahrzeugflotte und lokalen Lagern sind wir oft schneller als die Konkurrenz. Notdienst im Winter inklusive.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                                <ThumbsUp size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Keine Vertragsbindung</h3>
                                <p className="text-gray-600">
                                    Sie bestellen, wann Sie wollen. Wir zwingen Sie in keine langfristigen Abnahmeverträge. Volle Freiheit für Ihren Tank.
                                </p>
                            </div>
                        </div>
                         <div className="flex gap-6 items-start p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                <Heart size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Persönliche Ansprechpartner</h3>
                                <p className="text-gray-600">
                                    Kein Callcenter im Ausland. Unser Team sitzt in Schleswig-Holstein und kennt die Gegebenheiten vor Ort.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content Blocks for SEO */}
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">Flüssiggas bestellen: Worauf Sie achten sollten</h3>
                        <p>
                            Der Kauf von Flüssiggas (Propan) ist Vertrauenssache. Viele Kunden in Deutschland sind noch immer in alten Mietverträgen gefangen, die sie an einen einzigen Lieferanten binden – oft zu überhöhten Preisen.
                            <strong>gasmöller</strong> steht für eine neue Generation der Energieversorgung: Transparent, fair und digital.
                        </p>

                        <h4 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Wann ist der beste Zeitpunkt zum Kauf?</h4>
                        <p>
                            Flüssiggaspreise unterliegen saisonalen Schwankungen. Traditionell sind die Preise in den Sommermonaten (Mai bis August) oft etwas niedriger als im Winter, da die globale Nachfrage nach Heizenenergie sinkt.
                            Dennoch kann es auch im Winter attraktive Zeitfenster geben. Nutzen Sie unseren Preisrechner oben, um den aktuellen Tagespreis für Ihre Region unverbindlich zu prüfen.
                        </p>

                        <h4 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Unser Liefergebiet im Detail</h4>
                        <p>
                            Wir sind spezialisiert auf Norddeutschland. Kurze Wege sind nicht nur gut für den Preis, sondern auch für die Umwelt. Unser Kerngebiet umfasst:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0 my-8">
                            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"><Check size={18} className="text-green-500"/> Schleswig-Holstein (komplett)</li>
                            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"><Check size={18} className="text-green-500"/> Hamburg & Großraum</li>
                            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"><Check size={18} className="text-green-500"/> Nord-Niedersachsen</li>
                            <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"><Check size={18} className="text-green-500"/> Westliches Mecklenburg-Vorpommern</li>
                        </ul>
                    </div>

                    {/* Trust Bar Integration */}
                    <div className="mt-24 pt-10 border-t border-gray-200">
                         <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wider mb-8">Geprüfte Sicherheit</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
                            {/* Reusing existing SVGs or lucide icons if no images available */}
                            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                                <ShieldCheck size={40} className="text-gray-600" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800 leading-none">TÜV NORD</span>
                                    <span className="text-xs text-gray-500">Geprüfte Anlage</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                                <Check size={40} className="text-gray-600" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800 leading-none">DVFG</span>
                                    <span className="text-xs text-gray-500">Mitglied im Verband</span>
                                </div>
                            </div>
                             <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                                <Truck size={40} className="text-gray-600" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800 leading-none">GGVSEB</span>
                                    <span className="text-xs text-gray-500">Konform</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* 4. Map Integration */}
            <DeliveryMap />
        </div>
    );
};

export default GasOrderSection;
