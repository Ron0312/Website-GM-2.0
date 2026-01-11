import React from 'react';
import { ShieldCheck, BadgeCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBar = () => (
    <div className="relative z-30 -mt-12 md:-mt-16 mx-auto max-w-7xl px-4 pointer-events-none">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-sm border border-white/50 pointer-events-auto"
            >
                <ShieldCheck size={32} className="text-gas flex-shrink-0"/>
                <div>
                    <div className="font-bold text-gray-900 leading-tight">TÜV Geprüft</div>
                    <div className="text-xs text-gray-500 font-medium">Sicherheit & Qualität</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-sm border border-white/50 pointer-events-auto"
            >
                <BadgeCheck size={32} className="text-gas flex-shrink-0"/>
                <div>
                    <div className="font-bold text-gray-900 leading-tight">DIN 51622</div>
                    <div className="text-xs text-gray-500 font-medium">Reinste Propan-Qualität</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-sm border border-white/50 pointer-events-auto"
            >
                <div className="flex items-center">
                     <Star size={32} className="text-gas flex-shrink-0 fill-gas"/>
                </div>
                <div>
                    <div className="font-bold text-gray-900 leading-tight">5.0 / 5.0</div>
                    <div className="text-xs text-gray-500 font-medium">Kundenzufriedenheit</div>
                </div>
            </motion.div>
        </div>
    </div>
);

export default TrustBar;
