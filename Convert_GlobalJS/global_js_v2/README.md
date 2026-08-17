# Convert Global Project JS — v2 (status-gated)

One folder per client. Each `<Client>/Global.js` is the **v2 rewrite** of that client's
Convert.com *Global Project JS*, ready to paste into the Convert dashboard
(Project → Settings → Global Project JS).

Built 2026-08-17 by porting the live Global JS pulled from every Convert project that day.
The unmodified originals were kept as `Convert_GlobalJS/<Client>/Global.js` in the source
repo (`Ai-Code-Generation-Master`) — if this folder has been moved elsewhere, that repo
holds the v1 files these were ported from.

---

## Why v2 exists

Most of our tests are **manually activated**: the experiment's Location condition is a JS
check like `window.crotest_X == 1`, and the Global JS decides when to set that flag and
push `executeExperiment`. The v1 files had a blind spot — **project-level JS has no idea
of experience status**. A paused/stopped test kept firing its side effects (body classes,
attributes, window flags, console logs) because the Global JS kept running its activation
code; `executeExperiment` on a paused ID is a no-op Convert-side, but any class-keyed CSS
and DOM markers still appeared. This caused a real client complaint (OneDayOnly,
2026-08-12).

v2 routes **every** activation through four gates, in order:

1. **STATUS** — the experience must be live in `convert.data` (the served project config).
   Handles both config shapes: new script (`experiences` array, `status: "active"`, paused
   tests absent entirely) and legacy (`experiments` object, `s: "1"`). Absent ⇒ never fire.
2. **URL** — `match(path)` must return true (ported verbatim from each v1 condition).
3. **ONCE** — tests marked `oncePerLoad` don't re-arm after firing.
4. **GATE** — optional async condition (waitForElement, dataLayer poll, title
   classification, …) with a `navToken` abort so a slow poll can't act after an SPA
   navigation.

On any gate failure the runner performs the test's **cleanup** (strips its body classes,
runs `onCleanup`) — that's what stops paused tests leaving CSS side effects behind.

Extras baked into the architecture:

- **SPA navigation listener** — `pushState`/`replaceState`/`popstate` re-run the registry.
  Repeat fires use the object form `{ what: "executeExperiment", params: { experienceId,
  triggerIntegrations: false } }` so GA doesn't get duplicate experiment events.
- **QA bypass** — a URL containing the experiment ID plus `_conv_eforce=` or
  `convert_vpreview` skips the status gate, so drafts stay testable before launch.
- **Debug logging** — add `?cro_debug=1` (or `localStorage.cro_debug = "1"`) for verbose
  skip/status logs. Activation logs (`Experiment <name> | <ticket> Activated`) always
  print; QA relies on them and they reproduce the v1 log lines.
- **Known lag** — Convert's CDN config propagation takes ~5 minutes, so a just-paused test
  can fire for up to that long. That is Convert-side, not fixable here.

The canonical template this all comes from is
`Convert-Reference/global-js-activation-template.js` in the source repo; the first real
implementation (live since 2026-08-12) is OneDayOnly.

---

## File anatomy

Every `Global.js` here has the same sections, in the same order:

| Section | What it is |
|---|---|
| debug helpers | `DEBUG`, `log()`, `reportError()` |
| `lib` | `waitForElement`, `poll`, `getCookie` (+ any v1 client helpers like `live()`, kept verbatim even when unused — experiment-level code may reference them) |
| status gate | `LIVE_STATUSES`, `isForcedByUrl`, `getExperienceConfig`, `isExperienceLive`, `whenConvertReady` |
| runner | `executeTest`, `cleanupTest`, `runTests` (the four gates live here) |
| shared site helpers | client-specific readers used by gates (e.g. dataLayer readers, path helpers) |
| **`tests[]` registry** | one entry per experiment — the only section you normally edit |
| decorators | non-experiment DOM markup the site's tests rely on (`cro-datapath`, `data-action` tagging, …); runs regardless of experiment status |
| SPA listener + boot | `installLocationChangeListener`, `runAll`, per-client init flag `window.cro_<client>_globalJS` |

### Registry entry shape

```js
{
    ticket: "CRO-12345",                    // for logs
    name: "PLP | Readable test name",       // for logs (executeTest prints both)
    id: "1004123456",                       // Convert experience ID — NEVER edit
    flag: "crotest_Some_Flag",              // window flag = the Location JS condition — NEVER rename
    classes: ["cro-12345"],                 // body classes stripped on cleanup
    cleanupDelay: 400,                      // optional ms (default 400)
    oncePerLoad: false,                     // optional: don't re-arm after firing
    match: function (path) { ... },         // sync URL check (path = location.pathname)
    gate: function (done) { ... },          // optional async check -> done(true|false)
    onCleanup: function () { ... }          // optional extra cleanup
}
```

