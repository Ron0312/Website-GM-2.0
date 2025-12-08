import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { getPlzError } from '../utils/validation';

const ContactSection = () => {
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [consent, setConsent] = useState(false);

    const handlePlzChange = (e) => {
        const val = e.target.value;
        setPlz(val);
        if (val.length === 5) {
            setPlzError(getPlzError(val));
        } else {
            setPlzError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return;
        if (!consent) return;

        setStatus('loading');

        const form = e.target;
        const formData = new FormData(form);
        formData.append("access_key", "f22052ed-455f-4e4d-9f5a-94a6e340426f"); // Assuming same key as footer or needing a new one. Using same for now as it's likely the same account.
        formData.append("subject", "Neue Kontaktanfrage (Website)");
        formData.append("from_name", "gasmöller Kontaktformular");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                setStatus('success');
                form.reset();
                setPlz('');
                setConsent(false);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section className="bg-gas-dark py-24 text-white relative overflow-hidden" id="kontakt">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gas opacity-50 transform -skew-x-12 translate-x-20"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl font-extrabold mb-6">Noch Fragen?</h2>
                <p className="text-gas-light mb-10 text-lg">Unser Team ist für Sie da. Persönlich und kompetent.</p>
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto text-text transform hover:-translate-y-1 transition-transform duration-500">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Vielen Dank!</h3>
                            <p className="text-gray-600">Ihre Nachricht wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.</p>
                            <button onClick={() => setStatus('idle')} className="mt-8 text-gas font-bold hover:underline">Neue Nachricht schreiben</button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Honeypot field */}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label><input type="text" name="name" autoComplete="name" required aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all font-sans" /></div>
                                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Telefon</label><input type="tel" name="phone" autoComplete="tel" inputMode="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all font-sans" /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Postleitzahl</label>
                                    <input
                                        type="text"
                                        name="plz"
                                        autoComplete="postal-code"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={plz}
                                        onChange={handlePlzChange}
                                        maxLength={5}
                                        aria-invalid={!!plzError}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all font-sans ${plzError ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200'}`}
                                    />
                                    {plzError && <p className="text-red-500 text-xs mt-1 font-bold">{plzError}</p>}
                                </div>
                                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">E-Mail</label><input type="email" name="email" autoComplete="email" inputMode="email" required aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all font-sans" /></div>
                            </div>
                            <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Betreff</label><input type="text" name="subject" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all font-sans" /></div>
                            <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nachricht</label><textarea name="message" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all h-32 font-sans"></textarea></div>

                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="contact-consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 w-5 h-5 text-gas border-gray-300 rounded focus:ring-gas"
                                    required
                                />
                                <label htmlFor="contact-consent" className="text-sm text-gray-600">
                                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden. Sie können diese Einwilligung jederzeit widerrufen. Weitere Informationen finden Sie in der <button type="button" onClick={() => window.openPrivacy?.()} className="text-gas hover:underline">Datenschutzerklärung</button>.
                                </label>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center">
                                    Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading' || !consent}
                                className="w-full bg-gas hover:bg-gas-dark text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-lg hover:shadow-xl transform active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? <Loader2 size={24} className="animate-spin" /> : 'Anfrage absenden'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
