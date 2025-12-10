import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { supportedLanguages, langToPath } from '../i18n';

interface LanguageSwitcherProps {
    variant?: 'dropdown' | 'inline' | 'minimal';
    showFlag?: boolean;
    showNativeName?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    variant = 'dropdown',
    showFlag = true,
    showNativeName = true,
}) => {
    const { i18n } = useTranslation();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0];

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem('i18nextLng', langCode);
        setIsOpen(false);
    };

    if (variant === 'inline') {
        return (
            <div className="flex flex-wrap gap-2">
                {supportedLanguages.map(language => (
                    <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i18n.language === language.code
                                ? 'bg-blue-500 text-white'
                                : isDarkMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {showFlag && <span className="mr-1">{language.flag}</span>}
                        {showNativeName ? language.nativeName : language.name}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'minimal') {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                    title={currentLang.name}
                >
                    <span className="text-xl">{currentLang.flag}</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute right-0 mt-2 py-2 w-44 rounded-xl shadow-lg z-50 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                }`}
                        >
                            {supportedLanguages.map(language => (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`w-full px-4 py-2 text-left flex items-center gap-2 transition-colors ${i18n.language === language.code
                                            ? isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                                            : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{language.flag}</span>
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                        {language.nativeName}
                                    </span>
                                    {i18n.language === language.code && (
                                        <Check className="w-4 h-4 ml-auto text-blue-500" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Default dropdown variant
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
                    }`}
            >
                {showFlag && <span className="text-lg">{currentLang.flag}</span>}
                <span className="text-sm font-medium">
                    {showNativeName ? currentLang.nativeName : currentLang.name}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className={`absolute right-0 mt-2 py-2 w-48 rounded-xl shadow-xl z-50 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                            }`}
                    >
                        <div className={`px-3 py-2 text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Select Language
                        </div>
                        {supportedLanguages.map(language => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors ${i18n.language === language.code
                                        ? isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
                                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{language.nativeName}</div>
                                    <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {language.name}
                                    </div>
                                </div>
                                {i18n.language === language.code && (
                                    <Check className="w-4 h-4 text-blue-500" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
