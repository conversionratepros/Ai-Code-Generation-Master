"""
LDI Elementor JSON Generator
Produces elementor-template.json importable via Elementor > Templates > Import.
Run: python3 generate_elementor.py
"""

import json, pathlib, textwrap

OUT = pathlib.Path(__file__).parent / "elementor-template.json"

# ── Helpers ──────────────────────────────────────────────────────────────────

def sec(sid, widgets):
    """Outer container — full-width, no padding, html widget handles its own bg/padding."""
    return {
        "id": sid,
        "elType": "container",
        "isInner": False,
        "settings": {
            "flex_direction": "column",
            "flex_justify_content": "flex-start",
            "content_width": "full",
            "padding": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": False},
        },
        "elements": widgets
    }


def hw(wid, html):
    return {"id": wid, "elType": "widget", "widgetType": "html", "settings": {"html": html}, "elements": []}


# ── Inline SVG assets ─────────────────────────────────────────────────────────

ARROW_WHITE = '<svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 10h13M11.5 5l5 5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW_BLUE  = '<svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 10h13M11.5 5l5 5-5 5" stroke="#2b5e7d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW_NAV   = '<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.5" cy="19.5" r="19.5" fill="rgba(0,0,0,0.40)"/><path d="M17 13.5l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CHEVRON_UP  = '<svg class="icon-minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.59 16.3228L12 11.7328L7.41 16.3228L6 14.9027L12 8.90277L18 14.9027L16.59 16.3228Z" fill="#2B5E7D"/></svg>'
CHEVRON_DN  = '<svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1.41 0L6 4.58998L10.59 0L12 1.42001L6 7.41998L0 1.42001L1.41 0Z" fill="#2B5E7D"/></svg>'
CLOSE_X     = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2L16 16M16 2L2 16" stroke="#030b3d" stroke-width="2" stroke-linecap="round"/></svg>'

# ── Shared CSS (included once in the first widget) ────────────────────────────

