import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    // consentLevel: null (unset), 'essential', 'all'
    const [consentLevel, setConsentLevel] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('gas_cookie_consent');
        if (stored) {
            setConsentLevel(stored);
        } else {
            // Delay slightly to prevent flash or hydration issues, though in CSR it's fine
            setVisible(true);
        }
    }, []);

    const handleConsent = (level) => {
        setConsentLevel(level);
        localStorage.setItem('gas_cookie_consent', level);
        setVisible(false);
        // If we had analytics, we would initialize them here if level === 'all'
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-[70] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="text-sm text-gray-600 max-w-2xl">
                Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Wir verwenden technisch notwendige Cookies und, mit Ihrer Einwilligung, externe Dienste (z.B. Karten).
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => handleConsent('essential')} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    Ablehnen
                </button>
                <button onClick={() => handleConsent('essential')} className="px-4 py-2 text-sm font-bold text-gas hover:bg-gas-light/20 rounded-lg transition-colors">
                    Nur Essentielle
                </button>
                <button onClick={() => handleConsent('all')} className="bg-gas text-white px-6 py-2 rounded-lg font-bold hover:bg-gas-dark transition-all text-sm shadow-md hover:shadow-lg">
                    Alles akzeptieren
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
