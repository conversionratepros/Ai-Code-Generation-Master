(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro412-t-Fable";
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

        function live(selector, event, callback, context) {
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
                    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
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

        var newSection = `<div class="cro412-carrol-archives-container" id="cro412-carrol-archives-Section">
        <div class="cro412-carrol-archives-wrapper cro-container">
            <div class="cro412-carrol-archives-cards-top">
                <div class="cro412-carrol-archives-cards-top-heading">
                    <div class="cro412-carrol-archives-cards-top-heading-text">
                        Details
                    </div>
                </div>
                <div class="cro412-carrol-archives-cards-top-sub-heading">
                    <div class="cro412-carrol-archives-cards-top-sub-heading-text">
                        
                    </div>
                </div>
            </div>
            <div class="cro412-carrol-archives-card-container">
                <div class="cro412-carrol-archives-card card-1  cro-material" style="display: none;">
                    <div class="cro412-carrol-archives-card-img">
                        <img src="" alt="">
                    </div>
                    <h3 class="cro412-carrol-archives-card-header">Porcelain Perfection</h3>
                    <p class="cro412-carrol-archives-card-subheader">Elevate your dining experience with our exquisite
                        porcelain collection, where timeless elegance meets unparalleled durability. From minimalist
                        white dinnerware with abstract silhouettes to vibrant kitchen accessories featuring Carrol
                        Boyes’ iconic illustrations, our range of porcelain offers something for every aesthetic.  The
                        chip-resistant, non-porous material ensures these pieces remain beautiful for generations to
                        come.</p>
                </div>
                <div class="cro412-carrol-archives-card card-2 cro-design" style="display: none;">
                    <div class="cro412-carrol-archives-card-img">
                        <img src="" alt="">
                    </div>
                    <h3 class="cro412-carrol-archives-card-header">Heritage of Innovative Design</h3>
                    <p class="cro412-carrol-archives-card-subheader">Carrol was a pioneer of the functional art movement
                        in South Africa. Today we carry on her legacy continuing to bring her designs to life so we can
                        present our collectors with innovative and ergonomic pieces. Artful living is epitomised by our
                        designs that enhance daily rituals, transforming them into remarkable moments. 
                    </p>
                </div>
                <div class="cro412-carrol-archives-card card-3 cro-collection" style="display: none;">
                    <div class="cro412-carrol-archives-card-img">
                        <img src="" alt="">
                    </div>
                    <h3 class="cro412-carrol-archives-card-header">Collect the Range</h3>
                    <p class="cro412-carrol-archives-card-subheader">Adorned with Carrol's personal Sketchbook drawings,
                        the Sketchbook ceramic range is designed to entice, delight, and encourage conversation around
                        the table. Bespoke works of art portrayed on the finest porcelain made especially with your home
                        in mind.
                    </p>
                </div>
            </div>
        </div>
    </div>`

        var materialObj = {
            "Porcelain": {
                "wording": "Elevate your dining experience with our exquisite porcelain collection, where timeless elegance meets unparalleled durability. From minimalist white dinnerware with abstract silhouettes to vibrant kitchen accessories featuring Carrol Boyes’ iconic illustrations, our range of porcelain offers something for every aesthetic.  The chip-resistant, non-porous material ensures these pieces remain beautiful for generations to come.",
                "image": "https://crp-clients-images.s3.af-south-1.amazonaws.com/Carrol+boyes/Recipe+%7C+USP+image+cards+Section+%7C+All/cro_412_CB_proclain.png"
            }
        };

        var designerObj = {
            "Carrol Boyes": {
                "wording": "Carrol was a pioneer of the functional art movement in South Africa. Today we carry on her legacy continuing to bring her designs to life so we can present our collectors with innovative and ergonomic pieces. Artful living is epitomised by our designs that enhance daily rituals, transforming them into remarkable moments.",
                "image": "https://carrolboyes.com/media/.renditions/contentpages/designers/CB17_Carrol_PE_Shoot_2016_CROPPED.jpg"
            },
            "Leigh-Zanne Gordon": {
                "wording": "Lee, an Honours graduate from Ruth Prows School of Art, has been with Carrol Boyes for 13 years. Mentored by Carrol, she honed her natural sculpting talent, drawing inspiration from her artistic mother. Lee thrives on hands-on product design, embracing challenges with creativity.",
                "image": "https://carrolboyes.com/media/.renditions/contentpages/designers/Art_Dept_Portraits_Madi_Grey.jpg"
            }
        };

        var collectionObj = {
            "Sketchbook": {
                "wording": "The Sketchbook Range is a beloved collection that has enticed conversation and delight around the table since its conception. Eye-catching and unique to our brand, this collection has introduced the brand to many all over the world with many making their first Carrol Boyes purchase from this range. Deriving from Carrol’s personal illustration, the bespoke works of art in this collection are portrayed on the finest porcelain with your home in mind.",
                "image": "https://carrolboyes.com/media/wysiwyg/collection/March2022/Sketchbook_1100x670.jpg"
            },
            "Swirl": {
                "wording": "The elegantly designed Swirl range provides a beautiful palette for showcasing creative and tasteful recipes tableside. Pure white tones accented by the eminent swirl provide a collectable and essential dinner service range in your home.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/Swirl_1100x670.jpg"
            },
            "Wound Up": {
                "wording": "Organic spirals undulate and bend, forming a range of multi-functional designs. The surfaces of these unpredictable curves reflect light in a unique way creating and illusion of movement.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/CB22_NewWeb_MARCH_WoundUp.jpg"
            },
            "Indigo Girls": {
                "wording": "Inspired by the North-West African dyes used by the Tuareg people, the IndigoGirl range came to life in the hands of Carrol. Flawlessly shaped dinner- and serveware are a perfect showcase for all your favourite dishes.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/IndigoGirls_1100x670.jpg"
            },
            "Sketchbook Black": {
                "wording": "A range characterized by its sleek white line drawings on a black surface. Sketchbook Black demonstrates the evolution of Carrol’s style, as her original illustrations were black-on-white, and she reimagined them onto this ultra-modern white-on-black look.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/SketchbookBlack_1100x670.jpg"
            },
            "Enigma": {
                "wording": "Originally hand-sculpted by Carrol with an intense focus on the mystery and shape of facial features, the Enigma range brings a touch of sensual opulence indoors. Functional design meets mystery. Set the mood with a show stopping sculpted Enigma piece as a décor or dinnerware item.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/Enigma_1100x670.jpg"
            },
            "Dancing Girls": {
                "wording": "Grace your kitchen or table with the vibrant and graceful Dancing Girls Range. Bursts of colour move delicately across the finest New Bone China to bring an airy feel to dinner and serve ware.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/CB22_NewWeb_MARCH_DancingGirls.jpg"
            },
            "Succulent Faces": {
                "wording": "A range inspired by the African landscape. This range plays with juxtaposition. Symbolic of mother nature, a bouquet of expressive succulents lay across a feminine face.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/SucculentFaces_1100x670.jpg"
            },
            "Pop Art": {
                "wording": "Vibrant colours characterise the Pop Art range. Carrol’s sketches make an appearance across this collection against a background of chaotic colour bursts – characteristic of the pop art genre. Bring functional art into your home with this range of new bone china ceramics.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/PopArt_1100x670.jpg"
            },
            "Sea 'n Sky": {
                "wording": "Echoing the calmness & peace of the ocean, enjoy waves of inky-blue hues in this range. Originally hand painted by Carrol Boyes, an oceanic landscape lies across all pieces in this tranquil range.",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/SeaNSky_1100x670.jpg"
            },
            "Iconic": {
                "wording": "A collection of sculptural designer pieces expertly crafted for your home",
                "image": "https://carrolboyes.com/media/.renditions/wysiwyg/collection/March2022/CB22_NewWeb_MARCH_Iconics.jpg"
            }
        };



        /* Variation Init */
        function init() {
            addClass("body", variation_name);

            waitForElement('.catalog-product-view #maincontent .main-inner', function () {
                if (!document.querySelector('.cro412-carrol-archives-container')) {
                    insertHtml('.catalog-product-view #maincontent .main-inner', newSection, "afterend");
                }
            });

            // .product.attribute.description .value
            waitForElement('.product.attribute.description .value', function () {
                var descriptionText = document.querySelector(".product.attribute.description .value").innerText;
                var targetElement = document.querySelector(".cro412-carrol-archives-cards-top-sub-heading-text");

                if (targetElement) {
                    targetElement.innerText = descriptionText;
                }
            });


            waitForElement('[data-th="Designer"]', designerFunction);
            waitForElement('[data-th="Collection"]', collectionFunction);
            waitForElement('[data-th="Material"]', materialFunction);
        }

        function designerFunction() {
            var designer = document.querySelector('[data-th="Designer"]');
            if (designer) {
                var designerValue = designer.innerText.trim();
                var obj = designerObj[designerValue];
                if (obj) {
                    document.querySelector('body').classList.add('showdesigner');
                    document.querySelector('.cro-design .cro412-carrol-archives-card-subheader').innerHTML = obj.wording;
                    if (obj.image) {
                        document.querySelector('.cro-design img').src = obj.image;
                    }
                }
            }
        }

        function collectionFunction() {
            var collection = document.querySelector('[data-th="Collection"]');
            if (collection) {
                var collectionValue = collection.innerText.trim();
                var obj = collectionObj[collectionValue];
                if (obj) {
                    document.querySelector('body').classList.add('showCollection');
                    document.querySelector('.cro-collection .cro412-carrol-archives-card-subheader').innerHTML = obj.wording;
                    if (obj.image) {
                        document.querySelector('.cro-collection img').src = obj.image;
                    }
                }
            }
        }

        function materialFunction() {
            var material = document.querySelector('[data-th="Material"]');
            if (material) {
                var materialValue = material.innerText.trim();
                var obj = materialObj[materialValue];
                if (obj) {
                    document.querySelector('body').classList.add('showMaterial');
                    document.querySelector('.cro-material .cro412-carrol-archives-card-subheader').innerHTML = obj.wording;
                    if (obj.image) {
                        document.querySelector('.cro-material img').src = obj.image;

                    }
                }
            }
        }

        if (!window.cro_t_cb_412) {
            // croEventHandkler();
            window.cro_t_cb_412 = true;
        }

        /* Initialise variation */
        waitForElement('.catalog-product-view', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();