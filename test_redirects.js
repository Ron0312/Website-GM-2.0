
const legacyRedirects = {
    '/impressum-2': '/',
    '/impressum': '/',
    '/datenschutzerklaerung-eu': '/',
    '/allgemeine-geschaeftsbediungungen': '/',
    '/haftungsausschluss': '/',
    '/cookie-richtlinie-eu': '/',
    '/sonderpreise-und-entsorgung': '/tanks',

    // Explicit Tank redirects from user list
    '/flussiggastank-oberirdisch-4850l-21t-fassungsvermogen': '/tanks/2-1t-oberirdisch',
    '/fluessiggastank-unterirdisch-4850l-21t-fassungsvermoegen': '/tanks/2-1t-unterirdisch',
    '/fluessiggastank-unterirdisch-2700l-12t-fassungsvermoegen': '/tanks/1-2t-unterirdisch',
    '/flussiggastank-oberirdisch-6400l': '/tanks/2-9t-oberirdisch',
    '/fluessiggastank-unterirdisch-6400l-29t-fassungsvermoegen': '/tanks/2-9t-unterirdisch',
    '/flussiggastank-oberirdisch-2700l': '/tanks/1-2t-oberirdisch',
    '/fluessiggastank-kaufen': '/tanks',
    '/fluessiggastank-kaufen-2': '/tanks',
    '/flussiggastank-mieten-oder-kaufen': '/tanks', // Intent: buy/rent -> tanks

    // Gas
    '/fluessiggas-bestellen': '/gas',

    // Content / Knowledge
    '/was-ist-ein-fluessiggastank': '/wissen',
    '/was-ist-fluessiggas': '/wissen',
    '/fluessiggas-eine-vielfaeltige-energiequelle': '/wissen',
    '/von-oel-auf-gas-umruesten': '/wissen',

    // Service
    '/flussiggasbehalter-vorschriften-und-prufungen': '/pruefungen',
    '/aeussere-pruefung': '/pruefungen'
};

const findRedirect = (pathStr) => {
    // Robustness: Handle non-string inputs
    if (!pathStr || typeof pathStr !== 'string') return null;

    // req.path is already decoded by Express. We do NOT decode it again to avoid URIError.
    let p = pathStr;

    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }

    // Normalize to lowercase
    p = p.toLowerCase();

    // Strip common legacy extensions (.php, .html, .htm)
    p = p.replace(/\.(php|html|htm)$/, '');

    console.log(`Checking: "${pathStr}" -> Normalized: "${p}"`);

    // 1. Check Legacy Map
    // Check exact match after stripping extension
    if (legacyRedirects[p]) return legacyRedirects[p];
    // Check with slash if missing (legacy map has keys with leading slash)
    if (!p.startsWith('/') && legacyRedirects['/' + p]) return legacyRedirects['/' + p];

    // 2. Tank Logic
    const isTank = p.includes('tank') || p.includes('behaelter') || p.includes('behälter');
    const isOberirdisch = p.includes('oberirdisch');
    const isUnterirdisch = p.includes('unterirdisch');

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
    if (p.includes('wissen') || p.includes('ratgeber') || p.includes('faq') || p.includes('frage') || p.includes('was-ist') || p.includes('umruesten') || p.includes('umrüsten')) return '/wissen';

    // 5. Service / Inspections
    if (p.includes('pruefung') || p.includes('prüfung') || p.includes('vorschriften')) return '/pruefungen';

    // 6. Legal / Home
    if (p.includes('impressum') || p.includes('datenschutz') || p.includes('agb')) return '/';

    return null;
  };

const testCases = [
    '/flussiggastank-oberirdisch-4850l-21t-fassungsvermogen',
    '/flussiggastank-oberirdisch-4850l-2.1t-fassungsvermogen', // with dot
    '/Flüssiggastank-oberirdisch-4850l',
    '/fluessiggastank-oberirdisch-4850l-21t-fassungsvermoegen.html',
    '/some-random-path',
    '/impressum',
    '/impressum-2',
    '/unknown-tank-100t',
    '/test-tank-oberirdisch-4850', // heuristic check
    '/tanks/2-1t-oberirdisch' // should not match or redirect to itself (server.js handles loop check)
];

testCases.forEach(path => {
    try {
        const result = findRedirect(path);
        console.log(`RESULT for "${path}": ${result}`);
    } catch (e) {
        console.error(`CRASH for "${path}":`, e);
    }
});
