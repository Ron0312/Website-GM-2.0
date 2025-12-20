import { tankDetails } from './tanks.js';
import { cityData } from './cityData.js';
import { CONTENT } from './content.js'; // Ensure content.js is importable here. If it uses JSX, we might have issues if node environment.
// Note: CONTENT uses lucide-react icons which might be an issue in plain Node.js if not transpiled.
// However, seoData.js is used by server.js which runs in Node.
// To satisfy the 'wissen' dynamic routes without breaking the server with JSX imports,
// we will assume a simple slug mapping or try to import it safely.
// Since CONTENT exports React components in 'content' field, we should be careful.
// Ideally, we replicate the list of articles here or refactor content.js to separate data from view.
// For now, I will use a helper function to create titles from slugs as a robust fallback
// if CONTENT cannot be imported easily in server context, OR try to filter it.

const BASE_URL = 'https://gasmoeller.de';
const DEFAULT_IMAGE = `${BASE_URL}/images/gas-order-hero.webp`;

// Simple slug to title formatter as fallback
const formatTitleFromSlug = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Structured Data Helpers
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Gas-Service Möller",
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
    "reviewCount": "124"
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
        "name": "Gas-Service Möller",
        "image": `${BASE_URL}/logos/logo-gasmoeller.png`,
        "telephone": "+49 176 416 84 326",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Neuenteichweg 7a",
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
    title: 'Gas-Service Möller | Ihr Partner für Flüssiggas & Tanks im Norden',
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
        title: 'Flüssiggas kaufen, Tanks & Service im Norden | Gas-Service Möller',
        description: 'Ihr unabhängiger Experte für Flüssiggas und Gastanks in Norddeutschland. Kaufen statt mieten: Sparen Sie bis zu 50% der Energiekosten. Jetzt anfragen!',
        schema: [getOrganizationSchema(), getWebSiteSchema()]
      };
    case 'tanks':
      return {
        ...defaultSeo,
        title: 'Flüssiggastank kaufen | Alle Größen (1.2t - 2.9t) | Gas-Service Möller',
        description: 'Flüssiggastanks kaufen statt mieten. Oberirdisch & unterirdisch. 1,2t, 2,1t, 2,9t. Inklusive Aufstellung & Prüfung. Jetzt Preisliste anfordern!',
        schema: [getOrganizationSchema(), getTankCatalogSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Tanks', url: '/tanks' }])]
      };
    case 'gas':
      return {
        ...defaultSeo,
        title: 'Flüssiggas Preise aktuell | Günstig bestellen | Gas-Service Möller',
        description: 'Aktuelle Flüssiggas-Preise für Norddeutschland. Bestellen Sie Ihr Gas flexibel & günstig beim freien Händler. 24h Express-Lieferung möglich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Flüssiggas', url: '/gas' }])]
      };
    case 'rechner':
        return {
            ...defaultSeo,
            title: 'Flüssiggas Rechner | Verbrauch & Kosten vergleichen | Gas-Service Möller',
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
        title: 'Flüssiggas für Gewerbe & Industrie | Großkunden | Gas-Service Möller',
        description: 'Maßgeschneiderte Energielösungen für Landwirtschaft, Industrie & Gewerbe. Prozesswärme, Hallenheizung & Staplergas. Zuverlässig & wirtschaftlich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Gewerbe', url: '/gewerbe' }])]
      };
     case 'wissen':
      return {
        ...defaultSeo,
        title: 'Wissen & Ratgeber Flüssiggas | Tipps & Infos | Gas-Service Möller',
        description: 'Alles was Sie über Flüssiggas wissen müssen. Ratgeber zu Tankgrößen, Prüfpflichten, Sicherheit & Installation. Expertentipps vom Fachmann.',
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
        description: 'Nehmen Sie Kontakt auf! Telefonisch, per E-Mail oder über unser Formular. Wir beraten Sie gerne zu Flüssiggas & Tanks. Kostenlos & unverbindlich.',
        schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Kontakt', url: '/kontakt' }])]
      };
    case 'pruefungen':
      return {
          ...defaultSeo,
          title: 'Tankprüfung & Wartung | TÜV & Sachkundigenprüfung | Gas-Service Möller',
          description: 'Innere & Äußere Prüfung für Ihren Flüssiggastank (2 & 10 Jahre). Rohrleitungsprüfung. Wir kümmern uns um alle gesetzlichen Wartungsintervalle.',
          schema: [getOrganizationSchema(), getBreadcrumbSchema([{ name: 'Start', url: '/' }, { name: 'Service', url: '/pruefungen' }])]
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
  if (path.startsWith('tanks/')) {
    const slug = path.split('/')[1];
    const tank = tankDetails.find(t => t.slug === slug);
    if (tank) {
      const tankImage = tank.image || DEFAULT_IMAGE;
      return {
        ...defaultSeo,
        title: `${tank.name} kaufen | ${tank.capacityL}L Flüssiggastank | Gas-Service Möller`,
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

  // 3. Dynamic Knowledge Routes
  if (path.startsWith('wissen/')) {
      const slug = path.split('/')[1];
      // Try to find title in CONTENT if possible, or fallback to formatter
      // Ideally we would import CONTENT but we want to avoid server crash if it has JSX.
      // We'll use a specific lookup or just format the slug for now to be safe and fast.
      // If we had a plain JSON for articles, we could import it.

      let articleTitle = formatTitleFromSlug(slug);
      let articleDesc = 'Detaillierter Ratgeber-Artikel von Gas-Service Möller.';

      // Specific overrides for known major articles if we want perfect titles without importing CONTENT
      if (slug === 'miete-kauf') {
          articleTitle = 'Gastank mieten oder kaufen? Der große Vergleich';
          articleDesc = 'Miete vs. Kauf: Was lohnt sich wirklich? Wir rechnen nach. Vor- und Nachteile, versteckte Kosten und Expertentipps für Ihre Entscheidung.';
      } else if (slug === 'sicherheit') {
          articleTitle = 'Sicherheit bei Flüssiggastanks';
          articleDesc = 'Wie sicher ist Flüssiggas? Alles zu Sicherheitsabständen, Schutzzonen und gesetzlichen Vorschriften für Ihren Gastank.';
      }

      return {
          ...defaultSeo,
          title: `${articleTitle} | Wissen & Ratgeber | Gas-Service Möller`,
          description: articleDesc,
          schema: [
              getOrganizationSchema(),
              getBreadcrumbSchema([
                  { name: 'Start', url: '/' },
                  { name: 'Wissen', url: '/wissen' },
                  { name: articleTitle, url: `/wissen/${slug}` }
              ]),
              {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": articleTitle,
                  "image": DEFAULT_IMAGE,
                  "author": {
                      "@type": "Organization",
                      "name": "Gas-Service Möller"
                  },
                  "publisher": {
                      "@type": "Organization",
                      "name": "Gas-Service Möller",
                      "logo": {
                          "@type": "ImageObject",
                          "url": "https://gasmoeller.de/logos/logo-gasmoeller.png"
                      }
                  },
                  "datePublished": "2023-01-01", // Placeholder, ideally dynamic
                  "description": articleDesc
              }
          ]
      };
  }

  // 4. Dynamic City Routes
  if (path.startsWith('liefergebiet/')) {
      const slug = path.split('/')[1];
      const city = cityData.find(c => c.slug === slug);
      if (city) {
          return {
              ...defaultSeo,
              title: `Flüssiggas & Tanks in ${city.name} kaufen | Gas-Service Möller`,
              description: `Ihr regionaler Partner für Flüssiggas in ${city.name} (${city.zip}). Gastank kaufen statt mieten. Günstige Preise, schnelle Lieferung & Service vor Ort.`,
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