SHARED_CSS = """<style><!-- LDI shared CSS v1 -->
/* ── Google Fonts proxy (replace with Frame Head / ABC Social Edu in Elementor > Custom Fonts) ── */
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Inter:wght@400;600;700&display=swap');

/* ── Design tokens ── */
:root{
  --color-primary:#2b5e7d;
  --color-body:#030b3d;
  --color-gray-bg:#f2f2f2;
  --color-white:#ffffff;
  --color-border:#e3e3e3;
  --color-badge-bg:rgba(122,78,209,0.7);
  --color-sticky-bg:#d2e4cc;
  --color-blue-bar:#3ba5c8;
  --color-blue-light:#cfdee7;
  --font-heading:'Frame Head','Lora','Georgia',serif;
  --font-body:'ABC Social Edu','Inter','Helvetica Neue',Arial,sans-serif;
  --fs-hero-d:36px;--fs-heading-d:32px;--fs-body-d:18px;--fs-btn-d:18px;
  --fs-hero-m:30px;--fs-heading-m:28px;--fs-body-m:16px;--fs-btn-m:16px;
}

/* ── Reset ── */
.ldi-page *,.ldi-page *::before,.ldi-page *::after{box-sizing:border-box;margin:0;padding:0}
.ldi-page img{display:block;max-width:100%;height:auto}
.ldi-page a{color:inherit;text-decoration:none}
.ldi-page ul{list-style:none}
.ldi-page button{cursor:pointer;background:none;border:none;font:inherit}

/* ── Full-viewport breakout (escape Elementor container) ── */
.ldi-header,.ldi-section{
  width:100vw;
  margin-left:calc(50% - 50vw);
}

/* ── Utilities ── */
.ldi-page .text-center{text-align:center}
.ldi-page .body-text{font-family:var(--font-body);font-size:var(--fs-body-d);line-height:1.6;color:var(--color-body)}
.ldi-page .container{width:100%;max-width:1152px;margin:0 auto;padding:0 24px}
.ldi-page .container-narrow{width:100%;max-width:932px;margin:0 auto;padding:0 24px}
.ldi-page .desktop-only{display:block}
.ldi-page .mobile-only{display:none}
.ldi-page .section-heading{font-family:var(--font-heading);font-size:var(--fs-heading-d);font-weight:400;color:var(--color-body);line-height:1.2}
.ldi-page .ldi-section{padding:96px 0}
.ldi-page .section-gray{background:var(--color-gray-bg)}
.ldi-page .section-white{background:var(--color-white)}

/* ── Buttons ── */
.ldi-page .btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-body);font-size:var(--fs-btn-d);font-weight:700;line-height:1;cursor:pointer;text-decoration:none;padding:16px 28px;transition:opacity .2s,background .2s}
.ldi-page .btn:hover{opacity:.88}
.ldi-page .btn-primary{background:var(--color-primary);color:#fff;border:1px solid var(--color-primary)}
.ldi-page .btn-outline{background:#fff;color:var(--color-primary);border:1px solid var(--color-primary)}
.ldi-page .btn-full{width:100%;justify-content:center}
.ldi-page .btn-icon{width:20px!important;height:20px!important;max-height:20px;object-fit:contain;flex-shrink:0}
.ldi-page .link-underline{text-decoration:underline}

/* ── HEADER ── */
.ldi-header{position:sticky;top:0;z-index:999;width:100%;background:#fff;border-bottom:1px solid var(--color-border);height:80px;overflow:hidden}
.ldi-header .header-inner{display:flex;align-items:center;justify-content:space-between;height:100%;max-width:1440px;margin:0 auto;padding:0 200px}
.ldi-header .logo-wrap{display:block;flex-shrink:0;max-width:142px}
.ldi-header .logo{height:48px!important;width:auto!important;object-fit:contain}
.ldi-header .nav-full{display:inline}
.ldi-header .nav-short{display:none}

/* ── HERO ── */
.section-hero{background:var(--color-white);padding:60px 149px;display:flex;flex-direction:column;align-items:center;gap:60px}
.section-hero .hero-content{display:flex;flex-direction:column;align-items:center;gap:20px;max-width:900px;width:100%;text-align:center}
.section-hero .badge{display:inline-block;background:var(--color-badge-bg);color:#fff;font-family:var(--font-body);font-size:14px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:8px 16px;border-radius:5px;margin-bottom:20px}
.section-hero .hero-heading{font-family:var(--font-heading);font-size:var(--fs-hero-d);font-weight:400;color:var(--color-primary);line-height:1.15;max-width:900px}
.section-hero .hero-content .body-text{max-width:800px}
.section-hero .hero-cta-btn{margin-top:8px;padding:16px 32px;min-width:300px;justify-content:center}
.section-hero .suitable-for{display:flex;flex-direction:row;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 16px;margin-top:8px}
.section-hero .suitable-label{font-size:var(--fs-body-d);white-space:nowrap}
.section-hero .suitable-items{display:flex;flex-direction:row;flex-wrap:wrap;gap:8px 24px;justify-content:center;align-items:center}
.section-hero .suitable-item{font-size:var(--fs-body-d);position:relative;padding-left:14px}
.section-hero .suitable-item::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#245b8a}
.section-hero .hero-image-wrap{width:100%;max-width:944px}
.section-hero .hero-img{width:100%;height:auto;display:block;border-radius:8px;box-shadow:0 24px 48px rgba(0,0,0,.08);object-fit:cover}
.section-hero .hero-image-wrap.mobile{display:none}

/* ── PROBLEM ── */
.section-problem{padding:60px 124px}
.section-problem .body-text+.body-text{margin-top:1em}

/* ── BENEFITS ── */
.section-benefits{padding:96px 120px}
.section-benefits .container{display:flex;flex-direction:column;align-items:center;gap:48px}
.section-benefits .section-heading-wrap{max-width:700px}
.section-benefits .intro-text{max-width:800px}
.section-benefits .bullet-list{display:flex;flex-direction:column;gap:20px;max-width:800px;width:100%}
.section-benefits .bullet-list li{display:flex;gap:14px;align-items:flex-start}
.section-benefits .bullet-list li::before{content:'';display:block;flex-shrink:0;width:8px;height:8px;border-radius:4px;background:var(--color-primary);margin-top:8px}
.section-benefits .bullet-text{font-size:var(--fs-body-d);color:var(--color-body);line-height:1.6}
.section-benefits .bullet-text strong{font-weight:700}
.testimonial-card{background:#fff;border:1px solid #bca6e8;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,.05);display:flex;flex-direction:row;align-items:center;gap:32px;padding:40px 40px 36px;max-width:800px;width:100%}
.testimonial-card .testimonial-avatar{flex-shrink:0;width:120px;height:120px;border-radius:50%;overflow:hidden}
.testimonial-card .testimonial-avatar img{width:100%;height:100%;object-fit:cover}
.testimonial-card .testimonial-body{flex:1;display:flex;flex-direction:column;gap:0}
.testimonial-card .star-rating{color:#BCA6E8;font-size:18px;letter-spacing:2px}
.testimonial-card .testimonial-text{font-family:var(--font-body);font-size:18px;font-weight:400;line-height:normal;padding:15px 0}
.testimonial-card .testimonial-name{font-size:var(--fs-body-d);color:var(--color-primary);margin-bottom:4px}
.testimonial-card .testimonial-role{font-size:var(--fs-body-d)}

/* ── ONLINE LEARNING ── */
.section-online{padding:96px 144px}
.section-online .online-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;max-width:1152px;margin:0 auto}
.section-online .online-text{display:flex;flex-direction:column;gap:24px}
.section-online .feature-list{display:flex;flex-direction:column;gap:20px;padding-top:8px}
.section-online .feature-item{display:flex;gap:16px;align-items:flex-start}
.section-online .feature-icon{flex-shrink:0;width:32px;height:32px;background:var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:2px}
.section-online .feature-icon img{width:16px;height:16px;object-fit:contain;filter:brightness(0) invert(1)}
.section-online .feature-title{font-weight:700;font-size:var(--fs-body-d);margin-bottom:4px}
.section-online .feature-item .body-text{margin-top:2px}
.carousel-wrap{position:relative}
.carousel-wrap .carousel{width:100%;overflow:hidden;border-radius:8px;aspect-ratio:1/1}
.carousel-wrap .carousel-track{display:flex;height:100%;transition:transform .4s ease}
.carousel-wrap .carousel-slide{flex:0 0 100%;height:100%}
.carousel-wrap .carousel-slide img{width:100%;height:100%;object-fit:cover;display:block}
.carousel-wrap .carousel-btn{position:absolute;top:50%;transform:translateY(-50%);width:39px;height:39px;padding:0;background:none;border:none;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center}
.carousel-wrap .carousel-prev{left:-19px}
.carousel-wrap .carousel-next{right:-19px}
.carousel-wrap .carousel-dots{display:flex;gap:8px;justify-content:center;margin-top:16px}
.carousel-wrap .carousel-dot{width:8px;height:8px;border-radius:50%;background:#c5c5c5;border:none;cursor:pointer;transition:background .2s}
.carousel-wrap .carousel-dot.active{background:var(--color-primary)}

/* ── ACCREDITATION ── */
.section-accreditation{padding:60px 0}
.section-accreditation .container{display:flex;flex-direction:column;align-items:center;gap:32px}
.section-accreditation .accreditation-card{background:#fff;border:2px solid #3f8fbc;border-radius:8px;padding:46px 53px;max-width:1152px;width:100%;display:flex;flex-direction:column;gap:16px}
.section-accreditation .accred-icon{width:64px;height:64px;background:#3f8fbc;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.section-accreditation .accred-icon img{width:38px;height:38px;object-fit:contain}
.section-accreditation .accred-title{font-family:var(--font-body);font-size:32px;font-weight:700;color:var(--color-primary);line-height:1.2;padding-top:20px}
.section-accreditation .accred-note{max-width:1142px}

/* ── FAQ ── */
.section-faq{padding:96px 0}
.section-faq .container-narrow{display:flex;flex-direction:column;align-items:center;gap:32px}
.section-faq .faq-intro{max-width:500px}
.section-faq .faq-list{display:flex;flex-direction:column;gap:12px;width:100%;max-width:720px}
.section-faq .faq-item{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:6px;overflow:hidden}
.section-faq .faq-question{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;text-align:left;font-size:var(--fs-body-d);font-weight:700;color:var(--color-body)}
.section-faq .faq-icon{flex-shrink:0;display:flex;align-items:center}
.section-faq .faq-icon .icon-plus{display:block}
.section-faq .faq-icon .icon-minus{display:none}
.section-faq .faq-item.active .faq-icon .icon-plus{display:none}
.section-faq .faq-item.active .faq-icon .icon-minus{display:block}
.section-faq .faq-answer{max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;padding:0 20px}
.section-faq .faq-item.active .faq-answer{max-height:400px;padding:0 20px 20px}

/* ── PROGRAMME ── */
.section-programme{padding:60px 0}
.section-programme .container{display:flex;flex-direction:column;align-items:center;gap:40px}
.section-programme .programme-header{display:flex;flex-direction:column;align-items:center;gap:12px}
.section-programme .divider{width:250px;height:1px;background:#d9d9d9;margin-top:8px}
.section-programme .steps-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:40px;max-width:900px;width:100%}
.section-programme .step:nth-child(1){grid-column:1/3}
.section-programme .step:nth-child(2){grid-column:3/5}
.section-programme .step:nth-child(3){grid-column:5/7}
.section-programme .step:nth-child(4){grid-column:2/4}
.section-programme .step:nth-child(5){grid-column:4/6}
.section-programme .step{display:flex;flex-direction:column;align-items:center;gap:8px}
.section-programme .step-number{width:64px;height:64px;border-radius:32px;background:var(--color-gray-bg);display:flex;align-items:center;justify-content:center;font-family:var(--font-body);font-size:28px;font-weight:700;color:#3f8fbc}
.section-programme .step-title{font-size:var(--fs-body-d);font-weight:700;color:var(--color-body);text-align:center}
.section-programme .step .body-text{font-size:var(--fs-body-d)}
.section-programme .cohort-badge{display:inline-block;background:#ffc4c4;color:#ff1c1c;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:4px 10px;border-radius:12px;margin-top:4px}
.section-programme .curriculum-highlights{display:flex;flex-direction:column;align-items:center;gap:8px;max-width:700px;padding-top:24px}

/* ── FORM ── */
.section-form{padding:96px 124px}
.section-form .form-card{background:#fff;border:1px solid var(--color-primary);border-radius:6px;box-shadow:0 12px 16px rgba(0,0,0,.05);display:flex;gap:73px;align-items:center;justify-content:center;padding:58px;max-width:900px;margin:0 auto}
.section-form .form-text{flex:0 0 340px;display:flex;flex-direction:column;gap:20px}
.section-form .form-wrap{flex:0 0 360px}
.section-form .prospectus-form{display:flex;flex-direction:column;gap:12px}
.section-form .form-group{display:flex;flex-direction:column;gap:7px;margin-bottom:12px}
.section-form .form-group label{font-size:var(--fs-body-d);color:var(--color-body)}
.section-form .form-group input{background:#f7f7f7;border:1px solid #bdbdbd;height:50px;padding:0 16px;font-family:var(--font-body);font-size:var(--fs-body-d);color:var(--color-body);outline:none;width:100%;transition:border-color .2s}
.section-form .form-group input:focus{border-color:var(--color-primary)}
.section-form .form-group input::placeholder{color:#9b9b9b}
.section-form .form-apply{display:flex;justify-content:center;padding:8px 0}
.section-form .apply-link{font-size:var(--fs-body-d);font-weight:700;color:var(--color-primary)}
.section-form .form-contact{font-size:var(--fs-body-d);margin-top:4px}

/* ── FACULTY ── */
.section-faculty{padding:60px 149px}
.section-faculty .container{display:flex;flex-direction:column;align-items:center;gap:40px}
.section-faculty .faculty-intro{max-width:636px}
.section-faculty .faculty-grid{display:flex;gap:60px;justify-content:center;flex-wrap:wrap;width:100%}
.section-faculty .faculty-card{display:flex;flex-direction:column;align-items:center;gap:8px;width:280px}
.section-faculty .faculty-avatar{width:120px;height:120px;border-radius:50%;overflow:hidden;border:4px solid #fafafa;margin-bottom:8px}
.section-faculty .faculty-avatar img{width:100%;height:100%;object-fit:cover}
.section-faculty .faculty-name{font-size:var(--fs-body-d);color:var(--color-primary);text-align:center}
.section-faculty .faculty-role{font-size:var(--fs-body-d);color:var(--color-body);text-align:center;margin-bottom:4px}
.section-faculty .faculty-card .body-text{font-size:var(--fs-body-d)}
.section-faculty .faculty-card .link-underline{color:var(--color-primary);font-weight:700;font-size:var(--fs-body-d);text-decoration:underline;margin-top:4px}
.section-faculty .faculty-more{text-align:center}
.section-faculty .view-faculty{font-size:var(--fs-body-d);color:var(--color-body)}

/* ── FINAL CTA ── */
.section-final-cta{padding:60px 149px}
.section-final-cta .container-narrow{display:flex;flex-direction:column;align-items:center;gap:24px}
.section-final-cta .cta-buttons{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;padding-top:8px}
.section-final-cta .cta-buttons .btn{min-width:250px;justify-content:center}

/* ── STICKY FOOTER ── */
.ldi-sticky-footer{position:fixed;bottom:0;left:0;right:0;width:100%;background:var(--color-sticky-bg);z-index:9998;transform:translateY(105%);transition:transform .35s cubic-bezier(.4,0,.2,1)}
.ldi-sticky-footer.visible{transform:translateY(0)}
.ldi-sticky-footer .sticky-footer-inner{display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1440px;margin:0 auto;padding:16px 144px}
.ldi-sticky-footer .sticky-footer-title{font-family:var(--font-body);font-size:var(--fs-body-d);color:var(--color-body)}
.ldi-sticky-footer .sticky-footer-actions{display:flex;align-items:center;gap:16px}
.ldi-sticky-footer .sticky-btn{padding:14px 24px}
.ldi-sticky-footer .sticky-close{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background .2s;flex-shrink:0;background:none;border:none;cursor:pointer}
.ldi-sticky-footer .sticky-close:hover{background:rgba(0,0,0,.08)}

/* ══ RESPONSIVE – TABLET (≤ 1024px) ══ */
@media(max-width:1024px){
  .ldi-header .header-inner{padding:0 40px}
  .section-hero{padding:60px 40px}
  .section-problem{padding:60px 40px}
  .section-benefits{padding:60px 40px}
  .section-online{padding:60px 40px}
  .section-online .online-grid{grid-template-columns:1fr}
  .section-form{padding:60px 40px}
  .section-form .form-card{flex-direction:column;gap:40px;padding:40px}
  .section-form .form-text,.section-form .form-wrap{flex:none;width:100%}
  .section-faculty{padding:60px 40px}
  .section-final-cta{padding:60px 40px}
  .ldi-sticky-footer .sticky-footer-inner{padding:16px 40px}
  .testimonial-card{flex-direction:column;text-align:center;padding:32px 24px}
  .testimonial-card .testimonial-avatar{margin:0 auto}
}

/* ══ RESPONSIVE – MOBILE (≤ 767px) ══ */
@media(max-width:767px){
  .ldi-page .desktop-only{display:none!important}
  .ldi-page .mobile-only{display:block!important}
  body,.ldi-page .body-text{font-size:var(--fs-body-m)}
  .ldi-page .btn{font-size:var(--fs-btn-m);padding:16px 20px}
  .ldi-header{height:67px}
  .ldi-header .header-inner{padding:16px 20px;height:auto}
  .ldi-header .logo{height:34px!important;max-width:99px}
  .ldi-header .nav-full{display:none}
  .ldi-header .nav-short{display:inline}
  .ldi-header .header-cta{padding:7px 13px;font-size:var(--fs-btn-m)}
  .section-hero{padding:48px 20px;gap:24px}
  .section-hero .hero-heading{font-size:var(--fs-hero-m);text-align:left}
  .section-hero .hero-content{text-align:left;align-items:flex-start}
  .section-hero .badge{font-size:11px;margin-bottom:0}
  .section-hero .hero-cta-btn{width:100%;justify-content:center}
  .section-hero .suitable-for{flex-direction:column;align-items:flex-start;justify-content:flex-start;width:100%}
  .section-hero .suitable-items{flex-direction:column;gap:2px;width:100%}
  .section-hero .suitable-item{width:100%;padding:0 12px;height:35px;display:flex;align-items:center;background:var(--color-blue-light);border-left:3px solid var(--color-blue-bar);font-size:var(--fs-body-m)}
  .section-hero .suitable-item::before{display:none}
  .section-hero .hero-image-wrap.desktop{display:none!important}
  .section-hero .hero-image-wrap.mobile{display:block!important}
  .ldi-page .section-heading{font-size:var(--fs-heading-m)}
  .section-problem{padding:48px 20px}
  .section-problem .container-narrow{text-align:left;padding:0}
  .section-benefits{padding:48px 20px}
  .section-benefits .container{gap:24px;padding:0}
  .section-benefits .bullet-list{gap:16px}
  .section-benefits .bullet-text{font-size:var(--fs-body-m)}
  .testimonial-card{flex-direction:column;align-items:center;text-align:center;padding:40px 24px 24px;gap:12px}
  .testimonial-card .testimonial-avatar{margin:0 auto;width:80px;height:80px}
  .testimonial-card .testimonial-body{align-items:center;gap:8px}
  .testimonial-card .testimonial-name,.testimonial-card .testimonial-role,.testimonial-card .testimonial-text{font-size:var(--fs-body-m)}
  .testimonial-card .star-rating{font-size:14px}
  .section-online{padding:48px 20px}
  .section-online .online-grid{grid-template-columns:1fr;gap:24px;padding:0}
  .section-online .online-text{gap:15px}
  .section-online .feature-title,.section-online .feature-item .body-text{font-size:var(--fs-body-m)}
  .section-online .feature-icon{width:20px;height:20px}
  .section-online .feature-icon img{width:12px;height:12px}
  .section-online .feature-list{gap:12px}
  .carousel-wrap .carousel{aspect-ratio:4/3}
  .carousel-wrap .carousel-prev{left:-18px}
  .carousel-wrap .carousel-next{right:-18px}
  .section-accreditation{padding:48px 20px}
  .section-accreditation .container{padding:0}
  .section-accreditation .accreditation-card{padding:32px 24px;gap:7px;border:1px solid #2e6d86;border-radius:6px}
  .section-accreditation .accred-icon{width:48px;height:48px;border-radius:4px}
  .section-accreditation .accred-icon img{width:24px;height:24px}
  .section-accreditation .accred-title{font-size:16px;padding-top:9px}
  .section-accreditation .accred-note{font-size:var(--fs-body-m)}
  .section-faq{padding:48px 20px}
  .section-faq .container-narrow{padding:0}
  .section-faq .faq-question{font-size:var(--fs-body-m);padding:16px}
  .section-faq .faq-item.active .faq-answer{padding:0 16px 16px}
  .section-faq .faq-answer .body-text,.section-faq .faq-intro{font-size:var(--fs-body-m)}
  .section-programme{padding:48px 20px}
  .section-programme .steps-grid{grid-template-columns:1fr;gap:40px}
  .section-programme .step:nth-child(1),.section-programme .step:nth-child(2),.section-programme .step:nth-child(3),.section-programme .step:nth-child(4),.section-programme .step:nth-child(5){grid-column:1/2}
  .section-programme .step{width:100%;max-width:320px;margin:0 auto}
  .section-programme .step-number{width:56px;height:56px;font-size:24px}
  .section-programme .step-title,.section-programme .step .body-text,.section-programme .curriculum-highlights .body-text{font-size:var(--fs-body-m)}
  .section-programme .divider{display:none}
  .section-form{padding:48px 20px}
  .section-form .container,.section-programme .container{padding:0}
  .section-form .form-card{flex-direction:column;gap:24px;padding:24px 20px}
  .section-form .form-text .section-heading{font-size:var(--fs-heading-m);text-align:center}
  .section-form .form-text .body-text,.section-form .form-group label,.section-form .form-group input,.section-form .form-contact,.section-form .apply-link{font-size:var(--fs-body-m)}
  .section-form .form-wrap{width:100%}
  .section-faculty{padding:48px 20px}
  .section-faculty .container{gap:24px}
  .section-faculty .faculty-grid{flex-direction:column;gap:40px;align-items:center}
  .section-faculty .faculty-card{width:100%;max-width:320px}
  .section-faculty .faculty-avatar{width:80px;height:80px}
  .section-faculty .faculty-name,.section-faculty .faculty-role,.section-faculty .faculty-card .body-text,.section-faculty .faculty-card .link-underline,.section-faculty .faculty-intro{font-size:var(--fs-body-m)}
  .section-final-cta{padding:48px 20px}
  .section-final-cta .section-heading,.section-final-cta .body-text{font-size:var(--fs-heading-m)}
  .section-final-cta .body-text{font-size:var(--fs-body-m)}
  .section-final-cta .cta-buttons{flex-direction:column;gap:12px}
  .section-final-cta .cta-buttons .btn{width:100%}
  .ldi-sticky-footer .sticky-footer-inner{padding:16px 20px;flex-direction:column;gap:12px;align-items:center;text-align:center;width:100%;max-width:100%;box-sizing:border-box}
  .ldi-sticky-footer .sticky-footer-title{font-size:var(--fs-body-m);text-align:center}
  .ldi-sticky-footer .sticky-footer-actions{width:100%;justify-content:center;box-sizing:border-box}
  .ldi-sticky-footer .sticky-btn{width:100%;justify-content:center;font-size:var(--fs-btn-m);box-sizing:border-box}
}
</style>"""


