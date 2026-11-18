# LUMIÈRE Dental Atelier — лендинг

Премиальный анимированный лендинг стоматологии: Next.js 15 (App Router) · TypeScript · Tailwind v4 · Motion · GSAP ScrollTrigger · Lenis.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

- `/` — сайт: прелоадер, навбар, hero, философия, услуги, путь пациента, до/после, врачи, фильм, технологии, отзывы, цены, FAQ, запись, футер
- `/system` — дизайн-система и moodboard

## Структура

- `src/app/globals.css` — дизайн-токены (цвета, радиусы, easing), grain, CSS-анимации появления
- `src/components/smooth-scroll.tsx` — Lenis + ScrollTrigger, смена фона секций по `data-bg`
- `src/components/sections/*` — секции страницы
- `src/components/ui/text-reveal-mask.tsx` — адаптированный компонент 21st.dev (soralabs/text-reveal-mask)
- `src/components/ui/magnetic-button.tsx`, `cursor.tsx`, `preloader.tsx`, `navbar.tsx`

## Видео из Motion

Секция «Фильм о клинике» — `src/components/sections/film.tsx`. Положите экспорт ролика из motion.so в
`public/video/promo.mp4` и поменяйте константу `PROMO_SRC`. Пока стоит эмбиент-петля из Krea.

## Что подключить перед запуском в прод

- Форма записи (`booking.tsx`) — сейчас имитирует отправку, нужен API/CRM (`TODO`).
- Реальные телефоны, адрес, лицензия, ссылки соцсетей, отзывы и фото врачей (сейчас — демо-контент и AI-портреты).
- Кейсы «до/после» — только реальные, с согласия пациентов (сейчас — AI-иллюстрация с подписью).

## Шрифты

Cormorant Garamond (заголовки) + Manrope (текст) — бесплатные, с кириллицей.
Instrument Serif и Fraunces из ТЗ не поддерживают кириллицу. Премиум-замена при покупке лицензии:
PP Editorial New / Canela + Neue Montreal / Suisse Int'l — подключить через `next/font/local` в `src/app/layout.tsx`.

## Ассеты (Krea AI)

| Файл | Модель | Назначение |
|---|---|---|
| `public/img/hero-bg.jpg` | Krea 2 Large → Topaz Standard (апскейл ×2) | Hero, слой 1 |
| `public/img/hero-mid.png` | GPT Image 2.6 Flare (прозрачный фон) | Hero, слой 2 — ваза |
| `public/img/hero-fg.png` | GPT Image 2.6 Flare (прозрачный фон) | Hero, слой 3 — стекло |
| `public/video/hero-loop.mp4` | Kling 2.6 (image-to-video, петля) | Фоновое видео hero (только десктоп) |
| `public/img/{smile,craft,porcelain,light,aligner,scanner,suite}.jpg` | Krea 2 Large | Услуги, философия, путь пациента |
| `public/img/doc-{1..4}.jpg` | Krea 2 Large | Портреты врачей |
| `public/img/ba-after.jpg` / `ba-before.jpg` | Krea 2 Large / Nano Banana 2.1 (edit) | Слайдер до/после |
| `public/img/tech.jpg`, `public/video/tech-loop.mp4` | Krea 2 Large → Kling 2.6 | Секция «Технологии» |

## Lighthouse (production, локально)

Mobile: Performance 87–90 · Accessibility 100 · Best Practices 100 · SEO 100. Desktop Performance 99.
