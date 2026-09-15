/**
 * Treatment directions. Titles and descriptions are condensed from the
 * service pages of status-dental-center.kz.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  /** Wide cards carry a photo, compact cards stay typographic. */
  image?: string;
  imageAlt?: string;
  /** Grid weight used by the bento layout on desktop. */
  span: "wide" | "tall" | "compact";
};

export const services: Service[] = [
  {
    slug: "implantaciya",
    title: "Имплантация зубов",
    short:
      "Восстановление утраченных зубов имплантами Straumann, Neodent, Dentium, AnyRidge и IZEN. Планируем операцию цифрово, по хирургическому шаблону.",
    image: "/images/photos/implant-model.webp",
    imageAlt:
      "Модель челюсти с зубным имплантом — имплантация зубов в Алматы, STATUS Dental Center",
    span: "wide",
  },
  {
    slug: "lechenie-zubov",
    title: "Лечение зубов",
    short:
      "Кариес, пульпит, периодонтит. Лечим под микроскопом, максимально сохраняя живые ткани зуба.",
    image: "/images/photos/mirror-dark.webp",
    imageAlt:
      "Осмотр зубов стоматологическим зеркалом — лечение зубов в Алматы",
    span: "tall",
  },
  {
    slug: "ortodontiya",
    title: "Ортодонтия и брекеты",
    short:
      "Металлические, сапфировые и самолигирующие брекет-системы, пластинки, MSE-аппарат, ретейнеры.",
    image: "/images/photos/braces-models.webp",
    imageAlt: "Модели челюстей с брекетами — брекеты в Алматы",
    span: "tall",
  },
  {
    slug: "elayneri",
    title: "Элайнеры",
    short:
      "Прозрачные каппы для коррекции прикуса — почти незаметны и снимаются на время еды.",
    span: "compact",
  },
  {
    slug: "hirurgiya",
    title: "Хирургическая стоматология",
    short:
      "Удаление зубов любой сложности, зубы мудрости, кисты, резекция верхушки корня, пластика уздечки.",
    span: "compact",
  },
  {
    slug: "viniry",
    title: "Виниры",
    short:
      "Керамические виниры E-max: форма, цвет и закрытие щелей между зубами.",
    image: "/images/photos/smile.webp",
    imageAlt: "Улыбка после установки виниров — виниры в Алматы",
    span: "wide",
  },
  {
    slug: "protezirovanie",
    title: "Протезирование",
    short:
      "Коронки E-max и на диоксиде циркония, вкладки, съёмные и бюгельные протезы, All-on-4/6.",
    image: "/images/photos/denture-model.webp",
    imageAlt: "Протез на модели челюсти — протезирование зубов в Алматы",
    span: "tall",
  },
  {
    slug: "estetika",
    title: "Эстетическая стоматология",
    short:
      "Художественная реставрация и восстановление анатомии зуба — незаметно и функционально.",
    span: "compact",
  },
  {
    slug: "otbelivanie",
    title: "Отбеливание зубов",
    short:
      "Система Beyond Polus и эндодонтическое отбеливание с последующей реминерализацией эмали.",
    span: "compact",
  },
  {
    slug: "gigiena",
    title: "Профессиональная чистка",
    short:
      "Ультразвук, Air Flow, полировка и защитный лак. Аппараты EMS, Vector, KaVo ProphyPearls.",
    image: "/images/photos/lab-work.webp",
    imageAlt: "Профессиональная гигиена полости рта в стоматологии Алматы",
    span: "tall",
  },
  {
    slug: "detskaya",
    title: "Детская стоматология",
    short:
      "Лечение молочных и постоянных зубов, герметизация фиссур, детская гигиена, детский ортодонт.",
    image: "/images/photos/treatment.webp",
    imageAlt: "Приём в детской стоматологии в Алматы",
    span: "wide",
  },
  {
    slug: "lechenie-desen",
    title: "Лечение дёсен",
    short:
      "Пародонтология: кюретаж, скейлинг, плазмолифтинг, устранение кровоточивости и рецессии.",
    span: "compact",
  },
  {
    slug: "diagnostika",
    title: "Рентген и диагностика",
    short:
      "Прицельные снимки, КТ, сканирование челюстей 3D-сканером и цифровое планирование лечения.",
    span: "compact",
  },
  {
    slug: "gnatologiya",
    title: "Гнатология",
    short:
      "Работа с прикусом и жевательной функцией, каппы от бруксизма, спортивные каппы.",
    span: "compact",
  },
];
