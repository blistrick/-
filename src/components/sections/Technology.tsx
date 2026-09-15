"use client";

import Image from "next/image";
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
      className="section border-t border-line-dark bg-ink-soft"
      aria-labelledby="tech-title"
    >
      <div className="shell">
        <SectionHeading
          tone="dark"
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
                className="grid h-14 w-14 place-items-center border border-paper/15 text-paper transition-colors duration-500 enabled:hover:border-paper enabled:hover:bg-paper enabled:hover:text-ink disabled:opacity-25"
              >
                <Arrow direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Следующая технология"
                className="grid h-14 w-14 place-items-center border border-paper/15 text-paper transition-colors duration-500 enabled:hover:border-paper enabled:hover:bg-paper enabled:hover:text-ink disabled:opacity-25"
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
              className="group w-[78vw] shrink-0 snap-start sm:w-[380px]"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-ink">
                <Image
                  src={tech.image}
                  alt={tech.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 78vw, 380px"
                  className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                />
                <span className="absolute left-5 top-5 bg-ink/70 px-3 py-1.5 backdrop-blur-sm">
                  <span className="eyebrow text-gold">{tech.tag}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="numeral absolute right-5 top-5 text-[13px] text-paper/60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="absolute inset-x-5 bottom-5 display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight text-paper">
                  {tech.name}
                </h3>
              </div>

              <p className="mt-6 text-[14.5px] font-light leading-relaxed text-paper/55">
                {tech.text}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
