/**
 * Trust block. Every line is a claim published on status-dental-center.kz.
 */

export type Advantage = {
  title: string;
  text: string;
};

export const advantages: Advantage[] = [
  {
    title: "Профилактический осмотр — 0 ₸",
    text: "Приходите, чтобы разобраться в ситуации: осмотр и разбор снимков не тарифицируются.",
  },
  {
    title: "Рассрочка до 24 месяцев",
    text: "Оформляем рассрочку от Kaspi прямо в клинике, без процентов и переплат.",
  },
  {
    title: "Гарантия от 3 лет",
    text: "Официальная гарантия на все услуги клиники. На отдельные работы врачи выдают гарантию 5 лет.",
  },
  {
    title: "Спасаем зубы, за которые не берутся",
    text: "Стараемся сохранить пациенту родные зубы и уберечь от имплантации, пока это возможно.",
  },
  {
    title: "Импортные материалы",
    text: "Работаем на проверенных материалах и системах: Straumann, E-max, Ceram, Estelite.",
  },
  {
    title: "Контроль главного врача",
    text: "Каждый этап лечения фотопротоколируется, главврач контролирует работу каждого специалиста.",
  },
];

/** Counters shown under the trust cards. All numbers are verifiable on the site. */
export const stats = [
  { value: 10, suffix: " лет", label: "стаж главного врача клиники" },
  { value: 8, suffix: "", label: "врачей в команде STATUS" },
  { value: 23, suffix: "", label: "клинических кейса в галерее" },
  { value: 5, suffix: ".0", label: "рейтинг клиники в 2ГИС" },
];
