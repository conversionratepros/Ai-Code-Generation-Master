# Build AB Test

You are helping a developer build an AB test for Convert.com. Follow the steps below **in order**, waiting for the user's response at each step before proceeding.

---

## Step 1 — Get the client path

Ask the user:
> "What is the client path for this test? (e.g. `/Users/donavanwallis/Documents/Ai-Code-Generation-Master/CTM/Home`)"

Once provided, store this as the **base path**.

---

## Step 2 — Validate folder structure

Using the base path, check that the following core files and folders exist:
- Folder: `AB test code examples`
- File: a global JS file inside `AB test code examples`
- File: `Control.html`
- Folder: `Convert.com deployments` (or similar name)
- Folder: `New AB tests`

If any are missing, tell the developer:
> "The following required files/folders are missing: [list]. Please let update."

If all present, confirm and continue.

---

## Step 3 — Read code examples

Read all subfolders inside `{base_path}/AB test code examples`. For each subfolder, read the JS and CSS files. Use these as your **coding style reference** — structure, patterns, class naming, how elements are injected or modified. Do NOT reference tests inside `New AB tests`.

Also read the global JS file in `AB test code examples` — this contains shared utilities (e.g. `waitForElement`) that should be reused.

---

## Step 4 — Get Figma designs (REST API pipeline — NOT get_design_context)

Ask the user:
> "Please supply the Figma Frame link(s) for this test — desktop AND mobile frames, each with the `node-id` in the URL."

**Do NOT use the Figma MCP `get_design_context` for design values.** It generates code with a model, and font sizes/weights/spacing drift — this caused months of QA UI bugs. Pull ground truth from the Figma REST API instead, using the scripts in `tools/` at the repo root (token auto-read from `~/.figma_token`):

For **each** frame link provided:

1. **Spec sheet (all numeric values):**
   ```
   python3 tools/figma-spec.py "<figma url with node-id>" --out {test-folder}/spec-<desktop|mobile>.md
   ```
   Outputs a deduped type ramp (family/weight/size/line-height incl. PostScript names), colour palette, and the full node tree with per-text-node type + colour (including inline overrides) and per-container padding/gap/radius/bg/border/shadow. **Every numeric value in the build CSS comes from this sheet.**

2. **Assets (images + icon SVGs, uncapped, named by layer):**
   ```
   python3 tools/figma-assets.py "<figma url with node-id>" --out {test-folder}/assets/
   ```
   Run it for BOTH desktop and mobile frames — breakpoints can use *different* photos of the same subject (never mirror a photo with `scaleX(-1)`; any text in it flips). `manifest.json` maps files to layers.

3. **Visual reference:** MCP `get_screenshot` per frame (crop tall frames into strips for inspection).

4. **Full copy text:** the spec sheet truncates long strings at 60 chars — pull complete copy from the raw nodes JSON (`GET /v1/files/{key}/nodes?ids={nodeId}`, `characters` of TEXT nodes) rather than retyping.

Notes:
- If the API returns `{"status":403,"err":"Token expired"}`, ask the user for a fresh personal access token (figma.com → Settings → Security → Personal access tokens, File content read-only scope) and save it to `~/.figma_token` (chmod 600).
- Fonts named in the spec may not be loaded by the client site — check, and inject the webfont in the variation if missing.
- MCP `get_design_context` may still be used for layout *hints* only — never for numbers.

---

## Step 5 — Get the ClickUp spec

Ask the user:
> "Please provide the ClickUp task or document link containing the test requirements/spec."

Use the ClickUp MCP tools to fetch the content:

1. Parse the URL to determine the type:
   - **Task**: `app.clickup.com/t/{taskId}` — use `mcp__clickup__clickup_get_task` with the task ID
   - **Doc/Page**: `app.clickup.com/*/docs/*` — use the appropriate ClickUp MCP doc tool to retrieve the page content

2. Call the relevant MCP tool and extract all requirements, acceptance criteria, and notes from the response.
3. If the clicup mcp is not installed, walk the user through installing it

