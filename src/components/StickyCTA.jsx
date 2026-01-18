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
                    {/* Social Proof Badge - Floating on top */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-100 shadow-md rounded-full px-3 py-1 text-[10px] font-bold text-gray-700 flex items-center gap-1 whitespace-nowrap">
                        <div className="flex">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <span className="text-gray-900 ml-1">5.0</span>
                        <span className="text-gray-600 font-normal">bei Google</span>
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
