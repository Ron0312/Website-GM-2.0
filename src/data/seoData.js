import { tankDetails } from './tanks.js';
import { cityData } from './cityData.js';
// Removed dangerous import { CONTENT } from './content.js' to prevent JSX crash in Node server.

const BASE_URL = 'https://gasmoeller.de';
const DEFAULT_IMAGE = `${BASE_URL}/images/gas-order-hero.webp`;

// Simple slug to title formatter as fallback
const formatTitleFromSlug = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const CURRENT_YEAR = new Date().getFullYear();
const NEXT_YEAR = CURRENT_YEAR + 1;

// Calculate dynamic price validity (End of next year)
const getPriceValidUntil = () => {
    return `2026-12-31`;
};

const PRICE_VALID_UNTIL = getPriceValidUntil();

// Structured Data Helpers
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Gas-Service Möller e.K.",
  "image": [
    "https://gasmoeller.de/logos/logo-gasmoeller.png",
    "https://gasmoeller.de/images/gas-order-hero.webp"
  ],
  "url": "https://gasmoeller.de",
  "telephone": "+49 176 416 84 326",
  "email": "kontakt@gasmoeller.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Neuenteichweg 7a",
    "addressLocality": "Schieren",
    "postalCode": "23795",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.942,
    "longitude": 10.435
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
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "25"
  },
  "sameAs": [
    "https://www.facebook.com/people/Gas-Service-Möller/100083286084666/",
    "https://www.linkedin.com/company/gas-service-möller"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 53.942,
      "longitude": 10.435
    },
    "geoRadius": "150000"
  },
  "logo": "https://gasmoeller.de/logos/logo-gasmoeller.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49 176 416 84 326",
    "contactType": "customer service",
    "areaServed": "DE",
    "availableLanguage": "German"
  },
  "knowsAbout": [
    "Flüssiggas",
    "Flüssiggastanks",
    "Energieversorgung",
    "Heizung"
  ],
  "additionalType": [
      "https://schema.org/GasStation",
      "https://schema.org/HVACBusiness"
  ]
});

const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Gas-Service Möller",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://gasmoeller.de/suche?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
});

const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url ? `${BASE_URL}${item.url}` : undefined
  }))
});

const getTankProductSchema = (tank) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": tank.name,
  "description": tank.description,
  "image": tank.image || `${BASE_URL}/images/tanks/tank-placeholder.webp`, // Fallback image
  "brand": {
    "@type": "Brand",
    "name": "Gas-Service Möller"
  },
  "sku": `TANK-${tank.slug.toUpperCase()}`,
  "mpn": `GSM-${tank.slug.toUpperCase()}`,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "25"
  },
  "offers": {
    "@type": "Offer",
    "url": `${BASE_URL}/fluessiggastank-kaufen/${tank.slug}`,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": PRICE_VALID_UNTIL,
    "itemCondition": "https://schema.org/NewCondition",
     "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "0.00", // Call for price
        "valueAddedTaxIncluded": "true"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "EUR"
        },
        "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "DE"
        },
        "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "d"
            },
             "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 5,
                "maxValue": 14,
                "unitCode": "d"
            }
        }
      }
  }
});

const getTankCatalogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Flüssiggastanks",
  "url": `${BASE_URL}/tanks`,
  "numberOfItems": tankDetails.length,
  "itemListElement": tankDetails.map((tank, index) => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Product",
      "name": tank.name,
      "description": tank.description,
      "url": `${BASE_URL}/fluessiggastank-kaufen/${tank.slug}`,
      "image": tank.image || `${BASE_URL}/images/tanks/tank-placeholder.webp`,
      "brand": {
        "@type": "Brand",
        "name": "Gas-Service Möller"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "25"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": "0.00",
        "priceValidUntil": PRICE_VALID_UNTIL,
        "availability": "https://schema.org/InStock",
        "url": `${BASE_URL}/fluessiggastank-kaufen/${tank.slug}`
      }
    },
    "position": index + 1
  }))
});

