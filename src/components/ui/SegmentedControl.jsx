import React from 'react';
import { motion } from 'framer-motion';

const SegmentedControl = ({ options, value, onChange, name = "segmented-control" }) => {
    return (
        <div
            className="flex p-1.5 bg-gray-50/80 border border-gray-100 rounded-2xl relative w-full"
            role="radiogroup"
            aria-orientation="horizontal"
        >
            {options.map((option) => {
                const isSelected = value === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => onChange(option.value)}
                        className={`relative flex-1 py-3.5 px-2 text-sm font-bold transition-colors z-10 rounded-xl ${
                            isSelected ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {isSelected && (
                            <motion.div
                                layoutId={`segment-${name}`}
                                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-100"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ zIndex: -1 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default SegmentedControl;
