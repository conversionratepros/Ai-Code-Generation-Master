# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: clp-qa.test.js >> Step 1 — Baseline (script ON, no Global JS) >> [skincare] tiles are visible and clickable
- Location: clp-qa.test.js:289:9

# Error details

```
Error: CLICK BLOCKED on skincare: [{"tile":"https://www.arcstore.co.za/products/t-l-c-glycolic-body-lotion/240ml","blocker":{"tag":"DIV","class":"content-container  dw-mod","zIndex":"auto"}}]

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - link "Logo" [ref=e8] [cursor=pointer]:
          - /url: /
          - img "Logo" [ref=e9]
        - generic [ref=e11]:
          - generic:
            - img
          - generic [ref=e12]:
            - searchbox "Find it here" [ref=e13]
            - list
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Book now" [ref=e18] [cursor=pointer]:
              - /url: /arc-studio
          - listitem [ref=e19]:
            - generic "Log in" [ref=e21] [cursor=pointer]: 
            - text:    
          - listitem [ref=e22]:
            - link " 0" [ref=e23] [cursor=pointer]:
              - /url: /arc/arc-checkout?Purge=True
              - generic [ref=e24]:
                - generic [ref=e25]: 
                - generic [ref=e27]: "0"
      - navigation [ref=e28]:
        - list [ref=e32]:
          - listitem [ref=e33]:
            - link "New" [ref=e34] [cursor=pointer]:
              - /url: /new-in
          - listitem [ref=e35]:
            - link "Brands" [ref=e36] [cursor=pointer]:
              - /url: /brands
          - listitem [ref=e37]:
            - link "Makeup" [ref=e38] [cursor=pointer]:
              - /url: /makeup
          - listitem [ref=e39]:
            - link "Fragrance" [ref=e40] [cursor=pointer]:
              - /url: /fragrance
          - listitem [ref=e41]:
            - link "Skincare" [ref=e42] [cursor=pointer]:
              - /url: /skincare
          - listitem [ref=e43]:
            - link "Body" [ref=e44] [cursor=pointer]:
              - /url: /body
          - listitem [ref=e45]:
            - link "Electrical" [ref=e46] [cursor=pointer]:
              - /url: /electrical
          - listitem [ref=e47]:
            - link "Haircare" [ref=e48] [cursor=pointer]:
              - /url: /haircare
          - listitem [ref=e49]:
            - link "Accessories" [ref=e50] [cursor=pointer]:
              - /url: /accessories
          - listitem [ref=e51]:
            - link "Offers" [ref=e52] [cursor=pointer]:
              - /url: /offers
          - listitem [ref=e53]:
            - link "Stores" [ref=e54] [cursor=pointer]:
              - /url: /our-stores
    - generic [ref=e56]:
      - generic [ref=e63]:
        - heading [level=2]
        - heading "Skincare" [level=1] [ref=e64]
        - paragraph [ref=e65]:
          - generic [ref=e66]:
            - text: The task is simple; spoil yourself with the world's most-coveted beauty skincare brands and products with celebrity status. From
            - link "Shiseido," [ref=e67] [cursor=pointer]:
              - /url: /brands/shiseido
            - link "La Mer," [ref=e68] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/Default.aspx?Id=9825
            - text: and more. Our collection embodies a harmonious blend of nature's finest botanicals and cutting-edge technology, delivering transformative results that transcend mere skincare. Elevate your beauty routine to an art form, as each luxurious potion caresses your skin, leaving behind a luminous trail of rejuvenation and vitality.
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link [ref=e78] [cursor=pointer]:
              - /url: /products/nourishing-3-step-routine-revitalise-plump-restore
            - generic [ref=e79]:
              - link "nourishing | 3-step routine | revitalise, plump + restore" [ref=e81] [cursor=pointer]:
                - /url: /products/nourishing-3-step-routine-revitalise-plump-restore
                - img "nourishing | 3-step routine | revitalise, plump + restore" [ref=e82]
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - link [ref=e85] [cursor=pointer]:
                    - /url: /products/nourishing-3-step-routine-revitalise-plump-restore
                  - heading "lelive." [level=6] [ref=e86]
                - generic [ref=e87]:
                  - link [ref=e88] [cursor=pointer]:
                    - /url: /products/nourishing-3-step-routine-revitalise-plump-restore
                  - heading "nourishing | 3-step routine | revitalise, plump + restore" [level=6] [ref=e89]
                - generic [ref=e90]:
                  - link [ref=e91] [cursor=pointer]:
                    - /url: /products/nourishing-3-step-routine-revitalise-plump-restore
                  - heading "R933,00" [level=6] [ref=e92]:
                    - generic [ref=e93]: R933,00
            - button "Add to bag" [ref=e94] [cursor=pointer]
          - generic [ref=e95]:
            - link [ref=e96] [cursor=pointer]:
              - /url: /products/dark-spot-correcting-glow-serum-mini/5ml
            - generic [ref=e97]:
              - link "Dark Spot Correcting Glow Serum Mini" [ref=e99] [cursor=pointer]:
                - /url: /products/dark-spot-correcting-glow-serum-mini/5ml
                - img "Dark Spot Correcting Glow Serum Mini" [ref=e100]
              - generic [ref=e101]:
                - generic [ref=e102]:
                  - link [ref=e103] [cursor=pointer]:
                    - /url: /products/dark-spot-correcting-glow-serum-mini/5ml
                  - heading "Axis-Y" [level=6] [ref=e104]
                - generic [ref=e105]:
                  - link [ref=e106] [cursor=pointer]:
                    - /url: /products/dark-spot-correcting-glow-serum-mini/5ml
                  - heading "Dark Spot Correcting Glow Serum Mini" [level=6] [ref=e107]
                - generic [ref=e108]:
                  - link [ref=e109] [cursor=pointer]:
                    - /url: /products/dark-spot-correcting-glow-serum-mini/5ml
                  - heading "R129,00" [level=6] [ref=e110]:
                    - generic [ref=e111]: R129,00
                - generic [ref=e115]: 1 Size
            - button "Add to bag" [ref=e116] [cursor=pointer]
          - generic [ref=e117]:
            - link [ref=e118] [cursor=pointer]:
              - /url: /products/capture-ox-c-treatment-serum/50ml
            - generic [ref=e119]:
              - link "Capture OX-C Treatment Serum" [ref=e121] [cursor=pointer]:
                - /url: /products/capture-ox-c-treatment-serum/50ml
                - img "Capture OX-C Treatment Serum" [ref=e122]
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - link [ref=e125] [cursor=pointer]:
                    - /url: /products/capture-ox-c-treatment-serum/50ml
                  - heading "DIOR" [level=6] [ref=e126]
                - generic [ref=e127]:
                  - link [ref=e128] [cursor=pointer]:
                    - /url: /products/capture-ox-c-treatment-serum/50ml
                  - heading "Capture OX-C Treatment Serum" [level=6] [ref=e129]
                - generic [ref=e130]:
                  - link [ref=e131] [cursor=pointer]:
                    - /url: /products/capture-ox-c-treatment-serum/50ml
                  - heading "R4 085,00" [level=6] [ref=e132]:
                    - generic [ref=e133]: R4 085,00
                - generic [ref=e137]: 2 Sizes
            - button "Add to bag" [ref=e138] [cursor=pointer]
          - generic [ref=e139]:
            - link [ref=e140] [cursor=pointer]:
              - /url: /products/10-niacinamide-booster/20ml
            - generic [ref=e141]:
              - generic [ref=e142]:
                - generic [ref=e144]: Only at ARC
                - link "10% Niacinamide Booster" [ref=e145] [cursor=pointer]:
                  - /url: /products/10-niacinamide-booster/20ml
                  - img "10% Niacinamide Booster" [ref=e146]
              - generic [ref=e147]:
                - generic [ref=e148]:
                  - link [ref=e149] [cursor=pointer]:
                    - /url: /products/10-niacinamide-booster/20ml
                  - heading "Paula's Choice" [level=6] [ref=e150]
                - generic [ref=e151]:
                  - link [ref=e152] [cursor=pointer]:
                    - /url: /products/10-niacinamide-booster/20ml
                  - heading "10% Niacinamide Booster" [level=6] [ref=e153]
                - generic [ref=e154]:
                  - link [ref=e155] [cursor=pointer]:
                    - /url: /products/10-niacinamide-booster/20ml
                  - heading "R1 180,00" [level=6] [ref=e156]:
                    - generic [ref=e157]: R1 180,00
                - generic [ref=e161]: 1 Size
            - button "Add to bag" [ref=e162] [cursor=pointer]
          - generic [ref=e163]:
            - link [ref=e164] [cursor=pointer]:
              - /url: /products/goat-milk-cleanser/120ml
            - generic [ref=e165]:
              - generic [ref=e166]:
                - generic [ref=e168]: Only at ARC
                - link "Goat Milk Cleanser" [ref=e169] [cursor=pointer]:
                  - /url: /products/goat-milk-cleanser/120ml
                  - img "Goat Milk Cleanser" [ref=e170]
              - generic [ref=e171]:
                - generic [ref=e172]:
                  - link [ref=e173] [cursor=pointer]:
                    - /url: /products/goat-milk-cleanser/120ml
                  - heading "Kate Somerville" [level=6] [ref=e174]
                - generic [ref=e175]:
                  - link [ref=e176] [cursor=pointer]:
                    - /url: /products/goat-milk-cleanser/120ml
                  - heading "Goat Milk Cleanser" [level=6] [ref=e177]
                - generic [ref=e178]:
                  - link [ref=e179] [cursor=pointer]:
                    - /url: /products/goat-milk-cleanser/120ml
                  - heading "R1 035,00" [level=6] [ref=e180]:
                    - generic [ref=e181]: R1 035,00
                - generic [ref=e185]: 1 Size
            - button "Add to bag" [ref=e186] [cursor=pointer]
          - generic [ref=e187]:
            - link [ref=e188] [cursor=pointer]:
              - /url: /products/t-l-c-glycolic-body-lotion/240ml
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e192]: Only at ARC
                - link "T.L.C. Glycolic Body Lotion" [ref=e193] [cursor=pointer]:
                  - /url: /products/t-l-c-glycolic-body-lotion/240ml
                  - img "T.L.C. Glycolic Body Lotion" [ref=e194]
              - generic [ref=e195]:
                - generic [ref=e196]:
                  - link [ref=e197] [cursor=pointer]:
                    - /url: /products/t-l-c-glycolic-body-lotion/240ml
                  - heading "Drunk Elephant" [level=6] [ref=e198]
                - generic [ref=e199]:
                  - link [ref=e200] [cursor=pointer]:
                    - /url: /products/t-l-c-glycolic-body-lotion/240ml
                  - heading "T.L.C. Glycolic Body Lotion" [level=6] [ref=e201]
                - generic [ref=e202]:
                  - link [ref=e203] [cursor=pointer]:
                    - /url: /products/t-l-c-glycolic-body-lotion/240ml
                  - heading "R940,00" [level=6] [ref=e204]:
                    - generic [ref=e205]: R940,00
                - generic [ref=e209]: 1 Size
            - button "Add to bag" [ref=e210] [cursor=pointer]
        - generic:
          - generic [ref=e211] [cursor=pointer]: 
          - generic [ref=e212] [cursor=pointer]: 
      - generic [ref=e214]:
        - heading "Shop all Skincare" [level=1] [ref=e218]
        - 'heading "Shop by Category: Eye Care | Skin Giftsets | Masks | Moisturiser | Sun Care | Treatments and Serums | Wellness | Mini" [level=3] [ref=e222]':
          - text: "Shop by Category:"
          - link:
            - /url: /skincare/cleanser
          - generic [ref=e223]:
            - link "Eye Care" [ref=e224] [cursor=pointer]:
              - /url: /skincare/eye-care
            - generic [ref=e225]: "|"
            - link:
              - /url: /skincare/moisturiser
            - link "Skin Giftsets" [ref=e226] [cursor=pointer]:
              - /url: /skincare/skin-giftsets
            - generic [ref=e227]: "|"
            - link:
              - /url: /skincare/treatments-and-serums
            - link "Masks" [ref=e228] [cursor=pointer]:
              - /url: /skincare/masks
            - generic [ref=e229]: "|"
            - link:
              - /url: https://www.arcstore.co.za/makeup/eyelashes
            - link:
              - /url: /skincare/eye-treatments
            - link "Moisturiser" [ref=e230] [cursor=pointer]:
              - /url: /skincare/moisturiser
            - text: "|"
            - link "Sun Care" [ref=e231] [cursor=pointer]:
              - /url: /skincare/sun-care
            - text: "|"
            - link "Treatments and Serums" [ref=e232] [cursor=pointer]:
              - /url: /skincare/treatments-and-serums
            - text: "|"
            - link "Wellness" [ref=e233] [cursor=pointer]:
              - /url: /arc/skincare/wellness
            - text: "|"
            - link "Mini" [ref=e234] [cursor=pointer]:
              - /url: /skincare/minis
      - generic [ref=e241]:
        - generic [ref=e243]:
          - heading "Products(1053)" [level=2] [ref=e245]
          - generic [ref=e249] [cursor=pointer]: Default Sorting 
        - generic [ref=e251]:
          - generic [ref=e253] [cursor=pointer]: Brand 
          - generic [ref=e255] [cursor=pointer]: Category 
          - generic [ref=e257] [cursor=pointer]: Sub Category 
          - generic [ref=e259] [cursor=pointer]: Skin Type 
          - generic [ref=e261] [cursor=pointer]: Form 
          - generic [ref=e263] [cursor=pointer]: Benefit 
          - generic [ref=e265] [cursor=pointer]: Skin Concern 
          - generic [ref=e267] [cursor=pointer]: Ingredient Preferences 
          - generic [ref=e269] [cursor=pointer]: I want to spend 
          - generic [ref=e271] [cursor=pointer]: Key Ingredients 
        - generic [ref=e272]:
          - generic [ref=e273]:
            - generic [ref=e275]:
              - link "Special Soap Free Cleansing Gel, 50ML" [ref=e277] [cursor=pointer]:
                - /url: /products/brand/dermalogica/special-soap-free-cleansing-gel
                - img "Special Soap Free Cleansing Gel, 50ML" [ref=e278]
              - generic [ref=e279]:
                - link "Dermalogica" [ref=e281] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/special-soap-free-cleansing-gel
                  - heading "Dermalogica" [level=6] [ref=e282]
                - link "Special Soap Free Cleansing Gel" [ref=e284] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/special-soap-free-cleansing-gel
                  - heading "Special Soap Free Cleansing Gel" [level=6] [ref=e285]
                - heading "R329,00 - R1 449,00" [level=6] [ref=e287]:
                  - generic [ref=e288]: R329,00 - R1 449,00
                - generic [ref=e292]: 3 Sizes
              - button "Add to bag" [ref=e294] [cursor=pointer]
            - generic [ref=e296]:
              - link "Precleanse, 150MLV01" [ref=e298] [cursor=pointer]:
                - /url: /products/brand/dermalogica/precleanse
                - img "Precleanse, 150MLV01" [ref=e299]
              - generic [ref=e300]:
                - link "Dermalogica" [ref=e302] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/precleanse
                  - heading "Dermalogica" [level=6] [ref=e303]
                - link "Precleanse" [ref=e305] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/precleanse
                  - heading "Precleanse" [level=6] [ref=e306]
                - heading "R349,00 - R1 039,00" [level=6] [ref=e308]:
                  - generic [ref=e309]: R349,00 - R1 039,00
                - generic [ref=e313]: 2 Sizes
              - button "Add to bag" [ref=e315] [cursor=pointer]
            - link [ref=e317] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/products/le-male-in-blue-eau-de-parfum/125ml
              - img [ref=e318]
            - generic [ref=e320]:
              - link "Pro Collagen Marine Oil, 15ML" [ref=e322] [cursor=pointer]:
                - /url: /products/brand/elemis/pro-collagen-marine-oil
                - img "Pro Collagen Marine Oil, 15ML" [ref=e323]
              - generic [ref=e324]:
                - link "ELEMIS" [ref=e326] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-oil
                  - heading "ELEMIS" [level=6] [ref=e327]
                - link "Pro Collagen Marine Oil" [ref=e329] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-oil
                  - heading "Pro Collagen Marine Oil" [level=6] [ref=e330]
                - heading "R1 690,00" [level=6] [ref=e332]:
                  - generic [ref=e333]: R1 690,00
                - generic [ref=e337]: 1 Size
              - link "Out of stock online" [ref=e339] [cursor=pointer]:
                - /url: /products/brand/elemis/pro-collagen-marine-oil
            - generic [ref=e341]:
              - link "Pro Collagen Cleansing Balm, 105G" [ref=e343] [cursor=pointer]:
                - /url: /products/brand/elemis/pro-collagen-cleansing-balm-1
                - img "Pro Collagen Cleansing Balm, 105G" [ref=e344]
              - generic [ref=e345]:
                - link "ELEMIS" [ref=e347] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-cleansing-balm-1
                  - heading "ELEMIS" [level=6] [ref=e348]
                - link "Pro Collagen Cleansing Balm" [ref=e350] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-cleansing-balm-1
                  - heading "Pro Collagen Cleansing Balm" [level=6] [ref=e351]
                - heading "R1 225,00" [level=6] [ref=e353]:
                  - generic [ref=e354]: R1 225,00
                - generic [ref=e358]: 1 Size
              - button "Add to bag" [ref=e360] [cursor=pointer]
            - link [ref=e362] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/arc-birthday
              - img [ref=e363]
            - generic [ref=e365]:
              - link "Pro Collagen Rose Facial Oil, 15MLV05" [ref=e367] [cursor=pointer]:
                - /url: /products/brand/elemis/pro-collagen-rose-facial-oil
                - img "Pro Collagen Rose Facial Oil, 15MLV05" [ref=e368]
              - generic [ref=e369]:
                - link "ELEMIS" [ref=e371] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-rose-facial-oil
                  - heading "ELEMIS" [level=6] [ref=e372]
                - link "Pro Collagen Rose Facial Oil" [ref=e374] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-rose-facial-oil
                  - heading "Pro Collagen Rose Facial Oil" [level=6] [ref=e375]
                - heading "R1 775,00" [level=6] [ref=e377]:
                  - generic [ref=e378]: R1 775,00
                - generic [ref=e382]: 1 Size
              - button "Add to bag" [ref=e384] [cursor=pointer]
            - link [ref=e386] [cursor=pointer]:
              - /url: Default.aspx?Id=13601
              - img [ref=e387]
            - generic [ref=e389]:
              - link "Dynamic Resurfacing Facial Pads, A01" [ref=e391] [cursor=pointer]:
                - /url: /products/brand/elemis/dynamic-resurfacing-facial-pads
                - img "Dynamic Resurfacing Facial Pads, A01" [ref=e392]
              - generic [ref=e393]:
                - link "ELEMIS" [ref=e395] [cursor=pointer]:
                  - /url: /products/brand/elemis/dynamic-resurfacing-facial-pads
                  - heading "ELEMIS" [level=6] [ref=e396]
                - link "Dynamic Resurfacing Facial Pads" [ref=e398] [cursor=pointer]:
                  - /url: /products/brand/elemis/dynamic-resurfacing-facial-pads
                  - heading "Dynamic Resurfacing Facial Pads" [level=6] [ref=e399]
                - heading "R1 145,00" [level=6] [ref=e401]:
                  - generic [ref=e402]: R1 145,00
                - generic [ref=e406]: 1 Size
              - button "Add to bag" [ref=e408] [cursor=pointer]
            - generic [ref=e410]:
              - generic [ref=e411]:
                - link "Age Smart Dynamic Skin Recovery SPF 50, 50MLV01" [ref=e412] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-dynamic-skin-recovery-spf-50
                  - img "Age Smart Dynamic Skin Recovery SPF 50, 50MLV01" [ref=e413]
                - generic [ref=e415]: Treat
              - generic [ref=e416]:
                - link "Dermalogica" [ref=e418] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-dynamic-skin-recovery-spf-50
                  - heading "Dermalogica" [level=6] [ref=e419]
                - link "Age Smart Dynamic Skin Recovery SPF 50" [ref=e421] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-dynamic-skin-recovery-spf-50
                  - heading "Age Smart Dynamic Skin Recovery SPF 50" [level=6] [ref=e422]
                - heading "R1 479,20 R1 849,00" [level=6] [ref=e424]:
                  - generic [ref=e425]: R1 479,20
                  - generic [ref=e426]: R1 849,00
                - generic [ref=e430]: 1 Size
              - button "Add to bag" [ref=e432] [cursor=pointer]
            - generic [ref=e434]:
              - generic [ref=e435]:
                - link "Age Smart Bio Lumin-C Serum, 30MLV01" [ref=e436] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-bio-lumin-c-serum
                  - img "Age Smart Bio Lumin-C Serum, 30MLV01" [ref=e437]
                - generic [ref=e439]: Treat
              - generic [ref=e440]:
                - link "Dermalogica" [ref=e442] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-bio-lumin-c-serum
                  - heading "Dermalogica" [level=6] [ref=e443]
                - link "Age Smart Bio Lumin-C Serum" [ref=e445] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-bio-lumin-c-serum
                  - heading "Age Smart Bio Lumin-C Serum" [level=6] [ref=e446]
                - heading "R1 759,20 R2 199,00" [level=6] [ref=e448]:
                  - generic [ref=e449]: R1 759,20
                  - generic [ref=e450]: R2 199,00
                - generic [ref=e454]: 1 Size
              - button "Add to bag" [ref=e456] [cursor=pointer]
            - generic [ref=e458]:
              - link "Ultracalming Calm Water Gel, 50MLV01" [ref=e460] [cursor=pointer]:
                - /url: /products/brand/dermalogica/ultracalming-calm-water-gel
                - img "Ultracalming Calm Water Gel, 50MLV01" [ref=e461]
              - generic [ref=e462]:
                - link "Dermalogica" [ref=e464] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/ultracalming-calm-water-gel
                  - heading "Dermalogica" [level=6] [ref=e465]
                - link "Ultracalming Calm Water Gel" [ref=e467] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/ultracalming-calm-water-gel
                  - heading "Ultracalming Calm Water Gel" [level=6] [ref=e468]
                - heading "R1 279,00" [level=6] [ref=e470]:
                  - generic [ref=e471]: R1 279,00
                - generic [ref=e475]: 1 Size
              - button "Add to bag" [ref=e477] [cursor=pointer]
            - generic [ref=e479]:
              - link "Clear Start Blackhead Clearing Fizz Mask, 50MLV03" [ref=e481] [cursor=pointer]:
                - /url: /products/brand/dermalogica/clear-start-blackhead-clearing-fizz-mask
                - img "Clear Start Blackhead Clearing Fizz Mask, 50MLV03" [ref=e482]
              - generic [ref=e483]:
                - link "Dermalogica" [ref=e485] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/clear-start-blackhead-clearing-fizz-mask
                  - heading "Dermalogica" [level=6] [ref=e486]
                - link "Clear Start Blackhead Clearing Fizz Mask" [ref=e488] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/clear-start-blackhead-clearing-fizz-mask
                  - heading "Clear Start Blackhead Clearing Fizz Mask" [level=6] [ref=e489]
                - heading "R499,00" [level=6] [ref=e491]:
                  - generic [ref=e492]: R499,00
                - generic [ref=e496]: 1 Size
              - button "Add to bag" [ref=e498] [cursor=pointer]
            - link [ref=e500] [cursor=pointer]:
              - /url: Default.aspx?Id=14919
              - img [ref=e501]
            - generic [ref=e503]:
              - link "Pro Collagen Marine Cream For Men, 30ML" [ref=e505] [cursor=pointer]:
                - /url: /products/brand/elemis/pro-collagen-marine-cream-for-men
                - img "Pro Collagen Marine Cream For Men, 30ML" [ref=e506]
              - generic [ref=e507]:
                - link "ELEMIS" [ref=e509] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-cream-for-men
                  - heading "ELEMIS" [level=6] [ref=e510]
                - link "Pro Collagen Marine Cream For Men" [ref=e512] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-cream-for-men
                  - heading "Pro Collagen Marine Cream For Men" [level=6] [ref=e513]
                - heading "R1 580,00" [level=6] [ref=e515]:
                  - generic [ref=e516]: R1 580,00
                - generic [ref=e520]: 1 Size
              - button "Add to bag" [ref=e522] [cursor=pointer]
            - generic [ref=e524]:
              - generic [ref=e525]:
                - link "Pro Collagen Marine Cream, 50ML" [ref=e526] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-cream
                  - img "Pro Collagen Marine Cream, 50ML" [ref=e527]
                - generic [ref=e529]: Treat
              - generic [ref=e530]:
                - link "ELEMIS" [ref=e532] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-cream
                  - heading "ELEMIS" [level=6] [ref=e533]
                - link "Pro Collagen Marine Cream" [ref=e535] [cursor=pointer]:
                  - /url: /products/brand/elemis/pro-collagen-marine-cream
                  - heading "Pro Collagen Marine Cream" [level=6] [ref=e536]
                - heading "R1 896,00 R2 370,00" [level=6] [ref=e538]:
                  - generic [ref=e539]: R1 896,00
                  - generic [ref=e540]: R2 370,00
                - generic [ref=e544]: 1 Size
              - button "Add to bag" [ref=e546] [cursor=pointer]
            - generic [ref=e548]:
              - generic [ref=e549]:
                - link "Age Smart Daily Superfoliant, 57G" [ref=e550] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-daily-superfoliant
                  - img "Age Smart Daily Superfoliant, 57G" [ref=e551]
                - generic [ref=e553]: Limited-edition
              - generic [ref=e554]:
                - link "Dermalogica" [ref=e556] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-daily-superfoliant
                  - heading "Dermalogica" [level=6] [ref=e557]
                - link "Age Smart Daily Superfoliant" [ref=e559] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/age-smart-daily-superfoliant
                  - heading "Age Smart Daily Superfoliant" [level=6] [ref=e560]
                - heading "R449,00 - R1 649,00" [level=6] [ref=e562]:
                  - generic [ref=e563]: R449,00 - R1 649,00
                - generic [ref=e567]: 2 Sizes
              - button "Add to bag" [ref=e569] [cursor=pointer]
            - generic [ref=e571]:
              - link "Clear Start Breakout Clearing Foaming Wash, 295ML" [ref=e573] [cursor=pointer]:
                - /url: /products/brand/dermalogica/clear-start-breakout-clearing-foaming-wash
                - img "Clear Start Breakout Clearing Foaming Wash, 295ML" [ref=e574]
              - generic [ref=e575]:
                - link "Dermalogica" [ref=e577] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/clear-start-breakout-clearing-foaming-wash
                  - heading "Dermalogica" [level=6] [ref=e578]
                - link "Clear Start Breakout Clearing Foaming Wash" [ref=e580] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/clear-start-breakout-clearing-foaming-wash
                  - heading "Clear Start Breakout Clearing Foaming Wash" [level=6] [ref=e581]
                - heading "R469,00 - R599,00" [level=6] [ref=e583]:
                  - generic [ref=e584]: R469,00 - R599,00
                - generic [ref=e588]: 2 Sizes
              - button "Add to bag" [ref=e590] [cursor=pointer]
            - generic [ref=e592]:
              - link "Multi Active Toner, 250MLV03" [ref=e594] [cursor=pointer]:
                - /url: /products/brand/dermalogica/multi-active-toner
                - img "Multi Active Toner, 250MLV03" [ref=e595]
              - generic [ref=e596]:
                - link "Dermalogica" [ref=e598] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/multi-active-toner
                  - heading "Dermalogica" [level=6] [ref=e599]
                - link "Multi Active Toner" [ref=e601] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/multi-active-toner
                  - heading "Multi Active Toner" [level=6] [ref=e602]
                - heading "R349,00 - R1 029,00" [level=6] [ref=e604]:
                  - generic [ref=e605]: R349,00 - R1 029,00
                - generic [ref=e609]: 2 Sizes
              - button "Add to bag" [ref=e611] [cursor=pointer]
            - generic [ref=e613]:
              - link "Active Moist Lotion, 50MLV01" [ref=e615] [cursor=pointer]:
                - /url: /products/brand/dermalogica/active-moist-lotion
                - img "Active Moist Lotion, 50MLV01" [ref=e616]
              - generic [ref=e617]:
                - link "Dermalogica" [ref=e619] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/active-moist-lotion
                  - heading "Dermalogica" [level=6] [ref=e620]
                - link "Active Moist Lotion" [ref=e622] [cursor=pointer]:
                  - /url: /products/brand/dermalogica/active-moist-lotion
                  - heading "Active Moist Lotion" [level=6] [ref=e623]
                - heading "R1 069,00 - R1 659,00" [level=6] [ref=e625]:
                  - generic [ref=e626]: R1 069,00 - R1 659,00
                - generic [ref=e630]: 2 Sizes
              - button "Add to bag" [ref=e632] [cursor=pointer]
          - generic [ref=e634]:
            - button "Show more" [ref=e635] [cursor=pointer]
            - button "Return to top" [ref=e636] [cursor=pointer]
      - generic [ref=e641]:
        - paragraph
        - heading "Building an Oily Skin Routine" [level=2] [ref=e642]
        - heading [level=2] [ref=e643]
        - paragraph [ref=e644]:
          - generic [ref=e645]: Finding the right skincare starts with paying attention to how your skin behaves, rather than sticking rigidly to one “skin type.” Oiliness, dehydration, sensitivity, breakouts, and dryness can all exist at the same time, and routines often shift with climate, stress, hormones, and season.
        - paragraph [ref=e646]
        - paragraph [ref=e647]:
          - generic [ref=e649]:
            - text: If your skin looks shinier throughout the day or feels congested, look to our range of
            - link "skincare for oily" [ref=e650] [cursor=pointer]:
              - /url: /skincare/for-oily-skin
            - text: skin which brings together lightweight, non-comedogenic formulas, from
            - link "gel cleansers and foaming cleansers" [ref=e651] [cursor=pointer]:
              - /url: /skincare/cleanser/gel-and-foaming-cleanser
            - text: that remove excess sebum without stripping, to
            - link "oil-free moisturisers" [ref=e652] [cursor=pointer]:
              - /url: /skincare/for-oily-skin/moisturisers
            - text: and
            - link "serums" [ref=e653] [cursor=pointer]:
              - /url: /skincare/for-oily-skin/face-serums
            - text: with niacinamide and salicylic acid. Dealing with breakouts? Browse our
            - link "acne and post-acne care" [ref=e654] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-oily-skin/acne-and-post-acne-care
            - text: and
            - link "blemish treatments" [ref=e655] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-oily-skin/blemish-treatment
            - text: for targeted solutions to help reduce excess oil and support clearer-looking, healthier-feeling skin.
        - paragraph [ref=e656]
        - paragraph [ref=e657]:
          - generic [ref=e659]:
            - text: For skin that feels tight, flaky, or uncomfortable, our
            - link "skincare for dry skin" [ref=e660] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin
            - text: range focuses on deep hydration. Moisture-rich formulas can help improve hydration and support the skin barrier. Cream,
            - link "milk cleanser" [ref=e661] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/milk-cleansers
            - text: or
            - link "balm cleansers" [ref=e662] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/balm-cleansers
            - text: ", hydrating"
            - link "toners" [ref=e663] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/toners
            - text: ", ceramide-rich moisturisers, nourishing"
            - link "face oils" [ref=e664] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/face-oil
            - text: ", overnight treatments and"
            - link "face masks" [ref=e665] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/face-masks
            - text: are all restorative steps for dry skin.
        - paragraph [ref=e666]
        - paragraph [ref=e668]:
          - generic [ref=e669]:
            - text: The range also includes dedicated
            - link "eye treatments" [ref=e670] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/eye-treatments
            - text: ","
            - link "lip care" [ref=e671] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/lip-treatments
            - text: ","
            - link "exfoliators" [ref=e672] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-oily-skin/exfoliators
            - text: ", and"
            - link "men’s skincare" [ref=e673] [cursor=pointer]:
              - /url: https://www.arcstore.co.za/skincare/for-dry-skin/mens
            - text: making it easier to build a routine that feels flexible and personalised.
  - contentinfo [ref=e674]:
    - generic [ref=e676]:
      - generic [ref=e677]:
        - heading [level=3]
        - generic [ref=e678]:
          - paragraph [ref=e679]:
            - link "Login to your account" [ref=e680] [cursor=pointer]:
              - /url: /sign-in
          - paragraph [ref=e681]:
            - generic:
              - generic:
                - link:
                  - /url: /sign-in
            - link "Find a Store" [ref=e683] [cursor=pointer]:
              - /url: /our-stores
              - text: Find a Store
      - generic [ref=e684]:
        - heading [level=3]
        - generic [ref=e685]:
          - strong [ref=e688]: My Account
          - generic [ref=e689]:
            - link:
              - /url: /sign-in
            - link "Account Details" [ref=e691] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7673
            - link:
              - /url: /sign-in
          - generic [ref=e692]:
            - link:
              - /url: /my-arc-account/my-arc-orders
            - link "Orders" [ref=e694] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7676
            - link:
              - /url: /my-arc-account/my-arc-orders
          - generic [ref=e695]:
            - link:
              - /url: /my-arc-account/my-arc-return-requests
            - link "Returns" [ref=e697] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7680
            - link:
              - /url: /my-arc-account/my-arc-return-requests
          - generic [ref=e698]:
            - link:
              - /url: /arc/my-arc-account/my-arc-wishlist
            - link "Wishlist" [ref=e700] [cursor=pointer]:
              - /url: sign-in?RedirectPageId=7675
            - link:
              - /url: /arc/my-arc-account/my-arc-wishlist
      - generic [ref=e701]:
        - heading [level=3]
        - generic [ref=e702]:
          - strong [ref=e705]: Service and More
          - link "About ARC" [ref=e708] [cursor=pointer]:
            - /url: /customer/about-arc
          - link "ARC Careers" [ref=e710] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/71665917/admin/
          - generic [ref=e711]:
            - link "ClubCard ARC Partnership" [ref=e713] [cursor=pointer]:
              - /url: /customer/clubcard-partnership
            - link "Help Centre" [ref=e715] [cursor=pointer]:
              - /url: /customer/help-centre
            - link "Payment Options" [ref=e717] [cursor=pointer]:
              - /url: /payment-options
            - link "eBucks" [ref=e719] [cursor=pointer]:
              - /url: /arc-ebucks
            - link "Terms, Conditions & Privacy" [ref=e721] [cursor=pointer]:
              - /url: /customer/t-cs
            - link "Contact Us" [ref=e723] [cursor=pointer]:
              - /url: /customer
            - link "ARC Artist" [ref=e725] [cursor=pointer]:
              - /url: /arc-artist
  - contentinfo [ref=e726]:
    - generic [ref=e728]:
      - generic [ref=e731]:
        - paragraph [ref=e732]: Subscribe to the ARC Newsletter
        - generic [ref=e734]:
          - textbox "Your email address" [ref=e735]
          - button "Sign up" [ref=e736] [cursor=pointer]
      - generic [ref=e739]:
        - link "" [ref=e740] [cursor=pointer]:
          - /url: https://www.instagram.com/arcstoreofficial/
          - generic [ref=e741]: 
        - link "" [ref=e742] [cursor=pointer]:
          - /url: https://www.facebook.com/ARCStoreSA
          - generic [ref=e743]: 
        - link "" [ref=e744] [cursor=pointer]:
          - /url: https://twitter.com/arcstore_sa
          - generic [ref=e745]: 
        - link "" [ref=e746] [cursor=pointer]:
          - /url: https://www.youtube.com/channel/UCguRf9tx-YWT0ZO45gfIwxw
          - generic [ref=e747]: 
        - link "" [ref=e748] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/71665917/admin/
          - generic [ref=e749]: 
      - generic [ref=e751]:
        - paragraph
```

