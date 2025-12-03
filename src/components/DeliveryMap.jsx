import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const DeliveryMap = () => (
    <div className="py-20 bg-gray-900 text-white overflow-hidden relative">
        {/* Using placeholder for texture as external images might be blocked or not desired */}
        {/* In a real app I would host this locally */}
        <div className="absolute inset-0 opacity-10 bg-gray-800"></div>
        <div className="max-w-7xl mx-auto px-4 lg:flex items-center relative z-10">
            <div className="lg:w-1/2 pr-12">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded mb-6">
                    <MapPin size={14} className="text-green-400"/>
                    <span className="text-xs font-bold uppercase tracking-widest">Liefergebiet</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-6">Zu Hause im Norden.</h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Von der Nordsee bis zur Ostsee, von Hamburg bis zur dänischen Grenze. Wir liefern Energie dorthin, wo Sie sie brauchen.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {['Schleswig-Holstein', 'Hamburg', 'Niedersachsen (Nord)', 'Mecklenburg'].map((region, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 rounded bg-white/5 border border-white/10">
                            <CheckCircle size={18} className="text-gas-light"/>
                            <span className="font-medium text-sm">{region}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] flex items-center justify-center">
                {/* Northern Germany Outline (Simplified) */}
                <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
                    <path d="M 120 20 L 160 30 L 180 10 L 220 20 L 250 10 L 300 30 L 320 80 L 280 150 L 200 180 L 150 170 L 100 190 L 50 150 L 30 100 L 80 50 Z"
                          fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="1" />

                    {/* Locations */}
                    <g transform="translate(180, 80)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="10" fill="white" fontWeight="bold">Kiel</text>
                    </g>
                    <g transform="translate(180, 140)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="10" fill="white" fontWeight="bold">Hamburg</text>
                    </g>
                    <g transform="translate(140, 40)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="10" fill="white" fontWeight="bold">Flensburg</text>
                    </g>
                    <g transform="translate(250, 100)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="10" fill="white" fontWeight="bold">Rostock</text>
                    </g>
                </svg>
            </div>
        </div>
    </div>
);

export default DeliveryMap;
