# Convert.com Experiment Targeting & Activation — Research Reference

Compiled 2026-08-12 from support.convert.com, docs.developers.convert.com, api.convert.com/doc, convert.com/blog, plus one live Convert project config JS (primary source) for internal enums.

---

## 1. Site Area / URL Targeting (now called "Locations")

Convert renamed "Site Area" to "Locations" — the same article ID serves both slugs (`204494069-Site-Area` and `204494069-Locations`). Older articles (QA Guide, force-variation) still say "Site Area". The Serving API still exposes a per-experience `site_area` rule object alongside reusable `locations`.
Source: https://support.convert.com/hc/en-us/articles/204494069-Locations

### Core behavior
- "Locations conditions include the pages on which the experiment will run. These conditions are tested every time a user visits your page." (unlike audiences — see §2).
- "More than one location can be added to the same experience. By default, locations are combined using an **'OR'** condition, meaning an experience will be activated if **any** of the added location conditions are met."
- To change the page edited in the Visual Editor you update the "Visual Editor URL" in the Experience Summary — the editor URL is separate from targeting.
Source: https://support.convert.com/hc/en-us/articles/204494069-Locations

### Page-matching options (Advanced menu)
- By Page URL
- By Query String
- By Tagged pages (not available at all plan levels)
- By JS Condition — e.g. `((window.location.href=="http://www.convert.com") && (user_logged_in == 0))`
- By Page URL (with Query String)

