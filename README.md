# FEYA — сайт магазина

Одностраничный сайт-каталог для FEYA (Алматы). Чистый HTML/CSS/JS, без сборки.

- `index.html` — разметка всех секций
- `assets/css/style.css` — стили (цвета в `:root`)
- `assets/js/main.js` — список товаров `PRODUCTS`, фильтр, ссылки WhatsApp
- `assets/img/` — фото в WebP

Добавить товар: допишите объект в `PRODUCTS` в `assets/js/main.js` и положите фото `assets/img/<img>.webp`.

Запуск локально: `python3 -m http.server` и откройте http://localhost:8000.
Для публикации подойдёт любой статический хостинг (GitHub Pages, Netlify, Vercel).
