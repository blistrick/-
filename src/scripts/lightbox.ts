export function initLightbox() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (!dlg) return;
  const img = dlg.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const count = dlg.querySelector<HTMLElement>('[data-lightbox-count]')!;
  const shots = [...document.querySelectorAll<HTMLButtonElement>('[data-shot]')];
  let i = 0;
  let opener: HTMLElement | null = null;

  const show = (n: number) => {
    i = (n + shots.length) % shots.length;
    const s = shots[i];
    img.src = s.dataset.full!;
    img.alt = s.dataset.alt || '';
    count.textContent = `${i + 1} / ${shots.length}`;
  };
  const lenis = () => (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;

  shots.forEach((s, n) =>
    s.addEventListener('click', () => {
      opener = s;
      show(n);
      dlg.showModal();
      lenis()?.stop();
    }),
  );
  dlg.addEventListener('close', () => {
    lenis()?.start();
    opener?.focus();
  });
  dlg.querySelector('[data-lightbox-prev]')!.addEventListener('click', () => show(i - 1));
  dlg.querySelector('[data-lightbox-next]')!.addEventListener('click', () => show(i + 1));
  dlg.querySelector('[data-lightbox-close]')!.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
}
