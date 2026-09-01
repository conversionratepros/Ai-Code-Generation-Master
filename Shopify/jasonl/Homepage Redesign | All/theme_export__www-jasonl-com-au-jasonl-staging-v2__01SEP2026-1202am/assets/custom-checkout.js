
window.addEventListener('DOMContentLoaded',function () {
    document.querySelector('.mobile-order-summary').addEventListener('click', function(){
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.querySelector(".label").innerText = "Hide order summary";
    } else {
      this.querySelector(".label").innerText = "Show order summary";
    }
    document.querySelector(".cart-products").classList.toggle("active");
  });
});


var isFormValidate_requestaquote, isFormValidate_purchaseorder;
function initValidate(form) {
  isFormValidate_requestaquote = false;
  const validate = new window.JustValidate("#custom-checkout");

  validate.addField("#ccf_firstname", [
    {
      rule: "required",
    },
  ]);
  validate.addField("#ccf_email", [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ]);

  validate.addField("#ccf_phone", [
    {
      rule: "required",
    },
    {
      validator: (value, context) => {
        let t = validatePhoneShipping(value);
        if (t === true) {
          return true;
        }
        return false;
      },
      errorMessage: "Please enter valid phone number!",
    },
  ]);

  validate.addField("#ccf_state", [
    {
      rule: "required",
    },
  ]);

  if (form == "requestaquote") {
    validate.onSuccess((event) => {
      isFormValidate_requestaquote = true;
    });
  }

  if (form == "purchaseorder") {
    validate.onSuccess((event) => {
      isFormValidate_purchaseorder = true;
    });
    validate.addField("#ccf_company", [
      {
        rule: "required",
      },
    ]);
  }
}
initValidate("requestaquote");
initValidate("purchaseorder");

function validatePhoneShipping(number) {
  // Regular expression for Australian landline numbers
  //var landlineRegex = /^(?:\((0\d)\)|0\d)\s?\d{4}\s?\d{4}$/;
  var landlineRegex =
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
  // Regular expression for Australian mobile numbers
  var mobileRegex = /^04\d{8}$/;
  var specialNumberPattern = /^1300\d{6}$/;

  // Remove whitespace and hyphens from the number .replace("(","").replace(")","")
  number = number.replace(/\s+/g, "").replace(/-/g, "");

  // Check if the number matches either the landline or mobile regex
  return (
    landlineRegex.test(number) ||
    mobileRegex.test(number) ||
    specialNumberPattern.test(number)
  );
}

function updateCheckoutForm() {
  const pageUrl = new URLSearchParams(window.location.search);
  const paymentOption = pageUrl.get("payment-option");

  // remove company if payment option parameter is blank
  // this case could be because of accessing the page by direct URL
  if (!paymentOption) {
    if (document.getElementById("ccf_company")) {
      document.getElementById("ccf_company").parentNode.remove();
      return false;
    }
  }
  // remove company input field
  if (paymentOption == "request-quote") {
    const field = document.getElementById("ccf_company").parentElement;
    field.remove();
  }

  if (paymentOption == "request-purchase") {
    // update form post URL for purchase quote request
    //const updatedUrl = "https://poptopdesk.com/contact/tradepurchase/tradepurchasehandler";
    const updatedUrl =
      "https://prnt.jasonl.com.au/contact/tradepurchase/tradepurchasehandler";
    document
      .getElementById("custom-checkout")
      .setAttribute("action", updatedUrl);
    // update submit button label
    document
      .getElementById("custom-checkout")
      .querySelector('input[type="submit"]')
      .setAttribute("value", "Submit");
  }
}
updateCheckoutForm();

function eventTrigger(totalPrice, email, dataproducts) {
  const pageUrl = new URLSearchParams(window.location.search);
  const paymentOption = pageUrl.get("payment-option");
  window.dataLayer = window.dataLayer || [];
  let eventName = "quoteEnquiry_form_submitted";
  let eventAction = "Send Enquiry";

  if (paymentOption == "request-purchase") {
    eventName = "purchaseEnquiry_form_submitted";
    eventAction = "Purchase Order Enquiry";
  }
  // Google ads conversion, Enhanced conversion
  // below if commented on TUE 2 APr after asking Rajiv to make Google Ads Conversion functional for Purchase Order form submission
  // if (paymentOption != "request-purchase") {  }
    console.log(`${eventName}-${eventAction}-${totalPrice}-${email}`);

   
    console.log(dataproducts.products);

    let productItems = [];
    dataproducts.products.forEach(function(p){
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
      GA4_eventLabel: "$" + totalPrice,
      GA4_eventValue: totalPrice,
      value: totalPrice,
      page_location: window.location.href,
      page_type: 'product',
      ecommerce: {
          currency: 'AUD',
          value: totalPrice,
          items: productItems
        },
      enhanced_conversion_data: {
        email: email,
      },
      user_data: {
        email: email,        // raw email (GTM / GA4 handles hashing)
        phone_number: dataproducts.phone // raw phone number
      }
    });
  
}

