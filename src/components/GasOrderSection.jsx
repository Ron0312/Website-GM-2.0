import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight, Truck, Heart, Coins, Loader2, X } from 'lucide-react';
import DeliveryMap from './DeliveryMap';
import { getPlzError } from '../utils/validation';
import Hero from './Hero';

const GasOrderSection = ({ onCheckAvailability }) => {
    // Tank sizes: 1.2t = ~2700L, 2.1t = ~4850L, 2.9t = ~6400L
    const tankSizes = [
        { id: '1.2t', label: '1,2 t', volume: 2700 },
        { id: '2.1t', label: '2,1 t', volume: 4850 },
        { id: '2.9t', label: '2,9 t', volume: 6400 },
    ];

    const [selectedTank, setSelectedTank] = useState(tankSizes[0]);
    const [fillLevel, setFillLevel] = useState(30);
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    // Calculate required liters: (TankVolume * 0.85) * (1 - CurrentLevel/100)
    // 85% is the maximum fill level.
    const maxFill = selectedTank.volume * 0.85;
    const currentVolume = selectedTank.volume * (fillLevel / 100);
    // We want to fill up to 85%. So we need: maxFill - currentVolume.
    // Wait, simpler: We can fill UP TO 85%.
    // If current level is 30%, we can add 55% of the TOTAL volume.
    // Or just: (85 - fillLevel) % of volume.
    // If fillLevel > 85, required is 0 (or error). But let's assume valid range.
    const calculatedLiters = Math.max(0, Math.round(selectedTank.volume * ((85 - fillLevel) / 100)));

    const handleCheck = async (e) => {
        // Prevent default form submission if triggered by form
        if (e && e.preventDefault) e.preventDefault();

        const error = getPlzError(plz);
        if (error) {
            setPlzError(error);
            return;
        }

        setPlzError('');
        setIsChecking(true);

        // Simulate a small delay for better UX (so the user sees something is happening)
        await new Promise(resolve => setTimeout(resolve, 600));

        setIsChecking(false);
        if (onCheckAvailability) {
            // Pass the calculated liters AND the calculator state (tank + fill level)
            // so the Wizard can be pre-populated correctly.
            onCheckAvailability(plz, calculatedLiters, selectedTank, fillLevel);
        }
    };

    return (
        <div id="gas" className="bg-white">
            <Hero
                title={
                    <>
                        Flüssiggas im Norden. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Fair & Zuverlässig.</span>
                    </>
                }
                subtitle="Wir beliefern Privathaushalte und Gewerbe in Schleswig-Holstein, Hamburg, Niedersachsen und Mecklenburg-Vorpommern. Beste Preise, ohne Vertragsbindung."
                backgroundImage="/images/gas-order-background.jpg"
                badgeText="Der regionale Versorger"
                customButtons={<React.Fragment />}
            >
                {/* Right Column: The Glassmorphism Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas-light to-blue-500"></div>

                    <h2 className="text-2xl font-bold text-white mb-2">Liefergebiet prüfen</h2>
                    <p className="text-gray-300 text-sm mb-8">Erhalten Sie jetzt Ihr unverbindliches Angebot.</p>

                    <div className="space-y-6">
                        {/* Tank Size Selection */}
                        <div>
                            <label className="block text-white font-medium mb-3">Tankgröße</label>
                            <div className="grid grid-cols-3 gap-3">
                                {tankSizes.map((tank) => (
                                    <button
                                        key={tank.id}
                                        onClick={() => setSelectedTank(tank)}
                                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                            selectedTank.id === tank.id
                                                ? 'bg-gas-light text-gas-dark shadow-lg ring-2 ring-white/20'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        {tank.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fill Level Input */}
                        <div>
                            <div className="flex justify-between text-white font-medium mb-4">
                                <label>Aktueller Füllstand</label>
                                <span className="text-2xl font-bold text-gas-light">{fillLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="85"
                                step="1"
                                value={fillLevel}
                                onChange={(e) => setFillLevel(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gas-light hover:accent-white transition-all [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-gas-light"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                <span>0%</span>
                                <span>85%</span>
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-right text-sm text-gray-300 flex justify-between items-center">
                                <span>Liefermenge ca.:</span>
                                <strong className="text-white text-lg">{calculatedLiters.toLocaleString()} Liter</strong>
                            </div>
                        </div>

                        {/* PLZ Input */}
                        <form onSubmit={handleCheck} className="relative">
                            <label className="block text-white font-medium mb-2">Postleitzahl</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="plz"
                                    autoComplete="postal-code"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="5"
                                    value={plz}
                                    onChange={(e) => {
                                        setPlz(e.target.value.replace(/[^0-9]/g, ''));
                                        if (plzError) setPlzError('');
                                    }}
                                    className={`w-full bg-white/5 border border-white/10 text-white text-xl font-bold p-4 pl-12 rounded-xl outline-none focus:bg-white/10 focus:border-gas-light transition-all placeholder:text-gray-400/80 [&:-webkit-autofill]:transition-all [&:-webkit-autofill]:duration-[5000s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] ${plzError ? 'border-red-400 focus:border-red-400 pr-12' : ''}`}
                                    placeholder="PLZ eingeben"
                                />
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                {plzError && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        type="button"
                                        onClick={() => {
                                            setPlz('');
                                            setPlzError('');
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors z-10 p-1"
                                        aria-label="Eingabe löschen"
                                    >
                                        <div className="bg-red-500/20 rounded-full p-0.5">
                                            <X size={18} strokeWidth={2.5} />
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                            {plzError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-300 text-sm mt-3 font-medium flex items-center gap-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20 tracking-tight"
                                >
                                    <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">!</div>
                                    {plzError}
                                </motion.div>
                            )}
                        </form>

                        {/* CTA Button */}
                        <button
                            onClick={handleCheck}
                            disabled={isChecking}
                            className="w-full bg-gas hover:bg-white hover:text-gas text-white font-bold text-lg py-5 rounded-xl shadow-lg shadow-gas/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-80 disabled:cursor-wait"
                        >
                            {isChecking ? <Loader2 size={24} className="animate-spin" /> : (
                                <>
                                    Angebot anfordern
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </Hero>

             {/* SEO Content: Process */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">In 3 Schritten zum vollen Flüssiggastank</h2>
                        <p className="text-gray-600">Unkompliziert, transparent und schnell.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="relative group">
                            <div className="text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors">1</div>
                            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-gas mb-3">Angebot anfordern</h3>
                                <p className="text-gray-600 leading-relaxed">Geben Sie Ihre PLZ und die gewünschte Menge in unseren Rechner ein. Sie erhalten umgehend ein unverbindliches Angebot.</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="relative group">
                            <div className="text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors">2</div>
                            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-gas mb-3">Bestellung aufgeben</h3>
                                <p className="text-gray-600 leading-relaxed">Senden Sie die Anfrage ab. Wir bestätigen den Termin und den Preis. Keine versteckten Kosten, keine Vertragsbindung.</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="relative group">
                            <div className="text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors">3</div>
                            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold text-gas mb-3">Lieferung erhalten</h3>
                                <p className="text-gray-600 leading-relaxed">Unsere Fahrer füllen Ihren Flüssiggastank sicher und zuverlässig auf. Sie zahlen bequem per Rechnung nach der Lieferung.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* SEO Content: Quality/Safety Info */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                             <div className="absolute inset-0 bg-gradient-to-tr from-gas-dark/20 to-transparent pointer-events-none"></div>
                        <img src="/images/inspection-background.jpg" alt="Sicherheitsprüfung Flüssiggastank" width="1920" height="1080" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div>
                            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">DIN 51622</div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Geprüfte Qualität für Ihre Sicherheit</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Ihr Flüssiggas (Propan) unterliegt strengsten Qualitätskontrollen. Wir liefern ausschließlich Gas, das der DIN-Norm 51622 entspricht.
                                Das garantiert Ihnen einen hohen Brennwert und eine saubere Verbrennung, die Ihre Heizungsanlage schont und die Umwelt entlastet.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0"><Check size={16} /></div>
                                    <div>
                                        <span className="block text-gray-900 font-bold">Hoher Heizwert</span>
                                        <span className="text-sm text-gray-500">Effizientes Heizen spart Kosten.</span>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <div className="p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0"><Check size={16} /></div>
                                    <div>
                                        <span className="block text-gray-900 font-bold">Saubere Verbrennung</span>
                                        <span className="text-sm text-gray-500">Weniger Rückstände, längere Lebensdauer Ihrer Anlage.</span>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <div className="p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0"><Check size={16} /></div>
                                    <div>
                                        <span className="block text-gray-900 font-bold">Frostsicher</span>
                                        <span className="text-sm text-gray-500">Verdampft auch bei extremen Minustemperaturen zuverlässig.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Original Content: "Warum wir anders sind" */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Warum wir anders sind</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Bei gasmöller gibt es keine Hotlines mit Warteschleifen und keine versteckten Gebühren.
                            Wir sind Ihr direkter Draht zu günstiger Energie im Norden.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <Truck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Echte Regionalität</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Unsere Fahrer kennen die Straßen im Norden. Kurze Wege bedeuten für Sie: Schnellere Lieferung und weniger CO₂-Ausstoß.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                <Coins size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Keine Preisbindung</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Sie zahlen immer den aktuellen Tagespreis. Keine langen Verträge, keine Abo-Fallen. Sie bestellen, wenn der Preis für Sie stimmt.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
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
                    <div className="mt-20 pt-10 border-t border-gray-200/60">
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
