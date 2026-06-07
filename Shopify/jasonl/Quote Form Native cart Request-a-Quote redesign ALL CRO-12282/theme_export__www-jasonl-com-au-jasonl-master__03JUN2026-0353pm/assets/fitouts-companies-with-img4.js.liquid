let fitoutImg4_buttonFitout = document.getElementById('fitoutImg2List_seemore');
let fitoutImg4_numPage = 100;        
    function fitoutImg4_loadFitouts(i) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var temp = document.createElement("div");
                temp.innerHTML = this.responseText;
                var fitoutsImglist = temp.querySelector("#fitoutsImg4__list");
                fitoutImg4_numPage = parseInt(fitoutsImglist.getAttribute('data-tatolpage'));
    
                    let tempSliderContainer = fitoutsImglist.querySelector(".fitoutsImg4-mobile-slider-container");
                    let innerItems = fitoutsImglist.querySelector(".fitoutImg__ajaxHolder");
    
                    if (window.innerWidth < 767) {
                        tempSliderContainer.classList.add("slider-container");
                        document
                            .getElementById("fitoutsImg4__list")
                            .querySelector(".fitoutImg__ajaxHolder").innerHTML += innerItems.innerHTML;
                            //document.getElementById("fitoutsImg4__list").querySelector(".slider-indicators").innerHTML += '<button></button>';
                            let activeClass = '';
                            let index = (i - 1)*8;
                            // initialCount = (i - 1)*8;
                            for(let x = 0; x < innerItems.querySelectorAll('a.fitout-article').length; x++){
                                activeClass = (i === 1 && x + 1 === 1) ? 'active' : '';
                                index = index + 1;
                                document.getElementById("fitoutsImg4__list").querySelector(".slider-indicators").innerHTML += `<button class="${activeClass}" data-index="${index}"></button>`;
                            }
                    } else {
                        //document.getElementById("fitoutsImg4__list").innerHTML += fitoutsImglist.innerHTML;
                        let existingContainer = document
                            .getElementById("fitoutsImg4__list")
                            .querySelector(".fitoutImg__ajaxHolder");
                    
                        if (existingContainer) {
                            existingContainer.insertAdjacentHTML("beforeend", innerItems.innerHTML);
                        }
                    }
    
                fitoutImg4_buttonFitout.classList.remove("active");
                disablePassiveTabs();
                if(window.innerWidth < 767 ) {
                    slideNumber();
                    }
            }
        };
        xhttp.open("GET", `https://www.jasonl.com.au/blogs/fitouts/tagged/fitouts?page=${i}`);
        xhttp.send();
    }
            
            
            
            let fitoutImg4_fitoutCounter = 1;
            // console.log(fitoutImg4_numPage);
            fitoutImg4_buttonFitout.addEventListener("click", function(){
                // console.log(fitoutImg4_numPage);
                fitoutImg4_buttonFitout.classList.add('active');
                if(fitoutImg4_fitoutCounter < fitoutImg4_numPage){
                    fitoutImg4_fitoutCounter++;
                    fitoutImg4_loadFitouts(fitoutImg4_fitoutCounter );
                    
                }
                if(fitoutImg4_fitoutCounter === fitoutImg4_numPage){
                    setTimeout(function(){
                         fitoutImg4_buttonFitout.remove();
                    },1000)
                }  
            });
           
            function slideNumber(){
                // On mobile: Slide numbering, right gap
                const sliderElement = document.getElementById('fitoutsImg4__list');
                const sliderElementParent = document.getElementById('fitouts-list-with-img');      
                let slides = sliderElement.querySelectorAll('a.fitout-article');
                let totalSlides = slides.length;
                    document.getElementById('active-slider-index').innerText = '1/'+totalSlides;
            
                // slide callback
                swiffyslider.onSlideEnd(sliderElement, function() {
                    // check if slide item has been added by loadmore button
                    
                    sliderElementParent.classList.remove('slider-right-gap'); 
                        let activeIndex = document.getElementById('fitoutsCounter').querySelector('button.active').getAttribute('data-index');
                        let updatedSlides = sliderElement.querySelectorAll('a.fitout-article');
                        let updatedTotalSlides = updatedSlides.length;
                        if(totalSlides != updatedTotalSlides){ totalSlides = updatedTotalSlides }
                        if(activeIndex == totalSlides){ sliderElementParent.classList.add('slider-right-gap') }
                        document.getElementById('active-slider-index').innerText = activeIndex+'/'+totalSlides;    
                });
            }
            
            function removeSlider(){
                // remove slider from desktop
                document.getElementById("fitoutsImg4__list").classList.remove('swiffy-slider');
                document.querySelector('.fitoutsImg4-mobile-slider-container').classList.remove('slider-container');;
            }
            
            function initTabFilter(){
                const tabs = document.querySelectorAll(".fitout-tabs .tab");
                const fitoutsList = document.querySelector(".fitoutsImg__list.fitoutImg__ajaxHolder.fitoutsImg4-mobile-slider-container");
                
            
                tabs.forEach(tab => {
                    tab.addEventListener("click", function () {
                        if(!this.classList.contains('contains-fitouts')) return;
                        // Remove 'active' class from all tabs
                        tabs.forEach(t => t.classList.remove("active"));
                        this.classList.add("active");
                        // Get the selected filter category
                        let filterClass = this.getAttribute("data-filter");
                        // Remove any existing filter classes
                        fitoutsList.classList.remove("all", "business", "home", "trade", "hospitality","npo");
                        // Add the new filter class
                        fitoutsList.classList.add(filterClass);
                    });
                });
            }

function disablePassiveTabs(){
    let tab_items = ["all", "business", "home", "trade", "hospitality", "npo"];
    let i = 0;
    const fitouts = document.querySelectorAll("#fitoutsImg4__list .fitout-article");
    let filters = tab_items; // array. 
    let activeTabs = 0;
     // return, if all tab items contains any fitouts
    for(x = 0; x < filters.length; x++  ){
        for(i = 0; i < fitouts.length; i++){
            if(fitouts[i].classList.contains(`fitout-${filters[x]}`)){
                let tab = document.querySelector(`.fitout-tabs .tab[data-filter="${filters[x]}"]`);
                tab.classList.add('contains-fitouts');
                activeTabs++ ;
               // if(activeTabs == filters.length) return activeTabs;
               // break;
            }
        }
    }
    return activeTabs;
}
            
            
                
fitoutImg4_loadFitouts(1);
if(window.innerWidth > 767 )removeSlider(); 
window.addEventListener('load', () => { 
    window.innerWidth < 767 ?slideNumber():initTabFilter(); 
});