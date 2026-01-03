import React from 'react';
import { Settings, Flame, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({
    setActiveSection,
    openWizard,
    title,
    subtitle,
    backgroundImage,
    badgeText,
    customButtons,
    children
}) => {
    // Default values
    const bgImage = backgroundImage || "/images/gas-order-hero.webp";
    const mainTitle = title || (
        <>
            Flüssiggas, <br/>
            Flüssiggastanks <br/>
            & Service.
        </>
    );
    const subTitle = subtitle || "Ihr unabhängiger Partner in Norddeutschland. Keine Vertragsbindung, faire Preise und persönliche Beratung.";

    return (
        <section className="relative w-full overflow-hidden bg-gray-900 pt-32 lg:pt-0 min-h-[90vh] md:min-h-screen flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Gas-Service Möller Hero Background"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchpriority="high"
                    width="1920"
                    height="1080"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/30"></div>
            </div>

            <div className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text & CTA */}
                    <div className="max-w-2xl pt-20 lg:pt-0">
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8"
                        >
                            <div className="flex -space-x-1">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <span className="text-white/90 text-xs font-bold tracking-wide uppercase">
                                {badgeText || "Top-Bewertet in Norddeutschland"}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
                        >
                            {mainTitle}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg"
                        >
                            {subTitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            {customButtons ? customButtons : (
                                <>
                                    <button
                                        onClick={() => openWizard ? openWizard('tank') : setActiveSection('fluessiggastank-kaufen')}
                                        className="group relative flex items-center justify-center gap-3 bg-gas text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-gas/30 hover:shadow-gas/50 hover:bg-gas-dark transition-all transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                                        <Settings className="relative z-10 w-6 h-6" />
                                        <span className="relative z-10">Tank kaufen</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveSection ? setActiveSection('fluessiggas-bestellen') : null}
                                        className="group flex items-center justify-center gap-3 bg-white text-gas px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                                    >
                                        <Flame className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
                                        <span>Flüssiggas bestellen</span>
                                    </button>
                                </>
                            )}
                        </motion.div>

                        {/* USPs / Features List */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-y-4 gap-x-8"
                        >
                            {[
                                "Keine Vertragsbindung",
                                "TÜV-geprüfte Tanks",
                                "Eigene Tankwagenflotte",
                                "Persönlicher Service"
                            ].map((usp, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gas/20 flex items-center justify-center border border-gas/30">
                                        <Check size={10} className="text-gas-light" />
                                    </div>
                                    {usp}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Dynamic Content (Calculator, Image, etc.) */}
                    {children && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="hidden lg:block relative z-10"
                        >
                            {children}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
