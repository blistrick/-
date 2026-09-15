import Image from "next/image";
import { ArrowDownRight, MapPin, Phone, Star } from "lucide-react";
import { clinic, waLink } from "@/data/clinic";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

const heroPoints = [
  "Профилактический осмотр — 0 ₸",
  "Рассрочка до 24 месяцев от Kaspi",
  "Гарантия от 3 лет на все услуги",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white"
      aria-label="STATUS Dental Center — современная стоматология в Алматы"
    >
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] top-[-10%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,155,0.30) 0%, rgba(28,58,86,0.35) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="shell relative grid gap-14 pb-20 pt-[120px] md:pt-[150px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 lg:pb-28 lg:pt-[170px]">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-white/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5">
                <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                Алматы, {clinic.address.short}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5">
                <Star
                  size={12}
                  strokeWidth={2}
                  className="fill-accent text-accent"
                  aria-hidden="true"
                />
                {clinic.rating.value} в {clinic.rating.source}
              </span>
            </p>
          </Reveal>

          <h1 className="mt-8">
            <Reveal delay={80}>
              <span className="display block text-[clamp(2.5rem,8.4vw,4.8rem)]">
                <span className="block">STATUS</span>{" "}
                <span className="block text-white/45">Dental Center</span>
              </span>
            </Reveal>
            <Reveal delay={150}>
              <span className="mt-7 block text-[clamp(1.15rem,2.4vw,1.5rem)] font-medium leading-snug tracking-tight text-white">
                Современная стоматология в Алматы
              </span>
            </Reveal>
          </h1>

          <Reveal delay={210}>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/60 md:text-[17px]">
              Лечим по международным протоколам на передовом оборудовании и
              импортных материалах. Сохраняем родные зубы там, где другие
              предлагают удаление.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#calculator" className="btn btn-accent">
                Записаться на консультацию
              </a>
              <a href="#services" className="btn btn-ghost-light">
                Посмотреть услуги
                <ArrowDownRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={clinic.phone.href}
                className="group flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-white transition-colors hover:text-accent"
              >
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
                {clinic.phone.display}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[15px] font-medium text-white/65 transition-colors hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppGlyph size={17} />
                </span>
                Написать в WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={390}>
            <ul className="mt-11 grid gap-x-8 gap-y-3 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {heroPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-white/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-[32px] bg-ink-800 sm:aspect-square lg:aspect-4/5">
              <Image
                src="/images/doctors/abduraimov.webp"
                alt="Шахзад Абдураимов — главный врач, хирург-имплантолог клиники STATUS Dental Center в Алматы"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="eyebrow text-accent">Главный врач</p>
                <p className="mt-2.5 text-[20px] font-semibold tracking-tight text-white sm:text-[23px]">
                  Шахзад Абдураимов
                </p>
                <p className="mt-1 text-[14px] text-white/55">
                  Хирург-имплантолог · Стаж 10 лет
                </p>
              </div>
            </div>

            {/* Floating proof card */}
            <div className="absolute -left-2 top-7 rounded-2xl border border-white/12 bg-ink/70 p-4 backdrop-blur-xl sm:-left-6 sm:p-5">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="fill-accent text-accent"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-[26px] font-bold leading-none tracking-tight">
                {clinic.rating.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/45">
                рейтинг в {clinic.rating.source}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
