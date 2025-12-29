import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Info, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './ui/Skeleton';

// Conversion Factors
const FACTORS = {
    lpg: { kwh: 7.105, label: 'Liter', price: 0.65 }, // Price is an estimate for calculation demo
    oil: { kwh: 9.8, label: 'Liter', price: 1.10 },
    gas: { kwh: 10.0, label: 'm³', price: 1.20 }, // Natural Gas usually priced per kWh or m3
    wood: { kwh: 4.0, label: 'kg', price: 0.35 }, // Pellets/Wood Mix
    electric: { kwh: 1.0, label: 'kWh', price: 0.35 }
};

const Tooltip = ({ text }) => (
    <div className="group relative inline-block ml-1">
        <Info size={14} className="text-gray-400 cursor-help hover:text-gas transition-colors" />
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded p-2 z-50 text-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
    </div>
);

const EnergyCalculator = ({ defaultExpanded = false }) => {
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(defaultExpanded);

    // Inputs
    const [consumption, setConsumption] = useState(2500); // Standard value
    const [sourceType, setSourceType] = useState('oil');

    // Results
    const [savings, setSavings] = useState(0);
    const [co2Savings, setCo2Savings] = useState(0);

    // Simulate Loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Calculate whenever inputs change
    useEffect(() => {
        if (!loading) {
            calculate();
        }
    }, [consumption, sourceType, loading]);

    const calculate = () => {
        // Simple logic: Calculate current cost vs LPG cost for same energy output
        // 1. Calculate Total kWh needed
        const totalKWh = consumption * FACTORS[sourceType].kwh;

        // 2. Calculate Current Cost (Estimated)
        // Note: Prices vary wildly. This is a "Demonstrator" logic.
        // We assume User Input is "Liters/m3/kg per Year"

        // Prices per unit (approximate market average)
        const prices = {
            oil: 1.05, // €/L
            gas: 1.10, // €/m3 (approx)
            wood: 0.40, // €/kg (pellets)
            electric: 0.32 // €/kWh
        };

        const currentCost = consumption * (prices[sourceType] || 1);

        // 3. Calculate LPG Cost for same kWh
        const lpgLitersNeeded = totalKWh / FACTORS.lpg.kwh;
        const lpgCost = lpgLitersNeeded * 0.65; // Est. LPG Price €/L

        // 4. Savings
        const saveAmount = currentCost - lpgCost;
        setSavings(Math.round(saveAmount));

        // 5. CO2 Savings (Approx factors: Oil 0.26 kg/kWh, LPG 0.23 kg/kWh)
        const co2Oil = totalKWh * 0.266;
        const co2Lpg = totalKWh * 0.236;
        setCo2Savings(Math.round(co2Oil - co2Lpg));
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-4">
                <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
        );
    }

    return (
        <div id="calculator" className="w-full max-w-4xl mx-auto my-12 relative z-10" data-nosnippet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
                {/* Header Toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full p-6 md:p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-between items-center group transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                            <Calculator size={28} className="text-gas-light" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-bold">Energie-Rechner</h2>
                            <p className="text-gray-400 text-sm">Vergleichen & Sparen</p>
                        </div>
                    </div>
                    {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>

                {/* Content */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white"
                        >
                            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-12">
                                {/* Inputs */}
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Aktueller Energieträger <Tooltip text="Wählen Sie Ihre aktuelle Heizquelle aus." /></label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { id: 'oil', label: 'Heizöl' },
                                                { id: 'gas', label: 'Erdgas' },
                                                { id: 'wood', label: 'Pellets' },
                                                { id: 'electric', label: 'Strom' }
                                            ].map(type => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setSourceType(type.id)}
                                                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${sourceType === type.id ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 text-gray-600 hover:border-gas/30'}`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Jahresverbrauch ({FACTORS[sourceType].label}) <Tooltip text="Entnehmen Sie diesen Wert Ihrer letzten Jahresabrechnung." /></label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={consumption}
                                                onChange={(e) => setConsumption(Number(e.target.value))}
                                                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl text-xl font-bold text-gray-900 focus:border-gas outline-none"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{FACTORS[sourceType].label}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="500"
                                            max="10000"
                                            step="100"
                                            value={consumption}
                                            onChange={(e) => setConsumption(Number(e.target.value))}
                                            className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas"
                                        />
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="bg-gradient-to-br from-gas-light/30 to-white rounded-2xl p-8 border border-gas/10 flex flex-col justify-center calculator-result">
                                    <div className="text-center mb-8">
                                        <p className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-xs">Mögliche Ersparnis pro Jahr</p>
                                        <motion.div
                                            key={savings}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-5xl font-extrabold text-gas"
                                        >
                                            {savings > 0 ? `${savings} €` : 'Checken Sie Ihr Angebot'}
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                                    <ArrowRight size={18} className="rotate-[-45deg]" />
                                                </div>
                                                <span className="font-bold text-gray-700">CO2 Reduktion</span>
                                            </div>
                                            <span className="font-bold text-green-600">{co2Savings > 0 ? `${co2Savings} kg` : '-'}</span>
                                        </div>

                                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                                            <Info size={14} className="inline mr-1 mb-0.5" />
                                            <strong>Hinweis:</strong> Dies ist eine unverbindliche Modellrechnung basierend auf Durchschnittswerten. Tatsächliche Ersparnis kann abweichen.
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setConsumption(2500)}
                                        className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold hover:text-gas transition-colors"
                                    >
                                        <RotateCcw size={12} /> Zurücksetzen
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default EnergyCalculator;
