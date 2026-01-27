import React from 'react';
import { Cpu, Atom, Zap, Wind } from 'lucide-react';

const WebaionBadge = ({ className = "", direction = "up" }) => {
    const isUp = direction === 'up';

    return (
        <a
            href="https://webaion.de"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group inline-flex items-center justify-center ${className}`}
            aria-label="Built by Webaion"
        >
            {/* Base Icon */}
            <div className="relative z-10 p-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-500 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all duration-300">
                <Cpu size={18} className="animate-pulse group-hover:animate-none" />

                {/* Connection Beam (Decoration) */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-0 group-hover:h-3 bg-gradient-to-${isUp ? 't' : 'b'} from-blue-500/50 to-transparent transition-all duration-300 delay-75 ${isUp ? 'bottom-full' : 'top-full'}`} />
            </div>

            {/* Hologram Container */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto z-20 ${
                isUp
                ? 'bottom-full mb-3 translate-y-4 group-hover:translate-y-0'
                : 'top-full mt-3 -translate-y-4 group-hover:translate-y-0'
            }`}>

                {/* The Hologram Card */}
                <div
                    className={`bg-gray-900/95 backdrop-blur-md border border-blue-500/30 rounded-lg p-3 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-500 ${isUp ? 'origin-bottom' : 'origin-top'}`}
                    style={{ transform: `perspective(500px) rotateX(${isUp ? '10deg' : '-10deg'})` }}
                >

                    {/* Header */}
                    <div className="flex items-center justify-center gap-2 mb-2 border-b border-gray-700/50 pb-2">
                        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">Built by Webaion</span>
                    </div>

                    {/* Tech Stack Grid */}
                    <div className="flex justify-center gap-4 text-gray-400">
                        <div className="flex flex-col items-center gap-1 group/item transition-colors hover:text-blue-300">
                            <Atom size={16} className="text-blue-500" />
                            <span className="text-[9px]">React</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group/item transition-colors hover:text-yellow-200">
                            <Zap size={16} className="text-yellow-400" />
                            <span className="text-[9px]">Vite</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group/item transition-colors hover:text-teal-200">
                            <Wind size={16} className="text-teal-400" />
                            <span className="text-[9px]">Tailwind</span>
                        </div>
                    </div>

                    {/* Scanline/Glow Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent opacity-20 pointer-events-none rounded-lg" />
                </div>
            </div>
        </a>
    );
};

export default WebaionBadge;
