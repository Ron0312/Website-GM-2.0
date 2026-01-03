import React from 'react';
import { Lock, Unlock } from 'lucide-react';

const RentVsBuyGraphic = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-8 my-8 shadow-sm hover:shadow-md transition-shadow">
        <h4 className="text-lg font-bold text-text mb-8 text-center">Kostenverlauf über 10 Jahre (Vergleich)</h4>
        <div className="flex flex-col md:flex-row gap-8 items-end justify-center h-72 pb-2">
            <div className="flex-1 flex flex-col items-center justify-end h-full w-full">
                <div className="text-xs text-gray-500 mb-2 font-medium text-center">Hohe laufende Kosten<br/>(Flüssiggaspreisbindung & Miete)</div>
                <div className="w-full max-w-[120px] bg-red-50 border border-red-200 rounded-t-lg relative group h-[90%] transition-all duration-1000 ease-out">
                    <div className="absolute bottom-0 w-full bg-red-500/10 h-[10%] border-t border-red-200 flex items-center justify-center text-[10px] text-red-800 font-bold">Start</div>
                    <div className="absolute top-4 w-full text-center font-bold text-red-800 text-lg">~ 18.000€*</div>
                </div>
                <div className="mt-4 font-bold text-gray-700 flex items-center"><Lock size={16} className="mr-2 text-red-500"/> Mietbehälter</div>
            </div>
            <div className="mb-12 font-bold text-gray-400 bg-gray-100 rounded-full p-3 text-xs shadow-inner">VS</div>
            <div className="flex-1 flex flex-col items-center justify-end h-full w-full">
                <div className="w-full max-w-[120px] bg-green-50 border border-green-200 rounded-t-lg relative group h-[60%] transition-all duration-1000 ease-out">
                    <div className="absolute bottom-0 w-full bg-green-500/10 h-[40%] border-t border-green-200 flex items-center justify-center text-[10px] text-green-900 font-bold">Kauf</div>
                    <div className="absolute top-4 w-full text-center font-bold text-green-800 text-lg">~ 12.500€*</div>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gas text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-xl whitespace-nowrap z-10 animate-bounce">
                        Sie sparen ~ 30%
                    </div>
                </div>
                <div className="mt-4 font-bold text-gray-700 flex items-center"><Unlock size={16} className="mr-2 text-green-600"/> Eigentumstank</div>
                <div className="text-xs text-gray-500 mt-2 font-medium text-center">Günstigeres Flüssiggas<br/>(Freier Markt)</div>
            </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-8 text-center italic border-t border-gray-100 pt-4">
            *Beispielhafte Gesamtkostenrechnung über 10 Jahre inkl. Wartung, Tankmiete/Kauf und Flüssiggasverbrauch (2.500L/Jahr).
        </p>
    </div>
);

export default RentVsBuyGraphic;
