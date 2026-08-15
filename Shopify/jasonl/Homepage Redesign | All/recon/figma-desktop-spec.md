# Figma DESKTOP spec — "Temp - JasonL — Website 2026" (fileKey 5JZZIzKcjO1Yzv2rCBszng, frame 478:940)

Page 2000px wide. Content column 1540px, x 230–1770. All Poppins. Weights: Light=300 Regular=400 Medium=500 SemiBold=600 Bold=700.
Note: MCP resource `skill://figma/figma-design-to-code/SKILL.md` could not be loaded (ReadMcpResourceTool unavailable in this environment); `skillNames: resource:figma-design-to-code` was passed on every call. All 11 calls succeeded first try. Positions derived from auto-layout math (pad/gap/heights); `~` = computed approximation.

## Hero (478:1030, band y=124)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "Office fitouts, Australia-wide" | 600 | 10 | normal (row h21) | 2.4px, uppercase | #161616 | 230 | 184 | hug |
| h1 "Beautiful fitouts in under 10 days." | 500 | 74 | 84 | 0 | #161616 | 230 | 225 | 965 (box h192) |
| h1 "Easy." "Fast!" spans | 600 | 74 | 84 | 0 | #161616 + underline #C6D644, thickness 6% | — | — | — |
| sub | 400 (bold spans 600 #161616) | 16 | 28 | 0 | #777 | 230 | 437 | 453 (col 745, h117) |
| btn-label "Shop furniture" / "Plan my fitout" | 600 | 14 | 24 | 0 | #161616 | right-aligned →1770 | 437 | hug |
| reassurance "Takes 60 seconds." + 600 span | 400/600 | 14 | 24 | 0 | #161616 | right →1770 | 506 | full, text-right |
| pill-label "3 installs happening today" | 600 | 14 | 24 | 0 | #161616 | img right-30 | ~1016 | hug |
| trust "4.8" / "7" | 600 | 14 | 24 | 0 | #161616 | 230 | 1115 | hug |
| trust labels "Google reviews" etc + "•" | 400 | 14 | 24 | 0 | #777 | — | 1115 | hug |

**Layout**
- band bg: none (white page). pt 60, pb 80 (last content bottom 1139, band bottom 1219).
- gaps: eyebrow→h1 20; h1→content-row 20 (title block fixed h356); content-row→image 40; image→trust-row 15.
- two-col content row: desc col w745 @x230; CTA col w745 @x1025 with pl 225 (effective x1250), items-end.
- buttons: h54, px 40, py 20, radius 50, gap 20 between; outline = 1px #161616 border, white; primary = #C6D644 fill; label 14/600; arrow icon 19.26×7.2.
- hero image: 1540×520 @ 230,580, radius 20, photo at opacity 0.20; white pill btn inside bottom-right inset 30/30 (px40 py15, r50, 11px green dot + 14/600 label).
- trust row: gap 30 between items, star icon 14×13, h24.

## Stats/proof band (478:1054, band y=1219)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| big-line1 "38 fitouts" | 500 | 58 | 60 | 0 | #C6D644 | 230 | 1319 | col 488 |
| big-line2 "completed" | 500 | 58 | 60 | 0 | #F6FAFB | 230 | 1379 | — |
| big-line3 "this week" | 300 italic | 58 | 60 | 0 | #F6FAFB | 230 | 1439 | — |
| left-sub | 400 | 16 | 28 | 0 | #F6FAFB | 230 | 1499 | 488 (2 lines) |
| stat-num (981+ / 82% / 7 / <4) | 400 | 70 | 70 (box h64) | 0 | #F6FAFB | col x+20 | r1 ~1325, r2 ~1457 | 165 |
| stat-label | 400 | 16 | 28 | 0 | #F6FAFB | col x+20 | num+64 | nowrap |
| logo-caption "1 day ago" | 400 | 16 | normal | 0 | #C6D644 | cell x | ~1731 | 200 |
| logo-caption " • Sydney" | 400 | 16 | normal | 0 | #F6FAFB | — | — | — |

**Layout**
- band bg #161616 (DARK). pt 100, pb 80. Vertical: content(h236) →60→ divider →60→ logo row(h80).
- left col w488 @230; stats grid w745 @1025: 2×2, col w372.5, gap-y 40; each stat item border-left 1px #555, px 20; item h92 (64+28).
- divider: full-width 1px line @y~1615 (#555-ish svg).
- logos row @y1675: 5-col grid, gap-x 115; logo 122×45 (alt 181×46) + 10 gap + caption.
- DEVIATION: dark bg, lime accent line + lime timestamps, Poppins Light Italic in headline, left-border stat cells.

## How it works (478:1089, band y=1835)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "HOW IT WORKS" (+11px dot) | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 1915 | hug |
| h2 "Fitouts? Handled." | 500 | 42 | 50 | 0 | #161616 | 230 | 1960 | full |
| sub (2 lines) | 400 | 16 | 28 | 0 | #777 | 230 | 2034 | 745 (h55) |
| step-eyebrow "DAY 0"… | 600 | 10 | normal (h12) | 2.4px upper | #C6D644 | col x | 2167 | 355 |
| step-title | 500 | 25 | normal | 0 | #161616 | col x | ~2203 | 355 |
| step-desc | 400 | 16 | 28 | 0 | #777 | col x | ~2250 | 355 |
| panel lead "How is 10 days possible?" | 600 | 16 | 28 | 0 | #161616 | 270 | ~2450 | flex |
| panel body | 400 | 16 | 28 | 0 | #161616 | — | — | — |
| panel btn-label "Start step 1 — book a free consult" | 600 | 14 | 24 | 0 | #161616 | right | ~2451 | hug |

**Layout**
- band bg white. py 80. Title block h174 (incl pb30): eyebrow→h2 24, h2→sub 24, sub→divider 30.
- divider 1px #E9E9E9 full width @y~2089; divider→steps row 38.
- steps: 4 cols w355, gap 40 (x = 230 / 625 / 1020 / 1415); row pt 40, pb 30; step-eyebrow→title 24, title→desc 15.
- steps→panel gap 40. Panel "SUSTAINABLE": bg #F6FAFB, radius 8, p 40, full 1540w, ~h136 @y~2410; text + lime pill btn (h54 px40 r42) in one row, gap 12.

## Interior design (478:1121, band y=2626)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "INTERIOR DESIGN" (+dot) | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 2706 | hug |
| tag "NEW" | 600 | 12 | 1.3 | 2px upper | #FFF on #FF9F17 | eyebrow+15 | 2706 | hug |
| h2 (2 lines) | 500 | 42 | 50 | 0 | #161616 | 230 | 2757 | 740 (h100) |
| sub (3 lines) | 400 | 16 | 28 | 0 | #777 | 230 | 2887 | 745 |
| bullet lead ("One designer, start to finish" etc) | 600 | 16 | 28 | 0 | #161616 | 250 | 3001/3059/3117 | flex |
| bullet rest | 400 | 16 | 28 | 0 | #777 | — | — | — |
| btn-labels "Add a designer…" / "Find out more" | 600 | 14 | 24 | 0 | #161616 | 230 | ~3175 | hug |

**Layout**
- band bg #F6FAFB. py 80. Two flex-1 cols, gap 60: left w740 @230, right image w740 @1030.
- left stack gap 30: eyebrow-row → h2 → sub → list → buttons; list items gap 30, each 5px dot + 15 gap.
- NEW tag: bg #FF9F17, radius 24, px 12, py 5, white 12/600 ls2 — DEVIATION (orange pill beside eyebrow).
- buttons row gap 15: primary lime px40 py15 h54 r50 + arrow; secondary 1px #161616 border px40 py15.
- image: 740×620 @1030,2706, radius 20, photo opacity 0.20.

## Case studies (478:1145, band y=3406)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow (+dot) — instance default text "Complete the setup" | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 3486 | hug |
| h2 "Big or small, we've done one like yours." | 500 | 42 | 50 | 0 | #161616 | 230 | 3537 | nowrap |
| sub (2 lines) | 400 | 16 | 28 | 0 | #777 | 230 | 3617 | 745 (h79 box/56 wrap) |
| btn-label "All case studies" | 600 | 14 | 24 | 0 | #161616 | right →1770 | 3617 | hug |
| card-pill "small business • 6 staff" | 600 (card3: 700) | 14 | 24 | 0 | #161616 | card x+30 | ~3741 | hug |
| card-title (Loftwork Studio…) | 500 | 25 | normal (h30) | 0 | #161616 | card x+30 | ~4111 | full |
| card-meta "Sydney • Desks… • 3 days" | 400 | 14 | 24 | 0 | #777 | card x+30 | ~4161 | full |
| card-quote | 400 | 16 | 28 | 0 | #161616 | card x+30 | ~4205 | full |
| card-attr | 600 | 16 | 28 | 0 | #161616 | — | quote end | — |
| card-link "See the fitout" | 400 | 16 | 1.5 | 0 | #161616 | card x+30 | ~4310 | hug |

**Layout**
- band bg white. py 80. Stack gaps 30 (eyebrow→h2 block→cards); inside block h2→sub-row 30; sub/btn row gap 50.
- cards: 3 × w500, gap 20 (x = 230 / 750 / 1270), y~3711, radius 12, bg white.
- card image: 500×370, radius 8, p30, photo opacity 0.60; white pill top-left h46 (px30 py15, r50, 11px dot + 14/600).
- card content p30; inner text stack gap 20; link has border-bottom 1px #C6D644, h30, + arrow 19.26×7.2.
- DEVIATION: card 3 pill label is Bold(700) vs 600 on cards 1–2 (likely inconsistency); eyebrow text is the component's default placeholder.

## Pricing (478:1160, band y=4441)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "PRICING GUIDE" (+dot) | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 4521 | hug |
| h2 (2 lines) | 500 | 42 | 50 | 0 | #161616 | 230 | 4572 | 795 |
| sub (2 lines) | 400 | 16 | 28 | 0 | #777 | 230 | 4702 | 795 |
| tag "MOST COMMON" | 600 | 13 | 1.3 | 2px upper | #FFF on #FF9F17 | center ~985 | ~4792 | hug |
| tier1-eyebrow "JUST STARTING · 1–10 people" | 600 | 10 | normal | 2.4px upper | #161616 | 290 | ~4864 | hug |
| tier2/3-eyebrow "Growing team · 10–30" / "Big move · 30+" | 600 | 13 | normal | 1.3px upper | #161616 | col x+60 | ~4864 | hug |
| price "from ~$5k / ~$12k / Let's talk" | 500 | 42 | 50 | 0 | #161616 | col x+60 | ~4905 | full |
| tier-sub | 400 | 16 | 28 | 0 | #777 | col x+60 | ~4975 | full |
| tier-bullet (4–5 items) | 400 | 14 | 24 | 0 | #777 | col x+80 | ~5023+ | flex |
| panel-lead "Want a sharper number?" | 700 | 16 | 28 | 0 | #161616 | ~292 | ~5250 | 416 |
| panel-body | 400 | 16 | 28 | 0 | #161616 | — | — | 363 |
| selector labels Headcount/City/Timeframe | 600 | 14 | 24 | 0 | #161616 | — | ~5264 | pills 210/241/210 |
| btn-label "Get my estimate" | 600 | 14 | 24 | 0 | #161616 | — | ~5264 | hug |

**Layout**
- band bg #F6FAFB. py 80. Stack gap 34 (title→tiers→panel). Title internal gaps 30/30.
- tier table @y~4792 h391: tag overlaps table top by 15px (mb-15, z2). Table h379, border-top 1px #E9E9E9, 3 equal cols (w~513, x = 230 / 743 / 1257), vertical dividers 1px #E9E9E9; col padding pt60 px60; internal stack gap 20; bullet list gap 10, 5px dots + 15 gap.
- estimate panel: bg #E9F1AB, radius 10, 1536×170, @~232,5217, content centered, gap 40; selector pills white bg r50 px30 py15 + chevron 19.26×7.2; CTA lime px40 py15 + arrow.
- DEVIATIONS: orange overlap tag; tier-1 eyebrow style (10/2.4) differs from tiers 2–3 (13/1.3); light-lime #E9F1AB panel is unique to this band.

## Furniture (478:1249, band y=5467)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "THE OTHER DOOR" (+dot) | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 5547 | hug |
| h2 "Need furniture only? Sorted." | 500 | 42 | 50 | 0 | #161616 | 230 | 5598 | nowrap |
| sub lead "4,000+ commercial-grade products in stock" | 400 | 16 | 28 | 0 | #161616 | 230 | 5678 | 745 |
| sub rest | 400 | 16 | 28 | 0 | #777 | — | — | — |
| btn-label "Shop all furniture" | 600 | 14 | 24 | 0 | #161616 | right →1770 | 5678 | hug |
| chip-label (Chairs, Desks, … ×9) | 400 | 14 | 24 | 0 | #161616 | 230+ | 5772 | hug |
| product-name | 400 | 13 | 1.5 | 0 | #161616 | img+17 | grid rows | 190 (h59 box) |
| product-price | 700 | 13 | 1.5 | 0 | #161616 | — | — | — |

**Layout**
- band bg white. py 80. Stack gap 30 throughout (header block internal gaps also 30).
- CTA btn: border 1px #E9E9E9 (NOT #161616 — lighter outline variant), r50, px40 py20 (h64).
- chips: 9 pills, gap 10, h48, px30 py15, border 1px #E9E9E9, r50, label 14/400.
- product grid @y~5850: 4 cols × 3 rows, gap-x 30, gap-y 20, col w~362; item = image 150×100 (aspect 3:2) + 17 gap + text w190; item h~100; grid h~340.
- DEVIATIONS: outline button uses #E9E9E9 border; 13px product typography (unique); chips row.

## People (478:1318, band y=6270)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| quote (card) | 400 | 16 | 28 | 0 | #000 | ~271 | ~6810 | 387 |
| quote-attr "George Graoroski — DigiDirect" | 600 | 16 | 28 | 0 | #000 | — | — | — |
| eyebrow "REAL PEOPLE" (+dot) | 600 | 10 | normal | 2.4px upper | #161616 | 1030 | 6350 | hug |
| h2 (2 lines) | 500 | 42 | 50 | 0 | #161616 | 1030 | 6416 | full |
| body (3 paras, blank middle line) | 400 | 16 | 28 | 0 | #777 | 1030 | 6561 | 561 |
| btn-label "Talk to Zac's team" | 600 | 16 | 1.3 | 0 | #161616 | 1030 | ~6900 | hug |

**Layout**
- band bg #F6FAFB. pt 80, NO bottom padding — left image runs to band bottom (touches Showrooms band). Two flex-1 cols gap 60 (w740 each, x230/x1030).
- image: 740×765 @230,6350, radius 20, FULL opacity (not washed like other bands).
- quote card: white 470×170, radius 20, px41 py30, drop-shadow 10px 10px 15px rgba(0,0,0,0.1), sits over image bottom-left, bottom offset 150 (py-150 on col → card y~6815).
- right stack gap 45: eyebrow → h2 → body → button → signature.
- button: lime #C6D644, h54, px40 py20, r50, label 16/600 (larger than standard 14) + arrow.
- signature image 160×50 below button.
- DEVIATIONS: full-opacity photo, floating shadowed quote card, 45px stack gap (vs 30), 16px button label, zero bottom padding.

## Showrooms (478:1897, band y=7115)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "COME SEE IT" (+dot) | 600 | 10 | normal | 2.4px upper | #161616 | 230 | 7210 | hug |
| h2 "Showrooms? Seven of them" | 500 | 50 | normal | 0 | #161616 | 230 | 7251 | full |
| row-city (Sydney City…) | 600 | 16 | 28 | 0 | #161616 | 240 | rows | 185 |
| row-address | 400 | 14 | 24 | 0 | #777 | — | — | 350 |
| pill "360º" | 700 | 14 | 24 | 0 | #161616 | — | — | hug |
| pill "Virtual walk-trough" | 400 | 14 | 24 | 0 | #777 | — | — | — |
| phone | 400 | 17 | normal | 0 | #161616 | — | — | 110 |

**Layout**
- band bg white. pt 80, pb 50, stack gap 35. Title block h146 with py15.
- H2 is 50px here (not the standard 42) — DEVIATION.
- content row @y7376: left rows col w1149 h650 + right image 371×630 (radius 20, photo opacity 0.20, x~1399), gap 20.
- 7 rows h90 each, py18, divider border-bottom 1px rgba(119,119,119,0.4); row 1 also border-top; row 1 inner content bg #F6FAFB with 10px left radius (highlighted first row — DEVIATION); inner pl10 pr20 py10, justify-between.
- 360 pill: white bg, 1px #161616 border, r42, px28 py16. arrow icon 20×11 at row end.
- Perth row pill omits Bold on "360ª" (typo/inconsistency in file).

## Final CTA (478:1961, band y=8076)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "NO OBLIGATION, NO RUNAROUND" (+dot) | 600 | 10 | normal | 2.4px upper | #FFF | ~290 | 8156 | hug |
| h2 "Tell us what you're planning." | 500 | 42 | 50 | 0 | #FFF | ~290 | 8197 | 403 (h146) |
| btn-label "Plan my fitout" | 600 | 16 | 28 | 0 | #161616 | ~290 | ~8363 | hug |
| note "Takes 60 seconds." | 400 | 14 | 24 | 0 | #F6FAFB | ~290 | ~8437 | full (h35) |
| note "No spam, no obligation" | 700 | 14 | 24 | 0 | #FFF | — | — | — |
| right-body (3 lines) | 400 | 16 | 28 | 0 | #FFF | ~1090 | ~8201 | 433 |
| phone-lead "Call" | 500 | 42 | 50 | 0 | #FFF | ~1090 | ~8315 | — |
| phone-num "1300 864 264" | 500 | 42 | 50 | 0 | #C6D644 | — | — | — |
| email "sales@jasonl.com.au • Prefer to see it first?" | 400 | 14 | 24 | 0 | #E5ECF0 | ~1090 | ~8395 | hug |
| link "Book a showroom visit" (+arrow 20×9) | 700 | 14 | 24 | 0 | #FFF | — | — | — |

**Layout**
- band bg #161616 (DARK). py 80. Two columns: left w400, right w620, declared gap 400 (row centered; total 1420 in 1540).
- left stack gap 20: eyebrow → h2 → button → note.
- button: lime #C6D644, h54, px 60 (wider than standard 40), py20, radius 42, label 16/600 + arrow 19.26×7.2.
- right col pt45 pb25 h321, stack gap 30: body → phone line → email row (gap 10 to arrow).
- DEVIATIONS: dark band; lime phone number at H2 scale; 16px button label + px60.

## Footer (478:1974, band y=8557)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| about body | 400 | 16 | 28 | 0 | #FFF | 230 | 8710 | 400 |
| reviews "4.8 on Google • 1,900+ reviews" | 400 | 14 | 27 | 0 | #FFF | 254 | ~8856 | hug |
| col-head FITOUTS / SHOP / COMPANY | 600 | 14 | normal | 2.8px upper | #FFF | 1030+ | 8637 | col |
| links (5 per col) | 400 | 16 | 46 | 0 | #FFF | 1030+ | 8677+ | col |

**Layout**
- band bg #161616, border-top 1px #777. py 80.
- col1 w400 @230 (h254): logo 140×43 → 30 gap → body → 30 gap → reviews row (star 14×13 + 10 gap).
- link block @x~1030: 3 equal flex cols justify-between across w740 (x ~1030 / ~1290 / ~1550), head→links gap 20, link line-height 46.
- gap between col1 and link block: 400.

## Global tokens

- Container: 1540 @ x230 (page 2000). Section padding rhythm: py 80 px 230 standard; hero pt60/pb80; stats pt100/pb80; showrooms pt80/pb50; people pt80/pb0.
- Eyebrow: Poppins SemiBold 10/normal, ls 2.4px, uppercase, preceded by 11px lime dot, gap 10, row h21. (Step/tier variants: lime-colored 10/2.4; tiers 2–3 use 13/1.3.)
- H1 (hero only): Medium 74/84. H2: Medium 42/50 (Showrooms: Medium 50/normal). H3/card: Medium 25/normal.
- Body: Regular 16/28 (#777 on light; #F6FAFB or #FFF on dark). Body small: Regular 14/24. Emphasis spans: SemiBold 600 #161616.
- Primary button: fill #C6D644, pill r50 (var 42), h54, px40 py20 (or py15), label SemiBold 14/24 #161616, arrow icon 19.26×7.195. Big variants (People, Final CTA): label 16, Final CTA px60.
- Secondary button: 1px #161616 border, white/transparent, same geometry. Light variant (Furniture): 1px #E9E9E9.
- Chips/pills: r50, px30 py15, h46–48; tag pill r24 px12 py5 (#FF9F17, white 12–13 SemiBold ls2 uppercase).
- Radii: images 20 (card-inner 8), cards 12, panels 8–10, buttons 42–50, tags 24.
- Colors: Black/ink #161616; Lime #C6D644; Panel lime #E9F1AB; Off-white (Lighter Catskill) #F6FAFB; Gray #777777; Dividers #E9E9E9; Orange #FF9F17; White #FFFFFF; dark-band stat border #555; dark-band text tints #E5ECF0, #C9CBB2; row dividers rgba(119,119,119,0.4).
- Image treatment: hero/interior/showrooms photos at opacity 0.20 over band bg; case-study cards 0.60; People image full opacity.
- Alternation: white → dark (#161616) → white → #F6FAFB → white → #F6FAFB → white → #F6FAFB → white → dark → dark(footer).
