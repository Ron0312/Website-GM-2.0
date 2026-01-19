
import { cityData } from './cityData.js';

// Helper to get random item from array based on seed
const getVariant = (pool, seed) => {
    return pool[seed % pool.length];
};

// 1. Manual Content for Top Cities
const manualContent = {
    'hamburg': {
        title: 'Flüssiggas in Hamburg: Energieversorgung für die Hansestadt',
        sections: [
            {
                heading: 'Nachhaltige Energie für Hamburgs Metropolregion',
                text: 'Hamburg als "Tor zur Welt" setzt zunehmend auf effiziente und schadstoffarme Energielösungen. In den dicht besiedelten Stadtteilen wie Bergedorf, Harburg oder den Walddörfern ist Flüssiggas eine hervorragende Alternative zu Heizöl. Insbesondere in Wasserschutzgebieten, die in Hamburg und dem Umland zahlreich vorhanden sind, punktet Flüssiggas durch seine Gewässerverträglichkeit. Anders als Öl ist es nicht wassergefährdend und darf daher oft auch dort gelagert werden, wo andere Energieträger strengen Auflagen unterliegen.'
            },
            {
                heading: 'Unabhängigkeit von Fernwärme und Erdgasnetz',
                text: 'Viele Hamburger Hausbesitzer suchen nach Alternativen zur kommunalen Fernwärmeplanung oder dem klassischen Erdgasnetz. Ein eigener Flüssiggastank bietet hier maximale Unabhängigkeit. Ob Sie in einem sanierten Altbau in Blankenese oder einem Neubau in Rahlstedt wohnen: Mit einem eigenen Tank entscheiden Sie selbst, wann Sie kaufen und zu welchem Preis. Gerade in einer Großstadt ist diese Flexibilität ein entscheidender Wirtschaftsfaktor für private Haushalte und Gewerbetreibende.'
            },
            {
                heading: 'Vorschriften und Service in Hamburg',
                text: 'Die Hamburgische Bauordnung (HBauO) stellt spezifische Anforderungen an die Aufstellung von Tankanlagen, insbesondere was die Abstände zur Nachbarbebauung betrifft. Unser Team ist mit diesen lokalen Gegebenheiten bestens vertraut. Wir beraten Sie detailliert, ob eine oberirdische oder unterirdische Tankanlage für Ihr Grundstück in Hamburg die bessere Wahl ist. Durch unsere Nähe zur Hansestadt garantieren wir zudem extrem kurze Reaktionszeiten bei Lieferungen oder technischen Fragen.'
            }
        ]
    },
    'luebeck': {
        title: 'Flüssiggasversorgung in der Hansestadt Lübeck',
        sections: [
            {
                heading: 'Tradition trifft Moderne: Heizen in Lübeck',
                text: 'Lübeck, die Königin der Hanse, vereint historische Bausubstanz mit modernen Wohnquartieren. Für viele Hausbesitzer in St. Jürgen, Moisling oder Travemünde stellt sich die Frage nach einer zukunftssicheren Heizung. Flüssiggas bietet hier eine ideale Lösung, da es sich problemlos mit modernen Brennwertthermen oder Hybrid-Heizungen (in Kombination mit Wärmepumpen) nutzen lässt. Dies ist besonders wichtig für den Erhalt historischer Gebäude, wo Dämmmaßnahmen oft nur eingeschränkt möglich sind.'
            },
            {
                heading: 'Wirtschaftlichkeit und Naturschutz',
                text: 'Die Region rund um Lübeck ist geprägt von viel Wasser und Natur. Flüssiggas verbrennt nahezu rückstandsfrei und produziert deutlich weniger Feinstaub als Holz oder Öl. Wer in Lübeck auf Flüssiggas umsteigt, leistet einen aktiven Beitrag zum Umweltschutz in Schleswig-Holstein. Zudem sparen Sie durch den Kauf eines eigenen Tanks langfristig hohe Mietkosten, die bei vielen überregionalen Anbietern anfallen.'
            },
            {
                heading: 'Ihr Partner vor Ort',
                text: 'Als regionaler Anbieter kennen wir Lübeck und das Umland genau. Ob enge Zufahrten in der Altstadt oder großzügige Grundstücke im Umland: Unsere Fahrer sind geschult und liefern zuverlässig. Wir unterstützen Sie auch bei der Einhaltung aller Prüffristen (2 und 10 Jahre) und sorgen dafür, dass Ihre Anlage stets den aktuellen Sicherheitsstandards entspricht.'
            }
        ]
    },
    'kiel': {
        title: 'Energie für Kiel: Flexibel und Maritim',
        sections: [
            {
                heading: 'Heizlösungen für die Landeshauptstadt',
                text: 'In Kiel und entlang der Kieler Förde spielt Versorgungssicherheit eine große Rolle. Flüssiggas hat sich hier als robuster Energieträger bewährt, der unabhängig von Leitungsnetzen funktioniert. Für Eigentümer in Kiel-Schilksee, Holtenau oder Elmschenhagen bedeutet ein eigener Flüssiggastank: Versorgungssicherheit auf dem eigenen Grundstück. Gerade in stürmischen Zeiten ist ein gefüllter Tank ein beruhigendes Polster.'
            },
            {
                heading: 'Sanierung und Neubau in Kiel',
                text: 'Kiel wächst und saniert. Bei der Modernisierung von Heizungsanlagen in Bestandsbauten ist Flüssiggas oft die kostengünstigste Option, um die Anforderungen des Gebäudeenergiegesetzes (GEG) zu erfüllen. In Kombination mit Solarthermie oder einer kleinen Wärmepumpe erreichen Sie effiziente Werte, ohne das gesamte Haus kernsanieren zu müssen. Wir beraten Kieler Kunden speziell zu diesen Hybrid-Lösungen.'
            },
            {
                heading: 'Service rund um die Förde',
                text: 'Von unserem Standort aus erreichen wir jeden Winkel Kiels in kürzester Zeit. Wir kennen die lokalen Besonderheiten und Vorschriften in Schleswig-Holstein genau. Egal ob Sie einen Tank mieten oder kaufen möchten – wobei wir zum Kauf raten, um Kosten zu sparen – wir sind Ihr direkter Ansprechpartner ohne Call-Center-Warteschleifen.'
            }
        ]
    },
    'rostock': {
        title: 'Flüssiggas in Rostock: Die Energie für die Küste',
        sections: [
            {
                heading: 'Modernes Heizen an der Ostsee',
                text: 'Rostock als größte Stadt Mecklenburg-Vorpommerns steht für Wachstum und Innovation. Auch bei der Wärmeversorgung setzen immer mehr Rostocker auf Flüssiggas. Der Grund ist einfach: Es ist sauber, effizient und überall verfügbar – egal ob in Warnemünde, Lichtenhagen oder der Südstadt. Besonders für Grundstücke, die nicht an das Fernwärmenetz angeschlossen sind, ist Flüssiggas die erste Wahl.'
            },
            {
                heading: 'Kostenvorteil durch Eigentumstanks',
                text: 'In Mecklenburg-Vorpommern beobachten wir einen starken Trend zum Eigentumstank. Viele Kunden in Rostock haben erkannt, dass Mietverträge langfristig unnötig teuer sind. Mit einem gekauften Tank von Gas-Service Möller sind Sie "Freier Unternehmer" auf Ihrem eigenen Grundstück. Sie tanken dann, wenn der Preis an der Börse günstig ist, und nicht, wenn der Vertragslieferant es diktiert.'
            },
            {
                heading: 'Sicherheit und Wartung',
                text: 'Die salzhaltige Luft an der Küste stellt besondere Anforderungen an Tankanlagen. Wir bieten für unsere Rostocker Kunden spezielle Wartungspakete und korrosionsbeständige Beschichtungen (Epoxidharz) für unterirdische Tanks an. So stellen wir sicher, dass Ihre Anlage auch nach Jahrzehnten noch sicher und zuverlässig arbeitet.'
            }
        ]
    },
    'schwerin': {
         title: 'Schwerin: Heizen mit Flüssiggas in der Seenlandschaft',
         sections: [
             {
                 heading: 'Umweltfreundlich heizen im Seenland',
                 text: 'Schwerin, eingebettet in eine einzigartige Seenlandschaft, stellt hohe Anforderungen an den Umweltschutz. Flüssiggas ist hier der ideale Energieträger, da es auch in Wasserschutzgebieten problemlos eingesetzt werden darf. Für Hausbesitzer in den Ortsteilen Lankow, Neumühle oder Wickendorf bedeutet das: Moderne Heiztechnik ohne bürokratische Hürden bei der Genehmigung von Öltanks.'
             },
             {
                 heading: 'Unabhängigkeit für Schweriner',
                 text: 'Warum sollten Sie sich an einen großen Energieversorger binden? Mit einem eigenen Flüssiggastank in Schwerin genießen Sie maximale Freiheit. Sie entscheiden über Ihren Lieferanten und den Zeitpunkt der Betankung. Gerade in Mecklenburg-Vorpommern, wo die Wege oft weit sind, ist eine autarke Versorgung Gold wert.'
             },
             {
                 heading: 'Ihr regionaler Partner',
                 text: 'Wir beliefern den Großraum Schwerin regelmäßig und zuverlässig. Unsere Fahrer kennen die Region und die Menschen. Bei uns gibt es keine anonyme Abwicklung, sondern persönliche Beratung. Ob Neuaufstellung oder Tausch eines bestehenden Miet-Tanks: Wir kümmern uns um den gesamten Prozess.'
             }
         ]
    }
};

