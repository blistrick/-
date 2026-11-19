// QA walk: scrolls the page viewport by viewport, captures screenshots and console errors.
// usage: node scripts/qa/walk.cjs <url> <outDir> <width>x<height> [stepsCsv] [--reduced] [--mobile]
const { chromium, devices } = require('playwright');
(async () => {
  const [url, out, vp, stepsArg, ...flags] = process.argv.slice(2);
  const [w, h] = vp.split('x').map(Number);
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: flags.includes('--reduced') ? 'reduce' : 'no-preference',
    isMobile: flags.includes('--mobile'),
    hasTouch: flags.includes('--mobile'),
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url() + ' ' + r.failure()?.errorText));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const gl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2'));
  const steps = stepsArg && stepsArg !== 'all' ? stepsArg.split(',').map(Number) : Array.from({ length: Math.ceil(total / h) }, (_, i) => i * h);
  let i = 0;
  for (const y of steps) {
    await page.evaluate((y) => { const l = window.__lenis; if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y); }, y);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${out}/s${String(i++).padStart(2, '0')}_${y}.png` });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(JSON.stringify({ total, gl, overflow, is3d: await page.evaluate(() => !!document.querySelector('.model.is-3d')), errors }, null, 1));
  await browser.close();
})();
