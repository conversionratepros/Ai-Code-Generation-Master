# QA Bug Fix Brain — CRO Test Automation

When this file is shared, read it fully and follow the process below exactly.
This is the complete operating manual for pulling QA bugs from Slack and fixing AB test code.

---

## 1. Configuration

| Key | Value |
|-----|-------|
| Slack bot token | Stored in `.claude/settings.local.json` → `env.SLACK_BOT_TOKEN` |
| QA Slack channel name | `#qa-l1` |
| QA Slack channel ID | `C08A6HKTMG8` |
| Test files root | `CTM/CartCheckout/AB Test Code Examples/` |
| Screenshots folder | `QA-Bugs/screenshots/` |

The token is available as the environment variable `$SLACK_BOT_TOKEN` within this project session.
If the env var is not loaded, read it directly from `.claude/settings.local.json`.

---

## 2. When the User Gives a Test Name

The user will say something like:
> "pull bugs for CRO-7740"
> "check the latest QA comments for this test"
> "fix the bugs for [test name]"

**Do not pull anything until the user explicitly names a test.**

---

## 3. Step-by-Step Process

### Step 1 — Find the Slack thread

Search `#qa-l1` channel history for messages that mention the test ID (e.g. `CRO-7740`):

```bash
curl -s "https://slack.com/api/conversations.history?channel=C08A6HKTMG8&limit=50" \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN"
```

Find the message whose `text` mentions the test. Note its `ts` (timestamp) — this is the thread parent.

### Step 2 — Pull all thread replies

```bash
curl -s "https://slack.com/api/conversations.replies?channel=C08A6HKTMG8&ts=PARENT_TS&limit=100" \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN"
```

Parse the JSON with Python. Collect all reply messages and their attached file URLs (`files[].url_private`).

### Step 3 — Download screenshots

For every `url_private` image in the replies:

```bash
curl -s -o "QA-Bugs/screenshots/bug_N.png" \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  "FILE_URL"
```

Use the Read tool to view each image. Note what is wrong, what element is affected, and what breakpoint (desktop / mobile) is shown.

### Step 4 — Read the current test files

Test files live at:
```
CTM/CartCheckout/AB Test Code Examples/[Test Folder Name]/testFiles/variation.js
CTM/CartCheckout/AB Test Code Examples/[Test Folder Name]/testFiles/variation.css
```

Read both files fully before making any changes.

### Step 5 — Analyse each bug

For each Slack message + screenshot:
- Identify the exact CSS property or JS behaviour that is wrong
- Confirm what the correct value should be (from the message description or Figma link if provided)
- Check whether the bug is desktop-only, mobile-only, or both
- Cross-reference with the current code to confirm the issue exists

Do not assume — verify against the actual code before fixing.

### Step 6 — Apply fixes

Edit `variation.css` and/or `variation.js` using the Edit tool.
Apply fixes one bug at a time. Do not batch unrelated changes into one edit.

Key rules:
- Always check the SVG asset content before using it (fetch the URL and inspect the XML)
- Never assume CSS `background-color` will override a colour baked into an SVG's own elements
- For mobile-specific bugs, add fixes inside `@media (max-width: 767px)`
- For desktop-specific bugs, add fixes inside `@media (min-width: 1200px)` or at the global level
- Use `!important` only when overriding Magento's base styles

### Step 7 — Post a summary to the Slack thread

After all fixes are applied, post a reply **inside the same thread** (use `thread_ts`):

```python
import json, urllib.request

payload = json.dumps({
    "channel": "C08A6HKTMG8",
    "thread_ts": "PARENT_TS",
    "text": "YOUR_SUMMARY_TABLE"
}).encode("utf-8")

req = urllib.request.Request(
    "https://slack.com/api/chat.postMessage",
    data=payload,
    headers={
        "Authorization": "Bearer TOKEN",
        "Content-Type": "application/json; charset=utf-8"
    }
)
with urllib.request.urlopen(req) as resp:
    print(json.loads(resp.read()))
```

