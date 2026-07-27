/**
 * ARC CLP Tile-Click QA Investigation
 *
 * Reproduces the Saturday incident where product tiles were non-responsive
 * for a staff member in incognito mode on the ARC CLP pages.
 *
 * 5-Step Plan (mirrors the manual QA checklist):
 *   Step 1 — Script on, NO Global JS       (baseline)
 *   Step 2 — Script on + Global JS
 *   Step 3 — Script on + Global JS + Deploy
 *   Step 4 — + 1st active test  (CRO-7521: Remove headers on PLPs)
 *   Step 5 — + 2nd active test  (CRO-12371: Sticky search bar)
 *
 * Each step visits the three target CLPs, runs diagnostic checks, and
 * captures screenshots + video (configured in playwright.config.js).
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* ─── Target URLs ─────────────────────────────────────────────────────────── */

const CLP_URLS = [
    'https://www.arcstore.co.za/makeup',
    'https://www.arcstore.co.za/fragrance',
    'https://www.arcstore.co.za/skincare',
];

/* ─── Script paths ────────────────────────────────────────────────────────── */

const ARC_ROOT  = path.resolve(__dirname, '..');           // …/ARC
const REPO_ROOT = path.resolve(__dirname, '../..');        // …/Ai-Code-Generation-Master

const SCRIPTS = {
    globalJs:    path.join(REPO_ROOT, 'new-project/ARC/Recipe KI30.KI31.KI32.KI33.KI34 PLP reduce distraction and improve navigation ALL CRO-7972/global.js'),
    cro7521Js:   path.join(ARC_ROOT, 'PLP/New AB Tests/Recipe KI5  Remove headers on PLPs  ALL  CRO-7521/variation.js'),
    cro7521Css:  path.join(ARC_ROOT, 'PLP/New AB Tests/Recipe KI5  Remove headers on PLPs  ALL  CRO-7521/variation.css'),
    cro12371Js:  path.join(REPO_ROOT, 'new-project/ARC/CRO-12371 - Sticky search bar (listing pages)/testFiles/variation.js'),
    cro12371Css: path.join(REPO_ROOT, 'new-project/ARC/CRO-12371 - Sticky search bar (listing pages)/testFiles/variation.css'),
    cro12345Js:  path.join(ARC_ROOT, 'Sitewide/New AB Tests/AB Test | Brand banner | Move below products | ALL | CRO-12345/variation.js'),
    cro12345Css: path.join(ARC_ROOT, 'Sitewide/New AB Tests/AB Test | Brand banner | Move below products | ALL | CRO-12345/variation.css'),
};

function readScript(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.warn(`[QA] Could not read: ${filePath}`);
        return '';
    }
}

/* ─── Selectors (confirmed against live arcstore.co.za DOM) ──────────────── */

// Product tile image links (main clickable element per tile)
const TILE_LINK_SELECTORS = [
    '.product-list__tiles-item__image',   // individual product tiles
    '.product-list__grid-item > a',       // category image blocks (Default.aspx?Id=...)
    '.product-list__grid-item a.u-block', // fallback for image-hover wrappers
];

// Container that wraps all product/category tiles
const PRODUCT_GRID_SELECTOR = '#multiForm, .product-list';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/**
 * Navigate to a CLP and wait for the product grid to appear.
 * The webdriver flag is removed via context-level initScript (set in each test
 * via `page.context().addInitScript` before the first goto).
 */
async function gotoAndWaitForCLP(page, url) {
    // Remove automation fingerprint so the ARC WAF allows the request
    await page.context().addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    // Wait for product grid
    await Promise.race([
        page.waitForSelector('#multiForm', { timeout: 25000 }),
        page.waitForSelector('.product-list', { timeout: 25000 }),
        page.waitForTimeout(25000),
    ]).catch(() => {});
    // Let lazy content and any Convert.com scripts settle
    await page.waitForTimeout(3000);
}

/**
 * Runs the core diagnostic on a CLP page:
 *  - Finds the first visible tile
 *  - Uses elementFromPoint to check what element is actually at that position
 *  - Returns a diagnostic object
 */
