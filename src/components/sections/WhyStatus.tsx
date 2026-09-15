import Image from "next/image";
import { philosophyQuote, principles } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function WhyStatus() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
      aria-labelledby="why-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] top-1/3 h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] rounded-full opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,155,0.22) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Sticky narrative column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-white/45">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
              Почему STATUS
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h2
              id="why-title"
              className="display mt-5 text-[clamp(2rem,5.4vw,3.5rem)]"
            >
              Почему пациенты
              <br />
              выбирают STATUS
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/60 md:text-[17px]">
              Мы собрали команду, которая фанатеет от своего дела, и построили
              работу так, чтобы решение принимал врач, а не прайс-лист.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <figure className="mt-10 max-w-md border-l border-accent/60 pl-6">
              <blockquote className="text-[17px] font-medium leading-relaxed tracking-tight text-white md:text-[19px]">
                «{philosophyQuote.text}»
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.14em] text-white/40">
                {philosophyQuote.author}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={240}>
            <div className="relative mt-10 hidden aspect-16/9 max-w-md overflow-hidden rounded-3xl lg:block">
              <Image
                src="/images/photos/examination.webp"
                alt="Врач-стоматолог на приёме в клинике STATUS Dental Center в Алматы"
                fill
                loading="lazy"
                sizes="440px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
              />
            </div>
          </Reveal>
        </div>

        {/* Principles */}
        <ol className="flex flex-col">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={(index % 4) * 60} as="li">
              <div className="group grid gap-4 border-t border-white/10 py-8 transition-colors duration-500 hover:border-white/25 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6 md:py-9">
                <span className="text-[13px] font-mono tabular-nums text-accent/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-white md:text-[22px]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/55 md:text-[15.5px]">
                    {principle.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
