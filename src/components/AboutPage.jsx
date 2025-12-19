import React from 'react';
import TeamSection from './TeamSection';
import AboutTimeline from './AboutTimeline';

const AboutPage = () => (
    <section className="bg-white" id="ueber-uns">
        <div className="py-24 max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
                <h2 className="text-gas font-bold tracking-widest uppercase text-sm mb-4">Über Uns</h2>
                <h1 className="text-4xl font-extrabold mb-6">Ehrlich. Norddeutsch.</h1>
                <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 space-y-6">
                    <p>
                        Moin und herzlich willkommen bei Flüssiggas on Net! Seit unserer Gründung im Jahr 2000 sind wir der zuverlässige Partner für Flüssiggas im echten Norden. Alles begann durch einen Zufall: Thomas Möller, damals als Auslieferungsfahrer unterwegs, wurde gefragt, ob er einen Erdtank besorgen könne. Fast zeitgleich wollte eine Kundin ihren Tank loswerden.
                    </p>
                    <p>
                        Kurzerhand trommelte Thomas zehn Freunde zusammen, und mit Spaten wurde der Flüssiggastank ausgebuddelt und beim neuen Besitzer wieder eingesetzt. Das erste Geschäft war perfekt, und Kai-Uwe Christen gründete daraufhin die Firma. Heute führen Anja, Thomas und Hans Christian Möller das Unternehmen gemeinsam als echten Familienbetrieb.
                    </p>
                    <p>
                        Mit unserem eigenen Tankwagen und Kranwagen sind wir unabhängig und flexibel in ganz Mecklenburg-Vorpommern, Hamburg und dem nördlichen Niedersachsen unterwegs. Wir glauben daran, dass Energieversorgung Vertrauenssache ist. Egal ob Sie einen eigenen Flüssiggastank kaufen oder Flüssiggas bestellen wollen – wir beraten Sie so, wie wir es uns selbst wünschen würden: ehrlich, direkt und kompetent.
                    </p>
                </div>
            </div>
            <TeamSection />
            <AboutTimeline />
        </div>
    </section>
);

export default AboutPage;
