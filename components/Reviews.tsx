"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import { clinic, reviews } from "@/lib/data";

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-forest">Отзывы</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Что говорят пациенты
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <div className="flex items-center gap-1 font-display text-lg text-ink">
                {clinic.rating.value}
                <Star className="h-4 w-4 fill-gold text-gold" />
              </div>
              рейтинг клиники на {clinic.rating.source}
            </div>
          </Reveal>
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label="Назад"
              onClick={() => scroll(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-forest hover:text-forest"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              aria-label="Вперёд"
              onClick={() => scroll(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-forest hover:text-forest"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {reviews.map((review, i) => (
            <Reveal
              key={`${review.name}-${review.date}`}
              delay={i * 0.05}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[32%]"
            >
              <div className="flex h-full flex-col rounded-3xl border border-border-soft bg-cream-alt/40 p-7">
                <Quote className="h-6 w-6 text-forest/40" strokeWidth={1.5} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {review.text}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border-soft pt-4">
                  <span className="text-sm font-medium text-ink">{review.name}</span>
                  <span className="text-xs text-ink-faint">{review.date}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
