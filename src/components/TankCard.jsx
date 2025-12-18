import React from 'react';
import { motion } from 'framer-motion';

const TankCard = ({ tank, type, onContact }) => {
    // Determine scale based on capacity
    let scaleClass = "w-24";
    if (tank.capacity === '2,1 t') scaleClass = "w-32";
    if (tank.capacity === '2,9 t') scaleClass = "w-40";

    const isUnderground = type === 'unterirdisch';
    const isSemiUnderground = type === 'halboberirdisch';

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group ${tank.highlight ? 'border-2 border-gas ring-4 ring-gas/10 shadow-2xl relative z-10' : 'border border-gray-100 shadow-lg hover:shadow-2xl'}`}
        >
            {tank.highlight && <div className="bg-gas text-white text-[10px] font-bold uppercase text-center py-1.5 tracking-widest">Empfehlung</div>}
            <div className={`h-48 flex items-center justify-center p-6 relative ${isUnderground ? 'bg-green-50/50' : isSemiUnderground ? 'bg-blue-50/50' : 'bg-gray-50'}`}>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-500 border border-gray-100">{tank.capacity}</div>
                <svg viewBox="0 0 100 60" className={`${scaleClass} h-auto text-gray-300 fill-current drop-shadow-lg transition-all duration-300 group-hover:scale-105`} role="img" aria-label={`Illustration von ${tank.name}`}>
                    {isUnderground ? (
                        <>
                            {/* Underground Tank Presentation */}
                            <path d="M0 20 H100" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 4" />
                            <rect x="10" y="22" width="80" height="30" rx="10" className="opacity-90" />
                            <rect x="42" y="10" width="16" height="14" rx="1" />
                        </>
                    ) : isSemiUnderground ? (
                         <>
                            {/* Semi-Underground Tank Presentation */}
                            <path d="M0 35 H100" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 4" />
                            <rect x="10" y="20" width="80" height="30" rx="10" className="opacity-90" />
                            <rect x="42" y="15" width="16" height="6" rx="1" />
                         </>
                    ) : (
                        <>
                            {/* Above Ground Tank Presentation */}
                            <rect x="10" y="15" width="80" height="30" rx="10"/>
                            <rect x="5" y="25" width="5" height="10"/>
                            <rect x="90" y="25" width="5" height="10"/>
                            <rect x="40" y="10" width="20" height="5"/>
                            <path d="M15 48 H85" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}
                </svg>
            </div>
            <div className="p-6 text-center flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-text mb-1">{tank.name}</h4>
                <p className="text-gas font-bold text-xs mb-4 tracking-wide">{tank.size}</p>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed min-h-[40px]">{tank.usage}</p>
                <button onClick={onContact} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${tank.highlight ? 'bg-gas text-white hover:bg-gas-dark shadow-lg shadow-gas/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Jetzt anfragen</button>
            </div>
        </motion.div>
    );
};

export default TankCard;
