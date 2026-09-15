/**
 * Single source of truth for clinic contact data and public claims.
 * Every value here is taken from status-dental-center.kz — nothing invented.
 */

export const clinic = {
  name: "STATUS Dental Center",
  legalName: 'Стоматологическая клиника "STATUS DENTAL CENTER"',
  tagline: "Современная стоматология в Алматы",
  city: "Алматы",
  phone: {
    display: "+7 776 035 65 33",
    href: "tel:+77760356533",
    raw: "+77760356533",
  },
  /** Second number published on the contacts page. */
  phoneAlt: {
    display: "+7 706 035 65 33",
    href: "tel:+77060356533",
  },
  whatsapp: {
    number: "77760356533",
    base: "https://wa.me/77760356533",
  },
  telegram: "https://t.me/+77760356533",
  instagram: "https://www.instagram.com/status_medical_clinic",
  email: "status.medical.clinic@gmail.com",
  address: {
    short: "ул. Тимирязева 113",
    full: "г. Алматы, ул. Тимирязева 113, угол ул. Розыбакиева",
    street: "улица Тимирязева 113",
    lat: 43.225008,
    lng: 76.890434,
    mapUrl: "https://go.2gis.com/bHUQd",
    map2gis:
      "https://2gis.kz/almaty/branches/70000001110552759/firm/70000001107468460/76.890434%2C43.225008?m=76.890434%2C43.225008%2F16",
  },
  hours: {
    short: "Ежедневно 9:00 — 00:00",
    opens: "09:00",
    closes: "00:00",
  },
  rating: {
    value: "5.0",
    source: "2ГИС",
  },
  site: "https://status-dental-center.kz",
} as const;

/** Builds a WhatsApp deep link with a pre-filled message. */
export function waLink(text?: string): string {
  const message =
    text ?? "Здравствуйте, хочу получить консультацию в STATUS Dental Center";
  return `${clinic.whatsapp.base}?text=${encodeURIComponent(message)}`;
}
