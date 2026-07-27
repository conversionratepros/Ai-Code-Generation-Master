 const defaultActivePage = 'page-index';

        var bs_data = {
            activePage:defaultActivePage,
            reason: null,
            prevPage:null,
            dealid : null,
            personid : null,
            personname : null,
            personemail : null
        }
     var pages = ['page-index'];
    

function getReason(){
    if(document.querySelector('input[name="reason"]')){
        document.querySelectorAll('input[name="reason"]').forEach((ele) => {
            ele.addEventListener("change", function(event){
                var reason = event.target.value;
                bs_data.reason = reason;
                document.querySelector('.page-survey').querySelector('.button-submit').removeAttribute('disabled');
                console.log(bs_data);
            })
        })
    }
        document.querySelector('.other-reason-text').addEventListener('click', () => {
            document.querySelector('.other-reason-radio').checked = true;
            bs_data.reason = document.querySelector('input[name="reason"]:checked').value;
            document.querySelector('.page-survey').querySelector('.button-submit').removeAttribute('disabled');
            console.log(bs_data);
        })
   
}
getReason()

function inputOtherReason(){
     if(document.querySelector('.other-reason-radio').checked == true){
        let txtVal = document.querySelector(".other-reason-text").value;
        bs_data.reason = `Other: ${txtVal}`;
        console.log(bs_data);
     }
}


    function updateGoback(current_page,next_page){

        if(!pages.includes(next_page)){
            // back btn is not clicked state
            (next_page == 'page-index')? pages = ['page-index'] :  pages.push(next_page);
        }else{
            // back btn is clicked state
            pages.splice(-1); // remove last item from visited page. Because back button is clicked.
        }
        
        if(next_page == defaultActivePage ){
            bs_data.prevPage = null;
            bs_data.activePage = next_page;
        }else{
            bs_data.prevPage = current_page;
            bs_data.activePage = next_page; 
        }
        
        document.getElementById('bs-wrapper').setAttribute('data-activePage',bs_data.activePage);
        // (.length - 2) means pick second last item from the array.
        let prevPage = 'page-index';
        if(pages[pages.length - 2] != 'page-index'){
            prevPage = pages[pages.length - 2];
        }
        document.querySelector('.page-back').setAttribute('data-target',prevPage);
        
        //console.log(pages);
        //console.log(prevPage);
    }

    function showPage(){
        const triggerBtns = document.querySelectorAll('.triggerBtn');
        const pages = document.querySelectorAll('.bs-body-item');
        triggerBtns.forEach((btn,i) => {
            btn.addEventListener('click', () => {
                let currectActivePage = document.querySelector('.bs-body-item.active');
                let targetPageElement =  btn.getAttribute('data-target');
                updateGoback(bs_data.activePage, targetPageElement);
                let targetPage = document.querySelector(`.${targetPageElement}`);
                //console.log(111);
                //console.log(targetPage);
                if(targetPage){
                    if(!targetPage.classList.contains('active')){
                        pages.forEach(page=>{page.classList.remove('active')});
                        targetPage.classList.add('active');
                        // animation
                        let targetPageCnt = targetPage.querySelector('.options-body');
                        if(btn.classList.contains('page-back')){
                            if(targetPage.classList.contains('page-index')){
                                let targetPageBannerCnt = targetPage.querySelector('.banner-img');
                                gsap.from(targetPageBannerCnt,{duration:.5,y:'-10%', opacity:1});
                            }
                            gsap.from(targetPageCnt,{duration:.5,x:'-10%', opacity:1});
                        }else{
                           // console.log(currectActivePage);
                            //gsap.to(currectActivePage,{duration:.5,x:'-10%', opacity:0})
                            gsap.from(targetPageCnt,{duration:.5,x:'10%', opacity:1});
                        }
                        
                        //console.log(targetPage);
                    }
                } 
            })
        }) 
    }
    showPage();

/* read query string */ 
function getQueryString(){
    //dealid, personid, personname,salesname,personemail,personphone,username,useremail
    const urlParams = new URLSearchParams(window.location.search);
    const dealid = urlParams.get('dealid');
    const personid = urlParams.get('personid');
    const personname = urlParams.get('personname');
    const fullname = urlParams.get('fullname');
    const personemail = urlParams.get('personemail');
   // const salesname = urlParams.get('salesname');
    const personphone = urlParams.get('personphone');
   // const username = urlParams.get('username');
   // const useremail = urlParams.get('useremail');

   
    if(dealid){
        bs_data.dealid = dealid;
    }
    if(personid){
        bs_data.personid = personid;
    }
    if(fullname){
        const finalFullName = getFirstNameWithoutAlphanumeric(fullname, true);
        const finalFirstName = getFirstNameWithoutAlphanumeric(fullname, false);
        document.forms["requestacatalogueform"]["name"].value = finalFullName;
        if(finalFirstName){
            document.querySelector('.hi').innerHTML = `<span class="hi">Hi ${finalFirstName}!</span>`;
        } 
        bs_data.personname = finalFullName;
    }



    // if(salesname){
    //     bs_data.salesname = salesname;
    // }
    if(personphone){
        document.forms["requestacatalogueform"]["phone"].value = personphone;
        bs_data.personphone = personphone;
    }
       if(personemail){

        bs_data.personemail = personemail;
    }
    // if(username){
    //     bs_data.username = username;
    // }
    // if(useremail){
    //     bs_data.useremail = useremail;
    // }

    let url_callrequest;
    if(dealid){
         url_callrequest = `https://www.jasonl.com.au/pages/followup/${window.location.search}&followuptype=email`;
    }else{
        url_callrequest = 'https://www.jasonl.com.au/pages/followup?followuptype=email';
    }
    document.getElementById('link-schedule-call').setAttribute('href',url_callrequest);
    console.log(bs_data);

}
getQueryString();