To add a new test: add one entry. To retire a test: pause it in Convert — the status gate
handles the rest (you can delete the entry later; we keep retired ones as comments for
history).

---

## How the port was done (and verified)

- Every `executeExperiment` push in v1 became exactly one registry entry. Experiment IDs
  and window flags were copied **character-for-character** — they are wired to Location JS
  conditions in the Convert dashboard, so renaming breaks the experiment.
- v1 pre-push waits (waitForElement chains, dataLayer polls, title regexes) became `gate`
  functions; v1 else-branch class removals became `classes`/`onCleanup`.
- Tests whose invocations were **commented out in v1** were carried over as commented-out
  registry entries marked RETIRED — nothing silently reactivates, and nothing that never
  ran starts running.
- Non-experiment v1 code (decorators, helpers, exclusion guards, third-party wiring like
  HearX's Fullstory callback) was preserved verbatim in the appropriate section.
- Verification per file: `node --check` (syntax) + cross-grep proving every experiment ID
  and every flag in v1 appears in v2 with none missing and none invented, plus manual
  eyeballing of v1 boot sections to confirm the active/retired split.

---

## Per-client status

| Client | Registry | Notes |
|---|---|---|
| Arc | 8 active | See gotchas — deliberate verbatim OR-condition |
| Babylonstoren | 3 active | Flags use `croTest_` (capital T) |
| CTM | 11 active | Includes CRO-12527 (32-page URL map) + CRO-12470 (title-regex classification); their v1 per-test status gates deduped into the shared gate. This file supersedes the "master copy" that lived in the CRO-12527 test folder |
| Carrol Boyes | 22 active + 7 retired | Magento (not Shopify). One `cro_`-prefixed flag |
| DebtBusters DB Client | scaffold | v1 was empty — template with empty registry, ready for first test |
| DebtBusters JustMoney | scaffold | same |
| Debtbusters Debt.co.za | scaffold | same |
| Dometic | 5 active | Locale quirks preserved: en-us-only USP strip, `/product` vs `/produkt`, 3-locale rack breadcrumb detection |
| Family Education | 2 active | v1's dormant `launchExperiment` helper carried as retired |
| Front Runner USA | 5 active + 15 retired | v1 commented the retired calls out of BOTH boot and SPA lists — mirrored exactly |
| HearX Group | 14 active + 5 retired | Mixed flag prefixes (`crotest_`/`croTest_`/`cro_t_`); site-exclusion guard + Fullstory wiring preserved |
| Litehouse | scaffold | v1 was empty |
| London Dental Institute | 15 active + 6 retired | Some 9-digit legacy experience IDs — correct as-is |
| OneDayOnly | 11 active | Was ALREADY v2 in production (the reference implementation) — copied unchanged |
| Oneplan | 1 active | v1 had a copy-pasted ODO init flag; correctly renamed |

## Gotchas — do NOT "fix" these

- **Flag prefixes are inconsistent across clients** (`crotest_`, `croTest_`, `cro_t_`,
  `cro_`). They match the Location JS conditions in each Convert dashboard. Never
  normalize.
- **Arc**: `path.indexOf('/brands') === -1 || path.indexOf('/sales') === -1` is true
  unless the path contains *both*. Looks like a bug; ported verbatim with a warning
  comment. Check the dashboard before changing.
- **HearX**: KI6 / UC1 / UC3 are retired because v1 *defined but never invoked* them.
  Activating them = firing those tests for the first time — a deliberate decision, not a
  paste.
- **Carrol Boyes**: pausing 1004167209 (KI151.KI152 checkout) also strips
  `RecipeCartContinue`, a class the cart-drawer test's variation may share.
- **SPA re-runs are new behavior on several clients** — v1 files often defined a SPA
  listener but never wired it. Safe by design (status-gated, `triggerIntegrations: false`
  on repeats), but worth knowing during QA.

## Deploy checklist (per client)

1. Paste `<Client>/Global.js` into the Convert project's Global Project JS and save.
2. Load the site with `?cro_debug=1` — confirm the boot log
   `Global JavaScript Activate (v2)` and expected `Experiment … Activated` lines.
3. Confirm each live test still renders (flags set, classes applied).
4. Pause one throwaway/finished test and confirm its side effects disappear on next
   pageload (allow the ~5 min CDN lag).
5. For drafts: QA with a `_conv_eforce=` / `convert_vpreview` URL naming the experiment ID.
