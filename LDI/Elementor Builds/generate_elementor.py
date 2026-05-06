"""
LDI Elementor JSON Generator – Native Widgets
Produces elementor-template.json using native Elementor containers, heading,
text-editor, button, image, divider widgets. HTML widgets used only for
interactive JS components (FAQ accordion, carousel, sticky footer).
Run: python3 generate_elementor.py
"""

import json, pathlib

OUT = pathlib.Path(__file__).parent / "elementor-template.json"

# ── Colour tokens ────────────────────────────────────────────────────────────
P   = "#2b5e7d"   # primary / heading
BD  = "#030b3d"   # body text
GB  = "#f2f2f2"   # gray bg
WH  = "#ffffff"   # white
PU  = "rgba(122,78,209,0.7)"  # purple badge
TE  = "#3f8fbc"   # teal icon bg
LA  = "#bca6e8"   # lavender testimonial border
GN  = "#d2e4cc"   # green sticky footer bg

# ── Typography ───────────────────────────────────────────────────────────────
FH = "Frame Head"        # heading – register in Elementor → Custom Fonts
FB = "ABC Social Edu"    # body    – register in Elementor → Custom Fonts

# ── ID counter ───────────────────────────────────────────────────────────────
_c = [0]
def uid():
    _c[0] += 1
    return f"ldi{_c[0]:04d}aa"

# ── Primitive helpers ─────────────────────────────────────────────────────────
def px(n):
    return {"unit": "px", "size": n, "sizes": []}

def em(n):
    return {"unit": "em", "size": n, "sizes": []}

def pct(n):
    return {"unit": "%", "size": n, "sizes": []}

def pad(t=0, r=0, b=0, l=0):
    return {"unit": "px", "top": str(t), "right": str(r), "bottom": str(b), "left": str(l), "isLinked": False}

def gap(n):
    return {"column": str(n), "row": str(n), "isLinked": True, "unit": "px", "size": n}

def border_w(n):
    return {"unit": "px", "top": str(n), "right": str(n), "bottom": str(n), "left": str(n), "isLinked": True}

def border_r(n, unit="px"):
    return {"unit": unit, "top": str(n), "right": str(n), "bottom": str(n), "left": str(n), "isLinked": True}

# ── Widget builders ───────────────────────────────────────────────────────────

def heading(title, tag="h2", color=BD, font=FH, size_d=32, size_m=28, weight="400",
            align="left", lh_em=1.2, letter_spacing=None):
    s = {
        "title": title,
        "header_size": tag,
        "align": align,
        "title_color": color,
        "typography_typography": "custom",
        "typography_font_family": font,
        "typography_font_size": px(size_d),
        "typography_font_size_mobile": px(size_m),
        "typography_font_weight": weight,
        "typography_line_height": em(lh_em),
    }
    if letter_spacing is not None:
        s["typography_letter_spacing"] = {"unit": "px", "size": letter_spacing, "sizes": []}
    return {"id": uid(), "elType": "widget", "widgetType": "heading", "settings": s, "elements": []}


def text_ed(html, color=BD, size_d=18, size_m=16, align="left", weight="400", lh_em=1.6):
    return {"id": uid(), "elType": "widget", "widgetType": "text-editor", "settings": {
        "editor": html,
        "align": align,
        "text_color": color,
        "typography_typography": "custom",
        "typography_font_family": FB,
        "typography_font_size": px(size_d),
        "typography_font_size_mobile": px(size_m),
        "typography_font_weight": weight,
        "typography_line_height": em(lh_em),
    }, "elements": []}


def button(text, url, bg=P, fg=WH, size_d=18, size_m=16, align="left",
           pad_lr=28, pad_tb=16, border_color=None, hover_bg=None, radius=0):
    s = {
        "text": text,
        "link": {"url": url, "is_external": "", "nofollow": ""},
        "align": align,
        "background_color": bg,
        "button_text_color": fg,
        "button_background_hover_color": hover_bg or ("#1f4a62" if bg == P else bg),
        "hover_color": fg,
        "typography_typography": "custom",
        "typography_font_family": FB,
        "typography_font_size": px(size_d),
        "typography_font_size_mobile": px(size_m),
        "typography_font_weight": "700",
        "border_radius": {"unit": "px", "top": radius, "right": radius, "bottom": radius, "left": radius, "isLinked": True},
        "padding": pad(pad_tb, pad_lr, pad_tb, pad_lr),
    }
    if border_color:
        s["border_border"] = "solid"
        s["border_width"] = border_w(1)
        s["border_color"] = border_color
    return {"id": uid(), "elType": "widget", "widgetType": "button", "settings": s, "elements": []}


