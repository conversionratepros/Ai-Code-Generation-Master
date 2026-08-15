# Convert.com — Code Samples & Practical Patterns Reference

Compiled 2026-08-12. Every claim carries its source URL. Code blocks are as extracted from the source pages (fetched via a summarizing pipeline — where a snippet looked garbled in extraction it's flagged). Items that could not be confirmed against a primary source are marked **UNVERIFIED**.

---

## 1. GitHub org: github.com/convertcom

Enumerated via the GitHub API (`api.github.com/orgs/convertcom/repos`) — 10 public repos:

| Repo | Language | Description |
|---|---|---|
| [javascript-sdk](https://github.com/convertcom/javascript-sdk) | TypeScript | Convert Experiences FullStack Javascript SDK (monorepo: `packages/js-sdk` + React/Node/Nest/Next/Remix demos) |
| [samples](https://github.com/convertcom/samples) | JavaScript | "Various sample scripts for customers" — currently only `bulkLocations/` |
| [Convert-Manual-Shopify-Integration-Customer-Event-Pixel](https://github.com/convertcom/Convert-Manual-Shopify-Integration-Customer-Event-Pixel) | JavaScript | Shopify Customer Events pixel + Global Project JS for revenue attribution |
| [php-sdk](https://github.com/convertcom/php-sdk) | PHP | Full Stack SDK |
| [python-sdk](https://github.com/convertcom/python-sdk) | Python | Full Stack SDK |
| [android-sdk](https://github.com/convertcom/android-sdk) | Kotlin | Full Stack SDK |
| [ruby-sdk](https://github.com/convertcom/ruby-sdk) | Ruby | Full Stack SDK |
| [ios-sdk](https://github.com/convertcom/ios-sdk) | Swift | Full Stack SDK |
| [The-F-List](https://github.com/convertcom/The-F-List), [gh-create-asana-task](https://github.com/convertcom/gh-create-asana-task) | — | Not experimentation-related |

**Key takeaway: there is NO public repo of client-side variation-code helpers (no waitForElement library).** The client-side polling utility is `convert._$` baked into the tracking script itself (section 2).

### 1a. samples/bulkLocations — bulk-create Locations via REST API v2

Source: https://github.com/convertcom/samples/tree/master/bulkLocations (README + `index.js`). Demonstrates Convert's HMAC-signed API auth — useful boilerplate for any Convert API v2 scripting:

```javascript
let createRequestSignature = function(application_id, application_secret, expires_timestamp, url, payload = '') {
  let requestJson = (typeof payload === 'object') ? JSON.stringify(payload) : '';
  let signString = application_id + '\n' +
    expires_timestamp + '\n' +
    url + '\n' +
    requestJson;
  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(signString, application_secret));
};

let buildRequestHeader = function(payload = '', expires = 20) {
  let url = apiUrl; // https://api.convert.com/api/v2/accounts/${accountId}/projects/${projectId}/locations/add
  let expiresTimestamp = Date.now() / 1000 + expires;
  let signature = createRequestSignature(apiKey, apiSecret, expiresTimestamp, url, payload);
  return {
    'Convert-Application-ID': apiKey,
    'Authorization': 'Convert-HMAC-SHA256 Signature=' + signature,
    'Expires': expiresTimestamp,
    'Content-Type': 'application/json'
  };
};
```

Location rule JSON shape (nested `OR` → `AND` → `OR_WHEN` → rule objects):

```json
{
  "name": "Test Location",
  "status": "active",
  "rules": { "OR": [ { "AND": [ { "OR_WHEN": [ {
    "rule_type": "url",
    "matching": { "match_type": "matches", "negated": false },
    "value": "https://convert.com"
  } ] } ] } ] }
}
```

API docs: https://api.convert.com/doc/v2/

### 1b. Shopify pixel repo — real-world Global Project JS pattern

Source: https://github.com/convertcom/Convert-Manual-Shopify-Integration-Customer-Event-Pixel (files: `globalprojectjs.js`, `customerevent.js`, `customereventfromcheckout.js`, `customereventwithupsell.js`, `subandnosubscustomerevent.js`, `purchaseeventfromgtm.html`).

`globalprojectjs.js` is the best public example of official Convert-authored Global Project JS. Patterns worth stealing (verbatim from the repo):

```javascript
// Listen for the moment all experiences have been evaluated, then read bucketing state
window._conv_q = window._conv_q || [];
window._conv_q.push({
    what: 'addListener',
    params: {
        event: 'snippet.experiences_evaluated',
        handler: function() {
            let session_cookie = convert.getCookie('_conv_s');
            // session id is embedded in the cookie: substring between 'sh:' and '*'
            let session_id = session_cookie.substring(
                session_cookie.indexOf('sh:') + 3,
                session_cookie.indexOf('*')
            );
            // iterate convert.currentData.experiences AND convert.historicalData.experiences;
            // skip experiences whose convert.data.experiences[expID].type === "deploy"
            // read variation.id / experience.variation_id per experience
            // also available: convert.data.account_id, convert.data.project.id,
            // convert.currentData.goals, convert.getDefaultSegments(),
            // convert.data.project.settings.max_order_value / min_order_value
        }
    }
});

// First-party cookie helper on the convert object:
convert.setCookie('convert_attributes', JSON.stringify(convert_attributes), { expires: days });
convert.getCookie('_conv_s');
```

This confirms the runtime surface: `convert.data` (project config), `convert.currentData` (this pageview's bucketing/goals), `convert.historicalData` (prior bucketing), `convert.getDefaultSegments()`, `convert.getCookie()` / `convert.setCookie()`.

---

## 2. Variation code: what runs when, polling, jQuery

### 2a. Snippet placement & timing

Source: https://support.convert.com/hc/en-us/articles/205151015-how-to-install-the-main-tag-convert-tracking-code-javascript-
- Install in `<head>`, **"Placing it after the `</title>` tag is best."** Reason: "the Convert Experiments tracking request needs to be initiated as soon as possible on the page, giving it time to get the results back before the whole page finishes loading."
- Footer placement ⇒ "a distracting visual blink of the original page before the variation is seen."
- Two snippet flavors: **Basic Snippet** (default) and **Advanced Snippet** (only if using Page Tags — see 5h).
- **The Legacy Tracking Script is deprecated; automatic migrations begin February 1, 2026.** New script: no jQuery dependency, native SPA support, ~20% smaller.
- Snippet URL (new script): `https://cdn-4.convertexperiments.com/v1/js/[account_id]-[project_id].js`, base ~50 kB compressed, grows with experiences/goals — source: https://docs.developers.convert.com/v1.0-web/docs/overview

Source: https://support.convert.com/hc/en-us/articles/204490299-how-convert-experiences-works-behind-the-scenes
- Variation content comes back as JS applied with jQuery syntax, e.g. `convert._$('.buy_now').val("Add to Cart");`
- "patented process which will poll the existence of elements and change them as soon as they are available, eliminating the flickering effect"
- With head placement, changes usually apply "even before the full page is loaded" (legacy IE waits for DOM Loaded).

### 2b. Convert's element-polling utility: `convert._$` vs `convert.$`

Source: https://support.convert.com/hc/en-us/articles/210581203-convert-vs-convert
- **`convert._$`** — modified jQuery reference used by the **Code Editor** (visual-editor generated code). The whole code block **re-executes every 50 ms** "until there's nothing left inside the code that seems to need processing, or until DOM ready is hit." Documented example: code targeting `a.login` and `a.loginFooter` — if only `a.login` exists, it's changed immediately; when `a.loginFooter` appears on a later 50ms tick, it's changed **without re-processing** `a.login`.
- **`convert.$`** — "the unmodified version of Jquery," no polling. This is Convert's bundled jQuery — the docs contrast it with relying on the page's own jQuery.
- Convert does NOT document a `waitForElement`/`poll` named utility (unlike Optimizely's `optimizely.get('utils')`). `convert._$` + the 50ms re-execution loop IS their polling mechanism. Our own `waitForElement` habit remains the right tool for anything `convert._$` can't express.

Source: https://support.convert.com/hc/en-us/articles/114094183412-variation-code-faq
- **Code Editor** code executes repeatedly "until each line returned at least one DOM element or DOM ready is hit."
- **Custom JS** (variation JS box) runs **once**, "at the moment when the experiment is fired, which is usually somewhere in the head section of the page" — i.e. usually before the body exists. Original content may flash if you manipulate DOM here without waiting.
- Custom JS must wrap DOM work in: `convert.$(document).ready(function() { /* code */ });`
- `convert._$` "is designed to work without DOM ready" but **only for basic chained statements** like `convert._$("selector").action`.
- Documented run-once-when-element-exists idiom (poll on one selector, act once):

```javascript
if(convert._$('selector').length>0) {
   convert.$("selector2").action
}
```

- Performance guidance: put DOM-manipulating code in Custom JS "for best performance," wrapped in DOM ready.

### 2c. Extending jQuery alongside `convert._$`

Source: https://support.convert.com/hc/en-us/articles/360016010672-how-to-extend-jquery-and-use-it-along-the-convert-library

```javascript
// Following function extends the convert jquery library
convert.$.fn.updateCdn = function() {
  var imageSrc = convert.$(this).attr('src');
  if(imageSrc.indexOf('https://12345.oldcn.com/') > -1) {
    convert.$(this).attr('src', imageSrc.replace('https://12345.oldcn.com/', 'https://1234.newcdn.com/'));
  }
};

// Following call executes the function in all of the elements returned.
convert._$('img').updateCdn();
```

Pattern: define plugin on `convert.$.fn`, invoke via `convert._$()` so it benefits from the polling loop. Caveat from same article: "For these libraries to work, JQuery has to be enabled on the script or be included outside it."

### 2d. Gotcha: variables named `PATH` in variation JS

Source: https://support.convert.com/hc/en-us/articles/115000006251-project-experience-variation-javascript — a variable literally named `PATH` can trigger Convert's security filtering and silently block saving/persisting the JS. Rename (e.g. `SVG_PATH`).

---

## 3. Global Project JS vs Global Experience JS vs Variation JS

### Execution order

Source: https://support.convert.com/hc/en-us/articles/360059006712-Convert-s-Code-Editors-explained — five editors; JS call sequence:

1. **Global Project Javascript** (Configuration → Global Project Javascript) — "gets included wherever the Convert tracking code is placed," runs first, before any experience/variation code.
2. **Global Experience JS** — runs for "any visitor bucketed on the experiment," before variation code.
3. **Variation Custom Javascript** — last.

Within a level, **experiments with lower IDs execute before those with higher IDs**. Also from this article: Variation CSS/Global Experience CSS are "more persistent than changes included in the other editors" (CSS rules stay applied, immune to re-render race conditions — use `!important` to beat theme rules). Variation JS "may execute before page elements load, potentially causing flashing."

### Scope & use cases

Source: https://support.convert.com/hc/en-us/articles/115000006251-project-experience-variation-javascript
- **Global Project JS**: injected on *every* page carrying the tracking code; behaves "like any standard library included in your webpage." (Documented uses elsewhere: SPA polling hooks, sitewide goal listeners, consent commands.)
- **Global Experience JS**: Visual Editor → Snippet Editor → Global Experience JavaScript. "Equivalent to adding it to the head section inside a script tag." Not available on Split URL experiences. Use for shared helpers/event listeners across variations.
- **Variation JS**: per-variation; example use case "A/B test customer support chat by adding the chat code to the Variation."
- Sharing functions across levels — define on window in an earlier level, call in a later one:

```javascript
window.functionName = function() {
   //code here
}
// later:
window.functionName()
```

### Environment-specific Global JS

Source: https://support.convert.com/hc/en-us/articles/how-to-use-environment-specific-global-javascript-in-convert — Configuration → Global Javascript has a "Select Environment" dropdown (All Environments / Production / Staging / custom). "JS under 'All Environments' is always executed first. If there's environment-specific JS… it executes after the global JS."

### Snippet-internal order of execution (decision pipeline)

Source: https://support.convert.com/hc/en-us/articles/115002527732-how-convert-code-snippet-works-order-of-execution — Location conditions (OR'd, "tested every time you visit the page") → Audience conditions ("only tested once for a visitor") → traffic distribution picks original/variation.

Source (new script, 9-step pipeline): https://docs.developers.convert.com/v1.0-web/docs/how-it-works
1. Identify visitor (`_conv_v` cookie; UTM extraction) → 2. default segments (browser/device/source/campaign/visitor type/country) → 3. custom segments (geo-dependent rules deferred) → 4. location triggers (URL patterns, DOM element presence, or callback) → 5. experiences (audience, traffic allocation, bucketing) → 6. apply variation changes (CSS inject, HTML insert/replace, JS execute, or redirect) → 7. **show page — anti-flicker overlay removed after goal setup or 2.5 s timeout** → 8. goal listeners (clicks, form submits, scrolls) → 9. fire integrations.
- "Goals are evaluated independently after experiences are processed" — a triggered goal attributes to all active experiences.
- On SPA URL changes the whole sequence re-runs except visitor identification.

---

## 4. Full-stack: @convertcom/js-sdk

Source: https://github.com/convertcom/javascript-sdk/blob/main/packages/js-sdk/README.md. Docs site: https://convertcom.github.io/javascript-sdk/ ; developer hub: https://docs.developers.convert.com/v1.0-fs/docs/javascript-quickstart

**When to reach for it:** feature flags/rollouts, server-side bucketing (Node/Next/Remix/Cloudflare Workers — see `/v1.0-fs/docs/cloudflare-workers`), experiments where the DOM-snippet approach can't work. Fullstack projects use string `key`s on every entity; experiences limited to `a/b_fullstack` and `feature_rollout`; bucketing via MurmurHash; persistence is YOUR job via a DataStore.

```bash
npm install --save @convertcom/js-sdk
```

Browser UMD (evaluation only): `<script src="https://unpkg.com/@convertcom/js-sdk/lib/index.umd.min.js"></script>` then `const {default: ConvertSDK} = window.ConvertSDK;`

### Init + bucketing + conversion (core loop)

```typescript
import ConvertSDK from '@convertcom/js-sdk';

const convertSDK = new ConvertSDK({
  sdkKey: 'xxx',
  sdkKeySecret: 'xxx',           // only for authenticated SDK keys
  dataRefreshInterval: 300000,   // ms
  environment: 'staging'         // or 'live'
});
convertSDK.onReady().then(() => {
  const context = convertSDK.createContext('user-unique-id', { country: 'US', language: 'en' });

  // bucket into one experience:
  const variation = context.runExperience('experience-key');
  // or all: const variations = context.runExperiences();
  // features: context.runFeature('feature-key') / context.runFeatures();

  // conversion:
  context.trackConversion('goal-key', {
    ruleData: { action: 'buy' },
    conversionData: [
      { key: 'amount', value: 10.3 },
      { key: 'productsCount', value: 2 },
      { key: 'transactionId', value: 'transaction-unique-id' }
    ],
    conversionSetting: { forceMultipleTransactions: false }
  });
});
```

Alternative init: pass `projectConfig` statically (fetch from `https://cdn-4.convertexperiments.com/api/v1/config/account_id/project_id`; schema at https://api.convert.com/doc/serving/#tag/Project-Config) — SDK usable immediately, no CDN round-trip.

Full config object (defaults shown in README): `bucketing: { hash_seed: 9999, max_traffic: 10000, excludeExperienceIdHash: false }`, `events: { batch_size: 10, release_interval: 10000 }`, `network: { tracking: true, cacheLevel: 'default', source: 'js-sdk' }`, `logger`, `dataStore`.

Other context methods: `runCustomSegments(['segment-key'], props)`, `setDefaultSegments({country:'US'})` (only `browser`, `devices`, `source`, `campaign`, `visitorType`, `country` reach reports), `updateVisitorProperties(...)`, `getConfigEntity(key, EntityType.EXPERIENCE)`, `getConfigEntityById(id, EntityType.FEATURE)`, `context.releaseQueues()` (flush pending events, e.g. before unmount).

SDK events: `convertSDK.on(SystemEvents.READY | BUCKETING | CONVERSION | CONFIG_UPDATED, cb)` plus `location.activated`/`location.deactivated` — the README's BUCKETING example forwards experience/variation names to GA via `gtag('event', ...)`.

Persistent DataStore = any object with `get(key)`/`set(key, value)` passed as `dataStore` in config.

React/Node/Nest/Next/Remix demo apps live in the repo (`yarn demo:reactjs:start` etc.); tutorials: https://convertcom.github.io/javascript-sdk/tutorial-test-variations.html (+ -test-conversion, -test-features, -test-segments).

---

## 5. Recipes (client-side, from support.convert.com)

### 5a. JS-triggered goals — `triggerConversion`

Source: https://support.convert.com/hc/en-us/articles/360043919492-tracking-form-submission-using-a-javascript-triggered-goal — create "Javascript Triggered Goal" from Goal Templates, grab goal ID, put listener in Global Project JS. Convert's own recommended native-JS version:

```javascript
window.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('formID');
    if (form) {
        form.addEventListener('submit', function(event) {
            window._conv_q = window._conv_q || [];
            _conv_q.push(["triggerConversion", "12345678"]);
        });
    }
});
```

General form (experiment id optional third param): `_conv_q.push(["triggerConversion","10007732","1000123"])` — confirmed across https://support.convert.com/hc/en-us/articles/114093992211-Custom-Prebuilt-Goals and related articles.

### 5b. Custom prebuilt goal (scroll-to-bottom)

Source: https://support.convert.com/hc/en-us/articles/114093992211-Custom-Prebuilt-Goals — place in Global Project JS or Global Experience JS. As published (note: the article's own snippet has broken syntax — mis-parenthesized `&&` and `=` instead of `==`; treat as pseudocode and fix before use):

```javascript
var scrollgoal_triggered;
window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) &&
      (scrollgoal_triggered = false) {
        window._conv_q = window._conv_q || [];
       _conv_q.push(["triggerConversion","100122012"]);
       scrollgoal_triggered = true;
   }
};
```

### 5c. Revenue tracking — `pushRevenue`

Source: https://support.convert.com/hc/en-us/articles/204495499-add-revenue-tracking-to-your-site

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["pushRevenue",revenue,products_cnt,goal_id]);
// multiple transactions per visitor:
window._conv_q.push(["pushRevenue",revenue,products_cnt,goal_id,"force_multiple"]);
```

- `revenue` uses dot decimal (123.45); place "anywhere on the page (after the main Convert tracking code)".
- Default: one transaction per visitor/experiment/goal; `"force_multiple"` overrides.
- Cross-domain checkout: install tracking code on checkout domain first + enable cross-domain linking ("Cross-Domain linking is off by default in newly-created Projects because of GDPR").
- GA4/GA3-360: revenue auto-connects when standard GA code present.

Multiple conversions generally (source: https://support.convert.com/hc/en-us/articles/360022117651-tracking-multiple-conversions-with-convert): only the revenue code path supports multi-fire — `_conv_q.push(["pushRevenue","1","1","123456789","force_multiple"])` with value 1 as a counter; read **Revenue / Revenue per Visitor** instead of conversion rate. URL/Click/Form/Advanced goals can't multi-fire.

### 5d. Hover goal & delegated click goal (dynamic elements)

Hover — source: https://support.convert.com/hc/en-us/articles/360049978231-Record-Conversions-when-Element-is-Hovered (goes in Global Experience JS):

```javascript
convert.$(document).ready(function() {
  var hoverTrue = "Not Hovered";
  var triggerHoverGoal = 0;
  convert.$("yourElement").on("mouseenter",function() {
    if (triggerHoverGoal == 0){
      hoverTrue = "mousein";
      window._conv_q = window._conv_q || [];
      _conv_q.push(["triggerConversion","1003654"]);
      goalTriggered = 1;   // (sic — article's own variable naming is inconsistent)
    }
  });
});
```

Delegated click on late-injected element — source: https://support.convert.com/hc/en-us/articles/115000044591-triggering-a-click-goal-on-an-element-that-its-not-part-of-the-dom-when-the-page-loads (Experience Custom JS or Global Project JS; article's snippet has a stray trailing backtick/missing `);` — cleaned intent shown):

```javascript
convert.$(document).ready(function() {
   convert.$("#co-billing-form").on("click","#opc-review .continue_button",function() {
     window._conv_q = window._conv_q || [];
     _conv_q.push(["triggerConversion","123456789"]);
   });
});
```

### 5e. SPA support

Manual polling era — source: https://support.convert.com/hc/en-us/articles/205159975-running-experiments-on-single-page-apps (code goes in **Global Project Javascript**):

Basic re-evaluate command:
```javascript
window._conv_q = _conv_q || [];
window._conv_q.push(["run","true"]);
```

Method A — History API proxy:
```javascript
if (!window.globalExecutedTs) {
  const pushStateProxy = new Proxy(window.history.pushState, {
    apply: function(target, thisArg, argumentsList) {
      setTimeout(() => {
        _conv_q = window._conv_q || [];
        _conv_q.push(["run", "true"]);
      }, "100");
      return Reflect.apply(target, thisArg, argumentsList);
    }
  });
  window.history.pushState = pushStateProxy;
}
```

Method B — URL-change polling every 100ms:
```javascript
if (!window.globalExecutedTs) {
  function checkURLchange(){
    if((window.location.href + window.location.hash) != oldURL){
      oldURL = (window.location.href + window.location.hash);
      window._conv_q = _conv_q || [];
      window._conv_q.push(["run", "true"]);
    }
  }
  window.globalExecutedTs = true;
  var oldURL = (window.location.href + window.location.hash);
  setInterval(checkURLchange, 100);
}
```

Goal re-check: `window._conv_q.push(['recheck_goals']);` — same article. Also: use **JS-condition locations** instead of URL matches on SPAs; changes are NOT auto-reset on SPA navigation (undo manually).

Undo pattern — source: https://support.convert.com/hc/en-us/articles/4402421565453-single-page-application-spa-troubleshooting-guide (Global Project JS; reverts changes when conditions no longer match):

```javascript
if ((!convert.historicalData.experiences[100124225]) ||
    convert.historicalData.experiences[100124225]) {
  convert.$('#Hello').css('display', 'block');
}
```
(As published — the condition as printed is a tautology; the article's intent is "when the experience is/isn't active on this view, undo." Also from this article: on SPAs replace visual-editor generated long-path selectors with short manual ones like `#id, .class1.class2.class3`.)

New script (automatic) — source: https://docs.developers.convert.com/v1.0-web/docs/spa-support
- Auto-monitors `history.pushState()`, `history.replaceState()`, `popstate`; re-evaluates locations; activates matching experiences.
- Continuous DOM-mutation monitoring re-applies variation changes (lazy-load, hydration, re-render).
- Kill switch: `?_conv_disable_spa_optimizations=true`
- Guard your custom JS against re-execution: `const id = "convert-custom-banner"; if (document.querySelector('#'+id)) return;`
- Tuning params `delayContinuousActivation` and `throttleChanges` (ms; start at 100) for clickable-nav conflicts / animation-churn.
- `url.changed` lifecycle event available via `_conv_q` addListener.
- Dashboard toggle: My Project → Configuration → Other Settings → SPA Optimizations (hydration detection + reapply-on-mutation) — source: https://support.convert.com/hc/en-us/articles/spa-optimizations

### 5f. Redirects with query preservation

Source: https://support.convert.com/hc/en-us/articles/205160335-how-do-i-create-a-variation-that-redirects-to-another-page-based-on-certain-logic-
- Never use `document.location.href` in a variation — stats won't record. Use `convert.redirect("URL_here");`
- Preserve/add params:

```javascript
function redirectToNewUrlWithParam() {
    var currentUrl = window.location.href;
    if (currentUrl.includes('?')) { currentUrl += '&ft=04nf23r'; }
    else { currentUrl += '?ft=04nf23r'; }
    convert.redirect(currentUrl);
}
redirectToNewUrlWithParam();
```

- Cross-domain: `convert.redirect("https://other-domain.com/page.html", {cross_domain: true});` and combined `{ cross_domain: true, maintain_parameters: true }`.
- Don't mix styling changes and `convert.redirect()` in one experiment.

Split URL param transfer — source: https://support.convert.com/hc/en-us/articles/360000940871-transfer-query-parameters-from-original-to-a-variation-that-also-has-query-parameters — enable Support Regular Expressions + Transfer Original URL Variables; Original URL regex `https://www.mysite.com/([^\?]+)?\?{0,1}(.*)$`, Variation URL `http://www.mysite.com/VIDEO/?query=param&$2` (append captured query with `&`, never a second `?`). Location must exclude the variation URL/params to avoid redirect loops. Related: https://support.convert.com/hc/en-us/articles/210711786-adding-a-parameter-to-a-split-url-variation-while-transferring-the-query-parameters , https://support.convert.com/hc/en-us/articles/360047125231-replacing-or-removing-certain-parameters-on-a-split-url-experiment , https://support.convert.com/hc/en-us/articles/360021919232-Creating-a-Multipage-Split-URL-experiment

### 5g. Cross-domain visitor sync

Source: https://support.convert.com/hc/en-us/articles/204506319-forwarding-tracking-cookies-between-different-domains — cookies `_conv_v` (visitor) and `_conv_s` (session) must reach the other domain as GET/POST params of the same names. Auto-forwarding on link clicks/form submits happens for domains in the same project unless "Do not allow cross-domain linking" is enabled (source: https://support.convert.com/hc/en-us/articles/205159995-cookies-and-cross-domain-testing).

Manual URL construction:
```javascript
"http://www.mysite.com/page.html?_conv_v="+encodeURIComponent(convert.getCookie("_conv_v"))+"&_conv_s="+encodeURIComponent(convert.getCookie("_conv_s"))
```

Hidden form fields:
```javascript
convert.$( document ).ready(function() {
  convert.$("<input>").attr({ name: "_conv_v", type: "hidden", value: (convert.getCookie('_conv_v'))}).appendTo("form.header-booking-form");
  convert.$("<input>").attr({ name: "_conv_s", type: "hidden", value: (convert.getCookie('_conv_s'))}).appendTo("form.header-booking-form");
});
```

Hidden iframe fallback:
```javascript
convert.$( document ).ready(function() {
  convert.$('<iframe src="https://seconddomain.com/page1.html?' + '_conv_v=' + escape(convert.getCookie('_conv_v')) + '&_conv_s='+ escape(convert.getCookie('_conv_s')) + '" frameborder="0" scrolling="no" id="myFrame" style="display:none;"></iframe>').appendTo('body');
});
```

Cookie structure reference: https://support.convert.com/hc/en-us/articles/204495429-convert-experiences-tracking-cookies-structure

### 5h. Advanced Page Tagging (backend → targeting variables)

Source: https://support.convert.com/hc/en-us/articles/205152665-targeting-with-advanced-page-tagging — requires the **Advanced Snippet**. Define plain JS globals **before** the Convert code:

```html
<script type='text/javascript'>
   var _conv_page_type = 'product';
   var _conv_category_name = 'shoes;leather shoes';
   var _conv_product_price = '150.5';
</script>
<!----Convert Experiments code follows---->
```

Location tags: `_conv_page_type`, `_conv_category_id`, `_conv_category_name`, `_conv_product_sku`, `_conv_product_name`, `_conv_product_price` (numeric). Audience tags: `_conv_customer_id`, `_conv_custom_v1`/`_conv_custom_v2` (text), `_conv_custom_v3`/`_conv_custom_v4` (numeric). All ≤50 chars. Don't put PII in them (GDPR).

### 5i. JS-condition targeting + `convert.recheck()`

Source: https://support.convert.com/hc/en-us/articles/205159965-targeting-experiments-and-firing-goals-based-on-a-javascript-condition — JS expressions usable in goals, locations, audiences; evaluated in `window` context; the variables must exist **before** the tracking code — OR use `convert.recheck()` in the expression, which re-evaluates the condition **every 50 ms for up to 2 minutes**. (Exact call syntax inside the expression not shown in the extraction — **exact signature UNVERIFIED**, existence and 50ms/2min behavior documented.)

### 5j. Programmatic bucketing / manual activation

Source: https://support.convert.com/hc/en-us/articles/114094164352-bucketing-visitors-into-an-experiment-programmatically

```javascript
// Set condition marker
experimentrun = 1;
window._conv_q = window._conv_q || [];
window._conv_q.push(['assignVariation',"100122263","1001175348"]);
// Execute on current page (polling has already passed by the time this runs)
window._conv_q.push(["executeExperiment","100122263"]);
```

Pair with experiment JS condition `experimentrun == 1`. Warning: assignment must remain effectively random or stats are invalid.

### 5k. Lifecycle events

Source: https://support.convert.com/hc/en-us/articles/360056121112-Experiment-Life-cycle-Events-Executing-Code-after-an-variation-has-been-decided-experiment-executed-or-goal-triggered

Events: `experience.variation_decided`, `experience.activated` (payload includes `activated_first_time` boolean), `goal.triggered`, `snippet.experiences_evaluated`, `snippet.goals_evaluated`, `cookies.saved`, `location.triggered`.

```javascript
_conv_q = window._conv_q || [];
_conv_q.push({
  what: 'addListener',
  params: {
    event: 'experience.variation_decided',
    handler: (event) => console.log(JSON.stringify(event))
  }
})
```

Payload example: `{"data":{"experience_id":"111111","variation_id":"22222","experience_name":"name here","variation_name":"name here"},"event":"experience.variation_decided"}`. **"Data Anonymization" must be disabled** in Project Configuration to receive names. The new-script docs list additionally `location.activated`, `url.changed`, `snippet.initialized`, `render.complete` (source: https://docs.developers.convert.com/v1.0-web/docs/javascript-api).

### 5l. Full `_conv_q` command surface (new script)

Source: https://docs.developers.convert.com/v1.0-web/docs/javascript-api — two accepted formats: modern `{ what: 'methodName', params: {...} }` and legacy `['methodName', ...]`. Commands: visitor/consent `identify`, `consentRequired`, `consentGiven`; experiences `run`, `assignVariation`/`triggerExperienceVariation`, `executeExperience`, `disableExperience`/`enableExperience`, `doNotRunExperiences`; goals `triggerConversion`/`triggerConversions`, `sendRevenue`/`pushRevenue`, `recheckGoals`; misc `placeVisitorIntoSegment`, `triggerLocation`, `setIntegrationVariable`, `redirect`/`refresh`; `addListener`. (Full typed params table: see js-api.md §3.3.)

### 5m. Consent gating

Source: https://support.convert.com/hc/en-us/articles/360037946851-delay-cookie-writing-and-data-collection-until-visitor-consent-is-provided (place in Global Project JS):

```javascript
// Option 1: block cookies only, experiences still run (no flash)
if (!convert.getCookie("_conv_v")) _conv_q.push(["consentRequired"]);
// after consent:
_conv_q.push({ what: "consentGiven" });

// Option 2: block everything (flash possible after consent)
if (!convert.getCookie("_conv_v")) {
  _conv_q.push({ what: "consentRequired", params: { runExperiences: false } });
  window._conv_waiting_for_consent = true;
}
// after consent:
window._conv_waiting_for_consent = false;
_conv_q.push({ what: "consentGiven" });
```

Geo-tiered consent via `convert.getUserData().geo`.

### 5n. Exit intent, countdown timers, login-gated pages

- **Exit popup**: https://support.convert.com/hc/en-us/articles/360044897352-How-to-test-an-exit-popup — official route is the built-in Pop-up Creator in the Visual Editor; the custom route is pasting the minified open-source library https://github.com/beeker1121/exit-intent-popup + its template into **Variation JS** (Convert explicitly does not endorse the library). No Convert-authored exit-intent code exists.
- **Countdown timer**: **no Convert support article or sample found** — no official recipe.
- **Login-gated pages**: https://support.convert.com/hc/en-us/articles/204506849-Can-I-Test-a-Protected-Site — HTTP Basic Auth is supported in the Visual Editor for password-protected/staging sites. (Form-login flows: no code recipe published.)

### 5o. Reading experiment config programmatically

Source: https://support.convert.com/hc/en-us/articles/360013456431-retrieving-experiment-configuration-data-programmatically — public JSON endpoint `https://cdn-3.convertexperiments.com/JSON/XXXXXX-XXXXXX.json` (AccountID-ProjectID from the tracking snippet) returns Running/Completed experiences, all Global Project JS/CSS, Global Experience JS, Code Editor + custom JS/CSS per variation, goals, segments; experiment objects carry `vars` (variations), `p` (traffic %), JS/HTML content, status. (Same endpoint used to extract the junior's CRO-12574 build.) Runtime equivalents in-page: `convert.data`, `convert.currentData`, `convert.historicalData`.

---

## 6. CSP, debugging, performance / anti-flicker

### CSP

Source: https://support.convert.com/hc/en-us/articles/23979373845261-how-to-configure-your-website-s-csp-policy-for-convert-experiments — whitelist under **`connect-src`**: `*.metrics.convertexperiments.com`, `*.signals.convertexperiments.com`, `logs.convertexperiments.com` (or wildcard `*.convertexperiments.com`). Example from the article:

```
connect-src 'self' *.metrics.convertexperiments.com logs.convertexperiments.com *.convertexperiments.com;
```

The article gives **no nonce/hash guidance** and doesn't discuss `script-src` for the snippet itself — you'll still need `script-src` to allow `cdn-*.convertexperiments.com` for the tag to load at all (**inference, UNVERIFIED against a Convert doc**). Nothing published on Subresource Integrity for the snippet (it's dynamic per-project config, so SRI is impractical) — **UNVERIFIED/absent from docs**.

### Debugging & QA

Source: https://docs.developers.convert.com/v1.0-web/docs/debugging
- Log levels: `?convert_log_level=info` / `?convert_log_level=debug`
- Preview any variation (skips audiences, disables tracking, includes drafts/paused): `?convert_action=convert_vpreview&convert_e=100456&convert_v=100789`
- Force variation WITH tracking: `?_conv_eforce=100456.100789` (comma-separate multiple: `100456.100789,100457.100790`)
- Disable script: `?convert_disable=true`; tracking only: `?_conv_prevent_tracking=true`
- Console: `convert.currentData.experiences`, `convert.getVisitorSegments()`, `convert.getUserData()`, `convert.getCookie('_conv_v')`

### Anti-flicker / performance

- New script hides content via an overlay until goals initialize or a **2.5 s default timeout**; tune with `?convert_dom_timeout=3000`; opt out entirely with `<script>window._conv_prevent_bodyhide = true;</script>` placed before the snippet. Source: https://docs.developers.convert.com/v1.0-web/docs/debugging + /how-it-works
- Snippet adds "approximately 450ms extra loading time to the first-page view"; hosted on Akamai CDN; cached after first load. Keep it small: prune goals ("All attached goals to your experiments add code to your snippet") and clean Code Editor output ("Clean and maintain your variation code… to the minimum"). Source: https://support.convert.com/hc/en-us/articles/115001904312-improve-convert-s-snippet-downloading-speeds
- Geo/weather data loads lazily only when targeting needs it. Source: https://docs.developers.convert.com/v1.0-web/docs/overview
- Convert publishes **no separate anti-flicker snippet** (unlike Google Optimize) — flicker control is the head-placed synchronous-ish snippet + `convert._$` polling + the built-in overlay.

---

## Coverage notes / gaps

- **Blog**: convert.com/blog carries strategy content, not implementation recipes; the only code-bearing blog-adjacent page found was https://www.convert.com/blog/support/track-omnichannel-ecommerce-conversions/ (cross-domain conversions, overlaps 5g). All real code lives on support.convert.com and docs.developers.convert.com.
- **Not found / doesn't exist**: named `waitForElement`/`poll` utility (Convert's answer is `convert._$`); countdown-timer recipe; nonce/SRI guidance; a public "code samples" repo beyond `samples/bulkLocations`.
- Developer hub index for further mining: https://docs.developers.convert.com/ (Web: overview, how-it-works, javascript-api, spa-support, integrations, debugging; FS: quickstarts per language, cloudflare-workers, recipes).
- Extraction caveat: article content was fetched through a summarizing fetcher; snippets above are as that pipeline returned them. Two official snippets (5b scroll goal, 5d delegated click) contain syntax errors in the source articles themselves — noted inline.
