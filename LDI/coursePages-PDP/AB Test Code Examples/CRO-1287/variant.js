(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-21_32";
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

        function waitForGeoData(trigger) {
            var interval = setInterval(function () {
                if (window.convert && window.convert.getUserData && window.convert.getUserData().geo) {
                    clearInterval(interval);
                    var geoData = window.convert.getUserData().geo;

                    trigger(geoData);
                }
            }, 50);

            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        var newCard = `<section class="cro-t-21-card-container">
        <div class="cro-t-21-card-container-wrapper cro-container">
            <div class="cro-t-21-card-header">
                <div class="cro-t-21-card-header-text">
                    Your flexible path to a UK-Accredited Diploma
                </div>
            </div>
            <div class="cro-t-21-card-inner">
                <div class="cro-t-21-card card-1">
                    <div class="cro-t-21-card-bottom-inner">
                        <div class="cro-t-21-card-number">
                            1
                        </div>
                        <div class="cro-t-21-card-text">
                            Explore UK-accredited postgraduate diplomas tailored to your career goals. Study online from
                            <span class="cro-t-21-card-text-country"></span> with 12-month courses empowering dentists worldwide.
                        </div>
                    </div>
                </div>
                <div class="cro-t-21-card card-2">
                    <div class="cro-t-21-card-bottom-inner">
                        <div class="cro-t-21-card-number">
                            2
                        </div>
                        <div class="cro-t-21-card-text">
                            Receive the comprehensive LDi Practical Training Kit delivered to your door, enabling
                            immediate
                            hands-on practice of theoretical knowledge.
                        </div>
                    </div>
                </div>
                <div class="cro-t-21-card card-3">
                    <div class="cro-t-21-card-bottom-inner">
                    <div class="cro-t-21-card-number">
                        3
                    </div>
                    <div class="cro-t-21-card-text">
                        Study anytime, anywhere with our 24/7 Virtual Learning Environment, tailored to your time zone
                        and offering on-request clinical support from our tutors.
                    </div>
                </div>
                </div>
                <div class="cro-t-21-card card-4">
                    <div class="cro-t-21-card-bottom-inner">
                    <div class="cro-t-21-card-number">
                     <div class="cro-star"></div>
                    </div>
                    <div class="cro-t-21-card-text">
                        Enhance your learning with optional in-person training in London. Connect with our world-leading
                        faculty and peers at workshops, conferences, and live sessions on your preferred topics.
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`

        var newCardUk = `<section class="cro-t-21-card-container cro-uk-based">
        <div class="cro-t-21-card-container-wrapper cro-container">
            <div class="cro-t-21-card-header">
                <div class="cro-t-21-card-header-text">
                    Your flexible study pathway
                </div>
            </div>
            <div class="cro-t-21-card-inner">
                <div class="cro-t-21-card card-1">
                    <div class="cro-t-21-card-bottom-inner">
                        <div class="cro-t-21-card-number">
                            1
                        </div>
                        <div class="cro-t-21-card-text">
                            Explore our accredited postgraduate diplomas tailored to your career goals. Study online with our 12-month programme, empowering dentists worldwide.
                        </div>
                    </div>
                </div>
                <div class="cro-t-21-card card-2">
                    <div class="cro-t-21-card-bottom-inner">
                        <div class="cro-t-21-card-number">
                            2
                        </div>
                        <div class="cro-t-21-card-text">
                            Receive the comprehensive LDi Practical Training Kit delivered to your door, enabling immediate hands-on practice of theoretical knowledge.
                        </div>
                    </div>
                </div>
                <div class="cro-t-21-card card-3">
                    <div class="cro-t-21-card-bottom-inner">
                    <div class="cro-t-21-card-number">
                        3
                    </div>
                    <div class="cro-t-21-card-text">
                        Study anytime, anywhere with our 24/7 Virtual Learning Environment, tailored to your learning needs and offering on-request clinical support from our tutors.
                    </div>
                </div>
                </div>
                <div class="cro-t-21-card card-4">
                    <div class="cro-t-21-card-bottom-inner">
                    <div class="cro-t-21-card-number">
                     <div class="cro-star"></div>
                    </div>
                    <div class="cro-t-21-card-text">
                        Enhance your learning with optional in-person training in London. Connect with our world-leading faculty and peers at workshops, conferences, and live sessions on your preferred topics.
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

        async function fetchCountryNames() {
            try {
                // Fetch the list of all countries with their codes
                const response = await fetch("https://restcountries.com/v3.1/all");
                const countries = await response.json();

                // Create a country code-to-name mapping dynamically
                const countryNames = {};
                countries.forEach(country => {
                    const code = country.cca2; // ISO Alpha-2 country code (e.g., BD)
                    const name = country.name.common; // Full country name (e.g., Bangladesh)
                    countryNames[code] = name;
                });

                // Get the user's country code from Convert
                const userData = window.convert.getUserData();
                if (userData && userData.geo && userData.geo.country) {
                    const countryCode = userData.geo.country;
                    const countryFullName = countryNames[countryCode] || `Unknown (${countryCode})`;

                    // Log the full country name
                    console.log(`User is from: ${countryFullName}`);
                    waitForElement('.cro-t-21-card-text-country', function () {
                        document.querySelector('.cro-t-21-card-text-country').innerHTML = countryFullName;

                    });
                } else {
                    console.log("Could not detect country.");
                    waitForElement('.cro-t-21-card-text-country', function () {
                        document.querySelector('.cro-t-21-card-text-country').innerHTML = 'UK';
                    });
                }
            } catch (error) {
                console.log("Error fetching country data:");
                waitForElement('.cro-t-21-card-text-country', function () {
                    document.querySelector('.cro-t-21-card-text-country').innerHTML = 'UK';
                });
            }
        }

        // Run the function on page load

        // JSON Object containing all 195 countries
        var countries = [
            { "code": "AF", "name": "Afghanistan" },
            { "code": "AL", "name": "Albania" },
            { "code": "DZ", "name": "Algeria" },
            { "code": "AD", "name": "Andorra" },
            { "code": "AO", "name": "Angola" },
            { "code": "AG", "name": "Antigua and Barbuda" },
            { "code": "AR", "name": "Argentina" },
            { "code": "AM", "name": "Armenia" },
            { "code": "AU", "name": "Australia" },
            { "code": "AT", "name": "Austria" },
            { "code": "AZ", "name": "Azerbaijan" },
            { "code": "BS", "name": "Bahamas" },
            { "code": "BH", "name": "Bahrain" },
            { "code": "BD", "name": "Bangladesh" },
            { "code": "BB", "name": "Barbados" },
            { "code": "BY", "name": "Belarus" },
            { "code": "BE", "name": "Belgium" },
            { "code": "BZ", "name": "Belize" },
            { "code": "BJ", "name": "Benin" },
            { "code": "BT", "name": "Bhutan" },
            { "code": "BO", "name": "Bolivia" },
            { "code": "BA", "name": "Bosnia and Herzegovina" },
            { "code": "BW", "name": "Botswana" },
            { "code": "BR", "name": "Brazil" },
            { "code": "BN", "name": "Brunei" },
            { "code": "BG", "name": "Bulgaria" },
            { "code": "BF", "name": "Burkina Faso" },
            { "code": "BI", "name": "Burundi" },
            { "code": "KH", "name": "Cambodia" },
            { "code": "CM", "name": "Cameroon" },
            { "code": "CA", "name": "Canada" },
            { "code": "CF", "name": "Central African Republic" },
            { "code": "TD", "name": "Chad" },
            { "code": "CL", "name": "Chile" },
            { "code": "CN", "name": "China" },
            { "code": "CO", "name": "Colombia" },
            { "code": "KM", "name": "Comoros" },
            { "code": "CD", "name": "Congo (DRC)" },
            { "code": "CR", "name": "Costa Rica" },
            { "code": "HR", "name": "Croatia" },
            { "code": "CU", "name": "Cuba" },
            { "code": "CY", "name": "Cyprus" },
            { "code": "CZ", "name": "Czech Republic" },
            { "code": "DK", "name": "Denmark" },
            { "code": "DJ", "name": "Djibouti" },
            { "code": "DO", "name": "Dominican Republic" },
            { "code": "EC", "name": "Ecuador" },
            { "code": "EG", "name": "Egypt" },
            { "code": "SV", "name": "El Salvador" },
            { "code": "EE", "name": "Estonia" },
            { "code": "ET", "name": "Ethiopia" },
            { "code": "FI", "name": "Finland" },
            { "code": "FR", "name": "France" },
            { "code": "GA", "name": "Gabon" },
            { "code": "GM", "name": "Gambia" },
            { "code": "GE", "name": "Georgia" },
            { "code": "DE", "name": "Germany" },
            { "code": "GH", "name": "Ghana" },
            { "code": "GR", "name": "Greece" },
            { "code": "GT", "name": "Guatemala" },
            { "code": "GN", "name": "Guinea" },
            { "code": "HT", "name": "Haiti" },
            { "code": "HN", "name": "Honduras" },
            { "code": "HU", "name": "Hungary" },
            { "code": "IS", "name": "Iceland" },
            { "code": "IN", "name": "India" },
            { "code": "ID", "name": "Indonesia" },
            { "code": "IR", "name": "Iran" },
            { "code": "IQ", "name": "Iraq" },
            { "code": "IE", "name": "Ireland" },
            { "code": "IL", "name": "Israel" },
            { "code": "IT", "name": "Italy" },
            { "code": "JM", "name": "Jamaica" },
            { "code": "JP", "name": "Japan" },
            { "code": "KE", "name": "Kenya" },
            { "code": "KR", "name": "South Korea" },
            { "code": "KW", "name": "Kuwait" },
            { "code": "MY", "name": "Malaysia" },
            { "code": "MX", "name": "Mexico" },
            { "code": "NP", "name": "Nepal" },
            { "code": "NL", "name": "Netherlands" },
            { "code": "NZ", "name": "New Zealand" },
            { "code": "NG", "name": "Nigeria" },
            { "code": "NO", "name": "Norway" },
            { "code": "OM", "name": "Oman" },
            { "code": "PK", "name": "Pakistan" },
            { "code": "PH", "name": "Philippines" },
            { "code": "PL", "name": "Poland" },
            { "code": "PT", "name": "Portugal" },
            { "code": "QA", "name": "Qatar" },
            { "code": "RO", "name": "Romania" },
            { "code": "RU", "name": "Russia" },
            { "code": "SA", "name": "Saudi Arabia" },
            { "code": "SG", "name": "Singapore" },
            { "code": "ZA", "name": "South Africa" },
            { "code": "ES", "name": "Spain" },
            { "code": "SE", "name": "Sweden" },
            { "code": "CH", "name": "Switzerland" },
            { "code": "TR", "name": "Turkey" },
            { "code": "GB", "name": "United Kingdom" },
            { "code": "US", "name": "United States" },
            { "code": "VN", "name": "Vietnam" },
            { "code": "YE", "name": "Yemen" },
            { "code": "ZM", "name": "Zambia" },
            { "code": "ZW", "name": "Zimbabwe" }
        ];

        // Function to match country code and display name
        function getUserCountry() {
            // Get user's country code from Convert
            const userData = window.convert?.getUserData();

            if (userData && userData.geo && userData.geo.country) {
                const userCountryCode = userData.geo.country.toUpperCase(); // Ensure uppercase match

                // Find the country name based on the code
                const country = countries.find(c => c.code === userCountryCode);

                if (country) {
                    console.log(`Country: ${country.name}`);
                    waitForElement('.cro-t-21-card-text-country', function () {
                        document.querySelector('.cro-t-21-card-text-country').innerHTML = country.name;
                    });
                } else {
                    console.log(`Country: Unknown (${userCountryCode})`);
                    waitForElement('.cro-t-21-card-text-country', function () {
                        document.querySelector('.cro-t-21-card-text-country').innerHTML = 'UK';
                    });
                }
            } else {
                console.log("Could not detect country.");
                waitForElement('.cro-t-21-card-text-country', function () {
                    document.querySelector('.cro-t-21-card-text-country').innerHTML = 'UK';
                });
            }
        }

        // Run the function
        // getUserCountry();



        /* Variation Init */
        function init() {
            addClass("body", variation_name);

            waitForElement("section .elementor-widget-container h2", function () {
                document.querySelectorAll('section .elementor-widget-container h2').forEach(function (e) {
                    var parent = e.closest('section')
                    if (e.innerHTML.indexOf('Pricing') != -1) {
                        parent.classList.add('cro-t-21_32_pricing')
                    }
                })
            });
            waitForElement('.cro-t-21_32_pricing', function () {
                // fetchCountryNames();

                if (!document.querySelector('.cro-t-21-card-container')) {
                    insertHtml('.cro-t-21_32_pricing', newCard, "afterend");
                }
                if (!document.querySelector('.cro-t-21-card-container.cro-uk-based')) {
                    insertHtml('.cro-t-21_32_pricing', newCardUk, "afterend");
                }
            });

            waitForGeoData(function (geoData) {
                // If country is GB, add class to body
                getUserCountry();
                if (geoData.country === "GB") {
                    document.body.classList.add("cro-gb-user");
                    console.log("Country:", geoData.country);
                }

            });
        }

        /* Initialise variation */
        waitForElement('body', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();