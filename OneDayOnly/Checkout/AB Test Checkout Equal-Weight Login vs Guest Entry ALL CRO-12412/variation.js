(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "cro-12412";
    var LOGIN_TAB_CLASS = "cro-12412-login-tab";
    var STORE_KEY = "cro-12412-guest-details";

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

    function addClass(el, cls) {
      var el = document.querySelector(el);
      if (el) {
        el.classList.add(cls);
      }
    }

    /* ---- CRO-12412: Checkout — Equal-Weight Login vs Guest Entry ---- */

    /* The variation only lives on the checkout entry step: /checkout with no
       step= / isGuest= params. Everywhere else the body class comes off and
       the injected HTML stays display:none via its inline style. */
    function isEntryStep() {
      return (
        window.location.pathname.indexOf("/checkout") === 0 &&
        !/[?&](step|isGuest)=/i.test(window.location.search)
      );
    }

    function findButtonByText(re, root) {
      var btns = (root || document).querySelectorAll("button");
      for (var i = 0; i < btns.length; i++) {
        if (re.test((btns[i].innerText || "").trim())) return btns[i];
      }
      return null;
    }

    /* Native login form = the form holding input[name=email] + input[name=password] */
    function getLoginForm() {
      var pw = document.querySelector('form input[name="password"]');
      return pw ? pw.closest("form") : null;
    }

    /*
     * Tag native elements so scoped CSS can drive visibility. Nothing is
     * removed from control — everything is shown/hidden off body.cro-12412.
     * Idempotent: safe to re-run after every React re-render.
     *  - heading block ("Log in" h2 + underline bar)  -> replaced by tab strip
     *  - form children up to & incl. Create Account    -> Log in tab content
     *  - form children after Create Account (2nd "Or"
     *    divider, native guest button, disclaimer)     -> fall away entirely
     */
    function tagNativeElements() {
      var form = getLoginForm();
      if (!form) return null;
      var container = form.parentElement;

      /* heading block: walk up from the "Log in" h2 to the container child */
      var h2s = container.querySelectorAll("h2");
      for (var i = 0; i < h2s.length; i++) {
        if (/^log\s?in$/i.test((h2s[i].textContent || "").trim())) {
          var block = h2s[i];
          while (block.parentElement && block.parentElement !== container) {
            block = block.parentElement;
          }
          if (block.parentElement === container && block !== form) {
            block.setAttribute("data-cro-12412-heading", "");
          }
          break;
        }
      }

      var formInner = form.firstElementChild || form;
      var kids = formInner.children;
      var passedCreate = false;
      for (var j = 0; j < kids.length; j++) {
        var kid = kids[j];
        if (kid.className && String(kid.className).indexOf("cro-12412") !== -1) continue;
        if (!passedCreate) {
          kid.setAttribute("data-cro-12412-login-el", "");
          if (kid.tagName === "BUTTON" && /create account/i.test((kid.innerText || "").trim())) {
            passedCreate = true;
          }
        } else {
          kid.removeAttribute("data-cro-12412-login-el");
          kid.setAttribute("data-cro-12412-gone", "");
        }
      }
      return { form: form, container: container, formInner: formInner };
    }

    /* ---- injected HTML (inline display:none — body class + CSS reveal it) ---- */

    function buildTabs() {
      var tabs = document.createElement("div");
      tabs.className = "cro-12412-tabs";
      tabs.setAttribute("role", "tablist");
      tabs.style.display = "none";
      tabs.innerHTML =
        '<button type="button" role="tab" aria-selected="true" class="cro-12412-tab cro-12412-tab-guest">Checkout as guest</button>' +
        '<button type="button" role="tab" aria-selected="false" class="cro-12412-tab cro-12412-tab-login">Log in</button>';
      return tabs;
    }

    function buildGuestPanel() {
      var panel = document.createElement("div");
      panel.className = "cro-12412-guest-panel";
      panel.style.display = "none";
      panel.innerHTML =
        '<div class="cro-12412-field">' +
          '<label class="cro-12412-label" for="cro-12412-email">Email Address</label>' +
          '<input id="cro-12412-email" class="cro-12412-input" type="email" placeholder="Email" autocomplete="email">' +
          '<div class="cro-12412-error" data-cro-12412-error="email"></div>' +
        "</div>" +
        '<div class="cro-12412-field">' +
          '<label class="cro-12412-label" for="cro-12412-firstname">First Name</label>' +
          '<input id="cro-12412-firstname" class="cro-12412-input" type="text" placeholder="First Name" autocomplete="given-name">' +
          '<div class="cro-12412-error" data-cro-12412-error="firstname"></div>' +
        "</div>" +
        '<div class="cro-12412-field">' +
          '<label class="cro-12412-label" for="cro-12412-lastname">Last Name</label>' +
          '<input id="cro-12412-lastname" class="cro-12412-input" type="text" placeholder="Last Name" autocomplete="family-name">' +
          '<div class="cro-12412-error" data-cro-12412-error="lastname"></div>' +
        "</div>" +
        '<button type="button" class="cro-12412-continue">Continue to delivery</button>' +
        '<div class="cro-12412-prefer">Prefer to save your details? Tap Log in above.</div>';
      return panel;
    }

    function setTabState(loginActive) {
      document.body.classList[loginActive ? "add" : "remove"](LOGIN_TAB_CLASS);
      var g = document.querySelector(".cro-12412-tab-guest");
      var l = document.querySelector(".cro-12412-tab-login");
      if (g) g.setAttribute("aria-selected", loginActive ? "false" : "true");
      if (l) l.setAttribute("aria-selected", loginActive ? "true" : "false");
    }

    /* ---- guest form validation (mirrors native inline error pattern) ---- */

    function setError(panel, key, message) {
      var input = panel.querySelector("#cro-12412-" + (key === "email" ? "email" : key));
      var err = panel.querySelector('[data-cro-12412-error="' + key + '"]');
      var field = input && input.closest ? input.closest(".cro-12412-field") : null;
      if (message) {
        if (input) input.classList.add("cro-12412-invalid");
        if (field) field.classList.add("cro-12412-invalid"); /* label goes error-red via CSS */
        if (err) {
          err.textContent = message;
          err.classList.add("cro-12412-show");
        }
      } else {
        if (input) input.classList.remove("cro-12412-invalid");
        if (field) field.classList.remove("cro-12412-invalid");
        if (err) err.classList.remove("cro-12412-show");
      }
      return !message;
    }

    function validateGuestForm(panel) {
      var email = panel.querySelector("#cro-12412-email").value.trim();
      var first = panel.querySelector("#cro-12412-firstname").value.trim();
      var last = panel.querySelector("#cro-12412-lastname").value.trim();
      var ok = true;
      if (!email) ok = setError(panel, "email", "Enter your email") && ok;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = setError(panel, "email", "Enter a valid email address") && ok;
      else setError(panel, "email", "");
      if (!first) ok = setError(panel, "firstname", "Enter your first name") && ok;
      else setError(panel, "firstname", "");
      if (!last) ok = setError(panel, "lastname", "Enter your last name") && ok;
      else setError(panel, "lastname", "");
      return ok ? { email: email, firstName: first, lastName: last } : null;
    }

    /* ---- continue to delivery: hand over to the native guest flow ---- */

    function continueAsGuest(panel) {
      var data = validateGuestForm(panel);
      if (!data) return;
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify(data));
      } catch (e) { }
      var nativeGuestBtn = findButtonByText(/checkout as guest/i, getLoginForm() || document);
      if (nativeGuestBtn) {
        nativeGuestBtn.click(); /* exact native behaviour: SPA-navigates to ?isGuest=true&step=cart */
        armPrefill();
      }
    }

    /*
     * Pre-populate the native guest fields (name attrs are the only stable
     * hooks) once they render on the next step. React controlled inputs need
     * the native value setter + input/change events or the value is ignored.
     * Desktop renders them immediately on the guest page; mobile only on the
     * delivery step, so keep polling for up to 3 minutes. Fields are filled
     * once and never overwritten, so they stay editable.
     */
    function setReactValue(input, value) {
      var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      setter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    var prefillArmed = false;
    function armPrefill() {
      if (prefillArmed) return;
      prefillArmed = true;
      var raw = null;
      try {
        raw = sessionStorage.getItem(STORE_KEY);
      } catch (e) { }
      if (!raw) return;
      var data = JSON.parse(raw);
      var map = { guestEmail: data.email, guestFirstName: data.firstName, guestLastName: data.lastName };
      var done = {};
      var tries = 0;
      var iv = setInterval(function () {
        tries++;
        if (/[?&]isGuest=true/i.test(window.location.search)) {
          for (var name in map) {
            if (done[name]) continue;
            var el = document.querySelector('input[name="' + name + '"]');
            if (!el) continue;
            if (!el.value) setReactValue(el, map[name]);
            done[name] = true;
          }
        }
        if ((done.guestEmail && done.guestFirstName && done.guestLastName) || tries > 600) {
          clearInterval(iv);
        }
      }, 300);
    }

    /* ---- decorate: tag natives + inject UI (idempotent) ---- */

    function decorate() {
      var refs = tagNativeElements();
      if (!refs) return false;

      if (!refs.container.querySelector(".cro-12412-tabs")) {
        var tabs = buildTabs();
        var headingBlock = refs.container.querySelector("[data-cro-12412-heading]");
        refs.container.insertBefore(tabs, headingBlock || refs.form);

        var panel = buildGuestPanel();

        /* reuse the native disclaimer (keeps copy + T&C link + styling in sync) */
        var goneEls = refs.formInner.querySelectorAll("[data-cro-12412-gone]");
        for (var i = 0; i < goneEls.length; i++) {
          if (goneEls[i].querySelector("a") && /guest checkout/i.test(goneEls[i].innerText || "")) {
            var disclaimer = goneEls[i].cloneNode(true);
            disclaimer.removeAttribute("data-cro-12412-gone");
            disclaimer.className += " cro-12412-disclaimer";
            panel.appendChild(disclaimer);
            break;
          }
        }

        refs.form.parentNode.insertBefore(panel, refs.form.nextSibling);

        tabs.querySelector(".cro-12412-tab-guest").addEventListener("click", function () {
          setTabState(false);
        });
        tabs.querySelector(".cro-12412-tab-login").addEventListener("click", function () {
          setTabState(true);
        });

        panel.querySelector(".cro-12412-continue").addEventListener("click", function () {
          continueAsGuest(panel);
        });
        var inputs = panel.querySelectorAll("input");
        for (var k = 0; k < inputs.length; k++) {
          inputs[k].addEventListener("keydown", function (e) {
            if (e.key === "Enter") continueAsGuest(panel);
          });
        }

        setTabState(false); /* guest tab active on load */
      }
      return true;
    }

    /*
     * Keep variation in sync with the SPA. Covers: initial load, React
     * late-hydration wiping the injection, login-error re-renders dropping
     * the tag attributes, and client-side navigation on/off the entry step.
     */
    function startSync() {
      setInterval(function () {
        /* QA kill switch: window.cro_12412_off = true shows control again */
        if (window.cro_12412_off) {
          document.body.classList.remove(variation_name, LOGIN_TAB_CLASS);
          return;
        }
        if (isEntryStep()) {
          if (document.querySelector('form input[name="password"]')) {
            var wasInjected = !!document.querySelector(".cro-12412-tabs");
            decorate();
            if (!wasInjected) setTabState(false);
            addClass("body", variation_name);
          }
        } else {
          document.body.classList.remove(variation_name, LOGIN_TAB_CLASS);
        }
      }, 400);
    }

    function init() {
      if (decorate()) {
        addClass("body", variation_name);
      }
      startSync();
      if (debug) console.log("AB Test | Checkout | Equal-Weight Login vs Guest Entry | ALL | CRO-12412 initialised");
    }

    if (!window.cro_12412_loaded) {
      window.cro_12412_loaded = true;
      waitForElement('form input[name="password"]', init);
    }
  } catch (e) {
    if (debug) console.log(e, "error in Test cro-12412");
  }
})();
