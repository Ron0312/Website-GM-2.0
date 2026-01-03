import React, { useState, useEffect, Suspense } from 'react';
import { Settings, ArrowRight, RotateCcw } from 'lucide-react';
import { getSeoForPath } from './data/seoData';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TankSection from './components/TankSection';
import CommercialSection from './components/CommercialSection';
import InspectionSection from './components/InspectionSection';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import GasOrderSection from './components/GasOrderSection';
import EnergyCalculator from './components/EnergyCalculator';
import KnowledgeCenter from './components/KnowledgeCenter';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import SimpleModal from './components/SimpleModal';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import StickyCTA from './components/StickyCTA';
import AccessibilityWidget from './components/AccessibilityWidget';
import AccessibilityPage from './components/AccessibilityPage';
import LocalLandingPage from './components/LocalLandingPage';
import { ImprintContent, PrivacyContent, TermsContent, AccessibilityStatementContent } from './components/Legal';
import { findClientRedirect } from './utils/clientRedirect';
import { cityData } from './data/cityData';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy Load heavy components
const WizardModal = React.lazy(() => import('./components/WizardModal'));
const DeliveryMap = React.lazy(() => import('./components/DeliveryMap'));
const DeliveryAreaOverview = React.lazy(() => import('./components/DeliveryAreaOverview'));
const TankDetail = React.lazy(() => import('./components/TankDetail'));
const KnowledgeTeaser = React.lazy(() => import('./components/KnowledgeTeaser'));

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
    const [tankFilter, setTankFilter] = useState('oberirdisch');
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

    // Expose openPrivacy to window for ContactSection
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.openPrivacy = () => openLegal('privacy');
        }
    }, []);

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
        // Note: 'tanks' and 'gas' are legacy sections now, but kept in validSections for logic,
        // though renderSection handles them by rendering the new components or we rely on findClientRedirect.

        // We actually want to Redirect if we land on 'tanks' or 'gas' to the new URL.
        const validSections = [
            'start',
            'fluessiggastank-kaufen', // New
            'fluessiggas-bestellen',  // New
            'rechner',
            'gewerbe',
            'wissen',
            'ueber-uns',
            'kontakt',
            'pruefungen',
            'barrierefreiheit',
            'liefergebiet',
            '404'
        ];

        // Dynamic routes helper
        const isTankRoute = activeSection.startsWith('fluessiggastank-kaufen/') || activeSection.startsWith('tanks/'); // Support legacy tank routes for redirect check
        const isCityRoute = activeSection.startsWith('liefergebiet/');
        const isKnowledgeRoute = activeSection.startsWith('wissen/');

        // 1. Check if we need to redirect legacy simple routes
        const redirect = findClientRedirect(activeSection);
        if (redirect) {
            const cleanTarget = redirect.replace(/^\//, '');
            // Only redirect if different
            if (cleanTarget !== activeSection) {
                changeSection(cleanTarget);
                return;
            }
        }

        // 2. Check 404
        if (!isTankRoute && !isCityRoute && !isKnowledgeRoute && !validSections.includes(activeSection)) {
             if (activeSection !== '404') {
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
        // Handle new Speaking URLs for Tanks
        if (activeSection.startsWith('fluessiggastank-kaufen/')) {
            const slug = activeSection.split('/')[1];
            return <Suspense fallback={<div className="h-screen flex items-center justify-center">Laden...</div>}><TankDetail slug={slug} onBack={() => changeSection('fluessiggastank-kaufen')} openWizard={openWizard} /></Suspense>;
        }

        // Legacy Tank Routes Fallback (Should be caught by useEffect redirect, but just in case)
        if (activeSection.startsWith('tanks/')) {
             const slug = activeSection.split('/')[1];
             return <Suspense fallback={<div className="h-screen flex items-center justify-center">Laden...</div>}><TankDetail slug={slug} onBack={() => changeSection('fluessiggastank-kaufen')} openWizard={openWizard} /></Suspense>;
        }

        if (activeSection.startsWith('wissen/')) {
            const slug = activeSection.split('/')[1];
            return <><div className="pt-20"></div><KnowledgeCenter slug={slug} setActiveSection={changeSection} /><ContactSection /></>;
        }

        if (activeSection === 'liefergebiet') {
             return <Suspense fallback={<div className="h-screen flex items-center justify-center">Laden...</div>}><DeliveryAreaOverview setActiveSection={changeSection} /></Suspense>;
        }

        if (activeSection.startsWith('liefergebiet/')) {
            const slug = activeSection.split('/')[1];

            // Handle trailing slash or empty slug
            if (!slug) {
                return <Suspense fallback={<div className="h-screen flex items-center justify-center">Laden...</div>}><DeliveryAreaOverview setActiveSection={changeSection} /></Suspense>;
            }

            // Check if valid city
            const cityExists = cityData.find(c => c.slug === slug);
            if (cityExists) {
                return <LocalLandingPage slug={slug} setActiveSection={changeSection} openWizard={openWizard} />;
            } else {
                 if (context) context.status = 404;
                 return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
            }
        }

        // Sections
        const validSections = [
            'start',
            'fluessiggastank-kaufen', 'tanks', // Support both for rendering
            'fluessiggas-bestellen', 'gas',    // Support both for rendering
            'rechner', 'gewerbe', 'wissen', 'ueber-uns', 'kontakt', 'pruefungen', 'barrierefreiheit', 'liefergebiet', '404'
        ];

        // Return 404 if not a valid section
        if (!validSections.includes(activeSection)) {
            const legacyTarget = findClientRedirect(activeSection);
            if (legacyTarget) {
                 const cleanTarget = legacyTarget.replace(/^\//, '');
                 // Allow matching new dynamic routes in legacy redirects
                 const isNewTank = cleanTarget.startsWith('fluessiggastank-kaufen/');
                 if (validSections.includes(cleanTarget) || isNewTank || cleanTarget.startsWith('liefergebiet/') || cleanTarget.startsWith('wissen/')) {
                     if (context) {
                         context.url = legacyTarget;
                         context.status = 301;
                     }
                 }
            }

            if (context && !context.url) {
                context.url = '/404';
                context.status = 302;
            }

            return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }

        switch(activeSection) {
            case '404':
                if (context) context.status = 404;
                return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={changeSection} /><TrustBar />
                <div className="my-16 max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                         <div className="text-center mb-8">
                             <h2 className="text-2xl font-bold text-gray-900 mb-2">Wie können wir helfen?</h2>
                             <p className="text-gray-500">Wählen Sie Ihr Anliegen für den passenden Service.</p>
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                             <div className="group relative overflow-hidden rounded-2xl bg-gas-light/20 hover:bg-gas-light/40 transition-all border border-gas/10 hover:border-gas/30 cursor-pointer p-6 flex flex-col items-center text-center" onClick={() => openWizard('tank')}>
                                 <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
                                     <Settings size={32} className="text-gas" />
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-2">Tank-Anfrage</h3>
                                 <p className="text-sm text-gray-600 mb-4">Beratung & Angebot für neue Tanks oder Wechsel</p>
                                 <span className="text-gas font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Starten <ArrowRight size={16}/></span>
                             </div>

                             <div className="group relative overflow-hidden rounded-2xl bg-orange-50 hover:bg-orange-100 transition-all border border-orange-100 hover:border-orange-200 cursor-pointer p-6 flex flex-col items-center text-center" onClick={() => openWizard('gas')}>
                                 <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
                                     <span className="text-3xl">🔥</span>
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-2">Gas bestellen</h3>
                                 <p className="text-sm text-gray-600 mb-4">Tagesaktuelle Preise & Liefertermin anfragen</p>
                                 <span className="text-orange-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Bestellen <ArrowRight size={16}/></span>
                             </div>
                         </div>
                    </div>
                </div>
                <TankSection openWizard={openWizard} setActiveSection={changeSection} showTechnicalOverview={false} tankFilter={tankFilter} onFilterChange={setTankFilter} /><CommercialSection setActiveSection={changeSection} /><div className="max-w-7xl mx-auto px-4"><EnergyCalculator /></div><Suspense fallback={null}><KnowledgeTeaser setActiveSection={changeSection} /></Suspense><Suspense fallback={<div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl" />}><DeliveryMap /></Suspense><FAQ /><ContactSection /></>;

            case 'tanks': // Legacy Fallback
            case 'fluessiggastank-kaufen':
                return <><TankSection openWizard={openWizard} setActiveSection={changeSection} isPageTitle={true} tankFilter={tankFilter} onFilterChange={setTankFilter} /><ContactSection /></>;

            case 'gas': // Legacy Fallback
            case 'fluessiggas-bestellen':
                return <><GasOrderSection onCheckAvailability={handleGasCheckAvailability} setActiveSection={changeSection} /><FAQ /><ContactSection /></>;

            case 'pruefungen': return <><div className="pt-20"></div><InspectionSection openWizard={openWizard} /><ContactSection /></>;
            case 'rechner': return <><div className="pt-32 max-w-4xl mx-auto px-4"><EnergyCalculator defaultExpanded={true} /></div><ContactSection /></>;
            case 'gewerbe': return <><CommercialSection setActiveSection={changeSection} isPage={true} /><ContactSection /></>;
            case 'wissen': return <><div className="pt-20"></div><KnowledgeCenter setActiveSection={changeSection} /><ContactSection /></>;
            case 'ueber-uns': return <><div className="pt-20"></div><AboutPage setActiveSection={changeSection} /><ContactSection /></>;
            case 'kontakt': return <><div className="pt-32"></div><ContactSection /></>;
            case 'barrierefreiheit': return <><AccessibilityPage /><ContactSection /></>;
            default: return <><div className="pt-20"></div><NotFound onGoHome={changeSection} /><ContactSection /></>;
        }
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen flex flex-col bg-white">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gas focus:text-white focus:rounded-md focus:shadow-lg">
                    Zum Hauptinhalt springen
                </a>
                <Navigation activeSection={activeSection} setActiveSection={changeSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} openWizard={openWizard} setTankFilter={setTankFilter} />
                <main id="main-content" className="flex-grow focus:outline-none" tabIndex="-1">{renderSection()}</main>
                <Footer setActiveSection={changeSection} openLegal={openLegal} />
                <Suspense fallback={null}>
                    <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType={wizardType} initialData={wizardData} openLegal={openLegal} />
                </Suspense>
                <CookieBanner />
                <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
                <StickyCTA openWizard={openWizard} />
                <AccessibilityWidget />
                <ScrollToTop />
            </div>
        </ErrorBoundary>
    );
};

export default App;
