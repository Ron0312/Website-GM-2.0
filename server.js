import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import compression from 'compression'
import ejs from 'ejs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// --- INLINED DATA FOR PRODUCTION STABILITY (Phusion Passenger / No 'src' folder) ---

const tankDetails = [
    {
        slug: '1-2t-oberirdisch',
        name: '1,2 t Flüssiggastank (oberirdisch)',
        seoTitle: '1,2 t Flüssiggastank oberirdisch kaufen | Maße & Preis | gasmöller',
        seoDesc: 'Kleiner 1,2t Flüssiggastank (2700l) oberirdisch. Ideal für Ferienhäuser. Alle Maße, Daten & Preise. Jetzt Angebot anfordern!',
        capacity: '1,2 t', volume: '2.700 Liter', dimensions: '2,50 x 1,25 m', description: 'Der kompakte 1,2 t Flüssiggastank.'
    },
    {
        slug: '2-1t-oberirdisch',
        name: '2,1 t Flüssiggastank (oberirdisch)',
        seoTitle: '2,1 t Flüssiggastank oberirdisch | Standardgröße für EFH | gasmöller',
        seoDesc: '2,1t (4850l) Flüssiggastank oberirdisch kaufen. Der Standard für Einfamilienhäuser. Maße, Technische Daten & Installation.',
        capacity: '2,1 t', volume: '4.850 Liter', dimensions: '4,30 x 1,25 m', description: 'Unser Standard-Tank für das klassische Einfamilienhaus.'
    },
    {
        slug: '2-9t-oberirdisch',
        name: '2,9 t Flüssiggastank (oberirdisch)',
        seoTitle: '2,9 t Flüssiggastank oberirdisch | Großtank für Gewerbe | gasmöller',
        seoDesc: '2,9t (6400l) Flüssiggastank oberirdisch. Für MFH & Gewerbe. Maximale Kapazität. Alle technischen Daten hier.',
        capacity: '2,9 t', volume: '6.400 Liter', dimensions: '5,50 x 1,25 m', description: 'Der Maxi-Tank für Mehrfamilienhäuser.'
    },
    {
        slug: '1-2t-unterirdisch',
        name: '1,2 t Flüssiggastank (unterirdisch)',
        seoTitle: '1,2 t Flüssiggastank unterirdisch | Unsichtbar & Platzsparend',
        seoDesc: 'Unterirdischer 1,2t Tank (2700l). Perfekt für kleine Gärten. Verschwindet im Boden. Jetzt informieren & Angebot holen.',
        capacity: '1,2 t', volume: '2.700 Liter', dimensions: '2,50 x 1,25 m', description: 'Die unsichtbare Lösung für kleine Gärten.'
    },
    {
        slug: '2-1t-unterirdisch',
        name: '2,1 t Flüssiggastank (unterirdisch)',
        seoTitle: '2,1 t Flüssiggastank unterirdisch | Der Standard für EFH',
        seoDesc: '2,1t (4850l) Erdtank kaufen. Unsichtbare Energieversorgung für Ihr Einfamilienhaus. Maße & Einbau-Infos.',
        capacity: '2,1 t', volume: '4.850 Liter', dimensions: '4,30 x 1,25 m', description: 'Der beliebteste unterirdische Tank.'
    },
    {
        slug: '2-9t-unterirdisch',
        name: '2,9 t Flüssiggastank (unterirdisch)',
        seoTitle: '2,9 t Flüssiggastank unterirdisch | Großtank für Profis',
        seoDesc: '2,9t (6400l) Flüssiggastank für den Erdeinbau. Für Gewerbe & Mehrfamilienhäuser. Technische Daten & Preise.',
        capacity: '2,9 t', volume: '6.400 Liter', dimensions: '5,50 x 1,25 m', description: 'Maximale Energie, unsichtbar gelagert.'
    }
];

const seoData = {
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

const getSeoForPath = (path) => {
    if (path.startsWith('tanks/')) {
        const slug = path.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) return { title: tank.seoTitle, description: tank.seoDesc };
    }
    let section = 'start';
    if (path === '/' || path === '') section = 'start';
    else {
        // Strip leading slash
        let p = path.replace(/^\//, '');
        // Strip trailing slash
        p = p.replace(/\/$/, '');
        p = p.toLowerCase();
        if (seoData[p]) section = p;
    }
    return seoData[section] || seoData['start'];
};

const getSchemaForPath = (path) => {
    // Simplified base schema
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "GasStation",
        "name": "gasmöller GmbH",
        "url": "https://www.gasmoeller.de",
        "description": "Ihr unabhängiger Partner für Flüssiggas im Norden."
    };

    if (path.startsWith('tanks/')) {
        const slug = path.split('/')[1];
        const tank = tankDetails.find(t => t.slug === slug);
        if (tank) {
            return {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": tank.name,
                "description": tank.description,
                "brand": { "@type": "Brand", "name": "gasmöller" }
            };
        }
    }
    return baseSchema;
};

// --- SERVER SETUP ---

async function createServer() {
  const app = express()
  const port = process.env.PORT || 5173
  const isProd = process.env.NODE_ENV === 'production'

  let vite
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    app.use(compression())
    app.use(
      '/',
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false,
      })
    )
  }

  // Handle all routes
  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
        const seoInfo = getSeoForPath(url);
        const schemaJson = JSON.stringify(getSchemaForPath(url));
        const siteData = {
          title: seoInfo.title,
          description: seoInfo.description,
          content: '<!--app-html-->',
          schema: schemaJson
        }

      let template, render, templatePath

      if (!isProd) {
        templatePath = path.resolve(__dirname, 'views/index.ejs')
        template = fs.readFileSync(templatePath, 'utf-8')
        // Basic template replacement if EJS fails or for schema
        if (!template.includes('<!--schema-json-->')) {
             template = template.replace('</head>', '<script type="application/ld+json"><!--schema-json--></script></head>');
        }
        // EJS Render
        template = ejs.render(template, siteData)
        // Manual Schema Injection
        template = template.replace('<!--schema-json-->', siteData.schema);
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        template = fs.readFileSync(templatePath, 'utf-8')

        // Production replacements
        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        template = template.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${siteData.description}"`);
        if (!template.includes('<script type="application/ld+json">')) {
             template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);
        }
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { html } = render(url)
      const htmlResponse = template.replace('<!--app-html-->', html)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlResponse)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end('Internal Server Error')
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()
