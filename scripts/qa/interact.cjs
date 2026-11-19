// Exercises every interactive path and reports console errors.
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const log = [];
  for (const [w, h, mobile] of [[1280, 800, false], [360, 740, true]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const tag = `${w}`;
    // floor picker
    await page.locator('#offices').scrollIntoViewIfNeeded();
    await page.$eval('[data-floor="1"]', (b) => b.click());
    await page.waitForTimeout(300);
    const unit = page.locator('[data-plan-view="f1"] .unit:not(.unit--sold)').first();
    await unit.scrollIntoViewIfNeeded();
    await unit.click({ force: true });
    const area = await page.textContent('[data-card-area]');
    log.push(`${tag} floor1 unit -> ${area}`);
    await page.locator('[data-unit-card]').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/${tag}-picker.png` });
    await page.$eval('[data-card-cta]', (b) => b.click());
    await page.waitForTimeout(1800);
    log.push(`${tag} form unit: ${await page.inputValue('[data-form-unit]')} area: ${await page.inputValue('#f-area')}`);
    // floor without plan
    await page.locator('#offices').scrollIntoViewIfNeeded();
    await page.$eval('[data-floor="12"]', (b) => b.click());
    log.push(`${tag} floor12 empty visible: ${await page.isVisible('[data-plan-view="none"]')}`);
    // form validation
    await page.locator('#request').scrollIntoViewIfNeeded();
    await page.fill('#f-name', '');
    await page.$eval('[data-form-submit]', (b) => b.click());
    await page.waitForTimeout(200);
    log.push(`${tag} errors: ${(await page.$$eval('.field__err', (e) => e.map((x) => x.textContent).filter(Boolean))).join(' | ')}`);
    await page.fill('#f-name', 'Айгерим');
    await page.click('#f-phone');
    await page.keyboard.type('7012345678');
    log.push(`${tag} phone mask: ${await page.inputValue('#f-phone')}`);
    await page.selectOption('#f-area', { index: 2 });
    await page.screenshot({ path: `${out}/${tag}-form.png` });
    await page.$eval('[data-form-submit]', (b) => b.click());
    await page.waitForTimeout(1500);
    log.push(`${tag} submit status: ${await page.textContent('[data-form-status]')}`);
    await page.screenshot({ path: `${out}/${tag}-form-after.png` });
    // lightbox
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.$eval('[data-shot="1"]', (b) => b.click());
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    log.push(`${tag} lightbox: ${await page.textContent('[data-lightbox-count]')} open=${await page.isVisible('[data-lightbox]')}`);
    await page.screenshot({ path: `${out}/${tag}-lightbox.png` });
    await page.keyboard.press('Escape');
    // map
    await page.locator('[data-map-open]').scrollIntoViewIfNeeded();
    await page.$eval('[data-map-open]', (b) => b.click());
    await page.waitForTimeout(500);
    log.push(`${tag} map iframe: ${await page.locator('[data-map] iframe').count()}`);
    // menu (mobile)
    if (mobile) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.click('[data-menu-toggle]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${out}/${tag}-menu.png` });
      await page.click('[data-menu] a[href="#location"]');
      await page.waitForTimeout(1500);
      log.push(`${tag} menu closed: ${await page.isHidden('[data-menu]')} y=${await page.evaluate(() => Math.round(scrollY))}`);
    }
    log.push(`${tag} console errors: ${errs.length ? errs.join(' || ') : 'none'}`);
    await ctx.close();
  }
  // widths
  for (const w of [360, 768, 1280, 1920]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const o = await page.evaluate(() => {
      const over = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.plan__scroll, .gallery__track, .floors__list'); }).slice(0, 5).map((el) => el.className || el.tagName);
      return { sw: document.documentElement.scrollWidth, over };
    });
    log.push(`width ${w}: scrollWidth ${o.sw} overflow: ${o.over.join(', ') || 'none'}`);
    await page.screenshot({ path: `${out}/w${w}-top.png` });
    await ctx.close();
  }
  console.log(log.join('\n'));
  await browser.close();
})();
