"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Directions read as an editorial index rather than a grid of cards.
 * On a pointer device the hovered row previews its photo next to the cursor;
 * on touch the same photo sits inline, so nothing depends on hover.
 */
export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setHasPointer(
        window.matchMedia("(hover: hover) and (min-width: 1024px)").matches,
      ),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      // Easing the follow keeps it feeling weighted rather than twitchy.
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [hasPointer]);

  return (
    <section
      id="services"
      className="section relative border-t border-line bg-paper"
      aria-labelledby="services-title"
    >
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Направления лечения"
          id="services-title"
          lines={["Полный цикл", "стоматологии"]}
          lede="От профилактического осмотра до тотальной имплантации. Врачи разных специализаций ведут пациента вместе, поэтому план лечения не приходится собирать по частям."
          action={
            <a href="#prices" className="btn btn-outline">
              Смотреть цены
            </a>
          }
        />

        <ul className="mt-20 border-t border-line">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 6) * 60} as="li">
              <a
                href="#calculator"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive((v) => (v === index ? null : v))}
                onFocus={() => setActive(index)}
                onBlur={() => setActive((v) => (v === index ? null : v))}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 border-b border-line py-8 transition-colors duration-700 hover:border-gold md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,22rem)_3rem] md:items-center md:gap-x-10 md:py-9"
              >
                <span
                  aria-hidden="true"
                  className="numeral text-[13px] text-gold transition-opacity duration-500 group-hover:opacity-60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3
                  className={cn(
                    "display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-tight text-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "md:group-hover:translate-x-3",
                  )}
                >
                  {service.title}
                </h3>

                {/* Inline photo for touch, where there is no hover preview */}
                <span className="col-span-2 mt-5 block md:hidden">
                  <span className="relative block aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="100vw"
                      className="object-cover"
                    />
                  </span>
                </span>

                <p className="col-span-2 mt-4 text-[14px] font-light leading-relaxed text-muted md:col-span-1 md:mt-0">
                  {service.short}
                </p>

                <span
                  aria-hidden="true"
                  className="hidden justify-self-end text-ink/30 transition-all duration-700 group-hover:translate-x-1 group-hover:text-gold md:block"
                >
                  <svg width="26" height="9" viewBox="0 0 26 9" fill="none">
                    <path
                      d="M0 4.5h24M20.5 1 24 4.5 20.5 8"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview */}
      {hasPointer ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
          ref={previewRef}
        >
          <div
            className={cn(
              "relative -ml-[13rem] -mt-[9rem] h-[17rem] w-[13rem] overflow-hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              active === null
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100",
            )}
          >
            {services.map((service, index) => (
              <Image
                key={service.slug}
                src={service.image}
                alt=""
                fill
                sizes="240px"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  active === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
