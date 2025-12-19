import React from 'react';
import { TrendingUp, Clock, Phone } from 'lucide-react';

const TopBar = () => (
    <div className="bg-gas-dark text-white text-xs py-2 hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex space-x-6">
                <span className="flex items-center text-white/80"><TrendingUp size={12} className="mr-1.5 text-green-400"/> Preistendenz: <strong className="text-white ml-1">Stabil / Sinkend</strong></span>
                <span className="flex items-center text-white/80"><Clock size={12} className="mr-1.5"/> Mo-Fr 8:00 - 17:00</span>
                <a href="tel:04551897089" className="flex items-center text-white/80 hover:text-white transition-colors font-semibold">
                    <Phone size={12} className="mr-1.5"/> 0381 36779809
                </a>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors text-white/80">Kundenportal Login</a>
                <a href="#" className="hover:text-white transition-colors text-white/80">Karriere</a>
            </div>
        </div>
    </div>
);

export default TopBar;
