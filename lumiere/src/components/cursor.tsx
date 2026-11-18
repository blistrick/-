"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Dot + ring cursor. Ring grows over links/buttons/[data-cursor]. Fine pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor], input, select, textarea, label");
      setHover(!!t);
      setLabel((t as HTMLElement | null)?.dataset?.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference">
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f2ec]"
        style={{ x, y }}
      />
      <motion.div
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f6f2ec]/70"
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 96 : hover ? 64 : 34, height: label ? 96 : hover ? 64 : 34 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && <span className="eyebrow text-[10px] text-[#f6f2ec]">{label}</span>}
      </motion.div>
    </div>
  );
}
