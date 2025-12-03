import React, { useState } from 'react';

const TankAdvisorSimple = () => {
    const [sqm, setSqm] = useState(150);
    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <label className="block text-sm font-bold text-gray-700 mb-4 flex justify-between">
                <span>Wohnfläche</span>
                <span className="text-gas font-mono text-lg">{sqm} m²</span>
            </label>
            <input type="range" min="50" max="400" step="10" value={sqm} onChange={(e) => setSqm(e.target.value)} className="w-full mb-8" />
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Empfehlung</span>
                <span className="text-2xl font-extrabold text-gas">
                    {sqm < 130 ? '1,2 t' : sqm < 220 ? '2,1 t' : '2,9 t'}
                </span>
            </div>
            <p className="text-xs text-right text-gray-400 mt-1">{sqm < 130 ? '(2.700 Liter)' : sqm < 220 ? '(4.850 Liter)' : '(6.400 Liter)'}</p>
        </div>
    )
};

export default TankAdvisorSimple;
