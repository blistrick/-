"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { technologies } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Technology() {
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
      aria-labelledby="tech-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Технологии"
          title={
            <span id="tech-title">
              Технологии, которые
              <br className="hidden sm:block" /> помогают лечить точнее
            </span>
          }
          description="Оборудование не лечит само по себе — но оно убирает догадки. Мы видим ситуацию до начала работы и можем показать её пациенту."
          action={
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Предыдущая технология"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink/12 text-ink transition enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-white disabled:opacity-30"
              >
                <ArrowLeft size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Следующая технология"
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
          {technologies.map((tech, index) => (
            <li
              key={tech.name}
              className="group relative flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-[26px] border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_28px_60px_-34px_rgba(11,26,43,0.4)] sm:w-[340px] md:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-deep">
                    {tech.tag}
                  </span>
                  <span className="text-[12px] font-mono tabular-nums text-ink/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-[21px] font-semibold leading-snug tracking-tight text-ink">
                  {tech.name}
                </h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">
                  {tech.text}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="mt-8 block h-px w-full origin-left scale-x-[0.28] bg-ink/15 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
