"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { technologies } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    const item = track.querySelector("li");
    const step = item ? item.clientWidth + 48 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      className="section border-t border-line bg-paper-2"
      aria-labelledby="tech-title"
    >
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Технологии"
          id="tech-title"
          lines={["Оборудование, которое", "убирает догадки"]}
          lede="Мы видим ситуацию до начала работы и можем показать её пациенту на экране."
          action={
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Предыдущая технология"
                className="grid h-14 w-14 place-items-center border border-ink/15 text-ink transition-colors duration-500 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-25"
              >
                <Arrow direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Следующая технология"
                className="grid h-14 w-14 place-items-center border border-ink/15 text-ink transition-colors duration-500 enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-25"
              >
                <Arrow direction="right" />
              </button>
            </div>
          }
        />
      </div>

      <Reveal delay={120}>
        <ul
          ref={trackRef}
          className="edge-scroller no-scrollbar mt-20 gap-12 pb-2 md:gap-16"
        >
          {technologies.map((tech, index) => (
            <li
              key={tech.name}
              className="group w-[78vw] shrink-0 snap-start border-t border-line pt-8 sm:w-[340px]"
            >
              <div className="flex items-baseline justify-between gap-6">
                <span className="eyebrow text-gold">{tech.tag}</span>
                <span aria-hidden="true" className="numeral text-[13px] text-ink/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="display mt-10 text-[clamp(1.45rem,2.4vw,1.9rem)] leading-tight text-ink">
                {tech.name}
              </h3>
              <p className="mt-5 text-[14.5px] font-light leading-relaxed text-muted">
                {tech.text}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
