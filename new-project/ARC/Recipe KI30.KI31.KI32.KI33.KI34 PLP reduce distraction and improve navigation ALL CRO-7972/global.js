(function () {
    try {
        // PAGE EXCLUSIONS — skip running global JS entirely on these pages
        // NOTE: '/brands' is NOT globally excluded — CRO-12345 runs on brand pages.
        // Brand-page blocking for other tests is handled inside each experiment.
        var EXCLUDED_PATHS = [
            '/arc/arc-exclusives',
            '/arc-personalisation',
            '/new-in',
            '/sales'
        ];
        var EXCLUDED_CONTAINS = ['/admin'];
        var currentPagePath = window.location.pathname;
        var isExcludedPage = EXCLUDED_PATHS.indexOf(currentPagePath) !== -1 ||
            EXCLUDED_CONTAINS.some(function (sub) { return currentPagePath.indexOf(sub) !== -1; });
        if (isExcludedPage) {
            console.log("Global JavaScript skipped — excluded page: " + currentPagePath);
            // strip any leftover test body classes (e.g. cro-7972, CRO_XXXX_Variation) from SPA navigation
            Array.prototype.slice.call(document.body.classList).forEach(function (cls) {
                if (/^cro[-_]/i.test(cls)) document.body.classList.remove(cls);
            });
            return;
        }

        // =====================================================
        // ARC PAGE GUARD — used ONLY by CRO-12345 (brand banner).
        // Other experiments keep their own page checks and are
        // NOT gated by this guard.
        // =====================================================

        function normalizeArcPath(path) {
            path = path || window.location.pathname || '/';
            path = String(path).split('?')[0].split('#')[0].toLowerCase();

            try {
                path = decodeURIComponent(path);
            } catch (e) {
                // keep original path if decode fails
            }

            // remove trailing slash except homepage
            if (path.length > 1) {
                path = path.replace(/\/+$/, '');
            }

            return path || '/';
        }

        function isArcExcludedPage(path) {
            path = normalizeArcPath(path);

            var excludedPatterns = [
                // Homepage
                /^\/$/,

                // No-touch brands
                /^\/brands\/dior(\/.*)?$/,
                /^\/dior-makeup(\/.*)?$/,
                /^\/dior-fragrance(\/.*)?$/,
                /^\/brands\/chanel(\/.*)?$/,
                /^\/chanel-makeup(\/.*)?$/,

                // Premium brands - test only after brand sign-off
                /^\/brands\/sol-de-janeiro(\/.*)?$/,
                /^\/brands\/drunk-elephant(\/.*)?$/,
                /^\/brands\/nars(\/.*)?$/,
                /^\/brands\/maison-margiela(\/.*)?$/,
                /^\/brands\/kylie-cosmetics-by-kylie-jenner(\/.*)?$/,
                /^\/brands\/dolce-gabbana(\/.*)?$/,
                /^\/brands\/bvlgari(\/.*)?$/,
                /^\/bvlgari-fragrances(\/.*)?$/,

                // Promo / campaign / deals / clearance pages
                /^\/fathers-day(\/.*)?$/,
                /^\/15-off-r1500$/,
                /^\/offers$/,
                /^\/last-of-the-best$/,

                // Checkout / cart / functional pages
                // /^\/arc\/arc-checkout(\/.*)?$/,
                // /^\/arc-checkout(\/.*)?$/,

                // PDP pages only: /products/<slug>/<id>
                /^\/products\/[^\/]+\/[^\/]+$/
            ];

            // Optional safety exclusion
            if (path.indexOf('/admin') !== -1) {
                return true;
            }

            for (var i = 0; i < excludedPatterns.length; i++) {
                if (excludedPatterns[i].test(path)) {
                    return true;
                }
            }

            return false;
        }

        function isArcAllowedListingPage(path) {
            path = normalizeArcPath(path);

            if (isArcExcludedPage(path)) {
                return false;
            }

            var allowedPatterns = [
                // Main listing/category pages
                /^\/products$/,
                /^\/makeup(\/.*)?$/,
                /^\/skincare(\/.*)?$/,
                /^\/fragrance(\/.*)?$/,
                /^\/haircare(\/.*)?$/,
                /^\/body(\/.*)?$/,
                /^\/accessories(\/.*)?$/,
                /^\/new-in(\/.*)?$/,
                /^\/arc\/arc-exclusives(\/.*)?$/,
                /^\/arc-personalisation(\/.*)?$/,

                // Standard brand pages are allowed by default,
                // except no-touch/premium brands already blocked above.
                /^\/brands\/[^\/]+(\/.*)?$/
            ];

            for (var i = 0; i < allowedPatterns.length; i++) {
                if (allowedPatterns[i].test(path)) {
                    return true;
                }
            }

            return false;
        }

        function arcPageGuard(context) {
            if (!isArcAllowedListingPage(window.location.pathname)) {
                console.log('CRO-12345 skipped — ARC excluded/not-in-scope page: ' + window.location.pathname + (context ? ' | ' + context : ''));
                return false;
            }

            return true;
        }

        // LIBRARY FUNCTIONS
        var lib = {
            live(selector, event, callback, context) {
                // helper for enabling IE 8 event bindings
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent("on" + type, handler);
                    else el.addEventListener(type, handler);
                }
                // matches polyfill
                this &&
                    this.Element &&
                    (function (ElementPrototype) {
                        ElementPrototype.matches =
                            ElementPrototype.matches ||
                            ElementPrototype.matchesSelector ||
                            ElementPrototype.webkitMatchesSelector ||
                            ElementPrototype.msMatchesSelector ||
                            function (selector) {
                                var node = this,
                                    nodes = (node.parentNode || node.document).querySelectorAll(selector),
                                    i = -1;
                                while (nodes[++i] && nodes[i] != node);
                                return !!nodes[i];
                            };
                    })(Element.prototype);
                // live binding helper using matchesSelector
                function live(selector, event, callback, context) {
                    addEvent(context || document, event, function (e) {
                        var found,
                            el = e.target || e.srcElement;
                        while (el && el.matches && el !== context && !(found = el.matches(selector)))
                            el = el.parentElement;
                        if (found) callback.call(el, e);
                    });
                }
                live(selector, event, callback, context);
            },
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            waitForElement(selector, trigger, delayInterval, delayTimeout) {
                var interval = setInterval(function () {
                    if (
                        document &&
                        document.querySelector(selector) &&
                        document.querySelectorAll(selector).length > 0
                    ) {
                        clearInterval(interval);
                        trigger();
                    }
                }, delayInterval);
                setTimeout(function () {
                    clearInterval(interval);
                }, delayTimeout);
            },
            listener(trigger) {
                if (window.__arcGlobalLocationListenerAdded) return;
                window.__arcGlobalLocationListenerAdded = true;

                window.addEventListener("locationchange", function () {
                    trigger();
                });

                if (!window.__arcGlobalHistoryPatched) {
                    window.__arcGlobalHistoryPatched = true;

                    history.pushState = ((f) =>
                        function pushState() {
                            var ret = f.apply(this, arguments);
                            window.dispatchEvent(new Event("pushstate"));
                            window.dispatchEvent(new Event("locationchange"));
                            return ret;
                        })(history.pushState);
                    history.replaceState = ((f) =>
                        function replaceState() {
                            var ret = f.apply(this, arguments);
                            window.dispatchEvent(new Event("replacestate"));
                            window.dispatchEvent(new Event("locationchange"));
                            return ret;
                        })(history.replaceState);
                    window.addEventListener("popstate", () => {
                        window.dispatchEvent(new Event("locationchange"));
                    });
                }
            },
        };

        // SPA cleanup for CRO-12345 only — remove its classes when
        // navigating away from an allowed brand page
        lib.listener(function () {
            var path = normalizeArcPath(window.location.pathname);
            var isValidBrandPage = path.indexOf('/brands/') === 0 && isArcAllowedListingPage(path);
            if (!isValidBrandPage) {
                document.body.classList.remove('CRP_ARC_SW_Brand_Banner_Below');
                document.body.classList.remove('cro-12345-done');
            }
        });

        /**
         * Trigger converion goal
         */

        /**
         * Manual activation
         */

        var experiments = {
            test_checkout() {
                (function () {
                    try {
                        const ACTIVE_CLASS = 'step-bar__step--custom--active';
                        const BODY_PREFIX = 'cro_';
                        lib.waitForElement('.step-bar--custom', function () {
                            const stepBar = document.querySelector('.step-bar--custom');
                            let lastClass = '';
                            function syncBodyClass() {
                                try {
                                    const activeStep = stepBar.querySelector('.' + ACTIVE_CLASS);
                                    const btn = activeStep && activeStep.querySelector('button');
                                    const label = btn ? btn.textContent.trim().replace(/\s+/g, '_') : '';
                                    const newClass = label ? BODY_PREFIX + label : '';

                                    if (newClass === lastClass) return; // skip redundant work
                                    if (lastClass) document.body.classList.remove(lastClass);
                                    if (newClass) document.body.classList.add(newClass);
                                    lastClass = newClass;
                                } catch (e) { /* swallow */ }
                            }

                            syncBodyClass();
                            new MutationObserver(syncBodyClass).observe(stepBar, {
                                attributes: true,
                                attributeFilter: ['class'],
                                subtree: true,
                            });
                        }, 50, 20000)

                    } catch (e) { /* swallow */ }
                })();
            },
            test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521() {
                var currentPath = window.location.pathname;
                if (currentPath.indexOf('/brands') == -1 || currentPath.indexOf('/sales') == -1) {
                    lib.waitForElement('#multiForm', function () {
                        window.crotest_KI5_Remove_headers_on_PLPs_ALL_CRO7521 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004200203"]);
                        console.log("Experiment Recipe KI5 | Remove headers on PLPs | ALL | CRO-7521 Activated");
                    }, 50, 20000)

                }
            }, test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143() {
                lib.waitForElement('#Block__AddressContainer', function () {
                    window.crotest_Recipe_KI53_Reduce_visual_overwhelm = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004194416"]);
                    console.log("Experiment Recipe KI53 | Reduce visual overwhelm on Delivery page | ALL | CRO-8143 Activated");
                }, 50, 20000)
            }, test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972() {
                var currentPath = window.location.pathname;
                lib.waitForElement('#multiForm', function () {
                    if (currentPath.indexOf('/brands') == -1 || currentPath.indexOf('/sales') == -1) {
                        window.crotest_PLP_reduce_distraction_improve_navigation_ALL_CRO7972 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004198304"]);
                        console.log("Experiment Recipe KI30.KI31.KI32.KI33.KI34 | PLP reduce distraction and improve navigation | ALL | CRO-7972 Activated");
                    }
                }, 50, 20000)

                setTimeout(function () {
                    if (currentPath.indexOf('/brands') != -1 && document.querySelector('.cro-7972')) {
                        document.querySelector('body').classList.remove('cro-7972')
                    }
                }, 600)
            }, test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505() {
                lib.waitForElement('.cro_My_Bag, .cro_Delivery, .cro_Payment', function () {
                    window.crotest_Recipe_KI19_checkout_ALL_CRO7505 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004199433"]);
                    console.log("Experiment Recipe KI19 | Add conventional elements to the checkout | ALL | CRO-7505 Activated");
                }, 50, 20000)
            }, test_Recipe_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345: function () {
                var currentPath = normalizeArcPath(window.location.pathname);
                var isOnBrandPage = currentPath.indexOf('/brands/') === 0;

                if (isOnBrandPage && arcPageGuard('CRO-12345')) {
                    lib.waitForElement('#multiForm', function () {
                        if (!arcPageGuard('CRO-12345 callback')) {
                            return;
                        }

                        window.crotest_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(['executeExperiment', '1004203197']);

                        console.log('Experiment AB Test | Brand banner | Move below products | ALL | CRO - 12345 Activated');
                    }, 50, 20000);
                } else {
                    if (document.body.classList.contains('CRP_ARC_SW_Brand_Banner_Below')) {
                        document.body.classList.remove('CRP_ARC_SW_Brand_Banner_Below');
                        document.body.classList.remove('cro-12345-done');
                    }
                }
            }, test_AB_Test_PLP_discovery_blocks_Move_below_product_grid_ALL_CRO12370() {
                var currentPath = window.location.pathname;
                lib.waitForElement('#multiForm', function () {
                    if (currentPath.indexOf('/brands') == -1 || currentPath.indexOf('/sales') == -1) {
                        window.crotest_AB_Test_PLP_discovery_blocks_Move_below_product_grid_CRO12370 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "1004203738"]);
                        console.log("Experiment AB Test | PLP discovery blocks | Move below product grid | ALL | CRO-12370 Activated");
                    }
                }, 50, 20000)

                setTimeout(function () {
                    if (currentPath.indexOf('/brands') != -1 && document.querySelector('.cro-12370')) {
                        document.querySelector('body').classList.remove('cro-12370')
                    }
                }, 600)
            },
            test_AB_Test_Mobile_Nav_Bottom_navigation_bar_MOBILE_CRO12435() {
                if (window.crotest_AB_Test_Mobile_Nav_Bottom_navigation_bar_MOBILE_CRO12435) return;
                var currentPath = window.location.pathname.toLowerCase();
                if (currentPath.indexOf('checkout') == -1 && currentPath.indexOf('/default.aspx') == -1) {
                    window.crotest_AB_Test_Mobile_Nav_Bottom_navigation_bar_MOBILE_CRO12435 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004204275"]);
                    console.log("Experiment AB Test | Mobile Nav | Bottom navigation bar | MOBILE | CRO-12435 Activated");
                }
            }
        };


        console.log("Global JavaScript Activate");
        experiments.test_checkout();
        experiments.test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521();
        experiments.test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143();
        experiments.test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972();
        experiments.test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505();
        experiments.test_Recipe_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345();

        experiments.test_AB_Test_PLP_discovery_blocks_Move_below_product_grid_ALL_CRO12370();
        experiments.test_AB_Test_Mobile_Nav_Bottom_navigation_bar_MOBILE_CRO12435();
    } catch (e) {
        console.log("Error in Global JavaScript", e);
    }
})();