/**
 * Multi-Language Sitemap Generator
 * Run with: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://discovercyclades.gr';

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

const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'islands', priority: '0.9', changefreq: 'weekly' },
    { path: 'guides', priority: '0.9', changefreq: 'weekly' },
    { path: 'hotels', priority: '0.9', changefreq: 'daily' },
    { path: 'ferry-tickets', priority: '0.9', changefreq: 'daily' },
    { path: 'flights', priority: '0.8', changefreq: 'daily' },
    { path: 'activities', priority: '0.8', changefreq: 'weekly' },
    { path: 'restaurants', priority: '0.8', changefreq: 'weekly' },
    { path: 'about', priority: '0.5', changefreq: 'monthly' },
    { path: 'contact', priority: '0.5', changefreq: 'monthly' },
    { path: 'blog', priority: '0.7', changefreq: 'weekly' },
    { path: 'weather', priority: '0.7', changefreq: 'daily' },
    { path: 'trip-planner', priority: '0.8', changefreq: 'weekly' },
    { path: 'touristas', priority: '0.8', changefreq: 'weekly' },
    { path: 'planner', priority: '0.8', changefreq: 'weekly' },
    { path: 'community', priority: '0.7', changefreq: 'daily' },
    { path: 'inspiration', priority: '0.7', changefreq: 'daily' },
    { path: 'hotel-marketplace', priority: '0.8', changefreq: 'daily' },
    { path: 'culinary', priority: '0.7', changefreq: 'weekly' },
    { path: 'rent-a-car', priority: '0.7', changefreq: 'weekly' },
];

// Island pages
const islands = [
    'santorini', 'mykonos', 'paros', 'naxos', 'milos', 'ios',
    'sifnos', 'tinos', 'syros', 'andros', 'amorgos', 'folegandros',
    'koufonisia', 'serifos', 'antiparos', 'kimolos'
];

islands.forEach(function (island) {
    pages.push({ path: 'islands/' + island, priority: '0.8', changefreq: 'weekly' });
    pages.push({ path: 'guides/' + island, priority: '0.8', changefreq: 'weekly' });
});

function generateUrl(page) {
    var today = new Date().toISOString().split('T')[0];

    var hreflangLinks = languages.map(function (lang) {
        var url = page.path
            ? SITE_URL + '/' + lang.code + '/' + page.path
            : SITE_URL + '/' + lang.code;
        return '    <xhtml:link rel="alternate" hreflang="' + lang.hreflang + '" href="' + url + '"/>';
    }).join('\n');

    var xDefaultUrl = page.path
        ? SITE_URL + '/en/' + page.path
        : SITE_URL + '/en';
    var xDefaultLink = '    <xhtml:link rel="alternate" hreflang="x-default" href="' + xDefaultUrl + '"/>';

    return languages.map(function (lang) {
        var url = page.path
            ? SITE_URL + '/' + lang.code + '/' + page.path
            : SITE_URL + '/' + lang.code;

        return '  <url>\n' +
            '    <loc>' + url + '</loc>\n' +
            '    <lastmod>' + today + '</lastmod>\n' +
            '    <changefreq>' + page.changefreq + '</changefreq>\n' +
            '    <priority>' + page.priority + '</priority>\n' +
            hreflangLinks + '\n' +
            xDefaultLink + '\n' +
            '  </url>';
    }).join('\n');
}

function main() {
    var publicDir = path.join(__dirname, '..', 'public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    var header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">';
    var footer = '</urlset>';
    var urls = pages.map(generateUrl).join('\n');
    var sitemap = header + '\n' + urls + '\n' + footer;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('Generated sitemap.xml');
    console.log('Pages: ' + pages.length + ', Languages: ' + languages.length + ', Total URLs: ' + (pages.length * languages.length));
}

main();
