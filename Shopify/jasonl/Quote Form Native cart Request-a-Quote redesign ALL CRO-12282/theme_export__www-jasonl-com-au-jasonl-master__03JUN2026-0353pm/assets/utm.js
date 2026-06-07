
function processTrafficSource() {
    const localStorageParams = ['gclid', 'fbclid', 'msclkid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_keyword', 'utm_term', 'utm_content', 'device', 'utm_expire_date'];
    const today = new Date();
    const expireDateTracking = localStorage.getItem('utm_expire_date');
    const expireDateTrackingLocal = new Date(localStorage.getItem('utm_expire_date'));
    let expireDateLimit = new Date(today);



    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    // Function to reset all localStorage parameters
    function resetLocalStorage() {
        localStorageParams.forEach(param => {
            localStorage.removeItem(param);
        });
    }

    let paramExistsInLocal = false;
    let paramExistsInURL = false;

    // Check if any parameter exists in urlParams
    for (const par of localStorageParams) {
        if (urlParams.has(par)) {
            paramExistsInURL = true;
            // console.log(paramExistsInURL);
            break;
        }
    }

    // Check if any parameter exists in localStorage
    for (const param of localStorageParams) {
        if (localStorage.getItem(param)) {
            paramExistsInLocal = true;
            // console.log("1");
            break;
        }
    }
    // console.log(expireDateTracking);
    if (paramExistsInLocal) {
      // console.log(expireDateTrackingLocal);
      if (expireDateTracking) {
          // console.log("3");
          if (expireDateTrackingLocal < today) {
             // console.log("4");
             if (paramExistsInURL) {

              resetLocalStorage();
              for (const param of localStorageParams) {
                if (urlParams.has(param)) {
                    set_localStorage(param, urlParams.get(param));
                }
            }
                    //set expire date in localStorage
            expireDateLimit.setDate(expireDateLimit.getDate() + 90);
            localStorage.setItem('utm_expire_date', expireDateLimit.toISOString());
        } else if (referrer && referrer.indexOf(window.location.origin) === -1) {
           const parsedReferrer = new URL(referrer);
           const domain = parsedReferrer.hostname.split('.')[1];
           if (domain !== 'jasonl') {
                const fullURL = referrer;
                const parsedURL = new URL(fullURL);
                const domain = parsedURL.hostname.split('.')[1];
                resetLocalStorage();
                set_localStorage('utm_source', domain);
                set_localStorage('utm_medium', 'organic');                   
            }
            expireDateLimit.setDate(expireDateLimit.getDate() + 90);
            localStorage.setItem('utm_expire_date', expireDateLimit.toISOString());
        } else {
          // Date expired. all UTM data will be removed.
          resetLocalStorage();
      }
  } else {
     // NEW CHANGE 10 SEP 2024
    // Only utm_term need to be updated if new utm_term received even before expiration date i.e 90 days
    if( urlParams.has('utm_term') ){
        let term = urlParams.get('utm_term')
        set_localStorage('utm_term',term)
    }
    // Do nothing. UTM date is not expire yet.
    return;
}
} else {
    expireDateLimit.setDate(expireDateLimit.getDate() + 20);
    // console.log("5");
    // console.log(expireDateLimit.toISOString());
    localStorage.setItem('utm_expire_date', expireDateLimit.toISOString());
}
} else {
    if (paramExistsInURL) {
        for (const param of localStorageParams) {
            if (urlParams.has(param)) {
                set_localStorage(param, urlParams.get(param));
            }
        }
        expireDateLimit.setDate(expireDateLimit.getDate() + 90);
        localStorage.setItem('utm_expire_date', expireDateLimit.toISOString());
    } else if (referrer && referrer.indexOf(window.location.origin) === -1) {
        const parsedReferrer = new URL(referrer);
        const domain = parsedReferrer.hostname.split('.')[1];
        if (domain !== 'jasonl') {
                const fullURL = referrer;
                const parsedURL = new URL(fullURL);
                const domain = parsedURL.hostname.split('.')[1];
                resetLocalStorage();
                set_localStorage('utm_source', domain);
                set_localStorage('utm_medium', 'organic');                   
        }
        expireDateLimit.setDate(expireDateLimit.getDate() + 90);
        localStorage.setItem('utm_expire_date', expireDateLimit.toISOString());
        }
    }
}

processTrafficSource();


function set_localStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

// GA Client ID Wed 10 Apr 2024
function getGAValue() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Check if the cookie starts with '_ga='
        if (cookie.indexOf('_ga=') === 0) {
            // Check if the cookie name is exactly '_ga' and not '_ga_' or similar
            if (cookie.substring(0, 3) === '_ga' && cookie.charAt(3) !== '_') {
                // Extract and return the cookie value
                return cookie.substring(4);
            }
        }
    }
    // If no _ga cookie is found, return null
    return null;
}

// Output the _ga cookie value to the console
var gaValue = getGAValue();
if (gaValue !== null) {
    set_localStorage('ga_client_id', gaValue);
} else {
    localStorage.removeItem('ga_client_id');
}
