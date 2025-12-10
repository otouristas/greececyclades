import React, { useEffect, createContext, useContext } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pathToLang, langToPath, supportedLanguages } from '../i18n';

interface LanguageContextType {
    lang: string;
    langPath: string;
    changeLanguage: (newLang: string) => void;
    getLocalizedPath: (path: string) => string;
    supportedLanguages: typeof supportedLanguages;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageRouter');
    }
    return context;
};

const LanguageRouter: React.FC = () => {
    const { lang } = useParams<{ lang: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { i18n } = useTranslation();

    // Resolve language from path
    const resolvedLang = lang && pathToLang[lang] ? pathToLang[lang] : 'en';
    const langPath = lang || 'en';

    // Sync i18n with URL
    useEffect(() => {
        if (resolvedLang !== i18n.language) {
            i18n.changeLanguage(resolvedLang);
        }

        // Update document lang
        document.documentElement.lang = resolvedLang;
    }, [resolvedLang, i18n]);

    // Function to change language
    const changeLanguage = (newLang: string) => {
        const newPath = langToPath[newLang] || newLang;
        const currentPath = location.pathname;

        // Extract the path after the language prefix
        const pathParts = currentPath.split('/');
        pathParts[1] = newPath; // Replace the language segment

        const newUrl = pathParts.join('/') || `/${newPath}`;
        navigate(newUrl);
        i18n.changeLanguage(newLang);
    };

    // Generate localized path
    const getLocalizedPath = (path: string): string => {
        if (path.startsWith('/')) {
            return `/${langPath}${path}`;
        }
        return `/${langPath}/${path}`;
    };

    const contextValue: LanguageContextType = {
        lang: resolvedLang,
        langPath,
        changeLanguage,
        getLocalizedPath,
        supportedLanguages,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            <Outlet />
        </LanguageContext.Provider>
    );
};

export default LanguageRouter;
