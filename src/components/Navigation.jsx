import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Phone, User, Wrench, FileText, ChevronDown, ChevronRight, Settings, Flame, BookOpen, Trash2, ArrowUpFromLine, ArrowDownToLine, Divide, Calculator } from 'lucide-react';
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
    const isTransparentPage = activeSection === 'start' || activeSection === 'tanks' || activeSection === 'gewerbe' || activeSection === 'gas';
    const effectiveScrolled = scrolled || !isTransparentPage;

    // Helper to handle Tank Detail clicks
    const handleTankDetailClick = (slug) => {
        setActiveSection(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false); // Close mobile menu if open
    };

    const navItems = [
        { id: 'start', label: 'Startseite' },
        {
            id: 'fluessiggastank-kaufen',
            label: 'Flüssiggastanks',
            hasChildren: true,
            children: [
                { id: 'fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t', label: '1,2 t Oberirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t', label: '2,1 t Oberirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t', label: '2,9 t Oberirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-2700l-unterirdisch-1-2t', label: '1,2 t Unterirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-4850l-unterirdisch-2-1t', label: '2,1 t Unterirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-6400l-unterirdisch-2-9t', label: '2,9 t Unterirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-2700l-halboberirdisch-1-2t', label: '1,2 t Halboberirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-4850l-halboberirdisch-2-1t', label: '2,1 t Halboberirdisch' },
                { id: 'fluessiggastank-kaufen/fluessiggastank-6400l-halboberirdisch-2-9t', label: '2,9 t Halboberirdisch' }
            ]
        },
        { id: 'fluessiggas-bestellen', label: 'Flüssiggas bestellen', highlight: true },
        { id: 'wissen', label: 'Ratgeber', icon: BookOpen },
        { id: 'gewerbe', label: 'Gewerbe' },
        {
            id: 'service',
            label: 'Service',
            hasChildren: true,
            children: [
                { id: 'pruefungen', label: 'Prüfungen & Wartung', icon: Wrench },
                { id: 'tank-entsorgen', label: 'Flüssiggastank entsorgen', icon: Trash2 },
                { id: 'rechner', label: 'Energie-Rechner', icon: Calculator },
            ]
        },
        { id: 'ueber-uns', label: 'Über Uns' },
    ];

    const isActive = (id) => {
        if (activeSection === id) return true;
        if (id === 'fluessiggastank-kaufen' && (activeSection.startsWith('fluessiggastank-kaufen') || activeSection.startsWith('tanks'))) return true;
        if (id === 'service' && (activeSection === 'pruefungen' || activeSection === 'tank-entsorgen' || activeSection.startsWith('wissen'))) return true;
        return false;
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${effectiveScrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'}`}
            suppressHydrationWarning
        >
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setActiveSection('start')}
                >
                    <img
                        src="/logos/Icon-01.webp"
                        alt="Gas-Service Möller Logo"
                        width="422"
                        height="140"
                        style={{ aspectRatio: '422/140' }}
                        className={`h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${effectiveScrolled ? '' : 'brightness-0 invert'}`}
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Hauptnavigation">
                    {navItems.map((item) => (
                        <div key={item.id} className="relative group">
                            {item.hasChildren && item.id !== 'fluessiggastank-kaufen' ? (
                                <button
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 relative whitespace-nowrap
                                        ${effectiveScrolled ? 'text-gray-700 hover:text-gas hover:bg-gas-light/30' : 'text-white/90 hover:text-white hover:bg-white/10'}
                                        ${isActive(item.id) ? (effectiveScrolled ? 'text-gas bg-gas-light/50' : 'text-white bg-white/20') : ''}
                                    `}
                                    aria-expanded={item.hasChildren ? "false" : undefined}
                                    aria-haspopup={item.hasChildren ? "true" : undefined}
                                >
                                    {item.label}
                                    <ChevronDown size={14} className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform" />
                                     {isActive(item.id) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${effectiveScrolled ? 'bg-gas' : 'bg-white'}`}
                                            initial={false}
                                        />
                                    )}
                                </button>
                            ) : (
                                <a
                                    href={item.id === 'start' ? '/' : `/${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveSection(item.id);
                                    }}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 relative whitespace-nowrap
                                        ${effectiveScrolled ? 'text-gray-700 hover:text-gas hover:bg-gas-light/30' : 'text-white/90 hover:text-white hover:bg-white/10'}
                                        ${isActive(item.id) ? (effectiveScrolled ? 'text-gas bg-gas-light/50' : 'text-white bg-white/20') : ''}
                                    `}
                                    aria-current={isActive(item.id) ? 'page' : undefined}
                                >
                                    {item.highlight && <Flame size={16} className={`mr-1 ${effectiveScrolled ? 'text-orange-500' : 'text-orange-400'}`} />}
                                    {item.label}
                                    {item.hasChildren && <ChevronDown size={14} className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform" />}

                                    {isActive(item.id) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${effectiveScrolled ? 'bg-gas' : 'bg-white'}`}
                                            initial={false}
                                        />
                                    )}
                                </a>
                            )}

                            {/* Dropdown Menu */}
                            {item.hasChildren && (
                                <div className={`absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 ${item.id === 'fluessiggastank-kaufen' ? 'w-[800px]' : 'w-64'}`}>
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                                        {item.id === 'fluessiggastank-kaufen' ? (
                                            /* Mega Menu Style for Tanks */
                                            <div className="grid grid-cols-3 gap-4 p-4">
                                                <div>
                                                    <div className="flex items-center gap-2 font-bold text-gas mb-3 border-b border-gray-100 pb-2">
                                                        <ArrowUpFromLine size={18} />
                                                        <span>Oberirdisch</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>1,2 t (2700 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,1 t (4850 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,9 t (6400 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 font-bold text-gas mb-3 border-b border-gray-100 pb-2">
                                                        <ArrowDownToLine size={18} />
                                                        <span>Unterirdisch</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-2700l-unterirdisch-1-2t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-2700l-unterirdisch-1-2t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>1,2 t (2700 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-4850l-unterirdisch-2-1t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-4850l-unterirdisch-2-1t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,1 t (4850 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-6400l-unterirdisch-2-9t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-6400l-unterirdisch-2-9t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,9 t (6400 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 font-bold text-gas mb-3 border-b border-gray-100 pb-2">
                                                        <Divide size={18} />
                                                        <span>Halboberirdisch</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-2700l-halboberirdisch-1-2t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-2700l-halboberirdisch-1-2t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>1,2 t (2700 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-4850l-halboberirdisch-2-1t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-4850l-halboberirdisch-2-1t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,1 t (4850 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                        <a href="/fluessiggastank-kaufen/fluessiggastank-6400l-halboberirdisch-2-9t" onClick={(e) => { e.preventDefault(); handleTankDetailClick('fluessiggastank-kaufen/fluessiggastank-6400l-halboberirdisch-2-9t'); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gas transition-colors flex justify-between items-center group/item block">
                                                            <span>2,9 t (6400 Liter)</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 text-gas transition-opacity" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Standard Dropdown */
                                            <div className="flex flex-col gap-1">
                                                {item.children.map((child) => (
                                                    <a
                                                        href={`/${child.id}`}
                                                        key={child.id}
                                                        onClick={(e) => { e.preventDefault(); setActiveSection(child.id); }}
                                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gas-light/30 text-sm font-medium text-gray-700 hover:text-gas flex items-center gap-3 transition-colors block"
                                                    >
                                                        {child.icon && <child.icon size={16} className="text-gas opacity-70" />}
                                                        {child.label}
                                                    </a>
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
                        className={`hidden xl:flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap ${effectiveScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    >
                        <Phone size={18} />
                        <span>04551 89 70 89</span>
                    </a>
                    <button
                        onClick={() => openWizard('tank')}
                        className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap ${effectiveScrolled ? 'bg-gas text-white hover:bg-gas-dark' : 'bg-white text-gas hover:bg-gray-50'}`}
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
            {mounted && createPortal(
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
                                            aria-label="Menü schließen"
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
                                                                else if (item.id === 'fluessiggastank-kaufen') setTanksOpen(!tanksOpen);
                                                                else setActiveSection(item.id);
                                                            }}
                                                            className="w-full flex justify-between items-center py-4 text-left font-bold text-gray-800"
                                                        >
                                                            {item.label}
                                                            <ChevronDown size={16} className={`text-gray-500 transition-transform ${((item.id === 'service' && serviceOpen) || (item.id === 'fluessiggastank-kaufen' && tanksOpen)) ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {/* Mobile Submenu */}
                                                        <AnimatePresence>
                                                            {((item.id === 'service' && serviceOpen) || (item.id === 'fluessiggastank-kaufen' && tanksOpen)) && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                                                                >
                                                                    {item.children.map(child => (
                                                                        <a
                                                                            href={`/${child.id}`}
                                                                            key={child.id}
                                                                            onClick={(e) => { e.preventDefault(); setActiveSection(child.id); }}
                                                                            className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-100 last:border-0 hover:text-gas"
                                                                        >
                                                                            {child.label}
                                                                        </a>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <a
                                                        href={item.id === 'start' ? '/' : `/${item.id}`}
                                                        onClick={(e) => { e.preventDefault(); setActiveSection(item.id); }}
                                                        className={`w-full text-left py-4 font-bold flex items-center gap-2 ${isActive(item.id) ? 'text-gas' : 'text-gray-800'} ${item.highlight ? 'text-orange-500' : ''} block`}
                                                    >
                                                        {item.icon && <item.icon size={20} className={item.highlight ? 'text-orange-500' : 'text-gas'} />}
                                                        {item.highlight && <Flame size={20} className="text-orange-500" />}
                                                        {item.label}
                                                    </a>
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
