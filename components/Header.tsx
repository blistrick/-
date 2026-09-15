"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { clinic, navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "bg-cream/85 shadow-soft backdrop-blur-md border border-border-soft py-2 mx-3 sm:mx-6"
            : "py-3 mx-0"
        }`}
      >
        <Link href="#top" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.08em] text-ink sm:text-2xl">
            STATUS
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            Dental Center
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={clinic.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-forest md:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {clinic.phoneDisplay}
          </a>
          <a
            href="#calculator"
            className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-light sm:inline-flex"
          >
            Записаться
          </a>
          <button
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Rendered via portal so it always stacks above other fixed
          elements (e.g. the WhatsApp button), regardless of this
          header's own stacking context. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="ml-auto flex h-full w-[85%] max-w-sm flex-col bg-cream px-6 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl tracking-[0.08em]">STATUS</span>
                    <button
                      aria-label="Закрыть меню"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
                    >
                      <X className="h-5 w-5" strokeWidth={1.75} />
                    </button>
                  </div>
                  <nav className="mt-10 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="border-b border-border-soft py-4 text-lg text-ink"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-3">
                    <a
                      href={clinic.phoneHref}
                      className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-ink"
                    >
                      <Phone className="h-4 w-4" strokeWidth={1.75} />
                      {clinic.phoneDisplay}
                    </a>
                    <a
                      href="#calculator"
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-forest py-3 text-center text-sm font-medium text-cream"
                    >
                      Записаться на консультацию
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
