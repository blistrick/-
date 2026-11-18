"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";
import { MagneticButton } from "@/components/ui/magnetic-button";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLANS = [
  {
    name: "Знакомство",
    price: "45 000 ₸",
    note: "засчитывается в лечение",
    items: ["Консультация главного врача", "3D-сканирование и КТ", "Фотопротокол улыбки", "План лечения со сметой"],
  },
  {
    name: "Новая улыбка",
    price: "от 3 100 000 ₸",
    note: "виниры 8–10 зубов",
    featured: true,
    items: ["Цифровой дизайн и примерка", "Керамика ручной работы", "Персональный куратор", "Гарантия 10 лет", "Трансфер на визиты"],
  },
  {
    name: "Забота",
    price: "290 000 ₸",
    note: "в год",
    items: ["2 профессиональные гигиены", "Ежегодная диагностика", "Поддерживающее отбеливание", "Приоритетная запись"],
  },
];

export function Pricing() {
  return (
    <section id="prices" data-bg="ivory" className="relative py-28 md:py-40" aria-labelledby="prices-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-6 text-champagne-ink">08 — Программы</p>
          <MaskedTextReveal as="h2" className="display mx-auto max-w-[16ch] text-[clamp(44px,6vw,104px)]">
            Прозрачные цены, <em>без сюрпризов</em>
          </MaskedTextReveal>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-card)] p-8 md:p-10",
                p.featured
                  ? "bg-graphite text-ivory shadow-[var(--shadow-glow)] ring-1 ring-champagne lg:-my-6 lg:py-16"
                  : "border border-graphite/10 bg-pearl/60",
              )}
            >
              {p.featured && (
                <span className="eyebrow mb-8 self-start rounded-full border border-champagne px-3 py-1.5 text-champagne">
                  Выбор пациентов
                </span>
              )}
              <h3 className="display text-[40px] leading-none">{p.name}</h3>
              <p className="display mt-10 text-[clamp(40px,4vw,60px)] leading-none">{p.price}</p>
              <p className={cn("mt-3 text-[14px]", p.featured ? "text-night-muted" : "text-graphite-soft")}>{p.note}</p>
              <ul className={cn("mt-10 flex-1 space-y-4 border-t pt-8", p.featured ? "border-ivory/15" : "border-graphite/10")}>
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[15px]">
                    <svg viewBox="0 0 16 16" className={cn("mt-1 h-4 w-4 shrink-0", p.featured ? "text-champagne" : "text-champagne-ink")} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                    {it}
                  </li>
                ))}
              </ul>
              <MagneticButton variant={p.featured ? "light" : "ghost"} className="mt-10 w-full">
                Выбрать программу
              </MagneticButton>
            </motion.article>
          ))}
        </div>
        <p className="mt-10 text-center text-[14px] text-graphite-soft">Беспроцентная рассрочка до 24 месяцев · оплата Kaspi, картой или переводом</p>
      </div>
    </section>
  );
}
