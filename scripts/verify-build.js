import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist/client');

console.log('🔍 Verifying Build Output...');

if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Build directory missing!');
    process.exit(1);
}

const requiredFiles = ['index.html', 'sitemap.xml', 'robots.txt'];
let errors = 0;

requiredFiles.forEach(file => {
    if (!fs.existsSync(path.join(DIST_DIR, file))) {
        // Sitemap/Robots might be dynamic in server.js now, but if we prerender, they should be there.
        // If we are strictly SSR, they might not be in dist/client.
        // However, index.html MUST be there.
        if (file === 'index.html') {
             console.error(`❌ Missing critical file: ${file}`);
             errors++;
        } else {
             console.warn(`⚠️  Missing static file (might be served dynamically): ${file}`);
        }
    } else {
        console.log(`✅ Found ${file}`);
    }
});

// Check for heavy assets (simple check)
const assetsDir = path.join(DIST_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    files.forEach(file => {
        const stats = fs.statSync(path.join(assetsDir, file));
        if (stats.size > 500 * 1024) { // 500KB
            console.warn(`⚠️  Large asset detected: ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        }
    });
}

if (errors > 0) {
    console.error(`❌ Verification failed with ${errors} errors.`);
    process.exit(1);
}

console.log('✅ Build verification passed (structure check).');
