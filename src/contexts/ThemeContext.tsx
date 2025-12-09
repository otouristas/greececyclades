import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'cyclades-theme';

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }
    return 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
        theme === 'system' ? getSystemTheme() : theme as ResolvedTheme
    );

    // Update resolved theme when theme or system preference changes
    useEffect(() => {
        const updateResolvedTheme = () => {
            const resolved = theme === 'system' ? getSystemTheme() : theme as ResolvedTheme;
            setResolvedTheme(resolved);

            // Apply to document
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(resolved);

            // Also set color-scheme for native elements
            root.style.colorScheme = resolved;
        };

        updateResolvedTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                updateResolvedTheme();
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
    };

    const toggleTheme = () => {
        const next = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Theme toggle button component
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ThemeToggle({ showLabel = false, size = 'md', className = '' }: ThemeToggleProps) {
    const { resolvedTheme, toggleTheme } = useTheme();

    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };

    const iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`
        ${sizes[size]} rounded-xl flex items-center justify-center gap-2
        bg-gray-100 dark:bg-dark-card
        text-gray-700 dark:text-white
        hover:bg-gray-200 dark:hover:bg-dark-border
        border border-gray-200 dark:border-dark-border
        transition-all duration-200
        ${className}
      `}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                key={resolvedTheme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {resolvedTheme === 'dark' ? (
                    <Sun className={iconSizes[size]} />
                ) : (
                    <Moon className={iconSizes[size]} />
                )}
            </motion.div>
            {showLabel && (
                <span className="text-sm font-medium">
                    {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
                </span>
            )}
        </motion.button>
    );
}

// Theme selector dropdown (for settings)
export function ThemeSelector({ className = '' }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    const options: { value: Theme; label: string; icon: typeof Sun }[] = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ];

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive
                                ? 'bg-cyclades-turquoise text-white'
                                : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-border'
                            }
            `}
                    >
                        <Icon className="h-4 w-4" />
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
