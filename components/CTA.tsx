import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/clinic/procedure-dark.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-cream sm:text-6xl">
            Готовы начать лечение?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
            Запишитесь на консультацию — определим план лечения и точную
            стоимость на первом приёме.
          </p>
          <a
            href="#calculator"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink transition-all hover:bg-gold-light"
          >
            Записаться на консультацию
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
