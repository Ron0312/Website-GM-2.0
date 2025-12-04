import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Settings, Flame, Wrench, AlertTriangle } from 'lucide-react';
import { validatePlz, getPlzError } from '../utils/validation';

const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";

const WizardModal = ({ isOpen, onClose, initialType = 'tank', initialData = null }) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState(initialType);
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');
    const [details, setDetails] = useState({});
    const [contact, setContact] = useState({ name: '', street: '', city: '', email: '', phone: '', number: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSuccess(false);
            setPlzError('');
            if (initialType) setType(initialType);

            // Handle initialData from GasOrderSection
            if (initialData) {
                if (initialData.plz) setPlz(initialData.plz);
                if (initialData.liters) {
                    setDetails(prev => ({
                        ...prev,
                        amount: initialData.liters.toString(),
                        fillUp: false
                    }));
                }

                // Auto-advance logic
                if (initialData.plz && initialType === 'gas') {
                    // Skip PLZ (Step 1) and Type Selection (Step 2)
                    setStep(3);
                }
            }
        }
    }, [isOpen, initialType, initialData]);

    const handleNext = () => {
        if (step === 1) {
            const error = getPlzError(plz);
            if (error) {
                setPlzError(error);
                return;
            }
            setPlzError('');
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", `Neue Anfrage: ${type.toUpperCase()} - ${plz}`);
        formData.append("from_name", "gasmöller Website");
        formData.append("botcheck", "");
        formData.append("Type", type);
        formData.append("PLZ", plz);
        formData.append("Details", JSON.stringify(details));
        formData.append("Name", contact.name);
        formData.append("Address", `${contact.street} ${contact.number}, ${plz} ${contact.city}`);
        formData.append("Email", contact.email);
        formData.append("Phone", contact.phone);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                setSuccess(true);
            } else {
                console.error("Error", result);
                alert("Es gab einen Fehler beim Senden. Bitte versuchen Sie es später noch einmal.");
            }
        } catch (error) {
            console.error("Error", error);
            alert("Es gab einen Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"><X size={24}/></button>

                <div className="h-1 bg-gray-100 w-full">
                    <motion.div className="h-full bg-gas" initial={{ width: 0 }} animate={{ width: `${(step / 4) * 100}%` }}></motion.div>
                </div>

                <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                    {success ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={48}/></div>
                            <h3 className="text-2xl font-bold mb-4">Vielen Dank!</h3>
                            <p className="text-gray-500 mb-8">Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.</p>
                            <button onClick={onClose} className="bg-gas text-white px-8 py-3 rounded-lg font-bold">Schließen</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-2">Wo benötigen Sie Energie?</h3>
                                        <p className="text-center text-gray-500 mb-8">Prüfung der Verfügbarkeit.</p>
                                        <div className="max-w-xs mx-auto">
                                            <input
                                                type="text"
                                                name="plz"
                                                autoComplete="postal-code"
                                                value={plz}
                                                onChange={(e) => setPlz(e.target.value)}
                                                className={`w-full text-center text-2xl font-bold tracking-widest p-4 border-2 rounded-xl outline-none transition-all ${plzError ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-gas'}`}
                                                placeholder="PLZ"
                                                maxLength={5}
                                                autoFocus
                                            />
                                            {plzError && <p className="text-red-500 text-xs mt-2 text-center font-bold">{plzError}</p>}
                                            <button type="button" onClick={handleNext} disabled={plz.length < 5} className="w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all">Weiter</button>
                                        </div>
                                    </motion.div>
                                )}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-8">Was können wir für Sie tun?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { id: 'tank', icon: Settings, label: 'Neuer Tank', desc: 'Kauf/Miete' },
                                                { id: 'gas', icon: Flame, label: 'Gas bestellen', desc: 'Füllung' },
                                                { id: 'service', icon: Wrench, label: 'Service', desc: 'Wartung & Prüfungen' }
                                            ].map((opt) => (
                                                <button key={opt.id} type="button" onClick={() => { setType(opt.id); handleNext(); }} className={`p-6 rounded-xl border-2 transition-all text-center group ${type === opt.id ? 'border-gas bg-gas-light/30' : 'border-gray-100 hover:border-gas'}`}>
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${type === opt.id ? 'bg-gas text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gas group-hover:text-white transition-colors'}`}><opt.icon size={24}/></div>
                                                    <h4 className="font-bold">{opt.label}</h4>
                                                    <p className="text-xs text-gray-500">{opt.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                        <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-8">Zurück</button>
                                    </motion.div>
                                )}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-6">Details</h3>
                                        <div className="space-y-4 max-w-md mx-auto">
                                            {type === 'tank' && (
                                                <>
                                                    <label className="block text-sm font-bold text-gray-700">Art des Gebäudes</label>
                                                    <select
                                                        name="building"
                                                        className="w-full p-4 border border-gray-200 rounded-lg outline-none bg-white"
                                                        onChange={(e) => setDetails({...details, building: e.target.value})}
                                                    >
                                                        <option>Einfamilienhaus (Bestand)</option>
                                                        <option>Neubau</option>
                                                        <option>Gewerbe</option>
                                                    </select>

                                                    <label className="block text-sm font-bold text-gray-700 mt-4 mb-2">Gewünschte Tankgröße</label>
                                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                                        {[{l:'1,2 t', v:'1.2t'}, {l:'2,1 t', v:'2.1t'}, {l:'2,9 t', v:'2.9t'}].map((t) => (
                                                            <button key={t.v} type="button" onClick={() => setDetails({...details, tankSize: t.v})} className={`p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 hover:border-gas-light'}`}>
                                                                <div className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Volumen</div>
                                                                <div className="font-extrabold text-lg">{t.l}</div>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <label className="block text-sm font-bold text-gray-700 mt-2">Interesse an</label>
                                                    <select
                                                        name="interest"
                                                        className="w-full p-4 border border-gray-200 rounded-lg outline-none bg-white"
                                                        onChange={(e) => setDetails({...details, interest: e.target.value})}
                                                    >
                                                        <option>Bitte wählen...</option>
                                                        <option>Kauf (Eigentum)</option>
                                                        <option>Miete</option>
                                                        <option>Beratung gewünscht</option>
                                                    </select>
                                                </>
                                            )}
                                            {type === 'gas' && (
                                                <>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tank im Eigentum?</label>
                                                    <div className="flex gap-4 mb-6">
                                                        {['Ja, Eigentum', 'Nein, Mietvertrag'].map((opt) => (
                                                            <button key={opt} type="button" onClick={() => setDetails({...details, ownership: opt})} className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${details.ownership === opt ? 'border-gas bg-gas-light/20 text-gas' : 'border-gray-200 text-gray-500'}`}>{opt}</button>
                                                        ))}
                                                    </div>
                                                    {details.ownership === 'Nein, Mietvertrag' && <div className="bg-orange-50 text-orange-600 p-3 rounded-lg text-sm mb-6 flex items-start"><AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0"/> Hinweis: Bei Miettanks dürfen wir oft nicht befüllen (Fremdbefüllungsverbot). Bitte prüfen Sie Ihren Vertrag.</div>}

                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Welchen Tank haben Sie?</label>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                                        {[{l:'1,2 t', v:'1.2t'}, {l:'2,1 t', v:'2.1t'}, {l:'2,9 t', v:'2.9t'}, {l:'Andere', v:'other'}].map((t) => (
                                                            <button key={t.v} type="button" onClick={() => setDetails({...details, tankSize: t.v})} className={`p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 hover:border-gas-light'}`}>
                                                                <div className="text-xs uppercase font-bold tracking-wider opacity-70 mb-1">Volumen</div>
                                                                <div className="font-extrabold text-lg">{t.l}</div>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <label className="text-sm font-bold text-gray-700">Wunschmenge</label>
                                                            <div className="flex items-center space-x-2">
                                                                <input type="checkbox" id="fillUp" className="w-4 h-4 accent-gas" onChange={(e) => setDetails({...details, fillUp: e.target.checked})} />
                                                                <label htmlFor="fillUp" className="text-sm text-gray-600 font-medium cursor-pointer">Bitte vollmachen</label>
                                                            </div>
                                                        </div>
                                                        <div className={`relative transition-opacity ${details.fillUp ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                                            <input type="number" name="amount" className="w-full p-4 pr-20 border border-gray-200 rounded-lg font-mono text-right text-lg" placeholder="z.B. 2000" value={details.amount || ''} onChange={(e) => setDetails({...details, amount: e.target.value})}/>
                                                            <span className="absolute right-6 top-4 text-gray-400 font-bold">Liter</span>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                                            <div>
                                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Füllstand ca.</label>
                                                                <div className="relative">
                                                                    <input type="number" name="level" className="w-full p-3 border border-gray-200 rounded-lg text-center" placeholder="20" onChange={(e) => setDetails({...details, level: e.target.value})}/>
                                                                    <span className="absolute right-4 top-3 text-gray-400 text-sm">%</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priorität</label>
                                                                <select name="delivery" className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none" onChange={(e) => setDetails({...details, delivery: e.target.value})}>
                                                                    <option value="normal">Normal (Tour)</option>
                                                                    <option value="express">Express (Notfall)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {type === 'service' && (
                                                <>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Art des Service</label>
                                                    <select name="serviceType" className="w-full p-4 border border-gray-200 rounded-lg outline-none bg-white mb-4" onChange={(e) => setDetails({...details, serviceType: e.target.value})}>
                                                        <option>Bitte wählen...</option>
                                                        <option>Innere Prüfung (10 Jahre)</option>
                                                        <option>Äußere Prüfung (2 Jahre)</option>
                                                        <option>Rohrleitungsprüfung</option>
                                                        <option>Sonstiges / Reparatur</option>
                                                    </select>
                                                    <textarea name="message" className="w-full p-4 border border-gray-200 rounded-lg h-32" placeholder="Beschreiben Sie Ihr Anliegen..." onChange={(e) => setDetails({...details, message: e.target.value})}></textarea>
                                                </>
                                            )}
                                            <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-lg font-bold hover:bg-gas-dark mt-4">Weiter</button>
                                            <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-4">Zurück</button>
                                        </div>
                                    </motion.div>
                                )}
                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-6">Kontakt</h3>
                                        <div className="space-y-4 max-w-md mx-auto">
                                            <input type="text" name="name" autoComplete="name" required placeholder="Ihr Name" className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} />
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2"><input type="text" name="street" autoComplete="address-line1" required placeholder="Straße" className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.street} onChange={(e) => setContact({...contact, street: e.target.value})} /></div>
                                                <div><input type="text" name="number" autoComplete="address-line2" required placeholder="Nr." className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.number} onChange={(e) => setContact({...contact, number: e.target.value})} /></div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div><input type="text" name="plz" autoComplete="postal-code" disabled value={plz} className="w-full p-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 font-bold" /></div>
                                                <div className="col-span-2"><input type="text" name="city" autoComplete="address-level2" required placeholder="Ort" className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.city} onChange={(e) => setContact({...contact, city: e.target.value})} /></div>
                                            </div>
                                            <input type="email" name="email" autoComplete="email" required placeholder="E-Mail Adresse" className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} />
                                            <input type="tel" name="phone" autoComplete="tel" placeholder="Telefonnummer" className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
                                            <div className="flex items-start text-xs text-gray-500 mt-4">
                                                <input type="checkbox" required className="mt-1 mr-2" />
                                                <span>Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.</span>
                                            </div>
                                            <button type="submit" disabled={submitting} className="w-full bg-gas text-white py-4 rounded-lg font-bold hover:bg-gas-dark mt-6 shadow-xl transform active:scale-95 transition-all">
                                                {submitting ? 'Sende...' : 'Anfrage absenden'}
                                            </button>
                                            <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-4">Zurück</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default WizardModal;
