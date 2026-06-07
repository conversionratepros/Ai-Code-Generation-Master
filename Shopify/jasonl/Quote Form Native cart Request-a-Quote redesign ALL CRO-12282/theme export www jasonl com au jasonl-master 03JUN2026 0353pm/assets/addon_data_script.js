// this script is in product-info.js file too
document.addEventListener("DOMContentLoaded", function () {
    function addon_data_script_enable(){
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
            
            parentBlock.querySelectorAll(".custom-tippy-container").forEach((el) => {
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
              parentBlock.querySelectorAll(".custom-tippy-container").forEach((el) => {
                el.classList.remove("on");
              });
              delete leaveTimers[pid];
    
            }, 100); // <-- 1 second
          });
    
        });
    }
    addon_data_script_enable();
});