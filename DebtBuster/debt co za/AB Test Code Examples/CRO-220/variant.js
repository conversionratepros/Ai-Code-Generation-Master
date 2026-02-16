(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-8-10";
        /* all Pure helper functions */

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function insertHtml(selector, content, position) {
            var el = document.querySelector(selector);
            if (!position) {
                position = "afterend";
            }
            if (el && content) {
                el.insertAdjacentHTML(position, content);
            }
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function updateImg(selector, imgSrc) {
            waitForElement(selector, function () {
                document.querySelector(selector).src = imgSrc;
            });
        }


        var newIcon_1 = `<div class="cro8_10-debt-problem-bottom-image">
        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+8.10+%7C+Colour+%26+Form+adjust+%7C+All+-+Omni+Page+%7C+CRO-220/cro-db-8_10_1.png"
            alt="Hands Icon" class="cro-Hands-Icon">
    </div>`;

        var newIcon_2 = `<div class="cro8_10-debt-problem-bottom-image-2">
        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+8.10+%7C+Colour+%26+Form+adjust+%7C+All+-+Omni+Page+%7C+CRO-220/cro-db-8_10_2.png"
            alt="Rates Icon" class="cro-Rates-Icon">
    </div>`;

        var newIcon_3 = `<div class="cro8_10-debt-problem-bottom-image-3">
        <img src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Debt-co-za/Recipe+8.10+%7C+Colour+%26+Form+adjust+%7C+All+-+Omni+Page+%7C+CRO-220/cro-db-8_10_3.png"
            alt="Term Options" class="cro-Term-Options">
    </div>`;

        /* Variation Init */
        function init() {

            addClass("body", variation_name);


            waitForElement("section .container", function () {
                document.querySelectorAll('section .container h2').forEach(function (e) {
                    var parent = e.closest('section')
                    if (e.innerHTML.indexOf('Our Partners') != -1) {
                        parent.classList.add('cro-t-8_10-ourPartners')
                    }
                    if (e.innerHTML.indexOf('Solve your debt problem with us') != -1) {
                        parent.classList.add('cro-t-8_10-debtProblem')
                    }
                })
            });

            updateImg('.cro-t-8_10-ourPartners a img[alt="DebtBusters"]', 'https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster_Recipe%208.10_debtbusters.png');
            updateImg('.cro-t-8_10-ourPartners a img[alt="JustMoney"]', 'https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster_Recipe%208.10_logo_Justmoney.png');
            updateImg('.cro-t-8_10-ourPartners a img[alt="Intelligent Debt Management (IDM)"]', 'https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster_Recipe%208.10_logo_idm.png');
            updateImg('.cro-t-8_10-ourPartners a img[alt="Sanlam"]', 'https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster_Recipe%208.10_logo-sanlam.png');
            updateImg('.cro-t-8_10-ourPartners a img[alt="Fincheck"]', 'https://cdn-3.convertexperiments.com/uf/1004973/10045476/DebtBuster_Recipe%208.10_logo_fincheck.png');


            waitForElement('.cro-t-8_10-debtProblem .grid', function () {
                if (!document.querySelector('.cro8_10-debt-problem-bottom-image')) {
                    insertHtml('.cro-t-8_10-debtProblem .grid > div:nth-child(1) svg', newIcon_1, "afterend");
                }
                if (!document.querySelector('.cro8_10-debt-problem-bottom-image-2')) {
                    insertHtml('.cro-t-8_10-debtProblem .grid > div:nth-child(2) svg', newIcon_2, "afterend");
                }
                if (!document.querySelector('.cro8_10-debt-problem-bottom-image-3')) {
                    insertHtml('.cro-t-8_10-debtProblem .grid > div:nth-child(3) svg', newIcon_3, "afterend");
                }
            });

        }

        /* Initialise variation */
        waitForElement('section .container', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();