---

## Step 6 — Get test name and experiment details

Ask the user:
> "What is the name of this AB test? This will be used as the folder name inside `New AB tests`."

---



---

## Step 8 — Update the Control HTML

Ask the user:
> "Please update the `Control.html` file at `{base_path}/Control.html` with the current live page HTML before we continue. This gives us an accurate picture of the DOM. Let me know when it's ready."

Wait for confirmation, then read the `Control.html` file.

---

## Step 9 — Determine injection approach

Ask the user:
> "How should the test changes be applied to the page? Choose one or describe your approach:
> 1. **Inject new elements** — new HTML is inserted into the DOM
> 2. **Modify existing elements** — existing elements are updated (text, classes, styles, attributes)
> 3. **Both** — a mix of injection and modification
>
> Feel free to describe what needs to happen and I'll follow your lead."

Use this answer to guide how the JS is written.

---

## Step 10 — waitForElement check

Ask the user:
> "Does this test need to wait for a specific element to load before running? (e.g. a lazy-loaded component or dynamically rendered section)"

If yes, ask:
> "What CSS selector should we wait for?"

Use the `waitForElement` function from the global JS file in the wait logic.

---

## Step 11 — Technical details check

Ask the user:
> "Are there any additional technical details you'd like to add before I build the test? (e.g. specific selectors, timing considerations, edge cases)"

If yes, incorporate them. If no, proceed.

---

## Step 12 — Generate the AB test code

Now build the test using everything gathered:

- **Reference**: code examples from `AB test code examples` for structure and patterns
- **Reference**: `Control.html` for the live DOM structure and selectors
- **Reference**: the Figma spec sheets (`spec-*.md`) for ALL numeric values (type, spacing, colours) + `assets/` for images/icons + screenshots for composition
- **Reference**: ClickUp spec for functional requirements and acceptance criteria
- **Reference**: user's answers on injection approach, waitForElement, and technical notes

### Rules for code generation:
- Do NOT rebuild the whole page
- Only target and modify/inject what is specified in the spec and design and answers
- Do NOT generate empty CSS classes
- JS should be scoped and non-destructive
- Use `waitForElement` if the user said it's needed
- Follow the coding patterns from the code examples exactly — structure, naming, approach
- Generate three files: `variation.js`, `variation.css`

---

## Step 13 — Save the test

Create a new subfolder inside `{base_path}/New AB tests/{test-name}/` and write:
- `variation.js`
- `variation.css`

- `user-story.md` (if the user provided one in Step 5)

Confirm the files have been created and show the folder path.

---

## Learnings & Patterns

### waitForElement — always double-chain on async pages

Never call `injectSomething()` directly inside `init()` if the target elements may not yet be in the DOM. Use a second `waitForElement` call inside `init()`:

```js
// ✅ Correct — waits for page shell, then waits for actual card elements
function init() {
    addClass('body', variation_name);
    waitForElement('.product-item', injectBadges); // second wait inside init
}
waitForElement('.page-wrapper', init);

// ❌ Wrong — .product-item may not exist yet when init fires
function init() {
    addClass('body', variation_name);
    injectBadges(); // fires too early, finds no elements
}
waitForElement('.page-wrapper', init);
```

---

### MutationObserver — always watch the stable parent, never the re-rendered child

When AJAX loads new content (infinite scroll, "View More", filter changes), the platform typically **replaces** the inner list element entirely. Observing the inner list means your observer dies on first replacement.

Always observe the **nearest ancestor that survives re-renders**, and debounce to avoid firing mid-render:

```js
var debounceTimer = null;
var stableParent = document.querySelector('#stable-container');
if (stableParent) {
    var observer = new MutationObserver(function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(injectThings, 150);
    });
    observer.observe(stableParent, { childList: true, subtree: true });
}
```

---

### Double-inject guard — required on every injection function

