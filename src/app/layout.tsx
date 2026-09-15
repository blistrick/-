import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import { clinic } from "@/data/clinic";
import "./globals.css";

/** Display face. Used large; never for body copy. */
const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

/** Interface face. Light weights carry the luxury register. */
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

const title =
  "Стоматология в Алматы — STATUS Dental Center | Лечение зубов, имплантация, виниры, брекеты";
const description =
  "Современная стоматология в Алматы на ул. Тимирязева 113. Лечение зубов под микроскопом, имплантация, виниры, брекеты и элайнеры, протезирование. Профилактический осмотр — 0 ₸, рассрочка Kaspi до 24 месяцев, гарантия от 3 лет. Записаться: +7 776 035 65 33.";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.site),
  title: { default: title, template: "%s | STATUS Dental Center" },
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
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
