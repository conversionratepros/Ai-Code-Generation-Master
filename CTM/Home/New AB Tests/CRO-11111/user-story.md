# Recipe 121 (v2) | See/feel video widget | All

| Recipe Link | Private ([https://app.clickup.com/t/20651070/CRO-3225](https://app.clickup.com/t/20651070/CRO-3225)) |
| ---| --- |
| Figma Link | [https://www.figma.com/proto/VlTMm8zbEJrcvlZ9EYLtXG/Recipe-121-%7C-See-Feel-videos-%7C-All?node-id=1419-378&t=uXsRg5EFQdTZOWkP-1&scaling=min-zoom&content-scaling=fixed&page-id=1415%3A493](https://www.figma.com/proto/VlTMm8zbEJrcvlZ9EYLtXG/Recipe-121-%7C-See-Feel-videos-%7C-All?node-id=1419-378&t=uXsRg5EFQdTZOWkP-1&scaling=min-zoom&content-scaling=fixed&page-id=1415%3A493) |
| Figma Dev Link | [https://www.figma.com/design/VlTMm8zbEJrcvlZ9EYLtXG/Recipe-121-%7C-See-Feel-videos-%7C-All?node-id=1419-378&m=dev&t=S67HRU6hJB6FQYlh-1](https://www.figma.com/design/VlTMm8zbEJrcvlZ9EYLtXG/Recipe-121-%7C-See-Feel-videos-%7C-All?node-id=1419-378&m=dev&t=S67HRU6hJB6FQYlh-1) |
| Build Page On | Tile PDPs |
| Alternative Templates | Sale PDP page |
| Variant Name | See/feel video widget |
| Primary Conversion Action |  |
| Deploys |  |

### Background
* * *

By making see/feel videos more visible, more users will engage with the videos, get a better sense of the product and overall add to cart rate will increase.

### Summary of Changes
* * *

1. A video widget will display at the bottom of the page
2. The widget will contain the "Look, see, feel" videos that currenlty display in the gallery
###   

### UX/Ui
* * *

1.     1. See details in "Rules" on how video can be extracted
    2. A video widget should display
        1. On desktop,
            1. This should be fixed to the bottom left
        2. On mobile
            1. This should be fixed to the bottom of the page
            2. **The video should only come into view once the user scrolls past the "Online shopping with CTM is Safe & Reliable" text**
                1. The video should slide out from the bottom of the page
        3. Within a widget,
            1. A placeholder image should display for the video
                1. This should be the same placeholder image that exists in the gallery
            2. A footer should display
                1. The footer should contain
                    1. A heading: "See & Feel Live Review"
                    2. Subtext: "Expand video"
                    3. Expand icon
                    4. close icon
                        1. **If the close icon is clicked, the widget should no longer display**
                        2. **If a user navigates to a new product, the widget can display again**
                        3. **If the user navigates back to the a product where the widget was closed, it should not display**
            3. If anywhere on the video is clicked
                1. The video should display in a pop-up
                    1. The pop-up should have a red border as per the design
                    2. The pop-up width should match the width of the video
                    3. No black border padding should display
                2. HTML5 video controls should display
                    1. This should include a Mute button
                    2. The video should be muted by default.
                3. When the close icon or anywhere outside the pop-up is clicked, the video should close

Note:
**Session storage will be used. If user closes the browser, the video will show again**

### Change Checklist
* * *

1. What sections need to be updated
    1. Only the video widget needs to be added
2. Does the remainder of the page need to be updated?
    1. No
3. Do font sizes, colours, and families need to be updated?
    1. No
4. What device widths need to be used
    1. Mobile and desktop
5. Do the developers need more designs to clearly illustrate what needs to be done?
    1. No

### Test Analysis:
## 🧪 Test Summary
**🗂 Target Page:** PDP (Product Detail Page)
**🌐 Targeting Type:** Global JS
**✅ Global JS Required:** Yes
* * *
## 🔧 Implementation Details
*   **Targeting:** Run only on **PDP pages** via Global JS.
*   **Widget:**
    *   Build a **new video widget** using **static HTML + CSS + JS**.
    *   The widget will pull the **“Look, see, feel” videos** currently displayed inside the **product gallery**.
    *   Videos will be displayed in a dedicated widget section (outside of the gallery).
*   **HTML:**
    *   Create a container with heading (e.g., `"Look, See, Feel"`).
    *   Embed video thumbnails or players pulled from existing gallery sources.
*   **CSS:**
    *   Style to match provided figma / design guide.
    *   Ensure **responsiveness** (desktop, tablet, mobile).
*   **JS:**
    *   Extract video sources (URLs) from the gallery.
    *   Dynamically insert them into the new widget container.
    *   Handle **play/pause** correctly without breaking gallery functionality.
* * *
## 🎯 Functionality
*   Ensure all **Look, see, feel videos** appear correctly in the new widget.
*   Ensure videos still **play properly** in both gallery and widget.
*   Ensure no duplication or breaking of the gallery navigation.
*   Ensure CTA buttons (“Add to Cart”, “Wishlist”, etc.) remain functional.
*   Ensure no conflicts with existing JS (lazy-load, slider, etc.).
* * *
## ✅ QA Checklist
*   Video widget renders on PDP pages only.
*   All “Look, see, feel” videos load correctly.
*   Videos can be played/paused properly.
*   The original gallery continues working as intended.
*   Layout/styling matches design and is responsive.
*   No console errors introduced.
*   All PDP functionality (ATC, quantity selector, variants, etc.) works properly.

### Logic & Rules
* * *

1. Currently, CTM displays product videos in their gallery. This product video has a CSS class of "product-video"
    1. We need to extract this product video to display in the widget
2. This will run on mobile and desktop
3. The explanatory video needs to be added to a widget and a pop-up
4. **This should only run on tile products with explainer videos**
    1. **The "product-video" class can be checked to see if the video exists on the page**
5. They will be on auto-play.
6. If a user closes the widget. It should not display on that page. IF they navigate to a different product, it should display for the new product.

### Test Case:
* * *

[

crp.testmo.net

https://crp.testmo.net/repositories/5?group\_id=302

](https://crp.testmo.net/repositories/5?group_id=302)

[QA Master Document](https://docs.google.com/document/d/1NkAZKcWJ9skz0ccwZmCrKwFY-4afxSUwEEAGm0WG3qM/edit)