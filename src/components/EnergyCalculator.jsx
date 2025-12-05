import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Flame, Droplets, Zap, Leaf, Trees } from 'lucide-react';

const FACTORS = {
    kwh: 1,
    lpg_kg: 13.98,
    lpg_m3_gas: 28.1,
    lpg_l_liquid: 7.105,
    nat_gas_m3: 10.0,
    oil_l: 9.7,
    pellets_kg: 4.9,
    wood_hard_rm: 2100, // Buche, Eiche, etc.
    wood_soft_rm: 1500, // Fichte, Kiefer, etc.
};

const CalculatorInput = ({ label, value, unit, onChange, icon: Icon, active, onFocus, onBlur }) => {
    return (
        <motion.div
            animate={active ? { scale: 1.02, borderColor: '#005b9f' } : { scale: 1, borderColor: '#e5e7eb' }}
            className={`bg-white p-4 rounded-xl border-2 transition-colors relative flex flex-col ${active ? 'shadow-lg shadow-gas/10' : ''}`}
        >
            <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
                {Icon && <Icon size={16} className="text-gas/50" />}
            </div>
            <div className="flex items-baseline gap-2">
                <input
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full text-2xl font-bold text-gray-800 outline-none bg-transparent placeholder-gray-200"
                    placeholder="0"
                />
                <span className="text-gray-400 font-medium text-sm whitespace-nowrap">{unit}</span>
            </div>
        </motion.div>
    );
};

const EnergyCalculator = () => {
    const [energyKwh, setEnergyKwh] = useState(9600);
    const [activeField, setActiveField] = useState(null);
    const [inputValue, setInputValue] = useState('');

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
        // Set raw value for editing (without thousands separator if preferable, or just keep it)
        // Here we keep the formatted string but allows user to edit
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
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-12" id="calculator">
            <div className="bg-gradient-to-r from-gas to-gas-dark p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Calculator size={120} />
                </div>
                <h3 className="text-3xl font-bold mb-2 relative z-10">Energie-Rechner</h3>
                <p className="text-gas-light relative z-10 max-w-lg">
                    Vergleichen Sie verschiedene Energieträger auf Basis ihres Brennwerts.
                    Geben Sie einen Wert ein, alle anderen werden automatisch berechnet.
                </p>
            </div>

            <div className="p-8">
                {/* Primary Energy Source (Basis) */}
                <div className="mb-8">
                    <CalculatorInput
                        label="Brennwert-Energie (Basis)"
                        value={getValue('kwh')}
                        unit="kWh"
                        icon={Zap}
                        active={activeField === 'kwh'}
                        onFocus={() => handleFocus('kwh', energyKwh)}
                        onChange={handleChange}
                        onBlur={() => setActiveField(null)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Liquid Gas Group */}
                    <div className="space-y-4">
                         <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm"><Flame size={16} className="text-gas"/> Flüssiggas</h4>
                         <CalculatorInput
                            label="Gewicht"
                            value={getValue('lpg_kg')}
                            unit="kg"
                            active={activeField === 'lpg_kg'}
                            onFocus={() => handleFocus('lpg_kg', energyKwh / FACTORS.lpg_kg)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <CalculatorInput
                            label="Volumen (gasförmig)"
                            value={getValue('lpg_m3_gas')}
                            unit="m³"
                            active={activeField === 'lpg_m3_gas'}
                            onFocus={() => handleFocus('lpg_m3_gas', energyKwh / FACTORS.lpg_m3_gas)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <CalculatorInput
                            label="Volumen (flüssig)"
                            value={getValue('lpg_l_liquid')}
                            unit="l"
                            active={activeField === 'lpg_l_liquid'}
                            onFocus={() => handleFocus('lpg_l_liquid', energyKwh / FACTORS.lpg_l_liquid)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                    </div>

                    {/* Fossil Fuels */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm"><Droplets size={16} className="text-gray-600"/> Fossile Brennstoffe</h4>
                        <CalculatorInput
                            label="Erdgas Volumen"
                            value={getValue('nat_gas_m3')}
                            unit="m³"
                            active={activeField === 'nat_gas_m3'}
                            onFocus={() => handleFocus('nat_gas_m3', energyKwh / FACTORS.nat_gas_m3)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <CalculatorInput
                            label="Heizöl Volumen"
                            value={getValue('oil_l')}
                            unit="l"
                            active={activeField === 'oil_l'}
                            onFocus={() => handleFocus('oil_l', energyKwh / FACTORS.oil_l)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                    </div>

                    {/* Biomass */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm"><Leaf size={16} className="text-green-600"/> Biomasse & Holz</h4>
                         <CalculatorInput
                            label="Pellets Gewicht"
                            value={getValue('pellets_kg')}
                            unit="kg"
                            active={activeField === 'pellets_kg'}
                            onFocus={() => handleFocus('pellets_kg', energyKwh / FACTORS.pellets_kg)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <CalculatorInput
                            label="Hartholz (Buche/Eiche)"
                            value={getValue('wood_hard_rm')}
                            unit="rm"
                            icon={Trees}
                            active={activeField === 'wood_hard_rm'}
                            onFocus={() => handleFocus('wood_hard_rm', energyKwh / FACTORS.wood_hard_rm)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <CalculatorInput
                            label="Weichholz (Fichte/Kiefer)"
                            value={getValue('wood_soft_rm')}
                            unit="rm"
                            icon={Trees}
                            active={activeField === 'wood_soft_rm'}
                            onFocus={() => handleFocus('wood_soft_rm', energyKwh / FACTORS.wood_soft_rm)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                    </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-xl p-6 text-sm text-gray-500">
                    <p className="font-bold mb-2 text-gray-700">Referenzwerte:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li>• 1 rm Buchenholz ≈ 528 kg</li>
                        <li>• 1 rm Fichtenholz ≈ 355 kg</li>
                        <li>• Alle Werte sind Durchschnittswerte und dienen der Orientierung.</li>
                        <li>• Berechnungsbasis: Brennwert (Hi/Ho gemittelt für Vergleichbarkeit).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EnergyCalculator;
