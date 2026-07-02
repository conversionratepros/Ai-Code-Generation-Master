# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: clp-qa.test.js >> Step 1 — Baseline (script ON, no Global JS) >> [fragrance] tiles are visible and clickable
- Location: clp-qa.test.js:289:9

# Error details

```
Error: Channel closed
```

```
Error: page.screenshot: Target crashed 
Browser logs:

<launching> /Users/rafee/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --no-sandbox --disable-blink-features=AutomationControlled --user-data-dir=/var/folders/78/8_mtnf011wb538twy9v3r70h0000gn/T/playwright_chromiumdev_profile-DtO76p --remote-debugging-pipe --no-startup-window
<launched> pid=31273
[pid=31273] <gracefully close start>
[pid=31273][err] [31273:381640:0701/143340.664952:ERROR:content/browser/gpu/gpu_process_host.cc:1005] GPU process exited unexpectedly: exit_code=15
[pid=31273][err] [31273:381640:0701/143340.669201:ERROR:content/browser/network_service_instance_impl.cc:722] Network service crashed or was terminated, restarting service.
[pid=31273][err] Received signal 11 SEGV_ACCERR 000000000000
[pid=31273][err]  [0x00011a677c5c]
[pid=31273][err]  [0x00011a67bc58]
[pid=31273][err]  [0x000183643744]
[pid=31273][err]  [0x000118b06458]
[pid=31273][err]  [0x000118ce8534]
[pid=31273][err]  [0x0001174cbf18]
[pid=31273][err]  [0x0001134784b8]
[pid=31273][err]  [0x0001149610f0]
[pid=31273][err]  [0x00011340e874]
[pid=31273][err]  [0x000116cfc938]
[pid=31273][err]  [0x000183710318]
[pid=31273][err]  [0x000183710010]
[pid=31273][err]  [0x00018370fb88]
[pid=31273][err]  [0x0001836f5c38]
[pid=31273][err]  [0x0001837c81c4]
[pid=31273][err]  [0x0001904db560]
[pid=31273][err]  [0x0001904de8bc]
[pid=31273][err]  [0x00019066814c]
[pid=31273][err]  [0x0001881d035c]
[pid=31273][err]  [0x000187b24084]
[pid=31273][err]  [0x0001886b98b0]
[pid=31273][err]  [0x0001886b95bc]
[pid=31273][err]  [0x00011a607ac8]
[pid=31273][err]  [0x00011340e874]
[pid=31273][err]  [0x000116ce7e40]
[pid=31273][err]  [0x000187b1713c]
[pid=31273][err]  [0x000115935458]
[pid=31273][err]  [0x0001159352a0]
[pid=31273][err]  [0x000114ee0c60]
[pid=31273][err]  [0x000114ee0588]
[pid=31273][err]  [0x00011605dbac]
[pid=31273][err]  [0x00011605d834]
[pid=31273][err]  [0x000115347194]
[pid=31273][err]  [0x000114b6d75c]
[pid=31273][err]  [0x00011316979c]
[pid=31273][err]  [0x00010093c85c]
[pid=31273][err]  [0x00018327be00]
[pid=31273][err] [end of stack trace]
[pid=31273][err] [0701/143341.044857:WARNING:third_party/crashpad/crashpad/util/numeric/in_range_cast.h:38] value -634136515 out of range
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

```

# Test source

