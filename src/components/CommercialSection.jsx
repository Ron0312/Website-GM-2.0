import React from 'react';
import { Tractor, Factory, Truck } from 'lucide-react';

const CommercialSection = ({ setActiveSection }) => (
    <section className="py-24 bg-gray-50" id="gewerbe">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">B2B Lösungen</h2>
                <h3 className="text-3xl font-extrabold">Energie für Macher</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    { t: 'Landwirtschaft', d: 'Stallheizung & Trocknung', i: Tractor, desc: 'Leistungsstarke Trocknungsanlagen und Stallheizungen. Auch mit BioLPG für nachhaltige Betriebe.' },
                    { t: 'Industrie', d: 'Prozesswärme & Hallen', i: Factory, desc: 'Effiziente Dunkelstrahler für hohe Hallen und präzise Prozesswärme für Lackierkabinen.' },
                    { t: 'Logistik', d: 'Staplergas & Tankstellen', i: Truck, desc: 'Treibgas für Gabelstapler. Sauberer als Diesel, stärker als Elektro. Innen und Außen.' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                        <item.i size={40} className="text-gray-300 group-hover:text-gas mb-6 transition-colors"/>
                        <h4 className="font-bold text-xl mb-2">{item.t}</h4>
                        <p className="text-gray-500 font-medium mb-3">{item.d}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gas-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Warum Unternehmen auf uns setzen</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Persönlicher Ansprechpartner', desc: 'Kein Callcenter. Sie haben einen direkten Draht zu Ihrem Betreuer.' },
                                { title: 'Flexible Logistik', desc: 'Wir liefern dann, wenn es in Ihren Betriebsablauf passt. Auch Just-in-Time.' },
                                { title: 'Transparente Konditionen', desc: 'Klare Preisstrukturen ohne versteckte Zuschläge. Planungssicherheit für Ihr Budget.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-2 h-2 mt-2.5 rounded-full bg-gas flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                        <h4 className="font-bold text-xl mb-2">Individuelles Angebot</h4>
                        <p className="text-gray-500 text-sm mb-6">Lassen Sie uns über Ihren Energiebedarf sprechen. Wir erstellen Ihnen ein maßgeschneidertes Konzept.</p>
                        <button onClick={() => setActiveSection('kontakt')} className="w-full bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all shadow-lg hover:shadow-xl">
                            Jetzt anfragen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default CommercialSection;
