"use client";

import { useMemo, useState } from "react";
import { caseCategories, cases, type CaseStudy } from "@/data/cases";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const INITIAL_COUNT = 6;

function Meta({ item, tone = "light" }: { item: CaseStudy; tone?: "light" | "dark" }) {
  if (!item.duration && !item.warranty) return null;
  const dark = tone === "dark";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2">
      {item.duration ? (
        <span
          className={cn(
            "text-[11px] font-light uppercase",
            dark ? "text-paper/55" : "text-muted",
          )}
          style={{ letterSpacing: "0.16em" }}
        >
          {item.duration}
        </span>
      ) : null}
      {item.warranty ? (
        <span
          className="text-[11px] font-medium uppercase text-gold"
          style={{ letterSpacing: "0.16em" }}
        >
          {item.warranty}
        </span>
      ) : null}
    </div>
  );
}

export function Cases() {
  const [category, setCategory] = useState<string>(caseCategories[0]);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<CaseStudy | null>(null);

  const filtered = useMemo(
    () =>
      category === caseCategories[0]
        ? cases
        : cases.filter((item) => item.category === category),
    [category],
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section
      id="cases"
      className="section border-t border-line bg-paper"
      aria-labelledby="cases-title"
    >
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Результаты лечения"
          id="cases-title"
          lines={["Работы", "наших врачей"]}
          lede="Реальные клинические случаи клиники. Потяните ползунок, чтобы сравнить состояние до и после лечения."
        />

        {/* Filters as quiet text, not pills */}
        <Reveal delay={200}>
          <div className="no-scrollbar mt-16 -mx-[22px] flex gap-8 overflow-x-auto px-[22px] md:mx-0 md:flex-wrap md:gap-10 md:px-0">
            {caseCategories.map((item) => {
              const isActive = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setExpanded(false);
                  }}
                  aria-pressed={isActive}
                  className={cn(
                    "link-underline shrink-0 pb-1 text-[11.5px] font-medium uppercase transition-colors duration-500",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                  style={{ letterSpacing: "0.2em" }}
                >
                  {item}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-px bg-gold"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.slug} delay={(index % 3) * 90}>
              <article className="group flex h-full flex-col">
                <Reveal variant="image" delay={(index % 3) * 90 + 120}>
                  <BeforeAfter
                    slug={item.slug}
                    alt={item.title}
                    bakedLabels={item.bakedLabels}
                    className="aspect-2/1 w-full"
                  />
                </Reveal>

                <div className="mt-7 flex flex-1 flex-col">
                  <span
                    className="text-[10.5px] font-medium uppercase text-gold"
                    style={{ letterSpacing: "0.26em" }}
                  >
                    {item.category}
                  </span>
                  <h3 className="display mt-4 text-[clamp(1.35rem,2.2vw,1.7rem)] leading-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-[14px] font-light leading-relaxed text-muted">
                    {item.summary}
                  </p>
                  <Meta item={item} />

                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="link-underline mt-auto self-start pt-8 text-[11px] font-medium uppercase text-ink/60 transition-colors duration-500 hover:text-ink"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    Подробнее о случае
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length > INITIAL_COUNT && !expanded ? (
          <Reveal delay={80}>
            <div className="mt-20 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="btn btn-outline"
              >
                Показать все работы ({filtered.length})
              </button>
            </div>
          </Reveal>
        ) : null}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        label={active ? `Клинический случай: ${active.title}` : "Клинический случай"}
      >
        {active ? (
          <div className="max-h-[88vh] overflow-y-auto bg-paper">
            <BeforeAfter
              slug={active.slug}
              alt={active.title}
              bakedLabels={active.bakedLabels}
              className="aspect-2/1 w-full"
              sizes="(max-width: 900px) 100vw, 900px"
            />

            <div className="p-8 md:p-14">
              <span
                className="text-[10.5px] font-medium uppercase text-gold"
                style={{ letterSpacing: "0.26em" }}
              >
                {active.category}
              </span>
              <h3 className="display mt-5 text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-ink">
                {active.title}
              </h3>
              <p className="lede mt-7 max-w-2xl text-muted">{active.summary}</p>

              {active.details?.length ? (
                <ul className="mt-10 flex flex-col border-t border-line">
                  {active.details.map((detail) => (
                    <li
                      key={detail}
                      className="border-b border-line py-4 text-[14.5px] font-light leading-relaxed text-ink/80"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Meta item={active} />

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#calculator"
                  onClick={() => setActive(null)}
                  className="btn btn-solid"
                >
                  Хочу такой же результат
                </a>
                <a
                  href="#prices"
                  onClick={() => setActive(null)}
                  className="btn btn-outline"
                >
                  Посмотреть цены
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