# ── Section HTML strings ──────────────────────────────────────────────────────

# [C1] Logo: Figma asset URL — must be uploaded to WP Media Library
LOGO_URL = "<!-- [NEEDS_UPLOAD: LDI logo — upload to WP Media Library and replace this src] -->https://www.figma.com/api/mcp/asset/dc4dc51b-1af2-47ff-b08c-28da970f09a1"

HTML_HEADER = f"""<header class="ldi-header">
  <div class="header-inner">
    <a href="#" class="logo-wrap">
      <img src="{LOGO_URL}" alt="London Dental Institute" class="logo" />
    </a>
    <a href="#ldi-form-section" class="btn btn-outline header-cta">
      <span class="nav-full">Download free prospectus</span>
      <span class="nav-short">Download</span>
      {ARROW_BLUE}
    </a>
  </div>
</header>"""

# [C2] Hero CTA arrow + testimonial avatar: Figma assets
HTML_HERO = f"""<section class="ldi-section section-hero" id="ldi-hero">
  <div class="hero-content">
    <div class="badge">FOR GRADUATE DENTISTS</div>
    <h1 class="hero-heading">Treat the cases already in your chair to their full potential.</h1>
    <p class="body-text">A 12-month online programme that gives general dentists the clinical framework to assess, plan, and deliver complex aesthetic cases in full: composite artistry, smile design, indirect restorations.</p>
    <p class="body-text">Structured case-planning. 1:1 clinical support from UK faculty. Built on an evidence-based, UK-accredited foundation.</p>
    <a href="#ldi-form-section" class="btn btn-primary hero-cta-btn" id="ldi-hero-cta">
      Download free prospectus
      {ARROW_WHITE}
    </a>
    <div class="suitable-for">
      <div class="suitable-label body-text"><strong>Suitable for:</strong></div>
      <div class="suitable-items">
        <div class="suitable-item">Graduate dentists</div>
        <div class="suitable-item">NHS dentists</div>
        <div class="suitable-item">Private dentists</div>
        <div class="suitable-item">Practice owners</div>
      </div>
    </div>
  </div>
  <div class="hero-image-wrap desktop">
    <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/05144535/hero-desktop.jpg" alt="LDI Clinical Simulation Kit with laptop" class="hero-img" />
  </div>
  <div class="hero-image-wrap mobile">
    <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/05144541/hero-mobile.jpg" alt="LDI Clinical Simulation Kit with laptop" class="hero-img" />
  </div>
</section>"""

