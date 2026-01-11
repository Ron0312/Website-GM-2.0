import React from 'react';
import { motion } from 'framer-motion';

const TankCard = ({ tank, type, onContact, setActiveSection }) => {
    // Determine scale based on capacity for visual differentiation
    let scaleClass = "w-32";
    if (tank.capacity === '2,1 t') scaleClass = "w-40";
    if (tank.capacity === '2,9 t') scaleClass = "w-48";

    const isUnderground = type === 'unterirdisch';
    const isSemiUnderground = type === 'halboberirdisch';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative flex flex-col items-center group cursor-pointer ${tank.highlight ? 'z-10' : 'z-0 opacity-90 hover:opacity-100'}`}
        >
            {/* The "Stage" - Replaces the card box */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-6">

                {/* Ambient Glow behind the tank */}
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 transform translate-y-8 transition-opacity duration-500 group-hover:opacity-40
                    ${isUnderground ? 'bg-green-400' : isSemiUnderground ? 'bg-blue-400' : 'bg-gray-400'}`}>
                </div>

                {/* The Tank SVG - Floating */}
                <svg viewBox="0 0 100 60" className={`${scaleClass} h-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 z-10`} role="img" aria-label={`Illustration von ${tank.name}`}>
                    {isUnderground ? (
                        <>
                            <path d="M0 20 H100" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 4" />
                            <rect x="10" y="22" width="80" height="30" rx="10" className="fill-green-50 stroke-green-200 stroke-[0.5]" />
                            <rect x="42" y="10" width="16" height="14" rx="1" className="fill-gray-200" />
                        </>
                    ) : isSemiUnderground ? (
                         <>
                            <path d="M0 35 H100" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 4" />
                            <rect x="10" y="20" width="80" height="30" rx="10" className="fill-blue-50 stroke-blue-200 stroke-[0.5]" />
                            <rect x="42" y="15" width="16" height="6" rx="1" className="fill-gray-200" />
                         </>
                    ) : (
                        <>
                            <rect x="10" y="15" width="80" height="30" rx="10" className="fill-gray-100 stroke-gray-300 stroke-[0.5]"/>
                            <rect x="5" y="25" width="5" height="10" className="fill-gray-300"/>
                            <rect x="90" y="25" width="5" height="10" className="fill-gray-300"/>
                            <rect x="40" y="10" width="20" height="5" className="fill-gray-300"/>
                            <path d="M15 48 H85" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}
                </svg>

                {/* Capacity Badge - Floating near tank */}
                <div className="absolute top-0 right-10 bg-white/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 border border-white/50">
                    {tank.capacity}
                </div>
            </div>

            {/* Info Area - Clean text without borders */}
            <div className="text-center w-full px-4">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{tank.name}</h4>
                <div className="flex items-center justify-center gap-2 mb-4">
                     <span className="h-px w-8 bg-gray-200"></span>
                     <span className="text-xs font-bold uppercase tracking-widest text-gas">{tank.size}</span>
                     <span className="h-px w-8 bg-gray-200"></span>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-[200px] mx-auto min-h-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {tank.usage}
                </p>

                <a
                    href={`/fluessiggastank-kaufen/${tank.slug}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (setActiveSection) {
                            setActiveSection(`fluessiggastank-kaufen/${tank.slug}`);
                        } else {
                            window.location.href = `/fluessiggastank-kaufen/${tank.slug}`;
                        }
                    }}
                    className={`inline-block px-8 py-3 rounded-full font-bold text-sm transition-all transform
                        ${tank.highlight
                            ? 'bg-gas text-white shadow-xl shadow-gas/20 hover:scale-105'
                            : 'bg-gray-50 text-gray-900 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100'}`}
                >
                    Details & Preis
                </a>
            </div>
        </motion.div>
    );
};

export default TankCard;
