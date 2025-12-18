import { tankDetails } from './tanks.js';

const SITE_URL = 'https://www.gasmoeller.de';
const DEFAULT_IMAGE = `${SITE_URL}/logos/Icon-01.webp`; // High contrast icon for sharing

export const seoData = {
    'start': {
        title: 'Flüssiggastank kaufen & sofort sparen (Nr. 1 im Norden) | gasmöller',
        description: 'Nie wieder Miete zahlen! Werden Sie unabhängig mit einem eigenen Flüssiggastank (1,2t - 2,9t). Fair, transparent & regional. Jetzt Angebot sichern!',
        image: `${SITE_URL}/images/gas-order-hero.webp`
    },
    'tanks': {
        title: 'Flüssiggastank kaufen [Preis-Check] | Bis 50% sparen | gasmöller',
        description: 'Schluss mit teuren Mietverträgen! Neue & geprüfte Tanks zum Bestpreis kaufen. Oberirdisch & unterirdisch. Starten Sie jetzt in Ihre Unabhängigkeit.',
        image: DEFAULT_IMAGE
    },
    'gas': {
        title: 'Flüssiggas bestellen | Tiefpreis-Garantie & Express | gasmöller',
        description: 'Ihr Gas ist leer? Wir liefern sofort! Aktueller Tagespreis ohne versteckte Kosten. Regionaler Service für den Norden. Jetzt Preis anfragen & sparen.',
        image: `${SITE_URL}/images/gas-order-hero.webp`
    },
    'wissen': {
        title: 'Experten-Wissen: So sparen Sie bei Flüssiggas | Ratgeber | gasmöller',
        description: 'Geheimtipps vom Profi: Wie Sie Heizkosten senken & sicher heizen. Alles zu Prüfung, Wartung & Umrüstung. Machen Sie sich schlau!',
        image: DEFAULT_IMAGE
    },
    'gewerbe': {
        title: 'Gewerbegas & Prozesswärme | Effizienz für Ihr Business | gasmöller',
        description: 'Maximale Power für Ihren Betrieb. Zuverlässiges Flüssiggas für Landwirtschaft & Industrie. Individuelle Konditionen anfragen.',
        image: DEFAULT_IMAGE
    },
    'ueber-uns': {
        title: 'Wir sind gasmöller | Ehrlich. Norddeutsch. Unabhängig.',
        description: 'Kein Konzern, sondern Familie. Seit 2000 Ihr verlässlicher Partner für Energie im Norden. Lernen Sie die Gesichter hinter dem Service kennen.',
        image: DEFAULT_IMAGE
    },
    'kontakt': {
        title: 'Kontakt & Hilfe | Wir lösen Ihr Problem | gasmöller',
        description: 'Persönliche Beratung statt Warteschleife. Rufen Sie uns direkt an: 04551 89 70 89. Wir kümmern uns um Ihr Anliegen – schnell & kompetent.',
        image: DEFAULT_IMAGE
    },
    'rechner': {
        title: 'Heizkosten-Rechner [2024] | Was kostet Heizen wirklich? | gasmöller',
        description: 'Der große Vergleich: Flüssiggas vs. Öl, Pellets & Wärmepumpe. Sehen Sie schwarz auf weiß, wie viel Geld Sie mit einem eigenen Tank sparen können.',
        image: DEFAULT_IMAGE
    },
    'pruefungen': {
        title: 'Tankprüfung fällig? | TÜV-Service ohne Stress | gasmöller',
        description: 'Innere & Äußere Prüfung (2 & 10 Jahre) fällig? Wir erledigen das für Sie. Schnell, sicher & zugelassen. Jetzt Termin buchen & entspannen.',
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
        "aggregateRating": {
             "@type": "AggregateRating",
             "ratingValue": "5.0",
             "reviewCount": "127",
             "bestRating": "5",
             "worstRating": "1"
        },
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

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "gasmöller",
        "url": SITE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/suche?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
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
                "mpn": tank.slug.toUpperCase(),
                "brand": {
                    "@type": "Brand",
                    "name": "Gas-Service Möller"
                },
                "offers": {
                    "@type": "Offer",
                    "url": currentUrl,
                    "priceCurrency": "EUR",
                    "price": "0", // Price on request
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition",
                    "priceValidUntil": new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0], // End of current/next year
                    "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": {
                             "@type": "MonetaryAmount",
                             "value": "0",
                             "currency": "EUR"
                        },
                        "shippingDestination": {
                             "@type": "DefinedRegion",
                             "addressCountry": "DE",
                             "addressRegion": ["SH", "HH", "NI", "MV"]
                        },
                         "deliveryTime": {
                            "@type": "ShippingDeliveryTime",
                            "handlingTime": {
                                "@type": "QuantitativeValue",
                                "minValue": 0,
                                "maxValue": 1,
                                "unitCode": "DAY"
                            },
                            "transitTime": {
                                "@type": "QuantitativeValue",
                                "minValue": 1,
                                "maxValue": 14,
                                "unitCode": "DAY"
                            }
                        }
                    }
                },
                "additionalProperty": [
                    { "@type": "PropertyValue", "name": "Kapazität", "value": tank.capacity },
                    { "@type": "PropertyValue", "name": "Volumen", "value": tank.volume },
                    { "@type": "PropertyValue", "name": "Abmessungen", "value": tank.dimensions },
                    { "@type": "PropertyValue", "name": "Installation", "value": tank.installation },
                    { "@type": "PropertyValue", "name": "Material", "value": "Stahl" },
                    { "@type": "PropertyValue", "name": "Beschichtung", "value": "Epoxidharz (hellgrün)" }
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
                        "sku": t.slug,
                        "url": `${SITE_URL}/tanks/${t.slug}`,
                        "brand": {
                             "@type": "Brand",
                             "name": "Gas-Service Möller"
                        }
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

        // Return array of schemas (Organization + Breadcrumb + Website)
        return [baseSchema, breadcrumb, websiteSchema];
    }

    return [baseSchema, websiteSchema];
};
