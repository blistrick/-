import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { clinic, navLinks } from "@/lib/data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-cream-alt/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl tracking-[0.08em] text-ink">STATUS</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Современная стоматология в Алматы. Лечим зубы без боли по
              международным протоколам.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-forest hover:text-forest"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-forest hover:text-forest"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={clinic.phoneHref}
                aria-label="Телефон"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-forest hover:text-forest"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-faint">Навигация</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-ink-soft hover:text-forest">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-faint">Контакты</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
              <li>{clinic.address}</li>
              <li>{clinic.hours}</li>
              <li>
                <a href={clinic.phoneHref} className="hover:text-forest">
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className="hover:text-forest">
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ink-faint">Информация</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
              <li>
                <Link href="#" className="hover:text-forest">
                  Публичная оферта
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-forest">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-soft pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {clinic.name}. Все права защищены.</span>
          <span>{clinic.city}, ул. Тимирязева 113</span>
        </div>
      </div>
    </footer>
  );
}
