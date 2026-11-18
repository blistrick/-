import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        {/* Шаг 4: путь пациента, до/после, врачи, технологии, отзывы, цены, FAQ, запись, футер */}
        <section data-bg="ivory" className="flex h-[40vh] items-center justify-center text-graphite-soft">
          <p className="eyebrow">Продолжение — после вашего утверждения</p>
        </section>
      </main>
    </>
  );
}
