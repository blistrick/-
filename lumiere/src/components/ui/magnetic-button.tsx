"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "ghost" | "light";
  strength?: number;
  className?: string;
};

/** Magnetic CTA — pulls toward the pointer, springs back on leave. Inspired by 21st.dev magnetic-button. */
export function MagneticButton({ children, href = "#booking", variant = "solid", strength = 0.35, className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  const tx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const ty = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    tx.set(dx * strength * 0.4);
    ty.set(dy * strength * 0.4);
  };
  const onLeave = () => {
    x.set(0); y.set(0); tx.set(0); ty.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 text-[15px] font-medium tracking-wide transition-colors duration-500",
        variant === "solid" && "bg-graphite text-ivory",
        variant === "ghost" && "border border-graphite/25 text-graphite hover:border-graphite",
        variant === "light" && "bg-ivory/90 text-graphite backdrop-blur",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0",
          variant === "solid" ? "bg-champagne-ink" : "bg-pearl",
        )}
      />
      <motion.span style={{ x: tx, y: ty }} className="relative z-10 flex items-center gap-3">
        {children}
      </motion.span>
    </motion.a>
  );
}
