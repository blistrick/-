"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTouchLite } from "@/lib/motion-mode";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll synced with GSAP ScrollTrigger,
 * plus page background transitions driven by `data-bg` on sections.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    // iOS: don't recalc every trigger when the address bar shows/hides (causes jumps & stalls)
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!reduce && !isTouchLite()) {
      lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Section background colour transitions
    const root = document.documentElement;
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]")).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            root.style.setProperty("--page-bg", `var(--${el.dataset.bg})`);
            root.dataset.theme = el.dataset.bg === "night" ? "dark" : "light";
          }
        },
      }),
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      triggers.forEach((t) => t.kill());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
