(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "CRO875C";

        /* all Pure helper functions */

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function addClass(el, cls) {
            var node = document.querySelector(el);
            if (node) {
                node.classList.add(cls);
            }
        }

        function log(msg) {
            if (debug) console.log("[" + variation_name + "] " + msg);
        }

        /* ── Data ──
           Link labels/hrefs come from the sr-only accessibility nav tree rendered
           directly after </header> — server-rendered on every page type, identical
           in both header arms, clean canonical URLs. The visual extras of the real
           ?hdr=b panel that do not exist in that tree (chevron flags, highlight
           tiles, Drinkware sub-links) are snapshotted below from the live ?hdr=b
           panel, captured 2026-08-10. */

        var DRINKWARE_CHILDREN = [
            { label: "Bottles", path: "/category/car-camping/hydration/thermo-bottles" },
            { label: "Tumblers & Mugs", path: "/category/car-camping/hydration/thermo-tumblers-and-mugs" },
            { label: "Jugs & Faucet", path: "/category/car-camping/hydration/jugs-and-faucet" },
            { label: "Tanks & Mounts", path: "/category/car-camping/hydration/tanks-mounts" },
            { label: "Accessories", path: "/category/car-camping/hydration/hydration-accessories" }
        ];

        /* sub-links that show a drill-down chevron in the real panel, per tab */
        var CHEVRONS = {
            "Coolers": ["Electric Coolers"],
            "Racks": ["Racks", "Rack Accessories", "Load Bars", "Popular Vehicles", "Learn More About Our Rack Systems"],
            "Camping": ["Camping Tents", "Camping Furniture", "Camping Kitchen", "Storage"],
            "RV & Van": ["Air Conditioners", "RV Awnings", "Refrigerators", "Kitchen", "Camping Furniture", "Toilets", "Cleaning", "Heating Solutions", "Ventilation", "Safety & Security"],
            "Marine": ["Air Conditioners", "Marine Steering Systems", "Marine Control", "Stabilization", "Mobile Power Solutions", "Toilets", "Refrigeration", "Kitchen", "Blinds"],
            "Power & Solar": ["Portable Batteries"]
        };

        /* featured image tiles per tab, exactly as the real ?hdr=b panel serves them */
        var HIGHLIGHTS = {
            "Coolers": [
                { caption: "New: Meet Recon Frost", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/41CwkceijmaLLqPtRQgQAw/97dd383d7a6f58bd8dce1ad5aba31fde/Recon_Frost_Tout_Block_630_x_630_v1.jpg" },
                { caption: "Explore CFX5 Electric Coolers", href: "/en-us/lp/cfx5", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/1dw0gyjvX858GoX8R1Mzu9/e61ed65a6919fde2e8564b499c3366ef/Navigation_Highlight_CFX5_Summer.jpg" }
            ],
            "Racks": [
                { caption: "The future of adventure gear is almost here. Be the first to know.", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/1JbyXngXMldZ7eYm2TtjPa/0df26e201136589105b4a4cc17af84e5/Navigation_Highlight_desktop_FRS_Teaser.jpg" },
                { caption: "Explore the Front Runner Dometic system.", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/7gJhpvJJcHPpiRMYVud46d/de634d5c044dfa29677160f25cb71082/NavigationHighlight_FRD_LP.jpg" }
            ],
            "Vehicle Accessories": [
                { caption: "Check out the Front Runner Dometic Product of the Month: Drop Down Tailgate Table", href: "/en-us/product/drop-down-tailgate-table-mkiii", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/2rggzFi47oenUPUDKxc72v/ae282e564833cc61076c1d48ff570492/Navigation_Highlight_desktop_DropDownTailgateTable_FrontRunnerDometic_zo.jpg" },
                { caption: "All-New Front Runner Dometic Customisable Cargo Bed Slide", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/2CJsa73douHaOn8QJzdTrG/e63bc35bebcc472471954e5bf987f977/Navigation_Highlight_Cargo_Bed_Slide_desktop.png" }
            ],
            "Camping": [
                { caption: "You. A friend. A 4x4 geared for adventure. You in?", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/7B4aFkm0xlgHnXEVnI03Am/5946fa15453d3f73cee63ee16411fc31/p2p_288x360_v2.gif" },
                { caption: "Explore gear for day hikes, weekend escapes of full expeditions", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/2OavoFVG0AVwEsC86y345y/f40ff38e4a4cc9222f6a0aeff27c7d90/P2P_Navigation_Hghlight_Get_Lost_Ready_Gear_Camping.jpg" }
            ],
            "RV & Van": [
                { caption: "Best in Class. RV Air Conditioners", href: "/en-us/lp/rv-ac", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/78tzGyjIuCqp4nN5MWnOri/ed948565b25c8b4a2692c4e731ca3901/ac-menu-desktop.png" },
                { caption: "Explore our RV Refrigerators", href: "/en-us", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/1a3hhpz3BsrD4S4UcQ1pnB/c95a779f184ca3b1c940f068d6b79984/Navigation_Highlight_Image_Refrigerators.jpg" }
            ],
            "Marine": [
                { caption: "Gyroscopic Stabilization", href: "/en-us/marinelp-gyroscopic-stabilization", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/42Vz2PT8WIn3MY29b7hMaj/a84f8c2aa13dff05374d3bf61095ce21/Navigation_Highlight_Image_GYRO.jpg" },
                { caption: "Explore Trim Tabs", href: "/en-us/boat/marine-control/trim-tabs", img: "https://images.eu.ctfassets.net/tffwvw7unu8l/7K3qoh83auYL3yqTR3RLgQ/537833821d5aea99bf48584d37a6072e/Navigation_Highlight_Image_Trim_Tabs.jpg" }
            ]
        };

        /* the real Camping tab does not list Hydration (it lives under Drinkware) */
        var EXCLUDE = { "Camping": ["Hydration"] };

        /* drill-down chevron svg, copied from the real panel */
        var chevronSvg =
            '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="cro-875c-chevron" aria-hidden="true">' +
            '<path d="M5.53711 2.37305L11.1672 8.00317L5.53711 13.6333" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg>';

        function readNavTree() {
            var root = document.querySelector("header + div.sr-only > ul");
            if (!root) return null;

            var data = { products: [], activities: null, journal: null, sale: null };

            var tops = root.children;
            for (var i = 0; i < tops.length; i++) {
                var link = tops[i].querySelector(":scope > a");
                if (!link) continue;
                var label = link.textContent.trim();
                var item = { label: label, href: link.getAttribute("href"), children: [] };

                var subLinks = tops[i].querySelectorAll(":scope > ul > li > a");
                for (var j = 0; j < subLinks.length; j++) {
                    item.children.push({
                        label: subLinks[j].textContent.trim(),
                        href: subLinks[j].getAttribute("href")
                    });
                }

                var excluded = EXCLUDE[label];
                if (excluded) {
                    item.children = item.children.filter(function (c) {
                        return excluded.indexOf(c.label) === -1;
                    });
                }

                var key = label.toLowerCase();
                if (key === "shop by activity") data.activities = item;
                else if (key === "journal") data.journal = item;
                else if (key === "sale") data.sale = item;
                else data.products.push(item);
            }

            if (!data.products.length || !data.activities) return null;

            var prefixMatch = data.products[0].href.match(/^\/[a-z]{2}-[a-z]{2}(?=\/)/);
            var prefix = prefixMatch ? prefixMatch[0] : "";

            for (var p = 0; p < data.products.length; p++) {
                if (data.products[p].label.toLowerCase() === "drinkware" && !data.products[p].children.length) {
                    for (var d = 0; d < DRINKWARE_CHILDREN.length; d++) {
                        data.products[p].children.push({
                            label: DRINKWARE_CHILDREN[d].label,
                            href: prefix + DRINKWARE_CHILDREN[d].path
                        });
                    }
                }
            }

            return data;
        }

        /* ── State ── */
        var navData = null;
        var openPanelId = null;

        /* ── Bar (inside header nav, replaces the 11-link strip) ── */
        function buildBar() {
            var bar = document.createElement("div");
            bar.className = "cro-875c-nav";
            bar.innerHTML =
                '<button type="button" class="cro-875c-item cro-875c-trigger" data-panel="products" aria-expanded="false" aria-controls="cro-875c-panel-products">Products</button>' +
                '<button type="button" class="cro-875c-item cro-875c-trigger" data-panel="activities" aria-expanded="false" aria-controls="cro-875c-panel-activities">Activities</button>' +
                '<a class="cro-875c-item" href="' + navData.journal.href + '">Journal</a>' +
                '<a class="cro-875c-item cro-875c-sale" href="' + navData.sale.href + '">Sale</a>';

            var triggers = bar.querySelectorAll(".cro-875c-trigger");
            for (var i = 0; i < triggers.length; i++) {
                triggers[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    togglePanel(this.getAttribute("data-panel"));
                });
            }
            return bar;
        }

        function injectBar() {
            if (document.querySelector(".cro-875c-nav")) return; /* double-inject guard */
            var strip = document.querySelector('nav[aria-label="Primary navigation"] .scrollbar-hidden');
            if (!strip) return;
            /* sibling insertion before the strip's wrapper — never inside a
               React-managed list container */
            var wrapper = strip.parentElement;
            wrapper.insertAdjacentElement("beforebegin", buildBar());
            log("bar injected");
        }

        /* ── Panels (appended to body, positioned under the header) ── */
        function tileHtml(tile) {
            return (
                '<a class="cro-875c-tile" aria-label="' + tile.caption + '" href="' + tile.href + '">' +
                '<img alt="" loading="lazy" src="' + tile.img + '">' +
                '<span class="cro-875c-tile-shade" aria-hidden="true"></span>' +
                '<span class="cro-875c-tile-caption">' + tile.caption + "</span>" +
                "</a>"
            );
        }

        function buildProductsPanel() {
            var panel = document.createElement("div");
            panel.className = "cro-875c-panel";
            panel.id = "cro-875c-panel-products";
            panel.setAttribute("role", "region");
            panel.setAttribute("aria-label", "Products menu");

            var pillsHtml = "";
            var panesHtml = "";
            for (var i = 0; i < navData.products.length; i++) {
                var cat = navData.products[i];
                var active = i === 0 ? " cro-875c-active" : "";
                pillsHtml +=
                    '<button type="button" role="tab" aria-selected="' + (i === 0 ? "true" : "false") + '" class="cro-875c-pill' + active + '" data-index="' + i + '">' +
                    cat.label + "</button>";

                var chevronLabels = CHEVRONS[cat.label] || [];
                var linksHtml = "";
                for (var j = 0; j < cat.children.length; j++) {
                    var child = cat.children[j];
                    var hasChevron = chevronLabels.indexOf(child.label) > -1;
                    linksHtml +=
                        "<li>" +
                        '<a href="' + child.href + '">' + child.label + "</a>" +
                        (hasChevron ? chevronSvg : "") +
                        "</li>";
                }

                var tiles = HIGHLIGHTS[cat.label] || [];
                var tilesHtml = "";
                for (var h = 0; h < tiles.length; h++) {
                    tilesHtml += tileHtml(tiles[h]);
                }

                panesHtml =
                    panesHtml +
                    '<div class="cro-875c-pane' + active + '" data-index="' + i + '">' +
                    '<div class="cro-875c-explore"><a href="' + cat.href + '">Explore All</a></div>' +
                    "<ul>" + linksHtml + "</ul>" +
                    (tilesHtml ? '<div class="cro-875c-tiles">' + tilesHtml + "</div>" : "") +
                    "</div>";
            }

            panel.innerHTML =
                '<div class="cro-875c-panel-inner">' +
                '<div class="cro-875c-tablist" role="tablist" aria-label="Products">' + pillsHtml + "</div>" +
                '<div class="cro-875c-panes">' + panesHtml + "</div>" +
                "</div>";

            var pills = panel.querySelectorAll(".cro-875c-pill");
            function activateTab(index) {
                for (var k = 0; k < pills.length; k++) {
                    var on = pills[k].getAttribute("data-index") === index;
                    pills[k].classList.toggle("cro-875c-active", on);
                    pills[k].setAttribute("aria-selected", on ? "true" : "false");
                }
                var panes = panel.querySelectorAll(".cro-875c-pane");
                for (var m = 0; m < panes.length; m++) {
                    panes[m].classList.toggle("cro-875c-active", panes[m].getAttribute("data-index") === index);
                }
            }
            for (var t = 0; t < pills.length; t++) {
                pills[t].addEventListener("click", function () {
                    activateTab(this.getAttribute("data-index"));
                });
            }
            return panel;
        }

        function buildActivitiesPanel() {
            var panel = document.createElement("div");
            panel.className = "cro-875c-panel";
            panel.id = "cro-875c-panel-activities";
            panel.setAttribute("role", "region");
            panel.setAttribute("aria-label", "Activities menu");

            /* the real panel lays activities out in columns of 6 */
            var links = navData.activities.children;
            var columnsHtml = "";
            for (var c = 0; c < links.length; c += 6) {
                var colHtml = "";
                for (var i = c; i < Math.min(c + 6, links.length); i++) {
                    colHtml += '<li><a href="' + links[i].href + '">' + links[i].label + "</a></li>";
                }
                columnsHtml += "<ul>" + colHtml + "</ul>";
            }
            panel.innerHTML = '<div class="cro-875c-panel-inner cro-875c-activities">' + columnsHtml + "</div>";
            return panel;
        }

        function injectPanels() {
            if (!document.getElementById("cro-875c-panel-products")) {
                document.body.appendChild(buildProductsPanel());
            }
            if (!document.getElementById("cro-875c-panel-activities")) {
                document.body.appendChild(buildActivitiesPanel());
            }
        }

        /* ── Open / close ── */
        function positionPanels() {
            var nav = document.querySelector('nav[aria-label="Primary navigation"]');
            var headerEl = nav ? nav.closest("header") : document.querySelector("header");
            if (!headerEl) return;
            var top = Math.max(headerEl.getBoundingClientRect().bottom, 0);
            var panels = document.querySelectorAll(".cro-875c-panel");
            for (var i = 0; i < panels.length; i++) {
                panels[i].style.top = top + "px";
            }
        }

        function setTriggerState(panelKey, expanded) {
            var trigger = document.querySelector('.cro-875c-trigger[data-panel="' + panelKey + '"]');
            if (trigger) {
                trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
                trigger.classList.toggle("cro-875c-open-trigger", expanded);
            }
        }

        function closePanels() {
            var panels = document.querySelectorAll(".cro-875c-panel.cro-875c-open");
            for (var i = 0; i < panels.length; i++) {
                panels[i].classList.remove("cro-875c-open");
            }
            setTriggerState("products", false);
            setTriggerState("activities", false);
            openPanelId = null;
        }

        function togglePanel(panelKey) {
            var panel = document.getElementById("cro-875c-panel-" + panelKey);
            if (!panel) return;
            var isOpen = panel.classList.contains("cro-875c-open");
            closePanels();
            if (!isOpen) {
                positionPanels();
                panel.classList.add("cro-875c-open");
                setTriggerState(panelKey, true);
                openPanelId = panelKey;
            }
        }

        /* ── Global listeners (bound once) ── */
        function bindGlobalListeners() {
            if (window.cro_875c_listeners) return;
            window.cro_875c_listeners = true;

            /* capture phase so React's stopPropagation cannot swallow outside clicks */
            document.addEventListener(
                "click",
                function (e) {
                    if (!openPanelId) return;
                    if (e.target.closest && (e.target.closest(".cro-875c-panel") || e.target.closest(".cro-875c-trigger"))) return;
                    closePanels();
                },
                true
            );

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") closePanels();
            });

            window.addEventListener(
                "scroll",
                function () {
                    if (openPanelId) positionPanels();
                },
                { passive: true }
            );
            window.addEventListener("resize", function () {
                if (openPanelId) positionPanels();
                if (window.innerWidth < 768) closePanels();
            });

            /* close on SPA navigation */
            window.addEventListener("popstate", closePanels);
        }

        /* ── Injection + resilience ── */
        function injectAll() {
            if (!navData) navData = readNavTree();
            if (!navData) {
                log("nav tree not found — aborting, control experience keeps rendering");
                return;
            }
            injectBar();
            injectPanels();
            /* body class after HTML so layout + content land in one paint */
            addClass("body", variation_name);
            bindGlobalListeners();
        }

        function init() {
            injectAll();

            /* Late-hydration restore guard: Next.js hydration (~2s after load)
               can wipe injected DOM and the body class. Re-assert for 8s. */
            var guard = setInterval(function () {
                if (!document.querySelector(".cro-875c-nav") || !document.body.classList.contains(variation_name)) {
                    injectAll();
                }
            }, 300);
            setTimeout(function () {
                clearInterval(guard);
            }, 8000);

            /* Watch the header (stable ancestor that survives re-renders) so the
               bar comes back if React replaces the nav strip on soft navigation. */
            var nav = document.querySelector('nav[aria-label="Primary navigation"]');
            var headerEl = nav ? nav.closest("header") : null;
            if (headerEl && !window.cro_875c_observer) {
                window.cro_875c_observer = true;
                var debounceTimer = null;
                var observer = new MutationObserver(function () {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(function () {
                        if (!document.querySelector(".cro-875c-nav")) {
                            closePanels();
                            injectAll();
                        }
                    }, 150);
                });
                observer.observe(headerEl, { childList: true, subtree: true });
            }
        }

        if (!window.cro_875c) {
            window.cro_875c = true;
            waitForElement('nav[aria-label="Primary navigation"] .scrollbar-hidden', init);
        }
    } catch (e) {
        console.log("Error in Variation JavaScript", e);
    }
})();
