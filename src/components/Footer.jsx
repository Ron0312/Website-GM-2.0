import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, Phone, Clock } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_DISPLAY, EMAIL_ADDRESS, WEB3FORMS_ACCESS_KEY, SOCIAL_LINKS, OPENING_HOURS } from '../constants';

const Footer = ({ setActiveSection, openLegal }) => {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [isOpenStatus, setIsOpenStatus] = useState(false);

    // Calculate Open Status (Mo-Fr 8:00 - 17:00)
    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Berlin',
                weekday: 'short',
                hour: 'numeric',
                hour12: false
            });

            const parts = formatter.formatToParts(now);
            const weekday = parts.find(p => p.type === 'weekday').value;
            const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);

            const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
            const isWorkingHours = hour >= 8 && hour < 17;

            setIsOpenStatus(isWeekday && isWorkingHours);
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return;
        if (!email) return;

        setStatus('loading');

        try {
            const formData = new FormData();
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", "Neue Newsletter Anmeldung");
            formData.append("email", email);
            formData.append("from_name", "gasmöller Website Footer");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    // A11y & UX: Larger touch targets on mobile (min 44px)
    const linkClass = "hover:text-white transition-colors py-3 md:py-1 block md:inline-block w-full text-left min-h-[44px] md:min-h-0 flex items-center md:block cursor-pointer";

    const handleNav = (e, slug) => {
        e.preventDefault();
        setActiveSection(slug);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-20 border-t border-gray-800 text-sm" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1">
                    <img src="/logos/Icon-01.webp" alt="gasmöller" width="422" height="140" style={{ aspectRatio: '422/140' }} loading="lazy" className="h-10 w-auto object-contain filter brightness-0 invert opacity-80 mb-6" />
                    <p className="leading-relaxed mb-4 text-gray-300">Ihr unabhängiger Partner für Energie im Norden. Seit 2000.</p>

                    {/* Live Status Indicator - Clickable on mobile */}
                    <a
                        href={isOpenStatus ? `tel:${PHONE_NUMBER}` : undefined}
                        className={`inline-flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${isOpenStatus ? 'cursor-pointer hover:bg-gray-700' : 'cursor-default'}`}
                        aria-label={isOpenStatus ? "Jetzt geöffnet - Anrufen" : "Derzeit geschlossen"}
                    >
                        <div className={`w-2 h-2 rounded-full ${isOpenStatus ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className={isOpenStatus ? 'text-green-400' : 'text-gray-300'}>
                            {isOpenStatus ? 'Jetzt geöffnet' : 'Geschlossen'}
                        </span>
                    </a>

                    <div className="flex space-x-4">
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer text-xl font-bold" aria-label="Facebook">f</a>
                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer text-xl font-bold" aria-label="LinkedIn">in</a>
                    </div>
                </div>
                <div>
                    <h2 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Schnellzugriff</h2>
                    <ul className="space-y-2">
                        <li><a href="/fluessiggastank-kaufen" onClick={(e) => handleNav(e, 'fluessiggastank-kaufen')} className={linkClass}>Flüssiggastank kaufen</a></li>
                        <li><a href="/fluessiggas-bestellen" onClick={(e) => handleNav(e, 'fluessiggas-bestellen')} className={linkClass}>Flüssiggas bestellen</a></li>
                        <li><a href="/rechner" onClick={(e) => handleNav(e, 'rechner')} className={linkClass}>Spar-Rechner</a></li>
                        <li><a href="/kontakt" onClick={(e) => handleNav(e, 'kontakt')} className={linkClass}>Kontakt</a></li>
                        <li className="pt-2 border-t border-gray-800 mt-2">
                            <a href={`tel:${PHONE_NUMBER}`} className={`${linkClass} flex items-center gap-2 font-semibold`}>
                                <Phone size={14} /> {PHONE_NUMBER_DISPLAY}
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Rechtliches</h2>
                    <ul className="space-y-2">
                        <li><button onClick={() => openLegal('imprint')} className={linkClass}>Impressum</button></li>
                        <li><button onClick={() => openLegal('privacy')} className={linkClass}>Datenschutz</button></li>
                        <li><button onClick={() => openLegal('terms')} className={linkClass}>AGB</button></li>
                        <li><a href="/barrierefreiheit" onClick={(e) => handleNav(e, 'barrierefreiheit')} className={linkClass}>Barrierefreiheit</a></li>
                        <li><a href="/sitemap.xml" className={linkClass} target="_blank">Sitemap</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Newsletter</h2>
                    <p className="mb-4 text-xs">Bleiben Sie über Flüssiggaspreise informiert.</p>

                    {status === 'success' ? (
                        <div className="bg-green-500/10 text-green-400 p-3 rounded flex items-center border border-green-500/20">
                            <CheckCircle size={16} className="mr-2" />
                            <span>Angemeldet!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="flex relative">
                            <input
                                type="text"
                                name="b_field"
                                style={{ display: 'none' }}
                                tabIndex="-1"
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                aria-hidden="true"
                            />
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Ihre E-Mail Adresse"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="bg-gray-800 border border-gray-700 rounded-l px-3 py-3 md:py-2 w-full text-white focus:ring-1 focus:ring-gas focus:border-gas outline-none transition-all placeholder-gray-500 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-gas text-white px-4 md:px-3 py-3 md:py-2 rounded-r hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label="Anmelden"
                            >
                                {status === 'loading' ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
                            </button>
                        </form>
                    )}
                    {status === 'error' && <p className="text-red-400 text-xs mt-2">Ein Fehler ist aufgetreten.</p>}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} {COMPANY_NAME} Alle Rechte vorbehalten.
            </div>
        </footer>
    );
};

export default Footer;
