import React, { useState, useMemo } from 'react';
import TankCard from './TankCard';
import EnergyCalculator from './EnergyCalculator';
import { tankDetails } from '../data/tanks';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true }) => {
    const [filter, setFilter] = useState('oberirdisch');

    const tankInfo = {
        oberirdisch: {
            title: "Der sichtbare Klassiker",
            description: "Oberirdische Tanks sind die meistgewählte Variante. Sie lassen sich einfach aufstellen, erfordern keine Erdarbeiten und sind kostengünstig in der Installation.",
            benefits: ["Günstige Anschaffung", "Schnelle Installation", "Einfache Wartung"],
            color: "bg-blue-50 border-blue-100",
            iconColor: "text-blue-500"
        },
        unterirdisch: {
            title: "Die unsichtbare Lösung",
            description: "Unterirdische Tanks verschwinden komplett unter der Erde. Nur der Domschachtdeckel bleibt sichtbar – ideal für gepflegte Gärten und maximale Raumnutzung.",
            benefits: ["Nicht sichtbar", "Maximale Gartennutzung", "Gut geschützt"],
            color: "bg-green-50 border-green-100",
            iconColor: "text-green-500"
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
             {/* New Hero Section for Tanks & Kauf */}
             <div className="relative bg-gray-900 py-32 lg:py-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/tank-section-background.jpg" alt="Flüssiggastank im Garten" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-6 py-2 border border-white/20 mb-8">
                         <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                         <span className="text-white font-bold text-sm">Sofort verfügbar & Installation durch Fachpartner</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ihr neuer Flüssiggastank</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Kaufen oder Mieten – Sie haben die Wahl. Wir bieten Ihnen Tanks in allen gängigen Größen, oberirdisch und unterirdisch.</p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">Unser Sortiment</h2>
                    <h3 className="text-4xl font-extrabold text-text mb-8">Tanks für jeden Bedarf</h3>

                    {/* Visual Selection Area - Upgraded Toggle */}
                    <div className="flex justify-center">
                        <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex relative">
                            {/* Sliding Background */}
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm z-0"
                                initial={false}
                                animate={{
                                    x: filter === 'oberirdisch' ? 0 : '100%',
                                    width: '50%'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ left: 6, right: '50%' }}
                            />

                            <button
                                onClick={() => setFilter('oberirdisch')}
                                className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-colors w-40 ${
                                    filter === 'oberirdisch' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Oberirdisch
                            </button>
                            <button
                                onClick={() => setFilter('unterirdisch')}
                                className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-colors w-40 ${
                                    filter === 'unterirdisch' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Unterirdisch
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Block - Dynamic Content based on Filter */}
                <div className="max-w-3xl mx-auto mb-12">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`rounded-2xl p-6 border ${currentInfo.color} text-center`}
                        >
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{currentInfo.title}</h4>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{currentInfo.description}</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {currentInfo.benefits.map((benefit, idx) => (
                                    <span key={idx} className="inline-flex items-center text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                        <Check className={`w-4 h-4 mr-2 ${currentInfo.iconColor}`} />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tank Grid with Horizontal Scroll on Mobile */}
                <div className="md:hidden text-center text-xs text-gray-400 mb-2 animate-pulse">
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
                                    onClick={() => setActiveSection ? setActiveSection(`tanks/${tank.slug}`) : null}
                                    className="text-sm font-bold text-gray-400 hover:text-gas transition-colors border-b border-transparent hover:border-gas pb-0.5"
                                    aria-label={`Details und Maße für ${tank.name} ansehen`}
                                >
                                    Details & Maße ansehen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {showTechnicalOverview && (
                        <div className="md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h4 className="font-bold text-xl mb-4">Technische Übersicht</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-200"><tr><th className="py-3">Modell</th><th className="py-3">Maße (L x H)</th><th className="py-3">Gewicht</th><th className="py-3">Leistung</th></tr></thead>
                                    <tbody className="text-gray-600 divide-y divide-gray-100">
                                        <tr><td className="py-3 font-bold">1,2 t</td><td className="py-3">2.500 x 1.250 mm</td><td className="py-3">~ 550 kg</td><td className="py-3">35 kW</td></tr>
                                        <tr><td className="py-3 font-bold">2,1 t</td><td className="py-3">4.300 x 1.250 mm</td><td className="py-3">~ 980 kg</td><td className="py-3">60 kW</td></tr>
                                        <tr><td className="py-3 font-bold">2,9 t</td><td className="py-3">5.500 x 1.250 mm</td><td className="py-3">~ 1.300 kg</td><td className="py-3">90 kW</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <div className={showTechnicalOverview ? "" : "md:col-span-3"}>
                        <EnergyCalculator />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TankSection;
