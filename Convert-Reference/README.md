# Convert.com Knowledge Base (compiled 2026-08-12)

Researched from support.convert.com, docs.developers.convert.com (official dev docs), api.convert.com, github.com/convertcom, and the `@convertcom/tracking-types` npm typings. Every claim in these files carries its source URL; unverifiable items are flagged **UNVERIFIED**.

## Files

| File | Covers |
|---|---|
| [js-api.md](js-api.md) | Snippet loading/anti-flicker, `window.convert` object (full method table from official typings), complete `_conv_q` command reference, lifecycle events, cookie formats (`_conv_v`/`_conv_s` decoding), QA/debug URL params, SPA support (new vs legacy script) |
| [targeting-activation.md](targeting-activation.md) | Locations (URL/JS/query matching, operator enums from a live config), audiences (Permanent vs Transient vs Segment + the transient-flag gotcha), JS conditions & `convert.recheck()`, manual activation (`executeExperiment`), programmatic bucketing, Split URL mechanics/regex/pitfalls, traffic allocation, `_conv_eforce` QA, environments, Active Websites |
| [goals-revenue-analytics.md](goals-revenue-analytics.md) | All goal types, `triggerConversion`/`pushRevenue`/`force_multiple`, server-side track endpoint, Shopify/Woo/Magento revenue, GA4 integration (`experience_impression` + `exp_variant_string`), GTM dataLayer pushes, Mixpanel/Hotjar/Clarity/Segment, statistics engines, conversion verification |
| [code-samples-patterns.md](code-samples-patterns.md) | github.com/convertcom repos, `convert._$` vs `convert.$` polling, Global Project JS vs Global Experience JS vs Variation JS execution order, fullstack `@convertcom/js-sdk`, official recipes (SPA, redirects, cross-domain, page tagging, consent), CSP, performance |

## Cheat sheet — the 12 things we reach for most

```javascript
// Always init the queue like this (never = [])
window._conv_q = window._conv_q || [];

// 1. Fire a JS goal (optionally scoped to one experience)
_conv_q.push(["triggerConversion", "GOAL_ID"]);
_conv_q.push(["triggerConversion", "GOAL_ID", "EXPERIENCE_ID"]);

// 2. Revenue (dot decimal; force_multiple = allow repeat transactions)
_conv_q.push(["pushRevenue", "123.45", 3, "GOAL_ID"]);
_conv_q.push(["pushRevenue", "1", "1", "GOAL_ID", "force_multiple"]); // count-every-event trick

// 3. Manual activation (Location JS condition: window.runExperiment == 1)
window.runExperiment = 1;
_conv_q.push({ what: "executeExperiment", params: { experienceId: "EXP_ID", triggerIntegrations: false } });

// 4. Programmatic bucketing (flag first, then assign, then execute)
_conv_q.push(['assignVariation', "EXP_ID", "VAR_ID"]);
_conv_q.push(["executeExperiment", "EXP_ID"]);

// 5. Legacy SPA re-poll (new script does this automatically)
_conv_q.push(["run", "true"]);        // re-check experiences
_conv_q.push(['recheck_goals']);      // re-check goals

// 6. Run code once Convert is ready
_conv_q.push([function () { /* convert.* available */ }]);

// 7. Lifecycle listener
_conv_q.push({ what: 'addListener', params: {
  event: 'experience.activated',   // or goal.triggered, url.changed, snippet.experiences_evaluated…
  handler: function (e) { /* ... */ }
}});

// 8. Read bucketing state
convert.currentData.experiences[expId].variation.id   // this pageview (new script)
convert.historicalData.experiences                    // all-time
convert.getCookie('_conv_v')                          // raw cookie; exp:{EXP.{v.VAR-g.{GOAL.1}}}
```

QA URLs:
- Preview (draft OK, no tracking, skips audiences): `?convert_action=convert_vpreview&convert_e=EXP&convert_v=VAR`
- Force with tracking (Active only, targeting must still match): `?_conv_eforce=EXP.VAR` (+ QA audience param, e.g. `&utm_medium=qa`)
- Debug console: `?convert_log_level=debug` (or `info`); disable: `?convert_disable=true`
- Kill SPA handling: `?_conv_disable_spa_optimizations=true`; anti-flicker timeout: `?convert_dom_timeout=3000`

Public endpoints (no auth):
- Project config JSON: `https://cdn-3.convertexperiments.com/JSON/{accountId}-{projectId}.json` (all experiences incl. variation JS/CSS, global JS, goals)
- Tracking snippet: `https://cdn-4.convertexperiments.com/v1/js/{accountId}-{projectId}.js`

Top gotchas (full list in targeting-activation.md):
- Audience conditions evaluate **once** at bucketing (Permanent); **Transient** re-checks on every presentation — a momentary JS flag in a transient audience makes the test vanish on the next pageview.
- JS-condition variables must exist **before** the snippet runs, or use `convert.recheck()` (50ms × 2min) / a Callback location.
- `executeExperiment` still respects Location + Audience conditions — set the flag before pushing.
- Goals fire only for visitors already bucketed into the attached experience; one conversion per visitor unless you use the pushRevenue counter trick.
- Domain missing from Active Websites = silent total no-op.
- Changing traffic distribution mid-run invalidates future data.
- Split URL: exclude the variation URL from Locations (redirect loops) and make the regex match all bucketed traffic (SRM).
