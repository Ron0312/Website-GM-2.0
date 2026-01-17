import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

const RentVsBuyGraphic = () => {
    const [consumption, setConsumption] = useState(3000);

    // Constants for 10-year calculation
    const YEARS = 10;
    const GAS_PRICE_MARKET = 0.85; // Euro/Liter
    const GAS_PRICE_RENT_SURCHARGE = 0.20; // Extra cost per liter for rent customers

    // Rent Scenario
    const RENT_SETUP = 299;
    const RENT_MONTHLY = 15;
    const RENT_MAINTENANCE = 0; // Included in rent

    // Buy Scenario
    const BUY_TANK_COST = 2400; // Approx for 2.1t
    const BUY_SETUP = 350;
    const BUY_MAINTENANCE_2YR = 150; // 5 times
    const BUY_MAINTENANCE_10YR = 450; // 1 time

    const calculateCosts = (liters) => {
        const gasCostRent = liters * YEARS * (GAS_PRICE_MARKET + GAS_PRICE_RENT_SURCHARGE);
        const fixedCostRent = RENT_SETUP + (RENT_MONTHLY * 12 * YEARS) + RENT_MAINTENANCE;
        const totalRent = gasCostRent + fixedCostRent;

        const gasCostBuy = liters * YEARS * GAS_PRICE_MARKET;
        // 4 external checks (years 2,4,6,8) + 1 internal check (year 10)
        const maintenanceBuy = (BUY_MAINTENANCE_2YR * 4) + BUY_MAINTENANCE_10YR;
        const fixedCostBuy = BUY_TANK_COST + BUY_SETUP + maintenanceBuy;
        const totalBuy = gasCostBuy + fixedCostBuy;

        return {
            rent: Math.round(totalRent),
            buy: Math.round(totalBuy),
            saving: Math.round(totalRent - totalBuy)
        };
    };

    const costs = calculateCosts(consumption);
    // Determine max scale (add some buffer)
    const maxCost = Math.max(costs.rent, costs.buy) * 1.15;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 my-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-xl font-bold text-text mb-6 text-center">Interaktiver Kostenvergleich (10 Jahre)</h4>

            {/* Slider Section */}
            <div className="mb-10 max-w-lg mx-auto bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                    <span>Ihr Jahresverbrauch:</span>
                    <span className="text-gas text-lg">{consumption.toLocaleString()} Liter</span>
                </div>
                <input
                    type="range"
                    min="1000"
                    max="6000"
                    step="100"
                    value={consumption}
                    onChange={(e) => setConsumption(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1.000 L</span>
                    <span>6.000 L</span>
                </div>
            </div>

            {/* Bars */}
            <div className="flex flex-col md:flex-row gap-8 items-end justify-center h-80 pb-2">
                {/* Rent Bar */}
                <div className="flex-1 flex flex-col items-center justify-end h-full w-full">
                    <div className="text-xs text-gray-500 mb-2 font-medium text-center">
                        Miet-Vertrag<br/>(Gebunden)
                    </div>
                    <div
                        style={{ height: `${(costs.rent / maxCost) * 100}%` }}
                        className="w-full max-w-[140px] bg-red-50 border border-red-200 rounded-t-lg relative group transition-all duration-500 ease-out flex flex-col justify-end"
                    >
                        <div className="absolute top-4 w-full text-center font-bold text-red-800 text-lg">
                            {costs.rent.toLocaleString()} €
                        </div>
                        <div className="w-full bg-red-500/10 h-[20%] border-t border-red-200 flex items-center justify-center text-[10px] text-red-800 font-bold p-1 text-center">
                           Hohe Folgekosten
                        </div>
                    </div>
                    <div className="mt-4 font-bold text-gray-700 flex items-center">
                        <Lock size={16} className="mr-2 text-red-500"/> Miete
                    </div>
                </div>

                {/* VS Badge */}
                <div className="hidden md:flex mb-12 font-bold text-gray-400 bg-gray-100 rounded-full p-3 text-xs shadow-inner z-10">VS</div>

                {/* Buy Bar */}
                <div className="flex-1 flex flex-col items-center justify-end h-full w-full">
                    <div className="text-xs text-gray-500 mb-2 font-medium text-center">
                        Eigentum<br/>(Frei)
                    </div>
                    <div
                        style={{ height: `${(costs.buy / maxCost) * 100}%` }}
                        className="w-full max-w-[140px] bg-green-50 border border-green-200 rounded-t-lg relative group transition-all duration-500 ease-out flex flex-col justify-end"
                    >
                        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gas text-white text-sm font-bold py-2 px-4 rounded-xl shadow-xl whitespace-nowrap z-20 animate-bounce">
                            Sie sparen {costs.saving.toLocaleString()} €
                        </div>
                        <div className="absolute top-4 w-full text-center font-bold text-green-800 text-lg">
                            {costs.buy.toLocaleString()} €
                        </div>
                        <div className="w-full bg-green-500/10 h-[40%] border-t border-green-200 flex items-center justify-center text-[10px] text-green-900 font-bold p-1 text-center">
                            Niedriger Gaspreis
                        </div>
                    </div>
                    <div className="mt-4 font-bold text-gray-700 flex items-center">
                        <Unlock size={16} className="mr-2 text-green-600"/> Kauf
                    </div>
                </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-8 text-center italic border-t border-gray-100 pt-4">
                *Beispielrechnung über 10 Jahre. Annahmen: Kaufpreis Tank ca. 2.400€, Installation 350€. Mietmodell: 15€/Monat + 299€ Start.
                Gaspreis-Vorteil Eigentum: {Math.round(GAS_PRICE_RENT_SURCHARGE * 100)} Cent/Liter. Wartungskosten beim Kauf berücksichtigt.
            </p>
        </div>
    );
};

export default RentVsBuyGraphic;
