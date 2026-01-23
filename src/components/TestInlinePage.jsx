import React, { Suspense } from 'react';
import InlineWizardHero from './InlineWizardHero';
import ContactSection from './ContactSection';

const TestInlinePage = ({ setActiveSection, openWizard, openLegal }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <InlineWizardHero openWizard={openWizard} />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum dieser neue Assistent?</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Wir haben festgestellt, dass viele Kunden gerne direkt prüfen möchten, ob wir in ihre Region liefern, ohne sich durch lange Menüs zu klicken.
                        Dieser neue "Inline Wizard" ermöglicht den Einstieg direkt auf der Startseite (oder Landingpages).
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Probieren Sie es aus: Geben Sie eine PLZ aus unserem Liefergebiet ein (z.B. 23795, 23552, 19053).
                    </p>
                </div>
            </div>

            <ContactSection openPrivacy={() => openLegal('privacy')} />
        </div>
    );
};

export default TestInlinePage;
