
// Test script for redirects in server.js logic
// This script simulates the `findRedirect` logic from server.js

// Mock the environment
const tankSlugs = [
    '1-2t-oberirdisch',
    '2-1t-oberirdisch',
    '2-9t-oberirdisch',
    '1-2t-unterirdisch',
    '2-1t-unterirdisch',
    '2-9t-unterirdisch'
];

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

    let p = pathStr;

    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }

    // Normalize to lowercase
    p = p.toLowerCase();

    // Strip common legacy extensions (.php, .html, .htm)
    p = p.replace(/\.(php|html|htm)$/, '');

    // 1. Check Legacy Map
    if (legacyRedirects[p]) return legacyRedirects[p];
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

// Test Cases
const testCases = [
    { input: '/impressum-2', expected: '/' },
    { input: '/was-ist-ein-fluessiggastank', expected: '/wissen' },
    { input: '/flussiggastank-oberirdisch-4850l-21t-fassungsvermogen', expected: '/tanks/2-1t-oberirdisch' },
    { input: '/fluessiggastank-unterirdisch-4850l-21t-fassungsvermoegen', expected: '/tanks/2-1t-unterirdisch' },
    { input: '/fluessiggas-eine-vielfaeltige-energiequelle', expected: '/wissen' },
    { input: '/fluessiggas-bestellen', expected: '/gas' },
    { input: '/flussiggasbehalter-vorschriften-und-prufungen', expected: '/pruefungen' },
    { input: '/fluessiggas-bestellen.html', expected: '/gas' }, // Extension check
    { input: 'impressum-2', expected: '/' }, // No leading slash
    { input: '/FLUESSIGGAS-BESTELLEN', expected: '/gas' }, // Case check
    { input: null, expected: null }, // Robustness
    { input: undefined, expected: null }, // Robustness
    { input: 123, expected: null }, // Robustness
];

let errors = 0;
console.log('Running Redirect Tests...');

testCases.forEach(test => {
    const result = findRedirect(test.input);
    if (result !== test.expected) {
        console.error(`FAILED: Input "${test.input}" -> Expected "${test.expected}", got "${result}"`);
        errors++;
    } else {
        console.log(`PASS: "${test.input}" -> "${result}"`);
    }
});

if (errors === 0) {
    console.log('All tests passed!');
    process.exit(0);
} else {
    console.error(`${errors} tests failed.`);
    process.exit(1);
}
