import React, { useState, useEffect } from 'react';
import { Settings, ArrowRight } from 'lucide-react';
import { getSeoForPath } from './data/seoData';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TankSection from './components/TankSection';
import TankDetail from './components/TankDetail';
import CommercialSection from './components/CommercialSection';
import InspectionSection from './components/InspectionSection';
import DeliveryMap from './components/DeliveryMap';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import GasOrderSection from './components/GasOrderSection';
import EnergyCalculator from './components/EnergyCalculator';
import KnowledgeCenter from './components/KnowledgeCenter';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import WizardModal from './components/WizardModal';
import CookieBanner from './components/CookieBanner';
import SimpleModal from './components/SimpleModal';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import { ImprintContent, PrivacyContent, TermsContent } from './components/Legal';

const App = ({ path, context }) => {
    // Initial state based on path if provided (SSR), otherwise default to window location (CSR)
    const getInitialSection = () => {
        if (path) {
            const p = path.replace(/^\//, '').toLowerCase();
            return p || 'start';
        }
        if (typeof window !== 'undefined') {
             const p = window.location.pathname.replace(/^\//, '').toLowerCase();
             return p || 'start';
        }
        return 'start';
    };

    const [activeSection, setActiveSection] = useState(getInitialSection());
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
            content = <ImprintContent />;
        } else if (type === 'privacy') {
            title = 'Datenschutz';
            content = <PrivacyContent />;
        } else if (type === 'terms') {
            title = 'AGB';
            content = <TermsContent />;
        }
        setLegalModal({ open: true, title, content });
    };

    // Handle Browser Back/Forward
    useEffect(() => {
        const handlePopState = () => {
             const p = window.location.pathname.replace(/^\//, '').toLowerCase();
             setActiveSection(p || 'start');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Update URL when section changes
    const changeSection = (section) => {
        setActiveSection(section);
        if (typeof window !== 'undefined') {
            const url = section === 'start' ? '/' : `/${section}`;
            window.history.pushState({}, '', url);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        // Initial scroll is handled by browser usually, but we ensure top
        window.scrollTo(0, 0);

        // Update Title and Meta Description on client-side navigation
        const seoInfo = getSeoForPath(activeSection);
        document.title = seoInfo.title;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = seoInfo.description;

    }, [activeSection]);

    const handleGasCheckAvailability = (plz, liters) => {
        setWizardData({ plz, liters });
        setWizardType('gas');
        setWizardOpen(true);
    };

    const renderSection = () => {
        // Check for dynamic routes
        if (activeSection.startsWith('tanks/')) {
            const slug = activeSection.split('/')[1];
            return <TankDetail slug={slug} onBack={() => changeSection('tanks')} openWizard={openWizard} />;
        }

        // Sections
        const validSections = ['start', 'tanks', 'gas', 'rechner', 'gewerbe', 'wissen', 'ueber-uns', 'kontakt', 'pruefungen'];

        // Return 404 if not a valid section
        if (!validSections.includes(activeSection)) {
            // Signal 404 to Server
            if (context) {
                context.status = 404;
            }
            return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }

        switch(activeSection) {
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={changeSection} /><TrustBar />

            {/* Selection Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-2 bg-gas-light/30 border border-gas-light px-4 py-1.5 rounded-full mb-6">
                            <span className="text-gas font-bold text-xs uppercase tracking-widest">Individuelle Lösungen</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Wählen Sie Ihre Installation</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Wir bieten passende Tanklösungen für jeden Bedarf. Entscheiden Sie sich für die Installationsart, die am besten zu Ihrem Grundstück passt.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Oberirdisch */}
                        <div
                            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-96"
                            onClick={() => changeSection('tanks')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 opacity-60 group-hover:opacity-70 transition-opacity"></div>
                            <img
                                src="/images/gas-order-hero.webp"
                                alt="Oberirdischer Gastank"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Oberirdisch</h3>
                                        <p className="text-gray-200 font-medium">Der Klassiker. Einfache Installation & Wartung.</p>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full group-hover:bg-gas group-hover:text-white transition-colors text-white">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Unterirdisch */}
                        <div
                            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-96"
                            onClick={() => changeSection('tanks')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 opacity-60 group-hover:opacity-70 transition-opacity"></div>
                            <img
                                src="/images/inspection-background.jpg"
                                alt="Unterirdischer Gastank"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                <div className="flex justify-between items-end">
                                        <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Unterirdisch</h3>
                                        <p className="text-gray-200 font-medium">Unsichtbar & Platzsparend. Perfekt für kleine Gärten.</p>
                                    </div>
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full group-hover:bg-gas group-hover:text-white transition-colors text-white">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TankSection openWizard={openWizard} setActiveSection={changeSection} showTechnicalOverview={false} /><CommercialSection setActiveSection={changeSection} /><DeliveryMap /><FAQ /><ContactSection /></>;
            case 'tanks': return <><div className="pt-20"></div><TankSection openWizard={openWizard} setActiveSection={changeSection} /><ContactSection /></>;
            case 'gas': return <><div className="pt-20"></div><GasOrderSection onCheckAvailability={handleGasCheckAvailability} /><FAQ /><ContactSection /></>;
            case 'pruefungen': return <><div className="pt-20"></div><InspectionSection openWizard={openWizard} /><ContactSection /></>;
            case 'rechner': return <><div className="pt-32 max-w-4xl mx-auto px-4"><EnergyCalculator /></div><ContactSection /></>;
            case 'gewerbe': return <><div className="pt-20"></div><CommercialSection setActiveSection={changeSection} /><ContactSection /></>;
            case 'wissen': return <><div className="pt-20"></div><KnowledgeCenter setActiveSection={changeSection} /><ContactSection /></>;
            case 'ueber-uns': return <><div className="pt-20"></div><AboutPage setActiveSection={changeSection} /><ContactSection /></>;
            case 'kontakt': return <><div className="pt-32"></div><ContactSection /></>;
            default: return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navigation activeSection={activeSection} setActiveSection={changeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} openWizard={openWizard} />
            <main className="flex-grow">{renderSection()}</main>
            <Footer setActiveSection={changeSection} openLegal={openLegal} />
            <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType={wizardType} initialData={wizardData} />
            <CookieBanner />
            <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
            <ScrollToTop />
        </div>
    );
};

export default App;
