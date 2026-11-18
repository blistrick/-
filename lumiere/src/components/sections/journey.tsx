"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Знакомство",
    text: "Неспешная консультация за чашкой чая. Слушаем, чего вы хотите, и рассказываем, что возможно.",
    meta: "60 минут",
    img: "/img/suite.jpg",
  },
  {
    n: "02",
    title: "Диагностика",
    text: "3D-сканирование, КТ и фотопротокол. Без оттисков и неудобных ложек.",
    meta: "15 минут",
    img: "/img/scanner.jpg",
  },
  {
    n: "03",
    title: "Цифровой дизайн",
    text: "Моделируем будущую улыбку и показываем её на вашем лице ещё до начала лечения.",
    meta: "3–5 дней",
    img: "/img/porcelain.jpg",
  },
  {
    n: "04",
    title: "Лечение",
    text: "Работаем в одном кабинете одной командой. Седация и комфортный ритм визитов.",
    meta: "по плану",
    img: "/img/craft.jpg",
  },
  {
    n: "05",
    title: "Результат и забота",
    text: "Гарантия до 10 лет, персональный куратор и бережные профилактические визиты.",
    meta: "навсегда",
    img: "/img/smile.jpg",
  },
];

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.8 } });
      // parallax inside each card, driven by the horizontal tween
      gsap.utils.toArray<HTMLElement>("[data-step-img]").forEach((img) => {
        gsap.fromTo(img, { xPercent: -10 }, {
          xPercent: 10, ease: "none",
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    }, el);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="journey" data-bg="pearl" className="relative overflow-hidden py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0" aria-labelledby="journey-title">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] items-end justify-between gap-8 px-5 md:px-12 lg:mb-14">
        <div>
          <p className="eyebrow mb-6 text-champagne-ink">03 — Путь пациента</p>
          <h2 id="journey-title" className="display text-[clamp(40px,5vw,88px)]">
            Пять шагов <em className="text-champagne-ink">к улыбке</em>
          </h2>
        </div>
        <div className="hidden w-[28%] lg:block" aria-hidden>
          <div className="h-px w-full bg-graphite/15">
            <div data-progress className="h-px origin-left bg-graphite" />
          </div>
        </div>
      </div>

      <div ref={track} className="flex flex-col gap-5 px-5 md:px-12 lg:w-max lg:flex-row lg:gap-6 lg:pr-[12vw]">
        {STEPS.map((s) => (
          <article key={s.n} className="group relative grid shrink-0 grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-ivory shadow-[var(--shadow-soft)] sm:grid-cols-2 lg:h-[58vh] lg:w-[min(64vw,880px)]">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
              <div data-step-img className="absolute -inset-x-[12%] inset-y-0">
                <Image src={s.img} alt="" fill sizes="(min-width:1024px) 32vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
              <div className="flex items-start justify-between">
                <span className="display text-[64px] leading-none text-champagne-ink/80 md:text-[96px]" aria-hidden>{s.n}</span>
                <span className="eyebrow rounded-full border border-graphite/15 px-3 py-1.5 text-graphite-soft">{s.meta}</span>
              </div>
              <div>
                <h3 className="display text-[clamp(32px,3vw,52px)]">{s.title}</h3>
                <p className="mt-4 max-w-[34ch] text-graphite-soft">{s.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
