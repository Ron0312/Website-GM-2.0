import React, { useState } from 'react';
import CountUp from 'react-countup';

const SavingsCalculator = () => {
    const [consumption, setConsumption] = useState(3000);
    const totalSavings = (consumption * 0.15 * 10) + (250 * 10) - 2800;
    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-24 relative" id="rechner">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gas to-green-400"></div>
            <div className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-2">Ersparnis-Rechner</h3>
                <p className="text-gray-500 mb-10">Vergleich Eigentum vs. Miete (10 Jahre)</p>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="flex justify-between font-bold text-sm mb-4"><span>Jahresverbrauch</span><span className="text-gas">{consumption} Liter</span></div>
                    <input type="range" min="1000" max="6000" step="100" value={consumption} onChange={(e) => setConsumption(parseInt(e.target.value))} className="w-full" />
                </div>

                <div className="inline-block bg-gray-50 px-10 py-6 rounded-2xl border border-gray-100">
                    <div className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">Ihr Potenzial</div>
                    <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gas to-green-500">
                        <CountUp end={totalSavings} duration={1} separator="." suffix=" €" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingsCalculator;
