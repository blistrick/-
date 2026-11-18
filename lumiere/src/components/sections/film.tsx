"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

/**
 * «Фильм о клинике».
 * PROMO_SRC — сюда подключается экспорт ролика из Motion (motion.so) 15–30 сек.
 * Пока ролика нет, используется эмбиент-петля из Krea.
 */
const PROMO_SRC = "/video/hero-loop.mp4";
const PROMO_POSTER = "/img/hero-bg.jpg";

export function Film() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [64, 28]);
  const [open, setOpen] = useState(false);
  const bg = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = bg.current;
    const el = root.current;
    if (!v || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = PROMO_SRC;
        v.play().catch(() => {});
      } else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      opener?.focus();
    };
  }, [open]);

  return (
    <section ref={root} id="film" data-bg="ivory" className="relative px-5 py-10 md:px-12" aria-label="Фильм о клинике">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative mx-auto aspect-[4/5] max-w-[1440px] overflow-hidden bg-pearl will-change-transform sm:aspect-[16/9]"
      >
        <Image src={PROMO_POSTER} alt="" fill sizes="100vw" className="object-cover" />
        <video ref={bg} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="none" aria-hidden />
        <div className="absolute inset-0 bg-[#1e1e1c]/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-center text-ivory">
          <p className="eyebrow text-ivory/90">Фильм о LUMIÈRE · 0:30</p>
          <h2 className="display max-w-[14ch] text-[clamp(40px,6vw,104px)]">
            Один день <em>в ателье</em>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-cursor="Смотреть"
            className="group flex h-24 w-24 items-center justify-center rounded-full border border-ivory/60 bg-ivory/15 backdrop-blur-md transition-all duration-700 hover:scale-110 hover:bg-ivory hover:text-graphite"
            aria-label="Смотреть фильм о клинике"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex items-center justify-center bg-night/92 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Фильм о клинике"
          >
            <motion.video
              src={PROMO_SRC}
              poster={PROMO_POSTER}
              className="max-h-[86vh] w-full max-w-[1280px] rounded-[var(--radius-card)]"
              controls
              autoPlay
              playsInline
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-night-text/40 text-night-text"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              autoFocus
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
