import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Logger } from './src/utils/logger.js'
import { cityData } from './src/data/cityData.js'
import { tankDetails } from './src/data/tanks.js'

// Prevent crash on unhandled exceptions
process.on('uncaughtException', (err) => {
  Logger.error('UNCAUGHT EXCEPTION', err);
});

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('UNHANDLED REJECTION', reason);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Helper to extract knowledge IDs from JSX content
// We read this once at startup to avoid FS I/O on every request
let knowledgeSlugs = new Set();
try {
    const contentPath = path.resolve(__dirname, 'src/data/content.jsx');
    if (fs.existsSync(contentPath)) {
        const content = fs.readFileSync(contentPath, 'utf-8');
        const idRegex = /id:\s*['"]([^'"]+)['"]/g;
        let match;
        const ids = [];
        while ((match = idRegex.exec(content)) !== null) {
            ids.push(match[1]);
        }
        const categoryIds = ['tank-technik', 'heizung', 'gewerbe', 'service', 'basis'];
        // Use Set for O(1) lookups in routing middleware
        knowledgeSlugs = new Set(ids.filter(id => !categoryIds.includes(id)));
        Logger.info(`Loaded ${knowledgeSlugs.size} knowledge articles.`);
    }
} catch (e) {
    Logger.warn('Failed to load knowledge slugs:', e.message);
}

// Verify cityData loading
try {
    if (cityData && Array.isArray(cityData)) {
        Logger.info(`Loaded ${cityData.length} cities.`);
    } else {
        Logger.error('FAILED TO LOAD CITYDATA: Not an array or undefined');
    }
} catch (e) {
    Logger.error('Error checking cityData:', e);
}

/**
 * Validates Environment Variables at Startup
 */
function validateEnv() {
    // Placeholder
}
validateEnv();

// --- Rate Limiters ---

// Global Limiter (GET requests, static assets, etc.)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // Generous limit for normal navigation
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip static assets from rate limiting
        return !!req.url.match(/\.(js|css|png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|avif|ttf|eot)$/);
    },
    handler: (req, res, next, options) => {
        Logger.warn('Global rate limit exceeded', { ip: req.ip });
        res.status(options.statusCode).send(options.message);
    }
});

