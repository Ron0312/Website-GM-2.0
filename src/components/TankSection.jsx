import React, { useState, useMemo, useEffect, useRef } from 'react';
import TankCard from './TankCard';
import Hero from './Hero';
import { tankDetails } from '../data/tanks';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, RefreshCw, Star } from 'lucide-react';

const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true, isPageTitle = false, tankFilter, onFilterChange, hideHero = false }) => {
    const [filter, setFilter] = useState('oberirdisch');
    const [condition, setCondition] = useState('new'); // 'new' | 'used'
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    // Update filter when tankFilter prop changes (from navigation)
    useEffect(() => {
        if (tankFilter) {
            setFilter(tankFilter);
            setActiveIndex(0); // Reset scroll index when filter changes
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }
        }
    }, [tankFilter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (onFilterChange) {
            onFilterChange(newFilter);
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.offsetWidth;
            const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || width;
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(newIndex);
        }
    };

    const getTankInfo = (type, condition) => {
        if (condition === 'used') {
             const baseInfo = {
                oberirdisch: {
                    title: "Geprüfte Qualität zum Bestpreis",
                    description: "Unsere regenerierten Tanks sind technisch neuwertig (sandgestrahlt, geprüft, neu lackiert). Sie sparen bis zu 30% gegenüber dem Neupreis.",
                    benefits: ["ca. 30% Preisvorteil", "Inkl. TÜV-Prüfbescheinigung", "Sofort verfügbar"],
                    color: "text-orange-600"
                },
                halboberirdisch: {
                    title: "Nachhaltig & Unauffällig",
                    description: "Der ideale Kompromiss als nachhaltige Gebraucht-Variante. Weniger sichtbar im Garten, massiv günstiger in der Anschaffung.",
                    benefits: ["Ressourcenschonend (CO2)", "Halb verdeckt eingebaut", "Geprüfte Sicherheit"],
                    color: "text-orange-600"
                },
                unterirdisch: {
                    title: "Die rare Gelegenheit",
                    description: "Gebrauchte Erdtanks sind selten und begehrt. Mit neuer Epoxidharz-Isolierung bieten sie Schutz für Jahrzehnte zum kleinen Preis.",
                    benefits: ["Neue Epoxid-Isolierung", "Unsichtbar im Garten", "Top Preis-Leistung"],
                    color: "text-orange-600"
                }
            };
            return baseInfo[type] || baseInfo['oberirdisch'];
        }

        const baseInfo = {
            oberirdisch: {
                title: "Der sichtbare Klassiker",
                description: "Oberirdische Tanks sind die wirtschaftlichste Lösung. Einfache Aufstellung ohne Erdarbeiten.",
                benefits: ["Günstigste Installation", "Keine Erdarbeiten", "Jederzeit zugänglich"],
                color: "text-gray-900"
            },
            halboberirdisch: {
                title: "Die goldene Mitte",
                description: "Nutzt die Vorteile beider Welten. Nur der Deckel schaut heraus, der Rest liegt sicher im Sandbett.",
                benefits: ["Kaum sichtbar", "Reduzierte Erdarbeiten", "Perfekter Kompromiss"],
                color: "text-blue-900"
            },
            unterirdisch: {
                title: "Die unsichtbare Lösung",
                description: "Verschwindet komplett im Garten. Ideal für Neubauten und ästhetisch anspruchsvolle Grundstücke.",
                benefits: ["100% Unsichtbar", "Maximale Gartennutzung", "Frostsicher"],
                color: "text-green-900"
            }
        };
        return baseInfo[type];
    };

    const currentInfo = getTankInfo(filter, condition);

    const visibleTanks = useMemo(() => {
        const filtered = tankDetails.filter(t => t.type === filter && t.condition === condition);
        return filtered.map(t => ({
                type: t.type,
                size: t.volume,
                capacity: t.capacity,
                name: t.name.split('(')[0].trim(),
                usage: t.features[0],
                highlight: t.capacity === '2,1 t',
                length: t.dimensions.split('x')[0].trim(),
                diameter: t.dimensions.split('x')[1].replace('m', '').trim() + ' m',
                weight: t.weight,
                slug: t.slug
            }));
    }, [filter, condition]);

    return (
        <section className="bg-white relative overflow-hidden" id="tanks">

            {/* Background Flow Element */}
            <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-gray-50/50 to-white -z-10 clip-path-slant"></div>

            {/* Standardized Hero Section */}
            {!hideHero && (
                <Hero
                    setActiveSection={setActiveSection}
                    openWizard={openWizard}
                    title="Flüssiggastank kaufen"
                    subtitle="Preise für 2700l, 4850l & 6400l. Oberirdisch & Unterirdisch. Neu & Gebraucht."
                    backgroundImage="/images/tank-section-hero.webp"
                    badgeText="Sofort verfügbar & Installation durch Fachpartner"
                />
            )}

            <div className={`max-w-7xl mx-auto px-4 ${hideHero ? 'pt-10 pb-24' : 'py-24'}`}>

                {/* Header Area */}
                <div className="text-center mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-gas font-bold tracking-[0.2em] uppercase text-xs mb-4">Unsere Tankmodelle</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 tracking-tight">Wählen Sie Ihre Bauart.</h3>

                        {/* Condition Toggle (New vs Used) */}
                        <div className="flex justify-center mb-10">
                            <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative shadow-inner">
                                <motion.div
                                    className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm z-0"
                                    initial={false}
                                    animate={{
                                        x: condition === 'new' ? 0 : '100%',
                                        width: '50%'
                                    }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    style={{ left: 6, width: 'calc(50% - 6px)' }}
                                />
                                <button
                                    onClick={() => setCondition('new')}
                                    className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold transition-colors w-40 flex items-center justify-center gap-2 ${condition === 'new' ? 'text-gas' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Star size={16} className={condition === 'new' ? 'fill-current' : ''} /> Neuware
                                </button>
                                <button
                                    onClick={() => setCondition('used')}
                                    className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold transition-colors w-40 flex items-center justify-center gap-2 ${condition === 'used' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <RefreshCw size={16} /> Gebraucht
                                </button>
                            </div>
                        </div>

                        {/* Type Filter Switcher */}
                        <div className="overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide flex justify-start md:justify-center">
                            <div className="inline-flex bg-white border border-gray-100 shadow-sm p-1.5 rounded-full relative whitespace-nowrap min-w-min mx-auto">
                                <motion.div
                                    className="absolute top-1.5 bottom-1.5 bg-gray-900 rounded-full shadow-sm z-0"
                                    initial={false}
                                    animate={{
                                        x: filter === 'oberirdisch' ? 0 : filter === 'halboberirdisch' ? '100%' : '200%',
                                        width: '33.333%'
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    style={{ left: 6, width: 'calc(33.333% - 4px)' }}
                                />
                                {['oberirdisch', 'halboberirdisch', 'unterirdisch'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleFilterChange(t)}
                                        className={`relative z-10 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-colors min-w-[120px] md:w-40 capitalize ${
                                            filter === t ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Description & Benefits - "Floating" Text */}
                <div className="max-w-4xl mx-auto mb-12 md:mb-20 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter + condition}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h4 className={`text-2xl font-bold mb-4 ${currentInfo.color}`}>
                                {currentInfo.title}
                                {condition === 'used' && <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full align-middle">Gebraucht</span>}
                            </h4>
                            <p className="text-xl text-gray-500 mb-8 leading-relaxed font-light">{currentInfo.description}</p>

                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                {currentInfo.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${condition === 'used' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* The Tank "Stage" Grid */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-32 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 pb-8 md:pb-0 scrollbar-hide"
                >
                    {visibleTanks.length > 0 ? (
                        visibleTanks.map((tank, i) => (
                            <div key={i} className="min-w-[75vw] md:min-w-0 snap-center pl-2 first:pl-0">
                                <TankCard
                                    tank={tank}
                                    type={filter}
                                    onContact={() => openWizard ? openWizard('tank') : null}
                                    setActiveSection={setActiveSection}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
                            <p>Derzeit keine Modelle in dieser Kategorie verfügbar.</p>
                            <button onClick={() => setCondition('new')} className="text-gas font-bold mt-2 hover:underline">Zu den neuen Tanks wechseln</button>
                        </div>
                    )}
                </div>

                {/* Mobile Pagination Dots */}
                <div className="flex justify-center gap-2 mb-24 md:hidden">
                    {visibleTanks.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-gas' : 'w-2 bg-gray-200'}`}
                        />
                    ))}
                </div>

                {/* Technical Overview Table */}
                {showTechnicalOverview && (
                    <div className="mt-8 md:mt-32 max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-8">
                                <div>
                                    <h4 className="font-bold text-2xl text-gray-900 mb-2">Technische Daten</h4>
                                    <p className="text-gray-500">Alle Maße und Gewichte im direkten Vergleich.</p>
                                </div>
                                <button onClick={() => window.open('/downloads/datenblatt.pdf', '_blank')} className="text-gas font-bold text-sm flex items-center hover:underline mt-4 md:mt-0">
                                    PDF herunterladen <ArrowRight size={16} className="ml-2"/>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-xs text-gray-600 uppercase tracking-wider font-bold">
                                        <tr>
                                            <th className="py-4 pr-8">Modell</th>
                                            <th className="py-4 pr-8">Maße (L x H)</th>
                                            <th className="py-4 pr-8">Gewicht</th>
                                            <th className="py-4 pr-8">Leistung</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 font-medium divide-y divide-gray-100">
                                        <tr className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4 pr-8 font-bold text-gray-900">1,2 t (2700 Liter)</td>
                                            <td className="py-4 pr-8">2.500 x 1.250 mm</td>
                                            <td className="py-4 pr-8">~ 550 kg</td>
                                            <td className="py-4 pr-8 text-gas">35 kW</td>
                                        </tr>
                                        <tr className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4 pr-8 font-bold text-gray-900">2,1 t (4850 Liter)</td>
                                            <td className="py-4 pr-8">4.300 x 1.250 mm</td>
                                            <td className="py-4 pr-8">~ 980 kg</td>
                                            <td className="py-4 pr-8 text-gas">60 kW</td>
                                        </tr>
                                        <tr className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4 pr-8 font-bold text-gray-900">2,9 t (6400 Liter)</td>
                                            <td className="py-4 pr-8">5.500 x 1.250 mm</td>
                                            <td className="py-4 pr-8">~ 1.300 kg</td>
                                            <td className="py-4 pr-8 text-gas">90 kW</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                         {/* Integrated Service Links - Adjusted */}
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                             <a href="/wissen/tank-entsorgen" onClick={(e) => { e.preventDefault(); setActiveSection('wissen/tank-entsorgen'); }} className="group block p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    Alttank entsorgen?
                                    <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gas"/>
                                </h4>
                                <p className="text-sm text-gray-500">Wir kümmern uns um die fachgerechte Stilllegung und Abholung.</p>
                             </a>
                             <a href="/fluessiggas-bestellen" className="w-full text-left group block p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gas">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    Gas bestellen
                                    <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gas"/>
                                </h4>
                                <p className="text-sm text-gray-500">Prüfen Sie unseren aktuellen Tagespreis für Flüssiggas.</p>
                             </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TankSection;
