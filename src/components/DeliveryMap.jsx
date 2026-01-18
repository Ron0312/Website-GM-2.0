import React, { useState, useEffect, useRef } from 'react';
import { MapPin, CheckCircle, MousePointer2 } from 'lucide-react';
import Skeleton from './ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryMap = () => {
    const [loading, setLoading] = useState(true);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const mapRef = useRef(null);

    useEffect(() => {
        // Simulate loading time (or wait for image load if using images)
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e) => {
        if (!mapRef.current) return;
        const rect = mapRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const cities = [
        { name: 'Hamburg', x: 345, y: 235, align: 'start' },
        { name: 'Kiel', x: 360, y: 125, align: 'start' },
        { name: 'Schwerin', x: 480, y: 250, align: 'start' },
        { name: 'Lüneburg', x: 380, y: 285, align: 'start' },
        { name: 'Cuxhaven', x: 260, y: 175, align: 'end' },
    ];

    // PATH 1: Schleswig-Holstein (SH)
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

    const regions = [
        { id: 'SH', name: 'Schleswig-Holstein', path: pathSH, color: '#8ecae6', hoverColor: '#b9e6ff' },
        { id: 'HH', name: 'Hamburg', path: pathHH, color: '#003366', hoverColor: '#004a8f' },
        { id: 'MV', name: 'Mecklenburg-Vorpommern', path: pathMV, color: '#4da6ff', hoverColor: '#80c2ff' },
        { id: 'NI', name: 'Niedersachsen (Nord)', path: pathNI, color: '#005b9f', hoverColor: '#2b8ad6' },
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
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Von der Nordsee bis zur Ostsee, von Hamburg bis zur dänischen Grenze. Wir liefern Energie dorthin, wo Sie sie brauchen.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {['Schleswig-Holstein', 'Hamburg', 'Niedersachsen (auf Anfrage)', 'Mecklenburg'].map((region, i) => (
                            <motion.div
                                key={i}
                                className={`flex items-center space-x-3 p-3 rounded border transition-colors ${hoveredRegion && region.startsWith(hoveredRegion.split(' ')[0]) ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10'}`}
                            >
                                <CheckCircle size={18} className="text-gas-light"/>
                                <span className="font-medium text-sm">{region}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center text-xs text-gray-400 gap-2">
                        <MousePointer2 size={12} className="animate-bounce" />
                        <span>Fahren Sie über die Karte für Details</span>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex items-center justify-center p-4 lg:p-0">
                    {loading ? (
                        <div className="w-full max-w-md lg:max-w-full aspect-[8/5]">
                            <Skeleton className="w-full h-full rounded-2xl bg-gray-800" />
                        </div>
                    ) : (
                        <div
                            className="relative w-full h-auto"
                            onMouseMove={handleMouseMove}
                            ref={mapRef}
                        >
                             {/* Floating Tooltip */}
                             <AnimatePresence>
                                {hoveredRegion && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{
                                            position: 'absolute',
                                            left: mousePosition.x + 20, // Offset to not cover cursor
                                            top: mousePosition.y - 40,
                                            pointerEvents: 'none',
                                            zIndex: 50
                                        }}
                                        className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl border border-gray-200 whitespace-nowrap hidden md:block"
                                    >
                                        <div className="font-bold text-sm">Wir liefern nach {hoveredRegion}!</div>
                                        <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                            <CheckCircle size={10} /> Express verfügbar
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <svg viewBox="0 0 800 500" className="w-full h-auto max-w-md lg:max-w-full drop-shadow-2xl">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                        <feMerge>
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <g stroke="white" strokeWidth="1" strokeLinejoin="round">
                                    {regions.map((region) => (
                                        <motion.path
                                            key={region.id}
                                            d={region.path}
                                            fill={region.color}
                                            initial={{ fill: region.color }}
                                            whileHover={{ fill: region.hoverColor, scale: 1.01, zIndex: 10 }}
                                            transition={{ duration: 0.2 }}
                                            onHoverStart={() => setHoveredRegion(region.name)}
                                            onHoverEnd={() => setHoveredRegion(null)}
                                            className="cursor-pointer"
                                            style={{ originX: 0.5, originY: 0.5 }}
                                        />
                                    ))}
                                </g>

                                {/* Fallback Label on Hover (if needed, or purely visual) - Keeping it as a background element or removing if tooltip is enough.
                                    Let's keep the big text at bottom as well for Mobile/Tablet users who touch. */}
                                 <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredRegion ? 1 : 0 }}
                                    className="pointer-events-none md:hidden"
                                >
                                    {hoveredRegion && (
                                         <text x="400" y="480" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" className="uppercase tracking-widest drop-shadow-md">
                                            Wir liefern nach {hoveredRegion}
                                         </text>
                                    )}
                                </motion.g>

                                {/* Cities */}
                                {cities.map((city, index) => (
                                    <g key={index} transform={`translate(${city.x}, ${city.y})`} className="pointer-events-none">
                                        <circle cx="0" cy="0" r="4" fill="white" className="drop-shadow-lg" />
                                        <text
                                            x={city.align === 'start' ? 10 : city.align === 'end' ? -10 : 0}
                                            y={5}
                                            fontFamily="sans-serif"
                                            fontSize="14"
                                            fill="white"
                                            fontWeight="bold"
                                            textAnchor={city.align}
                                            style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}
                                        >
                                            {city.name}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryMap;
