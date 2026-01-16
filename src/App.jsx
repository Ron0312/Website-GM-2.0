import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import { tankDetails } from './data/tanks';
import ErrorBoundary from './components/ErrorBoundary';
import DualCTA from './components/DualCTA';
import TankDisposalPage from './components/TankDisposalPage';
import Toast from './components/ui/Toast';
import ReviewsWidget from './components/ReviewsWidget';
import FounderTeaser from './components/FounderTeaser';

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
    const [isOffline, setIsOffline] = useState(false);

    // Legal Modals
    const [legalModal, setLegalModal] = useState({ open: false, title: '', content: '' });

    const tankFAQs = [
        { q: 'Kann man einen Flüssiggastank kaufen?', a: 'Ja, Sie können Flüssiggastanks (1,2t, 2,1t, 2,9t) käuflich erwerben. Damit entfallen monatliche Mietgebühren und Sie können Ihren Flüssiggaslieferanten frei wählen.' },
        { q: 'Was kostet ein Gastank 2700 Liter?', a: 'Die Preise für einen Gastank 2700 Liter variieren je nach Stahlpreis. Ein oberirdischer Tank ist günstiger als ein unterirdischer. Kontaktieren Sie uns für ein tagesaktuelles Angebot.' },
        { q: 'Welche Gastank Größen gibt es?', a: 'Gängige Größen für Privathaushalte sind 1,2 Tonnen (2700 Liter), 2,1 Tonnen (4850 Liter) und 2,9 Tonnen (6400 Liter).' },
        { q: 'Sind gebrauchte Tanks sicher?', a: 'Ja, unsere regenerierten Tanks werden komplett überholt, neu lackiert und erhalten eine neue TÜV-Prüfung vor Auslieferung.' }
    ];

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

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            setIsOffline(true);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
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
        const validSections = [
            'start',
            'tanks',
            'gas',
            'fluessiggastank-kaufen',
            'fluessiggas-bestellen',
            'rechner',
            'gewerbe',
            'wissen',
            'ueber-uns',
            'kontakt',
            'pruefungen',
            'tank-entsorgen',
            'barrierefreiheit',
            'liefergebiet',
            '404'
        ];

        // Dynamic routes helper
        const isTankRoute = activeSection.startsWith('tanks/') || activeSection.startsWith('fluessiggastank-kaufen/');
        const isCityRoute = activeSection.startsWith('liefergebiet/');
        const isKnowledgeRoute = activeSection.startsWith('wissen/');

        // Check if tank route has valid slug
        let isInvalidTankRoute = false;
        if (isTankRoute) {
             const slug = activeSection.split('/').pop();
             const isValidSlug = tankDetails.some(t => t.slug === slug);
             if (!isValidSlug && slug !== 'tanks' && slug !== 'fluessiggastank-kaufen') {
                 isInvalidTankRoute = true;
             }
        }

        // Only run this check if we are truly in an invalid state.
        // We include isInvalidTankRoute here to force redirect check even if it "looks" like a tank route
        if ((!isTankRoute || isInvalidTankRoute) && !isCityRoute && !isKnowledgeRoute && !validSections.includes(activeSection)) {
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

        // Update Open Graph tags for Social Sharing
        const updateMeta = (property, content) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        };

        updateMeta('og:title', seoInfo.title);
        updateMeta('og:description', seoInfo.description);
        updateMeta('og:image', seoInfo.image || 'https://gasmoeller.de/images/gas-order-hero.webp');
        updateMeta('og:url', seoInfo.url || window.location.href);
        updateMeta('og:type', seoInfo.type || 'website');
        updateMeta('og:site_name', 'Gas-Service Möller');
        updateMeta('og:locale', 'de_DE');

    }, [activeSection]);

    const handleGasCheckAvailability = (plz, liters, selectedTank, fillLevel) => {
        setWizardData({ plz, liters, selectedTank, fillLevel });
        setWizardType('gas');
        setWizardOpen(true);
    };

    const renderSection = () => {
        // Check for dynamic routes
        // Support both old 'tanks/' and new 'fluessiggastank-kaufen/' for detail views
        const isTankDetail = activeSection.startsWith('tanks/') || activeSection.startsWith('fluessiggastank-kaufen/');
        if (isTankDetail) {
            const slug = activeSection.split('/').pop(); // Get last part
            // If it's just the base path without slug, it should be handled by the switch below
            if (slug && slug !== 'tanks' && slug !== 'fluessiggastank-kaufen') {
                 return <Suspense fallback={<div className="h-screen flex items-center justify-center">Laden...</div>}><TankDetail slug={slug} onBack={() => changeSection('fluessiggastank-kaufen')} openWizard={openWizard} /></Suspense>;
            }
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
            'fluessiggastank-kaufen', // New Speaking URL
            'fluessiggas-bestellen',  // New Speaking URL
            'rechner',
            'gewerbe',
            'wissen',
            'ueber-uns',
            'kontakt',
            'pruefungen',
            'tank-entsorgen',
            'barrierefreiheit',
            'liefergebiet',
            '404'
        ];

        // Explicit Check for Legacy Redirects first
        // If activeSection is 'tanks' or 'gas' (which are NOT in validSections anymore for strictly speaking URLs),
        // we force a redirect check here.
        if (!validSections.includes(activeSection) && !isTankDetail) {
            const legacyTarget = findClientRedirect(activeSection);
            if (legacyTarget) {
                 const cleanTarget = legacyTarget.replace(/^\//, '');
                 // Check if target is a valid speaking URL or dynamic route
                 if (validSections.includes(cleanTarget) || cleanTarget.startsWith('fluessiggastank-kaufen/') || cleanTarget.startsWith('liefergebiet/') || cleanTarget.startsWith('wissen/')) {
                     if (context) {
                         context.url = legacyTarget;
                         context.status = 301;
                     }
                     // Client side update
                     if (typeof window !== 'undefined') {
                         changeSection(cleanTarget);
                         return null; // Render nothing while redirecting
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
            case 'start': return <><Hero openWizard={openWizard} setActiveSection={changeSection} hideButtons={true} /><TrustBar />
                <DualCTA openWizard={openWizard} />
                <TankSection openWizard={openWizard} setActiveSection={changeSection} showTechnicalOverview={false} tankFilter={tankFilter} onFilterChange={setTankFilter} hideHero={true} />
                <div className="max-w-7xl mx-auto px-4"><EnergyCalculator /></div>
                <ReviewsWidget />
                <Suspense fallback={<div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl render-optimization" />}><DeliveryMap /></Suspense>
                <FounderTeaser />
                <Suspense fallback={null}><KnowledgeTeaser setActiveSection={changeSection} /></Suspense>
                <FAQ /><ContactSection /></>;

            // New Speaking URLs mappings
            case 'fluessiggastank-kaufen':
            case 'tanks': // Legacy fallback
                return <><TankSection openWizard={openWizard} setActiveSection={changeSection} isPageTitle={true} tankFilter={tankFilter} onFilterChange={setTankFilter} /><FAQ items={tankFAQs} /><ContactSection /></>;

            case 'fluessiggas-bestellen':
            case 'gas': // Legacy fallback
                return <><GasOrderSection onCheckAvailability={handleGasCheckAvailability} setActiveSection={changeSection} /><FAQ /><ContactSection /></>;

            case 'tank-entsorgen': return <><div className="pt-20"></div><TankDisposalPage setActiveSection={changeSection} openWizard={openWizard} /></>;
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
                <AnimatePresence>
                    {isOffline && (
                        <Toast
                            message="Keine Internetverbindung. Wir versuchen es weiter, bis du wieder online bist!"
                            type="error"
                            duration={0}
                            onClose={() => setIsOffline(false)}
                        />
                    )}
                </AnimatePresence>
                <SimpleModal isOpen={legalModal.open} onClose={() => setLegalModal({ ...legalModal, open: false })} title={legalModal.title} content={legalModal.content} />
                <StickyCTA openWizard={openWizard} />
                <AccessibilityWidget />
                <ScrollToTop />
            </div>
        </ErrorBoundary>
    );
};

export default App;
