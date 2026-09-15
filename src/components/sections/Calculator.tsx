"use client";

import { useMemo, useState } from "react";
import { calculatorOptions } from "@/data/content";
import { clinic, waLink } from "@/data/clinic";
import { cn } from "@/lib/utils";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";

type Answers = {
  service: string;
  timing: string;
  payment: string;
  name: string;
  phone: string;
};

const steps = [
  "Какая услуга вас интересует?",
  "Когда планируете начать лечение?",
  "Какой способ оплаты удобнее?",
  "Куда отправить расчёт?",
] as const;

const EMPTY: Answers = { service: "", timing: "", payment: "", name: "", phone: "" };

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

function Option({
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
        "flex min-h-[60px] items-center justify-between gap-5 border px-6 py-4 text-left text-[14px] font-light transition-all duration-500",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-line bg-transparent text-ink hover:border-ink/40",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0 transition-colors duration-500",
          selected ? "bg-paper" : "bg-line",
        )}
      />
    </button>
  );
}

const inputClass =
  "h-16 w-full border-b border-line bg-transparent px-1 text-[17px] font-light text-ink outline-none transition-colors duration-500 placeholder:text-muted/50 focus:border-gold";

export function Calculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

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
    window.setTimeout(() => setStep((current) => Math.min(current + 1, 3)), 260);
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
      className="section bg-ink text-paper"
      aria-labelledby="calculator-title"
    >
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow flex items-center gap-5 text-paper/45">
              <span aria-hidden="true" className="numeral text-[15px] text-gold">
                08
              </span>
              Расчёт стоимости
            </p>
          </Reveal>

          <RevealLines
            as="h2"
            id="calculator-title"
            lines={[
              "Рассчитать",
              <span key="l2" className="display-italic text-gold">
                стоимость лечения
              </span>,
            ]}
            className="display mt-9 text-[clamp(2.2rem,5.4vw,3.8rem)]"
          />

          <Reveal delay={260}>
            <p className="lede mt-9 max-w-md text-paper/60">
              Четыре коротких вопроса — и администратор подготовит
              предварительный расчёт вашего случая. Точная стоимость
              определяется после диагностики.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-12 flex flex-col gap-6 border-t border-line-dark pt-10">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-4 text-[12px] font-medium uppercase text-paper/70 transition-colors duration-500 hover:text-paper"
                style={{ letterSpacing: "0.18em" }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition-colors duration-500 group-hover:border-gold">
                  <WhatsAppGlyph size={16} />
                </span>
                Не любите формы? Напишите в WhatsApp
              </a>
              <a
                href={clinic.phone.href}
                className="link-underline w-fit font-display text-[24px] font-light text-paper"
              >
                {clinic.phone.display}
              </a>
              <p className="text-[12px] font-light uppercase text-paper/40" style={{ letterSpacing: "0.16em" }}>
                {clinic.hours.short}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="min-w-0">
          <div className="bg-paper p-8 text-ink sm:p-12 md:p-14">
            {finished ? (
              <div className="flex min-h-[460px] flex-col justify-center">
                <span
                  aria-hidden="true"
                  className="numeral text-[15px] text-gold"
                  style={{ letterSpacing: "0.2em" }}
                >
                  ✓
                </span>
                <h3 className="display mt-6 text-[clamp(2rem,4.4vw,3rem)] leading-tight text-ink">
                  Спасибо!
                </h3>
                <p className="lede mt-6 max-w-md text-muted">
                  {status === "done"
                    ? "Администратор свяжется с вами для уточнения деталей."
                    : "Заявку не удалось отправить автоматически. Напишите в WhatsApp или позвоните — администратор свяжется с вами для уточнения деталей."}
                </p>

                <div className="mt-12 flex flex-col gap-4">
                  <a
                    href={waLink(summary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid w-full sm:w-auto sm:self-start"
                  >
                    <WhatsAppGlyph size={16} />
                    Продолжить в WhatsApp
                  </a>
                  <a
                    href={clinic.phone.href}
                    className="btn btn-outline w-full sm:w-auto sm:self-start"
                  >
                    Позвонить {clinic.phone.display}
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="link-underline mt-3 self-start text-[11px] font-medium uppercase text-muted transition-colors duration-500 hover:text-ink"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    Заполнить ещё раз
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex min-h-[460px] flex-col">
                <div className="flex items-center justify-between gap-8 border-b border-line pb-5">
                  <span
                    className="text-[10.5px] font-medium uppercase text-muted"
                    style={{ letterSpacing: "0.26em" }}
                  >
                    Шаг {step + 1} из {steps.length}
                  </span>
                  <div className="flex flex-1 gap-2" aria-hidden="true">
                    {steps.map((item, index) => (
                      <span
                        key={item}
                        className={cn(
                          "h-px flex-1 transition-colors duration-700",
                          index <= step ? "bg-gold" : "bg-line",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="display mt-10 text-[clamp(1.5rem,3vw,2.1rem)] leading-tight text-ink">
                  {steps[step]}
                </h3>

                <div className="mt-10 flex-1">
                  {step === 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {calculatorOptions.service.map((option) => (
                        <Option
                          key={option}
                          label={option}
                          selected={answers.service === option}
                          onClick={() => pick("service", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-3">
                      {calculatorOptions.timing.map((option) => (
                        <Option
                          key={option}
                          label={option}
                          selected={answers.timing === option}
                          onClick={() => pick("timing", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3">
                      {calculatorOptions.payment.map((option) => (
                        <Option
                          key={option}
                          label={option}
                          selected={answers.payment === option}
                          onClick={() => pick("payment", option)}
                        />
                      ))}
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="flex flex-col gap-8">
                      <label className="block">
                        <span
                          className="block text-[10.5px] font-medium uppercase text-muted"
                          style={{ letterSpacing: "0.26em" }}
                        >
                          Ваше имя
                        </span>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={answers.name}
                          onChange={(e) =>
                            setAnswers((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder="Как к вам обращаться"
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <span
                          className="block text-[10.5px] font-medium uppercase text-muted"
                          style={{ letterSpacing: "0.26em" }}
                        >
                          Ваш телефон
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          inputMode="tel"
                          autoComplete="tel"
                          value={answers.phone}
                          onChange={(e) =>
                            setAnswers((p) => ({
                              ...p,
                              phone: formatPhone(e.target.value),
                            }))
                          }
                          onFocus={() => {
                            if (!answers.phone) {
                              setAnswers((p) => ({ ...p, phone: "+7 (" }));
                            }
                          }}
                          placeholder="+7 (___) ___-__-__"
                          className={inputClass}
                        />
                      </label>

                      <p className="text-[13px] font-light leading-relaxed text-muted">
                        <span className="text-ink/70">Ваш выбор:</span>{" "}
                        {answers.service} · {answers.timing} · {answers.payment}
                      </p>
                      <p className="text-[12px] font-light leading-relaxed text-muted">
                        Нажимая «Отправить», вы соглашаетесь на обработку
                        персональных данных для обратной связи.
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="mt-12 flex items-center gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((v) => Math.max(0, v - 1))}
                      aria-label="Назад"
                      className="grid h-14 w-14 shrink-0 place-items-center border border-ink/15 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <svg width="26" height="9" viewBox="0 0 26 9" fill="none" aria-hidden="true">
                        <g transform="rotate(180 13 4.5)" stroke="currentColor" strokeWidth="1">
                          <path d="M0 4.5h24M20.5 1 24 4.5 20.5 8" />
                        </g>
                      </svg>
                    </button>
                  ) : null}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((v) => Math.min(3, v + 1))}
                      disabled={!canContinue}
                      className="btn btn-solid flex-1 disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      Далее
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!contactValid || status === "sending"}
                      className="btn btn-solid flex-1 disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      {status === "sending" ? "Отправляем…" : "Отправить заявку"}
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
