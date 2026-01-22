"use client";

import { useState, useCallback } from "react";

interface UseLoadingOptions {
  initialLoading?: boolean;
  delay?: number; // Minimum loading time to prevent flashing
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { initialLoading = false, delay = 0 } = options;
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<Error | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    if (delay > 0) {
      setTimeout(() => setIsLoading(false), delay);
    } else {
      setIsLoading(false);
    }
  }, [delay]);

  const setLoadingError = useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const executeAsync = useCallback(async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T | null> => {
    try {
      startLoading();
      const result = await asyncFunction();
      stopLoading();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setLoadingError(error);
      return null;
    }
  }, [startLoading, stopLoading, setLoadingError]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setLoadingError,
    executeAsync,
    reset,
  };
}