"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const DOCTORS = [
  {
    name: "Анна Лебедева",
    role: "Основатель, эстетическая стоматология",
    img: "/img/doc-1.jpg",
    facts: ["Стаж 19 лет", "Член ESCD", "Обучение в Цюрихе"],
  },
  {
    name: "Михаил Орлов",
    role: "Хирург-имплантолог",
    img: "/img/doc-2.jpg",
    facts: ["Стаж 24 года", "3 000+ имплантов", "Straumann Expert"],
  },
  {
    name: "Мария Соколова",
    role: "Ортодонт",
    img: "/img/doc-3.jpg",
    facts: ["Стаж 9 лет", "Invisalign Diamond", "Детская ортодонтия"],
  },
  {
    name: "Даниил Воронов",
    role: "Ортопед, виниры",
    img: "/img/doc-4.jpg",
    facts: ["Стаж 13 лет", "Цифровой дизайн улыбки", "Ученик Г. Убасси"],
  },
];

export function Doctors() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-doc-img]").forEach((img, i) => {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
        // staggered vertical rhythm on desktop
        if (window.innerWidth >= 1024 && i % 2 === 1) {
          gsap.fromTo(img.closest("article"), { y: 80 }, { y: -40, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        }
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="doctors" data-bg="ivory" className="relative py-28 md:py-40" aria-labelledby="doctors-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-champagne-ink">05 — Команда</p>
            <MaskedTextReveal as="h2" className="display text-[clamp(44px,6vw,104px)]">
              Врачи, которым <em>доверяют</em> врачи
            </MaskedTextReveal>
          </div>
          <p className="measure self-end text-graphite-soft lg:col-span-4 lg:col-start-9">
            Четыре специалиста, один план лечения. Наведите на портрет, чтобы узнать больше.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.08, ease: EASE }}
              className="group"
              tabIndex={0}
              aria-label={`${d.name}, ${d.role}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-pearl">
                <div data-doc-img className="absolute -inset-y-[10%] inset-x-0">
                  <Image src={d.img} alt={`${d.name}, ${d.role}`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                </div>
                {/* Credentials revealed with clip-path */}
                <div className="absolute inset-0 flex flex-col justify-end bg-[#1e1e1c]/72 p-6 text-ivory transition-[clip-path] duration-[0.9s] ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]">
                  <ul className="space-y-3">
                    {d.facts.map((f) => (
                      <li key={f} className="flex items-center gap-3 border-b border-ivory/20 pb-3 text-[15px]">
                        <span className="h-px w-5 bg-champagne" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3 className="display mt-6 text-[32px] leading-none">{d.name}</h3>
              <p className="mt-2 text-[15px] text-graphite-soft">{d.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