function getFirstNameWithoutAlphanumeric(inputString, fullname) {
  // Use a regular expression to match the first word that doesn't contain any alphanumeric characters.
  const urlDecoded = decodeURI(inputString);
  const match = urlDecoded.match(/[^A-Za-z0-9\s]+/); ///[^A-Za-z0-9\s]+/
  const checkNum = inputString.match(/\d+/g);
  
    //   if(checkNum ){
    //     console.log(checkNum);
    //   }else{
    //     console.log(checkNum);
    //   }

  if (match || checkNum) {
    // If a match is found, return the matched substring as the first name.
    return '';    
  } else {
    if(fullname == false ){
        finalString = inputString.split(" ");
        // If no match is found, return an empty string or handle it as desired.
        return finalString[0];
    }else{
        return inputString;
    }
        
        
  }
}

/* survey form */ 
function submitSurveyData(){
    const submitBtn =  document.querySelector('.button-submit');
    submitBtn.addEventListener('click', () => {
        $.ajax({
       type: "POST",
      // url: 'https://poptopdesk.com/blockeddeal/Emailforblocked/insertSurvey',
       url: 'https://prnt.jasonl.com.au/blockeddeal/Emailforblocked/insertSurvey', 
       data: bs_data,
       dataType: "html",
       beforeSend: function(data){
         console.log(bs_data);
         if(bs_data.reason != null ){
            submitBtn.removeAttribute('disabled');
            submitBtn.setAttribute('disabled',true); 
             document.querySelector('.lds-ring').classList.add('show');
         }else{
            document.getElementById('enter-reason').classList.add('show');
         }
       },
       complete: function(data) {
        console.log(data);
            if(data.status == 200 ){
               const submitBtn =  document.querySelector('.button-submit');
                //let difOption =  document.querySelector('.pick-different-option');
                // let bcBody =  document.querySelector('.bc-body');
                submitBtn.remove();
                setTimeout(function(){
                    document.querySelector('.lds-ring').classList.remove('show');
                    document.querySelector('.page-survey').classList.remove('active');
                    document.querySelector('.page-thankyou').classList.add('active');
                    document.querySelector('.page-back').remove();
                    gsap.from('#thankyou-svg',{duration:0.6,x:'100%', opacity:0});
                    gsap.from('#thankyou-msg',{duration:0.6,y:'-100%', opacity:0, ease:'bounce', delay:0.5});
                        window.dataLayer = window.dataLayer || [];
                        /*
                        window.dataLayer.push({
                            'event': 'bs_survey', // do not edit or make same changes on GA4 "Blocked sequence survey submit"
                            'GA4_eventAction':'Survey submit', // do not edit or make same changes on GA4 "Blocked sequence survey submit"
                            'GA4_eventValue':bs_data.reason,
                            'GA4_eventLabel':'Email'
                        });   
                        */
                       
                        window.dataLayer.push({
                            'event': `followup_email_survey`, // do not edit or make same changes on GA4 "Blocked sequence survey submit"
                            'selected_option_first':'survey', 
                            'selected_option_second':bs_data.reason
                        });  
                    // const sliderElement = document.getElementById('swiffy-slider');
                    // swiffyslider.slideTo(sliderElement, 3);
                },2000)
                 
                //msg();
                //difOption.remove();
            }
         }
       });
    })
}
submitSurveyData();
/* catalogue */
function form_submit(){
    const form_requestcatalogue = document.forms.namedItem("requestacatalogueform");
    form_requestcatalogue.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var oData = new FormData(requestacatalogueform);
        oData.append('dealid',bs_data.dealid);
        oData.append('personid',bs_data.personid);

        var isValidate = validateEmptyField();
        if (isValidate == true) {
                
            var oReq = new XMLHttpRequest();
             oReq.open("POST", "https://prnt.jasonl.com.au/blockeddeal/Emailforblocked/insertCatalogue", true);
           // oReq.open("POST", "https://poptopdesk.com/blockeddeal/Emailforblocked/insertCatalogue", true);
            oReq.onload = function (oEvent) {
                if (oReq.status == 200) {
                    const name = document.forms["requestacatalogueform"]["name"].value;
                    const catalogueName = document.forms["requestacatalogueform"]["cataloguename"].value;
                    //document.getElementById('formsubmitstatus').innerHTML = `<div><p class="form-submited-msg"> Thank you ${name}, your catalogue is on it's way.</p></div>`;

                
                    
                    document.getElementById('bs-wrapper').setAttribute('data-activepage','page-thankyou');
                    document.querySelector('.page-catalogue').classList.remove('active');
                    document.querySelector('.page-thankyou').classList.add('active');
                    document.querySelector('.page-back').remove();
                    document.getElementById('thankyou-msg').innerHTML = `Thank you ${name},<span>your catalogue is on it's way.</span>`;
                    gsap.from('#thankyou-svg',{duration:0.6,x:'100%', opacity:0});
                    gsap.from('#thankyou-msg',{duration:0.6,y:'-100%', opacity:0, ease:'bounce', delay:0.5});
                    
                   
                    

                   
                //  if (bs_data.personemail && bs_data.personemail !== 'null') {
                if (bs_data.dealid && bs_data.dealid !== 'null') {
                        const catalogueEmail = bs_data.personemail;
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                                'event': 'catalogue_request_form_submitted', // catalogue_request_form_submitted rename to catalogue_request in gtm and added param catalogue_name value catalogueName on 2/10/2026
                                'GA4_eventAction':'Form submit',
                                'catalogue_name':document.forms["requestacatalogueform"]["cataloguename"].value,
                                'page_location': window.location.href,
                                'enhanced_conversion_data': {
                                    "email": catalogueEmail
                                }
                        }); 
                        // block sequence event ---
                         window.dataLayer = window.dataLayer || [];
                         window.dataLayer.push({
                            'event': `followup_email_catalogue`, // do not edit or make same changes on GA4 "Blocked sequence survey submit"
                            'selected_option_first':'catalogue request'
                        }); 
                   }
                   form_requestcatalogue.reset(); 
                   
                } else {
                    document.getElementById('formsubmitstatus').innerHTML = '<p style="color:red">Something wrong with form submission. Please try again.</p>';
                }
            };
                // for (let obj of oData) {
                //         console.log(obj);
                //     } 
                //    console.log(oData);
                   oReq.send(oData);
            
            
        }
    }, false);
}


