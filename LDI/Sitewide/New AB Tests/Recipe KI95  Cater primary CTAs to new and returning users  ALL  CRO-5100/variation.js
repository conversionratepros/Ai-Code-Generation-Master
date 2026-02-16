(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro5100";
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

        function addCourseSliderClass() {

    waitForElement('h1.elementor-heading-title', function () {

        document.querySelectorAll('h1.elementor-heading-title').forEach(function (h1) {

            var text = h1.textContent.replace(/\s+/g, ' ').trim().toUpperCase();

            // Only these 3 titles
            var validTitles = [
                'ORTHODONTICS COURSES',
                'DENTAL IMPLANT COURSES',
                'AESTHETIC DENTISTRY COURSES'
            ];

            if (validTitles.indexOf(text) !== -1) {
                var sliderParent = h1.closest('.has_eae_slider');

                if (sliderParent) {
                    // Add class to parent only if not already added
                    if (!sliderParent.classList.contains('cro-course-pages')) {
                        sliderParent.classList.add('cro-course-pages');
                    }

                    // Process buttons inside this section
                    var buttons = sliderParent.querySelectorAll('.elementor-button .elementor-button-text');
                    buttons.forEach(function (btnText) {
                        var btnAnchor = btnText.closest('a.elementor-button');
                        if (btnAnchor) {

                            // Remove previous classes if any
                            btnAnchor.classList.remove('cro-download', 'cro-enrol');

                            var btnLabel = btnText.textContent.trim();

                            if (btnLabel === 'Download prospectus') {
                                btnAnchor.classList.add('cro-download');
                                // Add icon after text
                                var iconSpan = document.createElement('span');
                                iconSpan.className = 'elementor-button-icon';
                                iconSpan.innerHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 17.5L18.5 12L13 6.5M17.25 12H4.25" stroke="white" stroke-width="1.5" stroke-linecap="square"></path>
                                    </svg>
                                `;
                                btnText.insertAdjacentElement('afterend', iconSpan);
                            } else if (btnLabel === 'Enroll Now') {
                                btnAnchor.classList.add('cro-enrol');
                            }

                         

                        }
                    });
                }
            }

        });

    });

    waitForElement('.cro-course-pages .has_eae_slider.e-con .cro-download', function (){
    var parent = document.querySelector('.cro-course-pages .has_eae_slider.e-con .cro-download').closest('.has_eae_slider.e-con');
                if (parent) {
                    parent.classList.add('cro5100-btn-parent');
                }
                 });
}



        

        function init() {
            addClass("body", variation_name)
           

        waitForElement('.elementor-widget-container h3.elementor-heading-title', function () {
            document.querySelectorAll('.elementor-widget-container h3.elementor-heading-title')
            .forEach(function (e) {
            var text = e.textContent.trim();
            var sliderParent = e.closest('.has_eae_slider');

            if (!sliderParent) return;

            // Orthodontics
            if (
                text ===
                'Diploma in Orthodontics & Dentofacial Orthopaedics (EduQual Level 7)'
            ) {
                sliderParent.classList.add('cro5100-course-ortho');
            }

            // Aesthetic
            else if (
                text ===
                'Diploma in Aesthetic & Restorative Dentistry (EduQual Level 7)'
            ) {
                sliderParent.classList.add('cro5100-course-aesthetic');
            }

            // Implantology
            else if (
                text ===
                'Diploma in Oral Surgery & Dental Implantology (EduQual Level 7)'
            ) {
                sliderParent.classList.add('cro5100-course-implant');
            }
            });
        });

        waitForElement('.elementor-widget-container h3.elementor-heading-title', function () {
            document
                .querySelectorAll('.elementor-widget-container h3.elementor-heading-title')
                .forEach(function (heading) {
                var text = heading.textContent.trim();
                var card = heading.closest('.has_eae_slider');

                if (!card) return;

                var button = card.querySelector('.elementor-button');
                if (!button) return;

                var prospectusUrl = '';

                // Match course & set URL
                if (text.includes('Orthodontics & Dentofacial Orthopaedics')) {
                    prospectusUrl = 'https://londondentalinstitute.com/ortho-prospectus-download/';
                } else if (text.includes('Aesthetic & Restorative Dentistry')) {
                    prospectusUrl = 'https://londondentalinstitute.com/ARD-prospectus-download/';
                } else if (text.includes('Oral Surgery & Dental Implantology')) {
                    prospectusUrl = 'https://londondentalinstitute.com/dios-prospectus-download/';
                } else {
                    return;
                }

                /* Change existing button text */
                var btnText = button.querySelector('.elementor-button-text');
                if (btnText) {
                    btnText.textContent = 'Learn more';
                }

                /* Add Download Prospectus button (only once) */
                if (!card.querySelector('.cro5100-prospectus-btn')) {
                    var wrapper = button.closest('.elementor-button-wrapper');

                    var prospectusBtn = document.createElement('a');
                    prospectusBtn.href = prospectusUrl;
                    prospectusBtn.className =
                    'elementor-button elementor-button-link elementor-size-sm cro5100-prospectus-btn';

                    prospectusBtn.innerHTML =
                    '<span class="elementor-button-content-wrapper">' +
                    '<span class="elementor-button-text">Download prospectus</span>' +
                    '<span class="elementor-button-icon">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">' +
                    '<path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '</svg>' +
                    '</span>' +
                    '</span>';

                    wrapper.appendChild(prospectusBtn);
                }
                });
        });

        if (window.location.href.indexOf('/dental-courses/') !== -1) {

    /* -----------------------------------
       1. Add course-identifying classes
    ----------------------------------- */
    waitForElement('.elementor-widget-container h3.elementor-heading-title', function () {

        document
            .querySelectorAll('.elementor-widget-container h3.elementor-heading-title')
            .forEach(function (e) {

                var text = e.textContent.replace(/\s+/g, ' ').toLowerCase();
                var sliderParent = e.closest('.has_eae_slider');

                if (!sliderParent) return;

                if (text.indexOf('orthodontics') !== -1) {
                    sliderParent.classList.add('cro5100-course-ortho');
                }
                else if (text.indexOf('aesthetic') !== -1) {
                    sliderParent.classList.add('cro5100-course-aesthetic');
                }
                else if (
                    text.indexOf('implantology') !== -1 ||
                    text.indexOf('oral surgery') !== -1
                ) {
                    sliderParent.classList.add('cro5100-course-implant');
                }

            });
    });

    /* -----------------------------------
       2. Courses we offer → add slider class
    ----------------------------------- */
    waitForElement('h2.elementor-heading-title', function () {

        document.querySelectorAll('h2.elementor-heading-title').forEach(function (heading) {

            if (heading.textContent.replace(/\s+/g, ' ').trim() === 'Courses we offer') {

                var sliderParent = heading.closest('.has_eae_slider');
                if (!sliderParent) return;

                sliderParent.classList.add('cro-courses-slider');

waitForElement('.cro-courses-slider .elementor-button-text', function () {

    document
        .querySelectorAll('.cro-courses-slider .elementor-button-text')
        .forEach(function (btnText) {

            // ✅ ONLY Enrol now
            if (btnText.textContent.trim() !== 'Enrol now') return;

            var button = btnText.closest('a.elementor-button');
            if (!button) return;

            // find correct course card
            var card = btnText.closest('.elementor-element');
            while (card && !card.querySelector('h3.elementor-heading-title')) {
                card = card.parentElement;
            }
            if (!card) return;

            var titleEl = card.querySelector('h3.elementor-heading-title');
            if (!titleEl) return;

            var title = titleEl.textContent.toLowerCase();

            // ✅ Text change (icon untouched)
            btnText.textContent = 'Download prospectus';

            // ✅ Class for CSS reuse
            button.classList.add('cro5100-prospectus-btn');

            // Full width
            button.style.width = '100%';

            // URL mapping
            if (title.indexOf('orthodontics') !== -1) {
                button.href =
                    'https://londondentalinstitute.com/ortho-prospectus-download/';
            }
            else if (title.indexOf('implantology') !== -1) {
                button.href =
                    'https://londondentalinstitute.com/dios-prospectus-download/';
            }
            else if (title.indexOf('aesthetic') !== -1) {
                button.href =
                    'https://londondentalinstitute.com/ARD-prospectus-download/';
            }

        });
});

               

            }
        });
    });

}

        addCourseSliderClass();

        }
        

        
        waitForElement('body', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();