import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const Footer = ({ setActiveSection, openLegal }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const formData = new FormData();
            formData.append("access_key", "f22052ed-455f-4e4d-9f5a-94a6e340426f");
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

    return (
        <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1">
                    <img src="/logos/Icon-01.webp" alt="gasmöller" width="2222" height="747" className="h-10 w-auto filter brightness-0 invert opacity-80 mb-6" />
                    <p className="leading-relaxed mb-4">Ihr unabhängiger Partner für Energie im Norden. Seit 2005.</p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com/gasmoeller" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer" aria-label="Facebook">f</a>
                        <a href="https://linkedin.com/company/gasmoeller" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer" aria-label="LinkedIn">in</a>
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
                        <li><button onClick={() => openLegal('imprint')} className="hover:text-white transition-colors text-left">Impressum</button></li>
                        <li><button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors text-left">Datenschutz</button></li>
                        <li><button onClick={() => openLegal('terms')} className="hover:text-white transition-colors text-left">AGB</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Newsletter</h4>
                    <p className="mb-4 text-xs">Bleiben Sie über Gaspreise informiert.</p>

                    {status === 'success' ? (
                        <div className="bg-green-500/10 text-green-400 p-3 rounded flex items-center border border-green-500/20">
                            <CheckCircle size={16} className="mr-2" />
                            <span>Angemeldet!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="flex">
                            <input
                                type="email"
                                required
                                placeholder="Ihre E-Mail Adresse"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="bg-gray-800 border border-gray-700 rounded-l px-3 py-2 w-full text-white focus:ring-1 focus:ring-gas focus:border-gas outline-none transition-all placeholder-gray-500 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-gas text-white px-3 py-2 rounded-r hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {status === 'loading' ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
                            </button>
                        </form>
                    )}
                    {status === 'error' && <p className="text-red-400 text-xs mt-2">Ein Fehler ist aufgetreten.</p>}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                &copy; 2025 Gas-Service Möller e.K. Alle Rechte vorbehalten.
            </div>
        </footer>
    );
};

export default Footer;
