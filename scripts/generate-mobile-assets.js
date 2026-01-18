
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public/images');

const imagesToProcess = [
    { src: 'gas-order-hero.webp', dest: 'gas-order-hero-mobile.webp', width: 640 }
];

async function generateAssets() {
    for (const img of imagesToProcess) {
        const srcPath = path.join(publicDir, img.src);
        const destPath = path.join(publicDir, img.dest);

        if (fs.existsSync(srcPath)) {
            console.log(`Processing ${img.src}...`);
            await sharp(srcPath)
                .resize(img.width)
                .webp({ quality: 60 })
                .toFile(destPath);
            console.log(`Generated ${img.dest}`);
        } else {
            console.warn(`Source image ${img.src} not found.`);
        }
    }
}

generateAssets().catch(console.error);
