const productSections = document.querySelectorAll('.product__section');

function initSwipersHandler(section) {
  const thumbEl = section.querySelector('.swiper.product__horizontal-swiper');
  const mainEl = section.querySelector('.swiper-product__section-main_swiper.swiper');

  if (!thumbEl || !mainEl) return;

  const thumbSwiper = new Swiper(thumbEl, {
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    breakpoints: {
      1: {
        direction: 'horizontal',
        slidesPerView: 5,
      },
      1000: {
        direction: 'vertical',
        slidesPerView: 4.7,
      },
      1151: {
        direction: 'vertical',
        slidesPerView: 5.8,
      },
      1351: {
        slidesPerView: 6.34,
        direction: 'vertical'
      }
    }
  });

  const mainSwiper = new Swiper(mainEl, {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
      swiper: thumbSwiper,
    }
  });

  mainSwiper.on('slideChange', () => {
    thumbSwiper.slideTo(mainSwiper.activeIndex);

    const oldActive = thumbEl.querySelector('.swiper-slide-active');
    oldActive && oldActive.classList.remove('swiper-slide-active');

    const slides = thumbEl.querySelectorAll('.swiper-slide');
    slides[mainSwiper.activeIndex].classList.add('swiper-slide-active');
  });

  thumbSwiper.on('click', () => {
    const clickedIndex = thumbSwiper.clickedIndex;
    if (typeof clickedIndex !== 'undefined') {
      mainSwiper.slideTo(clickedIndex);

      const oldActive = thumbEl.querySelector('.swiper-slide-active');
      oldActive && oldActive.classList.remove('swiper-slide-active');

      const slides = thumbEl.querySelectorAll('.swiper-slide');
      slides[clickedIndex].classList.add('swiper-slide-active');
    }
  });

  thumbSwiper.on('slideChange', () => {
    mainSwiper.slideTo(thumbSwiper.activeIndex);

    const oldActive = thumbEl.querySelector('.swiper-slide-active');
    oldActive && oldActive.classList.remove('swiper-slide-active');

    const slides = thumbEl.querySelectorAll('.swiper-slide');
    slides[thumbSwiper.activeIndex].classList.add('swiper-slide-active');
  });
}

function submitButtonHandler(item, section) {
  const submitButton = section.querySelector('.add-to-cart-c');
  const isAvailable = !item.classList.contains('is--out-of-stock');

  if (!isAvailable) {
    submitButton.classList.add('out-of-stock');
    submitButton.querySelector('span').innerText = submitButton.getAttribute('data-out-of-stock-text');
  } else {
    submitButton.classList.remove('out-of-stock');
    submitButton.querySelector('span').innerText = submitButton.getAttribute('data-in-stock-text');
  }
}

function formHandler(section) {
  const activeElement = section.querySelector('.product__media-variant-selector.active');
  activeElement && submitButtonHandler(activeElement, section);

  const items = section.querySelectorAll('.product__media-variant-selector');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const oldActive = section.querySelector('.product__media-variant-selector.active');
      oldActive && oldActive.classList.remove('active');

      item.classList.add('active');

      submitButtonHandler(item, section);
    })
  });
}

function formSubmitHandler(section) {
  const submitButton = section.querySelector('.add-to-cart-c');
  submitButton.addEventListener('click', () => {
    const activeItem = section.querySelector('.product__media-variant-selector.active');
    if (activeItem) {
      const id = activeItem.getAttribute('data-id');
      const qty = activeItem.getAttribute('data-qty');
      let formData = {
        'items': []
      };

      formData['items'].push({
        'id': id,
        'quantity': qty
      })

      const giftItems = activeItem.querySelectorAll('.gift-item-c');
      giftItems.forEach(giftItem => {
        if (giftItem.dataset.available == 'true') {
          formData['items'].push({
            'id': giftItem.dataset.id,
            'quantity': giftItem.dataset.qty
          })
        }
      });

      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          document.dispatchEvent(new CustomEvent('cart:refresh'));
          setTimeout(() => {
            const cartButton = document.querySelector('.header__cart-link a[aria-controls="cart-drawer"]');
            cartButton && cartButton.click();
          }, 250);
          return response.json();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  })
}

productSections.forEach(section => {
  initSwipersHandler(section);
  formHandler(section);
  formSubmitHandler(section)
});