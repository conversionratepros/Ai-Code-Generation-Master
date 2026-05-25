(function () {
    const debug = 1;
    const recipe_name = "cro-t-30";

    let originalCardOrder = [];

    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
        const interval = setInterval(function () {
            if (document && document.querySelector(selector)) {
                clearInterval(interval);
                trigger();
            }
        }, delayInterval);
        setTimeout(function () {
            clearInterval(interval);
        }, delayTimeout);
    }

    function addClass(el, cls) {
        const element = document.querySelector(el);
        if (element) element.classList.add(cls);
    }

    function waitForNextData(trigger, delayInterval = 50, delayTimeout = 5000) {
        const interval = setInterval(function () {
            if (window.__NEXT_DATA__?.props?.pageProps?.shopPage?.items) {
                clearInterval(interval);
                trigger();
            }
        }, delayInterval);
        setTimeout(function () {
            clearInterval(interval);
        }, delayTimeout);
    }

    // =========================
    // LOADER
    // =========================
    const LOADER_MS = 1000;
    let loaderTimer = null;

    function ensureLoader() {
        if (document.querySelector(".cro30-loader-wrap")) return;

        const style = document.createElement("style");
        style.className = "cro30-loader-style";
        style.textContent = `
      .cro30-loader-wrap{
        position: fixed; inset: 0; z-index: 999999;
        display:none; align-items:center; justify-content:center;
        background: rgba(255,255,255,0.6);
      }
      .cro30-loader{
        width: 44px; height: 44px;
        border-radius: 50%;
        border: 4px solid rgba(0,147,208,0.22);
        border-top-color: #0093D0;
        animation: cro30spin .85s linear infinite;
      }
      @keyframes cro30spin { to { transform: rotate(360deg); } }
    `;
        document.head.appendChild(style);

        const wrap = document.createElement("div");
        wrap.className = "cro30-loader-wrap";
        wrap.innerHTML = `<div class="cro30-loader" aria-label="Loading"></div>`;
        document.body.appendChild(wrap);
    }

    function showLoaderFor3s(callback) {
        ensureLoader();
        const el = document.querySelector(".cro30-loader-wrap");
        if (!el) return callback && callback();

        if (loaderTimer) clearTimeout(loaderTimer);
        el.style.display = "flex";

        loaderTimer = setTimeout(function () {
            el.style.display = "none";
            callback && callback();
        }, LOADER_MS);
    }

    // =========================
    // NO RESULTS UI
    // =========================
    function ensureNoResultsUI() {
        if (document.querySelector(".cro30-noresults")) return;

        const style = document.createElement("style");
        style.className = "cro30-noresults-style";
        style.textContent = `
      .cro30-noresults{
        display:none;
        width: 100%;
        padding: 40px 24px;
        text-align:center;
      }
      .cro30-noresults svg{
        max-width: 370px;
        width: 100%;
        height: auto;
        margin: 0 auto 18px;
        display:block;
      }
      .cro30-noresults h3{
        margin: 0 0 10px;
        font-size: 28px;
        font-weight: 700;
        color: #3c3d3d;
      }
      .cro30-noresults p{
        margin: 0 auto;
        max-width: 520px;
        font-size: 15px;
        line-height: 22px;
        color: #5f6971;
      }
    `;
        document.head.appendChild(style);

        const leftProducts = document.querySelector(".cro30-left-products");
        if (!leftProducts) return;

        const wrap = document.createElement("div");
        wrap.className = "cro30-noresults";
        wrap.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="370" height="370" viewBox="0 0 370 370" fill="none">
<rect width="370" height="370" rx="185" fill="#F0F4F7"/>
<rect x="59" y="59" width="252" height="252" rx="126" fill="#E2E8ED"/>
<path d="M94 160.127L117.274 131M94 160.127H117.274M94 160.127V240H276.221V160.127M117.274 131H253.401M117.274 131V160.127M253.401 131L276.221 160.127M253.401 131V160.127M276.221 160.127H253.401M117.274 160.127H159.849L184.032 179.015L209.01 160.127H253.401" stroke="#718696" stroke-width="5"/>
<path d="M158.901 201.725V202.141C158.901 205.588 161.695 208.382 165.141 208.382C168.588 208.382 171.382 205.588 171.382 202.141V201.725" stroke="#718696" stroke-width="5" stroke-linecap="round"/>
<path d="M199.256 201.725V202.141C199.256 205.588 202.05 208.382 205.496 208.382C208.943 208.382 211.737 205.588 211.737 202.141V201.725" stroke="#718696" stroke-width="5" stroke-linecap="round"/>
<path d="M177.206 217.118L192.599 218.782" stroke="#718696" stroke-width="5" stroke-linecap="round"/>
</svg>
<h3>No matches found</h3>
<p>We couldn’t find any products with those filters. Try adjusting or clearing some filters to see more results.</p>
    `;

        const cardContainer = document.querySelector(".cro30-product-card-container");
        if (cardContainer && cardContainer.parentNode === leftProducts) {
            leftProducts.insertBefore(wrap, cardContainer);
        } else {
            leftProducts.appendChild(wrap);
        }
    }

    function toggleNoResults(show) {
        ensureNoResultsUI();

        const empty = document.querySelector(".cro30-noresults");
        const cardsWrap = document.querySelector(".cro30-product-card-container");

        if (empty) empty.style.display = show ? "block" : "none";
        if (cardsWrap) cardsWrap.style.display = show ? "none" : "block";
    }

    // =========================
    // LABEL FORMATTERS
    // =========================
    function normText(v) {
        return (v || "").toString().trim();
    }

    function cssSafe(str) {
        return normText(str)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-_]/g, "");
    }

    function prettySlugLabel(slug) {
        const raw = normText(slug).replace(/-/g, " ");
        const words = raw.split(/\s+/).filter(Boolean).map((w) => w.toLowerCase());
        const replaced = words.map((w) => (w === "and" ? "&" : w));
        const titled = replaced
            .map((w) => {
                if (w === "&") return "&";
                return w.charAt(0).toUpperCase() + w.slice(1);
            })
            .join(" ");
        return titled;
    }

    // ✅ NEW helper for banded price matching
    function priceMatchesRange(price, r) {
        if (!r) return false;
        if (r.key === "p10000plus") return price >= r.min;
        return price >= r.min && price <= r.max;
    }

    // =========================
    // LEFT FILTERS CONFIG/STATE
    // =========================
    const FILTERS = {
        categoryPriority: [
            "apparel-and-accessories",
            "home-and-garden",
            "health-and-beauty",
            "electronics",
            "furniture",
        ],
        savingsRanges: [
            { key: "s20", label: "20% or more", min: 20 },
            { key: "s40", label: "40% or more", min: 40 },
            { key: "s60", label: "60% or more", min: 60 },
            { key: "s80", label: "80% or more", min: 80 },
            { key: "s90", label: "90% or more", min: 90 }, // ✅ ensure 90% exists
        ],

        // ✅ FIXED pricing bands (non-overlapping) as you specified
        priceRanges: [
            { key: "p100", label: "Under R100", min: 1, max: 100 },
            { key: "p300", label: "Under R300", min: 101, max: 299 },
            { key: "p500", label: "Under R500", min: 301, max: 499 },
            { key: "p1000", label: "Under R1,000", min: 501, max: 999 },
            { key: "p2000", label: "Under R2,000", min: 1001, max: 2000 },
            { key: "p5000", label: "Under R5,000", min: 2001, max: 5000 },
            { key: "p10000", label: "Under R10,000", min: 5001, max: 9999 },
            { key: "p10000plus", label: "R10,000 +", min: 10000 },
        ],
        defaultBrandCount: 5,
    };

    const state = {
        selectedCategories: new Set(),
        selectedSavings: new Set(),
        selectedPrices: new Set(),
        selectedBrands: new Set(),
        allBrandsCountMap: new Map(),
        allCategoryCountMap: new Map(),
        extractedData: [],
    };

    function getMainContainer() {
        return document.querySelector('[cro-maincontainer="cro-product-container"]');
    }

    function getControlFilter() {
        return document.querySelector(
            '[cro-maincontainer="cro-product-container"] > div.css-nmn8l6'
        );
    }

    function getCards() {
        return Array.from(document.querySelectorAll(".cro30-product-card[cro-price]"));
    }

    function getCardMeta(card) {
        const price = parseFloat(card.getAttribute("cro-price")) || 0;
        const saving = parseFloat(card.getAttribute("cro-saving")) || 0;
        const brand = normText(card.getAttribute("cro-brandName"));
        const category = normText(card.getAttribute("cro-categoryName"));
        return { price, saving, brand, category };
    }

    function anyFiltersSelected() {
        return (
            state.selectedCategories.size > 0 ||
            state.selectedSavings.size > 0 ||
            state.selectedPrices.size > 0 ||
            state.selectedBrands.size > 0
        );
    }

    function toggleExperienceView(force) {
        const main = getMainContainer();
        const control = getControlFilter();
        const leftProducts = document.querySelector(".cro30-left-products");

        if (!main || !leftProducts) return;

        const active = typeof force === "boolean" ? force : anyFiltersSelected();

        leftProducts.style.display = active ? "block" : "none";
        if (control) control.style.display = active ? "none" : "";

        main.classList.toggle("cro30-variation-active", active);

        if (!active) {
            const cards = getCards();
            cards.forEach((c) => (c.style.display = "block"));
            toggleNoResults(false);
        }
    }

    function buildCountsFromData(extractedData) {
        const brandCount = new Map();
        const catCount = new Map();

        extractedData.forEach((p) => {
            const b = normText(p.brand);
            const c = normText(p.categoryName);
            if (b) brandCount.set(b, (brandCount.get(b) || 0) + 1);
            if (c) catCount.set(c, (catCount.get(c) || 0) + 1);
        });

        state.allBrandsCountMap = brandCount;
        state.allCategoryCountMap = catCount;
    }

    function getVisibleOptionsFromCounts(map) {
        return Array.from(map.entries())
            .filter(([, count]) => count > 0)
            .map(([name, count]) => ({ name, count }));
    }

    function sortCategoriesForUI(categoryOptions) {
        const priorityMap = new Map();
        FILTERS.categoryPriority.forEach((name, idx) =>
            priorityMap.set(name.toLowerCase(), idx)
        );

        const prioritized = [];
        const others = [];

        categoryOptions.forEach((opt) => {
            const key = opt.name.toLowerCase();
            if (priorityMap.has(key)) prioritized.push(opt);
            else others.push(opt);
        });

        prioritized.sort(
            (a, b) =>
                priorityMap.get(a.name.toLowerCase()) - priorityMap.get(b.name.toLowerCase())
        );
        others.sort((a, b) => a.name.localeCompare(b.name));

        return { prioritized, others };
    }

    function optionRowHTML({ id, value, label, countText = "" }) {
        return `
      <label class="cro30-option" for="${id}">
        <input type="checkbox" id="${id}" data-value="${String(value || "")}" />
        <span class="cro30-option-label">${label}${countText ? ` <span class="cro30-option-count">(${countText})</span>` : ""
            }</span>
      </label>
    `;
    }

    function toggleNotFound(section, show) {
        const el = document.querySelector(`[data-notfound="${section}"]`);
        if (el) el.style.display = show ? "block" : "none";

        // ✅ IMPORTANT: do NOT force-show view button here.
        // handleSearch() controls View more visibility while searching.
    }

    // ✅ FIXED counts to use banded pricing rules
    function collectMetaCountsFromCards(cards) {
        const savings = new Map();
        const prices = new Map();

        FILTERS.savingsRanges.forEach((r) => savings.set(r.key, 0));
        FILTERS.priceRanges.forEach((r) => prices.set(r.key, 0));

        cards.forEach((card) => {
            const { price, saving } = getCardMeta(card);

            FILTERS.savingsRanges.forEach((r) => {
                if (saving >= r.min) savings.set(r.key, (savings.get(r.key) || 0) + 1);
            });

            FILTERS.priceRanges.forEach((r) => {
                if (priceMatchesRange(price, r)) {
                    prices.set(r.key, (prices.get(r.key) || 0) + 1);
                }
            });
        });

        return { savings, prices };
    }

    function renderCategoryOptions(categoryOptions) {
        const container = document.querySelector('[data-options="category"]');
        if (!container) return;

        const { prioritized, others } = sortCategoriesForUI(categoryOptions);

        container.innerHTML = `
      <div class="cro30-options-group" data-group="category-default">
        ${prioritized
                .map((opt) =>
                    optionRowHTML({
                        id: `cro30-cat-${cssSafe(opt.name)}`,
                        value: opt.name,
                        label: prettySlugLabel(opt.name),
                    })
                )
                .join("")}
      </div>
      <div class="cro30-options-group" data-group="category-more" style="display:none;">
        ${others
                .map((opt) =>
                    optionRowHTML({
                        id: `cro30-cat-${cssSafe(opt.name)}`,
                        value: opt.name,
                        label: prettySlugLabel(opt.name),
                    })
                )
                .join("")}
      </div>
    `;

        const viewBtn = document.querySelector('[data-view="category"]');
        if (viewBtn) viewBtn.style.display = others.length ? "inline-flex" : "none";

        toggleNotFound("category", prioritized.length + others.length === 0);
    }

    function renderSavingsOptions(metaCounts) {
        const container = document.querySelector('[data-options="savings"]');
        if (!container) return;

        const ranges = FILTERS.savingsRanges.filter(
            (r) => (metaCounts.savings.get(r.key) || 0) > 0
        );

        container.innerHTML = ranges
            .map((r) =>
                optionRowHTML({
                    id: `cro30-sav-${r.key}`,
                    value: r.key,
                    label: r.label,
                })
            )
            .join("");

        toggleNotFound("savings", ranges.length === 0);
    }

    function renderPricingOptions(metaCounts) {
        const container = document.querySelector('[data-options="pricing"]');
        if (!container) return;

        const ranges = FILTERS.priceRanges.filter(
            (r) => (metaCounts.prices.get(r.key) || 0) > 0
        );

        const defaultKeys = new Set(["p100", "p300", "p500", "p1000", "p2000"]);
        const defaultList = [];
        const moreList = [];

        ranges.forEach((r) => (defaultKeys.has(r.key) ? defaultList : moreList).push(r));

        container.innerHTML = `
      <div class="cro30-options-group" data-group="pricing-default">
        ${defaultList
                .map((r) =>
                    optionRowHTML({
                        id: `cro30-pr-${r.key}`,
                        value: r.key,
                        label: r.label,
                    })
                )
                .join("")}
      </div>
      <div class="cro30-options-group" data-group="pricing-more" style="display:none;">
        ${moreList
                .map((r) =>
                    optionRowHTML({
                        id: `cro30-pr-${r.key}`,
                        value: r.key,
                        label: r.label,
                    })
                )
                .join("")}
      </div>
    `;

        const viewBtn = document.querySelector('[data-view="pricing"]');
        if (viewBtn) viewBtn.style.display = moreList.length ? "inline-flex" : "none";

        toggleNotFound("pricing", defaultList.length + moreList.length === 0);
    }

    function renderBrandOptions(brandOptions) {
        const container = document.querySelector('[data-options="brand"]');
        if (!container) return;

        const sorted = [...brandOptions].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name)
        );

        const defaultItems = sorted.slice(0, FILTERS.defaultBrandCount);
        const moreItems = sorted.slice(FILTERS.defaultBrandCount);

        container.innerHTML = `
      <div class="cro30-options-group" data-group="brand-default">
        ${defaultItems
                .map((opt) =>
                    optionRowHTML({
                        id: `cro30-br-${cssSafe(opt.name)}`,
                        value: opt.name,
                        label: opt.name,
                        countText: opt.count,
                    })
                )
                .join("")}
      </div>
      <div class="cro30-options-group" data-group="brand-more" style="display:none;">
        ${moreItems
                .map((opt) =>
                    optionRowHTML({
                        id: `cro30-br-${cssSafe(opt.name)}`,
                        value: opt.name,
                        label: opt.name,
                        countText: opt.count,
                    })
                )
                .join("")}
      </div>
    `;

        const viewBtn = document.querySelector('[data-view="brand"]');
        if (viewBtn) viewBtn.style.display = moreItems.length ? "inline-flex" : "none";

        toggleNotFound("brand", sorted.length === 0);
    }

    function updateSelectToggleLabels() {
        document.querySelectorAll(".cro30-filter-section").forEach((section) => {
            const opts = section.querySelectorAll('input[type="checkbox"]');
            const toggleBtn = section.querySelector('[data-action="select-toggle"]');
            if (!toggleBtn || opts.length === 0) return;

            const checked = Array.from(opts).filter((i) => i.checked).length;
            toggleBtn.textContent = checked === opts.length ? "Select none" : "Select all";
        });
    }

    function applyFiltersNow() {
        const cards = getCards();

        const anyCategory = state.selectedCategories.size > 0;
        const anySavings = state.selectedSavings.size > 0;
        const anyPrices = state.selectedPrices.size > 0;
        const anyBrands = state.selectedBrands.size > 0;

        let visibleCount = 0;

        cards.forEach((card) => {
            const { price, saving, brand, category } = getCardMeta(card);

            let passCategory = true;
            if (anyCategory) passCategory = state.selectedCategories.has(category);

            let passBrand = true;
            if (anyBrands) passBrand = state.selectedBrands.has(brand);

            let passSavings = true;
            if (anySavings) {
                passSavings = false;
                for (const key of state.selectedSavings) {
                    const r = FILTERS.savingsRanges.find((x) => x.key === key);
                    if (r && saving >= r.min) {
                        passSavings = true;
                        break;
                    }
                }
            }

            // ✅ FIXED: pricing bands (min/max)
            let passPrice = true;
            if (anyPrices) {
                passPrice = false;
                for (const key of state.selectedPrices) {
                    const r = FILTERS.priceRanges.find((x) => x.key === key);
                    if (!r) continue;

                    if (priceMatchesRange(price, r)) {
                        passPrice = true;
                        break;
                    }
                }
            }

            const show = passCategory && passBrand && passSavings && passPrice;
            card.style.display = show ? "block" : "none";
            if (show) visibleCount++;
        });

        updateSelectToggleLabels();
        toggleExperienceView();

        toggleNoResults(anyFiltersSelected() && visibleCount === 0);
    }

    function applyFiltersWithLoader() {
        showLoaderFor3s(() => applyFiltersNow());
    }

    function setFromCheckboxChange(input) {
        const id = input.id;
        const value = normText(input.getAttribute("data-value"));

        if (id.startsWith("cro30-cat-")) {
            if (value)
                input.checked
                    ? state.selectedCategories.add(value)
                    : state.selectedCategories.delete(value);
        }

        if (id.startsWith("cro30-sav-")) {
            const key = value || id.replace("cro30-sav-", "");
            input.checked ? state.selectedSavings.add(key) : state.selectedSavings.delete(key);
        }

        if (id.startsWith("cro30-pr-")) {
            const key = value || id.replace("cro30-pr-", "");
            input.checked ? state.selectedPrices.add(key) : state.selectedPrices.delete(key);
        }

        if (id.startsWith("cro30-br-")) {
            if (value)
                input.checked ? state.selectedBrands.add(value) : state.selectedBrands.delete(value);
        }

        applyFiltersWithLoader();
    }

    function handleSelectToggle(sectionEl) {
        const inputs = sectionEl.querySelectorAll('input[type="checkbox"]');
        if (!inputs.length) return;

        const allChecked = Array.from(inputs).every((i) => i.checked);
        const nextChecked = !allChecked;

        inputs.forEach((i) => (i.checked = nextChecked));

        const section = sectionEl.getAttribute("data-section");

        if (section === "category") {
            state.selectedCategories = new Set();
            if (nextChecked)
                Array.from(inputs).forEach((i) =>
                    state.selectedCategories.add(normText(i.getAttribute("data-value")))
                );
        }

        if (section === "savings") {
            state.selectedSavings = new Set();
            if (nextChecked)
                Array.from(inputs).forEach((i) =>
                    state.selectedSavings.add(normText(i.getAttribute("data-value")))
                );
        }

        if (section === "pricing") {
            state.selectedPrices = new Set();
            if (nextChecked)
                Array.from(inputs).forEach((i) =>
                    state.selectedPrices.add(normText(i.getAttribute("data-value")))
                );
        }

        if (section === "brand") {
            state.selectedBrands = new Set();
            if (nextChecked)
                Array.from(inputs).forEach((i) =>
                    state.selectedBrands.add(normText(i.getAttribute("data-value")))
                );
        }

        applyFiltersWithLoader();
    }

    function handleViewToggle(sectionKey) {
        const moreGroup = document.querySelector(`[data-group="${sectionKey}-more"]`);
        const btn = document.querySelector(`[data-view="${sectionKey}"]`);
        if (!moreGroup || !btn) return;

        const open = moreGroup.style.display !== "none";
        moreGroup.style.display = open ? "none" : "block";

        btn.innerHTML = open
            ? `View more <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M4 6L8 10L12 6" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`
            : `View less <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M4 10L8 6L12 10" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
    }

    // =========================
    // SEARCH (FIXED)
    // - searches across BOTH groups
    // - forces "more" open while searching
    // - hides View more while searching
    // =========================

    function handleSearch(sectionKey, value) {
        const q = normText(value).toLowerCase();
        const applying = q.length >= 1;

        const section = document.querySelector(`.cro30-filter-section[data-section="${sectionKey}"]`);
        if (!section) return;

        const moreGroup = document.querySelector(`[data-group="${sectionKey}-more"]`);
        const viewBtn = document.querySelector(`[data-view="${sectionKey}"]`);

        // ✅ While searching: ALWAYS hide view button + ALWAYS show "more" group
        if (applying) {
            if (moreGroup) moreGroup.style.display = "block";
            if (viewBtn) viewBtn.style.display = "none";
        } else {
            // ✅ When not searching: restore default collapsed state
            if (moreGroup) moreGroup.style.display = "none";
            if (viewBtn) {
                const hasMore =
                    moreGroup && moreGroup.children && moreGroup.children.length > 0;
                viewBtn.style.display = hasMore ? "inline-flex" : "none";
                viewBtn.innerHTML = `View more <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M4 6L8 10L12 6" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
            }
        }

        const labels = section.querySelectorAll(".cro30-option");
        let matchCount = 0;

        labels.forEach((label) => {
            const txt = normText(label.innerText).toLowerCase();
            const show = !applying || txt.includes(q);
            label.style.display = show ? "flex" : "none";
            if (show) matchCount++;
        });

        // ✅ Not found message only (do NOT touch view button here)
        const nf = document.querySelector(`[data-notfound="${sectionKey}"]`);
        if (nf) nf.style.display = applying && matchCount === 0 ? "block" : "none";
    }

    function bindLeftFilterEvents() {
        const root = document.querySelector(".cro30-left-filters");
        if (!root || root.__cro30Bound) return;
        root.__cro30Bound = true;

        root.addEventListener("change", (e) => {
            const t = e.target;
            if (t && t.matches('input[type="checkbox"]')) setFromCheckboxChange(t);
        });

        root.addEventListener("click", (e) => {
            const t = e.target;

            if (t && t.matches('[data-action="select-toggle"]')) {
                const sectionEl = t.closest(".cro30-filter-section");
                if (sectionEl) handleSelectToggle(sectionEl);
            }

            const viewBtn = t && t.closest("[data-view]");
            if (viewBtn) {
                const key = viewBtn.getAttribute("data-view");
                handleViewToggle(key);
            }
        });

        root.addEventListener("input", (e) => {
            const t = e.target;
            if (t && t.matches("[data-search]")) {
                const key = t.getAttribute("data-search");
                handleSearch(key, t.value);
            }
        });
    }

    function renderLeftFilters(extractedData) {
        state.extractedData = extractedData || [];
        buildCountsFromData(state.extractedData);

        const main = getMainContainer();
        const cardContainer = document.querySelector(".cro30-product-card-container");
        if (!main || !cardContainer) return;

        // add filters afterbegin
        if (!document.querySelector(".cro30-left-filters")) {
            main.insertAdjacentHTML(
                "afterbegin",
                `
        <aside class="cro30-left-filters" aria-label="Filters" style="display: none;">
          <div class="cro30-left-filters-title">Filters</div>

          <section class="cro30-filter-section" data-section="category">
            <div class="cro30-filter-section-head">
              <div class="cro30-filter-section-title">Category</div>
              <button type="button" class="cro30-select-toggle" data-action="select-toggle">Select all</button>
            </div>
            <div class="cro30-search-wrapper">
              <span class="cro30-search-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.4121 14.4119L20.0001 19.9999" stroke="#A8AEB4" stroke-width="2" stroke-linecap="square"/><path d="M10 15.9998C13.3137 15.9998 16 13.3135 16 9.99976C16 6.68605 13.3137 3.99976 10 3.99976C6.68629 3.99976 4 6.68605 4 9.99976C4 13.3135 6.68629 15.9998 10 15.9998Z" stroke="#A8AEB4" stroke-width="2" stroke-linecap="square"/></svg></span>
              <input class="cro30-search-box" data-search="category" type="text" placeholder="" />
            </div>
            <div class="cro30-options" data-options="category"></div>
            <button type="button" class="cro30-view-toggle" data-view="category" style="display:none;">View more <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <div class="cro30-options-not-found" data-notfound="category" style="display:none;">Options not found</div>
          </section>

          <section class="cro30-filter-section" data-section="savings">
            <div class="cro30-filter-section-head">
              <div class="cro30-filter-section-title">Savings</div>
              <button type="button" class="cro30-select-toggle" data-action="select-toggle">Select all</button>
            </div>
            <div class="cro30-options" data-options="savings"></div>
            <div class="cro30-options-not-found" data-notfound="savings" style="display:none;">Options not found</div>
          </section>

          <section class="cro30-filter-section" data-section="pricing">
            <div class="cro30-filter-section-head">
              <div class="cro30-filter-section-title">Pricing</div>
              <button type="button" class="cro30-select-toggle" data-action="select-toggle">Select all</button>
            </div>
            <div class="cro30-options" data-options="pricing"></div>
            <button type="button" class="cro30-view-toggle" data-view="pricing" style="display:none;">View more <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <div class="cro30-options-not-found" data-notfound="pricing" style="display:none;">Options not found</div>
          </section>

          <section class="cro30-filter-section" data-section="brand">
            <div class="cro30-filter-section-head">
              <div class="cro30-filter-section-title">Brand</div>
              <button type="button" class="cro30-select-toggle" data-action="select-toggle">Select all</button>
            </div>
            <div class="cro30-search-wrapper">
              <span class="cro30-search-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.4121 14.4119L20.0001 19.9999" stroke="#A8AEB4" stroke-width="2" stroke-linecap="square"/><path d="M10 15.9998C13.3137 15.9998 16 13.3135 16 9.99976C16 6.68605 13.3137 3.99976 10 3.99976C6.68629 3.99976 4 6.68605 4 9.99976C4 13.3135 6.68629 15.9998 10 15.9998Z" stroke="#A8AEB4" stroke-width="2" stroke-linecap="square"/></svg></span>
              <input class="cro30-search-box" data-search="brand" type="text" placeholder="" />
            </div>
            <div class="cro30-options" data-options="brand"></div>
            <button type="button" class="cro30-view-toggle" data-view="brand" style="display:none;">View more <span class="cro30-view-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="#0093D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <div class="cro30-options-not-found" data-notfound="brand" style="display:none;">Options not found</div>
          </section>
        </aside>
      `
            );
        }

        // add products beforeend
        let leftProducts = document.querySelector(".cro30-left-products");
        if (!leftProducts) {
            main.insertAdjacentHTML("beforeend", `<div class="cro30-left-products"></div>`);
            leftProducts = document.querySelector(".cro30-left-products");
        }

        // move cards under leftProducts
        if (leftProducts && cardContainer.parentElement !== leftProducts) {
            leftProducts.appendChild(cardContainer);
        }

        ensureNoResultsUI();

        const categoryOptions = getVisibleOptionsFromCounts(state.allCategoryCountMap);
        const brandOptions = getVisibleOptionsFromCounts(state.allBrandsCountMap);

        const cards = getCards();
        if (originalCardOrder.length === 0 && cards.length) originalCardOrder = [...cards];

        const metaCounts = collectMetaCountsFromCards(cards);

        renderCategoryOptions(categoryOptions);
        renderSavingsOptions(metaCounts);
        renderPricingOptions(metaCounts);
        renderBrandOptions(brandOptions);

        bindLeftFilterEvents();
        updateSelectToggleLabels();

        // default state
        toggleExperienceView(false);

        if (debug) console.log("✅ Pricing bands fixed + 90% savings supported.");
    }

    // =========================
    // MAIN CONTAINER FINDER
    // =========================
    function addingClass() {
        const element = document.querySelector("div#__next picture");
        const closestAncestor = element?.closest('[class*="css"]')
            ?.parentElement
            ?.closest('[class*="css"]')
            ?.parentElement
            ?.closest('[class*="css"]')
            ?.parentElement;

        if (closestAncestor) {
            closestAncestor.setAttribute("cro-MainContainer", "cro-product-container");
        }
    }

    // =========================
    // BUILD PRODUCT CARDS
    // =========================
    function filterInsertion() {
        const items = window.__NEXT_DATA__?.props?.pageProps?.shopPage?.items;
        if (!items || !Array.isArray(items)) return;

        const extractedData = items.flatMap((item) =>
            item?.props?.items?.map((product) => ({
                price: product?.price?.formattedValue || "",
                priceValue:
                    parseFloat(
                        String(product?.price?.formattedValue || "").replace(/[^0-9.]/g, "")
                    ) || 0,
                retailPrice: product?.retailPrice?.formattedValue || "",
                productUrl: product?.id || "#",
                name: product.shortName || "No Name",
                brand: product.brand || "No Brand",
                categoryName:
                    product?.topLevelCategories?.[0]?.id ||
                    product?.categories?.[0]?.name ||
                    product?.category?.name ||
                    product?.categoryName ||
                    "",
                imageUrl: product.image?.url || "No Image",
                savingPercent: product.saving?.percent ? `${product.saving.percent}%` : "No Saving Info",
                savingPercentOfCard: product?.saving?.percent || 0,
                productBlueTag: product.blueTag || "",
                bestSeller: product?.isBestSeller || false,
                productLeftQuantity: product.xLeftQuantity || "",
            })) || []
        );

        const productContainer = document.createElement("div");
        productContainer.classList.add("cro30-product-card-wrapper");

        extractedData.forEach((product, index) => {
            var isBestSellerClass = product.productBestSeller ? " show" : "";
            var quantityHTML = product.productLeftQuantity
                ? `<div class="cro30-product-card-Quantity">${product.productLeftQuantity} left</div>`
                : "";
            var blueTagHTML =
                product.productBlueTag && !product.productBlueTag.toLowerCase().includes("size")
                    ? `<div class="cro30-product-card-BlueTag">${product.productBlueTag}</div>`
                    : "";

            const productCard = document.createElement("div");
            productCard.classList.add("cro30-product-card", `cro30-product-card${index}`);

            productCard.setAttribute("cro-price", product.priceValue);
            productCard.setAttribute("cro-saving", product.savingPercentOfCard);
            productCard.setAttribute("cro-brandName", product.brand);
            productCard.setAttribute("cro-categoryName", product.categoryName);
            productCard.setAttribute("cro-saving", product.savingPercentOfCard);
            productCard.setAttribute("cro-bestseller", product.bestSeller);

            productCard.innerHTML = `
        <a href="https://www.onedayonly.co.za/products/${product.productUrl}" class="cro30-product-card-link">
          <div class="cro30-product-card-top">
            <div class="cro30-product-card-img">
              <img src="${product.imageUrl}?auto=compress,format&w=600&h=600&bg=fff&fit=fill" alt="${product.name}" />
            </div>
            <div class="cro30-product-card-saving">
              <span class="cro30-product-card-saving-text1">save</span>
              <span class="cro30-product-card-saving-text2">-</span>
              <span class="cro30-product-card-saving-text3">${product.savingPercent}</span>
            </div>
			   <div class="cro30-product-card-imgTags">
                  <div class="cro30-product-card-BestSeller${isBestSellerClass}">BEST SELLER</div>
                  ${quantityHTML}
				  ${blueTagHTML}
                </div>
          </div>
          <div class="cro30-product-card-bottom">
            <div class="cro30-product-card-info">
              <div class="cro30-product-card-name">${product.brand}</div>
              <div class="cro30-product-card-brand">${product.name}</div>
            </div>
            <div class="cro30-product-card-price">
              <div class="cro30-product-card-main-price">${product.price}</div>
              <div class="cro30-product-card-retail-price">${product.retailPrice}</div>
			    <div class="cro30-product-ShowCard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon css-1hc99zl"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>
          </div>
        </a>
      `;

            productContainer.appendChild(productCard);
        });

        const allHtmlContent = `
      <div class="cro30-product-card-container">
        <div class="cro30-product-card-wrapper-main">${productContainer.outerHTML}</div>
      </div>
    `;

        waitForElement(
            '[cro-maincontainer="cro-product-container"]',
            function () {
                const main = getMainContainer();
                if (!main) return;

                if (!document.querySelector(".cro30-product-card-container")) {
                    main.insertAdjacentHTML("beforeend", allHtmlContent);
                    renderLeftFilters(extractedData);
                }
            },
            50,
            10000
        );

        if (debug) console.log(`✅ Cards built: ${extractedData.length}`);
    }

    function init() {
        addClass("body", recipe_name);
        // waitForElement("div#__next picture", addingClass, 50, 20000);

        waitForElement('#__next .spacer ~ div  [width="1"]', function () {
            document.querySelector('#__next .spacer ~ div  [width="1"]').setAttribute("cro-MainContainer", "cro-product-container");
        }, 50, 20000);

        waitForElement('[cro-maincontainer="cro-product-container"]', function () {
            waitForNextData(() => filterInsertion());
        }, 50, 20000);
    }

    if (window.innerWidth >= 1024) {
        waitForElement("#__next .spacer", init, 50, 20000);
    }
})();