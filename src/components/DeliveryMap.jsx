import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import Skeleton from './ui/Skeleton';

const DeliveryMap = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (or wait for image load if using images)
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const cities = [
        { name: 'Hamburg', x: 345, y: 235, align: 'start' },
        { name: 'Kiel', x: 360, y: 125, align: 'start' },
        { name: 'Schwerin', x: 480, y: 250, align: 'start' },
        { name: 'Lüneburg', x: 380, y: 285, align: 'start' },
        { name: 'Celle', x: 350, y: 355, align: 'start' },
        { name: 'Cuxhaven', x: 260, y: 175, align: 'end' },
    ];

    // PATH 1: Schleswig-Holstein (SH)
    // Includes North Frisia (with Sylt), Angeln, Ostholstein.
    // South border: Elbe (North bank).
    const pathSH = `
        M 260 170
        L 270 175 L 290 180 L 310 190 L 330 200
        L 332 205 L 325 210 L 335 215
        L 345 212 L 355 210
        L 360 215 L 370 215 L 380 220
        L 390 225 L 400 230
        L 410 220 L 415 210 L 420 200
        L 425 190 L 430 180 L 440 170 L 450 160
        L 440 150 L 430 145 L 435 135
        L 430 125 L 420 120 L 410 125 L 400 120
        L 380 125 L 370 120 L 360 125 L 355 120
        L 350 110 L 340 115
        L 345 100 L 350 90 L 355 80 L 345 85 L 335 90 L 325 85
        L 330 75 L 340 70 L 345 65 L 340 60
        L 330 55 L 320 50 L 310 52 L 300 55 L 295 52
        L 280 50 L 260 48 L 240 45
        L 235 55 L 240 65 L 230 75 L 235 85
        L 220 90 L 225 100
        L 215 110 L 220 120
        L 210 130 L 225 140
        L 235 150 L 250 160 L 260 170
        Z
        M 190 20 L 195 25 L 192 35 L 195 45 L 190 55 L 192 65 L 195 70 L 200 65 L 205 55 L 202 45 L 205 35 L 200 25 L 195 20 L 190 20 Z
        M 210 75 L 205 80 L 210 85 L 215 82 L 212 75 Z
        M 460 110 L 450 115 L 455 125 L 465 120 L 470 115 L 460 110 Z
    `;

    // PATH 2: Hamburg (HH)
    // Small area between SH and NI.
    const pathHH = `
        M 335 215
        L 345 212 L 355 210
        L 360 215 L 370 215 L 380 220
        L 375 225 L 370 230 L 365 235
        L 355 240
        L 345 235 L 340 230 L 335 225 L 335 215
        Z
    `;

    // PATH 3: Mecklenburg-Vorpommern (MV)
    const pathMV = `
        M 410 220
        L 415 210 L 420 200 L 425 190 L 430 180 L 440 170 L 450 160
        L 470 160 L 490 155 L 510 150
        L 530 145 L 550 140
        L 560 130 L 580 120 L 600 125
        L 620 130 L 640 140
        L 660 150 L 680 160 L 700 170
        L 710 190 L 700 210 L 680 230 L 660 240
        L 640 250 L 620 260 L 600 270
        L 550 280 L 500 290
        L 480 290 L 460 280
        L 450 270 L 440 260
        L 435 250 L 430 240
        L 420 230
        Z
        M 580 100 L 590 90 L 600 85 L 610 90 L 620 100 L 610 110 L 600 110 L 590 105 L 580 100 Z
        M 630 100 L 640 95 L 650 100 L 645 110 L 635 110 L 630 100 Z
    `;

    // PATH 4: Niedersachsen-Nord (NI)
    // Cuxhaven -> Elbe -> MV Border -> Wolfsburg -> Celle -> Bremen -> Cuxhaven
    const pathNI = `
        M 260 170
        L 270 175 L 290 180 L 310 190 L 330 200
        L 335 215 L 335 225 L 340 230 L 345 235 L 355 240
        L 365 235 L 370 230 L 375 225
        L 380 220 L 390 225 L 400 230
        L 410 235 L 420 240 L 430 245
        L 440 260 L 450 270 L 460 280 L 450 300
        L 440 320 L 430 340 L 420 360
        L 400 365 L 380 370
        L 360 365 L 340 360 L 320 355
        L 300 350 L 280 345
        L 260 340 L 240 320 L 230 300
        L 220 280 L 230 260
        L 240 240 L 250 220 L 255 200 L 260 170
        Z
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
                    {loading ? (
                        <div className="w-full max-w-md lg:max-w-full aspect-[8/5]">
                            <Skeleton className="w-full h-full rounded-2xl bg-gray-800" />
                        </div>
                    ) : (
                        <svg viewBox="0 0 800 500" className="w-full h-auto max-w-md lg:max-w-full">
                            {/* Flat Design Map */}
                            <g stroke="white" strokeWidth="0.5" strokeLinejoin="round">
                                <path d={pathNI} fill="#005b9f" />
                                <path d={pathMV} fill="#4da6ff" />
                                <path d={pathSH} fill="#8ecae6" />
                                <path d={pathHH} fill="#003366" />
                            </g>

                            {/* Cities */}
                            {cities.map((city, index) => (
                                <g key={index} transform={`translate(${city.x}, ${city.y})`}>
                                    <circle cx="0" cy="0" r="3" fill="white" />
                                    <text
                                        x={city.align === 'start' ? 8 : city.align === 'end' ? -8 : 0}
                                        y={4}
                                        fontFamily="Arial"
                                        fontSize="12"
                                        fill="white"
                                        fontWeight="bold"
                                        textAnchor={city.align}
                                    >
                                        {city.name}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryMap;
