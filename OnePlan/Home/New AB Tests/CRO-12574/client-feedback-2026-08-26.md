# CRO-12574 — Client feedback review (2026-08-26)

**Status (2026-08-26, later): comments 1–4, 6–8, 10 APPLIED to `variant.js` + `variant.css` and Playwright-verified (20/20, 1440 + 390) — see the closing section of `recheck-notes.md`. Still open: colours beyond the teal (need brand hex list), new logo, new phone mockup. Convert re-paste of JS + CSS pending.**

## Sources

- **Figma main file** `UXRUWUjIRz0XSDknyT1cNO` ("Oneplan — Homepage Relook (CRO-12173)"), desktop `44:5710`, mobile `56:101`.
  28 comments pulled via REST API (`~/.figma_token`); 14 unresolved. Comment → element mapping done from
  `client_meta.node_offset` against the node tree.
- Figma **last modified 2026-08-20 04:12** — Azi saved 3 times *after* the client's 2026-08-19 comments, so the
  design already carries most of the requested edits (verified by diffing the 2026-08-12 13:21 version against now).
- **`figma-spec-variantB-desktop.md` (Aug 15) is stale**: its header reads "(Copy)" — it was generated from a *copy*
  of the file, which still had the old palette (#5BF1FD teal / #09075C navy / #AEEEFD azura). Fresh specs from the
  main file: `figma-spec-desktop-2026-08-26.md`, `figma-spec-mobile-2026-08-26.md`.
- **ClickUp comments: NOT pulled.** No ClickUp MCP/token on this machine; CRO-12574 has no ClickUp task link in the
  brain repo either. Pending — paste them in or share the task link.

## Unresolved comments → design state → build action

| # | Comment (who, date) | Element | In Figma now? | In build? | Build action (when go-ahead) |
|---|---|---|---|---|---|
| 1 | COPY CHANGE — "Access a wide range of benefits, including private hospitals like Netcare, Life and Mediclinic, 24/7 virtual doctor consultations, and Day-to-Day claims paid upfront." (Oneplan Insurance, 08-19) | Health plan card body | ✅ applied (desktop + mobile) | ❌ old copy | `variant.js` `.pcard-featured > p` — replace copy |
| 2 | "Sentence Case — Health Insurance / Pet Insurance / Gap Cover / Car & Household" ×4 (08-19) | Plan card `<h3>` titles | ✅ textCase removed | ❌ `.pcard h3 { text-transform: uppercase }` (`variant.css:501`) | delete that rule (markup is already sentence case) |
| 3 | "Full stops after headings to be consistent with the one below." + "Full stop" + "Full Stop." (08-19) | H2s: *What each plan covers* / *Making our customers smile is at the heart of what we do* / *Everything you want to know before you decide* / *Ready when you are* | ✅ all four end with "." | ❌ none of the four (`variant.js` ~137, ~194–198, ~256, ~284) | append "." to the four H2s (USP H2 and hero H1 already have theirs) |
| 4 | "Sentence Case" (08-19) at app section titles | `Download the app!` H2 | ✅ was "DOWNLOAD THE APP!" → now "Download the app!" | ❌ `.appdl h2 { text-transform: uppercase !important }` (`variant.css:1252`, mobile `:1744`) | delete both rules. Eyebrow "ONEPLAN ECOSYSTEM" stays uppercase (consistent with the other eyebrows) |
| 5 | "Colours — overall check… this teal is not the correct colour code (#6ef3ff) it is (#5BF1FD). Brand guideline canva.link/cmawb718ofgjnn0 PG 20" (08-19) | Reviews section (whole design) | ❌ **not corrected** — Figma still uses `#6EF3FF` ×10 (all teal buttons, chip border + tick, hero pill, review link) | ✅ build already `--teal:#5bf1fd` | none for teal. See "Palette drift" below — needs a decision before any palette pass |
| 6 | "New phone mockup will be sent." (08-19) | App section phone image | pending asset | build uses S3 `mockup.png` (600×734) | swap image when received; no code change otherwise |
| 7 | "New Oneplan logo to be used please." (08-19) | **Footer** logo | Azi replaced the raster with the "Oneplan Logo_One Logo 1" vector on 08-20 (same mark as header) | n/a — **footer + header are native, not injected** | site-level unless we're asked to override the native logo inside the variation. Needs the asset + a scope decision |
| 8 | "@Donavan login removed from the nav bar at the top and footer link at the bottom." (Nick, 08-11) | Header "Login" + self-serve "Log in" card | ✅ header Login hidden; "Log in / Manage your policy" card hidden (desktop + mobile) | ❌ build still renders the **Log in** card first in `.selfserve` (`variant.js:297–300`) | remove the Log in card (flex row → 2 cards, mobile column already handles it). Native header/footer login = site-level: the live homepage copy has **no "Login" anchor at all, only "Broker Login"** → clarify with Nick which element he means |
| 9 | "add a new section for download the app with ios and android icons — on desktop and mobile" (Nick, 08-11, parent resolved) | App section | ✅ | ✅ `<section class="appdl">` built 08-13 | none. (Mobile design also had a "Download the app / iOS / Android" self-serve card — now hidden → nothing to add) |

Resolved comments (Azi's 07-28 self-notes, Nick 07-31 equal card heights, Oneplan 08-05 green button shadows + "Car & Household") are all reflected in the v3 build.

## Palette drift — main file vs the copy the build was made from (needs a decision, not a build change yet)

The client asked for an *overall* colour check against the brand guide (Canva PG 20 — not fetchable headlessly; need the hex list).
Beyond the teal, the main file has shifted several tokens the build still carries from the copy:

| Token / element | Build (`variant.css`) | Figma now |
|---|---|---|
| Teal (buttons, chip border/tick, pills) | `#5BF1FD` ✅ matches client | `#6EF3FF` ✗ (client rejects) |
| Navy text | `#09075C` | `#05066A` |
| Azura icon circles (plan cards) | `#AEEEFD` | `#B9F0FF` |
| Eyebrow text / review arrows / USP step circles | `#AEEEFD` / `#40AEE1` cyan / azura | `#B5F9FF` (all three) |
| Vivid blue (USP right panel, final CTA) | `#0000D9` | `#0202E4` |
| Section greys | `#F3F3F3` | `#F5F5F5` |
| Answer-card dots | `#282972` | `#09075C` navy |
| Self-serve icon circles | `#F1F4FB` | azura |
| "vs" badge | `#A9F8FE` soft teal | azura |
| Hero body/legal/"About 2 minutes" text | tinted whites `#EAF1FF/#DFEAFF/#CFDCF9` | pure `#FFFFFF` |

Recommendation: get the brand hex list (or Azi's confirmation of which set is brand-correct) **before** touching the palette.
If the Figma set is confirmed, it's a token swap in `:root` + the handful of literal values above.

## Other design drift since the build spec (not in any comment)

- Reviews section background is now an **image fill** (`d47e1c7e…`) instead of the deep-blue gradient (desktop + mobile) — exported to scratchpad to check; build uses the gradient.
- Hero section bg is an image fill (the family photo) — build already does this.
- Client-requested 2026-08-12 build changes (USP/final CTA anchors → `#products`; answer-card links removed) are **not** in the Figma — the design still shows the three answer links. Known + intentional (client has no URLs).

## Open questions before building

1. ClickUp comments — paste or link the task.
2. Brand colour hex list (Canva PG 20) → which navy / azura / vivid / grey to use.
3. "Login" — the native header has no Login link (only "Broker Login"); which element should go, and is native header/footer in scope for the variation?
4. New logo + new phone mockup assets (client to send).
5. Adopt the reviews-section image background, or keep the gradient?

## Build reminder

`variant.js` in Convert 1004206057 carries the `cro-height` spans synced 2026-08-10 — every JS edit must be re-pasted; CSS re-paste only if the palette/uppercase rules change.
