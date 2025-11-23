import { useState, useEffect, useCallback } from 'react';
import { getCached, memoryCache, localStorageCache, CacheOptions } from '../utils/cache';

interface UseCacheOptions extends CacheOptions {
  useLocalStorage?: boolean;
  enabled?: boolean;
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const { enabled = true, useLocalStorage = false, ...cacheOptions } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cache = useLocalStorage ? localStorageCache : memoryCache;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getCached(key, fetcher, {
        useLocalStorage,
        ...cacheOptions
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [key, enabled, useLocalStorage, ...Object.values(cacheOptions)]);

  useEffect(() => {
    // Check cache first
    const cached = cache.get<T>(key);
    if (cached !== null) {
      setData(cached);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [key, cache, fetchData]);

  const invalidate = useCallback(() => {
    cache.delete(key);
    fetchData();
  }, [key, cache, fetchData]);

  const update = useCallback((newData: T) => {
    setData(newData);
    cache.set(key, newData, cacheOptions);
  }, [key, cache, ...Object.values(cacheOptions)]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    invalidate,
    update
  };
}

