
if (get_cookie('product_list') != null) {
  var products = get_cookie('product_list');
} else {
  var products = [];
}

function set_cookie(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function get_cookie(name) {
  var retrievedObject = localStorage.getItem(name);
  return JSON.parse(retrievedObject);
}

function delete_item_from_localstorage(name) {
  localStorage.removeItem(name);
}
// not in use. Because it is cookie. Localstorage has been used in development
function delete_cookie(name) {
  document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
  // console.log(name+' cookied deleted');
}

function ReplaceNumberWithCommas(yourNumber) {
  var components = yourNumber.toString().split(".");
  components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return components.join(".");
}

// hidden email
function handleHiddenEmail() {
  let holders = document.querySelectorAll('.hiddenemail');
  holders.forEach((holder) => {
    let user = holder.dataset.user;
    let domain = holder.dataset.domain;
    //holder.outerHTML = `<a datafile="jshomepage" href="maileto:">${user}[ AT ]${domain}</a>`;
    holder.addEventListener("click", function () {
      this.setAttribute('href', `mailto:${user}@${domain}`);
    });
  })
}
handleHiddenEmail();

  function onLoadhandleHiddenEmail() {
    const holders = document.querySelectorAll('.hiddenemail');
    holders.forEach((holder) => {
      const user = holder.dataset.user;
      const domain = holder.dataset.domain;

      if (user && domain) {
        holder.setAttribute('href', `mailto:${user}@${domain}`);
      }
    });
  }
  
  //  initDropDownStoreLocator();
   document.addEventListener('DOMContentLoaded',   onLoadhandleHiddenEmail);

function isEmail(email) {
  //console.log(123);
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function validatePhone(txtPhone){
  var filter = /^[0-9-+]+$/;
  if (filter.test(txtPhone)) {
      return true;
  }
  else {
      return false;
  }
}
 

$(document).on('submit', '#request_purchase', function (e) {
  e.preventDefault();
  var response = grecaptcha.getResponse();
  //console.log(response);
  if (response) {

    var gclidval1 = get_cookie('gclid');
    var fbclidval1 = get_cookie('fbclid');
    var msclkidval1 = get_cookie('msclkid');
    var utm_source1 = get_cookie('utm_source');
    var utm_medium1 = get_cookie('utm_medium');
    var utm_campaign1 = get_cookie('utm_campaign');
    var utm_keyword1 = get_cookie('utm_keyword');
    var utm_term1 = get_cookie('utm_term');
    var utm_content1 = get_cookie('utm_content');
    var device1 = get_cookie('device');
    var ga_client_id1 = get_cookie('ga_client_id');

    if (!gclidval1) { gclidval1 = ''; }
    if (!fbclidval1) { fbclidval1 = ''; }
    if (!msclkidval1) { msclkidval1 = ''; }
    if (!utm_source1) { utm_source1 = ''; }
    if (!utm_medium1) { utm_medium1 = ''; }
    if (!utm_campaign1) { utm_campaign1 = ''; }
    if (!utm_keyword1) { utm_keyword1 = ''; }
    if (!utm_term1) { utm_term1 = ''; }
    if (!utm_content1) { utm_content1 = ''; }
    if (!device1) { device1 = ''; }
    if (!ga_client_id1) { ga_client_id1 = ''; }

    //Request to purchase form validation
    var errormsg = '', cname = $('#cname'), cemail = $('#cemail'), cphone = $('#cphone'), cstate = $('#cstate'), form = $('#request_purchase');
    if (cname.val() == '') {
      errormsg += "<strong>Error!</strong> Name is required.<br/>";
    }
    if (cstate.val() == '') {
      errormsg += "<strong>Error!</strong> State is required.<br/>";
    }

    if (cemail.val() == '') {
      errormsg += "<strong>Error!</strong> Email is required.<br/>";
    } else {
      if (!isEmail(cemail.val())) {
        errormsg += "<strong>Error!</strong> Invalid email<br/>";
      }
    }
    if (cphone.val() == '') {
      errormsg += "<strong>Error!</strong> Phone is required.";
    } else {
      // if (!validatePhone(cphone.val())) {
      //   errormsg += "<strong>Error!</strong> Invalid Phone number.";
      // }
    }
    if (errormsg != '') {
      errormsg = '<div class="alert alert-danger"> ' + errormsg + '</div>';
      form.find('legend').html(errormsg);
      return false;
    } else {
      form.find('legend').html('');

      //End of form validation

      var url = $(this).attr('action');
      var unique_key = Date.now();
      //var variant_id = $('#productSelect').find(":selected").val();  
      var variant_id = $('#backorder-variant-id').val() || $('.product-form input[name="id"]').val();
      //var quantity = $('#Quantity').val();
      //var quantity = $('.quantity-selector').val(); 
      var quantity = $('.product-form__quantity .quantity__input').val();
      //console.log('quantity: '+quantity);
      var selectedvalues = '';
      //  jQuery('.selector-wrapper').each(function(){
      //    selectedvalues += '<strong>'+jQuery(this).find('label').text()+'</strong> : '+
      //  jQuery(this).find('select').val()+'<br/>';
      //  });
      jQuery('.option-item-holder').each(function () {
        if (jQuery(this).find('input[type="radio"]:checked').length > 0) {
          selectedvalues += '<strong>' + jQuery(this).find('input[type="radio"]:checked').attr('name') + '</strong> : ' +
            jQuery(this).find('input[type="radio"]:checked').val() + '<br/>';
        }
      });
      //var productimage = '';
      //  if(jQuery('.product-gallery').find('a.slick-slide.slick-active img').length){
      //    productimage = jQuery('.product-gallery').find('a.slick-slide.slick-active img').attr('src')
      //  }else{
      //    productimage = jQuery('.product-gallery').find('a.slick-slide:first-child img').attr('src')
      //  }
      // var productimage = jQuery('.product__media-list li:first-child .product__media img').attr('src');
      var productimage = jQuery('.swiper-container.main-slider .swiper-slide.swiper-slide-active img').attr('src');
      if(!productimage){
        productimage = jQuery('.swiper-container.main-slider .swiper-slide:first-child img').attr('src');
      }
      var productprice = parseInt(jQuery('.product__info-wrapper .price-item--regular').text().replace('$', '').replace(',', ''));
      //console.log('price: '+productprice);
      var subtotal = quantity * productprice;
      // var product_url = window.location.href;
      var product_url =  $('#request_purchase input[name="product_url"]').attr('value') + '?variant=' + variant_id;
   
      let dataProducts = {
        name: $('#cname').val(),
        email: $('#cemail').val(),
        phone: $('#cphone').val(),
        state: $('#cstate').val(),
        productname: $('#cproduct').val(),
        product_category: $('#cproduct_category').val(),
        productimage: productimage,
        quantity: quantity,
        subtotal: subtotal,
        selectedvalues: selectedvalues,
        unique_key: unique_key,
        variant_id: variant_id,
        gclid: gclidval1,
        fbclid: fbclidval1,
        msclkid: msclkidval1,
        utm_source: utm_source1,
        utm_medium: utm_medium1,
        utm_campaign: utm_campaign1,
        utm_keyword: utm_keyword1,
        utm_term: utm_term1,
        utm_content: utm_content1,
        device: device1,
        ga_client_id: ga_client_id1,
        product_url: product_url,
        grecaptcha_response: response
      };

      // console.log(dataProducts);
      // return;

      $.ajax({
        type: "POST",
        url: url,
        data: dataProducts,
        dataType: "html",
        beforeSend: function () {
          $('button.submitforpurchase').html('Please wait');
        },
        complete: function (data) {

          let productUrl = window.location.pathname;

          /*
          product contact old event connected to Google ads hence new is event from Tharone is disabled. Old event continues with new parameters
          fri 6 mar 2026
          ------------------
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'contactPurchase_form_submitted',
            'GA4_eventAction': productUrl,
            'GA4_eventValue': subtotal,
            'enhanced_conversion_data': {
              "email": dataProducts.email
            }
          });
          */

          // Request back order datalayer
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'request_backorder',
            currency: 'AUD',
            value: subtotal,
            page_location: window.location.href,
            page_type: 'product',
            enhanced_conversion_data: {
              "email": dataProducts.email
            },
            items: [
              {
                item_id: dataProducts.variant_id,
                item_name: dataProducts.productname,
                item_category: dataProducts.product_category,
                price: dataProducts.subtotal,
                quantity: 1
              }
            ],
            user_data: {
              email: dataProducts.email,        // raw email (GTM / GA4 handles hashing)
              phone_number: dataProducts.phone // raw phone number
            }
          });

          var success_message = '<div class="alert alert-success"><strong>Success!</strong> Thank you for your inquiry, we will be in touch shortly. In the meantime, please feel free to call us on <strong>1300 527 665</strong></div>';
          $('.modal-body .legend').html(success_message);
          document.getElementById("request_purchase").reset();
          if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
          }
          // document.getElementById("contact-purchase-form").reset();
          setTimeout(function () {
            $('button.submitforpurchase').html('Submit');
            $('.modal-body .legend').html('');
            document.querySelector('#contact-purchase-form .btn[data-dismiss="modal"]').click();
          }, 3000)

        },
        error: function (data) {
          console.log('error');
        }
      });
    }
    $('#re-captcha label.error').remove();
  } else {
    $('#re-captcha').append('<label class="error">Please complete the reCaptcha.</label>')
  };
});
















