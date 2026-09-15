import {
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { advantages, stats } from "@/data/advantages";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  wallet: Wallet,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  microscope: Microscope,
  heart: HeartPulse,
};

export function TrustSection() {
  return (
    <section
      id="about"
      className="relative border-b border-line bg-paper py-20 md:py-28"
      aria-labelledby="trust-title"
    >
      <div className="shell">
        <Reveal>
          <h2 id="trust-title" className="sr-only">
            Почему клинике STATUS Dental Center можно доверять
          </h2>
          <p className="eyebrow flex items-center gap-2.5 text-muted">
            <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
            Почему нам доверяют
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 60}>
                <div className="group flex h-full gap-5 border-t border-line pt-7 transition-colors duration-500 hover:border-ink/25">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep transition-transform duration-500 group-hover:scale-105">
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Counters */}
        <Reveal delay={120}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-paper px-6 py-8 md:px-8 md:py-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2.2rem,5vw,3.1rem)] text-ink">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-3 block max-w-[190px] text-[13px] leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
