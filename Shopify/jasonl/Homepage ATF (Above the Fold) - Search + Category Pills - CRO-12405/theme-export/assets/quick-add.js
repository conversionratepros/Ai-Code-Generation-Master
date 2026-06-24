if (!customElements.get('quick-add-modal')) {
  customElements.define(
    'quick-add-modal',
    class QuickAddModal extends ModalDialog {
      constructor() {
        super();
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');

        this.addEventListener('product-info:loaded', ({ target }) => {
          target.addPreProcessCallback(this.preprocessHTML.bind(this));
        });
      }

      hide(preventFocus = false) {
        const cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = '';

        if (preventFocus) this.openedBy = null;
        super.hide();
      }

      show(opener) {
        opener.setAttribute('aria-disabled', true);
        opener.classList.add('loading');
        opener.querySelector('.loading__spinner').classList.remove('hidden');

        fetch(opener.getAttribute('data-product-url'))
          .then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            const productElement = responseHTML.querySelector('product-info');

            this.preprocessHTML(productElement);
            HTMLUpdateUtility.setInnerHTML(this.modalContent, productElement.outerHTML);

            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }
            if (window.ProductModel) window.ProductModel.loadShopifyXR();

            super.show(opener);
          })
          .finally(() => {
            opener.removeAttribute('aria-disabled');
            opener.classList.remove('loading');
            opener.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      preprocessHTML(productElement) {
        productElement.classList.forEach((classApplied) => {
          if (classApplied.startsWith('color-') || classApplied === 'gradient')
            this.modalContent.classList.add(classApplied);
        });
        this.preventDuplicatedIDs(productElement);
        this.removeDOMElements(productElement);
        this.removeGalleryListSemantic(productElement);
        this.updateImageSizes(productElement);
        this.preventVariantURLSwitching(productElement);
        // this.locationwise_product_check_availability(productElement);
        this.copySkuOnQuickView();
        
        // Update delivery dates in quick view
        const deliveryDateElements = productElement.querySelectorAll('.delivery-date');
        if (deliveryDateElements.length > 0) {
          const deliveryDaysElement = productElement.querySelector('[data-delivery-days]');
          if (deliveryDaysElement) {
            const deliveryDays = parseInt(deliveryDaysElement.dataset.deliveryDays);
            
            // Use the global function if available
            if (typeof window.updateAllDeliveryDates === 'function') {
              window.updateAllDeliveryDates(deliveryDays);
            } else if (typeof window.calcWeekend === 'function') {
              // Fallback to direct calculation if updateAllDeliveryDates is not available
              deliveryDateElements.forEach(element => {
                window.calcWeekend(element, deliveryDays);
              });
            }
          }
        }
      }

      preventVariantURLSwitching(productElement) {
        productElement.setAttribute('data-update-url', 'false');
      }

      removeDOMElements(productElement) {
        const pickupAvailability = productElement.querySelector('pickup-availability');
        if (pickupAvailability) pickupAvailability.remove();

        const productModal = productElement.querySelector('product-modal');
        if (productModal) productModal.remove();

        const modalDialog = productElement.querySelectorAll('modal-dialog');
        if (modalDialog) modalDialog.forEach((modal) => modal.remove());

      }

      preventDuplicatedIDs(productElement) {
        const sectionId = productElement.dataset.section;

        const oldId = sectionId;
        const newId = `quickadd-${sectionId}`;
        productElement.innerHTML = productElement.innerHTML.replaceAll(oldId, newId);
        Array.from(productElement.attributes).forEach((attribute) => {
          if (attribute.value.includes(oldId)) {
            productElement.setAttribute(attribute.name, attribute.value.replace(oldId, newId));
          }
        });

        productElement.dataset.originalSection = sectionId;
      }

      removeGalleryListSemantic(productElement) {
        const galleryList = productElement.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) return;

        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach((li) => li.setAttribute('role', 'presentation'));
      }

      updateImageSizes(productElement) {
        const product = productElement.querySelector('.product');
        const desktopColumns = product?.classList.contains('product--columns');
        if (!desktopColumns) return;

        const mediaImages = product.querySelectorAll('.product__media img');
        if (!mediaImages.length) return;

        let mediaImageSizes =
          '(min-width: 1000px) 715px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)';

        if (product.classList.contains('product--medium')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '605px');
        } else if (product.classList.contains('product--small')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '495px');
        }

        mediaImages.forEach((img) => img.setAttribute('sizes', mediaImageSizes));
      }

      /* custom */
       locationwise_product_check_availability(productElement){
        const prod_id = productElement.getAttribute('data-product-id');
        let region_data_Code;
       
         if(localStorage.getItem('region')){
             let region_data = JSON.parse(localStorage.getItem('region'));
              region_data_Code = region_data.code;
         }
         
           if(region_data_Code != 'WA' ){
               region_data_Code = 'NSW';
           }
           const ele_id = `page-load-info-${prod_id}`;
           console.log(ele_id);
           console.log(productElement);
           console.log(document.getElementById(ele_id));
           return;
          const onLoadData = productElement.querySelector(ele_id);
          console.log(onLoadData);
          let items = onLoadData.querySelectorAll('.item');
     
          let isLocationFound = false;
         if(items.length > 0){
             // if location wise stocks are managed in shopify
             for(let i=0; i<items.length; i++){
               if(items[i].querySelector('.onloadLocationCode').innerText == region_data_Code){
                 isLocationFound = true;
                 //console.log(items[i].querySelector('.onloadavailable').innerText);
                 productElement.querySelector('.product-form .product-form__buttons').classList.remove('loading');
                 if(!productElement.querySelector('.product-form .product-form__buttons').classList.contains('contact-to-purchase-buttons')){
                    if(items[i].querySelector('.onloadavailable').innerText == 'true'){
                      productElement.querySelector('.product-form .product-form__buttons').classList.add('buynow-show');
                    }else{
                      productElement.querySelector('.product-form .product-form__buttons').classList.add('preorder-show');
                    }
                 }
                 break;
               }
             }
         }
           // if location wise stocks are not managed in shopify
     
          if(items.length < 1 ){
            productElement.querySelector('.product-form .product-form__buttons').classList.remove('loading');
            if(!productElement.querySelector('.product-form .product-form__buttons').classList.contains('contact-to-purchase-buttons')){
            productElement.querySelector('.product-form .product-form__buttons').classList.add('buynow-show');
            productElement.querySelector('.product-form .product-form__buttons').classList.remove('preorder-show');
            }
           return;
          }
           // when the user location is 'wa' but the product stock is not set for 'wa'
           // this means this product is just for NSW not for WA. so it is set to 'back-order'
          if(items.length > 0 && isLocationFound == false){
            productElement.querySelector('.product-form .product-form__buttons').classList.remove('loading');
            if(!productElement.querySelector('.product-form .product-form__buttons').classList.contains('contact-to-purchase-buttons')){
            productElement.querySelector('.product-form .product-form__buttons').classList.add('preorder-show');
            productElement.querySelector('.product-form .product-form__buttons').classList.remove('buynow-show');
            }
           return;
          }
          
     
       
     }


    copySkuOnQuickView(){
    setTimeout(() => {
        var cpysku = document.querySelectorAll('.linkcpyicon');
        for (let i = 0; i < cpysku.length; i++) {
          cpysku[i].addEventListener('click', function () {
              const sku = this.getAttribute('title');
              navigator.clipboard.writeText(sku).then(() => {
                // add class copyed 
                  this.classList.add("copied");
                  setTimeout(() => {
                    this.classList.remove("copied");
                  }, 1000);
              });
          });
        }
      },400);
  }





    }
  );
}

