/*
 * CRO-12412 — additions for OneDayOnly global.js
 * ------------------------------------------------
 * 1. cro_getUserStatus / cro_waitForUserStatus: standalone login-state check
 *    (reusable by any test — reads the GTM dataLayer `page_load` user object).
 * 2. test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412: fire function
 *    for the experiments object. Fires the test ONLY on the checkout entry
 *    step (/checkout with no step= / isGuest= params) for signed-out users;
 *    everywhere else it strips the variation body classes so the SPA never
 *    shows the variation on later checkout steps (logged-in users land on
 *    /checkout?step=cart, guests on /checkout?step=cart&isGuest=true).
 *
 * Paste the two helpers near lib{}, add the experiment function inside the
 * experiments object, and call it from both the initial run and
 * activateListner() like every other test. Replace EXPERIMENT_ID with the
 * Convert experience id once created.
 */

/* Login / logout check — "signedIn" | "signedOut" | null while unknown.
   ODO pushes a user object ({ userStatus, userID, ... }) with the page_load
   event on every page; scan the dataLayer backwards for the latest one. */
function cro_getUserStatus() {
    try {
        var dl = window.dataLayer || [];
        for (var i = dl.length - 1; i >= 0; i--) {
            if (dl[i] && dl[i].user && dl[i].user.userStatus) {
                return dl[i].user.userStatus;
            }
        }
    } catch (e) { }
    return null;
}

/* Poll until the dataLayer user object lands (it arrives with page_load,
   which can lag hydration), then hand the status to the trigger. */
function cro_waitForUserStatus(trigger, delayInterval, delayTimeout) {
    var interval = setInterval(function () {
        var status = cro_getUserStatus();
        if (status) {
            clearInterval(interval);
            trigger(status);
        }
    }, delayInterval || 50);
    setTimeout(function () {
        clearInterval(interval);
    }, delayTimeout || 15000);
}

/* ── add inside the experiments object ─────────────────────────────────── */

var experiments_CRO12412_addition = {
    test_Checkout_Equal_Weight_Login_vs_Guest_Entry_CRO12412() {
        var path = window.location.pathname;
        var search = window.location.search;
        var isEntryStep = path.indexOf("/checkout") === 0 && !/[?&](step|isGuest)=/i.test(search);

        if (isEntryStep) {
            cro_waitForUserStatus(function (status) {
                if (status === "signedOut") {
                    lib.waitForElement('form input[name="password"]', function () {
                        window.crotest_Checkout_Equal_Weight_Login_vs_Guest_CRO12412 = 1;
                        window._conv_q = window._conv_q || [];
                        window._conv_q.push(["executeExperiment", "EXPERIMENT_ID"]);
                        console.log("Experiment AB Test | Checkout | Equal-Weight Login vs Guest Entry | ALL | CRO-12412 Activated");
                    }, 25, 15000);
                }
            });
        } else {
            setTimeout(function () {
                document.body.classList.remove("cro-12412", "cro-12412-login-tab");
            }, 400);
        }
    }
};
