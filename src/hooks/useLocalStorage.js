import { useState, useEffect } from "react";

// Works exactly like useState, but reads/writes the value to localStorage
// under `key`, so it survives page refreshes and browser restarts.
// When a real backend is ready, swap this out for API calls —
// every page that uses it only needs its import line changed.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, app still works in-memory
    }
  }, [key, value]);

  return [value, setValue];
}
