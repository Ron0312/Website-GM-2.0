import React, { useState } from 'react';
import { Calculator, Droplet } from 'lucide-react';

const TankAdvisorPro = () => {
    const [sqm, setSqm] = useState(150);
    const [standard, setStandard] = useState('bestand'); // bestand, saniert, neubau
    const [hotWater, setHotWater] = useState(false);

    const calculateNeed = () => {
        let factor = 130; // kWh/m2
        if (standard === 'saniert') factor = 85;
        if (standard === 'neubau') factor = 45;

        let kwh = sqm * factor;
        if (hotWater) kwh *= 1.15; // +15% for hot water

        const liters = Math.round(kwh / 6.57); // 6.57 kWh per Liter LPG
        return liters;
    };

    const annualNeed = calculateNeed();
    let recommendation = '1,2 t';
    let tankCost = 2200;
    let installCost = 350;

    if (annualNeed > 3000) {
        recommendation = '2,1 t';
        tankCost = 2800;
        installCost = 450;
    }
    if (annualNeed > 5000) {
        recommendation = '2,9 t';
        tankCost = 3600;
        installCost = 550;
    }

    const formatMoney = (n) => n.toLocaleString('de-DE') + ' €';

    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gas text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">Beta 2.0</div>
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-xl text-gas-dark">Profi-Kalkulator</h4>
                <Calculator size={24} className="text-gas-light"/>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gebäudestandard</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {[{id:'bestand', l:'Altbau'}, {id:'saniert', l:'Saniert'}, {id:'neubau', l:'Neubau'}].map(s => (
                            <button key={s.id} onClick={() => setStandard(s.id)} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${standard === s.id ? 'bg-white shadow text-gas' : 'text-gray-500 hover:text-gray-700'}`}>{s.l}</button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                        <span>Wohnfläche</span>
                        <span className="text-gas font-mono">{sqm} m²</span>
                    </label>
                    <input type="range" min="50" max="500" step="10" value={sqm} onChange={(e) => setSqm(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas" />
                </div>

                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                    <input type="checkbox" id="hotWater" className="w-5 h-5 accent-gas" checked={hotWater} onChange={(e) => setHotWater(e.target.checked)}/>
                    <label htmlFor="hotWater" className="text-sm text-gray-700 font-medium cursor-pointer flex-1">Warmwasser über Gas?</label>
                    <Droplet size={16} className="text-blue-400"/>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-gray-500 font-bold uppercase">Empfehlung</span>
                        <span className="text-2xl font-extrabold text-gas">{recommendation}</span>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Tank (neu/geprüft)</span>
                            <span>~ {formatMoney(tankCost)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Installation & Prüfung</span>
                            <span>~ {formatMoney(installCost)}</span>
                        </div>
                        <div className="h-px bg-gray-200 w-full my-1"></div>
                        <div className="flex justify-between font-bold text-gas-dark text-lg">
                            <span>Gesamt ca.</span>
                            <span>{formatMoney(tankCost + installCost)}</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3 text-center leading-tight">
                        *Unverbindliche Schätzung inkl. MwSt. Zzgl. Gasfüllung ({annualNeed} L Bedarf/Jahr).
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TankAdvisorPro;