def image(url, img_id="", size="full", align="left", radius=0, width_pct=None, hide_mobile=False, hide_desktop=False):
    s = {
        "image": {"id": img_id, "url": url},
        "image_size": size,
        "align": align,
    }
    if radius:
        s["border_radius"] = border_r(radius)
    if width_pct:
        s["width"] = pct(width_pct)
    if hide_mobile:
        s["responsive_description"] = ""
        s["hide_mobile"] = "hide-mobile"
    if hide_desktop:
        s["hide_desktop"] = "hide-desktop"
    return {"id": uid(), "elType": "widget", "widgetType": "image", "settings": s, "elements": []}


def divider_w(color="#d9d9d9", width_px=250, weight_px=1):
    return {"id": uid(), "elType": "widget", "widgetType": "divider", "settings": {
        "color": {"color": color},
        "weight": px(weight_px),
        "width": {"unit": "px", "size": width_px, "sizes": []},
        "align": "center",
        "gap": px(0),
    }, "elements": []}


def html_w(content):
    return {"id": uid(), "elType": "widget", "widgetType": "html",
            "settings": {"html": content}, "elements": []}


# ── Container builder ─────────────────────────────────────────────────────────

def con(children, bg=None, pad_=None, pad_m=None, pad_t=None,
        dir="column", dir_m=None, align="", justify="",
        gap_n=None, cw="", br=None, border=None, width=None,
        width_t=None, width_m=None, is_outer=False):
    s = {"flex_direction": dir, "padding": pad_ or pad()}
    if bg:
        s["background_background"] = "classic"
        s["background_color"] = bg
    if align: s["flex_align_items"] = align
    if justify: s["flex_justify_content"] = justify
    if gap_n is not None: s["flex_gap"] = gap(gap_n)
    if cw: s["content_width"] = cw
    if br: s["border_radius"] = border_r(br)
    if border:
        s["border_border"] = "solid"
        s["border_color"] = border[0]
        s["border_width"] = border_w(border[1])
    if pad_m: s["padding_mobile"] = pad_m
    if pad_t: s["padding_tablet"] = pad_t
    if dir_m: s["flex_direction_mobile"] = dir_m
    if width: s["width"] = width
    if width_t: s["width_tablet"] = width_t
    if width_m: s["width_mobile"] = width_m
    return {"id": uid(), "elType": "container", "isInner": not is_outer,
            "settings": s, "elements": children}


def outer(children, bg=None, pad_=None, pad_m=None, pad_t=None,
          dir="column", dir_m=None, align="center", justify="flex-start", gap_n=None):
    return con(children, bg=bg, pad_=pad_, pad_m=pad_m, pad_t=pad_t,
               dir=dir, dir_m=dir_m, align=align, justify=justify,
               gap_n=gap_n, is_outer=True)


# ── SVG assets (inline, no Figma URLs) ───────────────────────────────────────
ARROW_W  = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW_P  = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="#2b5e7d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
NAV_NEXT = '<svg width="39" height="39" viewBox="0 0 39 39" fill="none"><circle cx="19.5" cy="19.5" r="19.5" fill="rgba(0,0,0,.4)"/><path d="M16 13.5l7 6-7 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
NAV_PREV = '<svg width="39" height="39" viewBox="0 0 39 39" fill="none"><circle cx="19.5" cy="19.5" r="19.5" fill="rgba(0,0,0,.4)"/><path d="M23 13.5l-7 6 7 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CHECK    = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CLOSE_X  = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2L16 16M16 2L2 16" stroke="#030b3d" stroke-width="2" stroke-linecap="round"/></svg>'
CHEV_UP  = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="#2b5e7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CHEV_DN  = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#2b5e7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

# ─────────────────────────────────────────────────────────────────────────────
# SECTION BUILDERS
# ─────────────────────────────────────────────────────────────────────────────

def build_header():
    logo = image(
        url="[NEEDS_UPLOAD: Upload LDI logo to WP Media Library]",
        align="left", width_pct=70
    )
    cta = button("Download free prospectus", "#ldi-form-section",
                 bg=WH, fg=P, border_color=P, hover_bg=GB,
                 size_d=16, size_m=14, pad_lr=20, pad_tb=12)
    inner = con([logo, cta],
                bg=WH, dir="row", align="center", justify="space-between",
                pad_=pad(0, 200, 0, 200),
                pad_m=pad(0, 20, 0, 20),
                pad_t=pad(0, 40, 0, 40),
                cw="full")
    return outer([inner], bg=WH,
                 pad_=pad(16, 0, 16, 0))


