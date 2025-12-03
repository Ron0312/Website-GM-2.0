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
                        Moin und herzlich willkommen bei gasmöller! Seit unserer Gründung im Jahr 2005 sind wir der zuverlässige Partner für Flüssiggas im echten Norden. Was als kleiner Familienbetrieb begann, ist heute eine feste Größe in Schleswig-Holstein, Hamburg und dem nördlichen Niedersachsen.
                    </p>
                    <p>
                        Unter der Leitung von Thomas Möller setzen wir auf das, was hier zählt: Ein Wort ist ein Wort. Wir verstecken uns nicht hinter Callcentern oder anonymen Konzernstrukturen. Wenn Sie bei uns anrufen, sprechen Sie mit Menschen, die wissen, wovon sie reden – und die verstehen, dass Sie nicht irgendeine Nummer sind, sondern unser Nachbar.
                    </p>
                    <p>
                        Mit unserer eigenen Tankwagenflotte sind wir unabhängig und flexibel. Das bedeutet für Sie: Versorgungssicherheit auch im tiefsten Winter und faire Preise ohne versteckte Gebühren. Wir glauben daran, dass Energieversorgung Vertrauenssache ist. Egal ob Sie einen eigenen Tank kaufen oder Gas bestellen wollen – wir beraten Sie so, wie wir es uns selbst wünschen würden: ehrlich, direkt und kompetent.
                    </p>
                </div>
            </div>
            <TeamSection />
            <AboutTimeline />
        </div>
    </section>
);

export default AboutPage;
