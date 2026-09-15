import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

/**
 * Full-bleed breather between chapters. The page needed one moment that is
 * carried by an image rather than by type.
 */
export function ImageBand() {
  return (
    <section
      className="relative h-[76svh] min-h-[460px] w-full overflow-hidden bg-ink"
      aria-label="Результат лечения в клинике STATUS Dental Center"
    >
      {/* The image layer is taken out of flow: in normal flow its 126% height
          would push the caption below the band. */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax amount={0.14} className="h-[126%] w-full">
          <div className="relative h-full w-full">
            <Image
              src="/images/photos/smile.webp"
              alt="Улыбка пациента после эстетического лечения в стоматологии STATUS Dental Center в Алматы"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45"
      />
      {/* Second scrim behind the caption column: the photo is bright there. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent"
      />

      <div className="shell relative flex h-full items-end pb-16 md:pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-paper/70">Результат</p>
          </Reveal>
          <RevealLines
            as="p"
            lines={[
              "Основная функция зубов —",
              "жевание, а уже затем эстетика.",
            ]}
            className="display mt-7 text-[clamp(1.8rem,4.6vw,3.4rem)] text-paper"
          />
          <Reveal delay={280}>
            <p className="mt-7 max-w-md text-[13.5px] font-light leading-relaxed text-paper/70">
              На этом строится весь подход клиники: восстановлению анатомии зуба
              уделяется самое пристальное внимание.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
