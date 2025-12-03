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

    // Legal Modals
    const [legalModal, setLegalModal] = useState({ open: false, title: '', content: '' });

    const openWizard = (type) => {
        setWizardType(type);
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

    const renderSection = () => {
        switch(activeSection) {
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={setActiveSection} /><TrustBar /><div className="my-16 text-center"><div className="inline-block p-2 rounded-2xl bg-gradient-to-r from-gas-light to-white border border-gas/10 shadow-2xl"><button onClick={() => openWizard('tank')} className="bg-gas text-white px-10 py-5 rounded-xl font-extrabold text-2xl shadow-lg hover:bg-gas-dark transition-all flex items-center gap-3"><Settings size={28}/> Zum Anfrage-Assistenten <ArrowRight size={28}/></button></div><p className="mt-4 text-gray-400 text-sm font-medium">Kostenlos & Unverbindlich</p></div><TankSection openWizard={openWizard} /><CommercialSection setActiveSection={setActiveSection} /><DeliveryMap /><FAQ /><ContactSection /></>;
            case 'tanks': return <><div className="pt-20"></div><TankSection openWizard={openWizard} /><ContactSection /></>;
            case 'gas': return <><div className="pt-20"></div><GasOrderSection setActiveSection={setActiveSection} /><FAQ /><ContactSection /></>;
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
            <Footer setActiveSection={setActiveSection} openLegal={openLegal} />
            <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType={wizardType} />
            <CookieBanner />
            <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
            <ScrollToTop />
        </div>
    );
};

export default App;
