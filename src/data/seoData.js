import { tankDetails } from './tanks.js';

const SITE_URL = 'https://www.gasmoeller.de';
const DEFAULT_IMAGE = `${SITE_URL}/logos/Icon-01.webp`; // High contrast icon for sharing

export const seoData = {
    'start': {
        title: 'Flüssiggastank kaufen & Geld sparen | gasmöller - Ihr Experte im Norden',
        description: 'Unabhängig & Fair. Gastanks (1,2t - 2,9t) zum Kauf statt Miete. Eigener Fuhrpark, Express-Lieferung. Seit 2000 in Schleswig-Holstein & Hamburg.',
        image: `${SITE_URL}/images/gas-order-hero.webp`
    },
    'tanks': {
        title: 'Flüssiggastank kaufen statt mieten | Alle Größen (1,2t - 2,9t) | gasmöller',
        description: 'Sparen Sie Mietkosten! Neue & geprüfte Tanks zum fairen Preis. Oberirdisch & unterirdisch. Jetzt Angebot für Ihren Gastank anfordern.',
        image: DEFAULT_IMAGE
    },
    'gas': {
        title: 'Flüssiggas bestellen | Aktueller Tagespreis & Express-Lieferung | gasmöller',
        description: 'Günstiges Flüssiggas für den Norden. Zuverlässige Lieferung mit eigener Flotte. Keine versteckten Kosten. Hier aktuellen Gaspreis anfragen!',
        image: `${SITE_URL}/images/gas-order-hero.webp`
    },
    'wissen': {
        title: 'Wissen & Ratgeber | Alles über Flüssiggas & Tanks | gasmöller',
        description: 'Expertenwissen: Wie sicher sind Gastanks? Wie oft prüfen? Tipps zum Energiesparen & Umrüsten von Öl auf Gas. Hier informieren.',
        image: DEFAULT_IMAGE
    },
    'gewerbe': {
        title: 'Gewerbegas & Prozesswärme | Individuelle Lösungen | gasmöller',
        description: 'Effizientes Flüssiggas für Landwirtschaft, Industrie & Gewerbe. Prozesswärme, Hallenheizung & Staplergas. Jetzt Gewerbe-Angebot sichern.',
        image: DEFAULT_IMAGE
    },
    'ueber-uns': {
        title: 'Über gasmöller | Ihr unabhängiger Familienbetrieb im Norden',
        description: 'Persönlich & Nah. Seit 2000 versorgen wir Schleswig-Holstein & Hamburg mit Flüssiggas. Lernen Sie unser Team und unsere Werte kennen.',
        image: DEFAULT_IMAGE
    },
    'kontakt': {
        title: 'Kontakt & Service | Wir sind für Sie da | gasmöller',
        description: 'Fragen zu Tank oder Gas? Rufen Sie uns an: 04551 89 70 89. Kompetente Beratung, schneller Service. Schreiben Sie uns!',
        image: DEFAULT_IMAGE
    },
    'rechner': {
        title: 'Heizkosten-Rechner | Flüssiggas-Vergleich & Ersparnis | gasmöller',
        description: 'Vergleichen Sie jetzt: So viel sparen Sie mit einem eigenen Tank gegenüber Vertragsbindung. Kostenloser Rechner für Öl, Gas, Pellets & Holz.',
        image: DEFAULT_IMAGE
    },
    'pruefungen': {
        title: 'Tankprüfung fällig? | Innere & Äußere Prüfung | gasmöller',
        description: 'Zugelassener Fachbetrieb für 2- und 10-jährige Tankprüfungen. Schnell, unkompliziert & preiswert. Jetzt Prüftermin vereinbaren.',
        image: DEFAULT_IMAGE
    },
    'barrierefreiheit': {
        title: 'Erklärung zur Barrierefreiheit | gasmöller',
        description: 'Wir setzen uns für eine zugängliche Website ein. Erklärung gemäß BITV 2.0 und WCAG 2.1 Standards.',
        image: DEFAULT_IMAGE
    },
    '404': {
        title: 'Seite nicht gefunden (404) | gasmöller',
        description: 'Die gewünschte Seite ist leider nicht verfügbar. Bitte nutzen Sie das Menü oder kehren Sie zur Startseite zurück.',
        image: DEFAULT_IMAGE
    }
};

