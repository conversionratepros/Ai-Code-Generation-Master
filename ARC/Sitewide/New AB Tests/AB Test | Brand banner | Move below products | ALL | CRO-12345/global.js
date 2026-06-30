(function () {
    try {
        // =====================================================
        // ARC GLOBAL JS PAGE GUARD
        // Only allow testing on approved listing/category pages.
        // Exclude no-touch brands, premium brands, promo pages,
        // homepage, checkout/cart, offers/clearance, and PDPs.
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

        function removeCroBodyClasses() {
            if (!document.body || !document.body.classList) return;

            Array.prototype.slice.call(document.body.classList).forEach(function (cls) {
                if (/^cro[-_]/i.test(cls)) {
                    document.body.classList.remove(cls);
                }
            });
        }

        function isArcProductDetailPage(path) {
            path = normalizeArcPath(path);

            // Blocks PDP format only: /products/<slug>/<id>
            // Allows exact listing page: /products
            return /^\/products\/[^\/]+\/[^\/]+$/.test(path);
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
                /^\/arc\/arc-checkout(\/.*)?$/,
                /^\/arc-checkout(\/.*)?$/,

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

        function shouldRunArcGlobalJS() {
            return isArcAllowedListingPage(window.location.pathname);
        }

        function arcPageGuard(context) {
            if (!shouldRunArcGlobalJS()) {
                console.log('Global JavaScript skipped — ARC excluded/not-in-scope page: ' + window.location.pathname + (context ? ' | ' + context : ''));
                removeCroBodyClasses();
                return false;
            }

            return true;
        }

        // Stop everything early on excluded / not-in-scope pages
        if (!arcPageGuard('initial load')) {
            return;
        }

        // LIBRARY FUNCTIONS
        var lib = {
            live: function (selector, event, callback, context) {
                // helper for enabling IE 8 event bindings
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent('on' + type, handler);
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
                                var node = this;
                                var nodes = (node.parentNode || node.document).querySelectorAll(selector);
                                var i = -1;

                                while (nodes[++i] && nodes[i] != node);
                                return !!nodes[i];
                            };
                    })(Element.prototype);

                // live binding helper using matchesSelector
                function live(selector, event, callback, context) {
                    addEvent(context || document, event, function (e) {
                        var found;
                        var el = e.target || e.srcElement;

                        while (el && el.matches && el !== context && !(found = el.matches(selector))) {
                            el = el.parentElement;
                        }

                        if (found) callback.call(el, e);
                    });
                }

                live(selector, event, callback, context);
            },

            getCookie: function (name) {
                var nameEQ = name + '=';
                var ca = document.cookie.split(';');

                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];

                    while (c.charAt(0) == ' ') {
                        c = c.substring(1, c.length);
                    }

                    if (c.indexOf(nameEQ) == 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }

                return null;
            },

            waitForElement: function (selector, trigger, delayInterval, delayTimeout) {
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

            listener: function (trigger) {
                if (window.__arcGlobalLocationListenerAdded) return;
                window.__arcGlobalLocationListenerAdded = true;

                window.addEventListener('locationchange', function () {
                    trigger();
                });

                if (!window.__arcGlobalHistoryPatched) {
                    window.__arcGlobalHistoryPatched = true;

                    history.pushState = (function (f) {
                        return function pushState() {
                            var ret = f.apply(this, arguments);
                            window.dispatchEvent(new Event('pushstate'));
                            window.dispatchEvent(new Event('locationchange'));
                            return ret;
                        };
                    })(history.pushState);

                    history.replaceState = (function (f) {
                        return function replaceState() {
                            var ret = f.apply(this, arguments);
                            window.dispatchEvent(new Event('replacestate'));
                            window.dispatchEvent(new Event('locationchange'));
                            return ret;
                        };
                    })(history.replaceState);

                    window.addEventListener('popstate', function () {
                        window.dispatchEvent(new Event('locationchange'));
                    });
                }
            }
        };

        // Clean CRO body classes if user navigates from an allowed page to an excluded page
        lib.listener(function () {
            if (!shouldRunArcGlobalJS()) {
                removeCroBodyClasses();
            }
        });

        /**
         * Trigger conversion goal
         */

        /**
         * Manual activation
         */

        var experiments = {
            test_checkout: function () {
                (function () {
                    try {
                        var ACTIVE_CLASS = 'step-bar__step--custom--active';
                        var BODY_PREFIX = 'cro_';

                        lib.waitForElement('.step-bar--custom', function () {
                            if (!arcPageGuard('test_checkout')) {
                                return;
                            }

                            var stepBar = document.querySelector('.step-bar--custom');
                            var lastClass = '';

                            function syncBodyClass() {
                                try {
                                    if (!arcPageGuard('test_checkout sync')) {
                                        return;
                                    }

                                    var activeStep = stepBar.querySelector('.' + ACTIVE_CLASS);
                                    var btn = activeStep && activeStep.querySelector('button');
                                    var label = btn ? btn.textContent.trim().replace(/\s+/g, '_') : '';
                                    var newClass = label ? BODY_PREFIX + label : '';

                                    if (newClass === lastClass) return;

                                    if (lastClass) {
                                        document.body.classList.remove(lastClass);
                                    }

                                    if (newClass) {
                                        document.body.classList.add(newClass);
                                    }

                                    lastClass = newClass;
                                } catch (e) {
                                    /* swallow */
                                }
                            }

                            syncBodyClass();

                            new MutationObserver(syncBodyClass).observe(stepBar, {
                                attributes: true,
                                attributeFilter: ['class'],
                                subtree: true
                            });
                        }, 50, 20000);
                    } catch (e) {
                        /* swallow */
                    }
                })();
            },

            test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521: function () {
                if (!arcPageGuard('CRO-7521')) {
                    return;
                }

                lib.waitForElement('#multiForm', function () {
                    var currentPath = normalizeArcPath(window.location.pathname);

                    if (!arcPageGuard('CRO-7521 callback')) {
                        return;
                    }

                    if (currentPath.indexOf('/brands') == -1) {
                        window.crotest_KI5_Remove_headers_on_PLPs_ALL_CRO7521 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(['executeExperiment', '1004200203']);

                        console.log('Experiment Recipe KI5 | Remove headers on PLPs | ALL | CRO-7521 Activated');
                    }
                }, 50, 20000);
            },

            test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143: function () {
                if (!arcPageGuard('CRO-8143')) {
                    return;
                }

                lib.waitForElement('#Block__AddressContainer', function () {
                    if (!arcPageGuard('CRO-8143 callback')) {
                        return;
                    }

                    window.crotest_Recipe_KI53_Reduce_visual_overwhelm = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(['executeExperiment', '1004194416']);

                    console.log('Experiment Recipe KI53 | Reduce visual overwhelm on Delivery page | ALL | CRO-8143 Activated');
                }, 50, 20000);
            },

            test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972: function () {
                if (!arcPageGuard('CRO-7972')) {
                    return;
                }

                lib.waitForElement('#multiForm', function () {
                    var currentPath = normalizeArcPath(window.location.pathname);

                    if (!arcPageGuard('CRO-7972 callback')) {
                        return;
                    }

                    if (currentPath.indexOf('/brands') == -1) {
                        window.crotest_PLP_reduce_distraction_improve_navigation_ALL_CRO7972 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(['executeExperiment', '1004198304']);

                        console.log('Experiment Recipe KI30.KI31.KI32.KI33.KI34 | PLP reduce distraction and improve navigation | ALL | CRO-7972 Activated');
                    }
                }, 50, 20000);

                setTimeout(function () {
                    var currentPath = normalizeArcPath(window.location.pathname);

                    if (currentPath.indexOf('/brands') != -1 && document.querySelector('.cro-7972')) {
                        document.querySelector('body').classList.remove('cro-7972');
                    }
                }, 600);
            },

            test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505: function () {
                if (!arcPageGuard('CRO-7505')) {
                    return;
                }

                lib.waitForElement('.cro_My_Bag, .cro_Delivery, .cro_Payment', function () {
                    if (!arcPageGuard('CRO-7505 callback')) {
                        return;
                    }

                    window.crotest_Recipe_KI19_checkout_ALL_CRO7505 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(['executeExperiment', '1004199433']);

                    console.log('Experiment Recipe KI19 | Add conventional elements to the checkout | ALL | CRO-7505 Activated');
                }, 50, 20000);
            },

            test_Recipe_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345: function () {
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
            }
        };




        console.log('Global JavaScript Activate');

        experiments.test_checkout();
        experiments.test_Recipe_KI5_Remove_headers_on_PLPs_ALL_CRO7521();
        experiments.test_Recipe_KI53_Reduce_visual_overwhelm_on_Delivery_page_ALL_CRO8143();
        experiments.test_PLP_reduce_distraction_improve_navigation_ALL_CRO7972();
        experiments.test_Recipe_KI19_Add_conventional_elements_to_the_checkout_ALL_CRO7505();
        experiments.test_Recipe_AB_Test_Brand_banner_Move_below_products_ALL_CRO12345();
    } catch (e) {
        console.log('Error in Global JavaScript', e);
    }
})();