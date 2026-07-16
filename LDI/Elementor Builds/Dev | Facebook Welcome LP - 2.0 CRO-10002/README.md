# Dev | Facebook Welcome LP - 2.0 (CRO-10002)

Standalone HTML/CSS mockup of the LDI Facebook Welcome landing page V2, built from Figma for sign-off.

- **Desktop design:** Figma node `26-48`
- **Mobile design:** Figma node `33-2892`
- **Files:** `index.html`, `style.css`, `assets/`
- Open `index.html` in a browser. Fully responsive; breakpoint at 900px matches the mobile design (all rows stack).

## Sections (top → bottom)
Header · Hero · Benefits ("Why dentists choose LDI") · About ("Who we are") · USP ("Can you really learn dentistry online?") · Demo (dark, VLE tour) · Testimonials · Courses · Course-benefit (green) · Study clubs · Accreditation · Register form · Footer.

## Design tokens (from Figma variables)
- Primary/heading `#2b5e7d`, text `#030b3d`, gray panel `#f2f2f2`, purple accent `#cabce3` / quote border `#7450ca`, green band `#d1e4cb`.
- Demo band gradient `#2b5e7d → #1f4458`.
- Fonts: **Frame Head** (headings) ≈ Poppins proxy, **ABC Social Edu** (body) ≈ Inter proxy. Swap in the licensed font files for the production build.

## Notes / placeholders
- **Testimonial and course cards are exported as full images** (`assets/testimonial-*.png`, `assets/course-*.png`) — text is baked into the image. They stack cleanly on mobile. For the Elementor build these become real editable content.
- Benefit/USP **icons and the check marks are recreated inline** (SVG / CSS), approximating the Figma icons.
- The Google-reviews badge is recreated in CSS/SVG (`4.9 / 5` + stars).
- **Register modal = Gravity Form 41** (same as the control at `/welcome/`). The hero, About and Study-clubs "Register your interest" buttons open a popup modal containing the GF 41 shortcode:
  ```
  [gravityform id="41" title="false" description="false" ajax="true"]
  ```
  In the Elementor build, place this in a Shortcode widget (or the Gravity Forms widget → Form 41) inside the popup. Field map: `input_1`=First Name · `input_3`=Last Name · `input_2`=Email · `input_5.1`="I am a registered dental professional *" checkbox.
  **Note:** shortcodes only render inside WordPress, so the local `index.html` preview shows the shortcode as text in a dashed placeholder box — that's expected.
- **Verify data is passing (on WordPress):** submit the modal form, then check **WP admin → Forms → Entries → Form 41** — the submission appears as a new entry. Also confirm notification emails fire.
- The **demo section form** is still a static mockup — wire to its own Gravity Form / endpoint on build.
- Photographic assets pulled from Figma: `hero.jpg`, `about.jpg`, `demo-vle.png`, `studyclubs.jpg`, `form.jpg`, `accreditation.png` (EduQual + ADEE), `logo.png`.
