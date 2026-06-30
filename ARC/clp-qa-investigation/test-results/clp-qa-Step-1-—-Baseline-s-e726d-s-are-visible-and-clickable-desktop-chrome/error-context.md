# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: clp-qa.test.js >> Step 1 — Baseline (script ON, no Global JS) >> [makeup] tiles are visible and clickable
- Location: clp-qa.test.js:289:9

# Error details

```
Error: CLICK BLOCKED on makeup: [{"tile":"https://www.arcstore.co.za/products/addict-lip-glow-oil-hydrating-gloss/031","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/les-4-ombres-boutons/baroque","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/hella-thicc-mascara-blue","blocker":{"tag":"DIV","class":"preloader-overlay__icon dw-mod","zIndex":"auto"}},{"tile":"https://www.arcstore.co.za/products/cappu-lip-oil-pp-cc-iv-xmas-2025","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}}]

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 5
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - link "Logo" [ref=e8] [cursor=pointer]:
          - /url: /
          - img "Logo" [ref=e9]
        - generic [ref=e11]:
          - generic:
            - img
          - generic [ref=e12]:
            - searchbox "Find it here" [ref=e13]
            - list
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Book now" [ref=e18] [cursor=pointer]:
              - /url: /arc-studio
          - listitem [ref=e19]:
            - generic "Log in" [ref=e21] [cursor=pointer]: 
            - text:    
          - listitem [ref=e22]:
            - link " 0" [ref=e23] [cursor=pointer]:
              - /url: /arc/arc-checkout?Purge=True
              - generic [ref=e24]:
                - generic [ref=e25]: 
                - generic [ref=e27]: "0"
      - navigation [ref=e28]:
        - list [ref=e32]:
          - listitem [ref=e33]:
            - link "New" [ref=e34] [cursor=pointer]:
              - /url: /new-in
          - listitem [ref=e35]:
            - link "Brands" [ref=e36] [cursor=pointer]:
              - /url: /brands
          - listitem [ref=e37]:
            - link "Makeup" [ref=e38] [cursor=pointer]:
              - /url: /makeup
          - listitem [ref=e39]:
            - link "Fragrance" [ref=e40] [cursor=pointer]:
              - /url: /fragrance
          - listitem [ref=e41]:
            - link "Skincare" [ref=e42] [cursor=pointer]:
              - /url: /skincare
          - listitem [ref=e43]:
            - link "Body" [ref=e44] [cursor=pointer]:
              - /url: /body
          - listitem [ref=e45]:
            - link "Electrical" [ref=e46] [cursor=pointer]:
              - /url: /electrical
          - listitem [ref=e47]:
            - link "Haircare" [ref=e48] [cursor=pointer]:
              - /url: /haircare
          - listitem [ref=e49]:
            - link "Accessories" [ref=e50] [cursor=pointer]:
              - /url: /accessories
          - listitem [ref=e51]:
            - link "Offers" [ref=e52] [cursor=pointer]:
              - /url: /offers
          - listitem [ref=e53]:
            - link "Stores" [ref=e54] [cursor=pointer]:
              - /url: /our-stores
    - generic [ref=e55]:
      - generic [ref=e57]: 
      - generic [ref=e58]:
        - generic [ref=e65]:
          - heading "Makeup" [level=1] [ref=e66]:
            - generic [ref=e67]: Makeup
          - paragraph [ref=e68]:
            - generic [ref=e71]: If you're creating a new look, restocking old favourites or simply in the mood to express yourself, our makeup department is your personal playground. Think lip stains and lip lacquers, foundations for all skin tones and needs and mascaras for every kind of lash goal, you'll find what you need for the look you want from the most-loved brands
        - generic [ref=e79]:
          - generic [ref=e80]:
            - link [ref=e81] [cursor=pointer]:
              - /url: /products/addict-lip-glow-oil-hydrating-gloss/031
            - generic [ref=e82]:
              - link "Addict Lip Glow Oil Hydrating Gloss" [ref=e84] [cursor=pointer]:
                - /url: /products/addict-lip-glow-oil-hydrating-gloss/031
                - img "Addict Lip Glow Oil Hydrating Gloss" [ref=e85]
              - generic [ref=e86]:
                - generic [ref=e87]:
                  - link [ref=e88] [cursor=pointer]:
                    - /url: /products/addict-lip-glow-oil-hydrating-gloss/031
                  - heading "DIOR" [level=6] [ref=e89]
                - generic [ref=e90]:
                  - link [ref=e91] [cursor=pointer]:
                    - /url: /products/addict-lip-glow-oil-hydrating-gloss/031
                  - heading "Addict Lip Glow Oil Hydrating Gloss" [level=6] [ref=e92]
                - generic [ref=e93]:
                  - link [ref=e94] [cursor=pointer]:
                    - /url: /products/addict-lip-glow-oil-hydrating-gloss/031
                  - heading "R945,00" [level=6] [ref=e95]:
                    - generic [ref=e96]: R945,00
                - generic [ref=e100]: 16 Shades
            - button "Add to bag" [ref=e101] [cursor=pointer]
          - generic [ref=e102]:
            - link [ref=e103] [cursor=pointer]:
              - /url: /products/les-4-ombres-boutons/baroque
            - generic [ref=e104]:
              - link "Les 4 Ombres Boutons" [ref=e106] [cursor=pointer]:
                - /url: /products/les-4-ombres-boutons/baroque
                - img "Les 4 Ombres Boutons" [ref=e107]
              - generic [ref=e108]:
                - generic [ref=e109]:
                  - link [ref=e110] [cursor=pointer]:
                    - /url: /products/les-4-ombres-boutons/baroque
                  - heading "CHANEL" [level=6] [ref=e111]
                - generic [ref=e112]:
                  - link [ref=e113] [cursor=pointer]:
                    - /url: /products/les-4-ombres-boutons/baroque
                  - heading "Les 4 Ombres Boutons" [level=6] [ref=e114]
                - generic [ref=e115]:
                  - link [ref=e116] [cursor=pointer]:
                    - /url: /products/les-4-ombres-boutons/baroque
                  - heading "R1 765,00" [level=6] [ref=e117]:
                    - generic [ref=e118]: R1 765,00
                - generic [ref=e122]: 3 Shades
            - button "Add to bag" [ref=e123] [cursor=pointer]
          - generic [ref=e124]:
            - link [ref=e125] [cursor=pointer]:
              - /url: /products/hella-thicc-mascara-blue
            - generic [ref=e126]:
              - link "Hella Thicc Mascara Blue" [ref=e128] [cursor=pointer]:
                - /url: /products/hella-thicc-mascara-blue
                - img "Hella Thicc Mascara Blue" [ref=e129]
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - link [ref=e132] [cursor=pointer]:
                    - /url: /products/hella-thicc-mascara-blue
                  - heading "Fenty Beauty" [level=6] [ref=e133]
                - generic [ref=e134]:
                  - link [ref=e135] [cursor=pointer]:
                    - /url: /products/hella-thicc-mascara-blue
                  - heading "Hella Thicc Mascara Blue" [level=6] [ref=e136]
                - generic [ref=e137]:
                  - link [ref=e138] [cursor=pointer]:
                    - /url: /products/hella-thicc-mascara-blue
                  - heading "R520,00" [level=6] [ref=e139]:
                    - generic [ref=e140]: R520,00
            - button "Add to bag" [ref=e141] [cursor=pointer]
          - generic [ref=e142]:
            - link [ref=e143] [cursor=pointer]:
              - /url: /products/cappu-lip-oil-pp-cc-iv-xmas-2025
            - generic [ref=e144]:
              - link "Cappu Lip Oil Pp Cc Iv Xmas 2025" [ref=e146] [cursor=pointer]:
                - /url: /products/cappu-lip-oil-pp-cc-iv-xmas-2025
                - img "Cappu Lip Oil Pp Cc Iv Xmas 2025" [ref=e147]
              - generic [ref=e148]:
                - generic [ref=e149]:
                  - link [ref=e150] [cursor=pointer]:
                    - /url: /products/cappu-lip-oil-pp-cc-iv-xmas-2025
                  - heading "Kylie Cosmetics" [level=6] [ref=e151]
                - generic [ref=e152]:
                  - link [ref=e153] [cursor=pointer]:
                    - /url: /products/cappu-lip-oil-pp-cc-iv-xmas-2025
                  - heading "Cappu Lip Oil Pp Cc Iv Xmas 2025" [level=6] [ref=e154]
                - generic [ref=e155]:
                  - link [ref=e156] [cursor=pointer]:
                    - /url: /products/cappu-lip-oil-pp-cc-iv-xmas-2025
                  - heading "R745,00" [level=6] [ref=e157]:
                    - generic [ref=e158]: R745,00
            - button "Add to bag" [ref=e159] [cursor=pointer]
          - generic [ref=e160]:
            - link [ref=e161] [cursor=pointer]:
              - /url: /products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond
            - generic [ref=e162]:
              - generic [ref=e163]:
                - generic [ref=e165]: Only at ARC
                - link "Easy Bake Airbrush Matte Pressed Powder with 12-Hour Shine Control" [ref=e166] [cursor=pointer]:
                  - /url: /products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond
                  - img "Easy Bake Airbrush Matte Pressed Powder with 12-Hour Shine Control" [ref=e167]
              - generic [ref=e168]:
                - generic [ref=e169]:
                  - link [ref=e170] [cursor=pointer]:
                    - /url: /products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond
                  - heading "HUDA BEAUTY" [level=6] [ref=e171]
                - generic [ref=e172]:
                  - link [ref=e173] [cursor=pointer]:
                    - /url: /products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond
                  - heading "Easy Bake Airbrush Matte Pressed Powder with 12-Hour Shine Control" [level=6] [ref=e174]
                - generic [ref=e175]:
                  - link [ref=e176] [cursor=pointer]:
                    - /url: /products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond
                  - heading "R855,00" [level=6] [ref=e177]:
                    - generic [ref=e178]: R855,00
                - generic [ref=e182]: 8 Shades
            - button "Add to bag" [ref=e183] [cursor=pointer]
        - generic [ref=e185]:
          - heading "Shop all Makeup" [level=1] [ref=e189]
          - 'heading "Shop by Category: Eyebrows | Eyes | Face | Giftset | Lips | Makeup Minis | Nails" [level=3] [ref=e193]':
            - text: "Shop by Category:"
            - link "Eyebrows" [ref=e197] [cursor=pointer]:
              - /url: /makeup/eyebrows
            - generic [ref=e198]:
              - generic [ref=e199]:
                - text: "|"
                - link "Eyes" [ref=e200] [cursor=pointer]:
                  - /url: /makeup/eyes
              - generic [ref=e201]:
                - text: "|"
                - link "Face" [ref=e202] [cursor=pointer]:
                  - /url: /makeup/face
              - generic [ref=e203]: "|"
              - link "Giftset" [ref=e204] [cursor=pointer]:
                - /url: /makeup/giftset
            - generic [ref=e206]:
              - generic [ref=e207]: "|"
              - link "Lips" [ref=e208] [cursor=pointer]:
                - /url: /makeup/lips
              - generic [ref=e209]: "|"
              - link "Makeup Minis" [ref=e210] [cursor=pointer]:
                - /url: /makeup/makeup-minis
              - link:
                - /url: https://www.arcstore.co.za/accessories/skincare-accessories/skincare-accessories
              - generic [ref=e211]: "|"
            - link "Nails" [ref=e212] [cursor=pointer]:
              - /url: /makeup/nails
        - generic [ref=e243]:
          - paragraph
          - paragraph [ref=e244]:
            - generic [ref=e245]: Keep abreast of the latest trends, find the perfect makeup starter pack for a loved one or shop for cult favourites, the options are endless. Our broad-ranging makeup department has the latest from the most loved brands for everyone, from luminous and hydrating foundations to highly pigmented sheer, matte and shimmery eyeshadow pots and palettes. Newer formulations make application and blending easy, meaning that even beginners can learn how to apply makeup with very few hassles and become comfortable in no time.
          - paragraph [ref=e246]
          - paragraph [ref=e247]:
            - generic [ref=e248]: Our range of extra fine, sheer, and mineral powders are super lightweight and hug the skin with very little effort. The high-definition pigments give traceless blending so you can have a full face of makeup without looking overly done. While oily and combination skin types can pull off ‘baking’ their makeup looks with powder, dry skin types need to shy away from this trend and instead apply powder as lightly as possible. Using a brush to apply your powder means you’re able to control the amount of powder you apply while blenders and sponges, when used damp, pick up and deposit more product.
          - paragraph [ref=e249]
          - paragraph [ref=e250]:
            - generic [ref=e251]: Makeup setting sprays help lock and keep everything in place while providing a flexible feel. Advanced formulations are now more nourishing to the skin and include SPF, so, feel free to reapply your spray throughout the day knowing you get added benefits. Take everything all off at the end of the day with soothing and hydrating makeup removers that come in different forms to suit every skin need. Dermatologically tested and gentle around the eyes, your skin will be as good as new in a few simple steps.
          - paragraph [ref=e252]:
            - generic [ref=e254]:
              - text: Shop from our wide selection of Bobbi Brown, MAC, Estee Lauder and Lancome
              - link "foundations" [ref=e255] [cursor=pointer]:
                - /url: /makeup/face/foundation
              - text: ","
              - link "eyeshadows" [ref=e256] [cursor=pointer]:
                - /url: /makeup/eyes/eye-shadow
              - text: ","
              - link "lipsticks" [ref=e257] [cursor=pointer]:
                - /url: /makeup/lips/lipstick
              - text: ","
              - link "mascaras" [ref=e258] [cursor=pointer]:
                - /url: /makeup/eyelashes/mascara
              - text: and more available online at ARC.
  - contentinfo [ref=e259]:
    - generic [ref=e261]:
      - generic [ref=e262]:
        - heading [level=3]
        - generic [ref=e263]:
          - paragraph [ref=e264]:
            - link "Login to your account" [ref=e265] [cursor=pointer]:
              - /url: /sign-in
          - paragraph [ref=e266]:
            - generic:
              - generic:
                - link:
                  - /url: /sign-in
            - link "Find a Store" [ref=e268] [cursor=pointer]:
              - /url: /our-stores
              - text: Find a Store
      - generic [ref=e269]:
        - heading [level=3]
        - generic [ref=e270]:
          - strong [ref=e273]: My Account
          - generic [ref=e274]:
            - link:
              - /url: /sign-in
            - link "Account Details" [ref=e276] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7673
            - link:
              - /url: /sign-in
          - generic [ref=e277]:
            - link:
              - /url: /my-arc-account/my-arc-orders
            - link "Orders" [ref=e279] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7676
            - link:
              - /url: /my-arc-account/my-arc-orders
          - generic [ref=e280]:
            - link:
              - /url: /my-arc-account/my-arc-return-requests
            - link "Returns" [ref=e282] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7680
            - link:
              - /url: /my-arc-account/my-arc-return-requests
          - generic [ref=e283]:
            - link:
              - /url: /arc/my-arc-account/my-arc-wishlist
            - link "Wishlist" [ref=e285] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7675
            - link:
              - /url: /arc/my-arc-account/my-arc-wishlist
      - generic [ref=e286]:
        - heading [level=3]
        - generic [ref=e287]:
          - strong [ref=e290]: Service and More
          - link "About ARC" [ref=e293] [cursor=pointer]:
            - /url: /customer/about-arc
          - link "ARC Careers" [ref=e295] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/71665917/admin/
          - generic [ref=e296]:
            - link "ClubCard ARC Partnership" [ref=e298] [cursor=pointer]:
              - /url: /customer/clubcard-partnership
            - link "Help Centre" [ref=e300] [cursor=pointer]:
              - /url: /customer/help-centre
            - link "Payment Options" [ref=e302] [cursor=pointer]:
              - /url: /payment-options
            - link "eBucks" [ref=e304] [cursor=pointer]:
              - /url: /arc-ebucks
            - link "Terms, Conditions & Privacy" [ref=e306] [cursor=pointer]:
              - /url: /customer/t-cs
            - link "Contact Us" [ref=e308] [cursor=pointer]:
              - /url: /customer
            - link "ARC Artist" [ref=e310] [cursor=pointer]:
              - /url: /arc-artist
  - contentinfo [ref=e311]:
    - generic [ref=e313]:
      - generic [ref=e316]:
        - paragraph [ref=e317]: Subscribe to the ARC Newsletter
        - generic [ref=e319]:
          - textbox "Your email address" [ref=e320]
          - button "Sign up" [ref=e321] [cursor=pointer]
      - generic [ref=e324]:
        - link "" [ref=e325] [cursor=pointer]:
          - /url: https://www.instagram.com/arcstoreofficial/
          - generic [ref=e326]: 
        - link "" [ref=e327] [cursor=pointer]:
          - /url: https://www.facebook.com/ARCStoreSA
          - generic [ref=e328]: 
        - link "" [ref=e329] [cursor=pointer]:
          - /url: https://twitter.com/arcstore_sa
          - generic [ref=e330]: 
        - link "" [ref=e331] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UCguRf9tx-YWT0ZO45gfIwxw
          - generic [ref=e332]: 
        - link "" [ref=e333] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/71665917/admin/
          - generic [ref=e334]: 
      - generic [ref=e336]:
        - paragraph
```

