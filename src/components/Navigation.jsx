import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import TopBar from './TopBar';

const Navigation = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, openWizard }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'start', label: 'Startseite' },
        {
            id: 'tanks',
            label: 'Tanks & Kauf',
            subLinks: [
                { id: 'tanks/1-2t-oberirdisch', label: '1,2 t Tank (2700 L)' },
                { id: 'tanks/2-1t-oberirdisch', label: '2,1 t Tank (4850 L)' },
                { id: 'tanks/2-9t-oberirdisch', label: '2,9 t Tank (6400 L)' }
            ]
        },
        { id: 'gas', label: 'Gas bestellen' },
        { id: 'wissen', label: 'Wissen' },
        { id: 'gewerbe', label: 'Gewerbe' },
        { id: 'ueber-uns', label: 'Über Uns' },
    ];

    const handleLinkClick = (link) => {
        if (link.subLinks) {
             // If clicking the parent, just go to the main section
             setActiveSection(link.id);
        } else {
             setActiveSection(link.id);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <TopBar />
            <nav className={`transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveSection('start')}>
                            <img src="/logos/Icon-01.webp" alt="gasmöller" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`} />
                        </div>

                        <div className="hidden xl:flex space-x-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
                            {navLinks.map((link) => (
                                <div key={link.id} className="relative group"
                                     onMouseEnter={() => link.subLinks && setOpenDropdown(link.id)}
                                     onMouseLeave={() => link.subLinks && setOpenDropdown(null)}
                                >
                                    <button
                                        onClick={() => handleLinkClick(link)}
                                        className={`${activeSection === link.id || (link.subLinks && activeSection.startsWith(link.id)) ? 'bg-white text-gas shadow-sm font-bold' : 'text-gray-500 hover:text-gas hover:bg-gray-100'} px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center`}
                                    >
                                        {link.label}
                                        {link.subLinks && <ChevronDown size={14} className="ml-1 opacity-50" />}
                                    </button>

                                    {/* Dropdown */}
                                    {link.subLinks && (
                                        <div className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-left ${openDropdown === link.id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                            <div className="py-2">
                                                {link.subLinks.map(sub => (
                                                    <button
                                                        key={sub.id}
                                                        onClick={() => { setActiveSection(sub.id); setOpenDropdown(null); }}
                                                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gas-light/30 hover:text-gas transition-colors"
                                                    >
                                                        {sub.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                                <div key={link.id}>
                                    <button
                                        onClick={() => {
                                            if (!link.subLinks) {
                                                setActiveSection(link.id);
                                                setMobileMenuOpen(false);
                                            } else {
                                                // Toggle dropdown on mobile? Or just go to parent?
                                                // Let's just go to parent for now or toggle logic could be added
                                                setActiveSection(link.id);
                                                setMobileMenuOpen(false);
                                            }
                                        }}
                                        className="block w-full text-left px-4 py-4 text-lg font-bold text-text hover:bg-gas-light hover:text-gas rounded-lg transition-colors flex justify-between items-center"
                                    >
                                        {link.label}
                                    </button>
                                    {link.subLinks && (
                                        <div className="pl-8 space-y-2 mb-2">
                                            {link.subLinks.map(sub => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => { setActiveSection(sub.id); setMobileMenuOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 text-base text-gray-600 hover:text-gas"
                                                >
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