function validateEmptyField() {
    const form_requestcatalogue = document.forms["requestacatalogueform"];
    //let message = document.forms["requestacatalogueform"]["message"].value;
    let name = document.forms["requestacatalogueform"]["name"].value;
    //let email = document.forms["requestacatalogueform"]["email"].value;
    let state = document.forms["requestacatalogueform"]["state"].value;
    let address = document.forms["requestacatalogueform"]["address"].value;
    let phone = document.forms["requestacatalogueform"]["phone"].value;
    
    let hidField = document.getElementById('hidfield').value;
    //let message_error = document.getElementsByClassName('message_error');
    let name_error = document.getElementsByClassName('name_error');
    let address_error = document.getElementsByClassName('address_error');
   // let email_error = document.getElementsByClassName('email_error');
   //let invalid_email = document.getElementsByClassName('email_invalid_error');
    let phone_error = document.getElementsByClassName('phone_error');
    let invalid_phone = form_requestcatalogue.querySelector('.phone_invalid_error');
    let state_error = document.getElementsByClassName('state_error');
    let regex = /^[\d,\s,\+,\-]{5,20}/;

    if (name == "") {
        name_error[0].classList.add('show');
        return false;
    } else {
        name_error[0].classList.remove('show');
    }

    if (hidField != "") {
        return false;
    }

     if (address == "") {
        address_error[0].classList.add('show');
        return false;
    } else {
        address_error[0].classList.remove('show');
    }

     if (state == "") {
        state_error[0].classList.add('show');
        return false;
    } else {
        state_error[0].classList.remove('show');
    }


// if (email == "") {
//         email_error[0].classList.add('show');
//         return false;
//     } else {
//         email_error[0].classList.remove('show');
//         let emailAddrField = document.forms["requestacatalogueform"]["email"];
//         let isValidEmail = ValidateEmail(emailAddrField);
//         if (isValidEmail != true) {
//             invalid_email[0].classList.add('show');
//             return false;
//         } else {
//             invalid_email[0].classList.remove('show');
//         }
//     }
    


    if (phone == "") {
        phone_error[0].classList.add('show');
        return false;
    }
    //else if (phone.match(regex)) {
    else if (!validatePhoneNumber(phone)) {
        phone_error[0].classList.remove('show');
        invalid_phone.classList.remove('show');
    } else {
        phone_error[0].classList.remove('show');
        invalid_phone.classList.add('show');
        return false;
    }
    
    return true;
}

function validatePhoneNumber(input_str) {
    console.log('test');
    //let regex = /^[\d,\s,\+,\-]{5,20}/; /^\d{10}$/
    let regex = /^[0-9a-zA-Z]*$/;
    return regex.test(input_str);
}


function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

form_submit();

    gsap.from('.banner-img img',{duration:1,y:'-10%', opacity:1, delay:0.5});
    gsap.from('.page-index',{duration:1,y:'-10%', opacity:0});