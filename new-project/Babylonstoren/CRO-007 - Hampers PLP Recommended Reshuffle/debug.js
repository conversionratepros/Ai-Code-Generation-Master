const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'testFiles');
const CSS = fs.readFileSync(path.join(BASE, 'variation.css'), 'utf8');
const JS  = fs.readFileSync(path.join(BASE, 'variation.js'),  'utf8');
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to hampers PLP…');
  await page.goto('https://shop.babylonstoren.com/za/pl/61/categories/gifting/hampers', {
    waitUntil: 'domcontentloaded',
    timeout: 45000
  });
  // Wait for Angular product grid to render before screenshotting control
  await page.waitForSelector('.cdk-virtual-scroll-viewport.product-list-viewport', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);

  // Take control screenshot before injecting
  await page.screenshot({ path: path.join(OUT, 'screenshot-control.png'), fullPage: false });
  console.log('Control screenshot saved.');

  // Inject CSS
  await page.addStyleTag({ content: CSS });

  // Inject JS (with debug=1 so console logs are emitted)
  const debugJS = JS.replace('var debug = 0;', 'var debug = 1;');
  await page.addScriptTag({ content: debugJS });

  // Forward browser console to terminal
  page.on('console', msg => console.log('[browser]', msg.text()));

  // Wait for the CRO grid to appear (up to 20s)
  console.log('Waiting for CRO grid…');
  try {
    await page.waitForSelector('.cro-007-grid', { timeout: 20000 });
    console.log('CRO grid found.');
  } catch (e) {
    console.error('CRO grid never appeared:', e.message);
    await page.screenshot({ path: path.join(OUT, 'screenshot-error.png'), fullPage: false });
    await browser.close();
    process.exit(1);
  }

  // Simulate: user's region loads AFTER the grid renders (async detection / returning user)
  // This is the real-world race condition we fixed with the region subscription
  await page.evaluate(() => {
    try {
      var t = getAllAngularTestabilities()[0];
      var store = null;
      t._destroyRef.records.forEach(function (rec) {
        if (!rec || store) return;
        var v = rec.value;
        if (!v || typeof v !== 'object') return;
        var p = Object.getPrototypeOf(v);
        if (p && Object.getOwnPropertyNames(p).includes('dispatch') && Object.getOwnPropertyNames(p).includes('snapshot')) store = v;
      });
      if (!store || !store._stateStream) return;
      var state = store._stateStream.getValue();
      store._stateStream.next(Object.assign({}, state, {
        regionState: Object.assign({}, state.regionState || {}, {
          region: { id: 3, code: 'za-jhb', name: 'Johannesburg' }
        })
      }));
      console.log('[test] JHB region set AFTER grid rendered — subscription should re-render cards');
    } catch(e) { console.log('[test] region patch error:', e.message); }
  });

  // Wait for re-render triggered by subscription
  await page.waitForTimeout(2000);

  // Dismiss cookie banner if present
  try {
    await page.click('button:has-text("Allow all cookies")', { timeout: 3000 });
    await page.waitForTimeout(500);
  } catch (e) {}

  // Scroll to the product grid
  await page.evaluate(() => {
    var grid = document.querySelector('.cro-007-grid');
    if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);

  // Take variation screenshot
  await page.screenshot({ path: path.join(OUT, 'screenshot-variation.png'), fullPage: false });
  console.log('Variation screenshot saved.');

  // Audit each card in the grid
  const cards = await page.$$eval('.cro-007-card', nodes => nodes.map(card => {
    const name     = (card.querySelector('header') || {}).textContent || '?';
    const hasAdd   = !!card.querySelector('.cro-007-add');
    const hasNotify= !!card.querySelector('.cro-007-notify');
    const hasOOS   = !!card.querySelector('.cro-007-oos-badge');
    const hasQty   = !!card.querySelector('.cro-007-qty-val');
    return { name: name.trim(), hasAdd, hasNotify, hasOOS, hasQty };
  }));

  console.log('\n=== Card audit ===');
  let addCount = 0, notifyCount = 0, mismatch = [];
  cards.forEach((c, i) => {
    const state = c.hasNotify ? 'NOTIFY ME' : c.hasAdd ? 'ADD TO BAG' : c.hasQty ? 'QTY STEPPER' : 'UNKNOWN';
    console.log(`[${String(i+1).padStart(2)}] ${state.padEnd(12)} | OOS badge: ${c.hasOOS ? 'YES' : 'no '} | ${c.name}`);
    if (c.hasNotify) notifyCount++;
    if (c.hasAdd)    addCount++;
    // Flag mismatches: notify without OOS badge, or OOS badge without notify
    if (c.hasNotify && !c.hasOOS) mismatch.push(`Card ${i+1} "${c.name}": Notify Me button but NO OOS badge`);
    if (c.hasOOS && !c.hasNotify) mismatch.push(`Card ${i+1} "${c.name}": OOS badge but NO Notify Me button`);
  });

  console.log(`\nTotal cards: ${cards.length} | Add to Bag: ${addCount} | Notify Me: ${notifyCount}`);

  if (mismatch.length) {
    console.warn('\n⚠ Mismatches:');
    mismatch.forEach(m => console.warn(' -', m));
  } else {
    console.log('\n✓ All OOS cards have both Notify Me button + OOS badge. No mismatches.');
  }

  // Screenshot Pause & Pamper specifically
  const pauseCard = await page.evaluateHandle(() => {
    var headers = document.querySelectorAll('.cro-007-card header');
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].textContent.trim() === 'Pause & Pamper') return headers[i].closest('.cro-007-card');
    }
    return null;
  });
  if (pauseCard) {
    await pauseCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await pauseCard.screenshot({ path: path.join(OUT, 'screenshot-pause-pamper.png') });
    console.log('Pause & Pamper screenshot saved.');
  }

  // Also screenshot a 3-card row showing mixed states
  await page.evaluate(() => {
    var grid = document.querySelector('.cro-007-grid');
    if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, 'screenshot-grid-top.png'), fullPage: false });
  console.log('Grid top screenshot saved.');

  await browser.close();
})();
