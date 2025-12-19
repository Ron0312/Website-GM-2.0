import { tankDetails } from './tanks.js';
import { cityData } from './cityData.js';

const BASE_URL = 'https://fluessiggas-onnet.de';
const DEFAULT_IMAGE = `${BASE_URL}/images/gas-order-hero.webp`;

// Structured Data Helpers
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Flüssiggas on Net",
  "image": [
    "https://fluessiggas-onnet.de/logos/logo.png",
    "https://fluessiggas-onnet.de/images/gas-order-hero.webp"
  ],
  "url": "https://fluessiggas-onnet.de",
  "telephone": "+49 381 36779809",
  "email": "support@fluessiggas-onnet.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Am Markt 9",
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
    "reviewCount": "124"
  },
  "sameAs": [
    "https://www.facebook.com/people/Flüssiggas-on-Net/100083286084666/",
    "https://www.linkedin.com/company/Flüssiggas-on-Net"
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
  "logo": "https://fluessiggas-onnet.de/logos/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49 381 36779809",
    "contactType": "customer service",
    "areaServed": "DE",
    "availableLanguage": "German"
  },
  "knowsAbout": [
    "Flüssiggas",
    "Gastanks",
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
    "name": "Flüssiggas on Net",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://fluessiggas-onnet.de/suche?q={search_term_string}"
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
    "name": "Flüssiggas on Net"
  },
  "sku": `TANK-${tank.slug.toUpperCase()}`,
  "mpn": `GSM-${tank.slug.toUpperCase()}`,
  "offers": {
    "@type": "Offer",
    "url": `${BASE_URL}/tanks/${tank.slug}`,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
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
       "url": `${BASE_URL}/tanks/${tank.slug}`
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
        "name": "Flüssiggas on Net",
        "image": `${BASE_URL}/logos/logo.png`,
        "telephone": "+49 381 36779809",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Am Markt 9",
            "addressLocality": "Schieren",
            "postalCode": "23795",
            "addressCountry": "DE"
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
    "description": `Günstiges Flüssiggas und Gastanks für ${city.name} und Umgebung. Lieferung, Aufstellung und Service aus einer Hand.`,
    "name": `Flüssiggas & Tanks in ${city.name}`
});

export const getSchemaForPath = (path) => {
   const seo = getSeoForPath(path);
   return seo.schema;
};

