# STATUS Dental Center — редизайн сайта

Новая версия сайта стоматологической клиники STATUS Dental Center
(Алматы), выполненная в стиле premium dental / modern medical / minimal
luxury. Контент (услуги, цены, врачи, отзывы, контакты) собран с
действующего сайта [status-dental-center.kz](https://status-dental-center.kz/)
и живёт в одном файле — `lib/data.ts`.

## Стек

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** (токены темы — в `app/globals.css`)
- **Framer Motion** — плавные reveal-анимации и переходы
- **lucide-react** — иконки

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production-сборка
npm run lint                 # ESLint
```

## Структура

```
app/
  layout.tsx      — шрифты, SEO-метаданные, JSON-LD
  page.tsx         — сборка секций
  globals.css      — цветовая палитра, типографика, анимации
  robots.ts / sitemap.ts
components/
  Header, Hero, TrustSection, Services, WhyStatus, Technology,
  Cases, Doctors, Prices, Calculator, Reviews, CTA, Contact,
  Footer, WhatsAppButton, Reveal
lib/data.ts        — все реальные данные клиники (услуги, цены,
                      врачи, отзывы, контакты)
public/images/      — реальные фотографии врачей и клиники
```

## Важное про контент

- Цены, имена и специализации врачей, тексты отзывов и контакты — реальные,
  сверены с действующим сайтом клиники.
- Раздел «Результаты лечения» намеренно не использует постановочные
  фото «до/после» — в открытом доступе таких фотографий на сайте
  клиники нет, а описания случаев (терапия, эстетика, имплантация)
  взяты из реальных текстов сайта.
- Карта в разделе «Контакты» использует встраиваемый виджет Яндекс
  Карт (не требует API-ключа) с реальными координатами клиники.
