import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, ChevronRight, ArrowUpFromLine, ArrowDownToLine, ShieldCheck, BookOpen, Phone } from 'lucide-react';
import TopBar from './TopBar';

const Navigation = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, openWizard }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [expandedMobileItems, setExpandedMobileItems] = useState({});

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileItem = (id) => {
        setExpandedMobileItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const navLinks = [
        { id: 'start', label: 'Startseite' },
        {
            id: 'tanks',
            label: 'Tanks & Kauf',
            dropdownType: 'mega',
            subLinks: [
                {
                    label: 'Oberirdisch',
                    id: 'oberirdisch',
                    icon: ArrowUpFromLine,
                    items: [
                        { id: 'tanks/1-2t-oberirdisch', label: '1,2 t Tank (2700 L)' },
                        { id: 'tanks/2-1t-oberirdisch', label: '2,1 t Tank (4850 L)' },
                        { id: 'tanks/2-9t-oberirdisch', label: '2,9 t Tank (6400 L)' }
                    ]
                },
                {
                    label: 'Unterirdisch',
                    id: 'unterirdisch',
                    icon: ArrowDownToLine,
                    items: [
                        { id: 'tanks/1-2t-unterirdisch', label: '1,2 t Tank (2700 L)' },
                        { id: 'tanks/2-1t-unterirdisch', label: '2,1 t Tank (4850 L)' },
                        { id: 'tanks/2-9t-unterirdisch', label: '2,9 t Tank (6400 L)' }
                    ]
                }
            ]
        },
        { id: 'gas', label: 'Gas bestellen' },
        {
            id: 'service',
            label: 'Service',
            dropdownType: 'simple',
            subLinks: [
                { id: 'pruefungen', label: 'Prüfungen & Sicherheit', description: 'TÜV & Wartung', icon: ShieldCheck },
                { id: 'wissen', label: 'Wissen & Ratgeber', description: 'FAQ & Tipps', icon: BookOpen },
                { id: 'kontakt', label: 'Kontakt & Notfall', description: 'Wir sind für Sie da', icon: Phone }
            ]
        },
        { id: 'gewerbe', label: 'Gewerbe' },
        { id: 'ueber-uns', label: 'Über Uns' },
    ];

    const handleLinkClick = (link) => {
        if (!link.subLinks) {
             setActiveSection(link.id);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 font-sans">
            <TopBar />
            <nav className={`transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveSection('start')}>
                            <img src="/logos/Icon-01.webp" alt="gasmöller" width="2222" height="747" className={`transition-all duration-300 w-auto ${isScrolled ? 'h-10' : 'h-12'}`} />
                        </div>

                        <div className="hidden xl:flex space-x-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
                            {navLinks.map((link) => (
                                <div key={link.id} className="relative group"
                                     onMouseEnter={() => link.subLinks && setOpenDropdown(link.id)}
                                     onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button
                                        onClick={() => handleLinkClick(link)}
                                        aria-expanded={openDropdown === link.id}
                                        aria-haspopup={!!link.subLinks}
                                        aria-label={link.label}
                                        className={`
                                            ${activeSection === link.id || (link.subLinks && activeSection.startsWith(link.id))
                                                ? 'bg-white text-gas shadow-sm font-bold'
                                                : 'text-gray-500 hover:text-gas hover:bg-white/50'}
                                            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center whitespace-nowrap
                                        `}
                                    >
                                        {link.label}
                                        {link.subLinks && <ChevronDown size={14} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
                                    </button>

                                    {/* Dropdown Logic */}
                                    <AnimatePresence>
                                        {openDropdown === link.id && link.subLinks && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-0 top-full pt-4 w-auto min-w-full z-50"
                                            >
                                                {/* MEGA MENU (Tanks) */}
                                                {link.dropdownType === 'mega' ? (
                                                    <div className="bg-white rounded-2xl shadow-xl shadow-gas/5 border border-gray-100 overflow-hidden flex w-[600px] p-2">
                                                        {link.subLinks.map((group, idx) => (
                                                            <div key={idx} className="w-1/2 p-2">
                                                                <div className="bg-gray-50 rounded-xl p-4 h-full border border-gray-100/50 hover:border-gas-light/50 transition-colors">
                                                                    <div className="flex items-center space-x-3 mb-4 text-gas">
                                                                        {group.icon && <group.icon size={24} />}
                                                                        <span className="font-bold text-lg text-gray-900">{group.label}</span>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        {group.items.map(sub => (
                                                                            <button
                                                                                key={sub.id}
                                                                                onClick={() => { setActiveSection(sub.id); setOpenDropdown(null); }}
                                                                                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-gas hover:shadow-sm transition-all"
                                                                            >
                                                                                {sub.label}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    /* SIMPLE MENU (Service) */
                                                    <div className="bg-white rounded-2xl shadow-xl shadow-gas/5 border border-gray-100 overflow-hidden p-2 w-72">
                                                        {link.subLinks.map((sub) => (
                                                            <button
                                                                key={sub.id}
                                                                onClick={() => { setActiveSection(sub.id); setOpenDropdown(null); }}
                                                                className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors group/item flex items-start space-x-4"
                                                            >
                                                                <div className="bg-gas-light/30 text-gas p-2 rounded-lg group-hover/item:bg-gas group-hover/item:text-white transition-colors">
                                                                    {sub.icon && <sub.icon size={20} />}
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-bold text-gray-900 group-hover/item:text-gas transition-colors">{sub.label}</div>
                                                                    <div className="text-xs text-gray-500 mt-0.5">{sub.description}</div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            <a href="tel:04551897089" aria-label="Kostenlose Beratung unter 04551 89 70 89 anrufen" title="Rufen Sie uns an: 04551 89 70 89" className="flex flex-col items-end text-right mr-2 group">
                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider group-hover:text-gas transition-colors">Kostenlose Beratung</span>
                                <span className="text-lg font-bold text-gas leading-none">04551 89 70 89</span>
                            </a>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWizard ? openWizard('tank') : setActiveSection('kontakt')} aria-label="Angebot anfordern" className="bg-gas hover:bg-gas-dark text-white px-6 py-3 rounded-full shadow-lg shadow-gas/20 font-bold text-sm uppercase tracking-wider transition-all flex items-center">
                                Angebot <ArrowRight size={16} className="ml-2"/>
                            </motion.button>
                        </div>

                        <div className="xl:hidden flex items-center">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={mobileMenuOpen} className="text-gray-800 hover:text-gas p-2">{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl overflow-hidden z-40 max-h-[85vh] overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.id} className="bg-gray-50 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => {
                                            if (!link.subLinks) {
                                                setActiveSection(link.id);
                                                setMobileMenuOpen(false);
                                            } else {
                                                toggleMobileItem(link.id);
                                            }
                                        }}
                                        aria-expanded={!!expandedMobileItems[link.id]}
                                        className="w-full text-left px-5 py-4 text-lg font-bold text-gray-900 flex justify-between items-center hover:bg-gray-100 transition-colors"
                                    >
                                        {link.label}
                                        {link.subLinks && (
                                            <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${expandedMobileItems[link.id] ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {link.subLinks && expandedMobileItems[link.id] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-200/50"
                                            >
                                                <div className="px-5 py-4 space-y-4 bg-gray-50/50">
                                                    {/* Logic for Mega Menu in Mobile */}
                                                    {link.dropdownType === 'mega' ? link.subLinks.map((group, idx) => (
                                                        <div key={idx} className="mb-4 last:mb-0">
                                                            <div className="text-xs font-bold text-gas uppercase tracking-wider mb-2 flex items-center">
                                                                {group.icon && <group.icon size={14} className="mr-2"/>} {group.label}
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {group.items.map(sub => (
                                                                    <button
                                                                        key={sub.id}
                                                                        onClick={() => { setActiveSection(sub.id); setMobileMenuOpen(false); }}
                                                                        className="block w-full text-left py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gas shadow-sm border border-transparent hover:border-gray-100 transition-all"
                                                                    >
                                                                        {sub.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )) : (
                                                        /* Logic for Simple Menu in Mobile */
                                                        link.subLinks.map(sub => (
                                                            <button
                                                                key={sub.id}
                                                                onClick={() => { setActiveSection(sub.id); setMobileMenuOpen(false); }}
                                                                className="flex items-center w-full text-left py-3 px-3 rounded-xl hover:bg-white text-base text-gray-600 transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm"
                                                            >
                                                                {sub.icon && <sub.icon size={18} className="mr-3 text-gas-light"/>}
                                                                {sub.label}
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <button onClick={() => { openWizard ? openWizard('tank') : setActiveSection('kontakt'); setMobileMenuOpen(false); }} className="w-full text-center px-4 py-4 text-lg font-bold text-white bg-gas rounded-xl mt-4 shadow-lg shadow-gas/20">
                                Jetzt Angebot anfordern
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navigation;
