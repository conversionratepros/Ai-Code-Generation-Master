# Convert.com Client-Side JavaScript API — Technical Reference

Compiled 2026-08-12 from support.convert.com, docs.developers.convert.com (official developer docs), and the official `@convertcom/tracking-types` npm package (v1.6.1, Convert Insights, Inc.). Anything not verifiable against these sources is marked **UNVERIFIED**.

---

## 1. The Tracking Snippet & Script Loading

### 1.1 Script URL format

```
https://cdn-4.convertexperiments.com/v1/js/[account_id]-[project_id].js
```

- The one JS file contains the tracking engine **plus the project's full experiment configuration** ("the tracking file is dynamic and changes each time something is modified within the Convert account" — which is also why **SRI/subresource-integrity is not supported**).
- ~50 kB compressed baseline; grows with active experiences/audiences/locations/goals.
- Sources: [How to Install the Main Tag](https://support.convert.com/hc/en-us/articles/205151015-How-to-Install-the-Main-Tag-Convert-Tracking-Code-JavaScript-), [Tracking Script Overview](https://docs.developers.convert.com/v1.0-web/docs/overview.md)

### 1.2 Placement (blocking install — the default recommendation)

Install in `<head>`, ideally **right after the `</title>` tag**, loaded synchronously. Footer placement delays variation rendering and causes a "visual blink of the original page before the variation is seen."
Source: [Main Tag install](https://support.convert.com/hc/en-us/articles/205151015-How-to-Install-the-Main-Tag-Convert-Tracking-Code-JavaScript-)

### 1.3 Async install with anti-flicker (official recipe)

Convert publishes an async snippet that: (1) injects a `<style id="convert-hide-body">` stylesheet hiding `<body>` (`overflow:hidden` + opaque pseudo-element at `z-index: 2147483647`), (2) loads `//cdn-4.convertexperiments.com/v1/js/[account_id]-[project_id].js` with `async`, (3) removes the overlay on script `load`/`error`, or after a **2500 ms** timeout fallback. Placeholders to replace: `[account_id]`, `[project_id]`, `[env]` (empty string if unused). Do **not** combine with a separate anti-flicker snippet — the async snippet already includes that logic.
Framework wrappers: `@convertcom/tracking-react` (needs `"use client"` in Next.js) and `@convertcom/tracking-vue`.
Source: [Anti-Flicker Async Loading recipe](https://docs.developers.convert.com/v1.0-web/recipes/anti-flicker-async-loading.md)

Related anti-flicker controls:
- `window._conv_prevent_bodyhide = true` (set **before** the script loads) — suppress the body-hide overlay entirely.
- `?convert_dom_timeout=3000` — adjust anti-flicker timeout (default 2500 ms).
- `_conv_q.push({what:'showBody'})` or `convert.showBody()` — force-remove the overlay.
Source: [Debugging & Preview Mode](https://docs.developers.convert.com/v1.0-web/docs/debugging.md), [window.convert object](https://docs.developers.convert.com/v1.0-web/docs/window-convert-object.md)

### 1.4 Disabling the script

- URL param: `?convert_disable=true` (script entirely), `?_conv_prevent_tracking=true` (tracking events only).
- JS: `convert.disable()` (method exists in official typings). The install article also shows a queue-based disable command (rendered there as `window.convq.push({ what: 'disable' })` — the exact queue command name is **UNVERIFIED**; `disable` is not in the typed command union, prefer `convert.disable()`).
Sources: [Main Tag install](https://support.convert.com/hc/en-us/articles/205151015-How-to-Install-the-Main-Tag-Convert-Tracking-Code-JavaScript-), [Debugging](https://docs.developers.convert.com/v1.0-web/docs/debugging.md), `window.d.ts` in [@convertcom/tracking-types](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/window.d.ts)

### 1.5 Execution order (per page load)

Visitor identification → default segments → custom segments → location triggers → experience evaluation/bucketing → variation application → page display (anti-flicker release) → goal listeners → integrations. Goals are "evaluated independently after experiences are processed."
Source: [How It Works](https://docs.developers.convert.com/v1.0-web/docs/how-it-works.md)

### 1.6 Public config endpoints

- **JSON config (public, no auth):** `https://cdn-3.convertexperiments.com/JSON/XXXXXX-XXXXXX.json` where `XXXXXX-XXXXXX` = `accountId-projectId` (same pair as the JS snippet URL). Structure (abbreviated keys):
  - Root: `u_id` (account/user id), `prj` (project object), `experiments`, `goals`, `segments`
  - `prj`: `id`, `name`, `utc_of`, `global_d` (`{js, css}` global project code), `domains`, `extset` (ecommerce flags, currency symbol, minimums)
  - `experiments[<id>]`: `n` (name), `id`, `s` (status), `tp` (type), `global_d` (experience-level JS), `vars` (variations keyed by variation id), `vars_sort` (ordered variation-id array), `t_r_a` / `t_r_f` / `t_seg` (targeting rule arrays)
  - `vars[<vid>]`: `p` (traffic %), `name`, `active`, `content` (`{js, html}` arrays of changes), `chng`, `secs`
  - `goals[<gid>]`: `tp` (goal type), `add` (targeting conditions), `vpoints`, `sts`, `isbounce`
  - Source: [Retrieving Experiment Configuration Data Programmatically](https://support.convert.com/hc/en-us/articles/360013456431-retrieving-experiment-configuration-data-programmatically)
- **Tracking/metrics endpoint:** `POST https://metrics.convertexperiments.com/v1/track/{account_id}/{project_id}` (also `/v1/track/{sdk_key}`), `Content-Type: application/json`.
  Source: [Complete Guide: Creating Custom Integrations](https://support.convert.com/hc/en-us/articles/complete-guide-creating-integrations-with-convertcom)

---

## 2. The `window.convert` Object

Primary sources: [The window.convert Object](https://docs.developers.convert.com/v1.0-web/docs/window-convert-object.md) (official docs) and the `Convert` type in [@convertcom/tracking-types window.d.ts](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/window.d.ts) (official typings — full member list below is verbatim from that file).

### 2.1 Data properties

| Property | Type / shape | Meaning |
|---|---|---|
| `convert.data` | `ConfigResponseData` | Full project configuration served with the script (experiences, goals, audiences, locations, segments, project settings). Runtime extras: `convert.data.device` = `{mobile, tablet, desktop}` booleans; `convert.data.geo` = `{country, city, state, continent, zipCode}`. |
| `convert.currentData` | `CacheData` | What triggered **on the current page load**. |
| `convert.historicalData` | `HistoricalData` | Everything the visitor was ever bucketed into (all sessions). |
| `convert.version` | `string` | Script version. |
| `convert.isRedirect` | `boolean` | Split-URL redirect state. |
| `convert.activeLocations` | `Promise<Array<{id, name}>>` | Currently active location triggers. |

**Note:** `convert.data.site_id` — **UNVERIFIED / not documented**. Account & project IDs live in the config (JSON root `u_id`, `prj.id`) and in `ConvertData.debugData` = `{accountId, projectId}` per typings.

### 2.2 `convert.currentData` exact shape (current script)

From the official `CacheData` type + [Reading Triggered Experiment Data](https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems):

```javascript
{
  experiences: {                    // keyed by experience ID
    "100127238": {
      firstTime: false,             // first trigger for this visitor?
      variation: {                  // nested variation object
        id: "1001186426",
        name: "Original",
        key: "1001186426-original",
        status: "running",
        traffic_allocation: 50,
        changes: [ { name: "Original" } ]   // change objects (visual/code)
      }
    }
  },
  experiencesGoals: {               // { [experienceId]: { [goalId]: number } }
  },
  goals: {                          // { [goalId]: number } — triggered this load
  }
}
```

Canonical access paths: `convert.currentData.experiences[expId].variation.id`, `.variation.name`, `.firstTime`.

**Legacy script shape (older accounts):** top-level key was `experiments` (not `experiences`), variation data was flattened — `convert.currentData.experiments[expId].variation_id` / `.variation_name` / `.first_time` / `.variationId` / `.variation_name_parts.changes`. Migration mapping: `experiments`→`experiences`, `first_time`→`firstTime`, `variation_id`→`variation.id`, `variation_name`→`variation.name`.
Sources: [Reading Triggered Experiment Data](https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems), [React: Serving different modules based on Variation](https://support.convert.com/hc/en-us/articles/360020868732-React-Serving-different-modules-based-on-Variation)

Safe access pattern (script loads async — read from inside the queue):

```javascript
_conv_q = _conv_q || [];
_conv_q.push([function(){
    if (convert.currentData && convert.currentData.experiences) {
        for (const expId in convert.currentData.experiences) {
            const experience = convert.currentData.experiences[expId];
            console.log(expId, experience.variation.name, experience.variation.id);
        }
    }
}]);
```
Source: [Reading Triggered Experiment Data](https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems)

### 2.3 `convert.historicalData` exact shape

```javascript
{
  experiences: {
    "100127238": {
      variation_name: "Original",  variationName: "Original",   // both spellings present
      variation_id: 1001186426,    variationId: 1001186426,
      goals: { "100132206": 1, "100132207": 1 }                 // goalId -> conversion count
    }
  }
}
```
Source: [Reading Triggered Experiment Data](https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems), confirmed by `HistoricalData` type in [data.d.ts](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/data.d.ts)

### 2.4 Methods (from official typings + docs)

| Method | Signature / return | Notes |
|---|---|---|
| `convert.getCookie(name)` | `string` | e.g. `convert.getCookie('_conv_v')` |
| `convert.setCookie(name, value, expire?)` | `void` | `expire` in seconds |
| `convert.getUserData()` | `{ geo: {country, city, state, continent}, system: BrowserInfo, browsing: {returning} }` | geo/system/returning-visitor info |
| `convert.getDefaultSegments()` | `VisitorSegments` | browser, devices, source, campaign, visitorType, country |
| `convert.getVisitorSegments()` | `Record<string,any>` | defaults + `customSegments: [ids]` |
| `convert.getAllVisitorData()` / `convert.getCurrentVisitorData()` | `VisitorData` | `{ visitorId, segments, bucketing: [{experienceId, variationId, firstTime, goals:[{goalId, thisRun, timestamp?}]}] }` |
| `convert.redirect(url)` / `convert.redirect({url, caseSensitive?})` | `void` | split-URL navigation |
| `convert.refresh()` / `convert.refresh({consentRequired?})` | `void` | reload current page |
| `convert.showBody()` | `void` | remove anti-flicker overlay |
| `convert.preventBodyAutoshow()` | `void` | (typings) |
| `convert.cookieUrl(url)` / `({url})` | `string` | returns URL with cross-domain cookie params appended |
| `convert.sendLog(log, from)` | `void` | custom log entries to Convert servers |
| `convert.identify(visitorId?)` | `void` | custom visitor ID (BYOID) |
| `convert.getUrlParameter(key)` | `string` | |
| `convert.getCspNonce()` | `string` | CSP support |
| `convert.ready()` | `Promise<void>` | resolves when initialized |
| `convert.disable()` / `convert.destroy()` | `void` | kill switch |
| `convert.runPreview(config)` / `convert.run({config?, resetData?})` | `void` | (typings) |
| Direct command mirrors | — | `triggerConversion`, `triggerConversions`, `pushRevenue`, `sendRevenue`, `recheckGoals`, `recheck_goals`, `assignVariation`, `triggerExperienceVariation`, `executeExperience`, `executeExperienceLooped`, `executeMissingDataExperiences`, `checkExperiences`, `doNotRunExperiences`, `checkSegments`, `checkSegmentLooped`, `placeVisitorIntoSegment`, `forceCookieSecure`, `consentRequired`, `consentGiven`, `setParameters` all also exist as methods on `window.convert` — but the documented/supported interface is pushing to `_conv_q`. |

Sources: [window-convert-object.md](https://docs.developers.convert.com/v1.0-web/docs/window-convert-object.md), [window.d.ts](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/window.d.ts), [Cross-domain forwarding](https://support.convert.com/hc/en-us/articles/204506319-forwarding-tracking-cookies-between-different-domains)

### 2.5 Bundled jQuery: `convert.$` vs `convert._$`

- `convert.$` — "exposes the unmodified version of Jquery for you to use, without the benefits of the modified version." Runs once. Use in Custom/Global JS. Typed as `$?: any` on the `Convert` object.
- `convert._$` — "a jQuery reference modified in such a way so that the variation code can be executed multiple times while the page is still loading." Convert wraps jQuery to intercept element look-ups; the variation code **re-runs every 50 ms** until targeted elements exist or DOM-ready. This is what Visual/Code-Editor variation code uses to avoid flicker. Typed as `_$?: (selector: string) => Array<Element>`.

```javascript
convert._$("a.login").text("Login here");   // re-polls until a.login exists
```

- jQuery must be enabled in the project (or present on the page) for either to work. Legacy behavior: if you configure Convert to *not* bundle jQuery and the site doesn't provide it, "the Convert Experiment WILL NOT RUN." The **current tracking script is "independent of jQuery."**
Sources: [convert._$ vs convert.$](https://support.convert.com/hc/en-us/articles/210581203-convert-vs-convert), [Do not include jQuery](https://support.convert.com/hc/en-us/articles/204701309-Do-not-include-jQuery-into-the-tracking-scripts), [Extend jQuery alongside convert._$()](https://support.convert.com/hc/en-us/articles/360016010672-how-to-extend-jquery-and-use-it-along-the-convert-library), [Main Tag install](https://support.convert.com/hc/en-us/articles/205151015-How-to-Install-the-Main-Tag-Convert-Tracking-Code-JavaScript-)

---

## 3. The `_conv_q` Queue API

Primary sources: [JavaScript API](https://docs.developers.convert.com/v1.0-web/docs/javascript-api.md) (official), [@convertcom/tracking-types api.d.ts](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/api.d.ts) (exact typed params), plus the individual support articles cited per command.

### 3.1 Initialization — the one rule

```javascript
window._conv_q = window._conv_q || [];
```

"Always use `window._conv_q = window._conv_q || []` — never assign an empty array directly" — direct `= []` destroys commands queued by other scripts. Same pattern as GTM's `dataLayer`. Commands can be pushed before or after the script loads (it processes the backlog on init).
Source: [Initialize the Convert Queue Safely](https://docs.developers.convert.com/v1.0-web/recipes/initialize-convert-queue.md)

### 3.2 Two accepted push formats

```javascript
// Modern object form
window._conv_q.push({ what: 'commandName', params: { /* ... */ } });

// Legacy array form (still supported): ["commandName", ...args]
window._conv_q.push(["triggerConversion", "12345678"]);

// Function form — runs when the script is ready:
window._conv_q.push([function () { /* convert.* is available here */ }]);
```
Typed as `ProcessQueueItem` (`{what, params}`) and `ProcessQueueItemLegacy` (`[string|fn, ...args]`). Multiple items may be pushed in one call: `_conv_q.push(cmdA, cmdB, ...)`.
Sources: [javascript-api.md](https://docs.developers.convert.com/v1.0-web/docs/javascript-api.md), [data.d.ts](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/data.d.ts), [Reading Triggered Experiment Data](https://support.convert.com/hc/en-us/articles/204506359-reading-triggered-experiment-data-for-using-it-in-third-party-systems)

### 3.3 Complete command reference (exact typed params from official typings)

| `what` | `params` | Purpose |
|---|---|---|
| `run` | `{resetData?: boolean}` (optional) | Re-run the full evaluation cycle (polling). Legacy: `["run","true"]`. |
| `ready` | — (or push a function) | Callback when script initialized. |
| `addListener` | `{event: LifeCycleEvent, handler: (event?) => void}` | Lifecycle events (see 3.4). |
| `triggerConversion` | `{goalId: string, experienceId?: string, visitorId?: string}` | Fire a goal. Legacy: `["triggerConversion","goalId","experienceId"?]`. |
| `triggerConversions` | `{goalId: Array<string>, experienceId?, visitorId?}` | Fire multiple goals. |
| `pushRevenue` | `{goalId?: string, transactionId: string, amount: number\|string, productsCount?: number, fromAutoPickRevenue?: string, forceMultiple?: boolean}` | Revenue transaction. Legacy: `["pushRevenue", revenue, products_cnt, goal_id, "force_multiple"?]`. |
| `sendRevenue` | `{goalId?, transactionId, amount, productsCount?}` | Alternative revenue command (documented in javascript-api.md; window method exists in typings). |
| `recheckGoals` | — | Re-evaluate all goal conditions. Legacy: `['recheck_goals']`. |
| `assignVariation` | `{experienceId: string, variationId: string}` | Programmatically decide the variation used at next execution. Legacy: `['assignVariation',"expId","varId"]`. |
| `triggerExperienceVariation` | `{experienceId, variationId}` | Force a variation (testing). |
| `executeExperiment` | `{experienceId: string, visitorId?: string, triggerIntegrations?: boolean, logLevel?: LogLevel}` | Manually run an experience. Legacy: `["executeExperiment","expId", false?]` (3rd arg = triggerIntegrations; pass `false` to avoid re-sending to GA on repeat fires). |
| `executeExperience` | `{experienceId, visitorId?, skipLocations?, logLevel?}` | Same engine, current name (README example shows `skipLocations`). |
| `executeExperienceLooped` | `{locationId?, experienceId?, visitorId?, triggerIntegrations?}` | Looped/deferred execution variant. |
| `executeMissingDataExperiences` | `{visitorId?, triggerIntegrations?}` | Execute experiences that waited on async data (geo/weather). |
| `checkExperiences` | `{visitorId?, triggerIntegrations?}` | Re-evaluate deferred experiences. |
| `doNotRunExperiences` | — | Disable all experience processing. |
| `disableExperience` / `enableExperience` | `{experienceId: string \| Array<string>}` | Toggle specific experiences. |
| `disableVariation` / `enableVariation` | `{experienceId, variationId}` | Toggle specific variations. |
| `triggerLocation` | `{locationId: string, triggerIntegrations?: boolean}` | Manually activate a location trigger. |
| `placeVisitorIntoSegment` | `{segmentId: string, visitorId?}` | Put visitor in a custom segment. |
| `checkSegments` | `{visitorId?}` | Re-evaluate waiting segments. |
| `checkSegmentLooped` | `{segmentId, visitorId?}` | Looped segment check. |
| `identify` | `{visitorId: 'YOUR_INTERNAL_USER_ID'}` | Bring-your-own visitor ID. |
| `consentRequired` | `{runExperiences?: boolean}` (default true) | Hold cookies/tracking until consent. |
| `consentGiven` | — | Release queued events, write cookies. |
| `setParameters` | `{data: ConvertData}` — keys include `environment`, `logLevel`, `allowCrossDomainAutoLinking`, `usePolling`, `useMutationObserver`, `useSPAOptimizations`, `useSignals`, `tracking`, `visitorId`, `throttleChanges`, `delayContinuousActivation`, `batchSize`, `releaseInterval`, `bounceGoal` | Runtime script configuration. (Official SPA doc shows the shorthand `params: {delayContinuousActivation: 100}` form.) |
| `setIntegrationVariable` | `{integration: IntegrationProvider, customVariable}` — e.g. `{integration: 'GOOGLE_TAG_MANAGER', customVariable: 'dataLayer4'}` | Integration overrides. |
| `showBody` | — | Remove anti-flicker overlay. |
| `forceCookieSecure` | `{secure: boolean}` | Force `Secure` cookie flag. |
| `refresh` | — | Reload page (split-URL original). |
| `redirect` | `{url: string}` | Navigate (split-URL variation). |
| `enablePreview` | `{enableTracking?: boolean}` | Enter preview mode programmatically. |
| `disablePreview` | — | Exit preview mode. |
| `cookieUrl` | `{url: string}` | Decorate URL with cross-domain cookie params. |

Sources: [javascript-api.md](https://docs.developers.convert.com/v1.0-web/docs/javascript-api.md); exact params from [api.d.ts + README of @convertcom/tracking-types@1.6.1](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/README.md); legacy array forms from the support articles below.

### 3.4 Lifecycle events (`addListener`)

| Event string | Payload |
|---|---|
| `snippet.initialized` | — |
| `snippet.segments_evaluated` | `{visitorId}` |
| `snippet.experiences_evaluated` | — |
| `snippet.goals_evaluated` | — |
| `experience.activated` | `{experienceId, variationId}` |
| `experience.variation_decided` | `{experienceId, variationId}` |
| `goal.triggered` | `{goalId}` |
| `location.activated` / `location.deactivated` | `{locationId}` |
| `url.changed` | `{from, to}` |
| `render.complete` | — |

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push({
  what: 'addListener',
  params: {
    event: 'snippet.experiences_evaluated',
    handler: function () { /* convert.currentData is populated here */ }
  }
});
```

Timing: "Listeners must be registered before the script processes them — either before the script loads, or from Global JavaScript."
Sources: [javascript-api.md](https://docs.developers.convert.com/v1.0-web/docs/javascript-api.md), [Custom Integrations guide](https://support.convert.com/hc/en-us/articles/complete-guide-creating-integrations-with-convertcom), TypeScript enum `LifeCycleEvent` (e.g. `LifeCycleEvent.SNIPPET_GOALS_EVALUATED`) in [tracking-types README](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/README.md)

Note: the goals/analytics reference (goals-revenue-analytics.md §2.2) records richer payloads for these events from the support-KB article (experience/variation names etc.) — both sources are official; the KB payloads require Data Anonymization disabled.

### 3.5 Canonical snippets per task

**Fire a JS-triggered goal** (goal must be an Advanced/"JavaScript Triggered" goal attached to the experience):

```javascript
window._conv_q = window._conv_q || [];
_conv_q.push(["triggerConversion", "12345678"]);          // goal ID
// optional experience scope:
_conv_q.push(["triggerConversion", "12345678", "100123456"]);
```
Sources: [JS Triggered Goal](https://support.convert.com/hc/en-us/articles/360043919492-tracking-form-submission-using-a-javascript-triggered-goal), [Goals](https://support.convert.com/hc/en-us/articles/204494109-goals)

**Revenue** (on the confirmation page, after the main tag; dot as cent divider):

```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["pushRevenue", "123.45", 3, "100134567"]);
// allow multiple transactions per visitor/experiment/goal:
window._conv_q.push(["pushRevenue", "1", "1", "123456789", "force_multiple"]);
```
Note: goals normally count **once per visitor**; `force_multiple` via pushRevenue is the only documented multi-conversion mechanism (report shifts to Revenue / Revenue-per-Visitor). If checkout is on another domain, install the project code there first and check cross-domain settings.
Sources: [Add Revenue Tracking](https://support.convert.com/hc/en-us/articles/204495499-Add-Revenue-Tracking-to-Your-Site), [Tracking multiple conversions](https://support.convert.com/hc/en-us/articles/360022117651-tracking-multiple-conversions-with-convert)

**Manual experiment activation** (pair with a JS Site-Area condition such as `window.runExperiment == 1`):

```javascript
window.runExperiment = 1;
window._conv_q = window._conv_q || [];
window._conv_q.push(["executeExperiment", "123456789"]);          // legacy
window._conv_q.push(["executeExperiment", "123456789", false]);   // don't re-fire integrations (GA)
window._conv_q.push({ what: "executeExperiment",
  params: { experienceId: "123456789", triggerIntegrations: false } });
```
Sources: [Manually activate experiment](https://support.convert.com/hc/en-us/articles/208831326-manually-activate-experiment), [GTM-fired experiment](https://support.convert.com/hc/en-us/articles/13014389314445-how-to-configure-gtm-to-fire-a-specific-experiment-from-a-gtm-event)

**Programmatic bucketing** (decide the variation, then execute — must run after the main tag; polling has usually already happened, so execute manually):

```javascript
experimentrun = 1;                                   // matches JS condition `experimentrun == 1`
window._conv_q = window._conv_q || [];
_conv_q.push(['assignVariation', "100122263", "1001175348"]);
_conv_q.push(["executeExperiment", "100122263"]);
```
Source: [Bucketing Visitors Programmatically](https://support.convert.com/hc/en-us/articles/114094164352-bucketing-visitors-into-an-experiment-programmatically)

**Re-check experiments / goals after DOM or route changes:**

```javascript
window._conv_q = _conv_q || [];
_conv_q.push({what: 'run'});          // current — re-evaluate experiment conditions
_conv_q.push(["run","true"]);         // legacy equivalent
_conv_q.push(['recheck_goals']);      // legacy — re-evaluate goal conditions
_conv_q.push({what: 'recheckGoals'}); // current name
```
Sources: [Re-check experiments programmatically](https://support.convert.com/hc/en-us/articles/10567454180237-how-to-re-check-experiments-programmatically), [Running Experiments on Single Page Apps](https://support.convert.com/hc/en-us/articles/205159975-running-experiments-on-single-page-apps)

---

## 4. Cookies & Storage

Primary sources: [Tracking Cookies Structure](https://support.convert.com/hc/en-us/articles/204495429-convert-experiences-tracking-cookies-structure) (formats & examples), [Cookies Reference](https://docs.developers.convert.com/v1.0-web/docs/cookies.md) (attributes & durations).

### 4.1 Inventory

| Cookie | Purpose | Lifetime |
|---|---|---|
| `_conv_v` | Visitor: ID, counters, segments, **experiment/variation bucketing + triggered goals** | 6 months from last update |
| `_conv_s` | Session: id/hash + pageviews | 20 min from last activity |
| `_conv_r` | Referral: source/medium/term (UTM) | 6 months (overwritten on new referrer) |
| `_conv_sptest` | Split-URL redirect hand-off (experience+variation IDs) | ~2–15 seconds; "always written regardless of consent state" (prevents redirect loops) |
| `_conv_check_cookies` | Momentary cookie-support probe | momentary |
| `_conv_t` | Debug token — QA/preview only, absent in production | — |
| `_conv_prevent_tracking` | Opt-out flag (read-only) | — |
| `_conv_d` / `_conv_g` | Shopify Web Pixel: visitor data / segments | — |

Attributes (all): first-party, `Path=/`, `SameSite=Lax`, `Secure` on HTTPS. No PII. Browser limits apply (~4096 bytes/cookie, ~20 cookies/domain).

### 4.2 `_conv_v` format — how assignment is encoded

Star-separated `key:value` pieces:

```
vi:1*sc:2*cs:1374079443*fs:1374074823*pv:4*seg:{100246.1}*exp:{10001236.{v.10008683-g.{10001841.1}}}
```

| Key | Meaning |
|---|---|
| `vi` | `1` = no custom visitor ID provided (else the custom ID) |
| `sc` | session count |
| `cs` | current session start (unix timestamp) |
| `fs` | first session start |
| `pv` | total pageviews across sessions |
| `ps` | previous session start |
| `seg:{...}` | project segment membership |
| `exp:{...}` | **experiment assignments + goals** |

The `exp` blob is JSON-like with substitutions: **dots act as colons, hyphens act as commas**. Decoded, `exp:{10001236.{v.10008683-g.{10001841.1}}}` means: experiment `10001236` → `{ "v": 10008683, "g": { "10001841": 1 } }` — i.e. `v` = assigned **variation ID**, `g` = map of triggered **goal IDs**.

### 4.3 `_conv_s` format

```
si:2*sh:1521723696383-0.5867184247347756*pv:3
```
`si` = session id (increments per session), `sh` = session hash (used when `vi:1`, server-side caching), `pv` = pageviews this session.

### 4.4 `_conv_r` format

```
s:www.google.com*m:organic*t:ab testing
```
`s` = source/domain, `m` = medium (or utm_medium), `t` = search terms (or utm_term).

### 4.5 Cross-domain forwarding (manual, legacy method)

Pass both cookies as GET/POST params **named exactly like the cookies**:

```javascript
"http://www.mysite.com/page.html?_conv_v=" + encodeURIComponent(convert.getCookie("_conv_v"))
  + "&_conv_s=" + encodeURIComponent(convert.getCookie("_conv_s"))
```

Hidden-form variant:

```javascript
convert.$(document).ready(function () {
  convert.$("<input>").attr({ name: "_conv_v", type: "hidden",
    value: convert.getCookie('_conv_v') }).appendTo("form.header-booking-form");
  convert.$("<input>").attr({ name: "_conv_s", type: "hidden",
    value: convert.getCookie('_conv_s') }).appendTo("form.header-booking-form");
});
```

The current script also exposes `convert.cookieUrl({url})` and a `ConvertData.allowCrossDomainAutoLinking` parameter for automatic linking.
Sources: [Forwarding Tracking Cookies Between Different Domains](https://support.convert.com/hc/en-us/articles/204506319-forwarding-tracking-cookies-between-different-domains), [tracking-types](https://cdn.jsdelivr.net/npm/@convertcom/tracking-types@1.6.1/src/types/data.d.ts)

### 4.6 Consent

`{what:'consentRequired', params:{runExperiences: true}}` blocks cookie writes/tracking (experiences may still render); on `{what:'consentGiven'}` queued events transmit and cookies populate. localStorage usage: **not documented** (UNVERIFIED).
Sources: [Cookies Reference](https://docs.developers.convert.com/v1.0-web/docs/cookies.md), [Convert Consent Capabilities](https://support.convert.com/hc/en-us/articles/360037946851-delay-cookie-writing-and-data-collection-until-visitor-consent-is-provided)

---

## 5. QA, Preview & Verification

### 5.1 Preview a variation on any URL (no tracking)

```
https://example.com/page.html?convert_action=convert_vpreview&convert_e={experienceId}&convert_v={variationId}
```

- Skips audience rules, disables tracking & integrations, fetches live config **including draft/paused experiences**, leaves no visitor-state trace.
- Requirement (support KB): the page URL must be included in the experiment's **Location** targeting; for multi-page targeting (`/products/*`), make sure the Experience URL points to a real matching page.
- Meant as a development aid (Visual Editor → Variation menu → Live Preview; also the eyeball icon in reports).
Sources: [Previewing Your Variations in Any URL](https://support.convert.com/hc/en-us/articles/206481485-Previewing-Your-Variations-in-Any-URL), [Debugging & Preview Mode](https://docs.developers.convert.com/v1.0-web/docs/debugging.md), [QA Guide](https://support.convert.com/hc/en-us/articles/360004647132-QA-Guide)

### 5.2 Force a variation (with tracking)

```
?_conv_eforce=EXPERIMENT_ID.VARIATION_ID
?_conv_eforce=100456.100789,100457.100790     // multiple experiences (comma-separated)
```

Rules: works on **Active** experiences only; you **must still match Site Area and Audience conditions**; sends real tracking events; start from a **fresh incognito window** (existing bucketing decisions won't be overridden); adding the parameter **twice** makes both ignored. Combine with a QA audience: `?_conv_eforce=1001173467.100121503&utm_medium=qa` (audience condition "Medium matches exactly qa").
Sources: [Force a Specific Variation via Query Strings](https://support.convert.com/hc/en-us/articles/204506629-How-Do-I-Force-a-Specific-Variation-for-an-Experiment-Based-on-Query-Strings-), [QA Guide](https://support.convert.com/hc/en-us/articles/360004647132-QA-Guide), [Debugging](https://docs.developers.convert.com/v1.0-web/docs/debugging.md)

Older param sets also documented: `?convert_action=force&convert_exp=12345&convert_var=1` (counted in reports) and `?convert_preview=live&convert_exp=12345&convert_var=1` (live preview without polluting reports) — see goals-revenue-analytics.md §8.2 for sources.

### 5.3 Debug logging & script-control URL parameters

| Param | Effect |
|---|---|
| `convert_log_level=info` | High-level console flow: experiences processed, goals evaluated, integrations fired |
| `convert_log_level=debug` | Detailed: rule evaluation, cookie ops, DOM changes applied (timestamped) |
| `convert_disable=true` | Disable script entirely |
| `_conv_prevent_tracking=true` | Disable tracking events only |
| `convert_dom_timeout=3000` | Anti-flicker timeout override (default 2500 ms) |
| `_conv_disable_spa_optimizations=true` | Turn off automatic SPA handling |
| `_conv_disable_signals` | Disable behavioral Signals |
Source: [Debugging & Preview Mode](https://docs.developers.convert.com/v1.0-web/docs/debugging.md), [window-convert-object.md](https://docs.developers.convert.com/v1.0-web/docs/window-convert-object.md)

### 5.4 Verifying an experiment is running (console)

```javascript
convert.currentData.experiences   // active experiences + variation per this load
convert.historicalData            // everything ever bucketed
convert.getVisitorSegments()      // segments
convert.getUserData()             // geo/system
convert.getCookie('_conv_v')      // raw assignment cookie (see §4.2 to decode)
```
Plus: the **Convert Chrome Debugger extension** (logs script activity to DevTools; enable in incognito) and the **QA Overlay widget** (shows assigned experiment/variant and activated goals — requires the current tracking script, not the legacy snippet). Network: watch requests to `cdn-4.convertexperiments.com` (config/script) and the metrics/track endpoint (§1.6).
Official 4-stage QA flow: 1) Preview URLs while drafting → 2) Force-variation URLs + QA audience in incognito → 3) validate report + debugger → 4) remove QA audience, reset report data, activate.
Source: [QA Guide](https://support.convert.com/hc/en-us/articles/360004647132-QA-Guide), [Debugging](https://docs.developers.convert.com/v1.0-web/docs/debugging.md)

---

## 6. SPA Support

### 6.1 Current script — automatic

Monitors `history.pushState()`, `history.replaceState()`, and `popstate`. On navigation it: fires `url.changed` → re-evaluates location triggers → activates matching experiences → **cleans up obsolete changes** → refreshes goal listeners. No polling — uses MutationObserver ("does not poll but relies on modern browser API mutation observer"); handles lazy-loading, hydration, dynamic rendering. Works with React, Vue, Angular, Svelte, Next.js, Nuxt. Opt out per-page with `?_conv_disable_spa_optimizations=true`.
Sources: [SPA Support](https://docs.developers.convert.com/v1.0-web/docs/spa-support.md), [Main Tag install](https://support.convert.com/hc/en-us/articles/205151015-How-to-Install-the-Main-Tag-Convert-Tracking-Code-JavaScript-)

**Continuous activation caveat:** Visual Editor changes get automatic duplicate-prevention; **custom VariationJS/ExperienceJS may re-execute on transitions — "you are responsible for preventing duplicates":**

```javascript
(() => {
  const id = "convert-custom-banner";
  if (document.querySelector(`#${id}`)) return;
  document.body.insertAdjacentHTML("afterbegin", `<div id="${id}">Banner</div>`);
})();
```

Tuning (Global JS):

```javascript
_conv_q.push({ what: "setParameters", params: { delayContinuousActivation: 100 } });
_conv_q.push({ what: "setParameters", params: { throttleChanges: 100 } });
```

Route-change hook:

```javascript
_conv_q.push({ what: 'addListener', params: {
  event: 'url.changed',
  handler: function (data) { console.log('Navigated from', data.from, 'to', data.to); }
}});
```
Sources: [SPA Support](https://docs.developers.convert.com/v1.0-web/docs/spa-support.md), [SPA Change Methods](https://docs.developers.convert.com/v1.0-web/docs/spa-change-methods.md), [SPA Continuous Activation recipe](https://docs.developers.convert.com/v1.0-web/recipes/spa-continuous-activation.md)

### 6.2 Legacy script — manual polling

("If you use the latest version of the Convert script, none of what is described in this article is relevant.")

```javascript
// Re-run experience-condition polling after a route change:
window._conv_q = _conv_q || [];
window._conv_q.push(["run","true"]);

// Re-check goal conditions:
window._conv_q = window._conv_q || [];
window._conv_q.push(['recheck_goals']);
```

pushState proxy pattern (fire polling 100 ms after each route change):

```javascript
const pushStateProxy = new Proxy(window.history.pushState, {
  apply: function (target, thisArg, argumentsList) {
    setTimeout(() => {
      _conv_q = window._conv_q || [];
      _conv_q.push(["run", "true"]);
    }, "100");
    return Reflect.apply(target, thisArg, argumentsList);
  }
});
window.history.pushState = pushStateProxy;
```

Also documented: 100 ms `setInterval` URL-compare loop; `hashchange`-triggered polling; Angular `$locationChangeSuccess`. Warning: on SPA navigation "changes triggered by the experiment will not be reset" (no page unload).
Sources: [Running Experiments on Single Page Apps](https://support.convert.com/hc/en-us/articles/205159975-running-experiments-on-single-page-apps), [Trigger polling on hash change](https://support.convert.com/hc/en-us/articles/360030902972-Trigger-Convert-polling-when-URL-hash-changes), [AngularJS](https://support.convert.com/hc/en-us/articles/205152755-Running-Experiments-on-an-AngularJS-Page), [SPA Troubleshooting Guide](https://support.convert.com/hc/en-us/articles/4402421565453-single-page-application-spa-troubleshooting-guide)

---

## 7. Known Legacy-vs-Current Summary

| Area | Legacy | Current |
|---|---|---|
| Queue commands | `["cmd", arg1, arg2]` arrays | `{what, params}` objects (arrays still accepted) |
| currentData key | `experiments`, flat `variation_id`/`variation_name`/`first_time` | `experiences`, nested `variation.{id,name,key,status,traffic_allocation,changes}`, `firstTime` |
| SPA | manual `["run","true"]` / `['recheck_goals']` polling | automatic pushState/popstate + MutationObserver |
| Re-check goals | `['recheck_goals']` | `{what:'recheckGoals'}` |
| jQuery | bundled (required unless self-hosted) | script independent of jQuery; `convert.$`/`convert._$` only if enabled |
| QA | force URLs only | plus QA Overlay widget + `convert_log_level` console logs |

## 8. UNVERIFIED / Not Documented

- `convert.data.site_id` — no documentation found; use config `u_id`/`prj.id` or `debugData.{accountId,projectId}` instead.
- localStorage usage by the web tracking script — not documented.
- A `disable` queue command name (`convert.disable()` and `?convert_disable=true` are the verified forms).
- The exact bundled jQuery version — not documented.
- The dataLayer-conversions article renders its queue as `window.conv_q` — treat as an article typo; the canonical global is `window._conv_q` everywhere else ([source article](https://support.convert.com/hc/en-us/articles/25756525634957-how-to-dynamically-trigger-conversions-based-on-datalayer-events)).

## 9. Primary Source Index

- Developer docs (web script): https://docs.developers.convert.com/v1.0-web/llms.txt — notably [javascript-api](https://docs.developers.convert.com/v1.0-web/docs/javascript-api.md), [window-convert-object](https://docs.developers.convert.com/v1.0-web/docs/window-convert-object.md), [cookies](https://docs.developers.convert.com/v1.0-web/docs/cookies.md), [debugging](https://docs.developers.convert.com/v1.0-web/docs/debugging.md), [spa-support](https://docs.developers.convert.com/v1.0-web/docs/spa-support.md), [overview](https://docs.developers.convert.com/v1.0-web/docs/overview.md), [anti-flicker recipe](https://docs.developers.convert.com/v1.0-web/recipes/anti-flicker-async-loading.md), [queue-init recipe](https://docs.developers.convert.com/v1.0-web/recipes/initialize-convert-queue.md)
- Official typings: `@convertcom/tracking-types@1.6.1` (npm / jsdelivr) — README, `src/types/api.d.ts`, `src/types/window.d.ts`, `src/types/data.d.ts`
- Support KB articles: individually cited inline throughout (articles 204506359, 204495429, 204506319, 204495499, 360022117651, 360043919492, 208831326, 114094164352, 10567454180237, 205159975, 206481485, 204506629, 360004647132, 205151015, 210581203, 360013456431, 13014389314445, 25756525634957)
