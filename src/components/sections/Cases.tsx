"use client";

import { useMemo, useState } from "react";
import { Clock, Maximize2, ShieldCheck } from "lucide-react";
import { caseCategories, cases, type CaseStudy } from "@/data/cases";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const INITIAL_COUNT = 6;

function Meta({ item, tone = "light" }: { item: CaseStudy; tone?: "light" | "dark" }) {
  if (!item.duration && !item.warranty) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {item.duration ? (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium",
            tone === "dark"
              ? "border-white/15 text-white/70"
              : "border-line text-muted",
          )}
        >
          <Clock size={13} strokeWidth={1.8} aria-hidden="true" />
          {item.duration}
        </span>
      ) : null}
      {item.warranty ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-deep">
          <ShieldCheck size={13} strokeWidth={1.9} aria-hidden="true" />
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
      className="border-b border-line bg-paper-2 py-20 md:py-28"
      aria-labelledby="cases-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Результаты лечения"
          title={<span id="cases-title">Работы наших врачей</span>}
          description="Реальные клинические случаи клиники. Потяните ползунок, чтобы сравнить состояние до и после лечения."
        />

        {/* Filters */}
        <Reveal delay={100}>
          <div className="no-scrollbar mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
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
                    "shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300",
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-ink/12 bg-transparent text-muted hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item.slug} delay={(index % 3) * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white transition-[box-shadow,border-color] duration-500 hover:border-ink/15 hover:shadow-[0_28px_60px_-34px_rgba(11,26,43,0.4)]">
                <BeforeAfter
                  slug={item.slug}
                  alt={item.title}
                  bakedLabels={item.bakedLabels}
                  className="aspect-2/1 w-full"
                />

                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-accent-deep">{item.category}</p>
                  <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-muted">
                    {item.summary}
                  </p>
                  <Meta item={item} />

                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="mt-auto flex items-center gap-2 pt-6 text-left text-[13px] font-semibold text-ink/55 transition-colors hover:text-accent-deep"
                  >
                    <Maximize2 size={14} strokeWidth={1.9} aria-hidden="true" />
                    Подробнее о случае
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length > INITIAL_COUNT && !expanded ? (
          <Reveal delay={80}>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="btn btn-ghost"
              >
                Показать все работы ({filtered.length})
              </button>
            </div>
          </Reveal>
        ) : null}
      </div>

      {/* Case detail */}
      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        label={active ? `Клинический случай: ${active.title}` : "Клинический случай"}
      >
        {active ? (
          <div className="max-h-[88vh] overflow-y-auto">
            <BeforeAfter
              slug={active.slug}
              alt={active.title}
              bakedLabels={active.bakedLabels}
              className="aspect-2/1 w-full"
              sizes="(max-width: 900px) 100vw, 900px"
            />

            <div className="p-6 md:p-9">
              <p className="eyebrow text-accent-deep">{active.category}</p>
              <h3 className="display mt-3 text-[clamp(1.5rem,3.6vw,2.1rem)] text-ink">
                {active.title}
              </h3>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:text-[16px]">
                {active.summary}
              </p>

              {active.details?.length ? (
                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  {active.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-[14.5px] leading-relaxed text-ink/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Meta item={active} />

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row">
                <a
                  href="#calculator"
                  onClick={() => setActive(null)}
                  className="btn btn-primary"
                >
                  Хочу такой же результат
                </a>
                <a href="#prices" onClick={() => setActive(null)} className="btn btn-ghost">
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
