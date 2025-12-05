import React, { useState } from 'react';
import TankCard from './TankCard';
import TankAdvisorPro from './TankAdvisorPro';
import { tankDetails } from '../data/tanks';

const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true }) => {
    const [filter, setFilter] = useState('oberirdisch');

    // Map the simple tank data to match TankCard props but enriched with slug for linking
    const tanks = tankDetails.map(t => ({
        type: t.type,
        size: t.volume,
        capacity: t.capacity,
        name: t.name.split('(')[0].trim(), // Simplified name for card
        usage: t.features[0], // Use first feature as usage
        highlight: t.capacity === '2,1 t',
        length: t.dimensions.split('x')[0].trim(),
        diameter: t.dimensions.split('x')[1].replace('m', '').trim() + ' m',
        weight: t.weight,
        slug: t.slug
    }));

    const visibleTanks = tanks.filter(t => t.type === filter);

    return (
        <section className="bg-white" id="tanks">
             {/* New Hero Section for Tanks & Kauf */}
             <div className="relative bg-gray-900 py-32 lg:py-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1565514020176-db7936a7d512?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Flüssiggastank im Garten" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ihr neuer Flüssiggastank</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Kaufen oder Mieten – Sie haben die Wahl. Wir bieten Ihnen Tanks in allen gängigen Größen, oberirdisch und unterirdisch.</p>
                    <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-full px-6 py-2 border border-white/20">
                         <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                         <span className="text-white font-bold text-sm">Sofort verfügbar & Installation durch Fachpartner</span>
                    </div>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">Unser Sortiment</h2>
                        <h3 className="text-4xl font-extrabold text-text">Tanks für jeden Bedarf</h3>
                    </div>
                    <div className="bg-gray-100 p-1 rounded-lg flex mt-4 md:mt-0">
                        <button onClick={() => setFilter('oberirdisch')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === 'oberirdisch' ? 'bg-white shadow-sm text-gas' : 'text-gray-500'}`}>Oberirdisch</button>
                        <button onClick={() => setFilter('unterirdisch')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === 'unterirdisch' ? 'bg-white shadow-sm text-gas' : 'text-gray-500'}`}>Unterirdisch</button>
                    </div>
                </div>

                {/* Tank Grid with Horizontal Scroll on Mobile */}
                <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
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
                        <TankAdvisorPro />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TankSection;
