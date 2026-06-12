 document.addEventListener("DOMContentLoaded", function () {
    const locationPlaceholder = document.getElementById("location-placeholder");
    if (!locationPlaceholder) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // add data 
        function handleResponse() {
          JSON.parse(this.responseText);
          // console.log(Object.values(JSON.parse(this.responseText))[0]);
          locationPlaceholder.innerHTML = Object.values(JSON.parse(this.responseText))[0];
          loadScript("//www.jasonl.com.au/cdn/shop/t/303/assets/location-with-matterport.js?v=149590558793855155791775124969", function () {
            myScriptInit();
          });
        }

        function myScriptInit() {
          console.log("loaded location");
        }

        function loadScript(src, callback) {
          const script = document.createElement("script");
          script.src = src;
          script.onload = callback;
          script.type = "module"; 
          document.body.appendChild(script);
        }
        const request = new XMLHttpRequest();
        request.addEventListener('load', handleResponse);
        request.open('GET', '/?sections=location-map-1-b', true);
        request.send();
        
        // Stop observing after load
        obs.unobserve(el);

      });
    }, {
      rootMargin: "300px"
    });

  observer.observe(locationPlaceholder);
  //   sections.forEach(section => observer.observe(section));
  }); 