import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StructuredData } from "@/components/seo/StructuredData";
import { Calculator } from "@/components/sections/Calculator";
import { Cases } from "@/components/sections/Cases";
import { Contact } from "@/components/sections/Contact";
import { Doctors } from "@/components/sections/Doctors";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Prices } from "@/components/sections/Prices";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { TrustSection } from "@/components/sections/TrustSection";
import { WhyStatus } from "@/components/sections/WhyStatus";

export default function HomePage() {
  return (
    <>
      <StructuredData />
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
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </>
  );
}