HTML_PROBLEM = """<section class="ldi-section section-gray section-problem">
  <div class="container-narrow text-center">
    <p class="body-text">You&#8217;re already seeing these patients.</p>
    <p class="body-text">The worn anteriors. The discoloured composites that have never quite matched. The patient who points at their smile and says <em>can we do something about all of this?</em></p>
    <p class="body-text">You can treat them. But often, you only treat part of it. Perhaps just a single tooth when all anteriors need addressing. Whitening when more intervention was justifiable. Something very conservative when the patient was ready for something more comprehensive.</p>
    <p class="body-text">It&#8217;s not about ability. It&#8217;s that aesthetic cases don&#8217;t arrive with a clear framework the way simpler restorative ones do &#8212; no agreed sequence for full-arch planning, no structured approach to reading occlusion into a smile case, no formal training in how to build and present a treatment plan that genuinely addresses what the patient came in for.</p>
    <p class="body-text">So you do what you can confidently justify. And the patient leaves with something, rather than everything they needed, or wanted.</p>
  </div>
</section>"""

# [C3] Testimonial avatar is a Figma asset
TESTIMONIAL_AVATAR_URL = "<!-- [NEEDS_UPLOAD: Dr. Haroon Dalili headshot — upload to WP Media Library] -->https://www.figma.com/api/mcp/asset/b93da990-22e6-476d-87cf-5a8aefd71627"

