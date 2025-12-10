import { useEffect, useRef, memo } from 'react';

interface GetYourGuideWidgetProps {
    /**
     * GetYourGuide location ID. 
     * Examples: 751 (Cyclades), 753 (Santorini), 610 (Mykonos)
     */
    locationId: string;
    /** Number of activities to display */
    numberOfItems?: number;
    /** Number of columns for layout */
    columns?: number;
    /** Locale code for language */
    locale?: string;
    /** Widget type */
    widgetType?: 'activities' | 'city';
    /** Partner ID */
    partnerId?: string;
    /** Optional className for container */
    className?: string;
}

/**
 * GetYourGuideWidget - A React component that properly initializes 
 * GetYourGuide activity widgets using their JavaScript SDK.
 * 
 * The widget script needs to be loaded and initialized AFTER the 
 * container element exists in the DOM, which is why we use useEffect.
 */
function GetYourGuideWidget({
    locationId,
    numberOfItems = 6,
    columns = 3,
    locale = 'en-US',
    widgetType = 'activities',
    partnerId = 'YFXNELL',
    className = '',
}: GetYourGuideWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        const loadWidget = () => {
            // Clear any existing content first
            if (containerRef.current) {
                // Keep only the fallback content
                const fallback = containerRef.current.querySelector('.gyg-fallback');
                if (fallback) {
                    containerRef.current.innerHTML = '';
                    containerRef.current.appendChild(fallback);
                }
            }

            // Create the widget container
            const widgetDiv = document.createElement('div');
            widgetDiv.setAttribute('data-gyg-href', 'https://widget.getyourguide.com/default/activities.frame');
            widgetDiv.setAttribute('data-gyg-location-id', locationId);
            widgetDiv.setAttribute('data-gyg-locale-code', locale);
            widgetDiv.setAttribute('data-gyg-widget', widgetType);
            widgetDiv.setAttribute('data-gyg-number-of-items', numberOfItems.toString());
            widgetDiv.setAttribute('data-gyg-partner-id', partnerId);
            if (columns) {
                widgetDiv.setAttribute('data-gyg-columns', columns.toString());
            }

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                containerRef.current.appendChild(widgetDiv);
            }

            // Check if script already exists
            const existingScript = document.querySelector('script[src*="getyourguide.com/dist/pa.umd.production.min.js"]');

            if (existingScript && (window as any).gyg) {
                // Script exists and GYG is available, reinitialize
                try {
                    (window as any).gyg.widgets.init();
                } catch (e) {
                    console.warn('GYG widget init failed, will retry');
                }
            } else if (!existingScript) {
                // Script doesn't exist, load it
                const script = document.createElement('script');
                script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
                script.async = true;
                script.defer = true;
                script.setAttribute('data-gyg-partner-id', partnerId);

                script.onload = () => {
                    scriptLoadedRef.current = true;
                    // Give it a moment to initialize
                    setTimeout(() => {
                        if ((window as any).gyg) {
                            try {
                                (window as any).gyg.widgets.init();
                            } catch (e) {
                                console.warn('GYG widget init failed');
                            }
                        }
                    }, 100);
                };

                document.body.appendChild(script);
            } else {
                // Script exists but GYG not ready, wait and retry
                const retryInterval = setInterval(() => {
                    if ((window as any).gyg) {
                        clearInterval(retryInterval);
                        try {
                            (window as any).gyg.widgets.init();
                        } catch (e) {
                            console.warn('GYG widget init failed');
                        }
                    }
                }, 200);

                // Clear after 5 seconds to avoid infinite retry
                setTimeout(() => clearInterval(retryInterval), 5000);
            }
        };

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(loadWidget, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [locationId, numberOfItems, columns, locale, widgetType, partnerId]);

    return (
        <div
            ref={containerRef}
            className={`gyg-widget-container min-h-[300px] ${className}`}
        >
            {/* Fallback content while widget loads */}
            <div className="gyg-fallback flex items-center justify-center h-full py-8">
                <div className="text-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-white/50">Loading activities...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Memoize to prevent unnecessary re-renders
export default memo(GetYourGuideWidget);

// Export location IDs for convenience
export const GYG_LOCATIONS = {
    CYCLADES: '751',
    SANTORINI: '753',
    MYKONOS: '610',
    NAXOS: '2253',
    PAROS: '2252',
    MILOS: '33115',
    IOS: '33116',
    CRETE: '174',
    ATHENS: '163',
    GREECE: '159',
} as const;
