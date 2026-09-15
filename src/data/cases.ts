/**
 * Before / after gallery.
 *
 * Every photo comes from the "До/после" slider on status-dental-center.kz.
 * Each source photo was a single frame with the "before" state on top and the
 * "after" state underneath, so it is stored here as two files with the same
 * slug. `bakedLabels` marks the frames that already carry printed
 * "ДО" / "ПОСЛЕ" captions, so the UI does not draw its own on top of them.
 *
 * Descriptions, durations and warranties are quoted from the source slides —
 * a case only lists a warranty when the clinic stated one for that case.
 */

export const caseCategories = [
  "Все работы",
  "Терапия",
  "Имплантация",
  "Ортодонтия",
  "Эстетика",
  "Протезирование",
  "Гигиена",
] as const;

export type CaseCategory = Exclude<(typeof caseCategories)[number], "Все работы">;

export type CaseStudy = {
  slug: string;
  category: CaseCategory;
  title: string;
  summary: string;
  details?: string[];
  duration?: string;
  warranty?: string;
  bakedLabels: boolean;
};

export const cases: CaseStudy[] = [
  {
    slug: "secondary-caries-restoration",
    category: "Терапия",
    title: "Лечение вторичного кариеса",
    summary:
      "Пациент обратился с жалобами на боль в ранее пролеченных зубах. Провели лечение вторичного кариеса и реставрацию: восстановили естественные фиссуры, чтобы сохранить прикус и жевательную функцию.",
    duration: "2 часа",
    bakedLabels: true,
  },
  {
    slug: "medium-caries-microscope",
    category: "Терапия",
    title: "Лечение среднего кариеса",
    summary:
      "Пациент обратился с чувствительностью зуба на холодное и горячее. На приёме был выявлен кариес.",
    details: [
      "Лечение кариеса под микроскопом — для максимального сохранения зуба",
      "Восстановление анатомической структуры зуба",
      "Герметизация фиссур",
    ],
    warranty: "Гарантия 5 лет",
    bakedLabels: false,
  },
  {
    slug: "pulpitis-restoration",
    category: "Терапия",
    title: "Лечение пульпита и реставрация",
    summary:
      "Пациент обратился с зубной болью. На видимой поверхности зуба было небольшое пятнышко, но после раскрытия обнаружилась обширная полость, поражённая кариесом, который добрался до пульпы.",
    details: [
      "Лечение трёх каналов зуба",
      "Восстановление анатомической структуры зуба",
      "Герметизация фиссур",
    ],
    warranty: "Гарантия 5 лет",
    bakedLabels: false,
  },
  {
    slug: "caries-restoration-fissures",
    category: "Терапия",
    title: "Реставрация жевательной группы",
    summary:
      "Пациент обратился с жалобами на боль в зубах. Провели лечение кариеса и реставрацию зубов, восстановили естественные фиссуры для сохранения прикуса и жевательных процессов.",
    bakedLabels: true,
  },
  {
    slug: "three-teeth-one-visit",
    category: "Терапия",
    title: "Лечение 3 зубов за 1 посещение",
    summary: "Реставрация жевательных зубов за один визит.",
    details: [
      "Материалы: Ceram SphereTec A3, Esthet-X white, Estelite Color DB, Ocre",
    ],
    duration: "4,5 часа",
    warranty: "Гарантия 5 лет",
    bakedLabels: false,
  },
  {
    slug: "chewing-teeth-restoration",
    category: "Терапия",
    title: "Восстановление жевательных зубов",
    summary:
      "Препарирование, восстановление контактов, моделирование основных и дополнительных гребней жевательной поверхности, окклюзионная интеграция, полировка и финишная отделка — за один визит.",
    duration: "около 5,5 часов, 1 визит",
    warranty: "Гарантия 5 лет",
    bakedLabels: false,
  },
  {
    slug: "veneers-emax-10",
    category: "Эстетика",
    title: "10 виниров E-max",
    summary:
      "Пациент обратился за исправлением формы зубов и щели между зубами. Установили 10 единиц виниров E-max.",
    bakedLabels: true,
  },
  {
    slug: "complex-laser-implantation",
    category: "Имплантация",
    title: "Комплексное лечение с имплантацией",
    summary:
      "Пациент обратился за комплексным лечением. Провели лечение кариеса, трёхэтапную чистку зубов, лазерную имплантацию и установили циркониевые коронки.",
    bakedLabels: true,
  },
  {
    slug: "professional-cleaning",
    category: "Гигиена",
    title: "Профессиональная чистка зубов",
    summary:
      "Комплексная гигиена с оценкой состояния дёсен и обработкой поддесневой области.",
    details: [
      "Оценка состояния дёсен",
      "Удаление зубного камня аппаратом «Вектор» со всех поверхностей зуба, включая область под дёснами",
      "Снятие пигмента от табака, кофе и чая аппаратом Air Flow",
      "Чистка межзубных промежутков зубной нитью",
      "Полировка резиновыми щётками с очищающей пастой",
    ],
    bakedLabels: false,
  },
  {
    slug: "cleaning-remineralization",
    category: "Гигиена",
    title: "Чистка с реминерализацией",
    summary:
      "Гигиена с индикатором налёта, чтобы пациент увидел проблемные зоны, и защитным покрытием в финале.",
    details: [
      "Покрытие зубов индикатором степени загрязнения",
      "Удаление зубного камня ультразвуковым скейлером EMS",
      "Снятие налёта по технологии KaVo ProphyPearls",
      "Полировка индивидуальными щётками и пастами",
      "Защитный лак и реминерализация",
    ],
    bakedLabels: false,
  },
  {
    slug: "whitening-beyond-polus",
    category: "Эстетика",
    title: "Отбеливание Beyond Polus",
    summary:
      "Отбеливание 20 передних зубов гелем Beyond MAX под лампой Beyond Polus с защитой слизистой и финальной реминерализацией эмали.",
    details: [
      "Защитный гель на десну и слизистую",
      "Гель Beyond MAX на 20 передних зубов",
      "3–4 цикла работы лампы Beyond Polus по 15–20 минут",
      "Реминерализирующий гель для укрепления эмали",
    ],
    bakedLabels: false,
  },
  {
    slug: "ceramic-veneers-emax",
    category: "Эстетика",
    title: "Керамические виниры E-max",
    summary:
      "Восстановление формы и цвета фронтальной группы керамическими винирами E-max.",
    bakedLabels: true,
  },
  {
    slug: "open-bite-selfligating",
    category: "Ортодонтия",
    title: "Исправление открытого прикуса",
    summary:
      "Коррекция открытого прикуса самолигирующими брекетами American Orthodontics.",
    bakedLabels: true,
  },
  {
    slug: "complex-team-treatment",
    category: "Имплантация",
    title: "Работа всей команды специалистов",
    summary:
      "Междисциплинарный случай, в котором участвовали ортодонт, хирург-имплантолог, терапевт и ортопед.",
    details: [
      "Ортодонт исправил прикус брекетами",
      "Лазерная имплантация — 4 импланта STRAUMANN",
      "Лечение кариеса и воспаления в каналах",
      "Коррекция уровня десны на 6 зубах",
      "Восстановление зубов керамическими винирами и коронками",
    ],
    bakedLabels: true,
  },
  {
    slug: "lower-jaw-second-stage",
    category: "Имплантация",
    title: "Второй этап: нижняя челюсть",
    summary:
      "Пациентка вернулась через 2,5 месяца, чтобы пролечить ещё и нижнюю челюсть.",
    details: [
      "Комплексная чистка: Air Flow, ультразвук, полировка",
      "Лечение 4 зубов",
      "Лазерная имплантация, импланты Biohorizons",
      "Коронки и виниры без удаления нерва",
    ],
    bakedLabels: true,
  },
  {
    slug: "complex-crowns-straumann",
    category: "Протезирование",
    title: "Коронки на своих зубах и имплантах",
    summary:
      "Пациентка обратилась за комплексным лечением. Пролечили зубы, которые можно было спасти, безнадёжные удалили. Сделали коронки на собственных зубах и имплантах Straumann.",
    bakedLabels: true,
  },
  {
    slug: "all-in-6-total-implantation",
    category: "Имплантация",
    title: "Тотальная имплантация All-in-6",
    summary:
      "Пациент обратился с жалобой на дискомфорт от съёмных протезов: конструкция натирала десну. Провели тотальную имплантацию на 6 имплантах по протоколу All-in-6.",
    bakedLabels: false,
  },
  {
    slug: "air-flow-cleaning",
    category: "Гигиена",
    title: "Чистка зубов Air Flow",
    summary: "Четырёхэтапная гигиена с ультразвуком и пескоструйной обработкой.",
    details: [
      "Ультразвук: снятие зубного камня микровибрацией с водой",
      "Air Flow: снятие тёмного налёта водой, воздухом и порошком",
      "Шлифовка межзубных промежутков штрипсами",
      "Полировка пастой Detartin Z",
    ],
    bakedLabels: false,
  },
  {
    slug: "laser-implantation-zirconia",
    category: "Имплантация",
    title: "Замена протеза на циркониевые коронки",
    summary:
      "Пациент пришёл с жалобами на протез, который плохо прилегал: под ним скапливалась еда, было неудобно жевать, присутствовали неприятный запах и воспалённые дёсны. Пролечили кариес и дёсны, провели лазерную имплантацию, установили циркониевые коронки.",
    bakedLabels: true,
  },
  {
    slug: "mesial-bite-metal-braces",
    category: "Ортодонтия",
    title: "Исправление мезиального прикуса",
    summary: "Коррекция мезиального прикуса металлическими брекетами.",
    bakedLabels: true,
  },
  {
    slug: "sapphire-braces",
    category: "Ортодонтия",
    title: "Выравнивание зубного ряда",
    summary: "Исправление зубного ряда сапфировыми брекетами.",
    bakedLabels: true,
  },
  {
    slug: "four-implants-bar-prosthesis",
    category: "Имплантация",
    title: "4 импланта и протез на балке",
    summary:
      "За один визит хирург удалил зубы и сразу установил 4 импланта. Ортопед зафиксировал на них протез на балке: такая конструкция надёжно держится и оставляет нёбо открытым, что позволяет чувствовать вкус пищи.",
    duration: "1 визит",
    bakedLabels: true,
  },
  {
    slug: "front-teeth-caries-restoration",
    category: "Терапия",
    title: "Реставрация передних зубов",
    summary:
      "Пациент долго боялся идти в клинику — с детства был страх стоматологов. Обратившись к нам, все его страхи развеялись.",
    details: [
      "Профессиональная гигиена полости рта",
      "Лечение кариеса с сохранением зубов в «живом состоянии»",
      "Рекомендации по уходу за полостью рта — в подарок",
    ],
    bakedLabels: false,
  },
];