HTML_BENEFITS = f"""<section class="ldi-section section-white section-benefits">
  <div class="container">
    <div class="section-heading-wrap">
      <h2 class="section-heading text-center">Build the clinical framework to treat aesthetic cases in full</h2>
    </div>
    <p class="body-text text-center intro-text">Over 12 months, you build the clinical framework to assess, plan, and deliver aesthetic cases in full &#8212; with the confidence to propose treatment that properly meets what your patients are asking for.</p>
    <ul class="bullet-list">
      <li><p class="bullet-text"><strong>Develop a structured approach to full-arch aesthetic assessment</strong> &#8212; so you can see and plan the complete case, not just the presenting complaint</p></li>
      <li><p class="bullet-text"><strong>Build confidence in treatment sequencing</strong> &#8212; when to whiten first, when indirect restorations are the right call, how occlusion shapes every aesthetic decision</p></li>
      <li><p class="bullet-text"><strong>Present comprehensive treatment plans patients understand and accept</strong> &#8212; and charge accordingly</p></li>
      <li><p class="bullet-text"><strong>Deliver high-quality composite artistry, indirect restorations, and more</strong> &#8212; with 1:1 clinical support from expert faculty</p></li>
      <li><p class="bullet-text"><strong>Build on a UK-accredited, evidence-based foundation</strong> &#8212; not short courses with no follow-up</p></li>
    </ul>
    <div class="testimonial-card">
      <div class="testimonial-avatar">
        <img src="{TESTIMONIAL_AVATAR_URL}" alt="Dr. Haroon Dalili" />
      </div>
      <div class="testimonial-body">
        <div class="star-rating" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <blockquote class="testimonial-text body-text">&#8220;Opting for LDI for my Aesthetic and Restorative Dentistry diploma was one of the most significant career choices I have made. I would highly recommend this course.&#8221;</blockquote>
        <p class="testimonial-name"><strong>Dr. Haroon Dalili, UK</strong></p>
        <p class="testimonial-role body-text">General Dentist, LDI - PG Dip. Alumnus</p>
      </div>
    </div>
  </div>
</section>"""

