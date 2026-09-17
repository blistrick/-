"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { doctors, type Doctor } from "@/lib/data";

export default function Doctors() {
  const [active, setActive] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-forest">Команда</span>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Команда специалистов
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {doctors.map((doc, i) => (
            <Reveal key={doc.slug} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setActive(doc)}
                className="group block w-full text-left"
              >
                <Tilt max={10} className="rounded-3xl">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-cream-alt">
                    <Image
                      src={doc.photo}
                      alt={doc.name}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Plus className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </Tilt>
                <h3 className="mt-4 font-display text-base leading-snug text-ink sm:text-lg">
                  {doc.name}
                </h3>
                <p className="mt-1 text-xs text-ink-soft sm:text-sm">{doc.role}</p>
                {doc.experience && (
                  <p className="mt-1 text-xs text-forest">{doc.experience}</p>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-cream sm:flex-row sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Закрыть"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink shadow-soft"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <div className="relative h-64 w-full shrink-0 sm:h-auto sm:w-2/5">
                <Image src={active.photo} alt={active.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:p-8">
                <h3 className="font-display text-2xl text-ink">{active.name}</h3>
                <p className="mt-1 text-sm text-forest">{active.role}</p>
                {active.experience && (
                  <p className="mt-1 text-xs text-ink-faint">{active.experience}</p>
                )}
                <p className="mt-5 text-sm leading-relaxed text-ink-soft">{active.focus}</p>
                <a
                  href="#calculator"
                  onClick={() => setActive(null)}
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-light"
                >
                  Записаться к врачу
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
