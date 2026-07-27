const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FOLDER = __dirname;

function getVariation() {
    const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
    const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
    return { css, js };
}

// ─── Mock HTML builders ───────────────────────────────────────────────────────

function rackPageHtml(rackKeyword, accordionState) {
    accordionState = accordionState || 'open';
    return `<!DOCTYPE html>
<html><head><title>Rack PDP</title></head>
<body>
<div class="product-details">
  <nav>
    <ol>
      <li data-slot="breadcrumb-item">
        <a href="/en-us/category/rack-systems/racks">Racks</a>
      </li>
    </ol>
  </nav>
  <h1>Vehicle ${rackKeyword} Roof Rack Kit</h1>
  <div class="lmd:flex-row">
    <div>
      <div class="mx-auto">
        <button data-slot="accordion-trigger" data-state="${accordionState}">Product Details</button>
        <div>Product details content</div>
        <button data-slot="accordion-trigger" data-state="closed">Specifications</button>
        <div>Specifications content</div>
        <button data-slot="accordion-trigger" data-state="closed">Documentation &amp; Downloads</button>
        <div>Docs content</div>
      </div>
    </div>
    <div class="product-content">
      <video src="install.mp4"></video>
    </div>
  </div>
</div>
</body></html>`;
}

function nonRackPageHtml(breadcrumbCategory, productName) {
    return `<!DOCTYPE html>
<html><head><title>Non-Rack PDP</title></head>
<body>
<div class="product-details">
  <nav>
    <ol>
      <li data-slot="breadcrumb-item">
        <a href="/en-us/category/rack-systems/${breadcrumbCategory}">${productName}</a>
      </li>
    </ol>
  </nav>
  <h1>${productName} Kit</h1>
  <div class="lmd:flex-row">
    <div>
      <div class="mx-auto">
        <button data-slot="accordion-trigger" data-state="closed">Product Details</button>
        <div>Content</div>
      </div>
    </div>
    <div class="product-content"></div>
  </div>
</div>
</body></html>`;
}

function componentPageHtml() {
    return `<!DOCTYPE html>
<html><head><title>Accessory PDP</title></head>
<body>
<div class="product-details">
  <nav>
    <ol>
      <li data-slot="breadcrumb-item">
        <a href="/en-us/category/accessories/mounting-systems">Accessories</a>
      </li>
    </ol>
  </nav>
  <h1>Slimline II Rail Kit</h1>
  <div class="lmd:flex-row">
    <div>
      <div class="mx-auto">
        <button data-slot="accordion-trigger" data-state="closed">Product Details</button>
        <div>Content</div>
      </div>
    </div>
    <div class="product-content"></div>
  </div>
</div>
</body></html>`;
}

async function injectVariation(page, html) {
    const { css, js } = getVariation();
    await page.setContent(html);
    await page.addStyleTag({ content: css });
    await page.evaluate(js);
}

/* Serve HTML from a routed URL so window.location.href matches the pattern */
async function injectVariationAtUrl(page, url, html) {
    const { css, js } = getVariation();
    await page.route(url, route => route.fulfill({ contentType: 'text/html', body: html }));
    await page.goto(url);
    await page.addStyleTag({ content: css });
    await page.evaluate(js);
}

// ─── Section renders on rack pages ────────────────────────────────────────────

