
// window.addEventListener('load', function() {
    var bcData = {
        dateTime : null,
        date: null,
        hour : null,
        minute : null,
        contactMedium: null,
        dealid : null,
        personid : null,
        personname : null,
        salesname : null,
        personemail : null,
        personphone : null,
        username : null,
        useremail : null,
        followupType : 'SMS',
        state : null 
    };
        var calendar = jsCalendar.new('#jsCalendar');
        var todayDate = new Date();


        let minDays = new Date();
        minDays.setDate(minDays.getDate());
        //console.log(`maxdays: ${minDays}`);
        calendar.min(minDays);

        let maxDays = new Date();
        maxDays.setDate(minDays.getDate() + 7);
        //console.log(`maxdays: ${maxDays}`);
        calendar.max(maxDays);


        //var todayMonth = todayDate.getMonth();
        // var numMaxMonth = 2; // if this is set to 1. this means, current month + one additional month
       //var maxDate =  todayDate.getDate() + 7;

        calendar.onDateRender(function(date, element, info) {
            // do not show date after max month
            let txt = element.innerHTML;
        if(date >= minDays && date <= maxDays ){
            if (date.getDay() == 0 || date.getDay() == 6) {
                element.classList.add('weekend');
            } else{
                if((date - todayDate) > 0 && date.getDay() !== 0 && date.getDay() !== 6){
                element.classList.add('valid-days');
                }
            }    
            //let txt = element.innerHTML;
             //console.log(`Month: ${date.getMonth()} - ${txt}`);
             if(!element.classList.contains('jsCalendar-next')){
                element.innerHTML = `<span>${txt}</span>`;
             }else{
                 element.innerHTML = "";
             }
            
            return true;
        }else{
            //console.log(element);
            //if(element.classList.contains('jsCalendar-next') && !element.classList.contains('valid-days')){
                //element.remove();
              //  element.innerHTML = "<span> </span>";
           // }
           if (date.getDay() == 0 || date.getDay() == 6) {
                element.classList.add('weekend');
            }
           if(element.classList.contains('jsCalendar-next')){
            element.innerHTML = "";
           }else{
            element.innerHTML = `<span>${txt}</span>`;
           }
            
            return true;
        }
            

	    });

        // check whether there are more than one month. Remove arrows for single month else show current month.
        (calendar.next()._date.getMonth() == todayDate.getMonth())?document.querySelector('.jsCalendar-title-right').remove():calendar.previous();
        calendar.refresh();

        calendar.onDateClick(function(event, date){        
            // inputA.value = date.toString();
            if(event.target.classList.contains('jsCalendar-next') && !event.target.classList.contains('valid-days')){
                console.log('date from the month of next of max-month');
            }else{
            }

            if(event.target.parentNode.classList.contains('valid-days')){
                console.log('valid days found');
                if((date - todayDate) > 0 && date.getDay() !== 0 && date.getDay() !== 6 ){
                this.set(date);
                if(bcData.dateTime == null ){
                         bcData.dateTime = date;
                    }else{
                            bcData.dateTime.setFullYear(date.getFullYear(), date.getMonth(),  date.getDate(), date.getDay());
                    }

                    // "bs_pick_a_date" and "Date selected" has been used in GA4 "Blocked sequence pick a date"
                   // # ga4Tracking('bs_pick_a_date',bcData.date,'Date selected',bcData.followupType); 
                    updateSliderButtons(bcData);       
                }
            }else{
                console.log('valid days not found');
            }
        });

        // set max days 1 week
        //calendar.min("now");

        //let maxMonth = new Date();
        //maxMonth.setMonth(maxMonth.getMonth() + 1) ;
        //calendar.max(maxMonth);
       
        // let maxDays = new Date();
        // maxDays.setDate(maxDays.getDate() + 9);
        // console.log(`maxdays: ${maxDays}`);
        // calendar.max(maxDays);



//});


document.addEventListener("DOMContentLoaded", (event) => {

    // wait a little to ensure GeoTargetly script has loaded
    setTimeout(function(){
        if(typeof geotargetly_region_name === 'function'){
            geotargetly_loaded(); // call your custom function
        } else {
            console.log('GeoTargetly functions not ready yet.');
        }
    }, 1000);

});

