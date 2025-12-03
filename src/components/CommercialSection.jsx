import React from 'react';
import { Tractor, Factory, Truck } from 'lucide-react';

const CommercialSection = ({ setActiveSection }) => (
    <section className="py-24 bg-gray-50" id="gewerbe">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-2">B2B Lösungen</h2>
                <h3 className="text-3xl font-extrabold">Energie für Macher</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
    </section>
);

export default CommercialSection;
