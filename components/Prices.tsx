"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { priceCategories } from "@/lib/data";

export default function Prices() {
  const [activeId, setActiveId] = useState(priceCategories[0].id);
  const active = priceCategories.find((c) => c.id === activeId) ?? priceCategories[0];

  return (
    <section id="prices" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-forest">Цены</span>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Стоимость лечения
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
            Ориентировочные цены на основные услуги клиники. Точная стоимость
            определяется после диагностики и консультации врача.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {priceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                activeId === cat.id
                  ? "border-forest bg-forest text-cream"
                  : "border-border text-ink-soft hover:border-forest hover:text-forest"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10 overflow-hidden rounded-3xl border border-border-soft bg-cream-alt/40">
          <ul className="divide-y divide-border-soft">
            {active.items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 px-5 py-4 text-sm sm:px-8 sm:text-base"
              >
                <span className="text-ink-soft">{item.name}</span>
                <span className="shrink-0 font-medium text-ink">{item.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-forest-light"
          >
            Получить план лечения
          </a>
        </Reveal>
      </div>
    </section>
  );
}