jQuery(document).ready(function () {
  var gclidval = get_cookie('gclid');
  var fbclidval = get_cookie('fbclid');
  var msclkidval = get_cookie('msclkid');

  var utm_source = get_cookie('utm_source');
  var utm_medium = get_cookie('utm_medium');
  var utm_campaign = get_cookie('utm_campaign');
  var utm_keyword = get_cookie('utm_keyword');
  var utm_term = get_cookie('utm_term');
  var utm_content = get_cookie('utm_content');
  var device = get_cookie('device');
  var ga_client_id = get_cookie('ga_client_id');
  var page = window.location.href.split('?')[0];

  var parameterurl = '';
  if (gclidval) {
    if (parameterurl) { parameterurl += ',gclid=' + gclidval; }
    else { parameterurl += 'gclid=' + gclidval; }
  }
  if (fbclidval) {
    if (parameterurl) { parameterurl += ',fbclid=' + fbclidval; }
    else { parameterurl += 'fbclid=' + fbclidval; }
  }
  if (msclkidval) {
    if (parameterurl) { parameterurl += ',msclkid=' + msclkidval; }
    else { parameterurl += 'msclkid=' + msclkidval; }
  }
  if (utm_source) {
    if (parameterurl) { parameterurl += ',utm_source=' + utm_source; }
    else { parameterurl += 'utm_source=' + utm_source; }
  }
  if (utm_medium) {
    if (parameterurl) { parameterurl += ',utm_medium=' + utm_medium; }
    else { parameterurl += 'utm_medium=' + utm_medium; }
  }
  if (utm_campaign) {
    if (parameterurl) { parameterurl += ',utm_campaign=' + utm_campaign; }
    else { parameterurl += 'utm_campaign=' + utm_campaign; }
  }
  if (utm_keyword) {
    if (parameterurl) { parameterurl += ',utm_keyword=' + utm_keyword; }
    else { parameterurl += 'utm_keyword=' + utm_keyword; }
  }
  if (utm_term) {
    if (parameterurl) { parameterurl += ',utm_term=' + utm_term; }
    else { parameterurl += 'utm_term=' + utm_term; }
  }
  if (utm_content) {
    if (parameterurl) { parameterurl += ',utm_content=' + utm_content; }
    else { parameterurl += 'utm_content=' + utm_content; }
  }
  if (page) {
    if (parameterurl) { parameterurl += ',page=' + page; }
    else { parameterurl += 'page=' + page; }
  }
  if (device) {
    if (parameterurl) { parameterurl += ',device=' + device; }
    else { parameterurl += 'device=' + device; }
  }
  if (ga_client_id) {
    if (parameterurl) { parameterurl += ',ga_client_id=' + ga_client_id; }
    else { parameterurl += 'ga_client_id=' + ga_client_id; }
  }


  const typeformlisting = document.querySelectorAll('.typeform-share');
  if (typeformlisting) {
    if (!parameterurl) { parameterurl = ''; }
    typeformlisting.forEach(function (typeformbutton) {
      typeformbutton.setAttribute('data-tf-hidden', parameterurl);
    });
  }
  /* 
  2/18/2026 
  removed set attribute in data-tf-hidden on hover no need due to : 
  replace injected js div with static a tag 
  // Added typefrom hidden parameter for typeform in contact page which is in wrap. So added separate code for that
  const typeformBtnWrap = document.querySelectorAll('.typeform-share-wrap');
  typeformBtnWrap.forEach(function(tfWrap){
    tfWrap.addEventListener('mouseenter', function(){
      const typeformBtn = tfWrap.querySelectorAll('button[data-tf-hidden]');
      if(typeformBtn.length > 0){
        typeformBtn.forEach(function(btn){
          btn.setAttribute('data-tf-hidden', parameterurl);
        });
      }
    });
  }); */

  // Only for contact Page
  /* 
  2/18/2026 
  During the modification of GA4 datalayer push we added iframe using new code from typefrom which already added needed parameter, so this code is not needed.
  var counter = 1;
  if (jQuery('#contactpage-contact-typeform').length) {
    var checkIframeLoadedInterval = setInterval(checkIframeLoaded, 500);
  }

  function checkIframeLoaded() {
    if (jQuery('#contactpage-contact-typeform iframe').length) {
      var iframevalue = jQuery('#contactpage-contact-typeform iframe')[0].getAttribute("src");
      if (iframevalue.indexOf('jsnl.typeform.com') > -1) {
        if (iframevalue.indexOf('?') > -1) {
          var remove_after = iframevalue.indexOf('?');
          var finalurl = iframevalue.substring(0, remove_after);
          var updateurlvalue = finalurl + '?' + parameterurl;
        }
        else {
          var updateurlvalue = iframevalue + '?' + parameterurl;
        }
      }

      jQuery('#contactpage-contact-typeform iframe')[0].setAttribute("src", updateurlvalue);
      clearInterval(checkIframeLoadedInterval);
    }

    counter = counter + 1;
    if (counter > 10) { clearInterval(checkIframeLoadedInterval); }
  } */

  // typeform external library
  // embed.typeform.com/next/embed.js
  // Let all necessary content for typeforms render first. Then, render the library like below
  (function () { var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName, id = "typef_orm_share", b = "https://embed.typeform.com/next/"; if (!gi.call(d, id)) { js = ce.call(d, "script"); js.id = id; js.src = b + "embed.js"; q = gt.call(d, "script")[0]; q.parentNode.insertBefore(js, q) } })()

});