import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Settings, Flame, Wrench, AlertTriangle, ArrowUpFromLine, ArrowDownToLine, Layers, Home, Building2, Factory, Sparkles, RefreshCw, Info, Phone, ThumbsUp } from 'lucide-react';
import { getPlzError } from '../utils/validation';
import ModernInput from './ui/ModernInput';
import SelectionCard from './ui/SelectionCard';
import Skeleton from './ui/Skeleton';
import Toast from './ui/Toast';
import { TANK_SIZES, WEB3FORMS_ACCESS_KEY, PHONE_NUMBER_DISPLAY, PHONE_NUMBER } from '../constants';

const plzSchema = z.object({
    plz: z.string().regex(/^\d{5}$/, "Bitte geben Sie eine gültige 5-stellige PLZ ein.")
        .refine((val) => !getPlzError(val), { message: "Leider liefern wir noch nicht in dieses Gebiet." })
});

const contactSchema = z.object({
    contact: z.object({
        name: z.string().min(2, "Name ist erforderlich"),
        street: z.string().min(2, "Straße ist erforderlich"),
        number: z.string().min(1, "Hausnummer ist erforderlich"),
        city: z.string().min(2, "Ort ist erforderlich"),
        email: z.string().email("Gültige E-Mail erforderlich"),
        phone: z.string().optional(),
        message: z.string().optional(),
        honeypot: z.string().max(0).optional(),
        consent: z.literal(true, { errorMap: () => ({ message: "Zustimmung erforderlich" }) })
    })
});