async function diagnoseTiles(page) {
    return page.evaluate(() => {
        // Confirmed selectors from live arcstore.co.za DOM (2026-06-30)
        const selectors = [
            '.product-list__tiles-item__image',   // product tile image links
            '.product-list__grid-item > a',        // category image blocks
            '.product-list__grid-item a.u-block',  // image-hover wrappers
            '.product-list__grid-item a',          // any link in grid item
            '#multiForm a',                        // broad fallback
        ];

        let tiles = [];
        let usedSelector = 'none';
        for (const sel of selectors) {
            const found = Array.from(document.querySelectorAll(sel));
            if (found.length) { tiles = found; usedSelector = sel; break; }
        }

        if (!tiles.length) {
            return {
                tilesFound: 0,
                tileSelector: 'none',
                results: [],
                overlayWarnings: [],
                potentialOverlays: [],
                zeroHeightOverlays: [],
            };
        }

        const results = [];
        const overlayWarnings = [];

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        tiles.slice(0, 8).forEach((tile, i) => {
            const rect = tile.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
                results.push({ index: i, href: tile.href, issue: 'zero-size (not visible)' });
                return;
            }

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // elementFromPoint only works within the viewport — skip off-screen tiles
            if (cx < 0 || cx > vw || cy < 0 || cy > vh) {
                results.push({ index: i, href: tile.href, issue: 'below fold — skipped', rect: { top: Math.round(rect.top), left: Math.round(rect.left) } });
                return;
            }

            const topEl = document.elementFromPoint(cx, cy);

            const tileContainsTop = tile.contains(topEl) || topEl === tile;
            const topTag = topEl ? topEl.tagName : 'null';
            const topClass = topEl ? (topEl.className || '') : '';
            const topZIndex = topEl ? window.getComputedStyle(topEl).zIndex : '';

            if (!tileContainsTop) {
                overlayWarnings.push({
                    tile: tile.href || tile.textContent.trim().substring(0, 40),
                    blocker: { tag: topTag, class: topClass.substring(0, 80), zIndex: topZIndex },
                });
            }

            results.push({
                index: i,
                href: tile.href,
                rect: { top: Math.round(rect.top), left: Math.round(rect.left), w: Math.round(rect.width), h: Math.round(rect.height) },
                topElement: { tag: topTag, class: topClass.substring(0, 80), zIndex: topZIndex },
                clickable: tileContainsTop,
            });
        });

        // Count how many in-viewport tiles were actually checked
        const checkedCount = results.filter(r => !r.issue || !r.issue.includes('skipped')).length;

        // Scan for any fixed/absolute elements with high z-index that might overlay tiles
        const allEls = Array.from(document.querySelectorAll('*'));
        const potentialOverlays = allEls
            .filter(el => {
                const s = window.getComputedStyle(el);
                const z = parseInt(s.zIndex, 10);
                const pos = s.position;
                return !isNaN(z) && z > 100 && (pos === 'fixed' || pos === 'absolute' || pos === 'sticky');
            })
            .map(el => ({
                tag: el.tagName,
                id: el.id,
                class: el.className.substring ? el.className.substring(0, 80) : '',
                zIndex: window.getComputedStyle(el).zIndex,
                position: window.getComputedStyle(el).position,
                display: window.getComputedStyle(el).display,
            }));

        // Also check for elements with height:0 that might still intercept events
        const zeroHeightOverlays = allEls
            .filter(el => {
                const s = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return (
                    rect.height === 0 &&
                    s.overflow !== 'hidden' &&
                    s.pointerEvents !== 'none' &&
                    el.children.length > 0
                );
            })
            .slice(0, 10)
            .map(el => ({
                tag: el.tagName,
                id: el.id,
                class: el.className.substring ? el.className.substring(0, 80) : '',
                overflow: window.getComputedStyle(el).overflow,
                childCount: el.children.length,
            }));

        return {
            tilesFound: tiles.length,
            tilesChecked: checkedCount,
            tileSelector: usedSelector,
            results,
            overlayWarnings,
            potentialOverlays,
            zeroHeightOverlays,
        };
    });
}