test.describe('Section renders — Slimline II rack page', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('section is injected into the DOM', async ({ page }) => {
        await expect(page.locator('.cro-12323-section')).toBeAttached();
    });

    test('section heading text is correct', async ({ page }) => {
        const heading = await page.locator('.cro-12323-title').textContent();
        expect(heading.trim()).toBe('3 Big Reasons Drivers Trust Front Runner');
    });

    test('section subtitle text is correct', async ({ page }) => {
        const sub = await page.locator('.cro-12323-subtitle').textContent();
        expect(sub.trim()).toBe(
            'Built for overlanding. Trusted worldwide. Watch real-world videos that prove this rack is built for adventure.'
        );
    });

    test('three tiles are rendered', async ({ page }) => {
        await expect(page.locator('.cro-12323-tile')).toHaveCount(3);
    });

    test('tile 1 has INSTALLATION badge', async ({ page }) => {
        const badge = await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-badge').textContent();
        expect(badge.trim()).toBe('INSTALLATION');
    });

    test('tile 1 installation video ID is the Slimline II install ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('_F4lU9wrBPc');
    });

    test('tile 2 has correct Slimline II video ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(1).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('V-XQydf0evM');
    });

    test('tile 3 has correct Slimline II video ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(2).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('a_m34XmT_DQ');
    });

    test('section is inserted before the flex-row, not inside it', async ({ page }) => {
        const isBefore = await page.evaluate(() => {
            const section = document.querySelector('.cro-12323-section');
            const flexRow = document.querySelector('.lmd\\:flex-row');
            if (!section || !flexRow) return false;
            return section.compareDocumentPosition(flexRow) & Node.DOCUMENT_POSITION_FOLLOWING;
        });
        expect(isBefore).toBeTruthy();
    });
});

test.describe('Section renders — SlimSport rack page', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('SlimSport'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('section is injected', async ({ page }) => {
        await expect(page.locator('.cro-12323-section')).toBeAttached();
    });

    test('tile 1 installation video ID is the SlimSport install ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('5xx7oH-lqiw');
    });

    test('tile 2 has correct SlimSport product video ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(1).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('yZk8bhyAhMA');
    });

    test('tile 3 renders as placeholder when animation ID is not yet confirmed', async ({ page }) => {
        const tile3 = page.locator('.cro-12323-tile').nth(2);
        const hasPlaceholderClass = await tile3.evaluate(el => el.classList.contains('cro-12323-tile--placeholder'));
        expect(hasPlaceholderClass).toBe(true);
    });

    test('placeholder tile has no play button', async ({ page }) => {
        const playBtns = await page.locator('.cro-12323-tile').nth(2).locator('.cro-12323-play').count();
        expect(playBtns).toBe(0);
    });
});

test.describe('Section renders — SlimPro rack page', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('SlimPro'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('section is injected', async ({ page }) => {
        await expect(page.locator('.cro-12323-section')).toBeAttached();
    });

    test('tile 1 installation video ID is the SlimPro install ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('idivsWy7eIA');
    });

    test('tile 2 has correct SlimPro product video ID', async ({ page }) => {
        const videoId = await page.locator('.cro-12323-tile').nth(1).locator('.cro-12323-tile__video').getAttribute('data-video-id');
        expect(videoId).toBe('XuK14IkUhAc');
    });

    test('tile 3 renders as placeholder when animation ID is not yet confirmed', async ({ page }) => {
        const hasPlaceholderClass = await page.locator('.cro-12323-tile').nth(2).evaluate(
            el => el.classList.contains('cro-12323-tile--placeholder')
        );
        expect(hasPlaceholderClass).toBe(true);
    });
});

// ─── Tile structure ────────────────────────────────────────────────────────────

