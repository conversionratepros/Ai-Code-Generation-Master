(function () {
    try {
      /* main variables */
      var debug = 0;
      var variation_name = "";
      /* all Pure helper functions */
  
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
      
      function innerChildContent(selector, childNumber, content) {
        var el = document.querySelector(selector);
        if (el.hasChildNodes()) {
          el.childNodes[childNumber].textContent = content;
        }
      }
      function addClass(el, cls) {
        var el = document.querySelector(el);
        if (el) {
          el.classList.add(cls);
        }
      }

      /* Variation Init */
      function init() {
		addClass('body','cro-recipe-5')
		parseQueries()
      }

	  function parseQueries() {
		var params = window.location.search;
		var queries = new URLSearchParams(params).getAll("kw");
	
		queries.forEach(function(query) {
			var decodedQuery = decodeURIComponent(query);
	
			if (/^loan no credit check$/i.test(decodedQuery) ||
				/^personal loans$/i.test(decodedQuery) ||
				/^persona loans$/i.test(decodedQuery) ||
				/^old mutual loan$/i.test(decodedQuery) ||
				/^get a loan$/i.test(decodedQuery) ||
				/^debt loans$/i.test(decodedQuery) ||
				/^debt loans online$/i.test(decodedQuery) ||
				/^credit personal loans$/i.test(decodedQuery) ||
				/^loans$/i.test(decodedQuery) ||
				/^\+loans$/i.test(decodedQuery) ||
				/^personal loans no credit check$/i.test(decodedQuery) ||
				/^\+personal \+loans$/i.test(decodedQuery) ||
				/^personal loan for bad credit$/i.test(decodedQuery) ||
				/^personal loan calculator$/i.test(decodedQuery)) {
				console.log('LOANS');
				// Your loan-related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Loan Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Consolidate your personal debt now")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best loan solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to accessing what you need";
				});

			} else if (/^pay for debt$/i.test(decodedQuery) ||
				/^help pay debt$/i.test(decodedQuery) ||
				/^debt payment help$/i.test(decodedQuery) ||
				/^help pay my debt$/i.test(decodedQuery)) {
				console.log('Debt payment help');
				// Your debt payment related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Debt Loan Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Let us help you pay your debts")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to getting help";
				});
			} else if (/^debt consolidation$/i.test(decodedQuery) ||
				/^consolidate all my debt$/i.test(decodedQuery)){
				console.log('Debt consolidation');
				// Your debt consolidation related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Consolidation Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Consolidate your debt now")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to consolidating your debt";
				});
			} else if (/^african bank$/i.test(decodedQuery)) {
				console.log('Bank brand');
				// Your bank-related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Debt Loan Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Consolidate your debt now")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to consolidating your debt";
				});
			} else if (/^consolidation loan$/i.test(decodedQuery) ||
			/^consolidate loans$/i.test(decodedQuery) ||
			/^african bank consolidation loan$/i.test(decodedQuery) ||
			/^debt consolidation loan$/i.test(decodedQuery) ||
			/^consolidation loans calculator$/i.test(decodedQuery) ||
			/^\+consolidation \+loan$/i.test(decodedQuery)) {
				console.log('Debt consolidation loan');
				// Your bank-related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Consolidation Loan Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Consolidate your debt now")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to consolidating your debt";
				});
			}else if (/^capitec bank consolidation loan calculator$/i.test(decodedQuery) ||
			/^debt consolidation calculator$/i.test(decodedQuery)) {
				console.log('Debt consolidation calculator')
				// Your bank-related actions here
				waitForElement(".pb-0 h1 strong", function () {
					var croHeading = document.querySelector('.pb-0 h1 strong');
					croHeading.innerHTML = "Free Consolidation Calculator";
				});
				waitForElement(".pb-0 h1", function () {
					innerChildContent(".pb-0 h1", 2, "Consolidate your debt now")
				});
				waitForElement(".pb-0 h2", function () {
					var croCalcText = document.querySelector('.pb-0 h2');
					croCalcText.innerHTML = "Calculate the best solution for you";
				});
				waitForElement("section.pt-10.pb-0 h1 + p", function () {
					var croCalcText = document.querySelector('section.pt-10.pb-0 h1 + p');
					croCalcText.innerHTML = "There are 3 simple steps to consolidating your debt";
				});
			} else {
				console.log('Unknown query:', decodedQuery);
			}
		});
	}
	
	
	
        
        /* Initialise variation */
            waitForElement('body', init);
     
    } catch (e) {
      if (debug) console.log(e, "error in Test" + variation_name);
    }
})();