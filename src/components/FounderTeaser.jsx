import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2 } from 'lucide-react';

const FounderTeaser = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                             <img
                                src="/images/team/thomas-moeller-lkw.webp"
                                alt="Thomas Möller - Gas-Service Möller"
                                width="800"
                                height="800"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                             />
                             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-8 text-white">
                                 <p className="font-bold text-lg">Thomas Möller</p>
                                 <p className="text-sm opacity-80">Geschäftsführung & Sachkundiger</p>
                             </div>
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-gas-light/30 rounded-full mix-blend-multiply filter blur-3xl -z-10"></div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6">
                            <span className="text-gas font-bold tracking-widest uppercase text-sm">Unser Versprechen</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">"Wir machen Energie einfach und persönlich."</h2>
                        </div>

                        <div className="relative mb-8">
                            <Quote className="absolute -top-2 -left-4 text-gray-100 w-16 h-16 -z-10 transform -scale-x-100" />
                            <p className="text-lg text-gray-600 leading-relaxed italic">
                                Seit über 20 Jahren sind wir als Familienunternehmen im Norden verwurzelt. Wir verstecken uns nicht hinter Hotlines. Wenn Sie anrufen, sprechen Sie mit Menschen, die sich kümmern. Ob beim Tankkauf oder der pünktlichen Lieferung: Wir stehen zu unserem Wort.
                            </p>
                        </div>

                        <div className="space-y-4 mb-10">
                            {[
                                "Keine versteckten Mietgebühren",
                                "Ehrliche Tagespreise ohne Abo-Fallen",
                                "Persönlicher Ansprechpartner statt Callcenter"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <CheckCircle2 size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-bold text-gray-800">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <img src="/logos/Icon-01.webp" alt="Unterschrift Logo" width="422" height="142" className="h-12 w-auto opacity-80" />
                            <div className="h-10 w-px bg-gray-200"></div>
                            <div className="text-sm text-gray-500">
                                <span className="block font-bold text-gray-900">Ihr Gas-Service Möller Team</span>
                                aus Schieren (Schleswig-Holstein)
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FounderTeaser;
