# Convert.com Reference: Goals, Revenue Tracking, Analytics Integrations, Stats & Debugging

Research date: 2026-08-12. All claims sourced; items that could not be confirmed against a primary source are marked **UNVERIFIED**.

---

## 1. Goal Types

Source: https://support.convert.com/hc/en-us/articles/204494109-goals

Convert offers **7 goal templates** plus advanced/custom goals:

| Template | How it's configured | How it fires |
|---|---|---|
| **Visit a Specific Page** | Goal name + URL with matching options: *matches exactly, starts with, contains, exact match with regular expression* | Fires when a visitor loads a page matching the URL rule (Convert snippet must be on that page) |
| **Revenue Goal** | Goal name + revenue page URL (same 4 matching options); choose Manual Revenue Tracking or an e-commerce integration | Fires on the confirmation page match or via `pushRevenue` (see §3) |
| **Click on a Link** | Goal name + full link URL to track; scope: entire site or specific page | Fires when a visitor clicks a link pointing to that URL |
| **Submit a Form** | Goal name + "Submit Form To" URL (taken from the form's `action` attribute); site-wide or specific pages | Fires on submission of a form whose action matches |
| **Clicks Something on a Page** | Element selector picked visually in the browser; "Track only on used experiences" checkbox (when enabled, page URL rules are disabled) | Fires on click of the matched element |
| **Scroll Percentage Goal** | Choose threshold: 25%, 50%, 75%, or more of page read | Fires when visitor scrolls past the threshold |
| **JavaScript Triggered Goal** | Name only; Convert generates a snippet with the goal ID | Fires only when your JS pushes `triggerConversion` (see §2) |

**Default system goals** (exist in every project): "Decrease Bounce Rate" and "Increase Engagement".
- *Decrease Bounce Rate*: a non-bounce = visitor navigates to more than one page OR spends at least 10 seconds in the session.
- *Increase Engagement*: met when a visitor clicks any hyperlink on the test pages.
- Source: https://support.convert.com/hc/en-us/articles/205160365-what-is-increase-engagement-and-decrease-bouncerate-

**Advanced Goals**: evaluate conditions (e.g., another goal previously converted + visitor-data conditions) joined by AND/OR logical operators. Source: https://support.convert.com/hc/en-us/articles/360021916532-advanced-goals

**Limits/caveats** (source: goals article above):
- Max 50 goals per experience (plan-dependent).
- Unused goals stop tracking after 15 days by default.
- In-use goals can't be archived until unlinked from experiences.
- Goal status "Tracking" = the goal registered a conversion in the last 48 hours ("Not tracking" otherwise). Source: https://support.convert.com/hc/en-us/articles/204506789-Your-Goals-Are-Not-Working

Related recipes:
- Click goal on element not in DOM at page load: https://support.convert.com/hc/en-us/articles/115000044591-triggering-a-click-goal-on-an-element-that-its-not-part-of-the-dom-when-the-page-loads
- Conversions on hover: https://support.convert.com/hc/en-us/articles/360049978231-record-conversions-when-element-is-hovered
- Custom Prebuilt Goals: https://support.convert.com/hc/en-us/articles/114093992211-Custom-Prebuilt-Goals

---

## 2. Firing Goals from JavaScript

### 2.1 `triggerConversion` (array syntax — current, primary)

Source: https://support.convert.com/hc/en-us/articles/204494109-goals

```javascript
var _conv_q = _conv_q || [];
_conv_q.push(["triggerConversion","10007732","1000123"]);
```

- Arg 1: `"triggerConversion"`
- Arg 2: goal ID (string)
- Arg 3 (optional): experiment/experience ID — restricts the conversion to that experience.

Defensive form used in Convert's own docs (source: https://support.convert.com/hc/en-us/articles/360043919492-tracking-form-submission-using-a-javascript-triggered-goal):

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

**Firing conditions** (same source): the conversion is recorded **only for visitors bucketed into the experience** the goal is attached to. A goal must be attached/added to an experience for its conversions to appear in that experience's report. Code placement: "Global Project JS" in Project Configuration (or variation JS / site codebase).

**Default counting**: "Convert Experiences goals only track the first conversion of a visitor bucketed on an experiment" — one unique conversion per visitor per goal. To count every trigger you must use the revenue-script workaround (§3.2). Source: https://support.convert.com/hc/en-us/articles/360022117651-tracking-multiple-conversions-with-convert

### 2.2 Object-style `_conv_q` pushes (lifecycle listeners)

Source: https://support.convert.com/hc/en-us/articles/360056121112-Experiment-Life-cycle-Events-Executing-Code-after-an-variation-has-been-decided-experiment-executed-or-goal-triggered

Convert supports pushing **objects** with `what`/`params` for event listeners (note: goals are still *triggered* via the array syntax; the object form documented is `addListener`):

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

Documented event names and handler payloads:

| Event | Payload data |
|---|---|
| `experience.variation_decided` | `{experience_id, variation_id, experience_name, variation_name}` — variation returned for execution |
| `experience.activated` | same + `activated_first_time` (boolean) — after changes executed |
| `goal.triggered` | `{experience_id, variation_id, goal_id, experience_name, variation_name}` |
| `snippet.experiences_evaluated` | `{}` |
| `snippet.goals_evaluated` | `{}` |
| `cookies.saved` | `{}` |
| `location.triggered` | `{experience_id, location_id, location_name}` |

Example — relay a Convert goal into the dataLayer:

```javascript
function sendGoal(event){
  if (event.goal_id == '3333'){
    dataLayer.push({'event':'name_of_event','conversionValue':25});
  }
}
_conv_q = window._conv_q || [];
_conv_q.push({
  what: 'addListener',
  params: { event: 'goal.triggered', handler: (event) => sendGoal(event) }
})
```

Caveat: Data Anonymization must be disabled in Project Configuration to receive experience/variation *names*.

### 2.3 Other `_conv_q` commands

- **Function push** (run code once the Convert lib is loaded) — source: https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems

```javascript
_conv_q = _conv_q || [];
_conv_q.push([function(){
  if (convert.currentData && convert.currentData.experiences) {
    for (const expId in convert.currentData.experiences) {
      const exp = convert.currentData.experiences[expId];
      // send expId, exp.variation.id, exp.variation.name to a third party
    }
  }
}]);
```

- **Manual experiment activation**: `window._conv_q.push(["executeExperiment",""])` (also an object format with `experienceId` and `triggerIntegrations` params). Source: https://support.convert.com/hc/en-us/articles/208831326-manually-activate-experiment
- **SPA goal re-polling**: `_conv_q.push(['recheck_goals'])`. Source: https://support.convert.com/hc/en-us/articles/205152755-Running-Experiments-on-an-AngularJS-Page
- **Re-run evaluation**: `window._conv_q.push(["run","true"])`. Source: https://support.convert.com/hc/en-us/articles/205159975-running-experiments-on-single-page-apps. Note: Convert states the latest snippet has built-in SPA support making many manual methods unnecessary.

### 2.4 dataLayer-driven goal firing (Convert-documented pattern)

Source: https://support.convert.com/hc/en-us/articles/25756525634957-how-to-dynamically-trigger-conversions-based-on-datalayer-events — wraps `dataLayer.push` and fires `triggerConversion` when a named event appears (goes in Global Project JS):

```javascript
(function() {
    const dataLayerPollInterval = setInterval(() => {
        if (typeof window.dataLayer !== 'undefined') {
            clearInterval(dataLayerPollInterval);
            startMonitoringDataLayer();
        }
    }, 100);

    function startMonitoringDataLayer() {
        const originalPush = window.dataLayer.push;
        window.dataLayer.push = function(...args) {
            const result = originalPush.apply(this, args);
            checkDataLayerCondition();
            return result;
        };
    }

    function checkDataLayerCondition() {
        if (window.dataLayer.some(item => item.event === 'specificEventName')) {
            triggerConversion();
        }
    }

    function triggerConversion() {
        window.conv_q = window.conv_q || [];
        window.conv_q.push(["triggerConversion", "12345678"]);
        console.log('Conversion triggered.');
    }
})();
```

(Note: that article's snippet writes `window.conv_q` without the underscore; every other Convert doc uses `window._conv_q`. Treat `_conv_q` as canonical.)

Also: creating a Convert goal from a GTM dataLayer event: https://support.convert.com/hc/en-us/articles/360020350011-creating-a-convert-goal-from-a-gtm-data-layer-event

---

## 3. Revenue Tracking

### 3.1 Manual `pushRevenue`

Source: https://support.convert.com/hc/en-us/articles/204495499-add-revenue-tracking-to-your-site

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["pushRevenue",revenue,products_cnt,goal_id]);
```

- `revenue`: numeric, dot as decimal separator (e.g. `123.45`)
- `products_cnt`: integer item count
- `goal_id`: the Revenue goal's ID
- Setup: create Revenue goal → choose **Manual Revenue Tracking** → paste generated script on the confirmation page **after** the main Convert tracking code.
- By default only **one transaction per visitor/experiment/goal** is recorded.
- Cross-domain checkout: Convert code must be on both domains + cross-domain linking enabled in Project Configuration.
- If the Convert snippet is right after `</title>` and you use standard Google Analytics e-commerce tracking, Convert "will automatically connect e-commerce revenue tracking" with no extra install.

### 3.2 `force_multiple` (cumulative / repeat orders, and every-trigger goal counting)

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["pushRevenue",revenue,products_cnt,goal_id,"force_multiple"]);
```

Sources: https://support.convert.com/hc/en-us/articles/204495499-add-revenue-tracking-to-your-site and https://support.convert.com/hc/en-us/articles/114094839471-creating-a-revenue-goal-that-can-show-cumulative-revenue-not-just-first-time

To count *every* conversion of an ordinary action (not just first per visitor), Convert's documented workaround is pushing revenue of 1 per event and reading Revenue / Revenue-per-Visitor instead of Conversions / Conversion Rate:

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["pushRevenue","1","1","123456789","force_multiple"]);
```

Source: https://support.convert.com/hc/en-us/articles/360022117651-tracking-multiple-conversions-with-convert

### 3.3 Server-side / offline conversions (REST tracking)

Source: https://support.convert.com/hc/en-us/articles/360042473452-new-tracking-structure-advanced-integrations

Endpoint: `https://[PROJECT_ID].metrics.convertexperiments.com/track` — HTTP POST (JSON body) or GET (query params). **A User-Agent header is required** ("Otherwise, you will get a 301 HTTP error").

