(function () {
	try {
		var debug = 1;
		var variation_name = "CRP_ARC_PLP_Intro_Move";

		/* your plpContentMap remains exactly same */
		var plpContentMap = [
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows",
				"heading1": "Eyebrow Makeup & Products",
				"heading2": "Shop all Eyebrows",
				"subheading": "Redefine, fluff-up, fill-in and try out a longwearing tint with our all-time favourite brow products.",
				"hasSlider": false,
				"path": "/makeup/eyebrows"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/giftset",
				"heading1": "Brow Gels & Mascaras",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/giftset"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows/pencils",
				"heading1": "Eyebrow Pencils",
				"heading2": "Shop all Pencils",
				"subheading": "Define, fill in or redesign the shape of your brows with these high-precision pencils, for a natural and buildable look.",
				"hasSlider": false,
				"path": "/makeup/eyebrows/pencils"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows/powder",
				"heading1": "Eyebrow Powder",
				"heading2": "Shop all Powder",
				"subheading": "Browse our range of brow powders, in all shades, to help you fill in the gaps or recreate your desired shape.",
				"hasSlider": false,
				"path": "/makeup/eyebrows/powder"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows/brow-gels-mascaras",
				"heading1": "Brow Gels & Mascaras",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/eyebrows/brow-gels-mascaras"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows/powder-pomade",
				"heading1": "Powder & pomade",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/eyebrows/powder-pomade"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyebrows/brow-pencils",
				"heading1": "Eyebrow Pencils",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/eyebrows/brow-pencils"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/giftset",
				"heading1": "Makeup Gift Sets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/giftset"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips",
				"heading1": "Lip Makeup",
				"heading2": "Shop all Lips",
				"subheading": "Lipsticks, glosses, stains and balms - create a new look every time, with different forms, finishes and textures, in every colour imaginable.",
				"hasSlider": false,
				"path": "/makeup/lips"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lipstick",
				"heading1": "Lipstick",
				"heading2": "Shop all Lipstick",
				"subheading": "A makeup lovers' dream; we offer a wardrobe of sheer, glossy and matte-finish lipsticks in every shade imaginable.",
				"hasSlider": false,
				"path": "/makeup/lips/lipstick"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-gloss",
				"heading1": "Lip Gloss",
				"heading2": "Shop all Lip Gloss",
				"subheading": "A slick of high-shine lip gloss will make guaranteed impact. Worn on top of your favourite lipstick or on its own, have your pick of our range of highly-pigmented tints or super-reflective glosses.",
				"hasSlider": false,
				"path": "/makeup/lips/lip-gloss"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-liner",
				"heading1": "Lip Liner",
				"heading2": "Shop all Lip Liner",
				"subheading": "For clean definition or to fake a fuller lip shape or to simply ensure your lipstick stays on little longer, look no further than these handy lip liners.",
				"hasSlider": false,
				"path": "/makeup/lips/lip-liner"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-stain",
				"heading1": "Lip Stains",
				"heading2": "Shop all Lip Stains",
				"subheading": "Try a hint of sheer colour with a delivate stained effect, for guaranteed impact, that's bang on trend.",
				"hasSlider": false,
				"path": "/makeup/lips/lip-stain"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-balms",
				"heading1": "Lip Balms",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/lips/lip-balms"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-oil",
				"heading1": "Lip Oil",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/lips/lip-oil"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/lip-treatments",
				"heading1": "Lip Treatments & Care",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/lips/lip-treatments"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/lips/liquid-lipstick",
				"heading1": "Liquid Lipstick",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/lips/liquid-lipstick"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyelashes",
				"heading1": "False Eyelashes & Lash Products",
				"heading2": "Shop all Eyelashes",
				"subheading": "Set your lash goal and achieve it every time with our selection of mascaras. Whether you're looking to curl, add volume, lengthen or perhaps you're wanting to experiment with a pair of falsies, you won't find a wider selection anywhere else.",
				"hasSlider": false,
				"path": "/makeup/eyelashes"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyelashes/mascara",
				"heading1": "Mascara",
				"heading2": "Shop all Mascara",
				"subheading": "Volume, length, curl, or all three - what ever your lash goal, find your signature from bestselling brands like Benefit, Estée Lauder and Clinique.",
				"hasSlider": false,
				"path": "/makeup/eyelashes/mascara"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyelashes/false-eyelashes",
				"heading1": "False Eyelashes",
				"heading2": "Shop all False Eyelashes",
				"subheading": "Key to the most dramatic of eye looks, is a set of faux Bambi-esque lashes. P.S. Practice makes perfect!",
				"hasSlider": false,
				"path": "/makeup/eyelashes/false-eyelashes"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face",
				"heading1": "Face Makeup",
				"heading2": "",
				"subheading": "From blemish-banishing concealors to stay-in-place poweders, illuminating highlighters and complexion-enhancing foundations, we got the latest products from the best brands out there.",
				"hasSlider": false,
				"path": "/makeup/face"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/foundation",
				"heading1": "Foundation",
				"heading2": "Shop all Foundation",
				"subheading": "Find what's right for your complexion with full coverage shades, mattifying heroes, barely-there tints and more.",
				"hasSlider": false,
				"path": "/makeup/face/foundation"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/powder",
				"heading1": "Face Powder",
				"heading2": "Shop all Powder",
				"subheading": "Lock in your look or eliminate shine. Pressed or loose powders from your favourite brands will keep your makeup in place all day.",
				"hasSlider": false,
				"path": "/makeup/face/powder"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/concealer",
				"heading1": "Concealer",
				"heading2": "",
				"subheading": "Blur out or erase those pesky blemishes and under-eye circles in a flash, with your go-to concealer.",
				"hasSlider": false,
				"path": "/makeup/face/concealer"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/blush",
				"heading1": "Blush",
				"heading2": "Shop all Blush",
				"subheading": "Discover the pick-me-up powers of blush, in all shades, from bright apricot to brick reds.",
				"hasSlider": false,
				"path": "/makeup/face/blush"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/bronzer",
				"heading1": "Bronzer",
				"heading2": "Shop all Bronzer",
				"subheading": "That sun-kissed glow all year round is easy with clever use of bronzers in shimmer or matte finishes.",
				"hasSlider": false,
				"path": "/makeup/face/bronzer"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/contouring",
				"heading1": "Contouring Products",
				"heading2": "Shop all",
				"subheading": "Sculpted cheekbones and razor sharp jawlines made possible with the tricks of contouring. Choose between cream or powder formulas, or use together for maximum impact.",
				"hasSlider": false,
				"path": "/makeup/face/contouring"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/highlighter",
				"heading1": "Highlighter",
				"heading2": "Shop all Highlighter",
				"subheading": "There is no such thing as too much glow. Liquid and cream based illuminators will create a lit-from-within look and guarantee total radiance.",
				"hasSlider": false,
				"path": "/makeup/face/highlighter"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/tinted-moisturiser",
				"heading1": "Tinted Moisturiser",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/face/tinted-moisturiser"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/setting-finishing-sprays",
				"heading1": "Setting & Finishing Sprays",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/face/setting-finishing-sprays"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/face/face-primer",
				"heading1": "Face Primer",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/face/face-primer"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/nails",
				"heading1": "Nail Care & Polish",
				"heading2": "Shop all Nails",
				"subheading": "Cuticle care and DIY manicures made easy with salon-worthy brands.",
				"hasSlider": false,
				"path": "/makeup/nails"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/nails/nail-polish-colour",
				"heading1": "Nail Polish Colour",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/nails/nail-polish-colour"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes",
				"heading1": "Eye Makeup",
				"heading2": "Shop all Eyes",
				"subheading": "Discover all you need to create your signature eye look, from top-tier mascaras, stay-in-place liners and shadows in a rainbow of colours. Get the classic smokey eye or try the season's naturally glossy lid look - this is the time to get creative.",
				"hasSlider": false,
				"path": "/makeup/eyes"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes/eyeliner",
				"heading1": "Eyeliner",
				"heading2": "Shop all Eyeliner",
				"subheading": "Take your pick from our liquid, gel or pencil eyeliners to achieve perfect precision on all your graphic eye looks or your perfected wing.",
				"hasSlider": false,
				"path": "/makeup/eyes/eyeliner"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes/eye-shadow",
				"heading1": "Eyeshadow",
				"heading2": "Shop all Eye Shadow",
				"subheading": "From highly pigmented colours and sparkling metallics to delicate satin finishes, we have eye shadows in all shades and for all occasions.",
				"hasSlider": false,
				"path": "/makeup/eyes/eye-shadow"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes/eye-shadow-palettes",
				"heading1": "Eyeshadow Palettes",
				"heading2": "Shop all Eye Shadow Palettes",
				"subheading": "When one shade is not enough, our eyeshadow palettes provide a multitude of colour options to create show-stopping eye looks.",
				"hasSlider": false,
				"path": "/makeup/eyes/eye-shadow-palettes"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes/eye-primer",
				"heading1": "Eye Primer",
				"heading2": "Shop all Eye Primers",
				"subheading": "To create a perfect canvas, ensure maximum staying power and intensify pigment, apply eye primer before adding your shadows and liner.",
				"hasSlider": false,
				"path": "/makeup/eyes/eye-primer"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/eyes/eyeliner-pencils",
				"heading1": "Eyeliner Pencils",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/eyes/eyeliner-pencils"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/makeup-minis",
				"heading1": "Makeup Minis & Travel Size",
				"heading2": "Shop all Minis",
				"subheading": "Your favourite makeup products but in adorable, travel-friendly sizes for touch ups on the go.",
				"hasSlider": false,
				"path": "/makeup/makeup-minis"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/makeup-minis/makeup-minis",
				"heading1": "Makeup Minis",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/makeup-minis/makeup-minis"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance",
				"heading1": "Shop Fragrances & Perfumes Online",
				"heading2": "",
				"subheading": "Our boutique of fragrances from the world's top Fashion Houses, is your one-stop-shop for the perfect gift as well as your go-to destination for finding your personal favourite; whether it be a seasonal signature scent or an addition to your full fragrance wardrobe.",
				"hasSlider": true,
				"path": "/fragrance"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/home-fragrance",
				"heading1": "Home Fragrance",
				"heading2": "Shop all Fragrances",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/home-fragrance"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/home-fragrance/diffusers-oils-burners",
				"heading1": "Reed Diffusers, Fragrance Oils & Burners",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/home-fragrance/diffusers-oils-burners"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/home-fragrance/candles",
				"heading1": "Scented Candles & Home Fragrance Candles",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/home-fragrance/candles"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/women",
				"heading1": "Women's Fragrance",
				"heading2": "Shop all Women's Fragrance",
				"subheading": "Find your signture scent or start building your fragrance wardrobe with our selection of Eau de Parfums, Eau de Toilettes and Body Sprays from highly-coveted brands like GUCCI, Valentino, Burberry, DIOR and more.",
				"hasSlider": false,
				"path": "/fragrance/women"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/women/body-mist-spray",
				"heading1": "Women's Body Mist & Fragrance Spray",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/women/body-mist-spray"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/women/edt",
				"heading1": "Women's Eau de Toilette (EDT)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/women/edt"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/women/edp",
				"heading1": "Women's Eau de Parfum (EDP)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/women/edp"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/mini",
				"heading1": "",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/mini"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/men",
				"heading1": "Men's Fragrance",
				"heading2": "Shop all Men's Fragrance",
				"subheading": "Discover our carefully curated collection of luxury fragrances for men. Choose your Eau de Toilettes, Eau de Parfums and deodorants from your favourite brands such as Issey Miyake, Calvin Klein, DIOR and Hugo Boss.",
				"hasSlider": false,
				"path": "/fragrance/men"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/men/deo-anti-perspirant",
				"heading1": "Men's Deodorant & Anti-Perspirant",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/men/deo-anti-perspirant"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/men/edt",
				"heading1": "Men's Eau de Toilette (EDT)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/men/edt"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/men/edp",
				"heading1": "Men's Eau de Parfum (EDP)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/men/edp"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/unisex",
				"heading1": "Unisex Fragrance",
				"heading2": "Carefully considered blends of notes that smell good on everyone; a modern middle-ground between feminine and masculine elements from iconic brands like Calvin Klein and Memo.",
				"subheading": "Shop all Unisex Fragrance",
				"hasSlider": false,
				"path": "/fragrance/unisex"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/unisex/deo-anti-perspirant",
				"heading1": "Unisex Deodorant & Anti-Perspirant",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/unisex/deo-anti-perspirant"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/unisex/edt",
				"heading1": "Unisex Eau de Toilette (EDT)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/unisex/edt"
			},
			{
				"url": "https://www.arcstore.co.za/fragrance/unisex/edp",
				"heading1": "Unisex Eau de Parfum (EDP)",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/fragrance/unisex/edp"
			},
			{
				"url": "https://www.arcstore.co.za/skincare",
				"heading1": "Skincare",
				"heading2": "Shop all Skincare",
				"subheading": "The task is simple; spoil yourself with the world's most-coveted beauty skincare brands and products with celebrity status. From Shiseido, La Mer, and more. Our collection embodies a harmonious blend of nature's finest botanicals and cutting-edge technology, delivering transformative results that transcend mere skincare. Elevate your beauty routine to an art form, as each luxurious potion caresses your skin, leaving behind a luminous trail of rejuvenation and vitality.",
				"hasSlider": true,
				"path": "/skincare"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/new-in-skincare",
				"heading1": "New Skincare Products",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/new-in-skincare"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/sun-care",
				"heading1": "Sun Care",
				"heading2": "Shop all Sun Care",
				"subheading": "The most important part of a skincare routine is sun protection. Gels, creams, lotions and sprays - find which UVA-UVB-blocking options works best for your needs, to protect your skin all year round.",
				"hasSlider": false,
				"path": "/skincare/sun-care"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/sun-care/sun-protection",
				"heading1": "Sun Protection",
				"heading2": "Shop all Sun Protection",
				"subheading": "The most important part of a skincare routine is sun protection. Gels, creams, lotions and sprays - find which UVA-UVB-blocking options works best for your needs, to protect your skin all year round.",
				"hasSlider": false,
				"path": "/skincare/sun-care/sun-protection"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/sun-care/after-sun-care",
				"heading1": "After Sun Care Products",
				"heading2": "Shop all After Sun Care",
				"subheading": "Too much time in the sun? We've got you covered with all the cooling, after-sun products you'll need to nourish, soothe and restore your skin, protecting it it from further, long-term damage.",
				"hasSlider": false,
				"path": "/skincare/sun-care/after-sun-care"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/sun-care/sun-protection-face",
				"heading1": "Sun Protection for Face",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/sun-care/sun-protection-face"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/sun-care/sun-protection-body-lip",
				"heading1": "Sun Protection for Body & Lips",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/sun-care/sun-protection-body-lip"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/minis",
				"heading1": "Minis",
				"heading2": "Shop all Minis",
				"subheading": "For flawless, healthy skin everywhere you go, look to the these tried-and-tested skincare travel companions.",
				"hasSlider": false,
				"path": "/skincare/minis"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser",
				"heading1": "Face Cleansers",
				"heading2": "Shop all Cleansers",
				"subheading": "The first step in any skincare routine, cleansing remove bacteria, impurties and any makeup residue. Find your favourite from our selcetion of balms, creams and gels from brands like Dermalogica, Le Mer and ELEMIS.",
				"hasSlider": false,
				"path": "/skincare/cleanser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/oil-and-balm-cleanser",
				"heading1": "Oil and Balm Cleanser",
				"heading2": "Shop all Oil and Balm Cleansers",
				"subheading": "Look to oil and balm cleansers that comfortingly remove dirt and excess oil with out stripping skin of it's natural oils. These are perfect for those with sensitive skin.",
				"hasSlider": false,
				"path": "/skincare/cleanser/oil-and-balm-cleanser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/gel-and-foaming-cleanser",
				"heading1": "Gel & Foaming Face Cleansers",
				"heading2": "Shop all Gel and Foaming Cleansers",
				"subheading": "Remove dirt, oil and bacteria from the day by lathering up with gel and foaming formula. Your skin will love these that confidently clean and refresh.",
				"hasSlider": false,
				"path": "/skincare/cleanser/gel-and-foaming-cleanser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/milk-and-cream-cleanser",
				"heading1": "Milk and Cream Cleanser",
				"heading2": "Shop all Milk & Cream Cleansers",
				"subheading": "Ideal for dry and sensitive skin, look to milk and cream formulas that gently but effectively, cleanse without stripping the skin it of its natural oils.",
				"hasSlider": false,
				"path": "/skincare/cleanser/milk-and-cream-cleanser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/exfoliator-and-scrubs",
				"heading1": "Face Exfoliators & Scrubs",
				"heading2": "Shop all Exfoliators and Scrubs",
				"subheading": "Say good bye to uneven texture and dead skincells that leave your skin looking a little lacklustre. Pick from our range of the best chemical and physical exfoliating options that best suits your skin and your routine.",
				"hasSlider": false,
				"path": "/skincare/cleanser/exfoliator-and-scrubs"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/toner",
				"heading1": "Face Toners",
				"heading2": "Shop all Toners",
				"subheading": "No longer only made for those with oily skin, a toner is the post-cleanse step that ensures your skin is 100% clean and ready for what comes next. From soothing to refining, find a toner that's tailored for your skin needs.",
				"hasSlider": false,
				"path": "/skincare/cleanser/toner"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/cleanser/makeup-remover",
				"heading1": "Makeup Remover",
				"heading2": "Shop all Makeup Removers",
				"subheading": "It's never a good idea to sleep with your makeup still on (although it definitley happens to even the best of us). Discover our selection of makeup removers that dissolve and remove any leftover residue and impurities.",
				"hasSlider": false,
				"path": "/skincare/cleanser/makeup-remover"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks",
				"heading1": "Face Masks & Treatments",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks/eye-masks",
				"heading1": "Eye Masks",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks/eye-masks"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks/masks",
				"heading1": "Face Masks",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks/masks"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks/pimple-spot-masks",
				"heading1": "Pimple & Spot Treatment Masks",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks/pimple-spot-masks"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks/sheet-masks",
				"heading1": "Sheet Masks",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks/sheet-masks"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/masks/lip",
				"heading1": "Lip Masks",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/masks/lip"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/men's-grooming",
				"heading1": "Men's Grooming",
				"heading2": "Shop all Men's Grooming",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/men's-grooming"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser",
				"heading1": "Face Moisturisers",
				"heading2": "Shop all Moisturisers",
				"subheading": "The key to total skin health is hydration. No matter what your skin concern including senstivity, oiliness or dullness, complete your routine with one of these nourishing finds from Dermalogica, Clinique, Skin Creamery and more.",
				"hasSlider": false,
				"path": "/skincare/moisturiser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser/day-cream",
				"heading1": "Day Cream",
				"heading2": "Shop all Day Creams",
				"subheading": "Lock in the moisture and hydration your skin deserves. Discover these daily creams from favourite local and international brands like La Mer, Dermalogica and Skoon.",
				"hasSlider": false,
				"path": "/skincare/moisturiser/day-cream"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser/night-cream",
				"heading1": "Night Cream",
				"heading2": "Shop all Night Creams",
				"subheading": "Ensure your skin has a good night's rest too with night creams that hyrdate, nourish and work over time to assist the skin self-repair and regenerate.",
				"hasSlider": false,
				"path": "/skincare/moisturiser/night-cream"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser/face-oil",
				"heading1": "Face Oil",
				"heading2": "Shop all Face Oils",
				"subheading": "Transformative facial oils packed with ingredients that leave your skin looking and feeling hydrated, plumped up and glowing.",
				"hasSlider": false,
				"path": "/skincare/moisturiser/face-oil"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser/tinted-moisturiser",
				"heading1": "Tinted Moisturiser",
				"heading2": "Shop all Skin Prep",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/moisturiser/tinted-moisturiser"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/moisturiser/face-mists-essences",
				"heading1": "Face Mists & Essences",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/moisturiser/face-mists-essences"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/skin-giftsets",
				"heading1": "",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/skin-giftsets"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/skin-giftsets/moisturiser-giftsets",
				"heading1": "Moisturiser Gift Sets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/skin-giftsets/moisturiser-giftsets"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/skin-giftsets/treatment-serum-giftsets",
				"heading1": "Treatment & Serum Giftsets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/skin-giftsets/treatment-serum-giftsets"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/skin-giftsets/kits",
				"heading1": "Skincare Kits & Sets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/skin-giftsets/kits"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums",
				"heading1": "Face Treatments & Serums",
				"heading2": "Shop all Treatments and Serums",
				"subheading": "Jam-packed with hardworking, active ingredients, look to serums and treatments for visible results, it's one of the most important steps in any skincare routine, whether you're looking to brighten, firm, boost or soothe.",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/skin-giftsets/kits",
				"heading1": "Skincare Kits & Sets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/skin-giftsets/kits"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums",
				"heading1": "Face Treatments & Serums",
				"heading2": "Shop all Treatments and Serums",
				"subheading": "Jam-packed with hardworking, active ingredients, look to serums and treatments for visible results, it's one of the most important steps in any skincare routine, whether you're looking to brighten, firm, boost or soothe.",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums/face-peels",
				"heading1": "Face Peels & Exfoliating Treatments",
				"heading2": "Shop all Face Peels",
				"subheading": "For improving skin tone and texture, targeting fine lines and wrinkles and boosting overall radiance, discover these at-home face peels and exfoliating products that will safely treat your skin.",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums/face-peels"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums/acne-blemish",
				"heading1": "Acne & Blemish Treatments",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums/acne-blemish"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums/lip-treatments-scrubs",
				"heading1": "Lip treatments & Scrubs",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums/lip-treatments-scrubs"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/treatments-and-serums/serums",
				"heading1": "Serums",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/treatments-and-serums/serums"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/eye-care",
				"heading1": "",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/eye-care"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/eye-care/eye-cream",
				"heading1": "Eye Cream",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/eye-care/eye-cream"
			},
			{
				"url": "https://www.arcstore.co.za/skincare/eye-care/eye-gel",
				"heading1": "Eye Gel",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/skincare/eye-care/eye-gel"
			},
			{
				"url": "https://www.arcstore.co.za/body",
				"heading1": "Body",
				"heading2": "Shop all Body",
				"subheading": "Soft, nourished and healthy skin means happy skin, from head to toe. With our selection of favourite bath and body care essentials from Nesti Dante, Molton Brown and more, looking after yourself is a well-deserved treat.",
				"hasSlider": true,
				"path": "/body"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-giftset",
				"heading1": "Body Giftsets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-giftset"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-giftset/bath-shower",
				"heading1": "Bath & Shower Giftsets",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-giftset/bath-shower"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-moisturisers",
				"heading1": "Body Moisturisers",
				"heading2": "Shop all Body Moisturisers",
				"subheading": "Indulge in your own self-care ritual with our luxurious body and hand lotions, featuring most-loved brands like Molton Brown, Acqua Colonia and more.",
				"hasSlider": false,
				"path": "/body/body-moisturisers"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-moisturisers/hand-creams",
				"heading1": "Hand Creams",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-moisturisers/hand-creams"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-moisturisers/body-lotions-oils",
				"heading1": "Body lotions & oils",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-moisturisers/body-lotions-oils"
			},
			{
				"url": "https://www.arcstore.co.za/body/wash-bath-shower",
				"heading1": "BodyWash, Bath & Shower",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/wash-bath-shower"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-care",
				"heading1": "Bodycare",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-care"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-care/hand-sanitiser-soaps",
				"heading1": "Hand Sanitiser & Soaps",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-care/hand-sanitiser-soaps"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-minis",
				"heading1": "Body Minis",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-minis"
			},
			{
				"url": "https://www.arcstore.co.za/body/body-minis/body-minis",
				"heading1": "Minis",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/body-minis/body-minis"
			},
			{
				"url": "https://www.arcstore.co.za/body/deo-anti-perspirant",
				"heading1": "Deo & Anti perspirant",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/body/deo-anti-perspirant"
			},
			{
				"url": "https://www.arcstore.co.za/electrical",
				"heading1": "Electrical",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/electrical"
			},
			{
				"url": "https://www.arcstore.co.za/electrical/hair-styling",
				"heading1": "Hair Styling",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/electrical/hair-styling"
			},
			{
				"url": "https://www.arcstore.co.za/haircare",
				"heading1": "Haircare",
				"heading2": "Shop all Haircare",
				"subheading": "Achieving total hair health with our selection of essentials is easier than you think. From the salon-approved conditioners specific to your hair type and colour enhancement treatments to stay-in-place styling sprays and basic daily hair care; we have all you need to get styling your crown your way.",
				"hasSlider": true,
				"path": "/haircare"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/shampoo-conditioner/shampoo",
				"heading1": "Shampoo",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/haircare/shampoo-conditioner/shampoo"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/shampoo-conditioner/conditioner",
				"heading1": "Conditioner",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/haircare/shampoo-conditioner/conditioner"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/treatments",
				"heading1": "Treatments",
				"heading2": "Shop all",
				"subheading": "Leave-in conditioners, serums, scalp soothers and masques, nourish your hair with our selection of the best treatment products that will do only good things for your hair, no matter your hair concern.",
				"hasSlider": false,
				"path": "/haircare/treatments"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/treatments/treatments",
				"heading1": "Treatments",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/haircare/treatments/treatments"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/styling",
				"heading1": "Styling",
				"heading2": "Shop all",
				"subheading": "Define your curls, prep for a blowdry and keep those flyaways in place; our collection of styling products will make getting creative with your hair so much easier. We have all you need for your just-out-of-the-salon look.",
				"hasSlider": false,
				"path": "/haircare/styling"
			},
			{
				"url": "https://www.arcstore.co.za/haircare/hair-styling-tools/hair-styling-tools",
				"heading1": "Hair Styling Tools",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/haircare/hair-styling-tools/hair-styling-tools"
			},
			{
				"url": "https://www.arcstore.co.za/accessories",
				"heading1": "Accessories",
				"heading2": "Shop all Accessories",
				"subheading": "Tools of the trade to make makeup and skincare application a breeze. Find an array of fluffy brushes, handy sponges and blenders, must-have tools and all the other tidbits you need for a complete beauty bag here.",
				"hasSlider": true,
				"path": "/accessories"
			},
			{
				"url": "https://www.arcstore.co.za/accessories/new-in-accessories",
				"heading1": "New",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/accessories/new-in-accessories"
			},
			{
				"url": "https://www.arcstore.co.za/accessories/skincare-accessories/skincare-accessories",
				"heading1": "Skincare Accessories",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/accessories/skincare-accessories/skincare-accessories"
			},
			{
				"url": "https://www.arcstore.co.za/accessories/makeup-brushes/makeup-brushes",
				"heading1": "Makeup Brushes",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/accessories/makeup-brushes/makeup-brushes"
			},
			{
				"url": "https://www.arcstore.co.za/accessories/makeup-accessories/makeup-accessories",
				"heading1": "Makeup Accessories",
				"heading2": "",
				"subheading": "",
				"hasSlider": false,
				"path": "/accessories/makeup-accessories/makeup-accessories"
			},
			{
				"url": "https://www.arcstore.co.za/makeup/new-in-makeup",
				"heading1": "New Makeup Products",
				"heading2": "New In",
				"subheading": "",
				"hasSlider": false,
				"path": "/makeup/new-in-makeup"
			},
			{
				"url": "https://www.arcstore.co.za/makeup",
				"heading1": "Makeup",
				"heading2": "Shop all Makeup",
				"subheading": "If you're creating a new look, restocking old favourites or simply in the mood to express yourself, our makeup department is your personal playground. Think lip stains and lip lacquers, foundations for all skin tones and needs and mascaras for every kind of lash goal, you'll find what you need for the look you want from the most-loved brands",
				"hasSlider": true,
				"path": "/makeup"
			}
		]

		/* ---------------- helper functions ---------------- */

		function waitForElement(selector, trigger) {
			var interval = setInterval(function () {
				if (document && document.querySelector(selector)) {
					clearInterval(interval);
					trigger();
				}
			}, 50);

			setTimeout(function () {
				clearInterval(interval);
			}, 15000);
		}

		function normalizeText(text) {
			return text
				? text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim()
				: "";
		}

		function getCurrentPath() {
			var path = window.location.pathname || "/";
			path = path.replace(/\/$/, "");
			return path || "/";
		}

		function getPageData() {
			var currentPath = getCurrentPath();
			var matchedData = null;

			plpContentMap.forEach(function (item) {
				var itemPath = (item.path || "").replace(/\/$/, "") || "/";

				if (itemPath === currentPath) {
					matchedData = item;
					document.body.classList.add("crp_arc_plp_intro_move");
				}
			});

			if (debug) console.log("pageData:", matchedData);

			return matchedData;
		}

		function getAllBodyBlocks() {
			return document.querySelectorAll(".content-row__item__body");
		}

		function getBlockHeadingElement(block) {
			if (!block) return null;

			var headings = block.querySelectorAll("h1, h2, h3");
			var matchedHeading = null;

			[].slice.call(headings).forEach(function (heading) {
				if (matchedHeading) return;

				var span = heading.querySelector("span");
				var text = normalizeText(
					(span && span.textContent) || heading.textContent || ""
				);

				if (text) {
					matchedHeading = heading;
				}
			});

			return matchedHeading;
		}

		function getBlockHeadingText(block) {
			if (!block) return "";

			var headingEl = getBlockHeadingElement(block);
			if (!headingEl) return "";

			var headingSpan = headingEl.querySelector("span");

			return normalizeText(
				(headingSpan && headingSpan.textContent) ||
				headingEl.textContent ||
				""
			);
		}

		function getBlockParagraphElement(block) {
			if (!block) return null;

			var paragraphs = block.querySelectorAll("p");
			var matchedParagraph = null;

			[].slice.call(paragraphs).forEach(function (paragraph) {
				if (matchedParagraph) return;

				if (normalizeText(paragraph.textContent)) {
					matchedParagraph = paragraph;
				}
			});

			return matchedParagraph;
		}

		function getBlockParagraphText(block) {
			var paragraphEl = getBlockParagraphElement(block);
			return normalizeText(paragraphEl && paragraphEl.textContent);
		}

		function isParagraphMatch(actualText, expectedText) {
			var actual = normalizeText(actualText).toLowerCase();
			var expected = normalizeText(expectedText).toLowerCase();

			if (!expected) return true;
			if (!actual) return false;

			if (actual === expected) return true;
			if (actual.indexOf(expected) > -1) return true;
			if (expected.indexOf(actual) > -1) return true;

			var expectedStart = expected.slice(0, 80);
			if (expectedStart && actual.indexOf(expectedStart) > -1) return true;

			return false;
		}

		function findIntroBlock(pageData) {
			var blocks = getAllBodyBlocks();
			var matchedBlock = null;

			var expectedHeading = normalizeText(pageData.heading1);
			var expectedParagraph = normalizeText(pageData.subheading);

			[].slice.call(blocks).forEach(function (block) {
				if (matchedBlock) return;

				var headingText = getBlockHeadingText(block);
				var paragraphText = getBlockParagraphText(block);

				var headingMatched = expectedHeading && headingText === expectedHeading;
				var paragraphMatched = isParagraphMatch(paragraphText, expectedParagraph);

				if (headingMatched && paragraphMatched) {
					matchedBlock = block;
				}
			});

			return matchedBlock;
		}

		function findCategoryHeading(pageData) {
			var headings = document.querySelectorAll("h1, h2, h3");
			var matchedHeading = null;

			var expectedHeading = normalizeText(pageData.heading2);
			if (!expectedHeading) return null;

			[].slice.call(headings).forEach(function (heading) {
				if (matchedHeading) return;

				var span = heading.querySelector("span");
				var headingText = normalizeText(
					(span && span.textContent) || heading.textContent || ""
				);

				if (headingText === expectedHeading) {
					matchedHeading = heading;
				}
			});

			return matchedHeading;
		}

		function findBottomCopyBlock(introBlock) {
			var blocks = [].slice.call(getAllBodyBlocks());

			for (var i = blocks.length - 1; i >= 0; i--) {
				if (blocks[i] !== introBlock) {
					var paragraphs = blocks[i].querySelectorAll("p");

					if (
						paragraphs.length &&
						normalizeText(blocks[i].textContent).length > 80
					) {
						return blocks[i];
					}
				}
			}

			return null;
		}

		function findCarouselContainer() {
			var carousel = document.querySelector('[class*="ProductListCarousel"]');
			if (!carousel) return null;

			return carousel.closest(".content-container") || carousel;
		}

		function findMultiFormAnchor() {
			return document.querySelector("#multiForm");
		}

		function addMappedClasses(pageData) {
			var introBlock = findIntroBlock(pageData);
			var categoryHeading = findCategoryHeading(pageData);
			var bottomCopyBlock = findBottomCopyBlock(introBlock);
			var carouselContainer = findCarouselContainer();
			var multiFormAnchor = findMultiFormAnchor();

			if (introBlock) {
				introBlock.classList.add("cro-plp-intro-wrapper");
				var parent = introBlock.closest(".content-container");
				if (parent) {
					parent.classList.add("cro-plp-wrapper");
				}
			}

			if (categoryHeading) {
				categoryHeading.classList.add("cro-plp-category-heading");
			}

			if (bottomCopyBlock) {
				bottomCopyBlock.classList.add("cro-plp-existing-bottom-copy");
			}

			if (carouselContainer) {
				carouselContainer.classList.add("cro-plp-carousel-container");
			}

			if (multiFormAnchor) {
				multiFormAnchor.classList.add("cro-plp-multiform-anchor");
			}

			return {
				introBlock: introBlock,
				categoryHeading: categoryHeading,
				bottomCopyBlock: bottomCopyBlock,
				carouselContainer: carouselContainer,
				multiFormAnchor: multiFormAnchor
			};
		}

		function createMovedIntro(pageData, introBlock) {
			if (!introBlock) return null;

			var heading = getBlockHeadingElement(introBlock);
			var paragraph = getBlockParagraphElement(introBlock);

			var movedIntro = document.createElement("div");
			var movedHeading = document.createElement("h2");
			var movedParagraph = document.createElement("p");

			movedIntro.className = "cro-plp-moved-intro";
			movedHeading.className = "cro-plp-moved-intro-heading";
			movedParagraph.className = "cro-plp-moved-intro-paragraph";

			movedHeading.textContent =
				normalizeText(heading && heading.textContent) ||
				pageData.heading1 ||
				"";

			movedParagraph.textContent =
				normalizeText(paragraph && paragraph.textContent) ||
				pageData.subheading ||
				"";

			movedIntro.appendChild(movedHeading);

			if (movedParagraph.textContent) {
				movedIntro.appendChild(movedParagraph);
			}

			return movedIntro;
		}

		function moveIntroToBottom(pageData) {
			var pageElements = addMappedClasses(pageData);

			var introBlock = pageElements.introBlock;
			var bottomCopyBlock = pageElements.bottomCopyBlock;
			var carouselContainer = pageElements.carouselContainer;
			var multiFormAnchor = pageElements.multiFormAnchor;

			if (!introBlock) return;

			if (!document.querySelector(".cro-plp-moved-intro")) {
				var movedIntro = createMovedIntro(pageData, introBlock);

				if (movedIntro) {
					if (bottomCopyBlock && bottomCopyBlock.parentNode) {
						bottomCopyBlock.parentNode.insertBefore(movedIntro, bottomCopyBlock);
					} else if (multiFormAnchor && multiFormAnchor.parentNode) {
						multiFormAnchor.insertAdjacentElement("afterend", movedIntro);
					}
				}
			}

			introBlock.classList.add("cro-plp-intro-hidden");

			if (carouselContainer) {
				carouselContainer.classList.add("cro-plp-carousel-hidden");
			}
		}

		function init() {
			var pageData = getPageData();
			if (!pageData) return;

			moveIntroToBottom(pageData);
		}

		waitForElement("#multiForm", init);
	} catch (e) {
		console.log(e, "error in Test");
	}
})();