// New Helper for City SEO
const getCitySchema = (city) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Flüssiggaslieferung und Tankverkauf",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Gas-Service Möller e.K.",
        "image": `${BASE_URL}/logos/logo-gasmoeller.png`,
        "telephone": "+49 176 416 84 326",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Neuenteichweg 7a",
            "addressLocality": "Schieren",
            "postalCode": "23795",
            "addressCountry": "DE"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "25"
        }
    },
    "areaServed": {
        "@type": "City",
        "name": city.name,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "postalCode": city.zip,
            "addressRegion": city.state,
            "addressCountry": "DE"
        }
    },
    "description": `Günstiges Flüssiggas und Flüssiggastanks für ${city.name} und Umgebung. Lieferung, Aufstellung und Service aus einer Hand.`,
    "name": `Flüssiggas & Flüssiggastanks in ${city.name}`
});

// Helper for FAQ Schema
const getFAQSchema = (questions) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
        }
    }))
});

// Helper for HowTo Schema
const getHowToSchema = (title, steps) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "name": step.title,
        "text": step.text,
        "url": step.url ? `${BASE_URL}${step.url}` : undefined,
        "position": index + 1
    }))
});

const getCommercialServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Gewerbe- und Industriegasversorgung",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Gas-Service Möller e.K.",
        "image": `${BASE_URL}/logos/logo-gasmoeller.png`
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Norddeutschland"
    },
    "description": "Maßgeschneiderte Flüssiggas-Versorgungskonzepte für Industrie, Landwirtschaft und Gewerbe. Prozesswärme, Hallenheizung und Staplergas.",
    "name": "Gewerbegas & Industrielösungen",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
    }
});

// Shared Person/Author Schema for E-E-A-T
const getAuthorSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Thomas Möller",
    "jobTitle": "Geschäftsführung & Sachkundiger für Flüssiggasanlagen",
    "worksFor": {
        "@type": "Organization",
        "name": "Gas-Service Möller e.K."
    },
    "url": "https://gasmoeller.de/ueber-uns",
    "image": "https://gasmoeller.de/images/team/thomas-moeller-lkw.webp",
    "description": "Experte für energetische Versorgung im ländlichen Raum und zertifizierte Flüssiggastank-Prüfungen.",
    "knowsAbout": [
        "Technische Regeln Flüssiggas (TRF 2021)",
        "Gebäudeenergiegesetz (GEG)",
        "Flüssiggas-Logistik",
        "Druckbehälterverordnung",
        "Bio-Flüssiggas"
    ],
    "alumniOf": [
        {
            "@type": "Organization",
            "name": "DVFG (Deutscher Verband Flüssiggas e.V.)",
            "description": "Mitgliedschaft"
        }
    ],
    "sameAs": [
        "https://www.linkedin.com/company/gas-service-möller"
    ]
});

// New Helper for Deep Semantic Schema (Wikidata/Knowledge Graph)
const getDeepArticleSchema = (article, author, publisher) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.headline,
        "image": article.image || DEFAULT_IMAGE,
        "author": author,
        "publisher": publisher,
        "datePublished": article.datePublished || "2023-01-01",
        "dateModified": article.dateModified,
        "description": article.description,
        "mainEntityOfPage": {
             "@type": "WebPage",
             "@id": article.url
        }
    };

    if (article.about) {
        schema.about = article.about.map(entity => ({
            "@type": "Thing",
            "name": entity.name,
            "sameAs": entity.wikidata
        }));
    }

    if (article.mentions) {
        schema.mentions = article.mentions.map(entity => ({
            "@type": "Thing",
            "name": entity.name,
            "sameAs": entity.wikidata
        }));
    }

    return schema;
};

export const getSchemaForPath = (path) => {
   const seo = getSeoForPath(path);
   return seo.schema;
};

