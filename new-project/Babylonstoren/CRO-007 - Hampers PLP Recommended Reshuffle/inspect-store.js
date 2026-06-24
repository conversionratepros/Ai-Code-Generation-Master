const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://shop.babylonstoren.com/za/pl/61/categories/gifting/hampers', {
    waitUntil: 'domcontentloaded', timeout: 45000
  });
  await page.waitForSelector('.cdk-virtual-scroll-viewport.product-list-viewport', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const storeState = await page.evaluate(() => {
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
      if (!store) return { error: 'Store not found' };

      var state = store._stateStream.getValue();
      // Return all top-level keys and the full regionState
      return {
        topLevelKeys: Object.keys(state),
        regionState: state.regionState,
        // Check a few alternative paths
        regionStateFull: JSON.stringify(state.regionState, null, 2)
      };
    } catch(e) { return { error: e.message }; }
  });

  console.log('Top-level NGXS state keys:', storeState.topLevelKeys);
  console.log('\nFull regionState:');
  console.log(storeState.regionStateFull || JSON.stringify(storeState.regionState, null, 2));

  await browser.close();
})();