export const getSeoForPath = (path) => {
    // Normalize path first
    const cleanPath = path.replace(/^\//, '');

    // Default SEO Data (Start Page as fallback used to be here, now we are more strict)
    let data = {
        title: seoData['start'].title,
        description: seoData['start'].description,
        image: seoData['start'].image,
        url: `${SITE_URL}/${cleanPath}`,
        type: 'website',
        locale: 'de_DE',
        site_name: 'gasmöller'
    };

    // Check for dynamic tank routes
    if (cleanPath.startsWith('tanks/')) {
        const slug = cleanPath.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
            data = {
                title: tank.seoTitle || `${tank.name} kaufen | gasmöller`,
                description: tank.seoDesc || `Kaufen Sie den ${tank.name}. ${tank.capacity} Kapazität.`,
                image: tank.image || DEFAULT_IMAGE,
                url: `${SITE_URL}/${cleanPath}`,
                type: 'product'
            };
        }
    } else {
        // Normalize path to section key
        let section = 'start';
        // Handle root
        if (cleanPath === '' || cleanPath === 'index.html' || cleanPath === 'start') {
            section = 'start';
        } else {
            // Remove trailing .html or slash if present for lookup
            const p = cleanPath.replace(/\/$/, '').replace(/\.html$/, '').toLowerCase();
            if (seoData[p]) {
                section = p;
            } else {
                // Return 404 data for unknown routes
                section = '404';
            }
        }

        if (seoData[section]) {
            data = {
                ...data,
                ...seoData[section],
                url: section === 'start' ? SITE_URL : `${SITE_URL}/${section}`
            };
        }
    }

    return data;
};

export const getSchemaForPath = (path) => {
    const cleanPath = path.replace(/^\//, '');
    const currentUrl = cleanPath === '' ? SITE_URL : `${SITE_URL}/${cleanPath}`;

    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "additionalType": ["https://schema.org/GasStation", "https://schema.org/HVACBusiness"],
        "name": "Gas-Service Möller e.K.",
        "image": [
            DEFAULT_IMAGE,
            `${SITE_URL}/images/gas-order-hero.webp`
        ],
        "logo": DEFAULT_IMAGE,
        "telephone": "04551 89 70 89",
        "email": "kontakt@gasmoeller.de",
        "url": SITE_URL,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Neuenteichweg 7a",
            "addressLocality": "Schieren",
            "postalCode": "23795",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 53.944,
            "longitude": 10.390
        },
        "areaServed": [
             { "@type": "Place", "name": "Schleswig-Holstein" },
             { "@type": "Place", "name": "Hamburg" },
             { "@type": "Place", "name": "Niedersachsen (Nord)" },
             { "@type": "Place", "name": "Mecklenburg-Vorpommern (West)" }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "17:00"
        },
        "priceRange": "$$",
        "sameAs": [
             "https://www.facebook.com/gasmoeller",
             "https://www.linkedin.com/company/gasmoeller"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "04551 89 70 89",
            "contactType": "customer service",
            "areaServed": "DE",
            "availableLanguage": "German"
        },
        "knowsAbout": ["Flüssiggas", "Gastanks", "Heizung", "Energie", "Gewerbegas", "Prozesswärme"]
    };

    // Specific schema for Tank Detail pages
    if (cleanPath.startsWith('tanks/')) {
        const slug = cleanPath.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": tank.name,
                "image": DEFAULT_IMAGE,
                "description": tank.description,
                "sku": tank.slug,
                "brand": {
                    "@type": "Brand",
                    "name": "gasmöller"
                },
                "offers": {
                    "@type": "Offer",
                    "url": currentUrl,
                    "priceCurrency": "EUR",
                    "price": "0", // Price on request
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                },
                "additionalProperty": [
                    { "@type": "PropertyValue", "name": "Kapazität", "value": tank.capacity },
                    { "@type": "PropertyValue", "name": "Volumen", "value": tank.volume },
                    { "@type": "PropertyValue", "name": "Abmessungen", "value": tank.dimensions },
                    { "@type": "PropertyValue", "name": "Installation", "value": tank.installation }
                ]
            };
        }
    }

    // Specific schema for Tanks page (OfferCatalog)
    if (cleanPath === 'tanks') {
        return {
            ...baseSchema,
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Flüssiggastanks",
                "itemListElement": tankDetails.map(t => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": t.name,
                        "description": t.description,
                        "url": `${SITE_URL}/tanks/${t.slug}`
                    }
                }))
            }
        };
    }

    // BreadcrumbList for better structure
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": SITE_URL
            }
        ]
    };

    if (cleanPath !== '' && cleanPath !== 'start') {
        breadcrumb.itemListElement.push({
             "@type": "ListItem",
             "position": 2,
             "name": seoData[cleanPath] ? seoData[cleanPath].title.split('|')[0].trim() : cleanPath,
             "item": currentUrl
        });

        // Return array of schemas (Organization + Breadcrumb)
        return [baseSchema, breadcrumb];
    }

    return baseSchema;
};