function geotargetly_loaded(){
    bcData.state = geotargetly_region_name() || geotargetly_region_code() || 'Unknown';
}
// function ga4Tracking(event,value,action,label){
//     window.dataLayer = window.dataLayer || [];
//     window.dataLayer.push({
//         'event': event,
//         'GA4_eventValue':value, 
//         'GA4_eventAction':action,
//         'GA4_eventLabel':label
//     });
// }

function ga4Tracking(event,first_selected_option,second_selected_option){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': `followup_email_${event}`,
        'selected_option_first':first_selected_option, 
        'selected_option_second':second_selected_option
    });
}



        /* TIME PICKER */

// enable or disable arrow button 
function tp_arrow_status(timeType, direction, hr_slider_updated_val){
    var hr_slider = {
        max_val : 16, // 16 = 4pm
        min_val : 9, // 9 = 9am
        val: document.getElementById('hour-value').value,
        up_arrow : document.getElementById('hour-up'),
        down_arrow: document.getElementById('hour-down')
    }
     var min_slider = {
        max_val : 45,
        min_val : 0,
        val: document.getElementById('minute-value').value,
        up_arrow : document.getElementById('minute-up'),
        down_arrow: document.getElementById('minute-down')
    }

    
  
    let hour_slider_value = hr_slider.val;
     if(hr_slider_updated_val){
        hour_slider_value = hr_slider_updated_val;   
    }
    

if(timeType == 'hour'){
    if(hour_slider_value <= hr_slider.min_val  ){
        hr_slider.down_arrow.setAttribute('data-status','disable');
    }else{
        hr_slider.down_arrow.setAttribute('data-status','enable'); 
    }

    if( hour_slider_value >= hr_slider.max_val ){
        hr_slider.up_arrow.setAttribute('data-status','disable');
    }else{
        hr_slider.up_arrow.setAttribute('data-status','enable'); 
    }
}
    


if(timeType == 'minute'){

    if(min_slider.val == min_slider.min_val  ){
        min_slider.down_arrow.setAttribute('data-status','disable');
    }else{
        min_slider.down_arrow.setAttribute('data-status','enable'); 
    }

    if( min_slider.val >= min_slider.max_val ){
        min_slider.up_arrow.setAttribute('data-status','disable');
    }else{
        min_slider.up_arrow.setAttribute('data-status','enable'); 
    }
}

    set_ampm();
    
}



// select time
function time_select(){
    var hour_slot = {9:9,10:10,11:11,12:12,13:1,14:2,15:3,16:4,17:5}
    const arrow =  document.querySelectorAll('.time-arrow');
    let hourVal = parseInt(document.getElementById('hour-value').value);
    let minuteVal = parseInt(document.getElementById('minute-value').value);

    const step_hour = 1;
    const step_minute = 15;

    arrow.forEach((element,i) => {
        element.addEventListener('click', function(){
       
       let arrowStatus = element.getAttribute('data-status');
       if(arrowStatus == 'enable'){
            if(element.classList.contains('up')){
                if(element.classList.contains('hour-up')){
                    if(hourVal <= 0 ){
                        hourVal = 0;
                        hourVal = hourVal + 9;
                    }else{
                        hourVal = hourVal + step_hour;
                    }
                    
                    document.getElementById('hour-value').value = hour_slot[hourVal];
                    tp_arrow_status('hour','up',hourVal);
                }else{
                    minuteVal = parseInt(minuteVal) + step_minute;
                    document.getElementById('minute-value').value = minuteVal;
                    tp_arrow_status('minute');
                }
            }else{
                if(element.classList.contains('hour-down')){
                    hourVal = hourVal - step_hour;
                    document.getElementById('hour-value').value = hour_slot[hourVal];
                    tp_arrow_status('hour','down',hourVal);
                }else{
                     minuteVal = minuteVal - step_minute;
                     if(minuteVal == 0 ){
                        document.getElementById('minute-value').value = '00';
                     }else{
                        document.getElementById('minute-value').value = minuteVal;
                     }
                     tp_arrow_status('minute');
                }
            }
             get_time(hourVal, minuteVal, hour_slot);
             
       }

        })
    });
   return true;

}


