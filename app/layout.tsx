import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { clinic } from "@/lib/data";

const fraunces = Playfair_Display({
  variable: "--font-fraunces",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://status-dental-center.kz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "STATUS Dental Center — стоматология в Алматы без боли",
    template: "%s — STATUS Dental Center",
  },
  description:
    "Современная стоматология в Алматы: лечение зубов без боли, имплантация, виниры, брекеты. Международные протоколы, импортные материалы, гарантия от 3 лет, рассрочка Kaspi до 24 месяцев.",
  keywords: [
    "стоматология Алматы",
    "стоматолог Алматы",
    "лечение зубов Алматы",
    "имплантация зубов Алматы",
    "виниры Алматы",
    "брекеты Алматы",
    "стоматология Алматы цены",
  ],
  authors: [{ name: clinic.name }],
  openGraph: {
    title: "STATUS Dental Center — современная стоматология в Алматы",
    description:
      "Лечение зубов без боли, имплантация, виниры, брекеты. Международные протоколы, гарантия от 3 лет, рассрочка Kaspi до 24 месяцев.",
    url: siteUrl,
    siteName: "STATUS Dental Center",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STATUS Dental Center — современная стоматология в Алматы",
    description:
      "Лечение зубов без боли, имплантация, виниры, брекеты. Гарантия от 3 лет, рассрочка Kaspi до 24 месяцев.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
