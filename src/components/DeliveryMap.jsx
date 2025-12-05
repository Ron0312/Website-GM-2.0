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
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex items-center justify-center p-4 lg:p-0">
                {/* Northern Germany Outline (Detailed) */}
                <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-2xl max-w-md lg:max-w-full">
                    <path d="M 135 25 L 145 28 L 155 22 L 165 25 L 180 20 L 195 25 L 210 20 L 220 30 L 240 25 L 260 35 L 280 30 L 300 40 L 310 35 L 320 50 L 325 80 L 330 110 L 315 130 L 290 140 L 270 150 L 250 165 L 220 175 L 190 180 L 160 175 L 130 185 L 100 170 L 80 150 L 70 120 L 85 100 L 95 85 L 85 70 L 95 55 L 110 50 L 120 40 L 125 30 Z"
                          fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />

                    {/* Locations */}
                    <g transform="translate(195, 80)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="12" fill="white" fontWeight="bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Kiel</text>
                    </g>
                    <g transform="translate(180, 145)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="12" fill="white" fontWeight="bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Hamburg</text>
                    </g>
                    <g transform="translate(150, 45)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="12" fill="white" fontWeight="bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Flensburg</text>
                    </g>
                    <g transform="translate(280, 100)">
                        <circle cx="0" cy="0" r="4" fill="#4ade80"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
                        <text x="10" y="4" fontSize="12" fill="white" fontWeight="bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>Rostock</text>
                    </g>
                </svg>
            </div>
        </div>
    </div>
);

export default DeliveryMap;
