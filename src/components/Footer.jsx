import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImprintContent, PrivacyContent, TermsContent } from './Legal';

const Footer = ({ setActiveSection, openLegal }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            alert("Bitte stimmen Sie der Datenschutzerklärung zu.");
            return;
        }

        setStatus('loading');

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("access_key", "c9715a00-1b77-4008-9844-307775c0882d"); // Web3Forms Key
            formData.append("subject", "Newsletter Anmeldung");
            formData.append("from_name", "gasmöller Website Footer");
            formData.append("botcheck", ""); // Honeypot

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const linkClass = "text-gray-400 hover:text-white transition-colors text-sm py-1 inline-block cursor-pointer";

    // Social Media Links (can be moved to constants)
    const SOCIAL_LINKS = {
        facebook: "https://www.facebook.com/people/Gas-Service-Möller/100083286084666/",
        linkedin: "https://www.linkedin.com/company/gas-service-möller"
    };

    // Live Status Logic
    const currentHour = new Date().getHours();
    const isBusinessHours = currentHour >= 8 && currentHour < 17;

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand & Contact */}
                    <div>
                        <div
                            onClick={() => setActiveSection('start')}
                            className="inline-block cursor-pointer group"
                        >
                             <img src="/logos/Icon-01.webp" alt="gasmöller" width="2222" height="747" loading="lazy" className="h-10 w-auto filter brightness-0 invert opacity-80 mb-6 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <p className="text-sm leading-relaxed mb-6 text-gray-400">
                            Ihr zuverlässiger Partner für Flüssiggas und Tankanlagen in Norddeutschland.
                            Unabhängig, fair und persönlich.
                        </p>

                        <div className="space-y-3">
                            <a href="tel:04551897089" className="flex items-center gap-3 text-white hover:text-gas transition-colors group">
                                <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center group-hover:bg-gas transition-colors">
                                    <Phone size={14} />
                                </div>
                                <span className="font-bold">04551 89 70 89</span>
                            </a>
                            <a href="mailto:kontakt@gasmoeller.de" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center group-hover:bg-gas transition-colors">
                                    <Mail size={14} />
                                </div>
                                <span>kontakt@gasmoeller.de</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400 group">
                                <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center mt-0.5 group-hover:bg-gas transition-colors">
                                    <MapPin size={14} />
                                </div>
                                <span>Neuenteichweg 7a<br/>23795 Schieren</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3 mt-8">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer text-white" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer text-white" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Schnellzugriff</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => setActiveSection('start')} className={linkClass}>Startseite</button></li>
                            <li><button onClick={() => setActiveSection('fluessiggas-bestellen')} className={linkClass}>Flüssiggas bestellen</button></li>
                            <li><button onClick={() => setActiveSection('fluessiggastank-kaufen')} className={linkClass}>Flüssiggastank kaufen</button></li>
                            <li><button onClick={() => setActiveSection('wissen')} className={linkClass}>Ratgeber & Wissen</button></li>
                            <li><button onClick={() => setActiveSection('rechner')} className={linkClass}>Energie-Rechner</button></li>
                            <li><button onClick={() => setActiveSection('gewerbe')} className={linkClass}>Gewerbekunden</button></li>
                            <li><button onClick={() => setActiveSection('liefergebiet')} className={linkClass}>Liefergebiet</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Service & Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Service & Rechtliches</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => setActiveSection('pruefungen')} className={linkClass}>Tankprüfungen & Wartung</button></li>
                            <li><button onClick={() => setActiveSection('kontakt')} className={linkClass}>Kontakt aufnehmen</button></li>
                            <li><button onClick={() => setActiveSection('ueber-uns')} className={linkClass}>Über Uns</button></li>
                            <li className="pt-4 border-t border-gray-800 mt-2"></li>
                            <li><button onClick={() => openLegal('imprint')} className={linkClass}>Impressum</button></li>
                            <li><button onClick={() => openLegal('privacy')} className={linkClass}>Datenschutz</button></li>
                            <li><button onClick={() => openLegal('terms')} className={linkClass}>AGB</button></li>
                            <li><button onClick={() => window.dispatchEvent(new CustomEvent('openCookieBanner'))} className={linkClass}>Cookie-Einstellungen</button></li>
                            <li><button onClick={() => openLegal('accessibility')} className={linkClass}>Barrierefreiheit</button></li>
                            <li><a href="/sitemap.xml" target="_blank" className={linkClass}>Sitemap</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Status */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
                        <p className="mb-4 text-xs text-gray-400">Bleiben Sie über Flüssiggaspreise informiert.</p>

                        {status === 'success' ? (
                             <div className="bg-green-500/10 text-green-400 p-4 rounded-lg flex items-center gap-2 border border-green-500/20">
                                <CheckCircle2 size={20} />
                                <span className="text-sm font-bold">Angemeldet!</span>
                             </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="flex">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Ihre E-Mail Adresse"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded-l px-3 py-3 md:py-2 w-full text-white focus:ring-1 focus:ring-gas focus:border-gas outline-none transition-all placeholder-gray-500 disabled:opacity-50 text-sm"
                                        disabled={status === 'loading'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="bg-gas text-white px-4 md:px-3 py-3 md:py-2 rounded-r hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Anmelden"
                                    >
                                        {status === 'loading' ? '...' : <ArrowRight size={18} />}
                                    </button>
                                </div>
                                <label className="flex items-start gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mt-1 w-3 h-3 rounded bg-gray-800 border-gray-700 checked:bg-gas focus:ring-gas transition-all"
                                    />
                                    <span className="text-[10px] text-gray-500 group-hover:text-gray-400 leading-tight">
                                        Ich stimme zu, dass meine E-Mail für den Newsletter verwendet wird. Widerruf jederzeit möglich.
                                    </span>
                                </label>
                            </form>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-800">
                            <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${isBusinessHours ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {isBusinessHours ? 'Jetzt erreichbar' : 'Derzeit geschlossen'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Gas-Service Müller e.K. Alle Rechte vorbehalten.</p>
                    <p className="flex items-center gap-4">
                        <span>Made in Northern Germany</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
