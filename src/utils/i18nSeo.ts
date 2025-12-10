import { langToPath, supportedLanguages } from '../i18n';

const SITE_URL = 'https://discovercyclades.gr';

// Hreflang code mapping (ISO 639-1)
const hreflangCodes: Record<string, string> = {
    'en': 'en',
    'el': 'el', // Greek
    'it': 'it',
    'fr': 'fr',
    'de': 'de',
    'es': 'es',
    'nl': 'nl',
    'zh': 'zh-Hans', // Simplified Chinese
    'ru': 'ru',
};

/**
 * Generate alternate language links for SEO hreflang tags
 * @param currentPath - The current page path (without language prefix)
 * @returns Array of hreflang objects for SEO component
 */
export function generateAlternateLanguages(currentPath: string): Array<{ hreflang: string; href: string }> {
    // Ensure path starts with /
    const cleanPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    return supportedLanguages.map(lang => {
        const urlPath = langToPath[lang.code] || lang.code;
        const hreflang = hreflangCodes[lang.code] || lang.code;

        return {
            hreflang,
            href: `${SITE_URL}/${urlPath}${cleanPath === '/' ? '' : cleanPath}`,
        };
    });
}

/**
 * Get the current page path without language prefix
 * @param pathname - The full pathname from location
 * @returns The path without the language prefix
 */
export function getPathWithoutLang(pathname: string): string {
    const langPaths = Object.values(langToPath);
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length > 0 && langPaths.includes(parts[0])) {
        return '/' + parts.slice(1).join('/');
    }

    return pathname;
}

/**
 * Build localized URL for a given language
 * @param path - The page path (without language prefix)
 * @param langCode - The target language code
 * @returns Full URL with language prefix
 */
export function buildLocalizedUrl(path: string, langCode: string): string {
    const urlPath = langToPath[langCode] || 'en';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}/${urlPath}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Get browser's preferred language
 * @returns The detected language code or 'en' as fallback
 */
export function detectBrowserLanguage(): string {
    if (typeof navigator === 'undefined') return 'en';

    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    const supported = supportedLanguages.find(l => l.code === browserLang);

    return supported ? browserLang : 'en';
}

/**
 * Generate x-default URL (typically English)
 */
export function getXDefaultUrl(currentPath: string): string {
    return buildLocalizedUrl(currentPath, 'en');
}
