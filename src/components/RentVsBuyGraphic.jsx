import React, { useState } from 'react';
import { Lock, Unlock, Calculator, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const RentVsBuyGraphic = () => {
    // State for interactive slider
    const [consumption, setConsumption] = useState(2500);

    // Calculation Constants (Approximations based on typical market data)
    // Buy Case:
    // - Tank Cost (Initial): ~2500 (averaged)
    // - Maintenance (10y): ~500 (exams)
    // - Gas Price: ~0.60€/L (free market)
    // Rent Case:
    // - Tank Miete (10y): ~15€ * 12 * 10 = 1800
    // - Setup/Other Fees: ~500
    // - Gas Price: ~0.75€/L (bound contract, typically 10-20ct higher)

    const years = 10;
    const priceDiff = 0.15; // 15 cents difference per liter
    const rentMonthly = 15;
    const buyInvest = 2500;
    const maintenance = 600; // Total for 10 years

    const calculateCosts = (liters) => {
        const totalLiters = liters * years;

        // Rent Cost
        // Base Rent + Higher Gas Price
        const rentBaseCost = (rentMonthly * 12 * years) + 500; // + Setup
        const rentGasCost = totalLiters * (0.60 + priceDiff);
        const totalRent = Math.round(rentBaseCost + rentGasCost);

        // Buy Cost
        // Investment + Maintenance + Lower Gas Price
        const buyBaseCost = buyInvest + maintenance;
        const buyGasCost = totalLiters * 0.60;
        const totalBuy = Math.round(buyBaseCost + buyGasCost);

        const savings = totalRent - totalBuy;

        return { totalRent, totalBuy, savings };
    };

    const { totalRent, totalBuy, savings } = calculateCosts(consumption);

    // Format currency
    const fmt = (val) => val.toLocaleString('de-DE') + ' €';

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 my-12 shadow-sm relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gas-light/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

            <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 bg-gas-light/20 text-gas-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Calculator size={14} /> Interaktiver Rechner
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Kauf vs. Miete: Ihr Sparpotenzial</h4>
                <p className="text-gray-500 max-w-md mx-auto">Vergleichen Sie die Kosten über 10 Jahre basierend auf Ihrem Jahresverbrauch.</p>
            </div>

            {/* Slider Section */}
            <div className="mb-10 max-w-lg mx-auto bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-bold text-gray-600">Ihr Jahresverbrauch:</label>
                    <div className="text-2xl font-bold text-gas">{consumption.toLocaleString('de-DE')} <span className="text-sm font-normal text-gray-500">Liter</span></div>
                </div>
                <input
                    type="range"
                    min="1000"
                    max="6000"
                    step="100"
                    value={consumption}
                    onChange={(e) => setConsumption(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas hover:accent-gas-dark transition-all"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                    <span>Weniger (1.000L)</span>
                    <span>Viel (6.000L)</span>
                </div>
            </div>

            {/* Visualization */}
            <div className="grid grid-cols-2 gap-4 md:gap-12 items-end h-64 pb-2 max-w-2xl mx-auto relative">
                {/* Rent Bar */}
                <div className="flex flex-col justify-end h-full group">
                    <div className="text-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-red-800 bg-red-100 px-2 py-1 rounded absolute -top-8 left-0 md:left-10 w-24 transform md:translate-x-0">
                        {fmt(totalRent)}
                    </div>
                    <div className="w-full bg-red-50 border border-red-200 rounded-t-xl relative transition-all duration-500 ease-out hover:bg-red-100" style={{ height: '90%' }}>
                         <div className="absolute bottom-4 left-0 right-0 text-center">
                            <Lock size={20} className="mx-auto text-red-400 mb-1" />
                            <span className="text-xs font-bold text-red-800 uppercase tracking-wide block">Miete</span>
                            <span className="text-lg font-extrabold text-red-900 md:hidden mt-1">{fmt(totalRent)}</span>
                        </div>
                    </div>
                </div>

                {/* Buy Bar */}
                <div className="flex flex-col justify-end h-full group relative">
                    <div className="text-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-green-800 bg-green-100 px-2 py-1 rounded absolute -top-8 right-0 md:right-10 w-24 transform md:translate-x-0">
                        {fmt(totalBuy)}
                    </div>

                    {/* Floating Savings Bubble */}
                    <motion.div
                        initial={{ scale: 0.8, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        key={savings}
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20 w-48 text-center"
                    >
                         <div className="bg-gas text-white text-sm font-bold py-2 px-4 rounded-xl shadow-xl shadow-gas/20 relative">
                            Sie sparen:
                            <div className="text-2xl font-extrabold text-white mt-0.5">{fmt(savings)}</div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gas rotate-45"></div>
                        </div>
                    </motion.div>

                    <div
                        className="w-full bg-green-50 border-2 border-green-200 rounded-t-xl relative transition-all duration-500 ease-out hover:bg-green-100 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                        style={{ height: `${(totalBuy / totalRent) * 90}%` }}
                    >
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <Unlock size={20} className="mx-auto text-green-500 mb-1" />
                            <span className="text-xs font-bold text-green-800 uppercase tracking-wide block">Kauf</span>
                            <span className="text-lg font-extrabold text-green-900 md:hidden mt-1">{fmt(totalBuy)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend / Explanation */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-start gap-2 max-w-xs">
                    <Info size={14} className="flex-shrink-0 mt-0.5 text-gas" />
                    <p>Berechnung über 10 Jahre inkl. Tankanschaffung, Wartung und Gasverbrauch. Annahme: Mietvertrag ~15ct/L teurer als freier Markt.</p>
                </div>
            </div>
        </div>
    );
};

export default RentVsBuyGraphic;
