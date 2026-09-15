"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { clinic } from "@/data/clinic";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Перейти к содержанию
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "bg-paper/85 shadow-[0_1px_0_rgba(11,26,43,0.08)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-500",
            scrolled ? "h-[68px]" : "h-[84px] md:h-[96px]",
          )}
        >
          <a
            href="#top"
            aria-label="STATUS Dental Center — на главную"
            className="transition-opacity hover:opacity-70"
          >
            <Logo tone={scrolled ? "dark" : "light"} compact={scrolled} />
          </a>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors duration-300",
                      scrolled
                        ? "text-ink/70 hover:bg-ink/5 hover:text-ink"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={clinic.phone.href}
              className={cn(
                "hidden items-center gap-2 text-[14px] font-semibold tracking-tight transition-colors xl:flex",
                scrolled ? "text-ink hover:text-accent-deep" : "text-white hover:text-accent",
              )}
            >
              <Phone size={15} strokeWidth={2} aria-hidden="true" />
              {clinic.phone.display}
            </a>

            <a
              href="#calculator"
              className={cn(
                "btn hidden h-11 px-6 text-[14px] sm:inline-flex",
                scrolled ? "btn-primary" : "btn-light",
              )}
            >
              Записаться
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
                scrolled
                  ? "border-ink/12 text-ink hover:bg-ink/5"
                  : "border-white/25 text-white hover:bg-white/10",
              )}
            >
              <Menu size={20} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[90] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "relative flex h-full flex-col transition-all duration-500",
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <div className="shell flex h-[84px] shrink-0 items-center justify-between">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white"
            >
              <X size={20} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Мобильная навигация"
            className="shell flex-1 overflow-y-auto pb-10"
          >
            <ul className="mt-6 flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.href} className="border-b border-white/10">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 text-[26px] font-semibold tracking-tight text-white transition-colors hover:text-accent"
                  >
                    <span className="text-[11px] font-mono text-white/30">
                      0{index + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3">
              <a
                href="#calculator"
                onClick={() => setMenuOpen(false)}
                className="btn btn-accent w-full"
              >
                Записаться на консультацию
              </a>
              <a href={clinic.phone.href} className="btn btn-ghost-light w-full">
                {clinic.phone.display}
              </a>
            </div>

            <p className="mt-8 text-[13px] leading-relaxed text-white/45">
              {clinic.address.full}
              <br />
              {clinic.hours.short}
            </p>
          </nav>
        </div>
      </div>
    </>
  );
}
