/**
 * Local dev server for CRO-12427 — Suppress Spin-the-Wheel Popup
 * Usage:  node serve-local.js
 *
 * Reads config.json, injects variation CSS + JS into the live site via
 * Playwright proxy, and hot-reloads in a non-headless browser whenever
 * variation.css or variation.js change.
 */

const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const CONFIG     = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const TARGET_URL = CONFIG.urls[0];

function readFiles() {
    const result = {};
    CONFIG.files.forEach(function (relPath) {
        const abs = path.join(__dirname, relPath);
        result[relPath] = fs.readFileSync(abs, 'utf8');
    });
    return result;
}

function getCSS(files) {
    return Object.entries(files)
        .filter(function (e) { return e[0].endsWith('.css'); })
        .map(function (e) { return e[1]; })
        .join('\n');
}

function getJS(files) {
    return Object.entries(files)
        .filter(function (e) { return e[0].endsWith('.js'); })
        .map(function (e) { return e[1]; })
        .join('\n');
}

(async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });

    async function openPage(width, label) {
        const context = await browser.newContext({ viewport: { width: width, height: 900 } });
        const page    = await context.newPage();

        async function inject() {
            const files = readFiles();
            const css   = getCSS(files);
            const js    = getJS(files);
            await page.addStyleTag({ content: css }).catch(() => {});
            await page.evaluate(function (code) { eval(code); }, js).catch(function(e) { console.error('JS inject error:', e.message); });
            console.log('[' + label + '] variation injected');
        }

        await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await inject();

        /* Watch variation files and re-inject on change */
        var debounce = null;
        CONFIG.files.forEach(function (relPath) {
            const abs = path.join(__dirname, relPath);
            fs.watch(abs, function () {
                clearTimeout(debounce);
                debounce = setTimeout(async function () {
                    console.log('[watch] ' + path.basename(abs) + ' changed — reloading...');
                    await page.reload({ waitUntil: 'domcontentloaded' });
                    await inject();
                }, 200);
            });
        });

        return page;
    }

    console.log('Opening:', TARGET_URL);
    await openPage(1440, 'desktop');

    console.log('');
    console.log('✓  Browser open — editing variation.css or variation.js will auto-reload.');
    console.log('   Close the browser to stop.');
    console.log('');
})();
