import React from 'react';
import { Tractor, Factory, Truck, ArrowRight, CheckCircle2, Leaf, Zap, Settings, ThermometerSun, Building2 } from 'lucide-react';
import Hero from './Hero';

const CommercialSection = ({ setActiveSection, isPage = false }) => (
    <section className={`bg-gray-50 ${isPage ? 'pb-32' : 'py-24'}`} id="gewerbe">
        {isPage && (
            <Hero
                setActiveSection={setActiveSection}
                title={
                    <>
                        Energie für <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Macher</span>
                    </>
                }
                subtitle="Maßgeschneiderte Flüssiggas-Konzepte für Industrie, Landwirtschaft und Logistik. Effizient, sicher und zuverlässig."
                badgeText="B2B Industrielösungen"
                backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
                customButtons={
                     <a
                        href="/kontakt"
                        onClick={(e) => { e.preventDefault(); setActiveSection('kontakt'); }}
                        className="px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent flex items-center gap-2 group"
                    >
                        Angebot anfordern
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                }
            />
        )}

        <div className={`max-w-7xl mx-auto px-4 ${isPage ? 'mt-24' : ''}`}>
            {!isPage && (
                <div className="text-center mb-16">
                    <div className="text-gas font-bold tracking-widest uppercase text-sm mb-2">B2B Lösungen</div>
                    <h2 className="text-3xl font-extrabold">Energie für Macher</h2>
                </div>
            )}

            {/* Industry Cards Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {[
                    { t: 'Landwirtschaft', d: 'Stallheizung & Trocknung', i: Tractor, desc: 'Leistungsstarke Trocknungsanlagen und Stallheizungen. Auch mit BioLPG für nachhaltige Betriebe.' },
                    { t: 'Industrie', d: 'Prozesswärme & Hallen', i: Factory, desc: 'Effiziente Dunkelstrahler für hohe Hallen und präzise Prozesswärme für Lackierkabinen.' },
                    { t: 'Logistik', d: 'Staplergas (Flüssiggas) & Tankstellen', i: Truck, desc: 'Treibgas für Gabelstapler. Sauberer als Diesel, stärker als Elektro. Innen und Außen.' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                        <item.i size={40} className="text-gray-300 group-hover:text-gas mb-6 transition-colors"/>
                        <h3 className="font-bold text-xl mb-2">{item.t}</h3>
                        <p className="text-gray-500 font-medium mb-3">{item.d}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Deep Dive Sections (Only on full page) */}
            {isPage && (
                <div className="space-y-32 mb-32">
                    {/* Landwirtschaft Detail */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 text-gas font-bold uppercase tracking-wider text-sm mb-4">
                                <Leaf size={18} /> Landwirtschaft
                            </div>
                            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Effizienz für Ihren Hof</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                In der modernen Landwirtschaft ist Energie ein entscheidender Produktionsfaktor. Flüssiggas bietet hierbei maximale Flexibilität und Versorgungssicherheit – auch abseits der Gasnetze.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { t: 'Getreidetrocknung', d: 'Kostengünstige und saubere Trocknung ohne Qualitätsverlust.' },
                                    { t: 'Stallheizung', d: 'Optimales Stallklima für Tierwohl (z.B. Ferkelaufzucht & Geflügel).' },
                                    { t: 'Unkrautbekämpfung', d: 'Thermische Unkrautvernichtung (Abflammen) ohne Chemie.' }
                                ].map((pt, i) => (
                                    <li key={i} className="flex gap-4">
                                        <CheckCircle2 className="text-gas mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <strong className="block text-gray-900">{pt.t}</strong>
                                            <span className="text-gray-500">{pt.d}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 bg-white p-2 rounded-3xl shadow-xl transform rotate-2">
                             <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80" alt="Landwirtschaft Flüssiggas" className="rounded-2xl w-full h-80 object-cover" />
                        </div>
                    </div>

                    {/* Industrie Detail */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white p-2 rounded-3xl shadow-xl transform -rotate-2">
                             <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80" alt="Industrie Prozesswärme" className="rounded-2xl w-full h-80 object-cover" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 text-gas font-bold uppercase tracking-wider text-sm mb-4">
                                <Zap size={18} /> Industrie & Gewerbe
                            </div>
                            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Prozesswärme & Hallenheizung</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                Ob Lackierkabinen, Metallverarbeitung oder Beheizung großer Hallen: Flüssiggas verbrennt sauber, rückstandsfrei und liefert sofort hohe Temperaturen.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { t: 'Dunkelstrahler & Hellstrahler', d: 'Effiziente Hallenheizung, die Wärme direkt am Boden erzeugt – ohne Luftumwälzung.' },
                                    { t: 'Prozesswärme', d: 'Präzise regelbare Temperaturen für industrielle Fertigungsprozesse.' },
                                    { t: 'Lackieranlagen', d: 'Staubfreie Verbrennung für perfekte Oberflächenergebnisse.' }
                                ].map((pt, i) => (
                                    <li key={i} className="flex gap-4">
                                        <CheckCircle2 className="text-gas mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <strong className="block text-gray-900">{pt.t}</strong>
                                            <span className="text-gray-500">{pt.d}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Process Steps */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                         <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-extrabold mb-4">Ihr Weg zur Gewerbeanlage</h2>
                            <p className="text-gray-600">Wir übernehmen die komplette Projektierung. Von der ersten Analyse bis zur regelmäßigen Belieferung.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                             {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                            {[
                                { step: '01', title: 'Analyse', icon: Settings, desc: 'Kostenlose Bedarfsanalyse und Vor-Ort-Termin zur Standortprüfung.' },
                                { step: '02', title: 'Konzept', icon: Building2, desc: 'Planung der Tankgröße, Leitungswege und Verdampfer-Anlagen.' },
                                { step: '03', title: 'Installation', icon: CheckCircle2, desc: 'Fachgerechte Montage, Prüfung und Abnahme durch zertifizierte Techniker.' },
                                { step: '04', title: 'Versorgung', icon: ThermometerSun, desc: 'Zuverlässige Belieferung, auf Wunsch automatisch per Telemetrie-Überwachung.' }
                            ].map((item, i) => (
                                <div key={i} className="relative bg-white pt-4">
                                    <div className="w-16 h-16 bg-gas text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg shadow-gas/20">
                                        <item.icon size={28} />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Schritt {item.step}</div>
                                        <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gas-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Warum Unternehmen auf uns setzen</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Persönlicher Ansprechpartner', desc: 'Kein Callcenter. Sie haben einen direkten Draht zu Ihrem Betreuer.' },
                                { title: 'Flexible Logistik', desc: 'Wir liefern dann, wenn es in Ihren Betriebsablauf passt. Auch Just-in-Time.' },
                                { title: 'Transparente Konditionen', desc: 'Klare Preisstrukturen ohne versteckte Zuschläge. Planungssicherheit für Ihr Budget.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-2 h-2 mt-2.5 rounded-full bg-gas flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                        <h3 className="font-bold text-xl mb-2">Individuelles Angebot</h3>
                        <p className="text-gray-500 text-sm mb-6">Lassen Sie uns über Ihren Energiebedarf sprechen. Wir erstellen Ihnen ein maßgeschneidertes Konzept.</p>
                        <a href="/kontakt" onClick={(e) => { e.preventDefault(); setActiveSection('kontakt'); }} className="w-full bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all shadow-lg hover:shadow-xl block">
                            Jetzt anfragen
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default CommercialSection;
