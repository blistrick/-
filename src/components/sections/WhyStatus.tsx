import Image from "next/image";
import { principles } from "@/data/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export function WhyStatus() {
  return (
    <section
      className="section relative overflow-hidden bg-ink text-paper"
      aria-labelledby="why-title"
    >
      <div className="shell grid gap-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        {/* Sticky chapter opener */}
        <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-5 text-paper/45">
              <span aria-hidden="true" className="numeral text-[15px] text-gold">
                03
              </span>
              Почему STATUS
            </p>
          </Reveal>

          <RevealLines
            as="h2"
            id="why-title"
            lines={[
              "Почему пациенты",
              <span key="l2" className="display-italic text-gold">
                выбирают нас
              </span>,
            ]}
            className="display mt-9 text-[clamp(2.4rem,6vw,4.4rem)]"
          />

          <Reveal delay={260}>
            <p className="lede mt-9 max-w-md text-paper/60">
              Мы собрали команду, которая фанатеет от своего дела, и построили
              работу так, чтобы решение принимал врач, а не прайс-лист.
            </p>
          </Reveal>

          <Reveal delay={340} className="mt-14 hidden lg:block">
            <div className="relative aspect-4/5 max-w-sm overflow-hidden">
              <Parallax amount={0.12} className="h-[115%] w-full">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/photos/examination.webp"
                    alt="Врач-стоматолог на приёме в клинике STATUS Dental Center"
                    fill
                    loading="lazy"
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
              </Parallax>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
              />
            </div>
          </Reveal>
        </div>

        {/* Chapters */}
        <ol className="flex min-w-0 flex-col">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={(index % 4) * 80} as="li">
              <article className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-7 border-t border-line-dark py-10 md:gap-x-10 md:py-12">
                <span
                  aria-hidden="true"
                  className="numeral pt-2 text-[13px] text-gold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.45rem,2.8vw,2.1rem)] leading-tight text-paper">
                    {principle.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-[14.5px] font-light leading-relaxed text-paper/55 md:text-[15.5px]">
                    {principle.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
