import React from 'react';
import { Settings, Flame, ArrowRight } from 'lucide-react';

const DualCTA = ({ openWizard }) => {
    return (
        <div className="my-16 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Wie können wir helfen?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Wählen Sie Ihr Anliegen für den passenden Service.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tank-Anfrage */}
                    <div
                        className="group relative bg-white rounded-2xl p-8 cursor-pointer border border-gray-200 hover:border-gas/30 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                        onClick={() => openWizard('tank')}
                    >
                        <div className="bg-gas/5 p-5 rounded-2xl mb-6 group-hover:scale-105 group-hover:bg-gas/10 transition-all duration-300">
                            <Settings className="w-10 h-10 text-gas" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Tank-Anfrage</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Beratung & Angebot für neue Tanks, Wechsel oder Übernahme.
                        </p>
                        <span className="mt-auto text-gas font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Anfrage starten <ArrowRight className="w-5 h-5" />
                        </span>
                    </div>

                    {/* Gas bestellen */}
                    <div
                        className="group relative bg-white rounded-2xl p-8 cursor-pointer border border-gray-200 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                        onClick={() => openWizard('gas')}
                    >
                        <div className="bg-orange-50 p-5 rounded-2xl mb-6 group-hover:scale-105 group-hover:bg-orange-100 transition-all duration-300">
                            <Flame className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Gas bestellen</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Tagesaktuelle Preise & Liefertermin direkt online anfragen.
                        </p>
                        <span className="mt-auto text-orange-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Jetzt bestellen <ArrowRight className="w-5 h-5" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DualCTA;
