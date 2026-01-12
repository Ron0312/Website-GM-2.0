import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Download, ShieldCheck, Ruler, Weight, User, Wrench, Info } from 'lucide-react';
import { tankDetails } from '../data/tanks';

const TankDetail = ({ slug, onBack, openWizard }) => {
    const tank = tankDetails.find(t => t.slug === slug);

    if (!tank) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h2 className="text-2xl font-bold">Tank nicht gefunden.</h2>
                <button onClick={onBack} className="mt-4 text-gas hover:underline">Zurück zur Übersicht</button>
            </div>
        );
    }

    const tankAltText = `Flüssiggastank ${tank.volume} Liter ${tank.installation} kaufen - ${tank.name}`;

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": tank.name,
        "description": tank.description,
        "image": tank.type === 'oberirdisch'
            ? "https://www.gasmoeller.de/images/tanks/oberirdisch.webp"
            : "https://www.gasmoeller.de/images/tanks/unterirdisch.webp",
        "brand": {
            "@type": "Brand",
            "name": "gasmöller"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "price": "0.00"
        },
        "additionalProperty": Object.entries(tank.technicalData).map(([key, value]) => ({
            "@type": "PropertyValue",
            "name": key.replace(/([A-Z])/g, ' $1').trim(),
            "value": value
        }))
    };

    return (
        <div className="pt-24 pb-20 bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            {/* Breadcrumb / Back */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gas font-medium transition-colors">
                    <ArrowLeft size={20} className="mr-2"/> Zurück zur Übersicht
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Area */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-50 rounded-3xl p-8 flex items-center justify-center border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200 z-10">
                            {tank.type === 'oberirdisch' ? 'Oberirdisch' : 'Unterirdisch'}
                        </div>

                        {/* Improved Accessibility for SVG */}
                        <div className="w-full max-w-md transition-transform duration-300 group-hover:scale-105" role="img" aria-label={tankAltText}>
                            {tank.type === 'oberirdisch' ? (
                                <svg viewBox="0 0 400 200" className="w-full drop-shadow-xl text-gas">
                                    <rect x="50" y="60" width="300" height="80" rx="40" fill="currentColor" opacity="0.1" />
                                    <rect x="50" y="60" width="300" height="80" rx="40" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <rect x="80" y="140" width="20" height="30" fill="gray" />
                                    <rect x="300" y="140" width="20" height="30" fill="gray" />
                                    <rect x="190" y="50" width="20" height="10" fill="silver" />
                                    <circle cx="200" cy="55" r="15" fill="silver" opacity="0.5"/>
                                </svg>
                            ) : tank.type === 'halboberirdisch' ? (
                                <svg viewBox="0 0 400 200" className="w-full drop-shadow-xl text-blue-600">
                                    <path d="M0 100 L400 100" stroke="#93c5fd" strokeWidth="4" strokeDasharray="10 5" />
                                    <rect x="50" y="60" width="300" height="80" rx="40" fill="currentColor" opacity="0.1" />
                                    <rect x="50" y="60" width="300" height="80" rx="40" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <rect x="170" y="40" width="60" height="20" rx="2" fill="silver" />
                                    <rect x="180" y="35" width="40" height="5" fill="#374151" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 400 200" className="w-full drop-shadow-xl text-green-600">
                                    <path d="M0 100 L400 100" stroke="#86efac" strokeWidth="4" strokeDasharray="10 5" />
                                    <rect x="50" y="110" width="300" height="80" rx="40" fill="currentColor" opacity="0.1" />
                                    <rect x="50" y="110" width="300" height="80" rx="40" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <rect x="180" y="80" width="40" height="30" fill="silver" />
                                    <rect x="170" y="75" width="60" height="5" fill="#374151" />
                                </svg>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">{tank.name}</h1>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                <Ruler size={18} className="mr-2"/> {tank.dimensions}
                            </div>
                            <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                <Weight size={18} className="mr-2"/> {tank.weight}
                            </div>
                            <div className="flex items-center text-gas font-bold bg-blue-50 px-3 py-1 rounded-lg">
                                <ShieldCheck size={18} className="mr-2"/> DIN 4681 / 4680
                            </div>
                        </div>

                        {/* Ideal For Tags */}
                        {tank.idealFor && (
                            <div className="mb-6">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Empfohlen für:</p>
                                <div className="flex flex-wrap gap-2">
                                    {tank.idealFor.map((tag, i) => (
                                        <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium border border-green-100">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {tank.longDescription || tank.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {tank.features.map((feature, i) => (
                                <div key={i} className="flex items-start">
                                    <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-medium text-gray-800">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => openWizard('tank')} className="bg-gas text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gas-dark transition-all shadow-lg hover:shadow-xl transform active:scale-95 text-center">
                                Angebot anfordern
                            </button>
                            <button onClick={() => window.print()} className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
                                <Download size={20} className="mr-2"/> Datenblatt drucken
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Technical Details Table */}
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Technical Data */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center"><Info size={24} className="mr-2 text-gas"/> Technische Daten</h3>
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <tbody className="divide-y divide-gray-100">
                                        {Object.entries(tank.technicalData).map(([key, value], i) => (
                                            <tr key={key} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                                                <td className="p-4 font-bold text-gray-500 capitalize w-1/3">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                                <td className="p-4 font-medium text-gray-900">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Installation Steps */}
                        {tank.installationSteps && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center"><Wrench size={24} className="mr-2 text-gas"/> Ablauf der Installation</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tank.installationSteps.map((step, i) => (
                                        <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative">
                                            <div className="absolute top-4 right-4 text-4xl font-black text-gray-100 select-none">{i+1}</div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-2 relative z-10">{step.title}</h4>
                                            <p className="text-gray-600 relative z-10">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Maintenance Info */}
                        {tank.maintenanceInfo && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center"><ShieldCheck size={20} className="mr-2"/> Wartung & Sicherheit</h3>
                                <p className="text-blue-800 leading-relaxed">
                                    {tank.maintenanceInfo}
                                </p>
                            </div>
                        )}

                        {/* Tooltip Example for Technical Terms (as requested in "Optik") */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
                           <Info size={14} className="inline mr-1 mb-0.5"/>
                           <span className="font-bold">Hinweis:</span> Die genannten Maße sind Circa-Angaben und können je nach Hersteller leicht variieren.
                        </div>

                         <div className="mt-4">
                             <p className="text-sm text-gray-500">
                                 <strong>Allgemeiner Hinweis zur Aufstellung:</strong> {tank.installation}
                             </p>
                         </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div>
                        <div className="bg-gray-900 text-white rounded-2xl p-8 sticky top-24">
                            <h4 className="text-xl font-bold mb-4">Warum kaufen?</h4>
                            <p className="text-gray-400 mb-6 text-sm">Ein eigener Tank macht Sie unabhängig. Sie sparen bei jeder Füllung, da Sie den Anbieter frei wählen können.</p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex items-center text-gray-300"><Check size={16} className="text-green-400 mr-2"/> Freie Händlerwahl</li>
                                <li className="flex items-center text-gray-300"><Check size={16} className="text-green-400 mr-2"/> Keine Mietgebühren</li>
                                <li className="flex items-center text-gray-300"><Check size={16} className="text-green-400 mr-2"/> Amortisation oft nach 3-5 Jahren</li>
                            </ul>
                            <button onClick={() => openWizard('tank')} className="w-full bg-white text-gas font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                Jetzt Beratungstermin buchen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TankDetail;
