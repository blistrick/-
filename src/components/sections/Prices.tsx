"use client";

import { useState } from "react";
import { priceGroups } from "@/data/prices";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const formatPrice = (value: string) => (value === "0" ? "0 ₸" : `${value} ₸`);

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
      className="section border-t border-line bg-paper-2"
      aria-labelledby="prices-title"
    >
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow="Стоимость лечения"
          id="prices-title"
          lines={["Цены на лечение", "зубов в Алматы"]}
          lede="Прайс клиники без скрытых платежей. Точная стоимость определяется после диагностики и фиксируется в плане лечения."
          action={
            <a href="#calculator" className="btn btn-solid">
              Получить план лечения
            </a>
          }
        />

        <div className="mt-20 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          {/* Categories as a vertical index */}
          <Reveal className="min-w-0">
            <div
              role="tablist"
              aria-label="Категории услуг"
              aria-orientation="vertical"
              className="no-scrollbar -mx-[22px] flex gap-8 overflow-x-auto px-[22px] lg:mx-0 lg:flex-col lg:gap-0 lg:px-0"
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
                      "shrink-0 whitespace-nowrap text-left text-[12px] font-medium uppercase transition-colors duration-500 lg:border-t lg:border-line lg:py-5 lg:first:border-t-0",
                      isActive
                        ? "text-ink lg:border-gold"
                        : "text-muted hover:text-ink",
                    )}
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Typographic price table */}
          <Reveal delay={140} className="min-w-0">
            <div
              role="tabpanel"
              id={`price-panel-${group.id}`}
              aria-labelledby={`price-tab-${group.id}`}
            >
              <ul className="border-t border-line">
                {rows.map((item, index) => (
                  <li
                    key={`${item.name}-${index}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-5 transition-colors duration-500 hover:border-gold"
                  >
                    <span className="min-w-0 max-w-[30rem] text-[15px] font-light leading-snug text-ink/85">
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "numeral whitespace-nowrap text-[19px]",
                        item.price === "0" ? "text-gold" : "text-ink",
                      )}
                    >
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>

              {rest.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  aria-expanded={expanded}
                  className="link-underline mt-8 text-[11px] font-medium uppercase text-ink/60 transition-colors duration-500 hover:text-ink"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {expanded
                    ? "Свернуть список"
                    : `Показать все цены раздела (+${rest.length})`}
                </button>
              ) : null}

              <p className="mt-12 max-w-2xl border-l border-gold pl-6 text-[13.5px] font-light leading-relaxed text-muted">
                Точная стоимость определяется после диагностики.
                {group.note ? ` ${group.note}` : ""} Рассрочку до 24 месяцев от
                Kaspi можно оформить прямо в клинике.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
