// document.addEventListener("DOMContentLoaded",(event) => {
    const accordion = document.querySelectorAll(".accordion");
    const panel = document.querySelectorAll(".panel");

    accordion.forEach((tab, i) => {
      tab.addEventListener("click", function () {
        accordion.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");
        panel.forEach((content) => content.classList.add("hidden"));
        panel[i].classList.remove("hidden");
      });
    });

    // check region from local storage 
    let region = JSON.parse(localStorage.getItem('region'));
    
    if(region){
      let data_reg = document.querySelectorAll('[data-location-region]'); 
      if(data_reg.length > 0){
        selectRegionPanel(region.code);
      }
    }else{
      waitForLocation();
    }
  
    // for styling active matterport iframe 
    const showroomIframes = document.querySelectorAll('.accordion-list iframe');

      // Add tabindex to be safe
      showroomIframes.forEach(iframe => {
        iframe.setAttribute('tabindex', '0');
      });

      // Detect iframe activation
      window.addEventListener('blur', function () {
        showroomIframes.forEach(iframe => {
          if (document.activeElement === iframe) {
            showroomIframes.forEach(i => i.classList.remove('iframe-active'));
            iframe.classList.add('iframe-active');
          }
        });
      });

      // Remove class when clicking outside
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.accordion-list iframe')) {
          showroomIframes.forEach(i => i.classList.remove('iframe-active'));
        }
      });

  // });
  
  // remove acitve panel 
  function selectRegionPanel(region){
    let data_reg = document.querySelectorAll('[data-location-region]');
    data_reg.forEach(function(el){
      el.querySelector('.accordion').classList.remove('active');
      el.querySelector('.panel').classList.add('hidden');
    });

    // Active selected accordion panel
    function activateAccordions(selectedAcc){
      selectedAcc.querySelector('.accordion').classList.add('active');
      selectedAcc.querySelector('.panel').classList.remove('hidden');
    }
    // enable saved region
    if(region === 'WA'){
      let selectedAcc = document.querySelector('[data-location-region="perth"]');
      activateAccordions(selectedAcc);
    }
    else if(region === 'QLD'){
      let selectedAcc = document.querySelector('[data-location-region="brisbane"]');
      activateAccordions(selectedAcc);
    }
    else if(region === 'SA'){
      let selectedAcc = document.querySelector('[data-location-region="adelaide"]');
      activateAccordions(selectedAcc);
    }
    else if(region === 'TAS' || region === 'VIC'){
      let selectedAcc = document.querySelector('[data-location-region="melbourne"]');
      activateAccordions(selectedAcc);
    }
    else{
      let selectedAcc = document.querySelector('[data-location-region="act"]');
      activateAccordions(selectedAcc);
    }
  }

  function waitForLocation() {
    let count = 1;
    const interval = setInterval(function () {
      let currentRegion = localStorage.getItem('region');
      // Check if region changed from fake
      console.log(currentRegion, count);
      if (currentRegion) {
        console.log(currentRegion);

        clearInterval(interval);
        const parsedRegion = JSON.parse(currentRegion);
        selectRegionPanel(parsedRegion.code);
        return true;
      }
      count++;
      if(count > 10){
        clearInterval(interval);
      }
    }, 1000);

  }
  
  document.querySelectorAll('.iframe-container').forEach(container => {
    container.addEventListener('click', () => {
      if (!container.classList.contains('active')) {
        container.classList.add('active');
        const iframe = container.querySelector('iframe');
        if (iframe && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;  // load the iframe src on click
        }
      }
    });
    // GA4 play button click event 
  let playbtn = container.querySelector('.playbtn');
  if (playbtn) {
    playbtn.addEventListener('click', () => {
      let iframe = container.querySelector('iframe');
      let showroom_location = iframe.getAttribute('store_location');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'matterport_playbtn_clicked',
        location: showroom_location
      });
    });
  }
    
      
  });