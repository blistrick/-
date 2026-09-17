"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { technologies } from "@/lib/data";

export default function Technology() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-forest">Технологии</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              Технологии, которые
              <br className="hidden sm:block" /> помогают лечить точнее
            </h2>
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

        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {technologies.map((tech, i) => (
            <Reveal
              key={tech.title}
              delay={i * 0.06}
              className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[30%]"
            >
              <Tilt max={5} className="group h-full">
                <div className="h-full overflow-hidden rounded-3xl border border-border-soft bg-cream-alt/40">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 80vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg text-ink">{tech.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