```json
{
  "cid": "account_id",
  "pid": "project_id",
  "seg": {
    "browser": "CH",
    "devices": ["DESK"],
    "source": "direct",
    "campaign": "campaign_name",
    "new": 1,
    "ctry": "RO",
    "cust": ["123", "456"]
  },
  "vid": "session_id",
  "tid": "transaction_id",
  "ev": [
    { "evt": "viewExp", "vars": ["var_id"], "exps": ["exp_id"] },
    { "evt": "hitGoal", "goals": [12345], "vars": ["var_id"], "exps": ["exp_id"] },
    { "evt": "tr", "goals": [12345], "vars": ["var_id"], "exps": ["exp_id"], "r": 123.23, "prc": 2 }
  ]
}
```

Event types: `viewExp` (variation exposure/bucketing), `hitGoal` (goal conversion), `tr` (transaction with `r` = revenue, `prc` = product count). `vid` is the visitor/session ID (must match the browser-side visitor to attribute correctly); `tid` is a deduplication/transaction id.

Legacy GET structure: `[project_id].track.convertexperiments.com/track/` with customer/project/experiment/variation/goal ID params. Source: https://support.convert.com/hc/en-us/articles/205160045-Legacy-Tracking-Request-Structure-Advanced-Integrations (marked Legacy by Convert). CRM/backend pattern overview: https://support.convert.com/hc/en-us/articles/how-do-i-integrate-crm-or-backend-system-conversions-with-convert