export const getSeoForPath = (path) => {
  // Strip query parameters for canonical URL and matching
  let cleanPathUrl = path;
  if (cleanPathUrl && cleanPathUrl.includes('?')) {
      cleanPathUrl = cleanPathUrl.split('?')[0];
  }

  const defaultSeo = {
    title: 'Gas-Service Möller | Ihr Partner für Flüssiggas & Flüssiggastanks im Norden',
    description: 'Flüssiggas kaufen, Flüssiggastanks mietfrei erwerben & erstklassiger Service. Wir beliefern Norddeutschland zuverlässig & günstig. Jetzt Angebot anfordern!',
    image: DEFAULT_IMAGE,
    type: 'website',
    url: `${BASE_URL}${cleanPathUrl && cleanPathUrl.startsWith('/') ? cleanPathUrl : '/' + (cleanPathUrl || '')}`,
    schema: [getOrganizationSchema(), getWebSiteSchema()]
  };

  // Normalize path: remove leading slash if present, unless it is just "/"
  const cleanPath = cleanPathUrl && cleanPathUrl.startsWith('/') && cleanPathUrl.length > 1 ? cleanPathUrl.substring(1) : cleanPathUrl || 'start';

  // 1. Static Routes
  switch (cleanPath) {
    case 'start':
    case '/':
      return {
        ...defaultSeo,
        title: 'Gas-Service Möller | Flüssiggas & Flüssiggastanks kaufen (Norddeutschland)',
        description: 'Ihr unabhängiger Flüssiggasanbieter im Norden. Günstig Flüssiggas bestellen & Flüssiggastanks kaufen (1,2t - 2,9t). Vertragsfrei & zuverlässig. Jetzt Angebot anfordern!',
        schema: [
            getOrganizationSchema(),
            getWebSiteSchema(),
            getFAQSchema([
                { question: "Wie lange dauert die Lieferung?", answer: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
                { question: "Kann ich meinen Flüssiggastank kaufen?", answer: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks (oberirdisch und unterirdisch). Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl. Wir bieten Größen von 1,2 t bis 2,9 t an." },
                { question: "Was kostet Flüssiggas aktuell?", answer: "Der Preis ändert sich täglich analog zu den Ölbörsen. Da wir unabhängig sind, können wir oft günstigere Konditionen anbieten als Großkonzerne. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
                { question: "Muss ich bei der Lieferung zu Hause sein?", answer: "Nicht zwingend, sofern der Flüssiggastank und der Füllanschluss für unseren Fahrer frei zugänglich sind. Wir informieren Sie vorab über den Liefertermin." },
                { question: "Liefern Sie auch im Notfall?", answer: "Ja, wenn Ihre Heizung kalt bleibt, versuchen wir schnellstmöglich zu helfen. Rufen Sie uns direkt an unter 04551 89 70 89." },
                { question: "Was genau ist Flüssiggas?", answer: "Flüssiggas (LPG) besteht aus Propan und Butan. Als Heizgas verwenden wir in Deutschland gemäß DIN 51622 fast ausschließlich reines Propan, da dieses auch bei tiefen Temperaturen im Winter zuverlässig verdampft." },
                { question: "Bieten Sie auch Gasflaschen (Flaschengas) an?", answer: "Unser Kerngeschäft ist die Belieferung von Flüssiggastanks. Für Gasflaschen (11kg / 33kg) wenden Sie sich bitte an lokale Baumärkte oder Camping-Händler. Wir bieten jedoch Treibgas für Stapler (Gewerbe) an." },
                { question: "Welche Prüfungen sind beim Flüssiggastank vorgeschrieben?", answer: "Alle 2 Jahre muss eine äußere Prüfung durch eine befähigte Person erfolgen. Alle 10 Jahre ist eine innere Prüfung durch eine ZÜS (z.B. TÜV, DEKRA) notwendig. Wir unterstützen Sie gerne bei der Organisation." }
            ])
        ]
      };
    case 'tank-entsorgen':
      return {
        ...defaultSeo,
        title: 'Flüssiggastank entsorgen & stilllegen | Kosten & Fachfirma',
        description: 'Alten Flüssiggastank entsorgen, abholen oder stilllegen lassen? Wir sind Ihre zertifizierte Fachfirma. Restgas-Absaugung & Demontage zum Festpreis.',
        schema: [
            getOrganizationSchema(),
            getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Service', url: '/service' }, { name: 'Tank entsorgen', url: '/tank-entsorgen' }]),
            getHowToSchema('Alten Gastank entsorgen lassen', [
                { title: 'Tankdaten übermitteln', text: 'Senden Sie uns ein Foto vom Typschild und Standort des Gastanks.' },
                { title: 'Angebot erhalten', text: 'Wir erstellen ein Festpreisangebot für die Abholung und Stilllegung.' },
                { title: 'Restgas absaugen', text: 'Unser Tankwagen saugt verbleibendes Flüssiggas ab und vergütet es ggf.' },
                { title: 'Abtransport', text: 'Der Kran-LKW hebt den leeren Behälter auf die Ladefläche.' }
            ])
        ]
      };
    case 'fluessiggastank-kaufen':
    case 'tanks':
      return {
        ...defaultSeo,
        title: 'Flüssiggastank kaufen | Neu & Gebraucht | Preise 2026',
        description: 'Flüssiggastank kaufen (Neu & Gebraucht). Aktuelle Preise 2026 für 2700l, 4850l & 6400l. Oberirdisch & Unterirdisch vom Fachhändler. Jetzt Angebot prüfen!',
        schema: [
            getOrganizationSchema(),
            getTankCatalogSchema(),
            getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Flüssiggastank kaufen', url: '/fluessiggastank-kaufen' }]),
            getFAQSchema([
                { question: 'Kann man einen Flüssiggastank kaufen?', answer: 'Ja, Sie können Flüssiggastanks (1,2t, 2,1t, 2,9t) käuflich erwerben. Damit entfallen monatliche Mietgebühren und Sie können Ihren Flüssiggaslieferanten frei wählen.' },
                { question: 'Was kostet ein Gastank 2700 Liter?', answer: 'Die Preise für einen Gastank 2700 Liter variieren je nach Stahlpreis. Ein oberirdischer Tank ist günstiger als ein unterirdischer. Kontaktieren Sie uns für ein tagesaktuelles Angebot.' },
                { question: 'Welche Gastank Größen gibt es?', answer: 'Gängige Größen für Privathaushalte sind 1,2 Tonnen (2700 Liter), 2,1 Tonnen (4850 Liter) und 2,9 Tonnen (6400 Liter).' },
                { question: 'Sind gebrauchte Tanks sicher?', answer: 'Ja, unsere regenerierten Tanks werden komplett überholt, neu lackiert und erhalten eine neue TÜV-Prüfung vor Auslieferung.' }
            ])
        ]
      };
    case 'fluessiggas-bestellen':
    case 'gas':
      return {
        ...defaultSeo,
        title: `Flüssiggas Preis aktuell | Lieferant wechseln & sparen 2026`,
        description: `Flüssiggas bestellen zum Tagespreis. Ihr regionaler Lieferant (frei Haus). Anbieter wechseln leicht gemacht: Pünktlich, zuverlässig & ohne Vertragsbindung. Jetzt Preis prüfen!`,
        schema: [
            getOrganizationSchema(),
            getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Flüssiggas bestellen', url: '/fluessiggas-bestellen' }])
        ]
      };
    case 'rechner':
        return {
            ...defaultSeo,
            title: 'Flüssiggas Rechner & Verbrauchsrechner | Heizkosten Vergleich',
            description: 'Der große Flüssiggas Rechner: Heizkosten & Jahresverbrauch berechnen. Vergleich: Flüssiggas vs. Öl, Pellets & Wärmepumpe. Wie viel Liter brauche ich?',
            schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Rechner', url: '/rechner' }]), {
                 "@context": "https://schema.org",
                 "@type": "SoftwareApplication",
                 "name": "Energie-Vergleichsrechner",
                 "applicationCategory": "FinanceApplication",
                 "operatingSystem": "Web",
                 "offers": {
                    "@type": "Offer",
                    "price": "0"
                 }
            }]
        };
    case 'gewerbe':
      return {
        ...defaultSeo,
        title: 'Flüssiggas für Gewerbe, Industrie & Landwirtschaft | Prozesswärme & Hallenheizung',
        description: 'Maßgeschneiderte Flüssiggas-Konzepte für Unternehmen. Prozesswärme, Hallenheizung & Staplergas. Jetzt Angebot für Gewerbegas anfordern! ➔ Vertragsfrei & Effizient.',
        schema: [
            getOrganizationSchema(),
            getCommercialServiceSchema(),
            getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Gewerbe', url: '/gewerbe' }])
        ]
      };
     case 'wissen':
      return {
        ...defaultSeo,
        title: 'Wissen & Ratgeber Flüssiggas | Tipps & Infos | Gas-Service Möller',
        description: 'Alles was Sie über Flüssiggas wissen müssen. Ratgeber zu Flüssiggastankgrößen, Prüfpflichten, Sicherheit & Installation. Expertentipps vom Fachmann.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Wissen', url: '/wissen' }])]
      };
    case 'ueber-uns':
      return {
        ...defaultSeo,
        title: 'Über Uns | Gas-Service Möller | Ihr Team im Norden',
        description: 'Lernen Sie uns kennen: Das Team von Gas-Service Möller. Seit 2000 Ihr verlässlicher Partner in Schleswig-Holstein, Hamburg & MV.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Über Uns', url: '/ueber-uns' }])]
      };
    case 'kontakt':
      return {
        ...defaultSeo,
        title: 'Kontakt | Angebot anfordern | Gas-Service Möller',
        description: 'Nehmen Sie Kontakt auf! Telefonisch, per E-Mail oder über unser Formular. Wir beraten Sie gerne zu Flüssiggas & Flüssiggastanks. Kostenlos & unverbindlich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Kontakt', url: '/kontakt' }])]
      };
    case 'pruefungen':
      return {
          ...defaultSeo,
          title: 'Flüssiggastank Prüfungen & TÜV | 2 & 10 Jahre Fristen | Kosten',
          description: 'Flüssiggastank Prüfung (TÜV/DEKRA) fällig? Wir organisieren Äußere (2 Jahre), Innere Prüfung (10 Jahre) & Rohrleitungsprüfung. Festpreis-Service.',
          schema: [
              getOrganizationSchema(),
              getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Service', url: '/pruefungen' }]),
              getHowToSchema('Flüssiggastank Prüfung beauftragen', [
                  { title: 'Prüffrist prüfen', text: 'Schauen Sie auf das Typschild Ihres Flüssiggastanks oder in das Prüfbuch.' },
                  { title: 'Kontakt aufnehmen', text: 'Rufen Sie uns an oder nutzen Sie das Kontaktformular.' },
                  { title: 'Termin vereinbaren', text: 'Wir koordinieren den Termin mit der ZÜS (TÜV) und unserem Techniker.' },
                  { title: 'Prüfung durchführen', text: 'Unser Team bereitet den Flüssiggastank vor, der TÜV prüft, wir verschließen alles wieder.' }
              ])
          ]
      };
    case 'barrierefreiheit':
        return {
            ...defaultSeo,
            title: 'Barrierefreiheitserklärung | Gas-Service Möller',
            description: 'Erklärung zur Barrierefreiheit gemäß BITV 2.0. Wir bemühen uns um eine zugängliche Webseite für alle Nutzer.',
            schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Barrierefreiheit', url: '/barrierefreiheit' }])]
        };
     case '404':
        return {
            ...defaultSeo,
            title: 'Seite nicht gefunden (404) | Gas-Service Möller',
            description: 'Die angeforderte Seite existiert leider nicht. Nutzen Sie unser Menü oder kontaktieren Sie uns direkt.',
            schema: [getOrganizationSchema()]
        };
  }

  // 2. Dynamic Tank Routes
  if (cleanPath.startsWith('tanks/') || cleanPath.startsWith('fluessiggastank-kaufen/')) {
    const slug = cleanPath.split('/')[1];
    const tank = tankDetails.find(t => t.slug === slug);
    if (tank) {
      const tankImage = tank.image || DEFAULT_IMAGE;
      // Prefer manually curated SEO title from data file, fallback to generated
      const seoTitle = tank.seoTitle || `${tank.name} kaufen | ${tank.volume} Flüssiggastank | Gas-Service Möller`;
      const seoDesc = tank.seoDesc || `Kaufen Sie den ${tank.name} (${tank.volume}). ${tank.installation === 'oberirdisch' ? 'Oberirdische' : 'Unterirdische'} Installation. Ideal für Einfamilienhäuser. Jetzt Angebot sichern!`;

      return {
        ...defaultSeo,
        title: seoTitle,
        description: seoDesc,
        image: tankImage,
        schema: [
            getOrganizationSchema(),
            getTankProductSchema(tank),
            getBreadcrumbSchema([
                { name: 'Start', url: '/' },
                { name: 'Flüssiggastank kaufen', url: '/fluessiggastank-kaufen' },
                { name: tank.name, url: `/fluessiggastank-kaufen/${tank.slug}` }
            ])
        ]
      };
    }
  }

  // 3. Dynamic Knowledge Routes
  if (cleanPath.startsWith('wissen/')) {
      const slug = cleanPath.split('/')[1];
      // Try to find title in CONTENT if possible, or fallback to formatter
      // Ideally we would import CONTENT but we want to avoid server crash if it has JSX.
      // We'll use a specific lookup or just format the slug for now to be safe and fast.
      // If we had a plain JSON for articles, we could import it.

      let articleTitle = formatTitleFromSlug(slug);
      let articleDesc = 'Detaillierter Ratgeber-Artikel von Gas-Service Möller.';
      let dateModified = `${CURRENT_YEAR}-01-15`; // Default date, dynamically updated

      // Specific overrides for known major articles if we want perfect titles without importing CONTENT
      const knowledgeOverrides = {
          'was-ist': {
              title: 'Was ist Flüssiggas? | Eigenschaften, Verwendung & Unterschied zu Erdgas',
              desc: 'Alles über Flüssiggas (LPG): Unterschied zu Erdgas, Heizwert, Herstellung und Verwendung. Warum Propan (DIN 51622) ideal zum Heizen ist.',
              semantic: {
                  about: [{ name: 'Flüssiggas', wikidata: 'https://www.wikidata.org/wiki/Q351609' }]
              }
          },
          'fluessiggastank-gebraucht': {
              title: 'Gebrauchten Flüssiggastank kaufen | Preis & Sicherheit',
              desc: 'Gebrauchten Flüssiggastank kaufen: Regenerierte Tanks (TÜV geprüft) bis zu 30% günstiger. Nachhaltige Alternative zum Neukauf. Jetzt Bestand prüfen!',
              semantic: {
                  mentions: [{ name: 'Nachhaltigkeit', wikidata: 'https://www.wikidata.org/wiki/Q214963' }]
              }
          },
          'fluessiggastank-fuellstand-app': {
              title: 'Flüssiggastank Füllstand App & Fernabfrage | Smart Meter',
              desc: 'Flüssiggastank Füllstand per App überwachen. Smart Metering (OilFox, RCT) nachrüsten. Nie wieder leerlaufen. Jetzt informieren!',
              semantic: {
                   about: [{ name: 'Smart Meter', wikidata: 'https://www.wikidata.org/wiki/Q1138600' }]
              }
          },
          'fluessiggastank-heizung-stoerung': {
               title: 'Heizung kalt? Störung am Flüssiggastank beheben | Checkliste',
               desc: 'Heizung springt nicht an? Checkliste für Störungen am Flüssiggastank: Leerer Tank, vereister Regler oder geschlossenes Ventil? Erste Hilfe hier.',
          },
          'miete-kauf': {
              title: 'Flüssiggastank mieten oder kaufen? Kosten-Vergleich 2026',
              desc: 'Flüssiggastank mieten? Stopp! Warum Kaufen oft 30-40% günstiger ist. Unser Rechner zeigt: So sparen Sie tausende Euro gegenüber der Miete.',
              date: `${CURRENT_YEAR}-01-20`
          },
          'sicherheit': {
              title: 'Flüssiggastank Vorschriften & Abstände (TRF 2021) | Checkliste',
              desc: 'Aktuelle Flüssiggastank Vorschriften 2026: Grenzabstände, Brandschutz & Ex-Zonen. Einfache Checkliste für die Aufstellung (Oberirdisch & Unterirdisch).',
              semantic: {
                  about: [{ name: 'Technische Regeln Flüssiggas', wikidata: 'https://www.wikidata.org/wiki/Q2399222' }]
              }
          },
          'tank-entsorgen': {
              title: 'Flüssiggastank entsorgen & stilllegen | Kosten & Fachfirma',
              desc: 'Flüssiggastank entsorgen oder stilllegen lassen? Wir sind Ihre Fachfirma. Restgas-Absaugung, Demontage & Abholung zum Festpreis. Jetzt Kosten prüfen!',
              semantic: {
                  about: [{ name: 'Abfallentsorgung', wikidata: 'https://www.wikidata.org/wiki/Q200726' }],
                  mentions: [{ name: 'Recycling', wikidata: 'https://www.wikidata.org/wiki/Q132589' }]
              },
              howTo: {
                  title: 'Alten Flüssiggastank entsorgen lassen',
                  steps: [
                      { title: 'Flüssiggastankdaten übermitteln', text: 'Senden Sie uns ein Foto vom Typschild und Standort.' },
                      { title: 'Angebot erhalten', text: 'Wir erstellen ein Festpreisangebot für die Abholung.' },
                      { title: 'Restgas absaugen', text: 'Unser Tankwagen saugt verbleibendes Flüssiggas ab und vergütet es ggf.' },
                      { title: 'Abtransport', text: 'Der Kran-LKW hebt den leeren Behälter auf die Ladefläche.' }
                  ]
              }
          },
          'tank-kosten': {
              title: 'Was kostet ein Flüssiggastank? | Preis 2700 Liter, 4850 Liter',
              desc: 'Aktuelle Preise für Flüssiggastanks (Oberirdisch & Unterirdisch). Kosten für 1,2t (2700 Liter), 2,1t (4850 Liter) & 2,9t (6400 Liter). Neu & Gebraucht kaufen.',
              date: `${CURRENT_YEAR}-02-10`
          },
          'aufstellung': {
              title: 'Flüssiggastank Vorschriften: Grenzabstand & Aufstellort (TRF 2021)',
              desc: 'Alles zu Grenzabständen, Brandlasten, Zaun und Vorschriften bei der Aufstellung von Flüssiggastanks (Oberirdisch & Unterirdisch).',
              semantic: {
                  about: [{ name: 'Technische Regeln Flüssiggas', wikidata: 'https://www.wikidata.org/wiki/Q2399222' }]
              }
          },
          'waermebedarf': {
              title: 'Flüssiggas Verbrauch Einfamilienhaus | Tabelle & Rechner',
              desc: 'Wie viel Flüssiggas braucht ein Einfamilienhaus? Tabelle nach Baujahr & Wohnfläche. Jetzt Wärmebedarf ermitteln.'
          },
          'oel-wechsel': {
              title: 'Ölheizung auf Flüssiggas umrüsten | Kosten & Förderung',
              desc: 'Wechsel von Öl auf Gas: Kosten, Förderung und Vorteile. Platz gewinnen & CO2 sparen. Jetzt Umstieg planen.',
              semantic: {
                  mentions: [{ name: 'Heizöl', wikidata: 'https://www.wikidata.org/wiki/Q901968' }]
              }
          },
          'notfall': {
              title: 'Flüssiggastank leer? Notdienst & Hilfe bei Heizungsausfall',
              desc: 'Kein Flüssiggas mehr? Unser Notdienst hilft sofort. Füllstand prüfen, Anlage entlüften & Express-Lieferung anfordern. 24h Erreichbarkeit.'
          },
          'preis-guide': {
              title: 'Flüssiggas Preis-Guide: Wann kaufen? | Gasmöller',
              desc: 'Der große Preis-Guide: Wann ist Flüssiggas am günstigsten? Saisonale Trends, Einflussfaktoren & Spartipps vom Experten.',
              date: `${CURRENT_YEAR}-01-25`
          },
          'qualitaets-check': {
              title: 'Flüssiggas Qualität: Propan DIN 51622 vs. Gemisch',
              desc: 'Warum reines Propan (DIN 51622) besser ist als Butan-Gemische. Heizwert, Wintertauglichkeit und Qualitätsunterschiede erklärt.',
              date: `${CURRENT_YEAR}-01-10`,
              semantic: {
                   about: [{ name: 'Propan', wikidata: 'https://www.wikidata.org/wiki/Q131349' }]
              }
          },
          'liefer-ablauf': {
              title: 'Ablauf der Flüssiggas-Lieferung | Schritt für Schritt',
              desc: 'Wie läuft die Gaslieferung ab? Terminierung, Anfahrt und Betankung. Alles aus einer Hand.',
              date: `${CURRENT_YEAR}-01-15`
          },
          'tank-leer': {
              title: 'Hilfe, Flüssiggastank leer! Was tun? | Notdienst & Tipps',
              desc: 'Heizung kalt? Wenn der Flüssiggastank leer ist: Notdienst rufen, Anlage entlüften und wie Sie Leerstände in Zukunft vermeiden.',
              date: `${CURRENT_YEAR}-01-05`
          },
          'sammelbestellung': {
              title: 'Flüssiggas Sammelbestellung | Nachbarn & Kosten sparen',
              desc: 'Gemeinsam tanken und sparen! Vorteile von Sammelbestellungen für Nachbarschaften. Günstigerer Literpreis & geteilte Anfahrt.',
              date: `${CURRENT_YEAR}-01-20`
          },
          'preise': {
              title: `Flüssiggaspreise 2026 | Aktuelle Entwicklung (Tabelle & Chart)`,
              desc: `Aktuelle Flüssiggaspreise 2026: Interaktive Tabelle & Chart zur Preisentwicklung. Prognosen, historische Daten und bester Kaufzeitpunkt im Vergleich.`,
              date: `2026-01-12`
          },
          'heizung': {
               title: `Heizungsgesetz (GEG) ${NEXT_YEAR} | Flüssiggas erlaubt?`,
               desc: `Was bedeutet das GEG ${NEXT_YEAR} für Flüssiggasheizungen? Bestandsschutz, 65%-Regel und Hybrid-Lösungen erklärt.`,
               date: `${CURRENT_YEAR}-01-15`,
               semantic: {
                   about: [{ name: 'Gebäudeenergiegesetz', wikidata: 'https://www.wikidata.org/wiki/Q1498376' }],
                   mentions: [{ name: 'Wärmepumpe', wikidata: 'https://www.wikidata.org/wiki/Q13636' }]
               }
          },
          'bio-fluessiggas': {
                title: 'Bio-Flüssiggas (Bio-LPG) | Klimaneutral Heizen',
                desc: 'Bio-Flüssiggas als Alternative. CO2-neutral heizen ohne Heizungstausch. Herstellung, Kosten & Verfügbarkeit.',
                semantic: {
                     about: [{ name: 'Bio-LPG', wikidata: 'https://www.wikidata.org/wiki/Q2452774' }]
                }
          },
          'fernwaerme-vergleich': {
               title: 'Fernwärme oder Flüssiggas? Vergleich & Anschlusszwang',
               desc: 'Kommunale Wärmeplanung: Droht der Anschlusszwang? Fernwärme vs. Flüssiggas im Kosten-Vergleich. Was Hausbesitzer wissen müssen.',
               date: `${CURRENT_YEAR}-03-10`,
               semantic: {
                   about: [{ name: 'Fernwärme', wikidata: 'https://www.wikidata.org/wiki/Q1447029' }],
                   mentions: [{ name: 'Kommunale Wärmeplanung', wikidata: 'https://www.wikidata.org/wiki/Q123018873' }]
               }
          }
      };

      if (knowledgeOverrides[slug]) {
          const override = knowledgeOverrides[slug];
          articleTitle = override.title;
          articleDesc = override.desc;
          if (override.date) dateModified = override.date;
      }

      const articleData = {
          headline: articleTitle.split('|')[0].trim(),
          image: DEFAULT_IMAGE,
          datePublished: "2023-01-01",
          dateModified: dateModified,
          description: articleDesc,
          url: `${BASE_URL}/wissen/${slug}`,
          about: knowledgeOverrides[slug]?.semantic?.about,
          mentions: knowledgeOverrides[slug]?.semantic?.mentions
      };

      const schemas = [
          getOrganizationSchema(),
          getBreadcrumbSchema([
              { name: 'Start', url: '/' },
              { name: 'Wissen', url: '/wissen' },
              { name: articleTitle.split('|')[0].trim(), url: `/wissen/${slug}` }
          ]),
          getDeepArticleSchema(articleData, getAuthorSchema(), {
              "@type": "Organization",
              "name": "Gas-Service Möller",
              "logo": {
                  "@type": "ImageObject",
                  "url": "https://gasmoeller.de/logos/logo-gasmoeller.png"
              }
          })
      ];

      // Add HowTo schema if defined in override
      if (knowledgeOverrides[slug] && knowledgeOverrides[slug].howTo) {
          schemas.push(getHowToSchema(knowledgeOverrides[slug].howTo.title, knowledgeOverrides[slug].howTo.steps));
      }

      return {
          ...defaultSeo,
          title: articleTitle.includes('|') ? articleTitle : `${articleTitle} | Wissen & Ratgeber | Gas-Service Möller`,
          description: articleDesc,
          schema: schemas
      };
  }

  // 4. Dynamic City Routes
  if (cleanPath.startsWith('liefergebiet/')) {
      const slug = cleanPath.split('/')[1];
      const city = cityData.find(c => c.slug === slug);
      if (city) {
          return {
              ...defaultSeo,
              title: `Flüssiggas ${city.name} | Günstig kaufen (vertragsfrei) & Anbieter`,
              description: `Ihr unabhängiger Flüssiggasanbieter für ${city.name} (${city.zip}). Flüssiggas günstig kaufen & Gastanks vertragsfrei erwerben. Preise vergleichen & sparen.`,
              schema: [
                  getOrganizationSchema(),
                  getCitySchema(city),
                  getBreadcrumbSchema([
                      { name: 'Start', url: '/' },
                      { name: 'Liefergebiet', url: '/liefergebiet/hamburg' },
                      { name: city.name, url: `/liefergebiet/${city.slug}` }
                  ])
              ]
          };
      }
  }

  // Default / Fallback
  return defaultSeo;
};