Any function that inserts HTML must check for its own output before running. The function may be called by `waitForElement`, the MutationObserver, or filter/sort re-renders:

```js
function injectBadge(card) {
    if (card.querySelector('.cro-XXXX-badge')) return; // guard
    // ... inject
}
```

---

### Parsing dimensions from product titles

Product titles often embed dimensions in inconsistent formats. Use a regex that handles all known variants:

```
"Floor Tile - 600 x 600mm"       → 600, 600
"Floor Tile - 600mm x 600mm"     → 600, 600  (mm between numbers)
"Mosaic - 300 x 300 x 4mm"       → 300, 300  (third number = thickness, ignored)
```

Regex:
```js
var match = title.match(/(\d+)\s*(?:mm)?\s*[xX×]\s*(\d+)(?:\s*[xX×]\s*\d+)?\s*(?:mm)?/);
```

Always take `Math.max` / `Math.min` of the two captured values so the larger is always treated as the longest side regardless of title order.

---

### Using the Figma REST API for icon accuracy

Never hand-craft icon SVGs (or arrows/checks as text glyphs like `→` / `✓`) from memory. `tools/figma-assets.py` already exports every icon in the frame as the exact Figma SVG (`GET /v1/images/{key}?ids={nodeId}&format=svg` under the hood) — use those files. Even a "simple" arrow differs from the glyph version (stroke weight, rounded caps, exact colour).

This avoids subtle visual differences (e.g. diagonal hatching vs grid lines, mask vs clipPath, exact stroke colors).

---

### Removing unused boilerplate functions

After building a test, audit which helper functions are actually called. Remove any that are not used — `live`, `insertHtml`, `innerHTMLContent`, `innerChildContent`, `toggleClass`, `removeClass`, `scroll`, `waitForSwiper`, `addScript`, `initializeSwiper` are all boilerplate that should be stripped if not needed. Lean code is easier to QA and deploy.

---

### Replacing a native `<select>` with a custom stepper

When a test replaces a dropdown quantity selector with a custom ±1 stepper:

1. **Read limits from the native select** — never hardcode min/max. Derive them from the actual `<option>` values so stock-level caps are respected:
   ```js
   function getSelectLimits() {
       var sel = document.querySelector('#your-qty-select');
       var values = [];
       for (var i = 0; i < sel.options.length; i++) {
           var v = parseInt(sel.options[i].value, 10);
           if (!isNaN(v)) values.push(v);
       }
       return { min: Math.min.apply(null, values), max: Math.max.apply(null, values) };
   }
   ```

2. **Insert stepper directly after the native select** — not before the CTA button:
   ```js
   sel.parentNode.insertBefore(wrapper, sel.nextSibling);
   ```

3. **Sync native select on every stepper change** — dispatch both `change` and `input` events so any framework listeners (React, Next.js) pick up the new value:
   ```js
   sel.value = qty;
   sel.dispatchEvent(new Event('change', { bubbles: true }));
   sel.dispatchEvent(new Event('input',  { bubbles: true }));
   ```

4. **Hide native select via CSS using its ID** — never hide the label's parent container via JS, as that can break layout. Use:
   ```css
   body.variation-class #your-qty-select { display: none !important; }
   ```

5. **Disable minus at min, disable plus at max** — always reflect limits visually. Use `setAttribute('disabled','disabled')` / `removeAttribute('disabled')` rather than the `.disabled` property for reliable cross-browser attribute toggling.

6. **Guard against duplicate runs**:
   ```js
   if (!window.cro_XXXXX) {
       window.cro_XXXXX = true;
       waitForElement('#your-qty-select', init);
   }
   ```

### Init flow for dynamic pages (React / Next.js)

```
waitForElement('#native-select-id')
  → init()
      → body.classList.add(VARIATION)
      → read limits from select
      → waitForElement('[data-action="cta"]')
          → buildStepper()   // inserts HTML after native select
          → sync native select to starting value
```

Never call `init()` directly — always gate it through `waitForElement` on the key selector.
