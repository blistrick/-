"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { priceGroups } from "@/data/prices";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function formatPrice(value: string) {
  return value === "0" ? "0 ₸" : `${value} ₸`;
}

export function Prices() {
  const [activeId, setActiveId] = useState(priceGroups[0].id);
  const [expanded, setExpanded] = useState(false);

  const group = priceGroups.find((item) => item.id === activeId) ?? priceGroups[0];
  const featured = group.items.filter((item) => item.featured);
  const rest = group.items.filter((item) => !item.featured);
  const rows = expanded ? [...featured, ...rest] : featured;

  return (
    <section
      id="prices"
      className="border-b border-line bg-paper py-20 md:py-28"
      aria-labelledby="prices-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Стоимость лечения"
          title={<span id="prices-title">Цены на лечение зубов в Алматы</span>}
          description="Прайс клиники без скрытых платежей. Точная стоимость определяется после диагностики и фиксируется в плане лечения."
          action={
            <a href="#calculator" className="btn btn-primary">
              Получить план лечения
            </a>
          }
        />

        {/* Category tabs */}
        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Категории услуг"
            className="no-scrollbar mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
          >
            {priceGroups.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`price-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`price-panel-${item.id}`}
                  onClick={() => {
                    setActiveId(item.id);
                    setExpanded(false);
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-ink/12 text-muted hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Price list */}
        <Reveal delay={140}>
          <div
            role="tabpanel"
            id={`price-panel-${group.id}`}
            aria-labelledby={`price-tab-${group.id}`}
            className="mt-10 overflow-hidden rounded-[26px] border border-line bg-white"
          >
            <ul>
              {rows.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className={cn(
                    "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-5 transition-colors duration-300 hover:bg-paper-2/60 md:px-8",
                    index > 0 && "border-t border-line",
                  )}
                >
                  <span className="max-w-[440px] text-[15px] leading-snug text-ink/85">
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-[16px] font-semibold tabular-nums tracking-tight",
                      item.price === "0" ? "text-accent-deep" : "text-ink",
                    )}
                  >
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>

            {rest.length > 0 ? (
              <div className="border-t border-line px-6 py-5 md:px-8">
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  aria-expanded={expanded}
                  className="text-[14px] font-semibold text-ink/60 transition-colors hover:text-accent-deep"
                >
                  {expanded
                    ? "Свернуть список"
                    : `Показать все цены раздела «${group.title}» (+${rest.length})`}
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start">
            <p className="flex flex-1 items-start gap-3 rounded-2xl bg-paper-2 px-5 py-4 text-[13.5px] leading-relaxed text-muted">
              <Info
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-deep"
              />
              <span>
                Точная стоимость определяется после диагностики.
                {group.note ? ` ${group.note}` : ""} Рассрочку до 24 месяцев от
                Kaspi можно оформить прямо в клинике.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
