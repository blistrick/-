"use client";

import { useEffect } from "react";

/**
 * ≤1.5s: the monogram is drawn with a hairline, then the curtain lifts.
 * Pure CSS so it never blocks first paint; JS only announces "ready" for scroll/hover animations.
 */
export function Preloader() {
  useEffect(() => {
    const skip =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    document.documentElement.dataset.loading = "true";
    const t = setTimeout(() => {
      delete document.documentElement.dataset.loading;
      window.dispatchEvent(new Event("lumiere:ready"));
    }, skip ? 0 : 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div aria-hidden className="preloader pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ivory">
      <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none">
        <circle className="draw" pathLength={1} cx="60" cy="60" r="56" stroke="var(--champagne)" strokeWidth="0.8" />
        <path className="draw" pathLength={1} d="M44 34 V86 H78" stroke="var(--graphite)" strokeWidth="1" />
      </svg>
    </div>
  );
}
