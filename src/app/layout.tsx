import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { clinic } from "@/data/clinic";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const title =
  "Стоматология в Алматы — STATUS Dental Center | Лечение зубов, имплантация, виниры, брекеты";
const description =
  "Современная стоматология в Алматы на ул. Тимирязева 113. Лечение зубов под микроскопом, имплантация, виниры, брекеты и элайнеры, протезирование. Профилактический осмотр — 0 ₸, рассрочка Kaspi до 24 месяцев, гарантия от 3 лет. Записаться: +7 776 035 65 33.";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.site),
  title: {
    default: title,
    template: "%s | STATUS Dental Center",
  },
  description,
  keywords: [
    "стоматология Алматы",
    "стоматолог Алматы",
    "лечение зубов Алматы",
    "имплантация зубов Алматы",
    "виниры Алматы",
    "брекеты Алматы",
    "стоматология Алматы цены",
    "детская стоматология Алматы",
    "протезирование зубов Алматы",
    "отбеливание зубов Алматы",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: clinic.site,
    siteName: clinic.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#0b1a2b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
