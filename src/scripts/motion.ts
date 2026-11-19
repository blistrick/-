import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

export function initMotion() {
  // Smooth scroll on pointer devices; touch keeps native momentum (cheaper, feels right on phones)
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(2, -10 * t), syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  // anchor links go through Lenis so they glide instead of jumping
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement | number, { offset: 0, duration: 1.4 });
    history.replaceState(null, '', id);
  });

  initNav();
  initReveals();
  initParallax();
  initModelScroll();
  initInfra();
  initGallery();

  // fonts and lazy images change heights; recompute trigger positions once things settle
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  let last = 0;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const y = self.scroll();
      nav.classList.toggle('is-solid', y > 40);
      const menuOpen = document.documentElement.classList.contains('menu-open');
      nav.classList.toggle('is-hidden', !menuOpen && y > 600 && y > last + 4);
      if (y < last - 4) nav.classList.remove('is-hidden');
      last = y;
    },
  });
  // highlight the section in view
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('.nav__links a')];
  links.forEach((link) => {
    const sec = document.querySelector(link.getAttribute('href')!);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => link.setAttribute('aria-current', self.isActive ? 'true' : 'false'),
    });
  });
}

function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 1.3,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.from(group.querySelectorAll('[data-reveal-item]'), {
      opacity: 0,
      y: 18,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
}

function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    const host = el.parentElement!;
    gsap.fromTo(
      el,
      { yPercent: -amount * 50 },
      {
        yPercent: amount * 50,
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

// Progress of the pinned 3D block; building.ts subscribes when WebGL is ready
export const modelProgress = { value: 0, listeners: new Set<(p: number) => void>() };

function initModelScroll() {
  const track = document.querySelector<HTMLElement>('[data-model-track]');
  if (!track) return;
  const steps = [...document.querySelectorAll<HTMLElement>('[data-model-step]')];
  const bar = document.querySelector<HTMLElement>('[data-model-progress]');
  const night = document.querySelector<HTMLElement>('[data-model-night]');
  const setters = steps.map((s) => gsap.quickSetter(s, 'opacity'));
  const ySetters = steps.map((s) => gsap.quickSetter(s, 'y', 'px'));
  const barSet = bar ? gsap.quickSetter(bar, 'scaleY') : null;
  const nightSet = night ? gsap.quickSetter(night, 'opacity') : null;

  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      const p = self.progress;
      modelProgress.value = p;
      modelProgress.listeners.forEach((fn) => fn(p));
      barSet?.(p);
      nightSet?.(gsap.utils.clamp(0, 1, (p - 0.45) / 0.4));
      // three captions, each owning a third of the scroll with soft crossfades
      steps.forEach((_, i) => {
        const centre = (i + 0.5) / steps.length;
        const d = Math.abs(p - centre) * steps.length; // 0 at centre, 0.5 at edges
        const o = i === 0 && p < centre ? 1 : i === steps.length - 1 && p > centre ? 1 : gsap.utils.clamp(0, 1, 1.6 - d * 2.2);
        setters[i](o);
        ySetters[i]((p - centre) * -40);
      });
    },
  });
}

function initInfra() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-infra-item]')];
  const imgs = [...document.querySelectorAll<HTMLElement>('[data-infra-img]')];
  if (!items.length) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const activate = (i: number) => {
      items.forEach((it, j) => it.classList.toggle('is-active', i === j));
      imgs.forEach((im, j) => (im.style.opacity = i === j ? '1' : '0'));
    };
    activate(0);
    let current = 0;
    // active = the last item whose top has passed 60% of the viewport (the final one stays lit)
    ScrollTrigger.create({
      trigger: items[0].parentElement!,
      start: 'top 60%',
      end: 'bottom top',
      onUpdate() {
        const line = window.innerHeight * 0.6;
        let idx = 0;
        items.forEach((it, i) => {
          if (it.getBoundingClientRect().top <= line) idx = i;
        });
        if (idx !== current) {
          current = idx;
          activate(idx);
        }
      },
    });
    // subtle drift on the active frame
    imgs.forEach((im) => {
      gsap.fromTo(
        im,
        { scale: 1.08 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-infra]', start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });
    return () => items.forEach((it) => it.classList.remove('is-active'));
  });
}

function initGallery() {
  const section = document.querySelector<HTMLElement>('[data-gallery]');
  const track = document.querySelector<HTMLElement>('[data-gallery-track]');
  const pin = document.querySelector<HTMLElement>('[data-gallery-pin]');
  if (!section || !track || !pin) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    section.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setH = () => pin.style.setProperty('--pin-h', `${window.innerHeight + distance()}px`);
    setH();
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onRefreshInit: setH,
      },
    });
    ScrollTrigger.refresh();
    return () => {
      tween.kill();
      section.classList.remove('is-pinned');
      gsap.set(track, { clearProps: 'transform' });
    };
  });
}
