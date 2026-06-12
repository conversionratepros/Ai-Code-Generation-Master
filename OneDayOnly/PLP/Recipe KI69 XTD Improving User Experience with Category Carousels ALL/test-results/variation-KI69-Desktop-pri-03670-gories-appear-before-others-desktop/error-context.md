# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: variation.test.js >> KI69 Desktop >> priority categories appear before others
- Location: variation.test.js:70:5

# Error details

```
Error: page.goto: net::ERR_TIMED_OUT at https://www.onedayonly.co.za/shops/extra-time-deals
Call log:
  - navigating to "https://www.onedayonly.co.za/shops/extra-time-deals", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | const { test, expect, devices } = require('@playwright/test');
  2   | const fs   = require('fs');
  3   | const path = require('path');
  4   | 
  5   | const PAGE_URL = 'https://www.onedayonly.co.za/shops/extra-time-deals';
  6   | const FOLDER   = __dirname;
  7   | 
  8   | // Priority categories in expected order (lowercase for comparison)
  9   | const PRIORITY_CATS = [
  10  |     'apparel & accessories',
  11  |     'home & garden',
  12  |     'health & beauty',
  13  |     'electronics',
  14  |     'furniture',
  15  | ];
  16  | 
  17  | async function loadPage(page) {
> 18  |     await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
      |                ^ Error: page.goto: net::ERR_TIMED_OUT at https://www.onedayonly.co.za/shops/extra-time-deals
  19  |     // Wait for Next.js to render and __NEXT_DATA__ to include shop items
  20  |     await page.waitForFunction(
  21  |         () => window.__NEXT_DATA__?.props?.pageProps?.shopPage?.items?.length > 0,
  22  |         { timeout: 20000 }
  23  |     );
  24  | }
  25  | 
  26  | async function injectVariation(page) {
  27  |     const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
  28  |     const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
  29  |     await page.addStyleTag({ content: css });
  30  |     await page.evaluate(js);
  31  |     // Wait for our container to appear
  32  |     await page.waitForSelector('.ki69-carousel-container', { timeout: 20000 });
  33  | }
  34  | 
  35  | async function dismissOverlays(page) {
  36  |     // Remove any third-party notification overlays that intercept pointer events
  37  |     await page.evaluate(() => {
  38  |         var overlay = document.querySelector('#smt-overlay, #st_notification_modal, [smtmsgid]');
  39  |         if (overlay) overlay.remove();
  40  |     });
  41  | }
  42  | 
  43  | // =========================
  44  | // DESKTOP TESTS
  45  | // =========================
  46  | test.describe('KI69 Desktop', () => {
  47  |     test.use({ viewport: { width: 1280, height: 900 } });
  48  | 
  49  |     test.beforeEach(async ({ page }) => {
  50  |         await loadPage(page);
  51  |         await injectVariation(page);
  52  |     });
  53  | 
  54  |     test('renders at least one category section', async ({ page }) => {
  55  |         const count = await page.locator('.ki69-category-section').count();
  56  |         expect(count).toBeGreaterThan(0);
  57  |     });
  58  | 
  59  |     test('control products are hidden', async ({ page }) => {
  60  |         const allHidden = await page.evaluate(() => {
  61  |             const main = document.querySelector('.ki69-product-container');
  62  |             if (!main) return false;
  63  |             return Array.from(main.children)
  64  |                 .filter(c => !c.classList.contains('ki69-carousel-container'))
  65  |                 .every(c => c.style.display === 'none');
  66  |         });
  67  |         expect(allHidden).toBe(true);
  68  |     });
  69  | 
  70  |     test('priority categories appear before others', async ({ page }) => {
  71  |         const titles = await page.locator('.ki69-section-title').allTextContents();
  72  |         const lower  = titles.map(t => t.toLowerCase());
  73  | 
  74  |         // Verify at least the first priority category that exists comes before non-priority ones
  75  |         const firstNonPriorityIdx = lower.findIndex(t =>
  76  |             !PRIORITY_CATS.some(p => t.includes(p))
  77  |         );
  78  |         const lastPriorityIdx = lower.reduce((acc, t, i) => {
  79  |             return PRIORITY_CATS.some(p => t.includes(p)) ? i : acc;
  80  |         }, -1);
  81  | 
  82  |         if (firstNonPriorityIdx !== -1 && lastPriorityIdx !== -1) {
  83  |             expect(lastPriorityIdx).toBeLessThan(firstNonPriorityIdx);
  84  |         }
  85  |         // At minimum some sections must render
  86  |         expect(titles.length).toBeGreaterThan(0);
  87  |     });
  88  | 
  89  |     test('each section has a View All link', async ({ page }) => {
  90  |         const sections  = await page.locator('.ki69-category-section').count();
  91  |         const viewAlls  = await page.locator('.ki69-view-all').count();
  92  |         expect(viewAlls).toBe(sections);
  93  |     });
  94  | 
  95  |     test('View All links have valid hrefs', async ({ page }) => {
  96  |         const links = await page.locator('.ki69-view-all').all();
  97  |         for (const link of links) {
  98  |             const href = await link.getAttribute('href');
  99  |             expect(href).toBeTruthy();
  100 |             expect(href).toContain('onedayonly.co.za');
  101 |         }
  102 |     });
  103 | 
  104 |     test('Plus icon links to product page, not add-to-cart', async ({ page }) => {
  105 |         const plus = page.locator('.ki69-card-plus').first();
  106 |         const href = await plus.getAttribute('href');
  107 |         expect(href).toContain('/products/');
  108 |         expect(href).not.toContain('add-to-cart');
  109 |     });
  110 | 
  111 |     test('categories with >4 products have carousel arrows', async ({ page }) => {
  112 |         const carousels = await page.locator('.ki69-has-carousel').count();
  113 |         if (carousels === 0) {
  114 |             // All categories have ≤4 products — acceptable
  115 |             console.log('No carousel sections (all categories ≤4 products)');
  116 |             return;
  117 |         }
  118 |         const section = page.locator('.ki69-has-carousel').first();
```