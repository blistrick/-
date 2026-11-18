"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: 19, suffix: "", label: "лет практики" },
  { value: 12400, suffix: "+", label: "довольных пациентов" },
  { value: 3200, suffix: "+", label: "установленных имплантов" },
  { value: 10, suffix: " лет", label: "гарантии на работы" },
];

const TECH = [
  { t: "3D-сканер Primescan", d: "Точная цифровая модель за 3 минуты, без оттисков." },
  { t: "КТ с низкой дозой", d: "В 10 раз меньше облучения, чем у классического снимка." },
  { t: "Микроскоп Zeiss", d: "Увеличение ×25 для лечения каналов и реставраций." },
  { t: "Собственная лаборатория", d: "Керамисты работают в соседнем кабинете." },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(value);
    const c = animate(0, value, { duration: 2.2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

export function Technology() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current;
    const v = videoRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // lazy video: attach + play only while visible
    const io = new IntersectionObserver(([e]) => {
      if (!v || reduce) return;
      if (e.isIntersecting) {
        if (!v.src) v.src = "/video/tech-loop.mp4";
        v.play().catch(() => {});
      } else v.pause();
    }, { rootMargin: "200px" });
    io.observe(el);
    if (reduce) return () => io.disconnect();
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-tech-media]", { scale: 0.86 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: "[data-tech-media]", start: "top bottom", end: "center center", scrub: true },
      });
    }, el);
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="technology" data-bg="night" className="relative bg-night py-28 text-night-text md:py-40" aria-labelledby="tech-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-champagne">06 — Технологии</p>
            <h2 id="tech-title" className="display text-[clamp(44px,6vw,104px)]">
              Точность, которую <em className="text-champagne">не видно</em>
            </h2>
          </div>
          <p className="measure self-end text-night-muted lg:col-span-4 lg:col-start-9">
            Оборудование уровня университетских клиник — чтобы лечение было быстрым, предсказуемым и безболезненным.
          </p>
        </div>

        <div data-tech-media className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[#1c1c1a] will-change-transform md:aspect-[21/9]">
          <Image src="/img/tech.jpg" alt="Керамическая коронка на тёмном постаменте в золотом свете" fill sizes="(min-width:1440px) 1344px, 100vw" className="object-cover" />
          <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="none" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <p className="eyebrow absolute bottom-6 left-6 text-night-text/85 md:bottom-10 md:left-10">Безметалловая керамика · ручная работа</p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-12 border-t border-night-text/15 pt-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end pr-4">
              <dt className="mt-3 text-[15px] text-night-muted">{s.label}</dt>
              <dd className="display text-[clamp(44px,5vw,88px)] leading-none text-night-text">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-night-text/10 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t, i) => (
            <motion.li
              key={t.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
              className="group bg-night p-8 transition-colors duration-700 hover:bg-[#1c1c1a]"
            >
              <span className="block h-px w-8 bg-champagne transition-all duration-700 group-hover:w-16" />
              <h3 className="mt-6 text-[18px] font-medium">{t.t}</h3>
              <p className="mt-3 text-[15px] text-night-muted">{t.d}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
