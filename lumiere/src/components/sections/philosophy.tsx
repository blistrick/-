"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTouchLite } from "@/lib/motion-mode";

gsap.registerPlugin(ScrollTrigger);

const QUOTE =
  "Мы верим, что красивая улыбка начинается с *тишины*: с внимательного разговора, точной диагностики и времени, которое мы не торопим. Каждая работа — это *ручная* работа.";

export function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((w) => (w.style.opacity = "1"));
      return;
    }
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" },
      (c) => {
        const desktop = (c.conditions as { desktop: boolean }).desktop && !isTouchLite();
        const tl = gsap.timeline({
          scrollTrigger: desktop
            ? { trigger: el, start: "top top", end: "+=140%", scrub: 0.6, pin: true, anticipatePin: 1 }
            : { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        });
        tl.to("[data-word]", { opacity: 1, stagger: 0.08, ease: "none" }, 0)
          .fromTo("[data-ph-img] [data-ph-inner]", { yPercent: -4 }, { yPercent: 4, ease: "none" }, 0)
          .fromTo("[data-ph-line]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      },
      el,
    );
    return () => mm.revert();
  }, []);

  const words = QUOTE.split(" ");

  return (
    <section
      id="philosophy"
      ref={root}
      data-bg="pearl"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24 md:py-32"
      aria-labelledby="philosophy-title"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-5 md:px-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <p id="philosophy-title" className="eyebrow text-champagne-ink">
            01 — Философия
          </p>
          <span data-ph-line className="mt-6 block h-px w-full origin-left bg-champagne" />
          <div data-ph-img className="relative mt-10 hidden aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-pearl lg:block">
            {/* inner layer is 12% taller than the frame, so the ±4% parallax never reveals an edge */}
            <div data-ph-inner className="absolute inset-x-0 -inset-y-[6%] will-change-transform">
              <Image src="/img/chair.jpg" alt="Кабинет LUMIÈRE: кресло в тонах травертина и льна" fill sizes="25vw" className="object-cover object-center" />
            </div>
          </div>
        </div>

        <blockquote className="lg:col-span-8 lg:col-start-5">
          <p className="display text-[clamp(34px,4.6vw,76px)] leading-[1.08] text-graphite">
            {words.map((w, i) => {
              const em = w.startsWith("*");
              const clean = w.replace(/\*/g, "");
              return (
                <span key={i} data-word className={`inline-block ${em ? "opacity-75" : "opacity-50"}`}>
                  {em ? <em className="text-champagne-ink">{clean}</em> : clean}
                  {i < words.length - 1 && " "}
                </span>
              );
            })}
          </p>
          <footer className="mt-12 flex items-center gap-5">
            <span className="h-12 w-12 overflow-hidden rounded-full bg-ivory ring-1 ring-champagne/50">
              <Image src="/img/doc-1.jpg" alt="" width={96} height={96} className="h-full w-full object-cover" />
            </span>
            <span>
              <span className="block text-[15px] font-medium">Д-р Айгерим Сейткали</span>
              <span className="block text-[14px] text-graphite-soft">Основатель, главный врач</span>
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
