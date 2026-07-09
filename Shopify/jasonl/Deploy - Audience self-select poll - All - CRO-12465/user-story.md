# CRO-12465 — Deploy | Audience self-select poll | All

**Client:** JasonL (jasonl.com.au) · **Platform:** Shopify OS 2.0 (Dawn-derived)
**Design reference:** https://design.conversionratepros.co.za/jasonl/homepage/audience-poll/

## Background

Learn what type of buyer each visitor is so the experience can be tailored to them.
A one-question poll replaces the current welcome strip ("Want to elevate your space?",
`.pdp-header-banner`) at the very top of every page, desktop and mobile.

## Behaviour

- Strip shows: **"Who are you shopping for today?"** + 5 answer buttons + close icon.
- Buttons (survey order, labels match Formbricks choices exactly):
  Home, Office, Startup, SME, Enterprise → segments `home, office, startup, sme, enterprise`.
  (Choice was renamed "Start Up" → "Startup" in Formbricks on 2026-07-08; code updated to match.)
- On answer, one shared routine runs these steps in order — the first three fire
  before and independently of the Formbricks submission:
  1. Cookie `jl_shopper_type=<segment>`, 180 days, path `/`.
  2. GA4 event `audience_poll_answer` with `segment` (measurement ID `G-W3QG4GQNB5`) —
     sent by pushing a gtag `arguments` object onto the default `dataLayer` with
     `send_to` (see learnings.md: the site's own `window.gtag` drops events; an isolated
     second gtag instance never processes). Verified on live: collect hit
     `en=audience_poll_answer&ep.segment=sme` to `tid=G-W3QG4GQNB5`. *Event name TBC by client.*
  3. Intelligems event `audience_poll_<segment>` via `window.gems.push`. *Event name TBC.*
  4. Submit to Formbricks (see below).
- Formbricks success → "Thanks, that helps us show you the right things.", strip hides after 1.8s.
- Formbricks failure → "Submission failed", strip hides after 1.8s.
- Close icon → strip hides, GA4 `audience_poll_dismiss` fires.
- Once **answered**: never shown again on that browser while the `jl_shopper_type`
  cookie lives (180 days) — client-approved "option B" (Donavan, Slack, 2026-07-08),
  superseding the spec's session-only rule for answered visitors.
- Once **closed without answering**: not shown again for the rest of the session
  (`sessionStorage`, per spec — no persistent dismissal cookie).
- Native banner is hidden via `body.cro-12465` CSS; strip occupies its slot, no layout shift.

## Formbricks

Public client API — no auth key needed:

```
POST https://app.formbricks.com/api/v1/client/cmqt0crm26zlq01tt1vsyhfve/responses
{
  "surveyId": "cmqt0l0usropz01vkuo96ihcv",
  "finished": true,
  "data": { "d8awe4hpc5wtf428eoxnuc2u": ["<choice label>"] }
}
```

- Environment ID = the "workspace" ID from the Formbricks URL.
- Answer value is an array with the choice **label** exactly as in the survey.
- Verified working 2026-07-08 (test response `cmrc8lob3etkr01yk0n3m65yy`, answer "Office" —
  delete from the dashboard).
- Choice IDs (reference): Home `mtlzkhvq739fbqj85c6b0axa`, Office `e3zh578wik4rvi97o6m00xvg`,
  Startup `kko13bprrqzehtanaha30kav`, SME `qz92umr061m8tcxvch3xow5n`,
  Enterprise `j73pnoqnsjl6sg3hkqv5fzc0`.

## Decisions / deviations from the written spec

- **5 buttons, not 4** — design mock showed 4 ("Home office"); survey has 5 choices; client
  confirmed follow the survey.
- **Session-only dismissal** per spec (mock JS used a 180-day `jl_poll_dismissed` cookie — not used).
- **Failure message also hides after 1.8s** (spec didn't say; leaving a dead strip is worse).
- Built to coexist safely with CRO-12327 (same anchor) — if both run, both bars show stacked,
  nothing breaks; client expected to pause 12327.

## Local preview

`node serve-local.js` (Playwright; hot-reloads variation.css/js against the live site).
