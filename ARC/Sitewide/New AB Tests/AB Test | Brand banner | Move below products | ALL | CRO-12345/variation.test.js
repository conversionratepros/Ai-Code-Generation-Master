const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FOLDER = __dirname;
const BASE_URL = 'http://www.arcstore.co.za';

function getVariation() {
    const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
    const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
    return { css, js };
}

// ─── Mock HTML builders ───────────────────────────────────────────────────────

function brandPageHtml({ hasFeatured = true } = {}) {
    return `<!DOCTYPE html>
<html><head><title>HUDA BEAUTY</title></head>
<body>
  <div id="content">

    <!-- Container 0: Brand banner (image, no text, no carousel) -->
    <div class="content-container dw-mod" id="cro-banner">
      <div class="content-row content-row--full dw-mod">
        <div class="content-row__item rowItemContent-19558 dw-mod">
          <div class="content-row__item__body dw-mod">
            <img src="banner.jpg" alt="Huda Beauty banner">
          </div>
        </div>
      </div>
    </div>

    <!-- Container 1: Empty separator -->
    <div class="content-container dw-mod" id="cro-sep1"></div>

    <!-- Container 2: Brand description (paragraph text, no image) -->
    <div class="content-container dw-mod" id="cro-desc">
      <div class="content-row content-row--full dw-mod">
        <div class="content-row__item rowItemContent-19561 dw-mod">
          <div class="content-row__item__body dw-mod">
            <p>As THE OG beauty influencer and content creator, Huda shares her love and passion for beauty.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Container 3: Empty separator -->
    <div class="content-container dw-mod" id="cro-sep2"></div>

    ${hasFeatured ? `<!-- Container 4: Featured products carousel -->
    <div class="content-container dw-mod" id="cro-featured">
      <div class="content-row content-row--full dw-mod">
        <div class="content-row__item rowItemContent-19677 dw-mod">
          <div class="u-full-width ProductListCarousel dw-mod">
            <h2>ARC Loves</h2>
            <div class="grid product-list dw-mod">
              <div class="product-list__grid-item dw-mod"><span>Product A</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>` : '<!-- No featured carousel on this brand -->'}

    <!-- Container 5: Product list with multiForm -->
    <div class="content-container dw-mod" id="cro-products">
      <div class="content-row content-row--full dw-mod">
        <div class="content-row__item rowItemContent-19565 dw-mod">
          <div class="content-row__item__body dw-mod">
            <form id="multiForm">
              <div class="grid product-list dw-mod">
                <div class="product-list__grid-item dw-mod"><span>Product 1</span></div>
                <div class="product-list__grid-item dw-mod"><span>Product 2</span></div>
              </div>
            </form>
            <button class="btn btn--clean">Return to top</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</body></html>`;
}

function excludedBrandPageHtml() {
    return brandPageHtml();
}

// ─── Inject helper ────────────────────────────────────────────────────────────

async function injectVariation(page, html, pathname) {
    const { css, js } = getVariation();
    const url = BASE_URL + (pathname || '/brands/huda-beauty');

    await page.route(url, async (route) => {
        await route.fulfill({ contentType: 'text/html', body: html });
    });

    await page.goto(url);
    await page.addStyleTag({ content: css });
    await page.evaluate(js);
}

// ─── Helper: get ordered IDs of top-level content-containers ──────────────────

async function getContainerOrder(page) {
    return page.evaluate(() =>
        Array.from(document.querySelectorAll('#content > .content-container'))
            .map(c => c.id)
    );
}

// ─── Suite 1: Regular brand page — elements reordered ─────────────────────────

