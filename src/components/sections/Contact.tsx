import Image from "next/image";
import { clinic, waLink } from "@/data/clinic";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

function InstagramGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
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

function TelegramGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.4-.1-.6-.6-.2L6.8 12.6l-4.8-1.5c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.2 1.8Z" />
    </svg>
  );
}

const contactLinks = [
  { label: "WhatsApp", href: waLink(), glyph: <WhatsAppGlyph size={15} />, external: true },
  { label: "Telegram", href: clinic.telegram, glyph: <TelegramGlyph />, external: true },
  { label: "Instagram", href: clinic.instagram, glyph: <InstagramGlyph />, external: true },
];

export function Contact() {
  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-ink text-paper"
      aria-labelledby="contacts-title"
    >
      {/* Closing statement */}
      <div className="shell section pb-0">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow text-paper/45">Запись на приём</p>
          </Reveal>

          <RevealLines
            as="h2"
            id="contacts-title"
            lines={[
              "Готовы начать",
              <span key="l2" className="display-italic text-gold">
                лечение?
              </span>,
            ]}
            className="display mt-10 text-[clamp(2.8rem,8vw,6rem)]"
          />

          <Reveal delay={280}>
            <p className="lede mx-auto mt-10 max-w-xl text-paper/60">
              Начните с профилактического осмотра — он бесплатный. Разберём
              снимки, покажем фотопротокол и составим понятный план лечения.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#calculator" className="btn btn-light">
                Записаться на консультацию
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                Написать в WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Details */}
        <div className="mt-28 grid gap-x-16 gap-y-14 border-t border-line-dark pt-16 md:grid-cols-3">
          <Reveal>
            <div>
              <p className="eyebrow text-paper/40">Адрес</p>
              <p className="display mt-6 text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug text-paper">
                {clinic.address.full}
              </p>
              <a
                href={clinic.address.map2gis}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-block text-[11px] font-medium uppercase text-paper/55 transition-colors duration-500 hover:text-gold"
                style={{ letterSpacing: "0.2em" }}
              >
                Посмотреть в 2ГИС
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p className="eyebrow text-paper/40">Телефоны</p>
              <a
                href={clinic.phone.href}
                className="link-underline mt-6 block font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light text-paper"
              >
                {clinic.phone.display}
              </a>
              <a
                href={clinic.phoneAlt.href}
                className="link-underline mt-3 block text-[15px] font-light text-paper/55 transition-colors duration-500 hover:text-paper"
              >
                {clinic.phoneAlt.display}
              </a>
              <p
                className="mt-6 text-[11px] font-light uppercase text-paper/40"
                style={{ letterSpacing: "0.18em" }}
              >
                {clinic.hours.short}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <p className="eyebrow text-paper/40">Мессенджеры и почта</p>
              <ul className="mt-6 flex flex-col">
                {contactLinks.map((link) => (
                  <li key={link.label} className="border-b border-line-dark">
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between py-4 text-[13px] font-light text-paper/70 transition-colors duration-500 hover:text-paper"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-paper/40 transition-colors duration-500 group-hover:text-gold">
                          {link.glyph}
                        </span>
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-5 bg-line-dark transition-all duration-500 group-hover:w-8 group-hover:bg-gold"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${clinic.email}`}
                className="link-underline mt-6 inline-block text-[13px] font-light text-paper/60 transition-colors duration-500 hover:text-paper"
              >
                {clinic.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed map */}
      <Reveal delay={120} className="mt-24 block">
        <a
          href={clinic.address.map2gis}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-[46vh] min-h-[340px] w-full overflow-hidden"
          aria-label={`Открыть карту: ${clinic.address.full}`}
        >
          <Image
            src="/images/photos/map-almaty-timiryazeva.webp"
            alt={`Карта: стоматология STATUS Dental Center, ${clinic.address.full}`}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover grayscale transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <span className="relative h-3 w-3 rounded-full bg-gold ring-4 ring-paper/70" />
          </span>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-ink/85 px-6 py-4 text-center backdrop-blur-sm">
            <span className="block text-[12px] font-medium uppercase text-paper" style={{ letterSpacing: "0.2em" }}>
              {clinic.name}
            </span>
            <span className="mt-2 block text-[12px] font-light text-paper/55">
              {clinic.address.full}
            </span>
          </span>

          <span className="absolute right-4 top-4 bg-paper/75 px-2.5 py-1 text-[9px] text-ink/60">
            © OpenStreetMap
          </span>
        </a>
      </Reveal>
    </section>
  );
}
