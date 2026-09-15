"use client";

import { useState } from "react";
import { faq } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="section border-t border-line bg-paper-2"
      aria-labelledby="faq-title"
    >
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-24">
        <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="10"
            eyebrow="Вопросы и ответы"
            id="faq-title"
            lines={["Частые вопросы", "пациентов"]}
            lede="Если не нашли ответ — напишите нам, администратор ответит в течение дня."
            action={
              <a href="#contacts" className="btn btn-outline">
                Задать свой вопрос
              </a>
            }
          />
        </div>

        <ul className="flex min-w-0 flex-col border-t border-line">
          {faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={(index % 5) * 50} as="li">
                <div className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-6 py-7 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className="numeral pt-2 text-[12px] text-gold"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "display text-[clamp(1.15rem,2vw,1.55rem)] leading-snug transition-colors duration-500",
                          isOpen ? "text-ink" : "text-ink/75",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative mt-3 block h-3 w-3 shrink-0"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 bg-ink" />
                        <span
                          className={cn(
                            "absolute left-1/2 top-0 h-3 w-px bg-ink transition-transform duration-500",
                            isOpen ? "scale-y-0" : "scale-y-100",
                          )}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 pl-[calc(1.5rem+12px)] pr-10 text-[14.5px] font-light leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
