import { clinic } from "@/data/clinic";
import { navItems } from "@/data/nav";
import { services } from "@/data/services";
import { Logo } from "@/components/ui/Logo";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink pb-32 pt-20 text-paper md:pb-16">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-8 max-w-sm text-[13.5px] font-light leading-relaxed text-paper/50">
              Стоматология в Алматы. Лечение зубов, имплантация, ортодонтия,
              протезирование и эстетическая стоматология по международным
              протоколам.
            </p>
            <a
              href={clinic.phone.href}
              className="link-underline mt-10 inline-block font-display text-[26px] font-light text-paper"
            >
              {clinic.phone.display}
            </a>
            <p
              className="mt-3 text-[11px] font-light uppercase text-paper/40"
              style={{ letterSpacing: "0.18em" }}
            >
              {clinic.hours.short}
            </p>
          </div>

          <nav aria-label="Услуги в подвале">
            <p className="eyebrow text-paper/35">Услуги</p>
            <ul className="mt-7 flex flex-col gap-3.5">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <a
                    href="#services"
                    className="link-underline text-[13.5px] font-light text-paper/55 transition-colors duration-500 hover:text-paper"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <nav aria-label="Разделы сайта">
              <p className="eyebrow text-paper/35">Разделы</p>
              <ul className="mt-7 flex flex-col gap-3.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="link-underline text-[13.5px] font-light text-paper/55 transition-colors duration-500 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="mt-10 not-italic">
              <p className="eyebrow text-paper/35">Адрес</p>
              <p className="mt-5 max-w-[240px] text-[13.5px] font-light leading-relaxed text-paper/55">
                {clinic.address.full}
              </p>
              <a
                href={`mailto:${clinic.email}`}
                className="link-underline mt-4 inline-block text-[13.5px] font-light text-paper/55 transition-colors duration-500 hover:text-paper"
              >
                {clinic.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-dark pt-8 text-[11.5px] font-light text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}. Стоматология в Алматы.
          </p>
          <p className="max-w-xl sm:text-right">
            Информация на сайте не является публичной офертой. Имеются
            противопоказания, необходима консультация специалиста.
          </p>
        </div>
      </div>
    </footer>
  );
}