# [C4] Carousel images are Figma assets
CAROUSEL_IMG_1 = "<!-- [NEEDS_UPLOAD: Carousel slide 1 — upload to WP Media Library] -->https://www.figma.com/api/mcp/asset/f9ba1b86-576d-4163-9962-77cb32a7c328"
CAROUSEL_IMG_2 = "<!-- [NEEDS_UPLOAD: Carousel slide 2 — upload to WP Media Library] -->https://www.figma.com/api/mcp/asset/6485024f-a9f7-4c18-9bda-157aec8a7cf2"
CAROUSEL_IMG_3 = "<!-- [NEEDS_UPLOAD: Carousel slide 3 — upload to WP Media Library] -->https://www.figma.com/api/mcp/asset/515e31fb-a227-4c24-95b2-9179a6fe3135"

HTML_ONLINE = f"""<section class="ldi-section section-gray section-online">
  <div class="container online-grid">
    <div class="online-text">
      <h2 class="section-heading">Can you really learn Aesthetic &amp; Restorative Dentistry online?</h2>
      <p class="body-text">The programme combines online theory with a comprehensive Clinical Simulation Kit and 1:1 case support from our expert tutors. You receive the models and equipment needed to practise hands-on techniques at home, alongside live Zoom study clubs and optional in-person workshops in London.</p>
      <ul class="feature-list">
        <li class="feature-item">
          <span class="feature-icon"><img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124544/check-icon.png" alt="" /></span>
          <div><p class="feature-title">Clinical Simulation Kit</p><p class="body-text">models and equipment for composite, indirect restoration, and clinical photography practice, shipped to you</p></div>
        </li>
        <li class="feature-item">
          <span class="feature-icon"><img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124544/check-icon.png" alt="" /></span>
          <div><p class="feature-title">1:1 clinical case support</p><p class="body-text">apply new techniques to your own patients with tutor feedback through the VLE</p></div>
        </li>
        <li class="feature-item">
          <span class="feature-icon"><img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124544/check-icon.png" alt="" /></span>
          <div><p class="feature-title">Monthly Live Study Clubs</p><p class="body-text">live Zoom sessions with faculty, with recordings on the VLE if you miss them</p></div>
        </li>
        <li class="feature-item">
          <span class="feature-icon"><img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124544/check-icon.png" alt="" /></span>
          <div><p class="feature-title">Optional in-person workshops at LDI London</p><p class="body-text">additional hands-on teaching for those who can travel (not required)</p></div>
        </li>
      </ul>
    </div>
    <div class="carousel-wrap">
      <div class="carousel" id="ldi-carousel">
        <div class="carousel-track" id="ldiCarouselTrack">
          <div class="carousel-slide"><img src="{CAROUSEL_IMG_1}" alt="LDI Gallery 1" /></div>
          <div class="carousel-slide"><img src="{CAROUSEL_IMG_2}" alt="LDI Gallery 2" /></div>
          <div class="carousel-slide"><img src="{CAROUSEL_IMG_3}" alt="LDI Gallery 3" /></div>
        </div>
      </div>
      <button class="carousel-btn carousel-prev" id="ldiCarouselPrev" aria-label="Previous slide" style="transform:translateY(-50%) scaleX(-1)">{ARROW_NAV}</button>
      <button class="carousel-btn carousel-next" id="ldiCarouselNext" aria-label="Next slide">{ARROW_NAV}</button>
      <div class="carousel-dots" id="ldiCarouselDots"></div>
    </div>
  </div>
</section>
<script>
(function(){{
  var track=document.getElementById('ldiCarouselTrack');
  var dotsEl=document.getElementById('ldiCarouselDots');
  if(!track||!dotsEl)return;
  var slides=track.querySelectorAll('.carousel-slide');
  var current=0;
  slides.forEach(function(_,i){{
    var dot=document.createElement('button');
    dot.className='carousel-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label','Slide '+(i+1));
    dot.addEventListener('click',function(){{goTo(i);}});
    dotsEl.appendChild(dot);
  }});
  function goTo(n){{
    current=(n+slides.length)%slides.length;
    track.style.transform='translateX(-'+current*100+'%)';
    dotsEl.querySelectorAll('.carousel-dot').forEach(function(d,i){{d.classList.toggle('active',i===current);}});
  }}
  document.getElementById('ldiCarouselPrev').addEventListener('click',function(){{goTo(current-1);}});
  document.getElementById('ldiCarouselNext').addEventListener('click',function(){{goTo(current+1);}});
}})();
</script>"""

