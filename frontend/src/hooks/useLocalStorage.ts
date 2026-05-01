"use client";

import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolvedValue =
          typeof newValue === "function" ? (newValue as (prev: T) => T)(prev) : newValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
        } catch {
          //
        }
        return resolvedValue;
      });
    },
    [key]
  );

  return [value, setStoredValue] as const;
};