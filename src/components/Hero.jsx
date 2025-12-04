import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = ({ setActiveSection, openWizard }) => (
    <header className="relative bg-white pt-48 pb-24 lg:pt-64 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/10 z-10"></div>
             {/* Placeholder for the hero image */}
             <div className="w-full h-full bg-gray-300"></div>
             {/* Ideally I would put the image here, but I can't download external resources to file system easily. */}
             {/* I will put an img tag with the external source for now, but it should be replaced with local asset. */}
            <img src="/images/gas-order-hero.webp" alt="Landschaft Norddeutschland" className="w-full h-full object-cover absolute inset-0" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                <div className="text-left text-white">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Seit 2005 · Norddeutsch · Ehrlich</span>
                        </div>
                        <h1 className="text-6xl tracking-tight font-extrabold sm:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-lg">Energie.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Freiheit.</span></h1>
                        <p className="mt-4 text-xl text-gray-100 leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md">Schluss mit teuren Mietverträgen. Werden Sie Eigentümer Ihres Tanks und kaufen Sie Gas, wo es am günstigsten ist.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWizard ? openWizard('tank') : setActiveSection('tanks')} className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent">Tank kaufen</motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWizard ? openWizard('gas') : setActiveSection('gas')} className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gas text-base font-bold rounded-full shadow-lg transition-all uppercase tracking-wide flex items-center justify-center backdrop-blur-sm">Gas bestellen</motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </header>
);

export default Hero;
