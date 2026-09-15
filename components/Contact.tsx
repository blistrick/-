import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { clinic } from "@/lib/data";

const mapEmbedSrc = `https://yandex.ru/map-widget/v1/?ll=${clinic.mapCoords.lng}%2C${clinic.mapCoords.lat}&z=16&pt=${clinic.mapCoords.lng},${clinic.mapCoords.lat},pm2rdm`;

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-forest">Контакты</span>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Как нас найти
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="flex flex-col gap-4 lg:col-span-2">
            <ContactRow icon={MapPin} label="Адрес" value={clinic.address} href={clinic.mapUrl} />
            <ContactRow icon={Clock} label="Часы работы" value={clinic.hours} />
            <ContactRow icon={Phone} label="Телефон" value={clinic.phoneDisplay} href={clinic.phoneHref} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Написать сообщение" href={clinic.whatsapp} />
            <ContactRow icon={Mail} label="Email" value={clinic.email} href={`mailto:${clinic.email}`} />
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-border-soft lg:col-span-3">
            <iframe
              title="Карта — расположение клиники STATUS Dental Center"
              src={mapEmbedSrc}
              className="h-80 w-full lg:h-full lg:min-h-[26rem]"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-border-soft bg-cream-alt/40 p-5 transition-colors hover:border-forest/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-ink-faint">{label}</div>
        <div className="mt-1 text-sm font-medium text-ink">{value}</div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {content}
    </a>
  );
}