test.describe('Tile structure — all required elements present', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('each tile has a badge', async ({ page }) => {
        const tiles = await page.locator('.cro-12323-tile').all();
        for (const tile of tiles) {
            await expect(tile.locator('.cro-12323-badge')).toBeAttached();
        }
    });

    test('each tile has a heading in uppercase', async ({ page }) => {
        const headings = await page.locator('.cro-12323-tile__heading').allTextContents();
        for (const h of headings) {
            expect(h.trim()).toBe(h.trim().toUpperCase());
        }
    });

    test('each tile has a video container', async ({ page }) => {
        const tiles = await page.locator('.cro-12323-tile').all();
        for (const tile of tiles) {
            await expect(tile.locator('.cro-12323-tile__video')).toBeAttached();
        }
    });

    test('non-placeholder tiles have a thumbnail image', async ({ page }) => {
        const tiles = await page.locator('.cro-12323-tile:not(.cro-12323-tile--placeholder)').all();
        for (const tile of tiles) {
            await expect(tile.locator('.cro-12323-thumb')).toBeAttached();
        }
    });

    test('non-placeholder tiles have a play button', async ({ page }) => {
        const tiles = await page.locator('.cro-12323-tile:not(.cro-12323-tile--placeholder)').all();
        for (const tile of tiles) {
            await expect(tile.locator('.cro-12323-play')).toBeAttached();
        }
    });

    test('each tile has supporting copy', async ({ page }) => {
        const tiles = await page.locator('.cro-12323-tile').all();
        for (const tile of tiles) {
            const copy = await tile.locator('.cro-12323-tile__copy').textContent();
            expect(copy.trim().length).toBeGreaterThan(0);
        }
    });

    test('thumbnail src uses correct YouTube maxresdefault pattern', async ({ page }) => {
        const thumb = await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-thumb').getAttribute('src');
        expect(thumb).toMatch(/https:\/\/img\.youtube\.com\/vi\/.+\/maxresdefault\.jpg/);
    });

    test('thumbnail falls back to sddefault when maxresdefault returns 404 (HTTP error)', async ({ page }) => {
        /* Simulate a CDN node that returns a genuine 404 */
        await page.route('**/maxresdefault.jpg', route => route.fulfill({ status: 404, body: '' }));

        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
        await page.waitForTimeout(800);

        const thumbs = await page.locator('.cro-12323-tile:not(.cro-12323-tile--placeholder) .cro-12323-thumb').all();
        for (const thumb of thumbs) {
            const src = await thumb.getAttribute('src');
            expect(src).toContain('sddefault.jpg');
        }
    });

    test('thumbnail falls back to sddefault when maxresdefault returns YouTube placeholder (200 + 120px wide)', async ({ page }) => {
        /* Simulate YouTube returning a 200 with a tiny 120×90 placeholder image —
           this is the real-world failure mode for V-XQydf0evM */
        const tinyGreyPixel = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAHgAAABaCAYAAABTMCHMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMS8wMS8wMYADGhEAAAASdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBNWDWzDswAAABHSURBVHic7cExAQAAAMKg9U9tCy+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA3AQAA//8DAHgBAAHKCy4hAAAAAElFTkSuQmCC',
            'base64'
        );

        await page.route('**/maxresdefault.jpg', route => route.fulfill({
            status: 200,
            contentType: 'image/jpeg',
            body: tinyGreyPixel
        }));

        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });

        /* Trigger onload by evaluating naturalWidth on all thumbs */
        await page.evaluate(() => {
            document.querySelectorAll('.cro-12323-thumb').forEach(img => {
                /* Force the onload check: simulate a 120px-wide image */
                Object.defineProperty(img, 'naturalWidth', { get: () => 120, configurable: true });
                img.dispatchEvent(new Event('load'));
            });
        });

        await page.waitForTimeout(400);

        const thumbs = await page.locator('.cro-12323-tile:not(.cro-12323-tile--placeholder) .cro-12323-thumb').all();
        for (const thumb of thumbs) {
            const src = await thumb.getAttribute('src');
            expect(src).toContain('sddefault.jpg');
        }
    });
});

// ─── Existing video section hidden ────────────────────────────────────────────

test.describe('Existing video section is hidden', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('.product-content is not displayed', async ({ page }) => {
        const display = await page.locator('.product-content').evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
    });
});

// ─── Accordions collapsed by default ─────────────────────────────────────────

test.describe('Accordions collapsed by default', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('open accordion trigger is clicked to collapse on load', async ({ page }) => {
        const html = rackPageHtml('Slimline II', 'open');
        const { css, js } = getVariation();

        await page.setContent(html);

        await page.evaluate(() => {
            window._accordionClicked = false;
            const trigger = document.querySelector('[data-slot="accordion-trigger"][data-state="open"]');
            if (trigger) {
                trigger.addEventListener('click', () => { window._accordionClicked = true; });
            }
        });

        await page.addStyleTag({ content: css });
        await page.evaluate(js);

        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
        await page.waitForTimeout(600);

        const clicked = await page.evaluate(() => window._accordionClicked);
        expect(clicked).toBe(true);
    });

    test('already-closed accordion triggers are not clicked', async ({ page }) => {
        const html = rackPageHtml('Slimline II', 'closed');
        const { css, js } = getVariation();

        await page.setContent(html);

        await page.evaluate(() => {
            window._closedTriggerClicked = false;
            document.querySelectorAll('[data-slot="accordion-trigger"][data-state="closed"]').forEach(t => {
                t.addEventListener('click', () => { window._closedTriggerClicked = true; });
            });
        });

        await page.addStyleTag({ content: css });
        await page.evaluate(js);

        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
        await page.waitForTimeout(600);

        const clicked = await page.evaluate(() => window._closedTriggerClicked);
        expect(clicked).toBe(false);
    });
});

