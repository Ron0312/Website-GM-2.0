import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Flame, Droplets, Zap, Leaf, Trees, ChevronDown, ChevronUp, Info } from 'lucide-react';

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
        <div className="relative group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block pl-1">{label}</label>
            <div
                className={`
                    flex items-center bg-white p-3 rounded-xl border-2 transition-all duration-200
                    ${active ? 'border-gas shadow-lg shadow-gas/10 scale-[1.02]' : 'border-gray-100 hover:border-gray-200'}
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
                        className="w-full text-xl md:text-2xl font-bold text-gray-800 outline-none bg-transparent placeholder-gray-200 font-mono"
                        placeholder="0"
                        aria-label={`${label} in ${unit}`}
                    />
                </div>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-100">
                    <span className="text-gray-400 font-medium text-sm whitespace-nowrap">{unit}</span>
                    {Icon && <Icon size={18} className={`${active ? 'text-gas' : 'text-gray-300'}`} />}
                </div>
            </div>
        </div>
    );
};

const EnergyCalculator = () => {
    const [energyKwh, setEnergyKwh] = useState(9600);
    const [activeField, setActiveField] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

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
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-8 md:my-12 transition-all"
            id="calculator"
            itemScope
            itemType="http://schema.org/SoftwareApplication"
        >
            <meta itemProp="name" content="Energie-Vergleichsrechner" />
            <meta itemProp="applicationCategory" content="UtilityApplication" />
            <meta itemProp="operatingSystem" content="Web Browser" />

            {/* Header / Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left bg-gradient-to-r from-gas to-gas-dark p-6 md:p-8 text-white relative overflow-hidden group focus:outline-none md:cursor-default"
                aria-expanded={isExpanded}
                aria-controls="calculator-content"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                    <Calculator size={120} />
                </div>

                <div className="relative z-10 flex justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold">Energie-Rechner</h2>
                            <span className="bg-white/20 text-xs px-2 py-0.5 rounded text-white/90 font-medium hidden md:inline-block">Interaktiv</span>
                        </div>
                        <p className="text-gas-light text-sm md:text-base max-w-lg pr-8">
                            Vergleichen Sie Heizwerte von Flüssiggas, Öl, Holz & mehr.
                        </p>
                    </div>

                    {/* Mobile Toggle Icon */}
                    <div className="md:hidden mt-1 bg-white/10 p-2 rounded-full backdrop-blur-sm transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown size={24} />
                    </div>
                </div>
            </button>

            {/* Content Area */}
            <div className={`md:block ${isExpanded ? 'block' : 'hidden'} bg-gray-50/50`} id="calculator-content">
                <div className="p-6 md:p-8">
                    {/* Main Input - Energy Basis */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-2 mb-4 text-gas-dark">
                            <Zap size={20} className="text-yellow-500 fill-yellow-500" />
                            <h3 className="font-bold text-lg">Basis-Energiebedarf</h3>
                        </div>
                        <CalculatorInput
                            label="Energiegehalt in kWh"
                            value={getValue('kwh')}
                            unit="kWh"
                            active={activeField === 'kwh'}
                            onFocus={() => handleFocus('kwh', energyKwh)}
                            onChange={handleChange}
                            onBlur={() => setActiveField(null)}
                        />
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <Info size={12} />
                            Geben Sie hier einen Wert ein, um alle anderen Energieträger zu berechnen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Liquid Gas Group */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
                                <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                                    <Flame size={18} />
                                </div>
                                Flüssiggas
                            </h4>
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
                            <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
                                <div className="p-1.5 bg-gray-200 rounded-lg text-gray-600">
                                    <Droplets size={18} />
                                </div>
                                Fossile Brennstoffe
                            </h4>
                            <CalculatorInput
                                label="Erdgas H"
                                value={getValue('nat_gas_m3')}
                                unit="m³"
                                active={activeField === 'nat_gas_m3'}
                                onFocus={() => handleFocus('nat_gas_m3', energyKwh / FACTORS.nat_gas_m3)}
                                onChange={handleChange}
                                onBlur={() => setActiveField(null)}
                            />
                            <CalculatorInput
                                label="Heizöl EL"
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
                            <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
                                <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                                    <Leaf size={18} />
                                </div>
                                Biomasse & Holz
                            </h4>
                            <CalculatorInput
                                label="Holzpellets"
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

                    <div className="mt-8 bg-blue-50/50 rounded-xl p-6 text-sm text-gray-500 border border-blue-100/50">
                        <p className="font-bold mb-2 text-gas-dark flex items-center gap-2">
                            <Info size={16} />
                            Hinweise zur Berechnung:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 list-disc list-inside">
                            <li>1 Raummeter (rm) Buchenholz ≈ 528 kg</li>
                            <li>1 Raummeter (rm) Fichtenholz ≈ 355 kg</li>
                            <li>Werte basieren auf durchschnittlichen Heizwerten (Hi)</li>
                            <li>Dient der Orientierung, tatsächliche Werte variieren je nach Qualität</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnergyCalculator;
