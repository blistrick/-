# CAPITAL — сайт бизнес-центра

Одностраничный сайт: Astro (статическая сборка) + GSAP ScrollTrigger + Lenis + Three.js.

## Запуск

```bash
npm install
npm run dev        # локально, http://localhost:4321
npm run build      # сборка в dist/
npm run preview    # просмотр сборки
```

Деплой: Netlify (настройки в `netlify.toml`) или Vercel (`vercel.json`), команда сборки `npm run build`, папка `dist`.

## Где что лежит

- `docs/` — презентация `capital-presentation.pdf` и исходные растры планов (`plans-source/`).
- `images/` — рендеры из материалов; `images/plans/` — очищенные чертежи планов.
- `models/build-model.mjs` — генератор 3D-модели здания (по планам и рендерам). Результат: `public/models/capital.glb`, сжатие meshopt. Пересобрать: `npm run model`.
- `scripts/build-plans.py` — извлечение помещений с планов в `src/data/plans.json`.
- `scripts/build-wordmark.mjs`, `scripts/build-og.mjs` — логотип в SVG, OG-картинка, иконка.
- `scripts/qa/` — проверки: проход по экранам, сценарии взаимодействия, fps при замедлении CPU.

## Что нужно заполнить

Всё, чего нет в материалах, на сайте помечено **[ЗАПОЛНИТЬ]**. Данные правятся в одном файле `src/data/site.ts`:

- `contacts`: телефон, WhatsApp (только цифры), e-mail, Instagram, Telegram, часы работы.
- `facts`: класс здания, общая площадь, число мест на парковке, охрана, стоимость.
- `travel`: время в пути до точек города.
- `floorPlans`: этажи для типового плана без подписи (`fB`), планы 2 и 8–14 этажей.

## Форма заявки

На Netlify форма работает сразу (Netlify Forms). На Vercel или другом хостинге задайте переменную окружения `PUBLIC_FORM_ENDPOINT` — адрес сервиса форм, который принимает POST.
