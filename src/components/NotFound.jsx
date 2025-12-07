import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = ({ onGoHome }) => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gas-light/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gas/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            <h1 className="text-9xl font-extrabold text-gray-200 mb-4 select-none relative z-10">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">Upps! Seite nicht gefunden.</h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg relative z-10">
                Es scheint, als hätten Sie sich verlaufen. Die gesuchte Seite ist leider nicht verfügbar.
            </p>

            <div className="w-full max-w-md mb-10 relative z-10">
                <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 flex items-center">
                    <input type="text" placeholder="Wonach suchen Sie?" className="flex-grow px-4 py-2 text-gray-700 outline-none" />
                    <button className="bg-gas text-white p-2 rounded-lg hover:bg-gas-dark transition-colors" onClick={() => window.location.href = '/'}>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
                <button onClick={onGoHome} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors hover:shadow-md">Startseite</button>
                <button onClick={() => window.location.href = '/tanks'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors hover:shadow-md">Tanks kaufen</button>
                <button onClick={() => window.location.href = '/gas'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors hover:shadow-md">Gas bestellen</button>
                <button onClick={() => window.location.href = '/kontakt'} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-gas hover:text-gas transition-colors hover:shadow-md">Kontakt</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
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
