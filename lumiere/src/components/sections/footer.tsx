"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const SOCIAL = [
  { label: "Telegram", href: "#" },
  { label: "Instagram*", href: "#" },
  { label: "WhatsApp", href: "#" },
];

/** Stylised map in the brand palette (static SVG — no third-party map scripts). */
function StyledMap() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[#1c1c1a]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="blocks" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect width="40" height="40" fill="#1c1c1a" />
            <rect x="3" y="3" width="34" height="34" rx="3" fill="#232321" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#blocks)" />
        <path d="M-10 210 C 80 180, 140 240, 230 200 S 360 120, 420 150" stroke="#2e3a35" strokeWidth="26" fill="none" />
        <path d="M60 -10 L 150 310" stroke="#2f2f2c" strokeWidth="9" />
        <path d="M-10 90 L 410 40" stroke="#2f2f2c" strokeWidth="7" />
        <path d="M250 -10 L 300 310" stroke="#2f2f2c" strokeWidth="5" />
        <circle cx="205" cy="128" r="46" fill="var(--champagne)" opacity="0.08">
          <animate attributeName="r" values="22;52;22" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.22;0;0.22" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="205" cy="128" r="7" fill="var(--champagne)" />
      </svg>
      <div className="absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-2 text-[13px] text-graphite backdrop-blur">
        Патриаршие пруды · 5 мин пешком
      </div>
    </div>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0.2, 1], ["60%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  return (
    <footer ref={ref} id="contacts" data-bg="night" className="relative overflow-hidden bg-night pt-28 text-night-text md:pt-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-champagne">Контакты</p>
          <address className="mt-8 not-italic">
            <p className="display text-[clamp(32px,3.4vw,52px)] leading-[1.1]">
              Москва, Малая Бронная, 24
            </p>
            <a href="tel:+74950000000" className="mt-6 block text-[18px] text-night-text">+7 495 000-00-00</a>
            <a href="mailto:hello@lumiere.dental" className="mt-2 block text-[18px] text-night-muted transition-colors hover:text-night-text">
              hello@lumiere.dental
            </a>
          </address>
          <ul className="mt-10 flex flex-wrap gap-3">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="inline-flex h-11 items-center rounded-full border border-night-text/25 px-5 text-[14px] transition-colors duration-500 hover:border-night-text hover:bg-night-text hover:text-night">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <StyledMap />
        </div>
      </div>

      <div className="mx-auto mt-24 flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-night-text/15 px-5 pt-8 text-[13px] text-night-muted md:px-12">
        <span>© {new Date().getFullYear()} LUMIÈRE Dental Atelier · Лицензия ЛО-77-01-000000</span>
        <span>Имеются противопоказания. Необходима консультация специалиста.</span>
        <span>*Принадлежит Meta, признанной экстремистской в РФ</span>
      </div>

      <div className="overflow-hidden" aria-hidden>
        <motion.p
          style={{ y, opacity }}
          className="display whitespace-nowrap px-3 pb-2 pt-10 text-center text-[19.5vw] leading-[0.8] tracking-[-0.03em] text-night-text"
        >
          LUMIÈRE
        </motion.p>
      </div>
    </footer>
  );
}
