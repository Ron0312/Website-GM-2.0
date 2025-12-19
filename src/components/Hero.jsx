import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero = ({ setActiveSection, openWizard, title, subtitle, showBadges = true }) => {
    // Default content if not provided props
    const isDefault = !title;

    // Main Title logic
    const renderTitle = () => {
        if (title) return title;
        return (
            <>
                Flüssiggas, <br className="hidden xs:block" />
                Flüssiggastanks <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">& Service.</span>
            </>
        );
    };

    // Subtitle logic
    const renderSubtitle = () => {
        if (subtitle) return subtitle;
        return "Schluss mit teuren Mietverträgen. Werden Sie Eigentümer Ihres Flüssiggastanks und kaufen Sie Flüssiggas, wo es am günstigsten ist.";
    };

    return (
        <header className="relative bg-white pt-48 pb-24 lg:pt-64 lg:pb-48 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/10 z-10"></div>
                <img
                    src="/images/gas-order-hero.webp"
                    alt="Landschaft Norddeutschland"
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover absolute inset-0 object-[35%_center] md:object-[75%_center] lg:object-center"
                    loading="eager"
                    fetchpriority="high"
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                    <div className="text-left text-white">
                        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            {showBadges && (
                                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-white" /> Seit 2000 · Norddeutsch · Ehrlich
                                    </span>
                                </div>
                            )}

                            {/* Brand Name - Visually demoted but present */}
                            <p className="text-blue-100 font-bold tracking-[0.2em] uppercase text-sm mb-2 drop-shadow-md">Gas-Service Möller</p>

                            {/* Main H1 */}
                            <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl lg:text-7xl mb-8 leading-tight drop-shadow-lg">
                                {renderTitle()}
                            </h1>

                            <p className="mt-4 text-xl text-gray-100 leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md">
                                {renderSubtitle()}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openWizard ? openWizard('tank') : setActiveSection('tanks')}
                                    className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent"
                                >
                                    Tank kaufen
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openWizard ? openWizard('gas') : setActiveSection('gas')}
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gas text-base font-bold rounded-full shadow-lg transition-all uppercase tracking-wide flex items-center justify-center backdrop-blur-sm"
                                >
                                    Flüssiggas bestellen
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
