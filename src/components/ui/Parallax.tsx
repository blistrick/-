"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Travel as a share of the element height. Kept small on purpose. */
  amount?: number;
  className?: string;
};

/**
 * Decorative depth only: this wraps images, never text or controls.
 * One rAF-throttled scroll listener per layer, `will-change` dropped once
 * the scroll settles so idle layers stop holding GPU memory.
 */
export function Parallax({ children, amount = 0.12, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let settle = 0;
    let active = false;

    const apply = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;

      // -1 when the element sits below the fold, 1 when it is above it.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const shift = progress * rect.height * amount;
      node.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!active) {
        node.style.willChange = "transform";
        active = true;
      }
      if (!frame) frame = requestAnimationFrame(apply);

      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        node.style.willChange = "auto";
        active = false;
      }, 220);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount]);

  return (
    <div ref={ref} className={cn("will-change-auto", className)}>
      {children}
    </div>
  );
}
