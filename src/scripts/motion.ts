import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

export function initMotion() {
  // Smooth scroll on pointer devices; touch keeps native momentum (cheaper, feels right on phones)
  // lerp-based smoothing follows the wheel closely: smooth, but never feels like it lags behind the hand
  lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, syncTouch: false });
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
  initFins();
  initTour();
  initInfra();
  initGallery();

  // fonts and lazy images change heights; recompute trigger positions once things settle
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  // the header stays pinned at the top; it only gains its solid background once the page moves
  let solid = false;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const s = self.scroll() > 40;
      if (s !== solid) nav.classList.toggle('is-solid', (solid = s));
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

function initFins() {
  gsap.utils.toArray<HTMLElement>('[data-fins]').forEach((group) => {
    gsap.from(group.children, {
      scaleY: 0,
      duration: 1.6,
      ease: 'expo.out',
      stagger: 0.05,
      scrollTrigger: { trigger: group.parentElement!, start: 'top 80%', once: true },
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

// Pinned orbit: scroll position maps to a frame of the building video. The playhead eases toward
// the scroll target every tick, so fast wheel spins still play as a smooth camera move.
function initTour() {
  const track = document.querySelector<HTMLElement>('[data-tour-track]');
  const media = document.querySelector<HTMLElement>('[data-tour-media]');
  if (!track || !media) return;
  const steps = [...document.querySelectorAll<HTMLElement>('[data-tour-step]')];
  const bar = document.querySelector<HTMLElement>('[data-tour-progress]');
  const setters = steps.map((s) => gsap.quickSetter(s, 'opacity'));
  const ySetters = steps.map((s) => gsap.quickSetter(s, 'y', 'px'));
  const barSet = bar ? gsap.quickSetter(bar, 'scaleY') : null;

  let video: HTMLVideoElement | null = null;
  let target = 0;
  let current = 0;
  let progress = 0;
  const seek = () => {
    if (!video || !video.duration) return;
    const diff = target - current;
    if (Math.abs(diff) < 0.001) return;
    current += diff * 0.2;
    if (!video.seeking) video.currentTime = current;
  };
  import('./tour').then(({ loadTourVideo }) =>
    loadTourVideo((v) => {
      video = v;
      target = current = progress * (v.duration - 0.05);
      v.currentTime = current;
      gsap.ticker.add(seek);
    }),
  );

  // entrance: the frame settles from a slight zoom as the block arrives
  gsap.fromTo(
    media,
    { scale: 1.12, opacity: 0.35 },
    { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: track, start: 'top bottom', end: 'top top', scrub: true } },
  );

  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate(self) {
      const p = (progress = self.progress);
      if (video?.duration) target = p * (video.duration - 0.05);
      barSet?.(p);
      steps.forEach((_, i) => {
        const centre = (i + 0.5) / steps.length;
        const d = Math.abs(p - centre) * steps.length;
        // each caption fades fully out before the next one fades in, so two never overlap
        const o = i === 0 && p < centre ? 1 : i === steps.length - 1 && p > centre ? 1 : gsap.utils.clamp(0, 1, (0.5 - d) * 4);
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
