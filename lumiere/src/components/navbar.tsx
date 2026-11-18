"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

const LINKS = [
  { href: "#philosophy", label: "Философия" },
  { href: "#services", label: "Услуги" },
  { href: "#doctors", label: "Врачи" },
  { href: "#prices", label: "Цены" },
  { href: "#contacts", label: "Контакты" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("flex flex-col leading-none", className)}>
      <span className="font-serif text-[26px] font-normal tracking-[0.08em]">LUMIÈRE</span>
      <span className="eyebrow mt-1 text-[9px] tracking-[0.42em] opacity-70">Dental Atelier</span>
      <span className="sr-only"> — на главную</span>
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [glass, setGlass] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setGlass(y > 40);
    setHidden(y > prev && y > 240 && !open);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
      >
        <nav
          className={cn(
            "mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full px-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[72px] md:px-8",
            glass
              ? "border border-white/50 bg-ivory/65 shadow-[0_10px_40px_-20px_rgba(30,30,28,0.25)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
          aria-label="Основная навигация"
        >
          <Logo />
          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative text-[14px] tracking-wide text-graphite">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-graphite transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="tel:+77270000000" className="hidden text-[14px] tracking-wide xl:block">
              +7 727 000-00-00
            </a>
            <MagneticButton className="hidden h-11 px-6 text-[14px] sm:inline-flex">Записаться</MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-graphite/20 lg:hidden"
            >
              <span className={cn("absolute h-px w-4 bg-graphite transition-transform duration-500", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-graphite transition-transform duration-500", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ivory px-6 pb-12 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[52px]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <MagneticButton className="mt-10 w-full">Записаться на консультацию</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
