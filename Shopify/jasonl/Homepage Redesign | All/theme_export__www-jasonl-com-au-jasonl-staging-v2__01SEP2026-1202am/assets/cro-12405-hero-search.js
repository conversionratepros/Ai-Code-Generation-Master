document.addEventListener('shopify:section:load', initCro12405CategoryScroller);
document.addEventListener('DOMContentLoaded', initCro12405CategoryScroller);

function initCro12405CategoryScroller() {
  document.querySelectorAll('.cro-12405-categories__row').forEach(function (row) {
    if (row.dataset.cro12405Bound) return;
    row.dataset.cro12405Bound = 'true';

    var scroller = row.querySelector('[data-cro-12405-tiles]');
    var prevButton = row.querySelector('[data-cro-12405-prev]');
    var nextButton = row.querySelector('[data-cro-12405-next]');
    if (!scroller) return;

    function getStep() {
      var tile = scroller.querySelector('.cro-12405-tile');
      return tile ? tile.getBoundingClientRect().width + 12 : scroller.clientWidth * 0.8;
    }

    function updateArrows() {
      if (!prevButton || !nextButton) return;
      var atStart = scroller.scrollLeft <= 1;
      var atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1;
      prevButton.hidden = atStart;
      nextButton.hidden = atEnd;
    }

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        scroller.scrollTo({ left: scroller.scrollLeft - getStep(), behavior: 'smooth' });
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        scroller.scrollTo({ left: scroller.scrollLeft + getStep(), behavior: 'smooth' });
      });
    }

    scroller.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateArrows);
    });

    updateArrows();
  });
}
