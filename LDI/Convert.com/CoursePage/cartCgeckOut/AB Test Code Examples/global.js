(function () {
    try {
        // LIBRARY FUNCTIONS
        var lib = {
            live(selector, event, callback, context) {
                // helper for enabling IE 8 event bindings
                function addEvent(el, type, handler) {
                    if (el.attachEvent) el.attachEvent("on" + type, handler);
                    else el.addEventListener(type, handler);
                }
                // matches polyfill
                this &&
                    this.Element &&
                    (function (ElementPrototype) {
                        ElementPrototype.matches =
                            ElementPrototype.matches ||
                            ElementPrototype.matchesSelector ||
                            ElementPrototype.webkitMatchesSelector ||
                            ElementPrototype.msMatchesSelector ||
                            function (selector) {
                                var node = this,
                                    nodes = (node.parentNode || node.document).querySelectorAll(selector),
                                    i = -1;
                                while (nodes[++i] && nodes[i] != node);
                                return !!nodes[i];
                            };
                    })(Element.prototype);
                // live binding helper using matchesSelector
                function live(selector, event, callback, context) {
                    addEvent(context || document, event, function (e) {
                        var found,
                            el = e.target || e.srcElement;
                        while (el && el.matches && el !== context && !(found = el.matches(selector)))
                            el = el.parentElement;
                        if (found) callback.call(el, e);
                    });
                }
                live(selector, event, callback, context);
            },
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            waitForElement(selector, trigger, delayInterval, delayTimeout) {
                var interval = setInterval(function () {
                    if (
                        document &&
                        document.querySelector(selector) &&
                        document.querySelectorAll(selector).length > 0
                    ) {
                        clearInterval(interval);
                        trigger();
                    }
                }, delayInterval);
                setTimeout(function () {
                    clearInterval(interval);
                }, delayTimeout);
            },
            listener(trigger) {
                window.addEventListener("locationchange", function () {
                    trigger();
                });
                history.pushState = ((f) =>
                    function pushState() {
                        var ret = f.apply(this, arguments);
                        window.dispatchEvent(new Event("pushstate"));
                        window.dispatchEvent(new Event("locationchange"));
                        return ret;
                    })(history.pushState);
                history.replaceState = ((f) =>
                    function replaceState() {
                        var ret = f.apply(this, arguments);
                        window.dispatchEvent(new Event("replacestate"));
                        window.dispatchEvent(new Event("locationchange"));
                        return ret;
                    })(history.replaceState);
                window.addEventListener("popstate", () => {
                    window.dispatchEvent(new Event("locationchange"));
                });
            },
        };

        /**
         * Trigger converion goal
         */

        /**
         * Manual activation
         */



        var experiments = {
            test_AddingDataPath() {
                var pathName = window.location.pathname;
                lib.waitForElement('html', function () {
                    var htmlTag = document.querySelector('html')
                    htmlTag.setAttribute('cro-datapath', pathName);
                }, 25, 15000)

            },
            test_4_34_41_48_Accreditation_promotion_section_All() {
                var pathName = window.location.pathname;
                if (pathName == '/' || pathName.includes('/dental-courses') || pathName.includes('/orthodontics-dentofacial-orthopaedics/') || pathName.includes('/aesthetic-restorative-dentistry/') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_Accreditation_promotion = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004109941"]);
                    console.log("Experiment Recipe 4.34.41.48 | Accreditation promotion section | All Activated");
                }
            },
            test_4_34_41_48_Accreditation_promotion_section_All_v2() {
                var pathName = window.location.pathname;
                if (pathName == '/' || pathName.includes('/dental-courses') || pathName.includes('/orthodontics-dentofacial-orthopaedics/') || pathName.includes('/aesthetic-restorative-dentistry/') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_Accreditation_promotion_v2 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004117509"]);
                    console.log("Experiment Recipe 4.34.41.48 | V2 Accreditation promotion badge | All | LDI-199 Activated");
                }
            },
            test_home_page_brand_video() {
                var pathName = window.location.pathname;
                if (pathName == '/') {
                    window.crotest_BrandVideo = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004118108"]);
                    console.log("Experiment Rollback | Home page brand video | All Activated");
                }
            },
            test_3_49_CTAs_prospectus_download() {
                var pathName = window.location.pathname;
                if (pathName.includes('/')) {
                    window.crotest_CTA_prospectus = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "100479143"]);
                    console.log("Experiment 3.49 | CTAs and prospectus download | All Activated");
                }
            },
            test_51_Course_page_functional_design() {
                var pathName = window.location.pathname;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics/') || pathName.includes('/aesthetic-restorative-dentistry/') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_51_Course_page = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004118419"]);
                    console.log("Experiment Recipe 51 | Course page functional design | All | LDI-176 Activated");
                }
            },
            test_Rollback_Course_page_All_LDI_187() {
                var pathName = window.location.pathname;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics/') || pathName.includes('/aesthetic-restorative-dentistry/') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_rollBack_Course_page_LDI_187 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004124553"]);
                    console.log("Experiment Rollback | Course page | All | LDI-187  Activated");
                }
            },
            test_54_55_56_Registration_Page_Guidance_All_LDI_233() {
                var pathName = window.location.pathname;
                if (pathName.includes('-registration') || pathName.includes('-registration-step-02') || pathName.includes('/membership-checkout')) {
                    window.crotest_Registration_Page_Guidance_All_LDI_233 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004127508"]);
                    console.log("Experiment 54.55.56 | Registration Page Guidance | All | LDI-233 Activated");
                }
            },
            test_21_32_In_person_training_clarity_All_LDI_237() {
                var pathName = window.location.pathname;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics/') || pathName.includes('/aesthetic-restorative-dentistry/') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_person_training_clarity21_32 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004132390"]);
                    console.log("Experiment Recipe 21.32 | In-person training clarity | All | LDI-237 Activated");
                }
            },
            test_52_53_Mobile_whats_on_this_page_updates_Mobile_CRO_87() {
                var pathName = window.location.href;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics') || pathName.includes('/aesthetic-restorative-dentistry') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_52_53_Course_Whats_on_the_page = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004135399"]);
                    console.log("Experiment Recipe 52.53 | Mobile 'what's on this page' updates | Mobile | CRO-87 Activated");
                }
            },
            test_Recipe_57_58_59_Dental_courses_restructure_ALL_CRO_652() {
                var pathName = window.location.href;
                if (pathName.includes('/dental-courses')) {
                    window.crotest_57_58_59_Dental_courses = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004140883"]);
                    console.log("Experiment Recipe 57.58.59 | Dental courses restructure | ALL | CRO-652 Activated");
                }
            },
            test_Recipe_KI80_KI81_VLE_Page_Redesign_and_Navigation_Integration_ALL() {
                var pathName = window.location.href;
                if (pathName.includes('/')) {
                    window.crotest_KI80_KI81_VLE_Page_Redesign_and_Navigation_Integration = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004151142"]);
                    console.log("Experiment Recipe KI80.KI81 | VLE Page Redesign and Navigation Integration | ALL Activated");
                }
            },
            test_Recipe_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_ALL() {
                var pathName = window.location.href;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics') || pathName.includes('/aesthetic-restorative-dentistry') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_ALL = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004155618"]);
                    console.log("Experiment Recipe KI82 | Enhancing Course Page with VLE Product and Video Section | ALL Activated");
                }
            }, test_Recipe_57_58_59_Dental_courses_restructure_v2_ALL_CRO_652() {
                var pathName = window.location.href;
                if (pathName.includes('/dental-courses')) {
                    window.crotest_57_58_59_Dental_courses_v2 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004162981"]);
                    console.log("Experiment Recipe 57.58.59 | Dental courses restructure (v2) | ALL | CRO-5194 Activated");
                }
            }, test_Recipe_KI103_Adding_PDP_section_with_prospectus_download_ALL_CRO_5386() {
                var pathName = window.location.href;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics') || pathName.includes('/aesthetic-restorative-dentistry') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_KI103_Adding_PDP_section_with_prospectus_download_ALL_CRO_5386 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004164274"]);
                    console.log("Experiment Recipe KI103 | Adding PDP section with prospectus download | ALL | CRO-5386 Activated");
                }
            }, test_Recipe_KI105_KI96_Emphasizing_who_LDI_is_for_ALL_CRO5404() {
                var pathName = window.location.href;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics') || pathName.includes('/aesthetic-restorative-dentistry') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_KI105_KI96_Emphasizing_who_LDI_is_for_ALL_CRO5404 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004167234"]);
                    console.log("Experiment Recipe KI105.KI96 | Emphasizing who LDI is for | ALL | CRO-5404 Activated");
                }
            }, test_Recipe_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_v2_ALL_CRO5660() {
                var pathName = window.location.href;
                if (pathName.includes('/orthodontics-dentofacial-orthopaedics') || pathName.includes('/aesthetic-restorative-dentistry') || pathName.includes('/dental-implantology-oral-surgery')) {
                    window.crotest_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_v2_ALL_CRO5660 = 1;
                    window._conv_q = window._conv_q || [];
                    window._conv_q.push(["executeExperiment", "1004169196"]);
                    console.log("Experiment Recipe KI82 | Enhancing Course Page with VLE Product and Video Section (v2) | ALL | CRO-5660 Activated");
                }
            }

        };

        experiments.test_AddingDataPath();

        experiments.test_51_Course_page_functional_design();
        experiments.test_Recipe_57_58_59_Dental_courses_restructure_ALL_CRO_652();

        console.log("Global JavaScript Activate");
        experiments.test_21_32_In_person_training_clarity_All_LDI_237();
        experiments.test_54_55_56_Registration_Page_Guidance_All_LDI_233();
        experiments.test_Recipe_KI80_KI81_VLE_Page_Redesign_and_Navigation_Integration_ALL();
        experiments.test_Recipe_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_ALL();
        experiments.test_Recipe_57_58_59_Dental_courses_restructure_v2_ALL_CRO_652();
        experiments.test_Recipe_KI103_Adding_PDP_section_with_prospectus_download_ALL_CRO_5386();
        experiments.test_Recipe_KI105_KI96_Emphasizing_who_LDI_is_for_ALL_CRO5404();
        experiments.test_Recipe_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_v2_ALL_CRO5660();

        /**
         * Activate all experiments on location change
         */
        function activateExpOnPageChange() {
            experiments.test_AddingDataPath();
            // experiments.test_4_34_41_48_Accreditation_promotion_section_All();
            // experiments.test_home_page_brand_video();
            // experiments.test_3_49_CTAs_prospectus_download();
            // experiments.test_4_34_41_48_Accreditation_promotion_section_All_v2();
            experiments.test_51_Course_page_functional_design();
            // experiments.test_Rollback_Course_page_All_LDI_187();
            // experiments.test_54_55_56_Registration_Page_Guidance_All_LDI_233();
            // experiments.test_21_32_In_person_training_clarity_All_LDI_237();
            // experiments.test_52_53_Mobile_whats_on_this_page_updates_Mobile_CRO_87();

            experiments.test_21_32_In_person_training_clarity_All_LDI_237();
            experiments.test_54_55_56_Registration_Page_Guidance_All_LDI_233();
            experiments.test_Recipe_57_58_59_Dental_courses_restructure_ALL_CRO_652();
            experiments.test_Recipe_KI80_KI81_VLE_Page_Redesign_and_Navigation_Integration_ALL();
            experiments.test_Recipe_KI82_Enhancing_Course_Page_with_VLE_Product_and_Video_Section_ALL();
            experiments.test_Recipe_57_58_59_Dental_courses_restructure_v2_ALL_CRO_652();
            experiments.test_Recipe_KI105_KI96_Emphasizing_who_LDI_is_for_ALL_CRO5404();
            experiments.test_Recipe_KI103_Adding_PDP_section_with_prospectus_download_ALL_CRO_5386();


        }

        // lib.listener(activateExpOnPageChange);
    } catch (e) {
        console.log("Error in Global JavaScript");
    }
})();