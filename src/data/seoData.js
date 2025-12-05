import { tankDetails } from './tanks.js';

export const seoData = {
    'start': {
        title: 'gasmöller - Ihr Partner für Flüssiggas im Norden',
        description: 'Unabhängig. Fair. Norddeutsch. Flüssiggastanks kaufen statt mieten. Ihr Experte seit 2005. Jetzt Angebot anfordern!'
    },
    'tanks': {
        title: 'Flüssiggastank kaufen | Oberirdisch & Unterirdisch | gasmöller',
        description: 'Kaufen Sie Ihren Flüssiggastank statt zu mieten. 1,2t, 2,1t und 2,9t Tanks verfügbar. Unabhängigkeit von großen Versorgern.'
    },
    'gas': {
        title: 'Flüssiggas bestellen | Aktuelle Preise & Lieferung | gasmöller',
        description: 'Flüssiggas günstig bestellen. Lieferung in Schleswig-Holstein, Hamburg & Niedersachsen. Fairer Preis, schnelle Lieferung.'
    },
    'wissen': {
        title: 'Wissen & Ratgeber | Alles über Flüssiggas | gasmöller',
        description: 'Ratgeber zu Flüssiggas, Tanksicherheit, Prüfintervalle und Energiespartipps. Informieren Sie sich hier.'
    },
    'gewerbe': {
        title: 'Gewerbegas & Prozesswärme | gasmöller',
        description: 'Individuelle Flüssiggas-Lösungen für Gewerbe, Landwirtschaft und Industrie. Prozesswärme, Hallenheizung und mehr.'
    },
    'ueber-uns': {
        title: 'Über gasmöller | Ihr unabhängiger Energieversorger',
        description: 'Lernen Sie gasmöller kennen. Seit 2005 Ihr zuverlässiger Partner für Flüssiggas im Norden. Unser Team und unsere Werte.'
    },
    'kontakt': {
        title: 'Kontakt | gasmöller Kundenservice',
        description: 'Kontaktieren Sie uns. Telefonisch unter 04551 89 70 89 oder per E-Mail. Wir beraten Sie gerne kostenlos.'
    },
    'rechner': {
        title: 'Spar-Rechner | Flüssiggas Kostenvergleich | gasmöller',
        description: 'Vergleichen Sie Ihre aktuellen Flüssiggaskosten. Sehen Sie, wie viel Sie mit einem eigenen Tank sparen können.'
    }
};

export const getSeoForPath = (path) => {
    // Normalize path first
    const cleanPath = path.replace(/^\//, '');

    // Check for dynamic tank routes
    if (cleanPath.startsWith('tanks/')) {
        const slug = cleanPath.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
            return {
                title: tank.seoTitle,
                description: tank.seoDesc
            };
        }
    }

    // Normalize path to section key
    let section = 'start';
    if (path === '/' || path === '') section = 'start';
    else {
        const p = cleanPath.toLowerCase();
        if (seoData[p]) section = p;
    }
    return seoData[section] || seoData['start'];
};

export const getSchemaForPath = (path) => {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "GasStation", // Or LocalBusiness, but GasStation/Energy is specific
        "name": "gasmöller GmbH",
        "image": "https://gasmoeller.de/wp-content/uploads/2021/08/Logo-01.png",
        "telephone": "04551 89 70 89",
        "url": "https://www.gasmoeller.de",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Musterstraße 1", // Needs actual address if known, using placeholder from About/Imprint
            "addressLocality": "Bad Segeberg", // Inferring from area code 04551
            "postalCode": "23795", // Placeholder
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 53.936,
            "longitude": 10.310
        },
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
        "priceRange": "$$"
    };

    // Specific schema for Tank Detail pages
    if (path.startsWith('tanks/')) {
        const slug = path.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": tank.name,
                "image": "https://gasmoeller.de/wp-content/uploads/2021/08/Logo-01.png", // Placeholder
                "description": tank.description,
                "sku": tank.slug,
                "brand": {
                    "@type": "Brand",
                    "name": "gasmöller"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://www.gasmoeller.de/${path}`,
                    "priceCurrency": "EUR",
                    "price": "0", // Price on request
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                },
                "additionalProperty": [
                    { "@type": "PropertyValue", "name": "Kapazität", "value": tank.capacity },
                    { "@type": "PropertyValue", "name": "Volumen", "value": tank.volume },
                    { "@type": "PropertyValue", "name": "Abmessungen", "value": tank.dimensions }
                ]
            };
        }
    }

    // Specific schema for Tanks page (Product)
    if (path === 'tanks') {
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
                        "description": t.description
                    }
                }))
            }
        };
    }

    return baseSchema;
};
