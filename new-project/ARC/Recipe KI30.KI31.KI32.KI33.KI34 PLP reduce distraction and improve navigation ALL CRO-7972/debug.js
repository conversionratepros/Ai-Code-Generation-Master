const { chromium } = require('playwright');
const https = require('https');

function fetchInjectJs() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://localhost:8080/inject.js', { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
  });
}

(async () => {
  const injectJs = await fetchInjectJs();

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('JS ERROR:', err.message));

  await page.goto('https://www.arcstore.co.za/makeup', { waitUntil: 'networkidle', timeout: 30000 });

  // Inject script after Angular has bootstrapped
  await page.evaluate((script) => {
    const el = document.createElement('script');
    el.textContent = script;
    document.head.appendChild(el);
  }, injectJs);

  // Wait for body class to confirm init() ran
  await page.waitForFunction(() => document.body.classList.contains('cro-7972'), { timeout: 15000 })
    .catch(() => console.log('⚠ body.cro-7972 class never applied'));

  // Give waitForElement callbacks time to fire
  await page.waitForTimeout(3000);

  const results = await page.evaluate(() => {
    return {
      bodyClass: document.body.classList.contains('cro-7972'),
      breadcrumb: !!document.querySelector('.cro-7972-breadcrumb'),
      breadcrumbItems: document.querySelectorAll('.cro-7972-breadcrumb .breadcrumb__item').length,
      h1Text: (document.querySelector('#content h1') || {}).textContent || null,
      sp1Exists: !!document.querySelector('.content-row__item__body.sp1'),
      hiddenSubtext: !!document.querySelector('.cro-7972-hidden'),
      movedSubtext: !!document.querySelector('.cro-7972-subtext'),
      productListContainer: !!document.querySelector('.cro-7972-product-list-container'),
    };
  });

  console.log('\n── Debug Results ──────────────────────');
  Object.entries(results).forEach(([k, v]) => console.log(k + ':', v));
  console.log('────────────────────────────────────\n');

  await page.screenshot({ path: 'debug-screenshot.png', fullPage: false });
  console.log('Screenshot saved → debug-screenshot.png');

  await browser.close();
})();
