import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";

// Below-the-fold sections: still server-rendered (SEO), but shipped as separate JS chunks.
const Journey = dynamic(() => import("@/components/sections/journey").then((m) => m.Journey));
const BeforeAfter = dynamic(() => import("@/components/sections/before-after").then((m) => m.BeforeAfter));
const Doctors = dynamic(() => import("@/components/sections/doctors").then((m) => m.Doctors));
const Film = dynamic(() => import("@/components/sections/film").then((m) => m.Film));
const Technology = dynamic(() => import("@/components/sections/technology").then((m) => m.Technology));
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then((m) => m.Testimonials));
const Pricing = dynamic(() => import("@/components/sections/pricing").then((m) => m.Pricing));
const FAQ = dynamic(() => import("@/components/sections/faq").then((m) => m.FAQ));
const Booking = dynamic(() => import("@/components/sections/booking").then((m) => m.Booking));
const Footer = dynamic(() => import("@/components/sections/footer").then((m) => m.Footer));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Journey />
        <BeforeAfter />
        <Doctors />
        <Film />
        <Technology />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
