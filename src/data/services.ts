/**
 * Treatment directions. Titles and descriptions are condensed from the
 * service pages of status-dental-center.kz.
 *
 * Every entry carries an image because the section renders as an editorial
 * list that previews the direction on hover. Where a clinical result exists
 * for the direction, the photo is one of the clinic's own cases.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "implantaciya",
    title: "Имплантация зубов",
    short:
      "Импланты Straumann, Neodent, Dentium, AnyRidge и IZEN. Операцию планируем цифрово, по хирургическому шаблону.",
    image: "/images/photos/implant-model.webp",
    imageAlt: "Модель челюсти с зубным имплантом — имплантация зубов в Алматы",
  },
  {
    slug: "lechenie-zubov",
    title: "Лечение зубов",
    short:
      "Кариес, пульпит, периодонтит. Лечим под микроскопом, максимально сохраняя живые ткани зуба.",
    image: "/images/photos/mirror-dark.webp",
    imageAlt: "Осмотр зубов стоматологическим зеркалом — лечение зубов в Алматы",
  },
  {
    slug: "ortodontiya",
    title: "Ортодонтия и брекеты",
    short:
      "Металлические, сапфировые и самолигирующие системы, пластинки, MSE-аппарат, ретейнеры.",
    image: "/images/photos/braces-models.webp",
    imageAlt: "Модели челюстей с брекет-системами — брекеты в Алматы",
  },
  {
    slug: "elayneri",
    title: "Элайнеры",
    short:
      "Прозрачные каппы для коррекции прикуса: почти незаметны и снимаются на время еды.",
    image: "/images/photos/teeth-closeup.webp",
    imageAlt: "Ровный зубной ряд крупным планом — элайнеры в Алматы",
  },
  {
    slug: "hirurgiya",
    title: "Хирургическая стоматология",
    short:
      "Удаление зубов любой сложности, зубы мудрости, кисты, резекция верхушки корня, пластика уздечки.",
    image: "/images/photos/examination.webp",
    imageAlt: "Приём хирурга-стоматолога в клинике в Алматы",
  },
  {
    slug: "viniry",
    title: "Виниры",
    short:
      "Керамические виниры E-max: форма, цвет и закрытие щелей между зубами.",
    image: "/images/cases/ceramic-veneers-emax-after.webp",
    imageAlt:
      "Улыбка после установки керамических виниров E-max — работа клиники STATUS",
  },
  {
    slug: "protezirovanie",
    title: "Протезирование",
    short:
      "Коронки E-max и на диоксиде циркония, вкладки, съёмные и бюгельные протезы, All-on-4/6.",
    image: "/images/photos/denture-model.webp",
    imageAlt: "Протез на модели челюсти — протезирование зубов в Алматы",
  },
  {
    slug: "estetika",
    title: "Эстетическая стоматология",
    short:
      "Художественная реставрация и восстановление анатомии зуба — незаметно и функционально.",
    image: "/images/photos/smile.webp",
    imageAlt: "Улыбка после эстетической реставрации зубов",
  },
  {
    slug: "otbelivanie",
    title: "Отбеливание зубов",
    short:
      "Система Beyond Polus и эндодонтическое отбеливание с реминерализацией эмали.",
    image: "/images/cases/whitening-beyond-polus-after.webp",
    imageAlt: "Зубы после отбеливания Beyond Polus — работа клиники STATUS",
  },
  {
    slug: "gigiena",
    title: "Профессиональная чистка",
    short:
      "Ультразвук, Air Flow, полировка и защитный лак. Аппараты EMS, Vector, KaVo ProphyPearls.",
    image: "/images/cases/air-flow-cleaning-after.webp",
    imageAlt: "Зубы после профессиональной чистки Air Flow в клинике STATUS",
  },
  {
    slug: "detskaya",
    title: "Детская стоматология",
    short:
      "Лечение молочных и постоянных зубов, герметизация фиссур, детская гигиена, детский ортодонт.",
    image: "/images/photos/treatment.webp",
    imageAlt: "Приём в детской стоматологии в Алматы",
  },
  {
    slug: "lechenie-desen",
    title: "Лечение дёсен",
    short:
      "Пародонтология: кюретаж, скейлинг, плазмолифтинг, устранение кровоточивости и рецессии.",
    image: "/images/cases/professional-cleaning-after.webp",
    imageAlt: "Состояние дёсен после пародонтологического лечения и гигиены",
  },
  {
    slug: "diagnostika",
    title: "Рентген и диагностика",
    short:
      "Прицельные снимки, КТ, сканирование челюстей 3D-сканером и цифровое планирование лечения.",
    image: "/images/photos/lab-work.webp",
    imageAlt: "Цифровая диагностика и работа с моделью челюсти",
  },
  {
    slug: "gnatologiya",
    title: "Гнатология",
    short:
      "Работа с прикусом и жевательной функцией, каппы от бруксизма, спортивные каппы.",
    image: "/images/cases/open-bite-selfligating-after.webp",
    imageAlt: "Прикус после ортодонтической коррекции — работа клиники STATUS",
  },
];
