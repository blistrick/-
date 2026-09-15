"use client";

import { clinic } from "@/lib/data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C9.4 3 4.02 8.37 4.02 15c0 2.22.6 4.3 1.65 6.09L4 29l8.1-1.62A11.9 11.9 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3Zm0 21.7c-1.9 0-3.7-.5-5.26-1.44l-.38-.22-4.8.96.98-4.67-.25-.4A9.6 9.6 0 0 1 6.3 15c0-5.36 4.36-9.72 9.72-9.72S25.74 9.64 25.74 15s-4.36 9.7-9.72 9.7Zm5.34-7.27c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.08-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.35Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <a
      href={clinic.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="group fixed z-50 flex items-center gap-3 rounded-full bg-forest text-cream shadow-lift transition-all duration-300 hover:bg-forest-light
        right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] h-14 w-14 justify-center
        sm:right-6 sm:bottom-6 sm:h-14 sm:px-5 sm:w-auto"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden sm:inline max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
        Написать в WhatsApp
      </span>
    </a>
  );
}
