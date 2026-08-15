# JasonL Homepage — MOBILE Figma spec (frame 478:1991, 390px, content col 358, x margin 16)

File: 5JZZIzKcjO1Yzv2rCBszng "Temp - JasonL — Website 2026". All x/y absolute within the 390 screen frame. Font = Poppins unless noted. Weights: Light=300 Regular=400 Medium=500 SemiBold=600 Bold=700.

## Hero (478:2083, band y=163)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "Office fitouts, Australia-wide" | 600 | 12 | normal | 1.68 (uppercase) | #161616 | 16 | 203 | 358 |
| h1 "Beautiful fitouts in under 10 days." | 500 | 28 | 34 | 0 | #161616 | 16 | 239 | 358 |
| h1 accent "Easy. Fast!" | 700 | 28 | 34 | 0 | #161616, underline #C6D644 (thickness 6%) | — | — | — |
| sub (bold spans 600 #161616) | 400 | 13 | normal | 0 | #777 | 16 | 322 | 358 |
| btn-label "Shop furniture" | 600 | 15 | 19.5 (1.3) | 0 | #161616 | 16 | 417 | 358 |
| btn-label "Plan my fitout" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 486 | 358 |
| microcopy "Takes 60 seconds. / A real person…" (line 2 = 700) | 400 | 13 | normal | 0 | #161616, center | 16 | 555 | 358 |
| badge-label "3 installs happening today" ("3 installs"=600) | 500/400 | 13 | 16.9 | 0 | #161616 | in pill | ~863 | 238 pill |
| stat-line "4.8 Google reviews" ("4.8"=700 #161616) | 400 | 13 | 36 | 0 | #777 | 143 | 916 | 123 |
| stat-line "7 showrooms nationally" ("7"=700) | 400 | 13 | 36 | 0 | #777 | 118 | 947 | 154 |
| stat-line "Australian owned" | 400 | 13 | 36 | 0 | #777 | 138 | 978 | 114 |

**Layout**
- Band bg: white. Band frame sits x=4 w=382 with px 12 → content still x=16 abs, w=358.
- Padding: top 40 (163→203), bottom 40 (last row bottom 1014, band ends 1054).
- Gaps: eyebrow→h1 15; h1→sub 15; sub→buttons 15; btn→btn 15; buttons→microcopy 15; copy block→image 30; image→trust rows 15; trust rows stack on lh36 with -5 margin → 31px baseline steps.
- Buttons: both 358×54 (full-width), radius 50, px 40 py 20. Outline: 1px #161616, transparent fill. Primary: fill #C6D644 + arrow icon 19.26×7.2. Labels 15/600.
- Image: 358×276, radius 20, photo at opacity .20; content bottom-center, pb 20. Inside: white pill 238×38, radius 50, px 30 py 15, 11px lime circle icon + 13px label.
- Star icon 14×13 before "4.8" line.
- Order: eyebrow → h1 → sub → outline btn → primary btn → microcopy → image → 3 centered trust lines.

## Stats/proof band (478:2107, band y=1054) — dark

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| h2 "38 fitouts / completed / this week" | 500 | 28 | 34 | 0 | #F6FAFB; "38 fitouts" #C6D644; "this week" 300 italic | 16 | 1094 | 358 |
| body "Live from our project board…" | 400 | 13 | normal | 0 | #F6FAFB | 16 | 1211 | 358 |
| stat-num (981+ / 82% / 7 / <4) | 500 | 24 | normal (36 box) | 0 | #FFF | 31 / 217.5 | 1281 / 1372 | 156.5 |
| stat-label (2 lines) | 400 | 13 | normal | 0 | #FFF | 31 / 217.5 | 1317 / 1408 | 156.5 |
| logo-caption "1 day ago  •  Sydney" | 400 | 10 | normal | 0 | "1 day ago" #C6D644, rest #F6FAFB | centered per cell | 1563/1643/1728 | 99 |

**Layout**
- Band bg #161616 (full-bleed 390). px 16 py 40, stack gap 30.
- h2→body gap 15; body→stat grid 30.
- Stat grid: 2 cols × 2 rows, cell 171.5w, gap 15/15; each cell border-left 1px #555, padding-left 15; num above label (num box h36, label h40).
- Divider line: full 358w hairline at y=1478 (30 above/below).
- Client logos: 2-col × 3-row grid, gap 15/15, cells center-aligned; logo art 122×45 (variants 157×40, 156×40), caption 10px below with gap 10.
- Padding bottom 40 (last caption bottom 1743, band ends 1783).

## Notification strip (478:2145, band y=1828, h=85) — HIDDEN layer

What it is: a cream promo/notification banner (teaser for the Interior Design section — same "Want to elevate your space?" copy). It is **hidden in the comp** and overlaps the Fitouts band (y1828 inside Fitouts y1783–2544) → designed as an optional overlay/sticky strip, not in normal flow.

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| title "Want to elevate your space?" | 700 | 15 | 24 | 0 | #161616 | 16 | 1838.5 | 250 |
| sub "A dedicated designer makes all the difference." | 400 | 13 | normal | 0 | #161616 | 16 | 1862.5 | 250 |
| link "Find out more" | 700 | 13 | normal | 0 | #FF9F17, underline | 281 | 1860.5 | 92 |

**Layout**
- Bg #FFF7D6, full-bleed 390×85; px 16 py 10; inner row h 65, gap 15; text block w250 left, link right-aligned w92, vertically centered.

## How it works "Fitouts" (478:2152, band y=1783)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "HOW IT WORKS" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 1823 | 358 |
| h2 "Fitouts? Handled." | 500 | 28 | 35 | 0 | #161616 | 16 | 1859 | 243 |
| sub (2 lines) | 400 | 13 | normal | 0 | #777 | 16 | 1902 | 358 |
| step-eyebrow "DAY 0" etc | 600 | 12 | normal | 2.4 uppercase | #C6D644 | 16 / 202.5 | 1992 / 2140 | 171.5 |
| step-title "Chat & measure" etc | 600 | 14 | normal | 0 | #161616 | 16 / 202.5 | 2015 / 2163 | 171.5 |
| step-body | 400 | 12 | normal | 0 | #777 | 16 / 202.5 | 2044 / 2192 | 171.5 |
| panel copy "How is 10 days possible?…" (lead 600, rest 400) | 400 | 13 | normal | 0 | #161616, center | 36 | 2325 | 318 |
| btn-label "Start step 1 — book a free consult" | 600 | 15 | 19.5 | 0 | #161616 | 36 | 2420 | 318 |

**Layout**
- Band bg white, px 16 py 40, stack gap 30. Eyebrow row: 11px lime circle + gap 10, h 21.
- Title block: eyebrow→h2 gap 15, h2→sub gap 8; block has border-bottom 1px #DEDEDE with pb 20 (rule at y≈1962).
- Title→days grid 30. Days grid: 2×2, col 171.5, gap-x 15, gap-y 24; inside each: eyebrow(h18)→gap5→title(h21)→gap8→body(h72).
- Grid→panel 30. Panel "SUSTAINABLE": bg #EEF1F3, radius 10, 358w×209h, px 20 py 30, gap 15; centered copy then full-width (318×54) lime button, radius 42.
- Bottom padding 40 (panel bottom 2504, band ends 2544).

## Interior design (478:2182, band y=2544)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "INTERIOR DESIGN" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 2586.5 | 162 |
| tag "NEW" | 600 | 12 | 15.6 | 2 | #FFF on #FF9F17 | 205 | 2589 | 32 |
| h2 (4 lines "Want to elevate your space?…") | 500 | 28 | 34 | 0 | #161616 | 16 | 2625 | 358 |
| body | 400 | 13 | normal | 0 | #777 | 16 | 2776 | 358 |
| bullet (lead 600 #161616, rest 400 #777) | 400 | 13 | normal | 0 | #777 | 36 | 2871 / 2921 / 2951 | 338 |
| btn-label "Add a designer to my fitout" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 3006 | 358 |
| btn-label "Find out more" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 3075 | 358 |

**Layout**
- Band bg #F6FAFB, px 16 py 40, stack gap 30.
- Eyebrow row h26 incl. tag (tag r24, px 12 py 5). Gaps: eyebrow→h2 15; h2→body 15; body→list 15; list items gap 10 (dot 5px + gap 15 to text); list→buttons 15; primary→outline btn 15; buttons→image 30.
- Buttons: 358×54, radius 50, px 30 py 15; primary #C6D644 + arrow 19.26×7.2; secondary 1px #161616 outline.
- Image: 358×400, radius 20, photo opacity .20, content bottom-right pb 30 pr 30.
- Bottom padding 40 (image bottom 3559, band ends 3599).

## Case studies "Complete the setup" (478:2206, band y=3599)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "Complete the setup" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 3639 | 358 |
| h2 "Big or small, we've done one like yours." | 500 | 28 | 34 | 0 | #161616 | 16 | 3675 | 358 |
| sub (2 lines) | 400 | 13 | normal | 0 | #777 | 16 | 3758 | 358 |
| btn-label "All case studies" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 3813 | 358 |
| card chip "small business • 6 staff" | 600 | 13 | 16.9 | 0 | #161616 | in pill | ~3917 | 235 pill |
| card-title "Loftwork Studio" | 500 | 23 | 27.6 (1.2) | 0 | #161616 | card+20 | 4165 | 235 |
| card-meta "Sydney • 3 days" | 400 | 13 | 16.9 (1.3) | 0 | #777 | card+20 | 4200 | 235 |
| card-quote | 400 | 14 | 21 (1.5) | 0 | #161616 | card+20 | ~4250 | 235 |
| card-attr "Patrick Coghlan — CEO, CreditorWatch" | 600 | 14 | 21 | 0 | #161616 | card+20 | — | 235 |
| card-link "See the fitout" | 400 | 15 | 22.5 (1.5) | 0 | #161616 | card+20 | — | auto |

Card 3 variant drift (likely designer override, normalize to cards 1–2): title Hanken Grotesk 600 @28, quote 15, attr Bold 700 @15.

**Layout**
- Band bg white, px 16 py 40, stack gap 30. Title gaps 15 throughout (eyebrow→h2→sub→button).
- "All case studies" button: 358×54, radius 50, outline 1px #161616, + arrow.
- Card rail (horizontally scrolling): cards at x=16, 311, 606 → 275w cards, gap 20, rail box h 523; overflow off-screen.
- Card: bg white, radius 12. Image block 275×248, radius 8, photo opacity .5, p 20 with white pill chip (flex-1, h47, radius 50, 11px lime circle + 13/600 label). Content p 20, gap 15: title(h30)→gap5→meta(min-h35)→quote block→link. Link h30 with border-bottom 1px #C6D644, arrow 20×8, gap 10–20.
- Rail→scroll indicator 30: line 179×10 at x16 y4450 (scroll progress hint).
- Bottom padding 40 (band ends 4500).

## Pricing (478:2218, band y=4500)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "PRICING GUIDE" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 4540 | 358 |
| h2 "What does a fitout cost? / Roughly this." | 500 | 28 | 34 | 0 | #161616 | 16 | 4576 | 358 |
| sub | 400 | 13 | normal | 0 | #777 | 16 | 4659 | 358 |
| tag "MOST COMMON" | 600 | 13 | 16.9 | 2 uppercase | #FFF on #FF9F17 | 133 | 4754 | 124 |
| tier-eyebrow "JUST STARTING · 1–10 people" | 600 | 13 | normal | 1.3 uppercase | #161616 | 36 | 4791 / 5014 / 5257 | 318 |
| price "from ~$5k" / "from ~$12k" / "Let's talk" | 500 | 24 | 32 | 0 | #161616 | 36 | 4822 / 5045 / 5288 | 318 |
| tier-sub | 400 | 13 | normal | 0 | #777 | 36 | 4864 / 5087 / 5330 | 318 |
| bullet | 400 | 13 | normal (20 box) | 0 | #777 | 56 | from 4894 / 5117 / 5360 | 298 |

**Layout**
- Band bg #F6FAFB, px 16, pt 40 pb 30, stack gap 30. Title gaps 15.
- Tag pill: 148×27, radius 24, px 12 py 5, centered (x121); overlaps table top by 15 (tag y4749, table y4761) — negative margin.
- Table: full 358w; each tier row border-top 1px #E9E9E9 (wrapper adds an extra top rule → first row shows the double/rule at top). Tier 1 pt 30 pb 20 px 20 (h233); tiers 2–3 p 20 (h243 / h223).
- Tier internals: eyebrow(h21)→gap10→price(h32)→gap10→sub(h20)→gap10→bullets (20px rows, no gap; dot 5px + gap 15).
- No CTA button inside this band. Bottom padding 30 (table bottom 5460, band ends 5490).

## Estimator "Select" (478:2288, band y=5490)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| h3 "Want a sharper number?" | 600 | 18 | 23.4 (1.3) | 0 | #161616 | 16 | 5520 | 358 |
| body "Answer three quick questions…" | 400 | 13 | normal | 0 | #161616 | 16 | 5546 | 358 |
| select-label Headcount / City / Timeframe | 600 | 15 | 19.5 | 0 | #161616 | 46 | 5636 / 5700 / 5764 | 268.7 |
| btn-label "Get my estimate" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 5813 | 358 |

**Layout**
- Band bg #E9F1AB (pale lime), px 16, pt 30 pb 40.
- h3→body gap 3; text block→selectors gap 15.
- Selects: 3 white pills 358×49, radius 50, px 30 py 15, label left + chevron 19.3×7.2 right; stacked gap 15.
- CTA: 358×54, #C6D644, radius 50, + arrow. Gap above 15.
- Bottom padding 40 (CTA bottom 5867, band ends 5907).

## Furniture (478:2307, band y=5907)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "THE OTHER DOOR" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 5947 | 358 |
| h2 "Need furniture only? Sorted." | 500 | 28 | 34 | 0 | #161616 | 16 | 5983 | 358 |
| sub (lead 600 #161616 "4,000+ commercial-grade products in stock", rest 400 #777) | 400 | 13 | normal | 0 | #777 | 16 | 6066 | 358 |
| chip-label Chairs / Desks / … | 400 | 15 | 19.5 | 0 | #161616 | rail from 16 | 6156 | auto |
| product-name | 400 | 13 | 19.5 (1.5) | 0 | #161616 | 183 | 6245+ | 190 |
| product-price | 600 | 15 | 22.5 | 0 | #161616 | 183 | below name | 190 |
| btn-label "Shop all furniture" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 6690 | 358 |

**Layout**
- Band bg white, px 16 py 40, stack gap 30. Title gaps 15.
- Chip rail (horizontally scrolling): 9 chips, total w 1308, h 49; chip auto width (104–181), radius 50, border 1px #E9E9E9, px 30 py 15, gap 10.
- Rail→product list gap 20. Product rows: 4 visible (8 more hidden in file), row = thumb 150×100 (sq corners in comp) + gap 17 + text col 190w; rows stacked gap 15 (each 115 apart).
- List→button gap 20. Button: 358×56, radius 50, border 1px #E9E9E9, white fill, label 15/600 + arrow.
- Bottom padding 40 (button bottom 6746, band ends 6786).

## People "Real People" (478:2940, band y=6786)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "Real people" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 6826 | 358 |
| h2 "Delightful support from real people." | 500 | 28 | 34 | 0 | #161616 | 16 | 6862 | 358 |
| body (Zac paragraphs, 4 blocks) | 400 | 13 | normal | 0 | #777 | 16 | 6945 | 358 |
| quote ""When they came on day one…"" | 400 | 13 | normal | 0 | #000 | 46 | ~7440 | 298 |
| attr "George Graoroski — DigiDirect" | 600 | 13 | normal | 0 | #000 | 46 | below quote | 298 |
| btn-label "Talk to Zac's team" | 600 | 15 | 19.5 | 0 | #161616 | 16 | 7645 | 358 |

**Layout**
- Band bg #F6FAFB, py 40; band itself full-bleed — Title and Bottom blocks carry px 16, the photo is full-width 390.
- Title gaps 15 (eyebrow→h2→body). Title block→image gap 0.
- Image: 390×454 (aspect 390/455), full-bleed, content bottom, px 16 pb 30. Quote card inside: white, radius 20, p 30, w 358, drop-shadow 10px 10px 15px rgba(0,0,0,.1).
- Bottom block: signature image 160×50 centered (x115, y7580) → gap 15 → CTA 358×54 #C6D644 radius 50 + arrow.
- Bottom padding 40 (CTA bottom 7699, band ends 7739).

## Showrooms (478:2951, band y=7739)

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "come see it" | 600 | 12 | normal | 2.88 uppercase | #161616 | 16 | 7779 | 122 |
| h2 "Showrooms? / Seven of them" | 500 | 28 | 34 | 0 | #161616 | 16 | 7815 | 358 |
| sub | 400 | 13 | normal | 0 | **#6F7268** (not #777) | 16 | 7898 | 358 |
| row-title Sidney City / Western Sydney / Melbourne / Brisbane / Adelaide / Perth / Gold Coast | 600 | 15 | normal | 0 | #161616 | 16 | 8013 / 8227 / 8290 / 8353 / 8416 / 8479 / 8542 | 358 |
| address "2A/149 McCredie Rd, Smithfield NSW" | 400 | 13 | normal | 0 | #161616 | 16 | 8057 | 233 |
| phone "1300 350 624" | 600 | 13 | normal | 0 | #161616 | 16 | 8099 | 85 |
| link "SEE ON GOOGLE" | 600 | 12 | 15.6 (1.3) | 2 uppercase | #161616 | 16 | 8135 | 154.3 |

**Layout**
- Band bg white, pt 40, **pb 0** (accordion runs to band edge, 8585). Title block px 16, gaps 15; title→accordion 15.
- Accordion full-bleed 390w. Rows: px 16 py 20, border-bottom 1px #D9E0E7 (first row also border-top; wrapper adds 0.5px bottom rule). Closed row h 63, bg #F6FAFB; open row bg white, h 214.
- Chevron: 10px square with 2px #777 right/bottom borders, rotate 45° (down) / -135° (up when open), in 14.14px box, right-aligned.
- Open panel: py 16; address→phone gap 22; →"SEE ON GOOGLE" gap 16 — link is border-bottom 1px #C6D644, w 154.3 h 36 (py 10), label + arrow 19.26×7.2 justified space-between. (A hidden "360° virtual walk-through" button exists below it in the file.)

## Final CTA (478:2993, band y=8585) — dark

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| eyebrow "No obligation, no runaround" | 600 | 12 | normal | 0.48 uppercase | #FFF | 79.5 | 8625 | 231 |
| h2 "Tell us what you're planning." | 500 | 28 | 34 | 0 | #FFF, center | 16 | 8661 | 358 |
| btn-label "Plan my fitout" | 600 | 15 | normal | 0 | #161616 | in pill | 8749 | 255 pill |
| microcopy "Takes 60 seconds." + "No spam, no obligation" (bold span) | 400/700 | 13 | 20 | 0 | #F6FAFB / #FFF — font is **Inter** in comp (normalize to Poppins) | 16 | 8808 | 358 |
| reassurance "JasonL team will come back within 2 business hours…" | 400 | 12 | normal | 0 | #FFF, center | 16 | 8848 | 358 |
| phone "Call 1300 864 264" | 600 | 20 | 36 | 0 | "Call" #FFF, number #C6D644 | 16 | 8917 | 358 |
| email line "sales@jasonl.com.au • Prefer to see it first?" | 400 | 13 | normal | 0 | #E5ECF0 | 16 | 8968 | 358 |
| link "Book a showroom visit" | 700 | 13 | normal | 0 | #FFF | 109.5 | 8993 | 151 |

**Layout**
- Band bg #161616, px 16 py 40, all centered.
- Eyebrow (11px lime circle + gap 10) → h2 gap 15. Column gaps 20.
- CTA pill: auto-width 255.3×54 (px 60 py 20), #C6D644, radius 42, + arrow; NOT full-width here. CTA→microcopy gap 5.
- Microcopy→reassurance 20; reassurance→phone 15; phone→email 15; email→link 5. Link arrow 20×9 after text.
- Bottom padding 40 (link bottom 9013, band ends 9053).

## Footer (478:3010, band y=9053) — dark

**Text**
| element | weight | size px | line-height px | letter-spacing | color | abs x | abs y | w |
|---|---|---|---|---|---|---|---|---|
| blurb "JasonL® is Australian owned…" | 400 | 13 | normal | 0 | #FFF, center | 16 | 9147 | 358 |
| reviews "4.8 on Google • 1,900+ reviews" | 400 | 12 | 27 | 0 | #FFF | 113 | 9242 | 186 |
| menu-title FITOUTS / SHOP / Company | 600 | 14 | normal | 2.8 uppercase | #FFF | 16 | 9300 / 9337 / 9374 | 358 |

**Layout**
- Band bg #161616, border-top 1px #3D3D3D, px 16, pt 40 pb 30, stack gap 15.
- Column 1 centered: logo SVG 125×39 → gap 15 → blurb → gap 15 → reviews row (star 14×13 + gap 8 + text).
- Menu: border-top 0.5px #E9E9E9, pt 16, rows gap 16 (21h headers, 37 apart); each header row = uppercase title + white chevron (10px, 2px borders, rotate 45) space-between — accordion (expanded link lists exist but hidden).
- Band ends 9425 (frame bottom); pad under last header ≈ 30.

## Global tokens (mobile)

- **Container**: viewport 390; content column 358; x margin 16. Full-bleed bands: Stats, Notification, Real People photo, Showrooms accordion rows, Final CTA, Footer (inner content still 16px inset).
- **Section rhythm**: pt 40 / pb 40 standard (exceptions: Pricing pb 30, Select pt 30, Showrooms pb 0, Footer pb 30, Notification py 10). Main stack gap inside a band: 30. Title-block internal gaps: 15 (h2→sub sometimes 8).
- **Eyebrow**: Poppins 600, 12px, uppercase, ls 2.88 (24%), 11px lime circle marker + gap 10, row h 21. Variants: hero ls 1.68, Final CTA ls 0.48.
- **H2**: Poppins 500, 28px, lh 34 (one instance 35), #161616 light bands / #FFF–#F6FAFB dark bands. Accent spans: 700 + underline #C6D644, or color #C6D644, or 300 italic.
- **Body/sub**: Poppins 400, 13px, lh normal (~20), #777 on light (#6F7268 in Showrooms), #F6FAFB/#FFF on dark. Emph spans 600 #161616.
- **Buttons**: pill radius 50 (token 42 on "Round Big"), h 54 (56 Furniture, 49 selects, 47 chip, 38 hero badge), label Poppins 600 15 lh 1.3, arrow 19.26×7.2. Primary #C6D644 / text #161616; secondary outline 1px #161616; tertiary outline 1px #E9E9E9. Full-width (358) in all bands except Final CTA (auto, px 60).
- **Text links**: border-bottom 1px #C6D644 + arrow (20×8 or 19.26×7.2); 15/400 (cards) or 12/600 ls2 uppercase (showrooms).
- **Tag pill**: #FF9F17, radius 24, px 12 py 5, label 600 12–13 ls 2 white uppercase.
- **Card/panel radii**: images 20, cards 12, card-images 8, panels 10, quote card 20.
- **Hexes**: ink #161616; gray #777777; alt-gray #6F7268; lime #C6D644; pale-lime #E9F1AB; catskill #F6FAFB; subtle-panel #EEF1F3; divider #E9E9E9; divider-alt #D9E0E7; rule-on-dark #555 / #3D3D3D; title-rule #DEDEDE; orange #FF9F17; cream #FFF7D6; white #FFFFFF; footer-muted #E5ECF0.
- **Grids**: 2-col everywhere it stacks — stats 2×2 (cells 171.5, gap 15, border-left #555 + pl 15), logos 2×3 (gap 15), how-it-works days 2×2 (gap-x 15 gap-y 24).
- **Rails (overflow-x)**: case-study cards (275w, gap 20, + 179×10 scroll indicator) and furniture chips (9 chips, 1308 total). Product "Item table" is vertical, not a rail.
