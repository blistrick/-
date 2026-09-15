import { advantages } from "@/data/advantages";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrustSection() {
  return (
    <section
      id="about"
      className="section border-t border-line bg-paper-2"
      aria-labelledby="trust-title"
    >
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="Почему нам доверяют"
          id="trust-title"
          lines={["Условия, на которых", "мы работаем"]}
          lede="Ни одного придуманного обещания: всё перечисленное клиника подтверждает на приёме и в договоре."
        />

        {/* Hairline rows, not cards. Numerals carry the hierarchy. */}
        <ol className="mt-20 grid gap-x-16 md:grid-cols-2">
          {advantages.map((item, index) => (
            <Reveal key={item.title} delay={(index % 4) * 90} as="li">
              <div className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-7 border-t border-line py-9 transition-colors duration-700 hover:border-gold md:py-11">
                <span
                  aria-hidden="true"
                  className="numeral pt-1 text-[14px] text-gold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.35rem,2.3vw,1.7rem)] leading-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[14.5px] font-light leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