Semantics (from the query-string targeting article, https://support.convert.com/hc/en-us/articles/204506749-Targeting-Experiments-with-Query-Strings):
- **Page URL**: matches URL *ignoring* the query string — "If we want to ignore the Query String from the page address and we just want to match the rest, Page URL is the perfect option." It will match the page "followed by any Query String variables since those are not included in the match."
- **Page URL (with Query String)**: matches the complete URL including params — "will match only that page".
- **Query String**: matches only the query portion — for `http://www.domain.com/index.php?pageID=140`, "only pageID=140 will be used in the matching process".

Also: "Trigger by Page Tags" requires the Advanced Tracking code; and "You can also trigger a test programmatically."
Source: https://support.convert.com/hc/en-us/articles/114094125611-what-are-locations

### Match operators
The Operators section of the Locations article is **a screenshot image** — the full UI operator list is not available as text in the KB (UNVERIFIED as a complete UI list). Operators confirmed in KB text:
- "Matches Exactly" (QA Guide audience example; query-string article)
- "Contains" / "Does not contain" (cookie audience article 115000028552)
- Regex matching ("Do You Support Regex?" — https://support.convert.com/hc/en-us/articles/205160575-Do-You-Support-Regex-Regular-Expressions- — regex is "Perl 5.0 format")

**Primary-source verification** — a live project config (publicly served legacy tracking script) embeds the full comparison-module enum that all targeting rules reference by `compid`:

```json
"comparisons":{
  "1":{"comparison_id":"1","module_name":"equal"},
  "2":{"comparison_id":"2","module_name":"less"},
  "3":{"comparison_id":"3","module_name":"lessEqual"},
  "4":{"comparison_id":"4","module_name":"matches"},
  "5":{"comparison_id":"5","module_name":"regeMatches"},
  "6":{"comparison_id":"6","module_name":"contains"},
  "7":{"comparison_id":"7","module_name":"endsWith"},
  "8":{"comparison_id":"8","module_name":"startsWith"},
  "9":{"comparison_id":"9","module_name":"isIn"},
  "10":{"comparison_id":"10","module_name":"equal"},
  "11":{"comparison_id":"11","module_name":"commaSepStringsContains"},
  "12":{"comparison_id":"12","module_name":"contains"},
  "13":{"comparison_id":"13","module_name":"exists"},
  "14":{"comparison_id":"14","module_name":"doesNotExist"}
}
```

So the engine-level match types are: equal (exact), less / lessEqual, **matches** (the "simple match"), **regeMatches** (regex), contains, endsWith, startsWith, isIn, commaSepStringsContains, exists, doesNotExist. `matches` vs `equal` is the simple-match/exact-match split; exact wildcard semantics of "simple match" are UNVERIFIED in Convert's docs.

### Include vs exclude
There is no separate "exclude list" UI — exclusion is done with **negated operators**. In the live config every rule carries a `not` flag:

```json
"locations":{"100442065":{"r":[[[{"entid":"50","compid":"6","not":false,"data":"\/landing\/financialfreedom"}]]],"n":"Financial Freedom LP"}}
```

and a QA-exclusion audience rule: `{"entid":"13","compid":"6","not":true,"data":"qa"}` (= medium does NOT contain "qa"). Rules nest as OR > AND > OR_WHEN — the Serving API schema shows the same shape: `"rules": { "OR": [ { "AND": [ { "OR_WHEN": [ { "rule_type", "value", "matching" } ] } ] } ] }` (https://api.convert.com/doc/serving/).

Docs explicitly use exclusion in Split URL loop prevention: "set the Locations to 'Page URL matches exactly' and input 'query string contains v1=true' in the exclude section" (https://www.convert.com/blog/a-b-testing/split-url-testing-guide/), and "Ensure that your experiment's location settings exclude URLs containing the new query parameter" (https://support.convert.com/hc/en-us/articles/how-to-create-a-split-url-experiment-that-adds-a-url-query-parameter-to-the-variation).

### Dynamic location triggers (new script)
Locations on the current script have an activation trigger, four types (https://support.convert.com/hc/en-us/articles/114094125611-what-are-locations):
1. **DOM Element** — click, hover, in_view, change events (Serving API: `"trigger": { "type": "dom_element", "selector": "string", "events": ["click"] }`)
2. **Upon Run** — immediate activation (the "immediately on match" mode)
3. **Manually** via embedded code:
```javascript
window._conv_q.push({ what: 'triggerLocation', params: { locationId: '100123456' } });
```
4. **When a Callback is Called** — callback JS with this contract (https://support.convert.com/hc/en-us/articles/206631623-target-experiment-based-on-a-custom-javascript-condition-that-evaluates-true-at-a-later-stage):
```javascript
if (options.isActive) return;

window.waitFor("ELEMENT_SELECTOR").then((element) => {
  if (element) {
    activate();
  }
});
```
`options.isActive` = experience already active; `activate()` fires it. This article notes Convert is **deprecating legacy tokens `convert_recheck_experiment()` and `convert_recheck_experience()`** in favor of callback-type Dynamic Location Triggers.

### Testing your Site Area
The QA Guide's Site Area tester: "You can enter sample URLs to check whether they match the Site Area conditions — a match means the experiment will run." Source: https://support.convert.com/hc/en-us/articles/360004647132-QA-Guide

### Cross-domain
- "Convert uses only first-party cookies, even for cross-domain setups." All websites in one Project share visitor identity, "UNLESS you enable the Project Setting 'Do not allow cross-domain linking'" (Project Configuration).
- Mechanism: "automatically passing cookies between domains that belong to the same project when a visitor clicks on links or submits forms" — `_conv_v` (visitor) and `_conv_s` (session) "are added to the query string in order to pass cookies."
Source: https://support.convert.com/hc/en-us/articles/205159995-cookies-and-cross-domain-testing
- Automatic only for links/forms to domains listed under Active Domains: "Convert Experiment does this by default when it finds page links for the domains listed on the Active Domains in the Project Settings and form submissions between the domains inside the same projects." Dynamic JS-added links may bypass it. Manual patterns: see code-samples-patterns.md §5g / js-api.md §4.5.
Source: https://support.convert.com/hc/en-us/articles/204506319-forwarding-tracking-cookies-between-different-domains

---

## 2. Audiences

### The three audience types
Source: https://support.convert.com/hc/en-us/articles/115001132271-Select-Audience-Type

- **Permanent**: "This type of audience is checked only at visitor bucketing time and will not be checked again on their subsequent visits." Once bucketed, the visitor keeps seeing the experience even if conditions stop matching. Example in the article: a time-window audience (hour 12) — a visitor arriving at 12:03 who was bucketed keeps the variation an hour later.
- **Transient**: conditions "re-checked each time an experience is to be presented (versus the Permanent ones that will only be checked at visitor bucketing time)". "Visitor meets the audience, visitor sees the experience. The visitor does not meet the audience, the visitor does not see the experience. It basically makes experiences not persistent if the Audience's Conditions are not met." Re-check happens on every presentation — including opening a new tab after bucketing. If conditions later match again, the visitor gets their previously assigned variation back.
- **Segmentation (Segments)**: "Segments are a group of visitors that can be tracked separately from the rest of the visitors on an experiment." "Segments are evaluated at the Project level, so any visitor that reaches a page with the Project tracking code and who matches the Audience conditions designated as a Segment will be added to it." Visitor is tagged permanently once conditions match, even if conditions change later; reusable across experiences; "Page URL-related conditions become available" only for segments.

Execution order (https://support.convert.com/hc/en-us/articles/115002527732-how-convert-code-snippet-works-order-of-execution):
1. "When you first visit a page, the Location Conditions are checked. These conditions are using the OR operator and are tested every time you visit the page."
2. "If you match the Location Conditions then you continue with the Audience Conditions. These are only tested once for a visitor." (i.e., default/permanent audiences are one-shot at bucketing)
3. "If you match the Audience Conditions then you move to traffic distribution."

### Condition categories (Define an Advanced Audience)
Source: https://support.convert.com/hc/en-us/articles/115000021251-Define-an-Advanced-Audience

- **Content** (Segment-only): Page URL (without query), Page URL with Query, Query String
- **Traffic Sources**: UTM Campaign (`utm_campaign`), UTM Keyword (`utm_term`), UTM Medium (`utm_medium` or referrer analysis), UTM Source (`utm_source` or referral domain)
- **Visitor Data**: Average Time on Page (seconds); City / Country / Region (via Akamai CDN + MaxMind); Metro Codes (US only, MaxMind GeoLite2); Days since last visit; Pages Visited (count); Visit Duration (session; resets after 20 min inactivity); **Visitor Cookie** (name/value comparison); Visitor Type (New/Returning); Visits Count; **Bucketed in Experience** (collision avoidance)
- **Visit Time**: UTC or Project time zone
- **Systems**: Browser type, Browser Version, OS, User Agent, Device (desktop/mobile)
- **Page Tags**: custom tags via Advanced tracking code; Customer ID
- **JS Condition**: custom JavaScript; must "return true to run"

Logic: "All the conditions inside the same audience can logically be joined with AND / OR operators" (drag-and-drop); "Separate audiences are joined with OR operator." Note: experience `settings.matching_options` in the Serving API is `{"audiences": "any", "locations": "any"}` — "any"/OR is the default joining mode (https://api.convert.com/doc/serving/).

- Geo targeting for the geo API in JS conditions requires a geo audience attached to the experiment (observed working constraint from CRO-12280; the specific KB claim is UNVERIFIED beyond the audience condition list above).

**dataLayer targeting**: Convert has no native dataLayer condition category; the documented pattern is a Callback-type location + polling helper in Global JS (https://support.convert.com/hc/en-us/articles/115000004632-targeting-in-convert-using-datalayer-data):
```javascript
// Location "Callback JavaScript"
if (options.isActive) return;
window.waitForDataLayer('industry', 'medical').then((element) => {
  if (element) {
    activate();
  }
});
```
```javascript
// Project Global JavaScript
window.waitForDataLayer = (key, value,
  {
    nextRetry = 100, // ms
    maxRetries = 50,
  } = {}
) => {
  let retries = 0;
  const check = (resolve) => {
    const result = window?.dataLayer?.find((layer) => layer[key] === value);
    if (result) {
      resolve(result);
    } else if (retries < maxRetries) {
      retries++;
      setTimeout(() => check(resolve), nextRetry);
    } else {
      resolve();
    }
  };
  return new Promise((resolve) => check(resolve));
};
```
Requires: "Disable 'Use Legacy Script' under Environments & Tracking Code", all experiences assigned to an environment, latest script installed.

**Excluding/including by other-experiment bucketing** (legacy cookie method, https://support.convert.com/hc/en-us/articles/115000028552-excluding-including-visitors-that-have-been-bucketed-on-another-experiment): Visitor Cookie condition on `_conv_v` with "Does not contain" + each variation ID to exclude (or "Contains" + experiment ID to include). Caveat: with <100% traffic experiments, "a cookie is still written if they met the Site Area and Audience conditions but due to the traffic restriction, were not actually included in that experiment." The newer "Bucketed in Experience" audience condition covers this natively.

**Mutual exclusion / simultaneous experiments**: https://support.convert.com/hc/en-us/articles/115000414332-running-experiments-simultaneously-on-a-page-or-set-of-pages

---

## 3. Custom JavaScript conditions

Source: https://support.convert.com/hc/en-us/articles/205159965-targeting-experiments-and-firing-goals-based-on-a-javascript-condition

- Usable in three places: "Advanced Goal Setup", "Experiment Locations", "Experiment Audience". (The use-cases article adds Experience/Variation/Project code as places where JS in general runs: https://support.convert.com/hc/en-us/articles/360050230911-javascript-conditions-use-cases)
- **Return semantics**: it is an *expression* that must evaluate truthy — "fire a conversion or run an experiment when some sort of JavaScript expression evaluates to 'true'". "The javascript expression will be evaluated into the global 'window' context." The Advanced Audience article phrases it as: must "return true to run." Style used throughout the KB is a bare boolean expression, e.g. `"window.runExperiment == 1"` — not a function body.
- **Timing constraint**: "Any JavaScript used inside the expression has to be defined **before** the main Convert Experiments tracking code" — otherwise the value doesn't exist at evaluation time and the condition won't match.
- **Polling / re-polling**: "Convert also provides a **convert.recheck()** function to evaluate the condition **every 50ms for 2 minutes**, as the variable might not be declared when the convert script executes." That is the only documented automatic re-poll of a JS condition; without it, conditions are evaluated when polling runs (page load / `run` push / SPA URL-change re-evaluation). The exact call syntax for wrapping a condition in `convert.recheck()` is not shown in the retrievable article text — UNVERIFIED; do not guess its signature, prefer the Callback-location pattern which Convert now recommends (it deprecates `convert_recheck_experiment()` / `convert_recheck_experience()` per https://support.convert.com/hc/en-us/articles/206631623-target-experiment-based-on-a-custom-javascript-condition-that-evaluates-true-at-a-later-stage).
- Example conditions from the use-cases article (verbatim):
```javascript
document.referrer == "YourURL.com"
window.location.href.includes('yourstring') == true
window.location.href.match(/https?:\/\/(www.yourdomain.com\/)/).length > 0
document.cookie.indexOf('cookieName') > -1
typeof yourvariable != 'undefined'
document.getElementById("intro") != null
convert.$('.selector').length != 0
window.matchMedia("(min-width: 768px)").matches
```

### The Transient audience gotcha
Documented behavior: transient conditions are "re-checked each time an experience is to be presented", including "if you open another tab after the Experience had already decided which variation to serve to you" (https://support.convert.com/hc/en-us/articles/115001132271-Select-Audience-Type). Consequence for JS conditions that are only *momentarily* true (e.g. `window.runExperiment == 1` set by a click handler, or a dataLayer event flag): on the next pageview the flag is gone, the transient re-check fails, and the experience silently stops rendering for that already-bucketed visitor. Use a **Permanent** audience (checked only at bucketing) for one-shot JS triggers, or persist the flag yourself. The concrete JS-flag failure mode is an implication of the documented re-check rule, not spelled out verbatim in the KB — the documented example uses a time-of-day condition (visitor returns outside hour 9 → "the Experience will be skipped").

---

## 4. Experiment activation modes / Manual Activation

Default = evaluate and activate as soon as Location (+ audience + traffic) conditions match during polling ("Upon Run" trigger on new-script locations). Manual Activation is built from a JS-condition location plus an explicit API call.

Source: https://support.convert.com/hc/en-us/articles/208831326-manually-activate-experiment

Setup:
1. Location uses a JS condition instead of URL matching, simplest: `"(window.runExperiment ==1)"`
2. When your flow/event happens, set the flag then push the execute command (order matters — flag first):

```javascript
window.runExperiment = 1;
```
Method A (array form):
```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(["executeExperiment",""]);   // experiment ID goes in the second element
```
Method B (object form, with parameters):
```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push({
  what: "executeExperiment",
  params: {
    experienceId: "123456789",
    triggerIntegrations: false
  }
});
```
- `experienceId`: the experiment ID from the app.
- `triggerIntegrations: false`: prevents sending the experiment-view event to Google Analytics (useful when firing repeatedly). Array-form equivalent reported as `window._conv_q.push(["executeExperiment","123456789", false])` (third param false = suppress GA event) — appears in search extraction of the same KB cluster; exact article placement UNVERIFIED.
- Even with manual activation, Locations and Audience conditions are still tested when the polling is triggered by the code (consistent with `_conv_eforce` requiring conditions to match).

**Fire from GTM event** (https://support.convert.com/hc/en-us/articles/13014389314445-how-to-configure-gtm-to-fire-a-specific-experiment-from-a-gtm-event) — Custom HTML tag on your GTM trigger:
```javascript
window.runExperiment = 1;
_conv_q = window._conv_q || [];
_conv_q.push(["executeExperiment","<EXPERIMENT_ID>"]);
```
with JS condition `window.runExperiment == 1;` on the experiment's Site Area/Location.

**Fire on click/hover of an element** (https://support.convert.com/hc/en-us/articles/360056855932-activating-an-experiment-when-someone-clicks-or-hovers-over-a-menu-item) — Project Global JS:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    if (location.href.startsWith('YOUR_DOMAIN_HERE')) {
        const targetElement = document.querySelector('YOUR_SELECTOR_HERE');
        if (targetElement) {
            targetElement.addEventListener('click', function(e) {
                window.runExperiment = 1;
                window._conv_q = window._conv_q || [];
                window._conv_q.push(["executeExperiment", "YOUR_EXPERIMENT_ID"]);
            });
        }
    }
});
```
(`mouseenter` for hover; event delegation/MutationObserver for dynamic elements.) Location JS condition: `"window.runExperiment === 1"`.

**Programmatic bucketing** (https://support.convert.com/hc/en-us/articles/114094164352-bucketing-visitors-into-an-experiment-programmatically):
```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(['assignVariation',"experiment_id","variation_id"]);
```
"Make sure the above code is fired after the main tracking snippet." Assignment takes effect when "the polling occurs (experiment conditions tested) or the experiment is manually triggered." Full example verbatim:
```javascript
experimentrun = 1;
window._conv_q = _conv_q || [];
_conv_q.push(['assignVariation',"100122263","1001175348"]);
_conv_q.push(["executeExperiment","100122263"]);
```
with location JS condition `"experimentrun == 1"`. Warning: "Be sure the population gets split in a random fashion as otherwise results might be biased."

**Lifecycle listeners** (react to activation instead of causing it): see js-api.md §3.4 and code-samples-patterns.md §5k.

---

## 5. SPAs / dynamic pages

### Legacy script (manual polling era)
Source: https://support.convert.com/hc/en-us/articles/205159975-Running-Experiments-on-Single-Page-Apps and https://support.convert.com/hc/en-us/articles/4402421565453-single-page-application-spa-troubleshooting-guide

- Polling = "the part of the Convert script that evaluates the experience conditions, goals, segments and deploys experience code when the visitor matches them." It runs "when a new page is loaded"; on SPAs no page load happens, so "you need to fire the polling each time a new 'view' is displayed."
- Manual re-poll:
```javascript
window._conv_q = _conv_q || [];
window._conv_q.push(["run","true"]);
```
(object form also documented: `_conv_q.push({what: 'run'})`)
- Re-check goals without a page load:
```javascript
window._conv_q = window._conv_q || [];
window._conv_q.push(['recheck_goals']);
```
- pushState proxy pattern and 100ms URL-watcher: see code-samples-patterns.md §5e (verbatim snippets).
- Gotcha: on SPA navigation "changes triggered by the experiment will not be reset as they would be with a normal web page… You will have to undo the element with code." Convert removes code it added when conditions stop matching, but jQuery/DOM changes can persist.

### New script (native SPA support)
Sources: https://docs.developers.convert.com/v1.0-web/docs/spa-support, https://support.convert.com/hc/en-us/articles/spa-optimizations, https://support.convert.com/hc/en-us/articles/migrate-from-the-legacy-tracking-script-to-the-new-tracking-script-step-by-step

- Monitors `history.pushState()`, `history.replaceState()`, `popstate`; on change it "Fires the `url.changed` lifecycle event" and automatically re-evaluates experiences against the new URL.
- "The new script natively supports SPAs. If your project previously implemented manual polling, pushState proxies, or run() calls from the legacy guide, remove them unless you hit a rare edge case."
- SPA Optimizations (toggle at **My Project > Configuration > Other Settings**): detects hydration ("ensuring any modifications made to web elements prior to hydration are maintained afterward") and "continually monitors for changes (mutations) in the DOM and reapplies modifications". The project config JSON exposes this as `"disable_spa_functionality": false` (https://api.convert.com/doc/serving/).
- Disable per-pageview via query param:
```
https://example.com?_conv_disable_spa_optimizations=true
```
- Tuning via `setParameters` in Global JS (ms values; "Start with 100 and adjust as needed"): `delayContinuousActivation`, `throttleChanges` — see js-api.md §6.1.
- Validation after migration: "use your browser console to check convert.currentData.experiences after a page load".
- There is **no documented global "poll every N ms" project setting**; continuous evaluation on the new script is event-driven (URL events + MutationObserver), and the only numeric polling constant documented anywhere is `convert.recheck()`'s 50ms/2min (§3) plus the 100ms/50-retry defaults of the `waitFor`/`waitForDataLayer` helper patterns.

---

## 6. Split URL tests

Source: https://support.convert.com/hc/en-us/articles/how-split-url-experiments-work

### Redirect mechanics
- Client-side: "the visitor is redirected using a client-side redirection method (e.g., window.location.replace() in JavaScript)." "Client-side redirection occurs quickly after the page load begins but can be affected by network latency or script execution delays."
- Control: "If the visitor is assigned to the control group, they remain on the current page. In technical terms, they are redirected to the same URL they are currently on."
- Variation without regex: "The visitor is redirected to the Static Variation URL specified in the experiment settings."
- Counting: experiments are counted "after the visitor lands on the redirected page and the tracking code runs" — so "The Convert.com tracking code must be installed on all pages involved in the experiment, including control and variation pages."
- Returning visitors: "Convert.com ensures that returning visitors see the same variant to which they were originally assigned. This is achieved through cookies or local storage, storing the visitor's variant assignment."

### Regex option & query param passing
- With "Support Regular Expressions" enabled, Convert does "a Regex Match between the visitor's current URL and a defined Original URL Pattern"; "The captured groups are inserted into placeholders within the variation URL template." **"If the regex match fails, the visitor is not redirected to the variation. This can lead to uneven distribution of visitors."**
- The universal Original URL Pattern that fixes uneven bucketing (matches everything the Locations bucketed, from https://support.convert.com/hc/en-us/articles/360004825952-Correct-and-improve-traffic-bucketing-on-uneven-Split-URL-Experiments):
```
([a-z]{1,2}tps?):\/\/((?:(?!(?:\/|#|\?|&)).)+)(?:(\/(?:(?:(?:(?!(?:#|\?|&)).)+\/))?))?(?:((?:(?!(?:\.|$|\?|#)).)+))?(?:(\.(?:(?!(?:\?|$|#)).)+))?(?:(\?(?:(?!(?:$|#)).)+))?(?:(#.+))?
```
with Variation URL `https://myvariationurl$7$6` and "Support Regular Expressions" enabled. (Note: the fetched text HTML-escaped some brackets; verify the canonical pattern on the article page before use.)
- Simple query-param carry-over uses the "Transfer Query Parameters"/"Transfer Original URL Variables to the Variation URL" checkbox (applies a regex automatically) — https://support.convert.com/hc/en-us/articles/204506589-how-to-copy-over-query-string-variables-get-variables-to-the-variation-url-of-a-split-url-experiment
- When the variation URL already has params, avoid `?a=1?b=2` (second `?` invalid) — use regex (https://support.convert.com/hc/en-us/articles/360000940871-Transfer-Query-Parameters-from-Original-to-a-Variation-that-also-has-Query-Parameters):
```
Original URL pattern:  https://www.mysite.com/([^\?]+)?\?{0,1}(.*)$
Variation URL:         http://www.mysite.com/VIDEO/?query=param&$2
```
Required settings: "Support Regular Expressions" on, "Transfer Original URL Variables to the Variation URL" on, "Show variation RegEx" on. Plus location exclusion: "Query String does not contain query=param".
- URL-decomposition pattern for adding a param (https://support.convert.com/hc/en-us/articles/how-to-create-a-split-url-experiment-that-adds-a-url-query-parameter-to-the-variation):
```
Original: ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$
Variation: $1$3$5?new_param=value&$7
```

### Pitfalls
- **Redirect loops**: "Ensure that your experiment's location settings exclude URLs containing the new query parameter… to avoid creating conditions that cause users to be redirected back and forth"; blog: "set the Locations to 'Page URL matches exactly' and input 'query string contains v1=true' in the exclude section." Locations must "encompass all URLs that might receive traffic under the conditions of the test but exclude the Variation URLs."
- **Canonical URLs / SEO**: "place the 'rel=canonical' link attribute on all of your alternate links pointing to your Original page." (https://www.convert.com/blog/a-b-testing/split-url-testing-guide/)
- **SRM / uneven traffic**: regex-match failures on the Original URL Pattern, missing tracking script on the variation, and bots concentrated on one URL. "This regex expression should match all the traffic that matches your experiment Locations and Audience conditions."
- **Analytics inflation**: "install the main Convert tracking code in the <head> section of your pages, and for split URL accuracy place it before analytics code so redirects do not inflate original-page analytics." (blog guide)
- **Cookie persistence**: assignment persists via first-party cookie/localStorage; if the site or server strips/deletes Convert cookies on the variation domain/path, visitors re-randomize on every entry (this failure mode is real — observed on Dometic CRO-875 — but the KB does not document a specific server-deletes-cookie scenario; the documented guarantee is the returning-visitor consistency quote above).
- **Multipage split URL**: Convert recommends building it as a normal A/B experiment using `convert.redirect()` in Variation JS (https://support.convert.com/hc/en-us/articles/360021919232-creating-a-multipage-split-url-experiment):
```javascript
if (document.location.href.includes("https://domain.com/page1.html")) {
    convert.redirect("https://domain.com/page1b.html");
}
```
```javascript
var parameters = (new URL(document.location)).searchParams;
if (document.location.href.includes("convert")) {
    convert.redirect("https://www.convert.com" + "?" + parameters);
}
```
Site Area must include all "Visitor Requested URLs" so visitors get bucketed. Conditional redirect variant: https://support.convert.com/hc/en-us/articles/205160335-how-do-i-create-a-variation-that-redirects-to-another-page-based-on-certain-logic-
- Replacing/removing params on split URL: https://support.convert.com/hc/en-us/articles/360047125231-replacing-or-removing-certain-parameters-on-a-split-url-experiment
- Serving API exposes `"split_url_settings": { "split_regex_support": true }` per experience (https://api.convert.com/doc/serving/).

---

## 7. Bucketing, traffic allocation, forcing variations

### How bucketing happens
- Order: Locations → Audiences (once) → "you move to traffic distribution. Convert decides here based on the traffic distribution if you will see the original or one of the variations." (https://support.convert.com/hc/en-us/articles/115002527732)
- **Web client script**: random assignment — "it 'flips a coin' for each visitor. That is, each visitor has a 50% chance" (50/50 example). The article does not describe deterministic hashing for the web script; stickiness comes from storing the assignment in the `_conv_v` first-party cookie/localStorage. Minor lopsidedness at low traffic is normal; "it does not matter if you have a minor uneven distribution" since analysis uses rates. Other causes of skew: targeting misconfig, undetectable bots, paused variations. (https://support.convert.com/hc/en-us/articles/115003249132-even-distribution-between-variations)
- **Fullstack/server SDKs** (different mechanism): "The SDK uses the visitor's unique ID and a MurmurHash-based bucketing algorithm to ensure the same visitor always sees the same variation." And: "On new experiments you can also ramp total traffic up or down without reshuffling anyone" but "re-weighting the split between variations is the change that moves visitors." (https://docs.developers.convert.com/docs/running-experiences — Fullstack SDK documentation, not the web snippet.)

### Changing traffic distribution mid-test (web)
- Experience-level % ("what percentage of visitors you like to test") and per-variation split are both set in the Experience Summary. **"If the traffic distribution is changed while the experiment is running, this will invalidate future data of the experiment."** (https://support.convert.com/hc/en-us/articles/204506829-what-is-an-traffic-distribution)
- Already-bucketed web visitors keep their variation via cookie (returning-visitor consistency, §6); whether the web script re-shuffles anyone on re-weighting is not explicitly documented — UNVERIFIED for the web snippet; the MurmurHash ramp-safety statement is documented only for Fullstack.
- Serving API stores `traffic_allocation` per variation as an integer out of 10000 (e.g. `"traffic_allocation": 10000`) — https://api.convert.com/doc/serving/.

### Forcing yourself into a variation (QA)
Sources: https://support.convert.com/hc/en-us/articles/204506629-how-do-i-force-a-specific-variation-for-an-experiment-based-on-query-strings- and https://support.convert.com/hc/en-us/articles/360004647132-QA-Guide

- Syntax: `?_conv_eforce=[EXPERIMENT_ID].[VARIATION_ID]` — e.g. `http://www.mysite.com/test-page.html?_conv_eforce=123.678`. QA Guide example: `https://www.convert.com/?_conv_eforce=1001173467.100121503&utm_medium=qa`
- "Force Variation only works on Active experiences" ("not on Draft ones").
- "When forcing a variation, you must still match the Site Area and Audience conditions for this to work properly." → append your QA-audience param (e.g. `&utm_medium=qa`).
- Use a fresh incognito window; a prior exclusion decision is not overridden; "If you add this parameter twice to your URL, both parameters will be ignored"; for multiple experiments, load each URL sequentially in the same incognito window. Most useful when traffic <100%.
- QA audience recipe: Audience condition "Medium" / "Matches exactly" / `qa`; visit with `?utm_medium=qa`. In Safari Private/cookie-blocked contexts the param "won't persist after a full page reload" — start fresh and include it on the first URL. CMP consent must be granted or cookies (and bucketing) won't stick.
- Tools: Convert Chrome Debugger extension (console logs of triggered experiments/variations) and the QA Overlay widget ("not available when using the legacy snippet").
- Preview links (Visual Editor "Live Preview" / report eyeball) bypass targeting: "The experiment conditions from the Site Area and the Audience are not taken into account when doing a preview with the Live Preview URL." See also https://support.convert.com/hc/en-us/articles/206481485-pre-viewing-your-variations-in-any-url
- Reading assignments for third-party tools: `convert.currentData.experiences` — see js-api.md §2.2.

---

## 8. Environments & Active Websites

### Environments
Source: https://support.convert.com/hc/en-us/articles/the-new-environments-feature
- Managed at **Project Configuration > Environments & Tracking Code**; "Click on Add Environment"; standard names Local, Development, Integration, Testing, Staging, Production (custom allowed); "only one environment can be designated as 'Production'"; production "cannot be deleted if they are the only production environment in the list".
- Plan limits: "Older plans limited to one production environment, while newer plans offer up to six environments."
- **Per-environment tracking script**: "Each environment has a unique tracking script, identified by an environment parameter in the script URL." "The backend only returns experiences associated with the selected environment" — i.e., an experience only serves in environments it's assigned to; staging scripts never serve production-only experiences. "The legacy script supports only a single production environment."
- "If you separate staging vs. production behavior, use Environment-Specific Global JavaScript instead of custom forks of the snippet." (https://support.convert.com/hc/en-us/articles/migrate-from-the-legacy-tracking-script-to-the-new-tracking-script-step-by-step)
- Serving API: experiences carry `"environments": ["string"]` and the config response carries `"environment": "string"` (https://api.convert.com/doc/serving/).

### Active Websites domain matching
Source: https://support.convert.com/hc/en-us/articles/204506349-Project-Configuration
- "The domains you would like to use inside the project. Make sure you always add new domains here when you add JavaScript to any site." **"Not adding the domain will not trigger recordings of visitors and prevent experiments from working."** (Domain gate for the whole project — tracking silently no-ops on unlisted domains.)
- Wildcards supported: "if you want to include all subdomains under 'domain.com', you should set up the 'Active Domain' entry like this: 'http://*.domain.com'."
- Active-domain membership also drives automatic cross-domain cookie forwarding (§1); localhost development: https://support.convert.com/hc/en-us/articles/360004027772-Developing-on-localhost

---

## Cross-cutting gotchas index

1. Locations re-checked every pageview; permanent audiences only once at bucketing; transient audiences on every presentation (§2).
2. JS-condition variables must exist before the tracking snippet runs; only `convert.recheck()` gives you automatic 50ms/2min re-polling (§3).
3. Transient audience + momentary JS flag = experience disappears on next pageview (§3).
4. `executeExperiment` still respects Location/Audience conditions — set your flag before pushing (§4).
5. New script: remove all legacy SPA workarounds (`run` pushes, pushState proxies) (§5).
6. Split URL: exclude variation URLs from Locations or you get redirect loops; regex Original URL Pattern must match all bucketed traffic or you get SRM (§6).
7. `_conv_eforce` works only on Active experiences and only if targeting matches; duplicate param = ignored (§7).
8. Domain not in Active Websites = no tracking at all, no error (§8).
9. `_conv_v` cookie is written even for visitors excluded by <100% traffic allocation — cookie presence ≠ participation (§2).
10. Changing traffic distribution mid-run "will invalidate future data" (§7).

All quotes are verbatim from the cited pages as retrieved 2026-08-12. Items explicitly marked UNVERIFIED: complete UI operator list (image-only in KB), `convert.recheck()` call signature, web-snippet reshuffling behavior on re-weighting, and the array-form third-parameter `false` for `executeExperiment`.
