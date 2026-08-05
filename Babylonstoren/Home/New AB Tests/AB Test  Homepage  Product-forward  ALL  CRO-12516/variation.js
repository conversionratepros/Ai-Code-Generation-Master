(function () {
	try {
		/* main variables */
		var debug = 1;
		var recipe_name = "cro12516";

		/* ===== Config — confirm/replace before deploy ===== */
		var giftingUrl = "https://shop.babylonstoren.com/za/t/10/categories/gifting";
		var heroVideoUrl = "https://crp-clients-images.s3.af-south-1.amazonaws.com/babylonstoren/AB+Test+%7C+Homepage+%7C+Product-forward+%7C+ALL+%7C+CRO-12516/CRO-12516-Video.mp4";
		var graphqlUrl = "https://shop.babylonstoren.com/ecommerce/graphql";

		var mostPopularViewAllUrl = ""; // TODO: Donavan to supply the Most Popular listing URL — blank for now

		var farmFreshConfig = {
			key: "farm-fresh",
			title: "Farm fresh",
			taxonId: 138,
			viewAllUrl: "https://shop.babylonstoren.com/za/t/138/categories/farm-fresh", // TODO confirm View All target with Donavan
			productCount: 10
		};

		var newArrivalConfig = {
			key: "new-arrival",
			title: "New arrival",
			taxonId: 276,
			viewAllUrl: "https://shop.babylonstoren.com/za/t/276/categories/new",
			productCount: 10
		};

		/* TODO: tile img URLs are temporary Figma exports (expire ~7 days after 2026-08-03)
		   — upload assets/categories/*.jpg to the client S3 folder and swap */
		var categoriesConfig = {
			title: "Shop by categories",
			viewAllUrl: "", // TODO: Donavan to supply — blank for now
			items: [
				{ label: "Pantry", url: "https://shop.babylonstoren.com/za/t/5/categories/pantry", img: "https://www.figma.com/api/mcp/asset/94f5290a-5fdb-456a-86a8-22c9a541685a" },
				{ label: "Farm Fresh", url: "https://shop.babylonstoren.com/za/t/138/categories/farm-fresh", img: "https://www.figma.com/api/mcp/asset/471479f8-a178-4247-922a-3760a7bdf916" },
				{ label: "Wine", url: "https://shop.babylonstoren.com/za/t/4/categories/wine", img: "https://www.figma.com/api/mcp/asset/a8756320-e1ec-4426-80d4-b5d3c6309f10" },
				{ label: "Fine Living", url: "https://shop.babylonstoren.com/za/t/7/categories/fine-living", img: "https://www.figma.com/api/mcp/asset/191cd265-734a-4b13-af52-e79af4268113" },
				{ label: "Bath & Body", url: "https://shop.babylonstoren.com/za/t/6/categories/bath-body", img: "https://www.figma.com/api/mcp/asset/83c1d2e3-d1bb-4143-a5b4-c22cc8f2622e" },
				{ label: "Gifting", url: "https://shop.babylonstoren.com/za/t/10/categories/gifting", img: "https://www.figma.com/api/mcp/asset/3e28506f-5013-46ac-b7dc-822c93493487" }
			]
		};

		/* TODO: recipe URLs pending Donavan — blank for now. Image URLs are temporary Figma
		   exports (expire ~2026-08-10) — upload assets/recipes/*.png to the client S3 and swap */
		var recipesConfig = {
			title: "Most Loved Recipes",
			viewAllUrl: "https://shop.babylonstoren.com/za/l/z9k52ipmg6o5fidyaktoo7gk/recipes",
			items: [
				{ title: "Roasted Apple Crumble", desc: "Breakfast or dessert? You choose ...", url: "", img: "https://www.figma.com/api/mcp/asset/721153d5-528e-4989-9cf0-07e13a194c23" },
				{ title: "Summer Overnight Oats", desc: "Made with bircher muesli & berries.", url: "", img: "https://www.figma.com/api/mcp/asset/5a716775-72ae-4e9e-b1a8-f1192b267694" },
				{ title: "Breakfast Crêpes", desc: "Simple, seasonal and beautifully satisfying.", url: "", img: "https://www.figma.com/api/mcp/asset/539946c9-f0c7-4488-a36f-136006cd85b9" },
				{ title: "Pastrami Sarmie", desc: "Turn your leftovers into a deli classic with farm flair.", url: "", img: "https://www.figma.com/api/mcp/asset/0f2c3bd9-1af8-4179-8a94-c294698a0b1e" },
				{ title: "Pap, Wors & Smoortjie", desc: "It’s a South African classic for good reason.", url: "", img: "https://www.figma.com/api/mcp/asset/f74054db-14ea-41e3-9db1-74e7f246544f" }
			]
		};

		var heroSelector = "x-channel-home x-page-layout .channel-content > x-section-with-image";

		function waitForElement(selector, trigger, delayInterval, delayTimeout) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector) && document.querySelectorAll(selector).length > 0) {
					clearInterval(interval);
					trigger();
				}
			}, delayInterval);
			setTimeout(function () {
				clearInterval(interval);
			}, delayTimeout);
		}

		function forceInsertion(trigger, interval, delay) {
			var forceTrigger = setInterval(function () {
				trigger();
			}, interval);
			setTimeout(function () {
				clearInterval(forceTrigger);
			}, delay);
		}

		function escapeHtml(value) {
			return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
			addEvent(context || document, event, function (e) {
				var el = e.target;
				while (el && el !== context && !(el.matches && el.matches(selector))) el = el.parentElement;
				if (el && el.matches && el.matches(selector)) callback.call(el, e);
			});
		}

		/* ===== Section 1 — Hero: Gifting & Hampers (decorate native hero) ===== */
		function decorateHero() {
			var hero = document.querySelector(heroSelector);
			if (!hero) return;

			/* heading */
			var heading = hero.querySelector(".col-lg-3 .content h2");
			if (heading && heading.textContent !== "Gifting & Hampers") {
				heading.textContent = "Gifting & Hampers";
			}

			/* supporting text */
			var supportText = hero.querySelector(".col-lg-3 .content x-markdown-view");
			if (supportText && supportText.textContent.indexOf("Ready-made gifts") === -1) {
				supportText.innerHTML = "<p>Ready-made gifts for every occasion</p>";
			}

			/* CTA — clone-and-replace strips Angular's click handler, which routes to the
			   originally bound CMS URL regardless of the href attribute */
			var cta = hero.querySelector(".col-lg-3 .content .button-section x-button a");
			if (cta && !cta.dataset.cro12516) {
				var ctaClone = cta.cloneNode(true);
				ctaClone.dataset.cro12516 = "1";
				ctaClone.setAttribute("href", giftingUrl);
				ctaClone.setAttribute("target", "_self");
				var ctaLabel = ctaClone.querySelector("div") || ctaClone;
				ctaLabel.textContent = "Shop Gifting";
				ctaClone.addEventListener("click", function (e) {
					e.stopPropagation();
				});
				cta.parentNode.replaceChild(ctaClone, cta);
			}

			/* media — hero video in place of the native media (native hidden via CSS) */
			var media = hero.querySelector(".left-col.media x-content-media") || hero.querySelector(".left-col.media");
			if (media && !media.querySelector(".cro12516-hero-video")) {
				media.insertAdjacentHTML("beforeend", '<video class="cro12516-hero-video" src="' + heroVideoUrl + '" autoplay muted loop playsinline preload="auto"></video>');
				var heroVideo = media.querySelector(".cro12516-hero-video");
				if (heroVideo) {
					heroVideo.muted = true;
					var playPromise = heroVideo.play();
					if (playPromise && playPromise.catch) {
						playPromise.catch(function () {});
					}
				}
			}
		}

		/* ===== Section 2 — Farm Fresh product carousel ===== */
		var chevronSvg = '<svg width="19" height="10" viewBox="0 0 18.4615 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69231 9.76923L0.230769 1.30769C-0.0769231 1 -0.0769231 0.538462 0.230769 0.230769C0.538462 -0.0769231 1 -0.0769231 1.30769 0.230769L9.23077 8.15385L17.1538 0.230769C17.4615 -0.0769231 17.9231 -0.0769231 18.2308 0.230769C18.5385 0.538462 18.5385 1 18.2308 1.30769L9.76923 9.76923C9.61538 9.92308 9.46154 10 9.23077 10C9 10 8.84615 9.92308 8.69231 9.76923Z" fill="#222222"/></svg>';

		var listingQuery = "query ShopProductListing($taxonId: Int, $locale: String!, $channelCode: String!, $sort: ShopSortInput, $page: ShopPageInput) { items: shopProducts(taxonId: $taxonId, locale: $locale, channelCode: $channelCode, sort: $sort, page: $page) { id slug name shortDescription variation hidden mainMedia { url alt } variants { id price { amount } available availableRegions { label parentId } } } }";

		/* ===== Cart wiring — external add via the site's GraphQL API =====
		   The native app stores its order auth in localStorage; the cart overlay
		   re-queries the server on open, so external adds appear natively (verified
		   for both existing carts and carts we create). Only the badge needs a bump. */
		var orderTokenKey = "x_ecommerce_shop_x-za-order-token";
		var loginUrl = "https://shop.babylonstoren.com/login?redirect=%2Fza";
		var createCartMutation = "mutation ShopOrderCreate($input: ShopCreateCartInput!) { shopCreateCart(input: $input) { order { id } auth { token issuedAt expiresAt orderId channelCode __typename } } }";
		var updateItemMutation = "mutation ShopOrderUpdateItem($input: ShopUpdateCartItemInput!) { shopUpdateCartItem(input: $input) { id items { id quantity } } }";
		var heartSvg = '<svg width="25" height="25" viewBox="0 0 25.5437 24.9531" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7718 23.4975C12.5639 23.4975 12.356 23.3935 12.2 23.2376L2.21876 12.8404C0.191325 10.813 -0.328531 7.69387 0.971109 5.14658C1.75089 3.53502 3.15451 2.33935 4.81805 1.8195C6.53357 1.24765 8.30108 1.40361 9.91264 2.1834C10.5365 2.49531 11.1603 2.91119 11.6282 3.43105L12.7718 4.47076L13.8635 3.37907C16.4628 0.779784 20.7256 0.779784 23.3249 3.37907C23.8448 3.89892 24.2607 4.47076 24.5726 5.09459C25.8722 7.69387 25.3524 10.761 23.3249 12.7885L13.3437 23.1856C13.1877 23.3935 12.9798 23.4975 12.7718 23.4975Z" fill="#ADC5E2" stroke="#ADC5E2" stroke-width="0.519856"/></svg>';

		function gqlPost(operationName, query, variables, token, cb) {
			var headers = { "Content-Type": "application/json" };
			if (token) headers["Authorization"] = token;
			fetch(graphqlUrl, {
				method: "POST",
				headers: headers,
				credentials: "same-origin",
				body: JSON.stringify({ operationName: operationName, query: query, variables: variables })
			})
				.then(function (r) {
					return r.json();
				})
				.then(function (json) {
					cb(json);
				})
				.catch(function () {
					cb(null);
				});
		}

		function getStoredAuth() {
			try {
				var raw = localStorage.getItem(orderTokenKey);
				var auth = raw && JSON.parse(raw);
				return auth && auth.token ? auth : null;
			} catch (e) {
				return null;
			}
		}

		var addedQuantities = {};

		function addToBag(variantId, done) {
			var auth = getStoredAuth();
			if (auth) return update(auth);
			gqlPost("ShopOrderCreate", createCartMutation, { input: { locale: "en-ZA", channelCode: "za", referrerCode: null } }, null, function (json) {
				var payload = json && json.data && json.data.shopCreateCart;
				if (!payload || !payload.auth) return done(false);
				try {
					localStorage.setItem(orderTokenKey, JSON.stringify(payload.auth));
				} catch (e) {}
				update(payload.auth);
			});

			function update(auth) {
				var orderId = auth.orderId;
				if (!orderId) {
					try {
						orderId = JSON.parse(atob(auth.token.split(".")[1])).sub;
					} catch (e) {}
				}
				if (!orderId) return done(false);
				var quantity = (addedQuantities[variantId] || 0) + 1;
				gqlPost("ShopOrderUpdateItem", updateItemMutation, { input: { productVariantId: variantId, quantity: quantity, orderId: orderId } }, auth.token, function (json) {
					var ok = !!(json && json.data && json.data.shopUpdateCartItem);
					if (ok) addedQuantities[variantId] = quantity;
					done(ok);
				});
			}
		}

		function bumpCartBadge() {
			var badges = document.querySelectorAll("x-shop-header .mat-badge-content");
			for (var i = 0; i < badges.length; i++) {
				var text = badges[i].textContent.trim();
				if (/^\d+$/.test(text)) {
					badges[i].textContent = String(parseInt(text, 10) + 1);
					return;
				}
			}
		}

		/* The native cart overlay renders from the app's in-memory state, which never
		   sees external adds. On bag-open after one of our adds: reload (app adopts the
		   stored order token on bootstrap) and auto-reopen the bag on the other side. */
		var bagOpenFlag = "cro12516OpenBag";

		function findBagButton() {
			var badges = document.querySelectorAll("x-shop-header .mat-badge-content");
			for (var i = 0; i < badges.length; i++) {
				if (/^\d+$/.test(badges[i].textContent.trim())) {
					return badges[i].closest("button, a");
				}
			}
			return null;
		}

		function bindBagReloadSync() {
			document.addEventListener(
				"click",
				function (e) {
					if (!window.cro12516CartTouched) return;
					var bagBtn = findBagButton();
					if (!bagBtn) return;
					if (e.target === bagBtn || (bagBtn.contains && bagBtn.contains(e.target))) {
						e.preventDefault();
						if (e.stopImmediatePropagation) e.stopImmediatePropagation();
						else e.stopPropagation();
						try {
							sessionStorage.setItem(bagOpenFlag, "1");
						} catch (err) {}
						window.location.reload();
					}
				},
				true
			);
		}

		function autoOpenBag() {
			var shouldOpen = false;
			try {
				shouldOpen = sessionStorage.getItem(bagOpenFlag) === "1";
				if (shouldOpen) sessionStorage.removeItem(bagOpenFlag);
			} catch (e) {}
			if (!shouldOpen) return;
			waitForElement("x-shop-header .mat-badge-content", function () {
				setTimeout(function () {
					var bagBtn = findBagButton();
					if (bagBtn) bagBtn.click();
				}, 1500);
			}, 100, 10000);
		}

		function bindCardEvents() {
			live(".cro12516-card-add", "click", function (e) {
				e.preventDefault();
				e.stopPropagation();
				var btn = this;
				if (btn.classList.contains("cro12516-busy")) return;
				btn.classList.add("cro12516-busy");
				var variantId = parseInt(btn.getAttribute("data-variant-id"), 10);
				addToBag(variantId, function (ok) {
					btn.classList.remove("cro12516-busy");
					if (!ok) {
						/* fallback — route to the product page */
						window.location.assign(btn.getAttribute("data-pdp"));
						return;
					}
					window.cro12516CartTouched = true;
					bumpCartBadge();
					btn.classList.add("cro12516-added");
					setTimeout(function () {
						btn.classList.remove("cro12516-added");
					}, 2000);
				});
			});
		}

		function fetchProducts(cfg, cb) {
			fetch(graphqlUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({
					operationName: "ShopProductListing",
					query: listingQuery,
					variables: {
						taxonId: cfg.taxonId,
						locale: "en-ZA",
						channelCode: "za",
						sort: { column: "position", order: "asc" },
						page: { size: cfg.productCount, index: 0 }
					}
				})
			})
				.then(function (r) {
					return r.json();
				})
				.then(function (json) {
					cb((json && json.data && json.data.items) || []);
				})
				.catch(function (e) {
					if (debug) console.log(e, "listing fetch failed " + recipe_name);
					cb([]);
				});
		}

		function usableProducts(items) {
			var out = [];
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item.hidden) continue;
				if (!item.mainMedia || !item.mainMedia.url) continue;
				var hasAvailable = false;
				var variants = item.variants || [];
				for (var j = 0; j < variants.length; j++) {
					if (variants[j].available) hasAvailable = true;
				}
				if (!hasAvailable) continue;
				out.push(item);
			}
			return out;
		}

		function formatPrice(amount) {
			var rands = amount / 100;
			var text = rands % 1 === 0 ? String(rands) : rands.toFixed(2);
			return "R " + text.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}

		function productCardHtml(item) {
			var pdpUrl = "https://shop.babylonstoren.com/za/p/" + item.id + "/" + item.slug;
			var imgUrl = item.mainMedia.url.replace("/image/upload/", "/image/upload/c_thumb,w_350,h_350,dpr_2,f_auto/");
			var variants = item.variants || [];
			var minPrice = null;
			var pills = [];
			for (var i = 0; i < variants.length; i++) {
				var variant = variants[i];
				if (variant.price && (minPrice === null || variant.price.amount < minPrice)) {
					minPrice = variant.price.amount;
				}
				var regions = variant.availableRegions || [];
				for (var j = 0; j < regions.length; j++) {
					if (regions[j].parentId !== null && pills.indexOf(regions[j].label) === -1) {
						pills.push(regions[j].label);
					}
				}
			}
			var priceText = "";
			if (minPrice !== null) {
				priceText = item.variation === "SINGLE" ? formatPrice(minPrice) : "From " + formatPrice(minPrice);
			}
			var pillsHtml = "";
			for (var k = 0; k < pills.length; k++) {
				pillsHtml += `<span class="cro12516-card-pill">${escapeHtml(pills[k])}</span>`;
			}
			var singleVariantId = item.variation === "SINGLE" && variants.length && variants[0].id;
			var buttonHtml;
			if (singleVariantId) {
				buttonHtml = `<button type="button" class="cro12516-card-btn cro12516-card-add" data-variant-id="${singleVariantId}" data-pdp="${pdpUrl}"><span class="cro12516-label-desktop">Add to Bag</span><span class="cro12516-label-mobile">Add</span></button>`;
			} else if (item.variation !== "SINGLE") {
				buttonHtml = `<a class="cro12516-card-btn" href="${pdpUrl}">Options</a>`;
			} else {
				/* fallback — variant data missing */
				buttonHtml = `<a class="cro12516-card-btn" href="${pdpUrl}">View Product</a>`;
			}
			return `
				<div class="cro12516-card">
					<a class="cro12516-card-media" href="${pdpUrl}">
						<img src="${imgUrl}" alt="${escapeHtml(item.name)}" loading="lazy">
					</a>
					<div class="cro12516-card-actions">
						${buttonHtml}
						<a class="cro12516-card-wish" href="${loginUrl}" aria-label="Add to favourites">${heartSvg}</a>
					</div>
					<a class="cro12516-card-info" href="${pdpUrl}">
						<p class="cro12516-card-name">${escapeHtml(item.name)}</p>
						${item.shortDescription ? `<p class="cro12516-card-desc">${escapeHtml(item.shortDescription)}</p>` : ""}
						${pillsHtml ? `<div class="cro12516-card-pills">${pillsHtml}</div>` : ""}
						${priceText ? `<p class="cro12516-card-price">${priceText}</p>` : ""}
					</a>
				</div>
			`;
		}

		function sliderHtml(slides) {
			return `
				<div class="cro12516-listing-slider">
					<swiper-container class="cro12516-swiper" slides-per-view="auto">${slides}</swiper-container>
					<button class="cro12516-listing-arrow cro12516-listing-prev cro12516-hide" type="button" aria-label="Previous">${chevronSvg}</button>
					<button class="cro12516-listing-arrow cro12516-listing-next" type="button" aria-label="Next">${chevronSvg}</button>
				</div>
			`;
		}

		function listingSectionHtml(cfg, items) {
			var slides = "";
			for (var i = 0; i < items.length; i++) {
				slides += `<swiper-slide class="cro12516-slide">${productCardHtml(items[i])}</swiper-slide>`;
			}
			return `
				<div class="cro12516-listing cro12516-${cfg.key}">
					<div class="cro12516-listing-inner">
						<div class="cro12516-listing-header">
							<h2 class="cro12516-listing-title">${cfg.title}</h2>
							<a class="cro12516-view-all" href="${cfg.viewAllUrl}">View All</a>
						</div>
						${sliderHtml(slides)}
					</div>
				</div>
			`;
		}

		function bindListingSlider(section) {
			var swiperEl = section.querySelector("swiper-container");
			var prev = section.querySelector(".cro12516-listing-prev");
			var next = section.querySelector(".cro12516-listing-next");
			if (!swiperEl || !prev || !next) return;

			function updateArrows(swiper) {
				prev.classList.toggle("cro12516-hide", swiper.isBeginning);
				next.classList.toggle("cro12516-hide", swiper.isEnd);
			}

			function go(dir) {
				if (swiperEl.swiper) {
					if (dir > 0) swiperEl.swiper.slideNext();
					else swiperEl.swiper.slidePrev();
				}
			}

			prev.addEventListener("click", function () {
				go(-1);
			});
			next.addEventListener("click", function () {
				go(1);
			});

			/* swiper auto-inits async — bind arrow-state sync once ready */
			var poll = setInterval(function () {
				if (swiperEl.swiper) {
					clearInterval(poll);
					updateArrows(swiperEl.swiper);
					swiperEl.swiper.on("slideChange", function () {
						updateArrows(swiperEl.swiper);
					});
					swiperEl.swiper.on("touchEnd", function () {
						updateArrows(swiperEl.swiper);
					});
				}
			}, 100);
			setTimeout(function () {
				clearInterval(poll);
			}, 10000);
		}

		/* ===== Section 3 — Most Popular (decorate native "Our Favourites" carousel) =====
		   Native cards already use the new card pattern incl. working ATB/wishlist —
		   only the heading, View All button and section frame need changing. */
		function decorateMostPopular() {
			var section = document.querySelector("x-channel-home .channel-content x-content-product-listing");
			if (!section) return;
			var heading = section.querySelector("h2");
			if (heading && heading.textContent !== "Most Popular") {
				heading.textContent = "Most Popular";
			}
			if (heading && !section.querySelector(".cro12516-mp-viewall")) {
				heading.insertAdjacentHTML("afterend", `<a class="cro12516-view-all cro12516-mp-viewall" href="${mostPopularViewAllUrl}">View All</a>`);
			}
		}

		/* ===== Section 4 — Shop by Categories (injected; swiper desktop, 3×2 grid mobile) ===== */
		function categoryTileHtml(item) {
			return `
				<a class="cro12516-cat-tile" href="${item.url}">
					<img src="${item.img}" alt="${escapeHtml(item.label)}" loading="lazy">
					<span class="cro12516-cat-label">${escapeHtml(item.label)}</span>
				</a>
			`;
		}

		function injectCategories() {
			if (document.querySelector(".cro12516-categories")) return;
			var hero = document.querySelector(heroSelector);
			if (!hero) return;
			var isMobile = window.matchMedia("(max-width: 991px)").matches;
			var body = "";
			if (isMobile) {
				var tiles = "";
				for (var i = 0; i < categoriesConfig.items.length; i++) {
					tiles += categoryTileHtml(categoriesConfig.items[i]);
				}
				body = `<div class="cro12516-listing-track">${tiles}</div>`;
			} else {
				var slides = "";
				for (var j = 0; j < categoriesConfig.items.length; j++) {
					slides += `<swiper-slide class="cro12516-slide">${categoryTileHtml(categoriesConfig.items[j])}</swiper-slide>`;
				}
				body = sliderHtml(slides);
			}
			hero.insertAdjacentHTML("afterend", `
				<div class="cro12516-listing cro12516-categories">
					<div class="cro12516-listing-inner">
						<div class="cro12516-listing-header">
							<h2 class="cro12516-listing-title">${categoriesConfig.title}</h2>
							<a class="cro12516-view-all" href="${categoriesConfig.viewAllUrl}">View All</a>
						</div>
						${body}
					</div>
				</div>
			`);
			var section = document.querySelector(".cro12516-categories");
			if (section && !isMobile) bindListingSlider(section);
		}

		/* ===== Section 7 — Benefits: clone native footer x-section-three into the page ===== */
		function injectBenefits() {
			if (document.querySelector(".cro12516-benefits")) return;
			var source = document.querySelector("x-shop-footer x-footer-content x-section-three");
			if (!source || source.innerText.indexOf("Free Delivery") === -1) return;
			var hero = document.querySelector(heroSelector);
			if (!hero) return;
			var benefitsClone = source.cloneNode(true);
			benefitsClone.classList.add("cro12516-benefits");
			/* Delivery block button reads "Shop all" per design */
			var deliveryBtnLabel = benefitsClone.querySelector("x-button a div");
			if (deliveryBtnLabel) deliveryBtnLabel.textContent = "Shop all";
			hero.insertAdjacentElement("afterend", benefitsClone);
		}

		/* ===== Section 8 — Most Loved Recipes (injected swiper, Figma content) ===== */
		function recipeCardHtml(item) {
			return `
				<div class="cro12516-recipe-card">
					<a class="cro12516-recipe-media" href="${item.url}">
						<img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy">
					</a>
					<a class="cro12516-recipe-info" href="${item.url}">
						<p class="cro12516-recipe-title">${escapeHtml(item.title)}</p>
						<p class="cro12516-recipe-desc">${escapeHtml(item.desc)}</p>
					</a>
					<a class="cro12516-recipe-link" href="${item.url}">See Recipe</a>
				</div>
			`;
		}

		function injectRecipes() {
			if (document.querySelector(".cro12516-recipes")) return;
			var hero = document.querySelector(heroSelector);
			if (!hero) return;
			var slides = "";
			for (var i = 0; i < recipesConfig.items.length; i++) {
				slides += `<swiper-slide class="cro12516-slide">${recipeCardHtml(recipesConfig.items[i])}</swiper-slide>`;
			}
			hero.insertAdjacentHTML("afterend", `
				<div class="cro12516-listing cro12516-recipes">
					<div class="cro12516-listing-inner">
						<div class="cro12516-listing-header">
							<h2 class="cro12516-listing-title">${recipesConfig.title}</h2>
							<a class="cro12516-view-all" href="${recipesConfig.viewAllUrl}">View All</a>
						</div>
						${sliderHtml(slides)}
					</div>
				</div>
			`);
			var section = document.querySelector(".cro12516-recipes");
			if (section) bindListingSlider(section);
		}

		/* ===== Section 9 — Market Live (decorate native section + design quote card) ===== */
		function mlQuoteHtml(modifier) {
			return `
				<div class="cro12516-ml-quote ${modifier}">
					<p class="cro12516-ml-quote-text">"The most interactive way to shop the farm's seasonal best."</p>
					<p class="cro12516-ml-quote-author">— Babylonstoren Team</p>
				</div>
			`;
		}

		function decorateMarketLive() {
			var sections = document.querySelectorAll("x-channel-home .channel-content > x-section-with-image");
			for (var i = 0; i < sections.length; i++) {
				var section = sections[i];
				if (!section.innerText || section.innerText.indexOf("Market Live") === -1) continue;
				section.classList.add("cro12516-market-live");
				var media = section.querySelector(".left-col.media");
				if (media && !media.querySelector(".cro12516-ml-quote-desktop")) {
					media.insertAdjacentHTML("beforeend", mlQuoteHtml("cro12516-ml-quote-desktop"));
				}
				var buttonSection = section.querySelector(".button-section");
				if (buttonSection && !section.querySelector(".cro12516-ml-quote-mobile")) {
					buttonSection.insertAdjacentHTML("afterend", mlQuoteHtml("cro12516-ml-quote-mobile"));
				}
				return;
			}
		}

		var listingItems = {};

		function injectListing(cfg) {
			var items = listingItems[cfg.key];
			if (!items || !items.length) return;
			if (document.querySelector(".cro12516-" + cfg.key)) return;
			var hero = document.querySelector(heroSelector);
			if (!hero) return;
			hero.insertAdjacentHTML("afterend", listingSectionHtml(cfg, items));
			var section = document.querySelector(".cro12516-" + cfg.key);
			if (section) bindListingSlider(section);
		}

		function loadListing(cfg) {
			if (listingItems[cfg.key]) {
				injectListing(cfg);
				return;
			}
			fetchProducts(cfg, function (items) {
				listingItems[cfg.key] = usableProducts(items);
				injectListing(cfg);
			});
		}

		/* ===== SPA navigation — variation is homepage-only ===== */
		function listener() {
			window.addEventListener("locationchange", function () {
				processChange();
			});
			history.pushState = (function (f) {
				return function pushState() {
					var ret = f.apply(this, arguments);
					window.dispatchEvent(new Event("locationchange"));
					return ret;
				};
			})(history.pushState);
			history.replaceState = (function (f) {
				return function replaceState() {
					var ret = f.apply(this, arguments);
					window.dispatchEvent(new Event("locationchange"));
					return ret;
				};
			})(history.replaceState);
			window.addEventListener("popstate", function () {
				window.dispatchEvent(new Event("locationchange"));
			});
		}

		function isHomePath() {
			return window.location.pathname.replace(/\/+$/, "") === "/za";
		}

		function processChange() {
			if (isHomePath()) {
				setTimeout(function () {
					init();
				}, 500);
			} else {
				document.body.classList.remove(recipe_name);
			}
		}

		function init() {
			decorateHero();
			decorateMostPopular();
			injectCategories();
			document.body.classList.add(recipe_name);

			if (!window.cro12516Events) {
				window.cro12516Events = true;
				bindCardEvents();
				bindBagReloadSync();
				listener();
			}
			autoOpenBag();
			injectBenefits();
			injectRecipes();
			decorateMarketLive();

			loadListing(farmFreshConfig);
			loadListing(newArrivalConfig);

			/* re-assert while Angular hydration settles (all steps are guarded/idempotent) */
			forceInsertion(function () {
				if (!isHomePath()) return;
				decorateHero();
				decorateMostPopular();
				injectCategories();
				injectBenefits();
				injectRecipes();
				decorateMarketLive();
				injectListing(farmFreshConfig);
				injectListing(newArrivalConfig);
				if (!document.body.classList.contains(recipe_name)) {
					document.body.classList.add(recipe_name);
				}
			}, 300, 8000);
		}

		waitForElement(heroSelector + " .col-lg-3 .content", init, 50, 20000);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + recipe_name);
	}
})();
