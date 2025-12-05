import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

const DeliveryMap = () => {
    // Cities configuration
    const cities = [
        { name: 'Flensburg', x: 295, y: 55, align: 'middle' },
        { name: 'Kiel', x: 355, y: 125, align: 'start' },
        { name: 'Lübeck', x: 435, y: 155, align: 'start' },
        { name: 'Hamburg', x: 355, y: 230, align: 'start' },
        { name: 'Elmshorn', x: 325, y: 210, align: 'end' },
        { name: 'Lüneburg', x: 365, y: 300, align: 'start' },
        { name: 'Schwerin', x: 485, y: 260, align: 'start' },
    ];

    // Detailed SVG Paths for Northern Germany

    // Schleswig-Holstein (Mainland)
    // Starts at Danish border (West), traces Wadden Sea, Elbe North Bank, Border with HH/MV, Baltic Coast
    const pathSH = `
        M 215 42
        L 216 45 L 214 50 L 216 60 L 212 70 L 215 80
        L 200 85 L 180 90 L 175 95 L 180 100 L 200 105
        L 200 115 L 195 125 L 200 135 L 195 145
        L 210 155 L 225 160 L 230 162
        L 245 165 L 260 170 L 280 180 L 300 195 L 320 210 L 330 215
        L 332 212 L 340 205 L 350 200 L 360 195 L 370 190
        L 380 200 L 390 220
        L 400 210 L 405 200 L 410 190 L 420 188 L 425 186
        L 430 180 L 435 170 L 432 160 L 435 150 L 440 140
        L 430 135 L 420 130 L 410 120
        L 400 118 L 390 120 L 380 125 L 370 120 L 365 125 L 360 130 L 362 115
        L 355 110 L 350 105 L 340 110
        L 345 95 L 350 90 L 355 84 L 345 88 L 335 92 L 325 90 L 335 80 L 345 75 L 350 70
        L 340 65 L 330 60 L 320 50 L 310 55 L 300 58 L 295 56
        L 280 54 L 260 52 L 240 48 L 220 44 L 215 42
        Z
    `;

    // Islands SH
    // Sylt, Amrum, Föhr, Fehmarn, Pellworm
    const pathIslandsSH = `
        M 192 20 L 188 25 L 185 35 L 186 45 L 184 55 L 186 65 L 188 70 L 192 65 L 194 55 L 196 45 L 200 40 L 198 30 L 202 25 L 198 20 L 192 20 Z
        M 182 75 L 180 80 L 182 85 L 188 84 L 186 76 Z
        M 198 72 L 195 75 L 196 80 L 202 82 L 205 78 L 202 72 Z
        M 465 105 L 455 110 L 450 120 L 460 125 L 470 120 L 475 110 L 470 100 Z
    `;

    // Hamburg (HH)
    // Detailed outline including Elbe islands/harbor area implied by shape
    const pathHH = `
        M 330 215
        L 340 212 L 350 208 L 360 205 L 370 190
        L 380 200 L 390 220
        L 380 225 L 370 230 L 360 235
        L 350 245 L 340 235 L 335 225 L 330 215
        Z
    `;

    // Niedersachsen (North) (NI)
    // Cuxhaven, Elbe South Bank, Lüneburg Heath, Weser, Jadebusen
    const pathNI = `
        M 225 186
        L 240 188 L 260 190 L 280 195 L 300 205 L 315 212 L 330 215
        L 335 225 L 340 235 L 350 245
        L 360 250 L 370 252 L 380 255 L 390 260
        L 395 270 L 400 280 L 405 290
        L 380 295 L 350 300 L 320 295 L 290 290 L 260 285 L 240 280
        L 235 260 L 230 250
        L 220 245 L 210 240
        L 205 250 L 200 255 L 195 250 L 190 240 L 185 230 L 180 235
        L 185 220 L 195 210 L 200 200 L 210 195 L 225 186
        Z
    `;

    // Mecklenburg-Vorpommern (MV)
    // Coast with Rügen/Usedom (mainland), Lake District border
    const pathMV = `
        M 425 186
        L 435 182 L 445 180 L 455 185 L 460 190 L 465 180
        L 470 170 L 480 165 L 490 160 L 500 155 L 510 150
        L 520 145 L 530 140 L 540 135 L 550 130
        L 560 120 L 570 115 L 580 120 L 590 125
        L 600 130 L 610 135 L 620 140 L 630 145
        L 650 150 L 670 160 L 690 170 L 700 180
        L 700 200 L 680 220 L 650 240
        L 600 250 L 550 260 L 500 270 L 450 280
        L 420 280 L 400 280
        L 405 270 L 400 260 L 390 250
        L 390 240 L 390 220
        L 400 210 L 410 200 L 420 190 L 425 186
        Z
    `;

    // Islands MV
    // Rügen, Usedom, Poel
    const pathIslandsMV = `
        M 580 110 L 585 100 L 595 90 L 610 85 L 620 90 L 630 100 L 625 110 L 615 115 L 600 115 L 590 120 L 580 110 Z
        M 635 105 L 640 100 L 650 105 L 645 115 L 635 105 Z
        M 690 160 L 700 155 L 710 150 L 720 155 L 730 160 L 725 170 L 710 175 L 700 170 L 690 160 Z
    `;

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
                        <g stroke="white" strokeWidth="0.5" strokeLinejoin="round" fill="#005b9f" fillOpacity="0.3">
                            <path d={pathNI} className="hover:fill-opacity-40 transition-all duration-300" />
                            <path d={pathMV} className="hover:fill-opacity-40 transition-all duration-300" />
                            <path d={pathSH} className="hover:fill-opacity-40 transition-all duration-300" />
                            <path d={pathIslandsSH} className="hover:fill-opacity-40 transition-all duration-300" />
                            <path d={pathIslandsMV} className="hover:fill-opacity-40 transition-all duration-300" />
                            <path d={pathHH} fillOpacity="0.6" fill="#004a82" className="hover:fill-opacity-80 transition-all duration-300" />
                        </g>

                        {/* Cities */}
                        {cities.map((city, index) => (
                            <g key={index} transform={`translate(${city.x}, ${city.y})`} className="group">
                                <circle cx="0" cy="0" r="4" fill="#4ade80" className="group-hover:r-6 transition-all">
                                    <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                                </circle>
                                <text
                                    x={city.align === 'start' ? 10 : city.align === 'end' ? -10 : 0}
                                    y={5}
                                    fontSize="12"
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
