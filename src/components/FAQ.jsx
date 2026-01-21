import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const defaultFaqs = [
    { question: "Wie lange dauert die Lieferung?", answer: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
    { question: "Kann ich meinen Flüssiggastank kaufen?", answer: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks (oberirdisch und unterirdisch). Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl. Wir bieten Größen von 1,2 t bis 2,9 t an." },
    { question: "Was kostet Flüssiggas aktuell?", answer: "Der Preis ändert sich täglich analog zu den Ölbörsen. Da wir unabhängig sind, können wir oft günstigere Konditionen anbieten als Großkonzerne. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
    { question: "Muss ich bei der Lieferung zu Hause sein?", answer: "Nicht zwingend, sofern der Flüssiggastank und der Füllanschluss für unseren Fahrer frei zugänglich sind. Wir informieren Sie vorab über den Liefertermin." },
    { question: "Liefern Sie auch im Notfall?", answer: "Ja, wenn Ihre Heizung kalt bleibt, versuchen wir schnellstmöglich zu helfen. Rufen Sie uns direkt an unter 04551 89 70 89." },
    { question: "Was genau ist Flüssiggas?", answer: "Flüssiggas (LPG) besteht aus Propan und Butan. Als Heizgas verwenden wir in Deutschland gemäß DIN 51622 fast ausschließlich reines Propan, da dieses auch bei tiefen Temperaturen im Winter zuverlässig verdampft." },
    { question: "Bieten Sie auch Gasflaschen (Flaschengas) an?", answer: "Unser Kerngeschäft ist die Belieferung von Flüssiggastanks. Für Gasflaschen (11kg / 33kg) wenden Sie sich bitte an lokale Baumärkte oder Camping-Händler. Wir bieten jedoch Treibgas für Stapler (Gewerbe) an." },
    { question: "Welche Prüfungen sind beim Flüssiggastank vorgeschrieben?", answer: "Alle 2 Jahre muss eine äußere Prüfung durch eine befähigte Person erfolgen. Alle 10 Jahre ist eine innere Prüfung durch eine ZÜS (z.B. TÜV, DEKRA) notwendig. Wir unterstützen Sie gerne bei der Organisation." }
];

const FAQ = ({ items }) => {
    const [open, setOpen] = useState(0);
    const faqs = items || defaultFaqs;

    return (
        <div className="max-w-3xl mx-auto px-4 py-24">
            <h2 className="text-3xl font-bold text-center mb-12">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-text transition-colors">
                            <span>{faq.question || faq.q}</span>
                            <ChevronDown size={20} className={`transform transition-transform duration-300 ${open === i ? 'rotate-180 text-gas' : 'text-gray-500'}`}/>
                        </button>
                        <AnimatePresence>
                            {open === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 border-t border-gray-100">
                                    <p className="p-5 text-gray-600 leading-relaxed">{faq.answer || faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
