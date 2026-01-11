import React from 'react';
import { ShieldCheck, BadgeCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBar = () => (
    <div className="relative z-30 -mt-12 md:-mt-16 mx-auto max-w-7xl px-4 pointer-events-none">
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center md:justify-around gap-3 md:gap-8 py-4 md:py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 md:space-x-4 bg-white/80 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full shadow-sm border border-white/50 pointer-events-auto min-w-[140px]"
            >
                <ShieldCheck size={24} className="text-gas flex-shrink-0 md:w-8 md:h-8"/>
                <div className="text-center md:text-left">
                    <div className="font-bold text-gray-900 leading-tight text-sm md:text-base">TÜV Geprüft</div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-medium hidden md:block">Sicherheit & Qualität</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 md:space-x-4 bg-white/80 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full shadow-sm border border-white/50 pointer-events-auto min-w-[140px]"
            >
                <BadgeCheck size={24} className="text-gas flex-shrink-0 md:w-8 md:h-8"/>
                <div className="text-center md:text-left">
                    <div className="font-bold text-gray-900 leading-tight text-sm md:text-base">DIN 51622</div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-medium hidden md:block">Reinste Propan-Qualität</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full md:w-auto flex items-center justify-center space-x-2 md:space-x-4 bg-white/80 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full shadow-sm border border-white/50 pointer-events-auto"
            >
                <div className="flex items-center">
                     <Star size={24} className="text-gas flex-shrink-0 fill-gas md:w-8 md:h-8"/>
                </div>
                <div className="text-center md:text-left">
                    <div className="font-bold text-gray-900 leading-tight text-sm md:text-base">5.0 / 5.0</div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-medium">Kundenzufriedenheit</div>
                </div>
            </motion.div>
        </div>
    </div>
);

export default TrustBar;
