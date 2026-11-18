/** Touch devices (phones, iPad — even with a trackpad) get "lite motion": native scroll, no pins. */
export const TOUCH_DETECT_SCRIPT = `(function(){try{var n=navigator,d=document.documentElement;var ipad=n.platform==='MacIntel'&&n.maxTouchPoints>1;var mobile=/iPhone|iPad|iPod|Android/i.test(n.userAgent);var coarse=window.matchMedia('(pointer: coarse)').matches;if(ipad||mobile||coarse)d.classList.add('touch');}catch(e){}})();`;

export function isTouchLite() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("touch");
}
