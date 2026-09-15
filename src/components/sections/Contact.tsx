import Image from "next/image";
import { Clock, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { clinic, waLink } from "@/data/clinic";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

/** Lucide dropped brand marks, so the Instagram glyph lives here. */
function InstagramGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Contact() {
  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
      aria-labelledby="contacts-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-25%] h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] -translate-x-1/2 rounded-full opacity-55 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,155,0.22) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative">
        {/* Final CTA */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-white/45">Запись на приём</p>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="contacts-title"
              className="display mt-5 text-[clamp(2.2rem,6.2vw,4rem)]"
            >
              Готовы начать лечение?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/60 md:text-[17px]">
              Начните с профилактического осмотра — он бесплатный. Разберём
              снимки, покажем фотопротокол и составим понятный план лечения.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#calculator" className="btn btn-accent">
                Записаться на консультацию
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light"
              >
                <WhatsAppGlyph size={18} />
                Написать в WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Contact details + map */}
        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Reveal>
            <div className="flex h-full flex-col gap-7 rounded-[28px] border border-white/10 bg-white/[0.03] p-7 md:p-9">
              <div>
                <p className="eyebrow text-white/40">Адрес</p>
                <p className="mt-3 flex items-start gap-3 text-[17px] font-medium leading-snug tracking-tight text-white">
                  <MapPin
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-accent"
                  />
                  {clinic.address.full}
                </p>
                <a
                  href={clinic.address.map2gis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[13.5px] font-semibold text-white/55 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Посмотреть в 2ГИС
                </a>
              </div>

              <div className="border-t border-white/10 pt-7">
                <p className="eyebrow text-white/40">Телефоны</p>
                <a
                  href={clinic.phone.href}
                  className="mt-3 flex items-center gap-3 text-[20px] font-semibold tracking-tight text-white transition-colors hover:text-accent md:text-[23px]"
                >
                  <Phone size={18} strokeWidth={1.9} aria-hidden="true" />
                  {clinic.phone.display}
                </a>
                <a
                  href={clinic.phoneAlt.href}
                  className="mt-2 block pl-[30px] text-[15px] text-white/55 transition-colors hover:text-white"
                >
                  {clinic.phoneAlt.display}
                </a>
                <p className="mt-4 flex items-center gap-3 text-[14px] text-white/55">
                  <Clock size={16} strokeWidth={1.8} aria-hidden="true" />
                  {clinic.hours.short}
                </p>
              </div>

              <div className="border-t border-white/10 pt-7">
                <p className="eyebrow text-white/40">Мессенджеры и почта</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 text-[13.5px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <WhatsAppGlyph size={16} />
                    WhatsApp
                  </a>
                  <a
                    href={clinic.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 text-[13.5px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Send size={15} strokeWidth={1.8} aria-hidden="true" />
                    Telegram
                  </a>
                  <a
                    href={clinic.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 text-[13.5px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <InstagramGlyph size={15} />
                    Instagram
                  </a>
                </div>
                <a
                  href={`mailto:${clinic.email}`}
                  className="mt-5 inline-flex items-center gap-3 text-[14.5px] text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                  {clinic.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <a
              href={clinic.address.map2gis}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full min-h-[380px] overflow-hidden rounded-[28px] border border-white/10"
              aria-label={`Открыть карту: ${clinic.address.full}`}
            >
              <Image
                src="/images/photos/map-almaty-timiryazeva.webp"
                alt={`Карта: стоматология STATUS Dental Center, ${clinic.address.full}`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* Pin */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
              >
                <span className="relative grid h-14 w-14 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/25" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-accent text-white shadow-[0_12px_30px_-10px_rgba(232,98,155,0.9)]">
                    <MapPin size={20} strokeWidth={2} />
                  </span>
                </span>
              </span>

              {/* Address plate */}
              <span className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink/85 px-5 py-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold tracking-tight text-white">
                    {clinic.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-white/55">
                    {clinic.address.full}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                  <Navigation size={14} strokeWidth={2} aria-hidden="true" />
                  Маршрут в 2ГИС
                </span>
              </span>

              <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-1 text-[10px] text-ink/60">
                © OpenStreetMap
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
