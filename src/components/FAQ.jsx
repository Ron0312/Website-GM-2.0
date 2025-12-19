import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: "Wie lange dauert die Lieferung?", a: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
        { q: "Kann ich meinen Flüssiggastank kaufen?", a: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks (oberirdisch und unterirdisch). Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl. Wir bieten Größen von 1,2 t bis 2,9 t an." },
        { q: "Was kostet Flüssiggas aktuell?", a: "Der Preis ändert sich täglich analog zu den Ölbörsen. Da wir unabhängig sind, können wir oft günstigere Konditionen anbieten als Großkonzerne. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
        { q: "Muss ich bei der Lieferung zu Hause sein?", a: "Nicht zwingend, sofern der Flüssiggastank und der Füllanschluss für unseren Fahrer frei zugänglich sind. Wir informieren Sie vorab über den Liefertermin." },
        { q: "Liefern Sie auch im Notfall?", a: "Ja, wenn Ihre Heizung kalt bleibt, versuchen wir schnellstmöglich zu helfen. Rufen Sie uns direkt an unter 0381 36779809." },
        { q: "Was genau ist Flüssiggas?", a: "Flüssiggas (LPG) besteht aus Propan und Butan. Als Heizgas verwenden wir in Deutschland gemäß DIN 51622 fast ausschließlich reines Propan, da dieses auch bei tiefen Temperaturen im Winter zuverlässig verdampft." },
        { q: "Welche Prüfungen sind beim Flüssiggastank vorgeschrieben?", a: "Alle 2 Jahre muss eine äußere Prüfung durch eine befähigte Person erfolgen. Alle 10 Jahre ist eine innere Prüfung durch eine ZÜS (z.B. TÜV, DEKRA) notwendig. Wir unterstützen Sie gerne bei der Organisation." }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
