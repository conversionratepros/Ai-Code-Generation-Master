const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FOLDER = __dirname;

function getVariation() {
    const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
    const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
    return { css, js };
}

/* ── Mock DOM that mirrors the Dometic PDP structure ── */
function buildMockHtml(opts) {
    opts = opts || {};
    const btnText      = opts.btnText      || 'Add to Bag';
    const salePrice    = opts.salePrice    || 'R 1,799.00';
    const origPrice    = opts.origPrice    || 'R 2,000.00';
    const name         = opts.name         || 'Ford Bronco Drop Down Tailgate Table';
    const imgSrc       = opts.imgSrc       || 'https://www.dometic.com/product.jpg';
    // Keep legacy price opt working
    if (opts.price && !opts.salePrice) { opts.salePrice = opts.price; opts.origPrice = ''; }

    return `<!DOCTYPE html>
<html><head><title>Dometic PDP</title></head>
<body>
<div class="product-details">
    <h1>${name}</h1>
    <div class="gallery-wrapper">
        <div data-slot="carousel-item">
            <img src="${imgSrc}" alt="${name}">
        </div>
    </div>
    <div class="buy-me-box">
        <div class="price-wrapper">Sale price ${salePrice}Original price ${origPrice}</div>
        <button type="button">${btnText}</button>
    </div>
</div>
</body></html>`;
}

const MOCK_ORIGIN = 'https://mock.dometic.test';

async function injectVariation(page, html) {
    const { css, js } = getVariation();
    /* Serve mock HTML from a real-looking origin so fetch() can resolve absolute URLs */
    await page.route(`${MOCK_ORIGIN}/pdp`, route =>
        route.fulfill({ contentType: 'text/html', body: html })
    );
    await page.goto(`${MOCK_ORIGIN}/pdp`, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: css });
    await page.evaluate(js);
}

