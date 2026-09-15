"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { doctors, type Doctor } from "@/data/doctors";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Doctors() {
  const [active, setActive] = useState<Doctor | null>(null);

  return (
    <section
      id="doctors"
      className="bg-ink py-20 text-white md:py-28"
      aria-labelledby="doctors-title"
    >
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="Команда специалистов"
          title={<span id="doctors-title">Врачи клиники STATUS</span>}
          description="Терапевты, хирурги-имплантологи, ортопеды и ортодонты работают в одной команде: сложный случай ведут несколько специалистов под контролем главного врача."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {doctors.map((doctor, index) => {
            const hasDetails = Boolean(doctor.skills?.length);

            return (
              <Reveal key={doctor.slug} delay={(index % 4) * 70} as="li">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/8 bg-ink-800">
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <Image
                      src={doctor.photo}
                      alt={`${doctor.name} — ${doctor.role}, стоматология STATUS Dental Center в Алматы`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                      className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-800 to-transparent"
                    />

                    {doctor.lead ? (
                      <span className="absolute bottom-3 left-4 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white">
                        Главный врач
                      </span>
                    ) : null}

                    {hasDetails ? (
                      <span
                        aria-hidden="true"
                        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-ink/40 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-accent group-hover:bg-accent"
                      >
                        <Plus size={15} strokeWidth={2} />
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-6 pt-1">
                    <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-white md:text-[17px]">
                      {hasDetails ? (
                        <button
                          type="button"
                          onClick={() => setActive(doctor)}
                          className="text-left transition-colors before:absolute before:inset-0 before:content-[''] hover:text-accent"
                        >
                          {doctor.name}
                        </button>
                      ) : (
                        doctor.name
                      )}
                    </h3>
                    <p className="mt-2 text-[13px] leading-snug text-white/50">
                      {doctor.role}
                    </p>
                    <p className="mt-auto pt-3 text-[12px] text-accent">
                      {doctor.experience ?? " "}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-[26px] border border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <p className="max-w-lg text-[15px] leading-relaxed text-white/60 md:text-[16px]">
              Не знаете, к какому специалисту записаться? Администратор подберёт
              врача под вашу ситуацию.
            </p>
            <a href="#calculator" className="btn btn-accent shrink-0">
              Подобрать врача
            </a>
          </div>
        </Reveal>
      </div>

      {/* Doctor detail */}
      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        label={active ? active.name : "Врач"}
      >
        {active ? (
          <div className="grid max-h-[88vh] overflow-y-auto sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="relative aspect-4/5 w-full bg-ink sm:aspect-auto sm:min-h-[420px]">
              <Image
                src={active.photo}
                alt={`${active.name} — ${active.role}`}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover object-top"
              />
            </div>

            <div className="p-6 md:p-9">
              {active.lead ? (
                <p className="eyebrow text-accent-deep">Главный врач клиники</p>
              ) : (
                <p className="eyebrow text-muted">Специалист клиники</p>
              )}

              <h3 className="display mt-3 text-[clamp(1.4rem,3.2vw,1.9rem)] text-ink">
                {active.name}
              </h3>
              <p className="mt-3 text-[15px] text-muted">{active.role}</p>
              {active.experience ? (
                <p className="mt-1.5 text-[15px] font-semibold text-accent-deep">
                  {active.experience}
                </p>
              ) : null}

              {active.skills?.length ? (
                <div className="mt-7 border-t border-line pt-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink/60">
                    {active.skillsTitle}
                  </p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {active.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex gap-3 text-[14.5px] leading-relaxed text-ink/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <a
                href="#calculator"
                onClick={() => setActive(null)}
                className="btn btn-primary mt-8 w-full sm:w-auto"
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