// quick add modal sku availability starts here

(function() {

  // Util: get currently selected variant ID from product-info
  function getSelectedVariantId(productInfo) {
    const variantInput = productInfo.querySelector('input[name="id"]');
    return variantInput ? variantInput.value : null;
  }

  // Render SKU/qty info for a single variant/location
  function renderSkuAvailabilityAllRegions(data, variantId) {
    let html = '';
    let found = false;
    let sku = '';
    let nswQty = null;
    let waQty = null;
    let variantTitle = '';
    // Try to get variant title from the DOM (improved for fieldset/legend)
    const variantInput = document.querySelector(`product-info input[name='id'][value='${variantId}']`);
    if (variantInput) {
      variantTitle = variantInput.getAttribute('data-variant-title') || '';
      if (!variantTitle) {
        const variantSelects = variantInput.closest('product-info')?.querySelector('variant-selects');
        if (variantSelects) {
          const legends = Array.from(variantSelects.querySelectorAll('fieldset.active legend'));
          if (legends.length > 0) {
            variantTitle = legends.map(l => {
              const strong = l.querySelector('span strong');
              return strong ? strong.textContent.trim() : '';
            }).filter(Boolean).join(' / ');
          }
        }
      }
      if (!variantTitle) {
        const label = variantInput.closest('form')?.querySelector('.product__sku, .item-title, .variant-title, .variant__label');
        if (label) {
          variantTitle = label.textContent.trim();
        }
      }
    }
    if (!variantTitle && data && data.length) {
      const foundItem = data.find(item => String(item.variant_id) === String(variantId));
      if (foundItem && foundItem.variant_title) {
        variantTitle = foundItem.variant_title;
      }
    }
    data.forEach(item => {
      if (String(item.variant_id) === String(variantId)) {
        found = true;
        sku = item.sku;
        if (item.location_id == '27868748') {
          nswQty = item.quantities > 100 ? 100 : item.quantities;
        } else if (item.location_id == '98769961248') {
          waQty = item.quantities > 100 ? 100 : item.quantities;
        }
        if (!variantTitle && item.variant_title) {
          variantTitle = item.variant_title;
        }
      }
    });
    if (found) {
      html += `<div class="sku-varient-availability-row-wrap"><div class=\"sku-availability-row\"><span class=\"sku-label\" data-sku=\"${sku}\"><strong>SKU:</strong> ${sku}</span></div>`;
      if (variantTitle) {
        html += `<div class=\"sku-availability-row\"><span class=\"variant-label\"><strong>Variant:</strong> ${variantTitle}</span></div></div>`;
      }else{
        html += `</div>`;
      }
      html += `<div class=\"sku-availability-row\">
        ${nswQty !== null ? `<span class=\\\"qty-label\\\"><strong>NSW Qty:</strong> ${nswQty}</span>` : ''}
        ${waQty !== null ? `<span class=\\\"qty-label\\\" style=\\\"margin-left:1.5em\\\"><strong>WA Qty:</strong> ${waQty}</span>` : ''}
      </div>`;

    } else {
      html = `<div class=\"sku-availability-row\">No SKU data for this variant.</div>`;
    }
    return html;
  }


  

  function setupSkuAvailability(productInfo) {
    const block = productInfo.querySelector('#sku-availability-block');
    if (!block) return;
    // Remove toggle button if present (reset)
    let btn = block.querySelector('#sku-availability-toggle');
    if (btn) btn.remove();
    const content = block.querySelector('#sku-availability-content');
    const loader = block.querySelector('.sku-availability-loader');
    const productId = block.getAttribute('data-product-id');
    let fetchedData = null;
    let wasOpen = false; // Track if SKU content was open

    // Create the SKU toggle button
    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'sku-availability-toggle';
    btn.textContent = 'SKU';
    block.insertBefore(btn, content);

    // Hide content by default
    content.style.display = 'none';

    function updateContent() {
      if (!fetchedData) return;
      const variantId = getSelectedVariantId(productInfo);
      content.innerHTML = renderSkuAvailabilityAllRegions(fetchedData, variantId);
    }

    btn.addEventListener('click', function() {
      if (content.style.display === 'block') {
        content.style.display = 'none';
        wasOpen = false;
        return;
      }
      // If not fetched, show loader and fetch
      if (!fetchedData) {
        loader.style.display = 'block';
        content.style.display = 'block';
        fetch('https://prnt.jasonl.com.au/location/Quantity', {
          method: 'POST',
          body: productId,
          headers: { 'Content-Type': 'text/plain' }
        })
        .then(res => res.json())
        .then(json => {
          fetchedData = json;
          updateContent();
        })
        .catch(() => {
          content.innerHTML = '<div class="sku-availability-row">Failed to load SKU data.</div>';
        })
        .finally(() => {
          loader.style.display = 'none';
        });
      } else {
        updateContent();
        content.style.display = 'block';
      }
      wasOpen = true;
    });

    // Listen for variant changes in the modal
    productInfo.addEventListener('change', function(e) {
      if (e.target.name === 'id') {
        if (wasOpen) {
          // If open before, keep open and update content
          updateContent();
          content.style.display = 'block';
        } else {
          // If closed before, keep closed
          content.style.display = 'none';
        }
      }
      if (e.target.name === 'id' && fetchedData) {
        updateContent();
      }
    });
  }

  // Attach to quick-add modal product-info after HTML is injected
  document.addEventListener('product-info:loaded', function(e) {
    setupSkuAvailability(e.target);
  });

  document.querySelectorAll('product-info').forEach(setupSkuAvailability);
})();

// Quick Add Modal SKU Availability functionality ends here
