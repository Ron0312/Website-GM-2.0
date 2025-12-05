import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const DeliveryMap = () => {
    const cities = [
        { name: 'Flensburg', x: 295, y: 55, align: 'middle' },
        { name: 'Kiel', x: 355, y: 125, align: 'start' },
        { name: 'Lübeck', x: 435, y: 155, align: 'start' },
        { name: 'Hamburg', x: 355, y: 230, align: 'start' },
        { name: 'Elmshorn', x: 325, y: 210, align: 'end' },
        { name: 'Lüneburg', x: 365, y: 300, align: 'start' },
        { name: 'Schwerin', x: 485, y: 260, align: 'start' },
        { name: 'Rostock', x: 535, y: 85, align: 'start' },
    ];

    return (
        <div className="py-20 bg-gray-900 text-white overflow-hidden relative">
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
                    <svg viewBox="0 0 800 500" className="w-full h-auto drop-shadow-2xl max-w-md lg:max-w-full">
                        {/* Northern Germany Outline */}
                        <path d="M 280 40 L 270 50 L 265 90 L 260 130 L 270 160 L 300 175 L 310 190 L 340 215 L 350 220 L 370 230 L 380 250 L 370 280 L 360 320 L 400 320 L 440 300 L 480 280 L 520 270 L 580 240 L 620 150 L 600 120 L 580 90 L 550 70 L 520 80 L 480 100 L 440 140 L 420 120 L 400 100 L 380 110 L 360 125 L 340 100 L 320 60 L 300 40 Z"
                              fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="2" strokeLinejoin="round" />

                        {/* Islands */}
                        {/* Sylt */}
                        <path d="M 255 20 L 265 20 L 265 55 L 255 50 Z" fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        {/* Fehmarn */}
                        <path d="M 405 75 L 425 80 L 420 95 L 400 90 Z" fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        {/* Rügen */}
                        <path d="M 550 60 L 580 40 L 590 70 L 570 80 Z" fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        {/* Usedom */}
                        <path d="M 610 110 L 630 100 L 640 130 L 620 140 Z" fill="#005b9f" opacity="0.3" stroke="white" strokeWidth="2" strokeLinejoin="round" />

                        {/* Cities */}
                        {cities.map((city, index) => (
                            <g key={index} transform={`translate(${city.x}, ${city.y})`}>
                                <circle cx="0" cy="0" r="5" fill="#4ade80">
                                    <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                                </circle>
                                <text
                                    x={city.align === 'start' ? 12 : city.align === 'end' ? -12 : 0}
                                    y={5}
                                    fontSize="14"
                                    fill="white"
                                    fontWeight="bold"
                                    textAnchor={city.align}
                                    style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}
                                >
                                    {city.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMap;
