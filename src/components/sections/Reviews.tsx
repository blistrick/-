"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { reviews } from "@/data/content";
import { clinic } from "@/data/clinic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      className="border-b border-line bg-paper py-20 md:py-28"
      aria-labelledby="reviews-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Отзывы пациентов"
          title={<span id="reviews-title">Самая лучшая похвала — ваши здоровые зубы</span>}
          description={
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    strokeWidth={0}
                    className="fill-accent text-accent"
                  />
                ))}
              </span>
              <span className="font-semibold text-ink">
                {clinic.rating.value} — рейтинг клиники в {clinic.rating.source}
              </span>
              <span>· отзывы опубликованы на сайте клиники</span>
            </span>
          }
          action={
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Предыдущий отзыв"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/12 text-ink transition enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-white disabled:opacity-30"
              >
                <ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Следующий отзыв"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/12 text-ink transition enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-white disabled:opacity-30"
              >
                <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>
          }
        />
      </div>

      <Reveal delay={80}>
        <ul
          ref={trackRef}
          className="edge-scroller no-scrollbar mt-14 pb-2"
        >
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.date}`}
              className="flex w-[82vw] shrink-0 snap-start flex-col rounded-[26px] border border-line bg-white p-7 sm:w-[400px] md:p-8"
            >
              <Quote
                size={26}
                strokeWidth={1.4}
                aria-hidden="true"
                className="text-accent/45"
              />

              <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink/80">
                {review.text}
              </p>

              <div className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-[15px] font-bold text-accent-deep"
                >
                  {review.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-semibold tracking-tight text-ink">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-muted">
                    {review.date} · отзыв с сайта клиники
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
