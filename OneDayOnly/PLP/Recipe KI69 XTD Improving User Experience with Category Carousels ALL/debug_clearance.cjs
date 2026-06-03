const { chromium } = require("playwright");
const { readFileSync } = require("fs");

(async () => {
  const js = readFileSync('/Users/rafee/Documents/GitHub/Ai-Code-Generation-Master/new project/OnedayOnly/CRO-8037 - Advertise XTD Page With Banners/testFiles/variation.js', 'utf8');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));

  await page.goto('https://www.onedayonly.co.za/clearance-sale', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('.unbxdanalyticsProduct', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Inspect __NEXT_DATA__ around the 16th product BEFORE injecting script
  const ndDebug = await page.evaluate(() => {
    const nd = window.__NEXT_DATA__;
    if (!nd) return { error: 'no __NEXT_DATA__' };
    const pp = nd.props && nd.props.pageProps;
    const pg = pp && (pp.categoryPage || pp.shopPage || pp.clearanceSale);
    if (!pg || !Array.isArray(pg.items)) return { error: 'no items', keys: pp ? Object.keys(pp) : [] };

    var count = 0;
    var results = [];
    for (var si = 0; si < pg.items.length; si++) {
      var sec = pg.items[si];
      var prods = (sec && sec.props && sec.props.items) || [];
      var isGroup = prods.length > 1;
      for (var pi = 0; pi < prods.length; pi++) {
        count++;
        if (count >= 14 && count <= 20) {
          results.push({
            count: count,
            sectionIdx: si,
            isGroup: isGroup,
            sectionProdCount: prods.length,
            id: prods[pi].id,
            name: prods[pi].shortName || prods[pi].name || prods[pi].id
          });
        }
      }
      if (count > 20) break;
    }
    return results;
  });

  console.log('=== __NEXT_DATA__ products #14-20 ===');
  console.log(JSON.stringify(ndDebug, null, 2));

  // Check DOM: does the product ID from __NEXT_DATA__ match any card href?
  const domMatch = await page.evaluate(() => {
    const nd = window.__NEXT_DATA__;
    const pp = nd && nd.props && nd.props.pageProps;
    const pg = pp && (pp.categoryPage || pp.shopPage || pp.clearanceSale);
    if (!pg) return { error: 'no page' };

    var count = 0;
    var prod16 = null;
    for (var si = 0; si < pg.items.length; si++) {
      var prods = (pg.items[si] && pg.items[si].props && pg.items[si].props.items) || [];
      for (var pi = 0; pi < prods.length; pi++) {
        count++;
        if (count === 16) { prod16 = prods[pi]; break; }
      }
      if (prod16) break;
    }

    if (!prod16) return { error: 'prod16 not found' };

    var allCards = document.querySelectorAll('.unbxdanalyticsProduct');
    var matched = null;
    for (var k = 0; k < allCards.length; k++) {
      var a = allCards[k].querySelector('a[href*="/' + prod16.id + '"]');
      if (a) { matched = { href: a.getAttribute('href'), cardIdx: k }; break; }
    }

    // Also check DOM sections with >1 cards
    var sections = document.querySelectorAll('section');
    var groupSections = [];
    for (var i = 0; i < sections.length; i++) {
      var cnt = sections[i].querySelectorAll('.unbxdanalyticsProduct').length;
      if (cnt > 1) {
        groupSections.push({
          idx: i,
          cards: cnt,
          h2: sections[i].querySelector('h2') ? sections[i].querySelector('h2').textContent.trim().slice(0,50) : null
        });
      }
    }

    return {
      prod16: { id: prod16.id, name: prod16.shortName || prod16.name },
      domMatch: matched,
      groupSections: groupSections.slice(0, 5)
    };
  });

  console.log('\n=== Product #16 DOM matching ===');
  console.log(JSON.stringify(domMatch, null, 2));

  // Inject script and check banner placement
  await page.addScriptTag({ content: js });
  await page.waitForSelector('[data-cro-xtd-banner]', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(3000);

  console.log('\n=== CRO LOGS ===');
  logs.filter(l => l.includes('CRO-8037')).forEach(l => console.log(l));

  const info = await page.evaluate(() => {
    const banner = document.querySelector('[data-cro-xtd-banner]');
    if (!banner) return { error: 'No banner' };
    const allCards = document.querySelectorAll('.unbxdanalyticsProduct');
    let before = 0;
    for (var i = 0; i < allCards.length; i++) {
      if (allCards[i].compareDocumentPosition(banner) & Node.DOCUMENT_POSITION_FOLLOWING) before++;
    }
    function d(el) {
      if (!el) return null;
      return { tag: el.tagName, h2: el.querySelector && el.querySelector('h2') ? el.querySelector('h2').textContent.trim().slice(0,60) : null, cards: el.querySelectorAll ? el.querySelectorAll('.unbxdanalyticsProduct').length : null };
    }
    return { cardsBeforeBanner: before, prev: d(banner.previousElementSibling), parent: d(banner.parentElement), insideSection: !!banner.closest('section') };
  });

  console.log('\n=== Banner placement ===');
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
