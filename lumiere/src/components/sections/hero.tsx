"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useReady } from "@/lib/use-ready";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ready = useReady();
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient video: desktop only, attached after first paint so it never competes with LCP
  useEffect(() => {
    const v = videoRef.current;
    if (!ready || !v) return;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!ok) return;
    v.src = "/video/hero-loop.mp4";
    // play only while the hero is on screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [ready]);

  // Mouse tilt (springs) — applied to inner wrappers so GSAP scroll transforms don't collide
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const bgX = useTransform(sx, (v) => v * -10);
  const bgY = useTransform(sy, (v) => v * -8);
  const midX = useTransform(sx, (v) => v * 22);
  const midY = useTransform(sy, (v) => v * 14);
  const midR = useTransform(sx, (v) => v * 2);
  const fgX = useTransform(sx, (v) => v * 48);
  const fgY = useTransform(sy, (v) => v * 32);
  const fgR = useTransform(sx, (v) => v * -6);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    if (desktop) window.addEventListener("pointermove", onMove, { passive: true });

    // Scroll parallax: layer speeds 0.2 / 0.5 / 0.9 (simplified on mobile)
    const ctx = gsap.context(() => {
      const h = () => el.offsetHeight;
      const speeds = desktop ? { bg: 0.2, mid: 0.5, fg: 0.9 } : { bg: 0.15, mid: 0.3, fg: 0.45 };
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-layer='bg']", { y: () => h() * speeds.bg, ease: "none", scrollTrigger: st });
      gsap.to("[data-layer='mid']", { y: () => -h() * speeds.mid * 0.6, ease: "none", scrollTrigger: st });
      gsap.to("[data-layer='fg']", { y: () => -h() * speeds.fg, ease: "none", scrollTrigger: st });
      gsap.to("[data-layer='copy']", { y: () => h() * 0.12, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
    }, el);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={root}
      data-bg="ivory"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ivory"
      aria-label="LUMIÈRE Dental — искусство вашей улыбки"
    >
      {/* Layer 1 — interior (video + poster), speed 0.2 */}
      <div data-layer="bg" className="absolute inset-0 will-change-transform">
        <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-8">
          <div className="bg-in absolute inset-0" style={{ animationDelay: "0.6s" }}>
            <div className="kenburns absolute inset-0">
              <Image src="/img/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[70%_50%]" />
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover object-[70%_50%] opacity-0 transition-opacity duration-1000"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                onPlaying={(e) => {
                  e.currentTarget.playbackRate = 0.8;
                  e.currentTarget.style.opacity = "1";
                }}
              />
            </div>
          </div>
        </motion.div>
        {/* soft ivory veil for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 to-ivory/0 md:via-ivory/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      {/* Layer 2 — travertine vase, speed 0.5 */}
      <div data-layer="mid" className="pointer-events-none absolute bottom-[-4%] right-[4%] w-[34vw] max-w-[440px] min-w-[180px] will-change-transform md:right-[9%]">
        <motion.div
          style={{ x: midX, y: midY, rotate: midR }}
          initial={{ y: 120, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
        >
          <Image src="/img/hero-mid.png" alt="" width={832} height={1248} priority sizes="(min-width:768px) 34vw, 45vw" className="h-auto w-full drop-shadow-[0_40px_60px_rgba(30,30,28,0.18)]" />
        </motion.div>
      </div>

      {/* Layer 3 — frosted pearl glass, speed 0.9, blurred as if near the lens */}
      <div data-layer="fg" className="pointer-events-none absolute right-[-14%] top-[-12%] w-[52vw] max-w-[640px] min-w-[260px] rotate-180 will-change-transform md:right-[-8%] md:top-[-18%]">
        <motion.div
          style={{ x: fgX, y: fgY, rotate: fgR }}
          initial={{ y: 200, opacity: 0, rotate: -12 }}
          animate={ready ? { y: 0, opacity: 0.75, rotate: 0 } : {}}
          transition={{ duration: 2, delay: 0.45, ease: EASE }}
        >
          <Image src="/img/hero-fg-blur.png" alt="" width={1104} height={1104} sizes="(min-width:768px) 52vw, 60vw" className="h-auto w-full" />
        </motion.div>
      </div>

      {/* Copy */}
      <div data-layer="copy" className="hero-copy relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-28 md:justify-center md:px-12 md:pb-0">
        {/* CSS-driven entrance: paints without waiting for hydration (fast LCP) */}
        <p className="rise eyebrow mb-8 flex items-center gap-4 text-champagne-ink" style={{ animationDelay: "1.15s" }}>
          <span className="h-px w-10 bg-champagne" /> Ателье эстетической стоматологии · Алматы
        </p>

        <h1 className="display h1 max-w-[13ch] text-graphite" aria-label="Искусство вашей улыбки">
          {[["Искусство"], ["вашей", "улыбки"]].map((line, li) => (
            <span key={li} aria-hidden className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span className="mask-up block" style={{ animationDelay: `${1.25 + li * 0.08}s` }}>
                {line.map((w, wi) =>
                  w === "вашей" ? (
                    <em key={wi} className="text-champagne-ink">{w} </em>
                  ) : (
                    <span key={wi}>{w}</span>
                  ),
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="rise-blur measure mt-8 max-w-[44ch] text-[17px] text-graphite-soft md:text-[18px]"
          style={{ animationDelay: "1.6s" }}
        >
          Мы создаём улыбки, которые выглядят естественно и живут долго. Без спешки, без боли — с вниманием к каждой
          детали.
        </p>

        <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "1.75s" }}>
          <MagneticButton>
            Записаться на консультацию
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </MagneticButton>
          <MagneticButton href="#services" variant="ghost">
            Услуги
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden
      >
        <span className="eyebrow text-[10px] text-graphite-soft">Листайте</span>
        <span className="relative h-14 w-px overflow-hidden bg-graphite/10">
          <span className="scrollcue absolute inset-0 bg-graphite" />
        </span>
      </motion.div>
    </section>
  );
}
