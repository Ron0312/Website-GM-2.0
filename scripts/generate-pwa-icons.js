
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '../public/apple-touch-icon.png');
const publicDir = path.join(__dirname, '../public');

const sizes = [192, 512];

async function run() {
    for (const size of sizes) {
        const dest = path.join(publicDir, `pwa-${size}x${size}.png`);
        await sharp(src).resize(size, size).toFile(dest);
        console.log(`Created pwa-${size}x${size}.png`);
    }
}
run().catch(console.error);
