(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-12574_ab_homepage_redesign";

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        /* ==================================================================
         * v3 RESKIN (2026-08-09) built from the client's updated Figma
         * "Oneplan - Homepage Relook (CRO-12173)" desktop 44:5710 /
         * mobile 56:101. Same section structure + behaviours as v2; new
         * palette (Vivid Blue/Bright Teal), Anek Devanagari type, line-icon
         * router chips, photographic claim card + final CTA art, name-first
         * review cards with a scrollable quote.
         *
         * ASSETS - upload these 4 files (in this test folder's assets/) to
         * S3 before QA; the code references their final URLs already:
         *   CRO-12574-1.jpg   (hero bg / mobile hero photo)
         *   CRO-12574-2.webp   (USP photo + final CTA tilted cards)
         *   CRO-12574-3.webp (final CTA right-hand art)
         *   CRO-12574-4.svg       (USP + final CTA pattern bg)
         *
         * PLACEHOLDER LINK DESTINATIONS - unchanged from v2, still to be
         * confirmed before launch (marked data-cro-placeholder=
         * "verify-destination"): login, Hellopeter x3, WhatsApp number.
         * "Prefer a call?" still opens the site's #homePageCallMePopUp
         * modal (design links it to #router; modal wiring is deliberate).
         * ================================================================== */

        var FRAGMENT_HTML = `<div id="cro-12574-redesign">
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs><symbol fill="none" id="cro12574-health" viewBox="0 0 31.78 29.23"><g><path d="M28.9285 2.85093C27.0838 1.00621 24.6521 0 22.0528 0C19.9565 0 17.9441 0.670807 16.3509 1.92857L15.9317 2.18012L15.3447 1.84472C13.6677 0.670807 11.7391 0 9.7267 0C7.12732 0 4.69565 1.00621 2.85093 2.85093C1.00621 4.69565 0 7.12732 0 9.7267C0 12.3261 1.00621 14.7577 2.85093 16.6025L15.177 28.9285C15.764 29.5155 16.4348 29.0962 16.6025 28.9285L28.9285 16.6025C30.7733 14.7577 31.7795 12.3261 31.7795 9.7267C31.7795 7.12732 30.7733 4.69565 28.9285 2.85093ZM16.6863 4.19254C18.1956 2.76708 20.0404 1.92857 22.1366 1.92857C24.2329 1.92857 26.1615 2.76708 27.5869 4.19254C29.0124 5.61801 29.8509 7.54658 29.8509 9.64285C29.8509 11.0683 29.4316 12.4938 28.677 13.6677H22.2205L20.9627 10.7329C20.9627 10.7329 20.4596 10.146 20.0404 10.146C19.705 10.146 19.2857 10.3975 19.118 10.7329L16.2671 16.6025L12.2422 7.96583C12.2422 7.96583 11.7391 7.37887 11.3199 7.37887C10.9006 7.37887 10.5652 7.63043 10.3975 7.96583L7.46273 14.2546H3.43788C2.43167 12.913 1.92857 11.3199 1.92857 9.64285C1.92857 7.54658 2.76708 5.61801 4.19254 4.19254C5.61801 2.76708 7.54658 1.92857 9.64285 1.92857C11.7391 1.92857 13.5 2.93478 15.0932 4.19254C15.3447 4.44409 15.8478 4.7795 16.5186 4.19254H16.6863ZM15.9317 26.7484L15.4286 26.2453L5.45031 16.2671H8.30123C8.30123 16.2671 9.05589 16.0155 9.22359 15.6801L11.4876 10.7329L15.5124 19.3695C15.5124 19.3695 16.0155 19.9565 16.3509 19.9565C16.3509 19.9565 17.0217 19.7049 17.1894 19.3695L19.9565 13.5L20.6273 15.0093C20.6273 15.0093 21.1304 15.5963 21.5497 15.5963H27L15.8478 26.6646L15.9317 26.7484Z" fill="#09075C"/></g></symbol><symbol fill="none" id="cro12574-pet" viewBox="0 0 35.54 30.42"><g><path d="M25.1648 2.84574C25.1648 2.84574 24.3004 2.41352 23.9546 2.67285C23.5224 2.93218 23.436 3.53728 23.7818 3.88305C25.0784 5.69834 24.3004 8.63739 23.7818 9.93403C20.6698 9.24249 19.5461 6.47632 19.4596 6.13055C19.2867 5.69834 18.7681 5.43901 18.3359 5.6119C17.9037 5.78478 17.6443 6.30344 17.8172 6.73565C17.9901 7.16787 19.5461 11.1442 24.214 11.7493H24.3004C24.3004 11.7493 24.9055 11.5764 25.0784 11.2307C25.1648 11.0578 27.4988 6.13055 25.0784 2.84574H25.1648Z" fill="#09075C"/><path d="M27.9307 13.4787C27.9307 13.4787 28.5358 13.4787 28.7951 13.4787H29.4002C30.4375 13.4787 31.5613 13.3922 32.5122 12.2685C35.5376 8.72435 35.5376 8.20569 35.5376 7.94636C35.5376 7.42771 35.5376 7.08194 30.524 4.5751C30.524 4.5751 30.524 4.5751 30.524 4.48866C30.524 3.71068 29.1409 2.24115 28.0171 1.37673C25.7696 -0.265684 23.1764 -0.438569 20.5831 0.85807C18.9407 1.7225 15.3101 4.22933 14.2728 10.2803C13.927 10.021 13.5812 9.76166 13.149 9.58877C12.9761 7.34126 11.5066 5.95818 10.5557 5.43953C10.2964 5.35308 10.0371 5.26664 9.77775 5.43953C9.51842 5.52597 9.34554 5.7853 9.25909 6.04463C8.82688 7.68703 8.22178 8.55146 7.96245 8.81079H7.70313C7.01159 8.81079 6.2336 8.81079 5.28273 9.15656C3.72677 9.58877 2.68946 11.2312 2.43013 12.0092V12.182C2.25724 12.7007 2.08436 13.2194 1.21993 13.5651C-0.422479 14.3431 0.00973447 15.4669 0.18262 15.9855C0.18262 16.1584 0.269062 16.3313 0.269062 16.4177C0.269062 17.6279 1.30637 18.233 1.99791 18.3195L3.03523 18.4924C3.03523 18.4924 4.07254 18.7517 4.24542 18.8381C4.76408 19.0975 5.10985 19.4432 5.19629 19.8754C5.36918 20.3941 5.19629 21.0856 4.67764 21.8636L4.50475 22.1229C3.98609 22.9874 3.64032 23.506 3.29455 24.1976C2.94878 24.8891 2.94878 25.6671 3.29455 26.2722C3.64032 26.9637 4.41831 27.3095 5.28273 27.3959H14.0999C15.5694 28.8655 16.7796 30.1621 16.7796 30.1621C16.9525 30.335 17.1254 30.4214 17.3847 30.4214C17.5576 30.4214 17.8169 30.4214 17.9898 30.1621C18.6813 29.4706 19.8915 28.4333 21.1017 27.2231H26.1154C27.3256 27.2231 28.2765 27.2231 28.4494 27.2231C30.4375 27.2231 31.4748 26.7908 32.0799 25.9264C32.7715 24.8891 32.3393 23.5925 31.7342 22.0365C30.6969 19.5297 30.0918 17.8873 27.4985 14.516C27.2392 14.0838 26.9798 13.3922 27.1527 13.2194C27.1527 13.2194 27.3256 13.2194 27.9307 13.2194V13.4787ZM5.36918 25.7535C5.36918 25.7535 4.93696 25.6671 4.85052 25.4942C4.85052 25.4078 4.85052 25.2349 4.85052 25.062C5.19629 24.4569 5.45562 23.9382 5.97427 23.1603L6.14716 22.9009C6.92514 21.6907 7.18447 20.567 6.92514 19.5297C6.66582 18.6652 6.06072 17.9737 5.02341 17.3686C4.33186 17.0228 3.64032 16.85 3.12167 16.85L2.34368 16.6771C2.34368 16.6771 1.99791 16.6771 1.99791 16.4177C1.99791 15.9855 1.82503 15.5533 1.73859 15.294C1.73859 15.294 1.82503 15.294 1.91147 15.2075C2.94878 14.7753 3.381 14.0838 3.72677 13.5651C3.81321 13.6516 3.98609 13.738 4.07254 13.8245C4.33186 13.8245 4.50475 13.8245 4.76408 13.8245C4.76408 13.8245 5.19629 13.6516 5.71495 13.6516C6.2336 13.6516 6.57937 13.3922 6.66581 12.8736C6.66581 12.4414 6.40649 12.0092 5.88783 11.9227C5.19629 11.9227 4.67764 11.9227 4.33186 12.0956C4.67764 11.6634 5.19629 11.1447 5.71495 10.9719C6.49293 10.799 7.09803 10.7125 7.70313 10.7125H8.22178C8.22178 10.7125 8.39467 10.7125 8.48111 10.6261H8.74044C8.74044 10.6261 8.91332 10.4532 8.99977 10.3668C9.08621 10.3668 9.86419 9.58877 10.4693 7.85992C11.0744 8.55146 11.593 9.67521 11.1608 11.4041C11.0744 11.8363 11.3337 12.3549 11.7659 12.4414C12.1981 12.6143 12.7168 12.2685 12.8032 11.8363C12.8032 11.8363 12.8032 11.8363 12.8032 11.6634C14.0999 12.7007 14.7914 14.6024 15.0507 15.9855C14.6185 15.8126 14.0999 15.7262 13.5812 15.7262C13.2355 15.7262 12.8032 15.7262 12.4575 15.8126C11.0744 16.072 10.0371 17.0228 9.51842 18.4059C8.99977 20.0483 9.25909 22.2094 10.1235 23.3331C10.6422 23.9382 11.4202 24.8027 12.2846 25.7535H5.10985H5.36918ZM17.4711 28.4333C13.6677 24.5433 12.1981 22.9009 11.593 22.2094C11.0744 21.6043 10.8151 20.1348 11.2473 18.9246C11.5066 18.0601 12.1117 17.6279 12.8897 17.455C13.149 17.455 13.4083 17.455 13.6677 17.455C15.6558 17.455 16.866 19.1839 16.866 19.1839C17.0389 19.4432 17.2983 19.5297 17.644 19.5297C17.9034 19.5297 18.1627 19.3568 18.3356 19.0975C18.3356 19.0975 19.5458 17.1957 21.1017 17.1957C21.4475 17.1957 21.7933 17.2822 22.139 17.455C23.1764 17.9737 23.8679 18.6652 24.0408 19.5297C24.3865 20.9128 23.4357 22.3823 23.1764 22.6416C22.0526 24.1976 18.5949 27.3095 17.3847 28.4333H17.4711ZM26.1154 15.7262C28.5358 18.9246 29.2273 20.4805 30.1782 22.9009C30.4375 23.506 30.9562 24.8027 30.6969 25.1484C30.6969 25.2349 30.2646 25.5807 28.5358 25.6671H23.0035C23.7815 24.8891 24.3865 24.1976 24.8188 23.5925C25.251 23.0738 26.4612 21.0856 25.9425 19.011C25.5967 17.7144 24.6459 16.5906 23.0899 15.8126C22.4848 15.5533 21.8797 15.3804 21.2746 15.3804C19.6322 15.3804 18.422 16.4177 17.7305 17.1957C17.5576 17.1093 17.4711 16.9364 17.2983 16.85C17.2118 15.9855 16.866 13.9973 15.9152 12.2685C16.3474 5.7853 19.978 3.27846 21.4475 2.50048C22.917 1.7225 24.3865 1.63605 25.7696 2.15471C27.3256 2.75981 28.3629 3.97 28.7951 4.5751C28.7951 4.5751 28.6222 4.5751 28.5358 4.5751H27.7578C27.2392 4.5751 26.8934 5.00731 26.8934 5.43953C26.8934 5.87174 27.3256 6.30395 27.7578 6.30395H28.5358C28.5358 6.30395 29.2273 6.13107 29.3138 5.7853C29.3138 5.7853 29.4002 5.95818 29.4867 5.95818C29.4867 5.95818 29.6595 6.13107 29.746 6.13107C31.302 6.90905 32.9444 7.77348 33.7224 8.20569C33.2901 8.89723 32.3393 10.1074 31.3884 11.2312C30.9562 11.7498 30.524 11.8363 29.5731 11.8363H29.0544C29.0544 11.8363 28.5358 11.8363 28.3629 11.8363C28.1036 11.8363 27.9307 11.8363 27.6714 11.8363C27.1527 11.8363 26.2883 11.9227 25.8561 12.8736C25.251 14.0838 26.2883 15.7262 26.3747 15.8991L26.1154 15.7262Z" fill="#09075C"/></g></symbol><symbol fill="none" id="cro12574-gap" viewBox="0 0 22.91 29.29"><g><path d="M17.1845 6.19012H15.7986V4.80424C15.7986 4.34228 15.4291 3.88032 14.8747 3.88032C14.3203 3.88032 13.9508 4.24989 13.9508 4.80424V6.19012H12.5649C12.1029 6.19012 11.641 6.55969 11.641 7.11404C11.641 7.6684 12.0105 8.03796 12.5649 8.03796H13.9508V9.42385C13.9508 9.88581 14.3203 10.3478 14.8747 10.3478C15.1519 10.3478 15.3367 10.2554 15.5214 10.0706C15.7062 9.88581 15.7986 9.70102 15.7986 9.42385V8.03796H17.1845C17.1845 8.03796 17.6465 7.94557 17.8312 7.76079C18.016 7.576 18.1084 7.39122 18.1084 7.11404C18.1084 6.65208 17.7389 6.19012 17.1845 6.19012Z" fill="#09075C"/><path d="M20.3263 0H8.03811C7.94572 0 7.85333 0 7.76094 0C7.66854 0 7.57615 0.0923921 7.48376 0.184784L0.184784 7.48376C0.184784 7.48376 0.0923921 7.66854 0 7.76094V7.94572V26.8861C0 28.1796 1.10871 29.2883 2.40219 29.2883H20.511C21.1578 29.2883 21.7121 29.0111 22.1741 28.5492C22.6361 28.0872 22.9132 27.5328 22.9132 26.8861V2.40219C22.9132 1.10871 21.8045 0 20.511 0H20.3263ZM7.11419 3.04894V7.20658H2.95655L7.11419 3.04894ZM20.973 27.0709C20.973 27.0709 20.6958 27.6252 20.4187 27.6252H2.3098C2.3098 27.6252 1.75545 27.3481 1.75545 27.0709V9.05443H8.1305C8.59246 9.05443 9.05443 8.68486 9.05443 8.1305V1.75545H20.4187C20.4187 1.75545 20.973 2.03263 20.973 2.3098V27.0709Z" fill="#09075C"/><path d="M16.9077 17.4622H5.72821C5.26625 17.4622 4.80429 17.8318 4.80429 18.3861C4.80429 18.9405 5.17386 19.31 5.72821 19.31H16.9077C17.3696 19.31 17.8316 18.9405 17.8316 18.3861C17.8316 17.8318 17.462 17.4622 16.9077 17.4622Z" fill="#09075C"/><path d="M16.9077 22.5436H5.72821C5.26625 22.5436 4.80429 22.9132 4.80429 23.4676C4.80429 24.0219 5.17386 24.3915 5.72821 24.3915H16.9077C17.3696 24.3915 17.8316 24.0219 17.8316 23.4676C17.8316 22.9132 17.462 22.5436 16.9077 22.5436Z" fill="#09075C"/><path d="M16.9077 12.3808H5.72821C5.26625 12.3808 4.80429 12.7504 4.80429 13.3047C4.80429 13.8591 5.17386 14.2287 5.72821 14.2287H16.9077C17.3696 14.2287 17.8316 13.8591 17.8316 13.3047C17.8316 12.7504 17.462 12.3808 16.9077 12.3808Z" fill="#09075C"/></g></symbol><symbol fill="none" id="cro12574-car" viewBox="0 0 31.67 30.33"><g><path d="M10.3228 27.1847C10.3228 27.1847 9.65507 26.1355 9.55969 25.5632H5.83968V13.64L15.7597 5.7231L26.0613 13.9262L27.7782 15.2616H27.8736C27.8736 15.2616 28.4459 15.7385 28.7321 15.7385C29.0182 15.7385 29.3998 15.6431 29.5905 15.357L31.3075 13.64C31.7844 13.1631 31.7844 12.4 31.3075 11.8277L25.489 7.24925C25.489 7.24925 25.489 7.24925 25.489 7.15387V3.24309C25.489 2.48001 24.8213 1.81231 24.0582 1.81231H21.9597C21.1967 1.81231 20.529 2.48001 20.529 3.24309L16.6182 0.286155C16.4274 0.0953849 16.0459 0 15.7597 0C15.4736 0 15.1874 0.0953849 14.9966 0.286155L0.211967 12.0185C0.211967 12.0185 -0.264958 13.2585 0.211967 13.7354L1.83351 15.357C1.83351 15.357 2.40582 15.7385 2.69197 15.7385C2.97813 15.7385 3.35967 15.6431 3.45505 15.4524L4.02736 14.9754V25.7539C4.02736 26.517 4.69506 27.1847 5.45814 27.1847H10.2274H10.3228ZM23.6767 3.62463V6.00925L22.2459 4.86463V3.72001H23.6767V3.62463ZM2.78736 13.9262L1.83351 12.9723L15.7597 1.81231L29.6859 12.877L28.7321 13.8308L16.2366 3.91078C16.2366 3.91078 15.4736 3.62463 15.1874 3.91078L2.78736 13.9262Z" fill="#09075C"/><g><path d="M28.9238 17.3602H27.1115L26.6345 16.2156C26.3484 15.5479 25.6807 15.071 24.9176 15.071H15.6653C14.9022 15.071 14.2345 15.5479 13.9483 16.2156L13.4714 17.3602H11.6591C10.896 17.3602 10.2283 18.0279 10.2283 18.791V19.2679C10.2283 19.9356 10.6099 20.4126 11.2776 20.6033C10.9914 21.0802 10.896 21.5572 10.896 22.1295V24.5141C10.896 25.2772 11.1822 26.0403 11.7545 26.6126V28.6157C11.7545 29.5695 12.5176 30.3326 13.4714 30.3326H14.8068C15.7606 30.3326 16.5237 29.5695 16.5237 28.6157V27.471H23.9638V28.6157C23.9638 29.5695 24.7268 30.3326 25.6807 30.3326H27.0161C27.9699 30.3326 28.733 29.5695 28.733 28.6157V26.6126C29.3053 26.0403 29.6868 25.2772 29.6868 24.5141V22.1295C29.6868 21.5572 29.4961 21.0802 29.3053 20.6033C29.8776 20.4126 30.3545 19.8402 30.3545 19.2679V18.791C30.3545 18.0279 29.6868 17.3602 28.9238 17.3602ZM29.0192 18.791V19.2679C29.0192 19.2679 29.0192 19.3633 28.9238 19.3633H28.0653L27.7791 18.6002H29.0192C29.0192 18.6002 29.1145 18.6002 29.1145 18.6956L29.0192 18.791ZM25.2991 27.5664H27.493V28.711C27.493 28.711 27.3022 29.188 27.0161 29.188H25.6807C25.6807 29.188 25.2038 28.9972 25.2038 28.711V27.5664H25.2991ZM11.4683 19.2679V18.791C11.4683 18.791 11.4683 18.6956 11.5637 18.6956H12.8037L12.5176 19.4587H11.6591C11.6591 19.4587 11.5637 19.4587 11.5637 19.3633L11.4683 19.2679ZM26.7299 20.5079C27.6838 20.5079 28.3515 21.271 28.3515 22.1295V24.5141C28.3515 25.468 27.5884 26.1356 26.7299 26.1356H13.7576C12.8037 26.1356 12.136 25.3726 12.136 24.5141V22.1295C12.136 21.1756 12.8991 20.5079 13.7576 20.5079H26.7299ZM14.0437 19.2679L15.093 16.8833C15.093 16.8833 15.3791 16.5018 15.6653 16.5018H24.9176C24.9176 16.5018 25.3945 16.5972 25.4899 16.8833L26.5391 19.2679H14.0437ZM15.2837 27.5664V28.711C15.2837 28.711 15.093 29.188 14.8068 29.188H13.4714C13.4714 29.188 12.9945 28.9972 12.9945 28.711V27.5664H15.1883H15.2837Z" fill="#09075C"/><path d="M12.8035 21.3666C12.8035 21.3666 12.5173 21.7481 12.5173 22.0343C12.6127 23.3697 13.4712 24.4189 14.7112 24.8004C14.7112 24.8004 15.9512 25.0866 16.6189 25.182C16.6189 25.182 16.7143 25.182 16.8097 25.182C17.0004 25.182 17.1912 25.182 17.2866 24.9912C17.5727 24.7051 17.4774 24.2281 17.4774 24.1327C17.382 23.465 17.0004 22.225 15.8558 21.5574C15.8558 21.5574 15.0609 21.4302 13.4712 21.1758C13.4712 21.1758 12.8989 21.1758 12.7081 21.3666H12.8035ZM16.0466 23.7512C16.0466 23.7512 15.3789 23.6558 15.1881 23.5604C15.0927 23.5604 14.9973 23.5604 14.9973 23.5604C14.425 23.3697 14.0435 23.0835 13.8527 22.5112C14.425 22.5112 14.9973 22.702 15.2835 22.702C15.665 22.8927 15.8558 23.3697 16.0466 23.7512Z" fill="#09075C"/><path d="M18.3363 23.5603H21.8656C21.8656 23.5603 22.5333 23.2741 22.5333 22.8926C22.5333 22.511 22.2471 22.2249 21.8656 22.2249H18.3363C18.3363 22.2249 17.6686 22.511 17.6686 22.8926C17.6686 23.2741 17.9548 23.5603 18.3363 23.5603Z" fill="#09075C"/><path d="M18.3363 25.0861H21.8656C21.8656 25.0861 22.5333 24.8 22.5333 24.4184C22.5333 24.0369 22.2471 23.7508 21.8656 23.7508H18.3363C18.3363 23.7508 17.6686 24.0369 17.6686 24.4184C17.6686 24.8 17.9548 25.0861 18.3363 25.0861Z" fill="#09075C"/><path d="M23.7726 25.1815C23.7726 25.1815 23.868 25.1815 23.9633 25.1815C24.5356 25.0861 25.871 24.7999 25.871 24.7999C27.111 24.4184 27.8741 23.3692 27.9695 22.0338C27.9695 21.7476 27.9695 21.5569 27.6834 21.3661C27.4926 21.1753 27.2064 21.0799 26.9203 21.1753C25.4577 21.4297 24.6628 21.5569 24.5356 21.5569C23.391 22.1292 23.0095 23.3692 22.9141 24.1322C22.9141 24.323 22.8187 24.7046 23.1049 24.9907C23.2003 25.0861 23.391 25.1815 23.5818 25.1815H23.7726ZM24.4403 23.7507C24.4403 23.7507 24.8218 22.9876 25.2033 22.7015C25.3941 22.7015 26.0618 22.6061 26.6341 22.5107C26.5387 22.8922 26.1572 23.3692 25.5849 23.5599C25.5849 23.5599 25.0126 23.6553 24.5356 23.7507H24.4403Z" fill="#09075C"/></g></g></symbol><symbol fill="none" id="cro12574-check" viewBox="0 0 14 14"><g><path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="#09075C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></g></symbol><symbol fill="none" id="cro12574-arrow" viewBox="0 0 16 16"><g><path d="M3.33333 8H12.6667M8.66667 12L12.6667 8L8.66667 4" stroke="#09075C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></g></symbol><symbol fill="none" id="cro12574-clock" viewBox="0 0 16 16"><g><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#CFE0FF" stroke-width="1.33333"/><path d="M8 4.66667V8L10 9.33333" stroke="#CFE0FF" stroke-width="1.33333"/></g></symbol><symbol fill="none" id="cro12574-chevl" viewBox="0 0 20 20"><g><path d="M12.5 15L7.5 10L12.5 5" stroke="white" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/></g></symbol><symbol fill="none" id="cro12574-chevr" viewBox="0 0 20 20"><g><path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/></g></symbol><symbol fill="none" id="cro12574-star" viewBox="0 0 13.27 12.71"><g><path d="M6.63328 0.280852C6.5262 0.2833 6.42166 0.314028 6.33029 0.369918C6.23891 0.425808 6.16394 0.504871 6.11299 0.599088L4.46456 3.9532L0.763588 4.47349C0.65801 4.49557 0.560219 4.54538 0.480269 4.61778C0.400319 4.69019 0.341096 4.78258 0.308689 4.88546C0.276282 4.98833 0.271861 5.09799 0.29588 5.20314C0.319898 5.3083 0.371491 5.40516 0.445352 5.48376L3.10574 8.05716L2.49845 11.7598C2.48614 11.8403 2.49097 11.9225 2.51265 12.0011C2.53433 12.0796 2.57235 12.1526 2.62423 12.2154C2.67611 12.2782 2.74067 12.3293 2.81369 12.3654C2.88671 12.4015 2.96653 12.4218 3.04793 12.4249L3.33698 12.3688L6.63328 10.6339L9.92958 12.3688L10.2186 12.4249C10.3 12.4218 10.3799 12.4015 10.4529 12.3654C10.5259 12.3293 10.5905 12.2782 10.6423 12.2154C10.6942 12.1526 10.7322 12.0796 10.7539 12.0011C10.7756 11.9225 10.7804 11.8403 10.7681 11.7598L10.1608 8.05884L12.8212 5.48545C12.8951 5.40684 12.9467 5.30998 12.9707 5.20483C12.9947 5.09967 12.9903 4.99002 12.9579 4.88714C12.9255 4.78426 12.8662 4.69187 12.7863 4.61946C12.7063 4.54706 12.6086 4.49726 12.503 4.47517L8.802 3.9532L7.15357 0.599088C7.10262 0.504871 7.02765 0.425808 6.93627 0.369918C6.8449 0.314028 6.74037 0.2833 6.63328 0.280852Z" fill="#F5BA19" stroke="#EEAB10" stroke-width="0.561263"/></g></symbol><symbol fill="none" id="cro12574-user" viewBox="0 0 24 24"><g><path d="M12 12C13.0609 12 14.0783 11.5786 14.8284 10.8284C15.5786 10.0783 16 9.06087 16 8C16 6.93913 15.5786 5.92172 14.8284 5.17157C14.0783 4.42143 13.0609 4 12 4C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8C8 9.06087 8.42143 10.0783 9.17157 10.8284C9.92172 11.5786 10.9391 12 12 12Z" stroke="#09075C" stroke-width="2"/><path d="M4 21C4 18.8783 4.84285 16.8434 6.34315 15.3431C7.84344 13.8429 9.87827 13 12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21" stroke="#09075C" stroke-width="2"/></g></symbol><symbol fill="none" id="cro12574-claim" viewBox="0 0 24 24"><g><path d="M9 12L11 14L15 10" stroke="#09075C" stroke-width="2"/><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#09075C" stroke-width="2"/></g></symbol><symbol fill="none" id="cro12574-wa" viewBox="0 0 24 24"><g><path d="M12 2C10.2285 2.00737 8.49066 2.48523 6.96442 3.38469C5.43818 4.28414 4.17828 5.57291 3.31361 7.11913C2.44895 8.66535 2.01057 10.4135 2.04332 12.1848C2.07607 13.956 2.57877 15.6868 3.5 17.2L2 22L6.9 20.5C8.22106 21.3182 9.71464 21.8174 11.2622 21.9577C12.8098 22.0981 14.3688 21.8759 15.8155 21.3087C17.2623 20.7416 18.5569 19.845 19.5968 18.6903C20.6366 17.5355 21.393 16.1543 21.806 14.6562C22.219 13.1582 22.2772 11.5845 21.9759 10.06C21.6747 8.53558 21.0223 7.1023 20.0705 5.87392C19.1188 4.64554 17.8939 3.65587 16.493 2.98342C15.0921 2.31098 13.5537 1.97426 12 2ZM12 20C10.5592 20.0092 9.14267 19.6292 7.9 18.9L7.6 18.7L4.7 19.6L5.6 16.8L5.4 16.5C4.39483 15.0225 3.91327 13.2511 4.03209 11.468C4.15092 9.68503 4.86329 7.99313 6.05563 6.66211C7.24796 5.3311 8.8516 4.4376 10.6109 4.12409C12.3701 3.81059 14.1837 4.09512 15.7624 4.93232C17.3411 5.76952 18.5941 7.11118 19.3215 8.74339C20.049 10.3756 20.209 12.2044 19.7761 13.9381C19.3432 15.6718 18.3422 17.2107 16.9329 18.3094C15.5236 19.408 13.787 20.0032 12 20ZM16.4 14C16.2 13.9 15 13.3 14.8 13.2C14.6 13.1 14.4 13.1 14.3 13.3C14.2 13.5 13.7 14.1 13.5 14.3C13.3 14.5 13.2 14.5 13 14.4C12.3027 14.1116 11.6601 13.7057 11.1 13.2C10.5501 12.7074 10.078 12.1342 9.7 11.5C9.6 11.2 9.7 11.1 9.8 11L10.2 10.6L10.4 10.2V9.8C10.4 9.7 9.9 8.5 9.7 8.1C9.5 7.7 9.3 7.7 9.2 7.7H8.7C8.56848 7.69579 8.43765 7.72048 8.3167 7.77231C8.19576 7.82414 8.08765 7.90186 8 8C7.71078 8.2671 7.48114 8.59218 7.32606 8.95403C7.17098 9.31588 7.09395 9.70636 7.1 10.1C7.17477 11.0452 7.52215 11.9483 8.1 12.7C9.17187 14.3248 10.6557 15.6361 12.4 16.5C13 16.8 13.5 16.9 13.9 17C14.4184 17.1567 14.9661 17.1909 15.5 17.1C15.8507 17.0278 16.1828 16.884 16.4753 16.6775C16.7678 16.471 17.0145 16.2063 17.2 15.9C17.3498 15.5183 17.3845 15.1012 17.3 14.7C17.3 14.6 17.1 14.5 16.9 14.4L16.4 14Z" fill="#25D366"/></g></symbol><symbol fill="none" id="cro12574-arrsm" viewBox="0 0 14 14"><g><path d="M2.9166 7H11.0833M7.58326 10.5L11.0833 7L7.58326 3.5" stroke="#5A5F73" stroke-width="1.45833" stroke-linecap="round" stroke-linejoin="round"/></g></symbol></defs></svg>
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Health &middot; Pet &middot; Gap &middot; Car &amp; Home</p>
      <h1>Insurance that pays your <span class="hl">claims</span> upfront.</h1>
      <p class="lead">Settle your doctor, vet or hospital bill on the spot with your Oneplan Claim Card, never weeks out of pocket. See your price online in 2 minutes. No agent call needed.</p>
      <!-- price/product router lives IN the fold -->
      <div class="hero-router" id="router">
        <p class="router-q">What would you like to cover? Pick one to start.</p>
        <div class="router-grid" role="radiogroup" aria-label="Choose a product to quote">
          <button type="button" class="rchip is-selected" role="radio" aria-checked="true" data-label="Health" data-url="https://health.oneplan.co.za/?referrer=homepagequote">
            <svg class="ric"><use href="#cro12574-health"></use></svg>
            <span class="txt"><span class="rname">Health</span><span class="rprice">from R250<small>/mo</small></span></span>
            <span class="rtick"><svg><use href="#cro12574-check"></use></svg></span>
          </button>
          <button type="button" class="rchip" role="radio" aria-checked="false" data-label="Pet" data-url="https://www.onepet.co.za?referrer=homepagequote">
            <svg class="ric"><use href="#cro12574-pet"></use></svg>
            <span class="txt"><span class="rname">Pet</span><span class="rprice">from R80<small>/mo</small></span></span>
            <span class="rtick"><svg><use href="#cro12574-check"></use></svg></span>
          </button>
          <button type="button" class="rchip" role="radio" aria-checked="false" data-label="Gap" data-url="https://gap.oneplan.co.za/?Referrer=homepagequote">
            <svg class="ric"><use href="#cro12574-gap"></use></svg>
            <span class="txt"><span class="rname">Gap</span><span class="rprice">from R150<small>/mo</small></span></span>
            <span class="rtick"><svg><use href="#cro12574-check"></use></svg></span>
          </button>
          <button type="button" class="rchip" role="radio" aria-checked="false" data-label="Car &amp; Household" data-url="https://oneplanshortterm.co.za/?referrer=homepagequote">
            <svg class="ric"><use href="#cro12574-car"></use></svg>
            <span class="txt"><span class="rname">Car &amp; Household</span><span class="rprice">Tailored</span></span>
            <span class="rtick"><svg><use href="#cro12574-check"></use></svg></span>
          </button>
        </div>
        <div class="hero-cta">
          <a class="btn btn-teal" id="quoteCta" href="https://health.oneplan.co.za/?referrer=homepagequote">Get my Health quote <svg><use href="#cro12574-arrow"></use></svg></a>
          <span class="time"><svg><use href="#cro12574-clock"></use></svg> About 2 minutes</span>
        </div>
      </div>
      <p class="hero-legal desktop-legal">T&amp;Cs apply. Bryte licensed Insurer and Auth FSP(17703). Oneplan is a non-life Insurance product, not a medical aid.</p>
    </div>
  </div>
  <img class="hero-photo-m" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-1.jpg" alt="The Oneplan family on a blue couch" loading="lazy">
  <p class="hero-legal mobile-legal">T&amp;Cs apply. Bryte licensed Insurer and Auth FSP(17703). Oneplan is a non-life Insurance product, not a medical aid.</p>
</section>

<!-- trust ribbon: white stat card straddling the hero edge (logo links to the Hellopeter profile) -->
<div class="wrap trust-wrap">
  <div class="trust-ribbon">
    <a class="tr-logo" href="https://www.hellopeter.com/oneplan" data-cro-placeholder="verify-destination" target="_blank" rel="noopener"><img class="hp" src="https://www.oneplan.co.za/assets/2025/hellopeter-blue.svg" alt="Hellopeter"></a>
    <span class="tr-badge">10/10 Trust Index</span>
    <span class="tr-main">
      <span class="tr-num">4.59</span>
      <img class="stars" src="https://www.oneplan.co.za/assets/landings/img/hellopeterstars.svg" alt="4.59 stars">
    </span>
    <span class="tr-based">Based on <b>23,019</b> reviews</span>
    <span class="tr-dot"></span>
    <span class="tr-stats">
      <span class="tr-stat"><b>23,019</b>&nbsp;reviews</span>
      <span class="tr-dot"></span>
      <span class="tr-stat"><b>10/10</b>&nbsp;Trust Index</span>
    </span>
  </div>
</div>

<!-- ===================== PRODUCT DETAIL (what's covered - the router lives in the hero) ===================== -->
<section class="products" id="products">
  <div class="wrap">
    <div class="section-head">
      <h2>What each plan covers</h2>
      <p>A quick look at what you get with each type of cover. Prices are a monthly starting point, and your quote is tailored to you.</p>
    </div>
    <div class="card-grid">

      <div class="pcard pcard-featured">
        <span class="featured-chip">Most chosen</span>
        <span class="picon"><svg><use href="#cro12574-health"></use></svg></span>
        <h3>Health Insurance</h3>
        <div class="price">from R250<small>/mo</small></div>
        <p>Access to a wide range of benefits and private hospitals like Netcare, Life and Mediclinic, plus day-to-day claims paid upfront.</p>
        <div class="pcta">
          <a class="btn btn-teal" href="https://health.oneplan.co.za/?referrer=homepagequote">Get online quote <svg><use href="#cro12574-arrow"></use></svg></a>
          <a class="seeplans" href="https://www.oneplan.co.za/plans/HealthPlans">See plans &amp; what's covered</a>
        </div>
      </div>

      <div class="pcard">
        <span class="picon"><svg><use href="#cro12574-pet"></use></svg></span>
        <h3>Pet Insurance</h3>
        <div class="price">from R80<small>/mo</small></div>
        <p>We love pets as much as you do. Cover for your furry, four-legged family for accidents, illnesses and quick trips to the vet.</p>
        <div class="pcta">
          <a class="btn btn-teal" href="https://www.onepet.co.za?referrer=homepagequote">Get online quote <svg><use href="#cro12574-arrow"></use></svg></a>
          <a class="seeplans" href="https://www.oneplan.co.za/plans/PetPlans">See plans &amp; what's covered</a>
        </div>
      </div>

      <div class="pcard">
        <span class="picon"><svg><use href="#cro12574-gap"></use></svg></span>
        <h3>Gap Cover</h3>
        <div class="price">from R150<small>/mo</small></div>
        <p>We double or quadruple scheme pay-outs, even within the MSA savings threshold, plus cover for cancer, mental health and more at no extra premium.</p>
        <div class="pcta">
          <a class="btn btn-teal" href="https://gap.oneplan.co.za/?Referrer=homepagequote">Get online quote <svg><use href="#cro12574-arrow"></use></svg></a>
          <a class="seeplans" href="https://www.oneplan.co.za/gap/plansandpricing">See plans &amp; what's covered</a>
        </div>
      </div>

      <div class="pcard">
        <span class="picon"><svg><use href="#cro12574-car"></use></svg></span>
        <h3>Car &amp; Household</h3>
        <div class="price"><span class="price-tailored">Tailored quote</span></div>
        <p>We can never predict when things go wrong, but we can make sure you have flexible cover, because some cover is better than none.</p>
        <div class="pcta">
          <a class="btn btn-teal" href="https://oneplanshortterm.co.za/?referrer=homepagequote">Get online quote <svg><use href="#cro12574-arrow"></use></svg></a>
          <a class="seeplans" href="https://www.oneplan.co.za/about/shortterm-insurance">See plans &amp; what's covered</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ===================== REVIEWS (carousel) ===================== -->
<section class="reviews">
    <div class="wrap rev-head">
      <h2>Making our <span class="hl2">customers smile</span> is at the heart of what we do</h2>
      <a class="hp-link" href="https://www.hellopeter.com/oneplan" data-cro-placeholder="verify-destination" target="_blank" rel="noopener"><img class="hp-logo" src="https://www.oneplan.co.za/assets/2025/hellopeter-white.svg" alt="Hellopeter"></a>
    </div>
    <div class="rev-carousel">
      <button class="rev-nav prev" aria-label="Previous reviews" type="button"><svg><use href="#cro12574-chevl"></use></svg></button>
      <div class="rev-track" id="revTrack">
        <div class="rev"><div class="name">Pauline van der Spuy</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>I appreciate getting a reply from a real person</h5><div class="quote"><p>"I contacted Oneplan after hours on a Friday night and received a very prompt, informative reply from Keoagile Mosime. I really appreciate getting a reply from a real person instead of a machine like some companies."</p></div></div>
        <div class="rev"><div class="name">Julianna</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>An amazing gesture with outstanding hospital bills</h5><div class="quote"><p>"The company amazed me and my family with the extended financial help for my late husband's hospital bills. Ronald and Renee literally held my hand in helping me with the shortfall."</p></div></div>
        <div class="rev"><div class="name">Rene N</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>A good and effective medical plan</h5><div class="quote"><p>"It gives me as a fur baby mom breathing space in medical situations. I know I have a back-up plan. The service is exceptional, friendly and fast."</p></div></div>
        <div class="rev"><div class="name">Melanie V</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>Friendly and efficient service</h5><div class="quote"><p>"I've had medical insurance for all three of my dogs for a while now. To my delight the claim has been settled in full. I'm grateful for the cover and the friendly, efficient service from Kim Street!"</p></div></div>
        <div class="rev"><div class="name">Doug T</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>Exceptional service</h5><div class="quote"><p>"Fantastic service from Razia Yousuf. Clear and to the point, very helpful and a pleasure to deal with. Thank you for helping me insure my little cat."</p></div></div>
        <div class="rev"><div class="name">Erthney A</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>One Plan came through</h5><div class="quote"><p>"This was the first time that I needed in-hospital treatment, and One Plan came through. I was admitted to the best private hospital and received the best care. I can sing their praises from the rooftops!"</p></div></div>
        <div class="rev"><div class="name">Justine H</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>Top service from Oneplan Health Insurance</h5><div class="quote"><p>"I have been with Oneplan since 2014. This year has been a bad year with two accidents. Each time they have paid my hospital bill, and I am so grateful."</p></div></div>
        <div class="rev"><div class="name">Masello M</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>Best car insurance for people who love their cars</h5><div class="quote"><p>"My car accident claim was attended to like a patient in a 5-star private hospital. Because I sent all the documents, my claim was approved. I have been with them since 2021."</p></div></div>
        <div class="rev"><div class="name">Watson C</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>So friendly and approachable</h5><div class="quote"><p>"I cannot express enough gratitude for the incredible service from consultant Sweetness. She made what could have been a daunting process effortless and stress-free."</p></div></div>
        <div class="rev"><div class="name">Colette</div><div class="stars" aria-label="5 star review"><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg><svg><use href="#cro12574-star"></use></svg></div><h5>Super customer service</h5><div class="quote"><p>"I had questions about my policy and contacted Oneplan via WhatsApp. The friendly Shannon McPherson was so helpful. I really felt like I got super customer service. Thank you Oneplan."</p></div></div>
      </div>
      <button class="rev-nav next" aria-label="Next reviews" type="button"><svg><use href="#cro12574-chevr"></use></svg></button>
    </div>
    <p class="rev-all"><a href="https://www.hellopeter.com/oneplan" data-cro-placeholder="verify-destination" target="_blank" rel="noopener">See all 23,019 reviews on Hellopeter &rarr;</a></p>
</section>

<!-- ===================== CLAIMS CARD USP (contrast) ===================== -->
<section class="usp">
  <div class="wrap">
    <div class="section-head">
      <p class="usp-kicker">The Oneplan Claim Card</p>
      <h2>Most cover pays you back. We pay upfront.</h2>
      <p class="usp-sub">We load your claim onto your Oneplan Claim Card, so you tap and settle the bill on the spot. You're never out of pocket waiting for a refund.</p>
    </div>
    <!-- the actual product, so the claim isn't abstract -->
    <img class="claimcard-photo" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-2.webp" alt="The Oneplan Claim Card" width="412" height="265" loading="lazy">
    <div class="compare">
      <div class="cmp cmp-old">
        <div class="cmp-vs" aria-hidden="true">vs</div>
        <div class="cmp-head">The usual way</div>
        <ol class="cmp-steps">
          <li><span class="s-n">1</span>Pay the doctor or vet yourself</li>
          <li><span class="s-n">2</span>Submit a claim and wait</li>
          <li><span class="s-n">3</span>Get refunded weeks later - if approved</li>
        </ol>
      </div>
      <div class="cmp cmp-new">
        <div class="cmp-head">With your Oneplan Card</div>
        <ol class="cmp-steps">
          <li><span class="s-n"><svg><use href="#cro12574-check"></use></svg></span>We load the claim onto your card</li>
          <li><span class="s-n"><svg><use href="#cro12574-check"></use></svg></span>Tap to pay the bill on the spot</li>
          <li><span class="s-n"><svg><use href="#cro12574-check"></use></svg></span>Done - never out of pocket</li>
        </ol>
      </div>
    </div>
    <p class="usp-foot">Mastercard-based, so it works anywhere they do - you can even draw cash for emergencies.</p>
    <div class="usp-cta">
      <a class="btn btn-teal" href="#router">Get a free online quote <svg><use href="#cro12574-arrow"></use></svg></a>
    </div>
  </div>
</section>

<!-- ===================== ANSWERS (exit-survey questions) ===================== -->
<section class="answers" id="answers">
  <div class="wrap">
    <div class="section-head">
      <h2>Everything you want to know before you decide</h2>
      <p>The questions people ask us most, answered upfront, so you can read first and talk later (or not at all).</p>
    </div>
    <div class="ans-grid">
      <div class="ans">
        <h4><span class="dot"></span>What does it cover?</h4>
        <p>See exactly what each plan includes - day-to-day, hospital, chronic and more - in plain language, with a simple plan comparison.</p>
        <a href="https://www.oneplan.co.za/plans/HealthPlans">Compare plans &amp; benefits</a>
      </div>
      <div class="ans">
        <h4><span class="dot"></span>How much does it cost?</h4>
        <p>Health from R250, Pet from R80, Gap from R150 a month. Get a free online quote in about 2 minutes to see your own price - no agent call needed.</p>
        <a class="btn btn-teal" href="#router">See your price</a>
      </div>
      <div class="ans">
        <h4><span class="dot"></span>Is there a waiting period?</h4>
        <p>Some benefits have a waiting period before you can claim. See how waiting periods work for each plan, including pre-existing conditions and maternity.</p>
        <a href="https://www.oneplan.co.za/plans/HealthPlans">Read about waiting periods</a>
      </div>
    </div>
  </div>
</section>

<!-- ===================== FINAL CTA ===================== -->
<section class="finalcta">
  <div class="fc-bg fc-bg-r" aria-hidden="true"></div>
  <div class="fc-bg fc-bg-l" aria-hidden="true"></div>
  <img class="fc-card fc-card1" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-2.webp" alt="" aria-hidden="true" loading="lazy">
  <img class="fc-card fc-card2" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-2.webp" alt="" aria-hidden="true" loading="lazy">
  <img class="fc-hand" src="https://crp-clients-images.s3.af-south-1.amazonaws.com/Oneplan/Dev+%7C+AB+Homepage+Redesign+%7C+All+%7C+CRO-12574/CRO-12574-3.webp" alt="" aria-hidden="true" loading="lazy">
  <p class="eyebrow">Health &middot; Pet &middot; Gap &middot; Car &amp; Household</p>
  <h2>Ready when you are</h2>
  <p class="fc-copy">Work out an online quote and complete your Oneplan application in a few easy steps, in your own space. It only takes a few minutes, or chat to us if you need us.</p>
  <div class="row">
    <a class="btn btn-teal" href="#router">Get a free online quote <svg><use href="#cro12574-arrow"></use></svg></a>
    <a class="calllink" href="#" data-toggle="modal" data-target="#homePageCallMePopUp">Prefer a call? We'll phone you.</a>
  </div>
</section>

<!-- ===================== SELF-SERVE STRIP (existing customers) ===================== -->
<section class="selfserve">
  <div class="wrap">
    <p class="ss-head">Already with Oneplan?</p>
    <div class="ss-in">
      <a href="https://www.oneplan.co.za/login" data-cro-placeholder="verify-destination">
        <span class="ss-ic"><svg><use href="#cro12574-user"></use></svg></span>
        <span class="ss-tx"><b>Log in</b><span class="ss-sub">Manage your policy <svg><use href="#cro12574-arrsm"></use></svg></span></span>
      </a>
      <a href="#answers">
        <span class="ss-ic"><svg><use href="#cro12574-claim"></use></svg></span>
        <span class="ss-tx"><b>Make a claim</b><span class="ss-sub">Start or track a claim <svg><use href="#cro12574-arrsm"></use></svg></span></span>
      </a>
      <a class="wa" href="https://api.whatsapp.com/send?phone=27837945452&text=Hello" data-cro-placeholder="verify-destination">
        <span class="ss-ic"><svg><use href="#cro12574-wa"></use></svg></span>
        <span class="ss-tx"><b>Chat on WhatsApp</b><span class="ss-sub">Talk to us now <svg><use href="#cro12574-arrsm"></use></svg></span></span>
      </a>
    </div>
  </div>
</section>
</div>`;

        /* Anek Devanagari is not loaded by the site - pull it from Google
           Fonts once, before injection, so text renders in the right face */
        function injectFonts() {
            if (document.getElementById("cro-12574-fonts")) return;
            var pre1 = document.createElement("link");
            pre1.rel = "preconnect";
            pre1.href = "https://fonts.googleapis.com";
            var pre2 = document.createElement("link");
            pre2.rel = "preconnect";
            pre2.href = "https://fonts.gstatic.com";
            pre2.crossOrigin = "anonymous";
            var css = document.createElement("link");
            css.id = "cro-12574-fonts";
            css.rel = "stylesheet";
            css.href = "https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@400;500;600;700&display=swap";
            document.head.appendChild(pre1);
            document.head.appendChild(pre2);
            document.head.appendChild(css);
        }

        /* the live homepage's body content sits between the top nav and the
           footer, but the client re-skins/restructures it periodically (seen
           first-hand: the wrapping markup changed between builds of this
           test), so don't hardcode a specific class name. Instead climb from
           the stable .jumbotron anchor up to whichever ancestor is a sibling
           of #footer, then hide everything from there up to (not including)
           the footer - this self-adjusts whether that's one wrapper or many
           top-level blocks. Hide, don't remove, so any live script still
           holding a reference to those nodes doesn't error. */
        function hideLiveHomepageBody() {
            var jumbo = document.querySelector('.jumbotron');
            var footer = document.querySelector('#footer');
            if (!jumbo || !footer) return false;
            var start = jumbo;
            while (start.parentElement && start.parentElement !== footer.parentElement) {
                start = start.parentElement;
            }
            if (start.parentElement !== footer.parentElement) return false;
            var node = start;
            while (node && node !== footer) {
                var next = node.nextElementSibling;
                node.style.display = 'none';
                node = next;
            }
            return true;
        }

        function injectRedesign() {
            if (document.getElementById('cro-12574-redesign')) return;
            var footer = document.querySelector('#footer');
            if (!footer) return;
            footer.insertAdjacentHTML('beforebegin', FRAGMENT_HTML);
        }

        /* review carousel: arrow buttons scroll one card-width and loop infinitely
           in both directions (spec: return to the first review after the last one,
           and to the last review from the first); no auto-advance - user-driven only */
        function initReviewCarousel() {
            var track = document.getElementById('revTrack');
            if (!track) return;
            var step = function () {
                var c = track.querySelector('.rev');
                return c ? c.getBoundingClientRect().width + 20 : 270;
            };
            var atEnd = function () { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; };
            var atStart = function () { return track.scrollLeft <= 4; };
            var goNext = function () {
                if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
                else track.scrollBy({ left: step(), behavior: 'smooth' });
            };
            var goPrev = function () {
                if (atStart()) track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior: 'smooth' });
                else track.scrollBy({ left: -step(), behavior: 'smooth' });
            };
            var prev = document.querySelector('.rev-nav.prev');
            var next = document.querySelector('.rev-nav.next');
            if (prev) prev.addEventListener('click', goPrev);
            if (next) next.addEventListener('click', goNext);
        }

        /* in-page anchor buttons ("Get a free online quote" -> #router, "Make a
           claim" -> #answers): smooth scroll with a sticky-header offset. The
           default hash jump is instant and parks the target under the site's
           nav (#header.sticky switches to position:fixed, 61px, once the page
           is scrolled - exactly the state these buttons are clicked in). */
        function scrollToTarget(target) {
            var header = document.querySelector('#header');
            function offset() {
                return 16 + (header ? header.getBoundingClientRect().height : 0);
            }
            function go() {
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset();
                window.scrollTo({ top: top > 0 ? top : 0, behavior: 'smooth' });
            }
            go();
            /* late-loading images above the target can shift layout while the
               animation runs - re-check once it settles and correct if off */
            setTimeout(function () {
                var top = target.getBoundingClientRect().top;
                if (top < offset() - 8 || top > offset() + 60) go();
            }, 800);
        }
        function initSmoothScroll() {
            var links = [].slice.call(document.querySelectorAll('#cro-12574-redesign a[href^="#"]'));
            links.forEach(function (link) {
                var sel = link.getAttribute('href');
                if (sel === '#') return; /* modal trigger, not a scroll link */
                link.addEventListener('click', function (e) {
                    var target = document.querySelector(sel);
                    if (!target) return;
                    e.preventDefault();
                    /* the picker sits mid-hero: landing on it exactly crops the
                       headline above it. For #router, scroll to the hero top so
                       the visitor gets headline + picker together. */
                    if (sel === '#router') {
                        target = document.querySelector('#cro-12574-redesign .hero') || target;
                    }
                    scrollToTarget(target);
                });
            });
        }

        /* hero router: pick a product (chips select), the single CTA updates its label + destination */
        function initHeroRouter() {
            var chips = [].slice.call(document.querySelectorAll('#router .rchip'));
            var cta = document.getElementById('quoteCta');
            if (!chips.length || !cta) return;
            function select(chip) {
                chips.forEach(function (c) {
                    c.classList.remove('is-selected');
                    c.setAttribute('aria-checked', 'false');
                });
                chip.classList.add('is-selected');
                chip.setAttribute('aria-checked', 'true');
                cta.setAttribute('href', chip.getAttribute('data-url'));
                cta.firstChild.nodeValue = 'Get my ' + chip.getAttribute('data-label') + ' quote ';
            }
            chips.forEach(function (chip) {
                chip.addEventListener('click', function () { select(chip); });
            });
        }

        function init() {
            /* if the hide step can't find its anchors (site re-skinned again),
               bail out entirely rather than stacking two homepages */
            if (!hideLiveHomepageBody()) return;
            addClass('body', variation_name);
            injectFonts();
            injectRedesign();
            initHeroRouter();
            initReviewCarousel();
            initSmoothScroll();
        }

        /* Initialise variation */
        waitForElement('.jumbotron', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test " + variation_name);
    }
})();
