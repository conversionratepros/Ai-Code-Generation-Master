/**
 * Local test runner for CRO-10185
 * Usage:  npm run test:cro-10185
 *
 * Opens a headed Chromium window with variation.css + variation.js injected
 * on top of the live ODO page. Watches both files — any save re-injects
 * without reloading the full page (CSS is instant; JS re-runs the IIFE).
 */

const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const config  = require('./config');
const CSS_FILE = path.join(__dirname, 'variation.css');
const JS_FILE  = path.join(__dirname, 'variation.js');

let page; // shared reference so file-watcher can reach it

// ── helpers ──────────────────────────────────────────────────────────────────

async function injectCSS() {
    if (!page) return;
    try {
        const css = fs.readFileSync(CSS_FILE, 'utf8');
        // Remove any previously injected style tag, then re-add
        await page.evaluate(() => {
            var old = document.getElementById('cro-10185-style');
            if (old) old.remove();
        });
        await page.addStyleTag({ content: css, id: 'cro-10185-style' });
        console.log('[CSS] re-injected');
    } catch (e) {
        console.error('[CSS] injection failed:', e.message);
    }
}

async function injectJS() {
    if (!page) return;
    try {
        const js = fs.readFileSync(JS_FILE, 'utf8');
        // Reset guard so the IIFE can re-run
        await page.evaluate(() => { delete window.cro_10185; });
        await page.evaluate(js);
        console.log('[JS]  re-injected');
    } catch (e) {
        console.error('[JS]  injection failed:', e.message);
    }
}

async function injectAll() {
    await injectCSS();
    await injectJS();
}

// ── watcher ───────────────────────────────────────────────────────────────────

function watchFiles() {
    let debounce = null;

    function onChange(file) {
        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            console.log(`\n[watch] ${path.basename(file)} changed`);
            if (file === CSS_FILE) {
                await injectCSS();
            } else {
                await injectAll();
            }
        }, 150);
    }

    fs.watch(CSS_FILE, () => onChange(CSS_FILE));
    fs.watch(JS_FILE,  () => onChange(JS_FILE));
    console.log('[watch] Watching variation.css and variation.js for changes…\n');
}

// ── main ──────────────────────────────────────────────────────────────────────

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: config.userAgent,
        locale:    config.locale,
        viewport:  config.viewport,
    });

    page = await context.newPage();

    // Re-inject after every full navigation (SPA route changes / hard refresh)
    page.on('load', async () => {
        await injectAll();
    });

    console.log(`\nOpening: ${config.url}\n`);
    await page.goto(config.url, { waitUntil: 'domcontentloaded' });

    watchFiles();

    console.log('Browser is open. Edit variation.css or variation.js to hot-reload.');
    console.log('Press Ctrl+C to exit.\n');

    // Keep the process alive until the browser window is closed
    await context.waitForEvent('close').catch(() => {});
    process.exit(0);
})();
