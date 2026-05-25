const { test, expect, devices } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

const PAGE_URL = 'https://www.onedayonly.co.za/shops/extra-time-deals';
const FOLDER   = __dirname;

// Priority categories in expected order (lowercase for comparison)
const PRIORITY_CATS = [
    'apparel',
    'home',
    'health',
    'electronics',
    'furniture',
];

async function loadPage(page) {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for Next.js to render and __NEXT_DATA__ to include shop items
    await page.waitForFunction(
        () => window.__NEXT_DATA__?.props?.pageProps?.shopPage?.items?.length > 0,
        { timeout: 20000 }
    );
}

async function injectVariation(page) {
    const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
    const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
    await page.addStyleTag({ content: css });
    await page.evaluate(js);
    // Wait for our container to appear
    await page.waitForSelector('.ki69-carousel-container', { timeout: 20000 });
}

async function dismissOverlays(page) {
    // Remove any third-party notification overlays that intercept pointer events
    await page.evaluate(() => {
        var overlay = document.querySelector('#smt-overlay, #st_notification_modal, [smtmsgid]');
        if (overlay) overlay.remove();
    });
}

// =========================
// DESKTOP TESTS
// =========================
test.describe('KI69 Desktop', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await loadPage(page);
        await injectVariation(page);
    });

    test('renders at least one category section', async ({ page }) => {
        const count = await page.locator('.ki69-category-section').count();
        expect(count).toBeGreaterThan(0);
    });

    test('control products are hidden', async ({ page }) => {
        const allHidden = await page.evaluate(() => {
            const main = document.querySelector('.ki69-product-container');
            if (!main) return false;
            return Array.from(main.children)
                .filter(c => !c.classList.contains('ki69-carousel-container'))
                .every(c => c.style.display === 'none');
        });
        expect(allHidden).toBe(true);
    });

    test('priority categories appear before others', async ({ page }) => {
        const titles = await page.locator('.ki69-section-title').allTextContents();
        const lower  = titles.map(t => t.toLowerCase());

        // Verify at least the first priority category that exists comes before non-priority ones
        const firstNonPriorityIdx = lower.findIndex(t =>
            !PRIORITY_CATS.some(p => t.includes(p))
        );
        const lastPriorityIdx = lower.reduce((acc, t, i) => {
            return PRIORITY_CATS.some(p => t.includes(p)) ? i : acc;
        }, -1);

        if (firstNonPriorityIdx !== -1 && lastPriorityIdx !== -1) {
            expect(lastPriorityIdx).toBeLessThan(firstNonPriorityIdx);
        }
        // At minimum some sections must render
        expect(titles.length).toBeGreaterThan(0);
    });

    test('each section has a View All link', async ({ page }) => {
        const sections  = await page.locator('.ki69-category-section').count();
        const viewAlls  = await page.locator('.ki69-view-all').count();
        expect(viewAlls).toBe(sections);
    });

    test('View All links have valid hrefs', async ({ page }) => {
        const links = await page.locator('.ki69-view-all').all();
        for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain('onedayonly.co.za');
        }
    });

    test('Plus icon links to product page, not add-to-cart', async ({ page }) => {
        const plus = page.locator('.ki69-card-plus').first();
        const href = await plus.getAttribute('href');
        expect(href).toContain('/products/');
        expect(href).not.toContain('add-to-cart');
    });

    test('categories with >4 products have carousel arrows', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) {
            // All categories have ≤4 products — acceptable
            console.log('No carousel sections (all categories ≤4 products)');
            return;
        }
        const section = page.locator('.ki69-has-carousel').first();
        await expect(section.locator('.ki69-arrow-prev')).toBeAttached();
        await expect(section.locator('.ki69-arrow-next')).toBeAttached();
    });

    test('left arrow is hidden on initial load (at page 0)', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) return;

        const prevBtn = page.locator('.ki69-has-carousel').first().locator('.ki69-arrow-prev');
        await expect(prevBtn).toHaveClass(/ki69-arrow-hidden/);
    });

    test('right arrow visible on initial load (when >4 products)', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) return;

        const nextBtn = page.locator('.ki69-has-carousel').first().locator('.ki69-arrow-next');
        await expect(nextBtn).not.toHaveClass(/ki69-arrow-hidden/);
    });

    test('clicking next reveals left arrow; clicking prev hides it again', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) return;

        await dismissOverlays(page);

        const section = page.locator('.ki69-has-carousel').first();
        const prevBtn = section.locator('.ki69-arrow-prev');
        const nextBtn = section.locator('.ki69-arrow-next');

        // Initially prev is hidden
        await expect(prevBtn).toHaveClass(/ki69-arrow-hidden/);

        // Navigate forward
        await nextBtn.click();
        await page.waitForTimeout(400);
        await expect(prevBtn).not.toHaveClass(/ki69-arrow-hidden/);

        // Navigate back
        await prevBtn.click();
        await page.waitForTimeout(400);
        await expect(prevBtn).toHaveClass(/ki69-arrow-hidden/);
    });

    test('right arrow hidden at last page', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) return;

        await dismissOverlays(page);

        const section = page.locator('.ki69-has-carousel').first();
        const nextBtn = section.locator('.ki69-arrow-next');

        // Click next until hidden (max safety limit)
        for (let i = 0; i < 15; i++) {
            const isHidden = await nextBtn.evaluate(el => el.classList.contains('ki69-arrow-hidden'));
            if (isHidden) break;
            await nextBtn.click();
            await page.waitForTimeout(400);
        }

        await expect(nextBtn).toHaveClass(/ki69-arrow-hidden/);
    });

    test('static sections (≤4 products) have no arrow buttons', async ({ page }) => {
        const statics = await page.locator('.ki69-static').count();
        if (statics === 0) return;

        const arrowCount = await page.locator('.ki69-static .ki69-arrow').count();
        expect(arrowCount).toBe(0);
    });

    test('each card image links to the product page', async ({ page }) => {
        const firstCard = page.locator('.ki69-card-link').first();
        const href = await firstCard.getAttribute('href');
        expect(href).toContain('onedayonly.co.za/products/');
    });

    test('carousel track moves on arrow click', async ({ page }) => {
        const carousels = await page.locator('.ki69-has-carousel').count();
        if (carousels === 0) return;

        await dismissOverlays(page);

        const section = page.locator('.ki69-has-carousel').first();
        const track   = section.locator('.ki69-carousel-track');
        const nextBtn = section.locator('.ki69-arrow-next');

        const beforeTransform = await track.evaluate(el => el.style.transform);
        await nextBtn.click();
        await page.waitForTimeout(400);
        const afterTransform = await track.evaluate(el => el.style.transform);

        expect(afterTransform).not.toBe(beforeTransform);
        expect(afterTransform).toContain('translateX(-');
    });
});

