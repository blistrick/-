import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Services from "@/components/Services";
import WhyStatus from "@/components/WhyStatus";
import Technology from "@/components/Technology";
import Cases from "@/components/Cases";
import Doctors from "@/components/Doctors";
import Prices from "@/components/Prices";
import Calculator from "@/components/Calculator";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { clinic } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    image: "https://status-dental-center.kz/images/clinic/treatment-chair.jpeg",
    telephone: clinic.phoneDisplay,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Тимирязева 113",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.mapCoords.lat,
      longitude: clinic.mapCoords.lng,
    },
    url: "https://status-dental-center.kz",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating.value,
      bestRating: "5",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <Services />
        <WhyStatus />
        <Technology />
        <Cases />
        <Doctors />
        <Prices />
        <Calculator />
        <Reviews />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
