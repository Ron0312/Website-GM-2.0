import React, { useState } from 'react';
import { getPlzError } from '../utils/validation';

const ContactSection = () => {
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');

    const handlePlzChange = (e) => {
        const val = e.target.value;
        setPlz(val);
        if (val.length === 5) {
            setPlzError(getPlzError(val));
        } else {
            setPlzError('');
        }
    };

    return (
        <section className="bg-gas-dark py-24 text-white relative overflow-hidden" id="kontakt">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gas opacity-50 transform -skew-x-12 translate-x-20"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl font-extrabold mb-6">Noch Fragen?</h2>
                <p className="text-gas-light mb-10 text-lg">Unser Team ist für Sie da. Persönlich und kompetent.</p>
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto text-text transform hover:-translate-y-1 transition-transform duration-500">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label><input type="text" name="name" autoComplete="name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" /></div>
                            <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Telefon</label><input type="tel" name="phone" autoComplete="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Postleitzahl</label>
                                <input
                                    type="text"
                                    name="plz"
                                    autoComplete="postal-code"
                                    value={plz}
                                    onChange={handlePlzChange}
                                    maxLength={5}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all ${plzError ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200'}`}
                                />
                                {plzError && <p className="text-red-500 text-xs mt-1 font-bold">{plzError}</p>}
                            </div>
                            <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">E-Mail</label><input type="email" name="email" autoComplete="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" /></div>
                        </div>
                        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Betreff</label><input type="text" name="subject" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" /></div>
                        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nachricht</label><textarea name="message" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all h-32"></textarea></div>
                        <button type="button" className="w-full bg-gas hover:bg-gas-dark text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-lg hover:shadow-xl transform active:scale-95">Anfrage absenden</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
