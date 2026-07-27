
function get_cookie_catalogue(name) {
    var retrievedObject = localStorage.getItem(name);
    return JSON.parse(retrievedObject);
}
function changeCatalogueUrl() {
    //var retrievedObject = localStorage.getItem(name);
    let catalogLink = document.querySelectorAll('[href="https://builder.jasonl.com.au/catalogue/"]');

    var fbclidval = get_cookie_catalogue('fbclid');
    var gclidval = get_cookie_catalogue('gclid');
    var msclkidval = get_cookie_catalogue('msclkid');
    var utm_source = get_cookie_catalogue('utm_source');
    var utm_medium = get_cookie_catalogue('utm_medium');
    var utm_campaign = get_cookie_catalogue('utm_campaign');
    var utm_keyword = get_cookie_catalogue('utm_keyword');
    var utm_term = get_cookie_catalogue('utm_term');
    var utm_content = get_cookie_catalogue('utm_content');
    var device = get_cookie_catalogue('device');
    var ga_client_id = get_cookie_catalogue('ga_client_id');

    var parameters = [];
    if (fbclidval) {
        parameters.fbclid = fbclidval;
    }
    if (gclidval) {
        parameters.gclid = gclidval;
    }
    if (msclkidval) {
        parameters.msclkid = msclkidval
    }
    if (utm_source) {
        parameters.utm_source = utm_source;
    }
    if (utm_medium) {
        parameters.utm_medium = utm_medium;
    }
    if (utm_campaign) {
        parameters.utm_campaign = utm_campaign;
    }
    if (utm_keyword) {
        parameters.utm_keyword = utm_keyword;
    }
    if (utm_term) {
        parameters.utm_term = utm_term;
    }
    if (utm_content) {
        parameters.utm_content = utm_content;
    }
    if (device) {
        parameters.device = device;
    }
    if (ga_client_id) {
        parameters.ga_client_id = ga_client_id;
    }

    catalogLink.forEach(link => {
        let hrefVal = link.getAttribute('href');
        let url = new URL(hrefVal);
        createParam(parameters, url, link);
    })
}

// send gclicd through url parameters
function createParam(obj, url, link) {
    for (let [key, value] of Object.entries(obj)) {
        url.searchParams.append(key, value);
        link.setAttribute('href', url.href);
    }
}

changeCatalogueUrl();

