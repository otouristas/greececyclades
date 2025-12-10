/**
 * Service Worker Registration and Management
 * Provides hooks for PWA functionality
 */

export interface ServiceWorkerConfig {
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onOffline?: () => void;
    onOnline?: () => void;
}

// Register service worker
export async function registerServiceWorker(config: ServiceWorkerConfig = {}) {
    if (!('serviceWorker' in navigator)) {
        console.log('[PWA] Service workers not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
        });

        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content available
                    config.onUpdate?.(registration);
                } else if (newWorker.state === 'activated') {
                    // Content cached for offline use
                    config.onSuccess?.(registration);
                }
            });
        });

        console.log('[PWA] Service worker registered successfully');
        return registration;
    } catch (error) {
        console.error('[PWA] Service worker registration failed:', error);
        return null;
    }
}

// Unregister service worker
export async function unregisterServiceWorker() {
    if (!('serviceWorker' in navigator)) return false;

    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
        console.log('[PWA] Service worker unregistered');
        return true;
    } catch (error) {
        console.error('[PWA] Failed to unregister service worker:', error);
        return false;
    }
}

// Check if app can be installed
export function useInstallPrompt() {
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    let isInstallable = false;

    if (typeof window !== 'undefined') {
        window.addEventListener('beforeinstallprompt', (e: Event) => {
            e.preventDefault();
            deferredPrompt = e as BeforeInstallPromptEvent;
            isInstallable = true;
        });

        window.addEventListener('appinstalled', () => {
            deferredPrompt = null;
            isInstallable = false;
            console.log('[PWA] App installed successfully');
        });
    }

    const promptInstall = async () => {
        if (!deferredPrompt) return false;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;

        return outcome === 'accepted';
    };

    return { isInstallable, promptInstall };
}

// Subscribe to push notifications
export async function subscribeToPush(vapidPublicKey: string) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('[PWA] Push not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;

        // Check if already subscribed
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            });
        }

        console.log('[PWA] Push subscription:', subscription.endpoint);
        return subscription;
    } catch (error) {
        console.error('[PWA] Push subscription failed:', error);
        return null;
    }
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        console.log('[PWA] Notifications not supported');
        return 'denied';
    }

    const permission = await Notification.requestPermission();
    console.log('[PWA] Notification permission:', permission);
    return permission;
}

// Send message to service worker
export function postMessageToSW(message: object) {
    navigator.serviceWorker.controller?.postMessage(message);
}

// Cache an island guide for offline
export function cacheIslandForOffline(islandSlug: string) {
    postMessageToSW({ type: 'CACHE_ISLAND', island: islandSlug });
}

// Clear all caches
export function clearAllCaches() {
    postMessageToSW({ type: 'CLEAR_CACHE' });
}

// Monitor online/offline status
export function useOnlineStatus(config: ServiceWorkerConfig = {}) {
    if (typeof window === 'undefined') return true;

    window.addEventListener('online', () => {
        config.onOnline?.();
    });

    window.addEventListener('offline', () => {
        config.onOffline?.();
    });

    return navigator.onLine;
}

// Helper: Convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

// Type declaration for install prompt
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
