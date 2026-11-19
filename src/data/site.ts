// Single source of facts for the page. Everything here comes from docs/capital-presentation.pdf
// and the plans in docs/plans-source/. `null` means the material does not contain it yet:
// the page then prints FILL so nobody mistakes a gap for a fact.
export const FILL = '[ЗАПОЛНИТЬ]';

export const contacts = {
  phone: null as string | null, // e.g. '+7 700 000 00 00'
  whatsapp: null as string | null, // digits only, e.g. '77000000000'
  email: null as string | null,
  instagram: null as string | null, // full URL
  telegram: null as string | null, // full URL
  salesOffice: 'г. Астана, пр. Кабанбай батыра, 58Б',
  objectAddress: 'г. Астана, Левый берег, ул. Бектурова',
  hours: null as string | null,
};

// Where the request form posts. Netlify Forms picks up the static form automatically;
// on Vercel or elsewhere, set PUBLIC_FORM_ENDPOINT to a form service URL.
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT || '/';

export const facts = {
  floors: '9–14',
  sections: 2,
  handover: 'I квартал 2028',
  terms: 'Рассрочка до сдачи объекта',
  management: 'Собственная управляющая компания',
  ceilingGround: '4,5 м',
  ceilingTypical: '3,2 м',
  minArea: 17,
  buildingClass: null as string | null,
  totalArea: null as string | null,
  parkingSpaces: null as string | null,
  security: null as string | null,
  price: null as string | null,
};

export const travel: { place: string; time: string | null }[] = [
  { place: 'ТРЦ «Хан Шатыр»', time: null },
  { place: 'Монумент «Байтерек»', time: null },
  { place: 'Вокзал «Нурлы Жол»', time: null },
  { place: 'Аэропорт Нурсултан Назарбаев', time: null },
];

export type PlanKey = 'f1' | 'f37' | 'fB';
export const floorPlans: {
  key: PlanKey;
  title: string;
  floors: number[];
  ceiling: string;
  finish: string;
  floorArea: string | null;
  note: string;
}[] = [
  {
    key: 'f1',
    title: '1 этаж',
    floors: [1],
    ceiling: '4,5 м',
    finish: 'Черновая',
    floorArea: '1096,5 м²',
    note: 'Коммерческие помещения с отдельными входами: торговля, услуги, банки, рестораны, шоурумы.',
  },
  {
    key: 'f37',
    title: '3–7 этажи',
    floors: [3, 4, 5, 6, 7],
    ceiling: '3,2 м',
    finish: 'Чистовая',
    floorArea: null,
    note: 'Офисы от 17 м²: от кабинета на 1–2 человека до блока для команды.',
  },
  // Typical plan found in the presentation without a floor label. Add its floors here once confirmed.
  {
    key: 'fB',
    title: 'Типовой этаж',
    floors: [],
    ceiling: '3,2 м',
    finish: 'Чистовая',
    floorArea: null,
    note: 'Офисы от 14,84 м².',
  },
];

export const TOTAL_FLOORS = 14;
