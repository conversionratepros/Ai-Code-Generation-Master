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

## Step 4 — Get Figma designs

Ask the user:
> "Please supply the Figma Frame link(s) for this test."

For each link provided, call `get_design_context` using the Figma MCP server to extract the design details, layout, and any annotations.

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
- **Reference**: Figma design context for visual requirements
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
