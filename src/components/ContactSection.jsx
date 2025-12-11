import React, { useState } from 'react';
import { CheckCircle, Loader2, Phone, User, Copy, Check } from 'lucide-react';
import { getPlzError } from '../utils/validation';
import ModernInput from './ui/ModernInput';

const ContactSection = () => {
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [consent, setConsent] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [copiedMobile, setCopiedMobile] = useState(false);

    // Form State for ModernInput
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlzChange = (e) => {
        const val = e.target.value;
        setPlz(val);
        if (val.length === 5) {
            setPlzError(getPlzError(val));
        } else {
            setPlzError('');
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'phone') {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
        } else {
            setCopiedMobile(true);
            setTimeout(() => setCopiedMobile(false), 2000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return;
        if (!consent) return;

        setStatus('loading');

        const form = e.target;
        const submitData = new FormData();

        submitData.append("access_key", "f22052ed-455f-4e4d-9f5a-94a6e340426f");
        submitData.append("subject", "Neue Kontaktanfrage (Website)");
        submitData.append("from_name", "gasmöller Kontaktformular");

        // Add form fields
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        submitData.append("plz", plz);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: submitData
            });
            const result = await response.json();
            if (result.success) {
                setStatus('success');
                // Reset form
                setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
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

                 {/* Phone Numbers Block */}
                 <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                    <div className="relative group">
                        <a href="tel:04551897089" className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl transition-all border border-white/10">
                            <Phone className="text-gas-light" />
                            <div className="text-left">
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Zentrale</div>
                                <div className="font-bold text-lg">04551 89 70 89</div>
                            </div>
                        </a>
                        <button
                            onClick={(e) => { e.preventDefault(); copyToClipboard('04551897089', 'phone'); }}
                            className="absolute -top-3 -right-3 p-2 bg-white text-gas rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Nummer kopieren"
                        >
                            {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>

                    <div className="relative group">
                        <a href="tel:+4917641684326" className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl transition-all border border-white/10">
                            <User className="text-gas-light" />
                            <div className="text-left">
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Thomas Möller / Notfall</div>
                                <div className="font-bold text-lg">+49 176 416 84 326</div>
                            </div>
                        </a>
                        <button
                            onClick={(e) => { e.preventDefault(); copyToClipboard('+4917641684326', 'mobile'); }}
                            className="absolute -top-3 -right-3 p-2 bg-white text-gas rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Nummer kopieren"
                        >
                            {copiedMobile ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto text-text transform hover:-translate-y-1 transition-transform duration-500">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Vielen Dank!</h3>
                            <p className="text-gray-600 mb-6">Ihre Nachricht wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.</p>
                             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-900 mb-8">
                                <strong>Dringend?</strong><br/>
                                Rufen Sie uns direkt an unter <a href="tel:04551897089" className="underline font-bold">04551 89 70 89</a>.
                            </div>
                            <button onClick={() => setStatus('idle')} className="text-gas font-bold hover:underline">Neue Nachricht schreiben</button>
                        </div>
                    ) : (
                        <form className="space-y-2" onSubmit={handleSubmit}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <ModernInput
                                        label="Name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        aria-required="true"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <ModernInput
                                        label="Telefon"
                                        type="tel"
                                        name="phone"
                                        autoComplete="tel"
                                        inputMode="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <ModernInput
                                        label="Postleitzahl"
                                        type="text"
                                        name="plz"
                                        autoComplete="postal-code"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={plz}
                                        onChange={handlePlzChange}
                                        maxLength={5}
                                        error={plzError}
                                    />
                                </div>
                                <div>
                                    <ModernInput
                                        label="E-Mail"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        inputMode="email"
                                        required
                                        aria-required="true"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <ModernInput
                                    label="Betreff"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <ModernInput
                                    label="Nachricht"
                                    multiline={true}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex items-start gap-3 mt-4 mb-6">
                                <input
                                    type="checkbox"
                                    id="contact-consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 w-5 h-5 text-gas border-gray-300 rounded focus:ring-gas flex-shrink-0"
                                    required
                                />
                                <label htmlFor="contact-consent" className="text-sm text-gray-600">
                                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden. Sie können diese Einwilligung jederzeit widerrufen. Weitere Informationen finden Sie in der <button type="button" onClick={() => window.openPrivacy?.()} className="text-gas hover:underline">Datenschutzerklärung</button>.
                                </label>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center mb-4">
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
