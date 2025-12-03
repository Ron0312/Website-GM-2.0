import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [accepted, setAccepted] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('gas_cookie');
        setAccepted(stored === 'true');
    }, []);

    const accept = () => {
        setAccepted(true);
        localStorage.setItem('gas_cookie', 'true');
    };

    if (accepted) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-[70] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 max-w-2xl">
                Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Dazu zählen essentielle Cookies für die Funktion der Website sowie Analyse-Tools.
            </div>
            <div className="flex gap-4">
                <button onClick={accept} className="bg-gas text-white px-6 py-2 rounded-lg font-bold hover:bg-gas-dark transition-all text-sm">Alles akzeptieren</button>
                <button onClick={accept} className="text-gray-500 hover:text-gray-800 text-sm font-bold">Nur Essentielle</button>
            </div>
        </div>
    );
};

export default CookieBanner;