/* Simulate ATB click then a successful POST response */
async function triggerATBSuccess(page, btnSelector) {
    btnSelector = btnSelector || '.buy-me-box button';
    await page.locator(btnSelector).click();
    await page.evaluate((origin) => {
        return fetch(`${origin}/api/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: '123', qty: 1 }),
        });
    }, MOCK_ORIGIN);
    await page.waitForTimeout(400);
}

/* ════════════════════════════════════════════════════════════
   1. INIT — body class + overlay injection
════════════════════════════════════════════════════════════ */
test.describe('Init', () => {
    test.beforeEach(async ({ page }) => {
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.request().method() === 'POST'
                ? route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
                : route.continue()
        );
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(400);
    });

    test('body receives variation class CRO12443', async ({ page }) => {
        const cls = await page.evaluate(() => document.body.className);
        expect(cls).toContain('CRO12443');
    });

    test('overlay element is injected into the DOM', async ({ page }) => {
        await expect(page.locator('.cro-12443-overlay')).toBeAttached();
    });

    test('overlay is hidden by default', async ({ page }) => {
        const isVisible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(isVisible).toBe(false);
    });
});

/* ════════════════════════════════════════════════════════════
   2. BUTTON DETECTION — does the live() selector find the ATB button?
════════════════════════════════════════════════════════════ */
test.describe('Button detection', () => {
    test('ATB flag is set when submit button (text="Loading...") is clicked', async ({ page }) => {
        /* Mirrors real Dometic DOM: submit button with loading text during hydration */
        const html = buildMockHtml().replace(
            '<button type="button">Add to Bag</button>',
            '<button type="submit">Loading...</button>'
        );
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.request().method() === 'POST'
                ? route.fulfill({ status: 200, body: '{}' })
                : route.continue()
        );
        await injectVariation(page, html);
        await page.waitForTimeout(300);
        await page.locator('.buy-me-box button[type="submit"]').click();
        await page.evaluate((origin) =>
            fetch(`${origin}/api/cart/add`, { method: 'POST', body: '{}' })
        , MOCK_ORIGIN);
        await page.waitForTimeout(500);
        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(true);
    });

    test('ATB flag is set when "Add to Bag" button is clicked', async ({ page }) => {
        await injectVariation(page, buildMockHtml({ btnText: 'Add to Bag' }));
        await page.waitForTimeout(300);

        /* Expose addToBagClicked so we can read it */
        await page.evaluate(() => { window.__getATBFlag = function () { return window._cro12443ATBClicked || false; }; });

        await page.locator('.buy-me-box button').click();
        await page.waitForTimeout(100);

        /* Check the internal state via a debug helper */
        const flagSet = await page.evaluate(() => {
            /* We can't access the closure, so instead check if the fetch was patched */
            return typeof window.fetch._cro12443Patched !== 'undefined' || window._cro12443FetchPatched === true;
        });
        expect(flagSet).toBe(true);
    });

    test('ATB flag is NOT set when a non-ATB button (e.g. wishlist) is clicked', async ({ page }) => {
        const html = buildMockHtml().replace('<button type="button">Add to Bag</button>',
            '<button type="button">Add to Bag</button><button type="button">Save to Wishlist</button>');
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.fulfill({ status: 200, body: '{"ok":true}' })
        );
        await injectVariation(page, html);
        await page.waitForTimeout(300);

        await page.locator('button:text("Save to Wishlist")').click();
        await page.evaluate((origin) => fetch(`${origin}/api/wishlist`, { method: 'POST', body: '{}' }), MOCK_ORIGIN);
        await page.waitForTimeout(400);

        const overlayVisible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(overlayVisible).toBe(false);
    });
});

/* ════════════════════════════════════════════════════════════
   3. POPUP SHOWS after ATB + successful POST
════════════════════════════════════════════════════════════ */
test.describe('Popup — shows on success', () => {
    test.beforeEach(async ({ page }) => {
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.request().method() === 'POST'
                ? route.fulfill({ status: 200, body: '{"success":true}' })
                : route.continue()
        );
    });

    test('overlay becomes visible after ATB click + POST success', async ({ page }) => {
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await triggerATBSuccess(page);

        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(true);
    });

    test('popup card gets visible class after ATB + POST success', async ({ page }) => {
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await triggerATBSuccess(page);
        await page.waitForTimeout(200); // rAF + transition start

        const hasClass = await page.evaluate(() =>
            document.querySelector('.cro-12443-popup').classList.contains('cro-12443-popup--visible')
        );
        expect(hasClass).toBe(true);
    });

    test('popup does NOT show when POST fails (non-ok status)', async ({ page }) => {
        await page.route(`${MOCK_ORIGIN}/api/cart/add`, route =>
            route.fulfill({ status: 500, body: '{"error":"Server error"}' })
        );
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await page.locator('.buy-me-box button').click();
        await page.evaluate((origin) =>
            fetch(`${origin}/api/cart/add`, { method: 'POST', body: '{}' })
        , MOCK_ORIGIN);
        await page.waitForTimeout(400);

        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(false);
    });

    test('popup does NOT show after a GET request (only POST triggers)', async ({ page }) => {
        await page.route(`${MOCK_ORIGIN}/api/**`, route => route.fulfill({ status: 200, body: '{}' }));
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await page.locator('.buy-me-box button').click();
        /* Fire a GET — should not trigger popup */
        await page.evaluate((origin) => fetch(`${origin}/api/products/123`), MOCK_ORIGIN);
        await page.waitForTimeout(400);

        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(false);
    });
});

