import React, { useState, useMemo } from 'react';
import TankCard from './TankCard';
import EnergyCalculator from './EnergyCalculator';
import { tankDetails } from '../data/tanks';
import SelectionCard from './ui/SelectionCard';

// Define the custom SVG icons for selection here or import them if available.
// Using inline components for the specific tank visuals requested.
const OberirdischIcon = ({ className }) => (
    <svg viewBox="0 0 400 200" className={className} fill="currentColor">
        <rect x="50" y="60" width="300" height="80" rx="40" opacity="0.2" />
        <rect x="50" y="60" width="300" height="80" rx="40" stroke="currentColor" strokeWidth="8" fill="none" />
        <rect x="80" y="140" width="20" height="30" />
        <rect x="300" y="140" width="20" height="30" />
        <rect x="190" y="50" width="20" height="10" />
        <circle cx="200" cy="55" r="15" opacity="0.5"/>
    </svg>
);

const UnterirdischIcon = ({ className }) => (
    <svg viewBox="0 0 400 200" className={className} fill="currentColor">
        <path d="M0 100 L400 100" stroke="currentColor" strokeWidth="4" strokeDasharray="20 10" opacity="0.5" />
        <rect x="50" y="110" width="300" height="80" rx="40" opacity="0.2" />
        <rect x="50" y="110" width="300" height="80" rx="40" stroke="currentColor" strokeWidth="8" fill="none" />
        <rect x="180" y="80" width="40" height="30" />
        <rect x="170" y="75" width="60" height="5" />
    </svg>
);

const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true }) => {
    const [filter, setFilter] = useState('oberirdisch');

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
                <div className="text-center mb-16">
                    <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">Unser Sortiment</h2>
                    <h3 className="text-4xl font-extrabold text-text mb-8">Tanks für jeden Bedarf</h3>

                    {/* Visual Selection Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <SelectionCard
                            title="Oberirdisch"
                            description="Der Klassiker für den Garten. Einfache Aufstellung."
                            icon={OberirdischIcon}
                            selected={filter === 'oberirdisch'}
                            onClick={() => setFilter('oberirdisch')}
                            className="h-full"
                        />
                        <SelectionCard
                            title="Unterirdisch"
                            description="Unsichtbar und platzsparend. Nur der Domdeckel ist zu sehen."
                            icon={UnterirdischIcon}
                            selected={filter === 'unterirdisch'}
                            onClick={() => setFilter('unterirdisch')}
                            className="h-full"
                        />
                    </div>
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
