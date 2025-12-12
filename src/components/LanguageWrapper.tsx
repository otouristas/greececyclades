import { Outlet } from 'react-router-dom';
import { useLanguageSync } from '../hooks/useLanguageSync';

/**
 * LanguageWrapper component
 * Wraps language-prefixed routes to sync i18n with URL path
 * Use this as the element for /:lang route that contains nested routes
 */
export default function LanguageWrapper() {
    // Sync language from URL to i18n
    useLanguageSync();

    // Render nested routes
    return <Outlet />;
}
