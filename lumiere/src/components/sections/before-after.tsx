"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

const CASES = [
  { id: "veneers", label: "Виниры · 8 зубов", before: "/img/ba-before.jpg", after: "/img/ba-after.jpg", time: "3 визита" },
];

/** Before/after with inertia: the handle follows a spring, keyboard accessible (←/→). */
export function BeforeAfter() {
  const wrap = useRef<HTMLDivElement>(null);
  const target = useMotionValue(50);
  const pos = useSpring(target, { stiffness: 120, damping: 22, mass: 0.9 });
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const [val, setVal] = useState(50);
  const dragging = useRef(false);
  const c = CASES[0];

  useEffect(() => pos.on("change", (v) => setVal(Math.round(v))), [pos]);

  // Gentle hint animation when first seen
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        animate(target, [50, 30, 68, 50], { duration: 2.4, ease: [0.22, 1, 0.36, 1] });
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const setFromX = (clientX: number) => {
    const r = wrap.current!.getBoundingClientRect();
    target.set(Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="results" data-bg="ivory" className="relative py-28 md:py-40" aria-labelledby="ba-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-champagne-ink">04 — До и после</p>
            <MaskedTextReveal as="h2" className="display text-[clamp(44px,6vw,104px)]">
              Естественность — <em>наш</em> почерк
            </MaskedTextReveal>
          </div>
          <p className="measure self-end text-graphite-soft lg:col-span-4 lg:col-start-9">
            Мы не делаем «одинаковые» улыбки. Форма, прозрачность и оттенок подбираются под возраст, черты лица и характер.
          </p>
        </div>

        <div
          ref={wrap}
          className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[var(--radius-card)] bg-pearl md:aspect-[16/9]"
          data-cursor="Тяните"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromX(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <Image src={c.after} alt="После лечения: ровные естественные зубы" fill sizes="(min-width:1440px) 1344px, 100vw" className="object-cover" />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <Image src={c.before} alt="До лечения" fill sizes="(min-width:1440px) 1344px, 100vw" className="object-cover" />
          </motion.div>

          <span className="eyebrow absolute left-5 top-5 rounded-full bg-ivory/90 px-3 py-1.5 text-graphite md:left-8 md:top-8">До</span>
          <span className="eyebrow absolute right-5 top-5 rounded-full bg-ivory/90 px-3 py-1.5 text-graphite md:right-8 md:top-8">После</span>

          <motion.div className="absolute inset-y-0 w-px -translate-x-1/2 bg-ivory" style={{ left }}>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Сравнение до и после"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={val}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") target.set(Math.max(2, target.get() - 5));
                if (e.key === "ArrowRight") target.set(Math.min(98, target.get() + 5));
              }}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border border-ivory/70 bg-[#1e1e1c]/35 text-ivory shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
            >
              <span aria-hidden>‹</span>
              <span aria-hidden>›</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[14px] text-graphite-soft">
          <span>{c.label} · {c.time}</span>
          <span>Иллюстрация. Реальные кейсы — на консультации, с согласия пациентов.</span>
        </div>
      </div>
    </section>
  );
}