HTML_ACCREDITATION = """<section class="ldi-section section-white section-accreditation">
  <div class="container">
    <h2 class="section-heading text-center">UK qualifications, accessible worldwide</h2>
    <div class="accreditation-card">
      <div class="accred-icon">
        <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04125001/cert-icon.png" alt="" />
      </div>
      <h3 class="accred-title">UK level 7 accredited</h3>
      <p class="body-text">Upon successful completion you will be awarded the London Dental Institute Diploma in Aesthetic &amp; Restorative Dentistry, accredited as Level 7 by EduQual &#8212; a regulated awarding body approved by SQA Accreditation, a globally recognised UK qualifications regulator.</p>
    </div>
    <p class="body-text text-center accred-note">No UK student visa required. Our 100% online programme is accessible to dentists worldwide.</p>
  </div>
</section>"""

HTML_FAQ = f"""<section class="ldi-section section-gray section-faq">
  <div class="container-narrow">
    <h2 class="section-heading text-center">Frequently Asked Questions</h2>
    <p class="body-text text-center faq-intro">Find answers to common questions about our programs and admissions.</p>
    <div class="faq-list">
      <div class="faq-item active">
        <button class="faq-question" aria-expanded="true">
          <span>What qualification will I receive?</span>
          <span class="faq-icon">{CHEVRON_UP}{CHEVRON_DN}</span>
        </button>
        <div class="faq-answer">
          <p class="body-text">Upon successful completion of the program, you will receive the London Dental Institute Diploma in Aesthetic &amp; Restorative Dentistry, accredited at Level 7 by EduQual &#8212; a regulated awarding body approved by SQA Accreditation, a globally recognised UK qualifications regulator.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is LDI accredited?</span>
          <span class="faq-icon">{CHEVRON_UP}{CHEVRON_DN}</span>
        </button>
        <div class="faq-answer">
          <p class="body-text">Yes. The London Dental Institute is accredited by EduQual, a regulated awarding body approved by SQA Accreditation &#8212; a globally recognised UK qualifications regulator. Our diplomas are certified at Level 7 of the UK qualifications framework.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Do I need a student visa?</span>
          <span class="faq-icon">{CHEVRON_UP}{CHEVRON_DN}</span>
        </button>
        <div class="faq-answer">
          <p class="body-text">No. Our programme is 100% online, so no UK student visa is required. You can study from anywhere in the world while continuing to work in your practice.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
(function(){{
  document.querySelectorAll('.section-faq .faq-question').forEach(function(btn){{
    btn.addEventListener('click',function(){{
      var item=btn.closest('.faq-item');
      var isOpen=item.classList.contains('active');
      document.querySelectorAll('.section-faq .faq-item').forEach(function(i){{
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded','false');
      }});
      if(!isOpen){{item.classList.add('active');btn.setAttribute('aria-expanded','true');}}
    }});
  }});
}})();
</script>"""

HTML_PROGRAMME = """<section class="ldi-section section-white section-programme">
  <div class="container">
    <div class="programme-header">
      <h2 class="section-heading text-center">Designed for dentists worldwide</h2>
      <p class="body-text text-center">12-month online programme</p>
      <div class="divider"></div>
    </div>
    <div class="steps-grid">
      <div class="step">
        <div class="step-number">1</div>
        <h4 class="step-title">Format</h4>
        <p class="body-text text-center">100% online core curriculum with optional in-person training</p>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <h4 class="step-title">Access</h4>
        <p class="body-text text-center">Flexible 24/7 learning through the LDI Virtual Learning Environment (VLE)</p>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <h4 class="step-title">Support</h4>
        <p class="body-text text-center">1:1 case support to help you apply new skills immediately</p>
      </div>
      <div class="step">
        <div class="step-number">4</div>
        <h4 class="step-title">Community</h4>
        <p class="body-text text-center">Membership in a community of like-minded dental professionals</p>
      </div>
      <div class="step">
        <div class="step-number">5</div>
        <h4 class="step-title">Start dates</h4>
        <p class="body-text text-center">29th May 2026</p>
        <span class="cohort-badge">MAY NEXT COHORT DATE</span>
      </div>
    </div>
    <div class="curriculum-highlights">
      <h4 class="body-text"><strong>Curriculum highlights</strong></h4>
      <p class="body-text text-center">Aesthetic Clinical Photography &#8226; Smile Design &#8226; Indirect Restorations &#8226; Aesthetic Implant Restorations &#8226; Facial Aesthetics &#8226; Marketing an Aesthetic Practice</p>
    </div>
  </div>
</section>"""

# [C5] Form: HTML stub — replace with WP form shortcode in Elementor
HTML_FORM = f"""<section class="ldi-section section-gray section-form" id="ldi-form-section">
  <div class="container">
    <div class="form-card">
      <div class="form-text">
        <h2 class="section-heading">See the full curriculum, faculty, and fees</h2>
        <p class="body-text">Download the Aesthetic &amp; Restorative Dentistry prospectus &#8212; every module, every faculty member, every fee, every case study.</p>
      </div>
      <div class="form-wrap">
        <!-- [NEEDS_FORM: Replace the form below with your WP form plugin shortcode.
             Recommended: Contact Form 7 or WPForms.
             Example: [contact-form-7 id="YOUR_FORM_ID" title="Prospectus Download"]
             The form should collect: First Name, Last Name, Email.
             On success, trigger prospectus download or redirect. -->
        <form class="prospectus-form" action="#" method="POST" id="ldi-prospectus-form">
          <div class="form-group desktop-only">
            <label for="ldi-first-name">First Name</label>
            <input type="text" id="ldi-first-name" name="first_name" required />
          </div>
          <div class="form-group desktop-only">
            <label for="ldi-last-name">Last Name</label>
            <input type="text" id="ldi-last-name" name="last_name" required />
          </div>
          <div class="form-group desktop-only">
            <label for="ldi-email">Email</label>
            <input type="email" id="ldi-email" name="email" required />
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            Download prospectus
            {ARROW_WHITE}
          </button>
          <div class="form-apply">
            <a href="#" class="apply-link">Apply Now</a>
          </div>
          <p class="form-contact body-text text-center">
            Questions? <a href="#" class="link-underline">Contact our admissions team.</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>"""

