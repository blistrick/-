"use client";

import { useState } from "react";
import { reviews } from "@/data/content";
import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="26" height="9" viewBox="0 0 26 9" fill="none" aria-hidden="true">
      <g
        transform={direction === "left" ? "rotate(180 13 4.5)" : undefined}
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 4.5h24M20.5 1 24 4.5 20.5 8" />
      </g>
    </svg>
  );
}

/**
 * One review at a time, set as a pull-quote. A carousel of cards reads as
 * filler; a single large quote reads as a statement.
 */
export function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const go = (delta: number) =>
    setIndex((v) => (v + delta + reviews.length) % reviews.length);

  return (
    <section
      className="section border-t border-line bg-paper"
      aria-labelledby="reviews-title"
    >
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-5">
            <span aria-hidden="true" className="numeral text-[15px] text-gold">
              09
            </span>
            <span className="eyebrow text-muted">Отзывы пациентов</span>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
            <span
              className="text-[11px] font-medium uppercase text-muted"
              style={{ letterSpacing: "0.2em" }}
            >
              {clinic.rating.value} в {clinic.rating.source}
            </span>
          </div>
        </Reveal>

        <h2 id="reviews-title" className="sr-only">
          Отзывы пациентов клиники STATUS Dental Center
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
          <Reveal delay={120}>
            <figure>
              {/* key restarts the fade whenever the quote changes */}
              <blockquote
                key={index}
                className="display text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.28] text-ink"
                style={{ animation: "quoteIn 700ms cubic-bezier(0.22,1,0.36,1) both" }}
              >
                «{review.text}»
              </blockquote>

              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-7">
                <span className="text-[15px] font-medium text-ink">
                  {review.name}
                </span>
                <span
                  className="text-[11px] font-light uppercase text-muted"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {review.date} · отзыв с сайта клиники
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex items-center gap-8">
              <span className="numeral text-[15px] text-muted">
                {String(index + 1).padStart(2, "0")}
                <span className="text-ink/25"> / {String(reviews.length).padStart(2, "0")}</span>
              </span>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Предыдущий отзыв"
                  className={cn(
                    "grid h-14 w-14 place-items-center border border-ink/15 text-ink",
                    "transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper",
                  )}
                >
                  <Arrow direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Следующий отзыв"
                  className={cn(
                    "grid h-14 w-14 place-items-center border border-ink/15 text-ink",
                    "transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper",
                  )}
                >
                  <Arrow direction="right" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(14px) }
          to { opacity: 1; transform: none }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes quoteIn { from { opacity: 1 } to { opacity: 1 } }
        }
      `}</style>
    </section>
  );
}
