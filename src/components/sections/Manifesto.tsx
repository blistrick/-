import { philosophyQuote } from "@/data/content";
import { stats } from "@/data/advantages";
import { Counter } from "@/components/ui/Counter";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative section overflow-hidden bg-paper"
      aria-labelledby="manifesto-title"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow flex items-center gap-5 text-muted">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            Концепция клиники
          </p>
        </Reveal>

        <RevealLines
          as="h2"
          id="manifesto-title"
          step={120}
          lines={[
            "Мы врачи, и наша задача —",
            <span key="l2">
              лечить пациентов, а не быть
            </span>,
            <span key="l3" className="text-muted">
              продавцами пломбировочных
            </span>,
            <span key="l4" className="text-muted">
              материалов и реставраций.
            </span>,
          ]}
          className="display mt-12 max-w-5xl text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.12]"
        />

        <Reveal delay={420}>
          <p className="mt-10 text-[11px] font-medium uppercase text-muted" style={{ letterSpacing: "0.26em" }}>
            {philosophyQuote.author}
          </p>
        </Reveal>

        {/* Counters, set as serif numerals on hairlines */}
        <Reveal delay={120}>
          <dl className="mt-24 grid grid-cols-2 gap-x-10 gap-y-12 border-t border-line pt-14 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="numeral block text-[clamp(2.8rem,6vw,4.4rem)] leading-none text-ink">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="mt-5 block max-w-[210px] text-[12px] font-light uppercase leading-relaxed text-muted"
                    style={{ letterSpacing: "0.14em" }}
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