const WizardModal = ({ isOpen, onClose, initialType = 'tank', initialData = null, openLegal }) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState(initialType);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null); // { message, type }

    const { control, handleSubmit, watch, setValue, getValues, formState: { errors }, reset, trigger, setFocus } = useForm({
        resolver: undefined,
        mode: "onBlur",
        defaultValues: {
            plz: '',
            installationType: [],
            details: {
                ownership: 'Ja, Eigentum',
                tankSizeGas: '',
                amount: '',
                fillUp: false,
                serviceType: '',
                message: '',
                condition: [],
                building: '',
                tankSize: [],
                interest: []
            },
            contact: {
                name: '',
                street: '',
                number: '',
                city: '',
                email: '',
                phone: '',
                message: '',
                honeypot: '',
                consent: false
            }
        }
    });

    const formValues = watch();

    const [calcTank, setCalcTank] = useState(TANK_SIZES[0]);
    const [calcFillLevel, setCalcFillLevel] = useState(30);

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 500);

            // Load from LocalStorage if available (Form Fallback)
            const savedData = localStorage.getItem('wizard_backup');
            if (savedData && !initialData) {
                try {
                    const parsed = JSON.parse(savedData);
                    // Only restore contact details to avoid confusion
                    if (parsed.contact) {
                        setValue('contact.name', parsed.contact.name);
                        setValue('contact.email', parsed.contact.email);
                        setValue('contact.phone', parsed.contact.phone);
                    }
                } catch (e) { /* ignore */ }
            }

            // Push state for back button handling
            window.history.pushState({ modalOpen: true }, '');

            return () => {
                clearTimeout(timer);
                // Clean up history state if closed programmatically
                if (window.history.state && window.history.state.modalOpen) {
                    // We don't force back here to avoid messing up navigation flow if user navigated elsewhere
                }
            };
        }
    }, [isOpen]);

    // Handle Browser Back Button to close modal or go back step
    useEffect(() => {
        const handlePopState = (event) => {
            if (isOpen) {
                // If we are deep in steps, go back one step
                if (step > 1) {
                    // Prevent default back behavior (leaving page) by pushing state again
                    window.history.pushState({ modalOpen: true }, '');
                    setStep(s => s - 1);
                } else {
                    // Close modal
                    onClose();
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isOpen, step, onClose]);

    // Save to LocalStorage on change
    useEffect(() => {
        if (isOpen && formValues.contact.email) {
            const dataToSave = { contact: { name: formValues.contact.name, email: formValues.contact.email, phone: formValues.contact.phone } };
            localStorage.setItem('wizard_backup', JSON.stringify(dataToSave));
        }
    }, [formValues.contact, isOpen]);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSuccess(false);
            if (initialType) setType(initialType);

            // Try to auto-fill PLZ from Home Page input if stored in Session/Local Storage or passed via props
            // Assuming App might pass it if available, or we check a global store.
            // For now, relies on initialData passed from App.jsx

            if (initialData) {
                setValue('plz', initialData.plz || '');
                if (initialData.selectedTank && initialData.fillLevel !== undefined) {
                    setCalcTank(initialData.selectedTank);
                    setCalcFillLevel(initialData.fillLevel);
                    const calculated = Math.max(0, Math.round(initialData.selectedTank.volume * ((85 - initialData.fillLevel) / 100)));
                    setValue('details.tankSizeGas', initialData.selectedTank.label);
                    setValue('details.amount', calculated.toString());
                } else if (initialData.liters) {
                    setValue('details.amount', initialData.liters.toString());
                }

                if (initialData.plz && initialType === 'gas') {
                     setStep(3);
                }
            } else {
                if (initialType === 'gas') {
                    setValue('details.tankSizeGas', TANK_SIZES[0].label);
                    const calculated = Math.max(0, Math.round(TANK_SIZES[0].volume * ((85 - 30) / 100)));
                    setValue('details.amount', calculated.toString());
                }
            }
            setTimeout(() => setFocus('plz'), 100);
        }
    }, [isOpen, initialType, initialData, reset, setValue, setFocus]);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const toggleSelection = (currentValue, onChange, option) => {
        const newValue = currentValue.includes(option)
            ? currentValue.filter(v => v !== option)
            : [...currentValue, option];
        onChange(newValue);
    };

    const handleNext = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);

        let valid = false;

        if (step === 1) {
            const currentPlz = getValues('plz');
            const result = plzSchema.safeParse({ plz: currentPlz });

            if (!result.success) {
                await trigger('plz');
            } else {
                valid = true;
            }
        } else if (step === 2) {
             valid = true;
        } else if (step === 3) {
            if (type === 'tank') {
                if (formValues.installationType.length > 0) valid = true;
            } else if (type === 'gas') {
                if (formValues.details.ownership) valid = true;
            } else {
                valid = true;
            }
        } else if (step === 4) {
             if (type === 'tank') {
                if (formValues.details.interest.length > 0) valid = true;
             } else if (type === 'gas') {
                valid = true;
             } else {
                const result = contactSchema.safeParse({ contact: formValues.contact });
                if (result.success) valid = true;
                else await trigger('contact');
             }
        } else if (step === 5) {
             if (type === 'tank') {
                 if (formValues.details.condition.length > 0) valid = true;
             } else {
                const result = contactSchema.safeParse({ contact: formValues.contact });
                if (result.success) valid = true;
                else await trigger('contact');
             }
        } else if (step === 6) {
             if (type === 'tank') {
                 valid = true;
             } else {
                 const result = contactSchema.safeParse({ contact: formValues.contact });
                 if (result.success) valid = true;
                 else await trigger('contact');
             }
        } else if (step === 7) {
            const result = contactSchema.safeParse({ contact: formValues.contact });
            if (result.success) valid = true;
            else await trigger('contact');
        }

        if (!valid) {
            triggerShake();
            return;
        }

        if (step === 1) setStep(2);
        else if (step === 2) setStep(3);
        else if (step === 3) setStep(4);
        else if (step === 4) {
            if (type === 'tank') setStep(5);
            else if (type === 'service') submitForm();
            else setStep(5);
        } else if (step === 5) {
            if (type === 'tank') setStep(6);
            else submitForm();
        } else if (step === 6) {
            if (type === 'tank') setStep(7);
            else submitForm();
        } else if (step === 7) {
            submitForm();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const submitForm = handleSubmit(async (data) => {
        setSubmitting(true);
        if (data.contact.honeypot) return;

        const formData = new FormData();
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);

        const typeMap = {
            'tank': 'Flüssiggastank Kauf/Miete',
            'gas': 'Flüssiggas Bestellung',
            'service': 'Service Anfrage'
        };
        formData.append("subject", `Neue Anfrage: ${typeMap[type] || type.toUpperCase()} - ${data.plz}`);
        formData.append("from_name", "gasmöller Website");

        formData.append("Anfrage-Typ", typeMap[type] || type);
        formData.append("PLZ", data.plz);

        if (type === 'tank') {
            formData.append("Installation", data.installationType.join(', '));
            formData.append("Interesse", data.details.interest.join(', '));
            formData.append("Zustand", data.details.condition.join(', '));
            formData.append("Gebäude", data.details.building);
            formData.append("Tankgröße", data.details.tankSize.join(', '));
        } else if (type === 'gas') {
            formData.append("Eigentum", data.details.ownership);
            formData.append("Tankgröße", data.details.tankSizeGas);
            formData.append("Menge (Liter)", data.details.amount);
            formData.append("Füllstand (%)", calcFillLevel + '%');
        } else {
            formData.append("Service Typ", data.details.serviceType);
            formData.append("Nachricht", data.details.message);
        }

        formData.append("Name", data.contact.name);
        formData.append("Adresse", `${data.contact.street} ${data.contact.number}, ${data.plz} ${data.contact.city}`);
        formData.append("E-Mail", data.contact.email);
        formData.append("Telefon", data.contact.phone);

        if (data.contact.message) {
            formData.append("Nachricht", data.contact.message);
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const result = await response.json();
            if (result.success) {
                setSuccess(true);
                // Clear backup on success
                localStorage.removeItem('wizard_backup');
            } else {
                setToast({ message: "Es gab einen Fehler. Bitte versuchen Sie es später.", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.", type: "error" });
        } finally {
            setSubmitting(false);
        }
    });

    const getTotalSteps = () => {
        if (type === 'tank') return 7;
        if (type === 'gas') return 5;
        return 4;
    };
    const totalSteps = getTotalSteps();
    const progress = (step / totalSteps) * 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog" aria-modal="true">
            <AnimatePresence>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-20">
                    <div>
                        <h2 id="wizard-title" className="text-xl font-bold text-gray-900">Anfrage stellen</h2>
                        {loading ? <Skeleton className="w-20 h-4 mt-1"/> : <p className="text-sm text-gray-500 font-medium">Schritt {step} von {totalSteps}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={`tel:${PHONE_NUMBER}`} className="hidden sm:flex items-center gap-2 text-gas font-bold text-sm bg-gas-light/20 px-3 py-1.5 rounded-lg">
                            <Phone size={14} /> <span>{PHONE_NUMBER_DISPLAY}</span>
                        </a>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Schließen"><X size={24}/></button>
                    </div>
                </div>

                <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm pt-6 pb-2 px-6 border-b border-transparent md:static md:bg-transparent md:border-none">
                    <div className="h-1 bg-gray-100 w-full rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gas" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                    </div>
                </div>

                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative">
                    {loading ? (
                         <div className="space-y-8 animate-pulse">
                             <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto"></div>
                             <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
                             <div className="h-12 bg-gray-200 rounded-xl w-full mt-8"></div>
                         </div>
                    ) : success ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"><Check size={48} /></motion.div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Vielen Dank!</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.</p>
                            <button onClick={onClose} className="bg-gas text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:bg-gas-dark">Schließen</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); }} className="h-full pb-6">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <div className="text-center mb-10">
                                            <h3 className="text-3xl font-bold mb-3 text-gray-900">Wo wird geliefert?</h3>
                                        </div>
                                        <div className="max-w-xs mx-auto w-full">
                                            <Controller
                                                name="plz"
                                                control={control}
                                                rules={{
                                                    required: "PLZ erforderlich",
                                                    pattern: { value: /^\d{5}$/, message: "5 Ziffern" },
                                                    validate: (val) => !getPlzError(val) || getPlzError(val)
                                                }}
                                                render={({ field }) => (
                                                    <ModernInput
                                                        {...field}
                                                        error={errors.plz?.message}
                                                        inputClassName="text-center text-3xl font-bold tracking-[0.5em] !rounded-2xl h-20"
                                                        placeholder="PLZ"
                                                        maxLength={5}
                                                        inputMode="numeric"
                                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                                    />
                                                )}
                                            />
                                            {/* Empty State Fallback Logic handled visually by Refine Error Message "Leider liefern wir..." */}
                                            {errors.plz?.message === "Leider liefern wir noch nicht in dieses Gebiet." && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
                                                    <p className="text-sm text-gray-500">Wir liefern aktuell in PLZ-Gebiete 17-19, 20-25 und 27.</p>
                                                </div>
                                            )}
                                            <button type="button" onClick={handleNext} className="w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all shadow-xl shadow-gas/20">Weiter</button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-8">Wie können wir helfen?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            <SelectionCard title="Neuer Flüssiggastank" description="Kauf oder Miete" icon={Settings} selected={type === 'tank'} onClick={() => setType('tank')} />
                                            <SelectionCard title="Flüssiggas" description="Befüllung" icon={Flame} selected={type === 'gas'} onClick={() => setType('gas')} />
                                            <SelectionCard title="Service" description="Wartung" icon={Wrench} selected={type === 'service'} onClick={() => setType('service')} />
                                        </div>
                                        <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mb-4 hover:bg-gas-dark transition-all">Weiter</button>
                                        <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold hover:text-gray-600 transition-colors">Zurück</button>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-8">Installation?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                    <Controller name="installationType" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Oberirdisch" description="Im Garten" icon={ArrowUpFromLine} selected={field.value.includes('oberirdisch')} onClick={() => toggleSelection(field.value, field.onChange, 'oberirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                            <SelectionCard title="Halboberirdisch" description="Teils versenkt" icon={Layers} selected={field.value.includes('halboberirdisch')} onClick={() => toggleSelection(field.value, field.onChange, 'halboberirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                            <SelectionCard title="Unterirdisch" description="Im Boden" icon={ArrowDownToLine} selected={field.value.includes('unterirdisch')} onClick={() => toggleSelection(field.value, field.onChange, 'unterirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                        </>
                                                    )} />
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!formValues.installationType.length} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:bg-gas-dark transition-all">Weiter</button>
                                            </>
                                        ) : type === 'gas' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6">Wem gehört der Flüssiggastank?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <Controller name="details.ownership" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Eigentum" description="Mein Tank" icon={ThumbsUp} selected={field.value === 'Ja, Eigentum'} onClick={() => field.onChange('Ja, Eigentum')} />
                                                            <SelectionCard title="Mietvertrag" description="Fremdanbieter" icon={Info} selected={field.value === 'Nein, Mietvertrag'} onClick={() => field.onChange('Nein, Mietvertrag')} />
                                                        </>
                                                    )} />
                                                </div>
                                                {formValues.details.ownership === 'Nein, Mietvertrag' && (
                                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-start gap-3">
                                                        <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
                                                        <div>
                                                            <h4 className="font-bold text-yellow-800 text-sm">Wichtiger Hinweis</h4>
                                                            <p className="text-sm text-yellow-700 mt-1 leading-relaxed">
                                                                Bei Mietbehältern dürfen wir oft aus rechtlichen Gründen nicht befüllen. Bitte prüfen Sie Ihren Vertrag auf Fremdbefüllungsrechte.
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                                <button type="button" onClick={handleNext} disabled={!formValues.details.ownership} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:bg-gas-dark transition-all">Weiter</button>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6">Service Anfrage</h3>
                                                <Controller name="details.serviceType" control={control} render={({ field }) => (
                                                    <select {...field} className="w-full p-4 border-2 rounded-xl mb-4 bg-white"><option value="">Bitte wählen...</option><option>Innere Prüfung</option><option>Äußere Prüfung</option><option>Wartung</option></select>
                                                )} />
                                                <Controller name="details.message" control={control} render={({ field }) => (
                                                    <textarea {...field} className="w-full p-4 border-2 rounded-xl h-32 resize-none" placeholder="Nachricht..." />
                                                )} />
                                                <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mt-4 hover:bg-gas-dark transition-all">Weiter zu Kontakt</button>
                                            </>
                                        )}
                                        <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6">Kaufoption</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <Controller name="details.interest" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Kauf" description="Eigentumstank" icon={ThumbsUp} selected={field.value.includes('Kauf')} onClick={() => toggleSelection(field.value, field.onChange, 'Kauf')} />
                                                            <SelectionCard title="Miete" description="Mietmodell" icon={RefreshCw} selected={field.value.includes('Miete')} onClick={() => toggleSelection(field.value, field.onChange, 'Miete')} />
                                                        </>
                                                    )} />
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!formValues.details.interest.length} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:bg-gas-dark transition-all">Weiter</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
                                            </>
                                        ) : type === 'gas' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6">Bestelldetails</h3>
                                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                                                    <label className="block text-sm font-bold text-gray-700 mb-3">Flüssiggastankgröße</label>
                                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                                        {TANK_SIZES.map((tank) => (
                                                            <button
                                                                key={tank.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setCalcTank(tank);
                                                                    const newAmount = Math.max(0, Math.round(tank.volume * ((85 - calcFillLevel) / 100)));
                                                                    setValue('details.tankSizeGas', tank.label);
                                                                    setValue('details.amount', newAmount.toString());
                                                                }}
                                                                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all ${
                                                                    calcTank.id === tank.id
                                                                        ? 'bg-gas text-white shadow-lg ring-2 ring-gas-light'
                                                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gas/50'
                                                                }`}
                                                            >
                                                                {tank.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-between items-end mb-2">
                                                        <label className="text-sm font-bold text-gray-700">Füllstand</label>
                                                        <span className="text-xl font-bold text-gas">{calcFillLevel}%</span>
                                                    </div>
                                                    <input type="range" min="0" max="85" step="5" value={calcFillLevel} onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        setCalcFillLevel(val);
                                                        const newAmount = Math.max(0, Math.round(calcTank.volume * ((85 - val) / 100)));
                                                        setValue('details.amount', newAmount.toString());
                                                    }} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas" />
                                                    <div className="mt-4 flex justify-between items-center p-3 bg-white rounded-xl border border-gas-light">
                                                         <span className="font-bold text-gray-600">Menge:</span>
                                                         <span className="font-extrabold text-gas text-xl">{Math.max(0, Math.round(calcTank.volume * ((85 - calcFillLevel) / 100)))} Liter</span>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all">Weiter zu Kontakt</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
                                            </>
                                        ) : (
                                            <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} openLegal={openLegal} type={type} />
                                        )}
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-4">Zustand</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <Controller name="details.condition" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Neu" description="Fabrikneu" icon={Sparkles} selected={field.value.includes('Neu')} onClick={() => toggleSelection(field.value, field.onChange, 'Neu')} />
                                                            <div className="relative">
                                                                <SelectionCard title="Gebraucht" description="Aufbereitet" icon={RefreshCw} selected={field.value.includes('Gebraucht / Aufbereitet')} onClick={() => toggleSelection(field.value, field.onChange, 'Gebraucht / Aufbereitet')} />
                                                                <div className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wide">
                                                                    Günstiger
                                                                </div>
                                                            </div>
                                                        </>
                                                    )} />
                                                </div>

                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4 mb-6">
                                                    <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center border border-blue-100">
                                                        {/* Simple SVG representation of a tank */}
                                                        <svg viewBox="0 0 100 60" className="w-full h-full text-gas">
                                                            <rect x="10" y="20" width="80" height="30" rx="10" ry="10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                                                            <line x1="20" y1="20" x2="20" y2="50" stroke="currentColor" strokeWidth="1" />
                                                            <line x1="80" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="1" />
                                                            <rect x="40" y="15" width="20" height="5" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-blue-900 text-sm">Ihr Flüssiggastank</p>
                                                        <p className="text-xs text-blue-700">Wird komplett inklusive Armaturen geliefert.</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!formValues.details.condition.length} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:bg-gas-dark transition-all">Weiter</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
                                            </>
                                        ) : (
                                            <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} openLegal={openLegal} type={type} />
                                        )}
                                    </motion.div>
                                )}

                                {step === 6 && (
                                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-center mb-6">Details</h3>
                                                <div className="space-y-6">
                                                    <Controller name="details.building" control={control} render={({ field }) => (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <label className="text-sm font-bold text-gray-500 ml-1">Gebäudeart</label>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <SelectionCard title="Bestand" description="" icon={Home} selected={field.value === 'Haus (Bestand)'} onClick={() => field.onChange('Haus (Bestand)')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                                 <SelectionCard title="Neubau" description="" icon={Building2} selected={field.value === 'Neubau'} onClick={() => field.onChange('Neubau')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                                <SelectionCard title="Gewerbe" description="" icon={Factory} selected={field.value === 'Gewerbe'} onClick={() => field.onChange('Gewerbe')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                            </div>
                                                        </div>
                                                    )} />
                                                    <Controller name="details.tankSize" control={control} render={({ field }) => (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <label className="text-sm font-bold text-gray-500 ml-1">Flüssiggastankgröße</label>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                {['1.2t', '2.1t', '2.9t'].map(opt => (
                                                                    <button key={opt} type="button" onClick={() => toggleSelection(field.value, field.onChange, opt)} className={`p-4 rounded-xl border-2 font-bold transition-all ${field.value.includes(opt) ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 hover:border-gas/30'}`}>{opt}</button>
                                                                ))}
                                                            </div>
                                                            <a href="/rechner" target="_blank" className="text-center text-xs text-gas font-bold hover:underline flex items-center justify-center gap-1 mt-2">
                                                                <Info size={12} /> Unsicher? Nutzen Sie unseren Tank-Berater
                                                            </a>
                                                        </div>
                                                    )} />
                                                    <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mt-4 hover:bg-gas-dark transition-all">Weiter</button>
                                                    <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
                                                </div>
                                            </>
                                        ) : (
                                            <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} openLegal={openLegal} type={type} />
                                        )}
                                    </motion.div>
                                )}

                                {step === 7 && type === 'tank' && (
                                    <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} openLegal={openLegal} type={type} />
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

const ContactFormFields = ({ control, errors, submitting, submitForm, handleBack, openLegal, type }) => (
    <>
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Kontakt</h3>
        <div className="space-y-2 max-w-md mx-auto">
            <Controller name="contact.name" control={control} rules={{ required: "Name erforderlich" }} render={({ field }) => (
                <ModernInput {...field} label="Name" error={errors.contact?.name?.message} autoComplete="name" />
            )} />
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Controller name="contact.street" control={control} rules={{ required: "Straße erforderlich" }} render={({ field }) => (
                        <ModernInput {...field} label="Straße" error={errors.contact?.street?.message} autoComplete="address-line1" />
                    )} />
                </div>
                <div>
                     <Controller name="contact.number" control={control} rules={{ required: "Nr." }} render={({ field }) => (
                        <ModernInput {...field} label="Nr." error={errors.contact?.number?.message} autoComplete="address-line2" />
                    )} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                     <Controller name="contact.city" control={control} rules={{ required: "Ort erforderlich" }} render={({ field }) => (
                        <ModernInput {...field} label="Ort" error={errors.contact?.city?.message} autoComplete="address-level2" />
                    )} />
                </div>
            </div>
            <Controller name="contact.email" control={control} rules={{ required: "E-Mail erforderlich", pattern: { value: /^\S+@\S+$/i, message: "Ungültig" } }} render={({ field }) => (
                <ModernInput {...field} label="E-Mail" type="email" inputMode="email" error={errors.contact?.email?.message} autoComplete="email" />
            )} />
            <Controller name="contact.phone" control={control} render={({ field }) => (
                <ModernInput {...field} label="Telefon" type="tel" inputMode="tel" autoComplete="tel" />
            )} />

            {type !== 'service' && (
                <Controller name="contact.message" control={control} render={({ field }) => (
                    <ModernInput {...field} label="Nachricht (Optional)" multiline placeholder="Ihre Nachricht..." />
                )} />
            )}

            <div className="flex items-start text-xs text-gray-500 mt-2 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Controller name="contact.consent" control={control} rules={{ required: true }} render={({ field: { onChange, value } }) => (
                    <input type="checkbox" checked={value} onChange={onChange} className="mt-1 mr-3 w-4 h-4 accent-gas flex-shrink-0" />
                )} />
                <span className="leading-relaxed">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen maximal 30 Tage gespeichert werden. Sie können diese Einwilligung jederzeit widerrufen. Weitere Informationen finden Sie in der <button type="button" onClick={() => openLegal ? openLegal('privacy') : window.openPrivacy?.()} className="text-gas font-bold underline hover:text-gas-dark">Datenschutzerklärung</button>.
                </span>
                {errors.contact?.consent && <span className="text-red-500 font-bold ml-2">!</span>}
            </div>

            <button type="button" onClick={submitForm} disabled={submitting} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all hover:scale-[1.02] active:scale-[0.98]">
                {submitting ? 'Wird gesendet...' : 'Kostenlos anfragen'}
            </button>
            <button type="button" onClick={handleBack} className="w-full text-gray-500 font-bold mt-4 hover:text-gray-600 transition-colors">Zurück</button>
        </div>
    </>
);

export default WizardModal;
