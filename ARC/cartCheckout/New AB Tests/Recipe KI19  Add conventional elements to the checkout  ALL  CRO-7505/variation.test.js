const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const FOLDER = __dirname;

const BLUE       = 'rgb(24, 65, 196)';   // #1841C4
const DARK       = 'rgb(33, 33, 33)';    // #212121
const GREY_BG    = 'rgb(250, 250, 250)'; // #FAFAFA
const GREY_CIRC  = 'rgb(224, 224, 231)'; // #E0E0E7
const BLUE_FILL  = 'rgb(31, 79, 255)';   // #1f4fff  completed circle
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

function getVariation() {
    const css = fs.readFileSync(path.join(FOLDER, 'variation.css'), 'utf8');
    const js  = fs.readFileSync(path.join(FOLDER, 'variation.js'),  'utf8');
    return { css, js };
}

// ─── Mock HTML ────────────────────────────────────────────────────────────

function myBagHtml() {
    return `<!DOCTYPE html>
<html><head><title>My Bag</title></head>
<body class="cro_My_Bag">
  <div id="Block__StepBar"></div>
  <div id="Block__OrderContainerRow">
    <div id="Cart">
      <div class="card">
        <div class="grid u-border-top">
          <div class="grid__col-sm-9"></div>
          <div class="grid__col-sm-3">
            <table>
              <tr><td>Subtotal</td><td>R 449.00</td></tr>
              <tr><td>Total</td><td>R 499.00</td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div id="Block__StepNavigation">
      <div class="card">
        <div class="u-pull--left u-clear--left">
          <a href="#"><span><i class="fas fa-chevron-left"></i>Continue Shopping</span></a>
        </div>
        <div class="u-pull--left">
          <button type="button">Continue to Delivery</button>
        </div>
      </div>
    </div>
  </div>
  <div class="cart-summary__totals-container dw-mod">
    <div class="cart-summary__totals dw-mod">Total</div>
    <div class="cart-summary__totals u-pull--right dw-mod">R 499.00</div>
  </div>
  <div>
    <div class="cart-summary__subtotals u-discount-description dw-mod">Treats &amp; Savings</div>
    <div class="cart-summary__subtotals u-discount-price u-pull--right dw-mod">-R 50.00</div>
  </div>
  <span id="cartCounter">2</span>
</body></html>`;
}

function deliveryHtml() {
    return `<!DOCTYPE html>
<html><head><title>Delivery</title></head>
<body class="cro_Delivery">
  <div id="Block__StepBar"></div>
  <div id="Block__OrderContainerRow">
    <div class="card">
      <div class="u-pull--left u-clear--left">
        <button type="button"><i class="fas fa-chevron-left"></i>Back to Basket</button>
      </div>
      <div class="u-pull--left">
        <button type="button">Continue to Payment</button>
      </div>
    </div>
    <div id="Block__SummaryContainer">
      <div id="Block__StaticSummary"></div>
    </div>
    <div id="Block__StepNavigation">
      <div class="card">
        <div class="u-pull--left u-clear--left">
          <button type="button"><i class="fas fa-chevron-left"></i>Back to Basket</button>
        </div>
        <div class="u-pull--left">
          <button type="button">Continue to Payment</button>
        </div>
      </div>
    </div>
  </div>
  <div class="order-summary-body-container">
    <table>
      <tr><td>Subtotal</td><td>R 499.00</td></tr>
      <tr><td>Total</td><td>R 499.00</td></tr>
    </table>
  </div>
  <div class="u-billing-card-body">
    <button title="Already a customer?">Login</button>
  </div>
</body></html>`;
}

