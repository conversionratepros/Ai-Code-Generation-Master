const testimonialSections = document.querySelectorAll('.testimonial__slider');

testimonialSections.forEach(section => {
  const swiperElement = section.querySelector('.swiper');

  const swiper = new Swiper(swiperElement, {
    centeredSlides: true,
    initialSlide: 1,
    freeMode: true,
    speed: 400,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1: {
        slidesPerView: 1.24,
        spaceBetween: 10
      },
      550: {
        slidesPerView: 1.5,
        spaceBetween: 10
      },
      1000: {
        slidesPerView: 1.55,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 1.7,
        spaceBetween: 20
      },
      1350: {
        slidesPerView: 2.11,
        spaceBetween: 20
      }
    }
  })
});