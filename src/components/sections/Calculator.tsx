"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { calculatorOptions } from "@/data/content";
import { clinic, waLink } from "@/data/clinic";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

type Answers = {
  service: string;
  timing: string;
  payment: string;
  name: string;
  phone: string;
};

const steps = [
  { key: "service", question: "Какая услуга вас интересует?" },
  { key: "timing", question: "Когда планируете начать лечение?" },
  { key: "payment", question: "Какой способ оплаты удобнее?" },
  { key: "contact", question: "Куда отправить расчёт?" },
] as const;

const EMPTY: Answers = {
  service: "",
  timing: "",
  payment: "",
  name: "",
  phone: "",
};

/** Formats raw digits as +7 (7XX) XXX-XX-XX. */
function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += `) ${rest.slice(3, 6)}`;
  if (rest.length >= 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length >= 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-[15px] font-medium transition-all duration-300",
        selected
          ? "border-ink bg-ink text-white shadow-[0_14px_36px_-20px_rgba(11,26,43,0.8)]"
          : "border-line bg-white text-ink hover:border-ink/35 hover:bg-paper-2/60",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
          selected ? "border-white bg-white text-ink" : "border-ink/20",
        )}
      >
        {selected ? <Check size={13} strokeWidth={3} /> : null}
      </span>
    </button>
  );
}

export function Calculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const phoneDigits = answers.phone.replace(/\D/g, "");
  const contactValid = answers.name.trim().length >= 2 && phoneDigits.length === 11;

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(answers.service);
    if (step === 1) return Boolean(answers.timing);
    if (step === 2) return Boolean(answers.payment);
    return contactValid;
  }, [step, answers, contactValid]);

  const summary = `Здравствуйте! Хочу рассчитать стоимость лечения.
Услуга: ${answers.service || "—"}
Сроки: ${answers.timing || "—"}
Оплата: ${answers.payment || "—"}
Имя: ${answers.name || "—"}
Телефон: ${answers.phone || "—"}`;

  const pick = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (key !== "name" && key !== "phone") {
      window.setTimeout(() => setStep((current) => Math.min(current + 1, 3)), 220);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contactValid || status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("done");
    } catch {
      // The lead is never lost: the success screen always offers WhatsApp and a call.
      setStatus("error");
    }
  };

  const reset = () => {
    setAnswers(EMPTY);
    setStep(0);
    setStatus("idle");
  };

  const finished = status === "done" || status === "error";

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
      aria-labelledby="calculator-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-[-20%] h-[55vw] max-h-[680px] w-[55vw] max-w-[680px] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,98,155,0.25) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:pt-4">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-white/45">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
              Расчёт стоимости
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="calculator-title"
              className="display mt-5 text-[clamp(2rem,5.2vw,3.3rem)]"
            >
              Рассчитать стоимость лечения
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/60 md:text-[17px]">
              Четыре коротких вопроса — и администратор подготовит
              предварительный расчёт вашего случая. Точная стоимость
              определяется после диагностики.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 py-2.5 pl-2.5 pr-6 text-[14.5px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppGlyph size={18} />
                </span>
                Не любите формы? Напишите в WhatsApp
              </a>
              <a
                href={clinic.phone.href}
                className="w-fit text-[15px] font-semibold tracking-tight text-white/70 transition-colors hover:text-accent"
              >
                {clinic.phone.display} · {clinic.hours.short}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Wizard */}
        <Reveal delay={140}>
          <div className="rounded-[28px] border border-white/10 bg-white p-6 text-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] sm:p-8 md:p-10">
            {finished ? (
              <div className="flex min-h-[420px] flex-col justify-center text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent-deep">
                  <Check size={28} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="display mt-7 text-[clamp(1.5rem,3.6vw,2rem)] text-ink">
                  Спасибо!
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-[15.5px] leading-relaxed text-muted">
                  {status === "done"
                    ? "Администратор свяжется с вами для уточнения деталей."
                    : "Заявку не удалось отправить автоматически. Напишите нам в WhatsApp или позвоните — администратор свяжется с вами для уточнения деталей."}
                </p>

                <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3">
                  <a
                    href={waLink(summary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full bg-[#25D366] text-white hover:bg-[#1fb857]"
                  >
                    <WhatsAppGlyph size={19} />
                    Продолжить в WhatsApp
                  </a>
                  <a href={clinic.phone.href} className="btn btn-ghost w-full">
                    Позвонить {clinic.phone.display}
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-1 text-[13.5px] font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Заполнить ещё раз
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex min-h-[420px] flex-col">
                {/* Progress */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Шаг {step + 1} из {steps.length}
                  </p>
                  <div className="flex flex-1 gap-1.5" aria-hidden="true">
                    {steps.map((item, index) => (
                      <span
                        key={item.key}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors duration-500",
                          index <= step ? "bg-accent" : "bg-line",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="mt-7 text-[22px] font-semibold leading-snug tracking-tight text-ink md:text-[25px]">
                  {steps[step].question}
                </h3>

                <div className="mt-7 flex-1">
                  {step === 0 ? (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {calculatorOptions.service.map((option) => (
                        <OptionButton
                          key={option}
                          label={option}
                          selected={answers.service === option}
                          onClick={() => pick("service", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-2.5">
                      {calculatorOptions.timing.map((option) => (
                        <OptionButton
                          key={option}
                          label={option}
                          selected={answers.timing === option}
                          onClick={() => pick("timing", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-2.5">
                      {calculatorOptions.payment.map((option) => (
                        <OptionButton
                          key={option}
                          label={option}
                          selected={answers.payment === option}
                          onClick={() => pick("payment", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="flex flex-col gap-4">
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink/70">
                          Ваше имя
                        </span>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={answers.name}
                          onChange={(event) =>
                            setAnswers((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          placeholder="Как к вам обращаться"
                          className="h-14 rounded-2xl border border-line bg-white px-5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
                        />
                      </label>

                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink/70">
                          Ваш телефон
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          inputMode="tel"
                          autoComplete="tel"
                          value={answers.phone}
                          onChange={(event) =>
                            setAnswers((prev) => ({
                              ...prev,
                              phone: formatPhone(event.target.value),
                            }))
                          }
                          onFocus={() => {
                            if (!answers.phone) {
                              setAnswers((prev) => ({ ...prev, phone: "+7 (" }));
                            }
                          }}
                          placeholder="+7 (___) ___-__-__"
                          className="h-14 rounded-2xl border border-line bg-white px-5 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
                        />
                      </label>

                      <div className="rounded-2xl bg-paper-2 px-5 py-4 text-[13px] leading-relaxed text-muted">
                        <p>
                          <span className="font-semibold text-ink/70">Ваш выбор:</span>{" "}
                          {answers.service} · {answers.timing} · {answers.payment}
                        </p>
                      </div>

                      <p className="text-[12px] leading-relaxed text-muted">
                        Нажимая «Отправить», вы соглашаетесь на обработку
                        персональных данных для обратной связи.
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Controls */}
                <div className="mt-8 flex items-center gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((value) => Math.max(0, value - 1))}
                      className="grid shrink-0 place-items-center rounded-full border border-ink/12 text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                      aria-label="Назад"
                      style={{ height: 52, width: 52 }}
                    >
                      <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  ) : null}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((value) => Math.min(3, value + 1))}
                      disabled={!canContinue}
                      className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Далее
                      <ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!contactValid || status === "sending"}
                      className="btn btn-accent flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2
                            size={17}
                            className="animate-spin"
                            aria-hidden="true"
                          />
                          Отправляем
                        </>
                      ) : (
                        "Отправить заявку"
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
