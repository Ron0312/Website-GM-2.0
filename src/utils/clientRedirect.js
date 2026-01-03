
const legacyRedirects = {
    '/impressum-2': '/',
    '/impressum': '/',
    '/datenschutzerklaerung-eu': '/',
    '/allgemeine-geschaeftsbediungungen': '/',
    '/haftungsausschluss': '/',
    '/cookie-richtlinie-eu': '/',
    '/sonderpreise-und-entsorgung': '/tanks',

    // Explicit Tank redirects (Legacy -> New Speaking URL)
    '/flussiggastank-oberirdisch-4850l-21t-fassungsvermogen': '/fluessiggastank-kaufen/2-1t-oberirdisch',
    '/fluessiggastank-unterirdisch-4850l-21t-fassungsvermoegen': '/fluessiggastank-kaufen/2-1t-unterirdisch',
    '/fluessiggastank-unterirdisch-2700l-12t-fassungsvermoegen': '/fluessiggastank-kaufen/1-2t-unterirdisch',
    '/flussiggastank-oberirdisch-6400l': '/fluessiggastank-kaufen/2-9t-oberirdisch',
    '/fluessiggastank-unterirdisch-6400l-29t-fassungsvermoegen': '/fluessiggastank-kaufen/2-9t-unterirdisch',
    '/flussiggastank-oberirdisch-2700l': '/fluessiggastank-kaufen/1-2t-oberirdisch',

    // Legacy Short-IDs to Speaking URLs
    '/tanks': '/fluessiggastank-kaufen',
    '/gas': '/fluessiggas-bestellen',

    // Legacy Marketing URLs
    '/fluessiggastank-kaufen-2': '/fluessiggastank-kaufen',
    '/flussiggastank-mieten-oder-kaufen': '/fluessiggastank-kaufen',

    // Normalized variants
    '/fluessiggastank-oberirdisch-4850l-21t-fassungsvermoegen': '/fluessiggastank-kaufen/2-1t-oberirdisch',
    '/fluessiggastank-oberirdisch-6400l': '/fluessiggastank-kaufen/2-9t-oberirdisch',
    '/fluessiggastank-oberirdisch-2700l': '/fluessiggastank-kaufen/1-2t-oberirdisch',

    // Gas
    '/fluessiggas-kaufen': '/fluessiggas-bestellen',

    // Content / Knowledge
    '/was-ist-ein-fluessiggastank': '/wissen',
    '/was-ist-fluessiggas': '/wissen',
    '/fluessiggas-eine-vielfaeltige-energiequelle': '/wissen',
    '/von-oel-auf-gas-umruesten': '/wissen',

    // Service
    '/flussiggasbehalter-vorschriften-und-prufungen': '/pruefungen',
    '/aeussere-pruefung': '/pruefungen'
};

export const findClientRedirect = (pathStr) => {
    if (!pathStr || typeof pathStr !== 'string') return null;

    let p = pathStr;
    try {
        if (p.includes('%')) {
            p = decodeURIComponent(p);
        }
    } catch (e) {
        // ignore
    }

    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }

    p = p.toLowerCase();
    p = p.replace(/\.(php|html|htm)$/, '');

    // 1. Check Legacy Map
    if (legacyRedirects[p]) return legacyRedirects[p];
    if (!p.startsWith('/') && legacyRedirects['/' + p]) return legacyRedirects['/' + p];

    const pNorm = p.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    if (legacyRedirects[pNorm]) return legacyRedirects[pNorm];
    if (!pNorm.startsWith('/') && legacyRedirects['/' + pNorm]) return legacyRedirects['/' + pNorm];

    // 2. Tank Logic
    const isTank = p.includes('tank') || p.includes('behaelter') || p.includes('behälter') || pNorm.includes('tank');
    const isOberirdisch = p.includes('oberirdisch') || pNorm.includes('oberirdisch');
    const isUnterirdisch = p.includes('unterirdisch') || pNorm.includes('unterirdisch');

    let size = null;
    if (p.match(/(1\.2|1,2|12)t/) || p.includes('2700')) size = '1-2t';
    if (p.match(/(2\.1|2,1|21)t/) || p.includes('4850')) size = '2-1t';
    if (p.match(/(2\.9|2,9|29)t/) || p.includes('6400')) size = '2-9t';

    if (size) {
        if (isOberirdisch) return `/fluessiggastank-kaufen/${size}-oberirdisch`;
        if (isUnterirdisch) return `/fluessiggastank-kaufen/${size}-unterirdisch`;
    }

    // Fallback for general Tank intents
    if (isTank && (p.includes('kaufen') || p.includes('mieten') || p.includes('preis') || p.includes('angebot'))) return 'fluessiggastank-kaufen';

    // 3. Gas Logic
    if (p.includes('gas') && (p.includes('bestellen') || p.includes('liefern') || p.includes('preis'))) return 'fluessiggas-bestellen';

    // 4. Knowledge / Content
    if (p.includes('wissen') || p.includes('ratgeber') || p.includes('faq') || p.includes('frage') || p.includes('was-ist') || p.includes('umruesten') || p.includes('umrüsten') || pNorm.includes('umruesten')) return 'wissen';

    // 5. Service / Inspections
    if (p.includes('pruefung') || p.includes('prüfung') || p.includes('vorschriften') || pNorm.includes('pruefung')) return 'pruefungen';

    // 6. Legal / Home
    if (p.includes('impressum') || p.includes('datenschutz') || p.includes('agb')) return 'start';

    return null;
};
