"use client";

import { useEffect, useState } from "react";
import { clinic, waLink } from "@/data/clinic";
import { cn } from "@/lib/utils";
import { WhatsAppGlyph } from "./WhatsAppButton";

/** Sticky conversion bar shown on phones once the hero has scrolled away. */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/96 backdrop-blur-xl transition-transform duration-700 md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <a
          href={clinic.phone.href}
          aria-label={`Позвонить ${clinic.phone.display}`}
          className="grid h-14 w-14 shrink-0 place-items-center border border-ink/15 text-ink"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"/></svg>
        </a>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="grid h-14 w-14 shrink-0 place-items-center bg-ink text-paper"
        >
          <WhatsAppGlyph size={19} />
        </a>

        <a
          href="#calculator"
          className="btn btn-solid h-14 min-h-0 flex-1 whitespace-nowrap px-4 py-0 text-[10.5px]"
        >
          Записаться на приём
        </a>
      </div>
    </div>
  );
}
