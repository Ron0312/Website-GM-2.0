import React from 'react';
import { Settings, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DualCTA = ({ openWizard }) => {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-gray-200/50">
                {/* Decorative Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50/30"></div>

                {/* Center Divider Line (Desktop) */}
                <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                <div className="relative z-10 grid md:grid-cols-2">
                    {/* Tank-Anfrage */}
                    <div
                        onClick={() => openWizard('tank')}
                        className="group p-12 md:p-16 cursor-pointer relative overflow-hidden transition-colors hover:bg-gray-50/50"
                    >
                        <div className="relative z-10 flex flex-col h-full items-start text-left">
                            <div className="bg-blue-100/50 p-4 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Settings className="w-8 h-8 text-gas" strokeWidth={2} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                Flüssiggastank <br/>
                                <span className="text-gas">kaufen & mieten</span>
                            </h3>
                            <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-sm">
                                Unabhängige Beratung für Neuanlagen, Versorgerwechsel oder Tankübernahmen.
                            </p>
                            <motion.span
                                className="mt-auto inline-flex items-center gap-3 text-gas font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all"
                            >
                                Zum Assistenten <ArrowRight className="w-5 h-5" />
                            </motion.span>
                        </div>

                        {/* Background Effect */}
                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gas/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Gas bestellen */}
                    <div
                        onClick={() => openWizard('gas')}
                        className="group p-12 md:p-16 cursor-pointer relative overflow-hidden transition-colors hover:bg-orange-50/30"
                    >
                        <div className="relative z-10 flex flex-col h-full items-start text-left">
                            <div className="bg-orange-100/50 p-4 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Flame className="w-8 h-8 text-orange-500" strokeWidth={2} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                Flüssiggas <br/>
                                <span className="text-orange-500">bestellen</span>
                            </h3>
                            <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-sm">
                                Prüfen Sie tagesaktuelle Preise und Liefertermine für Ihre Region direkt online.
                            </p>
                            <motion.span
                                className="mt-auto inline-flex items-center gap-3 text-orange-600 font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all"
                            >
                                Preis berechnen <ArrowRight className="w-5 h-5" />
                            </motion.span>
                        </div>

                         {/* Background Effect */}
                         <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DualCTA;
