import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pathToLang } from '../i18n';

/**
 * LanguageSync component - syncs the i18n language with the URL path
 * Use this as a wrapper for language-prefixed routes to ensure proper language detection
 */
export function useLanguageSync() {
    const { lang } = useParams<{ lang: string }>();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (lang) {
            // Map URL path to language code (e.g., 'gr' -> 'el')
            const resolvedLang = pathToLang[lang] || lang;

            // Check if this is a supported language
            const supportedLangs = ['en', 'el', 'it', 'fr', 'de', 'es', 'nl', 'zh', 'ru'];

            if (supportedLangs.includes(resolvedLang) && resolvedLang !== i18n.language) {
                i18n.changeLanguage(resolvedLang);
                document.documentElement.lang = resolvedLang;
            }
        }
    }, [lang, i18n]);

    return lang;
}

/**
 * HOC to wrap components that need language sync from URL
 */
export function withLanguageSync<P extends object>(Component: React.ComponentType<P>) {
    return function LanguageSyncWrapper(props: P) {
        useLanguageSync();
        return <Component {...props} />;
    };
}

export default useLanguageSync;
