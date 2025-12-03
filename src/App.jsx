import React, { useState, useEffect } from 'react';
import { Settings, ArrowRight } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TankSection from './components/TankSection';
import CommercialSection from './components/CommercialSection';
import DeliveryMap from './components/DeliveryMap';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import GasOrderSection from './components/GasOrderSection';
import SavingsCalculator from './components/SavingsCalculator';
import KnowledgeCenter from './components/KnowledgeCenter';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import WizardModal from './components/WizardModal';
import CookieBanner from './components/CookieBanner';
import SimpleModal from './components/SimpleModal';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    const [activeSection, setActiveSection] = useState('start');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [wizardOpen, setWizardOpen] = useState(false);
    const [wizardType, setWizardType] = useState('tank');
    const [wizardData, setWizardData] = useState(null);

    // Legal Modals
    const [legalModal, setLegalModal] = useState({ open: false, title: '', content: '' });

    const openWizard = (type) => {
        setWizardType(type);
        setWizardData(null); // Reset data when opening manually
        setWizardOpen(true);
    };

    const openLegal = (type) => {
        let content;
        let title;
        if (type === 'imprint') {
            title = 'Impressum';
            content = <div><p><strong>gasmöller GmbH</strong><br/>Musterstraße 1<br/>12345 Musterstadt</p><p>Vertreten durch:<br/>Thomas Möller</p><p>Kontakt:<br/>Telefon: 04551 89 70 89<br/>E-Mail: info@gasmoeller.de</p><p>Registereintrag:<br/>Eintragung im Handelsregister.<br/>Registergericht: Amtsgericht Kiel<br/>Registernummer: HRB 12345</p></div>;
        } else if (type === 'privacy') {
            title = 'Datenschutz';
            content = <div><p><strong>Datenschutzerklärung</strong></p><p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p><p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.</p></div>;
        } else if (type === 'dev') {
            title = 'Developer Report (v1.3)';
            content = (
                <div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm font-mono">
                        <p className="font-bold">Latest Changes:</p>
                        <ul className="list-disc pl-4 space-y-1 mt-2">
                            <li>Migrated to Vite + React.</li>
                            <li>Removed all external CDN dependencies for GDPR compliance.</li>
                            <li>Modularized components.</li>
                            <li>Local fonts implemented.</li>
                        </ul>
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gas">Migration to Next.js</h4>
                    <p className="mb-4 text-sm">To achieve perfect SEO and performance (Core Web Vitals), we recommend migrating this single-file prototype to a full Next.js application.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong>1. Setup:</strong> <code>npx create-next-app@latest gasmoeller</code></p>
                        <p><strong>2. Structure:</strong> Move components to <code>src/components/</code>. Use <code>app/page.js</code> for the main layout.</p>
                        <p><strong>3. SEO:</strong> Use Next.js Metadata API for dynamic title/description tags per page.</p>
                        <p><strong>4. Images:</strong> Replace <code>img</code> tags with <code>next/image</code> for automatic optimization.</p>
                        <p><strong>5. Forms:</strong> Move form submission logic to Server Actions for security.</p>
                    </div>
                </div>
            );
        }
        setLegalModal({ open: true, title, content });
    };

    useEffect(() => { window.scrollTo(0, 0); }, [activeSection]);

    const handleGasCheckAvailability = (plz, liters) => {
        setWizardData({ plz, liters });
        setWizardType('gas');
        setWizardOpen(true);
    };

    const renderSection = () => {
        switch(activeSection) {
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={setActiveSection} /><TrustBar /><div className="my-16 text-center"><div className="inline-block p-2 rounded-2xl bg-gradient-to-r from-gas-light to-white border border-gas/10 shadow-2xl"><button onClick={() => openWizard('tank')} className="bg-gas text-white px-10 py-5 rounded-xl font-extrabold text-2xl shadow-lg hover:bg-gas-dark transition-all flex items-center gap-3"><Settings size={28}/> Zum Anfrage-Assistenten <ArrowRight size={28}/></button></div><p className="mt-4 text-gray-400 text-sm font-medium">Kostenlos & Unverbindlich</p></div><TankSection openWizard={openWizard} /><CommercialSection setActiveSection={setActiveSection} /><DeliveryMap /><FAQ /><ContactSection /></>;
            case 'tanks': return <><div className="pt-20"></div><TankSection openWizard={openWizard} /><ContactSection /></>;
            case 'gas': return <><div className="pt-20"></div><GasOrderSection onCheckAvailability={handleGasCheckAvailability} /><FAQ /><ContactSection /></>;
            case 'rechner': return <><div className="pt-32 max-w-4xl mx-auto px-4"><SavingsCalculator /></div><ContactSection /></>;
            case 'gewerbe': return <><div className="pt-20"></div><CommercialSection setActiveSection={setActiveSection} /><ContactSection /></>;
            case 'wissen': return <><div className="pt-20"></div><KnowledgeCenter setActiveSection={setActiveSection} /><ContactSection /></>;
            case 'ueber-uns': return <><div className="pt-20"></div><AboutPage setActiveSection={setActiveSection} /><ContactSection /></>;
            case 'kontakt': return <><div className="pt-32"></div><ContactSection /></>;
            default: return <Hero openWizard={openWizard} setActiveSection={setActiveSection} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} openWizard={openWizard} />
            <main className="flex-grow">{renderSection()}</main>
            <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1">
                        <div className="h-8 mb-6 text-white font-bold text-xl">gasmöller</div>
                        <p className="leading-relaxed mb-4">Ihr unabhängiger Partner für Energie im Norden. Seit 2005.</p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer">f</div>
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer">in</div>
                        </div>
                        <button onClick={() => openLegal('dev')} className="mt-8 text-[10px] text-gray-700 hover:text-gas transition-colors flex items-center"><code className="mr-1">&lt;/&gt;</code> Dev Status</button>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Schnellzugriff</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => setActiveSection('gas')} className="hover:text-white transition-colors">Gas bestellen</button></li>
                            <li><button onClick={() => setActiveSection('tanks')} className="hover:text-white transition-colors">Tanks kaufen</button></li>
                            <li><button onClick={() => setActiveSection('rechner')} className="hover:text-white transition-colors">Spar-Rechner</button></li>
                            <li><button onClick={() => setActiveSection('kontakt')} className="hover:text-white transition-colors">Kontakt</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Rechtliches</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => openLegal('imprint')} className="hover:text-white transition-colors">Impressum</button></li>
                            <li><button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors">Datenschutz</button></li>
                            <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Newsletter</h4>
                        <p className="mb-4 text-xs">Bleiben Sie über Gaspreise informiert.</p>
                        {/* Removed actual form elements to avoid hydration issues for now, simplified */}
                        <div className="flex bg-gray-800 rounded p-1">
                           <span className="text-gray-500 px-2">Newsletter feature coming soon</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                    &copy; 2025 gasmöller GmbH. Alle Rechte vorbehalten.
                </div>
            </footer>
            <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType={wizardType} initialData={wizardData} />
            <CookieBanner />
            <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
            <ScrollToTop />
        </div>
    );
};

export default App;
