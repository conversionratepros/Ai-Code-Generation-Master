/* CRO-12527 — JS Condition for Convert location 1004157185
   ("PDP - Bundle Discovery Test 1 - 32 mapped set-component pages")

   ============ OPTION A — USE THIS ONE (pairs with global.js) ============
   The activation decision lives in the Global Project JS (global.js in this
   folder): it URL-matches the 32 mapped pages by pathname, sets the flag
   below, and pushes executeExperiment 1004206570. This condition only reads
   that flag — the exact pattern the other manually-activated CTM tests use
   (crotest_130, crotest_129_Buy_Now_Pay_later, ...). The looped retry covers
   any evaluation that happens before the Global JS has set the flag.
   Keep the location's URL condition (contains "product.html") and the
   "Upon Run" trigger as they are; replace only the JS Condition with the
   expression below (everything from "(function" onward). */

(function () {
  if (window.crotest_PDP_Full_bathroom_set_selector_CRO12527 != 1) {
    if (window.convert && window.convert.executeExperimentLooped) {
      window.convert.executeExperimentLooped(convertContext);
    }
    return false;
  }
  return true;
})()

/* ============ OPTION B — fallback if global.js is NOT deployed ============
   Standalone fix for the original bug: the old condition returned false
   forever when the buy-box form wasn't parsed yet at evaluation time (the
   Convert script is async in <head>; the form sits ~line 1979 of a 425KB
   document, so every cached load lost the race). This version retries via
   executeExperimentLooped until the form exists, then checks the SKU.
   Do NOT install both — pick A (preferred) or B.

(function () {
  try {
    var f = document.querySelector('.product-info-main #product_addtocart_form');
    if (!f) {
      if (document.readyState !== 'complete' && window.convert && window.convert.executeExperimentLooped) {
        window.convert.executeExperimentLooped(convertContext);
      }
      return false;
    }
    var s = (f.getAttribute('data-product-sku') || '').toUpperCase();
    if (!s) { return false; }
    var L = ['AQWH170036', 'BE1WH051N', 'AQWH170003', 'BE1WH813', 'BE1WH408', 'AQWH170004',
      'CTSHPS903', 'XXWH8181', 'AQAV170003', 'CTSHCRP900', 'BE1WH610', 'FTTOFS002',
      'BE1AL051', 'AQWH180008', 'XXWH978', 'XXWH1000BP', 'BE1WH9239', 'AQAL170003',
      'FTTOWH012', 'BE1AV051', 'BE1BB051', 'AQBB170003', 'TVCC601621', 'TVCC601601',
      'XXAL8181', 'XXBB8181', 'TVP142005BK', 'CTSHPS904', 'TVP659041WH', 'BE1AV218',
      'BE1AV318', 'TVP0152951BK'];
    return L.indexOf(s) !== -1;
  } catch (e) { return false; }
})()
*/
