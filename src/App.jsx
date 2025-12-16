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
import StickyCTA from './components/StickyCTA';
import AccessibilityWidget from './components/AccessibilityWidget';
import AccessibilityPage from './components/AccessibilityPage';
import { ImprintContent, PrivacyContent, TermsContent, AccessibilityStatementContent } from './components/Legal';
import { findClientRedirect } from './utils/clientRedirect';

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
        } else if (type === 'accessibility') {
            title = 'Barrierefreiheit';
            content = <AccessibilityStatementContent />;
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
        // Check for client-side legacy redirect if on 404/invalid section
        const validSections = ['start', 'tanks', 'gas', 'rechner', 'gewerbe', 'wissen', 'ueber-uns', 'kontakt', 'pruefungen', 'barrierefreiheit', '404'];

        // Only run this check if we are truly in an invalid state.
        if (!activeSection.startsWith('tanks/') && !validSections.includes(activeSection)) {
             const legacyTarget = findClientRedirect(activeSection);
             if (legacyTarget) {
                 const cleanTarget = legacyTarget.replace(/^\//, '');
                 changeSection(cleanTarget);
                 return;
             } else if (activeSection !== '404') {
                 // If really not found and not 404 yet, go to 404
                 changeSection('404');
                 return;
             }
        }

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

    const handleGasCheckAvailability = (plz, liters, selectedTank, fillLevel) => {
        setWizardData({ plz, liters, selectedTank, fillLevel });
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
        const validSections = ['start', 'tanks', 'gas', 'rechner', 'gewerbe', 'wissen', 'ueber-uns', 'kontakt', 'pruefungen', 'barrierefreiheit', '404'];

        // Return 404 if not a valid section
        if (!validSections.includes(activeSection)) {
            // Check for legacy redirects (Client Side Fallback)
            const legacyTarget = findClientRedirect(activeSection);
            if (legacyTarget) {
                 // Clean up leading slash for client routing
                 const cleanTarget = legacyTarget.replace(/^\//, '');

                 // If valid section or tank route
                 if (validSections.includes(cleanTarget) || cleanTarget.startsWith('tanks/')) {
                     if (context) {
                         // SSR Redirect
                         context.url = legacyTarget;
                         context.status = 301;
                     } else if (typeof window !== 'undefined') {
                         // Client Redirect
                         console.log(`Client Redirect: ${activeSection} -> ${cleanTarget}`);
                         // We use setTimeout to break the render cycle or useEffect,
                         // but here we are in render. We must NOT update state in render.
                         // But we can return a component that redirects on mount.
                         // Or better: handle this in useEffect or derived state.
                         // However, for immediate response, let's assume we render nothing and redirect.
                     }
                 }
            }

            // Signal Redirect to Server (if no legacy match found or processed)
            if (context && !context.url) {
                context.url = '/404';
                context.status = 302;
            }

            // Client side redirect behavior is handled in useEffect below now

            return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }

        switch(activeSection) {
            case '404':
                if (context) context.status = 404;
                return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={changeSection} /><TrustBar /><div className="my-16 text-center"><div className="inline-block p-2 rounded-2xl bg-gradient-to-r from-gas-light to-white border border-gas/10 shadow-2xl animate-pulse hover:animate-none transition-all"><button onClick={() => openWizard('tank')} className="bg-gas text-white px-10 py-5 rounded-xl font-extrabold text-2xl shadow-lg hover:bg-gas-dark transition-all flex items-center gap-3"><Settings size={28}/> Zum Anfrage-Assistenten <ArrowRight size={28}/></button></div><p className="mt-4 text-gray-400 text-sm font-medium">Kostenlos & Unverbindlich</p></div><TankSection openWizard={openWizard} setActiveSection={changeSection} showTechnicalOverview={false} /><CommercialSection setActiveSection={changeSection} /><div className="max-w-7xl mx-auto px-4"><EnergyCalculator /></div><DeliveryMap /><FAQ /><ContactSection /></>;
            case 'tanks': return <><div className="pt-20"></div><TankSection openWizard={openWizard} setActiveSection={changeSection} isPageTitle={true} /><ContactSection /></>;
            case 'gas': return <><div className="pt-20"></div><GasOrderSection onCheckAvailability={handleGasCheckAvailability} /><FAQ /><ContactSection /></>;
            case 'pruefungen': return <><div className="pt-20"></div><InspectionSection openWizard={openWizard} /><ContactSection /></>;
            case 'rechner': return <><div className="pt-32 max-w-4xl mx-auto px-4"><EnergyCalculator defaultExpanded={true} /></div><ContactSection /></>;
            case 'gewerbe': return <><div className="pt-20"></div><CommercialSection setActiveSection={changeSection} /><ContactSection /></>;
            case 'wissen': return <><div className="pt-20"></div><KnowledgeCenter setActiveSection={changeSection} /><ContactSection /></>;
            case 'ueber-uns': return <><div className="pt-20"></div><AboutPage setActiveSection={changeSection} /><ContactSection /></>;
            case 'kontakt': return <><div className="pt-32"></div><ContactSection /></>;
            case 'barrierefreiheit': return <><AccessibilityPage /><ContactSection /></>;
            default: return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gas focus:text-white focus:rounded-md focus:shadow-lg">
                Zum Hauptinhalt springen
            </a>
            <Navigation activeSection={activeSection} setActiveSection={changeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} openWizard={openWizard} />
            <main id="main-content" className="flex-grow focus:outline-none" tabIndex="-1">{renderSection()}</main>
            <Footer setActiveSection={changeSection} openLegal={openLegal} />
            <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType={wizardType} initialData={wizardData} />
            <CookieBanner />
            <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
            <StickyCTA openWizard={openWizard} />
            <AccessibilityWidget />
            <ScrollToTop />
        </div>
    );
};

export default App;
