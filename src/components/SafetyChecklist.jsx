import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SafetyChecklist = () => (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
        <h4 className="flex items-center text-red-700 font-bold text-lg mb-4">
            <AlertTriangle size={20} className="mr-2"/> Notfall-Checkliste
        </h4>
        <ul className="space-y-3">
            <li className="flex items-start">
                <div className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</div>
                <span className="text-red-900"><strong>Ruhe bewahren.</strong> Keine Panik. Flüssiggasaustritt riecht stark nach faulen Eiern.</span>
            </li>
            <li className="flex items-start">
                <div className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</div>
                <span className="text-red-900"><strong>Zündquellen vermeiden.</strong> Kein Lichtschalter, kein Handy, keine Zigaretten.</span>
            </li>
            <li className="flex items-start">
                <div className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</div>
                <span className="text-red-900"><strong>Haupthahn schließen.</strong> Wenn möglich, schließen Sie den Haupthahn am Flüssiggastank oder Hauseingang.</span>
            </li>
            <li className="flex items-start">
                <div className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</div>
                <span className="text-red-900"><strong>Lüften.</strong> Öffnen Sie Fenster und Türen weit.</span>
            </li>
            <li className="flex items-start">
                <div className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">5</div>
                <span className="text-red-900"><strong>Gebäude verlassen & 112 rufen.</strong> Warnen Sie Mitbewohner.</span>
            </li>
        </ul>
    </div>
);

export default SafetyChecklist;