# Test source

```ts
  201 |             })
  202 |             .slice(0, 10)
  203 |             .map(el => ({
  204 |                 tag: el.tagName,
  205 |                 id: el.id,
  206 |                 class: el.className.substring ? el.className.substring(0, 80) : '',
  207 |                 overflow: window.getComputedStyle(el).overflow,
  208 |                 childCount: el.children.length,
  209 |             }));
  210 | 
  211 |         return {
  212 |             tilesFound: tiles.length,
  213 |             tilesChecked: checkedCount,
  214 |             tileSelector: usedSelector,
  215 |             results,
  216 |             overlayWarnings,
  217 |             potentialOverlays,
  218 |             zeroHeightOverlays,
  219 |         };
  220 |     });
  221 | }
  222 | 
  223 | /**
  224 |  * Inject CSS + JS scripts into the page.
  225 |  */
  226 | async function injectScripts(page, scripts = {}) {
  227 |     if (scripts.css) {
  228 |         await page.addStyleTag({ content: scripts.css });
  229 |     }
  230 |     if (scripts.js) {
  231 |         await page.evaluate(scripts.js);
  232 |         // Give the script time to run (waitForElement polling etc.)
  233 |         await page.waitForTimeout(3000);
  234 |     }
  235 | }
  236 | 
  237 | /**
  238 |  * Captures a full-page screenshot named after the step + URL slug + device.
  239 |  */
  240 | async function capture(page, stepName, urlSlug) {
  241 |     const dir = path.join(__dirname, 'screenshots');
  242 |     if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  243 |     const file = path.join(dir, `${stepName}__${urlSlug}.png`);
  244 |     await page.screenshot({ path: file, fullPage: true });
  245 |     console.log(`[QA] Screenshot saved: ${file}`);
  246 | }
  247 | 
  248 | /**
  249 |  * Logs and asserts diagnostic results.
  250 |  */
  251 | function assertDiag(diag, stepLabel, url) {
  252 |     const slug = url.replace('https://www.arcstore.co.za/', '').replace(/\//g, '-') || 'home';
  253 |     console.log(`\n[QA] ${stepLabel} — ${slug}`);
  254 |     console.log(`  Tiles found: ${diag.tilesFound}, in-viewport checked: ${diag.tilesChecked} (selector: ${diag.tileSelector})`);
  255 | 
  256 |     if (diag.overlayWarnings && diag.overlayWarnings.length) {
  257 |         console.error(`  ⚠️  OVERLAY WARNINGS (${diag.overlayWarnings.length}):`);
  258 |         diag.overlayWarnings.forEach(w => {
  259 |             console.error(`     Tile: ${w.tile}`);
  260 |             console.error(`     Blocked by: <${w.blocker.tag}> class="${w.blocker.class}" z-index=${w.blocker.zIndex}`);
  261 |         });
  262 |     }
  263 | 
  264 |     if (diag.potentialOverlays && diag.potentialOverlays.length) {
  265 |         console.log(`  High-z-index overlays (${diag.potentialOverlays.length}):`);
  266 |         diag.potentialOverlays.forEach(o => {
  267 |             if (o.display !== 'none') {
  268 |                 console.log(`    <${o.tag}#${o.id || ''}> .${o.class} z=${o.zIndex} pos=${o.position}`);
  269 |             }
  270 |         });
  271 |     }
  272 | 
  273 |     if (diag.zeroHeightOverlays && diag.zeroHeightOverlays.length) {
  274 |         console.warn(`  ⚠️  Zero-height containers with children (could intercept clicks): ${diag.zeroHeightOverlays.length}`);
  275 |         diag.zeroHeightOverlays.forEach(o => {
  276 |             console.warn(`    <${o.tag}#${o.id || ''}> .${o.class} overflow=${o.overflow} children=${o.childCount}`);
  277 |         });
  278 |     }
  279 | }
  280 | 
  281 | /* ══════════════════════════════════════════════════════════════════════════ */
  282 | /* Step 1 — Baseline: no Global JS, no test scripts                          */
  283 | /* ══════════════════════════════════════════════════════════════════════════ */
  284 | 
  285 | test.describe('Step 1 — Baseline (script ON, no Global JS)', () => {
  286 |     for (const url of CLP_URLS) {
  287 |         const slug = url.split('arcstore.co.za/')[1];
  288 | 
  289 |         test(`[${slug}] tiles are visible and clickable`, async ({ page }) => {
  290 |             await gotoAndWaitForCLP(page, url);
  291 |             await capture(page, 'step1', slug);
  292 | 
  293 |             const diag = await diagnoseTiles(page);
  294 |             assertDiag(diag, 'Step 1', url);
  295 | 
  296 |             // Core assertions
  297 |             expect(diag.tilesFound, `No product tiles found on ${slug}`).toBeGreaterThan(0);
  298 |             expect(
  299 |                 diag.overlayWarnings.length,
  300 |                 `CLICK BLOCKED on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
> 301 |             ).toBe(0);
      |               ^ Error: CLICK BLOCKED on skincare: [{"tile":"https://www.arcstore.co.za/products/t-l-c-glycolic-body-lotion/240ml","blocker":{"tag":"DIV","class":"content-container  dw-mod","zIndex":"auto"}}]
  302 |         });
  303 |     }
  304 | });
  305 | 
  306 | /* ══════════════════════════════════════════════════════════════════════════ */
  307 | /* Step 2 — + Global JS injected                                             */
  308 | /* ══════════════════════════════════════════════════════════════════════════ */
  309 | 
  310 | test.describe('Step 2 — + Global JS', () => {
  311 |     for (const url of CLP_URLS) {
  312 |         const slug = url.split('arcstore.co.za/')[1];
  313 | 
  314 |         test(`[${slug}] tiles remain clickable after Global JS`, async ({ page }) => {
  315 |             await gotoAndWaitForCLP(page, url);
  316 | 
  317 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  318 |             await capture(page, 'step2', slug);
  319 | 
  320 |             const diag = await diagnoseTiles(page);
  321 |             assertDiag(diag, 'Step 2', url);
  322 | 
  323 |             expect(diag.tilesFound).toBeGreaterThan(0);
  324 |             expect(
  325 |                 diag.overlayWarnings.length,
  326 |                 `CLICK BLOCKED after Global JS on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  327 |             ).toBe(0);
  328 |         });
  329 |     }
  330 | });
  331 | 
  332 | /* ══════════════════════════════════════════════════════════════════════════ */
  333 | /* Step 3 — + Global JS + Deploy (CRO-12345 brand-banner, sitewide deploy)   */
  334 | /* ══════════════════════════════════════════════════════════════════════════ */
  335 | 
  336 | test.describe('Step 3 — + Global JS + Deploy (CRO-12345)', () => {
  337 |     for (const url of CLP_URLS) {
  338 |         const slug = url.split('arcstore.co.za/')[1];
  339 | 
  340 |         test(`[${slug}] tiles remain clickable after Deploy`, async ({ page }) => {
  341 |             await gotoAndWaitForCLP(page, url);
  342 | 
  343 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  344 |             await injectScripts(page, {
  345 |                 css: readScript(SCRIPTS.cro12345Css),
  346 |                 js: readScript(SCRIPTS.cro12345Js),
  347 |             });
  348 |             await capture(page, 'step3', slug);
  349 | 
  350 |             const diag = await diagnoseTiles(page);
  351 |             assertDiag(diag, 'Step 3', url);
  352 | 
  353 |             expect(diag.tilesFound).toBeGreaterThan(0);
  354 |             expect(
  355 |                 diag.overlayWarnings.length,
  356 |                 `CLICK BLOCKED after Deploy on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  357 |             ).toBe(0);
  358 |         });
  359 |     }
  360 | });
  361 | 
  362 | /* ══════════════════════════════════════════════════════════════════════════ */
  363 | /* Step 4 — + 1st active test: CRO-7521 (Remove headers on PLPs)            */
  364 | /* ══════════════════════════════════════════════════════════════════════════ */
  365 | 
  366 | test.describe('Step 4 — + CRO-7521 (Remove headers on PLPs)', () => {
  367 |     for (const url of CLP_URLS) {
  368 |         const slug = url.split('arcstore.co.za/')[1];
  369 | 
  370 |         test(`[${slug}] tiles remain clickable with CRO-7521`, async ({ page }) => {
  371 |             await gotoAndWaitForCLP(page, url);
  372 | 
  373 |             await injectScripts(page, { js: readScript(SCRIPTS.globalJs) });
  374 |             await injectScripts(page, {
  375 |                 css: readScript(SCRIPTS.cro12345Css),
  376 |                 js: readScript(SCRIPTS.cro12345Js),
  377 |             });
  378 |             await injectScripts(page, {
  379 |                 css: readScript(SCRIPTS.cro7521Css),
  380 |                 js: readScript(SCRIPTS.cro7521Js),
  381 |             });
  382 |             await capture(page, 'step4', slug);
  383 | 
  384 |             const diag = await diagnoseTiles(page);
  385 |             assertDiag(diag, 'Step 4', url);
  386 | 
  387 |             // Extra check: look specifically for zero-height cro-plp-wrapper overlays
  388 |             const zeroHeightIssue = diag.zeroHeightOverlays
  389 |                 ? diag.zeroHeightOverlays.filter(o => o.class && o.class.includes('cro-plp'))
  390 |                 : [];
  391 |             if (zeroHeightIssue.length) {
  392 |                 console.warn('[QA] ⚠️  CRO-7521 zero-height containers detected:', zeroHeightIssue);
  393 |             }
  394 | 
  395 |             expect(diag.tilesFound).toBeGreaterThan(0);
  396 |             expect(
  397 |                 diag.overlayWarnings.length,
  398 |                 `CLICK BLOCKED after CRO-7521 on ${slug}: ${JSON.stringify(diag.overlayWarnings)}`
  399 |             ).toBe(0);
  400 |         });
  401 |     }
```