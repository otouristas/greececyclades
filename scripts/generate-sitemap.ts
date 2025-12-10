/**
 * Multi-Language Sitemap Generator
 * Generates XML sitemaps with hreflang alternate links for all supported languages
 * 
 * Run with: npx ts-node scripts/generate-sitemap.ts
 * Or: npm run build:sitemap
 */

import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://discovercyclades.gr';

// Language configurations
const languages = [
    { code: 'en', hreflang: 'en' },
    { code: 'gr', hreflang: 'el' },
    { code: 'it', hreflang: 'it' },
    { code: 'fr', hreflang: 'fr' },
    { code: 'de', hreflang: 'de' },
    { code: 'es', hreflang: 'es' },
    { code: 'nl', hreflang: 'nl' },
    { code: 'zh', hreflang: 'zh-Hans' },
    { code: 'ru', hreflang: 'ru' },
];

// All indexable pages
const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'islands', priority: '0.9', changefreq: 'weekly' },
    { path: 'guides', priority: '0.9', changefreq: 'weekly' },
    { path: 'hotels', priority: '0.9', changefreq: 'daily' },
    { path: 'ferry-tickets', priority: '0.9', changefreq: 'daily' },
    { path: 'flights', priority: '0.8', changefreq: 'daily' },
    { path: 'activities', priority: '0.8', changefreq: 'weekly' },
    { path: 'restaurants', priority: '0.8', changefreq: 'weekly' },
    { path: 'transfers', priority: '0.7', changefreq: 'weekly' },
    { path: 'about', priority: '0.5', changefreq: 'monthly' },
    { path: 'contact', priority: '0.5', changefreq: 'monthly' },
    { path: 'blog', priority: '0.7', changefreq: 'weekly' },
    { path: 'weather', priority: '0.7', changefreq: 'daily' },
    { path: 'trip-planner', priority: '0.8', changefreq: 'weekly' },
    { path: 'touristas-ai', priority: '0.8', changefreq: 'weekly' },
    { path: 'touristas', priority: '0.8', changefreq: 'weekly' },
    { path: 'planner', priority: '0.8', changefreq: 'weekly' },
    { path: 'packing-list', priority: '0.7', changefreq: 'weekly' },
    { path: 'community', priority: '0.7', changefreq: 'daily' },
    { path: 'inspiration', priority: '0.7', changefreq: 'daily' },
    { path: 'hotel-marketplace', priority: '0.8', changefreq: 'daily' },
    { path: 'directory', priority: '0.6', changefreq: 'weekly' },
    { path: 'ferry-guide', priority: '0.7', changefreq: 'monthly' },
    { path: 'greek-phrases', priority: '0.6', changefreq: 'monthly' },
    { path: 'budget-calculator', priority: '0.6', changefreq: 'monthly' },
    { path: 'resources', priority: '0.5', changefreq: 'monthly' },
    { path: 'culinary', priority: '0.7', changefreq: 'weekly' },
    { path: 'rent-a-car', priority: '0.7', changefreq: 'weekly' },
    { path: 'microclimate-weather', priority: '0.7', changefreq: 'daily' },
];

// Island guides
const islands = [
    'santorini', 'mykonos', 'paros', 'naxos', 'milos', 'ios',
    'sifnos', 'tinos', 'syros', 'andros', 'amorgos', 'folegandros',
    'koufonisia', 'serifos', 'antiparos', 'kimolos', 'sikinos',
    'anafi', 'donousa', 'schinoussa', 'iraklia', 'kea', 'kythnos', 'thirasia'
];

// Add island-specific pages
islands.forEach(island => {
    pages.push({ path: `islands/${island}`, priority: '0.8', changefreq: 'weekly' });
    pages.push({ path: `guides/${island}`, priority: '0.8', changefreq: 'weekly' });
});

function generateUrl(page: typeof pages[0]): string {
    const today = new Date().toISOString().split('T')[0];

    // Generate hreflang links for all languages
    const hreflangLinks = languages.map(lang => {
        const url = page.path
            ? `${SITE_URL}/${lang.code}/${page.path}`
            : `${SITE_URL}/${lang.code}`;
        return `    <xhtml:link rel="alternate" hreflang="${lang.hreflang}" href="${url}"/>`;
    }).join('\n');

    // Add x-default (English)
    const xDefaultUrl = page.path
        ? `${SITE_URL}/en/${page.path}`
        : `${SITE_URL}/en`;
    const xDefaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}"/>`;

    // Generate URL entries for each language
    return languages.map(lang => {
        const url = page.path
            ? `${SITE_URL}/${lang.code}/${page.path}`
            : `${SITE_URL}/${lang.code}`;

        return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${hreflangLinks}
${xDefaultLink}
  </url>`;
    }).join('\n');
}

function generateSitemap(): string {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    const footer = `</urlset>`;

    const urls = pages.map(generateUrl).join('\n');

    return `${header}\n${urls}\n${footer}`;
}

function generateSitemapIndex(): string {
    const today = new Date().toISOString().split('T')[0];

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Main execution
function main() {
    const publicDir = path.join(__dirname, '..', 'public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate main sitemap
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✓ Generated sitemap.xml');

    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex();
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    console.log('✓ Generated sitemap-index.xml');

    // Count URLs
    const totalUrls = pages.length * languages.length;
    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`   - Pages: ${pages.length}`);
    console.log(`   - Languages: ${languages.length}`);
    console.log(`   - Total URLs: ${totalUrls}`);
}

main();
