import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Settings, Flame, Wrench, AlertTriangle, ArrowUpFromLine, ArrowDownToLine, Home, Building2, Factory, Sparkles, RefreshCw, Info } from 'lucide-react';
import { getPlzError } from '../utils/validation';
import ModernInput from './ui/ModernInput';
import SelectionCard from './ui/SelectionCard';

const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";

const WizardModal = ({ isOpen, onClose, initialType = 'tank', initialData = null }) => {
    // Steps:
    // 1: PLZ
    // 2: Main Category (Tank, Gas, Service)
    // 3: Sub Category (Tank: Ober/Unter, Gas: Details, Service: Details)
    // 4: Tank Condition (NEW STEP) OR Contact (Gas/Service)
    // 5: Project Details (Tank)
    // 6: Contact (Tank)
    const [step, setStep] = useState(1);
    const [type, setType] = useState(initialType);
    const [plz, setPlz] = useState('');
    const [plzError, setPlzError] = useState('');

    // Data State
    const [installationType, setInstallationType] = useState(''); // oberirdisch, unterirdisch
    const [details, setDetails] = useState({});
    const [contact, setContact] = useState({ name: '', street: '', city: '', email: '', phone: '', number: '', honeypot: '' });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSuccess(false);
            setPlzError('');
            if (initialType) setType(initialType);
            setInstallationType('');
            setDetails({});
            setContact({ name: '', street: '', city: '', email: '', phone: '', number: '', honeypot: '' });

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
                    setStep(3); // Skip to Gas Details
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
            if (type === 'tank') setStep(3); // Go to Installation Type
            else setStep(3); // Go to Details directly for Gas/Service
        } else if (step === 3) {
            if (type === 'tank') {
                if (!installationType) return; // Must select type
                setStep(4); // Go to Tank Condition
            } else {
                setStep(4); // Go to Contact for Gas/Service
            }
        } else if (step === 4) {
             if (type === 'tank') setStep(5); // Go to Project Details
             else handleSubmitWrapper(); // Submit for Gas/Service (handled in form but just in case)
        } else if (step === 5) {
             if (type === 'tank') setStep(6); // Go to Contact
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmitWrapper = (e) => {
        if (e) e.preventDefault();
        handleSubmit();
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", `Neue Anfrage: ${type.toUpperCase()} - ${plz}`);
        formData.append("from_name", "gasmöller Website");

        // Honeypot check
        if (contact.honeypot) {
            // Silently fail or just return
            return;
        }

        formData.append("Type", type);
        formData.append("PLZ", plz);
        if (type === 'tank') formData.append("Installation", installationType);

        // Flatten details for better email formatting
        Object.keys(details).forEach(key => {
            formData.append(key, details[key]);
        });

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
                alert("Es gab einen Fehler. Bitte versuchen Sie es später.");
            }
        } catch (error) {
            alert("Netzwerkfehler.");
        } finally {
            setSubmitting(false);
        }
    };

    const totalSteps = type === 'tank' ? 6 : 4;
    const progress = (step / totalSteps) * 100;

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wizard-title"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-20">
                    <div>
                        <h2 id="wizard-title" className="text-xl font-bold text-gray-900">Anfrage stellen</h2>
                        <p className="text-sm text-gray-400">Schritt {step} von {totalSteps}</p>
                    </div>
                    <button onClick={onClose} aria-label="Schließen" className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24}/>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-100 w-full">
                    <motion.div
                        className="h-full bg-gas"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative">
                    {success ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100"
                            >
                                <Check size={48} strokeWidth={3} />
                            </motion.div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Vielen Dank!</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
                            <button onClick={onClose} className="bg-gas text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all">Schließen</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitWrapper} className="h-full">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: PLZ */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full justify-center">
                                        <div className="text-center mb-10">
                                            <h3 className="text-3xl font-bold mb-3 text-gray-900">Wo wird geliefert?</h3>
                                            <p className="text-gray-500">Geben Sie Ihre Postleitzahl ein, um die Verfügbarkeit zu prüfen.</p>
                                        </div>
                                        <div className="max-w-xs mx-auto w-full">
                                            <ModernInput
                                                type="text"
                                                name="plz"
                                                autoComplete="postal-code"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={plz}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 5 && /^\d*$/.test(e.target.value)) {
                                                        setPlz(e.target.value);
                                                    }
                                                }}
                                                className="text-center text-3xl font-bold tracking-[0.5em] !rounded-2xl"
                                                placeholder="PLZ"
                                                maxLength={5}
                                                autoFocus
                                                error={plzError}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={plz.length < 5}
                                                className="w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-gas/20"
                                            >
                                                Weiter
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: TYPE SELECTION */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Wie können wir helfen?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            <SelectionCard
                                                title="Neuer Tank"
                                                description="Kauf oder Miete"
                                                icon={Settings}
                                                selected={type === 'tank'}
                                                onClick={() => { setType('tank'); }}
                                            />
                                            <SelectionCard
                                                title="Gas bestellen"
                                                description="Befüllung"
                                                icon={Flame}
                                                selected={type === 'gas'}
                                                onClick={() => { setType('gas'); }}
                                            />
                                            <SelectionCard
                                                title="Service"
                                                description="Wartung & Prüfung"
                                                icon={Wrench}
                                                selected={type === 'service'}
                                                onClick={() => { setType('service'); }}
                                            />
                                        </div>
                                        <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mb-4">Weiter</button>
                                        <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold">Zurück</button>
                                    </motion.div>
                                )}

                                {/* STEP 3: TANK TYPE (If Tank) OR DETAILS (If Gas/Service) */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Welche Tankart bevorzugen Sie?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <SelectionCard
                                                        title="Oberirdisch"
                                                        description="Einfache Aufstellung im Garten (hellgrün)"
                                                        icon={ArrowUpFromLine}
                                                        selected={installationType === 'oberirdisch'}
                                                        onClick={() => setInstallationType('oberirdisch')}
                                                        className="h-48"
                                                    />
                                                    <SelectionCard
                                                        title="Unterirdisch"
                                                        description="Unsichtbar im Boden verbaut"
                                                        icon={ArrowDownToLine}
                                                        selected={installationType === 'unterirdisch'}
                                                        onClick={() => setInstallationType('unterirdisch')}
                                                        className="h-48"
                                                    />
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!installationType} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4">Weiter</button>
                                            </>
                                        ) : type === 'gas' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Bestelldetails</h3>
                                                <div className="space-y-6 max-w-md mx-auto">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Eigentumsverhältnis</label>
                                                        <div className="flex gap-4">
                                                            {['Ja, Eigentum', 'Nein, Mietvertrag'].map((opt) => (
                                                                <button key={opt} type="button" onClick={() => setDetails({...details, ownership: opt})} className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${details.ownership === opt ? 'border-gas bg-gas-light/20 text-gas' : 'border-gray-100 text-gray-500 hover:border-gas-light'}`}>{opt}</button>
                                                            ))}
                                                        </div>
                                                        {details.ownership === 'Nein, Mietvertrag' && (
                                                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 text-sm mt-4 flex items-start">
                                                                <AlertTriangle className="mr-3 flex-shrink-0" size={20} />
                                                                <p><strong>Hinweis:</strong> Wenn Sie den Tank gemietet haben, sind Sie meist vertraglich an Ihren Anbieter gebunden. Eine Befüllung durch uns ist dann rechtlich oft nicht möglich. Bitte prüfen Sie Ihren Vertrag.</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                        <div className="mb-4">
                                                            <label className="text-sm font-bold text-gray-700 mb-2 block">Tankgröße (falls bekannt)</label>
                                                            <ModernInput
                                                                type="text"
                                                                name="tankSizeGas"
                                                                className="mb-0 bg-white"
                                                                placeholder="z.B. 1,2t oder 2700 Liter"
                                                                value={details.tankSizeGas || ''}
                                                                onChange={(e) => setDetails({...details, tankSizeGas: e.target.value})}
                                                            />
                                                        </div>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <label className="text-sm font-bold text-gray-700">Wunschmenge</label>
                                                            <div className="flex items-center space-x-2">
                                                                <input type="checkbox" id="fillUp" className="w-4 h-4 accent-gas rounded" onChange={(e) => setDetails({...details, fillUp: e.target.checked})} />
                                                                <label htmlFor="fillUp" className="text-sm text-gray-600 font-medium cursor-pointer">Bitte vollmachen</label>
                                                            </div>
                                                        </div>
                                                        <div className={`relative transition-opacity ${details.fillUp ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                                            <ModernInput
                                                                type="number"
                                                                name="amount"
                                                                inputMode="numeric"
                                                                className="mb-0"
                                                                placeholder="z.B. 2000"
                                                                value={details.amount || ''}
                                                                onChange={(e) => setDetails({...details, amount: e.target.value})}
                                                            />
                                                            <span className="absolute right-6 top-4 text-gray-400 font-bold">Liter</span>
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mt-4">Weiter zu Kontakt</button>
                                                </div>
                                            </>
                                        ) : (
                                            /* Service Details */
                                            <>
                                                 <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Service Anfrage</h3>
                                                 <div className="space-y-4">
                                                    <label className="block text-sm font-bold text-gray-700">Art des Service</label>
                                                    <select name="serviceType" className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none bg-white mb-4 focus:border-gas transition-colors" onChange={(e) => setDetails({...details, serviceType: e.target.value})}>
                                                        <option>Bitte wählen...</option>
                                                        <option>Innere Prüfung (10 Jahre)</option>
                                                        <option>Äußere Prüfung (2 Jahre)</option>
                                                        <option>Rohrleitungsprüfung</option>
                                                        <option>Wartung</option>
                                                        <option>Sonstiges</option>
                                                    </select>

                                                    <label className="block text-sm font-bold text-gray-700">Nachricht</label>
                                                    <textarea name="message" className="w-full p-4 border-2 border-gray-100 rounded-xl h-32 outline-none focus:border-gas transition-colors resize-none" placeholder="Beschreiben Sie Ihr Anliegen..." onChange={(e) => setDetails({...details, message: e.target.value})}></textarea>

                                                    <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mt-4">Weiter zu Kontakt</button>
                                                 </div>
                                            </>
                                        )}
                                        {type !== 'tank' && <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold mt-4">Zurück</button>}
                                        {type === 'tank' && <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold mt-4">Zurück</button>}
                                    </motion.div>
                                )}

                                {/* STEP 4: TANK CONDITION (Only for Tank) OR CONTACT (For Gas/Service) */}
                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">Zustand des Tanks</h3>
                                                <p className="text-center text-gray-500 mb-8 max-w-sm mx-auto">Wählen Sie zwischen einem fabrikneuen oder einem professionell aufbereiteten Tank.</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <SelectionCard
                                                        title="Neu"
                                                        description="Fabrikneuer Tank"
                                                        icon={Sparkles}
                                                        selected={details.condition === 'Neu'}
                                                        onClick={() => setDetails({...details, condition: 'Neu'})}
                                                        className="h-48"
                                                    />
                                                    <div className="relative group">
                                                        <SelectionCard
                                                            title="Gebraucht"
                                                            description="Geprüft & Aufbereitet"
                                                            icon={RefreshCw}
                                                            selected={details.condition === 'Gebraucht / Aufbereitet'}
                                                            onClick={() => setDetails({...details, condition: 'Gebraucht / Aufbereitet'})}
                                                            className="h-48"
                                                        />
                                                        {/* Info Box / Tooltip */}
                                                        <div className="absolute -top-3 -right-3">
                                                             <div className="bg-gas text-white rounded-full p-1 shadow-lg">
                                                                 <Info size={16} />
                                                             </div>
                                                        </div>
                                                        <div className="mt-3 bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                                                            <strong>Spar-Tipp:</strong> Wir bereiten alte Tanks professionell auf (lackiert & geprüft). Eine nachhaltige und günstige Alternative!
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!details.condition} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4">Weiter</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold">Zurück</button>
                                            </>
                                        ) : (
                                            /* CONTACT FORM for Gas/Service */
                                            <ContactForm
                                                contact={contact}
                                                setContact={setContact}
                                                plz={plz}
                                                submitting={submitting}
                                                handleBack={handleBack}
                                                stepName="Kontakt"
                                            />
                                        )}
                                    </motion.div>
                                )}

                                {/* STEP 5: PROJECT DETAILS (Only for Tank) */}
                                {step === 5 && type === 'tank' && (
                                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Projekt Details</h3>
                                        <div className="space-y-8 max-w-md mx-auto">

                                            {/* Art des Gebäudes */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Art des Gebäudes</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { id: 'bestand', label: 'Haus', sub: '(Bestand)', icon: Home },
                                                        { id: 'neubau', label: 'Neubau', sub: '', icon: Building2 },
                                                        { id: 'gewerbe', label: 'Gewerbe', sub: '', icon: Factory }
                                                    ].map(b => (
                                                        <button
                                                            key={b.id}
                                                            type="button"
                                                            onClick={() => setDetails({...details, building: b.label + (b.sub ? ' ' + b.sub : '')})}
                                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-24 ${details.building === (b.label + (b.sub ? ' ' + b.sub : '')) ? 'border-gas bg-gas-light/20 text-gas' : 'border-gray-100 hover:border-gas-light text-gray-600'}`}
                                                        >
                                                            <b.icon size={24} className="mb-2" strokeWidth={1.5} />
                                                            <span className="font-bold text-xs">{b.label}</span>
                                                            {b.sub && <span className="text-[10px] opacity-70">{b.sub}</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tankgröße */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Gewünschte Tankgröße</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[{l:'1,2 t', v:'1.2t', vol:'2.700 L'}, {l:'2,1 t', v:'2.1t', vol:'4.850 L'}, {l:'2,9 t', v:'2.9t', vol:'6.400 L'}].map((t) => (
                                                        <button key={t.v} type="button" onClick={() => setDetails({...details, tankSize: t.v})} className={`p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 hover:border-gas-light'}`}>
                                                            <div className="font-extrabold text-lg">{t.l}</div>
                                                            <div className={`text-[10px] font-bold tracking-wider uppercase mt-1 ${details.tankSize === t.v ? 'opacity-80' : 'text-gray-400'}`}>Volumen</div>
                                                            <div className={`text-xs ${details.tankSize === t.v ? 'opacity-100' : 'text-gray-500'}`}>{t.vol}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Interesse */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Interesse an</label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {['Kauf (Eigentum)', 'Miete', 'Beratung gewünscht'].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => setDetails({...details, interest: opt})}
                                                            className={`w-full text-left px-5 py-4 rounded-xl border-2 font-bold transition-all flex justify-between items-center ${details.interest === opt ? 'border-gas bg-gas-light/20 text-gas' : 'border-gray-100 text-gray-600 hover:border-gas-light'}`}
                                                        >
                                                            {opt}
                                                            {details.interest === opt && <Check size={18} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all">Weiter zu Kontakt</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold mt-4">Zurück</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 6: CONTACT FORM (Only for Tank) */}
                                {step === 6 && type === 'tank' && (
                                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <ContactForm
                                            contact={contact}
                                            setContact={setContact}
                                            plz={plz}
                                            submitting={submitting}
                                            handleBack={handleBack}
                                            stepName="Kontakt"
                                        />
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

const ContactForm = ({ contact, setContact, plz, submitting, handleBack, stepName }) => (
    <>
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">{stepName}</h3>
        <div className="space-y-2 max-w-md mx-auto">
            {/* Honeypot field - hidden from users */}
            <input
                type="text"
                name="b_field"
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                value={contact.honeypot || ''}
                onChange={(e) => setContact({...contact, honeypot: e.target.value})}
            />

            <ModernInput
                label="Name"
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Ihr vollständiger Name"
                value={contact.name}
                onChange={(e) => setContact({...contact, name: e.target.value})}
            />
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <ModernInput
                        label="Straße"
                        type="text"
                        name="street"
                        autoComplete="address-line1"
                        required
                        placeholder="Musterstraße"
                        value={contact.street}
                        onChange={(e) => setContact({...contact, street: e.target.value})}
                    />
                </div>
                <div>
                    <ModernInput
                        label="Nr."
                        type="text"
                        name="number"
                        autoComplete="address-line2"
                        required
                        placeholder="1a"
                        value={contact.number}
                        onChange={(e) => setContact({...contact, number: e.target.value})}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <ModernInput
                        label="PLZ"
                        type="text"
                        disabled
                        value={plz}
                        className="bg-gray-50 opacity-70"
                    />
                </div>
                <div className="col-span-2">
                    <ModernInput
                        label="Ort"
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        required
                        placeholder="Hamburg"
                        value={contact.city}
                        onChange={(e) => setContact({...contact, city: e.target.value})}
                    />
                </div>
            </div>
            <ModernInput
                label="E-Mail"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="ihre@email.de"
                value={contact.email}
                onChange={(e) => setContact({...contact, email: e.target.value})}
            />
            <ModernInput
                label="Telefon"
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Für Rückfragen"
                value={contact.phone}
                onChange={(e) => setContact({...contact, phone: e.target.value})}
            />

            <div className="flex items-start text-xs text-gray-500 mt-2 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input type="checkbox" required className="mt-1 mr-3 w-4 h-4 accent-gas" />
                <span className="leading-relaxed">Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden.</span>
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark hover:shadow-xl transform active:scale-95 transition-all">
                {submitting ? 'Wird gesendet...' : 'Kostenlos anfragen'}
            </button>
            <button type="button" onClick={handleBack} className="w-full text-gray-400 hover:text-gray-600 font-bold mt-4">Zurück</button>
        </div>
    </>
);

export default WizardModal;
