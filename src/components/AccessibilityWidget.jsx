import React, { useState, useEffect } from 'react';
import { Accessibility, X, Sun, Type, Zap, Link as LinkIcon, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        highContrast: false,
        largeText: false,
        reduceMotion: false,
        highlightLinks: false,
    });

    // Load settings from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('a11y-settings');
        if (stored) {
            setSettings(JSON.parse(stored));
        }
    }, []);

    // Apply settings
    useEffect(() => {
        const body = document.body;
        if (settings.highContrast) body.classList.add('a11y-high-contrast');
        else body.classList.remove('a11y-high-contrast');

        if (settings.largeText) document.documentElement.classList.add('a11y-large-text');
        else document.documentElement.classList.remove('a11y-large-text');

        if (settings.reduceMotion) body.classList.add('a11y-reduce-motion');
        else body.classList.remove('a11y-reduce-motion');

        if (settings.highlightLinks) body.classList.add('a11y-highlight-links');
        else body.classList.remove('a11y-highlight-links');

        localStorage.setItem('a11y-settings', JSON.stringify(settings));
    }, [settings]);

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="fixed bottom-4 left-4 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-72"
                        role="dialog"
                        aria-label="Barrierefreiheit Einstellungen"
                    >
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Accessibility size={20} className="text-gas"/> Barrierefreiheit
                            </h3>
                            <button onClick={() => setIsOpen(false)} aria-label="Schließen" className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-2">
                            <OptionButton
                                label="Hoher Kontrast"
                                active={settings.highContrast}
                                onClick={() => toggleSetting('highContrast')}
                                icon={Sun}
                            />
                            <OptionButton
                                label="Größere Schrift"
                                active={settings.largeText}
                                onClick={() => toggleSetting('largeText')}
                                icon={Type}
                            />
                            <OptionButton
                                label="Animationen stopppen"
                                active={settings.reduceMotion}
                                onClick={() => toggleSetting('reduceMotion')}
                                icon={Zap}
                            />
                            <OptionButton
                                label="Links hervorheben"
                                active={settings.highlightLinks}
                                onClick={() => toggleSetting('highlightLinks')}
                                icon={LinkIcon}
                            />
                        </div>
                        <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                             <a href="/barrierefreiheit" className="text-xs font-bold text-gas hover:underline">Barrierefreiheitserklärung</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gas text-white p-3 rounded-full shadow-xl hover:bg-gas-dark transition-colors flex items-center justify-center border-2 border-white"
                aria-label="Barrierefreiheit Optionen öffnen"
                title="Barrierefreiheit"
            >
                <Accessibility size={28} />
            </motion.button>
        </div>
    );
};

const OptionButton = ({ label, active, onClick, icon: Icon }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all mb-1 ${active ? 'bg-gas text-white font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
        aria-pressed={active}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} />
            <span>{label}</span>
        </div>
        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? 'bg-white/20' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
    </button>
);

export default AccessibilityWidget;
