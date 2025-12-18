import React, { useState, useEffect } from 'react';
import { Accessibility, X, Sun, Type, Zap, Link as LinkIcon } from 'lucide-react';

const AccessibilityWidget = () => {
    // ... code ...
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        highContrast: false,
        largeText: false,
        stopAnimations: false,
        highlightLinks: false
    });

    useEffect(() => {
        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener('openAccessibilityMenu', handleOpenEvent);
        return () => window.removeEventListener('openAccessibilityMenu', handleOpenEvent);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const toggleSetting = (key) => {
        setSettings(prev => {
            const newSettings = { ...prev, [key]: !prev[key] };
            applySettings(newSettings);
            return newSettings;
        });
    };

    const applySettings = (newSettings) => {
        const root = document.documentElement;

        if (newSettings.highContrast) root.classList.add('a11y-high-contrast');
        else root.classList.remove('a11y-high-contrast');

        if (newSettings.largeText) root.classList.add('a11y-large-text');
        else root.classList.remove('a11y-large-text');

        if (newSettings.stopAnimations) root.classList.add('a11y-stop-animations');
        else root.classList.remove('a11y-stop-animations');

        if (newSettings.highlightLinks) root.classList.add('a11y-highlight-links');
        else root.classList.remove('a11y-highlight-links');
    };

    // ... rendering ...
    return (
        <div className="fixed bottom-24 md:bottom-4 left-4 z-[90] print:hidden">
            {/* Toggle Button */}
            <button
                onClick={toggleOpen}
                className="bg-gas hover:bg-gas-dark text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gas"
                aria-label="Barrierefreiheit Menü öffnen"
                aria-expanded={isOpen}
            >
                <Accessibility size={24} />
            </button>

            {/* Menu */}
            {isOpen && (
                <div className="absolute bottom-14 left-0 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up">
                    <div className="p-4 bg-gas text-white flex justify-between items-center">
                        <h3 className="font-bold">Barrierefreiheit</h3>
                        <button onClick={toggleOpen} className="hover:text-gray-200">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => toggleSetting('highContrast')}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${settings.highContrast ? 'bg-gas/10 text-gas font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            <Sun size={20} className="mr-3" /> Hoher Kontrast
                        </button>
                        <button
                            onClick={() => toggleSetting('largeText')}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${settings.largeText ? 'bg-gas/10 text-gas font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            <Type size={20} className="mr-3" /> Größere Schrift
                        </button>
                        <button
                            onClick={() => toggleSetting('stopAnimations')}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${settings.stopAnimations ? 'bg-gas/10 text-gas font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            <Zap size={20} className="mr-3" /> Animationen stoppen
                        </button>
                         <button
                            onClick={() => toggleSetting('highlightLinks')}
                            className={`w-full flex items-center p-3 rounded-md transition-colors ${settings.highlightLinks ? 'bg-gas/10 text-gas font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            <LinkIcon size={20} className="mr-3" /> Links hervorheben
                        </button>
                    </div>
                    <div className="p-3 bg-gray-50 text-xs text-center text-gray-500 border-t">
                        <a href="/barrierefreiheit" className="underline hover:text-gas">Erklärung zur Barrierefreiheit</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilityWidget;
