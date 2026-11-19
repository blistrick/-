// The orbit video loads when the visitor approaches the block, plays on its own while visible,
// and pauses off-screen so it never costs anything elsewhere on the page.
export function initTourVideo(autoplay: boolean) {
  const section = document.querySelector<HTMLElement>('[data-tour]');
  const video = document.querySelector<HTMLVideoElement>('[data-tour-video]');
  if (!section || !video) return;
  if (!autoplay) video.controls = true;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const small = window.matchMedia('(max-width: 900px)').matches;
    video.src = (small ? video.dataset.srcMobile : video.dataset.srcDesktop) || '';
    video.preload = autoplay ? 'auto' : 'metadata';
    video.load();
  };

  new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && load(), { rootMargin: '150% 0px' }).observe(section);
  if (autoplay) {
    new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        if (on) {
          load();
          video.play().catch(() => {});
        } else video.pause();
      },
      { threshold: 0.15 },
    ).observe(section);
  }
}
