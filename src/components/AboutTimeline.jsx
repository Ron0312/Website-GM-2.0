import React from 'react';

const AboutTimeline = () => (
    <div className="py-16 bg-white">
        <h3 className="text-2xl font-bold text-center mb-12">Unsere Geschichte</h3>
        <div className="max-w-3xl mx-auto px-4 border-l-2 border-gas/20 ml-4 md:ml-auto space-y-12">
            {[
                { year: "2005", title: "Gründung", text: "Start als Familienunternehmen 'Gas-Service Möller' mit Fokus auf faire Beratung." },
                { year: "2012", title: "Expansion", text: "Erweiterung des Liefergebiets auf ganz Schleswig-Holstein und Hamburg." },
                { year: "2018", title: "Eigene Logistik", text: "Investition in eigene Tankwagen für maximale Unabhängigkeit." },
                { year: "2021", title: "e.K. Umfirmierung", text: "Wachstum zum eingetragenen Kaufmann. 5000+ zufriedene Kunden." },
                { year: "2025", title: "Zukunft", text: "Start der Bio-LPG Initiative für klimaneutrales Heizen." }
            ].map((item, i) => (
                <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 bg-gas text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full border-4 border-white shadow-sm"></div>
                    <span className="text-gas font-bold text-xl block mb-1">{item.year}</span>
                    <h4 className="font-bold text-text text-lg">{item.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{item.text}</p>
                </div>
            ))}
        </div>
    </div>
);

export default AboutTimeline;
