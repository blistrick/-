import Image from "next/image";
import { clinic, waLink } from "@/data/clinic";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

const heroFacts = [
  { value: "0 ₸", label: "профилактический осмотр" },
  { value: "24", label: "месяца рассрочки от Kaspi" },
  { value: "от 3 лет", label: "гарантия на все услуги" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="STATUS Dental Center — современная стоматология в Алматы"
    >
      {/* Full-bleed portrait, drifting slightly slower than the page */}
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[50%]">
        <Parallax amount={0.09} className="h-[116%] w-full">
          <div className="relative h-full w-full">
            <Image
              src="/images/doctors/abduraimov.webp"
              alt="Шахзад Абдураимов — главный врач и хирург-имплантолог клиники STATUS Dental Center в Алматы"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-[52%_16%]"
            />
          </div>
        </Parallax>

        {/* Scrims: the copy must stay readable without burying the portrait. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,color-mix(in_srgb,var(--color-ink)_82%,transparent)_38%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_100%)] lg:bg-[linear-gradient(to_right,var(--color-ink)_0%,color-mix(in_srgb,var(--color-ink)_70%,transparent)_26%,transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-ink to-transparent lg:block"
        />
      </div>

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-0 pt-[120px] md:pt-[150px]">
        <div className="max-w-2xl pb-10 md:pb-16">
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-5 gap-y-2 text-paper/45">
              <span>Алматы · {clinic.address.short}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              <span className="text-gold">
                {clinic.rating.value} в {clinic.rating.source}
              </span>
            </p>
          </Reveal>

          <h1 className="mt-8">
            <Reveal delay={80}>
              <span
                className="block font-sans text-[11px] font-medium uppercase text-paper/50"
                style={{ letterSpacing: "0.34em" }}
              >
                STATUS Dental Center
              </span>
            </Reveal>

            <RevealLines
              lines={[
                "Современная",
                "стоматология",
                <span key="city" className="display-italic text-gold">
                  в Алматы
                </span>,
              ]}
              step={130}
              className="display mt-6 text-[clamp(2.7rem,8vw,5.4rem)]"
            />
          </h1>

          <Reveal delay={520}>
            <p className="lede mt-8 max-w-md text-paper/65">
              Лечим по международным протоколам, на передовом оборудовании и
              импортных материалах. Сохраняем родные зубы там, где другие
              предлагают удаление.
            </p>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#calculator" className="btn btn-light">
                Записаться на консультацию
              </a>
              <a href="#services" className="btn btn-outline-light">
                Посмотреть услуги
              </a>
            </div>
          </Reveal>

          <Reveal delay={700}>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a
                href={clinic.phone.href}
                className="link-underline font-display text-[26px] font-light tracking-[0.01em] text-paper"
              >
                {clinic.phone.display}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[12px] font-medium uppercase text-paper/60 transition-colors duration-500 hover:text-paper"
                style={{ letterSpacing: "0.18em" }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/25 transition-colors duration-500 group-hover:border-paper/60">
                  <WhatsAppGlyph size={15} />
                </span>
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Facts rail pinned to the bottom of the first screen */}
        <Reveal delay={820}>
          <div className="border-t border-line-dark">
            <dl className="grid grid-cols-1 sm:grid-cols-3">
              {heroFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={
                    index > 0
                      ? "border-t border-line-dark py-6 sm:border-l sm:border-t-0 sm:pl-8 md:py-8"
                      : "py-6 md:py-8"
                  }
                >
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="numeral block text-[clamp(1.8rem,3.4vw,2.6rem)] text-paper">
                      {fact.value}
                    </span>
                    <span className="mt-2 block text-[12px] font-light uppercase text-paper/40" style={{ letterSpacing: "0.16em" }}>
                      {fact.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
