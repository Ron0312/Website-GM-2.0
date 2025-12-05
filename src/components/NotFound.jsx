import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = ({ onGoHome }) => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
            <button
                onClick={onGoHome}
                className="bg-gas text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gas-dark transition-all flex items-center gap-2"
            >
                <Home size={20} />
                Zurück zur Startseite
            </button>
        </div>
    );
};

export default NotFound;
