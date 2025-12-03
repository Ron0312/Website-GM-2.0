import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

const Footer = ({ setActiveSection, openLegal }) => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Col 1: Brand */}
                <div className="col-span-1">
                    <div className="h-8 mb-6 text-white font-bold text-xl">gasmöller</div>
                    <p className="leading-relaxed mb-4">Ihr Energiepartner im Norden</p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas hover:text-white transition-colors">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas hover:text-white transition-colors">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Col 2: Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Schnellzugriff</h4>
                    <ul className="space-y-2">
                        <li><button onClick={() => setActiveSection('gas')} className="hover:text-gas transition-colors">Gas bestellen</button></li>
                        <li><button onClick={() => setActiveSection('start')} className="hover:text-gas transition-colors">Liefergebiet</button></li>
                        <li><button onClick={() => setActiveSection('wissen')} className="hover:text-gas transition-colors">Wissen</button></li>
                        <li><button onClick={() => setActiveSection('kontakt')} className="hover:text-gas transition-colors">Kontakt</button></li>
                    </ul>
                </div>

                {/* Col 3: Contact */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Kontakt</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                            <span>Musterstraße 1<br />12345 Musterstadt</span>
                        </li>
                        <li className="flex items-center">
                            <Phone size={18} className="mr-2 flex-shrink-0 text-gray-500" />
                            <a href="tel:04551897089" className="hover:text-gas transition-colors">04551 89 70 89</a>
                        </li>
                        <li className="flex items-center">
                            <Mail size={18} className="mr-2 flex-shrink-0 text-gray-500" />
                            <a href="mailto:info@gasmoeller.de" className="hover:text-gas transition-colors">info@gasmoeller.de</a>
                        </li>
                        <li className="flex items-start">
                            <Clock size={18} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
                            <span>Mo - Fr: 08:00 - 17:00</span>
                        </li>
                    </ul>
                </div>

                {/* Col 4: Trust & Legal */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Sicherheit & Recht</h4>
                    <div className="flex space-x-2 mb-6">
                        <div className="bg-gray-800 p-2 rounded text-center w-16 h-16 flex flex-col items-center justify-center">
                            <ShieldCheck size={24} className="text-gas mb-1" />
                            <span className="text-[10px] leading-tight">Zertifiziert</span>
                        </div>
                        {/* Placeholder for other badges */}
                        <div className="bg-gray-800 p-2 rounded text-center w-16 h-16 flex flex-col items-center justify-center text-xs font-bold text-gray-500 border border-gray-700">
                           TÜV
                        </div>
                    </div>
                    <ul className="space-y-2">
                        <li><button onClick={() => openLegal('imprint')} className="hover:text-gas transition-colors">Impressum</button></li>
                        <li><button onClick={() => openLegal('privacy')} className="hover:text-gas transition-colors">Datenschutz</button></li>
                        <li><a href="#" className="hover:text-gas transition-colors">AGB</a></li>
                    </ul>
                     <button onClick={() => openLegal('dev')} className="mt-8 text-[10px] text-gray-700 hover:text-gas transition-colors flex items-center"><code className="mr-1">&lt;/&gt;</code> Dev Status</button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                &copy; 2025 gasmöller. Alle Rechte vorbehalten.
            </div>
        </footer>
    );
};

export default Footer;
