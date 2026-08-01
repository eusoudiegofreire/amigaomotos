"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lê uma media query via useSyncExternalStore — mesmo padrão usado no Hero para
 * prefers-reduced-motion e o breakpoint mobile. Evita setState síncrono em efeito
 * e mismatch de hidratação (servidor não tem window, assume `serverSnapshot` até
 * o cliente confirmar o valor real).
 */
export function useMediaQuery(query: string, serverSnapshot = false) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverSnapshot, [serverSnapshot]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// mesmo breakpoint (< 768px) usado no Hero pra escolher a variante de frames
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}