/**
 * Inject CSS + JS scripts into the page.
 */
async function injectScripts(page, scripts = {}) {
    if (scripts.css) {
        await page.addStyleTag({ content: scripts.css });
    }
    if (scripts.js) {
        await page.evaluate(scripts.js);
        // Give the script time to run (waitForElement polling etc.)
        await page.waitForTimeout(3000);
    }
}

/**
 * Captures a full-page screenshot named after the step + URL slug + device.
 */
async function capture(page, stepName, urlSlug) {
    const dir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${stepName}__${urlSlug}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`[QA] Screenshot saved: ${file}`);
}

/**
 * Logs and asserts diagnostic results.
 */
function assertDiag(diag, stepLabel, url) {
    const slug = url.replace('https://www.arcstore.co.za/', '').replace(/\//g, '-') || 'home';
    console.log(`\n[QA] ${stepLabel} — ${slug}`);
    console.log(`  Tiles found: ${diag.tilesFound}, in-viewport checked: ${diag.tilesChecked} (selector: ${diag.tileSelector})`);

    if (diag.overlayWarnings && diag.overlayWarnings.length) {
        console.error(`  ⚠️  OVERLAY WARNINGS (${diag.overlayWarnings.length}):`);
        diag.overlayWarnings.forEach(w => {
            console.error(`     Tile: ${w.tile}`);
            console.error(`     Blocked by: <${w.blocker.tag}> class="${w.blocker.class}" z-index=${w.blocker.zIndex}`);
        });
    }

    if (diag.potentialOverlays && diag.potentialOverlays.length) {
        console.log(`  High-z-index overlays (${diag.potentialOverlays.length}):`);
        diag.potentialOverlays.forEach(o => {
            if (o.display !== 'none') {
                console.log(`    <${o.tag}#${o.id || ''}> .${o.class} z=${o.zIndex} pos=${o.position}`);
            }
        });
    }

    if (diag.zeroHeightOverlays && diag.zeroHeightOverlays.length) {
        console.warn(`  ⚠️  Zero-height containers with children (could intercept clicks): ${diag.zeroHeightOverlays.length}`);
        diag.zeroHeightOverlays.forEach(o => {
            console.warn(`    <${o.tag}#${o.id || ''}> .${o.class} overflow=${o.overflow} children=${o.childCount}`);
        });
    }
}

/* ══════════════════════════════════════════════════════════════════════════ */
/* Step 1 — Baseline: no Global JS, no test scripts                          */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Step 1 — Baseline (script ON, no Global JS)', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] tiles are visible and clickable`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);
            await capture(page, 'step1', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Step 1', url);

            // Core assertions
            expect(diag.tilesFound, `No product tiles found on ${slug}`).toBeGreaterThan(0);
            expect(
                diag.overlayWarnings.length,
                `CLICK BLOCKED on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
            ).toBe(0);
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Step 2 — + Global JS injected                                             */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Step 2 — + Global JS', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] tiles remain clickable after Global JS`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
            await capture(page, 'step2', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Step 2', url);

            expect(diag.tilesFound).toBeGreaterThan(0);
            expect(
                diag.overlayWarnings.length,
                `CLICK BLOCKED after Global JS on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
            ).toBe(0);
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Step 3 — + Global JS + Deploy (CRO-12345 brand-banner, sitewide deploy)   */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Step 3 — + Global JS + Deploy (CRO-12345)', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] tiles remain clickable after Deploy`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro12345Css),
                js: readScript(SCRIPTS.cro12345Js),
            });
            await capture(page, 'step3', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Step 3', url);

            expect(diag.tilesFound).toBeGreaterThan(0);
            expect(
                diag.overlayWarnings.length,
                `CLICK BLOCKED after Deploy on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
            ).toBe(0);
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Step 4 — + 1st active test: CRO-7521 (Remove headers on PLPs)            */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Step 4 — + CRO-7521 (Remove headers on PLPs)', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] tiles remain clickable with CRO-7521`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro12345Css),
                js: readScript(SCRIPTS.cro12345Js),
            });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro7521Css),
                js: readScript(SCRIPTS.cro7521Js),
            });
            await capture(page, 'step4', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Step 4', url);

            // Extra check: look specifically for zero-height cro-plp-wrapper overlays
            const zeroHeightIssue = diag.zeroHeightOverlays
                ? diag.zeroHeightOverlays.filter(o => o.class && o.class.includes('cro-plp'))
                : [];
            if (zeroHeightIssue.length) {
                console.warn('[QA] ⚠️  CRO-7521 zero-height containers detected:', zeroHeightIssue);
            }

            expect(diag.tilesFound).toBeGreaterThan(0);
            expect(
                diag.overlayWarnings.length,
                `CLICK BLOCKED after CRO-7521 on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
            ).toBe(0);
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Step 5 — + 2nd active test: CRO-12371 (Sticky search bar)                */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Step 5 — + CRO-12371 (Sticky search bar) — FULL STACK', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] tiles remain clickable with CRO-12371`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro12345Css),
                js: readScript(SCRIPTS.cro12345Js),
            });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro7521Css),
                js: readScript(SCRIPTS.cro7521Js),
            });
            await injectScripts(page, {
                css: readScript(SCRIPTS.cro12371Css),
                js: readScript(SCRIPTS.cro12371Js),
            });
            await capture(page, 'step5', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Step 5 (FULL STACK)', url);

            // Extra check: look for CRO-12371 fixed search bar covering tiles
            const searchBarOverlay = diag.potentialOverlays
                ? diag.potentialOverlays.filter(o => o.class && o.class.includes('12371'))
                : [];
            if (searchBarOverlay.length) {
                console.warn('[QA] ⚠️  CRO-12371 fixed search bar detected in overlays:', searchBarOverlay);
            }

            expect(diag.tilesFound).toBeGreaterThan(0);
            expect(
                diag.overlayWarnings.length,
                `CLICK BLOCKED after CRO-12371 on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
            ).toBe(0);
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Bonus: Isolated CRO-12371 alone — to isolate if it's the sole culprit   */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Debug — CRO-12371 in isolation (no other scripts)', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] CRO-12371 alone — tile check`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, {
                css: readScript(SCRIPTS.cro12371Css),
                js: readScript(SCRIPTS.cro12371Js),
            });
            await capture(page, 'debug-12371-isolated', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Debug CRO-12371 isolated', url);

            if (diag.overlayWarnings.length) {
                console.error('[QA] 🚨 CRO-12371 IS the culprit — it blocks tile clicks when run alone.');
            }

            expect(diag.tilesFound).toBeGreaterThan(0);
            // This test is soft — we log but don't fail so we can see the full picture
            if (diag.overlayWarnings.length > 0) {
                console.error(`BLOCKED tiles on ${slug} (CRO-12371 alone): ${diag.overlayWarnings.length}`);
            }
        });
    }
});

