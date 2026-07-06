(() => {

    const debug = true;
    const exp = "TEST-01";

    // const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;

    const utils = {
        waitUntil: function (condition, wait = 5000) {
            return new Promise((resolve, reject) => {
                let stop;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject(new Error("waitUntil timeout"));
                    }, wait);

                const check = () => {
                    if (stop) return;
                    const result = condition();
                    if (!result) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(result);
                };

                requestAnimationFrame(check);
            });
        },
        log: function (message) {
            if (debug) {
                console.log(`${exp}: ${message}`);
            }
        },
    };

    function categorizeProducts(items) {
        const categories = [];
        const bucketById = new Map();

        // Pull every product out of the galleries into a single flat list.
        const products = (items || []).flatMap((item) => item?.props?.items || []);

        products.forEach((product) => {
            const productCategories = product?.topLevelCategories || [];

            productCategories.forEach(({ id, name }) => {
                let bucket = bucketById.get(id);

                if (!bucket) {
                    bucket = { catId: id, catName: name, products: [] };
                    bucketById.set(id, bucket);
                    categories.push(bucket);
                }

                bucket.products.push(product);
            });
        });

        // Order categories so the one with the most products comes first.
        categories.sort((a, b) => b.products.length - a.products.length);

        return categories;
    }

    const categoryNamesMap = {
        "home-and-garden": "home & garden",
        "apparel-and-accessories": "apparel & accessories",
        "health-and-beauty": "health & beauty",
        "furniture": "furniture",
        "shoes": "Shoes",
        "hardware": "hardware",
        "electronics": "electronics",
        "luggage-and-bags": "luggage & bags",
        "sporting-goods": "sporting goods",
        "food-and-beverages": "food & beverages",
        "business-and-industrial": "business & industrial",
        "animals-and-pet-supplies": "animals & pet supplies",
        "toys-and-games": "toys & games",
        "office-supplies": "office supplies",
        "arts-and-entertainment": "arts & entertainment",
        "vehicles-and-parts": "vehicles & parts"
    };

    // Prefix for every class / id this A/B test injects, to avoid clashing
    // with the host page styles.
    const PREFIX = "crp-01";

    // Where the categorised rail is inserted. Adjust this selector to the real
    // anchor on the page; it falls back to <main>/<body> if not found.
    const MOUNT_SELECTOR = "#__next .spacer";

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        }[char]));
    }

    // imgix CDN – request a reasonably sized, auto-formatted thumbnail.
    function thumb(url) {
        if (!url) return "";
        return `${url}${url.includes("?") ? "&" : "?"}auto=format&fit=crop&w=420&q=70`;
    }

    function buildProductCard(product) {
        const title = product.shortName || product.name || "";
        const savePercent = product?.saving?.percent;
        const priceLabel =
            product?.price?.formattedValue || product?.minPrice?.formattedValue || "";
        const retailLabel = product?.retailPrice?.formattedValue || "";
        // "From" is shown when the product has variants / a price range.
        const hasFrom =
            product.hasPriceRange ||
            (Array.isArray(product.customizableOptions) &&
                product.customizableOptions.length > 0);

        // Bottom-left tags overlaid on the image.
        const pills = [];
        if (product.saving) {
            pills.push(`<span class="${PREFIX}-pill ${PREFIX}-pill--save">SAVE</span>`);
        }
        if (product.blueTag) {
            pills.push(
                `<span class="${PREFIX}-pill ${PREFIX}-pill--options">${escapeHtml(
                    product.blueTag.toUpperCase()
                )}</span>`
            );
        }
        if (product.yellowTag) {
            pills.push(
                `<span class="${PREFIX}-pill ${PREFIX}-pill--yellow">${escapeHtml(
                    product.yellowTag.toUpperCase()
                )}</span>`
            );
        }

        return `
            <div class="${PREFIX}-card${product.isSoldOut ? ` ${PREFIX}-card--soldout` : ""}" data-product-id="${escapeHtml(product.id)}">
                <div class="${PREFIX}-card__media">
                    ${savePercent ? `<span class="${PREFIX}-badge-save"><span class="${PREFIX}-badge-save-text">SAVE</span><span class="${PREFIX}-badge-save-percent">${savePercent}%</span></span>` : ""}
                    <img class="${PREFIX}-card__img" src="${thumb(product?.image?.url)}" alt="${escapeHtml(title)}" loading="lazy" />
                    ${pills.length ? `<div class="${PREFIX}-card__pills">${pills.join("")}</div>` : ""}
                    ${product.isSoldOut ? `<span class="${PREFIX}-card__soldout">Sold out</span>` : ""}
                </div>
                <div class="${PREFIX}-card__body">
                    <p class="${PREFIX}-card__brand">${escapeHtml(product.brand || "")}</p>
                    <p class="${PREFIX}-card__name">${escapeHtml(title)}</p>
                    <div class="${PREFIX}-card__price-row">
                        <div class="${PREFIX}-card__prices">
                            ${hasFrom ? `<span class="${PREFIX}-card__from">From</span>` : ""}
                            <span class="${PREFIX}-card__price">${escapeHtml(priceLabel)}</span>
                            ${retailLabel ? `<span class="${PREFIX}-card__retail">${escapeHtml(retailLabel)}</span>` : ""}
                        </div>
                        <button class="${PREFIX}-card__add" type="button" aria-label="Add ${escapeHtml(title)} to cart"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19" stroke="#3C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12H19" stroke="#3C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    </div>
                </div>
            </div>`;
    }

    function buildCategorySection(category) {
        const heading = categoryNamesMap[category.catId] || category.catName;
        const cards = category.products.map(buildProductCard).join("");
        const nextArrow = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="#272727" stroke-width="1.16667" stroke-linecap="round"/></svg>
        `;
        const prevArrow = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 15L7 10L12 5" stroke="#272727" stroke-width="1.16667" stroke-linecap="round"/></svg>
        `;

        return `
            <section class="${PREFIX}-category" data-cat-id="${escapeHtml(category.catId)}">
                <div class="${PREFIX}-category__head">
                    <h2 class="${PREFIX}-category__title">${escapeHtml(heading)}</h2>
                    <button class="${PREFIX}-category__viewall" type="button" aria-expanded="false"><span class="${PREFIX}-category__viewall-label">View all</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="#A31C80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                </div>
                <div class="${PREFIX}-carousel">
                    <button class="${PREFIX}-carousel__nav ${PREFIX}-carousel__nav--prev" type="button" aria-label="Scroll left">${prevArrow}</button>
                    <div class="${PREFIX}-carousel__track">${cards}</div>
                    <button class="${PREFIX}-carousel__nav ${PREFIX}-carousel__nav--next" type="button" aria-label="Scroll right">${nextArrow}</button>
                </div>
            </section>`;
    }

    function buildCategoriesHTML(categorizedProducts) {
        return (categorizedProducts || []).map(buildCategorySection).join("");
    }

    function wireCarousels(root) {
        root.querySelectorAll(`.${PREFIX}-carousel`).forEach((carousel) => {
            const track = carousel.querySelector(`.${PREFIX}-carousel__track`);
            const prev = carousel.querySelector(`.${PREFIX}-carousel__nav--prev`);
            const next = carousel.querySelector(`.${PREFIX}-carousel__nav--next`);

            // One "page" is the full set of visible cards (the viewport width),
            // so a click reveals the next set of products.
            const page = () => track.clientWidth;
            const EPS = 2; // tolerance for sub-pixel / scroll-snap rounding

            const updateNav = () => {
                const maxScroll = track.scrollWidth - track.clientWidth;
                // No overflow (4 or fewer cards) → both arrows stay hidden, so the
                // carousel reads as a plain left-aligned row.
                const hasOverflow = maxScroll > EPS;
                prev.hidden = !hasOverflow || track.scrollLeft <= EPS;
                next.hidden = !hasOverflow || track.scrollLeft >= maxScroll - EPS;
            };

            prev.addEventListener("click", () => track.scrollBy({ left: -page(), behavior: "smooth" }));
            next.addEventListener("click", () => track.scrollBy({ left: page(), behavior: "smooth" }));
            track.addEventListener("scroll", updateNav, { passive: true });

            // The arrow state depends on the track's measured width, so it must be
            // re-evaluated whenever that width can change. The first call can run
            // before the stylesheet is applied (width 0), so we also re-check after
            // the next paint and once everything has loaded.
            if (typeof ResizeObserver !== "undefined") {
                new ResizeObserver(updateNav).observe(track);
            } else {
                window.addEventListener("resize", updateNav, { passive: true });
            }
            window.addEventListener("load", updateNav);
            requestAnimationFrame(updateNav);
            updateNav();
        });
    }

    // Height of any fixed/sticky header pinned to the top of the viewport, so we
    // can offset scrolling and not hide content behind it. The host header has no
    // known selector, so we detect it: the tallest fixed/sticky, full-width-ish
    // element sitting at the top.
    function getHeaderOffset() {
        let offset = 0;
        const vw = window.innerWidth;

        document.querySelectorAll("body *").forEach((el) => {
            const style = getComputedStyle(el);
            if (style.position !== "fixed" && style.position !== "sticky") return;
            if (style.visibility === "hidden" || style.display === "none") return;

            const rect = el.getBoundingClientRect();
            // Pinned to the top, wide enough to be a header bar (not a small FAB).
            if (rect.top <= 1 && rect.height > 0 && rect.width >= vw * 0.6) {
                offset = Math.max(offset, rect.bottom);
            }
        });

        return offset;
    }

    // Scroll a category to just below the page header (with a small gap).
    function scrollCategoryToTop(category) {
        const top =
            category.getBoundingClientRect().top + window.scrollY - getHeaderOffset() - 12;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }

    // "View all" expands a single category into a full grid of every product and
    // hides the others; "View less" restores the carousel layout for all.
    function wireViewToggles(root) {
        root.addEventListener("click", (event) => {
            const button = event.target.closest(`.${PREFIX}-category__viewall`);
            if (!button) return;

            const category = button.closest(`.${PREFIX}-category`);
            if (!category) return;

            const expanded = category.classList.toggle(`${PREFIX}-category--expanded`);
            // Hiding the other categories is driven off the root so a single class
            // toggle controls the whole layout.
            root.classList.toggle(`${PREFIX}-root--expanded`, expanded);

            const label = button.querySelector(`.${PREFIX}-category__viewall-label`);
            if (label) label.textContent = expanded ? "View less" : "View all";
            button.setAttribute("aria-expanded", String(expanded));

            // On both expand and collapse, bring the (still-visible) category to the
            // top, just below the fixed header so its title isn't hidden behind it.
            scrollCategoryToTop(category);
        });
    }

    function renderCategories(categorizedProducts) {
        if (document.getElementById(`${PREFIX}-root`)) return;

        const root = document.createElement("section");
        root.id = `${PREFIX}-root`;
        root.className = `${PREFIX}-root`;
        root.innerHTML = buildCategoriesHTML(categorizedProducts);

        const mount = document.querySelector(MOUNT_SELECTOR) || document.body;
        mount.insertAdjacentElement('afterend', root);

        wireCarousels(root);
        wireViewToggles(root);
        return root;
    }

    function init() {
        utils.waitUntil(() => {
            return window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps && window.__NEXT_DATA__.props.pageProps.shopPage && window.__NEXT_DATA__.props.pageProps.shopPage.items;
        }, 5000)
            .then((items) => {
                const categorizedProducts = categorizeProducts(items);
                utils.waitUntil(() => document.querySelector(MOUNT_SELECTOR), 5000)
                    .then(() => {
                        renderCategories(categorizedProducts);
                    })
                    .catch(() => {
                        utils.log('Merchant details page elements not found after initial wait.');
                    });

                const SELECTORS = [
                    'div[data-unbxd-identifier="unbxdanalyticsProduct"]',
                    'h1[font-family="header"]',
                ];

                const hideWrapper = (selector) => {
                    const wrapper = document.querySelector(selector)?.closest('div[width="1"]')?.parentElement;
                    wrapper?.classList.add(`${PREFIX}-hidden`);
                };

                utils.waitUntil(() => document.querySelector(SELECTORS[0]), 5000)
                    .then(() => SELECTORS.forEach(hideWrapper))
                    .catch(() => utils.log('Selector not found'));
            })
            .catch(() => {
                utils.log('Product data not found');
            });
    }

    init();

})();