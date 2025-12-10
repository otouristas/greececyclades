/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

// Type for background sync event
interface SyncEvent extends ExtendableEvent {
    tag: string;
}

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const ISLAND_GUIDES_CACHE = 'island-guides-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/offline.html',
];

// Island guide routes to cache for offline access
const ISLAND_ROUTES = [
    '/islands/santorini',
    '/islands/mykonos',
    '/islands/paros',
    '/islands/naxos',
    '/islands/milos',
    '/islands/ios',
    '/islands/sifnos',
    '/islands/folegandros',
    '/islands/amorgos',
    '/islands/serifos',
    '/islands/kea',
    '/islands/kythnos',
];

// Install event - cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== ISLAND_GUIDES_CACHE)
                    .map((key) => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', (event: FetchEvent) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip API requests and external resources
    if (url.pathname.startsWith('/api') ||
        url.hostname.includes('supabase') ||
        url.hostname.includes('googleapis') ||
        url.hostname.includes('mapbox')) {
        return;
    }

    // For island guide pages - cache first, then network
    if (ISLAND_ROUTES.some(route => url.pathname.includes(route))) {
        event.respondWith(
            caches.open(ISLAND_GUIDES_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    const fetchPromise = fetch(request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // Return cached response if network fails
                        if (cachedResponse) return cachedResponse;
                        return caches.match('/offline.html') as Promise<Response>;
                    });

                    // Return cached if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // For static assets - cache first
    if (request.destination === 'image' ||
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'font') {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;

                return fetch(request).then((networkResponse) => {
                    return caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // For HTML pages - network first, cache fallback
    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                // Cache the response for future offline use
                return caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => {
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    // Return offline page for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/offline.html') as Promise<Response>;
                    }
                    return new Response('Offline', { status: 503 });
                });
            })
    );
});

// Handle push notifications
self.addEventListener('push', (event: PushEvent) => {
    if (!event.data) return;

    const data = event.data.json();
    const options: NotificationOptions = {
        body: data.body,
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        data: {
            url: data.url || '/',
        },
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event: NotificationEvent) => {
    event.notification.close();

    const url = event.notification.data?.url || '/';

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
            // Focus existing window if open
            for (const client of clients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open new window
            return self.clients.openWindow(url);
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    const syncEvent = event as SyncEvent;
    console.log('[SW] Background sync:', syncEvent.tag);

    if (syncEvent.tag === 'sync-favorites') {
        syncEvent.waitUntil(syncFavorites());
    }

    if (syncEvent.tag === 'sync-trip-plans') {
        syncEvent.waitUntil(syncTripPlans());
    }
});

// Sync favorites when back online
async function syncFavorites() {
    // Get queued favorites from IndexedDB and sync
    console.log('[SW] Syncing favorites...');
}

// Sync trip plans when back online
async function syncTripPlans() {
    // Get queued trip plans from IndexedDB and sync
    console.log('[SW] Syncing trip plans...');
}

// Message handler for communication with main thread
self.addEventListener('message', (event: ExtendableMessageEvent) => {
    if (event.data?.type === 'CACHE_ISLAND') {
        const islandSlug = event.data.island;
        cacheIslandGuide(islandSlug);
    }

    if (event.data?.type === 'CLEAR_CACHE') {
        clearAllCaches();
    }
});

// Cache a specific island guide for offline
async function cacheIslandGuide(slug: string) {
    const cache = await caches.open(ISLAND_GUIDES_CACHE);
    const url = `/islands/${slug}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            await cache.put(url, response);
            console.log('[SW] Cached island guide:', slug);
        }
    } catch (error) {
        console.error('[SW] Failed to cache island:', slug, error);
    }
}

// Clear all caches
async function clearAllCaches() {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    console.log('[SW] All caches cleared');
}

export { };