$(document).on("submit", "#custom-checkout", function (e) {
  e.preventDefault();
  // validate form
  const pageUrl = new URLSearchParams(window.location.search);
  const paymentOption = pageUrl.get("payment-option");
  // remove company if payment option parameter is blank
  // this case could be because of accessing the page by direct URL
  console.log(isFormValidate_requestaquote);
  console.log(paymentOption);

  if (!paymentOption) {
    if (!isFormValidate_requestaquote) {
      return false;
    }
  }
  // remove company input field
  if (paymentOption == "request-quote") {
    if (!isFormValidate_requestaquote) {
      return false;
    }
  }

  if (paymentOption == "request-purchase") {
    if (!isFormValidate_purchaseorder) {
      return false;
    }
  }

  //set gclid for quote form
  var quotegclid = get_cookie("gclid");
  if (!quotegclid) {
    quotegclid = "";
  }

  var quotefbclid = get_cookie("fbclid");
  if (!quotefbclid) {
    quotefbclid = "";
  }

  var quotemsclkid = get_cookie("msclkid");
  if (!quotemsclkid) {
    quotemsclkid = "";
  }
  var quoteutmsource = get_cookie("utm_source");
  if (!quoteutmsource) {
    quoteutmsource = "";
  }
  var quoteutmmedium = get_cookie("utm_medium");
  if (!quoteutmmedium) {
    quoteutmmedium = "";
  }
  var quoteutmcampaign = get_cookie("utm_campaign");
  if (!quoteutmcampaign) {
    quoteutmcampaign = "";
  }
  var quoteutmkeyword = get_cookie("utm_keyword");
  if (!quoteutmkeyword) {
    quoteutmkeyword = "";
  }

  var quoteutmterm = get_cookie("utm_term");
  if (!quoteutmterm) {
    quoteutmterm = "";
  }
  var quoteutmcontent = get_cookie("utm_content");
  if (!quoteutmcontent) {
    quoteutmcontent = "";
  }
  var quotedevice = get_cookie("device");
  if (!quotedevice) {
    quotedevice = "";
  }
  var ga_client_id = get_cookie("ga_client_id");
  if (!ga_client_id) {
    ga_client_id = "";
  }

  //ends here
  var url = $(this).attr("action");
  var unique_key = Date.now();

  getCartProducts().then(cartData => {
    var dataproducts = {
      name: $("#ccf_firstname").val(),
      email: $("#ccf_email").val(),
      phone: $("#ccf_phone").val(),
      state: $("#ccf_state").val(),
      company: $("#ccf_company").val(),
      enquiry: $("#ccf_quote_enquiry").val(),
      unique_key: unique_key,
      gclid: quotegclid,
      fbclid: quotefbclid,
      msclkid: quotemsclkid,
      utm_source: quoteutmsource,
      utm_medium: quoteutmmedium,
      utm_campaign: quoteutmcampaign,
      utm_keyword: quoteutmkeyword,
      utm_term: quoteutmterm,
      utm_content: quoteutmcontent,
      device: quotedevice,
      ga_client_id: ga_client_id,
      //products: get_cookie("product_list"),
      products: cartData
    };
    console.log(dataproducts);
    
    customCheckoutFormSubmit(url, dataproducts);
  });


 


});





  async function getCartProducts() {
    try {
      let response = await fetch('/cart.js');
      let data = await response.json();
      
      let cartItems = data.items;
      let prod_data = [];

      let catli = document.querySelectorAll('.cart-products li');

      for (let i = 0; i < cartItems.length; i++) {
        prod_data.push({
          handle: cartItems[i].handle,
          id: cartItems[i].id,
          image: cartItems[i].image,
          price: cartItems[i].price/100,
          quantity: cartItems[i].quantity,
          title: cartItems[i].product_title,
          total: cartItems[i].line_price/100,
          url: cartItems[i].url,
          variant_id: cartItems[i].variant_id,
          variant_sku: cartItems[i].sku,
          variant_title: cartItems[i].variant_title,
          vendor: cartItems[i].vendor,
          item_category : catli[i].getAttribute('data_product_collection')
        });
      }
      return prod_data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  }


function customCheckoutFormSubmit(url, dataproducts){
  $.ajax({
    type: "POST",
    url: url,
    data: dataproducts,
    dataType: "html",
    beforeSend: function () {
      $("#send_quote").hide();
      const node = document.createElement("div");
      node.classList.add("loader");
      document.querySelector(".submit-btn-holder").appendChild(node);
    },
    complete: function (data) {
      console.log('form submit completed.')
    },
      success: function (data) {
      let totalQuotePrice = document
        .querySelector("strong[data-carttotal]")
        .getAttribute("data-carttotal");

      // event
      eventTrigger(totalQuotePrice, dataproducts.email, dataproducts);
      document.getElementById("form-firstname").innerHTML = dataproducts.name;
      localStorage.removeItem("minicart_checkout_option");
      document.getElementById("custom-checkout").reset();
      $("#custom-checkout-loading").hide();
      document.querySelector(".custom-checkout-main").remove();
      document.querySelector(".payment-thankyou-body").style.display = "block";
      setTimeout(function () {
        $(".label-holder").removeClass("active");
      }, 12000);
    },
  });
}

//function resetCookie(){
/* var resetgclid = '';
set_cookie('gclid', resetgclid);
set_cookie('msclkid', resetgclid);
set_cookie('utm_source', resetgclid);
set_cookie('utm_medium', resetgclid);
set_cookie('utm_campaign', resetgclid);
set_cookie('utm_keyword', resetgclid);
set_cookie('utm_term', resetgclid);
set_cookie('utm_content', resetgclid);
set_cookie('device', resetgclid);*/
//}


/*
function getCartProducts_backups(){
  let cartContents = fetch('/cart.js')
  .then(response => response.json())
  .then(data => { 
    let cartItems = data.items;
    let prod_data = [];
    for(let i = 0; i < cartItems.length; i++){
      prod_data.push({
        handle : cartItems[i].handle,
        id:cartItems[i].id,
        image:cartItems[i].image,
        price:cartItems[i].price/100,
        quantity:cartItems[i].quantity,
        title:cartItems[i].product_title,
        total:cartItems[i].line_price/100,
        url:cartItems[i].url,
        variant_id:cartItems[i].variant_id,
        variant_sku:cartItems[i].sku,
        variant_title:cartItems[i].variant_title,
        vendor:cartItems[i].vendor
      });
    }
    return prod_data;
  });
}
*/