/* ══════════════════════════════════════════════════════════════════════════ */
/* Bonus: Isolated CRO-7521 alone — to isolate if it's the sole culprit    */
/* ══════════════════════════════════════════════════════════════════════════ */

test.describe('Debug — CRO-7521 in isolation (no other scripts)', () => {
    for (const url of CLP_URLS) {
        const slug = url.split('arcstore.co.za/')[1];

        test(`[${slug}] CRO-7521 alone — tile check`, async ({ page }) => {
            await gotoAndWaitForCLP(page, url);

            await injectScripts(page, {
                css: readScript(SCRIPTS.cro7521Css),
                js: readScript(SCRIPTS.cro7521Js),
            });
            await capture(page, 'debug-7521-isolated', slug);

            const diag = await diagnoseTiles(page);
            assertDiag(diag, 'Debug CRO-7521 isolated', url);

            if (diag.overlayWarnings.length) {
                console.error('[QA] 🚨 CRO-7521 IS the culprit — it blocks tile clicks when run alone.');
            }

            expect(diag.tilesFound).toBeGreaterThan(0);
            if (diag.overlayWarnings.length > 0) {
                console.error(`BLOCKED tiles on ${slug} (CRO-7521 alone): ${diag.overlayWarnings.length}`);
            }
        });
    }
});