// set AM or PM automatically that depends on selected time. 10-11 is AM and 12 - 4 is PM
function set_ampm(){
    const hourVal = parseInt(document.getElementById('hour-value').value);
    console.log(`hourval: ${hourVal}`);
    
    if(hourVal >= 1 && hourVal <= 4 || hourVal == 12){
        document.getElementById('ampm-status').classList.remove('active-am');
        document.getElementById('ampm-status').classList.add('active-pm');
    }else{
        if(hourVal != 0 ){
            document.getElementById('ampm-status').classList.remove('active-pm');
            document.getElementById('ampm-status').classList.add('active-am');
        }
    }
}


function get_time(hourVal, minuteVal, hourSlot){
    var time = {
        hour:hourSlot[hourVal],
        minute:minuteVal,
        meridiem: (hourVal >= 12 ) ? 'PM' : 'AM'
    }
    //console.log(bcData);
    bcData.hour = hourVal;
    let minuteFormat = minuteVal.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    bcData.minute = minuteFormat;
        
    if(bcData.dateTime){  
        bcData.dateTime.setHours(hourVal,time.minute,0);
       // # ga4Tracking('bs_pick_a_time',`${bcData.hour}:${bcData.minute}`,'Time selected',bcData.followupType);
        updateSliderButtons(bcData);
        console.log(bcData.dateTime);
    }
    // console.log('tester');
    // console.log(bcData);
    
    
        // console.log(time);
        // console.log(bcData);
        //var t = bcData.dateTime.toLocaleTimeString('en-US', { hour12: true });
        //console.log(t);
    
    return time;
}

/*
function enterTime(){
    var hour_slot = {10:10,11:11,12:12,13:1,14:2,15:3,16:4,17:5}
  var ele = document.getElementById('hour-value');
//   ele.keydown = function(e) {
//      console.log(this.value);
//     if(isNaN(this.value+""+String.fromCharCode(e.charCode)))
//         return false;
//   }
  ele.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    console.log('keyup');
    if(isNaN(e.target.value)){
        console.log(1);
        return false;
    }else{
        console.log(0);
    }
    // if(isNaN(e.target.value))
    //     return false;
  });

  ele.onpaste = function(e){
     e.preventDefault();
  }

}

enterTime();

*/
tp_arrow_status('hour');
tp_arrow_status('minute');
time_select();
set_ampm()


function getFirstNameWithoutAlphanumeric(inputString) {
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
        finalString = inputString.split(" ");
        // If no match is found, return an empty string or handle it as desired.
        return finalString[0];
  }
}



/* read query string */ 
function getQueryString(){
    //dealid, personid, personname,salesname,personemail,personphone,username,useremail
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    console.log(urlParams.get('dealid'));
    const dealid = urlParams.get('dealid');
    const personid = urlParams.get('personid');
    const personname = urlParams.get('personname');
    const personemail = urlParams.get('personemail');
    const salesname = urlParams.get('salesname');
    const personphone = urlParams.get('personphone');
    const username = urlParams.get('username');
    const useremail = urlParams.get('useremail');
    const followup_type = urlParams.get('followuptype');
    if(followup_type == 'email'){
        bcData.followupType = 'email';
        console.log(followup_type);
        document.getElementById('page-back').setAttribute('href',`https://www.jasonl.com.au/pages/blocked-sequence${window.location.search}`)
    }else{
        document.getElementById('page-back').remove();
    }
    
    if(dealid){
    bcData.dealid = dealid;
    }
    if(personid){
    bcData.personid = personid;
    }
    if(personname && personname != 'null' ){
        const finalPersonName = getFirstNameWithoutAlphanumeric(personname);
        if(finalPersonName){
            document.getElementById('customer-name').innerHTML = `Hi <strong>${finalPersonName}!</strong>`;
            bcData.personname = personname;
        }
    }
    if(salesname){
        bcData.salesname = salesname;
    }
    if(personphone){
        bcData.personphone = personphone;
    }
       if(personemail){
        bcData.personemail = personemail;
    }
    if(username){
        bcData.username = username;
    }
    if(useremail){
        bcData.useremail = useremail;
    }

    console.log(bcData);
    
}
getQueryString();

