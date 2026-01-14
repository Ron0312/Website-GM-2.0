import React, { useState } from 'react';
import { Home, Users, CheckCircle, ArrowRight, Ruler, ThermometerSun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TANK_RECOMMENDATIONS = {
    small: {
        label: '1,2 t (2.700 Liter)',
        description: 'Ideal für Ferienhäuser, Niedrigenergiehäuser oder als Zusatzheizung.',
        capacity: 2700,
        dims: '2,50 x 1,25 m'
    },
    medium: {
        label: '2,1 t (4.850 Liter)',
        description: 'Der Standard für Einfamilienhäuser. Reicht meist für 1 Jahr Heizen & Warmwasser.',
        capacity: 4850,
        dims: '4,30 x 1,25 m'
    },
    large: {
        label: '2,9 t (6.400 Liter)',
        description: 'Für Mehrfamilienhäuser, große Altbauten oder Gewerbe.',
        capacity: 6400,
        dims: '5,50 x 1,25 m'
    }
};

const TankSizeAdvisor = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        size: 150, // m2
        persons: 3,
        insulation: 'average' // low, average, high
    });

    const calculateRecommendation = () => {
        // Simple heuristic
        // Energy demand per m2 per year approx:
        // Low energy: 50 kWh/m2
        // Average (80s/90s): 120 kWh/m2
        // Old building: 200 kWh/m2

        const insulationFactors = {
            high: 50,
            average: 130,
            low: 220
        };

        const kwhPerYear = data.size * insulationFactors[data.insulation];
        // Add hot water per person (approx 800 kWh/person)
        const totalKwh = kwhPerYear + (data.persons * 800);

        // Convert to Liters LPG (approx 6.57 kWh/L)
        const litersNeeded = totalKwh / 6.57;

        if (litersNeeded < 2500) return TANK_RECOMMENDATIONS.small;
        if (litersNeeded > 4500) return TANK_RECOMMENDATIONS.large;
        return TANK_RECOMMENDATIONS.medium;
    };

    const result = calculateRecommendation();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="p-6 bg-gas-light/10 border-b border-gas-light/20">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Ruler className="text-gas" /> Tankgrößen-Berater
                </h3>
                <p className="text-sm text-gray-500">Finden Sie in 3 Schritten den passenden Tank.</p>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <label className="block text-sm font-bold text-gray-700 mb-4">Wie groß ist die zu beheizende Wohnfläche?</label>
                            <div className="flex items-center gap-4 mb-8">
                                <Home size={24} className="text-gray-400" />
                                <div className="flex-1">
                                    <input
                                        type="range"
                                        min="50"
                                        max="400"
                                        step="10"
                                        value={data.size}
                                        onChange={(e) => setData({...data, size: parseInt(e.target.value)})}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas"
                                    />
                                </div>
                                <span className="font-bold text-gas w-16 text-right">{data.size} m²</span>
                            </div>
                            <button onClick={() => setStep(2)} className="w-full bg-gas text-white py-3 rounded-xl font-bold hover:bg-gas-dark transition-colors">Weiter</button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <label className="block text-sm font-bold text-gray-700 mb-4">Wie ist der Dämmstandard?</label>
                            <div className="grid gap-3 mb-8">
                                <button
                                    onClick={() => setData({...data, insulation: 'high'})}
                                    className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${data.insulation === 'high' ? 'border-gas bg-gas-light/10' : 'border-gray-100 hover:border-gas/30'}`}
                                >
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle size={16}/></div>
                                    <div>
                                        <span className="font-bold block text-sm">Gut gedämmt / Neubau</span>
                                        <span className="text-xs text-gray-500">Wenig Wärmeverlust</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setData({...data, insulation: 'average'})}
                                    className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${data.insulation === 'average' ? 'border-gas bg-gas-light/10' : 'border-gray-100 hover:border-gas/30'}`}
                                >
                                    <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><CheckCircle size={16}/></div>
                                    <div>
                                        <span className="font-bold block text-sm">Durchschnitt / Bestand</span>
                                        <span className="text-xs text-gray-500">Standard 80er-2000er</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setData({...data, insulation: 'low'})}
                                    className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${data.insulation === 'low' ? 'border-gas bg-gas-light/10' : 'border-gray-100 hover:border-gas/30'}`}
                                >
                                    <div className="bg-red-100 p-2 rounded-lg text-red-600"><CheckCircle size={16}/></div>
                                    <div>
                                        <span className="font-bold block text-sm">Altbau / Ungedämmt</span>
                                        <span className="text-xs text-gray-500">Hoher Wärmebedarf</span>
                                    </div>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Zurück</button>
                                <button onClick={() => setStep(3)} className="w-2/3 bg-gas text-white py-3 rounded-xl font-bold hover:bg-gas-dark transition-colors">Ergebnis</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="text-center mb-6">
                                <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Unsere Empfehlung</p>
                                <h4 className="text-2xl font-extrabold text-gas">{result.label}</h4>
                            </div>

                            <div className="bg-gas-light/10 p-4 rounded-xl mb-6">
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">{result.description}</p>
                                <div className="flex items-center justify-between text-xs font-bold text-gray-500 border-t border-gas/20 pt-2">
                                    <span>Maße:</span>
                                    <span>{result.dims}</span>
                                </div>
                            </div>

                            <button onClick={() => setStep(1)} className="w-full border-2 border-gray-100 text-gray-400 py-3 rounded-xl font-bold hover:text-gas hover:border-gas transition-colors text-sm flex items-center justify-center gap-2">
                                <ArrowRight className="rotate-180" size={14} /> Neu berechnen
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TankSizeAdvisor;
