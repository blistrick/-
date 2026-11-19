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

// 3D loads only when the visitor approaches the block, and only on capable devices
const modelEl = document.querySelector<HTMLElement>('[data-model]');
if (modelEl && !reduced && canRun3D()) {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        const load = () => import('./building').then((m) => m.initBuilding(modelEl)).catch(() => {});
        // parse + shader compile off the critical moment of scrolling
        if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1500 });
        else setTimeout(load, 300);
      }
    },
    { rootMargin: '120% 0px' },
  );
  io.observe(modelEl);
}

function canRun3D() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

function initStaticNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  update();
  window.addEventListener('scroll', update, { passive: true });
}