export const getSeoForPath = (path) => {
  const defaultSeo = {
    title: 'Flüssiggas on Net | Ihr Partner für Flüssiggas & Tanks im Norden',
    description: 'Flüssiggas kaufen, Gastanks mietfrei erwerben & erstklassiger Service. Wir beliefern Norddeutschland zuverlässig & günstig. Jetzt Angebot anfordern!',
    image: DEFAULT_IMAGE,
    type: 'website',
    url: `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`,
    schema: [getOrganizationSchema(), getWebSiteSchema()]
  };

  // 1. Static Routes
  switch (path) {
    case 'start':
    case '/':
      return {
        ...defaultSeo,
        title: 'Flüssiggas kaufen, Tanks & Service im Norden | Flüssiggas on Net',
        description: 'Ihr unabhängiger Experte für Flüssiggas und Gastanks in Norddeutschland. Kaufen statt mieten: Sparen Sie bis zu 50% der Energiekosten. Jetzt anfragen!',
        schema: [getOrganizationSchema(), getWebSiteSchema()]
      };
    case 'tanks':
      return {
        ...defaultSeo,
        title: 'Flüssiggastank kaufen | Alle Größen (1.2t - 2.9t) | Flüssiggas on Net',
        description: 'Flüssiggastanks kaufen statt mieten. Oberirdisch & unterirdisch. 1,2t, 2,1t, 2,9t. Inklusive Aufstellung & Prüfung. Jetzt Preisliste anfordern!',
        schema: [getOrganizationSchema(), getTankCatalogSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Tanks', url: '/tanks' }])]
      };
    case 'gas':
      return {
        ...defaultSeo,
        title: 'Flüssiggas Preise aktuell | Günstig bestellen | Flüssiggas on Net',
        description: 'Aktuelle Flüssiggas-Preise für Norddeutschland. Bestellen Sie Ihr Gas flexibel & günstig beim freien Händler. 24h Express-Lieferung möglich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Flüssiggas', url: '/gas' }])]
      };
    case 'rechner':
        return {
            ...defaultSeo,
            title: 'Flüssiggas Rechner | Verbrauch & Kosten vergleichen | Flüssiggas on Net',
            description: 'Berechnen Sie Ihre Ersparnis! Vergleichsrechner: Flüssiggas vs. Öl, Holz, Pellets & Erdgas. Jetzt Umstieg prüfen und Kosten senken.',
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
        title: 'Flüssiggas für Gewerbe & Industrie | Großkunden | Flüssiggas on Net',
        description: 'Maßgeschneiderte Energielösungen für Landwirtschaft, Industrie & Gewerbe. Prozesswärme, Hallenheizung & Staplergas. Zuverlässig & wirtschaftlich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Gewerbe', url: '/gewerbe' }])]
      };
     case 'wissen':
      return {
        ...defaultSeo,
        title: 'Wissen & Ratgeber Flüssiggas | Tipps & Infos | Flüssiggas on Net',
        description: 'Alles was Sie über Flüssiggas wissen müssen. Ratgeber zu Tankgrößen, Prüfpflichten, Sicherheit & Installation. Expertentipps vom Fachmann.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Wissen', url: '/wissen' }])]
      };
    case 'ueber-uns':
      return {
        ...defaultSeo,
        title: 'Über Uns | Flüssiggas on Net | Ihr Team im Norden',
        description: 'Lernen Sie uns kennen: Das Team von Flüssiggas on Net. Seit 2000 Ihr verlässlicher Partner in Mecklenburg-Vorpommern, Hamburg & MV.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Über Uns', url: '/ueber-uns' }])]
      };
    case 'kontakt':
      return {
        ...defaultSeo,
        title: 'Kontakt | Angebot anfordern | Flüssiggas on Net',
        description: 'Nehmen Sie Kontakt auf! Telefonisch, per E-Mail oder über unser Formular. Wir beraten Sie gerne zu Flüssiggas & Tanks. Kostenlos & unverbindlich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Kontakt', url: '/kontakt' }])]
      };
    case 'pruefungen':
      return {
          ...defaultSeo,
          title: 'Tankprüfung & Wartung | TÜV & Sachkundigenprüfung | Flüssiggas on Net',
          description: 'Innere & Äußere Prüfung für Ihren Flüssiggastank (2 & 10 Jahre). Rohrleitungsprüfung. Wir kümmern uns um alle gesetzlichen Wartungsintervalle.',
          schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Service', url: '/pruefungen' }])]
      };
    case 'barrierefreiheit':
        return {
            ...defaultSeo,
            title: 'Barrierefreiheitserklärung | Flüssiggas on Net',
            description: 'Erklärung zur Barrierefreiheit gemäß BITV 2.0. Wir bemühen uns um eine zugängliche Webseite für alle Nutzer.',
            schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Barrierefreiheit', url: '/barrierefreiheit' }])]
        };
     case '404':
        return {
            ...defaultSeo,
            title: 'Seite nicht gefunden (404) | Flüssiggas on Net',
            description: 'Die angeforderte Seite existiert leider nicht. Nutzen Sie unser Menü oder kontaktieren Sie uns direkt.',
            schema: [getOrganizationSchema()]
        };
  }

  // 2. Dynamic Tank Routes
  if (path.startsWith('tanks/')) {
    const slug = path.split('/')[1];
    const tank = tankDetails.find(t => t.slug === slug);
    if (tank) {
      // Find specific tank image if available in tank data, else fallback
       // Note: In a real scenario, tank object should have an 'image' property.
       // Assuming tank.image is the path e.g. /images/tanks/1-2t.webp
      const tankImage = tank.image || DEFAULT_IMAGE;

      return {
        ...defaultSeo,
        title: `${tank.name} kaufen | ${tank.capacityL}L Flüssiggastank | Flüssiggas on Net`,
        description: `Kaufen Sie den ${tank.name} (${tank.capacityL} Liter). ${tank.installation === 'oberirdisch' ? 'Oberirdische' : 'Unterirdische'} Installation. Ideal für Einfamilienhäuser. Jetzt Angebot sichern!`,
        image: tankImage,
        schema: [
            getOrganizationSchema(),
            getTankProductSchema(tank),
            getBreadcrumbSchema([
                { name: 'Start', url: '/' },
                { name: 'Tanks', url: '/tanks' },
                { name: tank.name, url: `/tanks/${tank.slug}` }
            ])
        ]
      };
    }
  }

  // 3. Dynamic City Routes
  if (path.startsWith('liefergebiet/')) {
      const slug = path.split('/')[1];
      const city = cityData.find(c => c.slug === slug);
      if (city) {
          return {
              ...defaultSeo,
              title: `Flüssiggas & Tanks in ${city.name} kaufen | Flüssiggas on Net`,
              description: `Ihr regionaler Partner für Flüssiggas in ${city.name} (${city.zip}). Gastank kaufen statt mieten. Günstige Preise, schnelle Lieferung & Service vor Ort.`,
              schema: [
                  getOrganizationSchema(),
                  getCitySchema(city),
                  getBreadcrumbSchema([
                      { name: 'Start', url: '/' },
                      { name: 'Liefergebiet', url: '/liefergebiet/hamburg' }, // Just a placeholder parent or maybe distinct page? Keeping it simple.
                      { name: city.name, url: `/liefergebiet/${city.slug}` }
                  ])
              ]
          };
      }
  }

  // Default / Fallback
  return defaultSeo;
};