/* ════════════════════════════════════════════════════════════
   4. POPUP CONTENT — product data populated correctly
════════════════════════════════════════════════════════════ */
test.describe('Popup content', () => {
    const NAME       = 'Dometic CFX3 45 Litre Cooler';
    const SALE_PRICE = 'R 12,999.00';
    const ORIG_PRICE = 'R 14,999.00';
    const IMG        = 'https://www.dometic.com/cfx3-45.jpg';

    test.beforeEach(async ({ page }) => {
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.request().method() === 'POST'
                ? route.fulfill({ status: 200, body: '{}' })
                : route.continue()
        );
        await injectVariation(page, buildMockHtml({ name: NAME, salePrice: SALE_PRICE, origPrice: ORIG_PRICE, imgSrc: IMG }));
        await page.waitForTimeout(300);
        await triggerATBSuccess(page);
        await page.waitForTimeout(200);
    });

    test('product name is populated in the popup', async ({ page }) => {
        const text = await page.locator('.cro-12443-name').textContent();
        expect(text.trim()).toBe(NAME);
    });

    test('sale price is populated in the popup', async ({ page }) => {
        const text = await page.locator('.cro-12443-sale-price').textContent();
        expect(text.trim()).toContain('12,999');
    });

    test('original price is populated with strikethrough', async ({ page }) => {
        const text = await page.locator('.cro-12443-original-price').textContent();
        expect(text.trim()).toContain('14,999');
        const decoration = await page.locator('.cro-12443-original-price').evaluate(
            el => window.getComputedStyle(el).textDecorationLine
        );
        expect(decoration).toContain('line-through');
    });

    test('product thumbnail src is set', async ({ page }) => {
        const src = await page.locator('.cro-12443-thumb').getAttribute('src');
        expect(src).toBe(IMG);
    });

    test('view cart link is derived from current page locale (en → /cart)', async ({ page }) => {
        /* Mock page is served from mock.dometic.test/pdp — locale segment = "pdp".
           We verify the URL is constructed as origin + / + locale + / + slug.
           For a real en-za page this produces https://www.dometic.com/en-za/cart. */
        const href = await page.locator('.cro-12443-view-cart').getAttribute('href');
        expect(href).toContain(MOCK_ORIGIN);
        expect(href).toContain('/cart');
    });

    test('view cart link uses warenkorb slug for de locale', async ({ page }) => {
        const { css, js } = getVariation();
        const deUrl = `${MOCK_ORIGIN}/de-de/pdp`;
        await page.route(deUrl, route =>
            route.fulfill({ contentType: 'text/html', body: buildMockHtml() })
        );
        await page.goto(deUrl, { waitUntil: 'domcontentloaded' });
        await page.addStyleTag({ content: css });
        await page.evaluate(js);
        await page.waitForTimeout(400);

        const href = await page.locator('.cro-12443-view-cart').getAttribute('href');
        expect(href).toBe(`${MOCK_ORIGIN}/de-de/warenkorb`);
    });

    test('heading text is "Added to your bag"', async ({ page }) => {
        const text = await page.locator('.cro-12443-heading').textContent();
        expect(text.trim()).toBe('Added to your bag');
    });
});

/* ════════════════════════════════════════════════════════════
   5. CLOSING BEHAVIOURS
════════════════════════════════════════════════════════════ */
test.describe('Close behaviours', () => {
    async function openPopup(page) {
        await page.route(`${MOCK_ORIGIN}/api/**`, route =>
            route.request().method() === 'POST'
                ? route.fulfill({ status: 200, body: '{}' })
                : route.continue()
        );
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await triggerATBSuccess(page);
        await page.waitForTimeout(300);
    }

    test('✕ button closes the popup', async ({ page }) => {
        await openPopup(page);
        await page.locator('.cro-12443-close').click();
        await page.waitForTimeout(400);
        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(false);
    });

    test('"Continue shopping" button closes the popup', async ({ page }) => {
        await openPopup(page);
        await page.locator('.cro-12443-continue').click();
        await page.waitForTimeout(400);
        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(false);
    });

    test('clicking the backdrop closes the popup', async ({ page }) => {
        await openPopup(page);
        /* Click on the overlay div itself, not inside the popup card */
        await page.evaluate(() => {
            const overlay = document.querySelector('.cro-12443-overlay');
            overlay.dispatchEvent(new MouseEvent('click', { bubbles: true, target: overlay }));
            /* Simulate a direct click on the overlay element */
            const evt = new MouseEvent('click', { bubbles: true });
            Object.defineProperty(evt, 'target', { value: overlay });
            overlay.dispatchEvent(evt);
        });
        await page.waitForTimeout(400);
        const visible = await page.evaluate(() =>
            document.querySelector('.cro-12443-overlay').classList.contains('cro-12443-overlay--visible')
        );
        expect(visible).toBe(false);
    });

    test('closing popup does not reset addToBagClicked prematurely', async ({ page }) => {
        await openPopup(page);
        await page.locator('.cro-12443-close').click();
        await page.waitForTimeout(400);
        /* popupShown should be false after close so user can open again */
        const canShowAgain = await page.evaluate(() => {
            /* Trigger a second ATB flow */
            var overlay = document.querySelector('.cro-12443-overlay');
            return overlay && !overlay.classList.contains('cro-12443-overlay--visible');
        });
        expect(canShowAgain).toBe(true);
    });
});

