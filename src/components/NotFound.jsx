import React, { useState } from 'react';
import { Home, ArrowRight, Truck, AlertTriangle, Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = ({ onGoHome }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to knowledge base with search query (if supported) or just open knowledge base
            // Since we don't have a real search page yet, we send them to /wissen
            window.location.href = `/wissen?q=${encodeURIComponent(searchQuery)}`;
        }
    };

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
                className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed"
            >
                Diese Seite scheint es nicht zu geben. Suchen Sie nach etwas Bestimmtem?
            </motion.p>

            {/* Search Bar */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onSubmit={handleSearch}
                className="w-full max-w-md mb-8 relative"
            >
                <input
                    type="text"
                    placeholder="Suchbegriff eingeben..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-gas focus:ring-2 focus:ring-gas/20 outline-none transition-all pr-12 text-gray-700 font-medium"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gas text-white rounded-lg hover:bg-gas-dark transition-colors"
                    aria-label="Suchen"
                >
                    <Search size={20} />
                </button>
            </motion.form>

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
                    Startseite
                </button>
                <a
                    href="/wissen"
                    className="flex-1 bg-white text-gray-700 border-2 border-gray-100 px-6 py-4 rounded-xl font-bold hover:border-gas/20 hover:bg-gas-light/10 transition-all flex items-center justify-center gap-2"
                >
                    <BookOpen size={20} className="text-gas"/>
                    Ratgeber
                </a>
            </motion.div>

            <div className="mt-12">
                <p className="text-sm text-gray-500 mb-3 font-medium">Oder direkt zu:</p>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                    <button onClick={() => onGoHome('tanks')} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gas hover:text-gas transition-all">Tanks kaufen</button>
                    <button onClick={() => onGoHome('gas')} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gas hover:text-gas transition-all">Gas bestellen</button>
                    <button onClick={() => onGoHome('kontakt')} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gas hover:text-gas transition-all">Kontakt</button>
                    <a href="/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t" className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gas hover:text-gas transition-all">1.2t Tank</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
