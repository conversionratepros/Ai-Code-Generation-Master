(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro12301";

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

        /* ── Size Differentiation helpers ── */

        var cro12301uid = 0;

        /* Figma-exported SVG icons keyed by "shape-size" */
        var CRO12301_SVG = {
            'square-s': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cclip_ss"><rect width="15.1875" height="15.1875" fill="white" transform="translate(14 14)"/></clipPath></defs><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><g clip-path="url(#cclip_ss)"><mask id="cmask_ss" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="14" width="16" height="16"><path d="M15.5183 14.6687H27.6687C28.138 14.6687 28.5181 15.049 28.5183 15.5183V27.6687C28.5183 28.1381 28.1381 28.5183 27.6687 28.5183H15.5183C15.049 28.5181 14.6687 28.138 14.6687 27.6687V15.5183C14.6689 15.0492 15.0492 14.6689 15.5183 14.6687Z" fill="white" stroke="white"/></mask><g mask="url(#cmask_ss)"><path d="M14.1687 15.8562L15.8562 14.1687" stroke="#ADADAD"/><path d="M14.1687 17.5437L17.5437 14.1687" stroke="#ADADAD"/><path d="M14.1687 19.2312L19.2312 14.1687" stroke="#ADADAD"/><path d="M14.1687 20.9187L20.9187 14.1687" stroke="#ADADAD"/><path d="M14.1687 22.6062L22.6062 14.1687" stroke="#ADADAD"/><path d="M14.1687 24.2937L24.2937 14.1687" stroke="#ADADAD"/><path d="M14.1687 25.9812L25.9812 14.1687" stroke="#ADADAD"/><path d="M14.1687 27.6687L27.6687 14.1687" stroke="#ADADAD"/><path d="M14.5062 29.0186L29.0187 14.5061" stroke="#ADADAD"/><path d="M16.1937 29.0186L29.0187 16.1936" stroke="#ADADAD"/><path d="M17.8812 29.0186L29.0187 17.8811" stroke="#ADADAD"/><path d="M19.5687 29.0186L29.0187 19.5686" stroke="#ADADAD"/><path d="M21.2562 29.0186L29.0187 21.2561" stroke="#ADADAD"/><path d="M22.9437 29.0186L29.0187 22.9436" stroke="#ADADAD"/><path d="M24.6312 29.0186L29.0187 24.6311" stroke="#ADADAD"/><path d="M26.3187 29.0186L29.0187 26.3186" stroke="#ADADAD"/><path d="M28.0062 29.0186L29.0187 28.0061" stroke="#ADADAD"/></g><path d="M15.5183 15.1687H27.6687C27.8619 15.1687 28.0181 15.3252 28.0183 15.5183V27.6687C28.0183 27.862 27.862 28.0183 27.6687 28.0183H15.5183C15.3252 28.0181 15.1687 27.8619 15.1687 27.6687V15.5183L15.1755 15.448C15.2035 15.3114 15.3114 15.2035 15.448 15.1755L15.5183 15.1687Z" stroke="#404040" stroke-width="2"/></g></svg>',

            'square-m': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cclip_sm"><rect width="20.25" height="20.25" fill="white" transform="translate(11 11)"/></clipPath></defs><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><g clip-path="url(#cclip_sm)"><mask id="cmask_sm" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="11" y="11" width="21" height="21"><path d="M13.0248 11.7251H29.225C29.9429 11.7251 30.5247 12.307 30.5248 13.0249V29.2251C30.5248 29.9431 29.9429 30.5249 29.225 30.5249H13.0248C12.3069 30.5248 11.725 29.943 11.725 29.2251V13.0249C11.7251 12.3071 12.307 11.7252 13.0248 11.7251Z" fill="white" stroke="white"/></mask><g mask="url(#cmask_sm)"><path d="M11.225 13.4751L13.475 11.2251" stroke="#ADADAD"/><path d="M11 15.7251L15.5 11.2251" stroke="#ADADAD"/><path d="M11.225 17.9751L17.975 11.2251" stroke="#ADADAD"/><path d="M11.225 20.2251L20.225 11.2251" stroke="#ADADAD"/><path d="M11.225 22.4751L22.475 11.2251" stroke="#ADADAD"/><path d="M11.225 24.7251L24.725 11.2251" stroke="#ADADAD"/><path d="M11.225 26.9751L26.975 11.2251" stroke="#ADADAD"/><path d="M11.225 29.2251L29.225 11.2251" stroke="#ADADAD"/><path d="M11.6749 31.025L31.0249 11.675" stroke="#ADADAD"/><path d="M13.9249 31.025L31.0249 13.925" stroke="#ADADAD"/><path d="M16.1749 31.025L31.0249 16.175" stroke="#ADADAD"/><path d="M18.4249 31.025L31.0249 18.425" stroke="#ADADAD"/><path d="M20.6749 31.025L31.0249 20.675" stroke="#ADADAD"/><path d="M22.9249 31.025L31.0249 22.925" stroke="#ADADAD"/><path d="M25.1749 31.025L31.0249 25.175" stroke="#ADADAD"/><path d="M27.4249 31.025L31.0249 27.425" stroke="#ADADAD"/><path d="M29.6749 31.025L31.0249 29.675" stroke="#ADADAD"/></g><path d="M13.0248 12.2251H29.225C29.6667 12.2251 30.0247 12.5832 30.0248 13.0249V29.2251C30.0248 29.6669 29.6668 30.0249 29.225 30.0249H13.0248C12.583 30.0248 12.225 29.6669 12.225 29.2251V13.0249C12.2251 12.5832 12.5831 12.2252 13.0248 12.2251Z" stroke="#404040" stroke-width="2"/></g></svg>',

            'square-l': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cclip_sl"><rect width="27" height="27" fill="white" transform="translate(8 8)"/></clipPath></defs><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><g clip-path="url(#cclip_sl)"><mask id="cmask_sl" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="8" y="8" width="27" height="27"><path d="M10.7004 8.80005H32.3C33.3494 8.80005 34.2004 9.6511 34.2004 10.7004V32.3C34.2004 33.3494 33.3494 34.2004 32.3 34.2004H10.7004C9.6511 34.2004 8.80005 33.3494 8.80005 32.3V10.7004C8.80005 9.6511 9.6511 8.80005 10.7004 8.80005Z" fill="white" stroke="white"/></mask><g mask="url(#cmask_sl)"><path d="M8.30005 11.3L11.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 14.3L14.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 17.3L17.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 20.3L20.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 23.3L23.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 26.3L26.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 29.3L29.3 8.30005" stroke="#ADADAD"/><path d="M8.30005 32.3L32.3 8.30005" stroke="#ADADAD"/><path d="M8.90002 34.7001L34.7 8.90015" stroke="#ADADAD"/><path d="M11.9 34.7001L34.7 11.9001" stroke="#ADADAD"/><path d="M14.9 34.7001L34.7 14.9001" stroke="#ADADAD"/><path d="M17.9 34.7001L34.7 17.9001" stroke="#ADADAD"/><path d="M20.9 34.7001L34.7 20.9001" stroke="#ADADAD"/><path d="M23.9 34.7001L34.7 23.9001" stroke="#ADADAD"/><path d="M26.9 34.7001L34.7 26.9001" stroke="#ADADAD"/><path d="M29.9 34.7001L34.7 29.9001" stroke="#ADADAD"/><path d="M32.9 34.7001L34.7 32.9001" stroke="#ADADAD"/></g><path d="M10.7004 9.30005H32.3C33.0732 9.30005 33.7004 9.92724 33.7004 10.7004V32.3C33.7004 33.0732 33.0732 33.7004 32.3 33.7004H10.7004C9.92724 33.7004 9.30005 33.0732 9.30005 32.3V10.7004C9.30005 9.92724 9.92724 9.30005 10.7004 9.30005Z" stroke="#404040" stroke-width="2"/></g></svg>',

            'rec-s': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><mask id="cmask_rs" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="14" width="10" height="15"><path d="M24.7667 27.8333V15.1663C24.7665 14.9202 24.5439 14.6664 24.2003 14.6663L17.7999 14.6663C17.4563 14.6663 17.2337 14.9202 17.2335 15.1663V27.8333C17.2335 28.0795 17.4562 28.3332 17.7999 28.3333L24.2003 28.3333C24.544 28.3331 24.7667 28.0794 24.7667 27.8333Z" fill="white" stroke="white"/></mask><g mask="url(#cmask_rs)"><path d="M23.4889 28.8333L25.2667 27.1666" stroke="#ADADAD"/><path d="M21.7112 28.8333L25.2667 25.4999" stroke="#ADADAD"/><path d="M19.9334 28.8333L25.2667 23.8333" stroke="#ADADAD"/><path d="M18.1556 28.8333L25.2667 22.1666" stroke="#ADADAD"/><path d="M16.7334 28.5L25.2667 20.5" stroke="#ADADAD"/><path d="M16.7334 26.8333L25.2667 18.8333" stroke="#ADADAD"/><path d="M16.7334 25.1665L25.2667 17.1665" stroke="#ADADAD"/><path d="M16.7334 23.5L25.2667 15.5" stroke="#ADADAD"/><path d="M16.7334 21.8333L24.9111 14.1666" stroke="#ADADAD"/><path d="M16.7334 20.1665L23.1334 14.1665" stroke="#ADADAD"/><path d="M16.7334 18.5L21.3556 14.1667" stroke="#ADADAD"/><path d="M16.7334 16.8333L19.5779 14.1666" stroke="#ADADAD"/><path d="M16.7334 15.1665L17.8 14.1665" stroke="#ADADAD"/></g><path d="M24.2667 15.1868C24.2564 15.1786 24.2352 15.1663 24.2003 15.1663L17.7999 15.1663C17.7651 15.1663 17.7439 15.1786 17.7335 15.1868V27.8127C17.7439 27.821 17.7649 27.8332 17.7999 27.8333L24.2003 27.8333C24.2353 27.8332 24.2564 27.821 24.2667 27.8127V15.1868Z" stroke="#404040" stroke-width="2"/></svg>',

            'rec-m': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cclip_rm"><rect width="22" height="22" fill="white" transform="matrix(0 -1 -1 1.19249e-08 32 32.8306)"/></clipPath></defs><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><g clip-path="url(#cclip_rm)"><mask id="cmask_rm" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="15" y="11" width="12" height="22"><path d="M26.3667 31.1194V12.5413C26.3664 12.0076 25.9336 11.5754 25.3999 11.5754L16.6001 11.5754C16.0664 11.5754 15.6336 12.0076 15.6333 12.5413L15.6333 31.1194C15.6333 31.6533 16.0662 32.0862 16.6001 32.0862L25.3999 32.0862C25.9338 32.0862 26.3667 31.6533 26.3667 31.1194Z" fill="white" stroke="white"/></mask><g mask="url(#cmask_rm)"><path d="M24.4223 32.5862L26.8667 30.1417" stroke="#ADADAD"/><path d="M21.9778 32.5862L26.8667 27.6973" stroke="#ADADAD"/><path d="M19.5334 32.5862L26.8667 25.2528" stroke="#ADADAD"/><path d="M17.0889 32.5862L26.8667 22.8084" stroke="#ADADAD"/><path d="M15.1334 32.0974L26.8667 20.3641" stroke="#ADADAD"/><path d="M15.1334 29.6528L26.8667 17.9195" stroke="#ADADAD"/><path d="M15.1334 27.2085L26.8667 15.4752" stroke="#ADADAD"/><path d="M15.1334 24.7639L26.8667 13.0306" stroke="#ADADAD"/><path d="M15.1334 22.3196L26.3778 11.0751" stroke="#ADADAD"/><path d="M15.1334 19.875L23.9333 11.075" stroke="#ADADAD"/><path d="M15.1333 17.4307L21.4889 11.0751" stroke="#ADADAD"/><path d="M15.1333 14.9861L19.0444 11.075" stroke="#ADADAD"/><path d="M15.1333 12.5417L16.6 11.0751" stroke="#ADADAD"/></g><path d="M25.8667 31.1194V12.5413C25.8664 12.2837 25.6575 12.0754 25.3999 12.0754L16.6001 12.0754C16.3425 12.0754 16.1336 12.2837 16.1333 12.5413V31.1194C16.1333 31.3771 16.3424 31.5862 16.6001 31.5862L25.3999 31.5862C25.6576 31.5862 25.8667 31.3771 25.8667 31.1194Z" stroke="#404040" stroke-width="2"/></g></svg>',

            'rec-l': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cclip_rl"><rect width="28" height="28" fill="white" transform="matrix(0 -1 -1 1.19249e-08 35 35)"/></clipPath></defs><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><g clip-path="url(#cclip_rl)"><mask id="cmask_rl" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="7" width="16" height="28"><path d="M28.4667 9.17785V32.8223C28.4667 33.8532 27.6309 34.689 26.6 34.689L15.4 34.689C14.3691 34.689 13.5333 33.8532 13.5333 32.8223L13.5333 9.17785C13.5333 8.14692 14.3691 7.31119 15.4 7.31119L26.6 7.31119C27.6309 7.31119 28.4667 8.14692 28.4667 9.17785Z" fill="white"/></mask><g mask="url(#cmask_rl)"><path d="M25.3556 34.689L28.4667 31.5779" stroke="#ADADAD"/><path d="M22.2445 34.689L28.4667 28.4667" stroke="#ADADAD"/><path d="M19.1333 34.689L28.4667 25.3556" stroke="#ADADAD"/><path d="M16.0222 34.689L28.4667 22.2445" stroke="#ADADAD"/><path d="M13.5333 34.0667L28.4667 19.1333" stroke="#ADADAD"/><path d="M13.5333 30.9556L28.4667 16.0222" stroke="#ADADAD"/><path d="M13.5333 27.8445L28.4667 12.9111" stroke="#ADADAD"/><path d="M13.5333 24.7334L28.4667 9.80006" stroke="#ADADAD"/><path d="M13.5334 21.6223L27.8445 7.3112" stroke="#ADADAD"/><path d="M13.5334 18.5112L24.7334 7.31123" stroke="#ADADAD"/><path d="M13.5333 15.4001L21.6222 7.31126" stroke="#ADADAD"/><path d="M13.5333 12.2891L18.5111 7.31128" stroke="#ADADAD"/><path d="M13.5334 9.17773L15.4 7.31107" stroke="#ADADAD"/></g><path d="M27.4667 32.8228V9.17822C27.4667 8.69973 27.0789 8.31128 26.6005 8.31104L15.4003 8.31104C14.9216 8.31104 14.5331 8.69958 14.5331 9.17822L14.5331 32.8228C14.5333 33.3012 14.9218 33.689 15.4003 33.689L26.6005 33.689C27.0787 33.6887 27.4664 33.301 27.4667 32.8228Z" stroke="#404040" stroke-width="2"/></g></svg>',

            'plank-s': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><mask id="cmask_ps" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="12" width="8" height="19"><path d="M17.8 29.9445L17.8 13.0556C17.8 12.5893 18.2773 12.2112 18.866 12.2112L23.13 12.2112C23.7188 12.2112 24.196 12.5893 24.196 13.0556L24.196 29.9445C24.196 30.4109 23.7188 30.789 23.13 30.789L18.866 30.789C18.2773 30.789 17.8 30.4109 17.8 29.9445Z" fill="white"/></mask><g mask="url(#cmask_ps)"><path d="M20.465 12.2112L17.8 14.3223" stroke="#ADADAD"/><path d="M23.13 12.2112L17.8 16.4334" stroke="#ADADAD"/><path d="M24.196 13.4778L17.8 18.5445" stroke="#ADADAD"/><path d="M24.196 15.5889L17.8 20.6555" stroke="#ADADAD"/><path d="M24.196 17.7L17.8 22.7666" stroke="#ADADAD"/><path d="M24.196 19.8113L17.8 24.8779" stroke="#ADADAD"/><path d="M24.196 21.9224L17.8 26.989" stroke="#ADADAD"/><path d="M24.196 24.0334L17.8 29.1001" stroke="#ADADAD"/><path d="M24.196 26.1445L18.333 30.789" stroke="#ADADAD"/><path d="M24.1959 28.2556L20.9979 30.7889" stroke="#ADADAD"/><path d="M24.1961 30.3667L23.6631 30.7889" stroke="#ADADAD"/></g><path d="M18.8 29.7815C18.8191 29.7854 18.8412 29.7893 18.8665 29.7893L23.1331 29.7893C23.1586 29.7893 23.1813 29.7854 23.2004 29.7815L23.2004 13.218C23.1813 13.2141 23.1585 13.2112 23.1331 13.2112L18.8665 13.2112C18.8412 13.2112 18.8191 13.2142 18.8 13.218L18.8 29.7815Z" stroke="#404040" stroke-width="2"/></svg>',

            'plank-m': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><mask id="cmask_pm" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="10" width="9" height="24"><path d="M17.6333 32.6666L17.6333 11.3333C17.6333 10.7442 18.2104 10.2666 18.9222 10.2666L24.0777 10.2666C24.7896 10.2666 25.3666 10.7442 25.3666 11.3333L25.3666 32.6666C25.3666 33.2557 24.7896 33.7333 24.0777 33.7333L18.9222 33.7333C18.2104 33.7333 17.6333 33.2557 17.6333 32.6666Z" fill="white"/></mask><g mask="url(#cmask_pm)"><path d="M20.8555 10.2666L17.6333 12.9333" stroke="#ADADAD"/><path d="M24.0777 10.2666L17.6333 15.5999" stroke="#ADADAD"/><path d="M25.3666 11.8667L17.6333 18.2667" stroke="#ADADAD"/><path d="M25.3666 14.5332L17.6333 20.9332" stroke="#ADADAD"/><path d="M25.3666 17.2L17.6333 23.6" stroke="#ADADAD"/><path d="M25.3666 19.8667L17.6333 26.2667" stroke="#ADADAD"/><path d="M25.3666 22.5332L17.6333 28.9332" stroke="#ADADAD"/><path d="M25.3666 25.2L17.6333 31.6" stroke="#ADADAD"/><path d="M25.3666 27.8667L18.2777 33.7334" stroke="#ADADAD"/><path d="M25.3667 30.5332L21.5 33.7332" stroke="#ADADAD"/><path d="M25.3666 33.2L24.7222 33.7333" stroke="#ADADAD"/></g><path d="M18.6333 32.6348C18.6369 32.6385 18.6409 32.6445 18.648 32.6504C18.6922 32.687 18.7864 32.7334 18.9224 32.7334L24.0776 32.7334C24.2134 32.7334 24.3067 32.687 24.3511 32.6504C24.3583 32.6444 24.3631 32.6386 24.3667 32.6348L24.3667 11.3652C24.3631 11.3614 24.3584 11.3557 24.3511 11.3496C24.3067 11.313 24.2134 11.2666 24.0776 11.2666L18.9224 11.2666C18.7864 11.2666 18.6922 11.313 18.6479 11.3496C18.6408 11.3555 18.6369 11.3615 18.6333 11.3652L18.6333 32.6348Z" stroke="#404040" stroke-width="2"/></svg>',

            'plank-l': '<svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21.5" cy="21.5" r="21.5" fill="#EAEAEA"/><mask id="cmask_pl" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="15" y="4" width="12" height="35"><path d="M15.6666 37.0556L15.6666 5.94447C15.6666 5.08536 16.4626 4.38892 17.4444 4.38892L24.5555 4.38892C25.5374 4.38892 26.3333 5.08536 26.3333 5.94447L26.3333 37.0556C26.3333 37.9147 25.5374 38.6111 24.5555 38.6111L17.4444 38.6111C16.4626 38.6111 15.6666 37.9147 15.6666 37.0556Z" fill="white"/></mask><g mask="url(#cmask_pl)"><path d="M20.1111 4.38892L15.6666 8.2778" stroke="#ADADAD"/><path d="M24.5555 4.38892L15.6666 12.1667" stroke="#ADADAD"/><path d="M26.3333 6.72217L15.6666 16.0555" stroke="#ADADAD"/><path d="M26.3333 10.6111L15.6666 19.9444" stroke="#ADADAD"/><path d="M26.3333 14.5L15.6666 23.8333" stroke="#ADADAD"/><path d="M26.3333 18.3889L15.6666 27.7223" stroke="#ADADAD"/><path d="M26.3333 22.2778L15.6666 31.6112" stroke="#ADADAD"/><path d="M26.3333 26.1667L15.6666 35.5001" stroke="#ADADAD"/><path d="M26.3333 30.0557L16.5555 38.6112" stroke="#ADADAD"/><path d="M26.3333 33.9446L21 38.6112" stroke="#ADADAD"/><path d="M26.3333 37.8333L25.4445 38.611" stroke="#ADADAD"/></g><path d="M16.6666 5.94458L16.6666 37.0559C16.6669 37.2415 16.8855 37.6114 17.444 37.6116L24.5553 37.6116C25.1141 37.6116 25.3334 37.2416 25.3336 37.0559L25.3336 5.94458C25.3336 5.75901 25.1145 5.38892 24.5553 5.38892L17.444 5.38892C16.955 5.38908 16.7268 5.67235 16.6774 5.86743L16.6666 5.94458Z" stroke="#404040" stroke-width="2"/></svg>'
        };

        function parseDimensions(title) {
            /* Handles "430 x 430mm", "600mm x 600mm", "300 x 300 x 4mm" */
            var match = title.match(/(\d+)\s*(?:mm)?\s*[xX×]\s*(\d+)(?:\s*[xX×]\s*\d+)?\s*(?:mm)?/);
            if (!match) return null;
            var a = parseInt(match[1], 10);
            var b = parseInt(match[2], 10);
            return { w: Math.min(a, b), h: Math.max(a, b) };
        }

        function getSizeCategory(maxMm) {
            if (maxMm <= 300) return 'S';
            if (maxMm <= 600) return 'M';
            if (maxMm <= 800) return 'L';
            return 'XL';
        }

        function getShape(w, h) {
            var ratio = h / w;
            if (ratio === 1) return 'square';
            if (ratio <= 2) return 'rectangle';
            return 'plank';
        }

        function getShapeSVG(shape, category) {
            var uid = ++cro12301uid;
            var size = (category === 'XL') ? 'l' : category.toLowerCase();
            var key = (shape === 'rectangle' ? 'rec' : shape) + '-' + size;
            var svg = CRO12301_SVG[key] || '';
            /* Suffix all IDs with uid to prevent collisions across multiple cards */
            svg = svg.replace(/id="([^"]+)"/g, function (m, id) { return 'id="' + id + '_' + uid + '"'; });
            svg = svg.replace(/url\(#([^)]+)\)/g, function (m, id) { return 'url(#' + id + '_' + uid + ')'; });
            svg = svg.replace('<svg ', '<svg class="cro12301-tile-icon" overflow="hidden" ');
            return svg;
        }

        function buildSizeBadge(dims) {
            var category = getSizeCategory(dims.h);
            var shape = getShape(dims.w, dims.h);
            var svg = getShapeSVG(shape, category);
            var label = 'Size: ' + category;
            var dimText = dims.h + 'mm × ' + dims.w + 'mm';
            return (
                '<div class="cro12301-size-badge">' +
                svg +
                '<div class="cro12301-size-text">' +
                '<span class="cro12301-size-label">' + label + '</span>' +
                '<span class="cro12301-size-dims">' + dimText + '</span>' +
                '</div>' +
                '</div>'
            );
        }

        function injectSizeBadges() {
            var cards = document.querySelectorAll('.product-item-info');
            cards.forEach(function (card) {
                if (card.querySelector('.cro12301-size-badge')) return;

                var titleEl = card.querySelector('.product-item-name a, .product-item-link');
                if (!titleEl) return;

                var dims = parseDimensions(titleEl.textContent || '');
                if (!dims) return;

                var badge = buildSizeBadge(dims);
                var priceBox = card.querySelector('.price-box, .price-container');
                if (priceBox) {
                    priceBox.insertAdjacentHTML('afterend', badge);
                }
            });
        }

        function setupObserver() {
            var debounceTimer = null;
            var listingContainer = document.querySelector('#amasty-shopby-product-list');
            if (listingContainer) {
                var observer = new MutationObserver(function () {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(injectSizeBadges, 150);
                });
                observer.observe(listingContainer, { childList: true, subtree: true });
            }
        }

        /* Variation Init */
        function init() {
            addClass("body", variation_name);
            waitForElement('.product-item-info', injectSizeBadges);
            waitForElement('#amasty-shopby-product-list', setupObserver);
        }

        /* Initialise variation */
        waitForElement('.page-with-filter', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();
