import { Clock, ShieldCheck, Sparkle } from "lucide-react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { cases } from "@/lib/data";

const categoryStyles: Record<string, string> = {
  Терапия: "from-forest to-forest-light",
  Эстетика: "from-gold to-gold-light",
  Гигиена: "from-forest-light to-mint",
  Ортодонтия: "from-ink to-ink-soft",
  Имплантация: "from-forest-dark to-forest",
};

export default function Cases() {
  return (
    <section id="cases" className="scroll-mt-28 bg-cream-alt/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-forest">Результаты</span>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Результаты лечения
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
            Реальные клинические случаи из практики клиники — от художественной
            реставрации до полной имплантации.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <Tilt max={6} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-soft bg-cream shadow-soft transition-shadow hover:shadow-lift">
                  <div
                    className={`relative flex h-28 items-center justify-between bg-gradient-to-br px-6 ${
                      categoryStyles[c.category] ?? "from-forest to-forest-light"
                    }`}
                  >
                    <span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cream backdrop-blur-sm">
                      {c.category}
                    </span>
                    <Sparkle className="h-6 w-6 text-cream/70" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <h3 className="font-display text-lg leading-snug text-ink">{c.title}</h3>
                    <div className="mt-6 flex flex-wrap gap-4 text-xs text-ink-faint">
                      {c.duration && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                          {c.duration}
                        </span>
                      )}
                      {c.guarantee && (
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Гарантия {c.guarantee}
                        </span>
                      )}
                    </div>
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
