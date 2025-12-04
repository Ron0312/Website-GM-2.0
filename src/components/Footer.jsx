import React from 'react';
import { Send } from 'lucide-react';

const Footer = ({ setActiveSection }) => (
    <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
                <img src="/logos/Icon-01.webp" alt="gasmöller" className="h-8 filter brightness-0 invert opacity-80 mb-6" />
                <p className="leading-relaxed mb-4">Ihr unabhängiger Partner für Energie im Norden. Seit 2005.</p>
                <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer">f</div>
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer">in</div>
                </div>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Schnellzugriff</h4>
                <ul className="space-y-2">
                    <li><button onClick={() => setActiveSection('gas')} className="hover:text-white transition-colors">Gas bestellen</button></li>
                    <li><button onClick={() => setActiveSection('tanks')} className="hover:text-white transition-colors">Tanks kaufen</button></li>
                    <li><button onClick={() => setActiveSection('rechner')} className="hover:text-white transition-colors">Spar-Rechner</button></li>
                    <li><button onClick={() => setActiveSection('kontakt')} className="hover:text-white transition-colors">Kontakt</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Rechtliches</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Newsletter</h4>
                <p className="mb-4 text-xs">Bleiben Sie über Gaspreise informiert.</p>
                <div className="flex">
                    <input type="email" placeholder="E-Mail" className="bg-gray-800 border-none rounded-l px-3 py-2 w-full text-white focus:ring-1 focus:ring-gas outline-none"/>
                    <button className="bg-gas text-white px-3 py-2 rounded-r hover:bg-gas-dark"><Send size={16}/></button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
            &copy; 2025 gasmöller GmbH. Alle Rechte vorbehalten.
        </div>
    </footer>
);

export default Footer;
