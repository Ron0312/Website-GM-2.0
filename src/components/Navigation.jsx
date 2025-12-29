import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Phone, User, Wrench, FileText, ChevronDown, ChevronRight, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, openWizard, setTankFilter }) => {
    const [scrolled, setScrolled] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [tanksOpen, setTanksOpen] = useState(false);

    // Close mobile menu when section changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [activeSection, setMobileMenuOpen]);

    // Handle scroll for sticky header styling
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Force "scrolled" style on non-start pages to ensure visibility
    const isTransparentPage = activeSection === 'start' || activeSection === 'tanks' || activeSection === 'gewerbe';
    const effectiveScrolled = scrolled || !isTransparentPage;

    // Helper to handle Tank Category clicks (also resets scroll if already on page)
    const handleTankClick = (filter) => {
        if (setTankFilter) setTankFilter(filter);
        setActiveSection('tanks');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false); // Close mobile menu if open
    };

    const handleMainTankClick = () => {
         setActiveSection('tanks');
         window.scrollTo({ top: 0, behavior: 'smooth' });
         setMobileMenuOpen(false);
    };


    const navItems = [
        { id: 'start', label: 'Startseite' },
        {
            id: 'tanks',
            label: 'Tanks & Kauf',
            hasChildren: true,
            children: [
                { id: 'tanks/1-2t-oberirdisch', label: '1,2 t Oberirdisch' },
                { id: 'tanks/2-1t-oberirdisch', label: '2,1 t Oberirdisch' },
                { id: 'tanks/2-9t-oberirdisch', label: '2,9 t Oberirdisch' },
                { id: 'tanks/1-2t-unterirdisch', label: '1,2 t Unterirdisch' },
                { id: 'tanks/2-1t-unterirdisch', label: '2,1 t Unterirdisch' },
                { id: 'tanks/2-9t-unterirdisch', label: '2,9 t Unterirdisch' },
                { id: 'tanks/1-2t-halboberirdisch', label: '1,2 t Halboberirdisch' },
                { id: 'tanks/2-1t-halboberirdisch', label: '2,1 t Halboberirdisch' },
                { id: 'tanks/2-9t-halboberirdisch', label: '2,9 t Halboberirdisch' }
            ]
        },
        { id: 'gas', label: 'Flüssiggas bestellen' },
        { id: 'gewerbe', label: 'Gewerbe' },
        {
            id: 'service',
            label: 'Service',
            hasChildren: true,
            children: [
                { id: 'pruefungen', label: 'Prüfungen & Wartung', icon: Wrench },
                { id: 'wissen', label: 'Wissen & Ratgeber', icon: FileText }
            ]
        },
        { id: 'ueber-uns', label: 'Über Uns' },
    ];

    const isActive = (id) => {
        if (activeSection === id) return true;
        if (id === 'tanks' && activeSection.startsWith('tanks')) return true;
        if (id === 'service' && (activeSection === 'pruefungen' || activeSection.startsWith('wissen'))) return true;
        return false;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${effectiveScrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setActiveSection('start')}
                >
                    <img
                        src="/logos/Icon-01.webp"
                        alt="Gas-Service Möller Logo"
                        width="2222"
                        height="747"
                        className={`h-10 w-auto transition-transform duration-300 group-hover:scale-105 ${effectiveScrolled ? '' : 'brightness-0 invert'}`}
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Hauptnavigation">
                    {navItems.map((item) => (
                        <div key={item.id} className="relative group">
                            <button
                                onClick={() => !item.hasChildren && setActiveSection(item.id)}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 relative
                                    ${effectiveScrolled ? 'text-gray-700 hover:text-gas hover:bg-gas-light/30' : 'text-white/90 hover:text-white hover:bg-white/10'}
                                    ${isActive(item.id) ? (effectiveScrolled ? 'text-gas bg-gas-light/50' : 'text-white bg-white/20') : ''}
                                `}
                                aria-current={isActive(item.id) ? 'page' : undefined}
                                aria-expanded={item.hasChildren ? "false" : undefined}
                                aria-haspopup={item.hasChildren ? "true" : undefined}
                            >
                                {item.label}
                                {item.hasChildren && <ChevronDown size={14} className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform" />}

                                {/* Active Underscore Animation */}
                                {isActive(item.id) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${effectiveScrolled ? 'bg-gas' : 'bg-white'}`}
                                        initial={false}
                                    />
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            {item.hasChildren && (
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 w-64 z-50">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                                        {item.id === 'tanks' ? (
                                            /* Mega Menu Style for Tanks */
                                            <div className="grid grid-cols-1 gap-1">
                                                 <button onClick={handleMainTankClick} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gas-light/30 text-sm font-bold text-gray-800 flex items-center justify-between group/link">
                                                    <span>Alle Tanks ansehen</span>
                                                    <ChevronRight size={16} className="text-gray-400 group-hover/link:text-gas" />
                                                </button>
                                                <div className="h-px bg-gray-100 my-1"></div>
                                                <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Kategorien</div>
                                                <button onClick={() => handleTankClick('oberirdisch')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors">Oberirdische Tanks</button>
                                                <button onClick={() => handleTankClick('unterirdisch')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors">Unterirdische Tanks</button>
                                                <button onClick={() => handleTankClick('halboberirdisch')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors">Halboberirdische Tanks</button>
                                            </div>
                                        ) : (
                                            /* Standard Dropdown */
                                            <div className="flex flex-col gap-1">
                                                {item.children.map((child) => (
                                                    <button
                                                        key={child.id}
                                                        onClick={() => setActiveSection(child.id)}
                                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gas-light/30 text-sm font-medium text-gray-700 hover:text-gas flex items-center gap-3 transition-colors"
                                                    >
                                                        {child.icon && <child.icon size={16} className="text-gas opacity-70" />}
                                                        {child.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="tel:04551897089"
                        className={`hidden xl:flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-all ${effectiveScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    >
                        <Phone size={18} />
                        <span>04551 89 70 89</span>
                    </a>
                    <button
                        onClick={() => openWizard('tank')}
                        className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${effectiveScrolled ? 'bg-gas text-white hover:bg-gas-dark' : 'bg-white text-gas hover:bg-gray-50'}`}
                    >
                        <Settings size={18} />
                        <span>Anfrage</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${effectiveScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                        aria-label="Menü öffnen"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay with Backdrop Animation - Portaled to body to avoid clipping */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-xl font-extrabold text-gray-900">Menü</span>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {navItems.map((item) => (
                                            <div key={item.id} className="border-b border-gray-100 last:border-0">
                                                {item.hasChildren ? (
                                                    <div>
                                                        <button
                                                            onClick={() => {
                                                                if (item.id === 'service') setServiceOpen(!serviceOpen);
                                                                else if (item.id === 'tanks') setTanksOpen(!tanksOpen);
                                                                else setActiveSection(item.id);
                                                            }}
                                                            className="w-full flex justify-between items-center py-4 text-left font-bold text-gray-800"
                                                        >
                                                            {item.label}
                                                            <ChevronDown size={16} className={`text-gray-400 transition-transform ${((item.id === 'service' && serviceOpen) || (item.id === 'tanks' && tanksOpen)) ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {/* Mobile Submenu */}
                                                        <AnimatePresence>
                                                            {((item.id === 'service' && serviceOpen) || (item.id === 'tanks' && tanksOpen)) && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                                                                >
                                                                    {item.children.map(child => (
                                                                        <button
                                                                            key={child.id}
                                                                            onClick={() => setActiveSection(child.id)}
                                                                            className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-100 last:border-0 hover:text-gas"
                                                                        >
                                                                            {child.label}
                                                                        </button>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setActiveSection(item.id)}
                                                        className={`w-full text-left py-4 font-bold ${isActive(item.id) ? 'text-gas' : 'text-gray-800'}`}
                                                    >
                                                        {item.label}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <button
                                            onClick={() => { openWizard('tank'); setMobileMenuOpen(false); }}
                                            className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Settings size={20} /> Anfrage-Assistent
                                        </button>
                                        <a
                                            href="tel:04551897089"
                                            className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                                        >
                                            <Phone size={20} /> 04551 89 70 89
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </header>
    );
};

export default Navigation;
