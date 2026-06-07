 let dots          = 4;
  let sliderElem    = document.querySelector('.slider');
  let dotElems      = sliderElem.querySelectorAll('.slider__dot');
  let indicatorElem = sliderElem.querySelector('.slider__indicator');
  let autoSlideInterval;
  let autoSlideDelay = 7000; // 7 seconds

  function goToSlide(newPos) {
    let currentPos       = parseInt(sliderElem.getAttribute('data-pos'));
    let newDirection     = (newPos > currentPos ? 'right' : 'left');
    let currentDirection = (newPos < currentPos ? 'right' : 'left');

    indicatorElem.classList.remove(`slider__indicator--${ currentDirection }`);
    indicatorElem.classList.add(`slider__indicator--${ newDirection }`);
    sliderElem.setAttribute('data-pos', newPos);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      let currentPos = parseInt(sliderElem.getAttribute('data-pos'));
      let nextPos = (currentPos + 1) % dots;
      goToSlide(nextPos);
    }, autoSlideDelay);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Manual click
  Array.prototype.forEach.call(dotElems, (dotElem) => {
    dotElem.addEventListener('click', (e) => {
      e.preventDefault();
      let newPos = parseInt(dotElem.getAttribute('data-pos'));
      goToSlide(newPos);
      resetAutoSlide(); // restart auto slide
    });
  });

  // Prevent indicator from jumping page
  indicatorElem.addEventListener('click', (e) => {
    e.preventDefault();
  });

  // Start auto slide on load
  startAutoSlide();