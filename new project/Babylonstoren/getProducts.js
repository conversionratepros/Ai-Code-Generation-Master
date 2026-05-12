/**
 * getProducts — Babylonstoren shop console utility
 *
 * Two functions:
 *
 *   getLoadedProducts()
 *     Instantly returns all products already in the Apollo cache (i.e. loaded so far
 *     by scrolling). No network request. Fast.
 *
 *   getAllProducts(taxonId, options)
 *     Fetches every product in a category via the API, regardless of scroll position.
 *     Auto-paginates until all pages are done.
 *     taxonId defaults to the current page's taxon (reads from URL/Apollo cache).
 *
 * Usage (paste file into browser console, then):
 *   getLoadedProducts()
 *   await getAllProducts()                     // current category, all pages
 *   await getAllProducts(61)                   // hampers (explicit taxon ID)
 *   await getAllProducts(61, { pageSize: 50 }) // 50 per page (fewer requests)
 */

/* ─── Helper: format cents → "R 5 000.00" ─── */
function _fmt(amountCents) {
  if (amountCents == null) return null;
  return 'R ' + (amountCents / 100).toLocaleString('en-ZA', { minimumFractionDigits: 2 });
}

/* ─── 1. Read what's already in Apollo cache ─── */
function getLoadedProducts() {
  const cache = window.__APOLLO_CLIENT__.cache.extract();

  const products = Object.values(cache)
    .filter(v => v?.__typename === 'ShopProductObject')
    .map(p => {
      // Variants are stored as normalised refs — resolve from cache
      const variants = (p.variants || []).map(ref => {
        const v = ref?.__ref ? cache[ref.__ref] : ref;
        if (!v) return null;
        // price is { __typename: "ShopCurrencyObject", currency: "ZAR", amount: <cents> }
        const amountCents = v.price?.amount ?? null;
        return {
          variantId: v.id,
          variantName: v.name || null,
          price: _fmt(amountCents),
          priceRaw: amountCents,
          available: v.available ?? null,
          slug: v.slug || null,
        };
      }).filter(Boolean);

      const mainMedia = p.mainMedia?.__ref ? cache[p.mainMedia.__ref] : p.mainMedia;

      return {
        productId: p.id,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription || null,
        price: variants[0]?.price || null,
        priceRaw: variants[0]?.priceRaw ?? null,
        variants,
        imageUrl: mainMedia?.url || null,
      };
    });

  console.table(products.map(p => ({
    productId: p.productId,
    name: p.name,
    price: p.price,
    variants: p.variants.length,
    variantIds: p.variants.map(v => v.variantId).join(', '),
    available: p.variants.map(v => v.available).join(', '),
  })));

  console.log(`\n${products.length} product(s) currently loaded in cache.\n`);
  return products;
}

/* ─── 2. Fetch ALL products in a category via the API ─── */
async function getAllProducts(taxonId, { pageSize = 24, sort = { column: 'position', order: 'asc' } } = {}) {
  const ENDPOINT = 'https://shop.babylonstoren.com/ecommerce/graphql';
  const HEADERS = { 'Content-Type': 'application/json', 'apollographql-client-name': 'ecommerce' };

  // Auto-detect taxon from current URL if not provided
  if (!taxonId) {
    const match = location.pathname.match(/\/pl\/(\d+)\//);
    if (match) {
      taxonId = parseInt(match[1]);
    } else {
      const cache = window.__APOLLO_CLIENT__.cache.extract();
      const key = Object.keys(cache['ROOT_QUERY'] || {}).find(k => k.startsWith('shopProducts('));
      if (key) { const m = key.match(/"taxonId":(\d+)/); if (m) taxonId = parseInt(m[1]); }
    }
  }

  if (!taxonId) {
    console.error('getAllProducts: could not detect taxonId. Pass it explicitly, e.g. getAllProducts(61)');
    return [];
  }

  const query = `query ShopProductListing($taxonId: Int, $locale: String!, $channelCode: String!, $sort: ShopSortInput, $page: ShopPageInput) {
    items: shopProducts(taxonId: $taxonId, locale: $locale, channelCode: $channelCode, sort: $sort, page: $page) {
      id name slug shortDescription __typename
      mainMedia { url __typename }
      variants {
        id name slug available __typename
        price { amount currency __typename }
      }
    }
    totalItemsCount: shopProductsCount(taxonId: $taxonId, channelCode: $channelCode)
  }`;

  let allProducts = [];
  let pageIndex = 0;
  let total = null;

  console.log(`Fetching all products for taxon ${taxonId}...`);

  while (true) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        operationName: 'ShopProductListing',
        variables: { taxonId, locale: 'en-ZA', channelCode: 'za', sort, page: { size: pageSize, index: pageIndex } },
        extensions: {},
        query
      })
    });
    const data = (await res.json()).data;
    if (!data?.items) { console.error('getAllProducts: request failed on page', pageIndex); break; }

    if (total === null) total = data.totalItemsCount;

    const page = data.items.map(p => ({
      productId: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription || null,
      price: _fmt(p.variants?.[0]?.price?.amount),
      priceRaw: p.variants?.[0]?.price?.amount ?? null,
      variants: (p.variants || []).map(v => ({
        variantId: v.id,
        variantName: v.name || null,
        price: _fmt(v.price?.amount),
        priceRaw: v.price?.amount ?? null,
        available: v.available,
        slug: v.slug,
      })),
      imageUrl: p.mainMedia?.url || null,
    }));

    allProducts = allProducts.concat(page);
    console.log(`  Page ${pageIndex}: ${page.length} products fetched  (${allProducts.length} / ${total} total)`);

    if (allProducts.length >= total || page.length < pageSize) break;
    pageIndex++;
  }

  console.log(`\n✓ ${allProducts.length} products in taxon ${taxonId}\n`);
  console.table(allProducts.map(p => ({
    productId: p.productId,
    name: p.name,
    price: p.price,
    variants: p.variants.length,
    variantIds: p.variants.map(v => v.variantId).join(', '),
    available: p.variants.map(v => v.available).join(', '),
  })));

  return allProducts;
}


// Already loaded by scroll (instant, no network)
getLoadedProducts()

// ALL products in current category (auto-detects taxon from URL)
await getAllProducts()

// Specific category by taxon ID
await getAllProducts(61)   // hampers

// Store the results for further use
const products = await getAllProducts()
products.find(p => p.name.includes('Mom'))
products.filter(p => p.priceRaw < 100000)   // under R 1 000
products.map(p => p.variants[0].variantId)   // all variant IDs