# Test source

```ts
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
  244 |     await page.screenshot({ path: file, fullPage: true });
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
> 301 |             ).toBe(0);
      |               ^ Error: CLICK BLOCKED on makeup: [{"tile":"https://www.arcstore.co.za/products/addict-lip-glow-oil-hydrating-gloss/031","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/les-4-ombres-boutons/baroque","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/hella-thicc-mascara-blue","blocker":{"tag":"DIV","class":"preloader-overlay__icon dw-mod","zIndex":"auto"}},{"tile":"https://www.arcstore.co.za/products/cappu-lip-oil-pp-cc-iv-xmas-2025","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}},{"tile":"https://www.arcstore.co.za/products/easy-bake-airbrush-matte-pressed-powder-with-12-hour-shine-control/kunafblond","blocker":{"tag":"DIV","class":"preloader-overlay","zIndex":"80"}}]
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
  345 |                 css: readScript(SCRIPTS.cro12345Css),
  346 |                 js: readScript(SCRIPTS.cro12345Js),
  347 |             });
  348 |             await capture(page, 'step3', slug);
  349 | 
  350 |             const diag = await diagnoseTiles(page);
  351 |             assertDiag(diag, 'Step 3', url);
  352 | 
  353 |             expect(diag.tilesFound).toBeGreaterThan(0);
  354 |             expect(
  355 |                 diag.overlayWarnings.length,
  356 |                 `CLICK BLOCKED after Deploy on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  357 |             ).toBe(0);
  358 |         });
  359 |     }
  360 | });
  361 | 
  362 | /* ══════════════════════════════════════════════════════════════════════════ */
  363 | /* Step 4 — + 1st active test: CRO-7521 (Remove headers on PLPs)            */
  364 | /* ══════════════════════════════════════════════════════════════════════════ */
  365 | 
  366 | test.describe('Step 4 — + CRO-7521 (Remove headers on PLPs)', () => {
  367 |     for (const url of CLP_URLS) {
  368 |         const slug = url.split('arcstore.co.za/')[1];
  369 | 
  370 |         test(`[${slug}] tiles remain clickable with CRO-7521`, async ({ page }) => {
  371 |             await gotoAndWaitForCLP(page, url);
  372 | 
  373 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  374 |             await injectScripts(page, {
  375 |                 css: readScript(SCRIPTS.cro12345Css),
  376 |                 js: readScript(SCRIPTS.cro12345Js),
  377 |             });
  378 |             await injectScripts(page, {
  379 |                 css: readScript(SCRIPTS.cro7521Css),
  380 |                 js: readScript(SCRIPTS.cro7521Js),
  381 |             });
  382 |             await capture(page, 'step4', slug);
  383 | 
  384 |             const diag = await diagnoseTiles(page);
  385 |             assertDiag(diag, 'Step 4', url);
  386 | 
  387 |             // Extra check: look specifically for zero-height cro-plp-wrapper overlays
  388 |             const zeroHeightIssue = diag.zeroHeightOverlays
  389 |                 ? diag.zeroHeightOverlays.filter(o => o.class && o.class.includes('cro-plp'))
  390 |                 : [];
  391 |             if (zeroHeightIssue.length) {
  392 |                 console.warn('[QA] ⚠️  CRO-7521 zero-height containers detected:', zeroHeightIssue);
  393 |             }
  394 | 
  395 |             expect(diag.tilesFound).toBeGreaterThan(0);
  396 |             expect(
  397 |                 diag.overlayWarnings.length,
  398 |                 `CLICK BLOCKED after CRO-7521 on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  399 |             ).toBe(0);
  400 |         });
  401 |     }
```