"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchLite } from "@/lib/motion-mode";

/**
 * Dot + ring cursor. Ring grows over links/buttons/[data-cursor].
 * Perf: no mix-blend-mode (it forced a full-screen re-blend every frame), no React re-render per move —
 * positions are written straight to transforms inside one rAF loop with lerp for the ring.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || isTouchLite()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    let hoverEl: Element | null = null;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor], input, select, textarea, label") ?? null;
      if (t !== hoverEl) {
        hoverEl = t;
        const text = (t as HTMLElement | null)?.dataset?.cursor ?? "";
        const r = ring.current;
        if (r) r.dataset.state = text ? "label" : t ? "hover" : "idle";
        if (label.current) label.current.textContent = text;
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="cursor">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" data-state="idle">
        <span ref={label} className="eyebrow text-[10px]" />
      </div>
    </div>
  );
}
