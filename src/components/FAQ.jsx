import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: "Wie lange dauert die Lieferung?", a: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
        { q: "Kann ich meinen Gastank kaufen?", a: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks. Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl." },
        { q: "Was kostet Flüssiggas aktuell?", a: "Der Preis ändert sich täglich analog zu den Ölbörsen. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
        { q: "Muss ich bei der Lieferung zu Hause sein?", a: "Nicht zwingend, sofern der Tank und der Füllanschluss für unseren Fahrer frei zugänglich sind." }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-24">
            <h3 className="text-3xl font-bold text-center mb-12">Häufig gestellte Fragen</h3>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-text transition-colors">
                            <span>{faq.q}</span>
                            <ChevronDown size={20} className={`transform transition-transform duration-300 ${open === i ? 'rotate-180 text-gas' : 'text-gray-400'}`}/>
                        </button>
                        <AnimatePresence>
                            {open === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 border-t border-gray-100">
                                    <p className="p-5 text-gray-600 leading-relaxed">{faq.a}</p>
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
