(function () {
    var debug = 1;
    var recipe_name = "cro-ki69";

    // =========================
    // UTILITIES
    // =========================
    function waitForElement(selector, trigger, delayInterval, delayTimeout) {
        var interval = setInterval(function () {
            if (document && document.querySelector(selector)) {
                clearInterval(interval);
                trigger();
            }
        }, delayInterval);
        setTimeout(function () { clearInterval(interval); }, delayTimeout);
    }

    function waitForNextData(trigger, delayInterval, delayTimeout) {
        delayInterval = delayInterval || 50;
        delayTimeout = delayTimeout || 8000;
        var interval = setInterval(function () {
            var d = window.__NEXT_DATA__;
            if (d && d.props && d.props.pageProps && d.props.pageProps.shopPage && d.props.pageProps.shopPage.items) {
                clearInterval(interval);
                trigger();
            }
        }, delayInterval);
        setTimeout(function () { clearInterval(interval); }, delayTimeout);
    }

    function addClass(el, cls) {
        var element = document.querySelector(el);
        if (element) element.classList.add(cls);
    }

    function normText(v) {
        return (v || "").toString().trim();
    }

    function cssSafe(str) {
        return normText(str).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
    }

    function prettySlugLabel(slug) {
        var raw = normText(slug).replace(/-/g, " ");
        var words = raw.split(/\s+/).filter(Boolean).map(function (w) { return w.toLowerCase(); });
        var replaced = words.map(function (w) { return w === "and" ? "&" : w; });
        return replaced.map(function (w) {
            if (w === "&") return "&";
            return w.charAt(0).toUpperCase() + w.slice(1);
        }).join(" ");
    }

    // =========================
    // CONFIG
    // =========================
    var CATEGORY_PRIORITY = [
        "apparel-and-accessories",
        "home-and-garden",
        "health-and-beauty",
        "electronics",
        "furniture"
    ];

    var CARDS_PER_PAGE = 4;
    var CARD_GAP_DESKTOP = 16; // px — must match CSS gap

    // =========================
    // MAIN CONTAINER
    // =========================
    function getMainContainer() {
        return document.querySelector(".ki69-product-container");
    }

    // Unbxd reuses this same data attribute for header search-autocomplete cards,
    // so skip anything sitting inside <header> to avoid tagging the search dropdown.
    function findPLPProductNode() {
        var nodes = document.querySelectorAll('[data-unbxd-identifier="unbxdanalyticsProduct"]');
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].closest("header")) return nodes[i];
        }
        return null;
    }

    // =========================
    // DATA EXTRACTION
    // =========================
    function extractProducts() {
        var items = window.__NEXT_DATA__.props.pageProps.shopPage.items;
        if (!items || !Array.isArray(items)) return [];

        var products = [];
        items.forEach(function (item) {
            var itemProducts = (item && item.props && item.props.items) || [];
            itemProducts.forEach(function (product) {
                var topCat = (product.topLevelCategories && product.topLevelCategories[0]) || null;
                var catId = topCat ? normText(topCat.id) : "";
                var catName = topCat ? normText(topCat.name) :
                    (product.categories && product.categories[0] ? normText(product.categories[0].name) : "");
                var catUrl = topCat ? normText(topCat.url || "") : "";
                var priceStr = (product.price && product.price.formattedValue) || "";

                products.push({
                    price: priceStr,
                    priceValue: parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0,
                    retailPrice: (product.retailPrice && product.retailPrice.formattedValue) || "",
                    productUrl: product.id || "#",
                    name: product.shortName || "No Name",
                    brand: product.brand || "",
                    categoryId: catId,
                    categoryName: catName,
                    categoryUrl: catUrl,
                    imageUrl: (product.image && product.image.url) || "",
                    savingPercent: product.saving && product.saving.percent ? product.saving.percent + "%" : "",
                    savingValue: (product.saving && product.saving.percent) || 0,
                    blueTag: product.blueTag || "",
                    bestSeller: product.isBestSeller || false,
                    leftQuantity: product.xLeftQuantity || ""
                });
            });
        });
        return products;
    }

    // =========================
    // GROUPING & SORTING
    // =========================
    function groupProducts(products) {
        var groups = {};
        var order = [];

        products.forEach(function (p) {
            var key = p.categoryId || cssSafe(p.categoryName) || "other";
            if (!groups[key]) {
                groups[key] = {
                    id: key,
                    name: p.categoryName || prettySlugLabel(key),
                    url: p.categoryUrl,
                    products: []
                };
                order.push(key);
            }
            // Only add product under its FIRST (primary) category — skip duplicates
            groups[key].products.push(p);
        });

        return order.map(function (key) { return groups[key]; });
    }

    function sortGroups(groups) {
        var priorityMap = {};
        CATEGORY_PRIORITY.forEach(function (id, i) { priorityMap[id] = i; });

        var prioritized = [];
        var others = [];

        groups.forEach(function (g) {
            if (priorityMap.hasOwnProperty(g.id)) prioritized.push(g);
            else others.push(g);
        });

        prioritized.sort(function (a, b) { return priorityMap[a.id] - priorityMap[b.id]; });
        others.sort(function (a, b) { return b.products.length - a.products.length; });

        return prioritized.concat(others);
    }

    // =========================
    // CARD HTML
    // =========================
    function buildCardHTML(product) {
        var quantityHTML = product.leftQuantity
            ? '<div class="ki69-card-quantity">' + product.leftQuantity + ' left</div>' : "";
        var blueTagLower = product.blueTag ? product.blueTag.toLowerCase() : "";
        var blueTagHTML = (product.blueTag && !blueTagLower.includes("size"))
            ? '<div class="ki69-card-bluetag">' + product.blueTag + '</div>' : "";
        var bestSellerClass = product.bestSeller ? " show" : "";
        var imgSrc = product.imageUrl
            ? product.imageUrl + "?auto=compress,format&w=600&h=600&bg=fff&fit=fill" : "";
        var productHref = "https://www.onedayonly.co.za/products/" + product.productUrl;

        return '<div class="ki69-card">' +
            '<a href="' + productHref + '" class="ki69-card-link">' +
            '<div class="ki69-card-top">' +
            '<div class="ki69-card-img">' +
            '<img src="' + imgSrc + '" alt="' + product.name + '" loading="lazy" />' +
            '</div>' +
            (product.savingPercent ?
                '<div class="ki69-card-saving">' +
                '<span class="ki69-saving-label">SAVE</span>' +
                '<span class="ki69-saving-value">' + product.savingPercent + '</span>' +
                '</div>' : "") +
            '<div class="ki69-card-tags">' +
            '<div class="ki69-card-bestseller' + bestSellerClass + '">BEST SELLER</div>' +
            quantityHTML +
            blueTagHTML +
            '</div>' +
            '</div>' +
            '<div class="ki69-card-bottom">' +
            '<div class="ki69-card-brand">' + product.brand + '</div>' +
            '<div class="ki69-card-name">' + product.name + '</div>' +
            '<div class="ki69-card-pricing">' +
            '<span class="ki69-card-price">' + product.price + '</span>' +
            '<span class="ki69-card-retail">' + product.retailPrice + '</span>' +
            '<a href="' + productHref + '" class="ki69-card-plus" aria-label="View product">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>';
    }

    // =========================
    // SECTION HTML
    // =========================
    function buildSectionHTML(group) {
        var isDesktop = window.innerWidth >= 1024;
        var hasCarousel = isDesktop && group.products.length > CARDS_PER_PAGE;

        var categoryLabel = prettySlugLabel(group.name || group.id);
        var viewAllUrl = group.url
            ? (group.url.charAt(0) === "/" ? "https://www.onedayonly.co.za" + group.url : group.url)
            : ("https://www.onedayonly.co.za/category/" + group.id);

        var cardsHTML = group.products.map(buildCardHTML).join("");

        var prevBtn = '<button class="ki69-arrow ki69-arrow-prev ki69-arrow-hidden" aria-label="Previous" type="button">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
            '</button>';

        var nextBtn = '<button class="ki69-arrow ki69-arrow-next" aria-label="Next" type="button">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
            '</button>';

        var sectionClass = "ki69-category-section" + (hasCarousel ? " ki69-has-carousel" : " ki69-static");
        // Show View All only when there are more products than fit in one page (desktop and mobile)
        var showViewAll = group.products.length > CARDS_PER_PAGE;

        return '<div class="' + sectionClass + '" data-category-id="' + cssSafe(group.id) + '">' +
            '<div class="ki69-section-header">' +
            '<h2 class="ki69-section-title">' + categoryLabel + '</h2>' +
            (showViewAll ?
                '<a href="' + viewAllUrl + '" class="ki69-view-all" data-category-id="' + cssSafe(group.id) + '">' +
                'View all ' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
                '</a>'
                : "") +
            '</div>' +
            '<div class="ki69-carousel-wrapper">' +
            (hasCarousel ? prevBtn : "") +
            '<div class="ki69-carousel-viewport">' +
            '<div class="ki69-carousel-track">' +
            cardsHTML +
            '</div>' +
            '</div>' +
            (hasCarousel ? nextBtn : "") +
            '</div>' +
            '</div>';
    }

    // =========================
    // ARROW NAVIGATION (Desktop)
    // =========================
    function initCarouselArrows(section) {
        var track = section.querySelector(".ki69-carousel-track");
        var prevBtn = section.querySelector(".ki69-arrow-prev");
        var nextBtn = section.querySelector(".ki69-arrow-next");
        if (!track || !prevBtn || !nextBtn) return;

        var cards = Array.from(track.querySelectorAll(".ki69-card"));
        var totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
        var current = 0;

        function updateArrows() {
            if (current === 0) prevBtn.classList.add("ki69-arrow-hidden");
            else prevBtn.classList.remove("ki69-arrow-hidden");

            if (current >= totalPages - 1) nextBtn.classList.add("ki69-arrow-hidden");
            else nextBtn.classList.remove("ki69-arrow-hidden");
        }

        function goToPage(page) {
            current = Math.max(0, Math.min(page, totalPages - 1));
            var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
            var offset = current * CARDS_PER_PAGE * (cardWidth + CARD_GAP_DESKTOP);
            track.style.transform = "translateX(-" + offset + "px)";
            updateArrows();
        }

        prevBtn.addEventListener("click", function () { goToPage(current - 1); });
        nextBtn.addEventListener("click", function () { goToPage(current + 1); });

        updateArrows();
    }

    // =========================
    // EXPANDED CATEGORY VIEW
    // =========================
    function restoreFromExpanded(container) {
        var expandedView = container.querySelector(".ki69-expanded-view");
        if (!expandedView) return;
        var lastCatId = container.dataset.ki69LastCat;
        document.body.classList.remove("ki69-category-expanded");
        expandedView.style.animation = "ki69-fadeSlideOut 0.2s ease both";
        setTimeout(function () {
            if (expandedView.parentNode) expandedView.remove();
            container.classList.add("ki69-sections-restored");
            container.querySelectorAll(".ki69-category-section").forEach(function (s) {
                s.style.display = "";
            });
            // Scroll back to the section the user expanded from
            if (lastCatId) {
                var section = container.querySelector('[data-category-id="' + lastCatId + '"]');
                if (section) {
                    setTimeout(function () {
                        var offset = section.getBoundingClientRect().top + window.pageYOffset - 90;
                        window.scrollTo({ top: offset, behavior: "smooth" });
                    }, 50);
                }
            }
            setTimeout(function () {
                container.classList.remove("ki69-sections-restored");
            }, 450);
        }, 200);
    }

    function expandCategory(group, container, skipHistory) {
        document.body.classList.add("ki69-category-expanded");

        // Push a new history entry so the browser back button can restore the grid
        if (!skipHistory) {
            var url = new URL(window.location.href);
            url.searchParams.set("crp_filter", cssSafe(group.id));
            history.pushState({ ki69Expanded: cssSafe(group.id) }, "", url.toString());
        }

        // Remember which section was expanded so we can scroll back to it on restore
        container.dataset.ki69LastCat = cssSafe(group.id);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Hide all carousel sections
        container.querySelectorAll(".ki69-category-section").forEach(function (s) {
            s.style.display = "none";
        });

        // Remove any pre-existing expanded view
        var existing = container.querySelector(".ki69-expanded-view");
        if (existing) existing.remove();

        var categoryLabel = prettySlugLabel(group.name || group.id);
        var cardsHTML = group.products.map(buildCardHTML).join("");

        container.insertAdjacentHTML("beforeend",
            '<div class="ki69-expanded-view">' +
            '<div class="ki69-section-header">' +
            '<h2 class="ki69-section-title">' + categoryLabel + '</h2>' +
            '<button class="ki69-back-btn" type="button" aria-label="Back to all categories">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
            ' Back' +
            '</button>' +
            '</div>' +
            '<div class="ki69-expanded-grid">' + cardsHTML + '</div>' +
            '</div>'
        );

        // Manual back button — delegate to browser history; popstate handles the DOM
        container.querySelector(".ki69-back-btn").addEventListener("click", function () {
            history.back();
        });
    }

    // =========================
    // HIDE CONTROL PRODUCTS
    // =========================
    function hideControlProducts() {
        var main = getMainContainer();
        if (!main) return;
        Array.from(main.children).forEach(function (child) {
            if (!child.classList.contains("ki69-carousel-container")) {
                child.style.display = "none";
            }
        });
    }

    // =========================
    // BUILD EXPERIENCE
    // =========================
    function buildExperience() {
        var products = extractProducts();
        if (!products.length) {
            if (debug) console.log("KI69: No products found in __NEXT_DATA__");
            return;
        }

        var groups = sortGroups(groupProducts(products));
        var validGroups = groups.filter(function (g) { return g.products.length > 0; });
        if (!validGroups.length) return;

        var main = getMainContainer();
        if (!main || document.querySelector(".ki69-carousel-container")) return;

        hideControlProducts();
        main.insertAdjacentHTML("beforeend",
            '<div class="ki69-carousel-container" style="display:none;">' +
            validGroups.map(buildSectionHTML).join("") +
            '</div>'
        );

        var container = main.querySelector(".ki69-carousel-container");

        // Arrow init — desktop only
        if (window.innerWidth >= 1024 && container) {
            container.querySelectorAll(".ki69-has-carousel").forEach(function (section) {
                initCarouselArrows(section);
            });
        }

        // View All click → expanded grid view
        if (container) {
            container.querySelectorAll(".ki69-view-all").forEach(function (link) {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    var catId = link.getAttribute("data-category-id");
                    var group = validGroups.find(function (g) { return cssSafe(g.id) === catId; });
                    if (group) expandCategory(group, container);
                });
            });
        }

        // Browser back/forward button — restore grid when crp_filter is removed from URL
        window.addEventListener("popstate", function () {
            var params = new URL(window.location.href).searchParams;
            if (!params.get("crp_filter")) {
                restoreFromExpanded(container);
            }
        });

        // Auto-expand if the page loaded with ?crp_filter already in the URL
        var initialFilter = new URL(window.location.href).searchParams.get("crp_filter");
        if (initialFilter) {
            var matchedGroup = validGroups.find(function (g) { return cssSafe(g.id) === initialFilter; });
            if (matchedGroup) expandCategory(matchedGroup, container, true);
        }

        if (debug) {
            console.log("✅ KI69: " + validGroups.length + " carousels built, " + products.length + " products total");
        }
    }

    // =========================
    // INIT
    // =========================
    function init() {
        addClass("body", recipe_name);
        waitForElement('h1[color="black"]', function () {
            var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                var heading = document.querySelector('h1[color="black"]');
                var outer = heading && heading.closest('[width="1"]');
                if (outer && !outer.classList.contains("ki69-page-heading")) {
                    outer.classList.add("ki69-page-heading");
                }
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);

        }, 50, 20000);





        waitForElement('[data-unbxd-identifier="unbxdanalyticsProduct"]', function () {
            var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
            var intervalCallAgain = setInterval(function () {
                var product = findPLPProductNode();
                var outer = product && product.closest('[width="1"]');
                if (outer && !outer.classList.contains("ki69-product-container")) {
                    outer.classList.add("ki69-product-container");
                }

                waitForElement(".ki69-product-container", function () {
                    waitForNextData(buildExperience);
                }, 50, 20000);
            }, 400);

            //start the countdown
            var Timer = setTimeout(function () {
                clearInterval(intervalCallAgain);
            }, doneTypingInterval);
        }, 50, 20000);


    }

    waitForElement("#__next .spacer", init, 50, 20000);
})();