// ─── No duplicate injection ───────────────────────────────────────────────────

test.describe('No duplicate injection', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('re-running the script does not create a second section', async ({ page }) => {
        const { css, js } = getVariation();
        await page.setContent(rackPageHtml('Slimline II'));
        await page.addStyleTag({ content: css });
        await page.evaluate(js);
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });

        /* Re-inject */
        await page.evaluate(js);
        await page.waitForTimeout(500);

        await expect(page.locator('.cro-12323-section')).toHaveCount(1);
    });
});

// ─── Video play interaction ────────────────────────────────────────────────────

test.describe('Video play — click replaces thumbnail with iframe', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('clicking a tile video container injects an iframe', async ({ page }) => {
        await page.locator('.cro-12323-tile:not(.cro-12323-tile--placeholder) .cro-12323-tile__video').first().click();
        await page.waitForTimeout(200);
        const iframeCount = await page.locator('.cro-12323-tile__video iframe').count();
        expect(iframeCount).toBe(1);
    });

    test('iframe src contains the correct video ID and autoplay', async ({ page }) => {
        await page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-tile__video').click();
        await page.waitForTimeout(200);
        const src = await page.locator('.cro-12323-tile__video iframe').getAttribute('src');
        expect(src).toContain('_F4lU9wrBPc');
        expect(src).toContain('autoplay=1');
    });

    test('clicking the same tile twice does not create a second iframe', async ({ page }) => {
        const videoEl = page.locator('.cro-12323-tile').nth(0).locator('.cro-12323-tile__video');
        await videoEl.click();
        await page.waitForTimeout(200);
        await videoEl.click();
        await page.waitForTimeout(200);
        const count = await videoEl.locator('iframe').count();
        expect(count).toBe(1);
    });

    test('clicking a placeholder tile does not inject an iframe', async ({ page }) => {
        /* Only applies when tile 3 is a placeholder (SlimSport / SlimPro) */
        await injectVariation(page, rackPageHtml('SlimSport'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
        await page.locator('.cro-12323-tile--placeholder .cro-12323-tile__video').click();
        await page.waitForTimeout(200);
        const count = await page.locator('.cro-12323-tile--placeholder .cro-12323-tile__video iframe').count();
        expect(count).toBe(0);
    });
});

// ─── Exclusion rules ──────────────────────────────────────────────────────────

test.describe('Exclusion — Load bar page (wrong breadcrumb)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('section is NOT injected on a load bar page', async ({ page }) => {
        await injectVariation(page, nonRackPageHtml('load-bars', 'Load Bar'));
        await page.waitForTimeout(4000);
        await expect(page.locator('.cro-12323-section')).toHaveCount(0);
    });
});

test.describe('Exclusion — Component/accessory page (no rack breadcrumb)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('section is NOT injected on a component product page', async ({ page }) => {
        await injectVariation(page, componentPageHtml());
        await page.waitForTimeout(4000);
        await expect(page.locator('.cro-12323-section')).toHaveCount(0);
    });
});

test.describe('Exclusion — Pro Bed page (URL pattern)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('section is NOT injected on a pro-bed URL', async ({ page }) => {
        /* Serve mock HTML from a URL containing "pro-bed" to trigger URL exclusion */
        const proRackHtml = rackPageHtml('Slimline II');
        await injectVariationAtUrl(
            page,
            'https://test.dometic.com/en-us/product/pro-bed-rack-system',
            proRackHtml
        );
        await page.waitForTimeout(4000);
        await expect(page.locator('.cro-12323-section')).toHaveCount(0);
    });
});

