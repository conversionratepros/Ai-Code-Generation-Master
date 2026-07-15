# Test Analysis — AB Test | PDP V2 (USPs, keep shipping table) | ALL | CRO-12359

**Client:** JasonL (jasonl.com.au) — B2B/B2C office furniture, Shopify OS 2.0
**Pages:** All product detail pages | **Devices:** Desktop + mobile
**Mechanism:** Intelligems template test — live `product` template (control) vs `product.crp` template (variant)
**Status:** Code-complete 2026-07-13; pending Donavan sign-off on fallback word + OOS row, and Intelligems split/targeting/goals

---

## 1. Hypothesis

> **If** we surface fulfilment-speed and category-relevance USPs at the top of the buy box, keep flat-rate shipping costs visible up front (table expanded by default), remove the competing Buy Now button, and add assembly and returns reassurance below the CTA, **then** more visitors will add to cart / request a quote and proceed to purchase, **because** the two biggest hesitations for office-furniture buyers — "how much is delivery on bulky items?" and "how long until my fitout is usable?" — are answered before the CTA instead of after it, and the remaining risk objections (assembly effort, return risk) are neutralised at the point of decision.

## 2. Rationale — why each change should move the needle

| # | Change | Behavioural lever | Reasoning |
|---|--------|-------------------|-----------|
| 1 | 3-row fulfilment USP list (category word / stock line with date / 10-day fitouts) | Relevance + urgency + concreteness | Generic claims convert worse than specific ones. A category-matched adjective ("Ergonomic", "Adjustable") signals the product fits the buyer's use case; a **dated** delivery promise ("Get it by Wed, 24 Jun") converts an abstract "fast shipping" into a plannable commitment — critical for fitout buyers working to office move-in dates. |
| 2 | Buy Now removed | Choice reduction (Hick's law) | The buy box competes across Add to Cart/Quote, Buy Now, and Back-Order. Buy Now also skips the cart, bypassing the quote journey JasonL's AOV strategy leans on. One fewer decision path should lift the primary actions. Kept from V1. |
| 3 | Assembly notice below CTA | Objection pre-emption | Office furniture's hidden cost is assembly labour. "Nationwide assembly is available during checkout or on quote request" answers the objection at the exact moment of commitment, without adding a click. |
| 4 | Flat-rate shipping table, **expanded by default** (the V2 headline change) | Price transparency / uncertainty reduction | Shipping cost is the #1 late-funnel abandonment driver for bulky goods. V2 bets that *showing* the flat rates ($49/$149/$199) up front beats hiding them behind a click: buyers who fear a $500 freight surprise see a capped, predictable cost without any interaction. The >$10k quote link routes large orders into the high-touch sales flow instead of letting them bounce. |
| 5 | 14-day returns line | Risk reversal | A visible, time-boxed return policy directly below the shipping table lowers the perceived cost of a wrong decision — strongest for first-time buyers who can't sit-test a chair online. |

## 3. What the visitor sees (control → variant)

- **Control:** standard PDP buy box — Add to Quote + Back-Order/ATC, Buy Now (dynamic checkout), old "Basket value / Shipping" rate table, shipping & returns accordion block.
- **Variant:** USP list above price/CTA area → CTA buttons full-width (no Buy Now) → assembly notice → flat-rate shipping table open by default with quote link + nationwide-delivery row → "Return" block. Out-of-stock products show "Estimated availability date: [date]" in row 2 instead of the in-stock line.

## 4. Metrics

**Primary KPI (decide the test):**
- Transaction conversion rate (orders / sessions hitting a PDP), with revenue per visitor as the money metric.

**Secondary KPIs (explain the result):**
- Add-to-Cart rate and Add-to-Quote rate from PDPs (expect ↑ from USPs + fewer buttons)
- Quote requests via the shipping-table Typeform link (new pathway — tag separately from header "Get a quote" if possible)
- Cart→checkout progression (watch for damage from Buy Now removal — Buy Now buyers now take one extra step)
- AOV (quote-journey emphasis should hold or lift it; flat-rate tiers may nudge basket-building toward tier edges, e.g. padding an order to stay under $1,000 is impossible — but consolidating two orders into one is now visibly cheaper)
- PDP bounce/exit rate (transparency should reduce pogo-ing to the shipping info page)

**Guardrails:**
- Checkout completion rate among those who start checkout (Buy Now removal must not tank express-checkout users)
- Back-Order product conversion (the visible availability date could deter — see risks)

## 5. Segments worth splitting in analysis

- **In-stock vs backorder products** — row 2 shows a promise for one group and a delay for the other; effects may run in opposite directions.
- **Category** — the USP word varies by category, and unmapped categories (Whiteboards, Cabling, Accessories…) get the generic fallback "Modular"; if the mapped categories outperform the fallback group, that's evidence the category word itself is doing work (a natural follow-up test).
- **Device** — the expanded table pushes content below the fold further on mobile; mobile may respond differently to the added buy-box length.
- **New vs returning** — reassurance elements (returns, assembly) should matter more to first-time buyers.
- **Order value bands** ($0–1k / 1–2k / 2–10k / 10k+) — maps directly onto the rate tiers and the quote link.

## 6. Risks & trade-offs

1. **Buy Now removal** cuts the fastest path to purchase. If a meaningful share of orders were express-checkout impulse buys, transaction CR could dip even while ATC/quote rates rise. The cart→checkout guardrail is the tell.
2. **Expanded shipping table lengthens the buy box**, pushing description/spec tabs down — most costly on mobile. If mobile engagement with below-the-fold content drops, consider default-collapsed on mobile as a follow-up.
3. **Price salience cuts both ways:** for a $99 chair, a $49 shipping line is a 50% surcharge shown earlier than the control would reveal it. Watch low-price-band conversion specifically.
4. **Backorder visibility:** showing "Estimated availability date" prominently in the USP list is honest and sets expectations, but it advertises the delay higher on the page than control does. (Also the unresolved spec contradiction — flagged to Donavan.)
5. **Fallback word "Modular"** on unmapped categories is category-mismatched copy ("Modular - configurable to your fit-out needs" on a whiteboard); a small credibility risk until Donavan confirms the fallback.

## 7. Measurement / setup notes

- Intelligems drives the split via template assignment; split, targeting, and goals TBC by test owner. No visual-editor setup needed.
- GA4 caveat from CRO-12465: the site's `window.gtag` silently drops events — any custom GA4 events must be pushed as an Arguments object onto the default `dataLayer`. Relevant if we add event tracking for the shipping-table toggle or the >$10k quote link.
- The >$10k link fires the same Typeform as the header (settings-driven), so its submissions land in the existing quote pipeline; if per-source attribution is wanted, that needs a hidden field or separate tracking event before launch.
- Runtime: high-AOV, considered-purchase site → conversions are relatively sparse; expect multi-week runtime and pre-agree the minimum detectable effect with the test owner rather than peeking. Quote-based revenue completes offline — pair on-site results with quote-to-close data where possible.

## 8. Success / decision framework

- **Win:** transaction CR or RPV up with guardrails flat → roll variant into the base template; iterate on category-word coverage (map remaining categories) and mobile-collapsed table as V3 candidates.
- **Flat:** if ATC/quote rate rises but transactions don't, the buy box is working and the leak is downstream — shift testing to cart/checkout (quote form friction).
- **Loss:** segment first — if losses concentrate in backorder products or low price bands, the fix is targeted (hide the date row / soften low-value shipping salience) rather than abandoning the concept, since the shipping-transparency bet is central to JasonL's flat-rate positioning.
