"use client";

import Image from "next/image";
import { useState } from "react";
import { doctors, type Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Doctors() {
  const [active, setActive] = useState<Doctor | null>(null);

  return (
    <section
      id="doctors"
      className="section bg-ink text-paper"
      aria-labelledby="doctors-title"
    >
      <div className="shell">
        <SectionHeading
          index="06"
          tone="dark"
          eyebrow="Команда специалистов"
          id="doctors-title"
          lines={["Врачи", "клиники STATUS"]}
          lede="Терапевты, хирурги-имплантологи, ортопеды и ортодонты работают в одной команде: сложный случай ведут несколько специалистов под контролем главного врача."
        />

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4 lg:gap-x-10">
          {doctors.map((doctor, index) => {
            const hasDetails = Boolean(doctor.skills?.length);

            return (
              <Reveal key={doctor.slug} delay={(index % 4) * 90} as="li">
                <div className="group relative flex h-full flex-col">
                  <Reveal variant="image" delay={(index % 4) * 90 + 120}>
                    <div className="relative aspect-3/4 w-full overflow-hidden bg-ink-soft">
                      <Image
                        src={doctor.photo}
                        alt={`${doctor.name} — ${doctor.role}, стоматология STATUS Dental Center в Алматы`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                        className="object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      {doctor.lead ? (
                        <span
                          className="absolute left-0 top-0 bg-gold px-4 py-2 text-[9.5px] font-medium uppercase text-paper"
                          style={{ letterSpacing: "0.24em" }}
                        >
                          Главный врач
                        </span>
                      ) : null}
                    </div>
                  </Reveal>

                  <div className="mt-6 flex flex-1 flex-col border-t border-line-dark pt-5">
                    <h3 className="display text-[clamp(1.1rem,1.7vw,1.35rem)] leading-tight text-paper">
                      {hasDetails ? (
                        <button
                          type="button"
                          onClick={() => setActive(doctor)}
                          className={cn(
                            "text-left transition-colors duration-500 hover:text-gold",
                            "before:absolute before:inset-0 before:content-['']",
                          )}
                        >
                          {doctor.name}
                        </button>
                      ) : (
                        doctor.name
                      )}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] font-light leading-snug text-paper/50">
                      {doctor.role}
                    </p>
                    <p className="mt-auto pt-4 text-[11px] font-medium uppercase text-gold" style={{ letterSpacing: "0.16em" }}>
                      {doctor.experience ?? " "}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={140}>
          <div className="mt-20 flex flex-col items-start gap-8 border-t border-line-dark pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="lede max-w-lg text-paper/60">
              Не знаете, к какому специалисту записаться? Администратор подберёт
              врача под вашу ситуацию.
            </p>
            <a href="#calculator" className="btn btn-light shrink-0">
              Подобрать врача
            </a>
          </div>
        </Reveal>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        label={active ? active.name : "Врач"}
      >
        {active ? (
          <div className="grid max-h-[88vh] overflow-y-auto bg-paper sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="relative aspect-3/4 w-full bg-ink sm:aspect-auto sm:min-h-[460px]">
              <Image
                src={active.photo}
                alt={`${active.name} — ${active.role}`}
                fill
                sizes="(max-width: 640px) 100vw, 380px"
                className="object-cover object-top"
              />
            </div>

            <div className="p-8 md:p-14">
              <span
                className="text-[10.5px] font-medium uppercase text-gold"
                style={{ letterSpacing: "0.26em" }}
              >
                {active.lead ? "Главный врач клиники" : "Специалист клиники"}
              </span>

              <h3 className="display mt-5 text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight text-ink">
                {active.name}
              </h3>
              <p className="mt-4 text-[15px] font-light text-muted">{active.role}</p>
              {active.experience ? (
                <p className="mt-1.5 text-[13px] font-medium uppercase text-gold" style={{ letterSpacing: "0.16em" }}>
                  {active.experience}
                </p>
              ) : null}

              {active.skills?.length ? (
                <div className="mt-10">
                  <p
                    className="text-[10.5px] font-medium uppercase text-muted"
                    style={{ letterSpacing: "0.26em" }}
                  >
                    {active.skillsTitle}
                  </p>
                  <ul className="mt-6 flex flex-col border-t border-line">
                    {active.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border-b border-line py-4 text-[14.5px] font-light leading-relaxed text-ink/80"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <a
                href="#calculator"
                onClick={() => setActive(null)}
                className="btn btn-solid mt-12 w-full sm:w-auto"
              >
                Записаться к врачу
              </a>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
