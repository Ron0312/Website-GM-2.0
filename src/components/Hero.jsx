import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero = ({
    setActiveSection,
    openWizard,
    title,
    subtitle,
    showBadges = true,
    backgroundImage = "/images/gas-order-hero.webp",
    badgeText,
    customButtons,
    hideButtons = false,
    fullHeight = false,
    children
}) => {

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
        return "Ihr unabhängiger Flüssiggasanbieter im Norden. Schluss mit teuren Mietverträgen: Kaufen Sie Flüssiggastank und Flüssiggas günstig und vertragsfrei.";
    };

    // Badge Logic
    const renderBadge = () => {
        if (!showBadges) return null;

        if (badgeText) {
             return (
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                    <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        {badgeText}
                    </span>
                </div>
             );
        }

        // Default Home Badge
        return (
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} className="text-white" /> Seit 2000 · Norddeutsch · Vertragsfrei
                </span>
            </div>
        );
    };

    return (
        <header className={`relative bg-white pt-32 ${hideButtons ? 'pb-10 lg:pb-32' : 'pb-20 lg:pb-48'} overflow-hidden ${fullHeight ? 'min-h-screen flex items-center' : ''}`}>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30 z-10"></div>
                <img
                    src={backgroundImage}
                    alt="Hero Background"
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
                            {renderBadge()}

                            {/* Brand Name - Visually demoted but present */}
                            {!title && <p className="text-blue-100 font-bold tracking-[0.2em] uppercase text-sm mb-2 drop-shadow-md">Gas-Service Möller</p>}

                            {/* Main H1 */}
                            <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl lg:text-7xl mb-8 leading-tight drop-shadow-lg">
                                {renderTitle()}
                            </h1>

                            <p className="mt-4 text-xl text-gray-100 leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md">
                                {renderSubtitle()}
                            </p>

                            {!hideButtons && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {customButtons ? customButtons : (
                                        <>
                                            {openWizard ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => openWizard('tank')}
                                                    className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent"
                                                >
                                                    Flüssiggastank kaufen
                                                </motion.button>
                                            ) : (
                                                <motion.a
                                                    href="/fluessiggastank-kaufen"
                                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => { e.preventDefault(); setActiveSection('fluessiggastank-kaufen'); }}
                                                    className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent block text-center"
                                                >
                                                    Flüssiggastank kaufen
                                                </motion.a>
                                            )}

                                            {openWizard ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => openWizard('gas')}
                                                    className="px-8 py-4 bg-white text-gas hover:bg-blue-50 text-base font-bold rounded-full shadow-xl shadow-white/10 transition-all uppercase tracking-wide flex items-center justify-center border-2 border-white"
                                                >
                                                    Flüssiggas bestellen
                                                </motion.button>
                                            ) : (
                                                <motion.a
                                                    href="/fluessiggas-bestellen"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => { e.preventDefault(); setActiveSection('fluessiggas-bestellen'); }}
                                                    className="px-8 py-4 bg-white text-gas hover:bg-blue-50 text-base font-bold rounded-full shadow-xl shadow-white/10 transition-all uppercase tracking-wide flex items-center justify-center border-2 border-white block text-center"
                                                >
                                                    Flüssiggas bestellen
                                                </motion.a>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                    {children && (
                         <div className="mt-8 lg:mt-0">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Hero;
