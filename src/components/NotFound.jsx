import React from 'react';
import { Home, ArrowRight, Truck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = ({ onGoHome }) => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-gray-50 overflow-hidden relative">

            {/* Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gas/5 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-8 text-gray-300"
            >
                <div className="relative">
                    <Truck size={120} strokeWidth={1} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-2 -right-2 text-red-400"
                    >
                         <AlertTriangle size={40} fill="currentColor" className="text-white" />
                    </motion.div>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gas-dark to-gas mb-4"
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
                Upps! Hier ist der Tank leer.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-10 max-w-md text-lg leading-relaxed"
            >
                Diese Seite scheint es nicht zu geben. Vielleicht wurde sie verschoben oder Sie haben sich vertippt. Keine Sorge, wir bringen Sie zurück auf die Straße.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
                <button
                    onClick={() => onGoHome('start')}
                    className="flex-1 bg-gas text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                    <Home size={20} />
                    Zur Startseite
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
                <a
                    href="mailto:kontakt@gasmoeller.de?subject=Fehler%20404"
                    className="flex-1 bg-white text-gray-700 border-2 border-gray-100 px-6 py-4 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                    Fehler melden
                </a>
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                <span>Beliebte Ziele:</span>
                <button onClick={() => onGoHome('tanks')} className="text-gas font-semibold hover:underline">Tanks kaufen</button>
                <span>•</span>
                <button onClick={() => onGoHome('gas')} className="text-gas font-semibold hover:underline">Gas bestellen</button>
                <span>•</span>
                <button onClick={() => onGoHome('kontakt')} className="text-gas font-semibold hover:underline">Kontakt</button>
            </div>
        </div>
    );
};

export default NotFound;
