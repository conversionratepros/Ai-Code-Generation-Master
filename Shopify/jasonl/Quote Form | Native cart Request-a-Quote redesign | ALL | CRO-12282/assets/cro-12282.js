// CRO-12282 | Quote Form Redesign
// Replaces custom-checkout.js on the variation page.
// Phone is now optional. Mobile accordion removed (summary always expanded).

if (!window.__cro12282) {
  window.__cro12282 = true;

  var isFormValidate_requestaquote = false;
  var isFormValidate_purchaseorder = false;

  function initValidate(form) {
    var validate = new window.JustValidate('#custom-checkout');

    validate.addField('#ccf_firstname', [{ rule: 'required' }]);

    validate.addField('#ccf_email', [
      { rule: 'required' },
      { rule: 'email' }
    ]);

    // Phone is optional — only validate format when a value is present
    validate.addField('#ccf_phone', [
      {
        validator: function (value) {
          if (!value || value.trim() === '') return true;
          return validatePhoneShipping(value);
        },
        errorMessage: 'Please enter a valid phone number.'
      }
    ]);

    validate.addField('#ccf_state', [{ rule: 'required' }]);

    if (form === 'requestaquote') {
      validate.onSuccess(function () {
        isFormValidate_requestaquote = true;
      });
    }

    if (form === 'purchaseorder') {
      validate.addField('#ccf_company', [{ rule: 'required' }]);
      validate.onSuccess(function () {
        isFormValidate_purchaseorder = true;
      });
    }
  }

  initValidate('requestaquote');
  initValidate('purchaseorder');

  function validatePhoneShipping(number) {
    var landlineRegex = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
    var mobileRegex = /^04\d{8}$/;
    var specialNumberPattern = /^1300\d{6}$/;
    number = number.replace(/\s+/g, '').replace(/-/g, '');
    return landlineRegex.test(number) || mobileRegex.test(number) || specialNumberPattern.test(number);
  }

  function updateCheckoutForm() {
    var pageUrl = new URLSearchParams(window.location.search);
    var paymentOption = pageUrl.get('payment-option');

    if (!paymentOption) {
      var companyField = document.getElementById('ccf_company');
      if (companyField) {
        companyField.closest('.cro-field').remove();
      }
      return;
    }

    if (paymentOption === 'request-quote') {
      var companyField = document.getElementById('ccf_company');
      if (companyField) companyField.closest('.cro-field').remove();
    }

    if (paymentOption === 'request-purchase') {
      var form = document.getElementById('custom-checkout');
      if (form) {
        form.setAttribute('action', 'https://prnt.jasonl.com.au/contact/tradepurchase/tradepurchasehandler');
        var btn = form.querySelector('input[type="submit"]');
        if (btn) btn.setAttribute('value', 'Submit');
      }
    }
  }
  updateCheckoutForm();

  function eventTrigger(totalPrice, email, dataproducts) {
    var pageUrl = new URLSearchParams(window.location.search);
    var paymentOption = pageUrl.get('payment-option');
    window.dataLayer = window.dataLayer || [];

    var eventName = 'quoteEnquiry_form_submitted';
    var eventAction = 'Send Enquiry';
    if (paymentOption === 'request-purchase') {
      eventName = 'purchaseEnquiry_form_submitted';
      eventAction = 'Purchase Order Enquiry';
    }

    var productItems = [];
    dataproducts.products.forEach(function (p) {
      productItems.push({
        item_id: p.variant_id,
        item_name: p.title,
        item_category: p.item_category,
        price: parseFloat(p.price),
        quantity: parseInt(p.quantity)
      });
    });

    window.dataLayer.push({
      event: eventName,
      GA4_eventAction: eventAction,
      GA4_eventLabel: '$' + totalPrice,
      GA4_eventValue: totalPrice,
      value: totalPrice,
      page_location: window.location.href,
      page_type: 'product',
      ecommerce: {
        currency: 'AUD',
        value: totalPrice,
        items: productItems
      },
      enhanced_conversion_data: { email: email },
      user_data: {
        email: email,
        phone_number: dataproducts.phone
      }
    });
  }

  $(document).on('submit', '#custom-checkout', function (e) {
    e.preventDefault();

    var pageUrl = new URLSearchParams(window.location.search);
    var paymentOption = pageUrl.get('payment-option');

    if (!paymentOption || paymentOption === 'request-quote') {
      if (!isFormValidate_requestaquote) return false;
    }
    if (paymentOption === 'request-purchase') {
      if (!isFormValidate_purchaseorder) return false;
    }

    var quotegclid      = get_cookie('gclid')        || '';
    var quotefbclid     = get_cookie('fbclid')       || '';
    var quotemsclkid    = get_cookie('msclkid')      || '';
    var quoteutmsource  = get_cookie('utm_source')   || '';
    var quoteutmmedium  = get_cookie('utm_medium')   || '';
    var quoteutmcampaign = get_cookie('utm_campaign') || '';
    var quoteutmkeyword  = get_cookie('utm_keyword') || '';
    var quoteutmterm    = get_cookie('utm_term')     || '';
    var quoteutmcontent = get_cookie('utm_content')  || '';
    var quotedevice     = get_cookie('device')       || '';
    var ga_client_id    = get_cookie('ga_client_id') || '';

    var url = $(this).attr('action');
    var unique_key = Date.now();

    getCartProducts().then(function (cartData) {
      var dataproducts = {
        name:         $('#ccf_firstname').val(),
        email:        $('#ccf_email').val(),
        phone:        $('#ccf_phone').val(),
        state:        $('#ccf_state').val(),
        company:      $('#ccf_company').val(),
        enquiry:      $('#ccf_quote_enquiry').val(),
        unique_key:   unique_key,
        gclid:        quotegclid,
        fbclid:       quotefbclid,
        msclkid:      quotemsclkid,
        utm_source:   quoteutmsource,
        utm_medium:   quoteutmmedium,
        utm_campaign: quoteutmcampaign,
        utm_keyword:  quoteutmkeyword,
        utm_term:     quoteutmterm,
        utm_content:  quoteutmcontent,
        device:       quotedevice,
        ga_client_id: ga_client_id,
        products:     cartData
      };
      customCheckoutFormSubmit(url, dataproducts);
    });
  });

  async function getCartProducts() {
    try {
      var response = await fetch('/cart.js');
      var data = await response.json();
      var cartItems = data.items;
      var catli = document.querySelectorAll('.cart-products li');
      var prod_data = [];

      for (var i = 0; i < cartItems.length; i++) {
        prod_data.push({
          handle:        cartItems[i].handle,
          id:            cartItems[i].id,
          image:         cartItems[i].image,
          price:         cartItems[i].price / 100,
          quantity:      cartItems[i].quantity,
          title:         cartItems[i].product_title,
          total:         cartItems[i].line_price / 100,
          url:           cartItems[i].url,
          variant_id:    cartItems[i].variant_id,
          variant_sku:   cartItems[i].sku,
          variant_title: cartItems[i].variant_title,
          vendor:        cartItems[i].vendor,
          item_category: catli[i] ? catli[i].getAttribute('data_product_collection') : ''
        });
      }
      return prod_data;
    } catch (error) {
      console.error('CRO-12282: error fetching cart:', error);
      return [];
    }
  }

  function customCheckoutFormSubmit(url, dataproducts) {
    $.ajax({
      type: 'POST',
      url: url,
      data: dataproducts,
      dataType: 'html',
      beforeSend: function () {
        $('#send_quote').hide();
        var loader = document.createElement('div');
        loader.classList.add('loader');
        document.querySelector('.submit-btn-holder').appendChild(loader);
      },
      complete: function () {},
      success: function () {
        var totalQuotePrice = document
          .querySelector('strong[data-carttotal]')
          .getAttribute('data-carttotal');

        eventTrigger(totalQuotePrice, dataproducts.email, dataproducts);

        document.getElementById('form-firstname').innerHTML = dataproducts.name;
        localStorage.removeItem('minicart_checkout_option');
        document.getElementById('custom-checkout').reset();
        $('#custom-checkout-loading').hide();
        document.querySelector('.custom-checkout-main').remove();
        document.querySelector('.payment-thankyou-body').style.display = 'block';
      }
    });
  }
}
