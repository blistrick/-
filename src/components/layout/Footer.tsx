import { clinic } from "@/data/clinic";
import { navItems } from "@/data/nav";
import { services } from "@/data/services";
import { Logo } from "@/components/ui/Logo";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-28 pt-16 text-white md:pb-14">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/50">
              Стоматология в Алматы. Лечение зубов, имплантация, ортодонтия,
              протезирование и эстетическая стоматология по международным
              протоколам.
            </p>
            <a
              href={clinic.phone.href}
              className="mt-7 block text-[20px] font-semibold tracking-tight transition-colors hover:text-accent"
            >
              {clinic.phone.display}
            </a>
            <p className="mt-2 text-[13.5px] text-white/45">{clinic.hours.short}</p>
          </div>

          <nav aria-label="Услуги в подвале">
            <p className="eyebrow text-white/35">Услуги</p>
            <ul className="mt-6 flex flex-col gap-3">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <a
                    href="#services"
                    className="text-[14px] text-white/60 transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <nav aria-label="Разделы сайта">
              <p className="eyebrow text-white/35">Разделы</p>
              <ul className="mt-6 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[14px] text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="mt-8 not-italic">
              <p className="eyebrow text-white/35">Адрес</p>
              <p className="mt-4 max-w-[240px] text-[14px] leading-relaxed text-white/60">
                {clinic.address.full}
              </p>
              <a
                href={`mailto:${clinic.email}`}
                className="mt-3 inline-block text-[14px] text-white/60 transition-colors hover:text-white"
              >
                {clinic.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}. Стоматология в Алматы.
          </p>
          <p>
            Информация на сайте не является публичной офертой. Имеются
            противопоказания, необходима консультация специалиста.
          </p>
        </div>
      </div>
    </footer>
  );
}
