"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { calculatorSteps, clinic } from "@/lib/data";

const TOTAL_STEPS = 4;

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canNext =
    (step === 1 && service) ||
    (step === 2 && timing) ||
    (step === 3 && payment);

  const buildMessage = () =>
    encodeURIComponent(
      `Здравствуйте! Хочу рассчитать стоимость лечения.\n` +
        `Услуга: ${service}\n` +
        `Когда: ${timing}\n` +
        `Оплата: ${payment}\n` +
        `Имя: ${name}${phone ? `\nТелефон: ${phone}` : ""}`
    );

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="calculator" className="scroll-mt-28 bg-cream-alt/60 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-forest">Заявка</span>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Рассчитать стоимость лечения
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Четыре коротких шага — администратор свяжется с вами для уточнения
            деталей и подберёт удобное время визита.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-3xl border border-border-soft bg-cream p-6 shadow-soft sm:p-10">
          {!submitted && (
            <div className="mb-8 flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-forest" : "bg-border-soft"
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream">
                  <Check className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ink">Спасибо!</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                  Администратор свяжется с вами для уточнения деталей. Хотите
                  ускорить ответ — напишите нам в WhatsApp прямо сейчас.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`${clinic.whatsapp}?text=${buildMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-light"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                    Написать в WhatsApp
                  </a>
                  <a
                    href={clinic.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-forest hover:text-forest"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                    {clinic.phoneDisplay}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && (
                  <StepChoice
                    title="Какая услуга вас интересует?"
                    options={calculatorSteps.services}
                    value={service}
                    onChange={setService}
                  />
                )}
                {step === 2 && (
                  <StepChoice
                    title="Когда планируете начать лечение?"
                    options={calculatorSteps.timing}
                    value={timing}
                    onChange={setTiming}
                  />
                )}
                {step === 3 && (
                  <StepChoice
                    title="Какой способ оплаты удобнее?"
                    options={calculatorSteps.payment}
                    value={payment}
                    onChange={setPayment}
                  />
                )}
                {step === 4 && (
                  <div>
                    <h3 className="font-display text-xl text-ink sm:text-2xl">
                      Ваше имя и телефон
                    </h3>
                    <div className="mt-6 flex flex-col gap-4">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className="rounded-2xl border border-border bg-cream px-5 py-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-forest"
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="rounded-2xl border border-border bg-cream px-5 py-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-forest"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={`text-sm text-ink-soft transition-opacity hover:text-ink ${
                  step === 1 ? "pointer-events-none opacity-0" : ""
                }`}
              >
                Назад
              </button>
              {step < TOTAL_STEPS ? (
                <button
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Далее
                </button>
              ) : (
                <button
                  disabled={!name.trim()}
                  onClick={handleSubmit}
                  className="rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Отправить заявку
                </button>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function StepChoice({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-xl text-ink sm:text-2xl">{title}</h3>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-2xl border px-5 py-4 text-left text-sm transition-colors ${
              value === opt
                ? "border-forest bg-forest/5 text-forest"
                : "border-border text-ink-soft hover:border-forest/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
