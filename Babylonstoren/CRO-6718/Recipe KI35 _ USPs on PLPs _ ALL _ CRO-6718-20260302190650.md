# Recipe KI35 | USPs on PLPs | ALL | CRO-6718

## Test Overview

### Hypothesis

By adding Unique Selling Propositions (USPs) above the product grid, we can provide a compelling snapshot of Babylonstoren's story and the products' value, thereby increasing the Add to cart rate.

**Screenshots**

| Control | Variant |
| ---| --- |
| ![](https://t20651070.p.clickup-attachments.com/t20651070/9092ff0e-3a31-4f14-8d04-092f030eaa18/Desktop-Control.png) | ![](https://t20651070.p.clickup-attachments.com/t20651070/f1243a44-01a5-4938-83ea-655cda9d272d/DESKTOP.png) |

### Test Design & Methodology

The statistical test is designed to evaluate one variant against a control group using a two-sided test at a 95% confidence level.
The test is powered at 5% to detect a true relative difference of 1.00% or greater.
The experiment is planned for a runtime of approximately 2.00 weeks and an estimated total exposure of 23,094 users.
A non-binding futility boundary is in place, allowing early stopping if results are unlikely to reach significance.

### Goal Configuration

**Primary Goal:** Add to Cart Rate

**Test Description:** A USP strip was added below the hero banner on Product Listing Pages (PLPs), displaying three value propositions with checkmarks: "Delivered fresh to your door", "Guided by the seasons", and "Local, farm-to-fork provisions". The strip appears above the product grid on both desktop and mobile.

## Test Results

**Duration:** 25 days (4 Feb – 2 Mar 2026)
**Status:** Inconclusive — no statistically significant difference detected.

### Traffic Summary (GA4)

| Metric | Control | Variant | Relative Difference |
| --- | --- | --- | --- |
| Active Users | 2,778 | 2,807 | +1.04% |

### Primary Goal: Add to Cart Rate

| Metric | Control | Variant | Relative Difference | p-value | Significant |
| --- | --- | --- | --- | --- | --- |
| Add to Cart Users | 1,528 | 1,515 | — | — | — |
| **Add to Cart Rate** | **55.00%** | **53.97%** | **-1.88%** | **0.439** | **No** |

### Full Funnel Analysis

| Funnel Step | Control Rate | Variant Rate | Relative Difference | p-value | Significant |
| --- | --- | --- | --- | --- | --- |
| View Item (PDP) | 73.11% | 71.18% | -2.64% | 0.108 | No |
| Select Item | 62.02% | 60.81% | -1.95% | 0.353 | No |
| Add to Cart | 55.00% | 53.97% | -1.88% | 0.439 | No |
| View Cart | 39.56% | 38.51% | -2.65% | 0.421 | No |
| Begin Checkout | 39.52% | 38.51% | -2.57% | 0.437 | No |
| Purchase | 34.45% | 32.92% | -4.45% | 0.226 | No |

### Step-to-Step Conversion Rates

| Step | Control | Variant | Relative Difference |
| --- | --- | --- | --- |
| PLP → Product Click | 62.02% | 60.81% | -1.95% |
| PDP → Add to Cart | 75.23% | 75.83% | +0.79% |
| Add to Cart → Purchase | 62.63% | 60.99% | -2.62% |

### Secondary Metrics

| Metric | Control | Variant | Relative Difference |
| --- | --- | --- | --- |
| Search Usage | 29.34% | 29.39% | +0.18% |
| Wishlist Clicks | 6.52% | 5.24% | -19.62% |

## Overall Performance Impact

### 🟡 Inconclusive — No Statistically Significant Impact

The variant showed a consistent directional decline across all funnel metrics, but none reached statistical significance (all p-values > 0.10). The test cannot conclusively determine whether the USP strip helps or hurts performance.

### Key Takeaways & Learnings

1. **No measurable lift from USP strip on PLPs.** The hypothesis that surfacing brand USPs above the product grid would increase add-to-cart rate was not supported. The variant trended slightly negative across all funnel steps.

2. **Consistent negative direction across the full funnel.** While no single metric reached significance, the variant underperformed control at every stage — from product views (-2.64%) through to purchase (-4.45%). This consistent pattern suggests the USP strip may have introduced friction or pushed products further down the page without adding enough perceived value to compensate.

3. **PDP-to-ATC conversion was unaffected.** The one metric that remained flat was the PDP-to-cart rate (75.23% vs 75.83%), which makes sense — the USP strip only appeared on PLPs, not on product detail pages. This confirms the treatment's impact was isolated to the PLP browsing stage.

4. **Notable drop in wishlist engagement (-19.62%).** Although a secondary metric, the sharp decline in wishlist clicks in the variant may indicate that the additional content pushed key engagement elements further below the fold, reducing interaction with them.

5. **The USP messaging may be better suited to higher-intent pages.** Messaging like "Delivered fresh to your door" and "Local, farm-to-fork provisions" reinforces purchase confidence rather than browse-stage discovery. These USPs may perform better on the cart page, checkout, or PDP where users are evaluating whether to commit.

## Analysis & Insights

### Statistical Analysis & Observations

- **Test validity:** Traffic was evenly split (2,778 vs 2,807 active users), confirming proper randomisation. Browser and geography distributions were balanced across variations.
- **Sample size:** The test ran for 25 days with ~5,585 total users. The original power calculation estimated 23,094 users needed — the test reached only ~24% of the target sample size. This means the test was underpowered to detect the 1% MDE it was designed for.
- **Practical significance:** Even if the negative trend were real, the absolute differences are small (e.g., 1.03 percentage points on ATC rate). The business impact would be marginal.
- **Recommendation:** Do not implement. The USP strip showed no benefit and trended negative. Consider testing USP messaging in higher-intent contexts (cart page, checkout) or testing a more compact/less intrusive format on PLPs that doesn't push products below the fold._