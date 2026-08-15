# AB Test | Custom Mega Nav | Condensed Products-Activities bar | ALL | CRO-XXX

**Client:** Dometic (en-us) · **Built:** 2026-08-10 · **Ticket:** pending — find-replace `875c` / `CRO875C` with the real number once assigned.

## What this test is

Successor concept to deliverable 875 (the `?hdr=b` Split URL mega-nav switcher). That test depends on Dometic's server-side header swap, whose cookie persistence is broken and whose mega panel dataset carries `-test`/`-alex` slugs and placeholder promo tiles. This test reproduces **only the headline change — the top bar collapsing from 11 links to 4 items** — as a fully self-contained Convert code variation:

- Native 11-link strip hidden (CSS, desktop only). In its place: **Products** and **Activities** buttons that open our own mega panels, plus **Journal** and **Sale** links.
- No `?hdr=b`, no redirect, no cookie dependency, no flicker-from-redirect. Control and variant are plain A/B arms on the standard header.

## Data source (the key design decision)

Panels are built at runtime from the **sr-only accessibility nav tree** rendered directly after `</header>` (`header + div.sr-only > ul`). Verified 2026-08-10: present and unique on homepage, category pages, and PDPs; identical in both header arms; clean canonical URLs. Content updates Dometic makes to their nav flow through automatically — nothing hardcoded except the Drinkware supplement (its 5 hydration sub-category links, since Drinkware is a bare link in the old header tree; locale prefix derived at runtime).

If the tree is missing, the script aborts **without adding the body class** — the visitor simply keeps the control header (fail-safe per the 875 spec's fallback rule).

## Structure

- Bar injected `beforebegin` of the native strip's wrapper inside `nav[aria-label="Primary navigation"]` — sibling insertion, never inside a React-managed list. Mirrors the `?hdr=b` bar's markup exactly (buttons with `aria-expanded`/`aria-controls`, 13px uppercase, no chevrons, Sale in red; open trigger = grey text + black underline).
- Panels appended to `document.body`, `position:fixed`, top computed from the header's rect (recomputed on open/scroll/resize) — avoids React interference and transform-pin issues entirely.
- **Panel design is a 1:1 copy of the real `?hdr=b` panel** (DOM + Tailwind values captured live 2026-08-10, screenshots compared side-by-side):
  - Products: pill tab row (`15px`, `rounded 4px`, active = `#F6F6F3` bg + `#6B6B6B` border) → pane with "Explore All" 20px link column (min 180px), 16px sub-link list (min 220px, `py-2`, drill-down chevron svg copied from their DOM on items that have children), and two 236×295 `rounded-lg` highlight tiles pinned right (`ml-auto`), image + bottom gradient + white semibold caption, hover scale 1.05.
  - Activities: plain columns of six 16px links, no heading, no view-all — exactly as theirs.
  - Panel chrome: full-width, `px-4 py-8`, `border-top gray-200`, `shadow-lg`. Click-only tab switching (their tabs are click-driven; no hover switching).
- Close on outside click (capture-phase document listener — React can't swallow it), Esc, `popstate`, or resize below 768px.

## Snapshotted data (captured from the live `?hdr=b` panel, 2026-08-10)

Because the mega dataset (`groupedNav`) is null on control pages, the visual extras that don't exist in the sr-only tree are hardcoded snapshots in `variation.js`: `CHEVRONS` (which sub-links show the drill-down arrow, per tab), `HIGHLIGHTS` (tile caption/href/Contentful image per tab — Drinkware and Power & Solar genuinely have none), `DRINKWARE_CHILDREN` (its 5 hydration sub-links), and `EXCLUDE` (the real Camping tab hides Hydration). Tile hrefs are copied verbatim — several are `/en-us` placeholders and two Marine links look malformed, exactly like the client's own panel; that's their content, flagged in the 875 difference sheet. Sub-link hrefs deliberately use the sr-only tree's clean canonical slugs instead of the panel's `-test`/`-alex` duplicates (visually identical, correct targets). Regenerate snapshots by re-running the capture against `?hdr=b` if Dometic updates their nav content.

## Resilience (Next.js App Router)

- `waitForElement` gates init on the nav strip; body class added **after** HTML injection (one paint).
- Late-hydration guard: 300ms × 8s interval re-injects bar/class if hydration wipes them.
- Debounced MutationObserver on the `<header>` (stable ancestor) re-injects if React replaces the strip on soft navigation; panels close first.
- All injected CSS is gated on `body.CRO875C` with bare-selector `display:none` defaults — no cleanup needed on SPA navigation.

## Scope

- **Desktop only** (min-width 768px). Below md the native header is hamburger-only and identical to what the new header shows on mobile — untouched. Convert must ALSO carry a desktop-only audience (same rule as deliverable 875).
- en-us targeting via Convert URL/location settings (the code itself is locale-agnostic — it reads whatever locale's tree it finds).

## Goals

- Nav engagement click goal: `header nav a, header nav button` matches the injected bar (it lives inside the primary nav) AND the control's native links — same selector parity as the 875 split test. Add `.cro-875c-panel a` as a second click goal to capture panel link clicks.
- Attach existing Transactions + Add-to-cart goals as guardrails.

## Launch gates / open items

1. **Ticket number** — rename folder + find-replace `875c`/`CRO875C`.
2. Convert experience creation (A/B, not Split URL), desktop audience, en-us location, goals wired.
3. **Mutual exclusion with deliverable 875**: if the `?hdr=b` Split URL test ever launches, these two must not run together (both restyle the same bar). If Dometic ships the new header site-wide, retire this test.
4. Live QA on homepage + category + PDP: bar renders, panels open/close, native strip hidden, mobile untouched, soft-nav survival (navigate via internal links), hydration survival (hard reload, watch ~2s mark).
5. ~~Panel visual polish~~ — done 2026-08-10: rebuilt as a 1:1 copy of the real `?hdr=b` panel (pills, Explore All, chevrons, highlight tiles) after design review; verified side-by-side against live `?hdr=b` screenshots at 1440px.

## Reference

- Difference sheet + raw nav extracts: `~/Documents/GitHub/brain/Clients/Dometic/Dev/AB Tests/875/header-difference-sheet.md`
- Control/variant header DOM: session recon 2026-08-10 (control strip = `nav[aria-label="Primary navigation"] .scrollbar-hidden`, 11 links, no dropdowns on desktop — the full tree only exists in the drawer + sr-only block).