```ts
  144 |             }
  145 | 
  146 |             const topEl = document.elementFromPoint(cx, cy);
  147 | 
  148 |             const tileContainsTop = tile.contains(topEl) || topEl === tile;
  149 |             const topTag = topEl ? topEl.tagName : 'null';
  150 |             const topClass = topEl ? (topEl.className || '') : '';
  151 |             const topZIndex = topEl ? window.getComputedStyle(topEl).zIndex : '';
  152 | 
  153 |             if (!tileContainsTop) {
  154 |                 overlayWarnings.push({
  155 |                     tile: tile.href || tile.textContent.trim().substring(0, 40),
  156 |                     blocker: { tag: topTag, class: topClass.substring(0, 80), zIndex: topZIndex },
  157 |                 });
  158 |             }
  159 | 
  160 |             results.push({
  161 |                 index: i,
  162 |                 href: tile.href,
  163 |                 rect: { top: Math.round(rect.top), left: Math.round(rect.left), w: Math.round(rect.width), h: Math.round(rect.height) },
  164 |                 topElement: { tag: topTag, class: topClass.substring(0, 80), zIndex: topZIndex },
  165 |                 clickable: tileContainsTop,
  166 |             });
  167 |         });
  168 | 
  169 |         // Count how many in-viewport tiles were actually checked
  170 |         const checkedCount = results.filter(r => !r.issue || !r.issue.includes('skipped')).length;
  171 | 
  172 |         // Scan for any fixed/absolute elements with high z-index that might overlay tiles
  173 |         const allEls = Array.from(document.querySelectorAll('*'));
  174 |         const potentialOverlays = allEls
  175 |             .filter(el => {
  176 |                 const s = window.getComputedStyle(el);
  177 |                 const z = parseInt(s.zIndex, 10);
  178 |                 const pos = s.position;
  179 |                 return !isNaN(z) && z > 100 && (pos === 'fixed' || pos === 'absolute' || pos === 'sticky');
  180 |             })
  181 |             .map(el => ({
  182 |                 tag: el.tagName,
  183 |                 id: el.id,
  184 |                 class: el.className.substring ? el.className.substring(0, 80) : '',
  185 |                 zIndex: window.getComputedStyle(el).zIndex,
  186 |                 position: window.getComputedStyle(el).position,
  187 |                 display: window.getComputedStyle(el).display,
  188 |             }));
  189 | 
  190 |         // Also check for elements with height:0 that might still intercept events
  191 |         const zeroHeightOverlays = allEls
  192 |             .filter(el => {
  193 |                 const s = window.getComputedStyle(el);
  194 |                 const rect = el.getBoundingClientRect();
  195 |                 return (
  196 |                     rect.height === 0 &&
  197 |                     s.overflow !== 'hidden' &&
  198 |                     s.pointerEvents !== 'none' &&
  199 |                     el.children.length > 0
  200 |                 );
  201 |             })
  202 |             .slice(0, 10)
  203 |             .map(el => ({
  204 |                 tag: el.tagName,
  205 |                 id: el.id,
  206 |                 class: el.className.substring ? el.className.substring(0, 80) : '',
  207 |                 overflow: window.getComputedStyle(el).overflow,
  208 |                 childCount: el.children.length,
  209 |             }));
  210 | 
  211 |         return {
  212 |             tilesFound: tiles.length,
  213 |             tilesChecked: checkedCount,
  214 |             tileSelector: usedSelector,
  215 |             results,
  216 |             overlayWarnings,
  217 |             potentialOverlays,
  218 |             zeroHeightOverlays,
  219 |         };
  220 |     });
  221 | }
  222 | 
  223 | /**
  224 |  * Inject CSS + JS scripts into the page.
  225 |  */
  226 | async function injectScripts(page, scripts = {}) {
  227 |     if (scripts.css) {
  228 |         await page.addStyleTag({ content: scripts.css });
  229 |     }
  230 |     if (scripts.js) {
  231 |         await page.evaluate(scripts.js);
  232 |         // Give the script time to run (waitForElement polling etc.)
  233 |         await page.waitForTimeout(3000);
  234 |     }
  235 | }
  236 | 
  237 | /**
  238 |  * Captures a full-page screenshot named after the step + URL slug + device.
  239 |  */
  240 | async function capture(page, stepName, urlSlug) {
  241 |     const dir = path.join(__dirname, 'screenshots');
  242 |     if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  243 |     const file = path.join(dir, `${stepName}__${urlSlug}.png`);
> 244 |     await page.screenshot({ path: file, fullPage: true });
      |                ^ Error: page.screenshot: Target crashed 
  245 |     console.log(`[QA] Screenshot saved: ${file}`);
  246 | }
  247 | 
  248 | /**
  249 |  * Logs and asserts diagnostic results.
  250 |  */
  251 | function assertDiag(diag, stepLabel, url) {
  252 |     const slug = url.replace('https://www.arcstore.co.za/', '').replace(/\//g, '-') || 'home';
  253 |     console.log(`\n[QA] ${stepLabel} — ${slug}`);
  254 |     console.log(`  Tiles found: ${diag.tilesFound}, in-viewport checked: ${diag.tilesChecked} (selector: ${diag.tileSelector})`);
  255 | 
  256 |     if (diag.overlayWarnings && diag.overlayWarnings.length) {
  257 |         console.error(`  ⚠️  OVERLAY WARNINGS (${diag.overlayWarnings.length}):`);
  258 |         diag.overlayWarnings.forEach(w => {
  259 |             console.error(`     Tile: ${w.tile}`);
  260 |             console.error(`     Blocked by: <${w.blocker.tag}> class="${w.blocker.class}" z-index=${w.blocker.zIndex}`);
  261 |         });
  262 |     }
  263 | 
  264 |     if (diag.potentialOverlays && diag.potentialOverlays.length) {
  265 |         console.log(`  High-z-index overlays (${diag.potentialOverlays.length}):`);
  266 |         diag.potentialOverlays.forEach(o => {
  267 |             if (o.display !== 'none') {
  268 |                 console.log(`    <${o.tag}#${o.id || ''}> .${o.class} z=${o.zIndex} pos=${o.position}`);
  269 |             }
  270 |         });
  271 |     }
  272 | 
  273 |     if (diag.zeroHeightOverlays && diag.zeroHeightOverlays.length) {
  274 |         console.warn(`  ⚠️  Zero-height containers with children (could intercept clicks): ${diag.zeroHeightOverlays.length}`);
  275 |         diag.zeroHeightOverlays.forEach(o => {
  276 |             console.warn(`    <${o.tag}#${o.id || ''}> .${o.class} overflow=${o.overflow} children=${o.childCount}`);
  277 |         });
  278 |     }
  279 | }
  280 | 
  281 | /* ══════════════════════════════════════════════════════════════════════════ */
  282 | /* Step 1 — Baseline: no Global JS, no test scripts                          */
  283 | /* ══════════════════════════════════════════════════════════════════════════ */
  284 | 
  285 | test.describe('Step 1 — Baseline (script ON, no Global JS)', () => {
  286 |     for (const url of CLP_URLS) {
  287 |         const slug = url.split('arcstore.co.za/')[1];
  288 | 
  289 |         test(`[${slug}] tiles are visible and clickable`, async ({ page }) => {
  290 |             await gotoAndWaitForCLP(page, url);
  291 |             await capture(page, 'step1', slug);
  292 | 
  293 |             const diag = await diagnoseTiles(page);
  294 |             assertDiag(diag, 'Step 1', url);
  295 | 
  296 |             // Core assertions
  297 |             expect(diag.tilesFound, `No product tiles found on ${slug}`).toBeGreaterThan(0);
  298 |             expect(
  299 |                 diag.overlayWarnings.length,
  300 |                 `CLICK BLOCKED on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  301 |             ).toBe(0);
  302 |         });
  303 |     }
  304 | });
  305 | 
  306 | /* ══════════════════════════════════════════════════════════════════════════ */
  307 | /* Step 2 — + Global JS injected                                             */
  308 | /* ══════════════════════════════════════════════════════════════════════════ */
  309 | 
  310 | test.describe('Step 2 — + Global JS', () => {
  311 |     for (const url of CLP_URLS) {
  312 |         const slug = url.split('arcstore.co.za/')[1];
  313 | 
  314 |         test(`[${slug}] tiles remain clickable after Global JS`, async ({ page }) => {
  315 |             await gotoAndWaitForCLP(page, url);
  316 | 
  317 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  318 |             await capture(page, 'step2', slug);
  319 | 
  320 |             const diag = await diagnoseTiles(page);
  321 |             assertDiag(diag, 'Step 2', url);
  322 | 
  323 |             expect(diag.tilesFound).toBeGreaterThan(0);
  324 |             expect(
  325 |                 diag.overlayWarnings.length,
  326 |                 `CLICK BLOCKED after Global JS on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  327 |             ).toBe(0);
  328 |         });
  329 |     }
  330 | });
  331 | 
  332 | /* ══════════════════════════════════════════════════════════════════════════ */
  333 | /* Step 3 — + Global JS + Deploy (CRO-12345 brand-banner, sitewide deploy)   */
  334 | /* ══════════════════════════════════════════════════════════════════════════ */
  335 | 
  336 | test.describe('Step 3 — + Global JS + Deploy (CRO-12345)', () => {
  337 |     for (const url of CLP_URLS) {
  338 |         const slug = url.split('arcstore.co.za/')[1];
  339 | 
  340 |         test(`[${slug}] tiles remain clickable after Deploy`, async ({ page }) => {
  341 |             await gotoAndWaitForCLP(page, url);
  342 | 
  343 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  344 |             await injectScripts(page, {
```