SDK-key variant (fullstack): `POST https://metrics.convertexperiments.com/v1/track/{sdk_key}` — see §7.

### 3.4 E-commerce integrations

Direct integrations named by Convert: **Shopify, WooCommerce, Magento, PrestaShop, BigCommerce** (source: revenue article above).

**Shopify** (hub: https://support.convert.com/hc/en-us/articles/16922335756813-shopify-users-start-here):
- Convert Shopify app: https://support.convert.com/hc/en-us/articles/integrate-with-shopify-through-our-custom-convert-app; manual snippet: https://support.convert.com/hc/en-us/articles/204506429-integrating-convert-experiences-with-shopify
- **Webhook revenue tracking** (https://support.convert.com/hc/en-us/articles/360054379512-add-revenue-tracking-to-shopify-via-webhook): an `orders/create` webhook tracks every order — visitor need not land on the confirmation page; compatible with upsell/subscription plugins that create orders via Shopify API. Limitations: does **not** track dynamic checkout buttons (Buy Now, Amazon Pay, PayPal); Shopify silently removes unused webhooks after a period, so verify the webhook still exists before debugging conversions. A secret is issued to validate integrity.
- **Newer tracking method** (https://convert.zendesk.com/hc/en-us/articles/4415240400013-Add-Revenue-Tracking-to-Shopify-via-our-new-Tracking-Method): solves the dynamic-checkout-buttons gap of the webhook method.
- Convert does not run on Shopify checkout pages: https://support.convert.com/hc/en-us/articles/360058721511-convert-does-not-work-on-shopify-checkout-pages

**WooCommerce** (https://support.convert.com/hc/en-us/articles/360000107672-integrate-convert-experiences-with-woocommerce): install the WooCommerce Conversion Tracking plugin, create a Revenue goal with Manual Revenue Tracking, paste the generated script into the plugin's settings with `revenue` replaced by the plugin variable `{order_total}`.

**Magento 2** (https://support.convert.com/hc/en-us/articles/360015575392-integrate-convert-experiences-with-magento-2): paste the Convert snippet via admin → Stores > Configuration > Design > HTML Head > Miscellaneous Scripts; revenue via manual revenue goals on order-confirmation pages.

---

## 4. GA4 Integration

Primary source: https://support.convert.com/hc/en-us/articles/15577127776141-integrate-convert-experiences-with-google-analytics-4 (also https://www.convert.com/blog/a-b-testing/official-convert-ga4-integration/ and https://www.convert.com/integrations/official-ga4-integration/)

### 4.1 Native integration
- **Event sent to GA4**: `experience_impression`
- **Key event parameter**: `exp_variant_string` with format `CONV-[experience_id]-[variation_id]` (e.g. `CONV-100018331-100099919`)
- Enable at **Project Configuration > Integrations** → Google Analytics → GA4 → Google OAuth (Convert auto-populates property + measurement ID); can also be enabled per experience.
- **Custom dimension setup in GA4**: create a custom dimension on event parameter `exp_variant_string` (event-scoped) so it's usable in reports/explorations.
- **GA4 audiences**: "Create GA4 Audiences" button on the experience summary auto-creates per-variation audiences. Experience names >255 chars fail audience creation.
- **Revenue from GA4**: enable in Project Configuration and import GA4's `purchase` event as a Convert goal.
- **"Track first visitor exposure only"** option: sends `experience_impression` only on first exposure to reduce duplicates.
- Caveats: third-party cookies must be enabled; a documented issue inflates revenue when the Google Ads integration is also active.

### 4.2 What Convert pushes to the GTM dataLayer
Source: https://support.convert.com/hc/en-us/articles/204506509-use-gtm-data-layer-to-integrate-convert-with-ga

On experiment fire, Convert pushes 4 keys into the default `dataLayer`:

```javascript
dataLayer.push({
  "event":"convert-trigger-experiment-1234",
  "experiment_id":"1234",
  "variation_name":"test variation",
  "gadimension":"1"
});
```

(`gadimension` only populated when the GA integration is enabled.)

### 4.3 Manual GA4 integration via GTM (when native integration is not used)
Same source. Recipe:
1. GTM **Data Layer Variables** for `experiment_id`, `variation_name`, `gadimension`.
2. **Custom Event trigger** with event name `convert-trigger-experiment-` (matches any experiment ID — use "contains"/starts-with matching).
3. **GA4 Event tag** sending those variables as event parameters (e.g. build your own `exp_variant_string`), registered as a GA4 custom dimension.
4. **Do not** run the native GA4 integration and the GTM dataLayer method into the same GA4 property — duplicate events.

Other manual patterns: reading `convert.currentData.experiences` and sending id/variation to any tool (§2.3 code); "Send variations as GA events" https://support.convert.com/hc/en-us/articles/360016127931-send-variations-as-ga-events-to-use-advanced-segments-audiences; GTM+GA4→BigQuery pipeline https://support.convert.com/hc/en-us/articles/leveraging-converts-gtm-ga4-integration-to-send-ab-testing-data-to-google-cloud-platform

---

## 5. Other Integrations (brief)

- **GTM**: dataLayer pushes as in §4.2; also Convert-goal-from-dataLayer-event (https://support.convert.com/hc/en-us/articles/360020350011) and revenue via GTM (https://support.convert.com/hc/en-us/articles/115000009031-how-to-track-revenue-using-gtm).
- **Mixpanel** (https://support.convert.com/hc/en-us/articles/205160215-Integrate-Convert-Experiments-with-Mixpanel): sends test + variation names as Mixpanel properties so Mixpanel reports can be filtered by Experiment–Variation pair.
- **Hotjar** (https://support.convert.com/hc/en-us/articles/206479336): tags Hotjar recordings with experiment data; per-variation heatmaps/surveys via https://support.convert.com/hc/en-us/articles/114094172732.
- **Microsoft Clarity** (https://support.convert.com/hc/en-us/articles/360020658792-integrate-convert-experiences-with-microsoft-clarity): session replays/heatmaps per A/B, MVT, multipage, personalization; a **Clarity toggle at the experience level** in the Convert app handles the integration automatically.
- **Segment** (https://support.convert.com/hc/en-us/articles/115002997492-integrate-convert-experiences-with-segment): requires analytics.js + Convert snippet on page; enable "Segment.Io" under experience-level Integrations; Convert emits **semantic track events** carrying experiment name + variation name for bucketed visitors; verify in Segment Schema.
- Custom integrations guide (generic pattern for any tool): https://support.convert.com/hc/en-us/articles/complete-guide-creating-integrations-with-convertcom

---

## 6. Reporting / Statistics

Source: https://support.convert.com/hc/en-us/articles/10157554451085-statistical-methods-used

- **Both Frequentist and Bayesian** engines are offered; settings live at **project and experience level** (experience overrides project).
- **Frequentist**: t-tests for all new experiences since **Oct 13, 2023** (z-tests before that). Default is **two-tailed**; one-tailed selectable "if your experiment prioritizes speed over rigor".
- **Confidence levels**: 95% typical default; 99% recommended for critical tests.
- **Multiple comparison corrections**: Bonferroni, **Šidák** (recommended for mission-critical), or None.
- **Sequential testing**: "Asymptotic Confidence Sequences" (Waudby-Smith et al. 2023) for always-valid continuous monitoring; default tuning parameter 5,000 visitors minimum.
- **Power/MDE**: Dynamic mode (default) — after 5,000 visitors/variation incubation, projects MDE week-by-week up to 12 weeks and locks MDE at the first week where detectable effect ≤ observed lift; or Fixed mode (manual MDE, fixed-horizon).
- **Bayesian**: reports probability-to-win; thresholds 95% default, 99% or 90% selectable; uninformative priors (50% initial win probability).
- **SRM**: the Experiment Report shows a built-in warning — "Potential Sample Ratio Mismatch detected on your test and you need to contact support@convert.com or check the experience setup." Source: https://support.convert.com/hc/en-us/articles/204490289-experiment-report. Background/blog: https://www.convert.com/blog/a-b-testing/sample-ratio-mismatch-srm-guide/; public calculator with SRM check: https://www.convert.com/calculator/
- Report metrics glossary: https://support.convert.com/hc/en-us/articles/understanding-report-metrics-in-convert. Convert also mentions a "Revenue Outlier Detection System" for filtering odd transactions (https://www.convert.com/e-commerce/).

---

## 7. APIs

Overview article: https://support.convert.com/hc/en-us/articles/convert-api-documentation-overview (mirror: https://convert.elevio.help/en/articles/86048-convert-api-documentation-overview)

### 7.1 Experience Serving API (fullstack)
Docs: https://api.convert.com/doc/serving/ (developer portal: https://docs.developers.convert.com/)
- Auth: **SDK Key**; plus a **Debug Token** via `convert-debug-token` header for serving draft/paused experiences.
- **Project config endpoint** (consumed by the fullstack SDKs): `https://cdn-4.convertexperiments.com/api/v1/config/{account_id}/{project_id}`
- **Tracking endpoint (SDK-key)**: `POST https://metrics.convertexperiments.com/v1/track/{sdk_key}` — JSON payload with account ID, project ID, an `enrichData` flag, and visitor data (segments, visitor ID, events); used for events/goals/visitor actions from SPAs or server-side. (Full request schema beyond this: **UNVERIFIED** — the api.convert.com page could not be fully retrieved; consult the live doc.)
- Per-account variant `POST https://metrics.convertexperiments.com/v1/track/{account_id}/{project_id}`: surfaced in search results — **UNVERIFIED** against the primary doc page.
- JS SDK: https://convertcom.github.io/javascript-sdk/ and npm `@convertcom/tracking-types`; SPA support doc: https://docs.developers.convert.com/v1.0-web/docs/spa-support

### 7.2 REST API v2 (admin)
Docs: https://api.convert.com/doc/v2 — full lifecycle management. Auth: API Key (token) or cookie session. Resource groups: Accounts/Users/Collaborators/API Keys; Projects/SDK Keys; Experiences, Variations, Sections, Version Changes, **Experiences Reports** (report data via API); Goals, Hypotheses; Locations, Audiences, Domains, CDN Images, Tags, Features, Visitor Insights.

### 7.3 Metrics/track (client-style, no SDK key)
`https://[PROJECT_ID].metrics.convertexperiments.com/track` with the `cid/pid/vid/ev` JSON body (full shape in §3.3). Source: https://support.convert.com/hc/en-us/articles/360042473452-new-tracking-structure-advanced-integrations

---

## 8. Debugging & Verification

### 8.1 Enabling debug logging
- **Chrome extension**: "Convert Experiences Tools Extension" — toolbar toggle ON → console shows detailed experiment activity. Console must be on **Verbose** or Convert log entries won't show. Extension also bypasses the ~5-min CDN delay by downloading experiment snippets directly from Convert servers. Source: https://support.convert.com/hc/en-us/articles/204506699-Chrome-Debugger-Extension-For-Convert-Experiences
- **Any browser / mobile**: set cookie **`_conv_debug = 1` on domain `.convertexperiments.com`** to get the same console output without the extension. Source: https://support.convert.com/hc/en-us/articles/360013461271-debugging-experiments-on-mobile-devices
- A `log=1` URL parameter: **UNVERIFIED** — not found in current documentation; the documented mechanisms are the extension and the `_conv_debug` cookie.

### 8.2 QA / preview URL parameters
- Preview (draft, no report impact): `?convert_action=convert_vpreview&convert_e=<experiment_id>&convert_v=<variation_id>` — sources: https://support.convert.com/hc/en-us/articles/206481485-pre-viewing-your-variations-in-any-url, https://support.convert.com/hc/en-us/articles/204506649-How-Do-I-Preview-Variations-
- Force variation (counted in reports): `?convert_action=force&convert_exp=12345&convert_var=1` — source: https://support.convert.com/hc/en-us/articles/204506629-how-do-i-force-a-specific-variation-for-an-experiment-based-on-query-strings-
- Live preview on an active experiment without polluting reports: `?convert_preview=live&convert_exp=12345&convert_var=1` (persists until changed) — source: https://support.convert.com/hc/en-us/articles/27929756416269-viewing-experiment-changes-without-affecting-reports
- QA-guide force format: `?_conv_eforce=<experienceId>.<variationId>` (e.g. `_conv_eforce=1001173467.100121503`) plus a QA audience keyed on e.g. `utm_medium=qa` — source: https://support.convert.com/hc/en-us/articles/360004647132-qa-guide
- QA Overlay Widget (shows assigned experiment/variant and activated goals/experiments; loads on `_convertqa` URL param or cookie): https://support.convert.com/hc/en-us/articles/qa-overlay-widget-user-guide
- Fullstack QA & preview: https://docs.developers.convert.com/docs/qa-and-preview

### 8.3 Verifying a conversion fired
- **Network**: watch for requests to `*.metrics.convertexperiments.com/track` (POST JSON; event `hitGoal` for conversions, `tr` for revenue, `viewExp` for bucketing — §3.3 shapes). Legacy pixel host: `[project_id].track.convertexperiments.com/track/`. Sources: https://support.convert.com/hc/en-us/articles/360042473452, https://support.convert.com/hc/en-us/articles/205160045
- **Console**: with debugger on (Verbose), logs show experiments triggered, variation IDs, and goal evaluation. Source: 204506699 (above).
- **App-side**: goal status flips to "Tracking" once a conversion registered in the last 48h; check the experience report for visitor/conversion increments. Sources: https://support.convert.com/hc/en-us/articles/204506789-Your-Goals-Are-Not-Working, https://support.convert.com/hc/en-us/articles/360004647132-qa-guide
- **Common failure causes** (204506789 + https://support.convert.com/hc/en-us/articles/205160495): snippet missing on the goal page (search page source for "convert"; beware caching plugins); goal URL domain not in the project's tracked domain; click goal lost because the page redirected before the tracking request completed (use a URL or JS goal instead); another script intercepting/stopping event propagation.

### 8.4 Runtime state objects (the "processed `_conv_q`" picture)
Source: https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems

`window._conv_q` is a command queue (array of arrays/objects/functions) consumed by the snippet; inspect results via the global `convert` object:

```javascript
// convert.currentData — this page load
{
  "experiences": {
    "[Experience ID]": {
      "firstTime": false,
      "variation": {
        "id": "variation ID", "name": "variation name", "key": "id-name",
        "status": "running", "traffic_allocation": 50, "changes": []
      }
    }
  },
  "goals": { "[Goal ID]": 1 },
  "experiencesGoals": {}
}

// convert.historicalData — prior sessions
{
  "experiences": {
    "[Experience ID]": {
      "variationId": 0, "variationName": "", "variation_id": 0, "variation_name": "",
      "goals": { "[Goal ID]": 1 }
    }
  }
}
```

Quick console check: `convert.currentData.experiments` "to see if there are any experiments firing on the present page" (Convert's docs use both `experiences` and `experiments` naming across articles; `convert.currentData.experiences` is the shape documented in 204506359). Disabling experiments per page: https://support.convert.com/hc/en-us/articles/24058759093133

---

### Key sources index
Goals: 204494109, 360021916532, 205160365, 360043919492, 360022117651, 114094839471 · Revenue: 204495499, 360042473452, 205160045, 360054379512, 4415240400013 (zendesk), 360000107672, 360015575392, 16922335756813 · GA4/GTM: 15577127776141, 204506509, 360020350011, 115000009031 · Lifecycle/JS API: 360056121112, 204506359, 208831326, 205159975, 205152755, 25756525634957 · Integrations: 205160215 (Mixpanel), 206479336 (Hotjar), 360020658792 (Clarity), 115002997492 (Segment) · Stats: 10157554451085, 204490289 · APIs: api.convert.com/doc/serving/, api.convert.com/doc/v2, docs.developers.convert.com · Debugging: 204506699, 360013461271, 206481485, 204506629, 27929756416269, 360004647132, 204506789, 205160495 (all `https://support.convert.com/hc/en-us/articles/<id>`).

**UNVERIFIED items**: `log=1` debug URL param (not found); full serving-API request/response schema beyond endpoints listed (doc page truncated); `/v1/track/{account_id}/{project_id}` variant (secondary source only). Everything else above traces to the cited Convert pages.
