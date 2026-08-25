# Recipe KI93 | Wording change & "Confirm" CTA (it3) | ALL | CRO-6614

- Convert project: 10041244 (DebtBusters > Main site, Start-new, ClearScore, Omni), account 1004973
- Experiment ID: **1004171970** (active, v10) — Variation 1 = 1004405818, Original = 1004405817
- Location 1004134514: JS condition `window.crotest_test_93_Hide_prefilled_form == 1` (flag set by Global JS)
- Audience 100412556: QA Medium | test | All (medium contains "Web")
- Global JS registry entry: Convert_GlobalJS/global_js_v2/DebtBusters  DB Client/Global.js (CRO-6614)
- Predecessor: TEST 91 / CRO-4781 (crp-dev-master/clients/debtbuster/clearscore/cro_4781)

Files here were extracted verbatim from the live CDN config on 2026-08-25
(cdn-4.convertexperiments.com/v1/js/1004973-10041244.js) — no local source existed before.

## QA URL
https://start.debtbusters.co.za/custom-landing-pages-debt-counselling-clear-score-landing?utm_source=ClearScore&utm_medium=Web&utm_campaign=Clear%20score&firstname=QATest&lastname=test&email=test43212%40gmail.com&phone=27783745001&id_number=8104105044087

Force Variation 1: append `&_conv_eforce=1004171970.1004405818`
Verbose Global JS logs: append `&cro_debug=1`

## Convert IDs → HubSpot hidden fields (added 2026-08-25, NOT yet in Convert)
The HubSpot form (portal 6315547, form 811cd376-e0d7-428f-87a9-1d66cd90883d) now carries hidden
fields `experiment_id` ("Experiment Id") and `variant_id` ("Variant Id") — Confluent's DB-tracking
fix that was missing when CRO-6604 was blocked. The live KI93 code never populated them, so this
local variation.js adds `populateConvertIds(doc)` (called once the iframe inputs exist) writing
`1004171970` / `1004405818` via the native value setter + input/change events. Paste variation.js
into Variation 1's custom JS in Convert to enable. Verify: console `[CRO] experiment_id: … | variant_id: …`
and, on a test submit, the HubSpot contact's Experiment Id / Variant Id properties.
