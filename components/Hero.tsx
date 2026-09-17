"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Star } from "lucide-react";
import { clinic } from "@/lib/data";
import Hero3D from "@/components/three/Hero3D";
import CountUp from "@/components/CountUp";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-mint blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cream-deep blur-3xl opacity-60" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-cream-alt/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-soft">
            Status Dental Center · Алматы
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.6rem]">
            Современная
            <br />
            стоматология
            <br />
            <span className="italic text-forest">в Алматы</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Лечим зубы без боли по международным протоколам, на современном
            оборудовании и импортных материалах — с фотопротоколом и контролем
            главного врача на каждом этапе.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#calculator"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-medium text-cream shadow-soft transition-all hover:bg-forest-light hover:shadow-lift"
            >
              Записаться на консультацию
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium text-ink transition-colors hover:border-forest hover:text-forest"
            >
              Посмотреть услуги
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
            <a href={clinic.phoneHref} className="flex items-center gap-2 font-medium text-ink hover:text-forest">
              <Phone className="h-4 w-4 text-forest" strokeWidth={1.75} />
              {clinic.phoneDisplay}
            </a>
            <a
              href={clinic.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-ink hover:text-forest"
            >
              <MessageCircle className="h-4 w-4 text-forest" strokeWidth={1.75} />
              WhatsApp
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border-soft pt-6 pb-20 sm:pb-0 sm:max-w-md">
            <div>
              <div className="flex items-center gap-1 font-display text-2xl text-ink">
                <CountUp value={5} decimals={1} />
                <Star className="h-4 w-4 fill-gold text-gold" />
              </div>
              <div className="mt-1 text-xs text-ink-faint">Рейтинг на {clinic.rating.source}</div>
            </div>
            <div>
              <div className="font-display text-2xl text-ink">
                <CountUp value={3} suffix="+ года" />
              </div>
              <div className="mt-1 text-xs text-ink-faint">Гарантия на услуги</div>
            </div>
            <div>
              <div className="font-display text-2xl text-ink">0 ₸</div>
              <div className="mt-1 text-xs text-ink-faint">Первичная консультация</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative lg:col-span-6 xl:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md sm:max-w-lg lg:ml-auto lg:max-w-none">
            <Hero3D />
          </div>

          <div className="absolute -bottom-6 -left-4 w-[13rem] rounded-2xl border border-border-soft bg-cream/95 p-4 shadow-lift backdrop-blur sm:-left-8 sm:w-56 sm:p-5">
            <div className="font-display text-xl text-forest">Kaspi 0-0-24</div>
            <p className="mt-1 text-xs leading-snug text-ink-soft">
              Рассрочка на лечение до 24 месяцев без переплат
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
