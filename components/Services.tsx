"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-forest">Услуги</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
              Направления лечения
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-sm leading-relaxed text-ink-soft">
            От профилактики до сложной имплантации — полный цикл стоматологической
            помощи для взрослых и детей в одной клинике.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <Tilt max={6} glare className="h-full">
                <a
                  href="#calculator"
                  className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-border-soft bg-ink ${
                    i === 0 ? "min-h-[20rem]" : "min-h-[18rem]"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="relative flex items-start justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-display text-xl text-cream sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/75">
                        {service.description}
                      </p>
                    </div>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-cream">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