test.describe('Regular brand page — element order', () => {
    test.beforeEach(async ({ page }) => {
        await injectVariation(page, brandPageHtml(), '/brands/huda-beauty');
        await page.waitForSelector('.cro-12345-done', { timeout: 10000 });
    });

    test('product list appears before brand banner', async ({ page }) => {
        const order = await getContainerOrder(page);
        expect(order.indexOf('cro-products')).toBeLessThan(order.indexOf('cro-banner'));
    });

    test('brand banner appears before brand description', async ({ page }) => {
        const order = await getContainerOrder(page);
        expect(order.indexOf('cro-banner')).toBeLessThan(order.indexOf('cro-desc'));
    });

    test('brand description appears before featured products', async ({ page }) => {
        const order = await getContainerOrder(page);
        expect(order.indexOf('cro-desc')).toBeLessThan(order.indexOf('cro-featured'));
    });

    test('body gets variation class', async ({ page }) => {
        const cls = await page.locator('body').getAttribute('class');
        expect(cls).toContain('CRP_ARC_SW_Brand_Banner_Below');
    });

    test('variation body class is applied', async ({ page }) => {
        const has = await page.evaluate(() =>
            document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')
        );
        expect(has).toBe(true);
    });
});

// ─── Suite 2: Empty separator containers are hidden ────────────────────────────

test.describe('Empty separators hidden after reorder', () => {
    test.beforeEach(async ({ page }) => {
        await injectVariation(page, brandPageHtml(), '/brands/huda-beauty');
        await page.waitForSelector('.cro-12345-done', { timeout: 10000 });
    });

    test('separator containers get cro-12345-spacer class', async ({ page }) => {
        const count = await page.evaluate(() =>
            document.querySelectorAll('.cro-12345-spacer').length
        );
        expect(count).toBeGreaterThan(0);
    });

    test('spacer containers are hidden by CSS', async ({ page }) => {
        const allHidden = await page.evaluate(() => {
            var spacers = document.querySelectorAll('.cro-12345-spacer');
            return Array.from(spacers).every(s =>
                window.getComputedStyle(s).display === 'none'
            );
        });
        expect(allHidden).toBe(true);
    });

    test('banner, description, featured are NOT marked as spacers', async ({ page }) => {
        const spacerIds = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.cro-12345-spacer')).map(s => s.id)
        );
        expect(spacerIds).not.toContain('cro-banner');
        expect(spacerIds).not.toContain('cro-desc');
        expect(spacerIds).not.toContain('cro-featured');
    });
});

// ─── Suite 3: Exclusion list — no changes applied ─────────────────────────────

const EXCLUDED = [
    '/brands/dior',
    '/brands/chanel',
    '/brands/sol-de-janeiro',
    '/brands/drunk-elephant',
    '/brands/nars',
    '/brands/maison-margiela',
    '/brands/kylie-cosmetics',
    '/brands/kylie-cosmetics-by-kylie-jenner',
    '/brands/dolce-gabbana',
    '/brands/bvlgari',
];

for (const excludedPath of EXCLUDED) {
    test(`excluded brand (${excludedPath}) — original order preserved`, async ({ page }) => {
        await injectVariation(page, excludedBrandPageHtml(), excludedPath);
        await page.waitForTimeout(1000);

        const order = await getContainerOrder(page);

        // Banner must still be before the product list (untouched)
        expect(order.indexOf('cro-banner')).toBeLessThan(order.indexOf('cro-products'));

        // Body class must NOT be added
        const has = await page.evaluate(() =>
            document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')
        );
        expect(has).toBe(false);

        // Done guard must NOT be set
        const done = await page.evaluate(() =>
            document.body.classList.contains('cro-12345-done')
        );
        expect(done).toBe(false);
    });
}

// ─── Suite 4: Non-brand pages — no changes ────────────────────────────────────

