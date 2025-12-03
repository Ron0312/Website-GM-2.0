import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, MapPin, ArrowRight, Truck, User, Percent, Star, Clock, FileCheck, AlertTriangle } from 'lucide-react';
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
        <div id="gas" className="w-full">
            {/* 1. Hero Section (Lead Gen) */}
            {/* CRITICAL: bg-gas-dark is the fallback color if the image fails. */}
            <section className="relative bg-gas-dark pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-[800px] flex items-center">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                   <div className="absolute inset-0 bg-gas-dark/90 z-10"></div>
                   <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Flüssiggas Lieferung Hamburg Schleswig-Holstein"
                        className="w-full h-full object-cover absolute inset-0 opacity-40 mix-blend-overlay"
                   />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left: Hero Content */}
                        <div className="text-white">
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full mb-8">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gas-light">Tagespreise verfügbar</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                                    Flüssiggas <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">im Norden.</span>
                                </h1>
                                <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
                                    Ihr unabhängiger Partner für Schleswig-Holstein & Hamburg.
                                    Faire Tagespreise, eigene Logistik und persönlich für Sie da.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-gray-300">
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <div className="bg-green-500/20 p-1.5 rounded-full"><Check className="text-green-400" size={16}/></div>
                                        <span>TÜV geprüfte Sicherheit</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <div className="bg-green-500/20 p-1.5 rounded-full"><Check className="text-green-400" size={16}/></div>
                                        <span>Web3Forms Secured</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                        <div className="bg-green-500/20 p-1.5 rounded-full"><Check className="text-green-400" size={16}/></div>
                                        <span>Regional & Unabhängig</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Smart Input Card (Glassmorphism) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gas-light via-blue-400 to-gas-dark"></div>

                            <h2 className="text-3xl font-bold text-white mb-2">Verfügbarkeit prüfen</h2>
                            <p className="text-blue-100 mb-8 text-sm">Prüfen Sie kostenlos, ob wir Sie beliefern können.</p>

                            <div className="space-y-8">
                                {/* Slider */}
                                <div>
                                    <div className="flex justify-between text-white font-medium mb-3">
                                        <label className="text-sm uppercase tracking-wide opacity-90">Jahresbedarf</label>
                                        <span className="text-white font-bold text-xl bg-white/20 px-3 py-1 rounded-lg">{liters.toLocaleString()} Liter</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="6000"
                                        step="100"
                                        value={liters}
                                        onChange={(e) => setLiters(parseInt(e.target.value))}
                                        className="w-full h-3 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gas-light transition-all"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                                        <span>Kleinmenge</span>
                                        <span>Großabnehmer</span>
                                    </div>
                                </div>

                                {/* PLZ Input - IMPORTANT: autofill attributes */}
                                <div>
                                    <label className="block text-white text-sm uppercase tracking-wide opacity-90 mb-3">Ihre Postleitzahl</label>
                                    <div className="relative group">
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
                                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                                            className={`w-full bg-white/90 hover:bg-white text-gray-900 text-xl font-bold p-5 pl-14 rounded-2xl outline-none focus:ring-4 focus:ring-gas-light/50 transition-all shadow-lg ${plzError ? 'border-2 border-red-400' : ''}`}
                                            placeholder="z.B. 24103"
                                        />
                                        <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gas-dark group-focus-within:text-gas-light transition-colors" size={24}/>
                                    </div>
                                    {plzError && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                                            <p className="text-red-200 text-sm font-bold flex items-center gap-2 bg-red-500/20 p-2 rounded-lg border border-red-500/30">
                                                <AlertTriangle size={16} /> {plzError}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={handleCheck}
                                    className="w-full bg-gas-light hover:bg-white text-gas-dark font-extrabold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Verfügbarkeit prüfen</span>
                                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform relative z-10" />
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>

                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                        Datenschutzkonform & Unverbindlich
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Trust Bar (The "Proof") */}
            <section className="bg-white border-b border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "TÜV geprüfte Sicherheit", desc: "Regelmäßige Kontrollen" },
                            { icon: Percent, title: "Keine Vertragsbindung", desc: "Volle Flexibilität" },
                            { icon: User, title: "Persönlicher Ansprechpartner", desc: "Kein Call-Center" },
                            { icon: Truck, title: "Eigene Logistik", desc: "Zuverlässige Lieferung" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group">
                                <div className="p-4 bg-gas-light/20 text-gas mb-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <item.icon size={32} strokeWidth={2}/>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SEO Content & Value Proposition */}
            <section className="bg-gray-50 py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-6">
                            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm text-gas font-bold text-sm mb-6 border border-gray-100">
                                Unabhängig & Regional
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                                Warum wir anders sind als die Konzerne.
                            </h2>
                            <article className="prose prose-lg text-gray-600 space-y-6">
                                <p>
                                    Als Hausbesitzer im Norden kennen Sie das: Viele Anbieter locken mit günstigen Einstiegspreisen, binden Sie dann aber mit langjährigen Verträgen. Wenn Sie bei uns <strong className="text-gas font-bold">Flüssiggas kaufen</strong>, erleben Sie den Unterschied. Wir sind ein familiengeführtes Unternehmen, das auf Unabhängigkeit setzt. Das bedeutet: Keine versteckten Gebühren, keine Mietverträge für Zähler, die Sie nicht brauchen.
                                </p>
                                <p>
                                    Unser Liefergebiet erstreckt sich über Hamburg und Schleswig-Holstein. Weil wir über eine <strong className="text-gas font-bold">eigene Logistik</strong> verfügen, können wir flexibel auf Ihre Wünsche reagieren. Möchten Sie Ihren <strong className="text-gas font-bold">Gastank befüllen</strong> lassen? Bei uns bekommen Sie den fairen Tagespreis – transparent und ohne Wenn und Aber. Wir sind überzeugt: Gute Geschäfte macht man unter Menschen, nicht mit anonymen Hotlines.
                                </p>
                            </article>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                                    <Star className="text-yellow-400 fill-yellow-400" size={20}/> 4.9/5 Kundenzufriedenheit
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                                    <MapPin className="text-red-500" size={20}/> Standort: Hamburg/SH
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 relative">
                            {/* Image Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gastank Wartung" className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"/>
                                <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Logistik LKW" className="rounded-2xl shadow-xl w-full h-64 object-cover"/>
                            </div>
                            {/* Floating Quote */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl max-w-xs text-center border border-gray-100">
                                <p className="text-gray-900 font-serif italic mb-4">"Endlich ein Anbieter, bei dem man einfach anrufen kann und kompetente Antworten bekommt."</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Kunde" className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-900">Michael S.</p>
                                        <p className="text-xs text-gray-500">Kunde aus Kiel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Process ("So funktioniert es") */}
            <section className="bg-white py-24 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">In 3 Schritten zum vollen Tank.</h2>
                        <p className="text-xl text-gray-500">
                            Wir haben den Bestellprozess so einfach wie möglich gemacht.
                            Kein Papierkram, keine Wartezeit am Telefon.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-gray-200 via-gas-light to-gray-200 z-0"></div>

                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-white border-4 border-gas-light rounded-2xl flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform duration-300 mb-8">
                                <Star className="text-gas" size={32} />
                            </div>
                            <div className="bg-gray-50 px-4 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Schritt 1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Verfügbarkeit prüfen</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Geben Sie oben Ihre <span className="font-bold text-gas">Postleitzahl</span> ein. Unser System prüft sofort, ob Sie in unserem Liefergebiet wohnen.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-gas text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:-translate-y-2 transition-transform duration-300 mb-8 transform rotate-3">
                                <FileCheck size={32} />
                            </div>
                            <div className="bg-gray-50 px-4 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Schritt 2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Angebot erhalten</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Sie erhalten unverbindlich unseren <span className="font-bold text-gas">aktuellen Tagespreis</span> per E-Mail. Transparend und fair.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-white border-4 border-gas-light rounded-2xl flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform duration-300 mb-8">
                                <Truck className="text-gas" size={32} />
                            </div>
                            <div className="bg-gray-50 px-4 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Schritt 3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lieferung</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Nach Ihrer Bestätigung planen wir die Tour. Die Lieferung erfolgt zuverlässig innerhalb von <span className="font-bold text-gas">5-10 Werktagen</span>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                         <button
                            onClick={() => window.scrollTo({top: document.getElementById('gas').offsetTop, behavior: 'smooth'})}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            Jetzt Preis anfragen <ArrowRight size={20}/>
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Delivery Area (Integration) - Dark Background */}
            <div className="bg-gray-900 py-12">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white">Unser Liefergebiet</h2>
                    <p className="text-gray-400 mt-2">Wir sind im ganzen Norden für Sie unterwegs.</p>
                 </div>
                 <DeliveryMap />
            </div>

             {/* Helper for missing icon in Hero if needed, but imported above */}
             <div className="hidden"><Clock /> <AlertTriangle /></div>
        </div>
    );
};

export default GasOrderSection;
