"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/data/clinic";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#manifesto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:bg-ink focus:px-6 focus:py-4 focus:text-[12px] focus:uppercase focus:tracking-[0.14em] focus:text-paper"
      >
        Перейти к содержанию
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-700",
          scrolled
            ? "bg-paper/92 shadow-[0_1px_0_rgba(12,10,9,0.08)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-700",
            scrolled ? "h-[74px]" : "h-[96px] md:h-[116px]",
          )}
        >
          <a
            href="#top"
            aria-label="STATUS Dental Center — на главную"
            className="transition-opacity duration-500 hover:opacity-60"
          >
            <Logo tone={scrolled ? "dark" : "light"} compact={scrolled} />
          </a>

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "link-underline text-[11px] font-medium uppercase transition-colors duration-500",
                      scrolled
                        ? "text-ink/70 hover:text-ink"
                        : "text-paper/70 hover:text-paper",
                    )}
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-8">
            <a
              href={clinic.phone.href}
              className={cn(
                "link-underline hidden text-[13px] font-light tracking-[0.04em] transition-colors duration-500 lg:block",
                scrolled ? "text-ink" : "text-paper",
              )}
            >
              {clinic.phone.display}
            </a>

            <a
              href="#calculator"
              className={cn(
                "btn hidden h-12 min-h-0 px-7 py-0 text-[11px] sm:inline-flex",
                scrolled ? "btn-solid" : "btn-outline-light",
              )}
            >
              Записаться
            </a>

            {/* Two-rule burger reads quieter than a three-bar icon */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              className="group flex h-12 w-12 flex-col items-center justify-center gap-[7px] xl:hidden"
            >
              <span
                className={cn(
                  "block h-px w-7 transition-all duration-500",
                  scrolled ? "bg-ink" : "bg-paper",
                )}
              />
              <span
                className={cn(
                  "block h-px w-7 transition-all duration-500 group-hover:w-4",
                  scrolled ? "bg-ink" : "bg-paper",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        className={cn(
          "fixed inset-0 z-[90] xl:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink transition-opacity duration-700",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "relative flex h-full flex-col transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="shell flex h-[96px] shrink-0 items-center justify-between">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              className="grid h-12 w-12 place-items-center"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 block h-px w-5 rotate-45 bg-paper" />
                <span className="absolute left-0 top-1/2 block h-px w-5 -rotate-45 bg-paper" />
              </span>
            </button>
          </div>

          <nav
            aria-label="Мобильная навигация"
            className="shell flex-1 overflow-y-auto pb-12"
          >
            <ul className="mt-4 flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.href} className="border-b border-line-dark">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-baseline gap-6 py-6 transition-all duration-700",
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0",
                    )}
                    style={{ transitionDelay: `${120 + index * 70}ms` }}
                  >
                    <span className="numeral text-[13px] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[32px] text-paper">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-3">
              <a
                href="#calculator"
                onClick={() => setMenuOpen(false)}
                className="btn btn-light w-full"
              >
                Записаться на консультацию
              </a>
              <a
                href={clinic.phone.href}
                className="btn btn-outline-light w-full"
              >
                {clinic.phone.display}
              </a>
            </div>

            <p className="mt-10 text-[13px] font-light leading-relaxed text-paper/45">
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
