import { tankDetails } from './tanks.js';

const SITE_URL = 'https://www.gasmoeller.de';
const DEFAULT_IMAGE = `${SITE_URL}/logos/Icon-01.webp`; // High contrast icon for sharing

export const seoData = {
    'start': {
        title: 'gasmöller - Ihr Partner für Flüssiggas im Norden',
        description: 'Unabhängig. Fair. Norddeutsch. Flüssiggastanks kaufen statt mieten. Ihr Experte seit 2005. Jetzt Angebot anfordern!',
        image: `${SITE_URL}/images/gas-order-hero.webp` // Hero image
    },
    'tanks': {
        title: 'Flüssiggastank kaufen | Oberirdisch & Unterirdisch | gasmöller',
        description: 'Kaufen Sie Ihren Flüssiggastank statt zu mieten. 1,2t, 2,1t und 2,9t Tanks verfügbar. Unabhängigkeit von großen Versorgern.',
        image: DEFAULT_IMAGE
    },
    'gas': {
        title: 'Flüssiggas bestellen | Aktuelle Preise & Lieferung | gasmöller',
        description: 'Flüssiggas günstig bestellen. Lieferung in Schleswig-Holstein, Hamburg & Niedersachsen. Fairer Preis, schnelle Lieferung.',
        image: `${SITE_URL}/images/gas-order-hero.webp`
    },
    'wissen': {
        title: 'Wissen & Ratgeber | Alles über Flüssiggas | gasmöller',
        description: 'Ratgeber zu Flüssiggas, Tanksicherheit, Prüfintervalle und Energiespartipps. Informieren Sie sich hier.',
        image: DEFAULT_IMAGE
    },
    'gewerbe': {
        title: 'Gewerbegas & Prozesswärme | gasmöller',
        description: 'Individuelle Flüssiggas-Lösungen für Gewerbe, Landwirtschaft und Industrie. Prozesswärme, Hallenheizung und mehr.',
        image: DEFAULT_IMAGE
    },
    'ueber-uns': {
        title: 'Über gasmöller | Ihr unabhängiger Energieversorger',
        description: 'Lernen Sie gasmöller kennen. Seit 2005 Ihr zuverlässiger Partner für Flüssiggas im Norden. Unser Team und unsere Werte.',
        image: DEFAULT_IMAGE
    },
    'kontakt': {
        title: 'Kontakt | gasmöller Kundenservice',
        description: 'Kontaktieren Sie uns. Telefonisch unter 04551 89 70 89 oder per E-Mail. Wir beraten Sie gerne kostenlos.',
        image: DEFAULT_IMAGE
    },
    'rechner': {
        title: 'Spar-Rechner | Flüssiggas Kostenvergleich | gasmöller',
        description: 'Vergleichen Sie Ihre aktuellen Flüssiggaskosten. Sehen Sie, wie viel Sie mit einem eigenen Tank sparen können.',
        image: DEFAULT_IMAGE
    },
    'pruefungen': {
        title: 'Tankprüfungen & Service | Äußere & Innere Prüfung | gasmöller',
        description: 'Gesetzliche Tankprüfungen (2 & 10 Jahre) für Flüssiggastanks. Zuverlässiger Service, faire Preise. Jetzt Termin vereinbaren.',
        image: DEFAULT_IMAGE
    }
};

export const getSeoForPath = (path) => {
    // Normalize path first
    const cleanPath = path.replace(/^\//, '');

    // Default SEO Data
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
        if (cleanPath === '' || cleanPath === 'index.html') section = 'start';
        else {
            // Remove trailing .html or slash if present for lookup
            const p = cleanPath.replace(/\/$/, '').replace(/\.html$/, '').toLowerCase();
            if (seoData[p]) section = p;
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
        "@type": "GasStation", // Specific enough for gas supplier
        "name": "gasmöller",
        "image": DEFAULT_IMAGE,
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
        ]
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