// =========================
// MOBILE TESTS
// =========================
test.describe('KI69 Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test.beforeEach(async ({ page }) => {
        await loadPage(page);
        await injectVariation(page);
    });

    test('renders category sections on mobile', async ({ page }) => {
        const count = await page.locator('.ki69-category-section').count();
        expect(count).toBeGreaterThan(0);
    });

    test('no arrow buttons visible on mobile', async ({ page }) => {
        const arrows = page.locator('.ki69-arrow');
        const count  = await arrows.count();
        for (let i = 0; i < count; i++) {
            await expect(arrows.nth(i)).not.toBeVisible();
        }
    });

    test('carousel viewport uses horizontal scroll on mobile', async ({ page }) => {
        const overflowX = await page.locator('.ki69-carousel-viewport').first().evaluate(el =>
            window.getComputedStyle(el).overflowX
        );
        expect(['scroll', 'auto']).toContain(overflowX);
    });

    test('mobile cards show peek effect — narrower than half the viewport', async ({ page }) => {
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        const cardWidth = await page.locator('.ki69-card').first().evaluate(el =>
            el.getBoundingClientRect().width
        );
        // Each card must be < 50% viewport (proves more than 2 are partially visible)
        expect(cardWidth).toBeLessThan(viewportWidth * 0.5);
        // And not unreasonably small (at least 25% of viewport)
        expect(cardWidth).toBeGreaterThan(viewportWidth * 0.25);
    });

    test('View All links present on mobile', async ({ page }) => {
        const count = await page.locator('.ki69-view-all').count();
        expect(count).toBeGreaterThan(0);
    });
});
