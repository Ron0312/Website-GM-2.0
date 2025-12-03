import React from 'react';
import { ShieldCheck, BadgeCheck, Star } from 'lucide-react';

const TrustBar = () => (
    <div className="bg-white py-12 border-b border-gray-100 relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-around">
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-0">
            <ShieldCheck size={40} className="text-gas"/>
            <div>
                <div className="font-bold text-lg text-gray-800">TÜV Geprüft</div>
                <div className="text-xs text-gray-500">Sicherheit & Qualität</div>
            </div>
        </div>
        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-0">
            <BadgeCheck size={40} className="text-gas"/>
            <div>
                <div className="font-bold text-lg text-gray-800">DIN 51622</div>
                <div className="text-xs text-gray-500">Reinste Propan-Qualität</div>
            </div>
        </div>
        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity">
            <Star size={40} className="text-gas"/>
            <div>
                <div className="font-bold text-lg text-gray-800">4.9 / 5.0</div>
                <div className="text-xs text-gray-500">Kundenzufriedenheit</div>
            </div>
        </div>
    </div>
);

export default TrustBar;
