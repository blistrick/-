"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";

const EASE = [0.22, 1, 0.36, 1] as const;
const SERVICES = ["Консультация", "Виниры", "Эстетическая реставрация", "Имплантация", "Отбеливание", "Элайнеры", "Цифровая диагностика"];

type Errors = Partial<Record<"name" | "phone" | "service" | "date", string>>;

function Field({
  id,
  label,
  error,
  floated,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  /** For select/date (no :placeholder-shown): controlled float state. */
  floated?: boolean;
  children: React.ReactNode;
}) {
  const up = "-translate-y-5 scale-[0.72]";
  const floatCls =
    floated === undefined
      ? "peer-focus:-translate-y-5 peer-focus:scale-[0.72] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.72]"
      : floated
        ? up
        : "peer-focus:-translate-y-5 peer-focus:scale-[0.72]";
  return (
    <div className="relative">
      <div className="group relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 top-5 origin-left text-[17px] text-graphite-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            floatCls,
          )}
        >
          {label}
        </label>
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100",
            error ? "scale-x-100 bg-[#9b3b2f]" : "bg-graphite",
          )}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, x: [0, -6, 6, -3, 3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-[13px] text-[#9b3b2f]"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "peer block h-16 w-full border-0 border-b border-graphite/20 bg-transparent pt-5 text-[17px] text-graphite outline-none placeholder:text-transparent focus:outline-none focus-visible:outline-none";

export function Booking() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").replace(/\D/g, "");
    const next: Errors = {};
    if (name.length < 2) next.name = "Как к вам обращаться?";
    if (phone.length < 10) next.phone = "Проверьте номер — нужно 10–11 цифр";
    if (!service) next.service = "Выберите услугу";
    if (!date) next.date = "Выберите удобную дату";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    // TODO: подключить CRM / API записи
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="booking" data-bg="ivory" className="relative py-28 md:py-40" aria-labelledby="booking-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-champagne-ink">10 — Запись</p>
          <MaskedTextReveal as="h2" className="display text-[clamp(44px,6vw,104px)]">
            Начнём <em>с разговора</em>
          </MaskedTextReveal>
          <p className="measure mt-8 text-graphite-soft">
            Оставьте контакты — куратор перезвонит в течение 15 минут в рабочее время и подберёт удобный визит.
          </p>
          <dl className="mt-12 space-y-6 text-[15px]">
            <div>
              <dt className="eyebrow text-graphite-soft">Телефон</dt>
              <dd className="mt-1"><a href="tel:+74950000000" className="display text-[32px]">+7 495 000-00-00</a></dd>
            </div>
            <div>
              <dt className="eyebrow text-graphite-soft">Часы</dt>
              <dd className="mt-1">Пн–Сб 9:00–21:00 · Вс по записи</dd>
            </div>
          </dl>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                className="space-y-8 rounded-[var(--radius-card)] bg-pearl/70 p-7 md:p-12"
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Field id="name" label="Имя" error={errors.name}>
                  <input id="name" name="name" autoComplete="name" placeholder=" " className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                </Field>
                <Field id="phone" label="Телефон" error={errors.phone}>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder=" " className={inputCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
                </Field>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field id="service" label="Услуга" error={errors.service} floated={!!service}>
                    <select
                      id="service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={cn(inputCls, "appearance-none", !service && "text-transparent")}
                      aria-invalid={!!errors.service}
                    >
                      <option value="" disabled hidden />
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="text-graphite">{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="date" label="Желаемая дата" error={errors.date} floated={!!date}>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={cn(inputCls, !date && "text-transparent focus:text-graphite")}
                      aria-invalid={!!errors.date}
                    />
                  </Field>
                </div>
                <div className="flex flex-col gap-5 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-graphite px-9 text-[15px] font-medium text-ivory"
                  >
                    <span aria-hidden className="absolute inset-0 translate-y-full rounded-full bg-champagne-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                    <span className="relative">{loading ? "Отправляем…" : "Записаться"}</span>
                  </button>
                  <p className="max-w-[30ch] text-[13px] text-graphite-soft">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="flex min-h-[460px] flex-col items-center justify-center rounded-[var(--radius-card)] bg-pearl/70 p-10 text-center"
                role="status"
              >
                <svg viewBox="0 0 80 80" className="h-20 w-20" fill="none" aria-hidden>
                  <motion.circle cx="40" cy="40" r="38" stroke="var(--champagne)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }} />
                  <motion.path d="M26 41l9 9 19-19" stroke="var(--graphite)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: EASE }} />
                </svg>
                <h3 className="display mt-8 text-[44px]">Спасибо!</h3>
                <p className="mt-4 max-w-[34ch] text-graphite-soft">Куратор свяжется с вами в течение 15 минут, чтобы подтвердить визит.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
