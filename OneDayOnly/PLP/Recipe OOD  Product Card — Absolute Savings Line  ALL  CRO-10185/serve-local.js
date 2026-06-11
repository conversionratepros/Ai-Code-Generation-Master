/**
 * Local dev server for CRO-10185
 * Usage:  npm run serve:cro-10185
 *
 * Builds local-test.html from Control.html + variation files, serves it via
 * browser-sync, and hot-reloads whenever variation.css or variation.js change.
 */

const bs   = require('browser-sync').create();
const fs   = require('fs');
const path = require('path');

const CONTROL_HTML = path.join(__dirname, '..', 'Control.html');
const CSS_FILE     = path.join(__dirname, 'variation.css');
const JS_FILE      = path.join(__dirname, 'variation.js');
const OUTPUT_HTML  = path.join(__dirname, 'local-test.html');

// ── build: inject variation files into Control.html ───────────────────────────

function build() {
    let html = fs.readFileSync(CONTROL_HTML, 'utf8');
    const css = fs.readFileSync(CSS_FILE, 'utf8');
    const js  = fs.readFileSync(JS_FILE,  'utf8');

    // Remove any previous injection markers (safe for repeated builds)
    html = html
        .replace(/<!-- cro-10185-css -->[\s\S]*?<!-- \/cro-10185-css -->/g, '')
        .replace(/<!-- cro-10185-js -->[\s\S]*?<!-- \/cro-10185-js -->/g, '');

    // Inject CSS into <head>
    html = html.replace(
        '</head>',
        `<!-- cro-10185-css -->\n<style>\n${css}\n</style>\n<!-- /cro-10185-css -->\n</head>`
    );

    // Inject JS before </body>
    html = html.replace(
        '</body>',
        `<!-- cro-10185-js -->\n<script>\n${js}\n</script>\n<!-- /cro-10185-js -->\n</body>`
    );

    fs.writeFileSync(OUTPUT_HTML, html);
    console.log('[build] local-test.html rebuilt');
}

// ── watch variation files — rebuild + reload on change ───────────────────────

let debounce = null;

function onChange(file) {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        console.log(`[watch] ${path.basename(file)} changed`);
        build();
        bs.reload('local-test.html');
    }, 150);
}

fs.watch(CSS_FILE, () => onChange(CSS_FILE));
fs.watch(JS_FILE,  () => onChange(JS_FILE));

// ── initial build + start server ──────────────────────────────────────────────

build();

bs.init({
    server:    __dirname,
    startPath: 'local-test.html',
    open:      true,
    notify:    false,
    logPrefix: 'CRO-10185',
});
