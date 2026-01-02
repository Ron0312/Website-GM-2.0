import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Linkedin, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER_DISPLAY, EMAIL_ADDRESS, SOCIAL_LINKS } from '../constants';

const Footer = ({ setActiveSection, openLegal }) => {
    const currentYear = new Date().getFullYear();

    const linkClass = "text-gray-400 hover:text-white transition-colors cursor-pointer text-sm mb-2 block";

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand & Contact */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logos/Icon-01.webp" alt="Gas-Service Möller" className="h-10 w-auto brightness-0 invert" />
                            <span className="font-bold text-xl tracking-tight">gasmöller</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Ihr unabhängiger Flüssiggasanbieter im Norden. Seit 2000 stehen wir für faire Preise, Transparenz und persönliche Beratung.
                        </p>
                        <div className="space-y-3">
                            <a href="tel:04551897089" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gas transition-colors">
                                    <Phone size={14} />
                                </div>
                                <span className="font-bold">{PHONE_NUMBER_DISPLAY}</span>
                            </a>
                            <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gas transition-colors">
                                    <Mail size={14} />
                                </div>
                                <span>{EMAIL_ADDRESS}</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-300 group">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <MapPin size={14} />
                                </div>
                                <span>Neuenteichweg 7a, 23795 Schieren</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gas rounded-full"></span> Angebot
                        </h4>
                        <ul>
                            <li><button onClick={() => setActiveSection('fluessiggas-bestellen')} className={linkClass}>Flüssiggas bestellen</button></li>
                            <li><button onClick={() => setActiveSection('fluessiggastank-kaufen')} className={linkClass}>Flüssiggastank kaufen</button></li>
                            <li><button onClick={() => setActiveSection('rechner')} className={linkClass}>Energie-Rechner</button></li>
                            <li><button onClick={() => setActiveSection('gewerbe')} className={linkClass}>Gewerbe & Industrie</button></li>
                            <li><button onClick={() => setActiveSection('liefergebiet')} className={linkClass}>Liefergebiet</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Service & Knowledge */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gas rounded-full"></span> Service
                        </h4>
                        <ul>
                            <li><button onClick={() => setActiveSection('pruefungen')} className={linkClass}>Prüfungen & Wartung</button></li>
                            <li><button onClick={() => setActiveSection('wissen/tank-entsorgen')} className={linkClass}>Tank entsorgen</button></li>
                            <li><button onClick={() => setActiveSection('wissen/preis-guide')} className={linkClass}>Preis-Guide</button></li>
                            <li><button onClick={() => setActiveSection('wissen/sicherheit')} className={linkClass}>Sicherheit & TRF</button></li>
                            <li><button onClick={() => setActiveSection('kontakt')} className={linkClass}>Kontakt aufnehmen</button></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter / Trust */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-gas rounded-full"></span> Newsletter
                        </h4>
                        <p className="text-gray-400 text-xs mb-4">
                            Erhalten Sie Infos zur Preisentwicklung (max. 1x/Monat).
                        </p>
                        <form action="https://api.web3forms.com/submit" method="POST" className="flex gap-2 mb-6">
                            <input type="hidden" name="access_key" value="f22052ed-455f-4e4d-9f5a-94a6e340426f" />
                            <input type="hidden" name="subject" value="Newsletter Anmeldung Footer" />
                            <input type="hidden" name="botcheck" className="hidden" style={{ display: 'none' }} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Ihre E-Mail"
                                required
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gas w-full"
                            />
                            <button type="submit" className="bg-gas hover:bg-gas-dark px-3 py-2 rounded-lg text-white transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </form>

                        <div className="flex gap-4">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left">
                        &copy; {currentYear} {COMPANY_NAME} | Alle Rechte vorbehalten.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
                        <button onClick={() => openLegal('imprint')} className="hover:text-white transition-colors">Impressum</button>
                        <button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors">Datenschutz</button>
                        <button onClick={() => openLegal('terms')} className="hover:text-white transition-colors">AGB</button>
                        <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
                        <button onClick={() => { if(window.openCookieBanner) window.openCookieBanner(); }} className="hover:text-white transition-colors">Cookie-Einstellungen</button>
                    </div>

                    {/* Live Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 cursor-help" title="Wir sind erreichbar">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-gray-300">Live Status</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
