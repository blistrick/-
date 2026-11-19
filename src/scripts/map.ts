// The map widget is heavy; it loads only when the visitor asks for it.
export function initMap() {
  const btn = document.querySelector<HTMLButtonElement>('[data-map-open]');
  const host = document.querySelector<HTMLElement>('[data-map]');
  if (!btn || !host) return;
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = btn.dataset.src!;
    iframe.title = 'Карта: бизнес-центр CAPITAL, улица Бектурова, Астана';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    host.append(iframe);
    host.querySelector('[data-map-scheme]')?.remove();
    iframe.focus();
  });
}
