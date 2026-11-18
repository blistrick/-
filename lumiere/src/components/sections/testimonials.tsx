"use client";

import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

const REVIEWS = [
  { name: "Динара А.", what: "Виниры", text: "Впервые не боялась идти к стоматологу. Улыбка получилась моей — просто лучше. Никто не догадывается, что это виниры." },
  { name: "Тимур К.", what: "Имплантация", text: "Два импланта за один день, без боли. Ерлан Маратович объяснял каждый шаг. Сервис уровня хорошего отеля." },
  { name: "Алия С.", what: "Элайнеры", text: "Через 9 месяцев идеальный прикус. Удобные визиты, куратор всегда на связи, никаких сюрпризов в смете." },
  { name: "Даурен Б.", what: "Реставрация", text: "Восстановили скол за один визит — даже я не нахожу, где он был. Очень бережно и аккуратно." },
  { name: "Камила Е.", what: "Отбеливание", text: "Минус шесть тонов и ни капли чувствительности. Атмосфера — как в спа, не хочется уходить." },
  { name: "Санжар М.", what: "Диагностика", text: "За 20 минут получил полный 3D-план и честную рекомендацию: лечить нужно меньше, чем мне говорили в другом месте." },
];

function Stars() {
  return (
    <span className="flex gap-1 text-champagne-ink" role="img" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Row({ items, reverse }: { items: typeof REVIEWS; reverse?: boolean }) {
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      {[0, 1].map((k) => (
        <ul
          key={k}
          aria-hidden={k === 1}
          className={`marquee flex shrink-0 gap-5 pr-5 group-hover/row:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {items.map((r) => (
            <li key={r.name} className="w-[340px] shrink-0 rounded-[var(--radius-card)] border border-graphite/10 bg-ivory p-8 shadow-[var(--shadow-soft)] md:w-[420px]">
              <Stars />
              <p className="display mt-6 text-[24px] leading-[1.25] md:text-[26px]">«{r.text}»</p>
              <p className="mt-8 flex items-center justify-between text-[14px]">
                <span className="font-medium">{r.name}</span>
                <span className="eyebrow text-graphite-soft">{r.what}</span>
              </p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" data-bg="pearl" className="relative py-28 md:py-40" aria-labelledby="reviews-title">
      <div className="mx-auto mb-16 max-w-[1440px] px-5 md:px-12">
        <p className="eyebrow mb-6 text-champagne-ink">07 — Отзывы</p>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-1 basis-[560px]">
            <MaskedTextReveal as="h2" className="display text-[clamp(44px,6vw,104px)]">
              Улыбки, которыми <em>делятся</em>
            </MaskedTextReveal>
          </div>
          <div className="flex items-center gap-4">
            <span className="display text-[64px] leading-none">4.9</span>
            <span className="text-[14px] text-graphite-soft">
              <Stars />
              <span className="mt-2 block">612 отзывов в Google и 2ГИС</span>
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <Row items={REVIEWS.slice(0, 3).concat(REVIEWS.slice(0, 3))} />
        <Row items={REVIEWS.slice(3).concat(REVIEWS.slice(3))} reverse />
      </div>
    </section>
  );
}
