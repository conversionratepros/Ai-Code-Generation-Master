(function () {
	try {
		/* main variables */
		var debug = 0;
		var variation_name = "CRO_8905_Static_USP_strip";
		/* all Pure helper functions */

		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (
					document &&
					document.querySelector(selector) &&
					document.querySelectorAll(selector).length > 0
				) {
					clearInterval(interval);
					trigger();
				}
			}, 50);
			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function insertHtml(selector, content, position) {
			var el = document.querySelector(selector);
			if (!position) {
				position = "afterend";
			}
			if (el && content) {
				el.insertAdjacentHTML(position, content);
			}
		}

		function addClass(el, cls) {
			var el = document.querySelector(el);
			if (el) {
				el.classList.add(cls);
			}
		}

		function live(selector, event, callback, context) {
			function addEvent(el, type, handler) {
				if (el.attachEvent) el.attachEvent("on" + type, handler);
				else el.addEventListener(type, handler);
			}
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
			function live(selector, event, callback, context) {
				addEvent(context || document, event, function (e) {
					var found,
						el = e.target || e.srcElement;
					while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
					if (found) callback.call(el, e);
				});
			}
			live(selector, event, callback, context);
		}


		var usps = `<div class="cro_test_8905" style="display:none;">
        <div class="cro_test_8905_wrapper">
            <div
                class="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                <div class="lmd:max-w-none lmd:flex-1 w-full min-w-[max-content] ">
                    <div class="text-11 inline pr-2">[<svg viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg" class="inline h-2 w-2">
                            <path d="M13.3323 3.66772L6.13349 10.8665L2.6142 7.34723" stroke="currentColor"
                                stroke-width="1.5" stroke-linejoin="round"></path>
                        </svg>]</div>
                    <div class="text-11 inline">Front Runner joins Dometic</div>
                </div>
                <div class="lmd:max-w-none lmd:flex-1 w-full min-w-[max-content] ">
                    <div class="text-11 inline pr-2">[<svg viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg" class="inline h-2 w-2">
                            <path d="M13.3323 3.66772L6.13349 10.8665L2.6142 7.34723" stroke="currentColor"
                                stroke-width="1.5" stroke-linejoin="round"></path>
                        </svg>]</div>
                    <div class="text-11 inline">Ready to ship within 1-2 days</div>
                </div>
                <div class="lmd:max-w-none lmd:flex-1 w-full min-w-[max-content] ">
                    <div class="text-11 inline pr-2">[<svg viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg" class="inline h-2 w-2">
                            <path d="M13.3323 3.66772L6.13349 10.8665L2.6142 7.34723" stroke="currentColor"
                                stroke-width="1.5" stroke-linejoin="round"></path>
                        </svg>]</div>
                    <div class="text-11 inline">Buy Now Pay Later with Klarna</div>
                </div>
            </div>
        </div>
    </div>`;

		var warenty_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
  <path d="M12.0446 0C13.5973 0.140983 15.0252 0.724167 16.1834 1.74272C18.7913 4.03757 19.3316 7.90808 17.4119 10.8221L20.1366 14.8001L17.02 14.2299L16.43 17.3465L13.8544 13.5965C12.3626 14.1095 10.7758 14.1095 9.28647 13.5952L6.71027 17.3471L6.12088 14.2312L3 14.8057L5.72836 10.8221C3.88627 8.02919 4.30238 4.3332 6.67363 2.00543C7.87664 0.824781 9.42869 0.149057 11.0956 0H12.0446ZM11.2304 1.03408C7.91328 1.22599 5.40478 4.09036 5.61408 7.36651C5.82276 10.6377 8.64677 13.1431 11.9254 12.9474C15.2053 12.7518 17.7237 9.92159 17.5262 6.63116C17.3318 3.38545 14.5308 0.844034 11.2304 1.0347V1.03408ZM7.2624 14.7312L8.3294 13.1822C7.58784 12.7909 6.95684 12.2978 6.38421 11.6742L5.24392 13.3449L6.93882 13.0406L7.2624 14.7312ZM16.2021 13.0387L17.897 13.3443L16.7567 11.6742C16.1878 12.291 15.5698 12.7804 14.8146 13.1797L15.8785 14.7299L16.2021 13.0381V13.0387Z" fill="black"/>
  <path d="M7.93994 7.58957L10.3267 9.97137L15.2015 5.09597L14.4786 4.37305L10.3255 8.52614L8.65976 6.86292L7.93994 7.58957Z" fill="black"/>
</svg>`;

		var return_policy_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none">
  <path d="M7.91994 7.00404V11.9972C7.91994 12.1686 8.01781 12.335 8.16387 12.4115L11.746 14.2926C11.8303 14.3401 11.9152 14.3641 12.0005 14.3641C12.0808 14.3641 12.1611 14.3431 12.2414 14.3011L15.812 12.4265C15.9797 12.3385 16.0795 12.1781 16.0795 11.9972V7.00404C16.0795 6.82612 15.9772 6.6617 15.8125 6.57524L12.2248 4.69013C12.0828 4.61567 11.9101 4.62067 11.751 4.70413L8.18695 6.57774C8.01982 6.6657 7.91943 6.82562 7.91943 7.00504L7.91994 7.00404ZM9.32329 6.98455L10.306 6.4618L12.9491 7.89062L12.005 8.39488L9.32329 6.98455ZM13.8551 9.81321C13.9735 9.81621 14.0834 9.77473 14.1657 9.69676C14.2576 9.6093 14.3098 9.48237 14.3123 9.33943L14.3329 8.16849L15.1902 7.7207L15.1922 11.7513L12.4457 13.1951L12.4422 9.17301L13.4304 8.64626L13.4239 9.35243C13.4214 9.6133 13.6026 9.80721 13.8551 9.81371V9.81321ZM11.2552 5.96703L12.0025 5.57172L14.6722 6.97755L13.9007 7.39685L11.2552 5.96653V5.96703ZM8.80882 11.7528V7.7177L11.5548 9.15752L11.5533 13.1896L8.80832 11.7528H8.80882Z" fill="black"/>
  <path d="M12.1475 15.0083C12.0672 14.9284 11.9597 14.8849 11.8418 14.8884C11.7173 14.8914 11.5964 14.9449 11.5171 15.0318C11.3544 15.2097 11.3645 15.4761 11.5391 15.652L12.5209 16.6376C10.6613 16.778 8.86094 16.1998 7.42245 14.9919C5.91822 13.7289 4.99821 11.8868 4.89833 9.93824C4.71413 6.34095 7.26234 3.18494 10.8269 2.59672L10.8455 2.59222C11.0729 2.52476 11.2124 2.31236 11.1768 2.08796C11.1587 1.97502 11.0934 1.87057 10.9966 1.8006C10.9032 1.73363 10.7923 1.70614 10.6839 1.72414C8.76256 2.03899 7.02845 3.03651 5.80127 4.5333C4.57811 6.0251 3.94017 7.90871 4.00442 9.83729C4.0777 12.0318 5.02481 14.0478 6.67209 15.5146C8.221 16.8934 10.189 17.6066 12.2499 17.5416L11.5306 18.2708C11.4473 18.3553 11.4076 18.4697 11.4192 18.5931C11.4317 18.7251 11.502 18.8475 11.6069 18.9205C11.6832 18.9735 11.7705 18.9995 11.8579 18.9995C11.9778 18.9995 12.0983 18.9505 12.1931 18.856L13.7661 17.2863C13.9594 17.0939 13.9589 16.814 13.7661 16.6211L12.1475 15.0078V15.0083Z" fill="black"/>
  <path d="M19.881 8.21891C19.2833 4.77404 16.4796 2.12479 13.0068 1.67751L13.9404 0.734953C14.0217 0.652492 14.0629 0.541544 14.0548 0.422601C14.0463 0.295161 13.9816 0.16972 13.8857 0.0952557C13.699 -0.0496756 13.4535 -0.027686 13.2754 0.150729L11.6848 1.73848C11.5106 1.9124 11.5136 2.18726 11.6918 2.36468L13.3055 3.97142C13.4806 4.14584 13.7467 4.15783 13.9248 3.99991C14.0152 3.91944 14.0694 3.803 14.0734 3.68006C14.0769 3.56111 14.0337 3.44967 13.9509 3.36621L13.1925 2.60307C14.5653 2.82896 15.8657 3.47416 16.8921 4.44669C18.0159 5.51069 18.7703 6.92352 19.0162 8.42431C19.5448 11.6513 17.8081 14.8053 14.7921 16.0947C14.6822 16.1417 14.5989 16.2291 14.5567 16.3416C14.5141 16.456 14.5201 16.5834 14.5728 16.6904C14.6501 16.8478 14.8077 16.9408 14.9718 16.9408C15.0285 16.9408 15.0863 16.9298 15.141 16.9063C18.5665 15.4475 20.5155 11.8747 19.881 8.21841V8.21891Z" fill="black"/>
</svg>`;

		var truck_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
  <path d="M21.4744 13.7141L22.5127 13.6982C22.7237 13.6949 22.8876 13.5651 23 13.312V8.81719L22.8904 8.60244L19.3009 4.93262C19.1869 4.82086 19.0534 4.76773 18.8823 4.76773H16.5338L16.5327 2.02152C16.5327 1.72241 16.319 1.50822 16.0127 1.5H4.50686C4.18679 1.5 3.96252 1.71584 3.96196 2.0259L3.95864 3.95367L3.37886 3.96244C3.09811 3.96682 2.87495 4.18594 2.87052 4.4615C2.86664 4.69761 3.05824 4.95617 3.35007 4.96494L3.9603 4.98357V6.41391L2.46738 6.42761C2.19438 6.4298 2.00223 6.68892 2.00002 6.9201C1.99891 7.05212 2.05594 7.18907 2.15285 7.28659C2.21543 7.34958 2.3223 7.42464 2.4768 7.42573L3.95975 7.43724L3.96196 13.2036C3.96196 13.4627 4.19177 13.6911 4.4537 13.6917L5.87463 13.6971L5.89899 13.7738C6.22072 14.7906 7.15158 15.4847 8.21479 15.5C8.22752 15.5 8.23971 15.5 8.25244 15.5C9.33558 15.5 10.2786 14.8125 10.6064 13.7793L10.6308 13.7026H16.7293L16.7537 13.7793C17.0754 14.7966 18.0074 15.4874 19.0728 15.4989C19.0822 15.4989 19.0911 15.4989 19.1005 15.4989C20.1808 15.4989 21.1228 14.8141 21.45 13.7881L21.4739 13.7125L21.4744 13.7141ZM8.61571 14.4438C8.49665 14.4739 8.37704 14.4882 8.25964 14.4882C7.62283 14.4882 7.03917 14.0675 6.87028 13.4358C6.7706 13.0611 6.82431 12.6727 7.02311 12.3424C7.21859 12.017 7.53422 11.7869 7.91244 11.6949C8.29231 11.6023 8.68049 11.6609 9.00555 11.8592C9.33614 12.0608 9.56595 12.3802 9.65399 12.7598C9.82566 13.5005 9.35995 14.2559 8.61571 14.4438ZM15.4933 12.6908L10.6856 12.6924L10.6679 12.6042C10.4348 11.4609 9.4563 10.6535 8.28899 10.6403C8.27902 10.6403 8.26906 10.6403 8.25909 10.6403C7.07849 10.6403 6.09004 11.4368 5.84805 12.5867L5.82977 12.6727L4.98419 12.682V7.43176L8.32775 7.43011C8.64173 7.43011 8.82558 7.18305 8.83887 6.95023C8.84662 6.81711 8.78737 6.66427 8.6888 6.56073C8.63121 6.49992 8.5332 6.42761 8.3942 6.42706L4.98696 6.41775L4.98419 4.97151L8.76356 4.97042C9.05372 4.97042 9.28132 4.76499 9.29405 4.49272C9.3007 4.34919 9.25141 4.21553 9.15562 4.11637C9.0576 4.01503 8.92027 3.95915 8.76909 3.95915L4.98641 3.95805V2.50963H15.5099L15.4939 12.6897L15.4933 12.6908ZM16.5167 5.779L18.7106 5.78119L21.2634 8.4003L16.5161 8.41344L16.5172 5.779H16.5167ZM19.4194 14.4542C19.3148 14.4778 19.2096 14.4887 19.106 14.4887C18.4531 14.4887 17.8601 14.0428 17.7072 13.3882C17.53 12.6305 18.0085 11.8696 18.7732 11.6921C19.1547 11.6039 19.5429 11.6664 19.8674 11.868C20.1947 12.0718 20.4212 12.3917 20.5048 12.7691C20.6731 13.5279 20.1864 14.2838 19.4194 14.4542ZM19.2638 10.6452C18.1358 10.579 17.1468 11.2435 16.7437 12.3407L16.5316 12.9176L16.515 9.42307H21.9761L21.9778 12.5856L21.9457 12.6179C21.8548 12.7083 21.6832 12.7078 21.5702 12.6552L21.5204 12.6322L21.5093 12.5785C21.2839 11.5059 20.3608 10.711 19.2638 10.6452Z" fill="black"/>
</svg>`;

		var map = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"><path d="M7.38743 10.25H8.61257L8 12.0877L7.38743 10.25Z" stroke="currentColor" stroke-width="2"></path><circle cx="8" cy="5.5" r="3.75" stroke="currentColor" stroke-width="1.5"></circle></svg>`;

		var benifts = `<div class="cro-benefits" style="display:none;">
		<div class="cro-rack-benefits">
        <div class="cro-benefit-item">
            <span class="cro-benefit-icon">
                ${warenty_svg}
            </span>
            <span class="cro-benefit-text">Limited lifetime warranty</span>
        </div>

        <div class="cro-benefit-item">
            <span class="cro-benefit-icon">
                ${return_policy_svg}
            </span>
            <span class="cro-benefit-text">30 Day return policy</span>
        </div>

        <div class="cro-benefit-item">
            <span class="cro-benefit-icon">
                ${truck_svg}
            </span>
            <span class="cro-benefit-text">All rack kits ship free</span>
        </div>
    </div>
	<div class="cro-non_rack-benefits">
			<div class="cro-benefit-item">
			<span class="cro-benefit-icon">${return_policy_svg}</span>
			<span class="cro-benefit-text">30 Day return policy</span>
			</div>

			<div class="cro-benefit-item">
			<span class="cro-benefit-icon">${truck_svg}</span>
			<span class="cro-benefit-text">Free shipping orders over $150*</span>
			</div>
		</div>
	</div>`;

		var stock = `<div class="cro-stock" style="display:none;">
			<div class="cro-stock-row">
			<div class="stock" style="display:none;">
				<div class="stock-indicator block h-1 w-1 rounded-[0.5px] bg-[#488350]"></div>
				<span class="cro-stock-text">In Stock</span>
			</div>
			<span class="cro-divider"></span>
			<div class="map" style="display:none;">
		
			${map}
		
		<span class="cro-find-text">Find in store</span>
		</div>
		</div>
		<span class="cro-out-stock-text" style="display:none;">Out of stock</span>
		</div>
	`;


		function addingHtml() {
			// Adding USPs
			waitForElement('.product-details .text-teka.border-border .group', function () {
				if (!document.querySelector('.cro_test_8905')) {
					insertHtml('.product-details .text-teka.border-border .group', usps, 'afterend')
				}
			});

			//Adding Benifits
			waitForElement('.product-details .buy-me-box .product-stock', function () {
				if (!document.querySelector('.cro-benefits')) {
					insertHtml('.product-details .buy-me-box .product-stock', benifts, 'afterend')
				}
			});


			waitForElement('.product-details .buy-me-box .price-wrapper', function () {
				if (!document.querySelector('.cro-stock')) {
					insertHtml('.product-details .buy-me-box .price-wrapper', stock, 'afterend');
				}


			});

			waitForElement('.product-details .buy-me-box .product-stock .stock-status .text-fog', function () {
				document.querySelector('.cro-stock').classList.add('cro_outStock')
			});

			waitForElement('.product-details .buy-me-box .product-stock .stock-indicator', function () {
				document.querySelector('.cro-stock').classList.add('cro_activeStock')
			});

			waitForElement('.product-details .buy-me-box .product-stock div[role*="button"]', function () {
				document.querySelector('.cro-stock').classList.add('cro_findStore')
			});


		}

		function trigger() {
			var doneTypingInterval = 7000;  //time in ms, 5 seconds for example
			var intervalCallAgain = setInterval(function () {
				waitForElement('body', init);
			}, 400);

			//start the countdown
			var Timer = setTimeout(function () {
				clearInterval(intervalCallAgain);
			}, doneTypingInterval);

		}

		function init() {
			addClass('body', variation_name);
			addingHtml();
			checkRackByHeading();
		}

		function checkRackByHeading() {
			waitForElement('.product-details nav [data-slot="breadcrumb-item"] a[href="/en-us/category/rack-systems/racks"]', function () {
				document.body.classList.add('cro-rack-page');
			});
		}



		function croEventHandkler() {
			live(".cro-stock-row .map", "click", function () {
				if (document.querySelector('.product-details .buy-me-box .product-stock div[role*="button"]')) {
					document.querySelector('.product-details .buy-me-box .product-stock div[role*="button"]').click();
				}
			});
		}

		if (!window.cro_t_20) {
			croEventHandkler();
			window.cro_t_20 = true;
		}

		waitForElement('body', trigger);
	} catch (e) {
		if (debug) console.log(e, "error in Test" + variation_name);
	}
})();