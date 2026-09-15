import Image from "next/image";
import Reveal from "./Reveal";
import { whyStatus } from "@/lib/data";

export default function WhyStatus() {
  return (
    <section id="why-status" className="scroll-mt-28 bg-forest py-24 text-cream sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-gold-light">
                Философия клиники
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Почему пациенты
                <br />
                выбирают <span className="italic">STATUS</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
                Мы придерживаемся простого принципа: сначала функция, потом
                эстетика. Каждое решение — в интересах пациента, а не плана
                продаж.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[2rem] lg:block">
              <Image
                src="/images/clinic/lab-technician.jpeg"
                alt="Работа зубного техника в лаборатории STATUS"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="divide-y divide-cream/15 border-t border-cream/15">
            {whyStatus.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06} className="group py-7 sm:py-8">
                <div className="flex gap-5 sm:gap-8">
                  <span className="font-display text-lg text-gold-light sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-cream sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
