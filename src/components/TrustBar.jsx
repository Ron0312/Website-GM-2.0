import React from 'react';
import { ShieldCheck, BadgeCheck, Star } from 'lucide-react';

const TrustBar = () => (
    <div className="bg-white py-8 md:py-12 border-b border-gray-100 relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 px-8">
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center">
            <ShieldCheck size={40} className="text-gas flex-shrink-0"/>
            <div>
                <div className="font-bold text-lg text-gray-800">TÜV Geprüft</div>
                <div className="text-xs text-gray-500">Sicherheit & Qualität</div>
            </div>
        </div>
        <div className="h-px w-full bg-gray-100 md:hidden"></div>
        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center">
            <BadgeCheck size={40} className="text-gas flex-shrink-0"/>
            <div>
                <div className="font-bold text-lg text-gray-800">DIN 51622</div>
                <div className="text-xs text-gray-500">Reinste Propan-Qualität</div>
            </div>
        </div>
        <div className="h-px w-full bg-gray-100 md:hidden"></div>
        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
        <div className="flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center">
            <Star size={40} className="text-gas flex-shrink-0"/>
            <div>
                <div className="font-bold text-lg text-gray-800">5.0 / 5.0</div>
                <div className="text-xs text-gray-500">Kundenzufriedenheit</div>
            </div>
        </div>
    </div>
);

export default TrustBar;
