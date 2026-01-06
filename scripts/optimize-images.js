
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
    {
        input: 'public/logos/Icon-01.webp',
        width: 422, // 2x display width of 211
        quality: 85,
        output: 'public/logos/Icon-01-opt.webp'
    },
    {
        input: 'public/images/tank-section-hero.webp',
        width: 1600, // Reasonable max width for web
        quality: 75,
        output: 'public/images/tank-section-hero-opt.webp'
    },
    {
        input: 'public/images/gas-order-hero.webp',
        width: 1600,
        quality: 75,
        output: 'public/images/gas-order-hero-opt.webp'
    }
];

async function optimize() {
    for (const img of images) {
        try {
            console.log(`Optimizing ${img.input}...`);
            await sharp(img.input)
                .resize({ width: img.width, withoutEnlargement: true })
                .webp({ quality: img.quality })
                .toFile(img.output);

            // Replace original
            fs.renameSync(img.output, img.input);
            console.log(`Replaced ${img.input} with optimized version.`);
        } catch (error) {
            console.error(`Error optimizing ${img.input}:`, error);
        }
    }
}

optimize();
