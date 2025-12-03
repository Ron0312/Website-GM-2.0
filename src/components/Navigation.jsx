import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import TopBar from './TopBar';

const Navigation = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, openWizard }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'start', label: 'Startseite' },
        { id: 'tanks', label: 'Tanks & Kauf' },
        { id: 'gas', label: 'Gas bestellen' },
        { id: 'wissen', label: 'Wissen' },
        { id: 'gewerbe', label: 'Gewerbe' },
        { id: 'ueber-uns', label: 'Über Uns' },
    ];

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <TopBar />
            <nav className={`transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveSection('start')}>
                            {/* Using placeholder image as external image might be blocked, using relative path based on future assets structure */}
                            {/* In a real migration I would download the image and put it in public/images/logo.png */}
                            {/* For now I will use the external link but in the final step I should replace it if I could download it. */}
                            {/* Instructions say "Assume all images ... will be placed in the /public folder". */}
                            <img src="/logo.png" alt="gasmöller" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`} onError={(e) => {e.target.onerror = null; e.target.src="https://gasmoeller.de/wp-content/uploads/2021/08/Logo-01.png"}} />
                        </div>

                        <div className="hidden xl:flex space-x-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
                            {navLinks.map((link) => (
                                <button key={link.id} onClick={() => setActiveSection(link.id)} className={`${activeSection === link.id ? 'bg-white text-gas shadow-sm font-bold' : 'text-gray-500 hover:text-gas hover:bg-gray-100'} px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200`}>{link.label}</button>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            <a href="tel:04551897089" className="flex flex-col items-end text-right mr-2">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Kostenlose Beratung</span>
                                <span className="text-lg font-bold text-gas leading-none">04551 89 70 89</span>
                            </a>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWizard ? openWizard('tank') : setActiveSection('kontakt')} className="bg-gas hover:bg-gas-dark text-white px-6 py-3 rounded-full shadow-lg shadow-gas/20 font-bold text-sm uppercase tracking-wider transition-all flex items-center">
                                Anfrage <ArrowRight size={16} className="ml-2"/>
                            </motion.button>
                        </div>

                        <div className="xl:hidden flex items-center">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-text hover:text-gas p-2">{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl overflow-hidden z-40">
                        <div className="px-6 pt-6 pb-12 space-y-2">
                            {navLinks.map((link) => (
                                <button key={link.id} onClick={() => { setActiveSection(link.id); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-4 text-lg font-bold text-text hover:bg-gas-light hover:text-gas rounded-lg transition-colors">{link.label}</button>
                            ))}
                            <button onClick={() => { openWizard ? openWizard('tank') : setActiveSection('kontakt'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-4 text-lg font-bold text-white bg-gas rounded-lg mt-4">Kontakt aufnehmen</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navigation;
