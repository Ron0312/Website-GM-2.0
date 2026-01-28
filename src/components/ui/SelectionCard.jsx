import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SelectionCard = ({ selected, onClick, title, description, icon: Icon, className = '' }) => {
    return (
        <motion.button
            type="button"
            aria-pressed={selected}
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full p-6 text-left rounded-2xl border transition-all duration-200 overflow-hidden group ${className} ${
                selected
                ? 'border-gas bg-gas text-white shadow-xl shadow-gas/20 ring-2 ring-gas ring-offset-2'
                : 'border-gray-200 bg-white hover:border-gas/50 hover:shadow-lg'
            }`}
        >
            <div className="flex flex-col items-center text-center relative z-10 w-full">
                {Icon && (
                    <div className={`mb-4 p-3 rounded-xl transition-colors duration-300 ${
                        selected ? 'bg-white/20 text-white' : 'bg-gas/5 text-gas group-hover:bg-gas/10'
                    }`}>
                        <Icon size={28} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                )}
                <h3 className={`text-lg font-bold mb-1 ${selected ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                {description && <p className={`text-sm ${selected ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>}

                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-white text-gas rounded-full p-1"
                    >
                        <Check size={14} strokeWidth={3} />
                    </motion.div>
                )}
            </div>
        </motion.button>
    );
};

export default SelectionCard;