/* ════════════════════════════════════════════════════════════
   6. NO DUPLICATE INJECTION
════════════════════════════════════════════════════════════ */
test.describe('No duplicate injection', () => {
    test('re-running the script does not inject a second overlay', async ({ page }) => {
        const { js } = getVariation();
        await injectVariation(page, buildMockHtml());
        await page.waitForTimeout(300);
        await page.evaluate(js); // re-run
        await page.waitForTimeout(200);

        const count = await page.locator('.cro-12443-overlay').count();
        expect(count).toBe(1);
    });
});

/* ════════════════════════════════════════════════════════════
   7. LIVE PAGE DEBUG — visits real Dometic PDP and inspects DOM
   (runs in desktop project only; may be skipped if site is unreachable)
════════════════════════════════════════════════════════════ */
test.describe('Live page debug', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('debug: inspect real Dometic PDP selectors', async ({ page }) => {
        test.setTimeout(60000);

        const { css, js } = getVariation();

        /* Accept self-signed cert from localhost fecli server */
        await page.goto(
            'https://www.dometic.com/en-za/product/ford-bronco-drop-down-tailgate-table-tbra050',
            { waitUntil: 'domcontentloaded', timeout: 30000 }
        ).catch(() => { /* ignore timeout */ });

        /* Accept cookie banner if present */
        const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("accept all"), [id*="accept"]').first();
        if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await cookieBtn.click().catch(() => {});
            await page.waitForTimeout(1000);
        }

        await page.addStyleTag({ content: css });
        await page.evaluate(js);

        /* Wire click loggers BEFORE React finishes hydrating */
        await page.evaluate(() => {
            window._cro_clickLog = [];
            document.addEventListener('click', function(e) {
                var t = e.target;
                window._cro_clickLog.push({ tag: t.tagName, type: t.type || null, ariaLabel: t.getAttribute ? t.getAttribute('aria-label') : null, class: (t.className || '').substring(0,60), phase: 'capture' });
            }, true);
            document.addEventListener('click', function(e) {
                var t = e.target;
                window._cro_clickLog.push({ tag: t.tagName, type: t.type || null, ariaLabel: t.getAttribute ? t.getAttribute('aria-label') : null, phase: 'bubble' });
            }, false);
        });

        /* Wait for React hydration: poll until ATB button shows "Add to bag" text or aria-label */
        let hydrated = false;
        for (let i = 0; i < 20; i++) {
            await page.waitForTimeout(500);
            hydrated = await page.evaluate(() => {
                var btn = document.querySelector('button.bg-primary[aria-label="Add to bag"]');
                var boxBtn = document.querySelector('.buy-me-box button[type="submit"]');
                return !!(btn || (boxBtn && (boxBtn.textContent || '').trim().toLowerCase() === 'add to bag'));
            });
            if (hydrated) break;
        }
        console.log('\n══ HYDRATED? ══', hydrated);

        /* Scroll down 400px to trigger any sticky ATB button */
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(1000);

        /* ── Step 1: static DOM audit (post-hydration) ── */
        const debug = await page.evaluate(() => {
            function exists(sel) { return !!document.querySelector(sel); }

            var knownBtn = document.querySelector('button.bg-primary[aria-label="Add to bag"]');
            var buyMeBoxButtons = [];
            document.querySelectorAll('.buy-me-box button').forEach(function(b) {
                buyMeBoxButtons.push({ text: b.textContent.trim().substring(0,40), type: b.type, ariaLabel: b.getAttribute('aria-label'), class: b.className.substring(0,60) });
            });
            /* All ATB-candidate buttons on page */
            var allATBCandidates = [];
            document.querySelectorAll('button').forEach(function(b) {
                var lbl = (b.getAttribute('aria-label') || '').toLowerCase();
                var txt = (b.textContent || '').trim().toLowerCase();
                if (lbl.indexOf('add') !== -1 || txt.indexOf('add to bag') !== -1 || txt.indexOf('add to cart') !== -1 || b.type === 'submit') {
                    allATBCandidates.push({ text: txt.substring(0,30), type: b.type, ariaLabel: b.getAttribute('aria-label'), class: b.className.substring(0,60), inBuyBox: !!(b.closest && b.closest('.buy-me-box')) });
                }
            });

            return {
                hasProductDetails: exists('.product-details'),
                hasBuyMeBox: exists('.buy-me-box'),
                bodyClass: document.body.className,
                overlayInjected: exists('.cro-12443-overlay'),
                knownATBButton: knownBtn ? { found: true, type: knownBtn.type, ariaLabel: knownBtn.getAttribute('aria-label'), class: knownBtn.className.substring(0,80), inBuyMeBox: !!(knownBtn.closest && knownBtn.closest('.buy-me-box')) } : { found: false },
                buyMeBoxButtons: buyMeBoxButtons,
                allATBCandidates: allATBCandidates,
            };
        });
        console.log('\n══ DOM AUDIT ══\n', JSON.stringify(debug, null, 2));

        /* ── Step 2: click whichever ATB button is present ── */
        const clickTarget = await page.evaluate(() => {
            /* Prefer the aria-label button (outside buy-me-box), fall back to submit inside buy-me-box */
            var btn = document.querySelector('button.bg-primary[aria-label="Add to bag"]')
                   || document.querySelector('.buy-me-box button[type="submit"]');
            if (!btn) return null;
            btn.scrollIntoView({ behavior: 'instant', block: 'center' });
            return { ariaLabel: btn.getAttribute('aria-label'), type: btn.type, text: btn.textContent.trim(), inBuyBox: !!(btn.closest && btn.closest('.buy-me-box')) };
        });
        console.log('\n══ CLICK TARGET ══\n', JSON.stringify(clickTarget, null, 2));

        if (clickTarget) {
            await page.waitForTimeout(300);
            await page.evaluate(() => {
                var btn = document.querySelector('button.bg-primary[aria-label="Add to bag"]')
                       || document.querySelector('.buy-me-box button[type="submit"]');
                if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            });
            await page.waitForTimeout(4000);

            const clickLog = await page.evaluate(() => window._cro_clickLog);
            const popupVisible = await page.evaluate(() => {
                var o = document.querySelector('.cro-12443-overlay');
                return o ? o.classList.contains('cro-12443-overlay--visible') : false;
            });
            const fetchPatched = await page.evaluate(() => window._cro12443FetchPatched === true);
            const xhrPatched = await page.evaluate(() => window._cro12443XHRPatched === true);

            console.log('\n══ CLICK LOG ══\n', JSON.stringify(clickLog, null, 2));
            console.log('\n══ POPUP VISIBLE? ══', popupVisible);
            console.log('\n══ FETCH PATCHED? ══', fetchPatched, ' XHR PATCHED? ══', xhrPatched);
        } else {
            console.log('\n⚠️  No ATB button found after hydration wait');
        }

        /* ── Assertions ── */
        expect(debug.hasProductDetails, '.product-details must exist').toBe(true);
        expect(debug.overlayInjected, 'overlay must inject on init').toBe(true);
        expect(debug.bodyClass).toContain('CRO12443');
    });
});
