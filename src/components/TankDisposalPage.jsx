import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, Truck, FileText } from 'lucide-react';
import Hero from './Hero';
import ContactSection from './ContactSection';

const TankDisposalPage = ({ setActiveSection, openWizard }) => {
    const [contactPrefill, setContactPrefill] = useState({});

    const scrollToContact = () => {
        setContactPrefill({ subject: 'Anfrage Tankentsorgung' });
        const contactSection = document.getElementById('kontakt');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
             if (setActiveSection) setActiveSection('kontakt');
        }
    };

    const heroButtons = (
        <>
            <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent flex items-center gap-2"
            >
                <FileText size={20} />
                Jetzt Angebot anfordern
            </button>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="bg-white p-1 rounded">
                    <img src="/logos/tuev-nord-logo.png" alt="TÜV Nord" className="h-8 w-auto object-contain" />
                </div>
                <div className="bg-white p-1 rounded">
                    <img src="/logos/dvfg-logo.png" alt="DVFG" className="h-8 w-auto object-contain" />
                </div>
            </div>
        </>
    );

    return (
        <div className="bg-white">
            <Hero
                title="Flüssiggastank entsorgen & stilllegen"
                subtitle="Fachgerechte Entsorgung, Restgas-Vergütung & Abholung durch zertifizierten Fachbetrieb. Sicher, sauber und zum Festpreis."
                backgroundImage="/images/gas-order-hero.webp" // Reusing hero image for now
                openWizard={openWizard}
                setActiveSection={setActiveSection}
                customButtons={heroButtons}
            />

            {/* Intro / Safety Warning */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="bg-red-100 p-3 rounded-full shrink-0">
                            <AlertTriangle className="text-red-600" size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-800 mb-2">Wichtiger Sicherheitshinweis</h3>
                            <p className="text-red-700 leading-relaxed">
                                Versuchen Sie niemals, einen Flüssiggastank selbst zu demontieren oder zu öffnen!
                                Auch scheinbar leere Tanks enthalten Restgas und stehen unter Druck.
                                Eine unsachgemäße Handhabung ist <strong>lebensgefährlich</strong> (Explosionsgefahr).
                                Beauftragen Sie immer eine zugelassene Fachfirma nach TRF.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Wir entsorgen Ihren alten Tank</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Egal ob Sie auf eine andere Energieform umsteigen oder Ihren alten Tank gegen einen neuen Kauf-Tank tauschen möchten:
                        Wir übernehmen den kompletten Rückbau für Sie. Als zertifizierter Fachbetrieb kümmern wir uns um die Absaugung,
                        Stilllegung und den Abtransport.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gas-light/30 text-gas rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-3">1. Angebot anfordern</h3>
                        <p className="text-gray-600">
                            Senden Sie uns ein Foto vom Typschild und dem Standort. Wir erstellen Ihnen ein verbindliches Festpreis-Angebot.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gas-light/30 text-gas rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-3">2. Restgas & Abbau</h3>
                        <p className="text-gray-600">
                            Unser Tankwagen saugt wertvolles Restgas ab (Gutschrift!). Anschließend wird der Behälter fachgerecht demontiert.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gas-light/30 text-gas rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Truck size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-3">3. Abtransport</h3>
                        <p className="text-gray-600">
                            Unser Kran-LKW verlädt den leeren Tank und transportiert ihn zur Verschrottung. Sie erhalten einen Entsorgungsnachweis.
                        </p>
                    </div>
                </div>

                {/* Cost Factors */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Was kostet die Entsorgung?</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-700 mb-4">
                                Die Kosten sind individuell und hängen von mehreren Faktoren ab. Oft können wir die Kosten durch die Vergütung des Restgases deutlich senken.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span><strong>Tankart:</strong> Oberirdisch ist günstiger als unterirdisch.</span>
                                </li>
                                <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span><strong>Zugänglichkeit:</strong> Kommt der Kran-LKW direkt an den Tank?</span>
                                </li>
                                <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span><strong>Restgas:</strong> Wir vergüten abgesaugtes Gas zum Tagespreis.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-center">
                                <span className="block text-gray-500 text-sm mb-1">Individuelles Angebot</span>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Festpreis erhalten</h4>
                                <p className="text-sm text-gray-600 mb-6">
                                    Wir erstellen Ihnen ein verbindliches Angebot für die Entsorgung – passend zu Ihrem Tankstandort.
                                </p>
                                <button
                                    onClick={scrollToContact}
                                    className="w-full bg-gas text-white font-bold py-3 rounded-lg hover:bg-gas-dark transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText size={18} />
                                    Jetzt Angebot anfordern
                                </button>
                                <div className="mt-4 flex justify-center gap-4">
                                    <img src="/logos/tuev-nord-logo.png" alt="TÜV Nord" className="h-6 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                                    <img src="/logos/dvfg-logo.png" alt="DVFG" className="h-6 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ / Details */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Muss ich das Restgas "abfackeln"?</h3>
                        <p className="text-gray-600">
                            Nein! Das Abfackeln ist umweltschädlich und Verschwendung. Wir saugen das Gas mit speziellen Kompressoren ab, filtern es und führen es dem Kreislauf wieder zu. Sie erhalten dafür eine Gutschrift.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Entsorgen Sie auch unterirdische Tanks?</h3>
                        <p className="text-gray-600">
                            Ja. Hier muss der Tank allerdings vorher freigelegt werden (Erdarbeiten). Wir können diese Arbeiten vermitteln oder Sie übernehmen den Aushub bauseits nach unserer Anleitung.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Was passiert mit der Rohrleitung?</h3>
                        <p className="text-gray-600">
                            Die erdverlegte Rohrleitung verbleibt meist im Boden, wird aber an den Enden fachgerecht verschlossen. Die Anschlussarmaturen am Haus werden demontiert.
                        </p>
                    </div>
                </div>
            </div>

            <ContactSection prefill={contactPrefill} />
        </div>
    );
};

export default TankDisposalPage;
