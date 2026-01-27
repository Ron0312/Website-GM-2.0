import React from 'react';
import { Cpu, Atom, Zap, Wind, ExternalLink } from 'lucide-react';

const WebaionBadge = ({ className = "", direction = "up" }) => {
    const isUp = direction === 'up';

    return (
        <div
            className={`relative group inline-flex items-center justify-center ${className}`}
            aria-label="Built by Webaion"
        >
            {/* Base Icon */}
            <div className="relative z-10 p-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-500 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                <Cpu size={18} className="animate-pulse group-hover:animate-none" />

                {/* Connection Beam (Decoration) */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-0 group-hover:h-3 bg-gradient-to-${isUp ? 't' : 'b'} from-blue-500/50 to-transparent transition-all duration-300 delay-75 ${isUp ? 'bottom-full' : 'top-full'}`} />
            </div>

            {/* Hologram Container */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto z-50 ${
                isUp
                ? 'bottom-full mb-3 translate-y-4 group-hover:translate-y-0'
                : 'top-full mt-3 -translate-y-4 group-hover:translate-y-0'
            }`}>

                {/* The Hologram Card */}
                <div
                    className={`bg-gray-900/95 backdrop-blur-md border border-blue-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-transform duration-500 ${isUp ? 'origin-bottom' : 'origin-top'}`}
                    style={{ transform: `perspective(500px) rotateX(${isUp ? '10deg' : '-10deg'})` }}
                >

                    {/* Header */}
                    <div className="text-center mb-3">
                        <span className="block text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
                            Exzellentes Webdesign
                        </span>
                        <p className="text-xs text-gray-300 leading-tight">
                            Schnell. Modern. Einzigartig.<br/>
                            <span className="text-white font-medium">Ihre Website von Webaion.</span>
                        </p>
                    </div>

                    {/* Tech Stack Grid - Secondary */}
                    <div className="flex justify-center gap-3 text-gray-500 mb-3 border-t border-gray-700/50 pt-2">
                        <div className="flex items-center gap-1" title="React">
                            <Atom size={12} className="text-blue-500/70" />
                        </div>
                        <div className="flex items-center gap-1" title="Vite">
                            <Zap size={12} className="text-yellow-400/70" />
                        </div>
                        <div className="flex items-center gap-1" title="Tailwind CSS">
                            <Wind size={12} className="text-teal-400/70" />
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <a
                        href="https://webaion.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20 group/btn"
                    >
                        <span>Jetzt anfragen</span>
                        <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Scanline/Glow Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent opacity-20 pointer-events-none rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default WebaionBadge;
