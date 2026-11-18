"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  n: string;
  title: string;
  text: string;
  price: string;
  img: string;
  alt: string;
  span: string;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Виниры",
    text: "Тончайшие керамические виниры ручной работы. Форму и оттенок моделируем под черты лица.",
    price: "от 65 000 ₽",
    img: "/img/smile.jpg",
    alt: "Естественная улыбка крупным планом в мягком дневном свете",
    span: "md:col-span-6 lg:col-span-5 lg:row-span-2",
  },
  {
    n: "02",
    title: "Эстетическая реставрация",
    text: "Восстановление формы и цвета зуба композитом — незаметно, за один визит.",
    price: "от 18 000 ₽",
    img: "/img/craft.jpg",
    alt: "Руки керамиста держат тонкий винир",
    span: "md:col-span-6 lg:col-span-4 lg:row-span-2",
  },
  {
    n: "03",
    title: "Имплантация",
    text: "Швейцарские импланты и навигационные шаблоны. Точность до десятых долей миллиметра.",
    price: "от 95 000 ₽",
    img: "/img/porcelain.jpg",
    alt: "Фарфоровая сфера и жемчуг на травертине",
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    n: "04",
    title: "Отбеливание",
    text: "Бережное отбеливание без чувствительности — на 4–8 тонов.",
    price: "от 28 000 ₽",
    img: "/img/light.jpg",
    alt: "Солнечный свет сквозь льняную штору",
    span: "md:col-span-3 lg:col-span-3",
  },
  {
    n: "05",
    title: "Элайнеры",
    text: "Прозрачная коррекция прикуса с цифровым планом лечения и прогнозом результата.",
    price: "от 180 000 ₽",
    img: "/img/aligner.jpg",
    alt: "Прозрачный элайнер на травертиновой поверхности",
    span: "md:col-span-6 lg:col-span-6",
  },
  {
    n: "06",
    title: "Цифровая диагностика",
    text: "3D-сканирование и КТ за 15 минут. Вы видите будущую улыбку до начала лечения.",
    price: "от 7 500 ₽",
    img: "/img/scanner.jpg",
    alt: "Внутриротовой 3D-сканер и планшет с моделью улыбки",
    span: "md:col-span-6 lg:col-span-6",
  },
];

function Card({ s, i }: { s: Service; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay: (i % 3) * 0.08, ease: EASE }}
      className={cn(
        "group relative isolate min-h-[420px] overflow-hidden rounded-[var(--radius-card)] bg-pearl shadow-[var(--shadow-soft)] transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[var(--shadow-glow)] lg:min-h-0",
        s.span,
      )}
      data-cursor="Подробнее"
    >
      <Image
        src={s.img}
        alt={s.alt}
        fill
        sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e1e1c]/85 via-[#1e1e1c]/20 to-[#1e1e1c]/25 transition-opacity duration-700 group-hover:from-[#1e1e1c]/90" />

      <div className="flex h-full flex-col justify-between p-6 text-ivory md:p-8">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-ivory/85">{s.n}</span>
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 backdrop-blur-sm transition-all duration-700 group-hover:rotate-[-45deg] group-hover:border-ivory group-hover:bg-ivory group-hover:text-graphite"
          >
            →
          </span>
        </div>
        <div>
          <h3 className="display text-[clamp(32px,3vw,48px)] leading-[1]">{s.title}</h3>
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ivory/90 transition-opacity duration-700 lg:opacity-0 lg:group-hover:opacity-100">
                {s.text}
              </p>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-3 text-[14px] tracking-wide text-ivory/90">
            <span className="h-px w-6 bg-champagne" />
            {s.price}
          </p>
        </div>
      </div>
      <a href="#booking" className="absolute inset-0 z-10" aria-label={`${s.title} — записаться`} />
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" data-bg="ivory" className="relative py-28 md:py-40" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-champagne-ink">02 — Услуги</p>
            <MaskedTextReveal as="h2" className="display text-[clamp(44px,6vw,104px)] text-graphite">
              Всё для улыбки, <em>в одном</em> ателье
            </MaskedTextReveal>
          </div>
          <motion.p
            className="measure self-end text-graphite-soft lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            Шесть направлений, одна команда и единый цифровой план. Мы ведём вас от первой консультации до результата,
            которым хочется делиться.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:auto-rows-[300px] lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <Card key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
