(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-lightHouse_ki7_ki14";
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
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
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
        
        // Reviews data from JSON
        var reviewsData = {
            "product_url": "https://litehouselighting.com/products/outdoor-solar-lantern-with-touch-control",
            "reviews": [
              {
                "name": "Karen V.",
                "rating": 5,
                "date": "2025-03-14",
                "review": "Recently bought Litehouse Outdoor Solar Lanterns to decorate the space for my husband's 60th birthday celebration, and they created the most magical ambiance! The touch control and different colour temperatures are fantastic features, allowing me to adjust the lighting to suit the mood perfectly. I also love that there's no glass to clean, and the sturdy aluminum frame gives it a luxurious feel. The modern design blends beautifully with our home and décor. Plus, being solar-powered makes them even more convenient and eco-friendly. Absolutely loved them—so much so that I bought six! Highly recommend!",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/3/20/HJ1VTpCZmE.jpg"
                ],
                "reply": "Hey Karen V. Thank you for your wonderful feedback on our Outdoor Solar Lanterns💛! We are so pleased to hear they contributed to such a special celebration for your husband's 60th birthday. It's excellent to know the touch control and adjustable color temperatures allowed you to create the perfect atmosphere. We appreciate your mention of the practical design features, such as the absence of glass and the sturdy aluminum frame. Thank you very very much!🤗✨💛"
              },
              {
                "name": "Judith B.",
                "rating": 5,
                "date": "2026-01-08",
                "review": "On the balcony",
                "color": "White",
                "images": [
                  "https://images.loox.io/uploads/2026/1/8/RvjlFJrHz_mid.jpg"
                ]
              },
              {
                "name": "Mark D.",
                "rating": 5,
                "date": "2026-01-07",
                "review": "Nice lights, solar battery does not last nearly as long as they say, even after electric charge, but good enough to get through a long evening outside. Don't expect them to still be on as the sun rises.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/10/s4waLbdsP_mid.jpg"
                ]
              },
              {
                "name": "Valerie L.",
                "rating": 5,
                "date": "2026-01-06",
                "review": "We bought 2 lights. They are very classy look great on the dinner table.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/6/rxfsLMuss_mid.jpg"
                ]
              },
              {
                "name": "Rochelle S.",
                "rating": 5,
                "date": "2026-01-02",
                "review": "Love our new lanterns. Creates a beautiful glow and love the options of 3 different levels of brightness depending on the mood.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/2/U2lSRW8rz_mid.jpg",
                  "https://images.loox.io/uploads/2026/1/2/nlZ8LS5rH_mid.jpg"
                ]
              },
              {
                "name": "Margaret S.",
                "rating": 5,
                "date": "2026-01-02",
                "review": "I ordered a set of lanterns as a gift for my sister and her husband for Christmas. The lanterns arrived safe, sound and on schedule and are already proving to be a welcomed addition to their patio.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/2/iFjz8Mlr0_mid.jpg"
                ]
              },
              {
                "name": "Louise Nadine H.",
                "rating": 5,
                "date": "2025-12-31",
                "review": "We never imagined these lights could be this incredible. No glass. No glare. They are easy on your eyes and with a slight touch they respond to dim down or up. Well built, modern with clean lines. Beautiful, yet disappear in the landscape. Effortless lighting. Price? They are priceless!! More please.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/12/30/35njWM8ee_mid.jpg",
                  "https://images.loox.io/uploads/2025/12/30/OGhBZVvIl_mid.jpg",
                  "https://images.loox.io/uploads/2025/12/30/Z2Hgr36vj_mid.jpg"
                ]
              },
              {
                "name": "Laurent F.",
                "rating": 5,
                "date": "2025-12-31",
                "review": "Nice looking and bright. Will be interesting to see how they hold up in the gulf front air.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/2/wnMHt1uSd_mid.jpg"
                ]
              },
              {
                "name": "William P.",
                "rating": 5,
                "date": "2025-12-30",
                "review": "Nice ambiance",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/12/30/hSViHPm3q_mid.jpg"
                ]
              },
              {
                "name": "Nadine S.",
                "rating": 5,
                "date": "2025-12-30",
                "review": "The quality of these lights is amazing. Love them!",
                "color": "White",
                "images": [
                  "https://images.loox.io/uploads/2025/12/29/c4USlz2Qd_mid.jpg"
                ]
              },
              {
                "name": "John W.",
                "rating": 5,
                "date": "2025-12-29",
                "review": "Sensational product. Design is so clean and finish quality is super.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/12/29/Gh1CZVaKH_mid.jpg"
                ]
              },
              {
                "name": "Andrew C.",
                "rating": 5,
                "date": "2025-12-28",
                "review": "Great light, love the hue and brightness settings.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2026/1/1/3sMbdtFga_mid.jpg"
                ]
              },
              {
                "name": "Leigh B.",
                "rating": 5,
                "date": "2025-12-24",
                "review": "I really love these lanterns. I actually have been using them indoors in the evening and they provide lovely, warm light. I love that I can move them to wherever I'd like and that they can be charged by plugging them in, not just from the sun. The matte black is lovely, sturdy and good quality.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/12/23/ZzuR55dtt_mid.jpg"
                ]
              },
              {
                "name": "Louisa L.",
                "rating": 5,
                "date": "2025-12-19",
                "review": "We are loving the solar lanterns. They seem very sturdy, look beautiful and are easy to use.",
                "color": "Black",
                "images": [
                  "https://images.loox.io/uploads/2025/12/18/Qd4K6eFWa_mid.jpg"
                ]
              },
              {
                "name": "Wade L.",
                "rating": 4,
                "date": "2026-01-07",
                "review": "We like the styling and color. It's been raining here so the solar charging has only lasted about one to two hours per night. Hopefully the charging efficiency will improve as we get closer to summer.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Alan S.",
                "rating": 4,
                "date": "2026-01-06",
                "review": "As ordered. Arrived safely and pretty much when it was meant too. Love the lights",
                "color": "Black",
                "images": []
              },
              {
                "name": "Dana R.",
                "rating": 5,
                "date": "2026-01-06",
                "review": "Better than I expected.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Kate K.",
                "rating": 5,
                "date": "2026-01-05",
                "review": "Great light!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Rien L.",
                "rating": 5,
                "date": "2026-01-05",
                "review": "Sleek minimalist design… love it!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Nicola P.",
                "rating": 5,
                "date": "2026-01-05",
                "review": "The light are awesome and stylish. More importantly the customer service I received when my first order was found to be damaged upon arrival was impressive and the issues immediately resolved.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Robert T.",
                "rating": 5,
                "date": "2026-01-03",
                "review": "First of all, I was impressed with the packaging… very nicely done. While we won't put these to use until spring, the lanterns are a perfect addition to our outdoor seating area. They are well made and the downlight they provide is just the right illumination for an evening outdoors.",
                "color": "White",
                "images": []
              },
              {
                "name": "Diane H.",
                "rating": 5,
                "date": "2026-01-03",
                "review": "Absolutely love these light for lighting my steps to my patio!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Larry G.",
                "rating": 5,
                "date": "2026-01-02",
                "review": "This is an excellent project. It is beautifully made and beautiful. I recommend it.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Barbara B.",
                "rating": 5,
                "date": "2026-01-02",
                "review": "I love everything about this light…the easy usb charging, the three way light levels, the portability of the light and the sleek design.",
                "color": "Black",
                "images": []
              },
              {
                "name": "James A.",
                "rating": 5,
                "date": "2026-01-01",
                "review": "It delivers as promised.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Suzanne D.",
                "rating": 5,
                "date": "2025-12-31",
                "review": "Definitely the easiest way to light an exterior staircase…",
                "color": "Black",
                "images": []
              },
              {
                "name": "William M.",
                "rating": 5,
                "date": "2025-12-30",
                "review": "Great construction quality, excellent light power",
                "color": "Black",
                "images": []
              },
              {
                "name": "Fiona C.",
                "rating": 5,
                "date": "2025-12-30",
                "review": "The most beautiful light, it is perfect.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Charles A.",
                "rating": 5,
                "date": "2025-12-29",
                "review": "Loved it so much I bought more and gave them out as Christmas gifts to my family!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Kenneth T.",
                "rating": 5,
                "date": "2025-12-27",
                "review": "Exactly as promised!",
                "color": "White",
                "images": []
              },
              {
                "name": "Trudy H.",
                "rating": 5,
                "date": "2025-12-26",
                "review": "Love them",
                "color": "Black",
                "images": []
              },
              {
                "name": "Ellen E.",
                "rating": 5,
                "date": "2025-12-26",
                "review": "Wonderful versatile lantern that serves so many purposes - from walking down the trail to intimate table lighting! I have 2 and am planning on buying more. Excellent engineering and construction too!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Ben S.",
                "rating": 4,
                "date": "2025-12-23",
                "review": "While I appreciate the quality and aesthetic appeal of the lamps, I must express a concern regarding their battery life. The batteries do not last as long as advertised.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Tania C.",
                "rating": 5,
                "date": "2025-12-23",
                "review": "Brilliant design.. everything from the product itself down to the packaging.. quality lantern and love the three light settings and elegant simplicity",
                "color": "Black",
                "images": []
              },
              {
                "name": "Jeannine R.",
                "rating": 5,
                "date": "2025-12-23",
                "review": "These are fantastic!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Jenna B.",
                "rating": 5,
                "date": "2025-12-22",
                "review": "This lamp is versatile, very well designed and works well in many styles. The construction is durable, but retains an elegant style. The downlight design makes it more usable in many locations.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Ine M.",
                "rating": 5,
                "date": "2025-12-22",
                "review": "Lovely lights. Very pleasing to see in their clean design.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Randy W.",
                "rating": 5,
                "date": "2025-12-19",
                "review": "I love my lanterns. They look nice lining up on my patio steps.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Patricia S.",
                "rating": 5,
                "date": "2025-12-19",
                "review": "These lights are fantastic. I bought 2 and immediately reordered 2 more. Love them and will order more!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Sandra W.",
                "rating": 5,
                "date": "2025-12-18",
                "review": "Really happy with my purchase. Just as expected.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Ronald M.",
                "rating": 5,
                "date": "2025-12-18",
                "review": "Nice light.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Sherry H.",
                "rating": 5,
                "date": "2025-12-17",
                "review": "It's a Christmas gift and I'll send photos after Christmas.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Linda W.",
                "rating": 5,
                "date": "2025-12-17",
                "review": "Love these lights. They were the perfect addition to our outdoor area.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Dagmar T.",
                "rating": 5,
                "date": "2025-12-17",
                "review": "They are beautiful and modern design.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Michael D.",
                "rating": 5,
                "date": "2025-12-16",
                "review": "Great lights",
                "color": "Black",
                "images": []
              },
              {
                "name": "Mary S.",
                "rating": 5,
                "date": "2025-12-16",
                "review": "They look great.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Leeann T.",
                "rating": 5,
                "date": "2025-12-13",
                "review": "Beautiful lights, amazing quality, people notice them straight away and ask where they're from. Will be buying more!",
                "color": "",
                "images": []
              },
              {
                "name": "Michael W.",
                "rating": 5,
                "date": "2025-12-13",
                "review": "Well constructed. As advertised.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Daniel P.",
                "rating": 5,
                "date": "2025-12-11",
                "review": "Great quality",
                "color": "Black",
                "images": []
              },
              {
                "name": "James B.",
                "rating": 5,
                "date": "2025-12-10",
                "review": "Well engineered and elegant. I'm getting another for a Christmas present.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Tamsey K.",
                "rating": 5,
                "date": "2025-12-10",
                "review": "Great lights!!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Erika F.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Great product",
                "color": "Black",
                "images": []
              },
              {
                "name": "Lee M.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Perfect addition to our outdoor space, we love it.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Charles A.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Great product exceeded expectations",
                "color": "Black",
                "images": []
              },
              {
                "name": "Leah L.",
                "rating": 5,
                "date": "2025-12-08",
                "review": "Great product!",
                "color": "Black",
                "images": []
              },
              {
                "name": "Alan T.",
                "rating": 5,
                "date": "2025-12-04",
                "review": "From a design perspective this is a stunning lamp.. The quality is evident and I love the three dimmer settings. With two options to charge the lamp - solar and USB, I'm looking forward to seeing how long a single charge will last. And finally, compared with other lamps of a very similar design, I think this product gives real value for money. Very happy with this purchase.",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Gilda K.",
                "rating": 5,
                "date": "2025-12-02",
                "review": "Great quality",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Dee M.",
                "rating": 5,
                "date": "2025-12-01",
                "review": "Quick delivery, good sturdy product, three different light levels for ambience or dining. Looks good.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Dee✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Donald R.",
                "rating": 5,
                "date": "2025-11-27",
                "review": "Beautiful design, gorgoues ambience, lovingly packaged! I am about to order more of these wonderful lanterns.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Donald! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Ron T.",
                "rating": 5,
                "date": "2025-11-26",
                "review": "This is the 3rd lantern I have bought from you, just love them!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review, Ron✨ We're so happy you love your lights!"
              },
              {
                "name": "Sandra P.",
                "rating": 5,
                "date": "2025-11-25",
                "review": "Very stylish and a lovely warm light which creates a nice atmosphere.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Sandra✨ We're so happy you love your lights!"
              },
              {
                "name": "Tracey L.",
                "rating": 5,
                "date": "2025-11-25",
                "review": "Perfect light for the coffee table on the deck.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Tracey✨ We're so happy you love your lights!"
              },
              {
                "name": "Jackie T.",
                "rating": 5,
                "date": "2025-11-19",
                "review": "Excellent quality material. Sturdy. Gives a beautiful light and love the various settings. I would live to have a dozen of them in my garden",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review, Jackie✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Elizabeth P.",
                "rating": 5,
                "date": "",
                "review": "Bought these for my son's property to illuminate the front entrance. Look fab and very bright. Got the seal of approval from my very particular electrician son!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Elizabeth! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Dianne F.",
                "rating": 5,
                "date": "2025-11-11",
                "review": "👍",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Dianne ✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Larry F.",
                "rating": 5,
                "date": "2025-11-11",
                "review": "Love em!!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Larry! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Betty H.",
                "rating": 5,
                "date": "2025-11-09",
                "review": "Beautiful construction and quality materials. However, the lanterns don't stay charged for longer than 6 hours, which I am trying to troubleshoot.",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Carol L.",
                "rating": 5,
                "date": "2025-11-04",
                "review": "Looks great. Quality product very happy 😃",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Carol! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Jose F.",
                "rating": 5,
                "date": "2025-11-03",
                "review": "Excellent product, very minimalist design and great material. Works great! Very happy and impressed with it. The different light intensities create the right ambiance in the evening.",
                "color": "",
                "images": [],
                "reply": "Wow, Jose! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Shirley L.",
                "rating": 5,
                "date": "2025-11-03",
                "review": "Love this product!! Strange comment - but! the main reason is that there is no glass (to crack/break), plastic (to scratch), but plain good looking metal.",
                "color": "",
                "images": [],
                "reply": "Wow, Shirley! Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Margaret A.",
                "rating": 5,
                "date": "2025-11-02",
                "review": "This company is just wonderful to deal with. Their products are top notch and the minute I got my first two lanterns, I ordered another two. They are elegant and perfect for lighting up a summer verandah with romantic soft light. Thank you!",
                "color": "",
                "images": [],
                "reply": "Wow, Margaret! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Chaday M.",
                "rating": 5,
                "date": "2025-10-30",
                "review": "We are so happy with our purchase. These lights are stunning, so glad that we decided to buy two, it's so sleek and perfect for any setting. Definitely worth buying. We will be back in the future.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Chaday! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Kevin K.",
                "rating": 5,
                "date": "2025-10-30",
                "review": "So far like the product",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Kevin!💡"
              },
              {
                "name": "Denise E.",
                "rating": 5,
                "date": "2025-10-29",
                "review": "What I was hoping for.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Denise! 💡 We're so happy you love your lights. If you ever need more, we're always here to help"
              },
              {
                "name": "Vatiswa S.",
                "rating": 5,
                "date": "2025-10-23",
                "review": "The product... the packaging presentation all top notch. It was such a pleasure to unwrap. Love, love it. Great job.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Claudia F.",
                "rating": 5,
                "date": "2025-10-23",
                "review": "Just love this! Excellent quality and beautiful 🤩",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Torben H.",
                "rating": 5,
                "date": "2025-10-22",
                "review": "Great product!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your glowing review, Torben!✨"
              },
              {
                "name": "Richard C.",
                "rating": 5,
                "date": "2025-10-22",
                "review": "Great quality and couldn't be happier with this product.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words, Richard! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Melissa T.",
                "rating": 5,
                "date": "2025-10-21",
                "review": "Love it! Thinking I might need more of them though…. So easy that they are solar-powered and weather proof",
                "color": "Black",
                "images": [],
                "reply": "Wow, Melissa! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Jane B.",
                "rating": 5,
                "date": "2025-10-12",
                "review": "I am very happy with them.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Sandy W.",
                "rating": 5,
                "date": "2025-10-12",
                "review": "Amazing service from start to finish! I love customer-centric companies like yours that are super efficient and sell high quality items like the luxury metal solar lanterns I ordered - I am a very happy customer! Sandy",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Cor G.",
                "rating": 4,
                "date": "2025-10-12",
                "review": "So far deem it to be good, solid item.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Rod P.",
                "rating": 5,
                "date": "2025-10-11",
                "review": "Love these Lanton lamps! Very well made — solid, stylish, and classy looking. The three light levels are a great bonus. They look fantastic both indoors and outdoors. I'd highly recommend them!",
                "color": "Black",
                "images": [],
                "reply": "Wow, Rod! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Robyn C.",
                "rating": 5,
                "date": "2025-10-11",
                "review": "Perfect in every way.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your glowing review, Robyn!✨"
              },
              {
                "name": "Meryl B.",
                "rating": 5,
                "date": "2025-10-10",
                "review": "We bought a lantern some time back and simply love it! A friend recently admired it and I took the opportunity to buy her one as a gift - she is over the moon with it!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Finn A.",
                "rating": 5,
                "date": "2025-10-10",
                "review": "Elegant lamps that add just the right look and light for our table.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words, Finn! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Christa B.",
                "rating": 5,
                "date": "2025-10-09",
                "review": "Beautifully packaged! The product is well designed and works fantastic. Great concept!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Karen S.",
                "rating": 5,
                "date": "2025-10-07",
                "review": "Such a classy effective lighting solution. Great service too.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Henri D.",
                "rating": 5,
                "date": "2025-10-07",
                "review": "Thank you, it is a great product! Good quality and it works well.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Alinda N.",
                "rating": 5,
                "date": "2025-10-06",
                "review": "I absolutely love this lantern- it looks amazing- such a simple design, it works in any environment. And the quality is superb- I can see it lasting for many years to come. I have ordered 2 to start with, and will soon be ordering another 2, there are just so many places I can use it. And it will also be my go-to Christmas gift for this year!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Belinda D.",
                "rating": 5,
                "date": "2025-10-06",
                "review": "Love these solar lanterns never let you done!!they give off a beautiful light and help create the mood in the space that they are used. They handle all weather conditions. A must 🥰",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Randy T.",
                "rating": 5,
                "date": "2025-10-01",
                "review": "We're enjoying these beautiful lights very much.  The service and overall experience has been excellent.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words, Randy! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Michael B.",
                "rating": 5,
                "date": "2025-10-01",
                "review": "Everyone loves them !",
                "color": "Black",
                "images": [],
                "reply": "Thank you so much Michael! We're thrilled to hear that everyone loves the lanterns! 🐔✨ That video made our day — your chicken has great taste in lighting! 😄"
              },
              {
                "name": "Nico B.",
                "rating": 5,
                "date": "2025-09-28",
                "review": "This light attracts attention from all visitors, great product",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Elouwize R.",
                "rating": 5,
                "date": "2025-09-27",
                "review": "Best outdoor lights ever. Gives a nice atmosphere.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Dan H.",
                "rating": 5,
                "date": "2025-09-23",
                "review": "Love the lights!",
                "color": "White",
                "images": [],
                "reply": "Thank you for your glowing review, Dan!✨"
              },
              {
                "name": "Tiffany T.",
                "rating": 5,
                "date": "2025-09-22",
                "review": "Well made, lovely lamps!!",
                "color": "black",
                "images": [],
                "reply": "Thank you for the glowing review, Tiffany! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Mary N.",
                "rating": 5,
                "date": "2025-09-19",
                "review": "Beautiful!",
                "color": "black",
                "images": [],
                "reply": "Thank you for the glowing review, Mary! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Alex V.",
                "rating": 5,
                "date": "2025-09-17",
                "review": "The lantern is beautifully crafted and is absolutely necessary on any camping table or picnic table. I even use it on my back porch table at home to play cards by or to read!",
                "color": "black",
                "images": [],
                "reply": ""
              },
              {
                "name": "David D.",
                "rating": 5,
                "date": "2025-09-15",
                "review": "I was very skeptical of this product. I ended up ordering it when I was drunk and did not even remember ordering it when it arrived in the mail. I use it every day. It is truly a high-quality product and I'm about to order another one…. While sober.",
                "color": "black",
                "images": [],
                "reply": "Thanks so much for the honest (and hilarious!) review😄 — we're thrilled you're loving the lantern, no matter how it got to you! If you ever need more, we're always here to help!"
              },
              {
                "name": "Ryan H.",
                "rating": 5,
                "date": "2025-09-12",
                "review": "I've had the lantern for a few weeks now and it has added so much to our outdoor space in terms of looks and functionality. We have had plenty of solar powered lights in the last few years, but they only last one year before the solar panels themselves start fading over and become less effective. As soon as I took this out of the box, I could tell this was going to give us many years of good use. It feels like it's going to last a long time and doesn't feel cheap by any means. The lighting color temperature is just right for us — not too warm or cool.",
                "color": "black",
                "images": [],
                "reply": "Wow, Ryan! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Nancy N.",
                "rating": 5,
                "date": "2025-09-11",
                "review": "It has great light and I love that I can keep it outdoors in the weather",
                "color": "black",
                "images": [],
                "reply": "Thank you for the glowing review, Nancy! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Shari S.",
                "rating": 5,
                "date": "2025-09-02",
                "review": "Great quality and design.",
                "color": "black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Kenneth G.",
                "rating": 5,
                "date": "2025-08-24",
                "review": "Good experience",
                "color": "black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Alex V.",
                "rating": 5,
                "date": "2025-08-23",
                "review": "This Lighthouse Lantern is so Awesome! It has great light, it is weight and attractive. I highly recommend this for anyone who wants table lighting on their back deck or boat at night.",
                "color": "black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Clare M.",
                "rating": 5,
                "date": "2025-08-22",
                "review": "such a gorgeous, simple but stunning lamp - absolutely love them!!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Ryan D.",
                "rating": 5,
                "date": "2025-08-20",
                "review": "They look great!",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Kyle H.",
                "rating": 5,
                "date": "2025-08-18",
                "review": "love it!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Jaco C.",
                "rating": 5,
                "date": "2025-08-15",
                "review": "Great quality👍🏼",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Megan M.",
                "rating": 5,
                "date": "2025-08-12",
                "review": "Great outside lights. Amazing quality and construction",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Megan!💡"
              },
              {
                "name": "Wade G.",
                "rating": 5,
                "date": "2025-08-10",
                "review": "Man, I'm beyond stoked with my Lighthouse! We've got an outdoor balcony here in Manhattan, and it's absolutely perfect for the space. Just last night we played a round of cards as the sun was setting, and the Lighthouse gave off the perfect warm glow—enough light to see clearly, but still keeping that cozy evening vibe. Absolutely love it!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Wade!💡We're thrilled to hear the Lighthouse is lighting up your Manhattan balcony just right ✨ We'd love to see your setup—feel free to tag us @litehouse! 🌟 #LitehouseMoments"
              },
              {
                "name": "David R.",
                "rating": 5,
                "date": "2025-08-09",
                "review": "Awesomeness",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, David!💡"
              },
              {
                "name": "Marc G.",
                "rating": 5,
                "date": "2025-08-03",
                "review": "Well made nice design.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Marco! 💡 We're so happy you love your lights. If you ever need more, we're always here to help"
              },
              {
                "name": "Brian O.",
                "rating": 5,
                "date": "2025-08-01",
                "review": "Love the solar lanterns. They're beautiful, built from quality material and appear to be durable.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Jocelyn S.",
                "rating": 5,
                "date": "2025-08-01",
                "review": "will buy more",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Jocelyn! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Christie K.",
                "rating": 5,
                "date": "2025-07-31",
                "review": "Great, quality light fixture! I purchased two lanterns to use in my backyard for a low/no power option and these are the perfect option. I can leave them on my deck to charge and they're heavy enough to not blow away. The solar panel is well integrated into the design, as well as the USB port.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Christie! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Dan P.",
                "rating": 5,
                "date": "2025-07-29",
                "review": "Great product. Beautiful and sturdy…",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Dan! 💡"
              },
              {
                "name": "Mitchell D.",
                "rating": 5,
                "date": "2025-07-26",
                "review": "Love this item. The other night we found 2 little toads on the platform bug hunting.",
                "color": "Black",
                "images": [],
                "reply": "We're so happy you love your lights. Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Megan M.",
                "rating": 5,
                "date": "2025-07-23",
                "review": "Really modern but classy outdoor lights.",
                "color": "black",
                "images": [],
                "reply": "Thank you for the glowing review, Megan! 💡 We're so happy you love your Lantern. If you ever need more, we're always here to help!"
              },
              {
                "name": "Jose N.",
                "rating": 5,
                "date": "2025-07-22",
                "review": "Wonderful Compact Lantern. Gives nice amount of light, easy to charge. Love the handle to be able to move it around. Worth the price. Very nicely made.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "John B.",
                "rating": 5,
                "date": "2025-07-22",
                "review": "Love the lights - they look fantastic on my deck.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "William S.",
                "rating": 5,
                "date": "2025-07-21",
                "review": "Lights are great - very bright light but adjustable if needed and look great - everything we needed",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Richard A.",
                "rating": 5,
                "date": "2025-07-20",
                "review": "They are perfect, exactly what I was looking for…",
                "color": "Black",
                "images": [],
                "reply": "Thank you so much, Richard! ✨ We're thrilled that you're loving your Litehouse lights! Enjoy creating better, brighter moments. 💛"
              },
              {
                "name": "Donald W.",
                "rating": 5,
                "date": "2025-07-17",
                "review": "We bought 3 for our backyard and these are absolutely fantastic!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Donald!💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Ivan J.",
                "rating": 5,
                "date": "2025-07-14",
                "review": "This is the best solar lamp I've ever used.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Marino Z.",
                "rating": 5,
                "date": "2025-07-13",
                "review": "Very good ambient light",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Robert D.",
                "rating": 5,
                "date": "2025-07-07",
                "review": "Great product, quick delivery, good price.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Yugesh N.",
                "rating": 5,
                "date": "2025-06-23",
                "review": "Sturdy and stylish!",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Linda L.",
                "rating": 5,
                "date": "2025-06-21",
                "review": "Absolutely fabulous solar lanterns, have made early morning patio coffee so awesome! Love them!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Patricia G.",
                "rating": 5,
                "date": "2025-06-19",
                "review": "Perfect , and wonderful service",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review✨"
              },
              {
                "name": "Amanda A.",
                "rating": 5,
                "date": "2025-06-09",
                "review": "Thank you for excellent service, and great product. Quality is amazing, and quality of the output light is also amazing. I just love this outdoor Lantern.",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words!  This means so much to us—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Glen W.",
                "rating": 5,
                "date": "2025-06-08",
                "review": "It's exactly what I've been looking for to spruce up my outdoor seating area!",
                "color": "",
                "images": [],
                "reply": "We're so happy you love your lanterns. If you ever need more, we're always here to help!"
              },
              {
                "name": "Tracey A.",
                "rating": 5,
                "date": "2025-06-06",
                "review": "Wonderful product",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review✨"
              },
              {
                "name": "Spencer J.",
                "rating": 5,
                "date": "2025-06-06",
                "review": "They are great lights for outdoors",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Michele B.",
                "rating": 5,
                "date": "2025-06-02",
                "review": "gave it as a gift to my son for outdoor use and was immediately put in baby's room for use during night time feeds!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review ✨We're so happy to hear the lantern found its perfect place in your son's baby room for night-time feeds."
              },
              {
                "name": "Frank S.",
                "rating": 5,
                "date": "2025-05-30",
                "review": "Wonderlight.",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Annerien D.",
                "rating": 5,
                "date": "2025-05-30",
                "review": "It is a great product",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Teresa R.",
                "rating": 5,
                "date": "2025-05-28",
                "review": "Works well, looks beautiful !",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Kathy R.",
                "rating": 5,
                "date": "2025-05-28",
                "review": "So easy to charge and use and look gorgeous too",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review. We're so happy you love your lights. If you ever need more, we're always here to help!✨"
              },
              {
                "name": "Trish M.",
                "rating": 5,
                "date": "2025-05-27",
                "review": "Best lantern ever",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review💡 We're so happy you love your lights."
              },
              {
                "name": "Leesa C.",
                "rating": 5,
                "date": "2025-05-27",
                "review": "I'm buying two more; hands down the best light for cooking while camping in the dark. It doesn't shine in your eyes (like every other camping light) and illuminates a large enough area to easily cover your chopping board and prep area. Nice and sturdy too; does not knock over easily and balances well on uneven ground. Plus sexy design, what more could you want.",
                "color": "Black",
                "images": [],
                "reply": "That's absolutely fantastic to hear! We're thrilled that our light has proven to be the best for your camping cooking needs.\n\nYour detailed feedback is incredibly valuable – it's great to know that the eye-friendly illumination, wide coverage for your prep area, and the sturdy, stable design are making such a positive difference.\n\nKnowing you're buying two more truly speaks volumes. Thank you for choosing us and for sharing your wonderful experience!"
              },
              {
                "name": "Megan V.",
                "rating": 5,
                "date": "2025-05-26",
                "review": "Seamless journey from when I ordered to my product arriving. Beautiful lights- so happy!!",
                "color": "White",
                "images": [],
                "reply": "That's absolutely wonderful to hear! We're thrilled that you had such a seamless journey from ordering to receiving your product, and even more delighted that you're so happy with your beautiful lights!"
              },
              {
                "name": "Volker S.",
                "rating": 5,
                "date": "2025-05-25",
                "review": "Nice lights, good quality. We like it",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Kerem G.",
                "rating": 5,
                "date": "2025-05-23",
                "review": "Just great. We have 6 by now",
                "color": "",
                "images": [],
                "reply": "Thank you for your kind words! We'd love to see your setup—feel free to tag us @litehouse! 🌟 #LitehouseMoments"
              },
              {
                "name": "Hannelie S.",
                "rating": 5,
                "date": "2025-05-23",
                "review": "Excellent and beautiful!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Sara F.",
                "rating": 5,
                "date": "2025-05-20",
                "review": "I am absolutely THRILLED with my lanterns, I have 2 black ones, and have just ordered 2 white ones... I only wish I could afford to have them all around my garden and home!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Gareth H.",
                "rating": 5,
                "date": "2025-05-19",
                "review": "They're very elegant. I bought similar ones from Amazon but they have a design fault with the switches - they stop switching on. Also they didn't dim. These work perfectly. We're using them indoors because we love their design.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Lou P.",
                "rating": 5,
                "date": "2025-05-18",
                "review": "We use it indoors beause it assists me with my vision problems. It is very easy to carry it around, put it on a surface above the workspace and to hold a small object directly under the light. It is a brilliant design.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Rozelle H.",
                "rating": 5,
                "date": "2025-05-17",
                "review": "Luvit!!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Sean S.",
                "rating": 5,
                "date": "2025-05-17",
                "review": "Awesome product.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Jude W.",
                "rating": 5,
                "date": "2025-05-15",
                "review": "Love the soft candlielit effect.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Emily M.",
                "rating": 5,
                "date": "2025-05-13",
                "review": "Sturdy chic useful",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Travis S.",
                "rating": 5,
                "date": "2025-05-12",
                "review": "Fantastic light. Well made , durable , great battery life. It's a great addition to any camp setup",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Kugeshen G.",
                "rating": 5,
                "date": "2025-05-11",
                "review": "Provides excellent lighting for the piano",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Trish M.",
                "rating": 5,
                "date": "2025-05-09",
                "review": "Amazing lantern -fantastic service",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Alexandra V.",
                "rating": 5,
                "date": "2025-04-28",
                "review": "Sleek design and amazing quality",
                "color": "Black",
                "images": [],
                "reply": ""
              },
              {
                "name": "Anette M.",
                "rating": 5,
                "date": "2025-04-25",
                "review": "We love our lamp and will buy another one",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Riana V.",
                "rating": 5,
                "date": "2025-04-24",
                "review": "Amazing product, thanks",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Patricia G.",
                "rating": 5,
                "date": "2025-04-13",
                "review": "so elegant ✨️",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Katharine B.",
                "rating": 5,
                "date": "2025-04-01",
                "review": "I love my Solar Lanterns. So elegant , well designed and they throw just the right amount of light for sophisticated dining outdoors. The warm yellow low light settings is good as it does not attract too many insects.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Laura A.",
                "rating": 5,
                "date": "2025-03-23",
                "review": "Love this!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Francois S.",
                "rating": 5,
                "date": "2025-03-07",
                "review": "Solid quality. Works well. I use it in the baby room",
                "color": "Black",
                "images": [],
                "reply": "Hi Francois S. We're absolutely delighted to hear that you're finding our Outdoor Solar Lantern with Touch Control to be of solid quality and that it's working so well for you! 🌟Knowing that it's providing a gentle and reliable light source in your baby's room makes us incredibly happy. It's wonderful to hear it's found such a perfect purpose! 💖 Thank you for sharing your positive experience. We truly appreciate your feedback!"
              },
              {
                "name": "Jessie H.",
                "rating": 5,
                "date": "2025-03-07",
                "review": "So powerful! About to order two more!",
                "color": "Black",
                "images": [],
                "reply": "Hi Jessie H. This is absolutely amazing to hear! We are so happy to hear that you are loving your Lantern and that you are about to order more! 💛✨ To more, better, brighter moments! 🥰🥰🥰"
              },
              {
                "name": "Martin P.",
                "rating": 2,
                "date": "2025-03-01",
                "review": "The quality looks good but it has a totally fatal design flaw. It doesn't have a day/night sensor so stays on all the time. This means that if you forget it on during the day, the battery doesn't charge. Even the cheapest Temu lanterns have this function to come on at night only. I really regret my purchase.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Kim L.",
                "rating": 5,
                "date": "2025-03-01",
                "review": "Wonderful at the seaside and no glass to keep clean!",
                "color": "White",
                "images": [],
                "reply": "Hey Kim L. Thank you very much for sharing your bright moments with us! Look at that BEAUTY! 😍😍😍 We could not thank you enough! We hope that you continue to enjoy your lit-up moments! ✨"
              },
              {
                "name": "Carina G.",
                "rating": 5,
                "date": "2025-02-23",
                "review": "Sturdy, well made. Great soft downward light.",
                "color": "Blcak",
                "images": [],
                "reply": "Hey Carina G. We're delighted to hear you're pleased with the sturdiness and quality of your Outdoor Solar Lantern, and that you're enjoying the soft, downward light from your lantern. We really appreciate it!✨"
              },
              {
                "name": "Abby M.",
                "rating": 5,
                "date": "2025-02-22",
                "review": "Love this lantern! Sturdy & elegant which gives off a beautiful warm glow.  Highly recommended",
                "color": "Black",
                "images": [],
                "reply": "Hi Abby M. Excellent! We really appreciate your amazing review and that you love the craftsmanship and the warm light it provides. Enjoy!💯💛"
              },
              {
                "name": "Abby M.",
                "rating": 5,
                "date": "2025-02-22",
                "review": "Love this lantern! Sturdy & elegant which gives off a beautiful warm glow.  Highly recommended",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Francois V.",
                "rating": 5,
                "date": "2025-02-18",
                "review": "The solar lantern worked perfectly for our outdoor entertainment area.  The problem we used to phase was either to much lite when just sitting outside or not enough lite when we wanted to enjoy a meal outside. Now with the touch of a button or relocation of the lantern the issue is resolved. Impressed with the quality of the lantern and ease of use. Already have plans for some of the other lights in the range.",
                "color": "Black",
                "images": [],
                "reply": "Hi Francois V. Thank you for the great review! We're pleased you find our solar lantern to be a good value✨ . We strive to offer top-quality products, and your feedback is very encouraging. Thank you very much! Cheers to more enjoyment and meals outside.🥰💛"
              },
              {
                "name": "Francois V.",
                "rating": 5,
                "date": "2025-02-18",
                "review": "The solar lantern worked perfectly for our outdoor entertainment area. The problem we used to phase was either to much lite when just sitting outside or not enough lite when we wanted to enjoy a meal outside. Now with the touch of a button or relocation of the lantern the issue is resolved. Impressed with the quality of the lantern and ease of use. Already have plans for some of the other lights in the range.",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Hester V.",
                "rating": 5,
                "date": "2025-02-17",
                "review": "Heavy, solid lantern with a pool of light!",
                "color": "Black",
                "images": [],
                "reply": "Hey Hester V. You have made our day! Thank you for your wonderful words and amazing review! We hope that you enjoy! 💛"
              },
              {
                "name": "James K.",
                "rating": 5,
                "date": "2025-01-23",
                "review": "I bought this lantern to add a little charm to my deck, and it's honestly become the star of the space. I've even taken it inside when I wanted to set a relaxing mood in my living room. Highly recommend this for anyone looking!",
                "color": "",
                "images": [],
                "reply": "Hey James K. That's awesome🤗 ! So glad you're loving your new lantern. It's always great to hear when our customers find creative ways to use our products, taking it from the deck to the living room is a brilliant idea! Thanks for the shout-out and the recommendation! With Love, Litehouse team!"
              },
              {
                "name": "Amanda S.",
                "rating": 5,
                "date": "2025-01-23",
                "review": "I was looking for an outdoor lantern for ages! This lantern is IT! It's beautiful, and the light output is just right—not too harsh, not too dim. The modern design gets compliments from everyone who visits. Litehouse clearly knows how to blend design with practicality. I'll definitely be purchasing more for my space!",
                "color": "",
                "images": [],
                "reply": "Hi Amanda S. We're so happy you finally found the perfect outdoor lantern!  It's fantastic to hear that it's exactly what you were looking for and that you appreciate the light output and design✨ . We appreciate your kind words and look forward to helping you enhance your space further! Thank you very much, Amanda! 💛"
              },
              {
                "name": "Amanda S.",
                "rating": 5,
                "date": "2025-01-23",
                "review": "I was looking for an outdoor lantern for ages! This lantern is IT! It's beautiful, and the light output is just right—not too harsh, not too dim. The modern design gets compliments from everyone who visits. Litehouse clearly knows how to blend design with practicality. I'll definitely be purchasing more for my space!",
                "color": "",
                "images": [],
                "reply": ""
              },
              {
                "name": "Liesl L.",
                "rating": 5,
                "date": "2025-12-19",
                "review": "Stylish, sturdy and sleek. So glad I bought these",
                "color": "",
                "images": []
              },
              {
                "name": "Kim H.",
                "rating": 5,
                "date": "2025-12-17",
                "review": "Love them! Shipped quickly and add a wonderful ambience. Looking forward to purchasing more.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Mark D.",
                "rating": 5,
                "date": "2025-12-16",
                "review": "I've only use them indoors so far, but love the lights. Look forward to using the solar in all night lighting once spring arrives.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Vanessa V.",
                "rating": 5,
                "date": "2025-12-10",
                "review": "Just unpacked and already working on pure solar! Absolutely stunning, while also creating a beautiful atmosphere! Thank you",
                "color": "",
                "images": []
              },
              {
                "name": "Andrew M.",
                "rating": 5,
                "date": "2025-12-10",
                "review": "We love these lights - so stylish and effective, and we will be buying more",
                "color": "Black",
                "images": []
              },
              {
                "name": "Riandie D.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Love this product. It gives a magical atmosphere",
                "color": "",
                "images": []
              },
              {
                "name": "Rainbow C.",
                "rating": 5,
                "date": "2025-12-06",
                "review": "The lantern is exactly as advertised! Amazing materials, strong lighting and it looks expensive! I can't live this more. Be it like by the staircase or on the table for extra warm lighting, this is really perfect.",
                "color": "",
                "images": []
              },
              {
                "name": "Steve M.",
                "rating": 5,
                "date": "2025-12-05",
                "review": "Beautiful, high quality lamps. Instantly gives your garden that smart lodge look! As impressive is the solar panel mounted on top… moulded into durable plastic that does not look like a solar panel at all!",
                "color": "",
                "images": []
              },
              {
                "name": "Allan K.",
                "rating": 5,
                "date": "2025-12-02",
                "review": "The lights are fantastic and make for a very romantic setting. We bought 2 one for our Plett house and one for our Cape Town house I can recommend them without reservation",
                "color": "",
                "images": []
              },
              {
                "name": "Michael M.",
                "rating": 5,
                "date": "2025-11-27",
                "review": "Great light, lovely design and just super cool. Bought 2 for our friends as Christmas presents!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review, Michael✨ We're so happy you love your lights!"
              },
              {
                "name": "Rosaly S.",
                "rating": 5,
                "date": "2025-11-23",
                "review": "Absolutely love this lantern! Only thing I regret is that I ordered only one, and not two! Beautiful and incredible lighting.",
                "color": "",
                "images": [],
                "reply": "Hi Rosaly, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Cheryl H.",
                "rating": 5,
                "date": "2025-11-23",
                "review": "I absolutely love my lanterns, they look beautiful and create a lovely ambience. I am going to buy more....highly recommended!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review, Cheryl✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Roslyn R.",
                "rating": 5,
                "date": "2025-11-21",
                "review": "Superior classy product",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review, Roslyn✨ We're so happy you love your lights!"
              },
              {
                "name": "Paula M.",
                "rating": 5,
                "date": "2025-11-08",
                "review": "High quality! Do not feel like plastic and this is the best part for me. Excellent quality and looks very elegant on a dinner table. Light is strong enough to light the table. Very happy with the purchase",
                "color": "",
                "images": [],
                "reply": "Wow, Paula! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Cathy L.",
                "rating": 5,
                "date": "2025-11-02",
                "review": "We absolutely love these beautiful lanterns… Use them every evening!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Cathy!✨"
              },
              {
                "name": "Jerwin T.",
                "rating": 5,
                "date": "2025-10-18",
                "review": "well made and durable and looks great!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Jerwin! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Megan C.",
                "rating": 5,
                "date": "2025-10-06",
                "review": "Couldn't be happier with the light! It's incredible quality and last so long!",
                "color": "",
                "images": []
              },
              {
                "name": "Kate L.",
                "rating": 5,
                "date": "2025-09-27",
                "review": "We absolutely love our solar lanterns. They were the best addition to our camping trip. Perfect for around the campsite or dinner table at night. As well as super helpful for reading in the evenings in our tents. We're definitely going to invest in a few more !!",
                "color": "",
                "images": []
              },
              {
                "name": "Benjamin N.",
                "rating": 5,
                "date": "2025-09-25",
                "review": "I originally received 3 lanterns that did not work with the automatic turn on/turn off dusk to dawn feature. However, LiteHouse sent me 3 additional lanterns that has this feature. These lanterns are awesome by the pool!",
                "color": "",
                "images": []
              },
              {
                "name": "Cathy L.",
                "rating": 5,
                "date": "2025-09-24",
                "review": "Such a beautiful lighting source… Nothing quite like it… And I love the ease of use, ease of charging and the multiple light levels!",
                "color": "Black",
                "images": [],
                "reply": "Wow, Cathy! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights!"
              },
              {
                "name": "Sean H.",
                "rating": 5,
                "date": "2025-09-08",
                "review": "So far I'm really liking these lanterns. Just finishing up building a new deck, and used these lanterns for step lights instead of drilling into the new deck boards and running low voltage deck lighting. Makes the steps much less scary for the doggos when we let them out at night, and they create a nice ambience that we can also move around as we see fit. Going to order the string lights next for the pergola.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Sean! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Bart V.",
                "rating": 5,
                "date": "2025-09-07",
                "review": "Love these lights, no need for USB cables, just leave it in a light place and it charges. I use it during dinner as table lights or move aound with it around the hiuse and property",
                "color": "Black",
                "images": [],
                "reply": "Thank you so much for your kind words! We're thrilled to hear how much you're enjoying the lanterns —wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Stanley G.",
                "rating": 5,
                "date": "2025-09-03",
                "review": "This lamp outshines its competitors in quality, looks, and battery life. It's in a class by itself.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Stanley! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Angela S.",
                "rating": 5,
                "date": "2025-08-30",
                "review": "These lanterns are absolutely perfect for the space we've created. Bright enough on full and love the ambiance they create on the lower settings. They can be easily carried and moved around which is a huge benefit. We love them .",
                "color": "",
                "images": []
              },
              {
                "name": "Yelena M.",
                "rating": 5,
                "date": "2025-08-24",
                "review": "My husband thinks that I'm obsessed with my lanterns! Lol. I think he is right. I've had them for 9 days now. They are simply beautiful and I can't wait till it starts getting darker, so I can see the lights go off. I'm planning to get 2 more lanterns. Extremely impressed! Great quality and my husband said that he had never seen lanterns this beautiful and stylish! So yes! Strongly recommend this product!!!",
                "color": "",
                "images": []
              },
              {
                "name": "Tomas S.",
                "rating": 5,
                "date": "2025-08-20",
                "review": "⭐️⭐️⭐️⭐️⭐️",
                "color": "Black",
                "images": []
              },
              {
                "name": "Rick C.",
                "rating": 5,
                "date": "2025-08-16",
                "review": "They are very elegant and give a warm glow around the patio",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Rick! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Lane K.",
                "rating": 5,
                "date": "2025-07-25",
                "review": "These were better than my expectations! They are absolutely beautiful and the construction is fabulous. The light it throws out is amazing.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Lane!💡We're so happy you love your Lanterns. If you ever need more, we're always here to help!"
              },
              {
                "name": "Adrianne K",
                "rating": 5,
                "date": "2025-07-20",
                "review": "So worth the money! Heavy, nice light, feels very well made. Feel very encouraged that these will last for a long time.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Lindy P.",
                "rating": 5,
                "date": "2025-07-13",
                "review": "Such great lights, wonderful quality and stylish.",
                "color": "",
                "images": []
              },
              {
                "name": "Lori S.",
                "rating": 5,
                "date": "2025-07-11",
                "review": "I tried to resist buying these thinking it was just another cheap gimmicky low quality lantern. We have just moved into a lodge in a wildlife estate and had to give into my urge for some solar lanterns by our fire pit and rim-flow pool. The photos and videos don't do these lanterns justice. Really excellent quality and work as advertised and way better than I was hoping. We are going to order a few more. We are in love!",
                "color": "",
                "images": []
              },
              {
                "name": "Shan B.",
                "rating": 5,
                "date": "2025-07-10",
                "review": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨",
                "color": "",
                "images": []
              },
              {
                "name": "Sandy S.",
                "rating": 5,
                "date": "2025-07-10",
                "review": "Beautiful product - has added an air of elegance to our outdoor space! Outstanding quality and service from Litehouse!",
                "color": "",
                "images": [],
                "reply": "Thank you for the glowing review! We're so happy you love your lights. If you ever need more, we're always here to help!✨"
              },
              {
                "name": "Catharine S.",
                "rating": 5,
                "date": "2025-05-15",
                "review": "Lighting up our kitchen space for our after dinner aperitif ... so elegant",
                "color": "",
                "images": []
              },
              {
                "name": "Sacha S.",
                "rating": 5,
                "date": "2025-02-18",
                "review": "Absolutely love this lantern! We use it every single evening—it adds the perfect warm glow to our verandah meals with just the touch of a button. We even took it on a cabin stay last week, and it was perfect! The dimmer setting creates a beautiful ambience, while the brightest setting gives amazing light to see exactly what you're eating. Another incredible product from Litehouse—thank you!",
                "color": "",
                "images": [],
                "reply": "Hi Sacha S. We're so happy to hear you're enjoying your Solar Lantern 🥰! It sounds like it's become a cherished part of your evenings, both at home and away. We love that you're making the most of the dimmer and bright settings – exactly how we envisioned it being used! Thank you for sharing your experience and for your continued support of Litehouse.✨🔥💛"
              },
              {
                "name": "Emily P.",
                "rating": 5,
                "date": "2025-01-23",
                "review": "I recently added one of these sleek, modern lanterns to my patio setup, and it has completely transformed the ambiance! The soft, warm glow creates the perfect atmosphere for relaxing evenings outdoors. I love the minimalist design—it's both stylish and functional, seamlessly blending with my outdoor decor. The quality is top-notch, and it feels incredibly durable. Plus, it's portable, so I can easily move it around wherever I need a touch of light. Whether I'm hosting friends or enjoying a quiet night with a book, this lantern has become a must-have for my space. Highly recommend for anyone looking to elevate their outdoor living area. Litehouse has knocked it out of the park with this one!",
                "color": "",
                "images": [],
                "reply": "Hi Emily P. Wow, Emily, thank you so much for this fantastic feedback! We're so happy to hear how much you're enjoying your new solar lantern. It's wonderful that it's become such a perfect addition to your patio and that you appreciate the design, quality, and portability. We really appreciate you taking the time to share your experience – it means a lot to us!💛"
              },
              {
                "name": "Kerry D.",
                "rating": 5,
                "date": "2026-01-12",
                "review": "Beautiful & sturdy",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Kerry✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Macey B.",
                "rating": 5,
                "date": "2026-01-12",
                "review": "Arrived in good time. Waiting to move house so not in use yet but they look really good and true to the promotion pics. Lovely subtle light shining downwards.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Macey✨ We're so happy you love your lights!"
              },
              {
                "name": "Duncan I.",
                "rating": 5,
                "date": "2026-01-10",
                "review": "This was a gift to my nephews in Key West. They just built an ultra modern townhouse with pool and deck behind an 1890's belle époque house. The modern lines and historic look of the lights harmonize and embellish either the front porch or the sleek pool deck. Either way a win-win.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Sabine H.",
                "rating": 5,
                "date": "2026-01-09",
                "review": "The lanterns look great, even better than on the pictures. They are well-made and function perfectly.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Judith R.",
                "rating": 5,
                "date": "2026-01-09",
                "review": "They are beautiful and work great. Easy to set up and use. Love how they look in our backyard! I would buy again.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Clare O.",
                "rating": 5,
                "date": "2026-01-08",
                "review": "Arrived promptly. Beautifully packaged and just what i want next to my cedar hot tub",
                "color": "Black",
                "images": []
              },
              {
                "name": "Chec C.",
                "rating": 5,
                "date": "2026-02-09",
                "review": "dsadas",
                "color": "",
                "images": []
              },
              {
                "name": "Nancy W.",
                "rating": 4,
                "date": "2026-02-09",
                "review": "I love the looks and the way it lights up my Japanese style garden at night. One of the two lights works as advertised (charges in about four hours) , but the other is very slow to charge (more than 8 hours). It never seems to get to green.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Kiri R.",
                "rating": 5,
                "date": "2026-02-07",
                "review": "Love these lights. They give off a really nice warm glow and make the deck feel cosy without being too bright or in your face. They light up the space and plants perfectly and just make the whole area feel more inviting at night. I liked them so much once they were set up that I went back and bought another two. Stoked with how they look and would happily recommend them",
                "color": "Black",
                "images": []
              },
              {
                "name": "Monica R.",
                "rating": 5,
                "date": "2026-02-06",
                "review": "I love turning on my lights every evening and makes my arbor with all my plants glow.",
                "color": "Black",
                "images": []
              },
              {
                "name": "Anthony H.",
                "rating": 5,
                "date": "2026-02-06",
                "review": "loving the effect on the stonework",
                "color": "White",
                "images": [],
                "reply": "Thank you for the glowing review, Anthony✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Test R.",
                "rating": 3,
                "date": "2026-02-04",
                "review": "great!",
                "color": "",
                "images": []
              },
              {
                "name": "Moira M.",
                "rating": 5,
                "date": "2026-02-04",
                "review": "Good fast delivery. Nicely packaged.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Moira✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Jerry Garner G.",
                "rating": 5,
                "date": "2026-01-31",
                "review": "Absolutely amazing lights, arrived charged and provide great lighting to the deck and for an evening dinner on the table in the garden. Jerry",
                "color": "Black",
                "images": [],
                "reply": "Hi Jerry, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Hibah Q.",
                "rating": 5,
                "date": "2026-01-31",
                "review": "Love it I might order another one!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Hibah✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Christine M.",
                "rating": 5,
                "date": "2026-01-29",
                "review": "Beautifully made, elegant, lights. They create a cozy and sophisticated vibe in my backyard.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Christine! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Robert M.",
                "rating": 5,
                "date": "2026-01-27",
                "review": "I was worried about ordering from this brand as they seemed like a fake instagram company but I am really happy I made this purchase. I bought two of these for my dads pool area and they are just as nice as advertised. They look very sleek, appear to be well made, and work nicely.",
                "color": "Black",
                "images": [],
                "reply": "Wow, Robert! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Test T.",
                "rating": 5,
                "date": "2026-01-26",
                "review": "Test T.",
                "color": "",
                "images": []
              },
              {
                "name": "Vivienne O.",
                "rating": 5,
                "date": "2026-01-21",
                "review": "The lamps are even better than I expected! From the amount of light, ease of use, quality of materials, and fast shipment. ♡ Thanks!",
                "color": "Black",
                "images": [],
                "reply": "Wow, Vivienne! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Kenneth T.",
                "rating": 4,
                "date": "2026-01-21",
                "review": "The build quality is great, and I am really pleased with the purchase. I now own five. I just wish the lights would stay on longer in the evening. They get pretty strong pm sun in SW Florida but only light up for several hours, even on the low brightness setting. That said, they are still better than any other option I have tried previously.",
                "color": "White",
                "images": [],
                "reply": "Wow, Kenneth! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Rick C.",
                "rating": 5,
                "date": "2026-01-17",
                "review": "Love this light, so simple yet so elegantly stylish! Will be buying more for other spaces. Thank you!!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Rick✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Charles E.",
                "rating": 5,
                "date": "2026-01-16",
                "review": "Absolutely love these lanterns. Very slick",
                "color": "White",
                "images": [],
                "reply": "Thank you for the glowing review, Charles✨ We're so happy you love your lights!"
              },
              {
                "name": "Catherine B.",
                "rating": 5,
                "date": "2026-01-16",
                "review": "So far so good, fingers crossed they last.",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Catherine✨ We're so happy you love your lights!"
              },
              {
                "name": "Vesna S.",
                "rating": 5,
                "date": "2026-01-16",
                "review": "These lights are exactly as advertised, they're beautiful with adjustable lighting that creates the perfect ambience. We've received so many compliments from friends, all asking where they can purchase them.",
                "color": "Black",
                "images": [],
                "reply": "Hi Vesna, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Nadine P.",
                "rating": 5,
                "date": "2026-01-16",
                "review": "Totally in love with these solar lanterns - nice look on and off! Colour works well with our surrounds and great value. I bought two but maybe back for more!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Nadine ✨We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Carol L.",
                "rating": 5,
                "date": "2026-01-15",
                "review": "Love how they look, love the high quality. Excellent purchase! 😁",
                "color": "Black",
                "images": [],
                "reply": "Hi Carol, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Harriet A.",
                "rating": 5,
                "date": "2026-01-15",
                "review": "A beautiful addition to our alfresco dining area",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Harriet ✨ Your setup looks amazing!"
              },
              {
                "name": "Robin D.",
                "rating": 5,
                "date": "2026-01-14",
                "review": "Classy and beautiful lights, definitely an upgrade for our garden!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Robin✨ We're so happy you love your lights. If you ever need more, we're always here to help"
              },
              {
                "name": "Suzanne S.",
                "rating": 5,
                "date": "2026-01-14",
                "review": "It was a gift and my boyfriend said it's beautiful and great quality's",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Suzanne✨ We're so happy your boyfriend loves the Lantern!"
              },
              {
                "name": "Linda P.",
                "rating": 5,
                "date": "2026-01-13",
                "review": "The lights are just as I expected and love them!",
                "color": "Black",
                "images": [],
                "reply": "Thank you for the glowing review, Linda✨ We're so happy you love your lights!"
              },
              {
                "name": "Myra S.",
                "rating": 5,
                "date": "2026-01-13",
                "review": "I adore these lights - the lighting effect on my outdoor table is perfect, exactly what I wanted! The 3 different glow options are fantastic - I have them on low usually (which is a gorgeous ambience) and high when entertaining - which is equally gorgeous! A bonus - this is the perfect present for friends who are difficult to buy for. Love these lights!",
                "color": "Black",
                "images": [],
                "reply": "Wow, Myra! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              }
            ]
        };

        var festoonReviewsData = {
            "product_url": "https://litehouselighting.com/products/litehouse-festoon-solar-power-string-light-10m",
            "reviews": [
              {
                "name": "Amanda F.",
                "image": "https://images.loox.io/uploads/2025/2/27/8RHodmtQhc_mid.jpg",
                "rating": 5,
                "date": "2025-01-25",
                "review": "Work perfectly! So easy to install",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Amanda F. This is wonderful! Thank you for sharing your bright moment with us! We're delighted you had such an easy time installing your new Solar Festoon Lights.  That's exactly what we aim for!  Thanks for sharing your positive experience.🔥✨"
              },
              {
                "name": "Greg W.",
                "image": "https://images.loox.io/uploads/2025/3/20/nmVx6_nwEaD_mid.jpg",
                "rating": 5,
                "date": "2025-03-03",
                "review": "What a brilliant product. I dithered about whether to go for solar or mains powered lights, concerned about brightness levels vs ease of install. In the end I chose solar and haven't regretted it. With 4 packs of 25 mini bulbs I have 100 lights in total driven from 2 solar panels (leaving 2 panels as spares). Light levels are ample to have dinner by. Product is robust and connectivity is easy.",
                "variant": "",
                "reply": "Hi Greg W. Wow, thank you so much for the wonderful review🥰! We're absolutely happy to hear you're enjoying your bulb string lights and that they've exceeded your expectations. It's great to know you're having dinner under such a beautiful setup!  We really appreciate you taking the time to share your experience. With Love, Litehouse Team! 💛"
              },
              {
                "name": "Shirley G.",
                "image": "https://images.loox.io/uploads/2025/2/27/ue9SugrXKi_mid.jpg",
                "rating": 5,
                "date": "2025-02-24",
                "review": "Lights are awesome in my courtyard.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Shirley G. Wow! Now look at that! Thank you for sharing your amazing picture with us. It is truly breathtaking to see. Thank you so so very much for your wonderful review! 💛✨"
              },
              {
                "name": "Monica A.",
                "image": "https://images.loox.io/uploads/2025/2/27/QOIJW24-B_mid.jpg",
                "rating": 5,
                "date": "2025-01-15",
                "review": "Would like 15 persent off - as I want to order more",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Monica A. Thank you very much for your amazing review! Let us know and we will gladly assist you! ✨"
              },
              {
                "name": "Bruce M.",
                "image": "https://images.loox.io/uploads/2025/2/27/lctgQ9ee0_mid.jpg",
                "rating": 5,
                "date": "2025-01-07",
                "review": "What a pleasure to install and what a wonderful effect they have, the solar lights bring light to an area that I have been struggling with at night to come up with a solution, they work perfectly !",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Bruce M. This is a wonderful photo! It really makes us smile to hear that you're pleased with how easy the lights were to install and how well they're illuminating the area you've been struggling with at night. We're so glad that they're working perfectly for you!✨"
              },
              {
                "name": "Shaun L.",
                "image": "https://images.loox.io/uploads/2025/2/27/UHmRxHKsh_mid.jpg",
                "rating": 5,
                "date": "2025-01-06",
                "review": "Great product,  adds value to any outside entertainment area",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Shaun L. It's always amazing to know that our products help create such inviting and beautiful spaces ✨. Thank you very much for your amazing review and we're glad to hear that our Solar Festoon Bulb String Lights are adding value to your outdoor entertainment area."
              },
              {
                "name": "Kym A.",
                "image": "https://images.loox.io/uploads/2025/2/27/8UoYuahQCv_mid.jpg, https://images.loox.io/uploads/2025/2/27/9S6DB0VOFc_mid.jpg",
                "rating": 5,
                "date": "2025-01-05",
                "review": "Adding magic to our home ❤️",
                "variant": "15m (15 LED Bulbs)",
                "reply": "HI Kym A. What a stunning setup! ✨ Your space looks absolutely magical, and we're so happy our lights could add that warm glow to your home. ❤️ Thank you for sharing this beautiful photo with us! 🤩 Thank you very much for sharing this with us!"
              },
              {
                "name": "Sharon W.",
                "image": "https://images.loox.io/uploads/2025/2/27/rNfTwoLAY_mid.jpg, https://images.loox.io/uploads/2025/2/27/lzwtuhHAPS_mid.jpg",
                "rating": 5,
                "date": "2024-12-23",
                "review": "Easy to install and add such a nice feel to the braai area!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Sharon W. Wow! Look at that! To hear that your Solar Festoon Bulb String Lights are adding a nice touch to your braai area makes us smile🤩. Your picture shows how beautifully they've enhanced the space! Thank you very much for this! Cheers to many more bright moments."
              },
              {
                "name": "Sylvia L.",
                "image": "https://images.loox.io/uploads/2025/2/27/-jQDKB3l2I_mid.jpg",
                "rating": 5,
                "date": "2024-12-16",
                "review": "Our lights look amazing! We are happy with the quality and good service. Will definitely recommend!",
                "variant": "10m (10 LED Bulbs)",
                "reply": ""
              },
              {
                "name": "Sylvia L.",
                "image": "https://images.loox.io/uploads/2025/2/27/b8kLHpvxv_mid.jpg",
                "rating": 5,
                "date": "2024-12-16",
                "review": "Our lights look amazing! We are happy with the quality and good service. Will definitely recommend!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Sylvia L. Thank you so much for your wonderful feedback and for sharing the video with us! We're delighted to hear that your lights look amazing and that you're happy with the quality and service 💖. Your recommendation means the world to us!"
              },
              {
                "name": "Jenni V.",
                "image": "https://images.loox.io/uploads/2025/2/27/tL5vDuxh7D_mid.jpg, https://images.loox.io/uploads/2025/2/27/TNRlYkA7hG_mid.jpg",
                "rating": 5,
                "date": "2024-12-16",
                "review": "We love our festoon lights! They have just added layer of festive sophistication and flair to our outdoor spaces, opening the imagination to all the fun to be had here :) They were easy to set up and get switched on. The quality is mind blowing. Amazing that the bulbs are so tough - the string hung down and knocked on the ladder during installation and they even survived that.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Jenni V. Thank you so much for your kind words! We're delighted that our Solar Festoon Lights are adding a touch of festive sophistication to your outdoor spaces. We're especially pleased to hear about their durability, even during installation. We strive to create high-quality products that are both beautiful and built to last. We hope you continue to enjoy many magical evenings illuminated by your lights!💛"
              },
              {
                "name": "C G.",
                "image": "https://images.loox.io/uploads/2025/2/27/aIsnvOLpVv_mid.jpg",
                "rating": 5,
                "date": "2024-12-15",
                "review": "Very happy.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi C G. Thank you for your kind feedback! We're so happy to hear that you're pleased with your lights 🤩"
              },
              {
                "name": "Melody H.",
                "image": "https://images.loox.io/uploads/2025/2/27/8n93naJ0W_mid.jpg",
                "rating": 5,
                "date": "2024-12-14",
                "review": "I was very tempted to go with a cheaper version of these lights but I am so very glad I didn't. I love all the thought, planning and care you put into the lights, packaging and hooks and all the details. Really amazing quality and I'm so happy with the end result thank you!!!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Melody H. Thank you so much for your wonderful feedback and for sharing the image with us! We're thrilled to hear that you're so happy with your Solar Festoon Outdoor Bulb String Lights 🤩. It's fantastic to know that you appreciated the quality, attention to detail, and thoughtful packaging. We truly put a lot of care into our products, and we're so glad it's made a difference for you! Thank you for choosing Litehouse!"
              },
              {
                "name": "Cliff D.",
                "image": "https://images.loox.io/uploads/2025/2/27/uW98oGxa3K_mid.jpg",
                "rating": 5,
                "date": "2024-12-08",
                "review": "Absolutely amazing solar lights👌",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Cliff D, Thank you so much for your amazing feedback and for sharing your photos with us! Your Solar Festoon Outdoor Bulb String Lights look absolutely stunning in your space ✨. We're so happy to hear you're loving them!🤗"
              },
              {
                "name": "Lloyd G.",
                "image": "https://images.loox.io/uploads/2025/2/27/WIm2avX2k_mid.jpg",
                "rating": 5,
                "date": "2024-12-08",
                "review": "Easy way to create a wonderful ambience.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Lloyd G, Thank you for your lovely feedback! We're so pleased to hear that your Solar Festoon Outdoor Bulb String Lights have helped create such a wonderful ambiance 🤩. It's always great to know our products are making a difference in your space!"
              },
              {
                "name": "Erna V.",
                "image": "https://images.loox.io/uploads/2025/2/27/QkbJBCB4nP_mid.jpg",
                "rating": 5,
                "date": "2024-12-01",
                "review": "I'm in love with my new addition to the braai area. The soft light brings a cosy atmosphere.  Excellent, strong quality.  I will definitely buy again from you.",
                "variant": "10m (10 LED Bulbs)",
                "reply": ""
              },
              {
                "name": "Danie R.",
                "image": "https://images.loox.io/uploads/2025/2/27/fTZCRXOLg_mid.jpg",
                "rating": 5,
                "date": "2024-11-29",
                "review": "Best buy ever",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Danie R, We're so happy to hear that you're enjoying your lights. It looks absolutely stunning! 🤩 Your support means the world to us, and we can't wait to help you create more magical moments in the future! 💡😊"
              },
              {
                "name": "Lisa M.",
                "image": "https://images.loox.io/uploads/2025/2/27/10sWJsyvz_mid.jpg",
                "rating": 5,
                "date": "2024-11-24",
                "review": "They were so easy to put up and make my outside area look so welcoming and Cosy. Love them",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Lisa M, Thank you so much for sharing your experience and this stunning photo! 🤩 We absolutely love how the Solar Festoon Bulb String Lights have transformed your outdoor space—it looks so cozy! ✨ It's wonderful to hear they were easy to set up and that you're enjoying the ambiance they create.💛 Wishing you many delightful evenings in your beautiful space!"
              },
              {
                "name": "Adam K.",
                "image": "https://images.loox.io/uploads/2025/2/27/5sRI2h0Ony_mid.jpg, https://images.loox.io/uploads/2025/2/27/2VubiSY3Y9_mid.jpg",
                "rating": 5,
                "date": "2024-11-23",
                "review": "Great lights easy to install great under roofs",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Adam K, Thank you so much for your kind words and for sharing this beautiful photo with us! Your setup looks absolutely stunning—the Solar Festoon Bulb String Lights create such a cozy and inviting ambiance under your roof. ✨ We're so glad you found the lights easy to install and are enjoying them! Cheers to more better, brighter moments! ✨"
              },
              {
                "name": "Lisa M.",
                "image": "https://images.loox.io/uploads/2025/2/27/Xq0mURqpWZ_mid.jpg, https://images.loox.io/uploads/2025/2/27/rcgPeP-hdC_mid.jpg, https://images.loox.io/uploads/2025/2/27/dGO4O49AxA_mid.jpg",
                "rating": 5,
                "date": "2024-11-15",
                "review": "These have completely transformed the exterior of my home and easily endured the recent heavy rains. I'm off to buy my next set!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Lisa M, Wow, we're so happy to hear how our lights have transformed your home! ✨ Knowing they stood strong through heavy rains is fantastic—it's exactly what we designed them for. Thank you for trusting us, and we're so excited you're getting your next set. Let us know if you need any help—happy lighting! 🤩"
              },
              {
                "name": "Leanne P.",
                "image": "https://images.loox.io/uploads/2025/2/27/nvm39yYpY_mid.jpg",
                "rating": 5,
                "date": "2024-11-14",
                "review": "WOW! Litehouse transformed our Deck at our little piece of tranquility! The perfect lighting & for every occasion",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Leanne P, Wow, this just made our day! ✨ We're so happy to hear that we have brought that extra magic to your tranquil deck. The perfect lighting truly makes all the difference, and we're thrilled to be a part of your special moments. Thank YOU for sharing your joy with us! 🤩 With Love, Litehouse!"
              },
              {
                "name": "Simon F.",
                "image": "https://images.loox.io/uploads/2025/2/27/IXERhy3-o-_mid.jpg",
                "rating": 5,
                "date": "2024-11-14",
                "review": "After seeing Litehouse all over our Instagram feeds for months, we decided that when purchasing our new home, they would be one of our first purchases and personal touches to add to our outside patio and entertainment area. Placing the order was super-easy and they were delivered well within the expected timeframe. We had them up in less than an hour, and even though we out them up in the late afternoon, the lights were fully charged for the night thanks to the USB-C charging cable that comes with the solar lights, should you need to charge them up without the sun (at night or on a rainy day). They're brilliant",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Simon F, Wow, thank you so much for sharing your experience! 🤩 We're over the moon to hear that we made such a meaningful addition to your new home and outdoor space! Hearing how smooth the ordering process was and how quickly you had them shining is music to our ears. ✨ The USB-C charging feature is such a game-changer, right? We're so glad you love the lights—they're designed to bring that extra sparkle to every moment. Cheers to many more brilliant nights under your Litehouse lights! 😊"
              },
              {
                "name": "Yantarni S.",
                "image": "https://images.loox.io/uploads/2025/2/27/i03CIBOSvf_mid.jpg, https://images.loox.io/uploads/2025/2/27/AkrN6n8wcL_mid.jpg",
                "rating": 5,
                "date": "2024-11-04",
                "review": "I've been eyeing these festoon lights for months and I'm so glad I finally got them. They switch on automatically every night at dark and they perk up the lapa corner in my yard so hassle free. The quality is great, I see why people say they last years and years.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Yantarni S, Thank you so much for the lovely feedback! 🤩 We're so glad you finally treated yourself to the festoon lights—they really are a perfect touch, especially in cozy spots like your lapa corner! The automatic switch-on is such a bonus, right? We're thrilled to hear you're happy with the quality and ease. ✨ Enjoy every glow! 💛 Amazing set up by the way!🤩"
              },
              {
                "name": "Ross E.",
                "image": "https://images.loox.io/uploads/2025/2/27/2gdjBqslW9_mid.jpg",
                "rating": 5,
                "date": "2024-10-21",
                "review": "Very happy with them but now I need more!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Ross E, The video is beautiful!💖 We're so happy to see how much you love your lights! We can definitely help you with additional purchases to enhance your outdoor space.😍"
              },
              {
                "name": "Tracey B.",
                "image": "https://images.loox.io/uploads/2025/2/27/7jEyxyIp__mid.jpg",
                "rating": 5,
                "date": "2024-10-19",
                "review": "Easy to install, love the way my garden was transformed by the lighting.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Tracey B, This is so BEAUTIFUL! This transformation is amazing! We're delighted to hear that our product has enhanced your outdoor space. Thank you for sharing your bright moments with us!"
              },
              {
                "name": "Heath K.",
                "image": "https://images.loox.io/uploads/2025/2/27/8ZDFv7F4I_mid.jpg",
                "rating": 5,
                "date": "2024-09-29",
                "review": "We love the ambience our Litehouse Solar Festoon lights bring to our Airbnb tiny home verandah overlooking the beach in Glencairn. Super fast delivery, compact packaging, easy to assemble and wow, what a difference! Thank you Litehouse for improving our already awesome Beach Bungalo!!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Heath K, This is so Amazing! We're so happy to hear that our Solar Festoon Outdoor Bulb String Lights have enhanced the ambiance of your Airbnb tiny home verandah🥰🥰🥰 ! It's wonderful to see how our products can create a special atmosphere. Thank you for sharing the beautiful photo. We hope you and your guests continue to enjoy the warm glow of our lights!💛"
              },
              {
                "name": "Robert C.",
                "image": "https://images.loox.io/uploads/2025/2/27/yVgjz8WRp__mid.jpg, https://images.loox.io/uploads/2025/2/27/LyXuwtjjPA_mid.jpg",
                "rating": 5,
                "date": "2024-09-09",
                "review": "Absolutely love the addition of the string lights to our outside area, will be ordering more to complete the look. Very happy with the service and the product.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Robert C, Thank you so much for your fantastic review and for sharing the beautiful photos of your outdoor space🤗 ! We're so amazed to hear that the string lights have added that perfect touch, and it's wonderful that you're happy with both the product and our service. We're excited that you'll be ordering more to complete the look, and we're here to help with anything you need. Feel free to reach out anytime!"
              },
              {
                "name": "Sophia D.",
                "image": "https://images.loox.io/uploads/2025/2/27/sn6VTR9IQJ_mid.jpg, https://images.loox.io/uploads/2025/2/27/EIVeJ_f0xc_mid.jpg",
                "rating": 5,
                "date": "2024-08-26",
                "review": "Love these lights - excellent quality, packaging and instructions. A beautiful product that is classy and perfect for every day use.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Sophia D. That's wonderful to hear! We're so glad you're enjoying our lights. We strive to provide the best possible products and customer experience. Your space looks AMAZING! ✨✨ Thank you for sharing your bright moments with us."
              },
              {
                "name": "Karen W.",
                "image": "https://images.loox.io/uploads/2025/2/27/yIL71EBd__mid.jpg, https://images.loox.io/uploads/2025/2/27/HHesJuHjUj_mid.jpg, https://images.loox.io/uploads/2025/2/27/BIhE5mYXxf_mid.jpg, https://images.loox.io/uploads/2025/2/27/0i6S1eYM-x_mid.jpg",
                "rating": 5,
                "date": "2024-08-07",
                "review": "just love our lights - super quality and all our visitors rave about them!  Super happy to own these!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Karen W. Thank you so so much for sharing your amazing space with us. This is truly remarkable. We're so happy to hear that you and your guests love our lights! 😍It's wonderful to know that they've become a standout feature in your space. Your satisfaction is our top priority, and we're thrilled to hear that our lights have exceeded your expectations."
              },
              {
                "name": "Judith L.",
                "image": "https://images.loox.io/uploads/2025/2/27/RLCPew3jsm_mid.jpg",
                "rating": 5,
                "date": "2024-07-18",
                "review": "We love our lights, we use them at our holiday rentals and I think they provide a warm welcome to our guests and make there outside patio inviting to spend the evenings outside!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Judith L. Thank you so much for your amazing compliment! It gives us joy to see how our Litehouse Solar Festoon Outdoor Bulb String Lights have transformed your holiday rentals into inviting oases for your guests. The warm, welcoming glow they cast creates the perfect atmosphere for relaxing evenings outdoors. It's evident from your photos that your guests are truly enjoying their stay. Thank you for sharing your beautiful space with us!✨✨✨"
              },
              {
                "name": "Elizabeth S.",
                "image": "https://images.loox.io/uploads/2025/2/27/CupN-mNss__mid.jpg",
                "rating": 5,
                "date": "2024-07-15",
                "review": "We recently added a pergola to the back of our house. To give the area a warmer, more festive feel, we added the festoon 10 bulb string and it did just that, when we around the fire pit it adds perfectly to the ambience. I'll definitely not hesitate to add more strings / bulbs in future.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Elizabeth S. We are so moved by your review! Your pergola is an absolute showstopper! We're over the moon to see how beautifully our Litehouse Solar Festoon Outdoor Bulb String Lights have transformed it into such a cozy and inviting space ❤️‍🔥. The warm glow they cast around your fire pit creates the perfect ambiance for relaxing evenings outdoors. Your photos are truly inspiring! Thank you, Elizabeth!"
              },
              {
                "name": "B C.",
                "image": "https://images.loox.io/uploads/2025/2/27/sHH3pDsHqp_mid.jpg",
                "rating": 5,
                "date": "2024-06-15",
                "review": "My mid winter camp made more special with my litehouse lights",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey BCH. Ahhh!! Such beauties! Your campsite looks incredibly cozy with our Litehouse Solar Festoon Outdoor Bulb String Lights adding that perfect touch 🔥. We love seeing how our customers create magical moments with our products. Thanks for sharing the beautiful photo!😍"
              },
              {
                "name": "Bronwyn L.",
                "image": "https://images.loox.io/uploads/2025/2/27/F79fLgmgd_mid.jpg",
                "rating": 5,
                "date": "2024-04-08",
                "review": "The lights look amazing above my pool! Easy to install and great to look at Thank you",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Bronwyn L, Thank you so much for your glowing feedback! We're delighted to hear that your Litehouse lights have added a touch of magic to your pool area. Your photo looks absolutely stunning, and it's fantastic to know that the installation process was smooth for you.✨✨ We truly appreciate your support and are thrilled that our lights have enhanced your outdoor space.💛💛💛"
              },
              {
                "name": "Letitia D.",
                "image": "https://images.loox.io/uploads/2025/2/27/uT1Pk8flp_mid.jpg, https://images.loox.io/uploads/2025/2/27/WdgJDiX8sJ_mid.jpg",
                "rating": 5,
                "date": "2024-03-09",
                "review": "They're the perfect lights by our little pool which is close to the house & perfect amount of lighting for the area",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Letitia, Thank you so much for your wonderful feedback and for sharing your bright moments with us😍 ! We are so amazed to hear that our Litehouse Solar LED Festoon Outdoor Bulb String Lights are bringing the perfect ambiance to your poolside area. It's fantastic to know that they're providing just the right amount of lighting for your space. We're here to ensure your outdoor lighting experience remains top-notch 🫡 Love, Litehouse! ✨"
              },
              {
                "name": "Michelle B.",
                "image": "https://images.loox.io/uploads/2025/2/27/LuFtCU8Up_mid.jpg",
                "rating": 5,
                "date": "2024-01-05",
                "review": "Love the atmosphere that Litehouse solar lights create.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Michelle B, Thank you very much for your kind words. We're happy to hear that our Litehouse solar lights have helped create a wonderful atmosphere for you. We appreciate your support and are here to ensure you continue to enjoy the ambiance our lights bring. Love, Litehouse team! 🥰"
              },
              {
                "name": "Craig S.",
                "image": "https://images.loox.io/uploads/2025/2/27/H4nMqmpSMy_mid.jpg, https://images.loox.io/uploads/2025/2/27/dwCXg7W8l1_mid.jpg",
                "rating": 5,
                "date": "2023-12-18",
                "review": "now the proud owner of 2 sets of string solar lights , they work amazingly , with a full day charge they stay on all night",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Craig S, Thank you very much for your positive review and rating. Your area looks so so amazing! We're happy to hear that you are now the proud owner of two sets of our string solar lights and that they're working amazingly for you. It's fantastic to know that they provide reliable performance, staying on all night with a full day charge. Your satisfaction is our priority, and we're grateful for your support. Love, Litehouse!"
              },
              {
                "name": "Shaun T.",
                "image": "https://images.loox.io/uploads/2025/2/27/qpBCdjBD8C_mid.jpg, https://images.loox.io/uploads/2025/2/27/dlowjBLF2X_mid.jpg, https://images.loox.io/uploads/2025/2/27/tFp8xB5EpI_mid.jpg, https://images.loox.io/uploads/2025/2/27/nKxNwiP6hu_mid.jpg, https://images.loox.io/uploads/2025/2/27/eY1ODh8sIS_mid.jpg",
                "rating": 5,
                "date": "2023-12-13",
                "review": "I bought two sets of 15m Festoon Traditional lights and wow, what a absolute joy i had, when I opened the boxes! Also bought a 2m extension, 1m dimmer switch cord and a installation kit. The installation kit is a must as it make the installation of these lights very easy and quick. I am very happy with the packaging, as well as the durability and premium feel of the products. If you are looking for outdoor lights for your home, then look no further than Litehouse! They are definitely by far the best in this game! My garden has turned into a magical wonderland with these lights!!! Thank you so very much Litehouse!",
                "variant": "",
                "reply": "Hi Shaun T, Thank you so much for your incredibly kind words! We're overjoyed to hear about the joy our Festoon Traditional lights brought to your space. It's wonderful to know that our products, including the extension, dimmer switch cord, and installation kit, contributed to creating a magical wonderland in your garden. Your appreciation for the packaging, durability, and premium feel of our products means the world to us. We strive to deliver the best quality and are thrilled to have exceeded your expectations. Thank you for choosing Litehouse, and we're delighted to be a part of transforming your garden into a magical haven.🧡"
              },
              {
                "name": "Stephanie P.",
                "image": "https://images.loox.io/uploads/2025/2/27/_hdijdobOL_mid.jpg",
                "rating": 5,
                "date": "2023-11-14",
                "review": "Ordering and delivery was quick and easy. Very happy with our lights. They're not too bright and give a lovely ambiance to the area.",
                "variant": "10 Meters",
                "reply": "Hey Stephanie P, Thank you for your kind words! We're so glad to hear that you're happy with your lights and that you found them easy to order and receive. We agree that they provide a lovely ambiance, and we hope they help you create a cozy and inviting space. Love, Litehouse! 🧡"
              },
              {
                "name": "Yvonne R.",
                "image": "https://images.loox.io/uploads/2025/2/27/M8kGYxwV_-_mid.jpg",
                "rating": 5,
                "date": "2023-11-14",
                "review": "Very happy. Will definitely be ordering again",
                "variant": "10 Meters",
                "reply": "Hey Yvonne R, We're so happy to hear that you're happy with your purchase and that you'll be ordering from us again! We're always working to improve our products and services, and your feedback is valuable to us. Thank you for being a loyal customer! Litehouse Team! ✨"
              },
              {
                "name": "Damien S.",
                "image": "http://images.loox.io/uploads/2025/2/27/kmYG386FGk_mid.jpg, http://images.loox.io/uploads/2025/2/27/CU8wbtKw2G_mid.jpg, http://images.loox.io/uploads/2025/2/27/T_sg6C9T-D_mid.jpg, http://images.loox.io/uploads/2025/2/27/-pRS0hc3TQ_mid.jpg, http://images.loox.io/uploads/2025/2/27/5N7CvulJil_mid.jpg",
                "rating": 5,
                "date": "2023-10-14",
                "review": "Extremely grateful I found these lights. I searched high and low for high quality solar string lights. I'm impressed with the quality, ease of setup and mood lighting it creates. Local is lekka!",
                "variant": "10 Meters",
                "reply": "Hi Damien S, We're genuinely overjoyed to hear that you found our solar string lights and that they've exceeded your expectations! Your kind words mean a lot to us, and we're extremely grateful for your support.✨ Creating a mood with quality solar string lights is what we aim for, and it's wonderful to know that you're impressed with the setup and the ambience they provide. We appreciate your support of local businesses."
              },
              {
                "name": "Taryn K.",
                "image": "https://images.loox.io/uploads/2025/2/27/gAXL5_XI6_mid.jpg, https://images.loox.io/uploads/2025/2/27/hYb4YODa2E_mid.jpg",
                "rating": 5,
                "date": "2023-10-06",
                "review": "Love, love, LOVE!😍 and so much attention to detail... extra globes, all the gadgets to make set up effortless. I will definitely recommend 👌 Local is lekker!",
                "variant": "10 Meters",
                "reply": "Hi Taryn K, Wow! 😍 We are absolutely over the moon to read your amazing feedback about our product✨. Thank you for taking the time to share your experience with us. Your words, \"Love, love, LOVE!\" and \"so much attention to detail\" truly warmed our hearts. We're delighted that you found our product to be effortlessly set up with all the extra globes and gadgets you needed. Our team goes above and beyond to ensure that every aspect of our products is designed to enhance your experience. Thank you, Taryn 🧡"
              },
              {
                "name": "Joanne D.",
                "image": "https://images.loox.io/uploads/2025/2/27/7agWppetDQ_mid.jpg",
                "rating": 5,
                "date": "2023-09-28",
                "review": "I love the lite house brand. Their products are the best quality and the best looking. Everyone who visits our pergola compliments them!",
                "variant": "10 Meters",
                "reply": "Hi Joanne D, Thank you so much for your wonderful feedback and your loyalty to the Litehouse brand! We're thrilled to hear that you consider our products to be the best in terms of quality and aesthetics. It's especially rewarding to know that they've gotten compliments from your visitors. We're dedicated to providing top-notch products, and your satisfaction is our ultimate reward. Thank you Joanne, Litehouse Team! ✨"
              },
              {
                "name": "Charles G.",
                "image": "https://images.loox.io/uploads/2025/2/27/GwqCwESe9o_mid.jpg",
                "rating": 5,
                "date": "2023-08-31",
                "review": "A great product",
                "variant": "10 Meters",
                "reply": "HI Charles G, Thank you so much for your kind words and positive feedback! We're thrilled to hear that you're enjoying our product and that it has met your expectations. Your compliment truly means a lot to us and serves as a testament to the hard work and dedication we put into creating products that our customers can rely on and enjoy. We're committed to providing excellent products and experiences, and knowing that we've succeeded in delivering a great product to you is incredibly rewarding. Once again, thank you for taking the time to share your positive experience. We look forward to serving you again in the future. Love, Litehouse 🧡"
              },
              {
                "name": "Jane S.",
                "image": "https://images.loox.io/uploads/2025/2/27/voWMfSY7a4_mid.jpg",
                "rating": 5,
                "date": "2023-08-29",
                "review": "Love these lights - they have really enhanced my patio area and last the whole night.",
                "variant": "10 Meters",
                "reply": "hey jane S, It's wonderful to hear that you're enjoying the lights on your patio! We're amazed that they've added to the ambiance and functionality of your outdoor space. Thank you for your kind words and for choosing our products. With Love, From Litehouse 🧡"
              },
              {
                "name": "Michelle S.",
                "image": "https://images.loox.io/uploads/2025/2/27/AbwSs3EWKa_mid.jpg",
                "rating": 5,
                "date": "2023-08-24",
                "review": "I truly love these lights. Versatile, heavy duty, adaptable, beautifully packed and looks like it will last a lifetime.",
                "variant": "",
                "reply": "Hi Michelle S. Thank you so much for your fantastic feedback! We're happy to hear that you're enjoying the lights😊. Your words truly make our day. It's wonderful to know that you find them versatile, heavy-duty, and adaptable – qualities we've worked hard to ensure ✨✨. Your appreciation for the packaging and durability means a lot to us as well. We're committed to providing products that stand the test of time."
              },
              {
                "name": "Ernst H.",
                "image": "https://images.loox.io/uploads/2025/2/27/BydTatWp7_mid.jpg",
                "rating": 5,
                "date": "2023-07-27",
                "review": "Baie goed verpak en maklik om op te sit.",
                "variant": "10 Meters",
                "reply": "Hi Ernst H, Thank you so much for your kind words and wonderful compliment! We truly appreciate your thoughtful feedback and taking the time to share your positive experience with us.✨ Your kind words are a great source of motivation and encouragement for our team. We are dedicated to providing excellent service and top-notch products, and it's incredibly rewarding to know that we've met your expectations."
              },
              {
                "name": "Riaan B.",
                "image": "https://images.loox.io/uploads/2025/2/27/aSusRuK_I2_mid.jpg",
                "rating": 5,
                "date": "2023-06-04",
                "review": "Beautiful lights. Not to bright, not too dim. Just perfect for a social event under the stars. Enough light to see what you are eating after a braai 🙂. After a good charge it will last the whole night. Good quality as well.",
                "variant": "10 Meters",
                "reply": "Hey Riaan B. Thank you for your positive review ✨, we are pleased to hear that you are happy with your lights and it is giving you the results that you want. These beauties are perfect for adding a beautiful ambience lighting element to any space, and we can definitely see this in your picture.😍 Thank you Riaan, with love, Litehouse Team 🧡"
              },
              {
                "name": "Elzemari R.",
                "image": "https://images.loox.io/uploads/2025/2/27/KB23mcV4SF_mid.jpg",
                "rating": 5,
                "date": "2023-05-23",
                "review": "Love that the festive lights welcome me home every evening no matter the loadshedding schedule.",
                "variant": "15 Meters",
                "reply": "Hey Elzemari R. I am loving your area! 😊Thank you very much for sharing this with us. You have really made us happy. Thank you so much Elzemari for your review and sharing your experience with us. Litehouse Team 🧡"
              },
              {
                "name": "Nasima B.",
                "image": "https://images.loox.io/uploads/2025/2/27/hYx8k-fZs_mid.jpg",
                "rating": 5,
                "date": "2023-05-14",
                "review": "Love my new lights. So easy to install. Brings a bit of joy in the midst of loadshedding!",
                "variant": "15 Meters",
                "reply": "Hey Nasima B. Thank you for this!✨You made our day. We really appreciate you taking the time to express this to us and for your positive review. You put a big smile on our faces.😃 With Love, Litehouse Team 🧡"
              },
              {
                "name": "Denise N.",
                "image": "https://images.loox.io/uploads/2025/2/27/5bw9vUGQmi_mid.jpg",
                "rating": 5,
                "date": "2023-04-22",
                "review": "Photo says all! Loving them. Also help when we have loadshedding to have some light in the back yard. They last long and are of really great quality! I bought now recently another set for the other side as well. Prices increased alot, but still worthy as the one's you buy in the shop are not as bright as these one's. Thanks guys!",
                "variant": "10 Meters",
                "reply": "Hey Denise N. Thank you so so much for taking the time in sharing your image with us. It really makes us happy that knowing that you as our customer love our product. These festoon lights really adds a beautiful glow to your area, which is extremely beautiful.✨ Thank you very for sharing this with us Denise. With Love, Litehouse Team"
              },
              {
                "name": "Rob T.",
                "image": "https://images.loox.io/uploads/2025/2/27/tBNDSN_vs_mid.jpg",
                "rating": 5,
                "date": "2023-04-08",
                "review": "Put them in the garden and they work fantastically creating decent lighting and a great atmosphere. The quality is very good.",
                "variant": "15 Meters",
                "reply": "Hey Rob T. Thank you for taking the time is sharing your positive review. We really appreciate your feedback.🙏 These solar light sensor LED string lights are perfect for adding a beautiful ambience lighting element to any space, whether you are decorating your outdoor patio or using them for an event. Your setting looks absolutely beautiful!!🪄🪄 With Love, Litehouse Team ✨"
              },
              {
                "name": "Stefan S.",
                "image": "https://images.loox.io/uploads/2025/2/27/3H8cl4agQX_mid.jpg",
                "rating": 5,
                "date": "2023-02-16",
                "review": "I used it in one of our Airbnb's. Guests love the soft light - it's enough to have an outdoor dinner but doesn't outshine our beautiful view.",
                "variant": "10 Meters",
                "reply": "Hey Stefan S, WHAT A BEAUTY!!!! 😃 This is so so beautiful✨... thank you very much for sharing this with us. We really appreciate this and thank you for taking the time to share your experience with us. We hope you continue to enjoy all your bright moments!✨ Litehouse Team"
              },
              {
                "name": "Roelien K.",
                "image": "https://images.loox.io/uploads/2025/2/27/CLA-da9WF_mid.jpg",
                "rating": 5,
                "date": "2022-12-17",
                "review": "Love the lights, very sturdy and good quality.",
                "variant": "15 Meters",
                "reply": "hey Roelien K.😃That is just stunning✨ It looks so so beautiful! We really appreciate that you have taken the time to share your positive feedback with us.🙏We hope you enjoy all your bright moments! Litehouse Team"
              },
              {
                "name": "Emile B.",
                "image": "https://images.loox.io/uploads/2025/2/27/gIywABXXrK_mid.jpg",
                "rating": 5,
                "date": "2022-12-09",
                "review": "Love the festival lights for our patio -creates a warm ambiance! Works well, good quality product and would purchase Litehouse products in the future.",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Peet V.",
                "image": "https://images.loox.io/uploads/2025/2/27/nOGtih4i0M_mid.jpg",
                "rating": 5,
                "date": "2022-12-08",
                "review": "Using the sun to power these quality string lights at night is a genius idea. We are so impressed that they last right through the night on a day's solar charge. Such a simple idea, so elegant. I'm ordering more, today!",
                "variant": "15 Meters",
                "reply": "Hey Peet! Thank you so so very much for sharing your amazing feedback.😊 We really appreciate this and we are glad that you are happy! We hope you enjoy all your bright moments! Litehouse Team✨ Better. Brighter"
              },
              {
                "name": "Ashton M.",
                "image": "https://images.loox.io/uploads/2025/2/27/Tx6_7gD538_mid.jpg",
                "rating": 5,
                "date": "2022-11-11",
                "review": "Easy to install, perfect length which I managed without pre measuring. Actually have one spare bulb length as the 15m was too long to get symmetrical in the space, but I and everyone that has seen the setup is SO IMPRESSED. These are my second set of Litehouse lights and I will definitely be purchasing more for my cabin home.",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Jonathan B.",
                "image": "https://images.loox.io/uploads/2025/2/27/xBuWedM-oZ-_mid.jpg",
                "rating": 5,
                "date": "2022-04-18",
                "review": "Great warm white lights to give the patio a really nice atmosphere",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Johan W.",
                "image": "https://images.loox.io/uploads/2025/2/27/vTVuQ7rFWf9_mid.jpg",
                "rating": 5,
                "date": "0202-12-07",
                "review": "Installed these light at my braai-lapa over the weekend and are super happy with the look and quality! 💡💡💡",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Michelle L.",
                "image": "https://images.loox.io/uploads/2025/2/27/Hm2Nb_uGr7J_mid.jpg",
                "rating": 5,
                "date": "2021-11-23",
                "review": "These lights are very effective and good quality. Will order more",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Sierd V.",
                "image": "https://images.loox.io/uploads/2025/2/27/8W9sHR1Qffq_mid.jpg",
                "rating": 5,
                "date": "2021-11-23",
                "review": "Perfect for garden.",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Judith B.",
                "image": "",
                "rating": 5,
                "date": "2026-01-08",
                "review": "The lights have not been installed on my balcony as I am currently about to add 9 feet to my existing balcony.",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Liezel J.",
                "image": "",
                "rating": 5,
                "date": "2025-03-18",
                "review": "Best but ever, we love our solar lights!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey Liezel J. This is absolutely stunning! We're so thrilled to see how beautifully our solar lights have transformed your patio. Thank you for sharing this wonderful photo and your positive feedback! It truly makes our day to know you're enjoying them.💞"
              },
              {
                "name": "Monique G.",
                "image": "",
                "rating": 5,
                "date": "2025-03-13",
                "review": "Good quality and truly beautiful! I recommend this highly!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Monique G. Thank you very much for your kind words! We are truly glad to hear that you recommend our products as high quality🤗. Thank you as well for sharing your amazing bright moments with us! With love, Litehouse!"
              },
              {
                "name": "Karen C.",
                "image": "",
                "rating": 5,
                "date": "2025-03-11",
                "review": "Excellent customer service and even better quality products. Will definitely be purchasing again soon",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey Karen C. Wow! Thank you so much for your incredibly kind words and for sharing your fantastic video of our Solar Festoon Bulb String Lights! We're absolutely thrilled to hear you're so happy with both our customer service and the quality of our products. 🎉Your video looked absolutely stunning! It's wonderful to see our Traditional LED Bulbs bringing such a beautiful ambiance to your space. We're so glad you're enjoying them."
              },
              {
                "name": "Joanie V.",
                "image": "",
                "rating": 5,
                "date": "2025-03-02",
                "review": "I must still put it up. May I send a photo later? Kind regards Joanie",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Joanie V. Thank you very much for your wonderful rating. We believe that you will love your lights! 💫 You can post your pictures when you are ready. Thank you very much!"
              },
              {
                "name": "Shayleen W.",
                "image": "",
                "rating": 5,
                "date": "2025-02-21",
                "review": "Stunning and great quality",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Shayleen W. That's wonderful to hear! It gives us joy to hear you're happy with the quality and how stunning they look. Enjoy your beautiful lights! ✨"
              },
              {
                "name": "Hester V.",
                "image": "",
                "rating": 5,
                "date": "2025-02-17",
                "review": "Beautiful soft light. Solid, high quality construction.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Hester V. That's wonderful to hear! We're so glad you're enjoying the beautiful soft light and appreciating the solid, high-quality construction of your Solar Festoon Bulb String Lights. This is what we aim for, and we're happy that you are happy. With love, Litehouse!💛"
              },
              {
                "name": "Louise R.",
                "image": "",
                "rating": 5,
                "date": "2025-02-11",
                "review": "I love my solar outdoor lights, and they were so easy to put up in my patio area. The warm light globes create a lovely cosy atmosphere!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Louise R. We are overjoyed to hear you're enjoying your solar outdoor lights and that they've created the perfect cozy atmosphere on your patio. Thanks for sharing your positive experience! We hope you continue to enjoy them for many evenings to come. ✨"
              },
              {
                "name": "Hazel C.",
                "image": "",
                "rating": 5,
                "date": "2025-02-10",
                "review": "Our new lighting makes our entertainment area look magical",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Hazel C. This is absolutely amazing! Thank you very much for sharing your video of your bright moments with us! It is truly rewarding to see this. Thank you, Hazel!🥰"
              },
              {
                "name": "Sandra S.",
                "image": "",
                "rating": 5,
                "date": "2025-02-09",
                "review": "After buying it for myself, bought for both my sons.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Sandra S. Seems like someone has a favorite in lights 🤗✨! Thank you very much for your wonderful compliment. I hope that you will continue to enjoy your lights!✨🔥"
              },
              {
                "name": "Robyn H.",
                "image": "",
                "rating": 5,
                "date": "2025-01-31",
                "review": "Lit up the entire room for a party, fantastic lights to have. We have both solar and electric. Great purchases",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey Robyn H. That's fantastic! We're so glad you're enjoying both your solar and electric lights. Thanks for the wonderful feedback!🥰🤗🔥✨💛 Cheers to many more bright moments!"
              },
              {
                "name": "Graham T.",
                "image": "",
                "rating": 4,
                "date": "2025-01-28",
                "review": "Love Them",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey Graham T. We couldn't agree more! That's wonderful to hear! We're so glad you love your new Solar Festoon Lights!✨"
              },
              {
                "name": "Marcus M.",
                "image": "",
                "rating": 5,
                "date": "2025-01-28",
                "review": "Really professional company to deal with",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Marcus M. Thank you for the kind words! We appreciate your business and are glad you had a positive experience 💛."
              },
              {
                "name": "Garnett O.",
                "image": "",
                "rating": 5,
                "date": "2025-01-15",
                "review": "They were purchased as gifts and will get the photos from the two couples. However I can assure you the gifts were VERY WELL received!!!!!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Garnett O. That's wonderful to hear! We're so glad the Solar Festoon Bulb String Lights - Traditional LED Bulbs, Black were a hit! It sounds like they made a great gift, and we appreciate you sharing that with us. We always love to hear about our products bringing joy to people.💛"
              },
              {
                "name": "Alistair T.",
                "image": "",
                "rating": 5,
                "date": "2025-01-06",
                "review": "Great products, solid construction and they provide fantastic lighting - with options. The solar LED downlights are the best, thanks!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Alistair T. We're delighted to hear that you're enjoying our Solar LED downlights and appreciate your feedback on their solid construction and fantastic lighting options. We strive to provide high-quality products that meet our customer's needs, and we're glad that you're happy with your purchase."
              },
              {
                "name": "Thelma R.",
                "image": "",
                "rating": 5,
                "date": "2025-01-06",
                "review": "We absolutely love our lights. And have already purchased a set of the mini lights for a friend. We do however, have a small problem with our set. They only stay on for about 3 hours. We will be contacting you in the next day or so. Warm regards, Thelma Rowles",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Thelma, Thank you so much for your kind words! We're really overjoyed to hear you're loving your Solar Festoon Bulb String Lights and that you've even shared the joy with a friend—how wonderful! 🌟 We're so sorry to hear about the issue with your set staying on for only a few hours. Not to worry, we have taken the necessary steps to have your replacement sent out to you as soon as possible. We're here to help and ensure your lights are shining brightly for hours of enjoyment. ✨"
              },
              {
                "name": "Tony S.",
                "image": "",
                "rating": 5,
                "date": "2024-12-30",
                "review": "The lights have created a whole new feature and experience to our outdoor entertainment area, many thanks for the wonderful quality product. It was a shame that we had to take them out of the wonderful packaging!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Tony S. That's exactly what we strive for – to create beautiful lighting solutions that enhance your outdoor spaces and make them more enjoyable🤗. Thank you very much for your amazing review! We're delighted to hear that our Solar Festoon Bulb String Lights - Traditional LED Bulbs, Black have created a whole new feature and experience for your outdoor entertainment area. We understand your sentiment about the packaging! We put a lot of care into designing it to be both attractive and protective.😍"
              },
              {
                "name": "Johan V.",
                "image": "",
                "rating": 5,
                "date": "2024-12-25",
                "review": "Brilliant Product!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Johan V. Thank you for your fantastic feedback! We're so glad to hear you're loving your Solar Festoon Bulb String Lights 🥰. It's always wonderful to know our products are making a brilliant impact! Thank you very much for this! 😊"
              },
              {
                "name": "Duane W.",
                "image": "",
                "rating": 5,
                "date": "2024-12-24",
                "review": "The lights are absolutely amazing! We love them and everywhere we go we see these beautiful lights. Amazing products and looking forward to my next purchase",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Duane W. Thank you for such an amazing review! We're so happy to hear how much you love your Solar Festoon Bulb String Lights and how they've brightened up your space 🤗. It's wonderful that you're spotting them everywhere—that just shows how loved they are! Your video is absolutely stunning, and we're so grateful you shared it with us. We can't wait to help you with your next purchase and continue lighting up your world!✨"
              },
              {
                "name": "Annemarie R.",
                "image": "",
                "rating": 5,
                "date": "2024-12-23",
                "review": "The quality is excellent!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Annemarie R. We're so glad you appreciate the excellent quality! We take pride in crafting durable and long-lasting products. Thank you very much! 💛"
              },
              {
                "name": "Lolette S.",
                "image": "",
                "rating": 5,
                "date": "2024-12-20",
                "review": "Fabulous lights for any occasions. These solar lights add atmosphere to our tree top deck and we just know our guests are just going to love them when visiting the Guesthouse. I installed them myself, which is testament to just how easy it is to get great instant lighting.",
                "variant": "",
                "reply": "Hi Lolette S. We're are so very happy to hear that the Solar Festoon Bulb String Lights are adding such a lovely atmosphere to your tree-top deck and that they'll be a hit with your guests. It's amazing that you installed them yourself—it really shows how easy they are to set up for instant lighting! Thanks for sharing the video too, it's always a treat to see our lights in action. Thank you so much for your wonderful feedback! 💛✨🤗"
              },
              {
                "name": "Tonya L.",
                "image": "",
                "rating": 5,
                "date": "2024-12-20",
                "review": "Excellent service and excellent high quality product! Love it!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Tonya L. We're delighted to hear you love your product and appreciate the excellent service. Your support means the world to us! Thank you so much for your kind words! 🥰"
              },
              {
                "name": "Sam V.",
                "image": "",
                "rating": 5,
                "date": "2024-12-18",
                "review": "Let be these lights from # lighthouse you have elevated our living space and made us feel so proud we love what you do and will be buying more - love your product!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Sam V. Thank you for such kind and heartfelt feedback! We're absolutely overjoyed to hear how our Solar Festoon Outdoor Bulb String Lights have elevated your living space and made you proud 🤩. It's amazing to know they've added that extra spark to your home! Your support means the world to us, and we can't wait to help you brighten even more spaces in the future. Thank you for sharing your video—it's always such a treat to see our lights shining in their new homes!"
              },
              {
                "name": "Sudipa B.",
                "image": "",
                "rating": 5,
                "date": "2024-12-18",
                "review": "Recently bought another set of solar lights from Litehouse. I love that they improved from previous designs - the plastic casing now covers the entire metal cap of the bulb, protecting it more from corrosion over time. The packaging all the parts came in was great. I was worried when a few bulbs didn't turn on, but they just needed to be tightened more. All in all, it's a great buy that makes my garden feel magical and like Christmas all year round",
                "variant": "10m (10 LED Bulbs)",
                "reply": "HI Supida B. Thank you so much for your thoughtful and detailed feedback! We're delighted to hear that you're enjoying your new Solar Festoon Outdoor Bulb String Lights and noticing the improvements in design 🤩. It's wonderful that they're bringing a magical, year-round festive feel to your garden! We appreciate you sharing your experience about the bulbs—it's helpful for us and other customers. Your video is really amazing!"
              },
              {
                "name": "Lindsay J.",
                "image": "",
                "rating": 4,
                "date": "2024-12-16",
                "review": "I loved the packaging and care from the team from the start of the Lighthouse shopping experience. The reason for 4 instead of 5 stars is that I thought they would cast brighter light, but they are not as bright as I had hoped. Still look great and work well :) Thanks!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Lindsay J D. Thank you so much for sharing your thoughtful feedback! We're delighted to hear that you loved the packaging and the care from our team—it truly means a lot to us✨ . We're sorry to hear that the brightness didn't fully meet your expectations but are glad to know the lights still look great and work well. Your input is incredibly valuable, and we'll keep it in mind as we strive to improve."
              },
              {
                "name": "Estelle C.",
                "image": "",
                "rating": 5,
                "date": "2024-12-16",
                "review": "Beautiful for a warm atmosphere, not too bright. Withstands heavy rain.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Estelle C. Thank you for your fantastic feedback! We're so happy to hear that your Solar Festoon Outdoor Bulb String Lights have created a warm and cozy atmosphere while standing up to heavy rain😊. It's wonderful to know they're the perfect balance of beauty and durability!"
              },
              {
                "name": "Lindi C.",
                "image": "",
                "rating": 5,
                "date": "2024-12-15",
                "review": "Beautiful warm lighting and very durable quality compared to others I bought",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Lindi C. We're so happy to hear you're enjoying the beautiful warm lighting and the durable quality of our Solar Festoon Bulb String Lights. They truly make a difference!💞"
              },
              {
                "name": "Marlene V.",
                "image": "",
                "rating": 5,
                "date": "2024-12-14",
                "review": "Best buy! Easy to set up!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Marlene V. Thank you for your wonderful feedback and for sharing the picture with us! We're so happy to hear that the Solar Festoon Bulb String Lights were easy to set up and that you consider them the best buy 🤩. They look absolutely fantastic in your space!😍"
              },
              {
                "name": "Julie R.",
                "image": "",
                "rating": 5,
                "date": "2024-12-14",
                "review": "Love my lights - they make me happy!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Julie R. This is just amazing! We're so happy to hear that your Solar Festoon Bulb String Lights bring you so much joy 🤩. It's wonderful to know they're making you happy and brightening up your space! Thank you for an amazing review.✨"
              },
              {
                "name": "Madelyn V.",
                "image": "",
                "rating": 5,
                "date": "2024-12-13",
                "review": "We love our solar lights! It creates a festive atmosphere.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Madelyn V. We're so happy to hear that your solar lights are adding a festive atmosphere to your space ✨. It's fantastic to see how beautifully they've brightened up your home! Thank you so much for your kind words and for sharing your wonderful video!🥰"
              },
              {
                "name": "Kelly G.",
                "image": "",
                "rating": 5,
                "date": "2024-12-11",
                "review": "Beautiful ambience!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Kelly G, Thank you for sharing the video and your lovely feedback! We're so happy to hear that the Solar Festoon Outdoor Bulb String Lights have created such a beautiful ambiance in your space 🤩. They look amazing, and we're delighted that you're enjoying them!💛"
              },
              {
                "name": "Nardus D.",
                "image": "",
                "rating": 5,
                "date": "2024-12-10",
                "review": "Awesome !",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Nardus D, Thank you very much! 💛"
              },
              {
                "name": "Cindy L.",
                "image": "",
                "rating": 5,
                "date": "2024-12-10",
                "review": "We love our new lights. Makes the summer evenings so much more pleasant. Easy to install and will certainly be ordering more.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Cindy L, We're so happy to hear that your Solar Festoon Outdoor Bulb String Lights are making your summer evenings even more enjoyable ✨. It's great to know they were easy to install, and we're excited that you'll be ordering more! Thank you so much for your wonderful feedback!"
              },
              {
                "name": "Claire A.",
                "image": "",
                "rating": 5,
                "date": "2024-12-09",
                "review": "Great service!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Claire A, Thank you very much for your amazing words and review!💛"
              },
              {
                "name": "Penny C.",
                "image": "",
                "rating": 5,
                "date": "2024-12-07",
                "review": "Love love love!!!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Penny C, Thank you so much for your amazing feedback! We're so happy to hear that you absolutely love your new lights ✨. Your excitement means the world to us!"
              },
              {
                "name": "Charlene M.",
                "image": "",
                "rating": 5,
                "date": "2024-12-06",
                "review": "Great product, great quality, and a great overall customer experience! I loved the email about meeting the team, really a fantastic brand and product.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Charlene M, Thank you so much for your amazing feedback! 😊 It means the world to us that you're enjoying your Solar Festoon Outdoor Bulb String Lights and had such a positive experience with our brand. ✨ We're delighted that you loved the email about meeting our team—creating those connections with our customers is so important to us.✨"
              },
              {
                "name": "Lauren B.",
                "image": "",
                "rating": 5,
                "date": "2024-12-05",
                "review": "It is perfectly packaged and looks very durable. Looking forward to fitting them",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Lauren B, Thank you so much for your kind words! We're so happy to hear that you're impressed with the packaging and quality of your Litehouse Solar Festoon Outdoor Bulb String Lights. 😊 We're confident they'll look absolutely fantastic once fitted.✨"
              },
              {
                "name": "Brian N.",
                "image": "",
                "rating": 5,
                "date": "2024-12-02",
                "review": "Absolutely amazed and satisfied with the quality, id like to order another 2 x 10m extensions to this kit",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Brian N, Thank you so much for your kind words! 😊 We're happy to hear you're happy with the quality of your lights! ✨ Amazing video by the way! Thank you for sharing it with us. We will be getting the extension kits soon next year! ✨"
              },
              {
                "name": "Danielle F.",
                "image": "",
                "rating": 5,
                "date": "2024-11-30",
                "review": "Great quality and brilliant customer service (thanks Jodie!)",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Danielle F, Thank you so much for your kind words! 😊 We're thrilled to hear you loved the quality of your lights and had a great experience with our team. We'll be sure to pass your thanks along to Jodie! Enjoy your lights! ✨"
              },
              {
                "name": "Lizel F.",
                "image": "",
                "rating": 5,
                "date": "2024-11-29",
                "review": "Just after sunset when they came on, love it! We are renovating and sorting thing out, so love sitting outside while doing it with these beautiful lights!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Lizel F, Thank you so much for sharing that beautiful video with us! ✨ It's amazing to hear how your lights are adding that special touch to your renovation process. 😊 We're so happy they're helping create a relaxing atmosphere while you work on your outdoor space. Keep enjoying the glow!💡💖"
              },
              {
                "name": "Errol P.",
                "image": "",
                "rating": 5,
                "date": "2024-11-28",
                "review": "Very impressive. Delivered on time. Packaged so well. Quality is top class. With the solar option there is no hassle about turning on and off. For the lazy type. Really great product",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Errol P., Thank you so much for the wonderful feedback! This is so amazing! We're so happy to hear that you're impressed with the timely delivery, packaging, and quality of the lights. The solar option really is perfect for convenience—no need to worry about turning them on and off!💡 We appreciate your support and look forward to hearing from you again! 🌟"
              },
              {
                "name": "Paul S.",
                "image": "",
                "rating": 5,
                "date": "2024-11-25",
                "review": "My third set of these lights and they are great! Beautifully packages too. Good quality and great value. Highly recomended.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Paul S, Thank you so much for your wonderful feedback! This really wonderful news to hear that the Solar Festoon Bulb String Lights have become a favorite for you. Knowing this is your third set truly makes our day! ✨ We're glad you appreciate the quality, packaging, and value—we aim to make every part of your experience special. Thank you for recommending us! 💛"
              },
              {
                "name": "Minet L.",
                "image": "",
                "rating": 5,
                "date": "2024-11-22",
                "review": "Excellent products! Love all my lights.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Minet L, Thank you so much for your kind words! 💛 We're overjoyed to hear that you love all your lights and are enjoying our products!"
              },
              {
                "name": "Abigail V.",
                "image": "",
                "rating": 5,
                "date": "2024-11-22",
                "review": "High quality lights that last a long time and are easy to install. Very impressed and will be buying more!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Abigail V, Thank you so much for your amazing feedback—it means the world to us! 🤩 We are so happy to hear that you're impressed with the quality and ease of installation of our lights. We can't wait to have you shop with us again! With Love, Litehouse!"
              },
              {
                "name": "Nickey C.",
                "image": "",
                "rating": 5,
                "date": "2024-11-11",
                "review": "Absolutely adore the lights! Best quality and service- couldn't love it more! Well done guys! It brings me so much joy 🤍",
                "variant": "15m (15 LED Bulbs)",
                "reply": "HI Nickey C, Thank you so much for the love! 🤩 We're absolutely delighted to hear that the lights bring you so much joy and that you're happy with our quality and service! Your kind words mean the world to us. Thank you for sharing your amazing video with us, it is truly amazing. Happy illuminating! ✨💖"
              },
              {
                "name": "Annalize S.",
                "image": "",
                "rating": 5,
                "date": "2024-11-11",
                "review": "Incredible service! Thank you!! Xx",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Annalize S, We're thrilled to hear you had a great experience! Our team works hard to provide excellent customer service. Thank you for your kind words. We look forward to assisting you again in the future.🥰"
              },
              {
                "name": "Chris P.",
                "image": "",
                "rating": 5,
                "date": "2024-11-09",
                "review": "I'd just like to know if I can get a 10m extension for my 15m solar festoon lights?",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Chris P, Absolutely! We're all about making your outdoor space shine, even brighter. A 10m extension for your 15m solar festoon lights? Sounds like a perfect match. Just wait for it – we've got a little surprise coming. Stay tuned!😊"
              },
              {
                "name": "Michelle F.",
                "image": "",
                "rating": 5,
                "date": "2024-11-08",
                "review": "Stunning. Put them in a tree. Excellent quality. Fantastic service. Packaged beautifully. Will send photos",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Michelle F, We're so glad you love your new Festoon Bulb String Lights! 🤩✨ It's always exciting to see how customers style our products. We can't wait to see your photos!💛"
              },
              {
                "name": "Dean S.",
                "image": "",
                "rating": 5,
                "date": "2024-10-31",
                "review": "LOVE LOVE LOVE !!\nEasy to Setup and use. \nTook our Camping setup to the next level !!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hey Dean S, LOVE, LOVE, LOVE this feedback! 🤩 We're so happy to hear the setup was easy and that it's taken your camping experience to the next level! Nothing better than adding a little extra magic to those outdoor adventures. ✨ Happy camping! 🏕️"
              },
              {
                "name": "Simon M.",
                "image": "",
                "rating": 5,
                "date": "2024-10-19",
                "review": "Awesome quality, works beautifully. Quick delivery and great communication / updates on the order.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Simon B, It's wonderful to know that our product has met your expectations 😊. We're committed to providing quick delivery and excellent communication. Thank you very much for your kind words!"
              },
              {
                "name": "Louise P.",
                "image": "",
                "rating": 5,
                "date": "2024-10-08",
                "review": "Fantastic new look around our pool area. But the best of all is the start to finish buying experience from Lighthouse. You know what you're doing!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Louise P, Thank you very much for sharing your amazing images with us and thank you for your kind words about our service. It's our goal to provide a seamless and enjoyable shopping experience for all of our customers.💖"
              },
              {
                "name": "Lilian J.",
                "image": "",
                "rating": 5,
                "date": "2024-10-07",
                "review": "Love it",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Lilian J, thank you for your wonderful review. We are glad that you Love it! 💛"
              },
              {
                "name": "Elma G.",
                "image": "",
                "rating": 5,
                "date": "2024-09-18",
                "review": "Love your Solar lights......... We have a farm and all the verandas have now been lit up and it makes such a difference. Gave the 10m solar lights to a friend for his birthday - he was in heaven! thank you for such a great product and for lighting up our lives!!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Elma G, We're absolutely thrilled to hear that our solar lights have brought so much joy to your farm and your friend's life! It's wonderful to know that our products are making a positive impact. Thank you for taking the time to share your positive experience. Your feedback means a lot to us and encourages us to continue providing high-quality products. We hope you and your friend continue to enjoy the benefits of our solar lights for many years to come.💛"
              },
              {
                "name": "Jax D.",
                "image": "",
                "rating": 5,
                "date": "2024-09-08",
                "review": "Definitely elevates our fire-pit to 'magazine worthy' status!! Love them!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Jax D, We're so glad to hear that our lights have elevated your outdoor space to \"magazine-worthy\" status! That's exactly what we strive for.💛 Thank you for your kind words and support. We're always happy to hear from satisfied customers. Enjoy your beautiful fire pit!🔥"
              },
              {
                "name": "Safiyya S.",
                "image": "",
                "rating": 5,
                "date": "2024-05-25",
                "review": "Amazing product \nEasy to install \nLove it",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hey Safiyya S. We're so glad you love your new lights! It's fantastic to hear that they were easy to install and look amazing. Their design and easy installation make them a favorite, and we're glad they've transformed your space. Enjoy the warm, inviting glow they create! We appreciate you taking the time to share your positive experience and we hope that you continue to enjoy your Better, Brighter Moments!🤩"
              },
              {
                "name": "Cindy",
                "image": "",
                "rating": 5,
                "date": "2024-05-24",
                "review": "I bought the 10 solar lights. Quick delivery. I am a 60 year old widower and EASILY installed them on my own. A really good quality product. Thrilled with my purchase !!!!",
                "variant": "",
                "reply": "Hi Cindy,  We are overjoyed hear such wonderful feedback😍 ! It's fantastic that you were able to easily install the solar lights yourself, and we're so glad they've exceeded your expectations. Simplicity is key and your satisfaction is our ultimate goal, and we're delighted to have brightened your space. Thank you for sharing your positive experience! Litehouse Team!💛"
              },
              {
                "name": "Maite L.",
                "image": "",
                "rating": 5,
                "date": "2024-05-17",
                "review": "Great product and great customer service.",
                "variant": "15m (10 LED Bulbs)",
                "reply": "Hey Maite L. Thank you very much for your amazing words and review! We go above and beyond and we feel that going the extra mile is always worth it in the end. We hope that you continue to love and enjoy your Solar Festoon Bulb String Lights.🌟"
              },
              {
                "name": "Zovuyo D.",
                "image": "",
                "rating": 5,
                "date": "2024-05-12",
                "review": "The website was very easy to navigate. Delivery took 2 days only and I was kept informed of my order.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Zovuyo D. That's wonderful to hear! It really warms our hearts to that your shopping experience was seamless from start to finish🥰. Our team works hard to ensure quick delivery and transparent order updates. We appreciate you taking the time to share your positive feedback. Thank you very much for this! ✨"
              },
              {
                "name": "Christine K.",
                "image": "",
                "rating": 5,
                "date": "2024-04-12",
                "review": "I absolutely love the festoon lights. They were so easy to install on my pergola. The quality of your product is exceptional as is your service and attention to detail in terms of liaising with your client. Thank you so much. Will highly recommend Litehouse to everyone.",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Christine K, We're absolutely delighted to hear that you love your festoon lights and that they were a breeze to install on your pergola! Providing exceptional quality and service is what we're all about, and we're thrilled that you've experienced that firsthand. Thank you for your kind words about our attention to detail and client communication—it's truly important to us to ensure a seamless experience for our customers. We're honored by your recommendation and look forward to brightening many more spaces with Litehouse lights. 💛💛💛💛"
              },
              {
                "name": "Aneri H.",
                "image": "",
                "rating": 5,
                "date": "2024-02-06",
                "review": "It is a good quality product and we liked it so much we got another one.  Looks beautiful at night.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Aneri H, Thank you so much for the kind words! It's wonderful to know that it's meeting your expectations and adding beauty to your nights. Your satisfaction means the world to us! 🧡"
              },
              {
                "name": "Mari P.",
                "image": "",
                "rating": 5,
                "date": "2024-01-18",
                "review": "This is the second set of lights we bought and daisy chained them. They are awesome.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Mari P, Thank you so much! We are over the moon to hear that you're enjoying the lights and found a creative way to daisy chain them. It's fantastic to know they're meeting your expectations. Enjoy your beautifully lit space.✨✨✨✨"
              },
              {
                "name": "Michaela R.",
                "image": "",
                "rating": 5,
                "date": "2024-01-09",
                "review": "The solar Festoon lights work really well. The video does not do them justice! I linked two sets. I get lots of compliments! Beautiful warm light. So ive sent many friends to Litehouse!",
                "variant": "10 Meters",
                "reply": "Hi Michaela R, Thank you so much for your wonderful feedback! It gives us joy to hear that the solar festoon lights are working well for you and that you've linked two sets for an even more stunning display. It's truly heartening to know that the lights exceed expectations, and your compliments mean the world to us. We're honored to have earned your recommendation, and we greatly appreciate you sending many friends our way."
              },
              {
                "name": "Vilita J.",
                "image": "",
                "rating": 5,
                "date": "2024-01-03",
                "review": "We love our lights, made our new years eve extra special ordered 15m, Good quality and great service. Cant wait to get my hands on another set of lights or two 😊😀",
                "variant": "15m (15 LED Bulbs)",
                "reply": "Hi Vilita J, Thank you so much for your wonderful feedback! We're ecstatic to hear that our lights added an extra special touch to your New Year's Eve celebration. It's fantastic to know that you are pleased with the quality and service. We look forward to serving you again, and we can't wait for you to enjoy another set or two of lights. We appreciate your support and wish you many more joyous moments with our lights! 😊🎉"
              },
              {
                "name": "Amanda D.",
                "image": "",
                "rating": 5,
                "date": "2023-12-21",
                "review": "The product is even packaged beautifully. Easy to install and really worth it. Love my lights!",
                "variant": "15m (15 LED Bulbs)",
                "reply": "The product is even packaged beautifully. Easy to install and really worth it. Love my lights!"
              },
              {
                "name": "Jessica G.",
                "image": "",
                "rating": 5,
                "date": "2023-12-12",
                "review": "Litehouse, wonderful service! 10 out of 10! Not to be found easily!",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Jessica G, Thank you so much for your generous praise! We're overjoyed to receive a perfect 10 out of 10 from you🙌 . Your kind words about our service mean the world to us. It's our goal to provide exceptional experiences, and we're delighted to know we've met your expectations.✨✨✨"
              },
              {
                "name": "Vivian L.",
                "image": "",
                "rating": 5,
                "date": "2023-12-05",
                "review": "Light came within a few days. Packaging was amazing. The lights look lovely and I will definitely buy more.",
                "variant": "15m (15 LED Bulbs)",
                "reply": ""
              },
              {
                "name": "Esmé E.",
                "image": "",
                "rating": 5,
                "date": "2023-12-05",
                "review": "I have not hanged it up yet - it is meant for the tree at our holiday place, but we tried it out and it is very good quality - it works well, looks beautiful and I am looking forward to dress up our tree for Christmas.",
                "variant": "10m (10 LED Bulbs)",
                "reply": "Hi Esmé E, We are very happy to read your review of great quality and that you're pleased with how well it works and looks✨! It sounds like it will add a special touch to your holiday decorations. I hope dressing up your tree for Christmas brings you even more joy. Wishing you a wonderful and festive holiday season! 🎄 Love, Litehouse! 🧡"
              },
              {
                "name": "Ofer H.",
                "image": "",
                "rating": 4,
                "date": "2023-11-27",
                "review": "Good quality of light string; the voltage is not strong enough for our application on the solar kit; we had to purchase a plug in 220-240V as we needed more light. You can extend the string of bulbs which is great. It's more for camping in my mind or in garden if you already has some lights around you - it's more for ambient rather than strong light to enlighten a dark area. All in all great service and good product.",
                "variant": "15 Meters",
                "reply": "Hi Ofer H, Thank you for taking the time to share your feedback with us. We're delighted to hear that you found our light string to be of good quality and that the option to extend the string of bulbs worked well for your needs. We appreciate your insights on the voltage and its suitability for specific applications. Your feedback is valuable as it helps us understand our products' performance in various scenarios. We take note of your experience with the solar kit and the need for more light in certain situations. It's wonderful to know that you found our product suitable for camping and creating ambient lighting. We strive to provide versatile solutions for our customers, and your feedback confirms that our light string serves its purpose effectively. Love, Litehouse Team! ✨"
              },
              {
                "name": "Jannie N.",
                "image": "",
                "rating": 5,
                "date": "2023-11-25",
                "review": "Seamless shopping, ordering, paying, delivery. Mine was a wedding gift and it wasn't possible to add a simple note and the couple got the invoice which is not ideal. The gifting option is easy to add. Thé bridal couple recipients were OVER THE MOON with delight. Thank You for a stunning product Xx",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Annelies B.",
                "image": "",
                "rating": 5,
                "date": "2023-11-20",
                "review": "Absolutely love my lights. My house is full of Lifehouse lights and everyone compliments when they see how it looks and I always advise your Brand. Thank you!",
                "variant": "10 Meters",
                "reply": "Hi Annelies B, Oh my Word! How lovely is your video! 🥰🥰🥰🥰 Thank you so very much for sharing this with us. Thank you so much for your kind words! We're thrilled to hear that you're loving your Lifehouse lights. It means the world to us that you're recommending our brand to your friends and family. Love, Litehouse! 🧡"
              },
              {
                "name": "Andre B.",
                "image": "",
                "rating": 5,
                "date": "2023-11-18",
                "review": "Beautiful ambience, excellent quality!",
                "variant": "15 Meters",
                "reply": "Hi Andre B, Thank you very much for your wonderful words and rating! We are so happy to hear that you found our ambience to be beautiful and our quality to be excellent."
              },
              {
                "name": "Katinka S.",
                "image": "",
                "rating": 5,
                "date": "2023-11-16",
                "review": "Love my new lights. The returns process also easy and seamless - a very big shout out to Jodie in particular. Really excellent service. Thank you Litehouse <3",
                "variant": "10 Meters",
                "reply": "Hey Katinka S, Thank you for taking the time to share your positive experience with us🥰 ! We are delighted to hear that you are enjoying your new lights and that you found our returns process to be easy and seamless. Your satisfaction is our top priority, and we are committed to providing our customers with exceptional service. We are glad to hear that we were able to meet your expectations, and we appreciate your continued support. Love, Litehouse Team! ✨✨✨"
              },
              {
                "name": "Penny C.",
                "image": "",
                "rating": 5,
                "date": "2023-10-26",
                "review": "Love my lights! Will be ordering more to fill the space to perfect evening lighting 😊",
                "variant": "10 Meters",
                "reply": "Hi Penny C, We're absolutely overjoyed to hear that you love your lights! It's wonderful to know our lights have added to your perfect evening ambiance✨ . We can't wait to help you fill your space with even more beautiful lighting. Thank you, Penny Love, Litehouse Team 🧡🧡"
              },
              {
                "name": "Patsy C.",
                "image": "",
                "rating": 5,
                "date": "2023-10-16",
                "review": "I am thrilled with my purchase. It is a real quality product, and much thought has been exerted into its operation - ie add extensions, spare bulbs inserted, bulbs can be replaced, charging via solar or UBS, and the cord and attachments are strong and durable. The company appears to value personal communication re the introduction of their operating team, ethos and customer feedback via emails and they really deserve much success. I would definitely recommend this product as the company is great! If a remote is introduced after your research has been conducted, I would purchase the product. Many thanks to a great team and a super product.",
                "variant": "10 Meters",
                "reply": "Hi Patsy C, It's wonderful to hear that you're thrilled with your purchase and that you appreciate the quality and thoughtful design of the product. We're truly grateful for your kind words and the time you've taken to share your feedback with us.😊 We're committed to delivering exceptional products and maintaining open lines of communication with our valued customers. Your recommendation means a lot to us, and we'll continue to work hard to meet and exceed your expectations. We'll certainly keep your suggestion in mind about a remote control for future product developments, and we'll do our best to explore that option. Thank you again for your support and for choosing Litehouse. We're delighted to have you as a satisfied customer!"
              },
              {
                "name": "Asma D.",
                "image": "",
                "rating": 5,
                "date": "2023-04-22",
                "review": "Great quality, super easy to install and makes a wonderful light.",
                "variant": "15 Meters",
                "reply": "Hey Asma D. Thank you kindly for your positive review. 😊These solar light sensor LED string lights are perfect for adding a beautiful ambience lighting element to any space. We really appreciate your feedback and it really makes everything we do worth it. Thank you Asma, Litehouse Team 🧡"
              },
              {
                "name": "Tanya D.",
                "image": "",
                "rating": 4,
                "date": "2023-04-17",
                "review": "Love this brand! Beautifully packaged, easy to use. Solar panel works so well..The only thing that I am concerned about is that 3 globes stopped working on day 2 of putting up the strings?",
                "variant": "10 Meters",
                "reply": "Hey Tanya D, Thank you so much for your feedback, we really appreciate you taking the time to express this to us. I am so sorry to hear about the two bulbs that did not work. I will be in contact with you as soon as possible.🙏 Litehouse Team✨"
              },
              {
                "name": "Ronel N.",
                "image": "",
                "rating": 5,
                "date": "2023-04-11",
                "review": "Had a function Took the most amazing pictures Loved my litehouse lights❤️",
                "variant": "15 Meters",
                "reply": "Hey Ronel N. This is just amazing!! You setting looks beautiful. ✨✨✨ Thank you very much for taking out the time to share your experience with us. It really warms our hearts to know that you are happy with your lights. Cheers to all the Better, Brighter Moments! With Love, Litehouse Team ✨✨"
              },
              {
                "name": "Andreas S.",
                "image": "",
                "rating": 5,
                "date": "2023-02-23",
                "review": "Litehouse is simply the best - especially the festoon solar lights 👏🏼👏🏼👏🏼",
                "variant": "10 Meters",
                "reply": "Hey Andreas S, 😊 Thank you very much for your positive review on our product. It makes us extremely happy to hear that you love your lights, and indeed, the Festoons are really a beauty! We really appreciate this!✨ Litehouse Team"
              },
              {
                "name": "Taylored S.",
                "image": "",
                "rating": 5,
                "date": "2023-01-16",
                "review": "Super quick delivery, looks great and quality is very good. Very happy with them!",
                "variant": "15 Meters",
                "reply": "Hey Taylored Spaces,😃Thank you so so very much for the positive feedback!😊We are happy that you are happy with your lights. It really makes us happy to hear this! Litehouse Team!✨"
              },
              {
                "name": "Dave H.",
                "image": "",
                "rating": 5,
                "date": "2023-01-04",
                "review": "excellent product and value for money ... easy setup and installation , popped the solar panel on the roof and all working just fine the whole night , LED lights are great with a nice warm subtle brightness --- delivery was amazingly fast --well done",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "D P.",
                "image": "",
                "rating": 5,
                "date": "2022-12-30",
                "review": "These solar lights are the best !!!",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Gavin M.",
                "image": "",
                "rating": 5,
                "date": "2022-12-19",
                "review": "Awesome service...... And the product is just what I expected and wanted..... Thanks team",
                "variant": "10 Meters",
                "reply": "Hey Gavin M, Thank you very much for your amazing feedback!⭐ We are really happy that you are happy with your product and service received from us. This makes everything so worth it! Thank you very much!🙏 Litehouse Team🪄"
              },
              {
                "name": "Juanita B.",
                "image": "",
                "rating": 5,
                "date": "2022-12-19",
                "review": "Live, indigenous Christmas tree",
                "variant": "15 Meters",
                "reply": "Hey Juanita B, This puts a big smile on our faces to see this amazing picture.✨ We really appreciate you for sharing this with us. It really looking breathtaking.🪄 Litehouse Team✨"
              },
              {
                "name": "Lynette H.",
                "image": "",
                "rating": 5,
                "date": "2022-12-09",
                "review": "These are amazeeeeeng!!! Better than expected. Love love love them. Took a photo but its on my phone will try send to you.",
                "variant": "15 Meters",
                "reply": "Hey Lynette H. Thank you for your amazing feedback, we are happy that you love them. They are quite a charmer!✨Please do send us the photo when you have time.🙌 Litehouse Team🪄"
              },
              {
                "name": "Dillan V.",
                "image": "",
                "rating": 5,
                "date": "2022-11-07",
                "review": "After much consideration and shopping around we found Litehouse to not only be the best looking but best quality product. Easy install and awe inspiring final look.",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Wayne S.",
                "image": "",
                "rating": 5,
                "date": "2022-10-21",
                "review": "Really good quality. Lighting is soft, ambient and also bright. Very happy.",
                "variant": "15 Meters",
                "reply": "We are so happy to hear that Wayne! Enjoy your better, brighter moments with your Litehouse Lights! :D"
              },
              {
                "name": "Pam A.",
                "image": "",
                "rating": 5,
                "date": "2022-10-15",
                "review": "Haven't used them yet will send photos when I do",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Adam C.",
                "image": "",
                "rating": 5,
                "date": "2022-10-03",
                "review": "Great unit for my outside area, I will be buying more to expand the system further. Thanks team",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Anneke B.",
                "image": "",
                "rating": 5,
                "date": "2022-10-01",
                "review": "Great service and excellent quality product.",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Tanya H.",
                "image": "",
                "rating": 5,
                "date": "2022-09-23",
                "review": "I am very happy with the 15m festival lights I bought. They arrived promptly and last the entire night. The light is ambient and sufficient. The product is well made. I would highly recommend them.",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Evan K.",
                "image": "",
                "rating": 5,
                "date": "2022-09-17",
                "review": "Amazing service and even better products. Top notch quality ! Cannot fault a thing.",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Ann D.",
                "image": "",
                "rating": 5,
                "date": "2022-09-14",
                "review": "I run a mobile rest service and give the perfect amount of light in bush locations",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Emily H.",
                "image": "",
                "rating": 5,
                "date": "2022-09-04",
                "review": "Stunning lights, they look perfect on our patio!",
                "variant": "15 Meters",
                "reply": ""
              },
              {
                "name": "Vanessa L.",
                "image": "",
                "rating": 5,
                "date": "2022-05-26",
                "review": "Great background lighting indoors for loadshedding hours 👌",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Kim S.",
                "image": "",
                "rating": 5,
                "date": "2022-04-30",
                "review": "I am getting more of these!",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Jackie B.",
                "image": "",
                "rating": 5,
                "date": "2022-04-29",
                "review": "Love the solar lights! Easy to enjoy. And they look beautiful 😍",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Helene B.",
                "image": "",
                "rating": 5,
                "date": "2022-04-17",
                "review": "Pity 2 globes not working and this is the fourth string of lights and they all had some dead lights.Will order globes not our shaded for a special occasion so dissipointing",
                "variant": "10 Meters",
                "reply": ""
              },
              {
                "name": "Kathy B.",
                "image": "",
                "rating": 5,
                "date": "2022-04-06",
                "review": "We haven't had a chance to put them up yet, will send Pic as soon as we do",
                "variant": "10M / 10LED",
                "reply": ""
              },
              {
                "name": "Tania E.",
                "image": "",
                "rating": 5,
                "date": "2022-03-29",
                "review": "Love this product.  Will definitely buy more.",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Natalie M.",
                "image": "",
                "rating": 5,
                "date": "2022-01-29",
                "review": "Awesome product!",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Amanda P.",
                "image": "",
                "rating": 5,
                "date": "2022-01-07",
                "review": "Love my lights, will definitely be ordering more.",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Phillip H.",
                "image": "",
                "rating": 5,
                "date": "2021-11-30",
                "review": "Great service! Great product!",
                "variant": "",
                "reply": ""
              },
              {
                "name": "Henriette K.",
                "image": "",
                "rating": 5,
                "date": "2021-11-23",
                "review": "Awesome product ! Lobe the ambience the lights create",
                "variant": "",
                "reply": ""
              }
            ]
        };

        var outdoorLanternReviewsData = {
            "product_url": "https://litehouselighting.com/products/litehouse-solar-outdoor-wall-light-wall-mount-led",
            "reviews": [
              {
                "name": "Greg A.",
                "rating": 5,
                "date": "2026-02-09",
                "review": "Great light",
                "color": "Charcoal"
              },
              {
                "name": "Jane G.",
                "rating": 5,
                "date": "2026-02-07",
                "review": "My new pool needed lighting, I am so happy either way my first purchase now o have made a second order.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/2/7/eLXjlaZzl_mid.jpg"
                ]
              },
              {
                "name": "Patrick W.",
                "rating": 5,
                "date": "2026-02-05",
                "review": "Great aesthetically pleasing light for our patio that generates a fair amount of illumination",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, Patrick✨ We're so happy you love your lights!",
                "video": "https://iframe.videodelivery.net/262c076a16b59b1b04901d45e1043667?autoplay=true&muted=true&preload=auto"
              },
              {
                "name": "Susan L.",
                "rating": 5,
                "date": "2026-02-05",
                "review": "The lights were meticulously packed,  made with high quality materials, nice looking, with easy to follow instructions. I've got them all fully charged and am looking forward to thinking about which spaces to light up.",
                "color": "White",
                "reply": "Wow, Susan! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Stephen O.",
                "rating": 5,
                "date": "2026-02-03",
                "review": "We have three of these lighting the path from laundry to the clothesline! Much better than using a flashlight and carrying the washing. These are perfect!",
                "color": "Charcoal",
                "reply": "Hi Stephen, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Lisa P.",
                "rating": 5,
                "date": "2026-02-03",
                "review": "Purchased and installed for a friend. She's very happy with it.",
                "color": "White",
                "reply": "Thank you for the glowing review, Lisa✨ We're so happy your friend loves their Wall lights!"
              },
              {
                "name": "Laurie M.",
                "rating": 5,
                "date": "2026-01-31",
                "review": "We love the way the lights look especially how they light up more when there is movement.",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, Laurie✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Judith B.",
                "rating": 5,
                "date": "2026-01-30",
                "review": "Works well even with the limited direct sun light that is on the sides of my house.  Provides needed light at night for the stairs to back yard.",
                "color": "White",
                "reply": "Hi Judith, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Daniel O.",
                "rating": 5,
                "date": "2026-01-29",
                "review": "Works great. The magnet worked well for a tooless installation as well.",
                "color": "Charcoal",
                "reply": "Hi Daniel, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Mark C.",
                "rating": 5,
                "date": "2026-01-29",
                "review": "Perfect secure attachment to metal gutter has eliminated the front door perfectly",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/28/IyXNuoRY-i_mid.jpg"
                ],
                "reply": "Hi Mark, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "James L.",
                "rating": 5,
                "date": "2026-01-28",
                "review": "Light works as described. Prompt post. Very happy with light.",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, James✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Clinton S.",
                "rating": 4,
                "date": "2026-01-27",
                "review": "Overall we are happy with the 4 lights we bought. However, even though it is the height of summer here, with plenty of sunshine, it took much more than 5-7 hours to charge them up initially. And, although they were laid out in the same position on a table their solar take up between lights varied significantly for reasons we don't quite understand. To boost their charge we have given them all the same amount of sunlight and gradually they have started to operate together. But certainly very variable at first. That has been a weakness.",
                "color": "Charcoal"
              },
              {
                "name": "Robin C.",
                "rating": 5,
                "date": "2026-01-27",
                "review": "I needed a light at the door of my Airbnb and this was SO EASY to set up and works perfectly to light both the door and steps. I'm very happy with this purchase!",
                "color": "White",
                "images": [
                  "https://images.loox.io/uploads/2026/1/27/xxjd9xsQt_mid.jpg"
                ],
                "reply": "Wow, Robin! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Sara A.",
                "rating": 4,
                "date": "2026-01-25",
                "review": "This light is super sleek and modern looking. It was incredibly  easy to install and works really well. My only complaint is that there is not a brighter white option. The hue is warm at all brightness levels.",
                "color": "Charcoal",
                "reply": "Wow, Sara! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Lisa M.",
                "rating": 5,
                "date": "2026-01-23",
                "review": "It looks great!",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/25/II4cuPqPW_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Lisa✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Erica T.",
                "rating": 5,
                "date": "2026-01-21",
                "review": "Love everything about it so far!",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, Erica ✨We're so happy you love your lights!"
              },
              {
                "name": "Judith B.",
                "rating": 5,
                "date": "2026-01-21",
                "review": "Easy to hang, just perfect to light my steps!",
                "images": [
                  "https://images.loox.io/uploads/2026/1/21/fKHq0kr-x_mid.jpg"
                ],
                "reply": "Wow, Judith! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Kris R.",
                "rating": 5,
                "date": "2026-01-21",
                "review": "Easy to install and they look great!",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/20/kJ_bj8KQI_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Kris✨ We're so happy you love your lights!"
              },
              {
                "name": "Beth H.",
                "rating": 5,
                "date": "2026-01-17",
                "review": "Needed some lighting for safety along a path to the front door. These are great!",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, Beth✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Ann W.",
                "rating": 5,
                "date": "2026-01-16",
                "review": "Great solar light,  easy to use,  bright with ambience.",
                "color": "Charcoal",
                "reply": "Thank you for the glowing review, Ann ✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Elvin B.",
                "rating": 5,
                "date": "2026-01-15",
                "review": "Love the product ! Sleek and contemporary.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/15/tnIOl2wW-1_mid.jpg",
                  "https://images.loox.io/uploads/2026/1/15/surzAv9ui_mid.jpg",
                  "https://images.loox.io/uploads/2026/1/15/CQ24uwNHYD_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Elvin✨ Your setup looks amazing!"
              },
              {
                "name": "Reed",
                "rating": 5,
                "date": "2026-01-15",
                "review": "Excellent, soft, warm light. I wish everyone would adopt 2700K light. Perfect for lighting up the back corner of our backyard.",
                "images": [
                  "https://images.loox.io/uploads/2026/1/15/6KpUu_PSRd_mid.jpg"
                ],
                "reply": "Hi Reed, thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Ellen P.",
                "rating": 4,
                "date": "2026-01-14",
                "review": "I like the functionality of this light but I'm a bit disappointed that it's made of hard plastic. I was expecting metal. We'll see how it wears over time. Fingers crossed.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/14/0GPxX_Iyi_mid.jpg"
                ],
                "reply": "Hello, Ellen! Thank you so much for sharing your feedback with us.💛 We're glad to hear you're enjoying the functionality of the light! We understand your surprise regarding the material; we use a high-grade, UV-resistant, and weatherproof ABS plastic specifically to ensure the lights can withstand the elements without rusting or corroding over time. We're confident they will hold up beautifully, but please don't hesitate to reach out if you have any concerns as the seasons change."
              },
              {
                "name": "Beverly S.",
                "rating": 4,
                "date": "2026-01-14",
                "review": "We love the final outcome of these lights. They provide a lovely ambiance and are elegant. They would blend with a number of home styles. One star off because: - Adjusting between the four settings takes a bit to master, and the flashing lights, necessary to selecting the right setting,  are difficult to see. - The website says there is live chat during CST business hours, but doesn't seem to be available. This necessitates sending an email and waiting until a reply is received. It would've been helpful to have a back-and-forth conversation to finesse the start up. - being able to charge manually too would be a welcome feature",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/13/2kS3Fao1R_mid.jpg"
                ],
                "reply": "Wow, Beverly! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Gregg H.",
                "rating": 5,
                "date": "2026-01-13",
                "review": "The light adds a nice look to my approach wall.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/12/I5FsvSfhD_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Gregg✨We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Ross A.",
                "rating": 5,
                "date": "2026-01-12",
                "review": "Installation was a snap and the motion detectors work as advertised. I am very happy with the investment. I purchased four and I have plans for the next pair once the new staircases are complete.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/12/VmNBRj9Oj_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Ross✨ We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Ting S.",
                "rating": 5,
                "date": "2026-01-04",
                "review": "Love these lites! Now is rain season but they can last till 10pm",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2026/1/4/TTeQt8deQ_mid.jpg",
                  "https://images.loox.io/uploads/2026/1/4/GSe-169Z9_mid.jpg",
                  "https://images.loox.io/uploads/2026/1/4/gILpljXKm_mid.jpg"
                ]
              },
              {
                "name": "Deborah H.",
                "rating": 5,
                "date": "2026-01-04",
                "review": "We originally got the light for our driveway and put it up temporarily on our fuse box to see how it worked. It worked so well it will stay there and we will get another to put in the driveway.",
                "color": "White",
                "images": [
                  "https://images.loox.io/uploads/2026/1/4/2oAPKJik3_mid.jpg"
                ]
              },
              {
                "name": "Leigh B.",
                "rating": 5,
                "date": "2025-12-24",
                "review": "Really love that this light is simple, minimal, nice quality and not too bright like so many of the solar options out there. I didn't want a cold, blinding spotlight and this was just right to light up the doorway as I approach. The options for motion detection are great, too!",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2025/12/23/M1k3gu9tD_mid.jpg"
                ]
              },
              {
                "name": "Danny L.",
                "rating": 5,
                "date": "2025-12-23",
                "review": "I love the soft hue and how sleek it looks",
                "color": "Charcoal",
                "video": "https://iframe.videodelivery.net/e876e0a4c70ebcafd2d3059df2f79397?autoplay=true&muted=true&preload=auto"
              },
              {
                "name": "Melanie H.",
                "rating": 5,
                "date": "2025-12-20",
                "review": "Perfect for our entryway, will definitley order more for darker spits around the home.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2025/12/20/bkRnhd3s2_mid.jpg"
                ]
              },
              {
                "name": "Barbara S.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Easy to install, work exactly as I had hoped coming on at dusk automatically.  Very happy.",
                "color": "Charcoal",
                "images": [
                  "https://images.loox.io/uploads/2025/12/8/P_LIinqNJ_mid.jpg"
                ]
              },
              {
                "name": "Jan R.",
                "rating": 5,
                "date": "2025-11-13",
                "review": "Best lights. Looking to buy 6 more for the backyard and a a few lanterns!",
                "images": [
                  "https://images.loox.io/uploads/2025/11/13/PzBOL8tr7_mid.jpg",
                  "https://images.loox.io/uploads/2025/11/13/Ds-8VvBav_mid.jpg"
                ],
                "reply": "Thank you for your kind words, Jan! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Kristy W.",
                "rating": 5,
                "date": "2025-11-13",
                "review": "We are so impressed. Sleek and modern and produces good amount of light at night. Definitely will buy more in the future even for gifts aswell :-)",
                "images": [
                  "https://images.loox.io/uploads/2025/11/12/TZ3EZpcCs_mid.jpg"
                ],
                "reply": "Thank you for your kind words, Kristy! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Michael B.",
                "rating": 5,
                "date": "2025-10-19",
                "review": "Brought great light to a place without direct wiring. We're looking at other areas to add even more.",
                "images": [
                  "https://images.loox.io/uploads/2025/10/18/7ZNUd3KwX_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Michael! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Andrew S.",
                "rating": 4,
                "date": "2025-10-14",
                "review": "Awesome lights work great for our home",
                "images": [
                  "https://images.loox.io/uploads/2025/10/14/61Q_PITuR_mid.jpg",
                  "https://images.loox.io/uploads/2025/10/14/fEZOlPi3P_mid.jpg"
                ],
                "reply": "Wow, your setup looks amazing, Andrew! Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Tudon M.",
                "rating": 5,
                "date": "2025-09-30",
                "review": "Excellent lights, easy setup and magnetic too!",
                "images": [
                  "https://images.loox.io/uploads/2025/9/30/fe8i-w4m5_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Tudon! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "John J.",
                "rating": 5,
                "date": "2025-09-24",
                "review": "Easy install , worked exactly as advertised and sets a beautiful ambience over our pool",
                "images": [
                  "https://images.loox.io/uploads/2025/9/24/qZFJQ4aPE_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, John! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Anthony C.",
                "rating": 5,
                "date": "2025-09-21",
                "review": "Brilliant light!! You won't regret buying these!!",
                "video": "https://iframe.videodelivery.net/cafdcc86f4a6e5a9054072b8ddba909c?autoplay=true&muted=true&preload=auto",
                "reply": "Thank you for your kind words Anthony—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Lynda B.",
                "rating": 5,
                "date": "2025-09-19",
                "review": "These lights are awesome. Even better than expected with the different brightness settings.",
                "images": [
                  "https://images.loox.io/uploads/2025/9/19/GyIsOW_JN_mid.jpg",
                  "https://images.loox.io/uploads/2025/9/19/C29J0w2Rt_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Lynda! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Ruth A.",
                "rating": 5,
                "date": "2025-08-31",
                "review": "These lights are great, they are both functional and beautiful",
                "images": [
                  "https://images.loox.io/uploads/2025/8/31/YK5hpOtmQ_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Ruth! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Susan H.",
                "rating": 5,
                "date": "2025-08-29",
                "review": "I love my lights.  I purchased two for my new home and now I want more! They are so much better than I expected.  So easy to install and I love the light they put out.  I think they look quite smart.",
                "images": [
                  "http://images.loox.io/uploads/2025/8/28/lb4RQUQUM_mid.jpg"
                ],
                "reply": "Wow, Susan! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Peta A.",
                "rating": 5,
                "date": "2025-08-26",
                "review": "Love these lights.. about to order more !",
                "images": [
                  "https://images.loox.io/uploads/2025/8/26/mNjFXjnTr_mid.jpg"
                ]
              },
              {
                "name": "Mark G.",
                "rating": 5,
                "date": "2025-08-24",
                "review": "Works looks great fits perfectly side of our house",
                "images": [
                  "https://images.loox.io/uploads/2025/8/24/vW7cItC5j_mid.jpg"
                ]
              },
              {
                "name": "Martin S.",
                "rating": 5,
                "date": "2025-08-20",
                "review": "These lights are brilliant (pun intended!) They do exactly as I intended. They have great style and easy to install. With an effective spread of lovely, nice warm light they blend in fabulously on our stairs.",
                "images": [
                  "https://images.loox.io/uploads/2025/8/20/f6lq-6WIY_mid.jpg",
                  "https://images.loox.io/uploads/2025/8/20/RD4uTMDZg_mid.jpg"
                ]
              },
              {
                "name": "Steve H.",
                "rating": 5,
                "date": "2025-08-13",
                "review": "Great highlight for my planter boxes in our courtyard",
                "images": [
                  "https://images.loox.io/uploads/2025/8/13/4EHIgxtdx_mid.jpg",
                  "https://images.loox.io/uploads/2025/8/13/8DlKieHuk_mid.jpg"
                ],
                "reply": "Wow, Steve! Thank you for sharing your set-up with us-wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Simon L.",
                "rating": 5,
                "date": "2025-08-08",
                "review": "Ordered 4 of these lights.  They create a nice atmosphere in the Alfresco/backyard area. Perfect ambiance for a quiet drink with friends and family",
                "images": [
                  "https://images.loox.io/uploads/2025/8/8/QBKusJkC5_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Simon! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Noreen W.",
                "rating": 5,
                "date": "2025-07-31",
                "review": "We needed some light in our back garden and so we got these.  We hope they offered enough light and they do - we are very pleased with how well they work, going from a dull light on standby to a bright light when we're nearby.  Bright without being spotlight-like.  Very happy.  We've ordered another one to add to what's there for further down the path.",
                "images": [
                  "https://images.loox.io/uploads/2025/7/31/DyElhocxR_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Noreen! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "James S.",
                "rating": 5,
                "date": "2025-07-28",
                "review": "ABSOLUTELY IN LOVE WITH MY NEW LIGHTS😍 TRANSFORMS THE OUTDOOR AREA BY BRINGS A LEVEL SOPHISTICATION AND CLASS TO OVERALL AMBIENCE! I BOUGHT 8 LIGHTS IN TOTAL 😊",
                "images": [
                  "https://images.loox.io/uploads/2025/7/28/SA8Or6TUD_mid.jpg"
                ],
                "reply": "Wow, James! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Anthony C.",
                "rating": 5,
                "date": "2025-07-27",
                "review": "Great lighting, really like how the sensors operate",
                "video": "https://iframe.videodelivery.net/db9d692794d941f18fd4921b02c74f1d?autoplay=true&muted=true&preload=auto"
              },
              {
                "name": "Hannah P.",
                "rating": 5,
                "date": "2025-07-24",
                "review": "These lights are easy to install and a beautiful addition to our yard.",
                "images": [
                  "https://images.loox.io/uploads/2025/7/24/GDlJD7IbJ_mid.jpg"
                ],
                "reply": "Thank you for the glowing review, Hannah! 💡 We're so happy you love your lights."
              },
              {
                "name": "Nick G.",
                "rating": 5,
                "date": "2025-07-08",
                "review": "Absolutely love these lights. Perfect lighting to light up our driveway. Positive vibes from everyone who has seen them. Will be buying lots more.",
                "images": [
                  "https://images.loox.io/uploads/2025/7/8/5-5GRfQZU_mid.jpg"
                ],
                "reply": "Your setup looks absolutely beautiful! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Charlotte A.",
                "rating": 5,
                "date": "2025-04-25",
                "review": "Absolutely love this product. From ordering the lights, to getting them within a short period of time, to the ease of installing them and did I mention, that they look amazing and are so easy to use. They elevate your garden to the next level. Thank you!! We will definitely be buying more!!",
                "images": [
                  "https://images.loox.io/uploads/2025/6/23/RIB5048oVL_mid.jpg",
                  "https://images.loox.io/uploads/2025/6/23/RigsKMTEw5_mid.jpg"
                ]
              },
              {
                "name": "Daria H.",
                "rating": 5,
                "date": "2025-04-21",
                "review": "Easy to install. Love that you can choose the levels and fit in beautifully with the house",
                "images": [
                  "https://images.loox.io/uploads/2025/6/23/JxZJlYT7QD_mid.jpg"
                ]
              },
              {
                "name": "Thomas J.",
                "rating": 5,
                "date": "2025-04-19",
                "review": "Super easy to install and provide enough light out of the box",
                "images": [
                  "https://images.loox.io/uploads/2025/6/23/xVabKoHZA_mid.jpg"
                ]
              },
              {
                "name": "Cesseri T.",
                "rating": 5,
                "date": "2025-03-28",
                "review": "Great quality product very impressed.",
                "images": [
                  "https://images.loox.io/uploads/2025/6/23/BbBgPm_Vb_I_mid.jpg",
                  "https://images.loox.io/uploads/2025/6/23/i_QeblX5WfF_mid.jpg"
                ]
              },
              {
                "name": "Noleen H.",
                "rating": 5,
                "date": "2025-03-27",
                "review": "These lights are amazing! Totally changed the dynamic of our back garden and illuminated the walkway to the pool. I suddenly felt like I was living in a resort!",
                "images": [
                  "https://images.loox.io/uploads/2025/6/23/D9x1J6L69fZ_mid.jpg"
                ]
              },
              {
                "name": "Dean H.",
                "rating": 5,
                "date": "2025-02-25",
                "review": "Best ever wireless hassle free product - worth every cent!!!",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/K2On-WtWm_mid.jpg",
                  "https://images.loox.io/uploads/2025/2/27/OjGT02WWUS_mid.jpg"
                ],
                "reply": "Hey Dean H. Wow, this photo looks amazing! We're so thrilled you're loving your Solar Wall Light with Motion Sensor. 'Best ever' is high praise, and we truly appreciate it!💯🔥✨💛"
              },
              {
                "name": "Michelle V.",
                "rating": 5,
                "date": "2025-02-20",
                "review": "Creating a wonderful ambience to an otherwise dark and somewhat neglected area...love the cosy vibes it creates!!✨️",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/l1fYppJN0_mid.jpg"
                ],
                "reply": "Hey Michelle V. That's fantastic! We're so happy to hear that our Solar Wall Light is transforming your space and creating such a cozy vibe. It's wonderful how a little light can make such a big difference, especially in a neglected area. Thank you for sharing your feedback and the photo – it really brightens our day! ✨"
              },
              {
                "name": "Gill S.",
                "rating": 5,
                "date": "2025-02-19",
                "review": "Love my solar wall lights and my solar string lights. Best Buy ever.",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/fkd8tSbv_V_mid.jpg"
                ],
                "reply": "Hey Gill S. Thank you very much for sending us your amazing images ✨. We're absolutely beaming to hear you love your solar wall lights and string lights!  \"Best Buy ever\" – that's fantastic!  We're so glad they're bringing you so much enjoyment!🔥💯"
              },
              {
                "name": "Wilma P.",
                "rating": 5,
                "date": "2025-02-16",
                "review": "Great product",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/NhNRs6SVH_mid.jpg"
                ],
                "reply": "Hi Wilma P. We're delighted you're happy with your Solar Wall Light with Motion Sensor. Your setting looks breathtaking! 🥰"
              },
              {
                "name": "Andreij H.",
                "rating": 5,
                "date": "2025-02-04",
                "review": "The wall lights are exceptionally beautiful, easy to install and intuitive to operate. A great solution to avoid chasing into walls to lay down electric cables. Brilliant - in all the senses of the word.",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/77eplMqZA_mid.jpg"
                ],
                "reply": "Hi Andreij H. We're so thrilled you find them exceptionally beautiful, easy to install, and intuitive to operate! That's exactly what we aim for. Thanks for the brilliant review – it makes our day!🥰 Thank you!"
              },
              {
                "name": "Darryl B.",
                "rating": 5,
                "date": "2025-02-03",
                "review": "Strong magnets and versatile to place in various areas depending where needed. Goes well with the string lights",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/kIM4flkXzR_mid.jpg"
                ],
                "reply": "Hi Darryl B. That's wonderful! We designed the light with versatility in mind, so it's great to hear it's working perfectly for you in different areas🤗 . And we love that it matches your string lights! Amazing setting! Thank you for sharing this with us. 💛"
              },
              {
                "name": "Gerard P.",
                "rating": 5,
                "date": "2024-12-06",
                "review": "Our light magnetically sticks to our planter frame. I've set it to turn on when it gets dark and stay on. It adds so much atmosphere and lights up the space beautifully. I'm trying to find another place to put another one.",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/x1-4gl-ylc_mid.jpg"
                ],
                "reply": "Hey Gerard P, Thank you for sharing this stunning photo and your experience with the Solar Wall Light with Motion Sensor! 😊 It's amazing to see how it enhances your beautiful space with its warm glow and functionality. ✨ We're so glad it's become such a versatile addition to your setup, and we can't wait to hear where you decide to place the next one! 🤩"
              },
              {
                "name": "Tristan",
                "rating": 5,
                "date": "2024-11-12",
                "review": "This solar light exceeded my expectations! It looks sleek and modern on our patio, and the adjustable brightness settings are a huge plus. We love how it instantly lights up when we walk by.",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/szyUiMFin0_mid.jpg"
                ],
                "reply": "Hi Tristan, Wow, that's fantastic🤩! We love hearing how our products enhance your lifestyle. Our Solar Wall Light is designed to be both stylish and functional, and we're glad you appreciate the sleek design and adjustable brightness. Thank you so so much for your amazing review!✨"
              },
              {
                "name": "Tayla S.",
                "rating": 5,
                "date": "2024-11-12",
                "review": "I couldn't believe how easy it was to set up—everything I needed was included, and I had it mounted in minutes. The motion sensor picks up movement perfectly, and the light is super bright. It's a great addition to our garden! We got 3 of them!",
                "images": [
                  "https://images.loox.io/uploads/2025/2/27/yBns0fyM8X_mid.jpg"
                ],
                "reply": "Hi Tayla S, Thank you so much for sharing your experience! 🤩 We're so happy to hear how easy it was to set up and that it's lighting up your garden beautifully! The motion sensor and brightness really do make it a standout, and we love that you're enjoying it so much that you got three! 🌟 If you ever need anything else, we're just a message away. Happy glowing! ✨"
              },
              {
                "name": "Greg A.",
                "rating": 4,
                "date": "2026-01-11",
                "review": "Use as wall light near outdoor grill.  Motion detect works great.  Provides decent illumination.  Wish fixture was longer to provide more light.  Otherwise very happy with it",
                "color": "White",
                "reply": "Thank you for your kind words, Greg! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Rick H.",
                "rating": 4,
                "date": "2026-01-10",
                "review": "Needs to be more motion sensitive. You have to get to close to it before it kicks up the brightness.",
                "color": "Charcoal"
              },
              {
                "name": "Keith C.",
                "rating": 5,
                "date": "2026-01-08",
                "review": "Love the lights, got the motion and the lantern, such nice quality.",
                "color": "Charcoal"
              },
              {
                "name": "Kerry W.",
                "rating": 5,
                "date": "2026-01-03",
                "review": "A good looking solution that functions super well. There is a lot of crappy solar lights in the market and I had just returned one for not working as promised and then the ad appeared. The light is brilliant with a nice soft warm white and several modes of light strength. I will be buying more 100%.",
                "color": "Charcoal"
              },
              {
                "name": "Jin K.",
                "rating": 4,
                "date": "2025-12-31",
                "review": "Easy install and great sleek design!",
                "color": "Charcoal"
              },
              {
                "name": "Justin L.",
                "rating": 5,
                "date": "2025-12-28",
                "review": "The lights are exactly what we were looking for",
                "color": "Charcoal"
              },
              {
                "name": "Carolyn P.",
                "rating": 5,
                "date": "2025-12-26",
                "review": "Love our lights. Bright and stylish.",
                "color": "Charcoal"
              },
              {
                "name": "Monique L.",
                "rating": 5,
                "date": "2025-12-19",
                "review": "These lights look very premium and were super easy to install. I love having them by my gate entrance, they always magically turn on and they are the perfect amount of brightness.",
                "color": "Charcoal"
              },
              {
                "name": "Lori H.",
                "rating": 5,
                "date": "2025-12-18",
                "review": "A perfect solution",
                "color": "White"
              },
              {
                "name": "Goddard K.",
                "rating": 5,
                "date": "2025-12-16",
                "review": "Wonderful company to deal with very helpful love their solar lights return customer",
                "color": "Charcoal"
              },
              {
                "name": "Carolyn B.",
                "rating": 5,
                "date": "2025-12-15",
                "review": "These are fantastic lights. Easy to set up. Look great.",
                "color": "Charcoal"
              },
              {
                "name": "Misty S.",
                "rating": 4,
                "date": "2025-12-15",
                "review": "We appreciated the sleek design and really liked the size and look of the Lighthouse Solar Light. We did have to make a return due to the fact that the solar panel could not charge on our shaded front property.  So sad!",
                "color": "Charcoal"
              },
              {
                "name": "Matthew M.",
                "rating": 5,
                "date": "2025-12-11",
                "review": "LOOKS GREAT AND WORKS AS IT SHOULD",
                "color": "White"
              },
              {
                "name": "Marie G.",
                "rating": 5,
                "date": "2025-12-09",
                "review": "Only had them in use for a week but so far so good.  Stronger light than other solar lights I have used.",
                "color": "Charcoal"
              },
              {
                "name": "Vivienne J.",
                "rating": 5,
                "date": "2025-12-08",
                "review": "I wanted something good looking, not like the normal solar lights that are around. Very happy",
                "color": "Charcoal"
              },
              {
                "name": "Kylie P.",
                "rating": 5,
                "date": "2025-12-03",
                "review": "Great product. Excellent quality. Works perfectly.",
                "color": "Charcoal"
              },
              {
                "name": "Josuel L.",
                "rating": 5,
                "date": "2025-11-30",
                "review": "Soft lighiting and great product"
              },
              {
                "name": "Mark T.",
                "rating": 5,
                "date": "2025-11-28",
                "review": "Great product",
                "reply": "Thank you for the glowing review, Mark✨ We're so happy you love your lights."
              },
              {
                "name": "Kat V.",
                "rating": 5,
                "date": "2025-11-20",
                "review": "Lovely warm light, high quality, durable build and has all the modes and functions I was looking for. 10/10 stars!",
                "reply": "Wow, Kat! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Glenda D.",
                "rating": 5,
                "date": "2025-11-16",
                "review": "Very happy with the quality and service of your products.",
                "reply": "Thank you for your kind words, Glenda! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Timothy M.",
                "rating": 5,
                "date": "2025-11-13",
                "review": "Love it",
                "reply": "Thank you for your kind words, Timothy! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Pam A.",
                "rating": 5,
                "date": "2025-11-12",
                "review": "I don't like to shop online but took the risk and ordered 4 lights. I was sceptical but so far, they are awesome and so easy to install. Highly recommend.",
                "reply": "Thank you for the glowing review, Pam! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Aivar V.",
                "rating": 5,
                "date": "2025-11-05",
                "review": "The lights arrived well and look good. Unfortunately upon installing, one of the wall brackets broke upon tightening the screw (the screw cut right through the plastic). I don't think I applied too much pressure to it, especially as it was the last (5th light) to install, and the other ones worked well. I managed to use a small thin flat washer to increase the bearing a bit and fasten the bracket to the wall. Perhaps it would be worth supplying washers or increasing the strength of the bracket a bit to avoid such issues. Thank you.",
                "reply": "Thank you so much for taking the time to share your feedback, especially the detail about the wall bracket breaking upon tightening. We are happy the lights look good, but we sincerely apologize for that issue!💛 We truly appreciate your ingenuity in using a washer to fix it, and we will certainly pass your suggestion to supply washers or increase the bracket strength directly to our Product Team for review."
              },
              {
                "name": "A B.",
                "rating": 5,
                "date": "2025-10-21",
                "review": "Awesome",
                "reply": "Thank you for your glowing review!✨"
              },
              {
                "name": "Kim A.",
                "rating": 5,
                "date": "2025-10-11",
                "review": "Love them so mch waiting for another 2 lights! ❤️",
                "reply": "Thank you for the glowing review, Kim! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Wayne S.",
                "rating": 5,
                "date": "2025-10-09",
                "review": "Works really well , easy to install, awesome design",
                "reply": "Thank you for your kind words, Wayne! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Kim A.",
                "rating": 5,
                "date": "2025-10-08",
                "review": "Love them and got 2 more!"
              },
              {
                "name": "Michael R.",
                "rating": 5,
                "date": "2025-09-22",
                "review": "Advertised as promised very satisfied with my purchase",
                "reply": "Thank you so much for your kind words, Michael! Wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Joseph A.",
                "rating": 4,
                "date": "2025-09-08",
                "review": "Very good quality, easy to install.   They get all day sun for recharging but begin to fade early morning.    Still highly recommend.",
                "reply": "Thank you for the glowing review, Joseph! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Nancy S.",
                "rating": 5,
                "date": "2025-09-08",
                "review": "Love this lantern, as does everyone who sees it. I've sent your link to tons of people!",
                "reply": "This means so much to us! 💛 Thank you for your kind words and for recommending us—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Scott C.",
                "rating": 5,
                "date": "2025-09-04",
                "review": "Very good quality light.",
                "reply": "Thank you for the glowing review, Scott!💡We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Rob W.",
                "rating": 5,
                "date": "2025-08-27",
                "review": "I have them mounted on posts either side of garden gate, they light the post and highlight the area nicely",
                "reply": "Thank you for the glowing review, Rob! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Hannah T.",
                "rating": 5,
                "date": "2025-08-19",
                "review": "Look great",
                "reply": "Thank you for the glowing review, Hannah!✨"
              },
              {
                "name": "Denise H.",
                "rating": 5,
                "date": "2025-08-18",
                "review": "I was a bit nervous about buying something I'd just seen in an insta ad but these lights are actually so good!! They've made such a difference to our very dark back deck at night.",
                "reply": "Wow, Denise! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Jacob G.",
                "rating": 4,
                "date": "2025-08-15",
                "review": "Good functionality and nice warm light.",
                "reply": "Thank you for the glowing review, Jacob! 💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Michael S.",
                "rating": 5,
                "date": "2025-07-30",
                "review": "look good",
                "reply": "\"Thank you for the glowing review, Michael! 💡"
              },
              {
                "name": "Bruce M.",
                "rating": 5,
                "date": "2025-07-16",
                "review": "Perfect for our converted shipping container. No drilling, magnetic mount means you just slap it onto the side of the container. No leads means it looks nice and clean. Definitely buying more for our place.",
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Chris B.",
                "rating": 5,
                "date": "2025-07-11",
                "review": "High quality and exactly what I expected from the marketing.  Work very well, even in winter low-light conditions. Would recommend.",
                "reply": "Wow, Chris! This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Corey L.",
                "rating": 5,
                "date": "2025-06-30",
                "review": "We are in the middle of renovating the back yard, great addition and extremely happy with them. They work as advertised",
                "reply": "Thank you for the glowing review💡 We're so happy you love your lights. If you ever need more, we're always here to help!"
              },
              {
                "name": "Antonio M.",
                "rating": 5,
                "date": "2025-06-23",
                "review": "Easy installation, great ambience light, do not last through the night, but it may be that there is not sufficient sun to recharge the lights",
                "reply": "Thank you for your glowing review✨ Our solar panels are designed to absorb indirect sunlight more efficiently than other solar panel types, the battery will likely still charge, but it will do so more slowly and may not reach full capacity."
              },
              {
                "name": "Dean M.",
                "rating": 5,
                "date": "2025-06-23",
                "review": "Awesome!",
                "reply": "Thank you for the glowing review!✨"
              },
              {
                "name": "Charlotte J.",
                "rating": 5,
                "date": "2025-06-23",
                "review": "Fantastic quality, sleek and modern design, super quick and easy to install. Great lighting which has added fabulous sensor lighting to my driveway and walkway. The whole experience from ordering to receipt of the product was amazing. ( I loved meeting the team) The packaging it comes in was so professionally done, I was blown away from the minute I opened the first one. 🙌🙌",
                "reply": "Thank you for the glowing review We're so happy you love your lights! We'd love to see your setup—feel free to tag us @litehouse! 🌟 #LitehouseMoments"
              },
              {
                "name": "Amy R.",
                "rating": 5,
                "date": "2025-06-22",
                "review": "We bought this light for a very dark bin area at our block of flats. It saved us having to expense an electrician and works so well. There are 4 modes of brightness so you can choose how much you want to conserve to make the light last longer. Just brilliant and wonderful service from Litehouse.",
                "reply": "This means so much to us! 💛 Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights! ✨"
              },
              {
                "name": "Gideon B.",
                "rating": 5,
                "date": "2025-06-21",
                "review": "Looks and works very nice.",
                "reply": "Thank you for your kind words—wishing you many better, brighter moments with your Litehouse lights✨"
              },
              {
                "name": "Martli P.",
                "rating": 5,
                "date": "2025-05-05",
                "review": "You have impressed me more than I can express. From ordering on your website to almost instant shipping, products arrived in premium packaging and they just work! Not to mention that they are elegant and well thought out. Well done guys! I tried to call you to compliment you in person but I didn't get through. You make me proud!!!"
              },
              {
                "name": "Theunis B.",
                "rating": 5,
                "date": "2025-05-03",
                "review": "As advertised. It is a pity that there is not a model with the sun panel on the immediate panel next to the light itself."
              },
              {
                "name": "Julie B.",
                "rating": 5,
                "date": "2025-05-02",
                "review": "Added these wall lights to my Litehouse string lights at our pool area. Love the finished off look and ambient light they now give to this area."
              },
              {
                "name": "Rupert L.",
                "rating": 5,
                "date": "2025-04-24",
                "review": "Working great so far!"
              },
              {
                "name": "Pravesh A.",
                "rating": 4,
                "date": "2025-04-22",
                "review": "I love the light; I have not installed as yet. We still need to find the right spot with sufficient sun to capture the solar."
              },
              {
                "name": "Pedro C.",
                "rating": 5,
                "date": "2025-04-18",
                "review": "Will keep buying these products ."
              },
              {
                "name": "Bronwyn K.",
                "rating": 5,
                "date": "2025-04-18",
                "review": "Love this product! It works so well and makes such a difference in my garden."
              },
              {
                "name": "Dion O.",
                "rating": 5,
                "date": "2025-04-15",
                "review": "I will send a picture in a few days. Finished off our Koi pond and pool area perfectly. Warm regards Dion"
              },
              {
                "name": "Max S.",
                "rating": 5,
                "date": "2025-04-14",
                "review": "Great product!"
              },
              {
                "name": "Tasneem P.",
                "rating": 5,
                "date": "2025-04-13",
                "review": "Excellent product"
              },
              {
                "name": "Roxanne C.",
                "rating": 5,
                "date": "2025-04-12",
                "review": "Easy and effortless installation 👏🏻"
              },
              {
                "name": "Mare D.",
                "rating": 4,
                "date": "2025-04-11",
                "review": "Good quality light, with one exceptiom: the magnets keep falling out."
              },
              {
                "name": "Francois S.",
                "rating": 5,
                "date": "2025-04-10",
                "review": "Very well manufactured products. Excellent quality."
              },
              {
                "name": "Dustin B.",
                "rating": 5,
                "date": "2025-04-10",
                "review": "Easy delivery. Works well"
              },
              {
                "name": "Bronwen F.",
                "rating": 5,
                "date": "2025-04-07",
                "review": "Absolutely beautiful & classy look .Luv luv luv. Can't wait to get more"
              },
              {
                "name": "Des G.",
                "rating": 5,
                "date": "2025-04-07",
                "review": "Excellent product, good service and prompt delivery."
              },
              {
                "name": "Sean V.",
                "rating": 5,
                "date": "2025-04-05",
                "review": "I am absolutely delighted with the 4 wall mounted lights recently purchased, these lights are in a shaded area and still produce great light very happy. I am wanting more"
              },
              {
                "name": "Annemarie V.",
                "rating": 5,
                "date": "2025-04-03",
                "review": "Love it"
              },
              {
                "name": "Joanna O.",
                "rating": 5,
                "date": "2025-04-03",
                "review": "They do exactly as advertised. Strong light and look great."
              },
              {
                "name": "Shan B.",
                "rating": 5,
                "date": "2025-03-31",
                "review": "Looks great, it's ticking all the boxes so far, I'm holding thumbs it lasts over time."
              },
              {
                "name": "Paul S.",
                "rating": 5,
                "date": "2025-03-31",
                "review": "We put this up at our stables. It's was super easy to install and set up. After about 3 weeks in intense rain, it's still worked tremendously well and has an impressive battery life. It looks tidy and unobtrusive. The light is warm and not harsh. I think I'll get some more!"
              },
              {
                "name": "Luzuko Z.",
                "rating": 5,
                "date": "2025-03-31",
                "review": "Fantastic service and speedy delivery. Great product too"
              },
              {
                "name": "Aidan O.",
                "rating": 5,
                "date": "2025-03-29",
                "review": "Nice product !"
              },
              {
                "name": "Jane M.",
                "rating": 4,
                "date": "2025-03-27",
                "review": "Clean lines, lights the walkway as needed."
              },
              {
                "name": "Andre M.",
                "rating": 5,
                "date": "2025-03-26",
                "review": "Great lights, I like it."
              },
              {
                "name": "Jeffrey L.",
                "rating": 5,
                "date": "2025-03-24",
                "review": "Classy and easy to install ; if they last a couple of years at least then well happy !"
              },
              {
                "name": "Amanda D.",
                "rating": 5,
                "date": "2025-03-19",
                "review": "good"
              },
              {
                "name": "Francois V.",
                "rating": 5,
                "date": "2025-03-02",
                "review": "This is the first 2 of six lights I want to install, once they are all in I can write a review!",
                "reply": "Hi  Francois V. Thank you for your amazing rating! We know that you will fall in love 💞with your Solar Wall Light with Motion Sensor! You can leave a review once you have installed your lights! 🌟🌟"
              },
              {
                "name": "Heather W.",
                "rating": 5,
                "date": "2025-03-01",
                "review": "I just LOVE my Litehouse lights! It adds so much ambience to our outdoors!",
                "reply": "Hi Heather W. WOW💛! That looks amazing! Thank you for sharing your beautiful lit-up space. It is completely magical! 💞🥰"
              },
              {
                "name": "Theo L.",
                "rating": 5,
                "date": "2025-02-24",
                "review": "Great quality and effective!",
                "reply": "Hey Theo L. You read our minds! This is exactly what we aimed for! Thank you greatly for your amazing rating and review of our Solar Wall Light with Motion Sensor! Cheers to better, brighter, moments! 💛"
              },
              {
                "name": "Lindsay S.",
                "rating": 3,
                "date": "2025-02-24",
                "review": "The lights look lovely and neat, however, I find the setting instructions extremely difficult to understand"
              },
              {
                "name": "Michael R.",
                "rating": 5,
                "date": "2025-02-22",
                "review": "Nice product",
                "reply": "Hi Michael R. Thank you very much. We fully agree! ✨"
              },
              {
                "name": "Ingo G.",
                "rating": 5,
                "date": "2025-02-22",
                "review": "Great product, simple well designed, easy to install and operate. Wonderful warm light.",
                "reply": "Hi Ingo G. Thank you very much for your wonderful rating and review! It really means a lot to us that you took the time to share your wonderful experience with our product. The Solar wall lights is a definite winner! Thank you very much 🔥"
              },
              {
                "name": "Charlene B.",
                "rating": 5,
                "date": "2025-02-20",
                "review": "Sleek, classy, perfect colour and works like a charm. I ordered two but will get another one 😃",
                "reply": "Hi Charlene B. That's wonderful to hear! We're happy that you're happy with the sleek design, the color, and especially how well they work!  It's fantastic that you're planning to get another one – that's the best compliment we can receive.  Enjoy your perfectly lit space! 😃"
              },
              {
                "name": "Burgert S.",
                "rating": 5,
                "date": "2025-02-17",
                "review": "The lights seem to be well made, and are surprisingly bright. I've had a lot of disappointments with solar lights, but so far these exceed my expectations. Bonus that you can choose between dim and bright, and with PIR and without.",
                "reply": "Hi Burget S. That's fantastic! We're thrilled to hear that our Solar Wall Light with Motion Sensor has exceeded your expectation. We appreciate you highlighting the brightness and the flexibility of the dim/bright and PIR options – those are features we're particularly proud of.  Thank you for sharing your positive feedback! We hope you continue to enjoy them.✨"
              },
              {
                "name": "Dianne L.",
                "rating": 5,
                "date": "2025-02-14",
                "review": "Love these solar lights they are fantastic!",
                "reply": "Hey Dianne L. We're so glad you're loving your Solar Wall Light with Motion Sensor.  Thanks for sharing your feedback! We confident that it provides you with reliable light for a long time to come.🤗🔥💛"
              },
              {
                "name": "Catherine D.",
                "rating": 5,
                "date": "2025-02-11",
                "review": "Aesthetically beautiful and practical!",
                "reply": "Hey Dianne L. We're so glad you're loving your Solar Wall Light with Motion Sensor.  Thanks for sharing your feedback! We confident that it provides you with reliable light for a long time to come.🤗🔥💛"
              },
              {
                "name": "Edna V.",
                "rating": 5,
                "date": "2025-02-09",
                "review": "Love the string lights effortless to install and look beautiful.",
                "reply": "Hi Edna V. This really made our day! Thank you so very much for taking the time to share your experience with our Solar Wall Light with Motion Sensor✨. Cheers to many more Bright Moments!"
              },
              {
                "name": "Johan M.",
                "rating": 5,
                "date": "2025-01-20",
                "review": "The lights are such a delight, it is exactly what I wanted.",
                "reply": "Hey Johan M. That's so wonderful to hear! 😊  We put a lot of care into creating our lights, so it means a lot to us that you're happy with them. With Love, Litehouse!"
              },
              {
                "name": "Jill F.",
                "rating": 5,
                "date": "2025-01-20",
                "review": "Using presently in the back entertainment area, it lights up the entire braai area and it gives a laid back ambience.  Love it!",
                "reply": "Hi Jill F. That's amazing to hear! We're so happy to hear our lights are creating the perfect ambiance for your braai area! 🔥 Nothing beats that laid-back vibe with good lights, company, and good food, right? Enjoy!"
              },
              {
                "name": "Jill F.",
                "rating": 5,
                "date": "2025-01-20",
                "review": "Using presently in the back entertainment area, it lights up the entire braai area and it gives a laid back ambience. Love it!"
              },
              {
                "name": "Linda P.",
                "rating": 4,
                "date": "2025-01-09",
                "review": "Warm., welcoming light",
                "reply": "Hi Linda P. We're so glad to hear that the lights create such a warm and welcoming atmosphere! That's exactly the effect we strive for. We hope you continue to enjoy the enchanting glow they bring to your space."
              },
              {
                "name": "Annelize H.",
                "rating": 5,
                "date": "2024-12-10",
                "review": "Works much better than expected!  Great value for money.",
                "reply": "Hi Annelize H, Thank you so much for your fantastic feedback! We're thrilled to hear that the Solar Wall Light with Motion Sensor is working even better than expected and that you're happy with the value for money 🤩."
              },
              {
                "name": "Annelize H.",
                "rating": 5,
                "date": "2024-12-10",
                "review": "Works much better than expected! Great value for money."
              },
              {
                "name": "Susan D.",
                "rating": 5,
                "date": "2024-12-02",
                "review": "Amazing products with amazing service. Always going the xstra mile to get my order to me on time. Love every light I ordered.",
                "reply": "Hi Susan D, Thank you so much for your kind words! To hear you're loving your lights and that our service has met your expectations, really makes us happy. ✨ We always strive to go the extra mile for our customers! We hope your lights continue to brighten up your space beautifully! 🌟"
              },
              {
                "name": "Daan S.",
                "rating": 5,
                "date": "2024-11-30",
                "review": "Excellent service and great products!"
              },
              {
                "name": "Johan L.",
                "rating": 5,
                "date": "2024-11-24",
                "review": "Awesome product! Great looking"
              },
              {
                "name": "Khyra ..",
                "rating": 5,
                "date": "2024-11-12",
                "review": "Highly impressed with the quality! The light is sturdy and feels well-made. Installation was quick, and it gives off plenty of light without any wiring needed. We're already planning to buy a few more for the walkway!",
                "reply": "Hey Khyra! We're so glad you're happy with your Solar Wall Mount Light! Thank you for the kind words and for choosing our product.🥰 It's wonderful to hear that you're impressed with the quality and ease of installation of our Solar Wall Mount Light. We're committed to providing high-quality, hassle-free products. Thank you for your support.💛✨💛"
              }
            ]
        };
        
        // Function to format date from YYYY-MM-DD to M/D/YYYY
        function formatDate(dateStr) {
            if (!dateStr) return '';
            try {
                var date = new Date(dateStr);
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var year = date.getFullYear();
                return month + '/' + day + '/' + year;
            } catch (e) {
                return dateStr;
            }
        }

        // Function to escape HTML
        function escapeHtml(text) {
            if (!text) return '';
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }

        // Function to create a single review card HTML
        function createReviewCard(review, options) {
            // Map new field names to old ones for compatibility
            var rating = review.rating || 5;
            var reviewText = review.review || '';
            var reviewDate = formatDate(review.date) || review.date || '';
            var images = review.images || [];
            // Handle 'image' field (string, potentially comma-separated) for festoon reviews
            if (!images || images.length === 0) {
                if (review.image && typeof review.image === 'string') {
                    // Split by comma if multiple images
                    images = review.image.split(',').map(function(img) { return img.trim(); }).filter(function(img) { return img.length > 0; });
                }
            }
            var color = review.color || '';
            var reply = review.reply || '';
            
            // Options for data attributes and display style
            options = options || {};
            var dataIndex = options.dataIndex !== undefined ? ' data-review-index="' + options.dataIndex + '"' : '';
            var displayStyle = options.displayStyle || '';
            
            var starCount = Math.min(5, Math.max(0, parseInt(rating, 10) || 0));
            var starsHtml = '';
            for (var i = 0; i < starCount; i++) {
                starsHtml += '<span class="cro-ki7-ki1-star cro-ki7-ki1-star-filled"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><g clip-path="url(#clip0_8_64)"><path d="M14.3491 12.7522L18.2105 9.00459L12.8853 8.22235L10.5 3.4011L8.11475 8.22235L2.7895 9.00459L6.65 12.7522L5.72862 18.0652L10.5 15.554L15.2582 18.0652L14.3491 12.7522ZM21 8.24685C21 8.43234 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1885 20.3035 17.0161 20.5135 16.6714 20.5135C16.5112 20.5135 16.3433 20.4636 16.1665 20.363L10.5 17.3836L4.8335 20.3621C4.648 20.4627 4.48 20.5135 4.32863 20.5135C4.15188 20.5135 4.01975 20.4522 3.93138 20.3297C3.84024 20.1988 3.79361 20.042 3.79838 19.8826C3.79838 19.8318 3.80712 19.7478 3.82462 19.6297L4.90963 13.3201L0.315875 8.85234C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><g clip-path="url(#clip1_8_64)"><path d="M21 8.24685C21 8.43235 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1935 20.0428 17.1472 20.1996 17.0564 20.3306C17.0126 20.3909 16.9545 20.4394 16.8873 20.4715C16.82 20.5036 16.7458 20.5183 16.6714 20.5143C16.5112 20.5143 16.3433 20.4636 16.1665 20.3621L10.5 17.3853L4.8335 20.3638C4.648 20.4645 4.48 20.5152 4.32863 20.5152C4.15188 20.5152 4.01975 20.454 3.93138 20.3315C3.84024 20.2006 3.79361 20.0438 3.79838 19.8843C3.79838 19.8336 3.80712 19.7496 3.82462 19.6315L4.90963 13.3218L0.315875 8.8541C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><defs><clipPath id="clip0_8_64"><rect width="21" height="21" fill="white"/></clipPath><clipPath id="clip1_8_64"><rect width="21" height="21" fill="white"/></clipPath></defs></svg></span>';
            }
            
            var imageHtml = '';
            var hasImage = images && images.length > 0 && images[0];
            var imageCount = images && Array.isArray(images) ? images.length : 0;
            var imageCountOverlay = '';
            var videoUrl = review.video || '';
            var hasVideo = videoUrl && videoUrl.trim() !== '';
            
            // Check for video first - if video exists, show video instead of image
            if (hasVideo) {
                // Display video as iframe
                imageHtml = '<iframe src="' + escapeHtml(videoUrl) + '" class="cro-ki7-ki1-review-video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
            } else if (hasImage) {
                // Display image if no video
                imageHtml = '<img src="' + escapeHtml(images[0]) + '" alt="Litehouse Outdoor Solar Lanterns in use" class="cro-ki7-ki1-review-photo" />';
                
                // Add image count overlay if there are multiple images
                if (imageCount > 1) {
                    var additionalImages = imageCount - 1;
                    imageCountOverlay = '<div class="cro-ki7-ki1-review-image-count-overlay">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="cro-ki7-ki1-review-image-count-icon">' +
                        '<path d="m3.122 11.13 1.455-1.455 4.002 4.002 2.547-2.547 2.183 2.183V6.69H3.122v4.439Zm-.728-5.894h11.642a.727.727 0 0 1 .728.728v11.642a.727.727 0 0 1-.728.727H2.394a.727.727 0 0 1-.727-.727V5.964a.728.728 0 0 1 .727-.728Zm8.368 5.093a1.091 1.091 0 1 1 0-2.182 1.091 1.091 0 0 1 0 2.182Z"></path>' +
                        '<path d="m15.492 9.364 1.17 1.43.658-6.59L7.184 3.192l-.132 1.317H5.59l.219-2.186a.728.728 0 0 1 .796-.652l11.584 1.16a.728.728 0 0 1 .652.796L17.682 15.21a.728.728 0 0 1-.796.651l-1.394-.139V9.364Z"></path>' +
                        '</svg>' +
                        '<span class="cro-ki7-ki1-review-image-count-text">+' + additionalImages + '</span>' +
                        '</div>';
                }
            } else {
                // No video or image
                imageHtml = '<img src="" alt="Litehouse Outdoor Solar Lanterns in use" class="cro-ki7-ki1-review-photo" />';
            }
            
            // Determine image container class
            var imageContainerClass = 'cro-ki7-ki1-review-image';
            if (!hasImage && !hasVideo) {
                imageContainerClass += ' cro-ki7-ki1-review-noImage';
            }
            
            // Card class: add cro-ki7-ki1-review-cardText when no image or video
            var cardClass = 'cro-ki7-ki1-review-card' + (!hasImage && !hasVideo ? ' cro-ki7-ki1-review-cardText' : '');
            var cardAttributes = 'class="' + cardClass + '"' + dataIndex + (displayStyle ? ' ' + displayStyle : '');
            
            var itemTypeHtml = '';
            if (color && color.trim() !== '') {
                itemTypeHtml = '<div class="cro-ki7-ki1-review-item-type"><span class="cro-ki7-ki1-item-type-label">Item type:</span><span class="cro-ki7-ki1-item-type-value">' + escapeHtml(color) + '</span></div>';
            }
            
            var replyHtml = '';
            if (reply && reply.trim() !== '') {
                // Limit reply to 150 characters and add "See more" button if needed
                var fullReplyText = reply || '';
                var displayReplyText = fullReplyText;
                var replySeeMoreButtonHtml = '';
                var replyEllipsis = '';
                var isReplyTruncated = false;
                
                if (fullReplyText.length > 150) {
                    // Truncate to 150 characters, trim trailing space, ellipsis in link
                    displayReplyText = fullReplyText.substring(0, 150).trimEnd();
                    replyEllipsis = '';
                    isReplyTruncated = true;
                    replySeeMoreButtonHtml = '...<a href="#" class="cro-ki7-ki1-review-see-more">See more</a>';
                }
                
                // Escape HTML and replace newlines for display
                var escapedDisplayReplyText = escapeHtml(displayReplyText).replace(/\n/g, '<br>');
                // Also escape full reply text for data attribute (double escape for HTML attribute)
                var escapedFullReplyText = escapeHtml(fullReplyText).replace(/"/g, '&quot;');
                
                // Store full reply text in data attribute if truncated
                var fullReplyTextDataAttr = isReplyTruncated ? ' data-full-text="' + escapedFullReplyText + '"' : '';
                
                replyHtml = '<div class="cro-ki7-ki1-review-reply"><div class="cro-ki7-ki1-review-reply-header"><span class="cro-ki7-ki1-review-reply-author">Litehouse LLC replied:</span></div><div class="cro-ki7-ki1-review-reply-text"><p' + fullReplyTextDataAttr + '>' + escapedDisplayReplyText + replySeeMoreButtonHtml + '</p></div></div>';
            }
            
            // Limit text to 250 characters and add "See more" button if needed
            var fullText = reviewText || '';
            var displayText = fullText;
            var seeMoreButtonHtml = '';
            var ellipsis = '';
            var isTruncated = false;
            
            if (fullText.length > 250) {
                // Truncate to 250 characters, trim trailing space, ellipsis in link
                displayText = fullText.substring(0, 250).trimEnd();
                ellipsis = '';
                isTruncated = true;
                seeMoreButtonHtml = '...<a href="#" class="cro-ki7-ki1-review-see-more">See more</a>';
            }
            
            // Escape HTML and replace newlines for display
            var escapedDisplayText = escapeHtml(displayText).replace(/\n/g, '<br>');
            // Also escape full text for data attribute (double escape for HTML attribute)
            var escapedFullText = escapeHtml(fullText).replace(/"/g, '&quot;');
            
            // Store full text in data attribute if truncated
            var fullTextDataAttr = isTruncated ? ' data-full-text="' + escapedFullText + '"' : '';
            
            return '<div ' + cardAttributes + '>' +
                '<div class="cro-ki7-ki1-review-content">' +
                    '<div class="cro-ki7-ki1-review-header">' +
                        '<div class="cro-ki7-ki1-review-author">' +
                            '<span class="cro-ki7-ki1-review-name">' + escapeHtml(review.name) + '</span>' +
                            '<span class="cro-ki7-ki1-review-date">' + escapeHtml(reviewDate) + '</span>' +
                        '</div>' +
                        '<div class="cro-ki7-ki1-review-badges">' +
                            '<span class="cro-ki7-ki1-review-verifiedImg"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.18329 9.68329L10.2958 5.57079L9.47912 4.75412L6.18329 8.04995L4.52079 6.38745L3.70412 7.20412L6.18329 9.68329ZM6.99995 12.8333C6.21806 12.8383 5.44357 12.6818 4.72495 12.3736C4.03378 12.0799 3.40513 11.6568 2.87287 11.127C2.34787 10.602 1.93254 9.98487 1.62629 9.27495C1.31812 8.55634 1.16164 7.78184 1.16662 6.99995C1.16167 6.21807 1.31816 5.44358 1.62629 4.72495C1.91997 4.03378 2.34309 3.40513 2.87287 2.87287C3.39787 2.34787 4.01504 1.93254 4.72495 1.62629C5.44357 1.31812 6.21806 1.16164 6.99995 1.16662C7.78184 1.16167 8.55633 1.31816 9.27495 1.62629C9.96613 1.91995 10.5948 2.34308 11.127 2.87287C11.652 3.39787 12.068 4.01504 12.3736 4.72495C12.6818 5.44357 12.8383 6.21806 12.8333 6.99995C12.8383 7.78184 12.6818 8.55634 12.3736 9.27495C12.08 9.96613 11.6568 10.5948 11.127 11.127C10.602 11.652 9.98487 12.068 9.27495 12.3736C8.55634 12.6818 7.78184 12.8383 6.99995 12.8333Z" fill="black"/></svg></span>' +
                            '<span class="cro-ki7-ki1-review-verified">Verified</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cro-ki7-ki1-review-rating">' + starsHtml + '</div>' +
                    '<div class="cro-ki7-ki1-review-text">' +
                        '<p class="cro-ki7-ki1-review-content-text"' + fullTextDataAttr + '>' + escapedDisplayText + seeMoreButtonHtml + '</p>' +
                    '</div>' +
                    itemTypeHtml +
                    replyHtml +
                '</div>' +
                '<div class="' + imageContainerClass + '">' + imageHtml + imageCountOverlay + '</div>' +
            '</div>';
        }

        // Array of JSON file paths to check (optional - will fallback to hardcoded data if not found)
        var reviewJsonFiles = [
            'reviews1.json',
            'reviews2.json',
            'reviews3.json'
        ];
        
        // Cache for loaded JSON data that matches current URL
        var matchedReviewData = null;
        var reviewsLoaded = false;
        
        // Array of all review data objects to check (hardcoded fallback)
        var allReviewDataObjects = [];
        
        // Function to load reviews from JSON files and match by URL
        function loadReviewsFromJson() {
            if (reviewsLoaded) {
                return; // Already loaded
            }
            
            var currentUrl = window.location.href;
            var jsonFilesToLoad = reviewJsonFiles.length;
            var loadedCount = 0;
            var foundMatch = false;
            
            // First, check hardcoded data objects
            if (typeof reviewsData !== 'undefined' && reviewsData.product_url) {
                allReviewDataObjects.push(reviewsData);
            }
            if (typeof festoonReviewsData !== 'undefined' && festoonReviewsData.product_url) {
                allReviewDataObjects.push(festoonReviewsData);
            }
            if (typeof outdoorLanternReviewsData !== 'undefined' && outdoorLanternReviewsData.product_url) {
                allReviewDataObjects.push(outdoorLanternReviewsData);
            }
            
            // Check hardcoded data objects first
            for (var i = 0; i < allReviewDataObjects.length; i++) {
                var dataObj = allReviewDataObjects[i];
                if (dataObj.product_url && (currentUrl === dataObj.product_url || currentUrl.indexOf(dataObj.product_url) !== -1)) {
                    matchedReviewData = dataObj;
                    foundMatch = true;
                    break;
                }
            }
            
            // If no match found in hardcoded data, try loading JSON files
            if (!foundMatch && jsonFilesToLoad > 0) {
                reviewJsonFiles.forEach(function(jsonFile) {
                    fetch(jsonFile)
                        .then(function(response) {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(function(data) {
                            loadedCount++;
                            
                            // Check if this JSON's product_url matches current URL
                            if (!matchedReviewData && data.product_url) {
                                if (currentUrl === data.product_url || currentUrl.indexOf(data.product_url) !== -1) {
                                    matchedReviewData = data;
                                }
                            }
                            
                            // If all files loaded, mark as loaded
                            if (loadedCount === jsonFilesToLoad) {
                                reviewsLoaded = true;
                            }
                        })
                        .catch(function(error) {
                            console.error('Error loading ' + jsonFile + ':', error);
                            loadedCount++;
                            if (loadedCount === jsonFilesToLoad) {
                                reviewsLoaded = true;
                            }
                        });
                });
            } else {
                reviewsLoaded = true;
            }
        }
        
        // Start loading reviews on initialization
        loadReviewsFromJson();
        
        function getReviewsForCurrentPage() {
            var currentUrl = window.location.href;
            var reviews = [];
            
            // First, try to use matched review data (from JSON or hardcoded)
            if (matchedReviewData && matchedReviewData.reviews) {
                return matchedReviewData.reviews;
            }
            
            // Fallback: check hardcoded data objects if not already checked
            if (typeof reviewsData !== 'undefined' && reviewsData.product_url) {
                var productUrl = reviewsData.product_url;
                if (productUrl && (currentUrl === productUrl || currentUrl.indexOf(productUrl) !== -1)) {
                    return reviewsData.reviews || [];
                }
            }
            if (typeof festoonReviewsData !== 'undefined' && festoonReviewsData.product_url) {
                var productUrl = festoonReviewsData.product_url;
                if (productUrl && (currentUrl === productUrl || currentUrl.indexOf(productUrl) !== -1)) {
                    return festoonReviewsData.reviews || [];
                }
            }
            if (typeof outdoorLanternReviewsData !== 'undefined' && outdoorLanternReviewsData.product_url) {
                var productUrl = outdoorLanternReviewsData.product_url;
                if (productUrl && (currentUrl === productUrl || currentUrl.indexOf(productUrl) !== -1)) {
                    return outdoorLanternReviewsData.reviews || [];
                }
            }
            
            // Legacy fallback
            if (reviewsData && reviewsData.pdp_pages && reviewsData.pdp_pages.length > 0) {
                for (var i = 0; i < reviewsData.pdp_pages.length; i++) {
                    var pdpPage = reviewsData.pdp_pages[i];
                    if (pdpPage.pdp_url && (pdpPage.pdp_url === currentUrl || currentUrl.indexOf(pdpPage.pdp_url) !== -1)) {
                        reviews = pdpPage.reviews || [];
                        break;
                    }
                }
                if (reviews.length === 0 && reviewsData.pdp_pages[0].reviews) {
                    reviews = reviewsData.pdp_pages[0].reviews;
                }
            }
            return reviews;
        }

        function waitForVariable(varName, callback, delayInterval, delayTimeout) {
            var interval = setInterval(function () {
                var value = window[varName];
                if (typeof value !== "undefined" && value !== null) {
                    clearInterval(interval);
                    callback(value);
                }
            }, delayInterval);
            setTimeout(function () {
                clearInterval(interval);
            }, delayTimeout);
        }

        function generateReviewSummaryHTML(reviews, ratingFilter) {
            if (!reviews || reviews.length === 0) {
                return '';
            }
            ratingFilter = ratingFilter || null;

            // Calculate star rating breakdown
            var ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            var totalRating = 0;
            var totalReviews = reviews.length;

            for (var i = 0; i < reviews.length; i++) {
                var rating = parseInt(reviews[i].rating, 10) || 0;
                if (rating >= 1 && rating <= 5) {
                    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
                    totalRating += rating;
                }
            }

            // Calculate overall average rating
            // var averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
            // Initialize reviewData with placeholder - will be updated asynchronously
            var reviewData = '';
            
            // Get the rating value asynchronously and update the DOM element
            waitForVariable("MetafieldLooxRating", function (rating) {
                var reviewData = rating;
                console.log(reviewData);
                // Update the DOM element with the rating value
                var overallValueElement = document.querySelector('.cro-ki7-ki1-summary-overall-value');
                if (overallValueElement) {
                    overallValueElement.textContent = reviewData;
                }
            },
            100,
            10000
        );

            // Generate star rating rows (5 to 1)
            var starRowsHtml = '';
            for (var star = 5; star >= 1; star--) {
                var count = ratingCounts[star] || 0;
                var percentage = totalReviews > 0 ? (count / totalReviews * 100) : 0;
                var isActive = (ratingFilter !== null && parseInt(ratingFilter, 10) === star);
                var activeClass = isActive ? ' cro-ki7-ki1-summary-rating-row-active' : '';
                
                // Generate star icons (filled for rating, outline for remaining)
                var starsHtml = '';
                for (var s = 1; s <= 5; s++) {
                    // Use unique clip-path IDs for each star to avoid conflicts
                    var clipId0 = 'clip0_' + star + '_' + s + '_' + Math.random().toString(36).substr(2, 9);
                    var clipId1 = 'clip1_' + star + '_' + s + '_' + Math.random().toString(36).substr(2, 9);
                    
                    if (s <= star) {
                        // Filled star - use the exact SVG provided (black filled star)
                        var filledStarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><g clip-path="url(#' + clipId0 + ')"><path d="M14.3491 12.7522L18.2105 9.00459L12.8853 8.22235L10.5 3.4011L8.11475 8.22235L2.7895 9.00459L6.65 12.7522L5.72862 18.0652L10.5 15.554L15.2582 18.0652L14.3491 12.7522ZM21 8.24685C21 8.43234 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1885 20.3035 17.0161 20.5135 16.6714 20.5135C16.5112 20.5135 16.3433 20.4636 16.1665 20.363L10.5 17.3836L4.8335 20.3621C4.648 20.4627 4.48 20.5135 4.32863 20.5135C4.15188 20.5135 4.01975 20.4522 3.93138 20.3297C3.84024 20.1988 3.79361 20.042 3.79838 19.8826C3.79838 19.8318 3.80712 19.7478 3.82462 19.6297L4.90963 13.3201L0.315875 8.85234C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><g clip-path="url(#' + clipId1 + ')"><path d="M21 8.24685C21 8.43235 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1935 20.0428 17.1472 20.1996 17.0564 20.3306C17.0126 20.3909 16.9545 20.4394 16.8873 20.4715C16.82 20.5036 16.7458 20.5183 16.6714 20.5143C16.5112 20.5143 16.3433 20.4636 16.1665 20.3621L10.5 17.3853L4.8335 20.3638C4.648 20.4645 4.48 20.5152 4.32863 20.5152C4.15188 20.5152 4.01975 20.454 3.93138 20.3315C3.84024 20.2006 3.79361 20.0438 3.79838 19.8843C3.79838 19.8336 3.80712 19.7496 3.82462 19.6315L4.90963 13.3218L0.315875 8.8541C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><defs><clipPath id="' + clipId0 + '"><rect width="21" height="21" fill="white"/></clipPath><clipPath id="' + clipId1 + '"><rect width="21" height="21" fill="white"/></clipPath></defs></svg>';
                        starsHtml += '<span class="cro-ki7-ki1-summary-star cro-ki7-ki1-summary-star-filled">' + filledStarSvg + '</span>';
                    } else {
                        // Outline star - only show the stroke path
                        var outlineStarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><g clip-path="url(#' + clipId1 + ')"><path d="M10.5 0.923096C10.517 0.923096 10.5339 0.925635 10.5635 0.950439C10.601 0.981902 10.6582 1.05078 10.7217 1.18774L10.7266 1.19751L13.5654 6.9397L13.668 7.14478L13.8955 7.17798L20.2236 8.0979V8.09888C20.422 8.13052 20.5128 8.17908 20.5459 8.2063C20.5527 8.21189 20.5561 8.21608 20.5576 8.21802C20.559 8.21976 20.5596 8.22094 20.5596 8.22095C20.5598 8.22142 20.56 8.22323 20.5605 8.22583C20.5613 8.22943 20.5625 8.23661 20.5625 8.24731C20.5622 8.26148 20.5491 8.35637 20.3662 8.54028L15.7852 13.0071L15.6201 13.1672L15.6592 13.3938L16.7422 19.6946V19.6956C16.7461 19.722 16.751 19.7809 16.751 19.8831V19.8977C16.7528 19.96 16.736 20.0213 16.7021 20.0735C16.7014 20.0745 16.7004 20.0758 16.6992 20.0764C16.6979 20.077 16.6958 20.0775 16.6943 20.0774L16.6826 20.0764H16.6709C16.6057 20.0763 16.5127 20.0561 16.3848 19.9827L16.377 19.9788L16.3701 19.9749L10.7031 16.9983L10.5 16.8909L10.2969 16.9983L4.62988 19.9768L4.625 19.9797C4.47918 20.0588 4.38385 20.0773 4.3291 20.0774C4.30546 20.0774 4.29158 20.0742 4.28516 20.0725C4.25152 20.0205 4.23356 19.9598 4.23535 19.8977H4.23633V19.884C4.23638 19.8683 4.24048 19.8125 4.25781 19.6956L4.25684 19.6946L5.34082 13.3958L5.37988 13.1692L5.21484 13.0081L0.634766 8.55396C0.452175 8.35538 0.437861 8.25936 0.4375 8.24731C0.4375 8.23646 0.438738 8.2293 0.439453 8.22583C0.44014 8.22255 0.440415 8.22098 0.44043 8.22095C0.440547 8.22071 0.441362 8.2203 0.442383 8.21899C0.443879 8.21711 0.446977 8.21216 0.454102 8.2063C0.487449 8.17892 0.577913 8.12953 0.775391 8.0979L7.10449 7.17798L7.33203 7.14478L7.43457 6.9397L10.2734 1.19751L10.2783 1.18774C10.3418 1.05078 10.399 0.981902 10.4365 0.950439C10.4661 0.925635 10.483 0.923096 10.5 0.923096Z" stroke="black" stroke-width="0.875" fill="none"/></g><defs><clipPath id="' + clipId1 + '"><rect width="21" height="21" fill="white"/></clipPath></defs></svg>';
                        starsHtml += '<span class="cro-ki7-ki1-summary-star cro-ki7-ki1-summary-star-outline">' + outlineStarSvg + '</span>';
                    }
                }

                starRowsHtml += '<div class="cro-ki7-ki1-summary-rating-row' + activeClass + '" data-rating="' + star + '">' +
                    '<div class="cro-ki7-ki1-summary-rating-stars">' + starsHtml + '</div>' +
                    '<div class="cro-ki7-ki1-summary-rating-bar">' +
                        '<div class="cro-ki7-ki1-summary-rating-bar-fill" style="width: ' + percentage + '%;"></div>' +
                    '</div>' +
                    '<div class="cro-ki7-ki1-summary-rating-count">(' + count + ')</div>' +
                '</div>';
            }

            // Determine filter prompt text and make it clickable if filter is active
            var filterPromptText = 'Select a row below to filter reviews.';
            var filterPromptClass = 'cro-ki7-ki1-summary-filter-prompt';
            if (ratingFilter !== null && ratingFilter !== undefined) {
                filterPromptText = 'Reset';
                filterPromptClass += ' cro-ki7-ki1-summary-filter-prompt-reset';
            }
            
            return '<div class="cro-ki7-ki1-reviews-summary">' +
                '<h2 class="cro-ki7-ki1-reviews-summary-title">What Our Customers Say</h2>' +
                '<p class="cro-ki7-ki1-reviews-summary-tagline">Loved by over <strong>57,000+</strong> satisfied customers.</p>' +
                '<div class="cro-ki7-ki1-reviews-summary-content">' +
                    '<div class="cro-ki7-ki1-reviews-summary-left">' +
                        '<p class="' + filterPromptClass + '">' + filterPromptText + '</p>' +
                        '<div class="cro-ki7-ki1-summary-rating-rows">' + starRowsHtml + '</div>' +
                    '</div>' +
                    '<div class="cro-ki7-ki1-reviews-summary-right">' +
                        '<div class="cro-ki7-ki1-summary-overall">' +
                            '<div class="cro-ki7-ki1-summary-overall-label">Overall Rating</div>' +
                            '<div class="cro-ki7-ki1-summary-overall-value">' + reviewData + '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }

        // Returns the same filtered and sorted review list used for rendering cards (used by modal click)
        function getFilteredAndSortedReviews(sortOrder, ratingFilter) {
            sortOrder = sortOrder || 'featured';
            ratingFilter = ratingFilter || null;
            var reviews = getReviewsForCurrentPage();
            if (ratingFilter !== null && ratingFilter !== undefined) {
                reviews = reviews.filter(function(review) {
                    return parseInt(review.rating, 10) === parseInt(ratingFilter, 10);
                });
            }
            if (sortOrder === 'newest') {
                reviews = reviews.slice().sort(function (a, b) {
                    var tA = (a.date && !isNaN(new Date(a.date).getTime())) ? new Date(a.date).getTime() : 0;
                    var tB = (b.date && !isNaN(new Date(b.date).getTime())) ? new Date(b.date).getTime() : 0;
                    return tB - tA;
                });
            } else if (sortOrder === 'highest') {
                reviews = reviews.slice().sort(function (a, b) {
                    var rA = parseInt(a.rating, 10) || 0;
                    var rB = parseInt(b.rating, 10) || 0;
                    return rB - rA;
                });
            } else if (sortOrder === 'lowest') {
                reviews = reviews.slice().sort(function (a, b) {
                    var rA = parseInt(a.rating, 10) || 0;
                    var rB = parseInt(b.rating, 10) || 0;
                    return rA - rB;
                });
            }
            return reviews;
        }

        function generateReviewsHTML(sortOrder, ratingFilter) {
            sortOrder = sortOrder || 'featured';
            ratingFilter = ratingFilter || null;
            var reviews = getFilteredAndSortedReviews(sortOrder, ratingFilter);

            var reviewsCardsHtml = '';
            var reviewsToShow = Math.min(5, reviews.length); // Show first 5 reviews initially
            
            for (var j = 0; j < reviews.length; j++) {
                // Add data attribute to track review index and hide reviews beyond initial 5
                var displayStyle = j >= reviewsToShow ? 'style="display: none;"' : '';
                var options = {
                    dataIndex: j,
                    displayStyle: displayStyle
                };
                var reviewCard = createReviewCard(reviews[j], options);
                reviewsCardsHtml += reviewCard;
            }
            
            // Hide button if all reviews are already shown or if there are no reviews
            var buttonStyle = '';
            if (reviews.length <= reviewsToShow || reviews.length === 0) {
                buttonStyle = 'style="display: none;"';
            }
            
            // Total from JSON: same as reviews array length (used for header count)
            var totalFromJson = reviews.length;
            var reviewCountText = totalFromJson + ' Review' + (totalFromJson === 1 ? '' : 's');

            // Generate review summary section (use all reviews, not filtered)
            var allReviews = getReviewsForCurrentPage();
            var summaryHTML = generateReviewSummaryHTML(allReviews, ratingFilter);

            // Return HTML structure (even if empty, to maintain structure)
            var ratingFilterAttr = ratingFilter !== null ? ' data-rating-filter="' + ratingFilter + '"' : '';
            return '<div class="cro-ki7-ki1-reviews" data-total-reviews="' + totalFromJson + '" data-visible-reviews="' + reviewsToShow + '"' + ratingFilterAttr + '">' +
                '<div class="cro-ki7-ki1-reviews-wrapper">' +
                    summaryHTML +
                    '<div class="cro-ki7-ki1-reviews-header">' +
                        '<span class="cro-ki7-ki1-reviews-count">' + reviewCountText + '</span>' +
                        '<div class="cro-ki7-ki1-reviews-header-actions">' +
                            '<div class="cro-ki7-ki1-reviews-sort" data-current-sort="' + sortOrder + '">' +
                                '<span class="cro-ki7-ki1-reviews-sort-label">Sort</span>' +
                                '<div class="cro-ki7-ki1-reviews-sort-trigger-wrap">' +
                                    '<button type="button" class="cro-ki7-ki1-reviews-sort-btn" aria-label="Sort reviews" aria-expanded="false" aria-haspopup="true">' +
                                        '<svg class="cro-ki7-ki1-reviews-sort-icon" width="20" height="21" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M5.143 15a2.501 2.501 0 0 1 4.717 0h8.475v1.666H9.86a2.5 2.5 0 0 1-4.717 0H1.668V15h3.475Zm5-5.834a2.5 2.5 0 0 1 4.717 0h3.475v1.667H14.86a2.5 2.5 0 0 1-4.717 0H1.668V9.166h8.475Zm-5-5.833a2.5 2.5 0 0 1 4.717 0h8.475v1.666H9.86a2.5 2.5 0 0 1-4.717 0H1.668V3.333h3.475Zm2.358 1.666a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Zm5 5.834a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Zm-5 5.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z"></path></svg>' +
                                    '</button>' +
                                    '<div class="cro-ki7-ki1-reviews-sort-dropdown" role="menu" aria-label="Sort by">' +
                                        '<div class="cro-ki7-ki1-reviews-sort-dropdown-title">Sort by</div>' +
                                        (function () {
                                            var o = [{ v: "featured", l: "Featured" }, { v: "newest", l: "Newest" }, { v: "highest", l: "Highest Ratings" }, { v: "lowest", l: "Lowest Ratings" }];
                                            var h = '';
                                            var check = '<span class="cro-ki7-ki1-reviews-sort-option-check"><svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.364 9.28895L15.556 0.0959473L16.971 1.50995L6.364 12.1169L0 5.75295L1.414 4.33895L6.364 9.28895Z" fill="black"></path></svg></span>';
                                            for (var i = 0; i < o.length; i++) {
                                                h += '<button type="button" class="cro-ki7-ki1-reviews-sort-option' + (o[i].v === sortOrder ? ' is-selected' : '') + '" data-sort="' + o[i].v + '" role="menuitem">' + o[i].l + check + '</button>';
                                            }
                                            return h;
                                        })() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<button type="button" class="cro-ki7-ki1-reviews-write-btn">Write a review</button>' +
                        '</div>' +
                    '</div>' +
                    '<button type="button" class="cro-ki7-ki1-reviews-write-btnMobile">Write a review</button>' +
                    '<div class="cro-ki7-ki1-reviews-inner">' +
                        reviewsCardsHtml +
                    '</div>' +
                    '<button class="cro-ki7-ki1-show-more-reviews" ' + buttonStyle + '>Show more reviews</button>' +
                '</div>' +
            '</div>';
        }

        function reRenderReviewsWithSort(sortOrder, ratingFilter) {
            var container = document.querySelector('.cro-ki7-ki1-reviews');
            if (!container) return;
            var html = generateReviewsHTML(sortOrder, ratingFilter);
            container.outerHTML = html;
        }
        
        function init() {
            addClass("body", variation_name);

            // .shopify-block.shopify-app-block #looxReviewsFrame
            waitForElement(".shopify-block.shopify-app-block #looxReviews", function () {
                if (!document.querySelector(".cro-ki7-ki1-reviews")) {
                    var reviewsHTML = generateReviewsHTML();
                    insertHtml(".shopify-block.shopify-app-block #looxReviews", reviewsHTML, "beforebegin");
                }
            });
            
        }
        
        function croEventHandkler() {
            live(".cro-ki7-ki1-review-text a.cro-ki7-ki1-review-see-more", "click", function (e) {
                e.preventDefault();
                var reviewTextContainer = this.closest('.cro-ki7-ki1-review-text');
                if (reviewTextContainer) {
                    var paragraph = reviewTextContainer.querySelector('p.cro-ki7-ki1-review-content-text');
                    if (paragraph) {
                        var fullText = paragraph.getAttribute('data-full-text');
                        if (fullText) {
                            // Unescape HTML entities for data attribute
                            var tempDiv = document.createElement('div');
                            tempDiv.innerHTML = fullText;
                            fullText = tempDiv.textContent || tempDiv.innerText || '';
                            
                            var isExpanded = paragraph.classList.contains('cro-ki7-ki1-review-expanded');
                            
                            // Add fade-out class for smooth transition
                            paragraph.classList.add('cro-ki7-ki1-review-transitioning');
                            
                            // After fade-out, change content and fade back in
                            setTimeout(function() {
                                if (isExpanded) {
                                    // Collapse: show truncated text (250 chars, no trailing space, ellipsis in link)
                                    var truncatedText = fullText.length > 250 ? fullText.substring(0, 250).trimEnd() : fullText;
                                    var escapedTruncated = escapeHtml(truncatedText).replace(/\n/g, '<br>');
                                    paragraph.innerHTML = escapedTruncated + (fullText.length > 250 ? '...<a href="#" class="cro-ki7-ki1-review-see-more">See more</a>' : '');
                                    paragraph.classList.remove('cro-ki7-ki1-review-expanded');
                                } else {
                                    // Expand: show full text + button
                                    var escapedFull = escapeHtml(fullText).replace(/\n/g, '<br>');
                                    paragraph.innerHTML = escapedFull + '<a href="#" class="cro-ki7-ki1-review-see-more">See less</a>';
                                    paragraph.classList.add('cro-ki7-ki1-review-expanded');
                                }
                                
                                // Restore data attribute for future toggles
                                var escapedFullTextAttr = escapeHtml(fullText).replace(/"/g, '&quot;');
                                paragraph.setAttribute('data-full-text', escapedFullTextAttr);
                                
                                // Fade back in
                                setTimeout(function() {
                                    paragraph.classList.remove('cro-ki7-ki1-review-transitioning');
                                }, 10);
                            }, 200);
                        }
                    }
                }
            });

            live(".cro-ki7-ki1-review-reply-text a.cro-ki7-ki1-review-see-more", "click", function (e) {
                e.preventDefault();
                var reviewReplyTextContainer = this.closest('.cro-ki7-ki1-review-reply-text');
                if (reviewReplyTextContainer) {
                    var paragraph = reviewReplyTextContainer.querySelector('p');
                    if (paragraph) {
                        var fullText = paragraph.getAttribute('data-full-text');
                        if (fullText) {
                            // Unescape HTML entities for data attribute
                            var tempDiv = document.createElement('div');
                            tempDiv.innerHTML = fullText;
                            fullText = tempDiv.textContent || tempDiv.innerText || '';
                            
                            var isExpanded = paragraph.classList.contains('cro-ki7-ki1-review-reply-expanded');
                            
                            // Add fade-out class for smooth transition
                            paragraph.classList.add('cro-ki7-ki1-review-transitioning');
                            
                            // After fade-out, change content and fade back in
                            setTimeout(function() {
                                if (isExpanded) {
                                    // Collapse: show truncated text (no trailing space, ellipsis in link)
                                    var truncatedReplyText = fullText.substring(0, 150).trimEnd();
                                    var escapedTruncated = escapeHtml(truncatedReplyText).replace(/\n/g, '<br>');
                                    paragraph.innerHTML = escapedTruncated + '...<a href="#" class="cro-ki7-ki1-review-see-more">See more</a>';
                                    paragraph.classList.remove('cro-ki7-ki1-review-reply-expanded');
                                } else {
                                    // Expand: show full text + button
                                    var escapedFull = escapeHtml(fullText).replace(/\n/g, '<br>');
                                    paragraph.innerHTML = escapedFull + '<a href="#" class="cro-ki7-ki1-review-see-more">See less</a>';
                                    paragraph.classList.add('cro-ki7-ki1-review-reply-expanded');
                                }
                                
                                // Restore data attribute for future toggles
                                var escapedFullTextAttr = escapeHtml(fullText).replace(/"/g, '&quot;');
                                paragraph.setAttribute('data-full-text', escapedFullTextAttr);
                                
                                // Fade back in
                                setTimeout(function() {
                                    paragraph.classList.remove('cro-ki7-ki1-review-transitioning');
                                }, 10);
                            }, 200);
                        }
                    }
                }
            });

            live(".cro-ki7-ki1-reviews-sort-btn", "click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var sortBlock = this.closest('.cro-ki7-ki1-reviews-sort');
                if (!sortBlock) return;
                var isOpen = sortBlock.classList.contains('is-open');
                var dropdown = sortBlock.querySelector('.cro-ki7-ki1-reviews-sort-dropdown');
                var btn = sortBlock.querySelector('.cro-ki7-ki1-reviews-sort-btn');
                if (isOpen) {
                    sortBlock.classList.remove('is-open');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                } else {
                    sortBlock.classList.add('is-open');
                    if (btn) btn.setAttribute('aria-expanded', 'true');
                }
            });

            live(".cro-ki7-ki1-reviews-sort-option", "click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var sortValue = this.getAttribute('data-sort') || 'featured';
                // Get current rating filter from container
                var container = document.querySelector('.cro-ki7-ki1-reviews');
                var currentRatingFilter = container ? container.getAttribute('data-rating-filter') : null;
                reRenderReviewsWithSort(sortValue, currentRatingFilter);
            });

            live(".cro-ki7-ki1-summary-rating-row", "click", function (e) {
                e.preventDefault();
                var rating = this.getAttribute('data-rating');
                if (!rating) return;
                
                // Get current sort order
                var sortBlock = document.querySelector('.cro-ki7-ki1-reviews-sort');
                var currentSort = sortBlock ? (sortBlock.getAttribute('data-current-sort') || 'featured') : 'featured';
                
                // Toggle filter: if same rating clicked, remove filter
                var container = document.querySelector('.cro-ki7-ki1-reviews');
                var currentFilter = container ? container.getAttribute('data-rating-filter') : null;
                var newFilter = (currentFilter === rating) ? null : rating;
                
                reRenderReviewsWithSort(currentSort, newFilter);
            });

            live(".cro-ki7-ki1-summary-filter-prompt-reset", "click", function (e) {
                e.preventDefault();
                
                // Get current sort order
                var sortBlock = document.querySelector('.cro-ki7-ki1-reviews-sort');
                var currentSort = sortBlock ? (sortBlock.getAttribute('data-current-sort') || 'featured') : 'featured';
                
                // Clear filter by passing null
                reRenderReviewsWithSort(currentSort, null);
            });

            document.addEventListener('click', function (e) {
                if (e.target.closest('.cro-ki7-ki1-reviews-sort')) return;
                var openSort = document.querySelector('.cro-ki7-ki1-reviews-sort.is-open');
                if (openSort) {
                    openSort.classList.remove('is-open');
                    var b = openSort.querySelector('.cro-ki7-ki1-reviews-sort-btn');
                    if (b) b.setAttribute('aria-expanded', 'false');
                }
            });

            live(".cro-ki7-ki1-show-more-reviews", "click", function (e) {
                e.preventDefault();
                var reviewsContainer = this.closest('.cro-ki7-ki1-reviews');
                if (!reviewsContainer) return;
                
                var totalReviews = parseInt(reviewsContainer.getAttribute('data-total-reviews')) || 0;
                var visibleReviews = parseInt(reviewsContainer.getAttribute('data-visible-reviews')) || 5;
                var reviewsToShow = Math.min(visibleReviews + 5, totalReviews);
                
                // Show next 5 reviews
                var reviewCards = reviewsContainer.querySelectorAll('.cro-ki7-ki1-review-card[data-review-index]');
                for (var i = visibleReviews; i < reviewsToShow; i++) {
                    var card = reviewsContainer.querySelector('.cro-ki7-ki1-review-card[data-review-index="' + i + '"]');
                    if (card) {
                        card.style.display = '';
                    }
                }
                
                // Update visible reviews count
                reviewsContainer.setAttribute('data-visible-reviews', reviewsToShow);
                
                // Hide button if all reviews are now visible
                if (reviewsToShow >= totalReviews) {
                    this.style.display = 'none';
                }
            });

            // Review Modal Functionality
            function createReviewModalHTML(review) {
                var rating = review.rating || 5;
                var reviewText = review.review || '';
                var reviewDate = formatDate(review.date) || review.date || '';
                var images = review.images || [];
                var videoUrl = review.video || '';
                var color = review.color || '';
                var name = review.name || '';
                var reply = review.reply || '';

                // Handle 'image' field (string, potentially comma-separated) for festoon reviews
                if (!images || images.length === 0) {
                    if (review.image && typeof review.image === 'string') {
                        images = review.image.split(',').map(function(img) { return img.trim(); }).filter(function(img) { return img.length > 0; });
                    }
                }

                // Check if review has media (images or video)
                var hasImages = images && images.length > 0;
                var hasVideo = videoUrl && videoUrl.trim() !== '';
                var hasMedia = hasImages || hasVideo;

                // Generate stars
                var starCount = Math.min(5, Math.max(0, parseInt(rating, 10) || 0));
                var starsHtml = '';
                for (var i = 0; i < starCount; i++) {
                    starsHtml += '<span class="cro-ki7-ki1-star cro-ki7-ki1-star-filled"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><g clip-path="url(#clip0_8_64)"><path d="M14.3491 12.7522L18.2105 9.00459L12.8853 8.22235L10.5 3.4011L8.11475 8.22235L2.7895 9.00459L6.65 12.7522L5.72862 18.0652L10.5 15.554L15.2582 18.0652L14.3491 12.7522ZM21 8.24685C21 8.43234 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1885 20.3035 17.0161 20.5135 16.6714 20.5135C16.5112 20.5135 16.3433 20.4636 16.1665 20.363L10.5 17.3836L4.8335 20.3621C4.648 20.4627 4.48 20.5135 4.32863 20.5135C4.15188 20.5135 4.01975 20.4522 3.93138 20.3297C3.84024 20.1988 3.79361 20.042 3.79838 19.8826C3.79838 19.8318 3.80712 19.7478 3.82462 19.6297L4.90963 13.3201L0.315875 8.85234C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><g clip-path="url(#clip1_8_64)"><path d="M21 8.24685C21 8.43235 20.8906 8.63447 20.6719 8.85322L16.0904 13.3201L17.1754 19.6306C17.1841 19.6892 17.1885 19.7741 17.1885 19.8835C17.1935 20.0428 17.1472 20.1996 17.0564 20.3306C17.0126 20.3909 16.9545 20.4394 16.8873 20.4715C16.82 20.5036 16.7458 20.5183 16.6714 20.5143C16.5112 20.5143 16.3433 20.4636 16.1665 20.3621L10.5 17.3853L4.8335 20.3638C4.648 20.4645 4.48 20.5152 4.32863 20.5152C4.15188 20.5152 4.01975 20.454 3.93138 20.3315C3.84024 20.2006 3.79361 20.0438 3.79838 19.8843C3.79838 19.8336 3.80712 19.7496 3.82462 19.6315L4.90963 13.3218L0.315875 8.8541C0.105 8.62572 0 8.42447 0 8.24685C0 7.93622 0.23625 7.74197 0.707 7.66672L7.042 6.74535L9.88138 1.0036C10.0415 0.657971 10.2471 0.485596 10.5 0.485596C10.7529 0.485596 10.9585 0.657971 11.1186 1.0036L13.958 6.74535L20.293 7.66672C20.7646 7.74197 21 7.93622 21 8.24685Z" fill="black"/></g><defs><clipPath id="clip0_8_64"><rect width="21" height="21" fill="white"/></clipPath><clipPath id="clip1_8_64"><rect width="21" height="21" fill="white"/></clipPath></defs></svg></span>';
                }

                // Generate image gallery (only if has media)
                var galleryHtml = '';
                if (hasMedia) {
                    var mainImageHtml = '';
                    var thumbnailsHtml = '';
                    var navButtonsHtml = '';

                    if (hasVideo) {
                        // Display video
                        mainImageHtml = '<iframe src="' + escapeHtml(videoUrl) + '" class="cro-ki7-ki1-review-modal-video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                    } else if (hasImages) {
                        // Main image
                        mainImageHtml = '<img src="' + escapeHtml(images[0]) + '" alt="Review image" class="cro-ki7-ki1-review-modal-main-img" />';
                        
                        // Navigation buttons (only if more than 1 image)
                        if (images.length > 1) {
                            navButtonsHtml = '<button type="button" class="cro-ki7-ki1-review-modal-nav cro-ki7-ki1-review-modal-nav-prev" aria-label="Previous image">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                                '</button>' +
                                '<button type="button" class="cro-ki7-ki1-review-modal-nav cro-ki7-ki1-review-modal-nav-next" aria-label="Next image">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                                '</button>';
                        }

                        // Thumbnails
                        for (var j = 0; j < images.length; j++) {
                            var activeClass = j === 0 ? ' is-active' : '';
                            thumbnailsHtml += '<div class="cro-ki7-ki1-review-modal-thumbnail' + activeClass + '" data-image-index="' + j + '">' +
                                '<img src="' + escapeHtml(images[j]) + '" alt="Thumbnail ' + (j + 1) + '" />' +
                                '</div>';
                        }
                    }

                    galleryHtml = '<div class="cro-ki7-ki1-review-modal-gallery">' +
                        '<div class="cro-ki7-ki1-review-modal-main-image">' +
                            mainImageHtml +
                            navButtonsHtml +
                        '</div>' +
                        (hasImages && images.length > 1 ? '<div class="cro-ki7-ki1-review-modal-thumbnails">' + thumbnailsHtml + '</div>' : '') +
                    '</div>';
                }

                // Format review text (replace newlines with <br>)
                var formattedReviewText = escapeHtml(reviewText).replace(/\n/g, '<br>');

                // Item type HTML
                var itemTypeHtml = '';
                if (color && color.trim() !== '') {
                    itemTypeHtml = '<div class="cro-ki7-ki1-review-modal-item-type">' +
                        '<span class="cro-ki7-ki1-review-modal-item-type-label">Item type:</span>' +
                        '<span class="cro-ki7-ki1-review-modal-item-type-value">' + escapeHtml(color) + '</span>' +
                        '</div>';
                }

                // Reply HTML
                var replyHtml = '';
                if (reply && reply.trim() !== '') {
                    var formattedReplyText = escapeHtml(reply).replace(/\n/g, '<br>');
                    replyHtml = '<div class="cro-ki7-ki1-review-modal-reply">' +
                        '<div class="cro-ki7-ki1-review-modal-reply-header">' +
                            '<span class="cro-ki7-ki1-review-modal-reply-author">Litehouse LLC replied:</span>' +
                        '</div>' +
                        '<div class="cro-ki7-ki1-review-modal-reply-text">' + formattedReplyText + '</div>' +
                    '</div>';
                }

                // Add class to modal if no media
                var modalClass = 'cro-ki7-ki1-review-modal' + (hasMedia ? '' : ' cro-ki7-ki1-review-modal-no-media');

                return '<div class="cro-ki7-ki1-review-modal-overlay">' +
                    '<div class="' + modalClass + '">' +
                        '<button type="button" class="cro-ki7-ki1-review-modal-close" aria-label="Close modal">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                        '</button>' +
                        galleryHtml +
                        '<div class="cro-ki7-ki1-review-modal-content">' +
                            '<div class="cro-ki7-ki1-review-modal-header">' +
                                '<div class="cro-ki7-ki1-review-modal-name">' + escapeHtml(name) + '</div>' +
                                '<div class="cro-ki7-ki1-review-modal-rating-badges">' +
                                    '<div class="cro-ki7-ki1-review-modal-rating">' + starsHtml + '</div>' +
                                    '<div class="cro-ki7-ki1-review-modal-badges">' +
                                        '<span class="cro-ki7-ki1-review-modal-verified">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.18329 9.68329L10.2958 5.57079L9.47912 4.75412L6.18329 8.04995L4.52079 6.38745L3.70412 7.20412L6.18329 9.68329ZM6.99995 12.8333C6.21806 12.8383 5.44357 12.6818 4.72495 12.3736C4.03378 12.0799 3.40513 11.6568 2.87287 11.127C2.34787 10.602 1.93254 9.98487 1.62629 9.27495C1.31812 8.55634 1.16164 7.78184 1.16662 6.99995C1.16167 6.21807 1.31816 5.44358 1.62629 4.72495C1.91997 4.03378 2.34309 3.40513 2.87287 2.87287C3.39787 2.34787 4.01504 1.93254 4.72495 1.62629C5.44357 1.31812 6.21806 1.16164 6.99995 1.16662C7.78184 1.16167 8.55633 1.31816 9.27495 1.62629C9.96613 1.91995 10.5948 2.34308 11.127 2.87287C11.652 3.39787 12.068 4.01504 12.3736 4.72495C12.6818 5.44357 12.8383 6.21806 12.8333 6.99995C12.8383 7.78184 12.6818 8.55634 12.3736 9.27495C12.08 9.96613 11.6568 10.5948 11.127 11.127C10.602 11.652 9.98487 12.068 9.27495 12.3736C8.55634 12.6818 7.78184 12.8383 6.99995 12.8333Z" fill="black"/></svg>' +
                                            '<span>Verified</span>' +
                                        '</span>' +
                                        '<span class="cro-ki7-ki1-review-modal-date">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" style="width: 14px; height: 14px;"><path d="M11.0833 2.33333H10.5V1.75C10.5 1.475 10.275 1.25 10 1.25C9.725 1.25 9.5 1.475 9.5 1.75V2.33333H4.5V1.75C4.5 1.475 4.275 1.25 4 1.25C3.725 1.25 3.5 1.475 3.5 1.75V2.33333H2.91667C2.04583 2.33333 1.33333 3.04583 1.33333 3.91667V11.0833C1.33333 11.9542 2.04583 12.6667 2.91667 12.6667H11.0833C11.9542 12.6667 12.6667 11.9542 12.6667 11.0833V3.91667C12.6667 3.04583 11.9542 2.33333 11.0833 2.33333ZM11.0833 11.0833H2.91667V5.83333H11.0833V11.0833Z" fill="currentColor"/></svg>' +
                                            escapeHtml(reviewDate) +
                                        '</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="cro-ki7-ki1-review-modal-text">' + formattedReviewText + '</div>' +
                            itemTypeHtml +
                            replyHtml +
                        '</div>' +
                    '</div>' +
                '</div>';
            }

            function openReviewModal(review) {
                // Remove existing modal if any
                var existingModal = document.querySelector('.cro-ki7-ki1-review-modal-overlay');
                if (existingModal) {
                    existingModal.remove();
                }

                // Create and insert modal
                var modalHTML = createReviewModalHTML(review);
                document.body.insertAdjacentHTML('beforeend', modalHTML);

                var modalOverlay = document.querySelector('.cro-ki7-ki1-review-modal-overlay');
                if (!modalOverlay) return;

                // Store review data in modal for navigation (only if has images, not video)
                var images = review.images || [];
                var videoUrl = review.video || '';
                var hasVideo = videoUrl && videoUrl.trim() !== '';
                
                // Only process images if no video
                if (!hasVideo) {
                    if (review.image && typeof review.image === 'string' && (!images || images.length === 0)) {
                        images = review.image.split(',').map(function(img) { return img.trim(); }).filter(function(img) { return img.length > 0; });
                    }
                    modalOverlay.setAttribute('data-review-images', JSON.stringify(images));
                    modalOverlay.setAttribute('data-current-image-index', '0');
                } else {
                    modalOverlay.setAttribute('data-review-images', JSON.stringify([]));
                }

                // Open modal with animation
                setTimeout(function() {
                    modalOverlay.classList.add('is-open');
                }, 10);

                // Prevent body scroll
                document.body.style.overflow = 'hidden';

                // Setup event handlers (only pass images if no video)
                setupModalHandlers(modalOverlay, hasVideo ? [] : images);
            }

            function setupModalHandlers(modalOverlay, images) {
                var currentImageIndex = 0;
                var maxIndex = images.length - 1;

                // Close button
                var closeBtn = modalOverlay.querySelector('.cro-ki7-ki1-review-modal-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        closeReviewModal();
                    });
                }

                // Close on overlay click (but not on modal content)
                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === modalOverlay) {
                        closeReviewModal();
                    }
                });

                // Close on ESC key
                var escHandler = function(e) {
                    if (e.key === 'Escape' || e.keyCode === 27) {
                        closeReviewModal();
                        document.removeEventListener('keydown', escHandler);
                    }
                };
                document.addEventListener('keydown', escHandler);

                // Navigation buttons
                if (images.length > 1) {
                    var prevBtn = modalOverlay.querySelector('.cro-ki7-ki1-review-modal-nav-prev');
                    var nextBtn = modalOverlay.querySelector('.cro-ki7-ki1-review-modal-nav-next');

                    function updateImage(index) {
                        if (index < 0 || index > maxIndex) return;
                        currentImageIndex = index;
                        modalOverlay.setAttribute('data-current-image-index', index.toString());

                        // Update main image
                        var mainImg = modalOverlay.querySelector('.cro-ki7-ki1-review-modal-main-img');
                        if (mainImg) {
                            mainImg.src = images[index];
                        }

                        // Update thumbnails
                        var thumbnails = modalOverlay.querySelectorAll('.cro-ki7-ki1-review-modal-thumbnail');
                        thumbnails.forEach(function(thumb) {
                            var thumbIndex = parseInt(thumb.getAttribute('data-image-index'), 10);
                            if (thumbIndex === index) {
                                thumb.classList.add('is-active');
                            } else {
                                thumb.classList.remove('is-active');
                            }
                        });

                        // Update nav buttons
                        if (prevBtn) {
                            prevBtn.disabled = index === 0;
                        }
                        if (nextBtn) {
                            nextBtn.disabled = index === maxIndex;
                        }
                    }

                    if (prevBtn) {
                        prevBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            if (currentImageIndex > 0) {
                                updateImage(currentImageIndex - 1);
                            }
                        });
                    }

                    if (nextBtn) {
                        nextBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            if (currentImageIndex < maxIndex) {
                                updateImage(currentImageIndex + 1);
                            }
                        });
                    }

                    // Thumbnail clicks
                    var thumbnails = modalOverlay.querySelectorAll('.cro-ki7-ki1-review-modal-thumbnail');
                    thumbnails.forEach(function(thumb) {
                        thumb.addEventListener('click', function(e) {
                            e.stopPropagation();
                            var index = parseInt(thumb.getAttribute('data-image-index'), 10);
                            updateImage(index);
                        });
                    });

                    // Initialize nav buttons
                    updateImage(0);
                }
            }

            function closeReviewModal() {
                var modalOverlay = document.querySelector('.cro-ki7-ki1-review-modal-overlay');
                if (modalOverlay) {
                    modalOverlay.classList.remove('is-open');
                    setTimeout(function() {
                        modalOverlay.remove();
                        document.body.style.overflow = '';
                    }, 300);
                }
            }

            // Handle review card clicks (use same filtered/sorted list as rendered cards)
            live(".cro-ki7-ki1-review-card", "click", function (e) {
                // Don't open modal if clicking on "See more" link or other interactive elements
                if (e.target.closest('a.cro-ki7-ki1-review-see-more')) {
                    return;
                }

                var reviewCard = this;
                var reviewIndex = reviewCard.getAttribute('data-review-index');
                if (reviewIndex === null) return;

                var container = document.querySelector('.cro-ki7-ki1-reviews');
                var sortBlock = document.querySelector('.cro-ki7-ki1-reviews-sort');
                var currentSort = sortBlock ? (sortBlock.getAttribute('data-current-sort') || 'featured') : 'featured';
                var ratingFilter = container ? container.getAttribute('data-rating-filter') : null;
                if (ratingFilter === '') ratingFilter = null;

                var reviews = getFilteredAndSortedReviews(currentSort, ratingFilter);
                var index = parseInt(reviewIndex, 10);
                if (reviews[index]) {
                    openReviewModal(reviews[index]);
                }
            });


            live(".cro-ki7-ki1-reviews-write-btn", "click", function (e) {
                looxWrite();
            });

            live(".cro-ki7-ki1-reviews-write-btnMobile", "click", function (e) {
                looxWrite();
            });
        }
        
        if (!window.cro_t_ki7_ki14) {
            croEventHandkler();
            window.cro_t_ki7_ki14 = true;
        }
        
        waitForElement('.product .product-info', init);
    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();