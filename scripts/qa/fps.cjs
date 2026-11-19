// Scroll the whole page under 4x CPU throttling and report frame statistics per page region.
const { chromium } = require('playwright');
(async () => {
  const [url, vp, mobile] = process.argv.slice(2);
  const [w, h] = vp.split('x').map(Number);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: !!mobile, hasTouch: !!mobile, deviceScaleFactor: mobile ? 2 : 1 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const res = await page.evaluate(async () => {
    const sections = [...document.querySelectorAll('main > section, footer')].map((s) => ({ id: s.id || s.className.split(' ')[0], top: s.offsetTop, frames: [] }));
    const total = document.documentElement.scrollHeight - innerHeight;
    let y = 0, last = performance.now();
    await new Promise((done) => {
      const step = (t) => {
        const dt = t - last; last = t;
        const sec = [...sections].reverse().find((s) => y + innerHeight / 2 >= s.top);
        if (sec) sec.frames.push(dt);
        y += 12; // ~720 px/s at 60fps: a steady reading scroll
        window.scrollTo(0, y);
        if (y < total) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });
    return sections.map((s) => {
      const f = s.frames.slice(1).sort((a, b) => a - b);
      const avg = f.reduce((a, b) => a + b, 0) / (f.length || 1);
      return { id: s.id, frames: f.length, fps: +(1000 / avg).toFixed(1), p95ms: +(f[Math.floor(f.length * 0.95)] || 0).toFixed(1), over33: f.filter((x) => x > 33).length };
    });
  });
  console.table(res);
  await browser.close();
})();