// Stricter Limiter for POST requests (Forms)
const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit form submissions per IP
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        Logger.warn('POST rate limit exceeded', { ip: req.ip });
        res.status(options.statusCode).send("Zu viele Anfragen. Bitte versuchen Sie es später erneut.");
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
        if (res.statusCode >= 400) {
             Logger.warn(`Request Error ${res.statusCode}`, logEntry);
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

  // Hreflang Header
  app.use((req, res, next) => {
      // Basic Hreflang header for DE
      res.setHeader('Link', `<https://gasmoeller.de${req.path}>; rel="alternate"; hreflang="de-DE"`);
      next();
  });

  // Apply Global Limiter and Logger
  app.use(requestLogger);
  app.use(globalLimiter);

  // Apply Stricter Limit for POST
  app.use((req, res, next) => {
      if (req.method === 'POST') {
          return postLimiter(req, res, next);
      }
      next();
  });

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
            upgradeInsecureRequests: isProd ? [] : null
        },
    },
    crossOriginEmbedderPolicy: false,
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

  // Extra headers
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    next();
  });

  // Valid Routes Configuration
  const staticRoutes = new Set([
      '',
      'fluessiggastank-kaufen', // New Speaking URL
      'fluessiggas-bestellen',  // New Speaking URL
      'tanks', 'gas', // Legacy (should be redirected, but kept here to avoid immediate 404 before middleware)
      'rechner', 'gewerbe',
      'wissen', 'ueber-uns', 'kontakt', 'pruefungen', 'barrierefreiheit', '404',
      'sitemap.xml', 'robots.txt'
  ]);

  const tankSlugs = new Set(tankDetails.map(t => t.slug));

  // Optimized O(1) lookup for city routing
  const citySlugs = new Set(cityData.map(c => c.slug));

  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
  };

  /**
   * Generates sitemap.xml dynamically
   * @returns {string} XML Content
   */
  const generateSitemapXml = () => {
      const SITE_URL = 'https://gasmoeller.de';
      // Filter out legacy routes from sitemap
      const routes = [...Array.from(staticRoutes).filter(r =>
          r !== '404' &&
          r !== 'sitemap.xml' &&
          r !== 'robots.txt' &&
          r !== 'tanks' &&
          r !== 'gas'
      )];
      tankSlugs.forEach(slug => routes.push(`fluessiggastank-kaufen/${slug}`));
      citySlugs.forEach(slug => routes.push(`liefergebiet/${slug}`));
      knowledgeSlugs.forEach(slug => routes.push(`wissen/${slug}`));

      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${escapeXml(`${SITE_URL}/${route}`)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : (route.startsWith('liefergebiet/') ? '0.7' : (route.startsWith('wissen/') ? '0.8' : '0.9'))}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  /**
   * Helper to serve file or fallback to generator
   * @param {Response} res Express response object
   * @param {string} filename Filename to serve
   * @param {string} contentType Content type header
   * @param {Function} generator Generator function if file missing
   */
  const serveOrGenerate = async (res, filename, contentType, generator) => {
    const pathsToCheck = [
      path.resolve(process.cwd(), filename),
      path.resolve(__dirname, filename),
      path.resolve(__dirname, 'dist/client', filename),
      path.resolve(__dirname, 'public', filename)
    ]

    // Parallel check for file existence (and ensure it's a file)
    const existences = await Promise.all(pathsToCheck.map(async (filePath) => {
        try {
            const stats = await fs.promises.stat(filePath);
            return stats.isFile();
        } catch {
            return false;
        }
    }));

    // Find first existing path in priority order
    const existingIndex = existences.indexOf(true);

    if (existingIndex !== -1) {
        const filePath = pathsToCheck[existingIndex];
        return new Promise((resolve) => {
            res.sendFile(filePath, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
                }
            }, (err) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
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



  // Legacy Redirects Map (Specific overrides)
  // Converted to Map for O(1) lookup
  const legacyRedirects = new Map([
    ['/impressum-2', '/'],
    ['/impressum', '/'],
    ['/datenschutzerklaerung-eu', '/'],
    ['/allgemeine-geschaeftsbediungungen', '/'],
    ['/haftungsausschluss', '/'],
    ['/cookie-richtlinie-eu', '/'],
    ['/sonderpreise-und-entsorgung', '/fluessiggastank-kaufen'],

    // Tank Redirects to New URL Structure
    ['/flussiggastank-oberirdisch-4850l-21t-fassungsvermogen', '/fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t'],
    ['/fluessiggastank-oberirdisch-4850l-21t-fassungsvermoegen', '/fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t'],
    ['/fluessiggastank-unterirdisch-4850l-21t-fassungsvermoegen', '/fluessiggastank-kaufen/fluessiggastank-4850l-unterirdisch-2-1t'],
    ['/fluessiggastank-unterirdisch-2700l-12t-fassungsvermoegen', '/fluessiggastank-kaufen/fluessiggastank-2700l-unterirdisch-1-2t'],
    ['/flussiggastank-oberirdisch-6400l', '/fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t'],
    ['/fluessiggastank-oberirdisch-6400l', '/fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t'],
    ['/fluessiggastank-unterirdisch-6400l-29t-fassungsvermoegen', '/fluessiggastank-kaufen/fluessiggastank-6400l-unterirdisch-2-9t'],
    ['/flussiggastank-oberirdisch-2700l', '/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t'],
    ['/fluessiggastank-oberirdisch-2700l', '/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t'],

    // Legacy Slugs (Before SEO update)
    ['/fluessiggastank-kaufen/1-2t-oberirdisch', '/fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t'],
    ['/fluessiggastank-kaufen/2-1t-oberirdisch', '/fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t'],
    ['/fluessiggastank-kaufen/2-9t-oberirdisch', '/fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t'],
    ['/fluessiggastank-kaufen/1-2t-halboberirdisch', '/fluessiggastank-kaufen/fluessiggastank-2700l-halboberirdisch-1-2t'],
    ['/fluessiggastank-kaufen/2-1t-halboberirdisch', '/fluessiggastank-kaufen/fluessiggastank-4850l-halboberirdisch-2-1t'],
    ['/fluessiggastank-kaufen/2-9t-halboberirdisch', '/fluessiggastank-kaufen/fluessiggastank-6400l-halboberirdisch-2-9t'],
    ['/fluessiggastank-kaufen/1-2t-unterirdisch', '/fluessiggastank-kaufen/fluessiggastank-2700l-unterirdisch-1-2t'],
    ['/fluessiggastank-kaufen/2-1t-unterirdisch', '/fluessiggastank-kaufen/fluessiggastank-4850l-unterirdisch-2-1t'],
    ['/fluessiggastank-kaufen/2-9t-unterirdisch', '/fluessiggastank-kaufen/fluessiggastank-6400l-unterirdisch-2-9t'],

    // Legacy Short-IDs
    ['/tanks', '/fluessiggastank-kaufen'],
    ['/gas', '/fluessiggas-bestellen'],

    // Legacy Marketing URLs
    ['/fluessiggastank-kaufen-2', '/fluessiggastank-kaufen'],
    ['/flussiggastank-mieten-oder-kaufen', '/fluessiggastank-kaufen'],
    ['/fluessiggas-kaufen', '/fluessiggas-bestellen'],

    ['/was-ist-ein-fluessiggastank', '/wissen'],
    ['/was-ist-fluessiggas', '/wissen'],
    ['/fluessiggas-eine-vielfaeltige-energiequelle', '/wissen'],
    ['/von-oel-auf-gas-umruesten', '/wissen'],
    ['/flussiggasbehalter-vorschriften-und-prufungen', '/pruefungen'],
    ['/aeussere-pruefung', '/pruefungen']
  ]);

  const findRedirect = (pathStr) => {
    if (!pathStr || typeof pathStr !== 'string') return null;
    let p = pathStr;
    try {
        if (p.includes('%')) {
            p = decodeURIComponent(p);
        }
    } catch (e) {
        Logger.warn('Failed to decode path:', { pathStr });
    }
    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }
    p = p.toLowerCase();
    p = p.replace(/\.(php|html|htm)$/, '');

    if (legacyRedirects.has(p)) return legacyRedirects.get(p);
    if (!p.startsWith('/') && legacyRedirects.has('/' + p)) return legacyRedirects.get('/' + p);

    const pNorm = p.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    if (legacyRedirects.has(pNorm)) return legacyRedirects.get(pNorm);
    if (!pNorm.startsWith('/') && legacyRedirects.has('/' + pNorm)) return legacyRedirects.get('/' + pNorm);

    const isTank = p.includes('tank') || p.includes('behaelter') || p.includes('behälter') || pNorm.includes('tank');
    const isOberirdisch = p.includes('oberirdisch') || pNorm.includes('oberirdisch');
    const isUnterirdisch = p.includes('unterirdisch') || pNorm.includes('unterirdisch');

    let size = null;
    if (p.match(/(1\.2|1,2|12|1-2)t/) || p.includes('2700')) size = '1-2t';
    if (p.match(/(2\.1|2,1|21|2-1)t/) || p.includes('4850')) size = '2-1t';
    if (p.match(/(2\.9|2,9|29|2-9)t/) || p.includes('6400')) size = '2-9t';

    if (size) {
        const sizeMap = {
            '1-2t': '2700l',
            '2-1t': '4850l',
            '2-9t': '6400l'
        };
        const vol = sizeMap[size];
        if (isOberirdisch) return `/fluessiggastank-kaufen/fluessiggastank-${vol}-oberirdisch-${size}`;
        if (isUnterirdisch) return `/fluessiggastank-kaufen/fluessiggastank-${vol}-unterirdisch-${size}`;
    }
    if (isTank && (p.includes('kaufen') || p.includes('mieten') || p.includes('preis') || p.includes('angebot'))) return '/fluessiggastank-kaufen';
    if (p.includes('gas') && (p.includes('bestellen') || p.includes('liefern') || p.includes('preis'))) return '/fluessiggas-bestellen';
    if (p.includes('wissen') || p.includes('ratgeber') || p.includes('faq') || p.includes('frage') || p.includes('was-ist') || p.includes('umruesten') || p.includes('umrüsten') || pNorm.includes('umruesten')) return '/wissen';
    if (p.includes('pruefung') || p.includes('prüfung') || p.includes('vorschriften') || pNorm.includes('pruefung')) return '/pruefungen';
    if (p.includes('impressum') || p.includes('datenschutz') || p.includes('agb')) return '/';

    return null;
  };

  app.use((req, res, next) => {
    try {
        let normalizedPath = req.path;
        if (!normalizedPath) return next();
        try {
            if (normalizedPath.includes('%')) {
                normalizedPath = decodeURIComponent(normalizedPath);
            }
        } catch (e) { /* ignore */ }
        if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
          normalizedPath = normalizedPath.slice(0, -1);
        }
        const cleanPath = normalizedPath.replace(/^\//, '');
        if (staticRoutes.has(cleanPath)) return next();
        if (cleanPath.startsWith('tanks/') || cleanPath.startsWith('fluessiggastank-kaufen/')) {
            const slug = cleanPath.split('/').pop();
            if (tankSlugs.has(slug)) return next();
        }
        if (cleanPath.startsWith('liefergebiet/')) {
            const slug = cleanPath.split('/')[1];
            if (citySlugs.has(slug)) {
                return next();
            }
        }
        if (cleanPath.startsWith('wissen/')) {
            const slug = cleanPath.split('/')[1];
            // O(1) check using Set.has() instead of O(N) Array.includes()
            if (knowledgeSlugs.size === 0 || knowledgeSlugs.has(slug)) return next();
        }
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
        const target = findRedirect(req.path);
        const cleanTarget = target ? target.replace(/^\//, '') : '';
        if (target && cleanTarget !== cleanPath && target !== req.originalUrl) {
             Logger.info(`Redirecting: ${req.url} -> ${target}`);
             return res.redirect(301, target);
        }
        next();
    } catch (err) {
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
        isProd = true;
    }
  }

  let prodTemplate = '';
  let prodRender = null;

  if (isProd) {
    app.use(compression())
    app.use(
      '/',
      express.static(path.resolve(__dirname, 'dist/client'), {
        index: false,
        // Cache hashed assets aggressively
        setHeaders: (res, path) => {
            if (path.match(/\.[0-9a-f]{8}\./)) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
        }
      })
    )

    // Preload template and render function to avoid blocking I/O on every request
    try {
        const templatePath = path.resolve(__dirname, 'dist/client/index.html');
        if (fs.existsSync(templatePath)) {
            prodTemplate = fs.readFileSync(templatePath, 'utf-8');
            Logger.info('Preloaded production index.html');
        }
    } catch (e) {
        Logger.warn('Failed to preload production index.html:', e.message);
    }

    try {
        const serverEntry = await import('./dist/server/entry-server.js');
        prodRender = serverEntry.render;
        Logger.info('Preloaded production entry-server.js');
    } catch (e) {
        Logger.warn('Failed to preload production entry-server.js:', e.message);
    }
  }

  let getSeoForPath, getSchemaForPath;
  try {
     const seoModule = await import('./src/data/seoData.js');
     getSeoForPath = seoModule.getSeoForPath;
     getSchemaForPath = seoModule.getSchemaForPath;
  } catch (err) {
      Logger.error('Failed to load SEO Data:', err);
      getSeoForPath = () => ({ title: 'gasmöller', description: '', image: '', url: '' });
      getSchemaForPath = () => ({});
  }

  // Explicitly serve sitemap.xml
  app.get('/sitemap.xml', async (req, res) => {
    try {
        const handled = await serveOrGenerate(res, 'sitemap.xml', 'application/xml', generateSitemapXml);
        if (!handled && !res.headersSent) {
            res.status(404).send('Sitemap not found');
        }
    } catch (e) {
        Logger.error('Sitemap Error:', e);
        res.status(500).end();
    }
  })

  // Explicitly serve robots.txt
  app.get('/robots.txt', async (req, res) => {
    try {
        const handled = await serveOrGenerate(res, 'robots.txt', 'text/plain', null);
        if (!handled && !res.headersSent) {
            res.status(404).send('Robots.txt not found');
        }
    } catch (e) {
         Logger.error('Robots.txt Error:', e);
         res.status(500).end();
    }
  })

  app.use(async (req, res) => {
    let url = req.originalUrl
    try {
        if (url.includes('%')) {
            url = decodeURIComponent(url);
        }
    } catch (e) {
        Logger.warn('Failed to decode URL in SSR middleware:', e);
    }

    try {
        let tryFile;
        if (url === '/') {
            tryFile = 'index.html';
        } else if (url.endsWith('/')) {
            tryFile = url + 'index.html';
        } else if (path.extname(url)) {
            tryFile = url;
        } else {
            tryFile = url + '.html';
        }

        if (isProd) {
            const possibleStaticPath = path.join(__dirname, 'dist/client', tryFile.replace(/^\//, ''));
            // Use async check
            try {
                await fs.promises.access(possibleStaticPath, fs.constants.F_OK);
                return res.sendFile(possibleStaticPath);
            } catch (e) {
                // Not found
            }
        }

        let seoInfo;
        let schemaJson;
        try {
            seoInfo = getSeoForPath(url);
            schemaJson = JSON.stringify(getSchemaForPath(url));
        } catch (err) {
            Logger.error('SEO Data Error:', err);
            seoInfo = {
                title: 'gasmöller',
                description: '',
                image: '',
                url: '',
                type: 'website'
            };
            schemaJson = '{}';
        }

    const isHomePage = url === '/' || url === '/index.html';
    const preloadLink = isHomePage ? `
    <link rel="preload" as="image" href="/images/gas-order-hero-mobile.webp" media="(max-width: 768px)" fetchpriority="high">
    <link rel="preload" as="image" href="/images/gas-order-hero.webp" media="(min-width: 769px)" fetchpriority="high">` : '';

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
        try {
             template = await fs.promises.readFile(templatePath, 'utf-8')
        } catch(e) {
            template = await fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
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
        if (prodTemplate) {
             template = prodTemplate;
        } else {
             templatePath = path.resolve(__dirname, 'dist/client/index.html')
             try {
                  template = await fs.promises.readFile(templatePath, 'utf-8')
                  prodTemplate = template;
             } catch(e) {
                  throw new Error('Production index.html not found');
             }
        }

        if (prodRender) {
             render = prodRender;
        } else {
             render = (await import('./dist/server/entry-server.js')).render
        }

        template = template.replace(/<title>.*?<\/title>/, `<title>${siteData.title}</title>`);
        if (template.includes('<meta name="description"')) {
            template = template.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${siteData.description}">`);
        } else {
            template = template.replace('</head>', `<meta name="description" content="${siteData.description}"></head>`);
        }
        template = template.replace('</head>', `${siteData.metaTags}</head>`);
        template = template.replace('</head>', `<script type="application/ld+json">${siteData.schema}</script></head>`);
      }

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
      Logger.error('CRITICAL SSR ERROR:', e);
      if (process.env.NODE_ENV === 'production' || isProd) {
         if (url === '/' || url.includes('error=server_error')) {
             return res.status(500).send('<h1>Wartungsarbeiten</h1><p>Bitte versuchen Sie es später erneut.</p>');
         }
         try {
             return res.redirect(302, '/?error=server_error');
         } catch (redirErr) { /* ignore */ }
      }
      if (!isProd && vite) vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

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

  const shutdown = () => {
      Logger.info('Received kill signal, shutting down gracefully');
      server.close(() => {
          Logger.info('Closed out remaining connections');
          process.exit(0);
      });
      setTimeout(() => {
          Logger.error('Could not close connections in time, forcefully shutting down');
          process.exit(1);
      }, 10000);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

createServer()
