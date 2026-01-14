import React, { useState } from 'react';
import { RefreshCw, Zap, Scale, Droplets, Wind, Flame, Leaf, Trees, RotateCcw } from 'lucide-react';

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
        lpg_vol_liq: 6.57, // Liter
        lpg_vol_gas: 25.89, // m3
        natgas: 10.0,      // m3
        oil: 9.8,          // Liter
        pellets: 4.8,      // kg
        wood_hard: 2100,   // rm
        wood_soft: 1500    // rm
    };

    const handleFocus = (id, factor) => {
        setActiveField(id);
        if (!kwh) {
            setLocalValue('');
        } else {
            const val = kwh / factor;
            setLocalValue(parseFloat(val.toFixed(2)).toString());
        }
    };

    const handleChange = (e, id, factor) => {
        const val = e.target.value;
        setLocalValue(val);

        const num = parseFloat(val.replace(',', '.'));

        if (val === '' || isNaN(num)) {
            setKwh(0);
        } else {
            setKwh(num * factor);
        }
    };

    const handleBlur = () => {
        setActiveField(null);
        setLocalValue('');
    };

    const handleReset = () => {
        setKwh(0);
        setLocalValue('');
        setActiveField(null);
    };

    const InputCard = ({ label, id, unit, factor, icon: Icon, colorClass }) => {
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
            <div className={`relative p-4 rounded-2xl border-2 transition-all ${activeField === id ? 'border-gas bg-white shadow-md scale-105 z-10' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon size={18} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
                </div>

                <div className="flex items-baseline gap-2">
                    <input
                        type="text"
                        inputMode="decimal"
                        className="w-full bg-transparent text-2xl font-extrabold text-gray-800 outline-none placeholder-gray-300"
                        value={displayValue}
                        onFocus={() => handleFocus(id, factor)}
                        onChange={(e) => handleChange(e, id, factor)}
                        onBlur={handleBlur}
                        placeholder="0"
                    />
                    <span className="text-sm font-bold text-gray-400 shrink-0">{unit}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-gas-light/10 p-3 rounded-2xl text-gas">
                        <RefreshCw size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl text-gray-900">Energie-Umrechner</h3>
                        <p className="text-gray-500">Vergleichen Sie Äpfel mit Birnen – oder Gas mit Öl.</p>
                    </div>
                </div>

                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors text-sm"
                >
                    <RotateCcw size={16} /> Alles zurücksetzen
                </button>
            </div>

            <div className="space-y-8">
                {/* Section: Basis */}
                <div className="bg-yellow-50/50 border border-yellow-100 rounded-3xl p-6">
                    <h4 className="text-yellow-800 font-bold mb-4 flex items-center gap-2">
                        <Zap size={20} /> Energie-Basiswert
                    </h4>
                    <div className="max-w-md">
                        <InputCard
                            label="Energiegehalt"
                            id="kwh"
                            unit="kWh"
                            factor={PRO_FACTORS.kwh}
                            icon={Zap}
                            colorClass="bg-yellow-200 text-yellow-700"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Section: Flüssiggas */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                            <Flame size={20} className="text-gas" /> Flüssiggas (Propan)
                        </h4>
                        <div className="grid gap-4">
                            <InputCard
                                label="Gewicht"
                                id="lpg_kg"
                                unit="kg"
                                factor={PRO_FACTORS.lpg_kg}
                                icon={Scale}
                                colorClass="bg-blue-100 text-blue-600"
                            />
                            <InputCard
                                label="Volumen (Flüssig)"
                                id="lpg_vol_liq"
                                unit="Liter"
                                factor={PRO_FACTORS.lpg_vol_liq}
                                icon={Droplets}
                                colorClass="bg-blue-100 text-blue-600"
                            />
                            <InputCard
                                label="Volumen (Gasförmig)"
                                id="lpg_vol_gas"
                                unit="m³"
                                factor={PRO_FACTORS.lpg_vol_gas}
                                icon={Wind}
                                colorClass="bg-blue-100 text-blue-600"
                            />
                        </div>
                    </div>

                    {/* Section: Andere */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                            <Leaf size={20} className="text-green-600" /> Andere Energieträger
                        </h4>
                        <div className="grid gap-4">
                            <InputCard
                                label="Heizöl"
                                id="oil"
                                unit="Liter"
                                factor={PRO_FACTORS.oil}
                                icon={Droplets}
                                colorClass="bg-gray-200 text-gray-700"
                            />
                            <InputCard
                                label="Erdgas"
                                id="natgas"
                                unit="m³"
                                factor={PRO_FACTORS.natgas}
                                icon={Flame}
                                colorClass="bg-gray-200 text-gray-700"
                            />
                            <InputCard
                                label="Holzpellets"
                                id="pellets"
                                unit="kg"
                                factor={PRO_FACTORS.pellets}
                                icon={Leaf}
                                colorClass="bg-green-100 text-green-700"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputCard
                                    label="Hartholz"
                                    id="wood_hard"
                                    unit="rm"
                                    factor={PRO_FACTORS.wood_hard}
                                    icon={Trees}
                                    colorClass="bg-green-100 text-green-700"
                                />
                                <InputCard
                                    label="Weichholz"
                                    id="wood_soft"
                                    unit="rm"
                                    factor={PRO_FACTORS.wood_soft}
                                    icon={Trees}
                                    colorClass="bg-green-100 text-green-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 flex items-start gap-2">
                <span className="font-bold">Hinweis:</span>
                <p>
                    Alle Werte sind Durchschnittswerte (Heizwerte). Tatsächliche Energieausbeute hängt vom Wirkungsgrad Ihrer Heizung ab.
                    1 rm = Raummeter (geschichtet).
                </p>
            </div>
        </div>
    );
};

export default UnitConverter;
