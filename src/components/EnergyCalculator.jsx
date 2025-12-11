import React, { useState } from 'react';
import { Calculator, ChevronDown, Info, Zap } from 'lucide-react';

const FACTORS = {
    kwh: 1,
    lpg_kg: 13.98,
    lpg_m3_gas: 28.1,
    lpg_l_liquid: 7.105,
    nat_gas_m3: 10.0,
    oil_l: 9.7,
    pellets_kg: 4.9,
    wood_hard_rm: 2100, // Buche, Eiche, Esche, Robinie
    wood_soft_rm: 1500, // Erle, Fichte, Linde
};

const CalculatorInput = ({ label, value, unit, onChange, active, onFocus, onBlur, placeholder }) => {
    return (
        <div className="relative group">
            <label className="text-sm font-bold text-gray-700 mb-2 block">{label}</label>
            <div
                className={`
                    flex items-center bg-white p-3 rounded-lg border transition-all duration-200
                    ${active ? 'border-gas ring-4 ring-gas/10' : 'border-gray-300 hover:border-gray-400'}
                `}
            >
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        inputMode="decimal"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className="w-full text-lg text-gray-900 outline-none bg-transparent placeholder-gray-400 font-sans"
                        placeholder={placeholder}
                        aria-label={`${label} in ${unit}`}
                    />
                </div>
                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
                    <span className="text-gray-500 font-medium text-base whitespace-nowrap">{unit}</span>
                </div>
            </div>
        </div>
    );
};

