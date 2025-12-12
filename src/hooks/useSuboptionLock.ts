import { useState, useCallback, useEffect } from "react";
import { validateSecretKey, getSuboptionById } from "../config/suboptionsLocks";

interface UnlockedState {
  [suboptionId: string]: boolean;
}

const STORAGE_KEY = "scholar-academy-unlocks";

/**
 * Custom hook to manage suboption lock/unlock states
 * Persists unlock state to localStorage
 */
export function useSuboptionLock() {
  const [unlockedItems, setUnlockedItems] = useState<UnlockedState>(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Persist to localStorage whenever state changes
  const updateLocalStorage = useCallback((state: UnlockedState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Dispatch a custom event so other hook instances / components can react in real-time
      try {
        window.dispatchEvent(
          new CustomEvent("scholar-unlocks-changed", { detail: state })
        );
      } catch (e) {
        // ignore if event dispatching fails in some environments
      }
    } catch {
      console.error("Failed to save unlock state to localStorage");
    }
  }, []);

  /**
   * Attempt to unlock a suboption with secret key
   */
  const unlock = useCallback(
    (suboptionId: string, secretKey: string): boolean => {
      if (validateSecretKey(suboptionId, secretKey)) {
        const newState = { ...unlockedItems, [suboptionId]: true };
        setUnlockedItems(newState);
        updateLocalStorage(newState);
        return true;
      }
      return false;
    },
    [unlockedItems, updateLocalStorage]
  );

  /**
   * Lock a suboption (requires admin secret key)
   */
  const lock = useCallback(
    (suboptionId: string, adminKey: string = "admin-master-key"): boolean => {
      // You can add an admin master key check here
      if (adminKey === "admin-master-key-2024") {
        const newState = { ...unlockedItems, [suboptionId]: false };
        setUnlockedItems(newState);
        updateLocalStorage(newState);
        return true;
      }
      return false;
    },
    [unlockedItems, updateLocalStorage]
  );

  /**
   * Check if a suboption is unlocked
   */
  const isUnlocked = useCallback(
    (suboptionId: string): boolean => {
      const subitem = getSuboptionById(suboptionId);
      if (!subitem) return true; // If not found, allow access
      // If we have an explicit stored value for this suboption, respect it
      if (Object.prototype.hasOwnProperty.call(unlockedItems, suboptionId)) {
        return unlockedItems[suboptionId] === true;
      }
      // Otherwise, fall back to the default configured lock state
      return !subitem.locked;
    },
    [unlockedItems]
  );

  /**
   * Get all unlocked state info
   */
  const getUnlockedState = useCallback(() => unlockedItems, [unlockedItems]);

  /**
   * Clear all unlocks (reset to defaults)
   */
  const resetAll = useCallback(
    (adminKey: string = "") => {
      if (adminKey === "admin-master-key-2024") {
        setUnlockedItems({});
        updateLocalStorage({});
        return true;
      }
      return false;
    },
    [updateLocalStorage]
  );

  // Listen for unlock changes dispatched elsewhere in the app (real-time sync)
  useEffect(() => {
    const handler = (e: any) => {
      try {
        const newState =
          e?.detail ?? JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        setUnlockedItems(newState);
      } catch (err) {
        // ignore parse errors
      }
    };

    window.addEventListener(
      "scholar-unlocks-changed",
      handler as EventListener
    );
    return () => {
      window.removeEventListener(
        "scholar-unlocks-changed",
        handler as EventListener
      );
    };
  }, []);

  return {
    unlock,
    lock,
    isUnlocked,
    getUnlockedState,
    resetAll,
  };
}
