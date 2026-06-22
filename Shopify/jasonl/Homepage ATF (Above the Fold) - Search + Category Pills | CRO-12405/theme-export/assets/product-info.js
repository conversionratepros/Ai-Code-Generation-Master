if (!customElements.get('product-info')) {
  customElements.define(
    'product-info',
    class ProductInfo extends HTMLElement {
      quantityInput = undefined;
      quantityForm = undefined;
      onVariantChangeUnsubscriber = undefined;
      cartUpdateUnsubscriber = undefined;
      abortController = undefined;
      pendingRequestUrl = null;
      preProcessHtmlCallbacks = [];
      postProcessHtmlCallbacks = [];

      constructor() {
        super();

        this.quantityInput = this.querySelector('.quantity__input');
      }

      connectedCallback() {
        this.initializeProductSwapUtility();

        this.onVariantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.optionValueSelectionChange,
          this.handleOptionValueChange.bind(this)
        );

        this.initQuantityHandlers();
        this.dispatchEvent(new CustomEvent('product-info:loaded', { bubbles: true }));
      }

      addPreProcessCallback(callback) {
        this.preProcessHtmlCallbacks.push(callback);
      }

      initQuantityHandlers() {
        if (!this.quantityInput) return;

        this.quantityForm = this.querySelector('.product-form__quantity');
        if (!this.quantityForm) return;

        this.setQuantityBoundries();
        if (!this.dataset.originalSection) {
          this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, this.fetchQuantityRules.bind(this));
        }
      }

      disconnectedCallback() {
        this.onVariantChangeUnsubscriber();
        this.cartUpdateUnsubscriber?.();
      }

      initializeProductSwapUtility() {
        this.preProcessHtmlCallbacks.push((html) =>
          html.querySelectorAll('.scroll-trigger').forEach((element) => element.classList.add('scroll-trigger--cancel'))
        );
        this.postProcessHtmlCallbacks.push((newNode) => {
          window?.Shopify?.PaymentButton?.init();
          window?.ProductModel?.loadShopifyXR();
        });
      }

      handleOptionValueChange({ data: { event, target, selectedOptionValues } }) {
        if (!this.contains(event.target)) return;

        this.resetProductFormState();

        const productUrl = target.dataset.productUrl || this.pendingRequestUrl || this.dataset.url;
        this.pendingRequestUrl = productUrl;
        const shouldSwapProduct = this.dataset.url !== productUrl;
        const shouldFetchFullPage = this.dataset.updateUrl === 'true' && shouldSwapProduct;

        this.renderProductInfo({
          requestUrl: this.buildRequestUrlWithParams(productUrl, selectedOptionValues, shouldFetchFullPage),
          targetId: target.id,
          callback: shouldSwapProduct
            ? this.handleSwapProduct(productUrl, shouldFetchFullPage)
            : this.handleUpdateProductInfo(productUrl),
        });
      }

      resetProductFormState() {
        const productForm = this.productForm;
        productForm?.toggleSubmitButton(true);
        productForm?.handleErrorMessage();
      }

      handleSwapProduct(productUrl, updateFullPage) {
        return (html) => {
          this.productModal?.remove();

          const selector = updateFullPage ? "product-info[id^='MainProduct']" : 'product-info';
          const variant = this.getSelectedVariant(html.querySelector(selector));
          this.updateURL(productUrl, variant?.id);

          if (updateFullPage) {
            document.querySelector('head title').innerHTML = html.querySelector('head title').innerHTML;

            HTMLUpdateUtility.viewTransition(
              document.querySelector('main'),
              html.querySelector('main'),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          } else {
            HTMLUpdateUtility.viewTransition(
              this,
              html.querySelector('product-info'),
              this.preProcessHtmlCallbacks,
              this.postProcessHtmlCallbacks
            );
          }
        };
      }

      renderProductInfo({ requestUrl, targetId, callback }) {
        this.abortController?.abort();
        this.abortController = new AbortController();

        fetch(requestUrl, { signal: this.abortController.signal })
          .then((response) => response.text())
          .then((responseText) => {
            this.pendingRequestUrl = null;
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            callback(html);
          })
          .then(() => {
            // set focus to last clicked option value
            document.querySelector(`#${targetId}`)?.focus();
          })
          .catch((error) => {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted by user');
            } else {
              console.error(error);
            }
          });
      }

      getSelectedVariant(productInfoNode) {
        const selectedVariant = productInfoNode.querySelector('variant-selects [data-selected-variant]')?.innerHTML;
        return !!selectedVariant ? JSON.parse(selectedVariant) : null;
      }

      buildRequestUrlWithParams(url, optionValues, shouldFetchFullPage = false) {
        const params = [];

        !shouldFetchFullPage && params.push(`section_id=${this.sectionId}`);

        if (optionValues.length) {
          params.push(`option_values=${optionValues.join(',')}`);
        }

        return `${url}?${params.join('&')}`;
      }

      updateOptionValues(html) {
        const variantSelects = html.querySelector('variant-selects');
        if (variantSelects) {
          HTMLUpdateUtility.viewTransition(this.variantSelectors, variantSelects, this.preProcessHtmlCallbacks);
        }
      }

      handleUpdateProductInfo(productUrl) {
        return (html) => {
          const variant = this.getSelectedVariant(html);
          //console.log(variant);
          this.updateMediaCustom(html, variant?.featured_media?.id);
          this.pickupAvailability?.update(variant);
          this.updateOptionValues(html);
          this.updateURL(productUrl, variant?.id);
          this.updateVariantInputs(variant?.id);

          if (!variant) {
            this.setUnavailable();
            return;
          }
          this.getStoreAvailability(variant);
          this.showsku(variant);
          //this.updateMedia(html, variant?.featured_media?.id);
          

          const updateSourceFromDestination = (id, shouldHide = (source) => false) => {
            const source = html.getElementById(`${id}-${this.sectionId}`);
            const destination = this.querySelector(`#${id}-${this.dataset.section}`);
            if (source && destination) {
              destination.innerHTML = source.innerHTML;
              destination.classList.toggle('hidden', shouldHide(source));
            }
          };

          updateSourceFromDestination('price');
          updateSourceFromDestination('Sku', ({ classList }) => classList.contains('hidden'));
          updateSourceFromDestination('Inventory', ({ innerText }) => innerText === '');
          updateSourceFromDestination('Volume');
          updateSourceFromDestination('Price-Per-Item', ({ classList }) => classList.contains('hidden'));

          this.updateQuantityRules(this.sectionId, html);
          this.querySelector(`#Quantity-Rules-${this.dataset.section}`)?.classList.remove('hidden');
          this.querySelector(`#Volume-Note-${this.dataset.section}`)?.classList.remove('hidden');

          this.productForm?.toggleSubmitButton(
            html.getElementById(`ProductSubmitButton-${this.sectionId}`)?.hasAttribute('disabled') ?? true,
            window.variantStrings.soldOut
          );

          publish(PUB_SUB_EVENTS.variantChange, {
            data: {
              sectionId: this.sectionId,
              html,
              variant,
            },
          });

          // enable addon
          this.addon_data_script_enable();
        };
      }

      getStoreAvailability(variant){
        // console.log(variant);
        let _this = this;
       function handleResponse() {
         let response  = JSON.parse(this.responseText);
          let tempContainer = document.createElement('div');
          tempContainer.innerHTML = response.store_availability;
          //console.log(JSON.parse(tempContainer.querySelector('[type="application/json"]').textContent));
          //return JSON.parse(tempContainer.querySelector('[type="application/json"]').textContent);
          let regionAvailability = JSON.parse(tempContainer.querySelector('[type="application/json"]').textContent);
          _this.toggleAddaQuoteButton(regionAvailability);
          //_this.toggleAddButton(true, '', true, regionAvailability);
        }
        
        const request = new XMLHttpRequest();
        request.addEventListener('load', handleResponse);
        request.open('GET', `${this.dataset.url}?variant=${variant.id}&sections=store_availability`, true);
        request.send();
      }

      toggleAddaQuoteButton(regionAvailability) {
        //console.log(regionAvailability);
        let ele_main_product = this;
   

        // const addToQuoteBtn = document.getElementById("btn-addtoquote");
        // let addToQuoteBtnMain_all = document.getElementsByClassName("addtoquote-mainproduct-btn");
        const addToQuoteBtn = ele_main_product.querySelector("#btn-addtoquote");
        let addToQuoteBtnMain_all = ele_main_product.querySelectorAll("addtoquote-mainproduct-btn");
     
         // get location from localstorage
         // Check if it available or not
         let isAvailable = false; 
         let currentRegionCode = 'NSW';
         let currentRegion = JSON.parse(localStorage.getItem("region"));
         if(currentRegion){
           if(currentRegion.code == 'WA'){
             currentRegionCode = 'WA';
           }
         }
     
         // ajax request returned data
         let r = regionAvailability.store_availability.location_info; 
         for(let i = 0; i<r.length; i++){
           if(r[i].locationCode == currentRegionCode){
             (JSON.parse(r[i].available))?isAvailable = true : isAvailable = false;
           }
         }

         if(!ele_main_product.querySelector('.product-form__buttons').classList.contains('contact-to-purchase-buttons')){
          console.log('product-info.js-toggleAddaQuoteButton');
            if(isAvailable){
              ele_main_product.querySelector('.product-form__buttons').classList.add('buynow-show');
              ele_main_product.querySelector('.product-form__buttons').classList.remove('preorder-show');
             }else{
              ele_main_product.querySelector('.product-form__buttons').classList.add('preorder-show');
              ele_main_product.querySelector('.product-form__buttons').classList.remove('buynow-show');    
             }
          }
         
         // location wise availability ends =======
     
         
         if (addToQuoteBtn) {
           if (isAvailable) {
             addToQuoteBtn.classList.remove('hide');
             for (let i = 0; i < addToQuoteBtnMain_all.length; i++) {
               addToQuoteBtnMain_all[i].classList.remove('hide');
             }
           } else {
             addToQuoteBtn.classList.add('hide');
             for (let i = 0; i < addToQuoteBtnMain_all.length; i++) {
               addToQuoteBtnMain_all[i].classList.add('hide');
             }
           }
         }
       }

       /* custom */
       showsku(variant) {
        document.getElementById('cpylinkbtn-title').setAttribute('title',variant.sku);
        let activeVariant = variant.id;
        let variantItem = document.querySelectorAll('li[data-variant-item]');
        if(!document.querySelector('.showsku[data-variant-id]').classList.contains('location_qty_loaded')){
          document.querySelector('.showsku[data-variant-id]').setAttribute('data-variant-id',activeVariant);
        }
        for(let i = 0; i<variantItem.length; i++){
          let variant = variantItem[i].getAttribute('data-variant-item');
          if(activeVariant == variant){
            variantItem[i].classList.add('show');
            // let sku = variantItem[i].getAttribute('data-sku');
            // if(sku){
            //   document.getElementById('cpylinkbtn-title').setAttribute('title',sku);
            // }
            
          }else{
            variantItem[i].classList.remove('show');
          }
        }
      }
    

      updateVariantInputs(variantId) {
        this.querySelectorAll(
          `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        ).forEach((productForm) => {
          const input = productForm.querySelector('input[name="id"]');
          input.value = variantId ?? '';
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        const hiddenVariantInput = document.getElementById('backorder-variant-id');
        if (hiddenVariantInput) {
          hiddenVariantInput.value = variantId ?? '';
        }
      }

      updateURL(url, variantId) {
        this.querySelector('share-button')?.updateUrl(
          `${window.shopUrl}${url}${variantId ? `?variant=${variantId}` : ''}`
        );

        if (this.dataset.updateUrl === 'false') return;
        window.history.replaceState({}, '', `${url}${variantId ? `?variant=${variantId}` : ''}`);
      }

      setUnavailable() {
        this.productForm?.toggleSubmitButton(true, window.variantStrings.unavailable);

        const selectors = ['price', 'Inventory', 'Sku', 'Price-Per-Item', 'Volume-Note', 'Volume', 'Quantity-Rules']
          .map((id) => `#${id}-${this.dataset.section}`)
          .join(', ');
        document.querySelectorAll(selectors).forEach(({ classList }) => classList.add('hidden'));
      }

      updateMediaCustom(html, variantFeaturedMediaId) {
        if (!variantFeaturedMediaId) return;
        const slider_thumb_item = document.querySelectorAll('.swiper-container.main-slider .swiper-slide');
        for(let i = 0; i < slider_thumb_item.length; i++ ){
          let target_item = slider_thumb_item[i].getAttribute('data-media-id');
          let target_item_index = slider_thumb_item[i].getAttribute('data-media-index');
          // console.log(target_item);
          // console.log(variantFeaturedMediaId);
          if(target_item == variantFeaturedMediaId){
           // console.log(target_item);
            const swiperEl = document.querySelector('.main-slider');
            swiperEl.swiper.slideTo(target_item_index-1);
            break;
          }
        }
      }

      updateMedia(html, variantFeaturedMediaId) {
        if (!variantFeaturedMediaId) return;

        const mediaGallerySource = this.querySelector('media-gallery ul');
        const mediaGalleryDestination = html.querySelector(`media-gallery ul`);

        const refreshSourceData = () => {
          if (this.hasAttribute('data-zoom-on-hover')) enableZoomOnHover(2);
          const mediaGallerySourceItems = Array.from(mediaGallerySource.querySelectorAll('li[data-media-id]'));
          const sourceSet = new Set(mediaGallerySourceItems.map((item) => item.dataset.mediaId));
          const sourceMap = new Map(
            mediaGallerySourceItems.map((item, index) => [item.dataset.mediaId, { item, index }])
          );
          return [mediaGallerySourceItems, sourceSet, sourceMap];
        };

        if (mediaGallerySource && mediaGalleryDestination) {
          let [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();
          const mediaGalleryDestinationItems = Array.from(
            mediaGalleryDestination.querySelectorAll('li[data-media-id]')
          );
          const destinationSet = new Set(mediaGalleryDestinationItems.map(({ dataset }) => dataset.mediaId));
          let shouldRefresh = false;

          // add items from new data not present in DOM
          for (let i = mediaGalleryDestinationItems.length - 1; i >= 0; i--) {
            if (!sourceSet.has(mediaGalleryDestinationItems[i].dataset.mediaId)) {
              mediaGallerySource.prepend(mediaGalleryDestinationItems[i]);
              shouldRefresh = true;
            }
          }

          // remove items from DOM not present in new data
          for (let i = 0; i < mediaGallerySourceItems.length; i++) {
            if (!destinationSet.has(mediaGallerySourceItems[i].dataset.mediaId)) {
              mediaGallerySourceItems[i].remove();
              shouldRefresh = true;
            }
          }

          // refresh
          if (shouldRefresh) [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();

          // if media galleries don't match, sort to match new data order
          mediaGalleryDestinationItems.forEach((destinationItem, destinationIndex) => {
            const sourceData = sourceMap.get(destinationItem.dataset.mediaId);

            if (sourceData && sourceData.index !== destinationIndex) {
              mediaGallerySource.insertBefore(
                sourceData.item,
                mediaGallerySource.querySelector(`li:nth-of-type(${destinationIndex + 1})`)
              );

              // refresh source now that it has been modified
              [mediaGallerySourceItems, sourceSet, sourceMap] = refreshSourceData();
            }
          });
        }

        // set featured media as active in the media gallery
        this.querySelector(`media-gallery`)?.setActiveMedia?.(
          `${this.dataset.section}-${variantFeaturedMediaId}`,
          true
        );

        // update media modal
        const modalContent = this.productModal?.querySelector(`.product-media-modal__content`);
        const newModalContent = html.querySelector(`product-modal .product-media-modal__content`);
        if (modalContent && newModalContent) modalContent.innerHTML = newModalContent.innerHTML;
      }

      setQuantityBoundries() {
        const data = {
          cartQuantity: this.quantityInput.dataset.cartQuantity ? parseInt(this.quantityInput.dataset.cartQuantity) : 0,
          min: this.quantityInput.dataset.min ? parseInt(this.quantityInput.dataset.min) : 1,
          max: this.quantityInput.dataset.max ? parseInt(this.quantityInput.dataset.max) : null,
          step: this.quantityInput.step ? parseInt(this.quantityInput.step) : 1,
        };

        let min = data.min;
        const max = data.max === null ? data.max : data.max - data.cartQuantity;
        if (max !== null) min = Math.min(min, max);
        if (data.cartQuantity >= data.min) min = Math.min(min, data.step);

        this.quantityInput.min = min;

        if (max) {
          this.quantityInput.max = max;
        } else {
          this.quantityInput.removeAttribute('max');
        }
        this.quantityInput.value = min;

        publish(PUB_SUB_EVENTS.quantityUpdate, undefined);
      }

      fetchQuantityRules() {
        const currentVariantId = this.productForm?.variantIdInput?.value;
        if (!currentVariantId) return;
        //console.log(currentVariantId);
        this.querySelector('.quantity__rules-cart .loading__spinner').classList.remove('hidden');
        fetch(`${this.dataset.url}?variant=${currentVariantId}&section_id=${this.dataset.section}`)
          .then((response) => response.text())
          .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            this.updateQuantityRules(this.dataset.section, html);
          })
          .catch((e) => console.error(e))
          .finally(() => this.querySelector('.quantity__rules-cart .loading__spinner').classList.add('hidden'));
      }

      updateQuantityRules(sectionId, html) {
        if (!this.quantityInput) return;
        this.setQuantityBoundries();
      
        const quantityFormUpdated = html.getElementById(`Quantity-Form-${sectionId}`);
        const selectors = ['.quantity__input', '.quantity__rules', '.quantity__label'];
        
        for (let selector of selectors) {
          const current = this.quantityForm.querySelector(selector);
          const updated = quantityFormUpdated.querySelector(selector);
      
          if (!current || !updated) continue;
      
          if (selector === '.quantity__input') {
            const attributes = ['data-cart-quantity', 'data-min', 'data-max', 'step', 'min', 'value'];
            
            for (let attribute of attributes) {
              const valueUpdated = updated.getAttribute(attribute);
              
              if (valueUpdated !== null) {
                if (attribute === 'value') {
                  current.value = valueUpdated;
                  const productMOQMessages = document.querySelectorAll(".moq-text-message");

                  productMOQMessages.forEach((element) => {
                    element.textContent = valueUpdated;
                  });
                } else {
                  current.setAttribute(attribute, valueUpdated);
                }
              } else {
                current.removeAttribute(attribute);
              }
            }
          } else {
            current.innerHTML = updated.innerHTML;
          }
        }
      }
      

      get productForm() {
        return this.querySelector(`product-form`);
      }

      get productModal() {
        return document.querySelector(`#ProductModal-${this.dataset.section}`);
      }

      get pickupAvailability() {
        return this.querySelector(`pickup-availability`);
      }

      get variantSelectors() {
        return this.querySelector('variant-selects');
      }

      get relatedProducts() {
        const relatedProductsSectionId = SectionId.getIdForSection(
          SectionId.parseId(this.sectionId),
          'related-products'
        );
        return document.querySelector(`product-recommendations[data-section-id^="${relatedProductsSectionId}"]`);
      }

      get quickOrderList() {
        const quickOrderListSectionId = SectionId.getIdForSection(
          SectionId.parseId(this.sectionId),
          'quick_order_list'
        );
        return document.querySelector(`quick-order-list[data-id^="${quickOrderListSectionId}"]`);
      }

      get sectionId() {
        return this.dataset.originalSection || this.dataset.section;
      }

      // option addon script this script is in addon_data_script.js too 
      addon_data_script_enable(){
        // GLOBAL timer store
        const leaveTimers = {};
    
        // Function to assign unique ID to each parent block
        function getParentId(parent) {
          if (!parent.dataset.uid) {
            parent.dataset.uid = 'uid_' + Math.random().toString(36).substr(2, 9);
          }
          return parent.dataset.uid;
        }
    
    
        // 1) INIT Swiper
        document.querySelectorAll('.addon_swiper').forEach(function(el) {
    
          const instance = new Swiper(el, {
            slidesPerView: 1,
            loop: false,
            effect: "fade",
          });
    
          el.swiper = instance;
        });
    
    
        // 2) Hover interactions
        document.querySelectorAll('label.has-sliderimg').forEach(function(label) {
    
          // ------------------------------
          // MOUSE ENTER
          // ------------------------------
          label.addEventListener('mouseenter', function () {
    
            const parentBlock = this.closest('.option-item-holder, .custom-accordion__content');
            if (!parentBlock) return;
    
            const pid = getParentId(parentBlock);
    
            // Cancel leave timer if user returns
            if (leaveTimers[pid]) {
              clearTimeout(leaveTimers[pid]);
              delete leaveTimers[pid];
            }
    
            // ADD CLASSES
            document.body.classList.add("addon-swiper-active");
            parentBlock.classList.add("addonvisible");
            parentBlock.querySelectorAll(".custom-tippy-container").forEach((el)=>{
              el.classList.add("on");
            });
    
            // SLIDE LOGIC
            const raw = this.getAttribute('addon_swiper_index');
            const slideNumber = parseInt(raw, 10);
            if (Number.isNaN(slideNumber)) return;
    
            const targetIndex = slideNumber - 1;
    
            const swiperEl = parentBlock.querySelector('.addon_swiper');
            const inst = swiperEl?.swiper;
            if (inst) inst.slideTo(targetIndex, 300);
          });
    
    
    
          // ------------------------------
          // MOUSE LEAVE (1-sec delay)
          // ------------------------------
          label.addEventListener("mouseleave", function () {
            const parentBlock = this.closest('.option-item-holder, .custom-accordion__content');
            if (!parentBlock) return;
    
            const pid = getParentId(parentBlock);
    
            // start 1-second timer
            leaveTimers[pid] = setTimeout(() => {
    
              parentBlock.classList.remove("addonvisible");
              document.body.classList.remove("addon-swiper-active");
              parentBlock.querySelectorAll(".custom-tippy-container").forEach((el)=>{
                el.classList.remove("on");
              });
              delete leaveTimers[pid];
    
            }, 100); // <-- 1 second
          });
    
        });
      }
      // option addon script end

    }
  );
}