import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const spanClass: Record<Service["span"], string> = {
  wide: "md:col-span-2 lg:col-span-4",
  tall: "md:col-span-1 lg:col-span-2",
  compact: "md:col-span-1 lg:col-span-2",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const hasImage = Boolean(service.image);

  return (
    <Reveal delay={(index % 3) * 70} className={cn(spanClass[service.span], "min-w-0")}>
      <a
        href="#calculator"
        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_28px_60px_-34px_rgba(11,26,43,0.45)]"
      >
        {hasImage ? (
          <div
            className={cn(
              "relative w-full flex-1 overflow-hidden",
              service.span === "wide" ? "min-h-[220px]" : "min-h-[190px]",
            )}
          >
            <Image
              src={service.image as string}
              alt={service.imageAlt ?? service.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-col p-6 md:p-7",
            hasImage ? "shrink-0" : "flex-1 justify-center py-9",
          )}
        >
          <div>
            <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[21px]">
              {service.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              {service.short}
            </p>
          </div>

          <span className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-ink/55 transition-colors duration-300 group-hover:text-accent-deep">
            Записаться
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="border-b border-line bg-paper-2 py-20 md:py-28"
      aria-labelledby="services-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Направления лечения"
          title={
            <span id="services-title">
              Полный цикл стоматологии
              <br className="hidden sm:block" /> в одной клинике
            </span>
          }
          description="От профилактического осмотра до тотальной имплантации. Врачи разных специализаций ведут пациента вместе, поэтому план лечения не приходится собирать по частям."
          action={
            <a href="#prices" className="btn btn-ghost">
              Смотреть цены
            </a>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}

          {/* Closing tile keeps the bento grid complete */}
          <Reveal delay={140} className="md:col-span-1 lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[26px] bg-ink p-7 text-white">
              <div>
                <h3 className="text-[19px] font-semibold leading-snug tracking-tight md:text-[21px]">
                  Не знаете, с чего начать?
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">
                  Приходите на профилактический осмотр — он бесплатный. Разберём
                  снимки и составим план лечения.
                </p>
              </div>
              <a href="#calculator" className="btn btn-light w-full">
                Получить план лечения
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
