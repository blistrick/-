"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="border-b border-line bg-paper-2 py-20 md:py-28"
      aria-labelledby="faq-title"
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Вопросы и ответы"
            title={<span id="faq-title">Частые вопросы пациентов</span>}
            description="Если не нашли ответ — напишите нам, администратор ответит в течение дня."
          />
          <Reveal delay={180}>
            <a href="#contacts" className="btn btn-ghost mt-8">
              Задать свой вопрос
            </a>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={(index % 4) * 50} as="li">
                <div className="border-t border-line last:border-b">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "text-[16.5px] font-semibold leading-snug tracking-tight transition-colors duration-300 md:text-[18px]",
                          isOpen ? "text-ink" : "text-ink/75",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400",
                          isOpen
                            ? "rotate-45 border-ink bg-ink text-white"
                            : "border-ink/15 text-ink/60",
                        )}
                      >
                        <Plus size={15} strokeWidth={2} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${index}`}
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-10 text-[14.5px] leading-relaxed text-muted md:text-[15.5px]">
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