def build_hero():
    badge = con([
        heading("FOR GRADUATE DENTISTS", tag="div", color=WH, font=FB,
                size_d=14, size_m=11, weight="700", align="center",
                letter_spacing=0.5)
    ], bg=PU, pad_=pad(8, 16, 8, 16), br=5)

    h1 = heading("Treat the cases already in your chair to their full potential.",
                 tag="h1", color=P, size_d=36, size_m=30, weight="400",
                 align="center", lh_em=1.15)

    body1 = text_ed(
        "<p>A 12-month online programme that gives general dentists the clinical framework to assess, plan, and deliver complex aesthetic cases in full: composite artistry, smile design, indirect restorations.</p>",
        align="center", size_d=18, size_m=16
    )
    body2 = text_ed(
        "<p>Structured case-planning. 1:1 clinical support from UK faculty. Built on an evidence-based, UK-accredited foundation.</p>",
        align="center", size_d=18, size_m=16
    )

    cta = button("Download free prospectus", "#ldi-form-section",
                 align="center", size_d=18, size_m=16, pad_lr=32, pad_tb=16)

    suitable = text_ed(
        '<p style="text-align:center"><strong>Suitable for:</strong>'
        ' &nbsp;&#8226;&nbsp; Graduate dentists'
        ' &nbsp;&#8226;&nbsp; NHS dentists'
        ' &nbsp;&#8226;&nbsp; Private dentists'
        ' &nbsp;&#8226;&nbsp; Practice owners</p>',
        align="center", size_d=18, size_m=16
    )

    hero_img = image(
        url="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/05144535/hero-desktop.jpg",
        align="center", radius=8, width_pct=100
    )

    content_col = con([badge, h1, body1, body2, cta, suitable],
                      dir="column", align="center", gap_n=20)

    return outer([content_col, hero_img],
                 bg=WH, pad_=pad(60, 149, 60, 149),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40),
                 gap_n=48)


