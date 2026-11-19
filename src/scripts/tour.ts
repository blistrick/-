// Loads the orbit video only when the visitor approaches the block, picking the size for the screen.
export function loadTourVideo(onReady?: (v: HTMLVideoElement) => void) {
  const section = document.querySelector<HTMLElement>('[data-tour]');
  const video = document.querySelector<HTMLVideoElement>('[data-tour-video]');
  if (!section || !video) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const small = window.matchMedia('(max-width: 900px)').matches;
      video.src = (small ? video.dataset.srcMobile : video.dataset.srcDesktop) || '';
      video.preload = 'auto';
      video.addEventListener(
        'loadeddata',
        () => {
          // iOS Safari only allows seeking after the media has been "played" once
          const p = video.play();
          if (p) p.then(() => video.pause()).catch(() => {});
          onReady?.(video);
        },
        { once: true },
      );
      video.load();
    },
    { rootMargin: '150% 0px' },
  );
  io.observe(section);
}
