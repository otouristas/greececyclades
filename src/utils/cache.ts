interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl: options.ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    // Check if expired
    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.ttl && now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

class LocalStorageCache {
  private prefix: string;
  private maxSize: number;

  constructor(prefix: string = 'cache_', maxSize: number = 50) {
    this.prefix = prefix;
    this.maxSize = maxSize;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    try {
      const item: CacheItem<T> = {
        data: value,
        timestamp: Date.now(),
        ttl: options.ttl
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(item));
      this.cleanup();
    } catch (e) {
      // Handle quota exceeded error
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        this.cleanup();
        // Try again after cleanup
        try {
          localStorage.setItem(this.getKey(key), JSON.stringify({
            data: value,
            timestamp: Date.now(),
            ttl: options.ttl
          }));
        } catch (e2) {
          console.warn('Failed to cache item:', e2);
        }
      }
    }
  }

  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.getKey(key));
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);

      // Check if expired
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem(this.getKey(key));
        return null;
      }

      return item.data;
    } catch (e) {
      console.error('Failed to get cached item:', e);
      return null;
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  private cleanup(): void {
    const items: Array<{ key: string; timestamp: number }> = [];
    const now = Date.now();

    // Collect all cache items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item = JSON.parse(itemStr);
            if (!item.ttl || now - item.timestamp <= item.ttl) {
              items.push({ key, timestamp: item.timestamp });
            } else {
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          localStorage.removeItem(key!);
        }
      }
    }

    // Remove oldest items if over max size
    if (items.length > this.maxSize) {
      items.sort((a, b) => a.timestamp - b.timestamp);
      const toRemove = items.slice(0, items.length - this.maxSize);
      toRemove.forEach(({ key }) => localStorage.removeItem(key));
    }
  }
}

// Export singleton instances
export const memoryCache = new MemoryCache(100);
export const localStorageCache = new LocalStorageCache('dc_cache_', 50);

// Utility functions
export function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions & { useLocalStorage?: boolean } = {}
): Promise<T> {
  const cache = options.useLocalStorage ? localStorageCache : memoryCache;
  
  // Check cache first
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return Promise.resolve(cached);
  }

  // Fetch and cache
  return fetcher().then(data => {
    cache.set(key, data, options);
    return data;
  });
}

// Cache invalidation
export function invalidateCache(pattern?: string): void {
  if (pattern) {
    // Invalidate matching keys
    memoryCache.clear(); // Simplified - could implement pattern matching
    localStorageCache.clear();
  } else {
    memoryCache.clear();
    localStorageCache.clear();
  }
}

