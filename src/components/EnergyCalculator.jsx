import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Info, RotateCcw, ChevronDown, ChevronUp, Flame, Zap, Droplets, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './ui/Skeleton';
import TankSizeAdvisor from './TankSizeAdvisor';

// Updated Factors for 2025 (Germany)
const FACTORS = {
    lpg: { kwh: 7.105, label: 'Liter', price: 0.65, co2: 0.23 },
    oil: { kwh: 9.8, label: 'Liter', price: 1.15, co2: 0.27 },
    gas: { kwh: 1.0, label: 'kWh', price: 0.12, co2: 0.20 }, // Natural Gas now in kWh for easier comparison
    pellets: { kwh: 4.8, label: 'kg', price: 0.35, co2: 0.03 },
    electric: { kwh: 1.0, label: 'kWh', price: 0.30, co2: 0.40 } // Mixed grid
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
    const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' or 'advisor'

    // Inputs
    const [consumption, setConsumption] = useState(2500); // Standard value for Oil/LPG liters
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
        const factor = FACTORS[sourceType];

        // 1. Calculate Total kWh needed per year
        // Special case for Gas/Electric if input is already kWh, factor is 1
        const totalKWh = consumption * factor.kwh;

        // 2. Calculate Current Cost
        const currentCost = consumption * factor.price;

        // 3. Calculate LPG Cost for same kWh
        // LPG needs totalKWh / 7.105 liters
        const lpgLitersNeeded = totalKWh / FACTORS.lpg.kwh;
        const lpgCost = lpgLitersNeeded * FACTORS.lpg.price;

        // 4. Savings
        const saveAmount = currentCost - lpgCost;
        setSavings(Math.round(saveAmount));

        // 5. CO2 Savings
        const co2Current = totalKWh * factor.co2;
        const co2Lpg = totalKWh * FACTORS.lpg.co2;
        setCo2Savings(Math.round(co2Current - co2Lpg));
    };

    const handleSourceChange = (type) => {
        setSourceType(type);
        // Reset consumption to typical values for that type to avoid confusion
        if (type === 'oil') setConsumption(2500);
        if (type === 'gas') setConsumption(20000); // kWh
        if (type === 'pellets') setConsumption(5000); // kg
        if (type === 'electric') setConsumption(15000); // kWh heat pump
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto my-12 relative z-10">
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
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full hidden md:inline-block">2026 Ready</span>
                        {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
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
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100">
                                <button
                                    onClick={() => setActiveTab('calculator')}
                                    className={`flex-1 p-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'calculator' ? 'text-gas border-b-2 border-gas bg-gas-light/5' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Calculator size={16} /> Kosten-Vergleich
                                </button>
                                <button
                                    onClick={() => setActiveTab('advisor')}
                                    className={`flex-1 p-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'advisor' ? 'text-gas border-b-2 border-gas bg-gas-light/5' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Leaf size={16} /> Tank-Berater
                                </button>
                            </div>

                            {activeTab === 'calculator' ? (
                                <div className="p-6 md:p-10 grid md:grid-cols-2 gap-12">
                                    {/* Inputs */}
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Aktueller Energieträger <Tooltip text="Wählen Sie Ihre aktuelle Heizquelle aus." /></label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => handleSourceChange('oil')}
                                                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${sourceType === 'oil' ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 text-gray-600 hover:border-gas/30'}`}
                                                >
                                                    <Droplets size={16} /> Heizöl
                                                </button>
                                                <button
                                                    onClick={() => handleSourceChange('gas')}
                                                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${sourceType === 'gas' ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 text-gray-600 hover:border-gas/30'}`}
                                                >
                                                    <Flame size={16} /> Erdgas
                                                </button>
                                                <button
                                                    onClick={() => handleSourceChange('pellets')}
                                                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${sourceType === 'pellets' ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 text-gray-600 hover:border-gas/30'}`}
                                                >
                                                    <Leaf size={16} /> Pellets
                                                </button>
                                                <button
                                                    onClick={() => handleSourceChange('electric')}
                                                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${sourceType === 'electric' ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 text-gray-600 hover:border-gas/30'}`}
                                                >
                                                    <Zap size={16} /> Strom
                                                </button>
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
                                                min={sourceType === 'oil' ? 500 : 1000}
                                                max={sourceType === 'gas' || sourceType === 'electric' ? 50000 : 10000}
                                                step={100}
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
                                                {savings > 0 ? `${savings} €` : <span className="text-3xl text-gray-400">Keine Ersparnis</span>}
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
                                                <span className={`font-bold ${co2Savings > 0 ? 'text-green-600' : 'text-gray-400'}`}>{co2Savings > 0 ? `${co2Savings} kg` : '-'}</span>
                                            </div>

                                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                                                <Info size={14} className="inline mr-1 mb-0.5" />
                                                <strong>Hinweis:</strong> Unverbindliche Modellrechnung (Stand 2026). Preise sind Markt-Durchschnittswerte und können regional abweichen.
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => { handleSourceChange('oil'); }}
                                            className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold hover:text-gas transition-colors"
                                        >
                                            <RotateCcw size={12} /> Zurücksetzen
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 md:p-10">
                                    <TankSizeAdvisor />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default EnergyCalculator;
