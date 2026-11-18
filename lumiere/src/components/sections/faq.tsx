"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

const EASE = [0.22, 1, 0.36, 1] as const;

const QA = [
  { q: "Будет ли больно?", a: "Нет. Мы используем компьютерную анестезию, которую почти не чувствуешь, а для тревожных пациентов — седацию под контролем анестезиолога." },
  { q: "Сколько служат виниры?", a: "Керамические виниры при правильном уходе служат 15–20 лет. Мы даём гарантию 10 лет и бесплатно наблюдаем результат в программе «Забота»." },
  { q: "Можно ли увидеть результат заранее?", a: "Да. После цифрового дизайна мы делаем временную примерку прямо во рту — вы видите и чувствуете будущую улыбку до начала лечения." },
  { q: "Сколько визитов нужно для имплантации?", a: "Обычно 2–3. Часто имплант и временную коронку ставим в один день, постоянную — через 3–4 месяца." },
  { q: "Есть ли рассрочка?", a: "Да, беспроцентная рассрочка до 24 месяцев без первого взноса. Также выдаём документы для налогового вычета 13%." },
  { q: "Принимаете ли вы детей?", a: "Да, с 6 лет — ортодонт Мария Соколова ведёт детские приёмы в отдельном спокойном кабинете." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-bg="pearl" className="relative py-28 md:py-40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6 text-champagne-ink">09 — Вопросы</p>
          <MaskedTextReveal as="h2" className="display text-[clamp(44px,5vw,88px)]">
            Частые <em>вопросы</em>
          </MaskedTextReveal>
          <p className="mt-8 max-w-[32ch] text-graphite-soft">
            Не нашли ответ? Позвоните{" "}
            <a href="tel:+74950000000" className="whitespace-nowrap text-graphite underline decoration-champagne underline-offset-4">
              +7 495 000-00-00
            </a>{" "}
            — ответит врач, а не колл-центр.
          </p>
        </div>

        <ul className="border-t border-graphite/15 lg:col-span-7 lg:col-start-6">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-graphite/15">
                <h3>
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="display text-[clamp(24px,2.2vw,34px)] leading-tight transition-colors duration-500 group-hover:text-champagne-ink">
                      {item.q}
                    </span>
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphite/20 transition-colors duration-500 group-hover:border-graphite" aria-hidden>
                      <span className="absolute h-px w-4 bg-graphite" />
                      <motion.span className="absolute h-4 w-px bg-graphite" animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.5, ease: EASE }} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="measure pb-8 pr-14 text-graphite-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