HTML_FACULTY = """<section class="ldi-section section-white section-faculty">
  <div class="container">
    <h2 class="section-heading text-center">Meet our faculty</h2>
    <p class="body-text text-center faculty-intro">We are proud to present our teaching faculty, featuring some of the world&#8217;s most respected educators in aesthetic and restorative dentistry.</p>
    <div class="faculty-grid">
      <div class="faculty-card">
        <div class="faculty-avatar">
          <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124352/dr-1.png" alt="Dr. George Cheetham" />
        </div>
        <p class="faculty-name">Dr. George Cheetham</p>
        <p class="faculty-role"><strong>Aesthetic &amp; Restorative Dentistry, UK</strong></p>
        <p class="body-text text-center">Dr. George Cheetham is an award-winning restorative dentist and one of the UK&#8217;s leading educators in aesthetic and restorative dentistry.</p>
        <a href="#" class="link-underline">View full bio</a>
      </div>
      <div class="faculty-card">
        <div class="faculty-avatar">
          <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124417/dr-2.png" alt="Prof. James Field" />
        </div>
        <p class="faculty-name">Prof. James Field</p>
        <p class="faculty-role"><strong>Professor of Restorative Dentistry, UK</strong></p>
        <p class="body-text text-center">Professor James Field holds a full-time Chair in Restorative Dentistry and is internationally recognised for his clinical research.</p>
        <a href="#" class="link-underline">View full bio</a>
      </div>
      <div class="faculty-card">
        <div class="faculty-avatar">
          <img src="https://media.londondentalinstitute.com/wp-content/uploads/2026/05/04124358/dr-3.png" alt="Dr. Asmaa Al-Taie" />
        </div>
        <p class="faculty-name">Dr. Asmaa Al-Taie</p>
        <p class="faculty-role"><strong>Consultant in Restorative Dentistry, UK</strong></p>
        <p class="body-text text-center">Dr. Asmaa Al-Taie is a Clinical Academic at the University of Liverpool and an NHS Consultant in Restorative Dentistry.</p>
        <a href="#" class="link-underline">View full bio</a>
      </div>
    </div>
    <div class="faculty-more">
      <a href="#" class="view-faculty body-text"><strong>View full faculty</strong> &#8594;</a>
    </div>
  </div>
</section>"""

HTML_FINAL_CTA = f"""<section class="ldi-section section-gray section-final-cta">
  <div class="container-narrow text-center">
    <h2 class="section-heading">Join the next enrolment</h2>
    <p class="body-text">Start building the clinical framework to treat your aesthetic cases in full. The next cohort starts 29 May 2026.</p>
    <div class="cta-buttons">
      <a href="#ldi-form-section" class="btn btn-primary">Download prospectus {ARROW_WHITE}</a>
      <a href="#" class="btn btn-outline">Apply Now</a>
    </div>
  </div>
</section>"""

HTML_STICKY_FOOTER = f"""<div class="ldi-sticky-footer" id="ldi-sticky-footer" role="complementary" aria-label="Download prospectus">
  <div class="sticky-footer-inner">
    <p class="sticky-footer-title">Diploma in Aesthetic &amp; Restorative Dentistry</p>
    <div class="sticky-footer-actions">
      <a href="#ldi-form-section" class="btn btn-primary sticky-btn">
        Download prospectus
        {ARROW_WHITE}
      </a>
      <button class="sticky-close desktop-only" id="ldi-sticky-close" aria-label="Close">{CLOSE_X}</button>
    </div>
  </div>
</div>
<script>
(function(){{
  var heroCta=document.getElementById('ldi-hero-cta');
  var stickyBar=document.getElementById('ldi-sticky-footer');
  var closeBtn=document.getElementById('ldi-sticky-close');
  if(!heroCta||!stickyBar)return;
  var dismissed=false;
  function showSticky(){{stickyBar.classList.add('visible');document.body.style.paddingBottom=stickyBar.offsetHeight+'px';}}
  function hideSticky(){{stickyBar.classList.remove('visible');document.body.style.paddingBottom='0';}}
  var obs=new IntersectionObserver(function(entries){{
    entries.forEach(function(e){{if(dismissed)return;if(e.isIntersecting)hideSticky();else showSticky();}});
  }},{{threshold:0}});
  obs.observe(heroCta);
  if(closeBtn)closeBtn.addEventListener('click',function(){{dismissed=true;hideSticky();}});
}})();
</script>"""

# ── Build Elementor content ───────────────────────────────────────────────────

def wrap(html):
    return f'<div class="ldi-page">{html}</div>'

content = [
    sec("ldis01", [hw("ldiw01", SHARED_CSS + "\n" + wrap(HTML_HEADER))]),
    sec("ldis02", [hw("ldiw02", wrap(HTML_HERO))]),
    sec("ldis03", [hw("ldiw03", wrap(HTML_PROBLEM))]),
    sec("ldis04", [hw("ldiw04", wrap(HTML_BENEFITS))]),
    sec("ldis05", [hw("ldiw05", wrap(HTML_ONLINE))]),
    sec("ldis06", [hw("ldiw06", wrap(HTML_ACCREDITATION))]),
    sec("ldis07", [hw("ldiw07", wrap(HTML_FAQ))]),
    sec("ldis08", [hw("ldiw08", wrap(HTML_PROGRAMME))]),
    sec("ldis09", [hw("ldiw09", wrap(HTML_FORM))]),
    sec("ldis10", [hw("ldiw10", wrap(HTML_FACULTY))]),
    sec("ldis11", [hw("ldiw11", wrap(HTML_FINAL_CTA))]),
    sec("ldis12", [hw("ldiw12", wrap(HTML_STICKY_FOOTER))]),
]

template = {
    "version": "0.4",
    "title": "LDI – Diploma in Aesthetic & Restorative Dentistry",
    "type": "page",
    "content": content,
    "page_settings": []
}

OUT.write_text(json.dumps(template, indent=2, ensure_ascii=False))
print(f"Written: {OUT}")
print(f"Sections: {len(content)}")
print(f"File size: {OUT.stat().st_size / 1024:.1f} KB")