Always use Python `urllib.request` for Slack API calls — do NOT use `curl` with complex text payloads as shell quoting breaks the JSON.

The summary should be a table with columns:
`Bug # | Description | Fix Applied`

---

## 4. Handling Follow-Up Bug Rounds

If the user says QA posted more bugs after the last comment:

1. Note the `ts` of your last posted message
2. Re-fetch thread replies and filter for messages with `ts > YOUR_LAST_TS`
3. Download new screenshots only
4. Re-read the current code (it may have changed since the last round)
5. Apply additional fixes and post a new summary reply

---

## 5. Figma Access

If the user provides a Figma URL, use the Figma REST API to extract design specs:

- **Token:** stored in `.claude/settings.local.json` → `env.FIGMA_TOKEN` (or ask the user)
- **API endpoint:** `https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}`
- Extract node IDs from the Figma URL: `?node-id=33-407` → `ids=33:407`
- Save the JSON response to `/tmp/figma_response.json` then use Python to extract relevant values (font sizes, colours, spacing, border radii)

---

## 6. QA Bug Report Format

QA must submit bugs using this format. If a bug report does not follow the format, ask for the missing fields before attempting a fix.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUG REPORT — CRO-[TEST ID]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bug #: [number]
Device / Breakpoint:
  ☐ Desktop (1200px+)
  ☐ Tablet (768–1199px)
  ☐ Mobile (≤767px)
  ☐ All
URL: [page URL where bug is visible]

─── WHAT IS WRONG ───
[One sentence. Name the element. State what it is doing wrong.]

─── EXPECTED ───
[What should it look like? Include exact pixel values or Figma spec.]

─── SCREENSHOT ───
Attach screenshot.
REQUIRED: Red box around the exact element that is wrong — one red box per bug.

─── EXTRA NOTES ───
[Optional.]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**One Slack message = one bug.**

---

## 7. Common Mistakes to Avoid

| Mistake | What to do instead |
|---------|-------------------|
| Using a Slack SVG URL without inspecting its content | Always `curl` the SVG URL and read the XML before writing CSS around it |
| Applying `background-color` to override an SVG's internal fill | Replace the SVG itself with a correct data-URI or a different asset |
| Fixing spacing without checking which breakpoint the screenshot was taken at | Ask for device info if not specified; inspect screenshot dimensions for clues |
| Sending large text payloads via `curl` shell arguments | Use Python `urllib.request` with `json.dumps()` to build the request body |
| Assuming `visibility: hidden` hides the Magento `::before` label | Use `display: none !important` on the entire column element |
| Reading a Figma JSON response inline in the shell | Save to `/tmp/figma_response.json` first, then parse with Python |

---

## 8. Test File Locations (Known Tests)

| Test ID | Folder Name |
|---------|-------------|
| CRO-7740 | `Minimizing installation products on cart (V2) \| CRO-7740` |
| CRO-12425 | `Shopify/MaroelaMark/Homepage Routing ALL CRO-12425` (Shopify sections, not variation.js/css — fixes go in `sections/*.liquid`, user re-uploads to theme) |
| CRO-12526 | `Shopify/jasonl/AB Test \| Full Page \| PDP Redesign Buy-first \| ALL \| CRO-12526 (v2)` (Shopify theme test — fixes in `assets/cro-12526-v2-pdp.css/.js` + `snippets/`, user re-uploads to preview theme 188303442208; screenshots in `QA-Bugs/screenshots/cro-12526-v2/`) |

Add new tests to this table as they are worked on.

---

## 9. Slack Bot Scopes Required

| Scope | Purpose |
|-------|---------|
| `channels:history` | Read channel messages |
| `channels:read` | List channels |
| `files:read` | Download screenshot attachments |
| `chat:write` | Post messages and thread replies |
| `pins:write` | Pin messages in the channel |

If a Slack API call returns `missing_scope`, the user must add the scope at api.slack.com/apps → OAuth & Permissions → Bot Token Scopes, then reinstall the app to the workspace.
