(function () {
  var WA = 'https://wa.me/77070259040';

  // Товары: чтобы добавить новинку — просто допишите объект в этот список.
  // cat: tops | skirts | jackets | bags | shoes | acc
  var PRODUCTS = [
    { name: 'Свитер оверсайз с номером 8', price: 18900, cat: 'tops', img: 'p-sweater8', badge: 'хит' },
    { name: 'Вязаный капор с узором', price: 7900, cat: 'acc', img: 'p-kapor', badge: 'новое' },
    { name: 'Дублёнка укороченная', price: 39900, cat: 'jackets', img: 'p-dublenka' },
    { name: 'Юбка плиссе миди', price: 12900, cat: 'skirts', img: 'p-skirt' },
    { name: 'Сумка-хобо мягкая', price: 14900, cat: 'bags', img: 'p-bag', badge: 'новое' },
    { name: 'Кроссовки в стиле ретро', price: 22900, cat: 'shoes', img: 'p-sneakers' },
    { name: 'Кардиган укороченный', price: 15900, cat: 'tops', img: 'p-cardigan' },
    { name: 'Пуховик укороченный', price: 34900, cat: 'jackets', img: 'p-puffer' }
  ];

  function waLink(text) {
    return WA + '?text=' + encodeURIComponent(text);
  }
  function fmt(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
  }
  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  // ---- Render products
  var grid = document.getElementById('products');
  var empty = document.getElementById('empty');

  function render(filter) {
    var list = PRODUCTS.filter(function (p) { return filter === 'all' || p.cat === filter; });
    grid.innerHTML = list.map(function (p, i) {
      return '<article class="product" style="animation-delay:' + (i * 60) + 'ms">' +
        '<div class="product__img">' +
          (p.badge ? '<span class="product__badge">' + esc(p.badge) + '</span>' : '') +
          '<img src="assets/img/' + p.img + '.webp" alt="' + esc(p.name) + '" loading="lazy" width="640" height="960">' +
        '</div>' +
        '<div>' +
          '<h3 class="product__name">' + esc(p.name) + '</h3>' +
          '<p class="product__price">' + fmt(p.price) + '</p>' +
        '</div>' +
        '<a class="btn btn--line" target="_blank" rel="noopener" href="' +
          waLink('Здравствуйте! Хочу заказать: ' + p.name) + '">Заказать</a>' +
      '</article>';
    }).join('');
    empty.hidden = list.length > 0;
  }

  var chips = document.querySelectorAll('.tab');
  function setFilter(f) {
    chips.forEach(function (c) {
      var on = c.dataset.filter === f;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    render(f);
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () { setFilter(c.dataset.filter); });
  });
  document.querySelectorAll('a[data-cat]').forEach(function (c) {
    c.addEventListener('click', function () { setFilter(c.dataset.cat); });
  });
  render('all');

  // ---- Header shadow + floating button
  var header = document.querySelector('.header');
  var fab = document.querySelector('.fab');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    fab.classList.toggle('is-visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function toggleNav(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  burger.addEventListener('click', function () { toggleNav(!nav.classList.contains('is-open')); });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggleNav(false); });
  });

  // ---- Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
