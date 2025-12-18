import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist/client');
const EXCLUDE_PATTERNS = [/^https?:\/\//, /^mailto:/, /^tel:/, /^#/];

const scanLinks = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            scanLinks(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const checkLinks = () => {
    console.log('Checking for broken links in build...');
    const htmlFiles = scanLinks(DIST_DIR);
    let brokenLinks = 0;

    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        // Simple regex to find hrefs (not perfect but good enough for static check)
        const regex = /href="([^"]*)"/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            const link = match[1];
            if (EXCLUDE_PATTERNS.some(p => p.test(link))) continue;

            // Check if internal link exists
            // Resolve relative to file or root
            let targetPath;
            if (link.startsWith('/')) {
                targetPath = path.join(DIST_DIR, link);
            } else {
                targetPath = path.join(path.dirname(file), link);
            }

            // Append index.html if directory or extensionless
            if (!path.extname(targetPath) && !fs.existsSync(targetPath)) {
                 if (fs.existsSync(targetPath + '.html')) targetPath += '.html';
                 else if (fs.existsSync(path.join(targetPath, 'index.html'))) targetPath = path.join(targetPath, 'index.html');
            }

            if (!fs.existsSync(targetPath)) {
                console.error(`Broken link in ${path.relative(process.cwd(), file)}: ${link}`);
                brokenLinks++;
            }
        }
    });

    if (brokenLinks > 0) {
        console.error(`Found ${brokenLinks} broken links.`);
        process.exit(1);
    } else {
        console.log('No broken links found.');
    }
};

if (import.meta.url === `file://${process.argv[1]}`) {
    checkLinks();
}
