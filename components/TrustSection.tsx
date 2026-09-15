import { BadgeCheck, CreditCard, Gem, ShieldCheck, Star, UsersRound } from "lucide-react";
import Reveal from "./Reveal";
import { trustPoints } from "@/lib/data";

const icons = [UsersRound, ShieldCheck, Gem, CreditCard, BadgeCheck, Star];

export default function TrustSection() {
  return (
    <section className="border-y border-border-soft bg-cream-alt/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border-soft bg-border-soft sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={point.title} delay={i * 0.05} className="bg-cream p-7 sm:p-8">
                <Icon className="h-5 w-5 text-forest" strokeWidth={1.5} />
                <div className="mt-5 flex items-baseline gap-2">
                  {point.value && (
                    <span className="font-display text-2xl text-ink">{point.value}</span>
                  )}
                  <h3 className="text-sm font-medium text-ink">{point.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{point.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
