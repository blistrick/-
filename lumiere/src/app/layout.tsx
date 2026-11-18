import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Preloader } from "@/components/preloader";

// Display serif with full Cyrillic support (Instrument Serif / Fraunces are Latin-only).
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const text = Manrope({
  variable: "--font-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMIÈRE Dental — эстетическая стоматология",
  description:
    "Ателье эстетической стоматологии: виниры, имплантация, элайнеры и цифровая диагностика в атмосфере тихой роскоши.",
  openGraph: {
    title: "LUMIÈRE Dental — искусство вашей улыбки",
    description: "Эстетическая стоматология в атмосфере бутик-отеля.",
    images: ["/img/hero-bg.jpg"],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F2EC",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "LUMIÈRE Dental",
  priceRange: "$$$",
  address: { "@type": "PostalAddress", addressLocality: "Москва", addressCountry: "RU" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${display.variable} ${text.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
