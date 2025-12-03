import React, { useState } from 'react';
import TankCard from './TankCard';
import TankAdvisorPro from './TankAdvisorPro';

const TankSection = ({ openWizard }) => {
    const [filter, setFilter] = useState('ober');
    const tanks = [
        { type: 'ober', size: '2.700 Liter (1,2 t)', capacity: '1,2 t', name: 'Klein', usage: 'Ideal für Ferienhäuser.', length: '2,50 m', diameter: '1,25 m', weight: '550 kg' },
        { type: 'ober', size: '4.850 Liter (2,1 t)', capacity: '2,1 t', name: 'Standard', usage: 'Klassiker für Einfamilienhäuser.', highlight: true, length: '4,30 m', diameter: '1,25 m', weight: '980 kg' },
        { type: 'ober', size: '6.400 Liter (2,9 t)', capacity: '2,9 t', name: 'Maxi', usage: 'Für Mehrfamilienhäuser.', length: '5,50 m', diameter: '1,25 m', weight: '1.300 kg' },
        { type: 'unter', size: '2.700 Liter (1,2 t)', capacity: '1,2 t', name: 'Klein (Tief)', usage: 'Unsichtbar im Garten.', length: '2,50 m', diameter: '1,25 m', weight: '600 kg' },
        { type: 'unter', size: '4.850 Liter (2,1 t)', capacity: '2,1 t', name: 'Standard (Tief)', usage: 'Platzsparend unterirdisch.', highlight: true, length: '4,30 m', diameter: '1,25 m', weight: '1.100 kg' },
        { type: 'unter', size: '6.400 Liter (2,9 t)', capacity: '2,9 t', name: 'Maxi (Tief)', usage: 'Maximale Kapazität.', length: '5,50 m', diameter: '1,25 m', weight: '1.500 kg' },
    ];
    const visibleTanks = tanks.filter(t => t.type === filter);

    return (
        <section className="py-24 bg-white" id="tanks">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">Unser Sortiment</h2>
                        <h3 className="text-4xl font-extrabold text-text">Tanks für jeden Bedarf</h3>
                    </div>
                    <div className="bg-gray-100 p-1 rounded-lg flex mt-4 md:mt-0">
                        <button onClick={() => setFilter('ober')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === 'ober' ? 'bg-white shadow-sm text-gas' : 'text-gray-500'}`}>Oberirdisch</button>
                        <button onClick={() => setFilter('unter')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === 'unter' ? 'bg-white shadow-sm text-gas' : 'text-gray-500'}`}>Unterirdisch</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visibleTanks.map((tank, i) => <TankCard key={i} tank={tank} onContact={() => openWizard ? openWizard('tank') : null}/>)}
                </div>
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div>
                        <TankAdvisorPro />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TankSection;
