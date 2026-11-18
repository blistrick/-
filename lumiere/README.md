# LUMIÈRE Dental Atelier — лендинг

Премиальный анимированный лендинг стоматологии: Next.js 15 (App Router) · TypeScript · Tailwind v4 · Motion · GSAP ScrollTrigger · Lenis.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

- `/` — сайт (сейчас: прелоадер, навбар, hero, философия, услуги)
- `/system` — дизайн-система и moodboard

## Структура

- `src/app/globals.css` — дизайн-токены (цвета, радиусы, easing), grain, CSS-анимации появления
- `src/components/smooth-scroll.tsx` — Lenis + ScrollTrigger, смена фона секций по `data-bg`
- `src/components/sections/*` — секции страницы
- `src/components/ui/text-reveal-mask.tsx` — адаптированный компонент 21st.dev (soralabs/text-reveal-mask)
- `src/components/ui/magnetic-button.tsx`, `cursor.tsx`, `preloader.tsx`, `navbar.tsx`

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
| `public/img/{smile,craft,porcelain,light,aligner,scanner,suite}.jpg` | Krea 2 Large | Услуги, философия |

## Lighthouse (production, локально)

Mobile: Performance 88–92 · Accessibility 100 · Best Practices 100 · SEO 100. Desktop Performance 96.
