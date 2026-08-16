/* CRO-12470 — JS Condition for the Convert location
   "PDP - Bathroom fixture pages with a buy box (CRO-12470)" (id 1004157801)
   Experience: 1004207635 "PDP | Complete your bathroom | ALL"

   Pairs with the Global Project JS (master copy:
   "../PDP | Full bathroom set selector | ALL | CRO-12527/global.js"),
   which now owns ALL the logic for this test: it waits for the page title
   and buy-box form with a real 25ms poll, runs the title classification
   (the same regexes this location used to hold), sets the flag below and
   pushes executeExperiment 1004207635.

   The old condition evaluated the title/form at script-run time; its
   executeExperimentLooped retry does not re-fire reliably from inside a
   location condition, so on cached loads (second page, Back button) it
   returned false before the DOM existed and the test never activated —
   the same fault CRO-12527 had.

   In the Convert UI: keep the URL condition (contains "product.html") and
   the "Upon Run" trigger; replace ONLY the JS Condition with the
   expression below (everything from "(function" onward). */

(function () {
  if (window.crotest_PDP_Complete_your_bathroom_CRO12470 != 1) {
    if (window.convert && window.convert.executeExperimentLooped) {
      window.convert.executeExperimentLooped(convertContext);
    }
    return false;
  }
  return true;
})()
