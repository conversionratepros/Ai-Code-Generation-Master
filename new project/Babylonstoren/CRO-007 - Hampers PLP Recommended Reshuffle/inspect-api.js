// Fetch the hampers API and inspect what fields OOS products actually have
const TARGET_NAMES = ['The Cosy Edit', 'Pause & Pamper', 'Blissful Moment', 'Heuningbos Selection', 'Sweet Summer Bliss'];

const ENDPOINT = 'https://shop.babylonstoren.com/ecommerce/graphql';

// Broader query — fetch every availability-related field we can
const query = `query ShopProductListing($taxonId: Int, $locale: String!, $channelCode: String!, $sort: ShopSortInput, $page: ShopPageInput) {
  items: shopProducts(taxonId: $taxonId, locale: $locale, channelCode: $channelCode, sort: $sort, page: $page) {
    id name slug
    variants {
      id name slug available
      price { amount currency }
      availableRegions { id parentId code }
    }
  }
  totalItemsCount: shopProductsCount(taxonId: $taxonId, channelCode: $channelCode)
}`;

async function fetchPage(pageIndex) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apollographql-client-name': 'ecommerce' },
    body: JSON.stringify({
      operationName: 'ShopProductListing',
      variables: { taxonId: 61, locale: 'en-ZA', channelCode: 'za', sort: { column: 'position', order: 'asc' }, page: { size: 48, index: pageIndex } },
      extensions: {},
      query
    })
  });
  return res.json();
}

(async () => {
  let allProducts = [];
  let pageIndex = 0;
  let total = null;

  while (true) {
    const json = await fetchPage(pageIndex);
    const data = json.data;
    if (!data || !data.items) { console.error('No data'); break; }
    if (total === null) total = data.totalItemsCount;
    allProducts = allProducts.concat(data.items);
    if (allProducts.length >= total || data.items.length < 48) break;
    pageIndex++;
  }

  console.log(`Fetched ${allProducts.length} products total.\n`);

  // Show full variant data for target products
  TARGET_NAMES.forEach(name => {
    const p = allProducts.find(p => p.name.trim() === name);
    if (!p) { console.log(`NOT FOUND: ${name}`); return; }
    console.log(`=== ${p.name} ===`);
    p.variants.forEach((v, i) => {
      console.log(`  variant[${i}]:`, JSON.stringify(v, null, 4));
    });
    console.log();
  });

  // Also show a summary table of available field values across all products
  console.log('=== available field summary across all products ===');
  const counts = {};
  allProducts.forEach(p => {
    p.variants.forEach(v => {
      const val = String(v.available);
      counts[val] = (counts[val] || 0) + 1;
    });
  });
  console.log('available value distribution:', counts);
})();