/* Swiffy Callback customization */
function getActiveSlide(){
    var index;
    const slideItems = document.querySelectorAll('.bc-item');
    //const indicatorItems =  sliderIndicator.querySelectorAll('button');
        slideItems.forEach((e,i) => {
            if(e.classList.contains('slide-visible')){
                console.log('slider index');
                index = i; 
                // change wrapper class
                document.querySelector('.bc-body').setAttribute('data-slide-index',`slide-${index}`);
                
                if(index == slideItems.length - 1){
                    document.querySelector('.bc-body').setAttribute('data-slide-last',true);
                }else{
                    document.querySelector('.bc-body').removeAttribute('data-slide-last');
                }
                
            }
        })
    
    return index;
} 

function updateSliderButtons(data){
    const tempBtn = document.getElementById('temp-btn');
    let nextButton = document.querySelector('.slider-nav-next');
    let bcBody = document.querySelector('.bc-body');
    var activeSlide = getActiveSlide();

    // console.log(123123123);
    // console.log(data);
    // console.log(activeSlide);
    
nextButton.setAttribute('disabled',true);
tempBtn.removeAttribute('disabled');
    if(activeSlide == 0 ){ 
        if(data.dateTime ){
            nextButton.removeAttribute('disabled');
            tempBtn.setAttribute('disabled',true);
            bcBody.setAttribute('data-slide-active','slide-1');
        }
    }
    if(activeSlide == 1 ){
        if(data.hour ){
            nextButton.removeAttribute('disabled');
            tempBtn.setAttribute('disabled',true);
            bcBody.setAttribute('data-slide-active','slide-2');
        }
    }
     if(activeSlide == 2 ){
        const confirmBtn = document.querySelector('.confirm');
        console.log('tester555');
        if(data.contactMedium != null ){
            nextButton.removeAttribute('disabled');
            tempBtn.setAttribute('disabled',true);
            bcBody.setAttribute('data-slide-active','slide-3');
        }
    }
    
}





// set active or completed or both on left menu
function updateSteps(){

        // Get index of active slide of the slider
        // var sliderIndex;
        // document.getElementById('slider-indicators').querySelectorAll('button').forEach((e,i) => {
        //     if(e.classList.contains('active')){
        //        sliderIndex = i;
        //     }
        // })
        let sliderIndex = getActiveSlide();

        // set completed
            let stepHolder = document.querySelector('.bc-steps');
            let steps = stepHolder.querySelectorAll('li');
            // check calender 
            if(bcData.dateTime != null ){
                if(!steps[0].classList.contains('completed')){
                    steps[0].classList.add('completed');
                }
            }
            // check time picker 
            if(bcData.hour != null ){
                if(!steps[1].classList.contains('completed')){
                    steps[1].classList.add('completed');
                }
            }
           // check time picker 
            if(bcData.contactMedium != null ){
                if(!steps[2].classList.contains('completed')){
                    steps[2].classList.add('completed');
                }
            }
            // setActive except last slide. Last slide do not have step. It is summary block.
            steps.forEach((e,i) => {
                e.classList.remove('active');
            }); 
            if(sliderIndex != steps.length){
                 steps[sliderIndex].classList.add('active');
            }
}

function onSlideEnd(){
    const sliderElement = document.getElementById('swiffy-slider');
    swiffyslider.onSlideEnd(sliderElement, function() {
        // update slider button. Disable until user enters the field
        updateSteps();
        updateSliderButtons(bcData);
        showSummery();
    })
}


function getContactMedium(){
    if(document.querySelector('input[name="radio"]')){
        document.querySelectorAll('input[name="radio"]').forEach((ele) => {
            ele.addEventListener("change", function(event){
                var medium = event.target.value;
                bcData.contactMedium = medium;

               // Mon 9 Mar 2026 - cleanup redundanct blocksequence events
               // ga4Tracking('bs_select_contact_method',bcData.contactMedium,'Contact method selected',bcData.followupType);

                updateSliderButtons(bcData);
                showSummery();
                console.log(bcData);
            })
        })
    }
   
}
getContactMedium()

