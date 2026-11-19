import { initPicker } from './picker';
import { initForm } from './form';
import { initLightbox } from './lightbox';
import { initMap } from './map';
import { initMenu } from './menu';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Interaction that never depends on motion
initMenu();
initPicker();
initForm();
initLightbox();
initMap();

if (!reduced) {
  // Motion libraries load after first paint so they never block the hero image
  const start = () => import('./motion').then((m) => m.initMotion());
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1200 });
  else setTimeout(start, 200);
} else {
  initStaticNav();
}

// Reduced motion / no scroll animation: the orbit video simply plays with its own controls
if (reduced) {
  import('./tour').then(({ loadTourVideo }) =>
    loadTourVideo((v) => {
      v.controls = true;
      v.loop = true;
    }),
  );
}

function initStaticNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  update();
  window.addEventListener('scroll', update, { passive: true });
}
