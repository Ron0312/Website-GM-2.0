import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Accessibility, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = ({ openWizard }) => {
    const [isVisible, setIsVisible] = useState(false);

    const openAccessibility = () => {
        window.dispatchEvent(new CustomEvent('openAccessibilityMenu'));
    };

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-[50] p-4 bg-white/90 backdrop-blur-lg border-t border-gray-200 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex gap-3 safe-area-pb"
                >
                    {/* Social Proof Badge */}
                    <div className="absolute -top-8 left-0 right-0 flex justify-center pointer-events-none">
                        <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-gray-800 pointer-events-auto">
                            <div className="flex text-yellow-400 gap-0.5">
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                                <Star size={10} fill="currentColor" />
                            </div>
                            <span>5.0 bei Google</span>
                        </div>
                    </div>

                    <a
                        href="tel:04551897089"
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl text-gray-700 active:scale-95 transition-transform"
                        aria-label="Anrufen"
                    >
                        <Phone size={20} />
                    </a>
                    <button
                        onClick={() => openWizard('tank')}
                        className="flex-1 bg-gas text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-gas/20 active:scale-95 transition-transform"
                    >
                        Angebot anfordern
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={openAccessibility}
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl text-gray-700 active:scale-95 transition-transform"
                        aria-label="Barrierefreiheit"
                    >
                        <Accessibility size={20} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyCTA;
