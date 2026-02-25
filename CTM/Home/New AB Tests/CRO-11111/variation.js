(function() {
  const waitForElement = function(selector, callback) {
    const element = document.querySelector(selector);
    if(element) {
      callback(element);
    } else {
      setTimeout(() => waitForElement(selector, callback), 100);
    }
  };

  const addCss = function(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  };

  const userHasClosedWidget = sessionStorage.getItem('cro-11111-widget-closed');

  if (userHasClosedWidget !== 'true') {
    waitForElement('.original-slider', function(slider) {
      // 1. Extract video URL and thumbnail from the existing gallery
      const videoContainer = slider.querySelector('.product-video');

      if (!videoContainer) {
        console.warn('No product video found on this page.');
        return;
      }

      const videoUrl = videoContainer.dataset.videourl;
      const thumbnailUrl = slider.querySelector('img[src*="tile-board.jpg"]')?.src || '';

      // 2. Create the video widget element
      const videoWidget = document.createElement('div');
      videoWidget.classList.add('cro-11111-video-widget');
      videoWidget.innerHTML = `
        <div class="cro-11111-video-thumbnail">
          <img src="${thumbnailUrl}" alt="Video Thumbnail">
        </div>
        <div class="cro-11111-video-footer">
          <h4>See & Feel Live Review</h4>
          <p>Expand video <span class="cro-11111-expand-icon">+</span></p>
          <span class="cro-11111-close-icon">x</span>
        </div>
      `;

      // 3. Create the video pop-up
      const videoPopup = document.createElement('div');
      videoPopup.classList.add('cro-11111-video-popup');
      videoPopup.innerHTML = `
        <div class="cro-11111-popup-content">
          <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;

      // 4. Add event listeners
      videoWidget.addEventListener('click', function() {
        document.body.appendChild(videoPopup);
      });

      videoPopup.addEventListener('click', function(event) {
        if (event.target === videoPopup || event.target.classList.contains('cro-11111-close-icon')) {
          videoPopup.remove();
        }
      });

      videoWidget.querySelector('.cro-11111-close-icon').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent opening the popup when closing
        videoWidget.remove();
        sessionStorage.setItem('cro-11111-widget-closed', 'true');
      });

      // 5. Inject the video widget into the page (desktop: fixed bottom left, mobile: after "Safe & Reliable")
      const safeReliableElement = document.querySelector('.trust-message');
      if (window.innerWidth >= 768) {
        document.body.appendChild(videoWidget);
      } else {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  document.body.appendChild(videoWidget);
                  observer.unobserve(safeReliableElement);
                }
              });
            },
            {
              root: null,
              threshold: 1,
            }
          );

          observer.observe(safeReliableElement);
      }

        // Basic CSS for the widget and popup (you'll need to expand on this)
        addCss(`
          .cro-11111-video-widget { position:fixed; left:20px; bottom:20px; width:200px; background:#fff; border:1px solid #ccc; cursor: pointer; z-index: 1000; }
          .cro-11111-video-widget .cro-11111-video-thumbnail { width: 100%; height: auto; }
          .cro-11111-video-widget .cro-11111-video-thumbnail img { width: 100%; display: block; }
          .cro-11111-video-widget .cro-11111-video-footer { padding: 10px; font-size: 12px; }
          .cro-11111-video-popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:1001; }
          .cro-11111-video-popup .cro-11111-popup-content {  max-width: 80%; max-height: 80%; }
          .cro-11111-video-popup iframe { width: 100%; height: 100%; border: 5px solid red; }
          .cro-11111-close-icon { position: absolute; top: 5px; right: 5px; cursor: pointer; }

          @media (max-width: 767px) {
            .cro-11111-video-widget { left: 0; bottom: 0; width: 100%; border:none; }
          }
        `);
    });
  }
})();
