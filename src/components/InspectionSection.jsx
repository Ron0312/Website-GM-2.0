import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check } from 'lucide-react';

const InspectionSection = ({ openWizard }) => {
    return (
        <section id="pruefungen" className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-32 lg:py-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/inspection-background.jpg" alt="Technische Prüfung Flüssiggastank" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
                            <ShieldCheck className="text-green-400" size={16} />
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Sicherheit zuerst</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Tankprüfungen & Service</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Wir kümmern uns um die gesetzlich vorgeschriebenen Prüfungen (Innere & Äußere) für Ihren Flüssiggastank. Zuverlässig und zertifiziert.</p>
                        <button onClick={() => openWizard('service')} className="bg-gas hover:bg-gas-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-gas/20 transition-all transform hover:scale-105">
                            Prüfung anfragen
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum sind Prüfungen notwendig?</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Flüssiggastanks unterliegen strengen Sicherheitsvorschriften. Um die Sicherheit für Mensch und Umwelt zu gewährleisten, schreibt der Gesetzgeber regelmäßige Prüfungen vor.
                            Diese dienen nicht nur der Sicherheit, sondern werterhalten auch Ihre Anlage.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1"><Check size={16} /></div>
                                <span className="text-gray-700 font-medium">Äußere Prüfung (alle 2 Jahre)</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1"><Check size={16} /></div>
                                <span className="text-gray-700 font-medium">Innere Prüfung (alle 10 Jahre)</span>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1"><Check size={16} /></div>
                                <span className="text-gray-700 font-medium">Rohrleitungsprüfung (alle 10 Jahre)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Unser Service-Angebot</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            gasmöller organisiert und führt die Prüfungen in Zusammenarbeit mit zugelassenen Überwachungsstellen (ZÜS) durch. Sie müssen sich um nichts kümmern.
                        </p>
                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-800">Äußere Prüfung</span>
                                <span className="text-gas font-bold">Auf Anfrage</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-800">Innere Prüfung</span>
                                <span className="text-gas font-bold">Auf Anfrage</span>
                            </div>
                        </div>
                        <button onClick={() => openWizard('service')} className="w-full mt-8 bg-white border-2 border-gas text-gas font-bold py-3 rounded-xl hover:bg-gas hover:text-white transition-colors">
                            Jetzt Termin vereinbaren
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Sicherheit hat Vorfahrt</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Verlassen Sie sich auf unsere Expertise. Wir prüfen Ihre Anlage gewissenhaft und dokumentieren alles ordnungsgemäß für Ihre Unterlagen.
                    </p>
                    <button onClick={() => openWizard('service')} className="bg-gas text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all">
                        Kontakt aufnehmen
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InspectionSection;