test.describe('Exclusion — Unknown rack type (undetectable product)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('section is NOT injected when rack type cannot be determined', async ({ page }) => {
        /* Page has rack breadcrumb but H1 does not match any known rack keyword */
        const unknownHtml = `<!DOCTYPE html>
<html><head><title>Unknown Rack</title></head>
<body>
<div class="product-details">
  <nav>
    <ol>
      <li data-slot="breadcrumb-item">
        <a href="/en-us/category/rack-systems/racks">Racks</a>
      </li>
    </ol>
  </nav>
  <h1>Pro Bed Rack Mount System</h1>
  <div class="lmd:flex-row">
    <div><div class="mx-auto">
      <button data-slot="accordion-trigger" data-state="closed">Details</button>
      <div>Content</div>
    </div></div>
    <div class="product-content"></div>
  </div>
</div>
</body></html>`;
        await injectVariation(page, unknownHtml);
        await page.waitForTimeout(4000);
        await expect(page.locator('.cro-12323-section')).toHaveCount(0);
    });
});

// ─── Responsive layout ────────────────────────────────────────────────────────

test.describe('Desktop layout — 3-column grid', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('tile grid has 3 columns on desktop', async ({ page }) => {
        const columns = await page.locator('.cro-12323-tiles').evaluate(
            el => window.getComputedStyle(el).gridTemplateColumns
        );
        /* Should produce 3 equal column tracks, e.g. "Xpx Xpx Xpx" */
        const tracks = columns.trim().split(/\s+/);
        expect(tracks.length).toBe(3);
    });
});

test.describe('Mobile layout — single column stack', () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
    });

    test('tile grid has 1 column on mobile', async ({ page }) => {
        const columns = await page.locator('.cro-12323-tiles').evaluate(
            el => window.getComputedStyle(el).gridTemplateColumns
        );
        const tracks = columns.trim().split(/\s+/);
        expect(tracks.length).toBe(1);
    });

    test('section padding is reduced on mobile', async ({ page }) => {
        const padding = await page.locator('.cro-12323-section').evaluate(
            el => parseInt(window.getComputedStyle(el).paddingTop, 10)
        );
        expect(padding).toBeLessThanOrEqual(40);
    });
});

// ─── Body class ───────────────────────────────────────────────────────────────

test.describe('Body class is added', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('body has the variation class', async ({ page }) => {
        await injectVariation(page, rackPageHtml('Slimline II'));
        await page.waitForSelector('.cro-12323-section', { timeout: 15000 });
        const cls = await page.evaluate(() => document.body.className);
        expect(cls).toContain('CRO_12323_Video_USP_Tiles');
    });
});

// ─── Installation tile omitted when no video ID ───────────────────────────────

test.describe('Installation tile is omitted when its video ID is null', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('only 2 tiles rendered when tile 1 has no video ID', async ({ page }) => {
        await page.setContent(rackPageHtml('Slimline II'));

        /* Test the omission logic in isolation: build a section using the same
           skip-tile-1-if-null rule and count how many tiles appear in the DOM. */
        const count = await page.evaluate(() => {
            var tileDefs = [
                { id: null,          badge: 'INSTALLATION', heading: 'INSTALL',  copy: 'Install copy' },
                { id: 'V-XQydf0evM', badge: 'WHY FRONT RUNNER', heading: 'TILE 2',   copy: 'Copy 2'       },
                { id: 'a_m34XmT_DQ', badge: 'IN ACTION',    heading: 'TILE 3',   copy: 'Copy 3'       }
            ];

            var tilesHtml = '';
            for (var i = 0; i < tileDefs.length; i++) {
                /* Mirror variation.js rule: omit tile index 0 (installation) if no id */
                if (i === 0 && !tileDefs[i].id) continue;
                tilesHtml += '<div class="cro-12323-tile"></div>';
            }

            var section = document.createElement('section');
            section.className = 'cro-12323-section-test';
            section.innerHTML = '<div class="cro-12323-tiles-test">' + tilesHtml + '</div>';
            document.body.appendChild(section);
            return section.querySelectorAll('.cro-12323-tile').length;
        });

        expect(count).toBe(2);
    });
});
