import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = ({ onGoHome }) => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-gray-50">
            <h1 className="text-9xl font-extrabold text-gray-200 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upps! Seite nicht gefunden.</h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
                Es scheint, als hätten Sie sich verlaufen. Die gesuchte Seite ist leider nicht verfügbar.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button onClick={onGoHome} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors">Startseite</button>
                <button onClick={() => window.location.href = '/tanks'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors">Tanks kaufen</button>
                <button onClick={() => window.location.href = '/gas'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors">Gas bestellen</button>
                <button onClick={() => window.location.href = '/kontakt'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors">Kontakt</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onGoHome}
                    className="bg-gas text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all flex items-center justify-center gap-2"
                >
                    <Home size={20} />
                    Zurück zur Startseite
                </button>
                <a
                    href="mailto:kontakt@gasmoeller.de"
                    className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                    Problem melden
                </a>
            </div>
        </div>
    );
};

export default NotFound;