// 2. Generator for other cities
const generateLocalContent = (city) => {
    // Check manual content first
    if (manualContent[city.slug]) {
        return manualContent[city.slug];
    }

    // Deterministic seed from slug
    const seed = city.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const preposition = city.preposition || 'in';
    const locationName = `${preposition} ${city.name}`;

    // Modular Text Pools
    const intros = [
        `Die Energieversorgung ${locationName} befindet sich im Wandel. Immer mehr Hausbesitzer und Gewerbetreibende in der Region ${city.state} suchen nach Alternativen zu Öl und fossilem Erdgas. Flüssiggas hat sich hierbei als krisensichere und flexible Lösung etabliert, die Unabhängigkeit von leitungsgebundenen Energieträgern garantiert.`,
        `Wer ${locationName} baut oder saniert, steht vor der Frage: Welche Heizenergie ist zukunftssicher? Flüssiggas bietet Bewohnern in ${city.name} eine hervorragende Möglichkeit, effizient und umweltschonend zu heizen, ohne auf den Komfort einer modernen Gasheizung verzichten zu müssen.`,
        `Versorgungssicherheit und Kosteneffizienz sind für Immobilienbesitzer ${locationName} entscheidende Faktoren. Mit einem eigenen Flüssiggastank machen Sie sich unabhängig von großen Versorgungsnetzen und können Ihre Energiekosten durch strategischen Einkauf selbst beeinflussen.`
    ];

    const geography = [
        `Gerade in ländlicheren Strukturen oder Randgebieten von ${city.name} ist der Anschluss an das Erdgasnetz oft nicht wirtschaftlich oder gar nicht möglich. Ein Flüssiggastank auf dem eigenen Grundstück löst dieses Problem sofort. Sie erhalten volle Versorgungssicherheit, egal wo genau Ihre Immobilie in ${city.zip} liegt.`,
        `Die Topografie und Infrastruktur ${locationName} machen leitungsgebundene Energie nicht immer zur ersten Wahl. Flüssiggas hingegen ist überall einsetzbar. Unsere Tankwagen erreichen jeden Winkel in ${city.state}, sodass Sie auch in abgelegenen Lagen von ${city.name} zuverlässig versorgt werden.`,
        `Als Teil der Region ${city.state} gelten für ${city.name} spezifische klimatische und geografische Bedingungen. Unsere Tankanlagen sind für diese norddeutschen Witterungsverhältnisse ausgelegt – egal ob oberirdisch im Garten oder platzsparend unterirdisch eingelagert.`
    ];

    const benefits = [
        `Ein entscheidender Vorteil für Kunden ${locationName} ist das Modell "Kauf statt Miete". Während viele Anbieter Sie in langfristige Mietverträge drängen, bieten wir Ihnen den Tank zum Eigentum an. Das spart über die Jahre tausende Euro und gibt Ihnen die Freiheit, das Gas dort zu kaufen, wo es gerade am günstigsten ist.`,
        `Viele Haushalte ${locationName} zahlen zu viel für ihre Energie, weil sie in alten Mietverträgen für ihre Tanks feststecken. Wir empfehlen den Wechsel zum Eigentumstank. Die Amortisation erfolgt meist schon nach wenigen Jahren, und Sie steigern den Wert Ihrer Immobilie in ${city.name} nachhaltig.`,
        `Sicherheit steht bei uns an erster Stelle. Für Ihre Anlage ${locationName} kümmern wir uns nicht nur um die Lieferung, sondern organisieren auf Wunsch auch die gesetzlich vorgeschriebenen Prüfungen. So bleibt Ihre Heizung in ${city.name} stets betriebsbereit und sicher.`
    ];

    const regulations = [
        `Natürlich beachten wir bei der Aufstellung ${locationName} alle geltenden Vorschriften der ${city.state === 'Schleswig-Holstein' ? 'Landesbauordnung Schleswig-Holstein' : (city.state === 'Hamburg' ? 'Hamburgischen Bauordnung' : 'Landesbauordnung')}. Insbesondere Grenzabstände und Sicherheitszonen werden von unseren Experten vor Ort geprüft, um eine reibungslose Abnahme zu garantieren.`,
        `Die Einhaltung der technischen Regeln Flüssiggas (TRF 2021) ist für uns selbstverständlich. Wir beraten Sie ${locationName} individuell, welcher Standort auf Ihrem Grundstück am besten geeignet ist, um alle Auflagen zu erfüllen und gleichzeitig die Ästhetik Ihres Gartens zu wahren.`,
        `Auch in puncto Wasserschutz ist Flüssiggas eine gute Wahl für ${city.name}. Da es nicht gewässergefährdend ist, sind die Auflagen oft geringer als bei Heizöl. Wir prüfen für Sie gerne die spezifischen Bedingungen an Ihrem Standort in ${city.zip}.`
    ];

    // Select variants based on seed shifts to ensure differents combos for different cities
    const titleVariant = [
        `Flüssiggas ${locationName}: Ihr Ratgeber`,
        `Energieversorgung ${locationName}: Flüssiggas im Fokus`,
        `Ratgeber: Flüssiggastank kaufen ${locationName}`,
        `Heizen mit Flüssiggas ${locationName}: Alles was Sie wissen müssen`
    ];

    return {
        title: getVariant(titleVariant, seed),
        sections: [
            {
                heading: `Moderne Energie für ${city.name}`,
                text: `${getVariant(intros, seed)} ${getVariant(geography, seed + 1)}`
            },
            {
                heading: `Vorteile für Hausbesitzer ${locationName}`,
                text: `${getVariant(benefits, seed + 2)}`
            },
            {
                heading: `Sicherheit und Vorschriften in ${city.state}`,
                text: `${getVariant(regulations, seed + 3)}`
            }
        ]
    };
};

export const getLocalContent = (slug) => {
    const city = cityData.find(c => c.slug === slug);
    if (!city) return null;
    return generateLocalContent(city);
};
