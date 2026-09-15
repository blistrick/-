"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
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
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-xl transition-transform duration-500 md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <a
          href={clinic.phone.href}
          aria-label={`Позвонить ${clinic.phone.display}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/12 text-ink"
        >
          <Phone size={19} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
        >
          <WhatsAppGlyph size={22} />
        </a>

        <a href="#calculator" className="btn btn-primary h-12 flex-1 px-4 text-[14px]">
          Записаться на консультацию
        </a>
      </div>
    </div>
  );
}
