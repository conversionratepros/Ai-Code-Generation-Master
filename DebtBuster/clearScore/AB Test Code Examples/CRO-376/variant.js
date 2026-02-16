(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-88_89-Review";
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

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function cardTextChange() {
            waitForElement('.cro-cards .cro-card-one .card-text-first', function () {
                document.querySelector('.cro-cards .cro-card-one .card-text-first').innerHTML = "Slowly but surely your life will come back. So, for me, it was just knowing that I do have that extra money to do the little something for the family.";
                document.querySelector('.cro-cards .cro-card-two .card-text-first').innerHTML = "At first, I was a little bit reserved because I felt like a bit of a failure, but that's a part of life. I actually stopped worrying about what anybody else thought because I knew that I have to do this to get to where I need to be.";
                document.querySelector('.cro-cards .cro-card-three .card-text-first').innerHTML = "The first thing I did when I was debt free was go to a dealership, to get myself a car because I had to pay for transport for my kids to get to school. I bought myself a car.";
                document.querySelector('.cro-cards .cro-card-four .card-text-first').innerHTML = "Before, I had two girls who were really, really worried about having to support their mom into her old age. I think both of them thought, ‘no, we can't do this’. Being out of debt and having that freedom has improved our relationship drastically.";
            });
        }

        function cardClientsubnameChange() {
            waitForElement('.cro-cards .card-content .sub-text', function () {
                document.querySelector('.cro-cards .cro-card-one .sub-text').innerHTML = "Father & Husband";
                document.querySelector('.cro-cards .cro-card-two .sub-text').innerHTML = "Student";
                document.querySelector('.cro-cards .cro-card-three .sub-text').innerHTML = "Father & Graduate";
                document.querySelector('.cro-cards .cro-card-four .sub-text').innerHTML = "Single Mother";
            });
        }

        function cardHeaderChange() {
            waitForElement('.cro-client-say-header .client-header-title', function () {
                document.querySelector('.cro-client-say-header .client-header-title').innerHTML = "Improve your life and relationships by being debt-free";
            });
        }
        function imgChange() {
            waitForElement('.cro-card-four .card-image img', function () {
                document.querySelector('.cro-card-four .card-image img').src = "https://crp-clients-images.s3.af-south-1.amazonaws.com/JustMoney/cro-t-88_89-new-review-img.svg";
            });
        }


        /* Variation Init */
        function init() {

            addClass("body", variation_name)

            cardTextChange()
            cardHeaderChange()
            cardClientsubnameChange()
            imgChange()

        }

        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();