const EnergyCalculator = ({ defaultExpanded = false }) => {
    const [energyKwh, setEnergyKwh] = useState(9600);
    const [activeField, setActiveField] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Format number to German locale
    const formatNumber = (num) => {
        if (!num && num !== 0) return '';
        return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Parse German number string
    const parseNumber = (str) => {
        if (!str) return 0;
        const normalized = str.replace(/\./g, '').replace(',', '.');
        return parseFloat(normalized) || 0;
    };

    const handleFocus = (field, currentVal) => {
        setActiveField(field);
        setInputValue(formatNumber(currentVal));
    };

    const handleChange = (val) => {
        setInputValue(val);
        const num = parseNumber(val);
        const factor = FACTORS[activeField];
        if (!isNaN(num)) {
            setEnergyKwh(num * factor);
        }
    };

    const getValue = (field) => {
        if (activeField === field) {
            return inputValue;
        }
        const val = energyKwh / FACTORS[field];
        return formatNumber(val);
    };

    return (
        <section
            className="bg-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-8 md:my-12 transition-all"
            id="calculator"
            itemScope
            itemType="http://schema.org/SoftwareApplication"
        >
            <meta itemProp="name" content="Profi-Energie-Rechner" />
            <meta itemProp="applicationCategory" content="UtilityApplication" />
            <meta itemProp="operatingSystem" content="Web Browser" />

            {/* Header / Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left bg-gradient-to-r from-gas to-gas-dark p-6 md:p-8 text-white relative overflow-hidden group focus:outline-none"
                aria-expanded={isExpanded}
                aria-controls="calculator-content"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                    <Calculator size={120} />
                </div>

                <div className="relative z-10 flex justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold">Profi-Rechner</h2>
                            <span className="bg-white/20 text-xs px-2 py-0.5 rounded text-white/90 font-medium hidden md:inline-block">Interaktiv</span>
                        </div>
                        <p className="text-gas-light text-sm md:text-base max-w-lg pr-8">
                            Berechnen und Vergleichen Sie präzise Energiewerte für Flüssiggas, Erdgas, Heizöl, Pellets und Holz.
                        </p>
                    </div>

                    {/* Toggle Icon */}
                    <div className="mt-1 bg-white/10 p-2 rounded-full backdrop-blur-sm transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown size={24} />
                    </div>
                </div>
            </button>

            {/* Content Area */}
            <div className={`${isExpanded ? 'block' : 'hidden'} bg-white`} id="calculator-content">
                <div className="p-6 md:p-8 space-y-8">

                     {/* Basis / Hidden KWH */}
                    <div className="hidden">
                        <label>Basis kWh</label>
                        <input value={energyKwh} readOnly />
                    </div>

                    {/* Row 1: LPG */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                         <div className="md:col-span-3 md:col-start-2">
                            <CalculatorInput
                                label="Gewicht Flüssiggas"
                                value={getValue('lpg_kg')}
                                unit="kg"
                                placeholder="686,70"
                                active={activeField === 'lpg_kg'}
                                onFocus={() => handleFocus('lpg_kg', energyKwh / FACTORS.lpg_kg)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <CalculatorInput
                                label="Volumen Flüssiggas (gasförmig)"
                                value={getValue('lpg_m3_gas')}
                                unit="m³"
                                placeholder="341,70"
                                active={activeField === 'lpg_m3_gas'}
                                onFocus={() => handleFocus('lpg_m3_gas', energyKwh / FACTORS.lpg_m3_gas)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                         <div className="md:col-span-3">
                            <CalculatorInput
                                label="Volumen Flüssiggas (flüssig)"
                                value={getValue('lpg_l_liquid')}
                                unit="l"
                                placeholder="1351,08"
                                active={activeField === 'lpg_l_liquid'}
                                onFocus={() => handleFocus('lpg_l_liquid', energyKwh / FACTORS.lpg_l_liquid)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                    </div>

                    {/* Row 2: Nat Gas */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3 md:col-start-2">
                             <CalculatorInput
                                label="Volumen Erdgas"
                                value={getValue('nat_gas_m3')}
                                unit="m³"
                                placeholder="960"
                                active={activeField === 'nat_gas_m3'}
                                onFocus={() => handleFocus('nat_gas_m3', energyKwh / FACTORS.nat_gas_m3)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                    </div>

                    {/* Row 3: Oil */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3 md:col-start-2">
                            <CalculatorInput
                                label="Volumen Heizöl"
                                value={getValue('oil_l')}
                                unit="l"
                                placeholder="989,88"
                                active={activeField === 'oil_l'}
                                onFocus={() => handleFocus('oil_l', energyKwh / FACTORS.oil_l)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                    </div>

                    {/* Row 4: Pellets */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3 md:col-start-2">
                             <CalculatorInput
                                label="Gewicht Pellets"
                                value={getValue('pellets_kg')}
                                unit="kg"
                                placeholder="1959,18"
                                active={activeField === 'pellets_kg'}
                                onFocus={() => handleFocus('pellets_kg', energyKwh / FACTORS.pellets_kg)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                    </div>

                    {/* Row 5: Wood */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                         <div className="md:col-span-3 md:col-start-2">
                             <CalculatorInput
                                label="Volumen Holz (Buche, Eiche, Esche, Robinie)"
                                value={getValue('wood_hard_rm')}
                                unit="rm"
                                placeholder="4,57"
                                active={activeField === 'wood_hard_rm'}
                                onFocus={() => handleFocus('wood_hard_rm', energyKwh / FACTORS.wood_hard_rm)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                        <div className="md:col-span-3">
                             <CalculatorInput
                                label="Volumen Holz (Erle, Fichte, Linde)"
                                value={getValue('wood_soft_rm')}
                                unit="rm"
                                placeholder="6,40"
                                active={activeField === 'wood_soft_rm'}
                                onFocus={() => handleFocus('wood_soft_rm', energyKwh / FACTORS.wood_soft_rm)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                        </div>
                    </div>

                    {/* Footer / Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-gray-100">
                        <div className="md:col-span-10 md:col-start-2 text-gray-600">
                             <p className="font-bold mb-2">Zum Vergleich:</p>
                             <ul className="list-disc list-inside space-y-1">
                                <li>1 rm Buchenholz = ca. 528 kg</li>
                                <li>1 rm Fichtenholz = ca. 355 kg</li>
                             </ul>
                        </div>
                    </div>

                    {/* Optional Base Energy Display */}
                    <div className="flex justify-end pt-4">
                         <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2 text-sm text-gray-500">
                             <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                             <span>Basis: <strong>{formatNumber(energyKwh)} kWh</strong></span>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnergyCalculator;