test.describe('Non-brand pages — no changes', () => {
    test('home page is untouched', async ({ page }) => {
        const { js, css } = getVariation();
        await page.route('http://www.arcstore.co.za/', async (route) => {
            await route.fulfill({
                contentType: 'text/html',
                body: `<!DOCTYPE html><html><body><div id="content"><form id="multiForm"></form></div></body></html>`,
            });
        });
        await page.goto('http://www.arcstore.co.za/');
        await page.addStyleTag({ content: css });
        await page.evaluate(js);
        await page.waitForTimeout(500);

        const has = await page.evaluate(() =>
            document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')
        );
        expect(has).toBe(false);
    });

    test('PLP page is untouched', async ({ page }) => {
        const { js, css } = getVariation();
        await page.route('http://www.arcstore.co.za/makeup', async (route) => {
            await route.fulfill({
                contentType: 'text/html',
                body: `<!DOCTYPE html><html><body><div id="content"><form id="multiForm"></form></div></body></html>`,
            });
        });
        await page.goto('http://www.arcstore.co.za/makeup');
        await page.addStyleTag({ content: css });
        await page.evaluate(js);
        await page.waitForTimeout(500);

        const has = await page.evaluate(() =>
            document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')
        );
        expect(has).toBe(false);
    });
});

// ─── Suite 5: Brand page without featured carousel ────────────────────────────

test.describe('Brand page without featured carousel (e.g. Urban Decay)', () => {
    test.beforeEach(async ({ page }) => {
        await injectVariation(page, brandPageHtml({ hasFeatured: false }), '/brands/urban-decay');
        await page.waitForSelector('.cro-12345-done', { timeout: 10000 });
    });

    test('product list is before banner', async ({ page }) => {
        const order = await getContainerOrder(page);
        expect(order.indexOf('cro-products')).toBeLessThan(order.indexOf('cro-banner'));
    });

    test('banner is before description', async ({ page }) => {
        const order = await getContainerOrder(page);
        expect(order.indexOf('cro-banner')).toBeLessThan(order.indexOf('cro-desc'));
    });

    test('no featured element exists', async ({ page }) => {
        const el = await page.$('#cro-featured');
        expect(el).toBeNull();
    });

    test('body variation class is added', async ({ page }) => {
        const has = await page.evaluate(() =>
            document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')
        );
        expect(has).toBe(true);
    });
});

// ─── Suite 6: Double-injection guard ─────────────────────────────────────────

test.describe('Double-injection guard', () => {
    test('running the variation JS twice does not duplicate elements', async ({ page }) => {
        await injectVariation(page, brandPageHtml(), '/brands/huda-beauty');
        await page.waitForSelector('.cro-12345-done', { timeout: 10000 });

        // Run JS a second time
        const { js } = getVariation();
        await page.evaluate(js);
        await page.waitForTimeout(300);

        // Each key container must appear exactly once
        for (const id of ['cro-banner', 'cro-desc', 'cro-featured', 'cro-products']) {
            const count = await page.evaluate((elId) =>
                document.querySelectorAll('#' + elId).length, id
            );
            expect(count).toBe(1);
        }
    });
});

// ─── Suite 7: Product list content is preserved ───────────────────────────────

test.describe('Existing content is preserved after reorder', () => {
    test.beforeEach(async ({ page }) => {
        await injectVariation(page, brandPageHtml(), '/brands/huda-beauty');
        await page.waitForSelector('.cro-12345-done', { timeout: 10000 });
    });

    test('product list still contains products', async ({ page }) => {
        const count = await page.evaluate(() =>
            document.querySelectorAll('#cro-products .product-list__grid-item').length
        );
        expect(count).toBe(2);
    });

    test('brand banner image is preserved', async ({ page }) => {
        const src = await page.locator('#cro-banner img').getAttribute('src');
        expect(src).toBe('banner.jpg');
    });

    test('brand description text is preserved', async ({ page }) => {
        const text = await page.locator('#cro-desc p').textContent();
        expect(text).toContain('OG beauty influencer');
    });

    test('featured carousel heading is preserved', async ({ page }) => {
        const heading = await page.locator('#cro-featured h2').textContent();
        expect(heading.trim()).toBe('ARC Loves');
    });
});
