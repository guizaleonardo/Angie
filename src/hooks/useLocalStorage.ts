import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../services/storage';

/**
 * Estado persistido en localStorage a través del servicio de almacenamiento.
 * Los componentes no deben llamar a localStorage directamente.
 */
export function useLocalStorage<T>(key: string, fallback: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stored = readJSON<T>(key);
    return stored ?? fallback;
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      writeJSON(key, value);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [key, value]);

  return [value, setValue];
}
