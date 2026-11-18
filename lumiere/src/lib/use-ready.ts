"use client";

import { useEffect, useState } from "react";

/** True once the preloader curtain has started lifting. */
export function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!document.documentElement.dataset.loading) {
      const t = setTimeout(() => setReady(true), 60);
      return () => clearTimeout(t);
    }
    const on = () => setTimeout(() => setReady(true), 250);
    window.addEventListener("lumiere:ready", on, { once: true });
    return () => window.removeEventListener("lumiere:ready", on);
  }, []);
  return ready;
}