def build_problem():
    copy = text_ed("""
<p>You&#8217;re already seeing these patients.</p>
<br>
<p>The worn anteriors. The discoloured composites that have never quite matched. The patient who points at their smile and says <em>can we do something about all of this?</em></p>
<br>
<p>You can treat them. But often, you only treat part of it. Perhaps just a single tooth when all anteriors need addressing. Whitening when more intervention was justifiable. Something very conservative when the patient was ready for something more comprehensive.</p>
<br>
<p>It&#8217;s not about ability. It&#8217;s that aesthetic cases don&#8217;t arrive with a clear framework the way simpler restorative ones do &#8212; no agreed sequence for full-arch planning, no structured approach to reading occlusion into a smile case, no formal training in how to build and present a treatment plan that genuinely addresses what the patient came in for.</p>
<br>
<p>So you do what you can confidently justify. And the patient leaves with something, rather than everything they needed, or wanted.</p>
""", align="center", size_d=18, size_m=16)

    inner = con([copy], cw="full", pad_=pad(0, 80, 0, 80), pad_m=pad(0, 0, 0, 0))
    return outer([inner], bg=GB,
                 pad_=pad(60, 124, 60, 124),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_benefits():
    h2 = heading("Build the clinical framework to treat aesthetic cases in full",
                 color=BD, size_d=32, size_m=28, weight="400", align="center")

    intro = text_ed(
        "<p>Over 12 months, you build the clinical framework to assess, plan, and deliver aesthetic cases in full &#8212; with the confidence to propose treatment that properly meets what your patients are asking for.</p>",
        align="center", size_d=18, size_m=16
    )

    def bullet(strong_text, rest):
        return text_ed(
            f'<p><span style="display:inline-block;width:8px;height:8px;background:#2b5e7d;border-radius:4px;margin-right:14px;vertical-align:middle;flex-shrink:0"></span>'
            f'<strong>{strong_text}</strong> {rest}</p>',
            size_d=18, size_m=16
        )

    bullets = [
        bullet("Develop a structured approach to full-arch aesthetic assessment",
               "&#8212; so you can see and plan the complete case, not just the presenting complaint"),
        bullet("Build confidence in treatment sequencing",
               "&#8212; when to whiten first, when indirect restorations are the right call, how occlusion shapes every aesthetic decision"),
        bullet("Present comprehensive treatment plans patients understand and accept",
               "&#8212; and charge accordingly"),
        bullet("Deliver high-quality composite artistry, indirect restorations, and more",
               "&#8212; with 1:1 clinical support from expert faculty"),
        bullet("Build on a UK-accredited, evidence-based foundation",
               "&#8212; not short courses with no follow-up"),
    ]

    # Testimonial card
    avatar = con([
        image(url="[NEEDS_UPLOAD: Dr. Haroon Dalili headshot]",
              align="center", radius=60, width_pct=100)
    ], width=px(120), pad_=pad(0, 0, 0, 0))

    stars = heading("&#9733;&#9733;&#9733;&#9733;&#9733;", tag="div",
                    color=LA, font=FB, size_d=20, size_m=16, weight="400")

    quote = text_ed(
        '<p>&#8220;Opting for LDI for my Aesthetic and Restorative Dentistry diploma was one of the most significant career choices I have made. I would highly recommend this course.&#8221;</p>',
        size_d=18, size_m=16, lh_em=1.6
    )
    name = heading("Dr. Haroon Dalili, UK", tag="h4", color=P, font=FB,
                   size_d=18, size_m=16, weight="700")
    role = text_ed("<p>General Dentist, LDI - PG Dip. Alumnus</p>",
                   size_d=18, size_m=16)

    testimonial_body = con([stars, quote, name, role], dir="column", gap_n=8, cw="full")
    testimonial = con([avatar, testimonial_body],
                      bg=WH, dir="row", dir_m="column", align="center",
                      gap_n=32, pad_=pad(40, 40, 36, 40),
                      border=(LA, 1), br=8)

    inner = con([h2, intro] + bullets + [testimonial],
                dir="column", align="center", gap_n=24, cw="full")

    return outer([inner], bg=WH,
                 pad_=pad(96, 120, 96, 120),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_online():
    section_h = heading("Can you really learn Aesthetic &amp; Restorative Dentistry online?",
                        color=BD, size_d=32, size_m=28, weight="400", align="left")
    intro = text_ed(
        "<p>The programme combines online theory with a comprehensive Clinical Simulation Kit and 1:1 case support from our expert tutors. You receive the models and equipment needed to practise hands-on techniques at home, alongside live Zoom study clubs and optional in-person workshops in London.</p>",
        size_d=18, size_m=16
    )

    CHECK_URL = "https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124544/check-icon.png"

    def feature(title, desc):
        icon_wrap = con([image(CHECK_URL, align="center", width_pct=100)],
                        bg=P, pad_=pad(8, 8, 8, 8), br=50, width=px(32))
        text_col = con([
            heading(title, tag="h4", color=BD, font=FB, size_d=18, size_m=16, weight="700"),
            text_ed(f"<p>{desc}</p>", size_d=18, size_m=16)
        ], dir="column", gap_n=4, cw="full")
        return con([icon_wrap, text_col], dir="row", align="flex-start", gap_n=16)

    features = [
        feature("Clinical Simulation Kit",
                "models and equipment for composite, indirect restoration, and clinical photography practice, shipped to you"),
        feature("1:1 clinical case support",
                "apply new techniques to your own patients with tutor feedback through the VLE"),
        feature("Monthly Live Study Clubs",
                "live Zoom sessions with faculty, with recordings on the VLE if you miss them"),
        feature("Optional in-person workshops at LDI London",
                "additional hands-on teaching for those who can travel (not required)"),
    ]

    left_col = con([section_h, intro] + features, dir="column", gap_n=24,
                   width=pct(50), width_t=pct(100), width_m=pct(100))

    # Carousel — html widget with inline styles + JS (no <style> block)
    carousel_html = f"""
<div style="position:relative;width:100%">
  <div style="width:100%;overflow:hidden;border-radius:8px;aspect-ratio:1/1" id="ldiCar">
    <div style="display:flex;height:100%;transition:transform .4s ease" id="ldiCarTrack">
      <div style="flex:0 0 100%;height:100%">
        <img src="[NEEDS_UPLOAD: Carousel slide 1]" alt="Gallery 1" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="flex:0 0 100%;height:100%">
        <img src="[NEEDS_UPLOAD: Carousel slide 2]" alt="Gallery 2" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="flex:0 0 100%;height:100%">
        <img src="[NEEDS_UPLOAD: Carousel slide 3]" alt="Gallery 3" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
    </div>
  </div>
  <button onclick="ldiCar(-1)" aria-label="Previous" style="position:absolute;top:50%;left:-19px;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0">{NAV_PREV}</button>
  <button onclick="ldiCar(1)" aria-label="Next" style="position:absolute;top:50%;right:-19px;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0">{NAV_NEXT}</button>
  <div id="ldiCarDots" style="display:flex;gap:8px;justify-content:center;margin-top:16px"></div>
</div>
<script>
(function(){{
  var track=document.getElementById('ldiCarTrack');
  var dots=document.getElementById('ldiCarDots');
  if(!track||!dots)return;
  var slides=track.querySelectorAll('div');
  var cur=0;
  slides.forEach(function(_,i){{
    var d=document.createElement('button');
    d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===0?'#2b5e7d':'#c5c5c5')+';border:none;cursor:pointer;padding:0';
    d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click',function(){{go(i);}});
    dots.appendChild(d);
  }});
  window.ldiCar=function(dir){{go(cur+dir);}};
  function go(n){{
    cur=(n+slides.length)%slides.length;
    track.style.transform='translateX(-'+cur*100+'%)';
    dots.querySelectorAll('button').forEach(function(d,i){{d.style.background=i===cur?'#2b5e7d':'#c5c5c5';}});
  }}
}})();
</script>"""

    right_col = con([html_w(carousel_html)], dir="column",
                    width=pct(50), width_t=pct(100), width_m=pct(100))

    row = con([left_col, right_col], dir="row", dir_m="column",
              gap_n=64, align="flex-start", cw="full")

    return outer([row], bg=GB,
                 pad_=pad(96, 144, 96, 144),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_accreditation():
    section_h = heading("UK qualifications, accessible worldwide",
                        color=BD, size_d=32, size_m=28, weight="400", align="center")

    icon_wrap = con([
        image("https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04125001/cert-icon.png",
              align="center", width_pct=60)
    ], bg=TE, pad_=pad(13, 13, 13, 13), br=8, width=px(64))

    card_title = heading("UK level 7 accredited", tag="h3", color=P, font=FB,
                         size_d=32, size_m=20, weight="700")
    card_body = text_ed(
        "<p>Upon successful completion you will be awarded the London Dental Institute Diploma in Aesthetic &amp; Restorative Dentistry, accredited as Level 7 by EduQual &#8212; a regulated awarding body approved by SQA Accreditation, a globally recognised UK qualifications regulator.</p>",
        size_d=18, size_m=16
    )
    card = con([icon_wrap, card_title, card_body],
               bg=WH, dir="column", gap_n=16, pad_=pad(46, 53, 46, 53),
               pad_m=pad(32, 24, 32, 24),
               border=(TE, 2), br=8, cw="full")

    note = text_ed(
        "<p>No UK student visa required. Our 100% online programme is accessible to dentists worldwide.</p>",
        align="center", size_d=18, size_m=16
    )

    inner = con([section_h, card, note], dir="column", gap_n=32, cw="full")
    return outer([inner], bg=WH,
                 pad_=pad(60, 80, 60, 80),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_faq():
    section_h = heading("Frequently Asked Questions",
                        color=BD, size_d=32, size_m=28, weight="400", align="center")
    intro = text_ed(
        "<p>Find answers to common questions about our programs and admissions.</p>",
        align="center", size_d=18, size_m=16
    )

    faqs = [
        ("What qualification will I receive?",
         "Upon successful completion of the program, you will receive the London Dental Institute Diploma in Aesthetic &amp; Restorative Dentistry, accredited at Level 7 by EduQual &#8212; a regulated awarding body approved by SQA Accreditation, a globally recognised UK qualifications regulator."),
        ("Is LDI accredited?",
         "Yes. The London Dental Institute is accredited by EduQual, a regulated awarding body approved by SQA Accreditation &#8212; a globally recognised UK qualifications regulator. Our diplomas are certified at Level 7 of the UK qualifications framework."),
        ("Do I need a student visa?",
         "No. Our programme is 100% online, so no UK student visa is required. You can study from anywhere in the world while continuing to work in your practice."),
    ]

    faq_items_html = ""
    for i, (q, a) in enumerate(faqs):
        is_open = "block" if i == 0 else "none"
        faq_items_html += f"""
<div style="background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:6px;overflow:hidden;margin-bottom:12px">
  <button onclick="ldiToggleFaq(this)" aria-expanded="{'true' if i==0 else 'false'}"
    style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;text-align:left;font-family:ABC Social Edu,Inter,sans-serif;font-size:18px;font-weight:700;color:#030b3d;background:none;border:none;cursor:pointer">
    <span>{q}</span>
    <span style="flex-shrink:0">{CHEV_UP if i==0 else CHEV_DN}</span>
  </button>
  <div style="display:{is_open};padding:0 20px 20px;font-family:ABC Social Edu,Inter,sans-serif;font-size:18px;color:#030b3d;line-height:1.6">
    {a}
  </div>
</div>"""

    accordion = f"""
<div style="width:100%;max-width:720px;margin:0 auto">
{faq_items_html}
</div>
<script>
window.ldiToggleFaq = function(btn) {{
  var answer = btn.nextElementSibling;
  var isOpen = btn.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('[onclick="ldiToggleFaq(this)"]').forEach(function(b) {{
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling.style.display = 'none';
    b.querySelector('span:last-child').innerHTML = '{CHEV_DN}';
  }});
  if (!isOpen) {{
    btn.setAttribute('aria-expanded', 'true');
    answer.style.display = 'block';
    btn.querySelector('span:last-child').innerHTML = '{CHEV_UP}';
  }}
}};
</script>"""

    inner = con([section_h, intro, html_w(accordion)],
                dir="column", align="center", gap_n=32, cw="full")
    return outer([inner], bg=GB,
                 pad_=pad(96, 80, 96, 80),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_programme():
    section_h = heading("Designed for dentists worldwide",
                        color=BD, size_d=32, size_m=28, weight="400", align="center")
    sub = text_ed("<p>12-month online programme</p>", align="center", size_d=18, size_m=16)
    div_line = divider_w(color="#d9d9d9", width_px=250)

    def step(num, title, desc, show_badge=False):
        num_circle = con([
            heading(str(num), tag="div", color=TE, font=FB,
                    size_d=28, size_m=24, weight="700", align="center")
        ], bg=GB, pad_=pad(0, 0, 0, 0), br=50, width=px(64),
           align="center", justify="center")

        children = [num_circle,
                    heading(title, tag="h4", color=BD, font=FB,
                            size_d=18, size_m=16, weight="700", align="center"),
                    text_ed(f"<p>{desc}</p>", align="center", size_d=18, size_m=16)]

        if show_badge:
            badge = con([
                heading("MAY NEXT COHORT DATE", tag="div", color="#ff1c1c",
                        font=FB, size_d=10, size_m=10, weight="700",
                        align="center", letter_spacing=0.5)
            ], bg="#ffc4c4", pad_=pad(4, 10, 4, 10), br=12)
            children.append(badge)

        return con(children, dir="column", align="center", gap_n=8,
                   width=pct(30), width_m=pct(100))

    row1 = con([
        step(1, "Format", "100% online core curriculum with optional in-person training"),
        step(2, "Access", "Flexible 24/7 learning through the LDI Virtual Learning Environment (VLE)"),
        step(3, "Support", "1:1 case support to help you apply new skills immediately"),
    ], dir="row", dir_m="column", gap_n=40, align="flex-start", justify="center", cw="full")

    row2 = con([
        step(4, "Community", "Membership in a community of like-minded dental professionals"),
        step(5, "Start dates", "29th May 2026", show_badge=True),
    ], dir="row", dir_m="column", gap_n=40, align="flex-start", justify="center", cw="full")

    curriculum_title = text_ed("<p><strong>Curriculum highlights</strong></p>",
                               align="center", size_d=18, size_m=16)
    curriculum_body = text_ed(
        "<p>Aesthetic Clinical Photography &#8226; Smile Design &#8226; Indirect Restorations &#8226; Aesthetic Implant Restorations &#8226; Facial Aesthetics &#8226; Marketing an Aesthetic Practice</p>",
        align="center", size_d=18, size_m=16
    )

    inner = con([section_h, sub, div_line, row1, row2, curriculum_title, curriculum_body],
                dir="column", align="center", gap_n=32, cw="full")

    return outer([inner], bg=WH,
                 pad_=pad(60, 80, 60, 80),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_form():
    form_h = heading("See the full curriculum, faculty, and fees",
                     color=BD, size_d=32, size_m=28, weight="400", align="left")
    form_intro = text_ed(
        "<p>Download the Aesthetic &amp; Restorative Dentistry prospectus &#8212; every module, every faculty member, every fee, every case study.</p>",
        size_d=18, size_m=16
    )
    left = con([form_h, form_intro], dir="column", gap_n=20,
               width=pct(45), width_m=pct(100))

    form_html = f"""
<form id="ldi-form" action="#" method="POST"
  style="display:flex;flex-direction:column;gap:12px;font-family:ABC Social Edu,Inter,sans-serif">
  <div style="display:flex;flex-direction:column;gap:7px">
    <label for="ldi-fn" style="font-size:18px;color:#030b3d">First Name</label>
    <input type="text" id="ldi-fn" name="first_name" required
      style="background:#f7f7f7;border:1px solid #bdbdbd;height:50px;padding:0 16px;font-size:18px;color:#030b3d;width:100%;box-sizing:border-box;outline:none" />
  </div>
  <div style="display:flex;flex-direction:column;gap:7px">
    <label for="ldi-ln" style="font-size:18px;color:#030b3d">Last Name</label>
    <input type="text" id="ldi-ln" name="last_name" required
      style="background:#f7f7f7;border:1px solid #bdbdbd;height:50px;padding:0 16px;font-size:18px;color:#030b3d;width:100%;box-sizing:border-box;outline:none" />
  </div>
  <div style="display:flex;flex-direction:column;gap:7px">
    <label for="ldi-em" style="font-size:18px;color:#030b3d">Email</label>
    <input type="email" id="ldi-em" name="email" required
      style="background:#f7f7f7;border:1px solid #bdbdbd;height:50px;padding:0 16px;font-size:18px;color:#030b3d;width:100%;box-sizing:border-box;outline:none" />
  </div>
  <button type="submit" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#2b5e7d;color:#fff;border:1px solid #2b5e7d;font-family:ABC Social Edu,Inter,sans-serif;font-size:18px;font-weight:700;padding:16px 28px;cursor:pointer;width:100%">
    Download prospectus {ARROW_W}
  </button>
  <div style="text-align:center;padding:8px 0">
    <a href="#" style="font-size:18px;font-weight:700;color:#2b5e7d">Apply Now</a>
  </div>
  <p style="font-size:16px;color:#030b3d;text-align:center;margin-top:4px">
    Questions? <a href="#" style="text-decoration:underline;color:#030b3d">Contact our admissions team.</a>
  </p>
</form>
<p style="font-size:12px;color:#888;margin-top:8px;font-family:ABC Social Edu,Inter,sans-serif">
  [NEEDS_FORM: Replace form above with your WP form plugin shortcode, e.g. [contact-form-7 id="XX"]]
</p>"""

    right = con([html_w(form_html)], dir="column",
                width=pct(45), width_m=pct(100))

    card = con([left, right],
               bg=WH, dir="row", dir_m="column",
               gap_n=73, align="center", justify="center",
               pad_=pad(58, 58, 58, 58), pad_m=pad(24, 20, 24, 20),
               border=(P, 1), br=6)

    return outer([card], bg=GB,
                 pad_=pad(96, 124, 96, 124),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40),
                 align="center")


def build_faculty():
    section_h = heading("Meet our faculty",
                        color=BD, size_d=32, size_m=28, weight="400", align="center")
    intro = text_ed(
        "<p>We are proud to present our teaching faculty, featuring some of the world&#8217;s most respected educators in aesthetic and restorative dentistry.</p>",
        align="center", size_d=18, size_m=16
    )

    faculty = [
        ("https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124352/dr-1.png",
         "Dr. George Cheetham", "Aesthetic &amp; Restorative Dentistry, UK",
         "Dr. George Cheetham is an award-winning restorative dentist and one of the UK&#8217;s leading educators in aesthetic and restorative dentistry."),
        ("https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124417/dr-2.png",
         "Prof. James Field", "Professor of Restorative Dentistry, UK",
         "Professor James Field holds a full-time Chair in Restorative Dentistry and is internationally recognised for his clinical research."),
        ("https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124358/dr-3.png",
         "Dr. Asmaa Al-Taie", "Consultant in Restorative Dentistry, UK",
         "Dr. Asmaa Al-Taie is a Clinical Academic at the University of Liverpool and an NHS Consultant in Restorative Dentistry."),
    ]

    def faculty_card(img_url, name, role, bio):
        avatar_wrap = con([image(img_url, align="center", width_pct=100)],
                          width=px(120), br=60)
        return con([
            avatar_wrap,
            heading(name, tag="h3", color=P, font=FB, size_d=18, size_m=16, weight="700", align="center"),
            text_ed(f"<p><strong>{role}</strong></p>", align="center", size_d=18, size_m=16),
            text_ed(f"<p>{bio}</p>", align="center", size_d=18, size_m=16),
            button("View full bio", "#", bg=WH, fg=P, border_color=P,
                   size_d=16, size_m=14, pad_lr=16, pad_tb=8, align="center"),
        ], dir="column", align="center", gap_n=8,
           width=pct(30), width_m=pct(100))

    cards_row = con([faculty_card(*f) for f in faculty],
                    dir="row", dir_m="column", gap_n=40,
                    align="flex-start", justify="center", cw="full")

    more = text_ed('<p style="text-align:center"><a href="#"><strong>View full faculty</strong> &#8594;</a></p>',
                   align="center", size_d=18, size_m=16)

    inner = con([section_h, intro, cards_row, more],
                dir="column", align="center", gap_n=40, cw="full")

    return outer([inner], bg=WH,
                 pad_=pad(60, 149, 60, 149),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_final_cta():
    section_h = heading("Join the next enrolment",
                        color=BD, size_d=32, size_m=28, weight="400", align="center")
    body = text_ed(
        "<p>Start building the clinical framework to treat your aesthetic cases in full. The next cohort starts 29 May 2026.</p>",
        align="center", size_d=18, size_m=16
    )
    btn_primary = button("Download prospectus", "#ldi-form-section",
                         align="center", size_d=18, size_m=16, pad_lr=32)
    btn_outline = button("Apply Now", "#",
                         bg=WH, fg=P, border_color=P,
                         align="center", size_d=18, size_m=16, pad_lr=32)
    btns = con([btn_primary, btn_outline], dir="row", dir_m="column",
               gap_n=20, align="center", justify="center")

    inner = con([section_h, body, btns],
                dir="column", align="center", gap_n=24, cw="full")

    return outer([inner], bg=GB,
                 pad_=pad(60, 149, 60, 149),
                 pad_m=pad(48, 20, 48, 20),
                 pad_t=pad(60, 40, 60, 40))


def build_sticky_footer():
    sticky_html = f"""
<div id="ldi-sticky" style="position:fixed;bottom:0;left:0;right:0;background:#d2e4cc;z-index:9999;transform:translateY(110%);transition:transform .35s cubic-bezier(.4,0,.2,1)">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1440px;margin:0 auto;padding:16px 144px;box-sizing:border-box">
    <p style="font-family:ABC Social Edu,Inter,sans-serif;font-size:18px;color:#030b3d;margin:0">Diploma in Aesthetic &amp; Restorative Dentistry</p>
    <div style="display:flex;align-items:center;gap:16px;flex-shrink:0">
      <a href="#ldi-form-section" style="display:inline-flex;align-items:center;gap:10px;background:#2b5e7d;color:#fff;border:1px solid #2b5e7d;font-family:ABC Social Edu,Inter,sans-serif;font-size:18px;font-weight:700;padding:14px 24px;text-decoration:none">
        Download prospectus {ARROW_W}
      </a>
      <button id="ldi-sticky-close" aria-label="Close" style="width:32px;height:32px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center">{CLOSE_X}</button>
    </div>
  </div>
</div>
<script>
(function(){{
  var bar=document.getElementById('ldi-sticky');
  var close=document.getElementById('ldi-sticky-close');
  var dismissed=false;
  function showBar(){{bar.style.transform='translateY(0)';document.body.style.paddingBottom=bar.offsetHeight+'px';}}
  function hideBar(){{bar.style.transform='translateY(110%)';document.body.style.paddingBottom='0';}}
  var heroCta = document.querySelector('a[href="#ldi-form-section"].e-con-full') ||
                document.querySelector('.elementor-widget:nth-child(5) .elementor-button') ||
                null;
  if(heroCta){{
    var obs=new IntersectionObserver(function(entries){{
      entries.forEach(function(e){{if(dismissed)return;if(e.isIntersecting)hideBar();else showBar();}});
    }},{{threshold:0}});
    obs.observe(heroCta);
  }} else {{
    setTimeout(function(){{if(!dismissed)showBar();}}, 3000);
  }}
  if(close)close.addEventListener('click',function(){{dismissed=true;hideBar();}});
}})();
</script>"""

    return outer([html_w(sticky_html)], bg="transparent", pad_=pad(0, 0, 0, 0))


# ── Assemble template ─────────────────────────────────────────────────────────

content = [
    build_header(),
    build_hero(),
    build_problem(),
    build_benefits(),
    build_online(),
    build_accreditation(),
    build_faq(),
    build_programme(),
    build_form(),
    build_faculty(),
    build_final_cta(),
    build_sticky_footer(),
]

template = {
    "version": "0.4",
    "title": "LDI – Diploma in Aesthetic & Restorative Dentistry",
    "type": "page",
    "content": content,
    "page_settings": []
}

OUT.write_text(json.dumps(template, indent=2, ensure_ascii=False))

# Stats
total_widgets = 0
def count(el):
    global total_widgets
    if el.get('elType') == 'widget':
        total_widgets += 1
    for c in el.get('elements', []):
        count(c)
for s in content:
    count(s)

print(f"Written: {OUT}")
print(f"Sections: {len(content)}")
print(f"Total widgets: {total_widgets}")
print(f"File size: {OUT.stat().st_size / 1024:.1f} KB")