function showSummery(){
    let activeSlide = getActiveSlide();
    let totalSlide = document.querySelectorAll('.bc-item').length;
   // if(activeSlide == totalSlide - 1 ){
        const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let month = monthName[bcData.dateTime.getMonth()];
        let year = bcData.dateTime.getFullYear();
        let date = bcData.dateTime.getDate();
        let hour = bcData.hour;
        let minute = bcData.minute;
        let ampm = 'AM';
        if(hour >= 12 ){
        ampm = 'PM'; 
        }
        if(minute == 0){
            minute = '00';
        }
        document.querySelector('.selected-date-time').innerHTML = `${month} ${date} - ${hour}:${minute} ${ampm}`;
        console.log(year);
        let finalMonth = bcData.dateTime.getMonth()+1; // one added to fix in the middleware. The issue was that a month 
        bcData.date = `${year}-${finalMonth}-${date}`;

        console.log(bcData);
        let method;
        (bcData.contactMedium == 'googlemeet') ? method = 'Google Meet' : method = 'Phone me';
        document.querySelector('.selected-contact-medium').innerHTML = method; 
       // bcData.date = 
     // }
}




window.addEventListener('load', function() {
updateSteps();
onSlideEnd();
});



function submitData(){
  $.ajax({
       type: "POST",
       url: 'https://prnt.jasonl.com.au/blockeddeal/Smsfromblocked/getAllDataFromBlocked',
    //    url: 'https://poptopdesk.com/blockeddeal/Smsfromblocked/getAllDataFromBlocked',
       data: bcData,
       dataType: "html",
       beforeSend: function(data){
         // hide something
         // show loader icon
         console.log(bcData);
         const confirmBtn =  document.querySelector('.confirm');

         if(bcData.contactMedium != null ){
            confirmBtn.removeAttribute('disabled');
         }else{
            confirmBtn.setAttribute('disabled',true); 
            const enterMethod = document.getElementById('enter-method');
            enterMethod.classList.add('show');
            document.querySelector('.lds-ring').classList.add('show');
         }
       },
       complete: function(data) {
        //console.log(data);
            if(data.status == 200 ){
                let confirmBtn =  document.querySelector('.confirm');
                //let difOption =  document.querySelector('.pick-different-option');
                let bcBody =  document.querySelector('.bc-body');
                bcBody.classList.remove('not-confirmed');
                bcBody.classList.add('confirmed');
                confirmBtn.remove();
                document.getElementById('page-back').remove();
               // #task_consolidate - ga4Tracking('bs_call_request',bcData.contactMedium,'Call request submitted',bcData.followupType);
                ga4Tracking('call','Call Scheduled',bcData.contactMedium,);
                setTimeout(function(){
                    document.querySelector('.lds-ring').classList.remove('show');
                    // const sliderElement = document.getElementById('swiffy-slider');
                    // swiffyslider.slideTo(sliderElement, 3);
                },2000)
                 
                msg();
                //difOption.remove();
            }
         }
       });
}

// confirm 
document.querySelector('.confirm').addEventListener('click', (e) => {
    submitData();
})

// pick different option
/*
document.querySelector('.pick-different-option').addEventListener('click', (e) => {
    const sliderElement = document.getElementById('swiffy-slider');
    swiffyslider.slideTo(sliderElement, 2);
    msg();
})
*/

function msg(){
    const navNext = document.getElementById('temp-btn');
    navNext.addEventListener('click', (e) => {
        if(bcData.dateTime == null){
            console.log('Please enter date.');
            const enterDate = document.getElementById('enter-date');
            enterDate.classList.add('show');
        }else if(bcData.hour == null && bcData.minute == null){
            console.log('Please select time.');
            const enterTime = document.getElementById('enter-time');
            enterTime.classList.add('show');
        }else if(bcData.hour == 0 && bcData.minute != null){
            console.log('Please enter hour time.');
            const enterHour = document.getElementById('enter-hour');
            enterHour.classList.add('show');
        }else if(bcData.contactMedium == null){
            console.log('Please select contact method.');
            const enterMethod = document.getElementById('enter-method');
            enterMethod.classList.add('show');
            
        }
    })
}
function closeErrorMsg(){
    const btn = document.querySelectorAll('.error-msg');
    btn.forEach((e,i) => {
        e.addEventListener('click', function(ele){
            e.classList.remove('show');
        })
        
    })
}



closeErrorMsg();
msg();




