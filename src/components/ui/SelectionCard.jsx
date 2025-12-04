import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SelectionCard = ({ selected, onClick, title, description, icon: Icon, className = '' }) => {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${className} ${
                selected
                ? 'border-gas bg-gas text-white shadow-xl shadow-gas/20'
                : 'border-gray-100 bg-white hover:border-gas/50 hover:shadow-lg'
            }`}
        >
            <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col items-start">
                    {Icon && <Icon size={32} className={`mb-4 ${selected ? 'text-white' : 'text-gas group-hover:scale-110 transition-transform duration-300'}`} />}
                    <h3 className={`text-xl font-bold mb-1 ${selected ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    {description && <p className={`text-sm ${selected ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>}
                </div>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white/20 p-2 rounded-full absolute top-0 right-0"
                    >
                        <Check size={20} className="text-white" />
                    </motion.div>
                )}
            </div>

            {/* Background Decoration */}
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 ${selected ? 'bg-white/20 opacity-100' : 'bg-gas/5 opacity-0 group-hover:opacity-100'}`} />
        </motion.button>
    );
};

export default SelectionCard;
