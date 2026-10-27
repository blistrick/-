(() => {
  const WHATSAPP = '77000000000';
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Шапка: фон при прокрутке, плавающая кнопка WhatsApp
  const header = document.querySelector('.header');
  const waFloat = document.querySelector('.wa-float');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    waFloat.classList.toggle('is-visible', y > 400);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Мобильное меню
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // Мягкое появление блоков
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    // Лёгкая задержка для соседних элементов в одной сетке
    reveals.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
      const i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty('--d', `${Math.min(i, 6) * 0.08}s`);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Лёгкий параллакс фото
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (parallax.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallax.forEach((box) => {
        const rect = box.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const speed = parseFloat(box.dataset.parallax);
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        box.firstElementChild.style.transform = `translate3d(0, ${offset - rect.height * 0.05}px, 0)`;
      });
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  // Счётчики на первом экране
  const counters = document.querySelectorAll('[data-count]');
  const fmt = (n) => n.toLocaleString('ru-RU').replace(/ /g, ' ');
  if (!reduceMotion) {
    counters.forEach((el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const dur = 1800;
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(target * eased)) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      setTimeout(() => requestAnimationFrame(step), 500);
    });
  }

  // До / после
  document.querySelectorAll('.ba').forEach((ba) => {
    const range = ba.querySelector('.ba__range');
    range.addEventListener('input', () => ba.style.setProperty('--pos', `${range.value}%`));
  });

  const works = [...document.querySelectorAll('.work')];
  const dotsBox = document.querySelector('.works__dots');
  let current = 0;
  const dots = works.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Работа ${i + 1}`);
    b.addEventListener('click', () => show(i));
    dotsBox.appendChild(b);
    return b;
  });
  const show = (i) => {
    current = (i + works.length) % works.length;
    works.forEach((w, j) => w.classList.toggle('is-active', j === current));
    dots.forEach((d, j) => d.classList.toggle('is-active', j === current));
  };
  document.querySelectorAll('.works__nav .round-btn').forEach((btn) => {
    btn.addEventListener('click', () => show(current + +btn.dataset.dir));
  });
  show(0);

  // FAQ: открыт только один пункт
  const accs = document.querySelectorAll('.acc');
  accs.forEach((acc) => acc.addEventListener('toggle', () => {
    if (acc.open) accs.forEach((o) => { if (o !== acc) o.open = false; });
  }));

  // Маска телефона
  const phone = document.querySelector('input[name="phone"]');
  phone.addEventListener('input', () => {
    let d = phone.value.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
    let out = '+7';
    if (p[0]) out += ` (${p[0]}`;
    if (p[0].length === 3) out += ')';
    if (p[1]) out += ` ${p[1]}`;
    if (p[2]) out += `-${p[2]}`;
    if (p[3]) out += `-${p[3]}`;
    phone.value = out;
  });

  // Форма записи: валидация и отправка заявки в WhatsApp
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const digits = form.phone.value.replace(/\D/g, '');
    form.name.closest('.field').classList.toggle('is-error', !name);
    form.phone.closest('.field').classList.toggle('is-error', digits.length < 11);
    if (!name || digits.length < 11) return;

    const text = `Здравствуйте! Хочу записаться в Doctor+.\nИмя: ${name}\nТелефон: ${form.phone.value}\nУслуга: ${form.service.value}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    form.querySelector('.form__success').hidden = false;
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  root.classList.remove('no-js');
})();
