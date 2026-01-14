import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const UnitConverter = () => {
    // We store one single truth: kWh (energy content)
    const [kwh, setKwh] = useState(9600);

    // UI State for handling input correctly (allow decimals, clearing, etc.)
    const [activeField, setActiveField] = useState(null);
    const [localValue, setLocalValue] = useState('');

    // Factors (1 unit = X kWh)
    const PRO_FACTORS = {
        kwh: 1.0,
        lpg_kg: 12.87,
        lpg_vol_liq: 6.57,
        lpg_vol_gas: 25.89,
        natgas: 10.0,
        oil: 9.8,
        pellets: 4.8,
        wood_hard: 2100,
        wood_soft: 1500
    };

    const handleFocus = (id, factor) => {
        setActiveField(id);
        // Set initial local value from current derived state, formatted cleanly
        // If kwh is 0, we start with empty string or '0'? User likely wants to type.
        if (!kwh) {
            setLocalValue('');
        } else {
             // Calculate value: kwh / factor
            const val = kwh / factor;
            // Round to 2 decimals and remove trailing zeros (parseFloat does this to the fixed string)
            setLocalValue(parseFloat(val.toFixed(2)).toString());
        }
    };

    const handleChange = (e, id, factor) => {
        const val = e.target.value;
        setLocalValue(val); // Update display immediately

        // Parse
        const num = parseFloat(val.replace(',', '.'));

        if (val === '' || isNaN(num)) {
            setKwh(0);
        } else {
            // value * factor = kwh
            setKwh(num * factor);
        }
    };

    const handleBlur = () => {
        setActiveField(null);
        setLocalValue('');
    };

    // Helper to render an input field
    const renderInput = (label, id, unit, factor, fullWidth = false) => {
        // Determine value to show
        // If this field is active, show the local raw string
        // If not, calculate from kwh
        let displayValue = '';
        if (activeField === id) {
            displayValue = localValue;
        } else {
            if (kwh) {
                const val = kwh / factor;
                displayValue = parseFloat(val.toFixed(2));
            }
        }

        return (
            <div className={fullWidth ? "lg:col-start-2" : ""}>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{label}</label>
                <div className="relative">
                    <input
                        type="text"
                        inputMode="decimal"
                        className={`w-full p-3 border-2 rounded-xl font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-gas/10 transition-all ${activeField === id ? 'border-gas bg-white' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                        value={displayValue}
                        onFocus={() => handleFocus(id, factor)}
                        onChange={(e) => handleChange(e, id, factor)}
                        onBlur={handleBlur}
                        placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold pointer-events-none">{unit}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
             <div className="flex items-center gap-3 mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
                <RefreshCw size={24} className="flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-lg">Einheiten-Umrechner</h3>
                    <p className="text-sm">Geben Sie einen Wert ein – alle anderen werden automatisch berechnet.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8">
                {/* Energy */}
                {renderInput('Brennwert-Energie', 'kwh', 'kWh', PRO_FACTORS.kwh, true)}

                {/* LPG */}
                <div className="col-span-full border-t border-gray-100 my-2"></div>

                {renderInput('Gewicht Flüssiggas', 'lpg_kg', 'kg', PRO_FACTORS.lpg_kg, true)}
                {renderInput('Volumen (Gasförmig)', 'lpg_vol_gas', 'm³', PRO_FACTORS.lpg_vol_gas)}
                {renderInput('Volumen (Flüssig)', 'lpg_vol_liq', 'Liter', PRO_FACTORS.lpg_vol_liq)}

                 {/* Others */}
                <div className="col-span-full border-t border-gray-100 my-2"></div>
                {renderInput('Erdgas', 'natgas', 'm³', PRO_FACTORS.natgas, true)}

                <div className="col-span-full border-t border-gray-100 my-2"></div>
                {renderInput('Heizöl', 'oil', 'Liter', PRO_FACTORS.oil, true)}

                <div className="col-span-full border-t border-gray-100 my-2"></div>
                {renderInput('Pellets', 'pellets', 'kg', PRO_FACTORS.pellets, true)}

                <div className="col-span-full border-t border-gray-100 my-2"></div>
                {renderInput('Hartholz (Buche/Eiche)', 'wood_hard', 'rm', PRO_FACTORS.wood_hard, true)}
                {renderInput('Weichholz (Fichte/Kiefer)', 'wood_soft', 'rm', PRO_FACTORS.wood_soft)}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500 flex flex-col md:flex-row justify-between gap-4">
                 <div>
                    <strong>Richtwerte zur Orientierung:</strong>
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li>1 kg Propan ≈ 12,87 kWh</li>
                        <li>1 Liter Propan (flüssig) ≈ 6,57 kWh</li>
                        <li>1 m³ Erdgas ≈ 10 kWh</li>
                    </ul>
                 </div>
                 <div>
                     <strong>Holz-Faktoren:</strong>
                     <ul className="list-disc pl-4 mt-1 space-y-1">
                         <li>1 rm Buchenholz ≈ 2100 kWh (ca. 528 kg)</li>
                         <li>1 rm Fichtenholz ≈ 1500 kWh (ca. 355 kg)</li>
                     </ul>
                 </div>
            </div>
        </div>
    );
};

export default UnitConverter;
