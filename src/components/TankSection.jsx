import React, { useState, useMemo, useEffect } from 'react';
import TankCard from './TankCard';
import EnergyCalculator from './EnergyCalculator';
import Hero from './Hero';
import { tankDetails } from '../data/tanks';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true, isPageTitle = false, tankFilter, onFilterChange }) => {
    const [filter, setFilter] = useState('oberirdisch');

    // Update filter when tankFilter prop changes (from navigation)
    useEffect(() => {
        if (tankFilter) {
            setFilter(tankFilter);
        }
    }, [tankFilter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (onFilterChange) {
            onFilterChange(newFilter);
        }
    };

    const tankInfo = {
        oberirdisch: {
            title: "Der sichtbare Klassiker",
            description: "Oberirdische Flüssiggastanks sind die meistgewählte Variante. Sie lassen sich einfach aufstellen, erfordern keine Erdarbeiten und sind kostengünstig in der Installation.",
            benefits: ["Günstige Anschaffung", "Schnelle Installation", "Einfache Wartung"],
            color: "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 border-gray-700 shadow-2xl",
            iconColor: "text-green-400",
            titleColor: "text-white",
            textColor: "text-gray-300",
            benefitClass: "bg-white/10 backdrop-blur text-white border-white/20"
        },
        halboberirdisch: {
            title: "Die goldene Mitte",
            description: "Halboberirdische Flüssiggastanks werden zur Hälfte im Erdreich versenkt. Sie sind weniger sichtbar als oberirdische Flüssiggastanks und erfordern weniger Erdarbeiten als komplett unterirdische Flüssiggastanks.",
            benefits: ["Weniger sichtbar", "Kompromisslösung", "Gute Zugänglichkeit"],
            color: "bg-blue-50 border-blue-100",
            iconColor: "text-blue-500",
            titleColor: "text-gray-900",
            textColor: "text-gray-600",
            benefitClass: "bg-white text-gray-700 border-gray-100"
        },
        unterirdisch: {
            title: "Die unsichtbare Lösung",
            description: "Unterirdische Flüssiggastanks verschwinden komplett unter der Erde. Nur der Domschachtdeckel bleibt sichtbar – ideal für gepflegte Gärten und maximale Raumnutzung.",
            benefits: ["Nicht sichtbar", "Maximale Gartennutzung", "Gut geschützt"],
            color: "bg-green-50 border-green-100",
            iconColor: "text-green-500",
            titleColor: "text-gray-900",
            textColor: "text-gray-600",
            benefitClass: "bg-white text-gray-700 border-gray-100"
        }
    };

    const currentInfo = tankInfo[filter];

    const visibleTanks = useMemo(() => {
        return tankDetails
            .filter(t => t.type === filter)
            .map(t => ({
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
    }, [filter]);

    return (
        <section className="bg-white" id="tanks">
            {/* Standardized Hero Section */}
            <Hero
                setActiveSection={setActiveSection}
                openWizard={openWizard}
                title="Flüssiggastank kaufen"
                subtitle="Preise für 2700l, 4850l & 6400l. Oberirdisch & Unterirdisch. Neu & Gebraucht."
                backgroundImage="/images/tank-section-hero.webp"
                badgeText="Sofort verfügbar & Installation durch Fachpartner"
                // No custom buttons => uses default Tank Kaufen / Flüssiggas bestellen
            />

            <div className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">Flüssiggastank 1,2t - 2,9t</h2>
                    <h3 className="text-4xl font-extrabold text-text mb-8">Flüssiggastank kaufen: Unser Sortiment</h3>

                    {/* Visual Selection Area - Upgraded Toggle */}
                    <div className="flex justify-center">
                        <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex relative">
                            {/* Sliding Background */}
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm z-0"
                                initial={false}
                                animate={{
                                    x: filter === 'oberirdisch' ? 0 : filter === 'halboberirdisch' ? '100%' : '200%',
                                    width: '33.333%'
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{ left: 6, width: 'calc(33.333% - 4px)' }}
                            />

                            <button
                                onClick={() => handleFilterChange('oberirdisch')}
                                className={`relative z-10 px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-colors w-32 md:w-40 ${
                                    filter === 'oberirdisch' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Oberirdisch
                            </button>
                            <button
                                onClick={() => handleFilterChange('halboberirdisch')}
                                className={`relative z-10 px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-colors w-32 md:w-40 ${
                                    filter === 'halboberirdisch' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Halboberirdisch
                            </button>
                            <button
                                onClick={() => handleFilterChange('unterirdisch')}
                                className={`relative z-10 px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-colors w-32 md:w-40 ${
                                    filter === 'unterirdisch' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Unterirdisch
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Block - Dynamic Content based on Filter */}
                <div className="max-w-3xl mx-auto mb-12 min-h-[300px]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className={`rounded-2xl p-8 border ${currentInfo.color} text-center shadow-lg`}
                        >
                            <h4 className={`text-2xl font-bold mb-4 ${currentInfo.titleColor}`}>{currentInfo.title}</h4>
                            <p className={`mb-8 max-w-2xl mx-auto text-lg ${currentInfo.textColor}`}>{currentInfo.description}</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {currentInfo.benefits.map((benefit, idx) => (
                                    <span key={idx} className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full shadow-sm border ${currentInfo.benefitClass}`}>
                                        <Check className={`w-4 h-4 mr-2 ${currentInfo.iconColor}`} />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tank Grid with Horizontal Scroll on Mobile */}
                <div className="md:hidden text-center text-xs text-gray-500 mb-2 animate-pulse font-medium">
                    ← Nach links wischen für mehr →
                </div>
                <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
                    {visibleTanks.map((tank, i) => (
                        <div key={i} className="relative group min-w-[85vw] md:min-w-0 snap-center first:pl-0 last:pr-0">
                            <TankCard
                                tank={tank}
                                type={filter}
                                onContact={() => openWizard ? openWizard('tank') : null}
                            />
                            {/* Detail Link */}
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setActiveSection ? setActiveSection(`fluessiggastank-kaufen/${tank.slug}`) : null}
                                    className="text-sm font-bold text-gray-400 hover:text-gas transition-colors border-b border-transparent hover:border-gas pb-0.5"
                                    aria-label={`Details und Maße für ${tank.name} ansehen`}
                                >
                                    Details & Maße ansehen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technical Overview Table */}
                {showTechnicalOverview && (
                    <div className="mt-20 space-y-16">
                        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h4 className="font-bold text-xl mb-4 text-center">Technische Übersicht (2700l, 4850l, 6400l)</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase border-b border-gray-200 font-bold"><tr><th className="py-3">Modell</th><th className="py-3">Maße (L x H)</th><th className="py-3">Gewicht</th><th className="py-3">Leistung</th></tr></thead>
                                    <tbody className="text-gray-600 divide-y divide-gray-100">
                                        <tr><td className="py-3 font-bold">1,2 t (2700 Liter)</td><td className="py-3">2.500 x 1.250 mm</td><td className="py-3">~ 550 kg</td><td className="py-3">35 kW</td></tr>
                                        <tr><td className="py-3 font-bold">2,1 t (4850 Liter)</td><td className="py-3">4.300 x 1.250 mm</td><td className="py-3">~ 980 kg</td><td className="py-3">60 kW</td></tr>
                                        <tr><td className="py-3 font-bold">2,9 t (6400 Liter)</td><td className="py-3">5.500 x 1.250 mm</td><td className="py-3">~ 1.300 kg</td><td className="py-3">90 kW</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Service Section for High Intent Keywords: Entsorgung & Gebraucht */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Flüssiggastank entsorgen & Austausch</h4>
                                <p className="text-gray-600 mb-4">
                                    Sie möchten Ihren alten Flüssiggastank entsorgen oder gegen einen neuen austauschen?
                                    Als Fachbetrieb übernehmen wir die Stilllegung, Restgas-Absaugung und den Abtransport.
                                </p>
                                <button
                                    onClick={() => setActiveSection && setActiveSection('wissen/tank-entsorgen')}
                                    className="text-gas font-bold hover:text-gas-dark underline decoration-gas/30 hover:decoration-gas transition-all"
                                >
                                    Mehr zur Flüssiggastankentsorgung
                                </button>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Gebrauchte Flüssiggastanks (Regeneriert)</h4>
                                <p className="text-gray-600 mb-4">
                                    Sparen Sie Kosten mit unseren geprüften, regenerierten Flüssiggastanks.
                                    Technisch einwandfrei, neu lackiert und mit voller Garantie – eine günstige Alternative zum Neukauf.
                                </p>
                                <button
                                    onClick={() => openWizard ? openWizard('tank') : null}
                                    className="text-gas font-bold hover:text-gas-dark underline decoration-gas/30 hover:decoration-gas transition-all"
                                >
                                    Angebot für gebrauchten Flüssiggastank
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TankSection;