function paymentHtml() {
    return `<!DOCTYPE html>
<html><head><title>Payment</title></head>
<body class="cro_Payment">
  <div id="Block__StepBar"></div>
  <div id="Block__SummaryContainerRow"></div>
  <div id="Block__OrderContainerRow">
    <div id="Block__StepNavigation">
      <div class="card">
        <div class="u-pull--left u-clear--left">
          <button type="button"><i class="fas fa-chevron-left"></i>Back to Delivery</button>
        </div>
        <div class="u-pull--left">
          <button type="button">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card u-color-light--bg order-summary-body-container dw-mod">
    <table>
      <tr><td>Subtotal</td><td>R 499.00</td></tr>
      <tr><td>Total</td><td>R 499.00</td></tr>
    </table>
  </div>
  <div class="u-coupon-card-body dw-mod">
    <div>
      <div class="form__field-combi"><input id="CouponCode" type="text" /></div>
      <button id="CouponApply">Apply</button>
      <button id="btnCouponRemove">Remove</button>
    </div>
  </div>
  <div id="Block__GiftCard">
    <div class="u-voucher-card-body dw-mod">
      <div>
        <div class="form__field-combi"><input id="LsGiftCardCode" type="text" /></div>
        <button id="btnGiftCardApply">Apply</button>
        <button id="btnGiftCardRemove">Remove</button>
      </div>
    </div>
  </div>
  <div id="Block__ClicksClubCard">
    <div class="card dw-mod">
      <div>
        <div class="form__field-combi"><input id="RoyaltyNumber" type="text" /></div>
        <button id="OrderRoyaltyApply">Apply ClubCard</button>
      </div>
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

// ─── Spec 1 / 6 / 13 — Progress Wizard ───────────────────────────────────

test.describe('Steps Wizard — My Bag (Spec §1)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('renders 3 step indicators', async ({ page }) => {
        await expect(page.locator('.cro-step')).toHaveCount(3);
    });

    test('step labels are My Bag, Delivery, Payment', async ({ page }) => {
        const labels = await page.locator('.cro-step-label').allTextContents();
        expect(labels.map(l => l.trim())).toEqual(['My Bag', 'Delivery', 'Payment']);
    });

    test('step 1 (My Bag) is active', async ({ page }) => {
        const active = await page.locator('.cro-step.active .cro-step-label').textContent();
        expect(active.trim()).toBe('My Bag');
    });

    test('steps 2 and 3 are inactive', async ({ page }) => {
        const steps = await page.locator('.cro-step').all();
        for (const [i, step] of steps.entries()) {
            if (i === 0) continue;
            const cls = await step.getAttribute('class');
            expect(cls).not.toContain('active');
            expect(cls).not.toContain('completed');
        }
    });

    test('inactive step circles have grey background', async ({ page }) => {
        const bg = await page.locator('.cro-step').nth(1).locator('.cro-step-circle').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(GREY_CIRC);
    });

    test('active step circle has blue border', async ({ page }) => {
        const borderColor = await page.locator('.cro-step.active .cro-step-circle').evaluate(
            el => window.getComputedStyle(el).borderColor
        );
        expect(borderColor).toBe(BLUE);
    });

    test('active step label has blue text', async ({ page }) => {
        const color = await page.locator('.cro-step.active .cro-step-label').evaluate(
            el => window.getComputedStyle(el).color
        );
        expect(color).toBe('rgb(13, 61, 204)');
    });

    test('native platform step bar is hidden', async ({ page }) => {
        const display = await page.locator('#Block__StepBar').evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
    });

    test('progress fill is 0% on step 1', async ({ page }) => {
        const width = await page.locator('.cro-progress-fill').evaluate(el => el.style.width);
        expect(width).toBe('0%');
    });
});

test.describe('Steps Wizard — Delivery (Spec §6)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, deliveryHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('step 1 (My Bag) is completed', async ({ page }) => {
        const cls = await page.locator('.cro-step').first().getAttribute('class');
        expect(cls).toContain('completed');
    });

    test('completed step shows checkmark, hides number', async ({ page }) => {
        const checkDisplay = await page.locator('.cro-step.completed .cro-step-check').first().evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(checkDisplay).toBe('block');

        const numDisplay = await page.locator('.cro-step.completed .cro-step-number').first().evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(numDisplay).toBe('none');
    });

    test('completed step circle has blue fill', async ({ page }) => {
        const bg = await page.locator('.cro-step.completed .cro-step-circle').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(BLUE_FILL);
    });

    test('step 2 (Delivery) is active', async ({ page }) => {
        const active = await page.locator('.cro-step.active .cro-step-label').textContent();
        expect(active.trim()).toBe('Delivery');
    });

    test('step 3 (Payment) is inactive', async ({ page }) => {
        const cls = await page.locator('.cro-step').nth(2).getAttribute('class');
        expect(cls).not.toContain('active');
        expect(cls).not.toContain('completed');
    });

    test('progress fill is 50% on step 2', async ({ page }) => {
        const width = await page.locator('.cro-progress-fill').evaluate(el => el.style.width);
        expect(width).toBe('50%');
    });

    test('native platform step bar is hidden', async ({ page }) => {
        const display = await page.locator('#Block__StepBar').evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
    });
});

test.describe('Steps Wizard — Payment (Spec §13)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, paymentHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('steps 1 and 2 are completed', async ({ page }) => {
        await expect(page.locator('.cro-step.completed')).toHaveCount(2);
    });

    test('all completed steps show checkmarks', async ({ page }) => {
        const checks = await page.locator('.cro-step.completed .cro-step-check').all();
        for (const check of checks) {
            const display = await check.evaluate(el => window.getComputedStyle(el).display);
            expect(display).toBe('block');
        }
    });

    test('step 3 (Payment) is active', async ({ page }) => {
        const active = await page.locator('.cro-step.active .cro-step-label').textContent();
        expect(active.trim()).toBe('Payment');
    });

    test('progress fill is 100% on step 3', async ({ page }) => {
        const width = await page.locator('.cro-progress-fill').evaluate(el => el.style.width);
        expect(width).toBe('100%');
    });

    test('native platform step bar is hidden', async ({ page }) => {
        const display = await page.locator('#Block__StepBar').evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
    });
});

// ─── Spec 4 — Order Summary (Cart) ────────────────────────────────────────

test.describe('Order Summary — My Bag (Spec §4)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_checkout_btn', { timeout: 10000 });
    });

    test('order summary column has grey background', async ({ page }) => {
        const bg = await page.locator('#Cart .card>.grid.u-border-top .grid__col-sm-3').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(GREY_BG);
    });

    test('checkout CTA is injected into order summary column', async ({ page }) => {
        const inside = await page.evaluate(() => {
            const col = document.querySelector('#Cart .card>.grid.u-border-top .grid__col-sm-3');
            return col && col.querySelector('.cro_checkout_btn') !== null;
        });
        expect(inside).toBe(true);
    });

    test('checkout CTA label is "Continue"', async ({ page }) => {
        const label = await page.locator('.cro_checkout_btn span').textContent();
        expect(label.trim()).toBe('Continue');
    });

    test('checkout CTA has dark filled background', async ({ page }) => {
        const bg = await page.locator('.cro_checkout_btn').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(DARK);
    });

    test('checkout CTA is not duplicated on re-inject', async ({ page }) => {
        const { js } = getVariation();
        await page.evaluate(js);
        await page.waitForTimeout(500);
        await expect(page.locator('.cro_checkout_btn')).toHaveCount(1);
    });
});

// ─── Spec 5 — Back button (text-only) + native forward button ──────────────

test.describe('Back button & native forward button — My Bag (Spec §5 revised)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('native forward button is visible (not hidden)', async ({ page }) => {
        const display = await page.locator(
            '#Block__StepNavigation .u-pull--left:not(.u-clear--left) button'
        ).evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
    });

    test('native forward button has dark filled background', async ({ page }) => {
        const bg = await page.locator(
            '#Block__StepNavigation .u-pull--left:not(.u-clear--left) button'
        ).evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(bg).toBe(DARK);
    });

    test('native forward button has no border', async ({ page }) => {
        const borderStyle = await page.locator(
            '#Block__StepNavigation .u-pull--left:not(.u-clear--left) button'
        ).evaluate(el => window.getComputedStyle(el).borderStyle);
        expect(borderStyle).toBe('none');
    });

    test('nav card is flex with space-between (right-aligned layout)', async ({ page }) => {
        const justifyContent = await page.locator('#Block__StepNavigation .card').evaluate(
            el => window.getComputedStyle(el).justifyContent
        );
        expect(justifyContent).toBe('space-between');
    });

    test('back link (Continue Shopping) has blue text', async ({ page }) => {
        const color = await page.locator('#Block__StepNavigation a span').evaluate(
            el => window.getComputedStyle(el).color
        );
        expect(color).toBe(BLUE);
    });

    test('back link span has no border', async ({ page }) => {
        const borderStyle = await page.locator('#Block__StepNavigation a span').evaluate(
            el => window.getComputedStyle(el).borderStyle
        );
        expect(borderStyle).toBe('none');
    });

    test('back link chevron (i) is not hidden', async ({ page }) => {
        const display = await page.locator('#Block__StepNavigation a span i').evaluate(
            el => window.getComputedStyle(el).display
        );
        expect(display).not.toBe('none');
    });
});

// ─── Spec 8 — Order Summary Delivery Desktop ──────────────────────────────

test.describe('Order Summary — Delivery Desktop (Spec §8)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, deliveryHtml());
        await page.waitForSelector('.cro_payment_btn', { timeout: 10000 });
    });

    test('order summary container has grey background', async ({ page }) => {
        const bg = await page.locator('#Block__SummaryContainer').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(GREY_BG);
    });

    test('"Continue to Payment" CTA label is now "Continue"', async ({ page }) => {
        const label = await page.locator('.cro_payment_btn span').textContent();
        expect(label.trim()).toBe('Continue');
    });

    test('"Continue" CTA has dark filled background', async ({ page }) => {
        const bg = await page.locator('.cro_payment_btn span').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(DARK);
    });

    test('delivery icon heading injected', async ({ page }) => {
        await page.waitForSelector('.cro_delivery_heading', { timeout: 10000 });
        await expect(page.locator('.cro_delivery_heading')).toBeAttached();
    });

    test('delivery heading label text is "Delivery"', async ({ page }) => {
        await page.waitForSelector('.cro_delivery_heading', { timeout: 10000 });
        const label = await page.locator('.cro_delivery_heading .mybasket').textContent();
        expect(label.trim()).toBe('Delivery');
    });

    test('native forward button is visible on delivery', async ({ page }) => {
        const display = await page.locator(
            '#Block__OrderContainerRow .card .u-pull--left:not(.u-clear--left)'
        ).first().evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
    });

    test('delivery nav card is flex space-between (right-aligned)', async ({ page }) => {
        const justifyContent = await page.locator(
            '#Block__OrderContainerRow .card'
        ).first().evaluate(el => window.getComputedStyle(el).justifyContent);
        expect(justifyContent).toBe('space-between');
    });
});

// ─── Spec 10 — Already a Customer ─────────────────────────────────────────

test.describe('"Already a customer?" — Delivery (Spec §10)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, deliveryHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('button has blue border', async ({ page }) => {
        const borderColor = await page.locator(
            '.u-billing-card-body button[title*="Already a customer?"]'
        ).evaluate(el => window.getComputedStyle(el).borderColor);
        expect(borderColor).toBe(BLUE);
    });

    test('button has blue text', async ({ page }) => {
        const color = await page.locator(
            '.u-billing-card-body button[title*="Already a customer?"]'
        ).evaluate(el => window.getComputedStyle(el).color);
        expect(color).toBe(BLUE);
    });

    test('button has no filled background', async ({ page }) => {
        const bg = await page.locator(
            '.u-billing-card-body button[title*="Already a customer?"]'
        ).evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(bg).toBe(TRANSPARENT);
    });
});

// ─── Spec 12 — Back button text-only (Delivery) ───────────────────────────

test.describe('Back button — Delivery (Spec §12 revised)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, deliveryHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('back button has blue text', async ({ page }) => {
        const color = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).color);
        expect(color).toBe(BLUE);
    });

    test('back button has no border', async ({ page }) => {
        const borderStyle = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).borderStyle);
        expect(borderStyle).toBe('none');
    });

    test('back button has transparent background', async ({ page }) => {
        const bg = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(bg).toBe(TRANSPARENT);
    });

    test('back button chevron (i) is visible', async ({ page }) => {
        const display = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button i'
        ).evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
    });
});

// ─── Spec 15 — Order Summary Payment Desktop ──────────────────────────────

test.describe('Order Summary — Payment Desktop (Spec §15)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, paymentHtml());
        await page.waitForSelector('.cro_pay_btn', { timeout: 10000 });
    });

    test('summary container row has grey background', async ({ page }) => {
        const bg = await page.locator('#Block__SummaryContainerRow').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(GREY_BG);
    });

    test('"Pay" CTA injected into order summary', async ({ page }) => {
        await expect(page.locator('.cro_pay_btn')).toBeAttached();
    });

    test('"Pay" CTA has dark filled background', async ({ page }) => {
        const bg = await page.locator('.cro_pay_btn span').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(DARK);
    });

    test('"Pay" CTA label is "Pay"', async ({ page }) => {
        const label = await page.locator('.cro_pay_btn span').textContent();
        expect(label.trim()).toBe('Pay');
    });

    test('payment heading injected', async ({ page }) => {
        await page.waitForSelector('.cro_payment_heading', { timeout: 10000 });
        await expect(page.locator('.cro_payment_heading')).toBeAttached();
    });

    test('payment heading label text is "Payment"', async ({ page }) => {
        await page.waitForSelector('.cro_payment_heading', { timeout: 10000 });
        const label = await page.locator('.cro_payment_heading .mybasket').textContent();
        expect(label.trim()).toBe('Payment');
    });

    test('gift card input placeholder is set', async ({ page }) => {
        await page.waitForTimeout(500);
        const placeholder = await page.locator('#LsGiftCardCode').getAttribute('placeholder');
        expect(placeholder).toBe('Enter gift card code');
    });

    test('native forward button is visible on payment', async ({ page }) => {
        const display = await page.locator(
            '#Block__StepNavigation .card .u-pull--left:not(.u-clear--left)'
        ).evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
    });

    test('payment nav card is flex space-between (right-aligned)', async ({ page }) => {
        const justifyContent = await page.locator(
            '#Block__StepNavigation .card'
        ).evaluate(el => window.getComputedStyle(el).justifyContent);
        expect(justifyContent).toBe('space-between');
    });
});

// ─── Spec 18 — Back button text-only (Payment) ────────────────────────────

test.describe('Back button — Payment (Spec §18 revised)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, paymentHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('back button has blue text', async ({ page }) => {
        const color = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).color);
        expect(color).toBe(BLUE);
    });

    test('back button has no border', async ({ page }) => {
        const borderStyle = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).borderStyle);
        expect(borderStyle).toBe('none');
    });

    test('back button has transparent background', async ({ page }) => {
        const bg = await page.locator(
            '#Block__StepNavigation .card .u-pull--left.u-clear--left button'
        ).evaluate(el => window.getComputedStyle(el).backgroundColor);
        expect(bg).toBe(TRANSPARENT);
    });
});

// ─── Spec 17 — Coupon / Gift Card / ClubCard ─────────────────────────────

test.describe('Coupon / Gift Card / ClubCard buttons (Spec §17)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, paymentHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
    });

    test('Apply Coupon button has blue border', async ({ page }) => {
        const borderColor = await page.locator('#CouponApply').evaluate(
            el => window.getComputedStyle(el).borderColor
        );
        expect(borderColor).toBe(BLUE);
    });

    test('Apply Coupon button has no filled background', async ({ page }) => {
        const bg = await page.locator('#CouponApply').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(TRANSPARENT);
    });

    test('Apply Gift Card button has blue border', async ({ page }) => {
        const borderColor = await page.locator('#btnGiftCardApply').evaluate(
            el => window.getComputedStyle(el).borderColor
        );
        expect(borderColor).toBe(BLUE);
    });

    test('Apply Gift Card button has no filled background', async ({ page }) => {
        const bg = await page.locator('#btnGiftCardApply').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(TRANSPARENT);
    });

    test('Apply ClubCard button has blue border', async ({ page }) => {
        const borderColor = await page.locator('#OrderRoyaltyApply').evaluate(
            el => window.getComputedStyle(el).borderColor
        );
        expect(borderColor).toBe(BLUE);
    });

    test('Apply ClubCard button has blue text', async ({ page }) => {
        const color = await page.locator('#OrderRoyaltyApply').evaluate(
            el => window.getComputedStyle(el).color
        );
        expect(color).toBe(BLUE);
    });

    test('Apply ClubCard button has no filled background', async ({ page }) => {
        const bg = await page.locator('#OrderRoyaltyApply').evaluate(
            el => window.getComputedStyle(el).backgroundColor
        );
        expect(bg).toBe(TRANSPARENT);
    });
});

// ─── Price display (desktop) ──────────────────────────────────────────────

test.describe('Price display — desktop (next to forward button)', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('price display injected inside forward wrapper on My Bag', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        // Must be a child of the forward wrapper (afterbegin insertion)
        const isInsideWrapper = await page.evaluate(() => {
            const pd = document.querySelector('.cro_price_display');
            return pd && pd.closest('.u-pull--left:not(.u-clear--left)') !== null;
        });
        expect(isInsideWrapper).toBe(true);
    });

    test('price display shows total value from cart-summary__totals-container', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        const value = await page.locator('.cro_price_display .cro_value').textContent();
        expect(value.trim()).toContain('R 499.00');
    });

    test('total label is "Total" and is bold dark #212121', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        const label = await page.locator('.cro_price_display .cro_label').textContent();
        expect(label.trim()).toBe('Total');
        const color = await page.locator('.cro_price_display .cro_label').evaluate(
            el => window.getComputedStyle(el).color
        );
        expect(color).toBe('rgb(33, 33, 33)');
        const weight = await page.locator('.cro_price_display .cro_label').evaluate(
            el => window.getComputedStyle(el).fontWeight
        );
        expect(weight).toBe('700');
    });

    test('price display shows Treats & Savings row in pink #ED5EAA', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        const count = await page.locator('.cro_price_display .cro_savings_row').count();
        expect(count).toBe(1);
        const color = await page.locator('.cro_price_display .cro_savings_label').evaluate(
            el => window.getComputedStyle(el).color
        );
        expect(color).toBe('rgb(237, 94, 170)');
    });

    test('price display updates when cart-summary__totals-container mutates', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        await page.evaluate(() => {
            const valueEl = document.querySelector('.cart-summary__totals-container .u-pull--right');
            if (valueEl) valueEl.textContent = 'R 599.00';
        });
        await page.waitForTimeout(300);
        const value = await page.locator('.cro_price_display .cro_value').textContent();
        expect(value.trim()).toContain('R 599.00');
    });

    test('price display is hidden on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
        await page.waitForTimeout(500);
        const els = await page.locator('.cro_price_display').all();
        for (const el of els) {
            const display = await el.evaluate(e => window.getComputedStyle(e).display);
            expect(display).toBe('none');
        }
    });

    test('forward nav wrapper has flex layout for price + button', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_price_display', { timeout: 10000 });
        const display = await page.locator(
            '#Block__StepNavigation .card .u-pull--left:not(.u-clear--left)'
        ).evaluate(el => window.getComputedStyle(el).display);
        expect(display).toBe('flex');
    });
});

// ─── CTA click handler ────────────────────────────────────────────────────

test.describe('CTA click handlers', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('clicking checkout CTA triggers native checkout button', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro_checkout_btn', { timeout: 10000 });

        await page.evaluate(() => {
            window._nativeClicked = false;
            document.querySelector('html body.cro_My_Bag #Block__StepNavigation button')
                .addEventListener('click', () => { window._nativeClicked = true; });
        });

        await page.locator('.cro_checkout_btn').click();
        await page.waitForTimeout(200);
        const clicked = await page.evaluate(() => window._nativeClicked);
        expect(clicked).toBe(true);
    });
});

// ─── Mobile — My Bag ──────────────────────────────────────────────────────

test.describe('My Bag — Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test.beforeEach(async ({ page }) => {
        await injectVariation(page, myBagHtml());
    });

    test('progress bar renders', async ({ page }) => {
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
        await expect(page.locator('.cro-progress-wrap')).toBeAttached();
    });

    test('mobile checkout button inserted before navigation block', async ({ page }) => {
        // Custom btn is inserted in DOM but CSS hides it on mobile (native btn is the visible CTA)
        await page.waitForSelector('.cro_checkout_btn', { state: 'attached', timeout: 10000 });
        const label = await page.locator('.cro_checkout_btn span').textContent();
        expect(label.trim()).toBe('Continue');
    });

    test('native forward button is visible on mobile', async ({ page }) => {
        await page.waitForSelector('#Block__StepNavigation .u-pull--left:not(.u-clear--left) button', { timeout: 10000 });
        const display = await page.locator(
            '#Block__StepNavigation .u-pull--left:not(.u-clear--left) button'
        ).evaluate(el => window.getComputedStyle(el).display);
        expect(display).not.toBe('none');
    });
});

// ─── updateProgressBar() fill + active step ──────────────────────────────

test.describe('updateProgressBar() fill and active step', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('step 1: fill = 0%, My Bag active', async ({ page }) => {
        await injectVariation(page, myBagHtml());
        await page.waitForSelector('.cro-progress-wrap', { timeout: 10000 });
        const { fill, label } = await page.evaluate(() => ({
            fill:  document.querySelector('.cro-progress-fill').style.width,
            label: document.querySelector('.cro-step.active .cro-step-label').textContent.trim(),
        }));
        expect(fill).toBe('0%');
        expect(label).toBe('My Bag');
    });

    test('step 2: fill = 50%, Delivery active', async ({ page }) => {
        await injectVariation(page, deliveryHtml());
        await page.waitForSelector('.cro-progress-fill', { timeout: 10000 });
        const { fill, label } = await page.evaluate(() => ({
            fill:  document.querySelector('.cro-progress-fill').style.width,
            label: document.querySelector('.cro-step.active .cro-step-label').textContent.trim(),
        }));
        expect(fill).toBe('50%');
        expect(label).toBe('Delivery');
    });

    test('step 3: fill = 100%, Payment active', async ({ page }) => {
        await injectVariation(page, paymentHtml());
        await page.waitForSelector('.cro-progress-fill', { timeout: 10000 });
        const { fill, label } = await page.evaluate(() => ({
            fill:  document.querySelector('.cro-progress-fill').style.width,
            label: document.querySelector('.cro-step.active .cro-step-label').textContent.trim(),
        }));
        expect(fill).toBe('100%');
        expect(label).toBe('Payment');
    });
});
