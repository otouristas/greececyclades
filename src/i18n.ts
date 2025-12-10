import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import enCommon from './locales/en/common.json';
import elCommon from './locales/el/common.json';
import itCommon from './locales/it/common.json';
import frCommon from './locales/fr/common.json';
import deCommon from './locales/de/common.json';
import esCommon from './locales/es/common.json';
import nlCommon from './locales/nl/common.json';
import zhCommon from './locales/zh/common.json';
import ruCommon from './locales/ru/common.json';

// Supported languages configuration
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
];

// URL path to language code mapping
export const pathToLang: Record<string, string> = {
  'en': 'en',
  'gr': 'el', // /gr/ maps to Greek (el)
  'it': 'it',
  'fr': 'fr',
  'de': 'de',
  'es': 'es',
  'nl': 'nl',
  'zh': 'zh',
  'ru': 'ru',
};

// Language code to URL path mapping
export const langToPath: Record<string, string> = {
  'en': 'en',
  'el': 'gr', // Greek uses /gr/ in URL
  'it': 'it',
  'fr': 'fr',
  'de': 'de',
  'es': 'es',
  'nl': 'nl',
  'zh': 'zh',
  'ru': 'ru',
};

export const supportedLangCodes = supportedLanguages.map(l => l.code);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    supportedLngs: supportedLangCodes,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    resources: {
      en: { translation: enCommon },
      el: { translation: elCommon },
      it: { translation: itCommon },
      fr: { translation: frCommon },
      de: { translation: deCommon },
      es: { translation: esCommon },
      nl: { translation: nlCommon },
      zh: { translation: zhCommon },
      ru: { translation: ruCommon },
    },
  });

export default i18n;
