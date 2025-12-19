import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Logger } from './src/utils/logger.js'
import { cityData } from './src/data/cityData.js'

// Prevent crash on unhandled exceptions
process.on('uncaughtException', (err) => {
  Logger.error('UNCAUGHT EXCEPTION', err);
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('UNHANDLED REJECTION', reason);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Standard Express Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // Limit each IP to 2000 requests per windowMs (Vite dev needs high limits)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
        // Skip static assets from rate limiting
        return !!req.url.match(/\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|woff|woff2)$/);
    },
    handler: (req, res, next, options) => {
        Logger.warn('Rate limit exceeded', { ip: req.ip });
        res.status(options.statusCode).send(options.message);
    }
});

// Custom Logger Middleware
function requestLogger(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logEntry = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress
        };
        // Log all requests as info
        // Filter out frequent health checks or static assets if needed to reduce noise
        if (res.statusCode >= 400) {
             Logger.warn(`Request Error ${res.statusCode}`, logEntry);
        } else {
             // Optional: Uncomment for full request logging
             // Logger.info('Request', logEntry);
        }
    });
    next();
}

async function createServer() {
  const app = express()
  const port = process.env.PORT || 5173

  let isProd = process.env.NODE_ENV === 'production'

  Logger.info(`Starting server. Initial mode: ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`);

  // Canonical Redirect (www -> non-www, http -> https is handled by HSTS)
  app.use((req, res, next) => {
      if (req.headers.host && req.headers.host.startsWith('www.')) {
          const newHost = req.headers.host.slice(4);
          return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
      }
      next();
  });

  // Apply Rate Limiter and Logger
  app.use(requestLogger);
  app.use(limiter);

  // Helmet Security Headers
  app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: isProd
                ? ["'self'", "https://api.web3forms.com"]
                : ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://api.web3forms.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "data:"],
            imgSrc: ["'self'", "data:", "https://api.web3forms.com"],
            connectSrc: isProd
                ? ["'self'", "https://api.web3forms.com"]
                : ["'self'", "https://api.web3forms.com", "ws:", "wss:"],
            frameSrc: ["'self'", "https://www.google.com", "https://www.youtube.com"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'", "https://api.web3forms.com"],
            upgradeInsecureRequests: isProd ? [] : null // Only upgrade in Prod
        },
    },
    crossOriginEmbedderPolicy: false, // Often causes issues with images/scripts if not configured perfectly
    strictTransportSecurity: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
    },
    xContentTypeOptions: true,
    xDnsPrefetchControl: { allow: true }
  }));

  // Extra headers not fully covered by default Helmet or custom preferences
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    next();
  });

  // Valid Routes Configuration
  const staticRoutes = [
      '', 'tanks', 'gas', 'rechner', 'gewerbe',
      'wissen', 'ueber-uns', 'kontakt', 'pruefungen', 'barrierefreiheit', '404',
      'sitemap.xml', 'robots.txt'
  ];

  const tankSlugs = [
    '1-2t-oberirdisch',
    '2-1t-oberirdisch',
    '2-9t-oberirdisch',
    '1-2t-unterirdisch',
    '2-1t-unterirdisch',
    '2-9t-unterirdisch'
  ];

  // Dynamic Sitemap Generation (Fail-safe)
  const generateSitemapXml = () => {
      const SITE_URL = 'https://fluessiggas-onnet.de'; // Enforce non-www
      const routes = [...staticRoutes.filter(r => r !== '404' && r !== 'sitemap.xml' && r !== 'robots.txt')]; // Exclude technical routes from sitemap
      tankSlugs.forEach(slug => routes.push(`tanks/${slug}`));
      cityData.forEach(city => routes.push(`liefergebiet/${city.slug}`));

      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : (route.startsWith('liefergebiet/') ? '0.7' : '0.8')}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  // Helper to serve file or fallback to generator
  const serveOrGenerate = (res, filename, contentType, generator) => {
    const pathsToCheck = [
      path.resolve(process.cwd(), filename),
      path.resolve(__dirname, filename),
      path.resolve(__dirname, 'dist/client', filename),
      path.resolve(__dirname, 'public', filename)
    ]

    for (const filePath of pathsToCheck) {
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath)
          res.setHeader('Content-Type', contentType)
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
          res.send(content)
          return true
        } catch (e) {
          Logger.error(`Error serving ${filename} from ${filePath}:`, e)
        }
      }
    }

    if (generator) {
        try {
            const content = generator();
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.send(content);
            Logger.info(`Generated ${filename} dynamically.`);
            return true;
        } catch (e) {
            Logger.error(`Error generating ${filename}:`, e);
        }
    }
    return false
  }

  // Explicitly serve sitemap.xml - MOVED TO TOP to prevent Redirect/SSR interference
  app.get('/sitemap.xml', (req, res) => {
    if (!serveOrGenerate(res, 'sitemap.xml', 'application/xml', generateSitemapXml)) {
        res.status(404).send('Sitemap not found')
    }
  })

  // Explicitly serve robots.txt - MOVED TO TOP
  app.get('/robots.txt', (req, res) => {
    if (!serveOrGenerate(res, 'robots.txt', 'text/plain', null)) {
        res.status(404).send('Robots.txt not found')
    }
  })


  // Legacy Redirects Map (Specific overrides)
  const legacyRedirects = {
    '/fluessiggastank': '/tanks',
    '/fluessiggas': '/gas',
  };

  // Smart Redirect Logic
  const findRedirect = (pathStr) => {
    // Robustness: Handle non-string inputs
    if (!pathStr || typeof pathStr !== 'string') return null;

    let p = pathStr;

    // Attempt to decode URI if it looks encoded, but safely
    try {
        if (p.includes('%')) {
            p = decodeURIComponent(p);
        }
    } catch (e) {
        // Fallback to original path if decode fails
        Logger.warn('Failed to decode path:', { pathStr });
    }

    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }

    // Normalize to lowercase
    p = p.toLowerCase();

    // Strip common legacy extensions (.php, .html, .htm)
    p = p.replace(/\.(php|html|htm)$/, '');

    // 1. Check Legacy Map
    // Check exact match after stripping extension
    if (legacyRedirects[p]) return legacyRedirects[p];
    // Check with slash if missing (legacy map has keys with leading slash)
    if (!p.startsWith('/') && legacyRedirects['/' + p]) return legacyRedirects['/' + p];

    // Check normalized version (replacing umlauts with ae, oe, ue, ss)
    // This helps if the map uses 'ue' but the URL uses 'ü'
    const pNorm = p.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    if (legacyRedirects[pNorm]) return legacyRedirects[pNorm];
    if (!pNorm.startsWith('/') && legacyRedirects['/' + pNorm]) return legacyRedirects['/' + pNorm];


    // 2. Tank Logic
    // Check both raw and normalized for keywords
    const isTank = p.includes('tank') || p.includes('behaelter') || p.includes('behälter') || pNorm.includes('tank');
    const isOberirdisch = p.includes('oberirdisch') || pNorm.includes('oberirdisch');
    const isUnterirdisch = p.includes('unterirdisch') || pNorm.includes('unterirdisch');

    let size = null;
    if (p.match(/(1\.2|1,2|12)t/) || p.includes('2700')) size = '1-2t';
    if (p.match(/(2\.1|2,1|21)t/) || p.includes('4850')) size = '2-1t';
    if (p.match(/(2\.9|2,9|29)t/) || p.includes('6400')) size = '2-9t';

    if (size) {
        if (isOberirdisch) return `/tanks/${size}-oberirdisch`;
        if (isUnterirdisch) return `/tanks/${size}-unterirdisch`;
    }

    // Fallback for general Tank intents
    if (isTank && (p.includes('kaufen') || p.includes('mieten') || p.includes('preis') || p.includes('angebot'))) return '/tanks';

    // 3. Gas Logic
    if (p.includes('gas') && (p.includes('bestellen') || p.includes('liefern') || p.includes('preis'))) return '/gas';

    // 4. Knowledge / Content
    if (p.includes('wissen') || p.includes('ratgeber') || p.includes('faq') || p.includes('frage') || p.includes('was-ist') || p.includes('umruesten') || p.includes('umrüsten') || pNorm.includes('umruesten')) return '/wissen';

    // 5. Service / Inspections
    if (p.includes('pruefung') || p.includes('prüfung') || p.includes('vorschriften') || pNorm.includes('pruefung')) return '/pruefungen';

    // 6. Legal / Home
    if (p.includes('impressum') || p.includes('datenschutz') || p.includes('agb')) return '/';

    return null;
  };

  app.use((req, res, next) => {
    try {
        let normalizedPath = req.path;

        // Safety check for malformed requests where path might be undefined/null
        if (!normalizedPath) return next();

        // Use try-catch for decodeURIComponent just in case Express didn't catch a really bad one
        try {
            if (normalizedPath.includes('%')) {
                normalizedPath = decodeURIComponent(normalizedPath);
            }
        } catch (e) {
            // ignore
        }

        if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
          normalizedPath = normalizedPath.slice(0, -1);
        }

        // Check if the path is a valid static route
        const cleanPath = normalizedPath.replace(/^\//, '');
        if (staticRoutes.includes(cleanPath)) {
            return next();
        }

        // Check if the path is a valid tank route
        if (cleanPath.startsWith('tanks/')) {
            const slug = cleanPath.split('/')[1];
            if (tankSlugs.includes(slug)) {
                return next();
            }
        }

        // Check if the path is a valid city route
        if (cleanPath.startsWith('liefergebiet/')) {
            const slug = cleanPath.split('/')[1];
            if (cityData.some(c => c.slug === slug)) {
                return next();
            }
        }

        // Exclude resource paths from redirect logic to prevent false positives (e.g. FAQ.jsx -> /wissen)
        if (
            normalizedPath.startsWith('/src/') ||
            normalizedPath.startsWith('/node_modules/') ||
            normalizedPath.startsWith('/@') ||
            normalizedPath.startsWith('/logos/') ||
            normalizedPath.startsWith('/images/') ||
            normalizedPath.startsWith('/assets/')
        ) {
            return next();
        }

        // Not a valid known route, try to redirect
        // We pass the RAW req.path to findRedirect to let it handle decoding logic
        // explicitly, but we also pass normalizedPath if needed.
        // Actually, findRedirect logic is robust enough now.
        const target = findRedirect(req.path);

        // Prevent redirect loops
        // Check if target matches the current clean path
        const cleanTarget = target ? target.replace(/^\//, '') : '';

        if (target && cleanTarget !== cleanPath && target !== req.originalUrl) {
             Logger.info(`Redirecting: ${req.url} -> ${target}`);
             return res.redirect(301, target);
        }
        next();
    } catch (err) {
        // Log the error but do NOT crash. Pass to next middleware (likely 404/SSR)
        Logger.error('Redirect Middleware Error:', err);
        next();
    }
  });

  let vite
  if (!isProd) {
    try {
        const { createServer: createViteServer } = await import('vite')
        vite = await createViteServer({
          root: process.cwd(),
          server: { middlewareMode: true },
          appType: 'custom'
        })
        app.use(vite.middlewares)
    } catch (e) {
        Logger.error('Failed to load Vite in development mode:', e);
        Logger.warn('Switching to PRODUCTION mode due to missing Vite.');
        // If we can't load vite (e.g. in production environment), switch to prod mode
        isProd = true;
    }
  }

  // Note: We don't use 'else' here because isProd might have changed in the catch block above
  if (isProd) {
    app.use(compression())

    // Static assets
    app.use(
      '/',
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false,
      })
    )
  }

  // Import SEO Data
  // Wrapped in try-catch to prevent startup crash if file missing
  let getSeoForPath, getSchemaForPath;
  try {
     const seoModule = await import('./src/data/seoData.js');
     getSeoForPath = seoModule.getSeoForPath;
     getSchemaForPath = seoModule.getSchemaForPath;
  } catch (err) {
      Logger.error('Failed to load SEO Data:', err);
      // Fallback mocks
      getSeoForPath = () => ({ title: 'Flüssiggas on Net', description: '', image: '', url: '' });
      getSchemaForPath = () => ({});
  }

  app.use(async (req, res) => {
    const url = req.originalUrl

    // Fail-safe fallback in case app.get missed it (unlikely with strict routing)
    if (url === '/sitemap.xml') {
         if (serveOrGenerate(res, 'sitemap.xml', 'application/xml', generateSitemapXml)) return;
    }

    try {
        let tryFile;
        if (url === '/') {
            tryFile = 'index.html';
        } else if (url.endsWith('/')) {
            tryFile = url + 'index.html';
        } else if (path.extname(url)) {
            // It has an extension (e.g. sitemap.xml, robots.txt), keep it
            tryFile = url;
        } else {
            // It's a route (e.g. /gas), append .html
            tryFile = url + '.html';
        }

        if (isProd) {
            const possibleStaticPath = path.join(__dirname, 'dist/client', tryFile.replace(/^\//, ''));
            if (fs.existsSync(possibleStaticPath)) {
                return res.sendFile(possibleStaticPath);
            }
        }

        // Determine SEO Data based on URL
        let seoInfo;
        let schemaJson;
        try {
            seoInfo = getSeoForPath(url);
            schemaJson = JSON.stringify(getSchemaForPath(url));
        } catch (err) {
            Logger.error('SEO Data Error:', err);
            seoInfo = {
                title: 'Flüssiggas on Net',
                description: '',
                image: '',
                url: '',
                type: 'website'
            };
            schemaJson = '{}';
        }

    const isHomePage = url === '/' || url === '/index.html';
    const preloadLink = isHomePage ? '<link rel="preload" as="image" href="/images/gas-order-hero.webp" fetchpriority="high">' : '';

    const metaTags = `
    ${preloadLink}
    <meta property="og:type" content="${seoInfo.type || 'website'}" />
    <meta property="og:title" content="${seoInfo.title}" />
    <meta property="og:description" content="${seoInfo.description}" />
    <meta property="og:url" content="${seoInfo.url}" />
    <meta property="og:image" content="${seoInfo.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoInfo.title}" />
    <meta name="twitter:description" content="${seoInfo.description}" />
    <meta name="twitter:image" content="${seoInfo.image}" />
    <link rel="canonical" href="${seoInfo.url}" />
    `;

    const siteData = {
      title: seoInfo.title,
      description: seoInfo.description,
      content: '<!--app-html-->',
      schema: schemaJson,
      metaTags: metaTags
    }

      let template, render, templatePath

      if (!isProd) {
        templatePath = path.resolve(__dirname, 'views/index.ejs')
        if (fs.existsSync(templatePath)) {
             template = fs.readFileSync(templatePath, 'utf-8')
        } else {
            template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        }

        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }
        template = template.replace('</head>', `${siteData.metaTags}</head>`);
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);

        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        templatePath = path.resolve(__dirname, 'dist/client/index.html')
        // In production, index.html might not be used directly if we serve pre-rendered files,
        // but for dynamic routes (or if pre-rendering is missed) we use it as template.
        if (fs.existsSync(templatePath)) {
             template = fs.readFileSync(templatePath, 'utf-8')
        } else {
             // Fallback if dist/client/index.html is missing (rare in prod)
             throw new Error('Production index.html not found');
        }

        // Load SSR entry
        render = (await import('./dist/server/entry-server.js')).render

        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }
        template = template.replace('</head>', `${siteData.metaTags}</head>`);
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);
      }

      // Context object for SSR to communicate status/redirects
      const context = {};
      const { html } = render(url, context);

      if (context.url) {
        return res.redirect(context.status || 302, context.url);
      }

      if (context.status === 404) {
          res.status(404);
      }

      const htmlResponse = template.replace('<!--app-html-->', html)
      res.status(context.status || 200).set({ 'Content-Type': 'text/html' }).end(htmlResponse)
    } catch (e) {
      // Emergency Error Handling: Redirect to Home or serve a safe error message
      Logger.error('CRITICAL SSR ERROR:', e);
      if (process.env.NODE_ENV === 'production' || isProd) {
         // Avoid infinite redirect loops
         if (url === '/' || url.includes('error=server_error')) {
             return res.status(500).send(`
                <!DOCTYPE html>
                <html>
                <head><title>Server Error</title></head>
                <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                    <h1>Wartungsarbeiten</h1>
                    <p>Die Anwendung ist momentan nicht erreichbar. Bitte versuchen Sie es später erneut.</p>
                </body>
                </html>
             `);
         }

         // In production, try to redirect to Home with error flag
         try {
             return res.redirect(302, '/?error=server_error');
         } catch (redirErr) {
             Logger.error('Failed to redirect after error:', redirErr);
         }
      }

      if (!isProd && vite) vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  // Global Error Handler (Last resort for sync errors)
  app.use((err, req, res, next) => {
    Logger.error('Unhandled Global Error:', err);
    if (!res.headersSent) {
         if (process.env.NODE_ENV === 'production' || isProd) {
            if (req.url.includes('error=')) {
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect(302, '/?error=global_crash');
            }
         } else {
            res.status(500).send('Internal Server Error: ' + err.message);
         }
    }
  });

  const server = app.listen(port, () => {
    Logger.info(`Server started at http://localhost:${port}`)
  })

  // Graceful Shutdown
  const shutdown = () => {
      Logger.info('Received kill signal, shutting down gracefully');
      server.close(() => {
          Logger.info('Closed out remaining connections');
          process.exit(0);
      });

      // Force close after 10s
      setTimeout(() => {
          Logger.error('Could not close connections in time, forcefully shutting down');
          process.exit(1);
      }, 10000);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

createServer()
