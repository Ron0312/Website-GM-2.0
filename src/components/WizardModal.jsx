import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Settings, Flame, Wrench, AlertTriangle, ArrowUpFromLine, ArrowDownToLine, Layers, Home, Building2, Factory, Sparkles, RefreshCw, Info, Phone, ThumbsUp, AlertCircle } from 'lucide-react';
import { getPlzError } from '../utils/validation';
import ModernInput from './ui/ModernInput';
import SelectionCard from './ui/SelectionCard';

const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";

const WizardModal = ({ isOpen, onClose, initialType = 'tank', initialData = null }) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState(initialType);

    // Form Hook
    const { control, register, handleSubmit, watch, setValue, formState: { errors }, reset, trigger } = useForm({
        resolver: undefined,
        mode: "onBlur",
        defaultValues: {
            plz: '',
            installationType: '',
            details: {
                ownership: 'Ja, Eigentum',
                tankSizeGas: '',
                amount: '',
                fillUp: false,
                serviceType: '',
                message: '',
                condition: '',
                building: '',
                tankSize: '',
                interest: ''
            },
            contact: {
                name: '',
                street: '',
                number: '',
                city: '',
                email: '',
                phone: '',
                honeypot: '',
                consent: false
            }
        }
    });

    const formValues = watch();

    // Calculator State
    const tankSizes = [
        { id: '1.2t', label: '1,2 t', volume: 2700 },
        { id: '2.1t', label: '2,1 t', volume: 4850 },
        { id: '2.9t', label: '2,9 t', volume: 6400 },
    ];
    const [calcTank, setCalcTank] = useState(tankSizes[0]);
    const [calcFillLevel, setCalcFillLevel] = useState(30);

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initialization
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSuccess(false);
            if (initialType) setType(initialType);

            // Reset Form
            reset({
                plz: initialData?.plz || '',
                installationType: '',
                details: {
                    ownership: 'Ja, Eigentum', // Default to ownership
                    tankSizeGas: '',
                    amount: '',
                    fillUp: false,
                    serviceType: '',
                    message: '',
                    condition: '',
                    building: '',
                    tankSize: '',
                    interest: ''
                },
                contact: {
                    name: '',
                    street: '',
                    number: '',
                    city: '',
                    email: '',
                    phone: '',
                    honeypot: '',
                    consent: false
                }
            });

            if (initialData) {
                // Initialize calculator
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
                    setStep(3); // Jump to calculator for gas if data present
                }
            }
        }
    }, [isOpen, initialType, initialData, reset, setValue]);

    // Step Logic
    // Tank: 1(PLZ) -> 2(Type) -> 3(Install) -> 4(Condition) -> 5(Details) -> 6(Contact)
    // Gas: 1(PLZ) -> 2(Type) -> 3(Ownership) -> 4(Calculator) -> 5(Contact)
    // Service: 1(PLZ) -> 2(Type) -> 3(Details) -> 4(Contact)

    const handleNext = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);

        if (step === 1) {
            const plzValid = await trigger('plz');
            const plzVal = formValues.plz;
            const regionError = getPlzError(plzVal);
            if (regionError || !plzValid || !/^\d{5}$/.test(plzVal)) return;
            setStep(2);
        } else if (step === 2) {
             setStep(3);
        } else if (step === 3) {
            if (type === 'tank') {
                if (!formValues.installationType) return;
                setStep(4);
            } else if (type === 'gas') {
                // Check ownership selection
                if (!formValues.details.ownership) return;
                setStep(4);
            } else {
                // Service
                setStep(4);
            }
        } else if (step === 4) {
             if (type === 'tank') {
                if (!formValues.details.condition) return;
                setStep(5);
             } else if (type === 'gas') {
                setStep(5);
             } else {
                submitForm();
             }
        } else if (step === 5) {
             if (type === 'tank') setStep(6);
             else submitForm();
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
        formData.append("subject", `Neue Anfrage: ${type.toUpperCase()} - ${data.plz}`);
        formData.append("from_name", "gasmöller Website");

        formData.append("Type", type);
        formData.append("PLZ", data.plz);

        if (type === 'tank') {
            formData.append("Installation", data.installationType);
            formData.append("Zustand", data.details.condition);
            formData.append("Gebäude", data.details.building);
            formData.append("Tankgröße", data.details.tankSize);
        } else if (type === 'gas') {
            formData.append("Eigentum", data.details.ownership);
            formData.append("Tankgröße", data.details.tankSizeGas);
            formData.append("Menge (Liter)", data.details.amount);
            formData.append("Füllstand (%)", calcFillLevel);
        } else {
            formData.append("Service Typ", data.details.serviceType);
            formData.append("Nachricht", data.details.message);
        }

        formData.append("Name", data.contact.name);
        formData.append("Address", `${data.contact.street} ${data.contact.number}, ${data.plz} ${data.contact.city}`);
        formData.append("Email", data.contact.email);
        formData.append("Phone", data.contact.phone);

        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const result = await response.json();
            if (result.success) setSuccess(true);
            else alert("Es gab einen Fehler. Bitte versuchen Sie es später.");
        } catch (error) {
            alert("Netzwerkfehler.");
        } finally {
            setSubmitting(false);
        }
    });

    const getTotalSteps = () => {
        if (type === 'tank') return 6;
        if (type === 'gas') return 5;
        return 4;
    };
    const totalSteps = getTotalSteps();
    const progress = (step / totalSteps) * 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" role="dialog" aria-modal="true">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-20">
                    <div>
                        <h2 id="wizard-title" className="text-xl font-bold text-gray-900">Anfrage stellen</h2>
                        <p className="text-sm text-gray-400">Schritt {step} von {totalSteps}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="tel:04551897089" className="hidden sm:flex items-center gap-2 text-gas font-bold text-sm bg-gas-light/20 px-3 py-1.5 rounded-lg">
                            <Phone size={14} /> <span>04551 89 70 89</span>
                        </a>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24}/></button>
                    </div>
                </div>

                {/* Progress */}
                <div className="relative pt-6 pb-2 px-6">
                    <div className="h-1 bg-gray-100 w-full rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gas" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative">
                    {success ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"><Check size={48} /></motion.div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Vielen Dank!</h3>
                            <button onClick={onClose} className="bg-gas text-white px-10 py-4 rounded-xl font-bold mt-4">Schließen</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); /* handled by buttons */ }} className="h-full pb-6">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: PLZ */}
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
                                                        autoFocus
                                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                                                    />
                                                )}
                                            />
                                            <button type="button" onClick={handleNext} className="w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all shadow-xl shadow-gas/20">Weiter</button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: CATEGORY */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h3 className="text-2xl font-bold text-center mb-8">Wie können wir helfen?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            <SelectionCard title="Neuer Tank" description="Kauf oder Miete" icon={Settings} selected={type === 'tank'} onClick={() => setType('tank')} />
                                            <SelectionCard title="Flüssiggas" description="Befüllung" icon={Flame} selected={type === 'gas'} onClick={() => setType('gas')} />
                                            <SelectionCard title="Service" description="Wartung" icon={Wrench} selected={type === 'service'} onClick={() => setType('service')} />
                                        </div>
                                        <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mb-4">Weiter</button>
                                        <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold">Zurück</button>
                                    </motion.div>
                                )}

                                {/* STEP 3 */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                {/* TANK STEP 3: Installation */}
                                                <h3 className="text-2xl font-bold text-center mb-8">Installation?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                    <Controller name="installationType" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Oberirdisch" description="Im Garten" icon={ArrowUpFromLine} selected={field.value === 'oberirdisch'} onClick={() => field.onChange('oberirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                            <SelectionCard title="Halboberirdisch" description="Teils versenkt" icon={Layers} selected={field.value === 'halboberirdisch'} onClick={() => field.onChange('halboberirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                            <SelectionCard title="Unterirdisch" description="Im Boden" icon={ArrowDownToLine} selected={field.value === 'unterirdisch'} onClick={() => field.onChange('unterirdisch')} className="!p-3 !text-sm flex-col items-center text-center justify-center" />
                                                        </>
                                                    )} />
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!formValues.installationType} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">Weiter</button>
                                            </>
                                        ) : type === 'gas' ? (
                                            <>
                                                {/* GAS STEP 3: Ownership */}
                                                <h3 className="text-2xl font-bold text-center mb-6">Wem gehört der Tank?</h3>
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
                                                                Bei Miettanks dürfen wir oft aus rechtlichen Gründen nicht befüllen. Bitte prüfen Sie Ihren Vertrag auf Fremdbefüllungsrechte.
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                <button type="button" onClick={handleNext} disabled={!formValues.details.ownership} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">Weiter</button>
                                            </>
                                        ) : (
                                            <>
                                                {/* SERVICE STEP 3: Details */}
                                                <h3 className="text-2xl font-bold text-center mb-6">Service Anfrage</h3>
                                                <Controller name="details.serviceType" control={control} render={({ field }) => (
                                                    <select {...field} className="w-full p-4 border-2 rounded-xl mb-4 bg-white"><option value="">Bitte wählen...</option><option>Innere Prüfung</option><option>Äußere Prüfung</option><option>Wartung</option></select>
                                                )} />
                                                <Controller name="details.message" control={control} render={({ field }) => (
                                                    <textarea {...field} className="w-full p-4 border-2 rounded-xl h-32 resize-none" placeholder="Nachricht..." />
                                                )} />
                                                <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mt-4">Weiter zu Kontakt</button>
                                            </>
                                        )}
                                        <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold mt-4">Zurück</button>
                                    </motion.div>
                                )}

                                {/* STEP 4 */}
                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                {/* TANK STEP 4: Condition */}
                                                <h3 className="text-2xl font-bold text-center mb-4">Zustand</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <Controller name="details.condition" control={control} render={({ field }) => (
                                                        <>
                                                            <SelectionCard title="Neu" description="Fabrikneu" icon={Sparkles} selected={field.value === 'Neu'} onClick={() => field.onChange('Neu')} />
                                                            <div className="relative">
                                                                <SelectionCard title="Gebraucht" description="Aufbereitet" icon={RefreshCw} selected={field.value === 'Gebraucht / Aufbereitet'} onClick={() => field.onChange('Gebraucht / Aufbereitet')} />
                                                                {/* Badge for Refurbished */}
                                                                <div className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wide">
                                                                    Günstiger
                                                                </div>
                                                            </div>
                                                        </>
                                                    )} />
                                                </div>
                                                <button type="button" onClick={handleNext} disabled={!formValues.details.condition} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">Weiter</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold mt-4">Zurück</button>
                                            </>
                                        ) : type === 'gas' ? (
                                            <>
                                                {/* GAS STEP 4: Calculator */}
                                                <h3 className="text-2xl font-bold text-center mb-6">Bestelldetails</h3>
                                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
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
                                                <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg">Weiter zu Kontakt</button>
                                                <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold mt-4">Zurück</button>
                                            </>
                                        ) : (
                                            /* SERVICE STEP 4: Contact */
                                            <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} />
                                        )}
                                    </motion.div>
                                )}

                                {/* STEP 5 */}
                                {step === 5 && (
                                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        {type === 'tank' ? (
                                            <>
                                                 {/* TANK STEP 5: Details */}
                                                <h3 className="text-2xl font-bold text-center mb-6">Details</h3>
                                                <div className="space-y-6">
                                                    <Controller name="details.building" control={control} render={({ field }) => (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <label className="text-sm font-bold text-gray-500 ml-1">Gebäudeart</label>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <SelectionCard
                                                                    title="Bestand"
                                                                    description=""
                                                                    icon={Home}
                                                                    selected={field.value === 'Haus (Bestand)'}
                                                                    onClick={() => field.onChange('Haus (Bestand)')}
                                                                    className="!p-3 !text-sm flex-col items-center text-center justify-center"
                                                                />
                                                                 <SelectionCard
                                                                    title="Neubau"
                                                                    description=""
                                                                    icon={Building2}
                                                                    selected={field.value === 'Neubau'}
                                                                    onClick={() => field.onChange('Neubau')}
                                                                    className="!p-3 !text-sm flex-col items-center text-center justify-center"
                                                                />
                                                                <SelectionCard
                                                                    title="Gewerbe"
                                                                    description=""
                                                                    icon={Factory}
                                                                    selected={field.value === 'Gewerbe'}
                                                                    onClick={() => field.onChange('Gewerbe')}
                                                                    className="!p-3 !text-sm flex-col items-center text-center justify-center"
                                                                />
                                                            </div>
                                                        </div>
                                                    )} />
                                                    <Controller name="details.tankSize" control={control} render={({ field }) => (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <label className="text-sm font-bold text-gray-500 ml-1">Tankgröße</label>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                {['1.2t', '2.1t', '2.9t'].map(opt => (
                                                                    <button key={opt} type="button" onClick={() => field.onChange(opt)} className={`p-4 rounded-xl border-2 font-bold transition-all ${field.value === opt ? 'border-gas bg-gas text-white shadow-lg' : 'border-gray-100 hover:border-gas/30'}`}>{opt}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )} />
                                                    <button type="button" onClick={handleNext} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg mt-4">Weiter</button>
                                                    <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold mt-4">Zurück</button>
                                                </div>
                                            </>
                                        ) : (
                                            /* GAS STEP 5: Contact */
                                            <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} />
                                        )}
                                    </motion.div>
                                )}

                                {/* STEP 6 */}
                                {step === 6 && type === 'tank' && (
                                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <ContactFormFields control={control} errors={errors} submitting={submitting} submitForm={submitForm} handleBack={handleBack} />
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

const ContactFormFields = ({ control, errors, submitting, submitForm, handleBack }) => (
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
                <ModernInput {...field} label="E-Mail" type="email" error={errors.contact?.email?.message} autoComplete="email" />
            )} />
            <Controller name="contact.phone" control={control} render={({ field }) => (
                <ModernInput {...field} label="Telefon" type="tel" autoComplete="tel" />
            )} />

            <div className="flex items-start text-xs text-gray-500 mt-2 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Controller name="contact.consent" control={control} rules={{ required: true }} render={({ field: { onChange, value } }) => (
                    <input type="checkbox" checked={value} onChange={onChange} className="mt-1 mr-3 w-4 h-4 accent-gas flex-shrink-0" />
                )} />
                <span className="leading-relaxed">
                    Ich stimme zu, dass meine Angaben dauerhaft gespeichert werden. Mehr Infos in der <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-gas font-bold underline">Datenschutzerklärung</a>.
                </span>
            </div>

            <button type="button" onClick={submitForm} disabled={submitting} className="w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gas-dark transition-all">
                {submitting ? 'Wird gesendet...' : 'Kostenlos anfragen'}
            </button>
            <button type="button" onClick={handleBack} className="w-full text-gray-400 font-bold mt-4">Zurück</button>
        </div>
    </>
);

export default WizardModal;
